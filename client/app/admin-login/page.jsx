"use client";
import dotenv from "dotenv";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

dotenv.config();

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/admin/login`, {
        username,
        password,
      });
      console.log(response);
      if (response.data.status) {
        toast.success(response.data.message);
        router.push("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log("error", err.message);
    }
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`, {username, password})
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="min-h-screen  flex justify-center items-center">
        <div className="bg-slate-200 p-10 rounded-lg shadow-xl w-72 sm:w-auto sm:h-auto">
          <h1 className="flex justify-center items-center  font-semibold text-2xl mb-5">
            Admin Log In
          </h1>

          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="email"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full h-10 sm:h-12 font-medium p-2 mb-3 bg-slate-300 rounded hover:bg-white"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
