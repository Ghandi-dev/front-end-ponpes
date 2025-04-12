"use client";
import React, { Key, useCallback, useEffect, useState } from "react";
import useSantri from "./useSantri";
import DataTable from "@/components/table/DataTable";
import { COLUMN_LIST_SANTRI } from "./Santri.constant";
import { useRouter } from "next/navigation";
import DropdownAction from "@/components/commons/dropdown/DropDownAction";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Badge } from "@/components/ui/badge";
import { SantriSelectSchemaType } from "@/schemas/santri.schema";
import { cn } from "@/lib/utils";
import { SANTRI_STATUS } from "@/constant/status.constant";
import { Button } from "@/components/ui/button";
import DialogAddSantri from "./DialogAdd/DialogAddSantri";

const Santri = () => {
  const router = useRouter();
  const { setUrl } = useChangeUrl();
  const { dataSantri, isLoadingSantri, setSelectedId, setStatus, status } = useSantri();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUrl();
  }, []);

  const renderCell = useCallback(
    (santri: SantriSelectSchemaType, columnKey: Key) => {
      const cellValue = typeof columnKey === "string" && columnKey in santri ? santri[columnKey as keyof typeof santri] : null;

      switch (columnKey) {
        case "status":
          const statusClass = santri.status === SANTRI_STATUS.ACTIVE ? "bg-primary" : "bg-amber-400 text-accent-foreground";
          return <Badge className={cn(statusClass)}>{santri.status ?? "UNKNOWN"}</Badge>;

        case "actions":
          return (
            <DropdownAction
              hideButtonActivate={santri.status !== SANTRI_STATUS.PAYMENT_COMPLETED}
              onPressButtonDelete={() => {
                setSelectedId(santri.id as number);
                // deleteCategoryModal.onOpen();
              }}
              onPressButtonDetail={() => router.push(`/admin/santri/${santri.id}`)}
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
      <DataTable<SantriSelectSchemaType>
        data={dataSantri?.data || []}
        isLoading={isLoadingSantri}
        columns={COLUMN_LIST_SANTRI}
        emptyContent="Tidak ada data"
        renderCell={renderCell}
        totalPages={dataSantri?.pagination?.totalPages}
        buttonTopContentLabel="Tambah Data Santri"
        onClickButtonTopContent={() => setOpen(true)}
        showLimit
        showMultiSelect
        optionMultiSelect={Object.values(SANTRI_STATUS).map((status) => ({ label: status, value: status }))}
        onValueChange={setStatus}
        defaultValue={status}
      />
      <DialogAddSantri open={open} onOpenChange={setOpen}>
        {/* Tempelkan form kamu di sini */}
        <div className="mt-4">
          <p>Form Santri disini</p>
          <Button onClick={() => setOpen(false)}>Simpan</Button>
        </div>
      </DialogAddSantri>
    </div>
  );
};

export default Santri;
