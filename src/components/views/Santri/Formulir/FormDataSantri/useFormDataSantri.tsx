"use client";

import santriService from "@/services/santri.service";
import { ISantri } from "@/types/Auth";
import { ISantriForm } from "@/types/Santri";
import { toStandardDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const dataSantriSchema = z.object({
  fullname: z.string({ required_error: "Masukkan nama lengkap" }).trim().min(1, "Nama lengkap tidak boleh kosong"),
  placeOfBirth: z.string({ required_error: "Masukkan tempat lahir" }).trim().min(1, "Tempat lahir tidak boleh kosong"),
  dateOfBirth: z.date({ required_error: "Masukkan tanggal lahir" }),
  gender: z.string({ required_error: "Pilih jenis kelamin" }),
  schoolOrigin: z.string({ required_error: "Masukkan asal sekolah" }).trim().min(1, "Asal sekolah tidak boleh kosong"),
  nisn: z.string({ required_error: "Masukkan NISN" }).trim().min(1, "NISN tidak boleh kosong").regex(/^\d+$/, "NISN harus berupa angka"),
  nik: z.string({ required_error: "Masukkan NIK" }).trim().min(1, "NIK tidak boleh kosong").regex(/^\d+$/, "NIK harus berupa angka"),
  nationality: z.string({ required_error: "Pilih kewarganegaraan" }),
  phoneNumber: z
    .string({ required_error: "Masukkan nomor telepon" })
    .trim()
    .min(1, "Nomor telepon tidak boleh kosong")
    .regex(/^\d+$/, "Nomor telepon harus berupa angka"),
  familyCardNumber: z
    .string({ required_error: "Masukkan nomor kartu keluarga" })
    .trim()
    .min(1, "Nomor kartu keluarga tidak boleh kosong")
    .regex(/^\d+$/, "Nomor kartu keluarga harus berupa angka"),
});

const useFormDataSantri = () => {
  const pathname = usePathname();

  const getSantri = async () => {
    const { data } = await santriService.getMe();
    return data.data;
  };

  const {
    data: dataSantri,
    refetch: refetchSantri,
    isRefetching: isRefetchingSantri,
    isLoading: isLoadingSantri,
  } = useQuery({ queryKey: ["santri"], queryFn: getSantri, enabled: !!pathname });

  const form = useForm<z.infer<typeof dataSantriSchema>>({
    resolver: zodResolver(dataSantriSchema),
  });

  const updateSantri = async (payload: ISantriForm) => {
    const { data } = await santriService.updateMe(payload);
    return data.data as ISantri;
  };

  const { mutate: mutateUpdateSantri, isPending: isPendingUpdateSantri } = useMutation({
    mutationFn: updateSantri,
    onSuccess: () => {
      toast.success("Data santri berhasil diperbarui");
      refetchSantri();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateSantri = async (data: ISantriForm) => {
    const payload = {
      ...data,
      dateOfBirth: toStandardDate(data.dateOfBirth),
    };

    mutateUpdateSantri(payload);
  };

  return {
    form,
    dataSantri,
    isRefetchingSantri,
    isPendingUpdateSantri,
    isLoadingSantri,
    handleUpdateSantri,
  };
};

export default useFormDataSantri;
