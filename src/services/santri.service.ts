import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { SantriInsertSchemaType } from "@/schemas/santri.schema";

const santriService = {
  getAll: async (params: string) => instance.get(`${endpoint.SANTRI}?${params}`),
  getById: async (santriId: number) => instance.get(`${endpoint.SANTRI}/${santriId}`),
  update: async (santriId: number, payload: SantriInsertSchemaType) => instance.put(`${endpoint.SANTRI}/${santriId}`, payload),
  getMe: async () => instance.get(`${endpoint.SANTRI}/me/details`),
  updateMe: async (payload: SantriInsertSchemaType) => instance.put(`${endpoint.SANTRI}/me/details`, payload),
};

export default santriService;
