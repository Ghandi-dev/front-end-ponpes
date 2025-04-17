"use client";

import { Badge } from "@/components/ui/badge";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/lib/utils";
import { SelectPaymentSchemaType, STATUS_PAYMENT } from "@/schemas/payment.schema";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import useSPP from "./useSPP";
import { MenuSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/table/DataTable";
import { COLUMN_LIST_PAYMENT } from "./SPP.constant";
import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import { MultiSelect } from "@/components/commons/multi-select/MultiSelect";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import Script from "next/script";
import environment from "@/config/environment";

const SPP = () => {
  const { setUrl, handleChangeSearch } = useChangeUrl();
  const { dataPayment, isLoadingPayment, setStatus, status, date, setDate, handleMidtransSnap, orderId, transactionStatus, mutateUpdatePayment } = useSPP();
  const [activeRange, setActiveRange] = useState<string | null>("30days");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  useEffect(() => {
    setUrl();
  }, []);

  useEffect(() => {
    if (orderId && transactionStatus) {
      mutateUpdatePayment();
    }
  }, [orderId, transactionStatus, mutateUpdatePayment]); // Mutate hanya jalan sekali saat orderId dan transactionStatus berubah

  const renderCell = useCallback(
    (payment: SelectPaymentSchemaType, columnKey: Key) => {
      const cellValue = typeof columnKey === "string" && columnKey in payment ? payment[columnKey as keyof typeof payment] : null;

      switch (columnKey) {
        case "fullname":
          return <p>{payment?.santri?.fullname}</p>;
        case "createdAt":
          return <p>{new Date(payment?.createdAt).toLocaleDateString("id-ID")}</p>;
        case "amount":
          return <p>Rp{payment?.amount.toLocaleString("id-ID")}</p>;
        case "status":
          const statusClass = payment?.status === STATUS_PAYMENT.COMPLETED ? "bg-primary" : "bg-amber-400 text-accent-foreground";
          return <Badge className={cn(statusClass)}>{payment?.status ?? "UNKNOWN"}</Badge>;

        case "actions":
          return (
            <Button
              disabled={payment?.status === STATUS_PAYMENT.COMPLETED}
              className={cn("bg-primary")}
              onClick={() => handleMidtransSnap(payment?.detail?.token)}
            >
              Bayar
            </Button>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    [handleMidtransSnap]
  );

  const topContent = useMemo(
    () => (
      <div className="flex flex-col-reverse items-end justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4 w-full lg:max-w-[70%]">
          <Button className="bg-primary" onClick={() => setIsFilterDialogOpen(true)}>
            Filter
            <MenuSquare />
          </Button>
        </div>
      </div>
    ),
    [handleChangeSearch]
  );

  return (
    <div className="p-4">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => console.log("Midtrans Snap loaded")}
      />
      <DataTable<SelectPaymentSchemaType>
        topContent={topContent}
        data={dataPayment?.data || []}
        isLoading={isLoadingPayment}
        columns={COLUMN_LIST_PAYMENT}
        emptyContent="Tidak ada data"
        renderCell={renderCell}
        totalPages={dataPayment?.pagination?.totalPages}
        showLimit
      />
      <DynamicDialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen} title="Filter Pembayaran">
        <div className="mt-4 flex flex-col gap-4">
          <MultiSelect
            className="w-full"
            placeholder="Pilih Status"
            maxCount={1}
            onValueChange={setStatus || (() => {})}
            options={Object.values(STATUS_PAYMENT).map((status) => ({ label: status, value: status })) || []}
            defaultValue={status}
          />
          <DatePickerWithRange date={date} setDate={setDate} activeRange={activeRange} setActiveRange={setActiveRange} />
        </div>
      </DynamicDialog>
    </div>
  );
};

export default SPP;
