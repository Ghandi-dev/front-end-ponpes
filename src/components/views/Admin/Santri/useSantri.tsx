"use client";
import { SANTRI_STATUS } from "@/constant/status.constant";
import useChangeUrl from "@/hooks/useChangeUrl";
import { SantriSelectSchemaType } from "@/schemas/santri.schema";
import santriService from "@/services/santri.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

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
  const {
    data: dataSantri,
    isLoading: isLoadingSantri,
    refetch: refetchSantri,
  } = useQuery({
    queryKey: ["santri", currentLimit, currentPage, currentSearch, status],
    queryFn: getSantri,
    enabled: !!currentLimit && !!currentPage,
  });

  const activateSantri = async (santriId: number, payload: Partial<SantriSelectSchemaType>) => {
    const res = await santriService.update(santriId, payload);
    return res.data;
  };

  const { mutate: activateSantriMutate, isPending: isPendingActivate } = useMutation({
    mutationFn: ({ santriId, payload }: { santriId: number; payload: Partial<SantriSelectSchemaType> }) => activateSantri(santriId, payload),
    onSuccess: () => {
      toast.success("Berhasil mengaktifkan santri");
      refetchSantri();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal mengaktifkan santri");
    },
  });

  const handleActivateSantri = (santriId: number) => {
    const payload: Partial<SantriSelectSchemaType> = {
      status: SANTRI_STATUS.ACTIVE as string,
    };
    activateSantriMutate({ santriId, payload });
  };
  return {
    dataSantri,
    selectedId,
    setSelectedId,
    isLoadingSantri,
    status,
    setStatus,
    isPendingActivate,
    handleActivateSantri,
  };
};

export default useSantri;
