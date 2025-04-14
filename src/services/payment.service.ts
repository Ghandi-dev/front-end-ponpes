import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { IPaymentRequest } from "@/types/Payment";

const paymentService = {
  // admin
  getAll: (params: string) => instance.get(`${endpoint.PAYMENT}?${params}`),
  // user
  createMe: (status: IPaymentRequest) => instance.post(`my${endpoint.PAYMENT}`, status),
  getMe: (params: string) => instance.get(`my${endpoint.PAYMENT}?${params}`),
  getMeRegistration: () => instance.get(`my${endpoint.PAYMENT}/registration`),
  updateStatus: (orderId: string, status: string) => instance.put(`${endpoint.PAYMENT}/${orderId}/${status}`),
};

export default paymentService;
