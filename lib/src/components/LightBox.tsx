import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightBoxProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const LightBox = React.forwardRef<HTMLDivElement, LightBoxProps>(
  ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    size = "md",
    showCloseButton = true,
    closeOnOverlayClick = true,
    footer,
    className,
    ...props
  }, ref) => {
    const overlayRef = React.useRef<HTMLDivElement>(null);

    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-2xl",
      lg: "max-w-4xl", 
      xl: "max-w-6xl",
      full: "max-w-[95vw] max-h-[95vh]"
    };

    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === overlayRef.current) {
        onClose();
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={handleOverlayClick}
        />
        
        {/* Modal Content */}
        <div
          ref={ref}
          className={cn(
            "relative bg-background border border-border rounded-lg shadow-xl animate-scale-in w-full",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="space-y-1">
                {title && (
                  <h2 className="text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
              
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 max-h-[calc(95vh-200px)] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

LightBox.displayName = "LightBox";

export { LightBox };