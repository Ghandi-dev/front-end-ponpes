import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";
import { AdminUpdateSchemaType } from "@/schemas/admin.schema";
import { RegisterAdminSchemaType } from "@/schemas/user.schema";

const adminServices = {
  getMe: () => instance.get(`${endpoint.ADMIN}/me/details`),
  updateMe: (payload: AdminUpdateSchemaType) => instance.put(`${endpoint.ADMIN}/me/details`, payload),
  getAll: (params?: string) => instance.get(`${endpoint.ADMIN}?${params}`),
  create: (payload: RegisterAdminSchemaType) => instance.post(`${endpoint.ADMIN}`, payload),
  delete: (id: number) => instance.delete(`${endpoint.ADMIN}/${id}`),
};

export default adminServices;
