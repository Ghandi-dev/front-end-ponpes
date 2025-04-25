"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useProfile from "@/hooks/useProfile";

const DashboardSantriActive = () => {
  const { dataProfile } = useProfile();
  return (
    <div className="mx-4 gap-4">
      <Alert className="border-primary">
        <AlertDescription className="flex justify-center">
          <h1 className="text-lg text-center font-bold text-black">
            Hai {dataProfile?.santri?.fullname} Selamat Datang Di Sistem Informasi Administrasi Ponpes Al-Muthohhar
          </h1>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DashboardSantriActive;
