import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, type SigninRequest } from "@shared/api-types";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const imgIstockphoto14838634472048X20482 = "https://www.figma.com/api/mcp/asset/7da48b20-cff0-444b-ae7b-a71cf21d0eb4";
const imgAch31 = "https://www.figma.com/api/mcp/asset/1bd91f03-c155-40e0-8029-940921abaf6e";

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

        <div className="hidden lg:flex w-[613px] items-center justify-center p-8">
          <img
            src={imgAch31}
            alt="Illustration"
            className="w-full h-auto max-h-[613px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};
