"use client";
import regionService from "@/services/regions.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useRegions = () => {
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const getRegions = async () => {
    const res = await regionService.getRegions();
    return res.data.data;
  };

  const { data: dataProvinces = [] } = useQuery({
    queryKey: ["Provinces"],
    queryFn: getRegions,
  });

  const getRegency = async (id: string) => {
    const res = await regionService.getProvinceById(id);
    return res.data.data[0].regencies;
  };

  const { data: dataRegencies = [] } = useQuery({
    queryKey: ["Regencies", provinceId],
    queryFn: () => getRegency(provinceId),
    enabled: provinceId !== "",
  });

  const getDistrict = async (id: string) => {
    const res = await regionService.getRegencyById(id);
    return res.data.data[0].districts;
  };

  const { data: dataDistricts = [] } = useQuery({
    queryKey: ["Districts", regencyId],
    queryFn: () => getDistrict(regencyId),
    enabled: regencyId !== "",
  });

  const getVillages = async (id: string) => {
    const res = await regionService.getDistrictById(id);
    return res.data.data[0].villages;
  };

  const { data: dataVillages = [] } = useQuery({
    queryKey: ["Villages", districtId],
    queryFn: () => getVillages(districtId),
    enabled: districtId !== "",
  });

  return { dataProvinces, dataRegencies, dataDistricts, dataVillages, setDistrictId, setProvinceId, setRegencyId };
};

export default useRegions;
