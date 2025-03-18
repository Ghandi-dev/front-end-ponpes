"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropsType {
  status: "success" | "failed";
}

const Activation = (props: PropsType) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={status === "success" ? "/illustrations/undraw_complete-task_qgwk.svg" : "/illustrations/undraw_access-denied_krem.svg"}
          alt="activation"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold text-danger-500">{status === "success" ? "Activation Success" : "Activation Failed"}</h2>
        <p className="text-small">{status === "success" ? "Terimakasih telah mengaktifkan akun" : "Gagal mengaktifkan akun"}</p>
        <Button className="mt-4 w-fit" color="danger" onClick={() => router.push("/auth/login")}>
          Ke halaman login
        </Button>
      </div>
    </div>
  );
};

export default Activation;
