"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/date-picker";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import useFormDataSantri from "./useFormDataSantri";

const FormDataSantri = () => {
  const { form, dataSantri, isPendingUpdateSantri, handleUpdateSantri } = useFormDataSantri();

  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (dataSantri) {
      setValue("fullname", dataSantri.fullname);
      setValue("placeOfBirth", dataSantri.placeOfBirth);
      setValue("dateOfBirth", new Date(dataSantri.dateOfBirth));
      setValue("gender", dataSantri.gender);
      setValue("schoolOrigin", dataSantri.schoolOrigin);
      setValue("nisn", dataSantri.nisn);
      setValue("nik", dataSantri.nik);
      setValue("familyCardNumber", dataSantri.familyCardNumber);
      setValue("nationality", dataSantri.nationality);
      setValue("phoneNumber", dataSantri.phoneNumber);
    }
  }, [dataSantri, setValue]);

  return (
    <Card className="p-4 border-none">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdateSantri)}>
          <div className="flex flex-col items-start gap-2 text-center w-fit">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Form Data Santri</h1>
          </div>

          <div className={cn("grid grid-cols-1 lg:grid-cols-4 items-start", Object.keys(errors).length > 0 ? "gap-3" : "gap-6")}>
            <FormField
              control={control}
              name="fullname"
              defaultValue={dataSantri?.fullname || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukan nama lengkap" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="placeOfBirth"
              defaultValue={dataSantri?.placeOfBirth || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat Lahir</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukan tempat lahir" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="dateOfBirth"
              // defaultValue={new Date()}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <DatePicker onSelect={field.onChange} selected={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="gender"
              defaultValue={dataSantri?.gender || "male"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent className="border-primary">
                        <SelectGroup>
                          <SelectLabel>Jenis Kelamin</SelectLabel>
                          <SelectItem value="male">Laki-Laki</SelectItem>
                          <SelectItem value="female">Perempuan</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="schoolOrigin"
              defaultValue={dataSantri?.schoolOrigin || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Asal Sekolah</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              defaultValue={dataSantri?.phoneNumber || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Handphone</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nisn"
              defaultValue={dataSantri?.nisn || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NISN</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nik"
              defaultValue={dataSantri?.nik || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="familyCardNumber"
              defaultValue={dataSantri?.familyCardNumber || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nationality"
              defaultValue={dataSantri?.nationality || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kewarganegaraan</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default FormDataSantri;
