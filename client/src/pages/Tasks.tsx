import { Plus, Calendar, CheckCircle2, Circle, Trash2, Edit2, Search, Bell, User, Home, ListTodo, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { todoApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Todo, TodoStatus } from "@shared/api-types";
import { useState } from "react";

export const Tasks = (): JSX.Element => {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: todosResponse, isLoading, error, isError } = useQuery({
    queryKey: ["/todo/list"],
    queryFn: () => todoApi.list(),
  });

  console.log("todosResponse", todosResponse, "error", error, "isLoading", isLoading);

  const tasks = todosResponse?.data || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: TodoStatus }) =>
      todoApi.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/todo/list"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to update task",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => todoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/todo/list"] });
      toast({
        title: "Task deleted",
        description: "The task has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete task",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  const toggleTask = (task: Todo) => {
    const newStatus: TodoStatus = task.status === "completed" ? "pending" : "completed";
    updateMutation.mutate({ id: task.id, status: newStatus });
  };

  const deleteTask = (id: number) => {
    deleteMutation.mutate(id);
  };

  const categories = [
    { name: "All Tasks", icon: ListTodo, count: tasks.length },
    { name: "Today", icon: Calendar, count: tasks.filter((t) => isToday(t.due_date)).length },
    { name: "In Progress", icon: Home, count: tasks.filter((t) => t.status === "inprogress").length },
    { name: "Completed", icon: User, count: tasks.filter((t) => t.status === "completed").length },
  ];

  const filteredTasks = tasks.filter((task) => {
    let matchesCategory = true;
    if (selectedCategory === "Today") {
      matchesCategory = isToday(task.due_date);
    } else if (selectedCategory === "In Progress") {
      matchesCategory = task.status === "inprogress";
    } else if (selectedCategory === "Completed") {
      matchesCategory = task.status === "completed";
    }
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen w-full bg-[#ff6767] flex">
      <aside className="w-[280px] bg-white min-h-screen flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#ff9090] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-lg" data-testid="text-user-name">
                {user?.name || "User"}
              </h2>
              <p className="font-['Montserrat',sans-serif] text-sm text-[#999]" data-testid="text-user-email">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[15px] transition-colors ${
                    selectedCategory === cat.name
                      ? "bg-[#ff6767] text-white"
                      : "text-[#212427] hover:bg-[#fff5f5]"
                  }`}
                  data-testid={`button-category-${cat.name.toLowerCase().replace(" ", "-")}`}
                >
                  <cat.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{cat.name}</span>
                  <span className={`text-sm ${selectedCategory === cat.name ? "text-white/80" : "text-[#999]"}`}>
                    {cat.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[15px] text-[#212427] hover:bg-[#fff5f5] transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[15px] text-[#ff6767] hover:bg-[#fff5f5] transition-colors"
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div>
              <h1 className="font-['Montserrat',sans-serif] font-bold text-white text-[32px]">
                {selectedCategory}
              </h1>
              <p className="font-['Montserrat',sans-serif] text-white/80 mt-1">
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <User className="w-5 h-5 text-[#ff6767]" />
              </div>
            </div>
          </header>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full h-[56px] pl-12 pr-4 rounded-xl bg-white font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              data-testid="input-search"
            />
          </div>

          <div className="flex gap-3 mb-8">
            <Link href="/add-task" className="flex-shrink-0">
              <button
                type="button"
                className="h-[56px] px-6 bg-[#ff9090] hover:bg-[#ff7070] rounded-xl font-['Montserrat',sans-serif] font-medium text-white flex items-center gap-2 transition-colors shadow-lg"
                data-testid="button-add-task"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-10 h-10 border-4 border-[#ff6767] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="font-['Montserrat',sans-serif] text-[#999]">Loading tasks...</p>
              </div>
            ) : isError ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <ListTodo className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-xl mb-2">
                  Failed to load tasks
                </h3>
                <p className="font-['Montserrat',sans-serif] text-[#999]">
                  {error instanceof Error ? error.message : "Unknown error occurred"}
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#fff5f5] flex items-center justify-center">
                  <ListTodo className="w-10 h-10 text-[#ff9090]" />
                </div>
                <h3 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-xl mb-2">
                  No tasks found
                </h3>
                <p className="font-['Montserrat',sans-serif] text-[#999]">
                  Add a new task to get started!
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-4 p-5 hover:bg-[#fafafa] transition-colors group"
                    data-testid={`task-item-${task.id}`}
                  >
                    <button
                      onClick={() => toggleTask(task)}
                      className="flex-shrink-0"
                      data-testid={`button-toggle-${task.id}`}
                    >
                      {task.status === "completed" ? (
                        <CheckCircle2 className="w-6 h-6 text-[#ff6767]" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#ccc] hover:text-[#ff9090] transition-colors" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-['Montserrat',sans-serif] font-medium text-[16px] truncate ${
                          task.status === "completed" ? "text-[#999] line-through" : "text-[#212427]"
                        }`}
                        data-testid={`text-task-title-${task.id}`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span
                          className={`font-['Montserrat',sans-serif] text-sm px-2 py-0.5 rounded ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : task.status === "inprogress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.status}
                        </span>
                        {task.due_date && (
                          <>
                            <span className="text-[#ccc]">|</span>
                            <span className="font-['Montserrat',sans-serif] text-sm text-[#ff9090]">
                              {formatDate(task.due_date)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="w-9 h-9 rounded-lg hover:bg-[#fff5f5] flex items-center justify-center transition-colors"
                        data-testid={`button-edit-${task.id}`}
                      >
                        <Edit2 className="w-4 h-4 text-[#999]" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="w-9 h-9 rounded-lg hover:bg-[#fff5f5] flex items-center justify-center transition-colors"
                        data-testid={`button-delete-${task.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-[#ff6767]" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
            <p className="font-['Montserrat',sans-serif] text-white/80">
              {filteredTasks.filter((t) => t.status !== "completed").length} tasks remaining
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

function isToday(dateString: string | null): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isToday(dateString)) return "Today";
  if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return "Tomorrow";
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
