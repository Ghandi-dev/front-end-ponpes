"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataSantri from "./DataSantri/DataSantri";
import DataAlamat from "./DataAlamat/DataAlamat";
import DataBerkas from "./DataBerkas/DataBerkas";

const DetailSantri = () => {
  return (
    <Tabs defaultValue="santri" className="w-full">
      <TabsList>
        <TabsTrigger value="santri">Data Santri</TabsTrigger>
        <TabsTrigger value="address">Alamat</TabsTrigger>
        <TabsTrigger value="file">Berkas</TabsTrigger>
      </TabsList>
      <TabsContent value="santri">
        <DataSantri />
      </TabsContent>
      <TabsContent value="address">
        <DataAlamat />
      </TabsContent>
      <TabsContent value="file">
        <DataBerkas />
      </TabsContent>
    </Tabs>
  );
};

export default DetailSantri;
