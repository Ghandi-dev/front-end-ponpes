"use client";

import * as React from "react";

import { NavMain } from "@/components/layouts/nav-main";
import { NavUser } from "@/components/layouts/nav-user";
import { TeamSwitcher } from "@/components/layouts/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { MENU_LIST_ADMIN, MENU_LIST_SANTRI_ACTIVE, MENU_LIST_SANTRI_INACTIVE } from "@/constant/menu.constants";
import useSidebar from "./useSidebar";
import { IProfile } from "@/types/Auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dataProfile } = useSidebar();
  const data = dataProfile as IProfile;

  const MENU_LIST = data?.role === "admin" ? MENU_LIST_ADMIN : data?.santri?.status === "active_santri" ? MENU_LIST_SANTRI_ACTIVE : MENU_LIST_SANTRI_INACTIVE;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MENU_LIST} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
