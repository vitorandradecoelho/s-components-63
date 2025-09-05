import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  HelpCircle,
  X
} from 'lucide-react';

export type SweetAlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

export interface SweetAlertOptions {
  title?: string;
  text?: string;
  type?: SweetAlertType;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCloseButton?: boolean;
  allowOutsideClick?: boolean;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  reverseButtons?: boolean;
  customClass?: string;
  width?: string;
  onConfirm?: (inputValue?: string) => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface SweetAlertProps extends SweetAlertOptions {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  question: HelpCircle,
};

const typeColors = {
  success: 'text-green-500',
  error: 'text-red-500', 
  warning: 'text-yellow-500',
  info: 'text-blue-500',
  question: 'text-purple-500',
};

const typeBgColors = {
  success: 'bg-green-50 dark:bg-green-950/20',
  error: 'bg-red-50 dark:bg-red-950/20',
  warning: 'bg-yellow-50 dark:bg-yellow-950/20', 
  info: 'bg-blue-50 dark:bg-blue-950/20',
  question: 'bg-purple-50 dark:bg-purple-950/20',
};

export const SweetAlert: React.FC<SweetAlertProps> = ({
  isOpen,
  onOpenChange,
  title = 'Are you sure?',
  text,
  type = 'question',
  showCancelButton = true,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  showCloseButton = true,
  allowOutsideClick = true,
  showInput = false,
  inputPlaceholder = '',
  inputValue = '',
  reverseButtons = false,
  customClass = '',
  width = 'max-w-md',
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState(inputValue);
  const [isLoading, setIsLoading] = useState(false);

  const Icon = typeIcons[type];

  const handleConfirm = useCallback(async () => {
    if (onConfirm) {
      try {
        setIsLoading(true);
        await onConfirm(showInput ? inputVal : undefined);
        onOpenChange(false);
      } catch (error) {
        console.error('SweetAlert confirm error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      onOpenChange(false);
    }
  }, [onConfirm, inputVal, showInput, onOpenChange]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  }, [onCancel, onOpenChange]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    onOpenChange(false);
  }, [onClose, onOpenChange]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open && allowOutsideClick) {
      handleClose();
    }
  }, [allowOutsideClick, handleClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={cn(
          'sm:max-w-md',
          width,
          typeBgColors[type],
          customClass,
          !showCloseButton && '[&>button]:hidden'
        )}
      >
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'bg-background shadow-md'
            )}>
              <Icon className={cn('w-8 h-8', typeColors[type])} />
            </div>
          </div>
          
          <DialogTitle className="text-xl font-semibold text-center">
            {title}
          </DialogTitle>
          
          {text && (
            <DialogDescription className="text-center text-muted-foreground">
              {text}
            </DialogDescription>
          )}

          {showInput && (
            <div className="pt-2">
              <Input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={inputPlaceholder}
                className="text-center"
              />
            </div>
          )}
        </DialogHeader>

        <DialogFooter className={cn(
          'flex gap-2 pt-4',
          reverseButtons ? 'flex-row-reverse' : 'flex-row',
          showCancelButton ? 'sm:justify-center' : 'sm:justify-center'
        )}>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              'min-w-[100px]',
              type === 'error' && 'bg-red-500 hover:bg-red-600',
              type === 'success' && 'bg-green-500 hover:bg-green-600',
              type === 'warning' && 'bg-yellow-500 hover:bg-yellow-600',
              type === 'info' && 'bg-blue-500 hover:bg-blue-600',
              type === 'question' && 'bg-purple-500 hover:bg-purple-600'
            )}
          >
            {isLoading ? 'Loading...' : confirmButtonText}
          </Button>
          
          {showCancelButton && (
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {cancelButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Hook para facilitar o uso
export const useSweetAlert = () => {
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    options: SweetAlertOptions;
  }>({
    isOpen: false,
    options: {}
  });

  const fire = useCallback((options: SweetAlertOptions) => {
    setAlert({
      isOpen: true,
      options
    });
  }, []);

  const close = useCallback(() => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  }, []);

  const SweetAlertComponent = useCallback(() => (
    <SweetAlert
      isOpen={alert.isOpen}
      onOpenChange={(open) => setAlert(prev => ({ ...prev, isOpen: open }))}
      {...alert.options}
    />
  ), [alert]);

  return {
    fire,
    close,
    SweetAlert: SweetAlertComponent
  };
};

export default SweetAlert;