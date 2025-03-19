"use client";
import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const useSidebar = () => {
  const pathName = usePathname();
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };
  const { data: dataProfile, refetch: refetchProfile } = useQuery({ queryKey: ["profile"], queryFn: getProfile, enabled: !!pathName });

  return {
    dataProfile,
    refetchProfile,
  };
};

export default useSidebar;
