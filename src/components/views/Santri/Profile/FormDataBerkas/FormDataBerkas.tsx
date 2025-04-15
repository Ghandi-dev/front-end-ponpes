"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FileUploadWithLabel } from "@/components/commons/inputs/FileUploadWithLabel";

import useFormDataBerkas from "./useFormDataBerkas";
import { FileUpdateSchemaType } from "@/schemas/file.schema";

interface PropTypes {
  refetchProfile: () => void;
}

const FormDataBerkas = (props: PropTypes) => {
  const { refetchProfile } = props;
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

  useEffect(() => {
    if (isSuccessUpdateFiles) {
      refetchFiles();
      refetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdateFiles, refetchFiles]);

  return (
    <Card className="p-4 border-none w-fit">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdateFiles)}>
          <div className="flex flex-col items-start gap-2 text-center w-fit">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Data Berkas</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:max-w-[800px]">
            <div className="flex flex-col gap-2">
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
              <FileUploadWithLabel<FileUpdateSchemaType>
                fieldTitle="Akta Kelahiran"
                nameInSchema="birthCertificate"
                label={"Akte Kelahiran"}
                isDropable
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                preview={typeof previewFile.birthCertificate === "string" ? previewFile.birthCertificate : ""}
                onUpload={(files, onChange) => handleUpload("birthCertificate", files, onChange)}
                onDelete={(onChange) => handleDelete("birthCertificate", onChange)}
              />
            </div>
            <div className="flex flex-col gap-2">
              {isLoadingFiles ? (
                <Skeleton className="w-full h-40" />
              ) : (
                <Image className="w-full aspect-[3/4] object-fill" src={dataFiles?.familyCard ?? "/no-image.svg"} alt="preview" width={300} height={300} />
              )}
              <FileUploadWithLabel<FileUpdateSchemaType>
                fieldTitle="Kartu Keluarga"
                nameInSchema="familyCard"
                isDropable
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                preview={typeof previewFile.familyCard === "string" ? previewFile.familyCard : ""}
                onUpload={(files, onChange) => handleUpload("familyCard", files, onChange)}
                onDelete={(onChange) => handleDelete("familyCard", onChange)}
              />
            </div>
            <div className="flex flex-col gap-2">
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
              <FileUploadWithLabel<FileUpdateSchemaType>
                fieldTitle="Ijazah"
                nameInSchema="educationCertificate"
                isDropable
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                preview={typeof previewFile.educationCertificate === "string" ? previewFile.educationCertificate : ""}
                onUpload={(files, onChange) => handleUpload("educationCertificate", files, onChange)}
                onDelete={(onChange) => handleDelete("educationCertificate", onChange)}
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
