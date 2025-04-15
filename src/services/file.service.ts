import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { FileSchemaType, FileUpdateSchemaType } from "@/schemas/file.schema";

const fileService = {
  getMe: () => instance.get(`${endpoint.FILE}/me`),
  getBySantriId: (id: number) => instance.get(`${endpoint.FILE}/${id}/santri`),
  createMe: (payload: FileSchemaType) => instance.post(`${endpoint.FILE}/me`, payload),
  create: (id: number, payload: FileSchemaType) => instance.post(`${endpoint.FILE}/${id}/santri`, payload),
  updateMe: (payload: FileSchemaType | FileUpdateSchemaType) => instance.put(`${endpoint.FILE}/me`, payload),
  update: (id: number, payload: FileSchemaType) => instance.put(`${endpoint.FILE}/${id}/santri`, payload),
};

export default fileService;
