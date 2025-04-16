import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import useChangeUrl from "@/hooks/useChangeUrl";
import { LIMIT_LIST } from "@/constant/list.constants";
import { DynamicPagination } from "../commons/dynamic-pagination/DynamicPagination";

interface PropTypes<S extends { id: string | number }> {
  columns: Record<string, unknown>[];
  data: S[];
  emptyContent: string;
  isLoading?: boolean;
  renderCell: (item: S, columnKey: string) => ReactNode;
  totalPages: number;
  showLimit?: boolean;
  topContent?: ReactNode;
}

const DataTable = <S extends { id: string | number }>(props: PropTypes<S>) => {
  const { currentLimit, currentPage, handleChangeLimit, handleChangePage } = useChangeUrl();

  const { columns, data, emptyContent, isLoading, renderCell, totalPages, showLimit = true, topContent } = props;

  const bottomContent = useMemo(
    () => (
      <div className="flex items-center justify-center lg:justify-between">
        {showLimit && (
          <Select value={String(currentLimit)} onValueChange={handleChangeLimit}>
            <SelectTrigger className="max-w-36 lg:flex">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              {LIMIT_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {totalPages >= 1 && <DynamicPagination currentPage={+currentPage} onChange={handleChangePage} totalPages={totalPages} />}
      </div>
    ),
    [currentLimit, currentPage, handleChangeLimit, handleChangePage, totalPages]
  );

  return (
    <div className="space-y-4">
      {topContent}
      <div className={cn("overflow-x-auto w-full border rounded-xl", { "opacity-60 pointer-events-none": isLoading })}>
        <Table>
          <TableHeader className="bg-primary text-primary-foreground">
            <TableRow>
              {columns.map((column) => (
                <TableHead className="text-primary-foreground font-bold" key={column.uid as string}>
                  {column.name as string}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {emptyContent}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id as string}>
                  {columns.map((column) => (
                    <TableCell key={column.uid as string}>{renderCell(item, column.uid as string)}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {bottomContent}
    </div>
  );
};

export default DataTable;
