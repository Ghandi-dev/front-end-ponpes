"use client";
import Image from "next/image";
import React from "react";
import RegisterForm from "./RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted hidden lg:flex items-center justify-center relative">
        <Image src="/logo.png" alt="Login Image" className="dark:brightness-[0.2] dark:grayscale" width={600} height={600} />
      </div>
    </div>
  );
};

export default Register;
