"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import useProfile from "@/hooks/useProfile";
import FormDataSantri from "./FormDataSantri/FormDataSantri";
import FormDataAlamat from "./FormDataAlamat/FormDataAlamat";
import FormDataBerkas from "./FormDataBerkas/FormDataBerkas";
import { SANTRI_STATUS } from "@/constant/status.constant";

const Formulir = () => {
  const { dataProfile, refetchProfile } = useProfile();

  return (
    <Tabs defaultValue="santri" className="w-full">
      <TabsList>
        <TabsTrigger value="santri">Data Santri</TabsTrigger>
        <TabsTrigger
          value="address"
          disabled={
            ![SANTRI_STATUS.PROFILE_COMPLETED, SANTRI_STATUS.ADDRESS_COMPLETED, SANTRI_STATUS.FILES_COMPLETED, SANTRI_STATUS.PAYMENT_COMPLETED].includes(
              (dataProfile?.santri?.status as SANTRI_STATUS) || ""
            )
          }
        >
          Alamat
        </TabsTrigger>
        <TabsTrigger
          value="file"
          disabled={
            ![SANTRI_STATUS.ADDRESS_COMPLETED, SANTRI_STATUS.FILES_COMPLETED, SANTRI_STATUS.PAYMENT_COMPLETED].includes(
              (dataProfile?.santri?.status as SANTRI_STATUS) || ""
            )
          }
        >
          Berkas
        </TabsTrigger>
      </TabsList>
      <TabsContent value="santri">
        <FormDataSantri refetchProfile={refetchProfile} />
      </TabsContent>
      <TabsContent value="address">
        <FormDataAlamat refetchProfile={refetchProfile} />
      </TabsContent>
      <TabsContent value="file">
        <FormDataBerkas />
      </TabsContent>
    </Tabs>
  );
};

export default Formulir;
