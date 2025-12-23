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

  const renderMenuItem = (item: SidebarItem) => {
    const active = isActive(item.href);
    const baseClasses = `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-sm transition-colors`;
    const activeClasses = active
      ? "bg-white/20 text-white"
      : "text-white/90 hover:bg-white/10";

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
    <aside className="w-[220px] bg-gradient-to-b from-[#ff6767] to-[#ff5252] min-h-full flex flex-col">
      <div className="p-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-lg bg-white/20 overflow-hidden flex items-center justify-center mb-3">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2
          className="font-['Montserrat',sans-serif] font-semibold text-white text-sm"
          data-testid="text-sidebar-username"
        >
          {user?.name || "User"}
        </h2>
        <p
          className="font-['Montserrat',sans-serif] text-white/70 text-xs"
          data-testid="text-sidebar-email"
        >
          {user?.email || ""}
        </p>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>{renderMenuItem(item)}</li>
          ))}
        </ul>
      </nav>

      <div className="p-3 space-y-1">
        {footerItems.map((item) => (
          <div key={item.id}>{renderMenuItem(item)}</div>
        ))}
        {showLogout && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-white/90 hover:bg-white/10 transition-colors"
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
