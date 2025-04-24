import { instance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";

const dashboardService = {
  getDashboardDataAdmin: async () => instance.get(`${endpoint.DASHBOARD}/dashboard-admin`),
  getDashboardDataSantri: async () => instance.get(`${endpoint.DASHBOARD}/dashboard-santri`),
};

export default dashboardService;
