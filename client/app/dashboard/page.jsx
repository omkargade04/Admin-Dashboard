"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
dotenv.config();
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const [user, setUser] = useState([]);
  const router = useRouter()
  const getData = async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/admin/getAllUsers`);
      const data = await response.data.data;
      setUser(data);
    } catch (err) {
      throw err;
    }
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`${baseURL}/api/admin/deleteUser/` + id)
      .then((result) => {
        if (result.data.status) {
          toast.success(result.data.message);
          window.location.reload();
        } else {
          alert(result.data.message);
        }
      });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/admin/logout`);
      const data = await response.data;
      console.log(data)
      if (response.data.status) {
        toast.success(response.data.message);
        router.push('/')
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <main>
      <div className="flex justify-center items-center flex-col">
        <h1 className=" m-10 text-3xl">Users List</h1>
        <div className="">
          <table className="w-full text-center border-collapse my-5">
            <thead>
              <tr className="text-xl border border-1 border-black">
                <th className="border border-1 border-black p-2">Name</th>
                <th className="border border-1 border-black p-2">Email ID</th>
                <th className="border border-1 border-black p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((e) => (
                <tr className="border border-1 border-black p-2">
                  <td className="border border-1 border-black p-2">{e.name}</td>
                  <td className="border border-1 border-black p-2">
                    {e.email}
                  </td>
                  <td className="flex justify-evenly">
                    <button>
                      <Link href={`/editUser/${e.id}`} className="">
                        <MdEdit className="h-6 w-6" />
                      </Link>
                    </button>

                    <button className="" onClick={() => handleDelete(e.id)}>
                      <MdDelete className="h-6 w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pt-10">
          <button className=" mb-3 bg-slate-400 rounded  hover:bg-slate-300">
            <Link href="/newUser">
              <p className="m-3">Create New User</p>
            </Link>
          </button>

          <button
            className=" ml-10 bg-slate-400 rounded  hover:bg-slate-300"
            onClick={handleLogout}
          >
            <p className="m-3">Logout</p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default page;
