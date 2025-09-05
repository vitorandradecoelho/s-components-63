import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, AlertCircle } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "ghost";
  className?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({
    options,
    value,
    onValueChange,
    placeholder = "Selecione uma opção",
    label,
    error,
    success,
    helper,
    disabled = false,
    size = "md",
    variant = "default",
    className,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

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

    const selectedOption = options.find(option => option.value === value);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
      onValueChange?.(optionValue);
      setIsOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none text-foreground">
            {label}
          </label>
        )}
        
        <div className="relative" ref={selectRef}>
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
            <span className={cn(
              selectedOption ? "text-foreground" : "text-muted-foreground"
            )}>
              {selectedOption?.label || placeholder}
            </span>
            
            <ChevronDown className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2 animate-slide-up">
              <div className="bg-popover border border-border rounded-lg shadow-large overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={value === option.value}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-muted/50",
                        option.disabled && "opacity-50 cursor-not-allowed",
                        value === option.value && "bg-primary/10 text-primary"
                      )}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                    >
                      <span>{option.label}</span>
                      {value === option.value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
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

Select.displayName = "Select";

export { Select, type SelectOption };