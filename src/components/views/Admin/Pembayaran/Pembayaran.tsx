"use client";
import React, { Key, useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "@/components/table/DataTable";
import { COLUMN_LIST_SANTRI } from "./Pembayaran.constant";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STATUS_PAYMENT, TYPE_PAYMENT } from "@/constant/status.constant";
import { Button } from "@/components/ui/button";
import usePembayaran from "./usePembayaran";
import { SelectPaymentSchemaType } from "@/schemas/payment.schema";
import { MenuSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/commons/multi-select/MultiSelect";
import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import ButtonAction from "@/components/commons/button/ButtonAction";
import AlertDialogDelete from "@/components/commons/alert-dialog/AlertDialogDelete";

const Pembayaran = () => {
  const { setUrl, handleChangeSearch } = useChangeUrl();
  const { dataPayment, isLoadingPayment, selectedId, setSelectedId, setStatus, status, setType, type, date, setDate } = usePembayaran();
  const [activeRange, setActiveRange] = useState<string | null>("30days");

  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isDetailPembayaranDialogOpen, setIsDetailPembayaranDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setUrl();
  }, []);

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
            <ButtonAction
              // hideButtonActivate={true}
              onPressButtonDetail={() => {
                setSelectedId(payment?.santriId as number);
                setIsDetailPembayaranDialogOpen(true);
              }}
              onPressButtonDelete={() => {
                setSelectedId(payment?.santriId as number);
                setIsDeleteDialogOpen(true);
              }}
            />
          );

        default:
          return cellValue as React.ReactNode;
      }
    },
    [setSelectedId]
  );

  const topContent = useMemo(
    () => (
      <div className="flex flex-col-reverse items-end justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4 w-full lg:max-w-[70%]">
          <div className="relative w-full lg:max-w-[30%]">
            <Search className="absolute left-2.5 top-1.5 text-muted-foreground" />
            <Input placeholder="Cari Berdasarkan Nama" className="pl-8" onChange={handleChangeSearch} />
          </div>
          <Button className="bg-primary" onClick={() => setIsFilterDialogOpen(true)}>
            Filter
            <MenuSquare />
          </Button>
        </div>
      </div>
    ),
    [handleChangeSearch]
  );

  const selectedPayment = useMemo(() => {
    if (!Array.isArray(dataPayment?.data)) return null;

    return dataPayment?.data.find((item: SelectPaymentSchemaType) => item.santriId === selectedId) as SelectPaymentSchemaType;
  }, [dataPayment, selectedId]);

  return (
    <div className="p-4">
      <DataTable<SelectPaymentSchemaType>
        topContent={topContent}
        data={dataPayment?.data || []}
        isLoading={isLoadingPayment}
        columns={COLUMN_LIST_SANTRI}
        emptyContent="Tidak ada data"
        renderCell={renderCell}
        totalPages={dataPayment?.pagination?.totalPages}
        showLimit
      />
      <DynamicDialog open={isDetailPembayaranDialogOpen} onOpenChange={setIsDetailPembayaranDialogOpen} title="Detail Pembayaran">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
          <p className="font-medium text-muted-foreground">Nama Santri</p>
          <p>{selectedPayment?.santri?.fullname}</p>

          <p className="font-medium text-muted-foreground">ID Pembayaran</p>
          <p>{selectedPayment?.paymentId}</p>

          <p className="font-medium text-muted-foreground">Status</p>
          <p>{selectedPayment?.status}</p>

          <p className="font-medium text-muted-foreground">Jumlah</p>
          <p>Rp{selectedPayment?.amount.toLocaleString("id-ID")}</p>

          <p className="font-medium text-muted-foreground">Tipe</p>
          <p>{selectedPayment?.type.toUpperCase()}</p>

          <p className="font-medium text-muted-foreground">Catatan</p>
          <p>{selectedPayment?.note}</p>

          <p className="font-medium text-muted-foreground">Bulan / Tahun</p>
          <p>
            {selectedPayment?.month} / {selectedPayment?.year}
          </p>
        </div>
      </DynamicDialog>

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
          <MultiSelect
            className="w-full"
            placeholder="Pilih Tipe"
            maxCount={1}
            onValueChange={setType || (() => {})}
            options={Object.values(TYPE_PAYMENT).map((status) => ({ label: status, value: status })) || []}
            defaultValue={type}
          />
          <DatePickerWithRange date={date} setDate={setDate} activeRange={activeRange} setActiveRange={setActiveRange} />
        </div>
      </DynamicDialog>
      <AlertDialogDelete
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onClickDelete={() => alert("Delete")} // TODO: implement delete action
        title="Konfirmasi Hapus"
        description="Apakah kamu yakin ingin menghapus data ini?"
      />
    </div>
  );
};

export default Pembayaran;
