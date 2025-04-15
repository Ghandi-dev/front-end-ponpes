"use client";
import { addressDefaultValues, addressSchema, AddressSchemaType } from "@/schemas/address.schema";
import addressService from "@/services/address.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useFormDataAlamat = () => {
  const pathname = usePathname();

  const getAddress = async () => {
    const res = await addressService.getMe();
    return res.data.data;
  };

  const {
    data: dataAddress,
    isLoading: isLoadingDataAddress,
    refetch: refetchDataAddress,
  } = useQuery({
    queryKey: ["Address"],
    queryFn: getAddress,
    enabled: !!pathname,
  });

  const form = useForm<AddressSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(addressSchema),
    defaultValues: addressDefaultValues,
  });

  const updateAddress = async (payload: AddressSchemaType) => {
    if (!dataAddress) {
      const { data } = await addressService.createMe(payload);
      return data.data;
    } else {
      const { data } = await addressService.updateMe(payload);
      return data.data;
    }
  };

  const {
    mutate: mutateUpdateAddress,
    isPending: isPendingUpdateAddress,
    isSuccess: isSuccessUpdateAddress,
  } = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      refetchDataAddress();
      toast.success("Update data alamat berhasil");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateAddress = (data: AddressSchemaType) => {
    const payload = {
      ...data,
    };
    mutateUpdateAddress(payload);
  };

  return {
    form,
    dataAddress,
    isLoadingDataAddress,
    mutateUpdateAddress,
    isPendingUpdateAddress,
    isSuccessUpdateAddress,
    handleUpdateAddress,
    refetchDataAddress,
  };
};

export default useFormDataAlamat;
