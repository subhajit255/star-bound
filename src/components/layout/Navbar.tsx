"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/StoreProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

function Clock() {
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time)
    return (
      <div className="flex flex-col text-right hidden sm:flex mr-6 w-32"></div>
    );

  return (
    <div className="flex flex-col text-right hidden sm:flex mr-6">
      <span className="text-sm font-semibold tracking-wide text-slate-800 mb-0.5">
        {time.toLocaleTimeString("en-US", { hour12: true })}
      </span>
      <span className="text-[11px] text-slate-500 italic font-medium">
        {time.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </div>
  );
}

export function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between px-6 bg-white sticky top-0 z-30 border-b border-border shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2 text-slate-500 hover:text-slate-900" />
        <h1 className="text-xl font-semibold tracking-wide text-slate-800 hidden sm:block">
          Welcome, {user?.name || "Super Admin"}
        </h1>
      </div>

      <div className="flex items-center">
        <Clock />

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer p-2.5 rounded-lg hover:bg-slate-100 transition-colors bg-white border border-slate-200 shadow-sm">
            <Bell className="h-5 w-5 text-slate-600" fill="currentColor" />
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-sm">
              0
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-none bg-transparent p-0 flex items-center justify-center rounded-lg hover:ring-2 hover:ring-slate-300 transition-all cursor-pointer">
              <Avatar className="h-11 w-11 rounded-lg bg-[#b0b3b8] border-none shadow-sm">
                <AvatarFallback className="bg-[#b0b3b8] rounded-lg">
                  <User
                    className="h-7 w-7 text-white mt-2"
                    fill="currentColor"
                  />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-[280px] mt-2 p-0 rounded-2xl shadow-xl border-slate-200 bg-white"
            >
              <DropdownMenuGroup className="p-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 rounded-xl bg-[#b0b3b8] shadow-sm shrink-0">
                    <AvatarFallback className="bg-[#b0b3b8] rounded-xl">
                      <User
                        className="h-8 w-8 text-white mt-1"
                        fill="currentColor"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-[16px] font-bold text-slate-900 tracking-tight truncate">
                      {user?.name || "super admin"}
                    </p>
                    <p className="text-[14px] text-slate-500 font-medium mt-0.5 truncate">
                      {user?.email || "super.admin@starbound.com"}
                    </p>
                  </div>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="m-0 bg-slate-100 h-[1px]" />

              <div className="p-2">
                <DropdownMenuItem className="cursor-pointer py-3.5 px-4 rounded-xl text-[15px] text-slate-800 font-semibold focus:bg-slate-50 focus:text-slate-900 transition-colors">
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3.5 px-4 rounded-xl text-[15px] text-slate-800 font-semibold focus:bg-slate-50 focus:text-slate-900 transition-colors">
                  Change Password
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="m-0 bg-slate-100 h-[1px]" />

              <div className="p-2">
                <DropdownMenuItem className="cursor-pointer py-3.5 px-4 rounded-xl text-[15px] text-slate-800 font-semibold focus:bg-slate-50 focus:text-slate-900 transition-colors">
                  Sign Out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
