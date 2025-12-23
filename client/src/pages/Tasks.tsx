import { useState } from "react";
import { Plus, Calendar, CheckCircle2, Circle, Trash2, Edit2, Search, Bell, User, Home, ListTodo, Settings, LogOut } from "lucide-react";
import { Link } from "wouter";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  dueDate?: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Complete project documentation", completed: false, category: "Work", dueDate: "Today" },
  { id: 2, title: "Review pull requests", completed: true, category: "Work", dueDate: "Today" },
  { id: 3, title: "Team meeting at 3 PM", completed: false, category: "Work", dueDate: "Today" },
  { id: 4, title: "Buy groceries", completed: false, category: "Personal", dueDate: "Tomorrow" },
  { id: 5, title: "Go to the gym", completed: true, category: "Personal", dueDate: "Today" },
];

export const Tasks = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All Tasks", icon: ListTodo, count: tasks.length },
    { name: "Today", icon: Calendar, count: tasks.filter(t => t.dueDate === "Today").length },
    { name: "Work", icon: Home, count: tasks.filter(t => t.category === "Work").length },
    { name: "Personal", icon: User, count: tasks.filter(t => t.category === "Personal").length },
  ];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          category: "Personal",
          dueDate: "Today",
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = selectedCategory === "All Tasks" || task.category === selectedCategory || (selectedCategory === "Today" && task.dueDate === "Today");
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
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
              <h2 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-lg">John Doe</h2>
              <p className="font-['Montserrat',sans-serif] text-sm text-[#999]">john@example.com</p>
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[15px] text-[#ff6767] hover:bg-[#fff5f5] transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-8">
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
            />
          </div>

          <div className="flex gap-3 mb-8">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask(e);
                }
              }}
              placeholder="Add a new task..."
              className="flex-1 h-[56px] px-6 rounded-xl bg-white font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              data-testid="input-quick-add-task"
            />
            <Link href="/add-task">
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
            {filteredTasks.length === 0 ? (
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
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-[#ff6767]" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#ccc] hover:text-[#ff9090] transition-colors" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-['Montserrat',sans-serif] font-medium text-[16px] truncate ${
                          task.completed ? "text-[#999] line-through" : "text-[#212427]"
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-['Montserrat',sans-serif] text-sm text-[#999]">
                          {task.category}
                        </span>
                        {task.dueDate && (
                          <>
                            <span className="text-[#ccc]">•</span>
                            <span className="font-['Montserrat',sans-serif] text-sm text-[#ff9090]">
                              {task.dueDate}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-9 h-9 rounded-lg hover:bg-[#fff5f5] flex items-center justify-center transition-colors">
                        <Edit2 className="w-4 h-4 text-[#999]" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="w-9 h-9 rounded-lg hover:bg-[#fff5f5] flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#ff6767]" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="font-['Montserrat',sans-serif] text-white/80">
              {filteredTasks.filter((t) => !t.completed).length} tasks remaining
            </p>
            <button
              onClick={() => setTasks(tasks.filter((t) => !t.completed))}
              className="font-['Montserrat',sans-serif] font-medium text-white hover:text-white/80 transition-colors"
            >
              Clear completed
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
