import { User, LayoutDashboard, AlertCircle, CheckSquare, List, Settings, HelpCircle, LogOut, Search, Bell, Calendar } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePasswordSchema, type ChangePasswordRequest } from "@shared/api-types";
import { userApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const ChangePassword = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const form = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const changeMutation = useMutation({
    mutationFn: (data: ChangePasswordRequest) => userApi.changePassword(data),
    onSuccess: () => {
      toast({
        title: "Password updated!",
        description: "Your password has been changed successfully.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to change password",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ChangePasswordRequest) => {
    changeMutation.mutate(data);
  };

  const handleGoBack = () => {
    setLocation("/tasks");
  };

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "/");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/tasks" },
    { name: "Vital Task", icon: AlertCircle, href: "/tasks" },
    { name: "My Task", icon: CheckSquare, href: "/tasks" },
    { name: "Task Categories", icon: List, href: "/tasks" },
    { name: "Settings", icon: Settings, href: "/account-info", active: true },
    { name: "Help", icon: HelpCircle, href: "/tasks" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] flex flex-col">
      <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <h1 className="font-['Montserrat',sans-serif] font-bold text-[#ff6767] text-2xl">
          To-Do
        </h1>
        <div className="flex-1 max-w-[400px] mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your task here..."
              className="w-full h-[40px] pl-4 pr-12 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] placeholder:text-gray-400 focus:outline-none focus:border-[#ff6767]"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#ff6767] rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-lg bg-[#ff6767] flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#ff6767] flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </button>
          <div className="text-right">
            <p className="font-['Montserrat',sans-serif] text-sm text-[#212427]">{dayName}</p>
            <p className="font-['Montserrat',sans-serif] text-sm text-[#ff6767]">{dateStr}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-[220px] bg-[#ffe8e8] min-h-full flex flex-col">
          <div className="p-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center mb-3">
              <User className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="font-['Montserrat',sans-serif] font-semibold text-[#ff6767] text-sm">
              {user?.name || "User"}
            </h2>
            <p className="font-['Montserrat',sans-serif] text-[#ff6767]/70 text-xs">
              {user?.email || ""}
            </p>
          </div>

          <nav className="flex-1 px-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-sm transition-colors ${
                        item.active
                          ? "text-[#ff6767]"
                          : "text-[#ff6767]/70 hover:text-[#ff6767]"
                      }`}
                      data-testid={`button-menu-${item.name.toLowerCase().replace(" ", "-")}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#ff6767] hover:bg-[#ffd4d4] transition-colors"
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm max-w-[700px] mx-auto">
            <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-100">
              <h2 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-xl">
                Change Password
              </h2>
              <button
                onClick={handleGoBack}
                className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm hover:text-[#ff6767] transition-colors"
                data-testid="button-go-back"
              >
                Go Back
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-['Montserrat',sans-serif] font-semibold text-[#212427] text-lg">
                    {user?.name || "User"}
                  </h3>
                  <p className="font-['Montserrat',sans-serif] text-gray-500 text-sm">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="border border-gray-200 rounded-lg p-6 space-y-5">
                    <FormField
                      control={form.control}
                      name="current_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                            Current Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter current password"
                              className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                              data-testid="input-current-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="new_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter new password"
                              className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                              data-testid="input-new-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm new password"
                              className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                              data-testid="input-confirm-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={changeMutation.isPending}
                      className="bg-[#ff6767] hover:bg-[#ff5252] font-['Montserrat',sans-serif] font-semibold text-sm text-white px-6 rounded-lg disabled:opacity-50"
                      data-testid="button-update-password"
                    >
                      {changeMutation.isPending ? "Updating..." : "Update Password"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleGoBack}
                      className="bg-[#ff6767] hover:bg-[#ff5252] font-['Montserrat',sans-serif] font-semibold text-sm text-white px-6 rounded-lg"
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
