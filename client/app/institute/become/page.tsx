"use client";

import { useAppDispatch } from "@/src/lib/store/hooks";

import { createInstitute } from "@/src/lib/store/institute/instituteSlice";
import { IInstitute } from "@/src/lib/store/institute/instituteSlice.type";
import { useState } from "react";

function BecomeInstitute() {
  const dispatch = useAppDispatch();
  const [instituteData, setInstituteData] = useState<IInstitute>({
    instituteAddress: "",
    instituteEmail: "",
    instituteName: "",
    institutePhone: "",
    institutePanNumber: "",
    instituteVatNumber: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInstituteData({
      ...instituteData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createInstitute(instituteData));
    console.log(instituteData);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {/* Logo and Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold rounded-md text-green-600 flex items-center justify-center">
              Institute Sign Up
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Join us and empower your institute with our platform!
            </p>
          </div>
          {/* Divider */}
          <div className="my-6 border-t border-gray-300 relative">
            <span className="absolute top-[-10px] bg-white left-1/2 transform -translate-x-1/2 px-3 text-green-500">
              Create your institute
            </span>
          </div>
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <input
                onChange={handleChange}
                type="text"
                name="instituteName"
                placeholder="Institute Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            {/* Mobile Number */}
            <div>
              <input
                onChange={handleChange}
                type="text"
                name="institutePhone"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            {/* Email */}
            <div>
              <input
                onChange={handleChange}
                type="email"
                name="instituteEmail"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            {/* Password */}
            <div className="relative">
              <input
                onChange={handleChange}
                name="instituteAddress"
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <input
                onChange={handleChange}
                name="institutePanNumber"
                type="text"
                placeholder="PAN No"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            <div className="relative">
              <input
                onChange={handleChange}
                type="text"
                name="instituteVatNumber"
                placeholder="VAT No"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
            >
              create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default BecomeInstitute;
