import { ArrowLeft, Calendar, Upload, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  date: z.string().optional(),
  priority: z.enum(["extreme", "moderate", "low"]),
  description: z.string().max(500, "Description too long").optional(),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

const priorities = [
  { id: "extreme", name: "Extreme", color: "#FF5555" },
  { id: "moderate", name: "Moderate", color: "#3B82F6" },
  { id: "low", name: "Low", color: "#22C55E" },
] as const;

export const AddTask = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      date: "",
      priority: "moderate",
      description: "",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log("Task created:", data);
    setLocation("/tasks");
  };

  const handleGoBack = () => {
    setLocation("/tasks");
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] flex">
      {/* Sidebar placeholder - matches main app */}
      <aside className="w-[280px] bg-gradient-to-b from-[#ff6767] to-[#ff5252] min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="font-['Montserrat',sans-serif] font-bold text-white text-2xl">
            <span className="text-white">Dash</span>
            <span className="text-white/80">board</span>
          </h1>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center gap-3 p-4">
            <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-['Montserrat',sans-serif] font-semibold text-white text-sm">
                Sundar Gurung
              </h2>
              <p className="font-['Montserrat',sans-serif] text-white/70 text-xs">
                sundargurung360@gmail.com
              </p>
            </div>
          </div>
          <nav className="mt-6 space-y-1">
            <Link href="/tasks">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white/70 hover:bg-white/10 transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </span>
                <span>Dashboard</span>
              </button>
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white/70 hover:bg-white/10 transition-colors">
              <span className="w-5 h-5 flex items-center justify-center">!</span>
              <span>Vital Task</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white bg-white/20 transition-colors">
              <span className="w-5 h-5 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <span>My Task</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white/70 hover:bg-white/10 transition-colors">
              <span className="w-5 h-5 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </span>
              <span>Task Categories</span>
            </button>
          </nav>
        </div>
        <div className="p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white/70 hover:bg-white/10 transition-colors">
            <span className="w-5 h-5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </span>
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white/70 hover:bg-white/10 transition-colors">
            <span className="w-5 h-5 flex items-center justify-center">?</span>
            <span>Help</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[14px] text-white/70 hover:bg-white/10 transition-colors">
            <span className="w-5 h-5 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content area with modal overlay */}
      <main className="flex-1 relative">
        {/* Background content (blurred) */}
        <div className="absolute inset-0 bg-[#F5F5F5] opacity-50" />

        {/* Modal overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6">
          {/* Modal card */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
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

            {/* Modal body */}
            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Title field */}
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
                            placeholder=""
                            className="h-11 px-4 rounded-lg border border-gray-200 font-['Montserrat',sans-serif] text-[14px] text-[#212427] focus:border-[#ff6767] focus:ring-[#ff6767]"
                            data-testid="input-task-title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Date field */}
                  <FormField
                    control={form.control}
                    name="date"
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

                  {/* Priority field */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                          Priority
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-6">
                            {priorities.map((p) => (
                              <label
                                key={p.id}
                                className="flex items-center gap-2 cursor-pointer"
                                data-testid={`radio-priority-${p.id}`}
                              >
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: p.color }}
                                />
                                <span className="font-['Montserrat',sans-serif] text-[13px] text-[#212427]">
                                  {p.name}
                                </span>
                                <input
                                  type="checkbox"
                                  checked={field.value === p.id}
                                  onChange={() => field.onChange(p.id)}
                                  className="w-4 h-4 rounded border-gray-300 accent-[#ff6767]"
                                />
                              </label>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage className="font-['Montserrat',sans-serif] text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Description and Upload Image row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Task Description */}
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

                    {/* Upload Image */}
                    <div>
                      <Label className="font-['Montserrat',sans-serif] font-medium text-[#212427] text-sm">
                        Upload Image
                      </Label>
                      <div className="mt-2 h-[140px] rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Upload className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="font-['Montserrat',sans-serif] text-[12px] text-gray-500">
                          Drag&Drop files here
                        </p>
                        <p className="font-['Montserrat',sans-serif] text-[11px] text-gray-400">
                          or
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="font-['Montserrat',sans-serif] text-[12px] border-gray-300"
                          data-testid="button-browse-files"
                        >
                          Browse
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Done button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="bg-[#ff6767] hover:bg-[#ff5252] font-['Montserrat',sans-serif] font-semibold text-[14px] text-white px-8 rounded-lg shadow-md"
                      data-testid="button-done"
                    >
                      Done
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
