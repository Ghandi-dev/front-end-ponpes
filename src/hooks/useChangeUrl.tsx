import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constant/list.constants";
import useDebounce from "./useDebounce";
import { useSearchParams, useRouter } from "next/navigation";

const useChangeUrl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounce = useDebounce();

  const currentLimit = searchParams.get("limit") ?? LIMIT_DEFAULT;
  const currentPage = searchParams.get("page") ?? PAGE_DEFAULT;
  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentIsOnline = searchParams.get("isOnline") ?? "";
  const currentIsFeatured = searchParams.get("isFeatured") ?? "";

  const updateParams = (params: Record<string, string | number>) => {
    const url = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === "") {
        url.delete(key);
      } else {
        url.set(key, `${value}`);
      }
    });

    router.push(`?${url.toString()}`);
  };

  const setUrl = () => {
    updateParams({
      limit: currentLimit,
      page: currentPage,
      search: currentSearch,
    });
  };

  const setUrlExplore = () => {
    updateParams({
      limit: currentLimit,
      page: currentPage,
      category: currentCategory,
      isOnline: currentIsOnline,
      isFeatured: currentIsFeatured,
    });
  };

  const handleChangePage = (page: number) => {
    updateParams({ page: String(page) });
  };

  const handleChangeLimit = (value: string) => {
    debounce(() => {
      updateParams({ limit: value, page: PAGE_DEFAULT });
    }, DELAY);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      updateParams({ search, page: PAGE_DEFAULT });
    }, DELAY);
  };

  const handleClearSearch = () => {
    updateParams({ search: "", page: PAGE_DEFAULT });
  };

  const handleChangeCategory = (category: string) => {
    updateParams({ category, page: PAGE_DEFAULT });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    updateParams({ isOnline, page: PAGE_DEFAULT });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    updateParams({ isFeatured, page: PAGE_DEFAULT });
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    setUrl,
    setUrlExplore,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    handleClearSearch,
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
  };
};

export default useChangeUrl;
