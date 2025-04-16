"use client";

import environment from "@/config/environment";
import useMediaHandling from "@/hooks/useMediaHandling";
import useProfile from "@/hooks/useProfile";
import { UserPhoto, userPhotoSchema } from "@/schemas/user.schema";
import authServices from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useFormFoto = () => {
  const { dataProfile } = useProfile();
  const { isPendingMutateUploadFile, isPendingMutateDeleteFile, handleDeleteFile, handleUploadFile } = useMediaHandling();

  const updateUser = async (payload: UserPhoto) => {
    const { data } = await authServices.updatePhoto(payload);
    return data.data;
  };

  const form = useForm<UserPhoto>({
    mode: "onBlur",
    resolver: zodResolver(userPhotoSchema),
    defaultValues: { profilePicture: "" },
  });

  const preview = form.watch("profilePicture");
  const fileUrl = form.getValues("profilePicture");

  const {
    mutate: mutateUpdateUser,
    isPending: isPendingUpdateUser,
    isSuccess: isSuccessUpdateUser,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil disimpan");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpload = (fieldName: keyof UserPhoto, files: FileList, onChange: (files: FileList | undefined) => void) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        form.setValue(fieldName, fileUrl);
      }
    });
  };

  const handleDelete = (onChange: (files: FileList | undefined) => void) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleUpdatePhoto = () => {
    console.log("handleUpdatePhoto", form.getValues("profilePicture"));

    const payload: UserPhoto = {
      profilePicture: form.getValues("profilePicture"),
    };
    mutateUpdateUser(payload);

    if (isSuccessUpdateUser && dataProfile?.profilePicture !== environment.DEFAULT_PHOTO_PROFILE) {
      handleDeleteFile(dataProfile?.profilePicture as string, () => {});
    }
  };

  return {
    form,
    preview,
    handleUpload,
    handleDelete,
    handleUpdatePhoto,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    mutateUpdateUser,
    isPendingUpdateUser,
    isSuccessUpdateUser,
  };
};

export default useFormFoto;
