import { z } from "zod";

const file = z.union([
  z.string().min(1, "Pilih file"), // Jika file sudah ada dalam bentuk URL
  typeof window !== "undefined"
    ? z.custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "Pilih file",
      })
    : z.never(), // Saat SSR, tidak memeriksa FileList
]);

export const userSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.string(),
  profilePicture: file,
  isActive: z.boolean(),
  activationCode: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const validatePassword = z
  .string()
  .min(6, "Password harus minimal 6 karakter")
  .regex(/[A-Z]/, "Password harus mengandung setidaknya satu huruf kapital")
  .regex(/\d/, "Password harus mengandung setidaknya satu angka");

export const updatePasswordSchema = z
  .object({
    oldPassword: validatePassword,
    password: validatePassword,
    confirmPassword: validatePassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password tidak cocok",
  })
  .refine((data) => data.password !== data.oldPassword, {
    path: ["password"],
    message: "Password baru tidak boleh sama dengan password lama",
  });

export const userSelectSchema = userSchema.extend({
  id: z.number(),
});

export const userDefaultValues: z.infer<typeof userSchema> = {
  email: "",
  password: "",
  role: "",
  profilePicture: "",
  isActive: false,
  activationCode: "",
};

export const userInsertSchema = userSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const userPhotoSchema = userSchema.pick({
  profilePicture: true,
});

export const userUpdateSchema = userSchema.partial();

export type User = z.infer<typeof userSchema>;
export type UserPhoto = z.infer<typeof userPhotoSchema>;
export type UserSelect = z.infer<typeof userSelectSchema>;
export type UserInsert = z.infer<typeof userInsertSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
