"use client";
import { updatePasswordSchema, UpdatePasswordSchemaType } from "@/schemas/user.schema";
import authServices from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChangePassword = () => {
  const updatePassword = async (payload: UpdatePasswordSchemaType) => {
    const { data } = await authServices.updatePassword(payload);
    return data.data;
  };

  const form = useForm<UpdatePasswordSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingUpdatePassword,
    isSuccess: isSuccessUpdatePassword,
  } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil disimpan");
      signOut({ callbackUrl: "/auth/login" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdatePassword = () => {
    const payload = form.getValues();
    mutateUpdatePassword(payload);
  };

  return {
    form,
    mutateUpdatePassword,
    isPendingUpdatePassword,
    isSuccessUpdatePassword,
    handleUpdatePassword,
  };
};

export default useChangePassword;
