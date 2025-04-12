"use client";
import { SANTRI_STATUS } from "@/constant/status.constant";
import useChangeUrl from "@/hooks/useChangeUrl";
import santriService from "@/services/santri.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useSantri = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [status, setStatus] = useState<string[]>([SANTRI_STATUS.ACTIVE]);
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getSantri = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (status) params += `&status=${status}`;
    if (currentSearch) {
      params += `&fullname=${currentSearch}`;
    }
    const res = await santriService.getAll(params);
    return res.data;
  };
  const { data: dataSantri, isLoading: isLoadingSantri } = useQuery({
    queryKey: ["santri", currentLimit, currentPage, currentSearch, status],
    queryFn: getSantri,
    enabled: !!currentLimit && !!currentPage,
  });
  return {
    dataSantri,
    selectedId,
    setSelectedId,
    isLoadingSantri,
    status,
    setStatus,
  };
};

export default useSantri;
