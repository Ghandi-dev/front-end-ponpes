import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { IFile } from "@/types/File";

const fileService = {
  getMe: () => instance.get(`${endpoint.FILE}/me`),
  createMe: (payload: IFile) => instance.post(`${endpoint.FILE}/me`, payload),
  updateMe: (payload: IFile) => instance.put(`${endpoint.FILE}/me`, payload),
};

export default fileService;
