import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { AddressSchemaType } from "@/schemas/address.schema";

const addressService = {
  getMe: () => instance.get(`${endpoint.ADDRESS}/me`),
  createMe: (payload: AddressSchemaType) => instance.post(`${endpoint.ADDRESS}/me`, payload),
  updateMe: (payload: AddressSchemaType) => instance.put(`${endpoint.ADDRESS}/me`, payload),
};

export default addressService;
