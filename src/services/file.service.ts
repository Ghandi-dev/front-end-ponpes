import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { FileSchemaType } from "@/schemas/file.schema";

const fileService = {
  getMe: () => instance.get(`${endpoint.FILE}/me`),
  createMe: (payload: FileSchemaType) => instance.post(`${endpoint.FILE}/me`, payload),
  updateMe: (payload: FileSchemaType) => instance.put(`${endpoint.FILE}/me`, payload),
};

export default fileService;
