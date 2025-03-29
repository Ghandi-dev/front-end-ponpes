import { regionApiInstance } from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";

const regionService = {
  getRegions: () => regionApiInstance.get(`${endpoint.REGIONS}`),
  getProvinceById: (id: string) => regionApiInstance.get(`${endpoint.REGIONS}/${id}/province`),
  getRegencyById: (id: string) => regionApiInstance.get(`${endpoint.REGIONS}/${id}/regency`),
  getDistrictById: (id: string) => regionApiInstance.get(`${endpoint.REGIONS}/${id}/district`),
  getVillageById: (id: string) => regionApiInstance.get(`${endpoint.REGIONS}/${id}/village`),
  getProvinceByName: (name: string) => regionApiInstance.get(`${endpoint.REGIONS}-search/regency?name=${name}`),
  getDistrictByName: (name: string) => regionApiInstance.get(`${endpoint.REGIONS}-search/district?name=${name}`),
  getVillageByName: (name: string) => regionApiInstance.get(`${endpoint.REGIONS}-search/village?name=${name}`),
};

export default regionService;
