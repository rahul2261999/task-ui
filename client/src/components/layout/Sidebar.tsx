import { User, LogOut, LucideIcon } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
}

interface SidebarProps {
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  showLogout?: boolean;
}

export function Sidebar({ items, footerItems = [], showLogout = true }: SidebarProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return location === href || location.startsWith(href + "/");
  };

  const renderMenuItem = (item: SidebarItem, isFooterItem = false) => {
    const active = isActive(item.href);
    const baseClasses = `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-sm transition-colors`;
    const activeClasses = active
      ? "text-[#ff6767] bg-white/20"
      : "text-[#ff6767]/70 hover:text-[#ff6767] hover:bg-white/10";

    const content = (
      <>
        <item.icon className="w-5 h-5" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge !== undefined && (
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </>
    );

    if (item.href) {
      return (
        <Link href={item.href} key={item.id}>
          <button
            className={`${baseClasses} ${activeClasses}`}
            data-testid={`button-sidebar-${item.id}`}
          >
            {content}
          </button>
        </Link>
      );
    }

    return (
      <button
        key={item.id}
        onClick={item.onClick}
        className={`${baseClasses} ${activeClasses}`}
        data-testid={`button-sidebar-${item.id}`}
      >
        {content}
      </button>
    );
  };

  return (
    <aside className="w-[220px] bg-[#ffe8e8] min-h-full flex flex-col">
      <div className="p-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-gray-500" />
        </div>
        <h2
          className="font-['Montserrat',sans-serif] font-semibold text-[#ff6767] text-sm"
          data-testid="text-sidebar-username"
        >
          {user?.name || "User"}
        </h2>
        <p
          className="font-['Montserrat',sans-serif] text-[#ff6767]/70 text-xs"
          data-testid="text-sidebar-email"
        >
          {user?.email || ""}
        </p>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>{renderMenuItem(item)}</li>
          ))}
        </ul>
      </nav>

      <div className="p-4 space-y-1">
        {footerItems.map((item) => (
          <div key={item.id}>{renderMenuItem(item, true)}</div>
        ))}
        {showLogout && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#ff6767] hover:bg-white/20 transition-colors"
            data-testid="button-sidebar-logout"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
