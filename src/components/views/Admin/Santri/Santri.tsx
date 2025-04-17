"use client";
import React, { Key, useCallback, useEffect, useMemo, useState } from "react";
import useSantri from "./useSantri";
import DataTable from "@/components/table/DataTable";
import { COLUMN_LIST_SANTRI } from "./Santri.constant";
import { useRouter } from "next/navigation";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Badge } from "@/components/ui/badge";
import { SantriSelectSchemaType } from "@/schemas/santri.schema";
import { cn } from "@/lib/utils";
import { SANTRI_STATUS } from "@/constant/status.constant";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/commons/multi-select/MultiSelect";
import { Input } from "@/components/ui/input";
import { MenuSquare, Search } from "lucide-react";
import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import ButtonAction from "@/components/commons/button/ButtonAction";

const Santri = () => {
  const router = useRouter();
  const { setUrl, handleChangeSearch } = useChangeUrl();
  const { dataSantri, isLoadingSantri, setSelectedId, setStatus, status, handleActivateSantri, isPendingActivate } = useSantri();
  const [openModalAddSantri, setOpenModalAddSantri] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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
            <ButtonAction
              hideButtonActivate={santri.status !== SANTRI_STATUS.PAYMENT_COMPLETED}
              isPendingActivate={isPendingActivate}
              onPressButtonActivate={() => handleActivateSantri(santri.id as number)}
              onPressButtonDetail={() => router.push(`/admin/santri/${santri.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(santri.id as number);
                // deleteCategoryModal.onOpen();
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
      <div className="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4 w-full lg:max-w-[70%]">
          <div className="relative w-full lg:max-w-[30%]">
            <Search className="absolute left-2.5 top-1.5 text-muted-foreground" />
            <Input placeholder="Cari Berdasarkan Nama" className="pl-8" onChange={handleChangeSearch} />
          </div>
          <Button className="bg-primary" onClick={() => setFilterOpen(true)}>
            Filter
            <MenuSquare />
          </Button>
        </div>
        <Button className="bg-primary" onClick={() => setOpenModalAddSantri(true)}>
          {"Tambah Data Santri"}
        </Button>
      </div>
    ),
    [handleChangeSearch]
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
        showLimit
        topContent={topContent}
      />
      {/* Form Add Santri */}
      <DynamicDialog title="Form Tambah Santri" open={openModalAddSantri} onOpenChange={setOpenModalAddSantri} isModal>
        <div className="mt-4 flex flex-col gap-4">
          <Input placeholder="Nama Santri" />
        </div>
      </DynamicDialog>
      {/* Form Filter Santri */}
      <DynamicDialog title="Filter Santri" open={filterOpen} onOpenChange={setFilterOpen}>
        <div className="mt-4 flex flex-col gap-4">
          <MultiSelect
            className="w-full"
            placeholder="Pilih Status"
            maxCount={1}
            onValueChange={setStatus || (() => {})}
            options={Object.values(SANTRI_STATUS).map((status) => ({ label: status, value: status })) || []}
            defaultValue={status}
          />
        </div>
      </DynamicDialog>
    </div>
  );
};

export default Santri;
