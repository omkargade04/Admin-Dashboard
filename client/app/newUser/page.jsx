"use client";
import React, { useState } from "react";
require('dotenv').config()
import axios from 'axios';
import {useRouter} from 'next/navigation';


const page = () => {
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [newUser, setNewUser] = useState([]);

   const router = useRouter();

   const handleSubmit = async (event) => {
    event.preventDefault()
    try{
        const response = await axios.post(`${process.env.BASE_URL}/api/admin/createUser`,{
            name, username, email, password,
        });
        setNewUser(response.data.data);
        router.push('/dashboard')
    }catch(err){
        throw err
    }
   }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <p className="font-medium">Create New User</p>
          </button>
        </div>
      </div>
    </main>
  )
}

export default page