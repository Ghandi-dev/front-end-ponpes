"use client";
import { ILogin } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Masukkan email" }).email("Masukkan email yang valid"),
  password: z.string({ required_error: "Masukkan password" }),
});

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const callbackUrl: string = (searchParams.get("callbackUrl") as string) || "/";

  const handleVisiblePassword = () => setVisiblePassword(!visiblePassword);

  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", { ...payload, redirect: false, callbackUrl });
    if (result?.error && result.status === 401) throw new Error("Email atau password salah");
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      form.reset();
      toast.success("Login berhasil");
      router.push(callbackUrl);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = async (payload: ILogin) => {
    mutateLogin(payload);
  };
  return {
    form,
    visiblePassword,
    handleVisiblePassword,
    handleLogin,
    isPendingLogin,
  };
};

export default useLogin;
