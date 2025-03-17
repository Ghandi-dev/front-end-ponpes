"use client";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { toast } from "sonner";

const validatePassword = z
  .string({ required_error: "Masukkan password" })
  .min(6, "Password harus memiliki minimal 6 karakter")
  .regex(/[A-Z]/, "Password harus memiliki minimal 1 huruf kapital")
  .regex(/\d/, "Password harus memiliki minimal 1 angka");

const registerSchema = z
  .object({
    email: z.string({ required_error: "Masukkan email" }).email("Masukkan email yang valid"),
    password: validatePassword,
    confirmPassword: z.string({ required_error: "Masukkan konfirmasi password" }),
    fullname: z.string({ required_error: "Masukkan nama lengkap" }).trim().min(1, "Nama lengkap tidak boleh kosong"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

const useRegister = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({ ...visiblePassword, [key]: !visiblePassword[key] });
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullname: "", email: "", password: "", confirmPassword: "" },
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      form.reset();
      toast.success("Register berhasil");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlerSubmit = (data: IRegister) => {
    mutateRegister(data);
  };

  return {
    handleVisiblePassword,
    visiblePassword,
    form,
    handlerSubmit,
    isPendingRegister,
  };
};

export default useRegister;
