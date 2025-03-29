import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";

const addressService = {
  getMe: () => instance.get(`${endpoint.ADDRESS}/me`),
  createMe: (payload: IAddress) => instance.post(`${endpoint.ADDRESS}/me`, payload),
  updateMe: (payload: IAddress) => instance.put(`${endpoint.ADDRESS}/me`, payload),
};

export default addressService;
