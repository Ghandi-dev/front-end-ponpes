"use client";

import { santriDefaultValues, santriSchema, SantriInsertSchemaType } from "@/schemas/santri.schema";
import santriService from "@/services/santri.service";
import { ISantri } from "@/types/Auth";
import { ISantriForm } from "@/types/Santri";
import { toStandardDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useFormDataSantri = () => {
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
    isSuccessUpdateSantri,
    isPendingUpdateSantri,
    handleUpdateSantri,
  };
};

export default useFormDataSantri;
