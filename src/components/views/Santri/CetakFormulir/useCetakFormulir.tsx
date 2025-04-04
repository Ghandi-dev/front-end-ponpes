"use client";

import addressService from "@/services/address.service";
import regionService from "@/services/regions.service";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const useCetakFormulir = () => {
  const pathname = usePathname();

  const getAddress = async () => {
    const res = await addressService.getMe();
    return res.data.data ?? [];
  };

  const {
    data: dataAddress,
    isLoading: isLoadingDataAddress,
    refetch: refetchDataAddress,
  } = useQuery({
    queryKey: ["Address"],
    queryFn: getAddress,
    enabled: !!pathname,
  });

  const {
    data: dataVillage,
    isSuccess: isSuccessDataVillage,
    isLoading: isLoadingDataVillage,
  } = useQuery({
    queryKey: ["Villages"],
    queryFn: () => regionService.getVillageById(dataAddress?.village).then((res) => res.data.data[0]),
    enabled: !!dataAddress?.village,
  });
  return {
    dataAddress,
    isLoadingDataAddress,
    isLoadingDataVillage,
    refetchDataAddress,
    dataVillage,
    isSuccessDataVillage,
  };
};

export default useCetakFormulir;
