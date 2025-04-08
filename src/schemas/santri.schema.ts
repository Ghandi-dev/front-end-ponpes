import * as z from "zod";

export const santriSchema = z.object({
  fullname: z.string({ required_error: "Masukkan nama lengkap" }).trim().min(1, "Nama lengkap tidak boleh kosong"),
  placeOfBirth: z.string({ required_error: "Masukkan tempat lahir" }).trim().min(1, "Tempat lahir tidak boleh kosong"),
  dateOfBirth: z.date({ required_error: "Masukkan tanggal lahir" }),
  gender: z.string({ required_error: "Pilih jenis kelamin" }),
  schoolOrigin: z.string({ required_error: "Masukkan asal sekolah" }).trim().min(1, "Asal sekolah tidak boleh kosong"),
  nisn: z.string({ required_error: "Masukkan NISN" }).trim().min(1, "NISN tidak boleh kosong").regex(/^\d+$/, "NISN harus berupa angka"),
  nik: z.string({ required_error: "Masukkan NIK" }).trim().min(1, "NIK tidak boleh kosong").regex(/^\d+$/, "NIK harus berupa angka"),
  nationality: z.string({ required_error: "Pilih kewarganegaraan" }).min(1, "Kewarganegaraan tidak boleh kosong"),
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

export const santriDefaultValues: z.infer<typeof santriSchema> = {
  fullname: "",
  placeOfBirth: "",
  dateOfBirth: new Date(),
  gender: "",
  schoolOrigin: "",
  nisn: "",
  nik: "",
  nationality: "",
  phoneNumber: "",
  familyCardNumber: "",
};

export type SantriSchemaType = z.infer<typeof santriSchema>;
