import React from "react";
import { cn } from "@/lib/utils";
import { Search, AlertCircle, Check } from "lucide-react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "ghost";
  inputSize?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = "text",
    label,
    error,
    success,
    helper,
    leftIcon,
    rightIcon,
    variant = "default",
    inputSize = "md",
    id,
    ...props
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
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

    const getStatusIcon = () => {
      if (error) return <AlertCircle className="h-4 w-4 text-destructive" />;
      if (success) return <Check className="h-4 w-4 text-success" />;
      return rightIcon;
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
            htmlFor={inputId}
            className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex w-full rounded-lg border transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
              sizeClasses[inputSize],
              variantClasses[variant],
              getStatusColor(),
              leftIcon && "pl-10",
              (rightIcon || error || success) && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {(rightIcon || error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getStatusIcon()}
            </div>
          )}
        </div>

        {(helper || error || success) && (
          <p className={cn(
            "text-sm",
            error && "text-destructive",
            success && "text-success",
            !error && !success && "text-muted-foreground"
          )}>
            {error || success || helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };