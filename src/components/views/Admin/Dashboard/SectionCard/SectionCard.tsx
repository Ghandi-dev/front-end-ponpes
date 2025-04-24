import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { convertIDR } from "@/utils/currency";
import React from "react";

interface PropTypes {
  isLoading?: boolean;
  totalSantri: number;
  totalPembayaranRegistrasi: number;
  totalPembayaranSPP: number;
}

const SectionCard = (props: PropTypes) => {
  const { totalSantri, totalPembayaranRegistrasi, totalPembayaranSPP, isLoading } = props;
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid lg:grid-cols-3 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card ">
      <Card className="@container/card border-1 border-primary">
        <CardHeader className="relative">
          <CardDescription>Total Santri</CardDescription>
          {isLoading ? (
            <Spinner className="text-primary" />
          ) : (
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{totalSantri}</CardTitle>
          )}
        </CardHeader>
      </Card>
      <Card className="@container/card border-1 border-primary">
        <CardHeader className="relative">
          <CardDescription>Total Pembayaran Registrasi</CardDescription>
          {isLoading ? (
            <Spinner className="text-primary" />
          ) : (
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{convertIDR(totalPembayaranRegistrasi)}</CardTitle>
          )}
        </CardHeader>
      </Card>

      <Card className="@container/card border-1 border-primary">
        <CardHeader className="relative">
          <CardDescription>Total Pembayaran SPP</CardDescription>
          {isLoading ? (
            <Spinner className="text-primary" />
          ) : (
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{convertIDR(totalPembayaranSPP)}</CardTitle>
          )}
        </CardHeader>
      </Card>
    </div>
  );
};

export default SectionCard;
