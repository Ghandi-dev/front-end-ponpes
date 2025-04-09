import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const DynamicPagination = ({ currentPage, totalPages, onChange }: Props) => {
  const getPages = () => {
    const pages = [];
    const range = 1; // jumlah halaman sebelum dan sesudah currentPage

    const start = Math.max(currentPage - range, 1);
    const end = Math.min(currentPage + range, totalPages);

    if (start > 1) pages.push("start-ellipsis");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) pages.push("end-ellipsis");

    return pages;
  };

  return (
    <Pagination className="flex justify-end ">
      <PaginationContent>
        <PaginationItem className="hover:cursor-alias">
          <PaginationPrevious onClick={() => onChange(Math.max(currentPage - 1, 1))} aria-disabled={currentPage === 1} />
        </PaginationItem>

        {getPages().map((item, index) =>
          item === "start-ellipsis" || item === "end-ellipsis" ? (
            <PaginationItem key={item + index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink isActive={item === currentPage} onClick={() => onChange(Number(item))}>
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem className="hover:cursor-alias">
          <PaginationNext onClick={() => onChange(Math.min(currentPage + 1, totalPages))} aria-disabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
