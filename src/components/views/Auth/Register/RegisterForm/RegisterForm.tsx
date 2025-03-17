"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useRegister from "../useRegister";
import { Eye, EyeClosed } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const RegisterForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const { handleVisiblePassword, visiblePassword, form, handlerSubmit, isPendingRegister } = useRegister();
  const {
    formState: { errors },
    control,
  } = form;
  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(handlerSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-muted-foreground text-sm text-balance">Silahkan isi form dibawah ini</p>
        </div>
        <div className={cn("grid", Object.keys(errors).length > 0 ? "gap-3" : "gap-6")}>
          <FormField
            control={control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
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
                    <Input {...field} type={visiblePassword.password ? "text" : "password"} />
                    <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => handleVisiblePassword("password")}>
                      {visiblePassword.password ? <Eye /> : <EyeClosed />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Masukan Kembali Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type={visiblePassword.confirmPassword ? "text" : "password"} />
                    <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => handleVisiblePassword("confirmPassword")}>
                      {visiblePassword.confirmPassword ? <Eye /> : <EyeClosed />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isPendingRegister ? <Spinner /> : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
