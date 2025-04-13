"use client";
import useChangeUrl from "@/hooks/useChangeUrl";
import paymentService from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const usePembayaran = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [status, setStatus] = useState<string[]>();
  const [type, setType] = useState<string[]>();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getPayment = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (status?.length) params += `&status=${status}`;
    if (type?.length) params += `&type=${type}`;
    if (currentSearch) {
      params += `&fullname=${currentSearch}`;
    }
    const res = await paymentService.getAll(params);
    return res.data;
  };
  const { data: dataPayment, isLoading: isLoadingPayment } = useQuery({
    queryKey: ["payment", currentLimit, currentPage, currentSearch, status, type],
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
    type,
    setType,
  };
};

export default usePembayaran;
