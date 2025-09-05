import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";

interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface RadioButtonProps {
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  name: string;
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card";
  className?: string;
}

const RadioButton = React.forwardRef<HTMLDivElement, RadioButtonProps>(
  ({
    options,
    value,
    onValueChange,
    name,
    label,
    error,
    success,
    helper,
    disabled = false,
    orientation = "vertical",
    size = "md",
    variant = "default",
    className,
    ...props
  }, ref) => {
    
    const sizeClasses = {
      sm: {
        radio: "h-4 w-4",
        text: "text-sm",
        spacing: "gap-2"
      },
      md: {
        radio: "h-5 w-5",
        text: "text-sm",
        spacing: "gap-3"
      },
      lg: {
        radio: "h-6 w-6", 
        text: "text-base",
        spacing: "gap-4"
      }
    };

    const handleChange = (optionValue: string) => {
      if (!disabled) {
        onValueChange?.(optionValue);
      }
    };

    return (
      <div className="space-y-3">
        {label && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-foreground">
              {label}
            </label>
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(
            "space-y-3",
            orientation === "horizontal" && "flex flex-wrap gap-4 space-y-0",
            className
          )}
          {...props}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            const isDisabled = disabled || option.disabled;
            
            return (
              <div
                key={option.value}
                className={cn(
                  "flex items-start transition-all duration-200",
                  sizeClasses[size].spacing,
                  variant === "card" && "rounded-lg border p-4 hover:border-border-strong",
                  variant === "card" && isSelected && "border-primary bg-primary/5",
                  variant === "card" && isDisabled && "opacity-50",
                  !isDisabled && "cursor-pointer"
                )}
                onClick={() => !isDisabled && handleChange(option.value)}
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleChange(option.value)}
                    disabled={isDisabled}
                    className="sr-only"
                  />
                  
                  <div className={cn(
                    "border-2 rounded-full transition-all duration-200 flex items-center justify-center",
                    sizeClasses[size].radio,
                    isSelected 
                      ? "border-primary bg-primary" 
                      : "border-border hover:border-border-strong",
                    isDisabled && "cursor-not-allowed opacity-50"
                  )}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground animate-scale-in" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className={cn(
                      "font-medium leading-tight cursor-pointer",
                      sizeClasses[size].text,
                      isDisabled && "cursor-not-allowed"
                    )}
                  >
                    {option.label}
                  </label>
                  
                  {option.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
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

RadioButton.displayName = "RadioButton";

export { RadioButton, type RadioOption };