import React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus, AlertCircle } from "lucide-react";

interface CheckBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  helper?: string;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card";
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({
    className,
    label,
    description,
    error,
    success,
    helper,
    indeterminate = false,
    size = "md",
    variant = "default",
    id,
    checked,
    disabled,
    ...props
  }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    const sizeClasses = {
      sm: {
        checkbox: "h-4 w-4",
        text: "text-sm",
        spacing: "gap-2"
      },
      md: {
        checkbox: "h-5 w-5",
        text: "text-sm", 
        spacing: "gap-3"
      },
      lg: {
        checkbox: "h-6 w-6",
        text: "text-base",
        spacing: "gap-4"
      }
    };

    // Handle indeterminate state
    React.useEffect(() => {
      const checkbox = checkboxRef.current;
      if (checkbox) {
        checkbox.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const getCheckboxState = () => {
      if (indeterminate) return "indeterminate";
      if (checked) return "checked";
      return "unchecked";
    };

    const state = getCheckboxState();

    return (
      <div className="space-y-2">
        <div
          className={cn(
            "flex items-start transition-all duration-200",
            sizeClasses[size].spacing,
            variant === "card" && "rounded-lg border p-4 hover:border-border-strong",
            variant === "card" && (checked || indeterminate) && "border-primary bg-primary/5",
            variant === "card" && disabled && "opacity-50",
            !disabled && "cursor-pointer",
            className
          )}
        >
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              id={checkboxId}
              ref={(node) => {
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
                checkboxRef.current = node;
              }}
              checked={checked}
              disabled={disabled}
              className="sr-only"
              {...props}
            />
            
            <div className={cn(
              "border-2 rounded transition-all duration-200 flex items-center justify-center",
              sizeClasses[size].checkbox,
              state === "checked" || state === "indeterminate"
                ? "border-primary bg-primary"
                : "border-border hover:border-border-strong",
              disabled && "cursor-not-allowed opacity-50"
            )}>
              {state === "checked" && (
                <Check className="h-3 w-3 text-primary-foreground animate-scale-in" />
              )}
              {state === "indeterminate" && (
                <Minus className="h-3 w-3 text-primary-foreground animate-scale-in" />
              )}
            </div>
          </div>

          {(label || description) && (
            <div className="flex-1 min-w-0">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    "font-medium leading-tight cursor-pointer",
                    sizeClasses[size].text,
                    disabled && "cursor-not-allowed"
                  )}
                >
                  {label}
                </label>
              )}
              
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
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

CheckBox.displayName = "CheckBox";

export { CheckBox };