"use client";
import React, { Key, useCallback, useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import { COLUMN_LIST_SANTRI } from "./Pembayaran.constant";
import { useRouter } from "next/navigation";
import DropdownAction from "@/components/commons/dropdown/DropDownAction";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SANTRI_STATUS, STATUS_PAYMENT } from "@/constant/status.constant";
import { Button } from "@/components/ui/button";
import usePembayaran from "./usePembayaran";
import { SelectPaymentSchemaType } from "@/schemas/payment.schema";

const Pembayaran = () => {
  const router = useRouter();
  const { setUrl } = useChangeUrl();
  const { dataPayment, isLoadingPayment, setSelectedId, setStatus, status } = usePembayaran();
  const [open, setOpen] = useState(false);
  console.log(dataPayment);

  useEffect(() => {
    setUrl();
  }, []);

  const renderCell = useCallback(
    (payment: SelectPaymentSchemaType, columnKey: Key) => {
      const cellValue = typeof columnKey === "string" && columnKey in payment ? payment[columnKey as keyof typeof payment] : null;

      switch (columnKey) {
        case "fullname":
          return <p>{payment?.santri?.fullname}</p>;
        case "amount":
          return <p>Rp{payment?.amount.toLocaleString("id-ID")}</p>;
        case "status":
          const statusClass = payment?.status === STATUS_PAYMENT.COMPLETED ? "bg-primary" : "bg-amber-400 text-accent-foreground";
          return <Badge className={cn(statusClass)}>{payment?.status ?? "UNKNOWN"}</Badge>;

        case "actions":
          return (
            <DropdownAction
              hideButtonActivate={payment?.status !== STATUS_PAYMENT.COMPLETED}
              onPressButtonDelete={() => {
                setSelectedId(payment?.id as number);
                // deleteCategoryModal.onOpen();
              }}
              onPressButtonDetail={() => router.push(`/admin/pembayaran/${payment?.id}`)}
            />
          );

        default:
          return cellValue as React.ReactNode;
      }
    },
    [router, setSelectedId]
  );

  return (
    <div className="p-4">
      <DataTable<SelectPaymentSchemaType>
        data={dataPayment?.data || []}
        isLoading={isLoadingPayment}
        columns={COLUMN_LIST_SANTRI}
        emptyContent="Tidak ada data"
        renderCell={renderCell}
        totalPages={dataPayment?.pagination?.totalPages}
        buttonTopContentLabel="Tambah Data Payment"
        onClickButtonTopContent={() => setOpen(true)}
        showLimit
        showMultiSelect
        optionMultiSelect={Object.values(STATUS_PAYMENT).map((status) => ({ label: status, value: status }))}
        onValueChange={setStatus}
        defaultValue={status}
      />
      {/* <DialogAddPayment open={open} onOpenChange={setOpen}>
        <div className="mt-4">
          <p>Form Payment disini</p>
          <Button onClick={() => setOpen(false)}>Simpan</Button>
        </div>
      </DialogAddPayment> */}
    </div>
  );
};

export default Pembayaran;
