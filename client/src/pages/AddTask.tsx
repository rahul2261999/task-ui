import { ArrowLeft, Calendar, Upload } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createTodoSchema, type CreateTodoRequest } from "@shared/api-types";
import { todoApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
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

export const AddTask = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
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

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] flex">
      <aside className="w-[280px] bg-gradient-to-b from-[#ff6767] to-[#ff5252] min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="font-['Montserrat',sans-serif] font-bold text-white text-2xl">
            <span className="text-white">Dash</span>
            <span className="text-white/80">board</span>
          </h1>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center gap-3 p-4">
            <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h2 className="font-['Montserrat',sans-serif] font-semibold text-white text-sm">
                {user?.name || "User"}
              </h2>
              <p className="font-['Montserrat',sans-serif] text-white/70 text-xs">
                {user?.email || ""}
              </p>
            </div>
          </div>
          <nav className="mt-6 space-y-1">
            <Link href="/tasks">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white/70 hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tasks</span>
              </button>
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] overflow-hidden">
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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
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
                            className="h-11 px-4 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-[14px] text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
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
                              className="h-11 px-4 pr-10 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-[14px] text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
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
                            className="min-h-[140px] px-4 py-3 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-[14px] text-[#212427] placeholder:text-gray-400 focus:border-[#ff6767] focus:ring-[#ff6767] resize-none"
                            data-testid="input-task-description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                      className="bg-[#ff6767] hover:bg-[#ff5252] font-['Montserrat',sans-serif] font-semibold text-[14px] text-white px-8 rounded-lg shadow-md disabled:opacity-50"
                      data-testid="button-done"
                    >
                      {createMutation.isPending ? "Creating..." : "Done"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
