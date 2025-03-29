import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { ISantriForm } from "@/types/Santri";

const santriService = {
  getSantri: async (santriId: string) => instance.get(`${endpoint.SANTRI}/${santriId}`),
  update: async (santriId: string, payload: ISantriForm) => instance.put(`${endpoint.SANTRI}/${santriId}`, payload),
  getMe: async () => instance.get(`${endpoint.SANTRI}/me/details`),
  updateMe: async (payload: ISantriForm) => instance.put(`${endpoint.SANTRI}/me/details`, payload),
};

export default santriService;
