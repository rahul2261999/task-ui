import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, type SigninRequest } from "@shared/api-types";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const imgIstockphoto14838634472048X20482 = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=2048&q=80";
const imgAch31 = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80";

export const Login = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    setLocation("/tasks");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninRequest>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninRequest) => {
    setIsSubmitting(true);
    try {
      const response = await authApi.signin(data);
      if (response.data) {
        login(response.data.user, response.data.token);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        setLocation("/tasks");
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#ff6767] relative flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${imgIstockphoto14838634472048X20482})` }}
      />
      
      <div className="relative bg-white rounded-[10px] shadow-[124px_100px_45px_0px_rgba(0,0,0,0),80px_64px_41px_0px_rgba(0,0,0,0.01),45px_36px_34px_0px_rgba(0,0,0,0.02),20px_16px_26px_0px_rgba(0,0,0,0.03),5px_4px_14px_0px_rgba(0,0,0,0.04)] w-full max-w-[1236px] min-h-[700px] flex overflow-hidden">
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
          <h1 className="font-bold text-[#212427] text-[36px] mb-8 font-['Montserrat',sans-serif]">
            Sign In
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-[559px]">
            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-[28px] h-[28px] text-[#565454]" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter Email"
                  className="w-full h-[60px] pl-14 pr-4 border border-[#565454] rounded-[8px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:border-[#ff6767]"
                  data-testid="input-email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 font-['Montserrat',sans-serif]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-[28px] h-[28px] text-[#565454]" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter Password"
                  className="w-full h-[60px] pl-14 pr-4 border border-[#565454] rounded-[8px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:border-[#ff6767]"
                  data-testid="input-password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 font-['Montserrat',sans-serif]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[129px] h-[60px] bg-[#ff9090] hover:bg-[#ff7070] transition-colors rounded-[5px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#f8f9fb] cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-login"
            >
              {isSubmitting ? "..." : "Login"}
            </button>

            <p className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#008bd9] hover:underline cursor-pointer">
                Create One
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden lg:flex w-[613px] items-center justify-center p-8 bg-gradient-to-br from-[#fff5f5] to-[#ffe8e8]">
          <div className="w-full h-full rounded-2xl bg-[#ff9090]/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#ff6767] flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="font-['Montserrat',sans-serif] font-bold text-[#212427] text-2xl mb-2">
                Welcome Back
              </h2>
              <p className="font-['Montserrat',sans-serif] text-[#666] text-sm max-w-[280px]">
                Sign in to manage your tasks and stay organized
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
