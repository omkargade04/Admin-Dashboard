'use client'
import { useParams } from "next/navigation";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
require('dotenv').config()

const page = () => {
  const { id } = useParams();
  const router = useRouter()
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    try{
        const response = axios.put(`${process.env.BASE_URL}/api/admin/editUsers/`+id, user)
        if(response.data.status){
            router.push('/dashboard')
        }else{
            alert(result.data.message);
        }
    }catch(err){
        throw err;
    }
  }

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}/api/admin/getAllUsers` + id)
      .then((result) => {
        setUser({
          ...user,
          name: result.data.data[0].name,
          username: result.data.data[0].username,
          email: result.data.data[0].email,
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  return (
    <main>
      <div className="min-h-screen  flex justify-center items-center">
        <div className="bg-slate-200 p-10 rounded-lg shadow-xl w-72 sm:w-auto sm:h-auto">
          <h1 className="flex justify-center items-center  font-semibold text-2xl mb-5">
            Add User
          </h1>
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({...user,name: e.target.value})}
          />
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="username"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUsername({...user,username: e.target.value})}
          />
          <input
            className="w-full h-10 sm:h-12 p-3 mb-4 rounded outline-none placeholder-slate-500"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setEmail({...user,email: e.target.value})}
          />
          <button
            className="w-full h-10 sm:h-12  p-2 mb-3 bg-slate-300 rounded hover:bg-white"
            onClick={handleSubmit}
          >
            <p className="font-medium">Update User</p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default page;
