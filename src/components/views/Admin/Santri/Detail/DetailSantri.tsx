"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataSantri from "./DataSantri/DataSantri";

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
      <TabsContent value="address"></TabsContent>
      <TabsContent value="file"></TabsContent>
    </Tabs>
  );
};

export default DetailSantri;
