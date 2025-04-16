"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import useProfile from "@/hooks/useProfile";
import FormFoto from "./FormFoto/FormFoto";
import FormDataAdmin from "./FormDataAdmin/FormDataAdmin";
import { AdminSelectSchemaType } from "@/schemas/admin.schema";

const Profile = () => {
  const { dataProfile, refetchProfile, isLoadingProfile } = useProfile();

  return (
    <Tabs defaultValue="photo" className="w-full">
      <TabsList>
        <TabsTrigger value="photo">Foto</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
      </TabsList>
      <TabsContent value="photo">
        <FormFoto dataProfile={dataProfile} refetchProfile={refetchProfile} isLoadingProfile={isLoadingProfile} />
      </TabsContent>
      <TabsContent value="data">
        <FormDataAdmin refetchProfile={refetchProfile} dataAdmin={dataProfile?.admin as AdminSelectSchemaType} isLoadingProfile={isLoadingProfile} />
      </TabsContent>
    </Tabs>
  );
};

export default Profile;
