import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "@/shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/components/ui/toaster";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import NotFound from "@/app/routes/not-found";
import { AuthProvider, useAuth } from "@/shared/store/auth";

import { Login, Register } from "@/features/auth";
import { Tasks, AddTask, EditTask } from "@/features/tasks";
import { AccountInfo, ChangePassword } from "@/features/user";

function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ff6767]">
        <div className="text-white text-xl font-['Montserrat',sans-serif]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/tasks">
        <ProtectedRoute component={Tasks} />
      </Route>
      <Route path="/tasks/add-task">
        <ProtectedRoute component={AddTask} />
      </Route>
      <Route path="/tasks/:id/edit">
        {(params) => <ProtectedRoute component={() => <EditTask params={params} />} />}
      </Route>
      <Route path="/tasks/account-info">
        <ProtectedRoute component={AccountInfo} />
      </Route>
      <Route path="/tasks/change-password">
        <ProtectedRoute component={ChangePassword} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
