import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const isServer = typeof window === "undefined"; // Deteksi server-side

const API_URL = isServer ? "http://localhost:3001/api" : environment.API_URL;
const REGION_API_URL = isServer ? "http://localhost:3001/api/regions" : environment.REGION_API_URL;

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: API_URL,
  headers,
  timeout: 60 * 1000,
});

// Instance untuk data wilayah (regions)
const regionApiInstance = axios.create({
  baseURL: REGION_API_URL,
  headers,
  timeout: 60 * 1000,
});

regionApiInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

regionApiInstance.interceptors.request.use(
  async (request) => request,
  (error) => Promise.reject(error)
);

// Interceptors response
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("🚀 ~ file: instance.ts:45 ~ error:", error);

    const status = error.response?.status;

    if (status === 401 || status === 403) {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        await signOut();
      }
    }

    return Promise.reject(error);
  }
);

// Interceptors request
instance.interceptors.request.use(
  async (request) => {
    if (!isServer) {
      const session: SessionExtended | null = await getSession();
      if (session && session.accessToken) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export { instance, regionApiInstance };
