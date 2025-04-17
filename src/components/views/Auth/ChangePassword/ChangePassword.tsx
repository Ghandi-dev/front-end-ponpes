"use client";
import React from "react";
import useChangePassword from "./useChangePassword";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { UpdatePasswordSchemaType } from "@/schemas/user.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { InputPasswordWithLabel } from "@/components/commons/inputs/InputPasswordWithLabel";

const ChangePassword = () => {
  const { form, isPendingUpdatePassword, handleUpdatePassword } = useChangePassword();
  return (
    <div className="flex flex-col items-center w-full h-screen bg-background gap-4">
      <Alert className="border-dashed border-primary">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          <ul>
            <li className="list-disc">Password minimal 6 karakter</li>
            <li className="list-disc">Password harus mengandung huruf besar, huruf kecil, angka</li>
          </ul>
        </AlertDescription>
      </Alert>
      <Card className="p-4 border-none w-full lg:flex items-center h-fit">
        <Form {...form}>
          <form className="flex flex-col gap-6 w-full lg:w-xl" onSubmit={form.handleSubmit(handleUpdatePassword)}>
            <div className="flex flex-col items-start gap-2 text-center w-fit">
              <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Form Ubah Password</h1>
            </div>
            <div className={cn("flex flex-col", Object.keys(form.formState.errors).length > 0 ? "gap-3" : "gap-6")}>
              <InputPasswordWithLabel<UpdatePasswordSchemaType> fieldTitle="Password Lama" nameInSchema="oldPassword" />
              <InputPasswordWithLabel<UpdatePasswordSchemaType> fieldTitle="Password Baru" nameInSchema="password" />
              <InputPasswordWithLabel<UpdatePasswordSchemaType> fieldTitle="Konfirmasi Password Baru" nameInSchema="confirmPassword" />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="w-full md:w-auto" disabled={isPendingUpdatePassword}>
                {isPendingUpdatePassword ? <Spinner /> : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
