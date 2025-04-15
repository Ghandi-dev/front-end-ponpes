"use client";

import { santriDefaultValues, santriSchema, SantriInsertSchemaType } from "@/schemas/santri.schema";
import santriService from "@/services/santri.service";
import { ISantri } from "@/types/Auth";
import { ISantriForm } from "@/types/Santri";
import { toStandardDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useFormDataSantri = () => {
  const pathname = usePathname();

  const getSantri = async () => {
    const { data } = await santriService.getMe();
    return data.data;
  };

  const {
    data: dataSantri,
    refetch: refetchSantri,
    isRefetching: isRefetchingSantri,
    isLoading: isLoadingSantri,
  } = useQuery({ queryKey: ["santri"], queryFn: getSantri, enabled: !!pathname });

  const form = useForm<SantriInsertSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(santriSchema),
    defaultValues: santriDefaultValues,
  });

  const updateSantri = async (payload: ISantriForm) => {
    const { data } = await santriService.updateMe(payload);
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
      toast.error(error.message);
    },
  });

  const handleUpdateSantri = async (data: ISantriForm) => {
    const payload = {
      ...data,
      dateOfBirth: toStandardDate(data.dateOfBirth),
    };

    mutateUpdateSantri(payload);
  };

  return {
    form,
    dataSantri,
    isRefetchingSantri,
    isSuccessUpdateSantri,
    isPendingUpdateSantri,
    isLoadingSantri,
    handleUpdateSantri,
  };
};

export default useFormDataSantri;
