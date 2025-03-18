import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const isServer = typeof window === "undefined"; // Deteksi server-side

const API_URL = isServer ? "http://localhost:3001/api" : environment.API_URL; // Ganti localhost dengan port API lokalmu

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: API_URL,
  headers,
  timeout: 60 * 1000,
});

// Interceptors response
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
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

export default instance;
