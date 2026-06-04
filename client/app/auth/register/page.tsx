"use client";
import { ChangeEvent, SubmitEvent, useState } from "react";

import { registerUser } from "@/src/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { IRegisterData } from "./register.types";
import store from "@/src/lib/store/store";

function Register() {
  const dispatch = useAppDispatch();
  const { institute } = useAppSelector((store) => store.institute);
  const { status } = useAppSelector((store) => store.auth);
  const [data, setData] = useState<IRegisterData>({
    email: "",
    username: "",
    password: "",
  });
  const handleRegisterDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data, "register data");
  const handleRegisterSubmission = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <>
      <div className="bg-green-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 w-full max-w-lg rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">
            Create Account
          </h2>

          <form onSubmit={handleRegisterSubmission} className="space-y-6">
            {/* Email Field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label
                htmlFor="email"
                className="md:w-24 text-gray-600 font-medium text-sm md:text-right"
              >
                Email
              </label>
              <input
                onChange={handleRegisterDataChange}
                name="email"
                id="email"
                type="email"
                placeholder="email@example.com"
                className="border-b-2 text-gray-900 for black text border-gray-300 flex-1 py-2 outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Username Field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label
                htmlFor="username"
                className="md:w-24 text-gray-600 font-medium text-sm md:text-right"
              >
                Username
              </label>
              <input
                onChange={handleRegisterDataChange}
                type="text"
                name="username"
                id="username"
                placeholder="johndoe"
                className="border-b-2 text-gray-900 for black text border-gray-300 flex-1 py-2 outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label
                htmlFor="password"
                className="md:w-24 text-gray-600 font-medium text-sm md:text-right"
              >
                Password
              </label>
              <input
                onChange={handleRegisterDataChange}
                type="password" // Changed from 'text' to 'password' for security
                name="password"
                id="password"
                placeholder="••••••••"
                className="border-b-2 text-gray-900 for black text border-gray-300 flex-1 py-2 outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-all duration-200"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
