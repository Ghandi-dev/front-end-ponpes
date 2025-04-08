"use client";
import useMediaHandling from "@/hooks/useMediaHandling";
import { fileDefaultValues, fileSchema, FileSchemaType } from "@/schemas/file.schema";
import fileService from "@/services/file.service";
import { IFile } from "@/types/File";
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

  const updateFiles = async (payload: FileSchemaType) => {
    if (!dataFiles) {
      const { data } = await fileService.createMe(payload);
      return data.data;
    } else {
      const { data } = await fileService.updateMe(payload);
      return data.data;
    }
  };

  const form = useForm<FileSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(fileSchema),
    defaultValues: fileDefaultValues,
  });

  const {
    mutate: mutateUpdateFiles,
    isPending: isPendingUpdateFiles,
    isSuccess: isSuccessUpdateFiles,
  } = useMutation({
    mutationFn: (payload: IFile) => updateFiles(payload),
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
    fieldName: keyof FileSchemaType, // Nama field yang akan diperbarui
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        form.setValue(fieldName, fileUrl);
      }
    });
  };

  const handleDelete = (fieldName: keyof FileSchemaType, onChange: (files: FileList | undefined) => void) => {
    handleDeleteFile(fileUrl[fieldName], () => onChange(undefined));
  };

  const handleUpdateFiles = () => {
    const dataCurrentFiles: FileSchemaType = dataFiles;
    const payload: FileSchemaType = {
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
