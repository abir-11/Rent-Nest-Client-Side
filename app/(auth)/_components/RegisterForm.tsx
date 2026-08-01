"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Mail, Lock, User, Phone, ImageIcon, Users, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAction } from "../_actions/registerAction";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      
      console.log("Form Payload to send: ", payload);

      const response = await registerAction(payload);

      if (response.success) {
        toast.success(response.message || "Account created successfully!");
        router.push("/login");
      } else {
        toast.error(response.message || "Failed to create account.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      
      {/* Full Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-emerald-500/70" />
          </div>
          <input
            {...register("name", { 
              required: "Full name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })}
            type="text"
            placeholder="Arafat Abir"
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>
        {errors.name && (
          <span className="text-red-400 text-xs mt-1 block">{errors.name.message as string}</span>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-emerald-500/70" />
          </div>
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            placeholder="abir8@ab.com"
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>
        {errors.email && (
          <span className="text-red-400 text-xs mt-1 block">{errors.email.message as string}</span>
        )}
      </div>

      {/* Phone Number Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-emerald-500/70" />
          </div>
          <input
            {...register("phoneNumber", { 
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Must be a valid 11-digit phone number"
              }
            })}
            type="tel"
            placeholder="01712345678"
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>
        {errors.phoneNumber && (
          <span className="text-red-400 text-xs mt-1 block">{errors.phoneNumber.message as string}</span>
        )}
      </div>

      {/* Grid for Gender & Profile Photo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender Select */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-emerald-500/70" />
            </div>
            <select
              {...register("gender", { required: "Please select a gender" })}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
            >
              <option value="" className="bg-[#03150D] text-gray-400">Select Gender</option>
              <option value="MALE" className="bg-[#03150D] text-white">Male</option>
              <option value="FEMALE" className="bg-[#03150D] text-white">Female</option>
            </select>
          </div>
          {errors.gender && (
            <span className="text-red-400 text-xs mt-1 block">{errors.gender.message as string}</span>
          )}
        </div>

        {/* Profile Photo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Photo URL</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ImageIcon className="h-5 w-5 text-emerald-500/70" />
            </div>
            <input
              {...register("profilePhoto")}
              type="url"
              placeholder="https://..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Password Input with Show/Hide */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-emerald-500/70" />
          </div>
          <input
            {...register("password", { 
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-400 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-400 text-xs mt-1 block">{errors.password.message as string}</span>
        )}
      </div>

      {/* Confirm Password Input with Show/Hide */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-emerald-500/70" />
          </div>
          <input
            {...register("confirmPassword", { 
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"
            })}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-400 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-400 text-xs mt-1 block">{errors.confirmPassword.message as string}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center py-2.5 px-4 mt-6 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-[#03150D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Creating account...
          </>
        ) : (
          "Register"
        )}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
          Sign In
        </Link>
      </p>
    </form>
  );
}