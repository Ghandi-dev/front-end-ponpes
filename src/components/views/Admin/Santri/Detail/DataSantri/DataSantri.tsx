"use client";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import useFormDataSantri from "./useDataSantri";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { SantriInsertSchemaType } from "@/schemas/santri.schema";
import { InputDateWithLabel } from "@/components/commons/inputs/InputDateWithLabel";
import { SelectWithLabel } from "@/components/commons/inputs/SelectWithLabel";

const DataSantri = () => {
  const { form, dataSantri, isPendingUpdateSantri, handleUpdateSantri, isSuccessUpdateSantri } = useFormDataSantri();

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    if (dataSantri) {
      form.reset({ ...dataSantri, dateOfBirth: new Date(dataSantri.dateOfBirth) });
    }
  }, [isSuccessUpdateSantri, dataSantri, form]);

  return (
    <Card className="p-4 border-none">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdateSantri)}>
          <div className="flex flex-col items-start gap-2 text-center w-fit">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Form Data Santri</h1>
          </div>

          <div className={cn("grid grid-cols-1 lg:grid-cols-4 items-start", Object.keys(errors).length > 0 ? "gap-3" : "gap-6")}>
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="Nama Lengkap" nameInSchema="fullname" />
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="Tempat Lahir" nameInSchema="placeOfBirth" />
            <InputDateWithLabel<SantriInsertSchemaType> fieldTitle="Tanggal Lahir" nameInSchema="dateOfBirth" />
            <SelectWithLabel<SantriInsertSchemaType>
              fieldTitle="Jenis Kelamin"
              nameInSchema="gender"
              options={[
                { value: "male", label: "Laki-Laki" },
                { value: "female", label: "Perempuan" },
              ]}
            />
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="Asal Sekolah" nameInSchema="schoolOrigin" />
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="No Handphone" nameInSchema="phoneNumber" />
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="NISN" nameInSchema="nisn" />
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="NIK" nameInSchema="nik" />
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="No Kartu Keluarga" nameInSchema="familyCardNumber" />
            <InputWithLabel<SantriInsertSchemaType> fieldTitle="Kewarganegaraan" nameInSchema="nationality" />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full lg:max-w-xs" disabled={isPendingUpdateSantri}>
              {isPendingUpdateSantri ? <Spinner /> : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default DataSantri;
