"use client";

// import { type LucideIcon } from "lucide-react";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 🔥 Gunakan `usePathname` bukan `useRouter`
import { cn } from "@/lib/utils";
import { MENU_LIST_ADMIN, MENU_LIST_SANTRI_ACTIVE, MENU_LIST_SANTRI_INACTIVE } from "@/constant/menu.constants";
import { IProfile } from "@/types/Auth";

export function NavMain({ user }: { user?: IProfile }) {
  const items = user?.role === "admin" ? MENU_LIST_ADMIN : user?.santri?.status === "active_santri" ? MENU_LIST_SANTRI_ACTIVE : MENU_LIST_SANTRI_INACTIVE;
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link
              href={item.url}
              target={item.url === "/cetak-formulir" ? "_blank" : undefined}
              rel={item.url === "/santri/cetak-formulir" ? "noopener noreferrer" : undefined}
            >
              <SidebarMenuButton
                tooltip={item.title}
                className={cn("hover:bg-primary hover:text-primary-foreground", pathname.includes(item.url) && "bg-primary text-primary-foreground")}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
