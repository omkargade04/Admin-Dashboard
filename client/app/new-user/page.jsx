"use client";
import React, { useState } from "react";
require("dotenv").config();
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const Page = () => {

  const [newUser, setNewUser] = useState([]);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("username", user.name);
    try {
      axios.post(`${baseURL}/api/admin/createUser`, user).then((result) => {
        // setNewUser(result.data.data);
        console.log(result.data);
        if (result.data.status) {
          toast.success(result.data.message);
          router.push("/dashboard");
        } else {
          alert(result.data.message);
        }
      });
    } catch (err) {
      throw err;
    }
  };
  return (
    <main>
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-slate-200 p-10 rounded-lg shadow-xl w-72 sm:w-auto sm:h-auto">
          <h1 className="flex justify-center items-center  font-semibold text-2xl mb-5">
            Add User
          </h1>
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="username"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
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
            <p className="font-medium">Create New User</p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
