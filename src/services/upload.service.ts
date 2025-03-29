import { IFIleURL } from "@/types/File";
import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";

const formDataHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const uploadServices = {
  uploadFile: (payload: FormData) => instance.post(`${endpoint.MEDIA}/upload-single`, payload, formDataHeaders),
  uploadMultiple: (payload: FormData) => instance.post(`${endpoint.MEDIA}/upload-multiple`, payload, formDataHeaders),
  removeFile: (payload: IFIleURL) => instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadServices;
