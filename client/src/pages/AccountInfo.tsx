import { User, LayoutDashboard, AlertCircle, CheckSquare, List, Settings, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateProfileSchema, type UpdateProfileRequest } from "@shared/api-types";
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

export const AccountInfo = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const nameParts = user?.name?.split(" ") || ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      email: user?.email || "",
      contact_number: "",
      position: "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => userApi.updateProfile(data),
    onSuccess: () => {
      toast({
        title: "Profile updated!",
        description: "Your account information has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update profile",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UpdateProfileRequest) => {
    updateMutation.mutate(data);
  };

  const handleGoBack = () => {
    setLocation("/tasks");
  };

  const sidebarItems: SidebarItem[] = [
    { id: "my-task", label: "My Task", icon: CheckSquare, href: "/tasks" },
  ];

  const sidebarFooterItems: SidebarItem[] = [
    { id: "settings", label: "Settings", icon: Settings, href: "/account-info" },
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
              Account Information
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
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter first name"
                            className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                            data-testid="input-first-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter last name"
                            className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                            data-testid="input-last-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter contact number"
                            className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                            data-testid="input-contact-number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                          Position
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter position"
                            className="h-11 px-4 rounded-lg border border-gray-300 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                            data-testid="input-position"
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
                    disabled={updateMutation.isPending}
                    className="bg-[#ff6767] hover:bg-[#ff5252] font-['Montserrat',sans-serif] font-semibold text-sm text-white px-6 rounded-lg disabled:opacity-50"
                    data-testid="button-save-changes"
                  >
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
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
