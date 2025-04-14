"use client";
import useChangeUrl from "@/hooks/useChangeUrl";
import paymentService from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import { endOfMonth, startOfMonth } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const usePembayaran = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [status, setStatus] = useState<string[]>();
  const [type, setType] = useState<string[]>();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()), // Tanggal pertama bulan ini
    to: endOfMonth(new Date()), // Tanggal terakhir bulan ini
  });

  const getPayment = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (status?.length) params += `&status=${status}`;
    if (type?.length) params += `&type=${type}`;
    if (currentSearch) {
      params += `&fullname=${currentSearch}`;
    }
    if (date?.from && date?.to) {
      // Menambahkan filter tanggal dalam parameter
      params += `&fromDate=${date.from.toISOString()}&toDate=${date.to.toISOString()}`;
    }
    const res = await paymentService.getAll(params);
    return res.data;
  };

  const { data: dataPayment, isLoading: isLoadingPayment } = useQuery({
    queryKey: ["payment", currentLimit, currentPage, currentSearch, status, type, date],
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
    date,
    setDate,
  };
};

export default usePembayaran;
