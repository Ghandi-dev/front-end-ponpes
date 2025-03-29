"use client";
import React, { useEffect } from "react";
import useFormDataBerkas from "./useFormDataBerkas";
import InputFile from "@/components/ui/InputFile";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const FormDataBerkas = () => {
  const {
    form,
    previewFile,
    handleUpload,
    handleDelete,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    dataFiles,
    isLoadingFiles,
    isPendingUpdateFiles,
    isSuccessUpdateFiles,
    handleUpdateFiles,
    refetchFiles,
  } = useFormDataBerkas();
  const { control } = form;

  useEffect(() => {
    if (isSuccessUpdateFiles) {
      refetchFiles();
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdateFiles, refetchFiles]);

  return (
    <Card className="p-4 border-none w-fit">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdateFiles)}>
          <div className="flex flex-col items-start gap-2 text-center w-fit">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Form Data Berkas</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 ">
              <FormLabel>Akta Lahir</FormLabel>
              {isLoadingFiles ? (
                <Skeleton className="w-full h-40" />
              ) : (
                <Image
                  className="w-full aspect-[3/4] object-fill"
                  src={dataFiles?.birthCertificate ?? "/no-image.svg"}
                  alt="preview"
                  width={300}
                  height={300}
                />
              )}
              <FormField
                control={control}
                name="birthCertificate"
                defaultValue={""}
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <InputFile
                        {...field}
                        name="test"
                        isDropable
                        onUpload={(files) => handleUpload("birthCertificate", files, onChange)}
                        onDelete={() => handleDelete("birthCertificate", onChange)}
                        isDeleting={isPendingMutateDeleteFile}
                        isUploading={isPendingMutateUploadFile}
                        preview={typeof previewFile.birthCertificate === "string" ? previewFile.birthCertificate : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormLabel>Kartu Keluarga</FormLabel>
              {isLoadingFiles ? (
                <Skeleton className="w-full h-40" />
              ) : (
                <Image className="w-full aspect-[3/4] object-fill" src={dataFiles?.familyCard ?? "/no-image.svg"} alt="preview" width={300} height={300} />
              )}
              <FormField
                control={control}
                name="familyCard"
                defaultValue={""}
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <InputFile
                        {...field}
                        name="test"
                        isDropable
                        onUpload={(files) => handleUpload("familyCard", files, onChange)}
                        onDelete={() => handleDelete("familyCard", onChange)}
                        isDeleting={isPendingMutateDeleteFile}
                        isUploading={isPendingMutateUploadFile}
                        preview={typeof previewFile.familyCard === "string" ? previewFile.familyCard : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormLabel>Ijazah</FormLabel>
              {isLoadingFiles ? (
                <Skeleton className="w-full h-40" />
              ) : (
                <Image
                  className="w-full aspect-[3/4] object-fill"
                  src={dataFiles?.educationCertificate ?? "/no-image.svg"}
                  alt="preview"
                  width={300}
                  height={300}
                />
              )}
              <FormField
                control={control}
                name="educationCertificate"
                defaultValue={""}
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <InputFile
                        {...field}
                        name="test"
                        isDropable
                        onUpload={(files) => handleUpload("educationCertificate", files, onChange)}
                        onDelete={() => handleDelete("educationCertificate", onChange)}
                        isDeleting={isPendingMutateDeleteFile}
                        isUploading={isPendingMutateUploadFile}
                        preview={typeof previewFile.educationCertificate === "string" ? previewFile.educationCertificate : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full lg:max-w-xs" disabled={isPendingUpdateFiles}>
              {isPendingUpdateFiles ? <Spinner /> : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default FormDataBerkas;
