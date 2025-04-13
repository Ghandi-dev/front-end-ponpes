"use client";
import React, { Key, useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "@/components/table/DataTable";
import { COLUMN_LIST_SANTRI } from "./Pembayaran.constant";
import { useRouter } from "next/navigation";
import DropdownAction from "@/components/commons/dropdown/DropDownAction";
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

const Pembayaran = () => {
  const router = useRouter();
  const { setUrl, handleChangeSearch } = useChangeUrl();
  const { dataPayment, isLoadingPayment, setSelectedId, setStatus, status, setType, type } = usePembayaran();

  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isModalAddPembayaranOpen, setModalAddPembayaranOpen] = useState(false);
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
              hideButtonActivate={true}
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

  const topContent = useMemo(
    () => (
      <div className="flex flex-col-reverse items-end justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:max-w-[70%]">
          <div className="relative w-full lg:max-w-[30%]">
            <Search className="absolute left-2.5 top-1.5 text-muted-foreground" />
            <Input placeholder="Cari Berdasarkan Nama" className="pl-8" onChange={handleChangeSearch} />
          </div>
          <Button className="bg-primary" onClick={() => setIsFilterDialogOpen(true)}>
            Filter
            <MenuSquare />
          </Button>
        </div>
        <Button className="bg-primary " onClick={() => setModalAddPembayaranOpen(true)}>
          {"Tambah Data Pembayaran"}
        </Button>
      </div>
    ),
    [handleChangeSearch]
  );

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
      <DynamicDialog open={isModalAddPembayaranOpen} onOpenChange={setModalAddPembayaranOpen} title="Tambah Pembayaran" isModal>
        <div className="flex flex-col gap-4">
          <p>Form Pembayaran</p>
          {/* Add your form component here */}
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
        </div>
      </DynamicDialog>
    </div>
  );
};

export default Pembayaran;
