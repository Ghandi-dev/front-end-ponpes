"use client";
import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const useProfile = () => {
  const pathName = usePathname();
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data as IProfile;
  };
  const {
    data: dataProfile,
    refetch: refetchProfile,
    isLoading: isLoadingProfile,
  } = useQuery({ queryKey: ["profile"], queryFn: getProfile, enabled: !!pathName });

  return {
    dataProfile,
    refetchProfile,
    isLoadingProfile,
  };
};

export default useProfile;
