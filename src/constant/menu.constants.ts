import { LayoutDashboard, FileText, CreditCard, Printer, Wallet, Users, UserCog } from "lucide-react";
const MENU_LIST_ADMIN = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Santri",
    url: "/admin/santri",
    icon: Users,
  },
  {
    title: "Pembayaran",
    url: "/admin/pembayaran",
    icon: Wallet,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: UserCog,
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
