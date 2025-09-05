import React from "react";
import { cn } from "@/lib/utils";
import { Upload, File, X, AlertCircle, Check, Image } from "lucide-react";

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  disabled?: boolean;
  variant?: "default" | "dropzone" | "button";
  size?: "sm" | "md" | "lg";
  showPreview?: boolean;
  className?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({
    onFilesChange,
    accept,
    multiple = false,
    maxFiles = 1,
    maxSize = 10 * 1024 * 1024, // 10MB default
    label,
    error,
    success,
    helper,
    disabled = false,
    variant = "default",
    size = "md",
    showPreview = true,
    className,
    ...props
  }, ref) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const sizeClasses = {
      sm: "p-4 text-sm",
      md: "p-6 text-sm",
      lg: "p-8 text-base"
    };

    const buttonSizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base"
    };

    React.useImperativeHandle(ref, () => inputRef.current!);

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const isValidFile = (file: File) => {
      if (maxSize && file.size > maxSize) return false;
      if (accept) {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        return acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.match(type.replace('*', '.*'));
        });
      }
      return true;
    };

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList || disabled) return;

      const newFiles = Array.from(fileList).filter(isValidFile);
      
      let updatedFiles: File[];
      if (multiple) {
        updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      } else {
        updatedFiles = newFiles.slice(0, 1);
      }

      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
      handleFiles(e.dataTransfer.files);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    };

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    const getFileIcon = (file: File) => {
      if (file.type.startsWith('image/')) {
        return <Image className="h-4 w-4 text-primary" />;
      }
      return <File className="h-4 w-4 text-muted-foreground" />;
    };

    const renderFilePreview = (file: File) => {
      if (file.type.startsWith('image/')) {
        return (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-16 h-16 object-cover rounded border"
            onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
          />
        );
      }
      return (
        <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center">
          <File className="h-6 w-6 text-muted-foreground" />
        </div>
      );
    };

    if (variant === "button") {
      return (
        <div className="space-y-3">
          {label && (
            <label className="text-sm font-medium leading-none text-foreground">
              {label}
            </label>
          )}
          
          <div>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleInputChange}
              className="sr-only"
              disabled={disabled}
              {...props}
            />
            
            <button
              type="button"
              onClick={handleClick}
              disabled={disabled}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                buttonSizeClasses[size],
                className
              )}
            >
              <Upload className="h-4 w-4" />
              {multiple ? "Selecionar arquivos" : "Selecionar arquivo"}
            </button>
          </div>

          {showPreview && files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-muted/50 rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {(helper || error || success) && (
            <p className={cn(
              "text-sm flex items-center gap-1",
              error && "text-destructive",
              success && "text-success",
              !error && !success && "text-muted-foreground"
            )}>
              {error && <AlertCircle className="h-3 w-3" />}
              {success && <Check className="h-3 w-3" />}
              {error || success || helper}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {label && (
          <label className="text-sm font-medium leading-none text-foreground">
            {label}
          </label>
        )}
        
        <div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            className="sr-only"
            disabled={disabled}
            {...props}
          />
          
          <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200",
              sizeClasses[size],
              isDragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-border-strong",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-destructive",
              success && "border-success",
              className
            )}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <Upload className={cn(
                "text-muted-foreground",
                size === "sm" && "h-8 w-8",
                size === "md" && "h-10 w-10", 
                size === "lg" && "h-12 w-12"
              )} />
              
              <div className="space-y-1">
                <p className="font-medium">
                  Arraste arquivos aqui ou clique para selecionar
                </p>
                <p className="text-xs text-muted-foreground">
                  {accept && `Formatos aceitos: ${accept}`}
                  {maxSize && ` • Tamanho máximo: ${formatFileSize(maxSize)}`}
                  {multiple && maxFiles > 1 && ` • Máximo ${maxFiles} arquivos`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {showPreview && files.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Arquivos selecionados:</h4>
            <div className="grid gap-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {showPreview && renderFilePreview(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-muted/50 rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(helper || error || success) && (
          <p className={cn(
            "text-sm flex items-center gap-1",
            error && "text-destructive",
            success && "text-success",
            !error && !success && "text-muted-foreground"
          )}>
            {error && <AlertCircle className="h-3 w-3" />}
            {success && <Check className="h-3 w-3" />}
            {error || success || helper}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };