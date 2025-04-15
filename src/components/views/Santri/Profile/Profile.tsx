"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import useProfile from "@/hooks/useProfile";
import FormDataSantri from "./FormDataSantri/FormDataSantri";
import FormDataAlamat from "./FormDataAlamat/FormDataAlamat";
import FormDataBerkas from "./FormDataBerkas/FormDataBerkas";
import FormFoto from "./FormFoto/FormFoto";

const Profile = () => {
  const { dataProfile, refetchProfile, isLoadingProfile } = useProfile();

  return (
    <Tabs defaultValue="photo" className="w-full">
      <TabsList>
        <TabsTrigger value="photo">Foto</TabsTrigger>
        <TabsTrigger value="santri">Data Santri</TabsTrigger>
        <TabsTrigger value="address">Alamat</TabsTrigger>
        <TabsTrigger value="file">Berkas</TabsTrigger>
      </TabsList>
      <TabsContent value="photo">
        <FormFoto dataProfile={dataProfile} refetchProfile={refetchProfile} isLoadingProfile={isLoadingProfile} />
      </TabsContent>
      <TabsContent value="santri">
        <FormDataSantri refetchProfile={refetchProfile} />
      </TabsContent>
      <TabsContent value="address">
        <FormDataAlamat refetchProfile={refetchProfile} />
      </TabsContent>
      <TabsContent value="file">
        <FormDataBerkas refetchProfile={refetchProfile} />
      </TabsContent>
    </Tabs>
  );
};

export default Profile;
