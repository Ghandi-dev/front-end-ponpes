"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import useLogin from "../useLogin";
import { Eye, EyeClosed } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const { form, visiblePassword, handleVisiblePassword, handleLogin, isPendingLogin } = useLogin();
  const {
    formState: { errors },
    control,
  } = form;
  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(handleLogin)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Selamat Datang</h1>
          <p className="text-muted-foreground text-sm text-balance">Silahkan login untuk melanjutkan</p>
        </div>
        <div className={cn("grid", Object.keys(errors).length > 0 ? "gap-3" : "gap-6")}>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Masukkan email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type={visiblePassword ? "text" : "password"} />
                    <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => handleVisiblePassword()}>
                      {visiblePassword ? <Eye /> : <EyeClosed />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPendingLogin}>
            {isPendingLogin ? <Spinner /> : "Login"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="underline underline-offset-4 text-primary">
            Daftar
          </Link>
        </div>
      </form>
    </Form>
  );
}
