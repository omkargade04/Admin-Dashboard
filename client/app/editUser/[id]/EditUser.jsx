"use client";
import { useParams } from "next/navigation";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
require("dotenv").config();

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const EditUser = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const response = axios.put(`${baseURL}/api/admin/editUsers/` + id, user);
      response.then((result) => {
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

  useEffect(() => {
    const fetchUser = async() => {
      try{
        const response = await axios.get(`${baseURL}/api/admin/getAUser/`+id);
        const data = await response.data;
        setUser((prevUser) => ({
          ...prevUser,
          name: data.data[0].name,
          username: data.data[0].username,
          email: data.data[0].email,
        }))
      }catch(err){
        console.log(err.message);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <main>
      <div className="min-h-screen  flex justify-center items-center">
        <div className="bg-slate-200 p-10 rounded-lg shadow-xl w-72 sm:w-auto sm:h-auto">
          <h1 className="flex justify-center items-center  font-semibold text-2xl mb-5">
            Edit User
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

export default EditUser;
