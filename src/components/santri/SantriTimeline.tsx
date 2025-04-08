import { Badge } from "@/components/ui/badge";
import { SANTRI_STATUS } from "@/constant/status.constant";

const timelineSteps = [
  { key: SANTRI_STATUS.PENDING_REGISTRATION, label: "Registrasi Awal" },
  { key: SANTRI_STATUS.PROFILE_COMPLETED, label: "Lengkapi Profil" },
  { key: SANTRI_STATUS.ADDRESS_COMPLETED, label: "Lengkapi Alamat" },
  { key: SANTRI_STATUS.FILES_COMPLETED, label: "Upload Dokumen" },
  { key: SANTRI_STATUS.PAYMENT_COMPLETED, label: "Pembayaran" },
  { key: SANTRI_STATUS.RE_REGISTERED, label: "Daftar Ulang" },
];

export default function SantriTimeline({ currentStatus }: { currentStatus: SANTRI_STATUS }) {
  const currentIndex = timelineSteps.findIndex((step) => step.key === currentStatus);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Timeline Pendaftaran</h2>
      {timelineSteps.map((step, index) => {
        const status: "done" | "in-progress" | "pending" = index <= currentIndex ? "done" : index === currentIndex + 1 ? "in-progress" : "pending";

        return (
          <div key={step.key} className="relative pl-6">
            <span className="absolute left-2 top-1 h-full w-0.5 bg-muted" />
            <span
              className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${
                status === "done"
                  ? "bg-green-500 border-green-500"
                  : status === "in-progress"
                  ? "bg-yellow-500 border-yellow-500"
                  : "bg-gray-300 border-gray-300"
              }`}
            />
            <div className="ml-4">
              <p className="font-semibold text-md">{step.label}</p>
              <Badge
                variant="outline"
                className={`mt-1 ${
                  status === "done"
                    ? "border-green-500 text-green-500"
                    : status === "in-progress"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-gray-400 text-gray-400"
                }`}
              >
                {status.replace("-", " ")}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
