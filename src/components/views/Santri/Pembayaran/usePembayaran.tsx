"use client";
import { SANTRI_STATUS } from "@/constant/status.constant";
import paymentService from "@/services/payment.service";
import { IPaymentRequest } from "@/types/Payment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const usePembayaran = () => {
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

  const updatePayment = async () => {
    if (!orderId || !transactionStatus) {
      throw new Error("orderId or transactionStatus is missing");
    }
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

  const getPayment = async () => {
    const res = await paymentService.getMeRegistration();
    return res.data.data ?? [];
  };

  const {
    data: dataPayment,
    isLoading: isLoadingDataPayment,
    refetch: refetchDataPayment,
  } = useQuery({
    queryKey: ["Payment", isSuccessUpdatePayment],
    queryFn: getPayment,
    staleTime: 0,
  });

  const createPayment = async (type: IPaymentRequest) => {
    const res = await paymentService.createMe(type);
    return res.data.data;
  };
  const {
    mutate: mutateCreatePayment,
    isPending: isPendingCreatePayment,
    isSuccess: isSuccessCreatePayment,
  } = useMutation({
    mutationFn: createPayment,
    onSuccess: (result) => {
      refetchDataPayment();
      const transactionToken = result.detail.token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).snap.pay(transactionToken);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreatePayment = (status: string) => {
    if (status !== SANTRI_STATUS.FILES_COMPLETED) {
      toast.error("Anda belum menyelesaikan tahapan pendaftaran yang diperlukan untuk melakukan pembayaran.");
      return;
    }
    const type = status === SANTRI_STATUS.FILES_COMPLETED ? "registration" : "spp";
    const payload = { type } as IPaymentRequest;
    mutateCreatePayment(payload);
  };

  const handleMidtransSnap = (token: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).snap.pay(token);
  };

  return {
    mutateCreatePayment,
    isPendingCreatePayment,
    isSuccessCreatePayment,
    handleCreatePayment,
    dataPayment,
    isLoadingDataPayment,
    refetchDataPayment,
    handleMidtransSnap,
    isPendingUpdatePayment,
    isSuccessUpdatePayment,
    mutateUpdatePayment,
  };
};

export default usePembayaran;
