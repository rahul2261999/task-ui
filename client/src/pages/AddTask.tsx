import { Calendar, LayoutDashboard, AlertCircle, CheckSquare, List, Settings, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createTodoSchema, type CreateTodoRequest } from "@shared/api-types";
import { todoApi } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
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

export const AddTask = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<CreateTodoRequest>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      due_date: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTodoRequest) => todoApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/todo/list"] });
      toast({
        title: "Task created!",
        description: "Your new task has been added.",
      });
      setLocation("/tasks");
    },
    onError: (error) => {
      toast({
        title: "Failed to create task",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CreateTodoRequest) => {
    const payload: CreateTodoRequest = {
      title: data.title,
      description: data.description || "",
    };
    if (data.due_date) {
      payload.due_date = new Date(data.due_date).toISOString();
    }
    createMutation.mutate(payload);
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
      showSearch={false}
    >
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm max-w-[600px] mx-auto">
          <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-100">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-xl">
              Add New Task
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter task title"
                          className="h-11 px-4 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                          data-testid="input-task-title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                        Date
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            className="h-11 px-4 pr-10 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                            data-testid="input-task-date"
                            {...field}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                        Task Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Start writing here...."
                          className="min-h-[140px] px-4 py-3 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-sm text-[#212427] placeholder:text-gray-400 focus:border-[#ff6767] focus:ring-[#ff6767] resize-none"
                          data-testid="input-task-description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="bg-[#ff6767] hover:bg-[#ff5252] font-['Montserrat',sans-serif] font-semibold text-sm text-white px-8 rounded-lg disabled:opacity-50"
                    data-testid="button-done"
                  >
                    {createMutation.isPending ? "Creating..." : "Done"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoBack}
                    className="font-['Montserrat',sans-serif] font-semibold text-sm px-6 rounded-lg"
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
