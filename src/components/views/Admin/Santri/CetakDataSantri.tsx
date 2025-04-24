"use client";
import useProfile from "@/hooks/useProfile";
import { SantriSelectSchemaType } from "@/schemas/santri.schema";
import { formatDate } from "@/utils/date";
import { translateGender } from "@/utils/translateGender";
import Image from "next/image";
import { useEffect, useState } from "react";

const CetakDataSantri = () => {
  const { dataProfile } = useProfile();
  const [data, setData] = useState<SantriSelectSchemaType[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("santriData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed.data)) {
          setData(parsed.data); // hanya set ke bagian data-nya saja
        }
      } catch (e) {
        console.error("Data tidak valid:", e);
      }
    }
  }, []);

  console.log(dataProfile);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 m-0 print:bg-white">
      <div className="w-[210mm] h-[297mm] bg-white shadow-lg p-10 relative border print:shadow-none print:border-none overflow-auto">
        {/* Kop Surat */}
        <header className="relative border-b pb-4 mb-6 flex items-center">
          <Image src="/logo.png" width={100} height={100} alt="Logo" className="absolute h-16 w-16 mr-4" />
          <div className="text-center w-full">
            <h1 className="text-xl font-bold uppercase">PONPES AL-MUTHOHHAR</h1>
            <p className="text-sm">Kampung Legok, rt.10, rw.01, Desa Palinggihan, Kecamatan Plered, Kabupaten Purwakarta</p>
          </div>
        </header>

        {/* Tabel Pembayaran */}
        <h2 className="text-lg font-semibold mb-4 text-center">Laporan Data Santri</h2>

        <table className="table-auto w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">Nama Lengkap</th>
              <th className="border px-2 py-1">Jenis Kelamin</th>
              <th className="border px-2 py-1">Tempat, Tanggal Lahir</th>
              <th className="border px-2 py-1">NISN</th>
              <th className="border px-2 py-1">Telepon</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1 text-center">{index + 1}</td>
                  <td className="border px-2 py-1">{item.fullname}</td>
                  <td className="border px-2 py-1 text-center">{translateGender(item.gender)}</td>
                  <td className="border px-2 py-1 text-center">
                    {item.placeOfBirth}, {new Date(item.dateOfBirth).toLocaleDateString("id-ID")}
                  </td>
                  <td className="border px-2 py-1 text-center">{item.nisn}</td>
                  <td className="border px-2 py-1 text-center">{item.phoneNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Tidak ada data santri.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-16 text-center">
          <p className="text-end px-8">Purwakarta, {formatDate(new Date())}</p>
          <div className="flex justify-between px-12">
            {/* Kiri: Kepala Ponpes */}
            <div className="text-center">
              <p>Mengetahui,</p>
              <p className="mb-12">Pimpinan Ponpes AL-MUTHOHHAR</p>
              <p>___________________</p>
              <p className="mt-2">Nama Kepala Ponpes</p>
            </div>

            {/* Kanan: Keuangan */}
            <div className="text-center">
              <p>Mengetahui,</p>
              <p className="mb-12">Keuangan</p>
              <p>___________________</p>
              <p className="mt-2 capitalize">{dataProfile?.admin?.fullname}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CetakDataSantri;
