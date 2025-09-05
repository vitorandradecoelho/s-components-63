import React from 'react';
import { Alert as AlertUI, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlertProps {
  /** Alert variant */
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  /** Alert title */
  title?: string;
  /** Alert description/content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Show icon based on variant */
  showIcon?: boolean;
}

const variantIcons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertTriangle,
};

const variantStyles = {
  default: "",
  destructive: "",
  success: "border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600",
  warning: "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600",
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  title,
  children,
  className,
  showIcon = true,
}) => {
  const IconComponent = variantIcons[variant];

  return (
    <AlertUI 
      variant={variant === 'success' || variant === 'warning' ? 'default' : variant}
      className={cn(variantStyles[variant], className)}
    >
      {showIcon && <IconComponent className="h-4 w-4" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        {children}
      </AlertDescription>
    </AlertUI>
  );
};