import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";

interface TextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  variant?: "default" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const TextField = React.forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({
    className,
    label,
    error,
    success,
    helper,
    variant = "default",
    size = "md",
    resize = "vertical",
    id,
    rows = 4,
    ...props
  }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    const sizeClasses = {
      sm: "px-3 py-2 text-sm min-h-[80px]",
      md: "px-4 py-3 text-sm min-h-[100px]",
      lg: "px-5 py-4 text-base min-h-[120px]"
    };

    const variantClasses = {
      default: "bg-background border-border hover:border-border-strong focus:border-input-focus focus:ring-2 focus:ring-input-focus/20",
      filled: "bg-surface border-transparent hover:bg-surface-elevated focus:bg-background focus:border-input-focus focus:ring-2 focus:ring-input-focus/20",
      ghost: "bg-transparent border-transparent hover:bg-muted/50 focus:bg-background focus:border-input-focus focus:ring-2 focus:ring-input-focus/20"
    };

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize"
    };

    const getStatusColor = () => {
      if (error) return "border-destructive focus:border-destructive focus:ring-destructive/20";
      if (success) return "border-success focus:border-success focus:ring-success/20";
      return "";
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <textarea
            id={textareaId}
            rows={rows}
            className={cn(
              "flex w-full rounded-lg border transition-all duration-200 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
              sizeClasses[size],
              variantClasses[variant],
              resizeClasses[resize],
              getStatusColor(),
              className
            )}
            ref={ref}
            {...props}
          />
        </div>

        {(helper || error || success) && (
          <div className="flex items-start gap-2">
            {error && <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />}
            {success && <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />}
            <p className={cn(
              "text-sm",
              error && "text-destructive",
              success && "text-success",
              !error && !success && "text-muted-foreground"
            )}>
              {error || success || helper}
            </p>
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };