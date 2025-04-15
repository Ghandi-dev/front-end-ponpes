import { z } from "zod";

const file = z.union([
  z.string().min(1, "Pilih file"), // Jika file sudah ada dalam bentuk URL
  typeof window !== "undefined"
    ? z.custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "Pilih file",
      })
    : z.never(), // Saat SSR, tidak memeriksa FileList
]);

export const fileSchema = z.object({
  birthCertificate: file,
  familyCard: file,
  educationCertificate: file,
});

export const fileDefaultValues: FileSchemaType = {
  birthCertificate: "",
  familyCard: "",
  educationCertificate: "",
};

export const fileUpdateSchema = fileSchema.partial();

export type FileSchemaType = z.infer<typeof fileSchema>;
export type FileUpdateSchemaType = z.infer<typeof fileUpdateSchema>;
