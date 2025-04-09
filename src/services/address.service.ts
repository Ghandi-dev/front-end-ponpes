import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { AddressSchemaType } from "@/schemas/address.schema";

const addressService = {
  getMe: () => instance.get(`${endpoint.ADDRESS}/me`),
  get: (id: number) => instance.get(`${endpoint.ADDRESS}/${id}/santri`),
  createMe: (payload: AddressSchemaType) => instance.post(`${endpoint.ADDRESS}/me`, payload),
  create: (id: number, payload: AddressSchemaType) => instance.post(`${endpoint.ADDRESS}/${id}/santri`, payload),
  updateMe: (payload: AddressSchemaType) => instance.put(`${endpoint.ADDRESS}/me`, payload),
  update: (id: number, payload: AddressSchemaType) => instance.put(`${endpoint.ADDRESS}/${id}/santri`, payload),
};

export default addressService;
