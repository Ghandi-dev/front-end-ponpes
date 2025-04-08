import * as z from "zod";

export const addressSchema = z.object({
  address: z.string({ required_error: "Masukkan alamat" }).trim().min(1, "Alamat tidak boleh kosong"),
  rt: z.string({ required_error: "Masukkan RT" }).trim().min(1, "RT tidak boleh kosong").regex(/^\d+$/, "RT harus berupa angka"),
  rw: z.string({ required_error: "Masukkan RW" }).trim().min(1, "RW tidak boleh kosong").regex(/^\d+$/, "RW harus berupa angka"),
  postalCode: z.string({ required_error: "Masukkan kode pos" }).min(1, "Kode pos tidak boleh kosong"),
  province: z.string({ required_error: "Pilih provinsi" }).min(1, "Provinsi tidak boleh kosong"),
  city: z.string({ required_error: "Pilih kota" }).min(1, "Kota tidak boleh kosong"),
  district: z.string({ required_error: "Pilih kecamatan" }).min(1, "Kecamatan tidak boleh kosong"),
  village: z.string({ required_error: "Pilih kelurahan" }).min(1, "Kelurahan tidak boleh kosong"),
});

export const addressDefaultValues: z.infer<typeof addressSchema> = {
  address: "",
  rt: "",
  rw: "",
  postalCode: "",
  province: "",
  city: "",
  district: "",
  village: "",
};

export type AddressSchemaType = z.infer<typeof addressSchema>;
