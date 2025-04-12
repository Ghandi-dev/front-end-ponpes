import { z } from "zod";
import { santriSelectSchema } from "./santri.schema";

export enum STATUS_PAYMENT {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum TYPE_PAYMENT {
  REGISTRATION = "registration",
  SPP = "spp",
}

export const insertPaymentSchema = z.object({
  santriId: z.number().int().min(1, "santriId harus diisi"),
  paymentId: z.string().min(1, "paymentId tidak boleh kosong"),
  status: z.enum([STATUS_PAYMENT.PENDING, STATUS_PAYMENT.COMPLETED, STATUS_PAYMENT.CANCELED]).optional().default(STATUS_PAYMENT.PENDING),
  amount: z.number().int().min(0, "amount harus angka positif"),
  type: z.enum([TYPE_PAYMENT.REGISTRATION, TYPE_PAYMENT.SPP], { required_error: "type tidak boleh kosong" }),
  note: z.string().optional(),
  detail: z.any().optional(), // bisa diganti schema detail midtrans jika sudah ada
  month: z
    .number()
    .int()
    .min(1)
    .max(12)
    .default(new Date().getMonth() + 1),
  year: z.number().int().min(2000).max(2100).default(new Date().getFullYear()),
});

export const selectPaymentSchema = insertPaymentSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  santri: santriSelectSchema,
});

export type InsertPaymentSchemaType = z.infer<typeof insertPaymentSchema>;
export type SelectPaymentSchemaType = z.infer<typeof selectPaymentSchema>;
