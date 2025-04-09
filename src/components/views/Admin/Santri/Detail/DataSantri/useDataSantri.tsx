"use client";

import { santriDefaultValues, santriSchema, SantriInsertSchemaType } from "@/schemas/santri.schema";
import santriService from "@/services/santri.service";
import { ISantri } from "@/types/Auth";
import { toStandardDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useDataSantri = () => {
  const params = useParams();
  const id = Number(params.id);
  const pathname = usePathname();

  const form = useForm<SantriInsertSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(santriSchema),
    defaultValues: santriDefaultValues,
  });

  const getSantri = async (id: number) => {
    const { data } = await santriService.getById(id);
    return data.data;
  };

  const {
    data: dataSantri,
    refetch: refetchSantri,
    isRefetching: isRefetchingSantri,
    isLoading: isLoadingSantri,
  } = useQuery({
    queryKey: ["santri", id],
    queryFn: () => getSantri(id),
    enabled: !!id && !!pathname,
  });

  const updateSantri = async ({ id, payload }: { id: number; payload: SantriInsertSchemaType }) => {
    const { data } = await santriService.update(id, payload);
    return data.data as ISantri;
  };

  const {
    mutate: mutateUpdateSantri,
    isPending: isPendingUpdateSantri,
    isSuccess: isSuccessUpdateSantri,
  } = useMutation({
    mutationFn: updateSantri,
    onSuccess: () => {
      toast.success("Data santri berhasil diperbarui");
      refetchSantri();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal memperbarui data");
    },
  });

  const handleUpdateSantri = (data: SantriInsertSchemaType) => {
    const payload = {
      ...data,
      dateOfBirth: toStandardDate(data.dateOfBirth),
    };

    mutateUpdateSantri({ id, payload });
  };

  return {
    form,
    dataSantri,
    refetchSantri,
    isRefetchingSantri,
    isSuccessUpdateSantri,
    isPendingUpdateSantri,
    isLoadingSantri,
    handleUpdateSantri,
  };
};

export default useDataSantri;
