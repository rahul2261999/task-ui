import { ArrowLeft, Calendar, Flag, Folder, Clock, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const taskFormSchema = z.object({
  title: z.string().min(1, "Task title is required").max(100, "Title too long"),
  description: z.string().max(500, "Description too long").optional(),
  category: z.enum(["work", "personal", "shopping", "health"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
  dueTime: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

const categories = [
  { id: "work", name: "Work", color: "#ff6767" },
  { id: "personal", name: "Personal", color: "#6B8AFE" },
  { id: "shopping", name: "Shopping", color: "#FFB86C" },
  { id: "health", name: "Health", color: "#50FA7B" },
] as const;

const priorities = [
  { id: "low", name: "Low", color: "#50FA7B" },
  { id: "medium", name: "Medium", color: "#FFB86C" },
  { id: "high", name: "High", color: "#FF5555" },
] as const;

export const AddTask = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "work",
      priority: "medium",
      dueDate: "",
      dueTime: "",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log("Task created:", data);
    setLocation("/tasks");
  };

  const handleCancel = () => {
    setLocation("/tasks");
  };

  return (
    <div className="min-h-screen w-full bg-[#ff6767] flex flex-col">
      <header className="flex items-center gap-4 p-6">
        <Link href="/tasks">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="font-['Montserrat',sans-serif] font-bold text-white text-2xl">
          Add New Task
        </h1>
      </header>

      <main className="flex-1 bg-white rounded-t-[32px] p-6 md:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-['Montserrat',sans-serif] font-semibold text-[#212427] text-base">
                    Task Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title"
                      className="h-14 px-4 rounded-xl border-2 border-gray-200 font-['Montserrat',sans-serif] text-[16px] text-[#212427] placeholder:text-[#999] focus:border-[#ff6767] focus:ring-[#ff6767]"
                      data-testid="input-task-title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-['Montserrat',sans-serif] text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-['Montserrat',sans-serif] font-semibold text-[#212427] text-base">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add description..."
                      className="min-h-[120px] px-4 py-3 rounded-xl border-2 border-gray-200 font-['Montserrat',sans-serif] text-[16px] text-[#212427] placeholder:text-[#999] focus:border-[#ff6767] focus:ring-[#ff6767] resize-none"
                      data-testid="input-task-description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-['Montserrat',sans-serif] text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-['Montserrat',sans-serif] font-semibold text-[#212427] text-base flex items-center gap-2">
                    <Folder className="w-5 h-5 text-[#ff6767]" />
                    Category
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => field.onChange(cat.id)}
                          className={`px-5 py-3 rounded-xl font-['Montserrat',sans-serif] font-medium text-[15px] transition-all ${
                            field.value === cat.id
                              ? "text-white shadow-lg"
                              : "bg-gray-100 text-[#212427] hover:bg-gray-200"
                          }`}
                          style={{
                            backgroundColor:
                              field.value === cat.id ? cat.color : undefined,
                          }}
                          data-testid={`button-category-${cat.id}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="font-['Montserrat',sans-serif] text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-['Montserrat',sans-serif] font-semibold text-[#212427] text-base flex items-center gap-2">
                    <Flag className="w-5 h-5 text-[#ff6767]" />
                    Priority
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-3">
                      {priorities.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => field.onChange(p.id)}
                          className={`px-5 py-3 rounded-xl font-['Montserrat',sans-serif] font-medium text-[15px] transition-all flex items-center gap-2 ${
                            field.value === p.id
                              ? "text-white shadow-lg"
                              : "bg-gray-100 text-[#212427] hover:bg-gray-200"
                          }`}
                          style={{
                            backgroundColor:
                              field.value === p.id ? p.color : undefined,
                          }}
                          data-testid={`button-priority-${p.id}`}
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                field.value === p.id ? "#fff" : p.color,
                            }}
                          />
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="font-['Montserrat',sans-serif] text-sm" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Montserrat',sans-serif] font-semibold text-[#212427] text-base flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#ff6767]" />
                      Due Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="h-14 px-4 rounded-xl border-2 border-gray-200 font-['Montserrat',sans-serif] text-[16px] text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                        data-testid="input-due-date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-['Montserrat',sans-serif] text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Montserrat',sans-serif] font-semibold text-[#212427] text-base flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#ff6767]" />
                      Due Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="h-14 px-4 rounded-xl border-2 border-gray-200 font-['Montserrat',sans-serif] text-[16px] text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                        data-testid="input-due-time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-['Montserrat',sans-serif] text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleCancel}
                className="flex-1 rounded-xl font-['Montserrat',sans-serif] font-semibold text-[16px] border-2 border-gray-200 text-[#212427]"
                data-testid="button-cancel"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1 rounded-xl bg-[#ff6767] hover:bg-[#ff5252] font-['Montserrat',sans-serif] font-semibold text-[16px] text-white shadow-lg"
                data-testid="button-create-task"
              >
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};
