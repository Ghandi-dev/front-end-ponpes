"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import { registerAdmin, RegisterAdminSchemaType } from "@/schemas/user.schema";
import adminServices from "@/services/admin.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useUser = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getUser = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&fullname=${currentSearch}`;
    }
    const { data } = await adminServices.getAll(params);
    return data.data;
  };
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", currentLimit, currentPage, currentSearch],
    queryFn: getUser,
    enabled: true,
  });

  const createUser = async (payload: RegisterAdminSchemaType) => {
    const { data } = await adminServices.create(payload);
    return data.data;
  };

  const form = useForm<RegisterAdminSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(registerAdmin),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: mutateAdmin, isPending: isPendingMutateAdmin } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan user");
      refetchUser();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menambahkan user");
    },
  });

  const handleCreateUser = () => {
    const payload: RegisterAdminSchemaType = {
      fullname: form.getValues("fullname"),
      email: form.getValues("email"),
      password: form.getValues("password"),
      confirmPassword: form.getValues("confirmPassword"),
    };
    mutateAdmin(payload);
  };

  const deleteUser = async (userId: number) => {
    const { data } = await adminServices.delete(userId);
    return data.data;
  };

  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      toast.success("Berhasil menghapus user");
      refetchUser();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menghapus user");
    },
  });

  const handleDeleteUser = () => {
    deleteUserMutate(selectedId as number);
  };

  return { dataUser, isLoadingUser, selectedId, setSelectedId, mutateAdmin, isPendingMutateAdmin, form, handleCreateUser, handleDeleteUser, deleteUserMutate };
};

export default useUser;
