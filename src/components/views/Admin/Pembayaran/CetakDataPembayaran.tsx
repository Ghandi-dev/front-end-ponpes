"use client";
import useProfile from "@/hooks/useProfile";
import { SelectPaymentSchemaType } from "@/schemas/payment.schema";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { useEffect, useState } from "react";

const CetakDataPembayaran = () => {
  const { dataProfile } = useProfile();
  const [data, setData] = useState<SelectPaymentSchemaType[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("paymentData");
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
        <h2 className="text-lg font-semibold mb-4 text-center">Laporan Data Pembayaran</h2>

        <table className="table-auto w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">Nama</th>
              <th className="border px-2 py-1">Tanggal</th>
              <th className="border px-2 py-1">Jenis</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Nominal</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1 text-center">{index + 1}</td>
                  <td className="border px-2 py-1">{item.santri?.fullname}</td>
                  <td className="border px-2 py-1 text-center">{formatDate(new Date(item.createdAt))}</td>
                  <td className="border px-2 py-1 text-center">{item.type}</td>
                  <td className="border px-2 py-1 text-center">{item.status}</td>
                  <td className="border px-2 py-1 text-right">Rp {item.amount.toLocaleString("id-ID")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Tidak ada data pembayaran.
                </td>
              </tr>
            )}
          </tbody>
          {data.length > 0 && (
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan={5} className="border px-2 py-1 text-right">
                  Total
                </td>
                <td className="border px-2 py-1 text-right">Rp {data.reduce((total, item) => total + item.amount, 0).toLocaleString("id-ID")}</td>
              </tr>
            </tfoot>
          )}
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

export default CetakDataPembayaran;
