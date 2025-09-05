import React, { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { Check, ChevronDown, X, Search } from "lucide-react";

export interface ComboOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

interface ComboBoxProps {
  options: ComboOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  maxHeight?: string;
  emptyMessage?: string;
  className?: string;
  popoverClassName?: string;
}

const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  ({
    options = [],
    value = [],
    onValueChange,
    placeholder = "Selecione...",
    label,
    error,
    helper,
    disabled = false,
    multiple = false,
    searchable = false,
    clearable = false,
    size = "md",
    maxHeight = "200px",
    emptyMessage = "Nenhuma opção encontrada",
    className,
    popoverClassName,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => containerRef.current!);

    const sizeClasses = {
      sm: "h-8 text-xs px-2",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-4"
    };

    const iconSizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4", 
      lg: "h-5 w-5"
    };

    // Filtrar opções baseado na busca
    const filteredOptions = React.useMemo(() => {
      if (!searchTerm) return options;
      
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm]);

    // Obter opções selecionadas
    const selectedOptions = React.useMemo(() => {
      return options.filter(option => value.includes(option.value));
    }, [options, value]);

    // Fechar dropdown quando clicar fora
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focar no input de busca quando abrir
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Navegação por teclado
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return;

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setFocusedIndex(prev => 
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            event.preventDefault();
            setFocusedIndex(prev => 
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
            break;
          case "Enter":
            event.preventDefault();
            if (focusedIndex >= 0) {
              handleOptionSelect(filteredOptions[focusedIndex]);
            }
            break;
          case "Escape":
            setIsOpen(false);
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredOptions, focusedIndex]);

    const handleOptionSelect = (option: ComboOption) => {
      if (option.disabled) return;

      let newValue: string[];
      
      if (multiple) {
        if (value.includes(option.value)) {
          newValue = value.filter(v => v !== option.value);
        } else {
          newValue = [...value, option.value];
        }
      } else {
        newValue = [option.value];
        setIsOpen(false);
      }

      onValueChange?.(newValue);
    };

    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      onValueChange?.([]);
      setSearchTerm("");
    };

    const handleRemoveOption = (optionValue: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const newValue = value.filter(v => v !== optionValue);
      onValueChange?.(newValue);
    };

    const getDisplayText = () => {
      if (selectedOptions.length === 0) {
        return placeholder;
      }

      if (multiple) {
        if (selectedOptions.length === 1) {
          return selectedOptions[0].label;
        }
        return `${selectedOptions.length} selecionados`;
      }

      return selectedOptions[0].label;
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none text-foreground">
            {label}
          </label>
        )}
        
        <div ref={containerRef} className="relative" {...props}>
          {/* Trigger */}
          <div
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={cn(
              "flex items-center justify-between w-full rounded-md border border-input bg-background transition-colors",
              "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
              sizeClasses[size],
              disabled && "cursor-not-allowed opacity-50",
              !disabled && "cursor-pointer hover:border-border-strong",
              error && "border-destructive focus-within:ring-destructive",
              className
            )}
          >
            <div className="flex-1 flex items-center gap-1 min-w-0">
              {multiple && selectedOptions.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.slice(0, 2).map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveOption(option.value, e)}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="h-2 w-2" />
                      </button>
                    </span>
                  ))}
                  {selectedOptions.length > 2 && (
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                      +{selectedOptions.length - 2}
                    </span>
                  )}
                </div>
              ) : (
                <span className={cn(
                  "truncate",
                  selectedOptions.length === 0 && "text-muted-foreground"
                )}>
                  {getDisplayText()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {clearable && selectedOptions.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className={iconSizeClasses[size]} />
                </button>
              )}
              
              <ChevronDown 
                className={cn(
                  iconSizeClasses[size],
                  "text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )} 
              />
            </div>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div 
              className={cn(
                "absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg",
                popoverClassName
              )}
              style={{ maxHeight: maxHeight }}
            >
              {/* Busca */}
              {searchable && (
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}

              {/* Lista de opções */}
              <div 
                ref={listRef}
                className="max-h-48 overflow-y-auto p-1"
              >
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                    {emptyMessage}
                  </div>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = value.includes(option.value);
                    const isFocused = index === focusedIndex;
                    
                    return (
                      <div
                        key={option.value}
                        onClick={() => handleOptionSelect(option)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded-sm transition-colors",
                          option.disabled && "cursor-not-allowed opacity-50",
                          !option.disabled && "hover:bg-accent hover:text-accent-foreground",
                          isFocused && "bg-accent text-accent-foreground",
                          isSelected && "bg-primary/10 text-primary"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground truncate">
                              {option.description}
                            </div>
                          )}
                        </div>
                        
                        {isSelected && (
                          <Check className="h-4 w-4 text-current ml-2" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {(helper || error) && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

ComboBox.displayName = "ComboBox";

export { ComboBox };