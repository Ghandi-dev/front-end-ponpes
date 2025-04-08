import { SquareTerminal, LayoutDashboard, FileText, CreditCard, Printer } from "lucide-react";
const MENU_LIST_ADMIN = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Pendaftaran",
    url: "/admin/pendaftaran",
    icon: SquareTerminal,
  },
  {
    title: "SPP",
    url: "/admin/spp",
    icon: SquareTerminal,
  },
  {
    title: "Laporan",
    url: "/admin/laporan",
    icon: SquareTerminal,
  },
];

const MENU_LIST_SANTRI_INACTIVE = [
  {
    title: "Dashboard",
    url: "/santri/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Formulir",
    url: "/santri/formulir",
    icon: FileText,
  },
  {
    title: "Pembayaran",
    url: "/santri/pembayaran",
    icon: CreditCard,
  },
  {
    title: "Cetak Formulir",
    url: "/cetak-formulir",
    icon: Printer,
  },
];

const MENU_LIST_SANTRI_ACTIVE = [
  {
    title: "Dashboard",
    url: "/santri/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "SPP",
    url: "/santri/spp",
    icon: SquareTerminal,
  },
];

export { MENU_LIST_ADMIN, MENU_LIST_SANTRI_INACTIVE, MENU_LIST_SANTRI_ACTIVE };
