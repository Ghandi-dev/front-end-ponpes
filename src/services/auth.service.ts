import { IActivation, ILogin, IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constants";
import instance from "@/lib/axios/instance";

const authServices = {
  register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
  activation: (payload: IActivation) => instance.post(`${endpoint.AUTH}/activation`, payload),
};

export default authServices;
