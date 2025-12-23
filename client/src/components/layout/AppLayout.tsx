import { ReactNode } from "react";
import { Sidebar, type SidebarItem } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  sidebarFooterItems?: SidebarItem[];
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showLogout?: boolean;
}

export function AppLayout({
  children,
  sidebarItems,
  sidebarFooterItems = [],
  showSearch = true,
  searchValue = "",
  onSearchChange,
  searchPlaceholder,
  showLogout = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] flex flex-col">
      <TopBar
        showSearch={showSearch}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
      />
      <div className="flex flex-1">
        <Sidebar
          items={sidebarItems}
          footerItems={sidebarFooterItems}
          showLogout={showLogout}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export { type SidebarItem } from "./Sidebar";
