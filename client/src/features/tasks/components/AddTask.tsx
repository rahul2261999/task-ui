import { CheckSquare, Settings, HelpCircle, CalendarClock } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createTodoSchema, type CreateTodoRequest } from "@shared/api-types";
import { todoApi } from "@/features/tasks";
import { queryClient } from "@/shared/api/queryClient";
import { useToast } from "@/shared/hooks/use-toast";
import { dateTimeLocalToUtcIso, nowDateTimeLocalMinValue } from "@/features/tasks/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { AppLayout, type SidebarItem } from "@/app/layout";

export const AddTask = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const minDateTime = nowDateTimeLocalMinValue();

  const form = useForm<CreateTodoRequest>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      due_date: "",
    },
  });

  const setNow = () => {
    const nowValue = nowDateTimeLocalMinValue();
    form.setValue("due_date", nowValue, { shouldValidate: true, shouldDirty: true });
  };

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
      // Send UTC to backend
      payload.due_date = dateTimeLocalToUtcIso(data.due_date);
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
    { id: "settings", label: "Settings", icon: Settings, href: "/tasks/account-info" },
    { id: "help", label: "Help", icon: HelpCircle },
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
                        Date & Time
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="relative w-full">
                            <Input
                              type="datetime-local"
                              min={minDateTime}
                              step={60}
                              className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-sm text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                              data-testid="input-task-date"
                              {...field}
                            />
                            <CalendarClock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={setNow}
                            className="h-9 font-['Montserrat',sans-serif] text-sm"
                            data-testid="button-set-now"
                          >
                            Now
                          </Button>
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
