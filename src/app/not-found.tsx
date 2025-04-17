"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-1 h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image src="/illustrations/undraw_page-not-found_6wni.svg" alt="not found" width={300} height={300} />
        <h1>Halaman Tidak Ditemukan</h1>
        <Button variant="outline" className="w-fit" onClick={() => window.history.back()}>
          Kembali ke Halaman Sebelumnya
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
