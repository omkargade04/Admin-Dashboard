"use client";
require("dotenv").config();
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/user/login`, user);
      console.log(response.data.data);
      if (response.data.status) {
        toast.success(response.data.message);
        router.push(`/user-display/${response.data.id}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="min-h-screen  flex justify-center items-center">
        <div className="bg-slate-200 p-10 rounded-lg shadow-xl w-72 sm:w-auto sm:h-auto">
          <h1 className="flex justify-center items-center  font-semibold text-2xl mb-5">
            User Log In
          </h1>
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className="w-full h-10 sm:h-12  p-2 mb-3 bg-slate-300 rounded hover:bg-white"
            onClick={handleSubmit}
          >
            <p className="font-medium">Log in</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
