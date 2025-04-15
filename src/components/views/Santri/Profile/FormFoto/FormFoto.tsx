"use client";
import useFormFoto from "./useFormFoto";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FileUploadWithLabel } from "@/components/commons/inputs/FileUploadWithLabel";

import Image from "next/image";
import { UserPhoto } from "@/schemas/user.schema";
import { IProfile } from "@/types/Auth";
import { useEffect } from "react";

interface PropTypes {
  dataProfile: IProfile | undefined;
  refetchProfile: () => void;
  isLoadingProfile: boolean;
}

const FormFoto = (props: PropTypes) => {
  const { refetchProfile, isLoadingProfile, dataProfile } = props;
  const {
    form,
    preview,
    handleUpload,
    handleDelete,
    handleUpdatePhoto,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    isPendingUpdateUser,
    isSuccessUpdateUser,
  } = useFormFoto();

  useEffect(() => {
    if (isSuccessUpdateUser) {
      refetchProfile();
    }
  }, [isSuccessUpdateUser, refetchProfile]);

  return (
    <Card className="p-4 border-none w-fit">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdatePhoto)}>
          <div className="flex flex-col items-start gap-2 text-center">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Foto</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:max-w-[300px]">
            <div className="flex flex-col gap-2">
              {isLoadingProfile ? (
                <Skeleton className="w-full h-40" />
              ) : (
                <Image
                  className="w-full aspect-[4/4] object-fill"
                  src={(dataProfile?.profilePicture as string) ?? "/no-image.svg"}
                  alt="preview"
                  width={300}
                  height={300}
                />
              )}
              <FileUploadWithLabel<UserPhoto>
                fieldTitle="Foto"
                nameInSchema="profilePicture"
                label={"Akte Kelahiran"}
                isDropable
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                preview={typeof preview === "string" ? preview : ""}
                onUpload={(files, onChange) => handleUpload("profilePicture", files, onChange)}
                onDelete={(onChange) => handleDelete(onChange)}
              />
            </div>
          </div>
          <div className="flex">
            <Button type="submit" className="w-full" disabled={isPendingUpdateUser}>
              {isPendingUpdateUser ? <Spinner /> : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default FormFoto;
