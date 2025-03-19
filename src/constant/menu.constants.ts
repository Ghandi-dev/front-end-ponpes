import { SquareTerminal } from "lucide-react";

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
    icon: SquareTerminal,
  },
  {
    title: "Formulir",
    url: "/santri/formulir",
    icon: SquareTerminal,
  },
  {
    title: "Pembayaran",
    url: "/santri/pembayaran",
    icon: SquareTerminal,
  },
  {
    title: "Cetak Formulir",
    url: "/santri/cetak-formulir",
    icon: SquareTerminal,
  },
];

const MENU_LIST_SANTRI_ACTIVE = [
  {
    title: "Dashboard",
    url: "/santri/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "SPP",
    url: "/santri/spp",
    icon: SquareTerminal,
  },
];

export { MENU_LIST_ADMIN, MENU_LIST_SANTRI_INACTIVE, MENU_LIST_SANTRI_ACTIVE };
