"use client";
import useSidebar from "@/components/layouts/useSidebar";
import SantriTimeline from "@/components/santri/SantriTimeline";
import { Card } from "@/components/ui/card";
import { User, MapPin, FileText, CreditCard, Printer, School } from "lucide-react";
import React from "react";

const Dashboard = () => {
  const { dataProfile } = useSidebar();
  console.log("dataProfile", dataProfile);

  return (
    <div className="mx-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Card Selamat Datang */}
      <Card className="h-fit w-full bg-white border-1 border-primary shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
        <div className="flex flex-col h-full text-slate-700">
          <h2 className="text-lg font-semibold mb-2">Selamat Datang 👋</h2>
          <p className="text-sm leading-relaxed">
            Halo <span className="font-semibold capitalize">{dataProfile?.santri?.fullname}</span>, selamat datang di halaman dashboard. Silakan ikuti tahapan
            pendaftaran santri baru berikut ini:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Lengkapi data profil pribadi
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Isi alamat tempat tinggal dengan lengkap
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Unggah berkas persyaratan yang diminta
            </li>
            <li className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Lakukan pembayaran biaya registrasi
            </li>
            <li className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-primary" />
              Cetak formulir pendaftaran
            </li>
            <li className="flex items-center gap-2">
              <School className="w-4 h-4 text-primary" />
              Lakukan daftar ulang di pesantren
            </li>
          </ul>
        </div>
      </Card>

      {/* Card Timeline */}
      <Card className="w-full bg-white border-1 border-primary shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
        <SantriTimeline currentStatus={dataProfile?.santri?.status} />
      </Card>
    </div>
  );
};

export default Dashboard;
