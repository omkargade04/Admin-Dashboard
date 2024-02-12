"use client";
require('dotenv').config();
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post(`http://localhost:5000/api/admin/login`,
        event
      )
      router.push("/dashboard")
    }catch(err){
      console.log("first")
    }
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

export default Login;
