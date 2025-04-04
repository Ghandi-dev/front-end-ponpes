import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { IPaymentRequest } from "@/types/Payment";

const paymentService = {
  createMe: (status: IPaymentRequest) => instance.post(`${endpoint.PAYMENT}`, status),
  getMeRegistration: () => instance.get(`${endpoint.PAYMENT}`),
  updateStatus: (orderId: string, status: string) => instance.put(`${endpoint.PAYMENT}/${orderId}/${status}`),
};

export default paymentService;
