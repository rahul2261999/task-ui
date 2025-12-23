import { Search, Bell, Calendar, User, LogOut, UserCog, KeyRound } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/shared/store/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

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
    <header className="h-[70px] bg-white border-b border-gray-100 flex items-center justify-between gap-4 px-6">
      <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl flex-shrink-0">
        <span className="text-[#ff6767]">Dash</span>
        <span className="text-[#ff6767]/70">board</span>
      </h1>

      {showSearch && onSearchChange && (
        <div className="flex-1 max-w-[400px] mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-[44px] pl-4 pr-14 rounded-full border border-gray-200 bg-gray-50 font-['Montserrat',sans-serif] text-sm text-[#212427] placeholder:text-gray-400 focus:outline-none focus:border-[#ff6767]"
              data-testid="input-topbar-search"
            />
            <button
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#ff6767] rounded-full flex items-center justify-center hover:bg-[#ff5252] transition-colors"
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
              className="w-full h-[44px] pl-4 pr-14 rounded-full border border-gray-200 bg-gray-50 font-['Montserrat',sans-serif] text-sm text-[#212427] placeholder:text-gray-400 focus:outline-none focus:border-[#ff6767]"
              data-testid="input-topbar-search"
            />
            <button
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#ff6767] rounded-full flex items-center justify-center hover:bg-[#ff5252] transition-colors"
              data-testid="button-search"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          className="w-10 h-10 rounded-xl bg-[#ffe8e8] flex items-center justify-center hover:bg-[#ffd8d8] transition-colors"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5 text-[#ff6767]" />
        </button>
        <button
          className="w-10 h-10 rounded-xl bg-[#ffe8e8] flex items-center justify-center hover:bg-[#ffd8d8] transition-colors"
          data-testid="button-calendar"
        >
          <Calendar className="w-5 h-5 text-[#ff6767]" />
        </button>

        <div className="text-right ml-2">
          <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#212427]">{dayName}</p>
          <p className="font-['Montserrat',sans-serif] text-sm text-[#ff6767]">{dateStr}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-[#ff6767]/30 transition-all ml-2"
              data-testid="button-profile-dropdown"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => setLocation("/tasks/account-info")}
              className="font-['Montserrat',sans-serif] cursor-pointer"
              data-testid="menu-account-info"
            >
              <UserCog className="w-4 h-4 mr-2" />
              Account Info
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLocation("/tasks/change-password")}
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
