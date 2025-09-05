import React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search, X, AlertCircle, Loader2 } from "lucide-react";

interface ComboOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface ComboBoxProps {
  options?: ComboOption[];
  value?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "ghost";
  maxItems?: number;
  className?: string;
  
  // URL fetch options
  fetchUrl?: string;
  fetchHeaders?: Record<string, string>;
  fetchMethod?: "GET" | "POST";
  fetchBody?: any;
  labelKey?: string;
  valueKey?: string;
  descriptionKey?: string;
  onFetchError?: (error: Error) => void;
}

const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  ({
    options: propOptions = [],
    value = [],
    onValueChange,
    placeholder = "Selecione...",
    searchPlaceholder = "Buscar...",
    label,
    error,
    success,
    helper,
    disabled = false,
    multiple = false,
    searchable = true,
    clearable = true,
    size = "md",
    variant = "default",
    maxItems,
    className,
    
    // URL fetch props
    fetchUrl,
    fetchHeaders = {},
    fetchMethod = "GET",
    fetchBody,
    labelKey = "label",
    valueKey = "value", 
    descriptionKey = "description",
    onFetchError,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [fetchedOptions, setFetchedOptions] = React.useState<ComboOption[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [fetchError, setFetchError] = React.useState<string | null>(null);
    const comboRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);

    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-sm",
      lg: "h-13 px-5 text-base"
    };

    const variantClasses = {
      default: "bg-background border-border hover:border-border-strong focus:border-input-focus focus:ring-2 focus:ring-input-focus/20",
      filled: "bg-surface border-transparent hover:bg-surface-elevated focus:bg-background focus:border-input-focus focus:ring-2 focus:ring-input-focus/20",
      ghost: "bg-transparent border-transparent hover:bg-muted/50 focus:bg-background focus:border-input-focus focus:ring-2 focus:ring-input-focus/20"
    };

    const getStatusColor = () => {
      if (error) return "border-destructive focus:border-destructive focus:ring-destructive/20";
      if (success) return "border-success focus:border-success focus:ring-success/20";
      return "";
    };

    const options = fetchUrl ? fetchedOptions : propOptions;
    
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchValue.toLowerCase())
    );

    const selectedOptions = options.filter(option => value.includes(option.value));

    // Fetch data from URL
    React.useEffect(() => {
      if (fetchUrl && isOpen) {
        setIsLoading(true);
        setFetchError(null);
        
        const fetchOptions = {
          method: fetchMethod,
          headers: {
            'Content-Type': 'application/json',
            ...fetchHeaders
          },
          ...(fetchMethod === 'POST' && fetchBody && { body: JSON.stringify(fetchBody) })
        };

        fetch(fetchUrl, fetchOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            const formattedOptions = Array.isArray(data) ? data : data.data || [];
            const options = formattedOptions.map((item: any) => ({
              label: item[labelKey] || item.label || item.name || String(item),
              value: item[valueKey] || item.value || item.id || String(item),
              description: item[descriptionKey] || item.description,
              disabled: item.disabled || false
            }));
            setFetchedOptions(options);
          })
          .catch(error => {
            setFetchError(error.message);
            onFetchError?.(error);
          })
          .finally(() => setIsLoading(false));
      }
    }, [fetchUrl, isOpen, fetchMethod, fetchHeaders, fetchBody, labelKey, valueKey, descriptionKey, onFetchError]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (comboRef.current && !comboRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchValue("");
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    React.useEffect(() => {
      if (isOpen && searchable && searchRef.current) {
        searchRef.current.focus();
      }
    }, [isOpen, searchable]);

    const handleSelect = (optionValue: string) => {
      if (disabled) return;

      let newValues: string[];
      
      if (multiple) {
        if (value.includes(optionValue)) {
          newValues = value.filter(v => v !== optionValue);
        } else {
          if (maxItems && value.length >= maxItems) return;
          newValues = [...value, optionValue];
        }
      } else {
        newValues = [optionValue];
        setIsOpen(false);
      }
      
      onValueChange?.(newValues);
    };

    const handleRemove = (optionValue: string, event?: React.MouseEvent) => {
      event?.stopPropagation();
      if (disabled) return;
      
      const newValues = value.filter(v => v !== optionValue);
      onValueChange?.(newValues);
    };

    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (disabled) return;
      
      onValueChange?.([]);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (!searchable) {
          event.preventDefault();
          setIsOpen(!isOpen);
        }
      } else if (event.key === 'Escape') {
        setIsOpen(false);
        setSearchValue("");
      }
    };

    const getDisplayText = () => {
      if (value.length === 0) return placeholder;
      if (!multiple) return selectedOptions[0]?.label || "";
      if (value.length === 1) return selectedOptions[0]?.label || "";
      return `${value.length} itens selecionados`;
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none text-foreground">
            {label}
          </label>
        )}
        
        <div className="relative" ref={comboRef}>
          <div
            ref={ref}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            tabIndex={disabled ? -1 : 0}
            className={cn(
              "flex items-center justify-between w-full rounded-lg border transition-all duration-200 cursor-pointer focus:outline-none",
              sizeClasses[size],
              variantClasses[variant],
              getStatusColor(),
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            {...props}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {multiple && value.length > 0 ? (
                <div className="flex items-center gap-1 flex-wrap">
                  {selectedOptions.slice(0, 3).map((option) => (
                    <div
                      key={option.value}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                    >
                      <span className="truncate max-w-[100px]">{option.label}</span>
                      <button
                        type="button"
                        onClick={(e) => handleRemove(option.value, e)}
                        className="hover:bg-primary/20 rounded p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {value.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{value.length - 3} mais
                    </span>
                  )}
                </div>
              ) : (
                <span className={cn(
                  "truncate",
                  value.length === 0 ? "text-muted-foreground" : "text-foreground"
                )}>
                  {getDisplayText()}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {clearable && value.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 hover:bg-muted/50 rounded"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
              
              {isLoading ? (
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
              ) : (
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )} />
              )}
            </div>
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2 animate-slide-up">
              <div className="bg-popover border border-border rounded-lg shadow-large overflow-hidden max-h-80">
                {searchable && (
                  <div className="p-3 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        ref={searchRef}
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                )}
                
                <div className="max-h-60 overflow-y-auto">
                  {isLoading ? (
                    <div className="px-4 py-6 text-center text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                      Carregando opções...
                    </div>
                  ) : fetchError ? (
                    <div className="px-4 py-6 text-center text-destructive">
                      <AlertCircle className="h-4 w-4 mx-auto mb-2" />
                      Erro ao carregar: {fetchError}
                    </div>
                  ) : filteredOptions.length === 0 ? (
                    <div className="px-4 py-6 text-center text-muted-foreground">
                      Nenhum resultado encontrado
                    </div>
                  ) : (
                    filteredOptions.map((option) => {
                      const isSelected = value.includes(option.value);
                      
                      return (
                        <div
                          key={option.value}
                          role="option"
                          aria-selected={isSelected}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-muted/50",
                            option.disabled && "opacity-50 cursor-not-allowed",
                            isSelected && "bg-primary/10"
                          )}
                          onClick={() => !option.disabled && handleSelect(option.value)}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{option.label}</div>
                            {option.description && (
                              <div className="text-xs text-muted-foreground truncate">
                                {option.description}
                              </div>
                            )}
                          </div>
                          
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary flex-shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

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

ComboBox.displayName = "ComboBox";

export { ComboBox, type ComboOption };