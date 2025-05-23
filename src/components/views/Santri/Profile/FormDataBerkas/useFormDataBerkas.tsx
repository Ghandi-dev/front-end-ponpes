"use client";
import useMediaHandling from "@/hooks/useMediaHandling";
import { FileUpdateSchemaType, fileUpdateSchema, FileSchemaType } from "@/schemas/file.schema";
import fileService from "@/services/file.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useFormDataBerkas = () => {
  const pathname = usePathname();
  const { isPendingMutateUploadFile, isPendingMutateDeleteFile, handleDeleteFile, handleUploadFile } = useMediaHandling();

  const getFiles = async () => {
    const res = await fileService.getMe();
    return res.data.data;
  };

  const { data: dataFiles, isLoading: isLoadingFiles, refetch: refetchFiles } = useQuery({ queryKey: ["Files"], queryFn: getFiles, enabled: !!pathname });

  const updateFiles = async (payload: FileUpdateSchemaType | FileSchemaType) => {
    if (!dataFiles) {
      const { data } = await fileService.createMe(payload as FileSchemaType);
      return data.data;
    } else {
      const { data } = await fileService.updateMe(payload);
      return data.data;
    }
  };

  const form = useForm<FileUpdateSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(fileUpdateSchema),
  });

  const {
    mutate: mutateUpdateFiles,
    isPending: isPendingUpdateFiles,
    isSuccess: isSuccessUpdateFiles,
  } = useMutation({
    mutationFn: (payload: FileUpdateSchemaType | FileUpdateSchemaType) => updateFiles(payload),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil disimpan");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const previewFile = {
    birthCertificate: form.watch("birthCertificate"),
    familyCard: form.watch("familyCard"),
    educationCertificate: form.watch("educationCertificate"),
  };

  const fileUrl = {
    birthCertificate: form.getValues("birthCertificate"),
    familyCard: form.getValues("familyCard"),
    educationCertificate: form.getValues("educationCertificate"),
  };

  const handleUpload = (
    fieldName: keyof FileUpdateSchemaType, // Nama field yang akan diperbarui
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        form.setValue(fieldName, fileUrl);
      }
    });
  };

  const handleDelete = (fieldName: keyof FileUpdateSchemaType, onChange: (files: FileList | undefined) => void) => {
    handleDeleteFile(fileUrl[fieldName], () => onChange(undefined));
  };

  const handleUpdateFiles = () => {
    const dataCurrentFiles: FileUpdateSchemaType = dataFiles;
    const payload: FileUpdateSchemaType = {
      birthCertificate: form.getValues("birthCertificate"),
      familyCard: form.getValues("familyCard"),
      educationCertificate: form.getValues("educationCertificate"),
    };
    mutateUpdateFiles(payload);
    if (isSuccessUpdateFiles) {
      handleDeleteFile(dataCurrentFiles?.birthCertificate, () => {});
      handleDeleteFile(dataCurrentFiles?.familyCard, () => {});
      handleDeleteFile(dataCurrentFiles?.educationCertificate, () => {});
    }
  };

  return {
    form,
    previewFile,
    handleUpload,
    handleDelete,
    dataFiles,
    isLoadingFiles,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    isPendingUpdateFiles,
    isSuccessUpdateFiles,
    mutateUpdateFiles,
    handleUpdateFiles,
    refetchFiles,
  };
};

export default useFormDataBerkas;
