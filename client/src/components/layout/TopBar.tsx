import { Search, Bell, Calendar, User, LogOut, UserCog, KeyRound } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export function TopBar({
  showSearch = true,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search your task here...",
}: TopBarProps) {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, "/");

  return (
    <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between gap-4 px-6">
      <h1 className="font-['Montserrat',sans-serif] font-bold text-[#ff6767] text-2xl flex-shrink-0">
        To-Do
      </h1>

      {showSearch && onSearchChange && (
        <div className="flex-1 max-w-[400px] mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-[40px] pl-4 pr-12 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] placeholder:text-gray-400 focus:outline-none focus:border-[#ff6767]"
              data-testid="input-topbar-search"
            />
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#ff6767] rounded-lg flex items-center justify-center"
              data-testid="button-search"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
      {showSearch && !onSearchChange && (
        <div className="flex-1 max-w-[400px] mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full h-[40px] pl-4 pr-12 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] placeholder:text-gray-400 focus:outline-none focus:border-[#ff6767]"
              data-testid="input-topbar-search"
            />
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#ff6767] rounded-lg flex items-center justify-center"
              data-testid="button-search"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 flex-shrink-0">
        <button
          className="w-10 h-10 rounded-lg bg-[#ff6767] flex items-center justify-center"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5 text-white" />
        </button>
        <button
          className="w-10 h-10 rounded-lg bg-[#ff6767] flex items-center justify-center"
          data-testid="button-calendar"
        >
          <Calendar className="w-5 h-5 text-white" />
        </button>

        <div className="text-right">
          <p className="font-['Montserrat',sans-serif] text-sm text-[#212427]">{dayName}</p>
          <p className="font-['Montserrat',sans-serif] text-sm text-[#ff6767]">{dateStr}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-[#ff6767]/30 transition-all"
              data-testid="button-profile-dropdown"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => setLocation("/account-info")}
              className="font-['Montserrat',sans-serif] cursor-pointer"
              data-testid="menu-account-info"
            >
              <UserCog className="w-4 h-4 mr-2" />
              Account Info
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLocation("/change-password")}
              className="font-['Montserrat',sans-serif] cursor-pointer"
              data-testid="menu-change-password"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="font-['Montserrat',sans-serif] text-[#ff6767] cursor-pointer"
              data-testid="menu-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
