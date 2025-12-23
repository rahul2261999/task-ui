import { Plus, CheckCircle2, Circle, Trash2, Edit2, Search, ListTodo, LayoutDashboard, AlertCircle, CheckSquare, List, Settings, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { todoApi } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Todo, TodoStatus } from "@shared/api-types";
import { useState } from "react";
import { AppLayout, type SidebarItem } from "@/components/layout";

export const Tasks = (): JSX.Element => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: todosResponse, isLoading, error, isError } = useQuery({
    queryKey: ["/todo/list"],
    queryFn: () => todoApi.list(),
  });

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

  const toggleTask = (task: Todo) => {
    const newStatus: TodoStatus = task.status === "completed" ? "pending" : "completed";
    updateMutation.mutate({ id: task.id, status: newStatus });
  };

  const deleteTask = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalCount = tasks.length;

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
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search your task here..."
    >
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div>
              <h1 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-[28px]">
                All Tasks
              </h1>
              <p className="font-['Montserrat',sans-serif] text-gray-500 mt-1">
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>
            <Link href="/add-task">
              <button
                type="button"
                className="h-[48px] px-6 bg-[#ff6767] hover:bg-[#ff5252] rounded-lg font-['Montserrat',sans-serif] font-semibold text-white flex items-center gap-2 transition-colors"
                data-testid="button-add-task"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </Link>
          </header>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-10 h-10 border-4 border-[#ff6767] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="font-['Montserrat',sans-serif] text-gray-500">Loading tasks...</p>
              </div>
            ) : isError ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <ListTodo className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-xl mb-2">
                  Failed to load tasks
                </h3>
                <p className="font-['Montserrat',sans-serif] text-gray-500">
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
                <p className="font-['Montserrat',sans-serif] text-gray-500">
                  Add a new task to get started!
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors group"
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
                        <Circle className="w-6 h-6 text-gray-300 hover:text-[#ff9090] transition-colors" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-['Montserrat',sans-serif] font-medium text-[16px] truncate ${
                          task.status === "completed" ? "text-gray-400 line-through" : "text-[#212427]"
                        }`}
                        data-testid={`text-task-title-${task.id}`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span
                          className={`font-['Montserrat',sans-serif] text-xs px-2 py-0.5 rounded ${
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
                            <span className="text-gray-300">|</span>
                            <span className="font-['Montserrat',sans-serif] text-sm text-[#ff6767]">
                              {formatDate(task.due_date)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 invisible group-hover:visible">
                      <button
                        className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                        data-testid={`button-edit-${task.id}`}
                      >
                        <Edit2 className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
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

          <div className="mt-6">
            <p className="font-['Montserrat',sans-serif] text-gray-500">
              {filteredTasks.filter((t) => t.status !== "completed").length} tasks remaining
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }
  if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return "Tomorrow";
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
