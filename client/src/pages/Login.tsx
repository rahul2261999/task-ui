import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import { Link } from "wouter";

const imgIstockphoto14838634472048X20482 = "https://www.figma.com/api/mcp/asset/7da48b20-cff0-444b-ae7b-a71cf21d0eb4";
const imgAch31 = "https://www.figma.com/api/mcp/asset/1bd91f03-c155-40e0-8029-940921abaf6e";

export const Login = (): JSX.Element => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[559px]">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <User className="w-[28px] h-[28px] text-[#565454]" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter Username"
                className="w-full h-[60px] pl-14 pr-4 border border-[#565454] rounded-[8px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:border-[#ff6767]"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock className="w-[28px] h-[28px] text-[#565454]" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="w-full h-[60px] pl-14 pr-4 border border-[#565454] rounded-[8px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:border-[#ff6767]"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-[18px] h-[18px] border border-[#565454] rounded-none accent-[#ff6767] cursor-pointer"
              />
              <span className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427]">
                Remember Me
              </span>
            </div>

            <button
              type="submit"
              className="w-[129px] h-[60px] bg-[#ff9090] hover:bg-[#ff7070] transition-colors rounded-[5px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#f8f9fb] cursor-pointer mt-2"
            >
              Login
            </button>

            <div className="flex items-center gap-4 mt-8">
              <span className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427]">
                Or, Login with
              </span>
              <div className="flex gap-2">
                <button type="button" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button type="button" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button type="button" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#000000">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
              </div>
            </div>

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
