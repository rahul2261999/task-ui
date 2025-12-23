import { User, LayoutDashboard, AlertCircle, CheckSquare, List, Settings, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";
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
import { AppLayout, type SidebarItem } from "@/components/layout";

export const ChangePassword = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
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

  const sidebarItems: SidebarItem[] = [
    { id: "my-task", label: "My Task", icon: CheckSquare, href: "/tasks" },
  ];

  const sidebarFooterItems: SidebarItem[] = [
    { id: "settings", label: "Settings", icon: Settings, href: "/tasks/account-info" },
    { id: "help", label: "Help", icon: HelpCircle, href: "/tasks" },
  ];

  return (
    <AppLayout
      sidebarItems={sidebarItems}
      sidebarFooterItems={sidebarFooterItems}
      showSearch={true}
    >
      <div className="p-8">
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
      </div>
    </AppLayout>
  );
};
