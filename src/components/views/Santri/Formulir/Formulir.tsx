"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import useSidebar from "@/components/layouts/useSidebar";
import FormDataSantri from "./FormDataSantri/FormDataSantri";
import FormDataAlamat from "./FormDataAlamat/FormDataAlamat";
import FormDataBerkas from "./FormDataBerkas/FormDataBerkas";

const Formulir = () => {
  const { dataProfile } = useSidebar();
  return (
    <Tabs defaultValue="santri" className="w-full">
      <TabsList>
        <TabsTrigger value="santri">Data Santri</TabsTrigger>
        <TabsTrigger value="address" disabled={dataProfile?.santri?.status !== "completed_profile"}>
          Alamat
        </TabsTrigger>
        <TabsTrigger value="file" disabled={dataProfile?.santri?.status !== "completed_profile" || dataProfile?.santri?.status !== "completed_address"}>
          Berkas
        </TabsTrigger>
      </TabsList>
      <TabsContent value="santri">
        <FormDataSantri />
      </TabsContent>
      <TabsContent value="address">
        <FormDataAlamat />
      </TabsContent>
      <TabsContent value="file">
        <FormDataBerkas />
      </TabsContent>
    </Tabs>
  );
};

export default Formulir;
