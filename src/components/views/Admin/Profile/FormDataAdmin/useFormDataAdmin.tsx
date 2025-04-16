"use client";

import { AdminInsertSchemaType, AdminSelectSchemaType, AdminUpdateSchemaType, adminDefaultValues, adminInsertSchema } from "@/schemas/admin.schema";
import adminServices from "@/services/admin.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useFormDataAdmin = () => {
  const form = useForm<AdminInsertSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(adminInsertSchema),
    defaultValues: adminDefaultValues,
  });

  const updateAdmin = async (payload: AdminUpdateSchemaType) => {
    const { data } = await adminServices.updateMe(payload);
    return data.data as AdminSelectSchemaType;
  };

  const {
    mutate: mutateUpdateAdmin,
    isPending: isPendingUpdateAdmin,
    isSuccess: isSuccessUpdateAdmin,
  } = useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      toast.success("Data santri berhasil diperbarui");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateAdmin = async (data: AdminUpdateSchemaType) => {
    const payload = {
      ...data,
    };

    mutateUpdateAdmin(payload);
  };

  return {
    form,
    isSuccessUpdateAdmin,
    isPendingUpdateAdmin,
    handleUpdateAdmin,
  };
};

export default useFormDataAdmin;
