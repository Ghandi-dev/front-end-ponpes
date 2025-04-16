import { z } from "zod";

export const adminSchema = z.object({
  id: z.number(),
  userId: z.number(),
  fullname: z.string({ required_error: "Masukkan nama lengkap" }).trim().min(1, "Nama lengkap tidak boleh kosong"),
  phoneNumber: z
    .string({ required_error: "Masukkan nomor telepon" })
    .trim()
    .min(10, "Nomor telepon terlalu pendek")
    .max(15, "Nomor telepon terlalu panjang")
    .regex(/^(\+62|0)8[1-9][0-9]{6,9}$/, "Nomor telepon tidak valid"),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const adminSelectSchema = adminSchema;
export const adminInsertSchema = adminSchema.omit({ id: true, userId: true, createdAt: true, updatedAt: true });
export const adminUpdateSchema = adminSchema.partial().omit({ id: true, userId: true, createdAt: true, updatedAt: true });
export const adminDefaultValues = {
  fullname: "",
  phoneNumber: "",
};

export type AdminSchemaType = z.infer<typeof adminSchema>;
export type AdminSelectSchemaType = z.infer<typeof adminSelectSchema>;
export type AdminInsertSchemaType = z.infer<typeof adminInsertSchema>;
export type AdminUpdateSchemaType = z.infer<typeof adminUpdateSchema>;
