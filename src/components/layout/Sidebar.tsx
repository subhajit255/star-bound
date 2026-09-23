"use client";

import {
  LayoutDashboard,
  Sparkles,
  Telescope, // Constellations
  Radar, // Scans
  CreditCard, // Subscriptions
  ArrowRightLeft, // Transactions
  FileText, // Content
  BarChart, // Reports
  Bell, // Notifications
  Settings, // Settings
  HelpCircle, // Support
  LogOut, // Logout
  Users, // Users
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items
const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Constellations", url: "/constellations", icon: Telescope },
  { title: "Scans", url: "/scans", icon: Radar },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
  { title: "Transactions", url: "/transactions", icon: ArrowRightLeft },
  { title: "Content", url: "/content", icon: FileText },
  { title: "Reports", url: "/reports", icon: BarChart },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Support", url: "/support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarComponent className="border-r-0">
      {/* Background Image injected inside sidebar */}
      <img
        src="/universe_bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen"
      />

      {/* We add relative z-10 to all sections to ensure they sit above the background image */}
      <SidebarHeader className="relative z-10 border-b border-sidebar-border h-16 flex flex-row items-center justify-start px-6 gap-3 bg-sidebar/50 backdrop-blur-sm">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
          <Sparkles className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-bold text-lg tracking-wide text-sidebar-foreground drop-shadow-sm">
            STARBOUND
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="relative z-10 bg-sidebar/50 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 mt-4 px-2">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (pathname.startsWith(item.url + "/") &&
                    item.url !== "/dashboard");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<a href={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-semibold shadow-md shadow-primary/20 h-11 rounded-xl transition-all"
                          : "text-sidebar-foreground/70 hover:text-white hover:bg-white/5 h-11 rounded-xl transition-all font-medium"
                      }
                    >
                      <item.icon
                        className={isActive ? "size-5" : "size-5 opacity-80"}
                      />
                      <span className="text-[15px]">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="relative z-10 p-4 bg-sidebar/50 backdrop-blur-sm">
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<a href="/login" />}
              tooltip="Logout"
              className="text-sidebar-foreground/70 hover:text-white hover:bg-white/5 h-11 rounded-xl transition-all font-medium"
            >
              <LogOut className="size-5 opacity-80" />
              <span className="text-[15px]">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarComponent>
  );
}
