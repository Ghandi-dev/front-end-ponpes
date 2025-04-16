"use client";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import useFormDataAdmin from "./useFormDataAdmin";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { AdminUpdateSchemaType } from "@/schemas/admin.schema";

interface PropTypes {
  refetchProfile: () => void;
  dataAdmin: AdminUpdateSchemaType | undefined;
  isLoadingProfile: boolean;
}

const FormDataAdmin = (props: PropTypes) => {
  const { refetchProfile, isLoadingProfile, dataAdmin } = props;
  const { form, isSuccessUpdateAdmin, isPendingUpdateAdmin, handleUpdateAdmin } = useFormDataAdmin();

  const {
    formState: { errors },
  } = form;

  // 1. Reset form hanya saat dataAdmin berubah
  useEffect(() => {
    if (dataAdmin) {
      form.reset({ ...dataAdmin, phoneNumber: dataAdmin.phoneNumber ?? "" });
    }
  }, [dataAdmin, form]);

  // 2. Refetch profile hanya saat update sukses
  useEffect(() => {
    if (isSuccessUpdateAdmin) {
      refetchProfile();
    }
  }, [isSuccessUpdateAdmin, refetchProfile]);

  return (
    <Card className="p-4 border-none w-fit">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdateAdmin)}>
          <div className="flex flex-col items-start gap-2 text-center w-fit">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Data Admin</h1>
          </div>

          <div className={cn("grid grid-cols-1 lg:grid-cols-2 items-start", Object.keys(errors).length > 0 ? "gap-3" : "gap-6")}>
            <InputWithLabel<AdminUpdateSchemaType> fieldTitle="Nama Lengkap" nameInSchema="fullname" />
            <InputWithLabel<AdminUpdateSchemaType> fieldTitle="Nomor Telepon" nameInSchema="phoneNumber" />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full lg:max-w-xs" disabled={isPendingUpdateAdmin || isLoadingProfile}>
              {isPendingUpdateAdmin ? <Spinner /> : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default FormDataAdmin;
