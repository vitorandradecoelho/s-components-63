import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  sortKey?: keyof T;
  sortDirection?: "asc" | "desc";
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  variant?: "default" | "striped" | "bordered";
  size?: "sm" | "md" | "lg";
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  sortKey,
  sortDirection,
  onSort,
  loading = false,
  emptyMessage = "Nenhum dado encontrado",
  className,
  variant = "default",
  size = "md",
}: DataTableProps<T>) => {
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base"
  };

  const paddingClasses = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4"
  };

  const handleSort = (key: keyof T) => {
    if (!onSort) return;
    
    const newDirection = sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, newDirection);
  };

  const getSortIcon = (columnKey: keyof T) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  const getAlignmentClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); 
           i <= Math.min(totalPages - 1, currentPage + delta); 
           i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} resultados
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange?.(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange?.(page)}
                disabled={page === '...'}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm transition-colors",
                  page === currentPage 
                    ? "bg-primary text-primary-foreground" 
                    : page === '...' 
                      ? "cursor-default" 
                      : "hover:bg-muted/50"
                )}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onPageChange?.(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          {[...Array(pageSize)].map((_, i) => (
            <div key={i} className="h-16 bg-muted/50 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn(
              "bg-muted/50",
              variant === "bordered" && "border-b"
            )}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "font-medium text-muted-foreground",
                      paddingClasses[size],
                      sizeClasses[size],
                      getAlignmentClass(column.align),
                      column.width && `w-[${column.width}]`,
                      column.sortable && "cursor-pointer hover:text-foreground transition-colors"
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length}
                    className={cn(
                      "text-center text-muted-foreground py-12",
                      sizeClasses[size]
                    )}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                currentData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "hover:bg-muted/25 transition-colors",
                      variant === "striped" && rowIndex % 2 === 0 && "bg-muted/10",
                      variant === "bordered" && "border-b"
                    )}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn(
                          paddingClasses[size],
                          sizeClasses[size],
                          getAlignmentClass(column.align)
                        )}
                      >
                        {column.render 
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? '')
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {renderPagination()}
      </div>
    </div>
  );
};

DataTable.displayName = "DataTable";

export { DataTable, type TableColumn };