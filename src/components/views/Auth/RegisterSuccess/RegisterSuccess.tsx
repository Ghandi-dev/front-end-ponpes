"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const RegisterSuccess = () => {
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image src="/illustrations/undraw_subscriber_whh0.svg" alt="success" width={300} height={300} />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold text-danger-500">Berhasil Mendaftar</h2>
        <p className="text-small">Terimakasih telah mendaftar, silahkan cek email anda untuk aktivasi akun</p>
        <Button className="mt-4 w-fit" color="danger" onClick={() => window.open("https://mail.google.com/", "_blank")}>
          Buka Gmail
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
