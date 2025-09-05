import { toast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export interface ToastOptions {
  /** Toast variant */
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  /** Toast title */
  title?: string;
  /** Toast description */
  description?: string;
  /** Duration in milliseconds (0 = never auto-close) */
  duration?: number;
}

const variantConfig = {
  default: {
    icon: Info,
    className: "",
  },
  destructive: {
    icon: XCircle,
    className: "destructive",
  },
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  },
};

export class Toast {
  /** Show a default toast */
  static show(options: ToastOptions) {
    const { variant = 'default', title, description, duration } = options;
    const config = variantConfig[variant];
    const IconComponent = config.icon;

    return toast({
      variant: variant === 'success' || variant === 'warning' ? 'default' : variant,
      title,
      description: description ? (
        <div className="flex items-center gap-2">
          <IconComponent className="h-4 w-4" />
          {description}
        </div>
      ) : undefined,
      duration,
      className: config.className,
    });
  }

  /** Show a success toast */
  static success(message: string, title?: string) {
    return this.show({
      variant: 'success',
      title: title || 'Success',
      description: message,
    });
  }

  /** Show an error toast */
  static error(message: string, title?: string) {
    return this.show({
      variant: 'destructive',
      title: title || 'Error',
      description: message,
    });
  }

  /** Show a warning toast */
  static warning(message: string, title?: string) {
    return this.show({
      variant: 'warning',
      title: title || 'Warning',
      description: message,
    });
  }

  /** Show an info toast */
  static info(message: string, title?: string) {
    return this.show({
      variant: 'default',
      title: title || 'Info',
      description: message,
    });
  }
}

export const useToastHelper = () => {
  return {
    showToast: Toast.show,
    success: Toast.success,
    error: Toast.error,
    warning: Toast.warning,
    info: Toast.info,
  };
};