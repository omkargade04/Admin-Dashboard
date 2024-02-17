"use client";
import { useParams } from "next/navigation";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
require("dotenv").config();


const Page = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/admin/getAUser/` + id);
        const data = await response.data;
        const name = data.data[0].name;
        setUser(name);
      } catch (err) {
        console.error(err.message); // Log errors for debugging
      }
    };

    fetchUser();
  }, [id, baseURL]);

  console.log(user);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/admin/logout`);
      const data = await response.data;
      console.log(data);
      if (response.data.status) {
        toast.success(response.data.message);
        router.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-5xl">Welcome {user}</h1>
        <button
          className=" ml-10 bg-slate-400 rounded  hover:bg-slate-300"
          onClick={handleLogout}
        >
          <p className="m-3">Logout</p>
        </button>
      </div>
    </>
  );
};

export default Page;
