"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SectionCard from "./SectionCard/SectionCard";
import useDasboard from "./useDasboard";
import { SectionChart } from "./SectionChart/SectionChart";

const Dashboard = () => {
  const { dataDashboard, isLoadingDataDashboard } = useDasboard();

  return (
    <div className="flex flex-col gap-4 md:gap-6 px-4">
      <Alert className="border-primary">
        <AlertDescription className="flex justify-center">
          <h1 className="text-lg text-center font-bold text-black">Selamat Datang Di Sistem Informasi Administrasi Ponpes Al-Muthohhar</h1>
        </AlertDescription>
      </Alert>
      <SectionCard
        totalSantri={dataDashboard?.totalSantri}
        totalPembayaranRegistrasi={dataDashboard?.totalRegistrasi}
        totalPembayaranSPP={dataDashboard?.totalSPP}
        isLoading={isLoadingDataDashboard}
      />
      <SectionChart
        santriPerYear={dataDashboard?.santriPerYear ?? []}
        sppPerYear={dataDashboard?.sppPerYear ?? []}
        registrasiPerYear={dataDashboard?.registrasiPerYear ?? []}
      />
    </div>
  );
};

export default Dashboard;
