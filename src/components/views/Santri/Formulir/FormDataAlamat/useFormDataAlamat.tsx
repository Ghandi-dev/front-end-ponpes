"use client";
import addressService from "@/services/address.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formDataAlamatSchema = z.object({
  address: z.string({ required_error: "Masukkan alamat" }).trim().min(1, "Alamat tidak boleh kosong"),
  rt: z.string({ required_error: "Masukkan RT" }).trim().min(1, "RT tidak boleh kosong").regex(/^\d+$/, "RT harus berupa angka"),
  rw: z.string({ required_error: "Masukkan RW" }).trim().min(1, "RW tidak boleh kosong").regex(/^\d+$/, "RW harus berupa angka"),
  postalCode: z.string({ required_error: "Masukkan kode pos" }).min(1, "Kode pos tidak boleh kosong"),
  province: z.string({ required_error: "Pilih provinsi" }).min(1, "Provinsi tidak boleh kosong"),
  city: z.string({ required_error: "Pilih kota" }).min(1, "Kota tidak boleh kosong"),
  district: z.string({ required_error: "Pilih kecamatan" }).min(1, "Kecamatan tidak boleh kosong"),
  village: z.string({ required_error: "Pilih kelurahan" }).min(1, "Kelurahan tidak boleh kosong"),
});

const useFormDataAlamat = () => {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formDataAlamatSchema>>({ resolver: zodResolver(formDataAlamatSchema) });

  const getAddress = async () => {
    const res = await addressService.getMe();
    return res.data.data ?? [];
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

  const updateAddress = async (payload: IAddress) => {
    if (dataAddress.length < 1) {
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

  const handleUpdateAddress = (data: IAddress) => {
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
