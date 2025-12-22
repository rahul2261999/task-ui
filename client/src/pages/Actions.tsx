import React, { useState } from "react";
import { Mail, Lock, User, UserCircle } from "lucide-react";

const imgR2 = "https://www.figma.com/api/mcp/asset/fc8082b0-f60b-4a8e-a125-2aec97ad6d33";
const imgIstockphoto14838634472048X20481 = "https://www.figma.com/api/mcp/asset/4a95374f-4f73-41f4-95ba-09e70182e1e4";

export const Actions = (): JSX.Element => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-[#ff6767] relative flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${imgIstockphoto14838634472048X20481})` }}
      />
      
      <div className="relative bg-white rounded-[10px] shadow-[124px_100px_45px_0px_rgba(0,0,0,0),80px_64px_41px_0px_rgba(0,0,0,0.01),45px_36px_34px_0px_rgba(0,0,0,0.02),20px_16px_26px_0px_rgba(0,0,0,0.03),5px_4px_14px_0px_rgba(0,0,0,0.04)] w-full max-w-[1236px] min-h-[700px] flex overflow-hidden">
        <div className="hidden lg:flex w-[433px] items-center justify-center p-8">
          <img
            src={imgR2}
            alt="Illustration"
            className="w-full h-auto max-h-[652px] object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
          <h1 className="font-bold text-[#212427] text-[36px] mb-8 font-['Montserrat',sans-serif]">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[559px]">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <UserCircle className="w-[28px] h-[28px] text-[#565454]" />
              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter First Name"
                className="w-full h-[60px] pl-14 pr-4 border border-[#565454] rounded-[8px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:border-[#ff6767]"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <UserCircle className="w-[28px] h-[28px] text-[#565454]" />
              </div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
                className="w-full h-[60px] pl-14 pr-4 border border-[#565454] rounded-[8px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:border-[#ff6767]"
              />
            </div>

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
                <Mail className="w-[28px] h-[28px] text-[#565454]" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
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

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock className="w-[28px] h-[28px] text-[#565454]" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full h-[60px] pl-14 pr-4 border border-[#565454] rounded-[8px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] placeholder:text-[#999] focus:outline-none focus:border-[#ff6767]"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-[18px] h-[18px] border border-[#565454] rounded-none accent-[#ff6767] cursor-pointer"
              />
              <span className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427]">
                I agree to all terms
              </span>
            </div>

            <button
              type="submit"
              className="w-[129px] h-[60px] bg-[#ff9090] hover:bg-[#ff7070] transition-colors rounded-[5px] font-['Montserrat',sans-serif] font-medium text-[16px] text-[#f8f9fb] cursor-pointer mt-2"
            >
              Register
            </button>

            <p className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#212427] mt-4">
              Already have an account?{" "}
              <a href="#" className="text-[#008bd9] hover:underline cursor-pointer">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
