import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";
import { AdminUpdateSchemaType } from "@/schemas/admin.schema";

const adminServices = {
  getMe: () => instance.get(`${endpoint.ADMIN}/me/details`),
  updateMe: (payload: AdminUpdateSchemaType) => instance.put(`${endpoint.ADMIN}/me/details`, payload),
};

export default adminServices;
