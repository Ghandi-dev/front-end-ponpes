"use client";
import useChangeUrl from "@/hooks/useChangeUrl";
import useUser from "./useUser";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { AdminSelectSchemaType } from "@/schemas/admin.schema";
import ButtonAction from "@/components/commons/button/ButtonAction";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/table/DataTable";
import { COLUMN_LIST_USER } from "./User.constant";
import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import AlertDialogDelete from "@/components/commons/alert-dialog/AlertDialogDelete";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { RegisterAdminSchemaType } from "@/schemas/user.schema";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { InputPasswordWithLabel } from "@/components/commons/inputs/InputPasswordWithLabel";

const User = () => {
  const { dataUser, isLoadingUser, selectedId, setSelectedId, handleDeleteUser, form, handleCreateUser } = useUser();
  const { setUrl, handleChangeSearch } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, []);

  const [openModalAddAdmin, setOpenModalAddAdmin] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailAdminDialogOpen, setIsDetailAdminDialogOpen] = useState(false);

  const selectedUser = useMemo(() => {
    if (!Array.isArray(dataUser?.data)) return null;

    return dataUser?.data.find((item: AdminSelectSchemaType) => item.id === selectedId) as AdminSelectSchemaType;
  }, [dataUser, selectedId]);

  console.log("dataUser", dataUser?.data);

  const renderCell = useCallback(
    (admin: AdminSelectSchemaType, columnKey: Key) => {
      const cellValue = typeof columnKey === "string" && columnKey in admin ? admin[columnKey as keyof typeof admin] : null;

      switch (columnKey) {
        case "actions":
          return (
            <ButtonAction
              onPressButtonDetail={() => {
                setSelectedId(admin.id as number);
                setIsDetailAdminDialogOpen(true);
              }}
              onPressButtonDelete={() => {
                setSelectedId(admin.id as number);
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
      <div className="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4 w-full lg:max-w-[70%]">
          <div className="relative w-full lg:max-w-[30%]">
            <Search className="absolute left-2.5 top-1.5 text-muted-foreground" />
            <Input placeholder="Cari Berdasarkan Nama" className="pl-8" onChange={handleChangeSearch} />
          </div>
        </div>
        <Button className="bg-primary" onClick={() => setOpenModalAddAdmin(true)}>
          {"Tambah Admin"}
        </Button>
      </div>
    ),
    [handleChangeSearch]
  );

  return (
    <div className="p-4">
      <DataTable<AdminSelectSchemaType>
        data={dataUser?.data || []}
        isLoading={isLoadingUser}
        columns={COLUMN_LIST_USER}
        emptyContent="Tidak ada data"
        renderCell={renderCell}
        totalPages={dataUser?.pagination?.totalPages}
        showLimit
        topContent={topContent}
      />
      {/* Form Add Admin */}
      <DynamicDialog title="Form Tambah Admin" open={openModalAddAdmin} onOpenChange={setOpenModalAddAdmin} isModal>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateUser)} className="mt-4 flex flex-col gap-4">
            <div className={cn("grid grid-cols-1 items-start", Object.keys(form.formState.errors).length > 0 ? "gap-3" : "gap-6")}>
              <InputWithLabel<RegisterAdminSchemaType> fieldTitle="Nama Lengkap" nameInSchema={"fullname"} />
              <InputWithLabel<RegisterAdminSchemaType> fieldTitle="Email" nameInSchema={"email"} />
              <InputPasswordWithLabel<RegisterAdminSchemaType> fieldTitle="Password" nameInSchema={"password"} />
              <InputPasswordWithLabel<RegisterAdminSchemaType> fieldTitle="Konfirmasi Password" nameInSchema={"confirmPassword"} />
            </div>
            <div className="flex items-center justify-end gap-4 mt-4">
              <Button variant="secondary" onClick={() => setOpenModalAddAdmin(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-primary">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DynamicDialog>

      {/* Form Detail Admin */}
      <DynamicDialog title="Detail Admin" open={isDetailAdminDialogOpen} onOpenChange={setIsDetailAdminDialogOpen} isModal>
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
          <p className="font-medium text-muted-foreground">Nama</p>
          <p>{selectedUser?.fullname}</p>

          <p className="font-medium text-muted-foreground">No Hp</p>
          <p>{selectedUser?.phoneNumber}</p>
        </div>
      </DynamicDialog>

      {/* Alert Dialog Delete */}
      <AlertDialogDelete
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onClickDelete={handleDeleteUser} // TODO: implement delete action
        title="Konfirmasi Hapus"
        description="Apakah kamu yakin ingin menghapus data ini?"
      />
    </div>
  );
};

export default User;
