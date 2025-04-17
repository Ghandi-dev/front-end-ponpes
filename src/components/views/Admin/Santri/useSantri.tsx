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
  const [status, setStatus] = useState<string[]>();
  const { limitParams, pageParams, currentLimit, currentPage, currentSearch } = useChangeUrl();

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
    enabled: !!limitParams && !!pageParams,
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

  const deleteSantri = async (santriId: number) => {
    const res = await santriService.delete(santriId);
    return res.data;
  };

  const { mutate: deleteSantriMutate } = useMutation({
    mutationFn: (santriId: number) => deleteSantri(santriId),
    onSuccess: () => {
      toast.success("Berhasil menghapus santri");
      refetchSantri();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menghapus santri");
    },
  });

  const handleDeleteSantri = () => {
    deleteSantriMutate(selectedId as number);
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
    handleDeleteSantri,
  };
};

export default useSantri;
