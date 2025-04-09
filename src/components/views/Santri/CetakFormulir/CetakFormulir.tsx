"use client";

import { useEffect } from "react";
import Image from "next/image";
import useSidebar from "@/components/layouts/useSidebar";
import { formatDate } from "@/utils/date";
import useCetakFormulir from "./useCetakFormulir";

import { Skeleton } from "@/components/ui/skeleton";
import { SANTRI_STATUS } from "@/constant/status.constant";

const CetakFormulir = () => {
  const { dataProfile, isLoadingProfile } = useSidebar();
  const { dataAddress, dataVillage, isSuccessDataVillage, isLoadingDataAddress, isLoadingDataVillage } = useCetakFormulir();

  const isLoading = isLoadingProfile || isLoadingDataAddress || isLoadingDataVillage;
  const isDataReadyForPrint = dataAddress && dataVillage && isSuccessDataVillage;
  const isPaymentCompleted = dataProfile?.santri?.status === SANTRI_STATUS.PAYMENT_COMPLETED;

  // Auto print after data is ready
  useEffect(() => {
    if (isDataReadyForPrint) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [isDataReadyForPrint]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 m-0 print:bg-white">
      <div className="w-[210mm] h-[297mm] bg-white shadow-lg p-10 relative border print:shadow-none print:border-none">
        {/* Kop Surat */}
        <header className="relative border-b pb-4 mb-6 flex items-center">
          <Image src="/logo.png" width={100} height={100} alt="Logo" className="absolute h-16 w-16 mr-4" />
          <div className="text-center w-full">
            <h1 className="text-xl font-bold uppercase">PONPES AL-MUTHOHHAR</h1>
            <p className="text-sm">Kampung Legok, rt.10, rw.01, Desa Palinggihan, Kecamatan Plered, Kabupaten Purwakarta</p>
          </div>
        </header>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full mx-auto" />
          </div>
        ) : isPaymentCompleted ? (
          <>
            {/* Judul Dokumen */}
            <h2 className="text-center text-md font-semibold mb-4 uppercase">Formulir Pendaftaran Penerimaan Santri Baru</h2>

            {/* Konten */}
            <div className="text-justify leading-7">
              <p className="font-semibold mb-2">1. Biodata Pribadi</p>
              <div className="grid grid-cols-[0.5fr_2fr] gap-y-2">
                <p>Nama</p>
                <p className="font-semibold capitalize">: {dataProfile?.santri?.fullname}</p>
                <p>Tempat Lahir</p>
                <p className="font-semibold capitalize">: {dataProfile?.santri?.placeOfBirth}</p>
                <p>Tanggal Lahir</p>
                <p className="font-semibold capitalize">: {formatDate(new Date(dataProfile?.santri?.dateOfBirth))}</p>
                <p>Jenis Kelamin</p>
                <p className="font-semibold capitalize">: {dataProfile?.santri?.gender === "male" ? "Laki-laki" : "Perempuan"}</p>
              </div>

              <p className="font-semibold mb-2 mt-4">2. Alamat</p>
              <div className="grid grid-cols-[0.5fr_2fr] gap-y-2">
                <p>Alamat</p>
                <p className="font-semibold capitalize">: {dataAddress?.address}</p>
                <p>RT/RW</p>
                <p className="font-semibold capitalize">
                  : {dataAddress?.rt}/{dataAddress?.rw}
                </p>
                <p>Kode Pos</p>
                <p className="font-semibold capitalize">: {dataAddress?.postalCode}</p>
                <p>Desa</p>
                <p className="font-semibold capitalize">: {dataVillage?.name}</p>
                <p>Kecamatan</p>
                <p className="font-semibold capitalize">: {dataVillage?.district?.name}</p>
                <p>Kabupaten</p>
                <p className="font-semibold capitalize">: {dataVillage?.regency?.name}</p>
                <p>Provinsi</p>
                <p className="font-semibold capitalize">: {dataVillage?.province?.name}</p>
              </div>
            </div>

            {/* Tanda Tangan */}
            <div className="mt-16 text-center">
              <div className="flex justify-end">
                <div className="text-center">
                  <p className="mb-4">_____________, {formatDate(new Date())}</p>
                  <p className="mb-8">Hormat Saya,</p>
                  <div className="flex justify-center">
                    <div className="border-2 border-black w-32 h-20 flex items-center justify-center text-sm">Materai 10.000</div>
                  </div>
                  <p>___________________</p>
                  <p className="mt-2 capitalize">{dataProfile?.santri?.fullname}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-bold text-center">Formulir Pendaftaran Belum Tersedia, Pastikan Langkah Sebelumnya Sudah Selesai Terlebih Dahulu</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CetakFormulir;
