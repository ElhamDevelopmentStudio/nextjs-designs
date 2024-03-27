"use client";
import { useState } from "react";
import Image from "next/legacy/image"; // Use Image component for better performance and SEO
import { Button } from "@/components/ui/button"; // Ensure Shadcn UI is correctly imported based on your setup
import { FiUser, FiLock, FiEye, FiEyeOff, FiSun, FiMoon } from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "next-themes"; // Import useTheme

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme(); // Use the useTheme hook

  return (
    <div className="flex flex-wrap min-h-screen bg-gray-50">
      <button
        className="absolute top-5 right-5 z-50 p-2 bg-gray-200 rounded-full dark:bg-gray-700"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")} // Toggle theme
      >
        {theme === "dark" ? (
          <FiSun className="text-yellow-500" />
        ) : (
          <FiMoon className="text-gray-500" />
        )}
      </button>
      {/* Left Side */}
      <div className="w-full md:flex-1 flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 md:p-8 lg:p-12">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8">
            Kardan Networking Contest
          </h1>
          <Button className="bg-blue-200 text-blue-800 py-2 md:py-3 px-4 md:px-6 rounded-full font-semibold hover:bg-blue-300 transition duration-300 ease-in-out">
            Developers
          </Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:flex-1 flex justify-center items-center p-6 md:p-12">
        <div className="max-w-sm md:max-w-md w-full space-y-8">
          <div className="text-center">
            <Image
              className="mx-auto h-24 md:h-32 w-auto"
              src="/kardanLogo.png"
              alt="Logo"
              width={180} // Adjust based on your image's aspect ratio
              height={180} // Adjust based on your image's aspect ratio
            />
            <h2 className="mt-4 md:mt-6 text-3xl md:text-4xl font-extrabold text-gray-900">
              Hello Again!
            </h2>
            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600">
              Welcome Back
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-3">
              {/* Username Field */}
              <div className="input-field">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Username"
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="input-field">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-700" />
                    ) : (
                      <FiEye className="text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              className="w-full py-3 text-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out"
              asChild
              variant="default"
            >
              <Link href="/login" className="w-full text-center">
                Login
              </Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
