"use client";
import useChangeUrl from "@/hooks/useChangeUrl";
import santriService from "@/services/santri.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useSantri = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getSantri = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await santriService.getAll(params);
    return res.data;
  };
  const { data: dataSantri, isLoading: isLoadingSantri } = useQuery({
    queryKey: ["santri", currentLimit, currentPage, currentSearch],
    queryFn: getSantri,
    enabled: !!currentLimit && !!currentPage,
  });
  return {
    dataSantri,
    selectedId,
    setSelectedId,
    isLoadingSantri,
  };
};

export default useSantri;
