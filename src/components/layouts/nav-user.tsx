"use client";

import { ChevronsUpDown, LogOut, RectangleEllipsis, UserPen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
import useProfile from "@/hooks/useProfile";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { dataProfile } = useProfile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={dataProfile?.profilePicture as string} alt={"avatar"} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{dataProfile?.santri ? dataProfile?.santri?.fullname : dataProfile?.admin?.fullname}</span>
                <span className="truncate text-xs">{dataProfile?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={dataProfile?.profilePicture as string} alt={"avatar"} />
                  <AvatarFallback className="rounded-lg">AL</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{dataProfile?.santri ? dataProfile?.santri?.fullname : dataProfile?.admin?.fullname}</span>
                  <span className="truncate text-xs">{dataProfile?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/${dataProfile?.role}/profile`} className="flex items-center gap-2">
                  <UserPen />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/${dataProfile?.role}/change-password`} className="flex items-center gap-2">
                  <RectangleEllipsis />
                  Ubah Kata Sandi
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex w-full items-center gap-2 px-1 py-1.5 text-left text-sm" onClick={() => signOut({ callbackUrl: "/auth/login" })}>
                <LogOut className="text-red-500" />
                Logout
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
