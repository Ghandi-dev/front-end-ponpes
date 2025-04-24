"use client";

import dashboardService from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const useDasboard = () => {
  const getDataDashboard = async () => {
    const { data } = await dashboardService.getDashboardDataAdmin();
    return data.data;
  };
  const { data: dataDashboard, isLoading: isLoadingDataDashboard } = useQuery({
    queryKey: ["dashboard-admin"],
    queryFn: getDataDashboard,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return {
    dataDashboard,
    isLoadingDataDashboard,
  };
};

export default useDasboard;
