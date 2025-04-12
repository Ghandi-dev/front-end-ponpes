"use client";
import useChangeUrl from "@/hooks/useChangeUrl";
import paymentService from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const usePembayaran = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [status, setStatus] = useState<string[]>();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getPayment = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (status) params += `&status=${status}`;
    if (currentSearch) {
      params += `&fullname=${currentSearch}`;
    }
    const res = await paymentService.getAll(params);
    return res.data;
  };
  const { data: dataPayment, isLoading: isLoadingPayment } = useQuery({
    queryKey: ["payment", currentLimit, currentPage, currentSearch, status],
    queryFn: getPayment,
    enabled: !!currentLimit && !!currentPage,
  });
  return {
    dataPayment,
    selectedId,
    setSelectedId,
    isLoadingPayment,
    status,
    setStatus,
  };
};

export default usePembayaran;
