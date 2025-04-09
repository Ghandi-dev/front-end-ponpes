"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface SantriDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
}

const DialogAddSantri = ({ open, onOpenChange, children }: SantriDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Data Santri</DialogTitle>
          <DialogDescription>Lengkapi form berikut untuk menambahkan santri baru.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddSantri;
