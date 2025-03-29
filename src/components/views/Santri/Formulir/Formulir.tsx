"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import useSidebar from "@/components/layouts/useSidebar";
import FormDataSantri from "./FormDataSantri/FormDataSantri";
import FormDataAlamat from "./FormDataAlamat/FormDataAlamat";
import FormDataBerkas from "./FormDataBerkas/FormDataBerkas";

const Formulir = () => {
  const { dataProfile, refetchProfile } = useSidebar();
  return (
    <Tabs defaultValue="santri" className="w-full">
      <TabsList>
        <TabsTrigger value="santri">Data Santri</TabsTrigger>
        <TabsTrigger value="address" disabled={!["completed_profile", "completed_address", "completed_file"].includes(dataProfile?.santri?.status)}>
          Alamat
        </TabsTrigger>
        <TabsTrigger value="file" disabled={!["completed_address", "completed_file"].includes(dataProfile?.santri?.status)}>
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
