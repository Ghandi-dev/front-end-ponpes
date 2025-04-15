import { SquareTerminal, LayoutDashboard, FileText, CreditCard, Printer, Wallet } from "lucide-react";
const MENU_LIST_ADMIN = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Santri",
    url: "/admin/santri",
    icon: SquareTerminal,
  },
  {
    title: "Pembayaran",
    url: "/admin/pembayaran",
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
    icon: Wallet,
  },
];

export { MENU_LIST_ADMIN, MENU_LIST_SANTRI_INACTIVE, MENU_LIST_SANTRI_ACTIVE };
