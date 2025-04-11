"use client";
import useProfile from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import environment from "@/config/environment";
import Script from "next/script";
import React, { useEffect } from "react";
import usePembayaran from "./usePembayaran";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const Pembayaran = () => {
  const { dataProfile, refetchProfile } = useProfile();
  const searchParams = useSearchParams();

  // Ambil parameter dari URL
  const orderId = searchParams.get("order_id");
  const transactionStatus = searchParams.get("transaction_status");

  const { handleCreatePayment, isPendingCreatePayment, dataPayment, handleMidtransSnap, isLoadingDataPayment, mutateUpdatePayment, isSuccessUpdatePayment } =
    usePembayaran();

  useEffect(() => {
    if (orderId && transactionStatus) {
      mutateUpdatePayment();
    }
  }, [orderId, transactionStatus, mutateUpdatePayment]); // Mutate hanya jalan sekali saat orderId dan transactionStatus berubah

  useEffect(() => {
    if (isSuccessUpdatePayment) {
      refetchProfile();
    }
  }, [isSuccessUpdatePayment, refetchProfile]); // Hanya refetch saat status update berubah

  return (
    <>
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => console.log("Midtrans Snap loaded")}
      />
      <Card className="mx-4 grid lg:grid-cols-2 gap-4 p-4">
        <div className="relative flex flex-col gap-4 min-h-80 bg-accent rounded-2xl items-center justify-center shadow-lg p-6">
          {dataPayment && (
            <span
              className={cn("absolute top-4 right-4 px-3 py-1 text-sm font-medium text-white rounded-full shadow", {
                "bg-green-500": dataPayment?.status === "completed",
                "bg-gray-500": dataPayment?.status === "pending",
                "bg-red-500": dataPayment?.status === "canceled" || dataPayment.length === 0,
              })}
            >
              {dataPayment?.status ?? "Belum bayar"}
            </span>
          )}
          <h1 className="text-lg font-semibold text-gray-700">Total yang harus dibayar</h1>
          <h1 className="text-3xl font-bold text-primary tracking-wide">Rp. 250.000</h1>
        </div>

        <div className="flex flex-col gap-4">
          <CardHeader className="p-0 lg:p-1.5">
            <CardTitle>Pembayaran</CardTitle>
            <p className="text-sm text-gray-500">Pastikan data anda sudah benar</p>
          </CardHeader>
          <CardContent className="grid gap-4 p-0 lg:p-1.5">
            <div className="grid gap-2">
              <Label>Nama</Label>
              <Input className="capitalize" type="text" placeholder="Nominal" value={dataProfile?.santri?.fullname ?? ""} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Tempat Lahir</Label>
              <Input className="capitalize" type="text" placeholder="Nominal" value={dataProfile?.santri?.placeOfBirth ?? ""} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Tanggal Lahir</Label>
              <Input className="capitalize" type="date" placeholder="Nominal" value={(dataProfile?.santri?.dateOfBirth as number) ?? ""} disabled />
            </div>
          </CardContent>
          <Button
            type="button"
            onClick={() =>
              dataPayment && dataPayment?.detail?.token
                ? handleMidtransSnap(dataPayment?.detail?.token)
                : handleCreatePayment(dataProfile?.santri?.status || "")
            }
            disabled={isPendingCreatePayment || isLoadingDataPayment || dataPayment?.status === "completed" || dataProfile?.santri?.status === "payment_reg"}
          >
            {isLoadingDataPayment || isPendingCreatePayment ? <Spinner /> : "Bayar"}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Pembayaran;
