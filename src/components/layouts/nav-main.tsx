"use client";

import { type LucideIcon } from "lucide-react";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 🔥 Gunakan `usePathname` bukan `useRouter`
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
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
