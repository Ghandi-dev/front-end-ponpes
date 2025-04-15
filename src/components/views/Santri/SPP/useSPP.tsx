"use client";
import { TYPE_PAYMENT } from "@/constant/status.constant";
import useChangeUrl from "@/hooks/useChangeUrl";
import paymentService from "@/services/payment.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

const useSPP = () => {
  const searchParams = useSearchParams();

  // Ambil parameter dari URL
  const orderId = searchParams.get("order_id");
  const transactionStatus = searchParams.get("transaction_status");

  const standardizeStatus = (status: string) => {
    switch (status) {
      case "settlement":
        return "completed";
      case "pending":
        return "pending";
      case "cancel":
        return "cancelled";
      default:
        return status;
    }
  };

  const [selectedId, setSelectedId] = useState<number>();
  const [status, setStatus] = useState<string[]>();
  const [type, setType] = useState<string[]>([TYPE_PAYMENT.SPP]);
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(addDays(new Date(), -30).setHours(0, 0, 0, 0)),
    to: new Date(new Date().setHours(23, 59, 59, 999)),
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
    const res = await paymentService.getMe(params);
    return res.data;
  };

  const {
    data: dataPayment,
    isLoading: isLoadingPayment,
    refetch: refetchDataPayment,
  } = useQuery({
    queryKey: ["payment", currentLimit, currentPage, currentSearch, status, type, date],
    queryFn: getPayment,
    enabled: !!currentLimit && !!currentPage,
  });

  const updatePayment = async () => {
    if (!orderId || !transactionStatus) {
      throw new Error("orderId or transactionStatus is missing");
    }
    console.log("orderId", orderId);
    console.log("transactionStatus", transactionStatus);

    const res = await paymentService.updateStatus(orderId, standardizeStatus(transactionStatus));
    return res.data;
  };

  const {
    mutate: mutateUpdatePayment,
    isPending: isPendingUpdatePayment,
    isSuccess: isSuccessUpdatePayment,
  } = useMutation({
    mutationFn: updatePayment,
    onSuccess: () => {
      refetchDataPayment();
      toast.success("Berhasil memperbarui status pembayaran");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleMidtransSnap = (token: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).snap.pay(token);
  };

  return {
    dataPayment,
    selectedId,
    setSelectedId,
    mutateUpdatePayment,
    isPendingUpdatePayment,
    isSuccessUpdatePayment,
    isLoadingPayment,
    handleMidtransSnap,
    status,
    setStatus,
    type,
    setType,
    date,
    setDate,
    orderId,
    transactionStatus,
  };
};

export default useSPP;
