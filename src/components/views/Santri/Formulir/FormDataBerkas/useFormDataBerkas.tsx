"use client";
import useMediaHandling from "@/hooks/useMediaHandling";
import fileService from "@/services/file.service";
import { IFile } from "@/types/File";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const fileSchema = z.union([
  z.string().min(1, "Pilih file"), // Jika file sudah ada dalam bentuk URL
  typeof window !== "undefined"
    ? z.custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "Pilih file",
      })
    : z.never(), // Saat SSR, tidak memeriksa FileList
]);

const formDataBerkasSchema = z.object({
  birthCertificate: fileSchema,
  familyCard: fileSchema,
  educationCertificate: fileSchema,
});

const useFormDataBerkas = () => {
  const pathname = usePathname();
  const { isPendingMutateUploadFile, isPendingMutateDeleteFile, handleDeleteFile, handleUploadFile } = useMediaHandling();

  const getFiles = async () => {
    const res = await fileService.getMe();
    return res.data.data ?? [];
  };

  const { data: dataFiles = [], isLoading: isLoadingFiles, refetch: refetchFiles } = useQuery({ queryKey: ["Files"], queryFn: getFiles, enabled: !!pathname });

  const updateFiles = async (payload: IFile) => {
    if (dataFiles.length < 1) {
      const { data } = await fileService.createMe(payload);
      return data.data;
    } else {
      const { data } = await fileService.updateMe(payload);
      return data.data;
    }
  };

  const form = useForm<z.infer<typeof formDataBerkasSchema>>({ resolver: zodResolver(formDataBerkasSchema) });

  const {
    mutate: mutateUpdateFiles,
    isPending: isPendingUpdateFiles,
    isSuccess: isSuccessUpdateFiles,
  } = useMutation({
    mutationFn: (payload: IFile) => updateFiles(payload),
    onSuccess: () => {
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
    fieldName: keyof z.infer<typeof formDataBerkasSchema>, // Nama field yang akan diperbarui
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        form.setValue(fieldName, fileUrl);
      }
    });
  };

  const handleDelete = (fieldName: keyof z.infer<typeof formDataBerkasSchema>, onChange: (files: FileList | undefined) => void) => {
    handleDeleteFile(fileUrl[fieldName], () => onChange(undefined));
  };

  const handleUpdateFiles = () => {
    const dataCurrentFiles = dataFiles as IFile;
    const payload: IFile = {
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
