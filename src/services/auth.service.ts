import instance from "@/lib/axios/instance";
import { ILogin, IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constants";

const authServices = {
  register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default authServices;
