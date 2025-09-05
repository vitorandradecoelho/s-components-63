import React, { useState, useMemo } from "react";
import { cn } from "../lib/utils";
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";

export interface TableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: {
    pageSize?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: boolean;
  };
  loading?: boolean;
  className?: string;
  rowClassName?: (record: T, index: number) => string;
  onRowClick?: (record: T, index: number) => void;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  hover?: boolean;
  striped?: boolean;
  emptyText?: string;
}

type SortOrder = "asc" | "desc" | null;

interface SortConfig {
  key: string;
  order: SortOrder;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  pagination = { pageSize: 10 },
  loading = false,
  className,
  rowClassName,
  onRowClick,
  size = "md",
  bordered = false,
  hover = true,
  striped = false,
  emptyText = "Nenhum dado disponível",
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination.pageSize || 10);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  };

  const cellPaddingClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-2",
    lg: "px-4 py-3"
  };

  // Ordenação
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      
      if (sortConfig.order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, sortConfig]);

  // Paginação
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;

    setSortConfig((current) => {
      if (current?.key === column.key) {
        if (current.order === "asc") {
          return { key: column.key, order: "desc" };
        } else if (current.order === "desc") {
          return null;
        }
      }
      return { key: column.key, order: "asc" };
    });
  };

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    if (sortConfig?.key === column.key) {
      return sortConfig.order === "asc" ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      );
    }

    return <ChevronDown className="w-4 h-4 opacity-30" />;
  };

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getCellValue = (column: TableColumn<T>, record: T, index: number) => {
    const value = record[column.key];
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    return value;
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className={cn(
          "w-full table-auto",
          sizeClasses[size],
          bordered && "border border-border"
        )}>
          {/* Cabeçalho */}
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    cellPaddingClasses[size],
                    "font-medium text-muted-foreground",
                    getAlignmentClass(column.align),
                    column.sortable && "cursor-pointer hover:bg-muted/70 transition-colors",
                    column.className
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-1">
                    <span>{column.title}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Corpo */}
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length}
                  className={cn(
                    cellPaddingClasses[size],
                    "text-center text-muted-foreground"
                  )}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b border-border/50",
                    hover && "hover:bg-muted/30 transition-colors",
                    striped && index % 2 === 1 && "bg-muted/20",
                    onRowClick && "cursor-pointer",
                    rowClassName?.(record, index)
                  )}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        cellPaddingClasses[size],
                        getAlignmentClass(column.align),
                        column.className
                      )}
                    >
                      {getCellValue(column, record, startIndex + index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {pagination.showTotal && (
              <span>
                Mostrando {startIndex + 1} a {Math.min(endIndex, totalItems)} de {totalItems} registros
              </span>
            )}
            
            {pagination.showSizeChanger && (
              <div className="flex items-center gap-2">
                <span>Por página:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-2 py-1 border border-border rounded bg-background"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Primeira página */}
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Página anterior */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Números das páginas */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (pageNumber > totalPages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={cn(
                    "px-3 py-1 text-sm rounded transition-colors",
                    currentPage === pageNumber
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Próxima página */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Última página */}
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>

            {pagination.showQuickJumper && (
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm">Ir para:</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  className="w-16 px-2 py-1 text-sm border border-border rounded bg-background"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const page = parseInt((e.target as HTMLInputElement).value);
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { DataTable };