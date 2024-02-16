"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { toast } from "sonner";

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const [user, setUser] = useState([]);
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <main>
      <div className="flex justify-center items-center flex-col">
        <h1 className=" m-10 text-3xl">Users List</h1>
        <div className="">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((e) => (
                <tr className="bg-slate-200">
                  <td className="p-4">{e.name}</td>
                  <td className="p-4">{e.email}</td>
                  <td>
                    <button className="bg-blue-400 rounded me-2 ">
                      <Link href={`/editUser/${e.id}`} className="p-4">
                        Edit
                      </Link>
                    </button>

                    <button
                      className="bg-red-400 rounded"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
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
        </div>
      </div>
    </main>
  );
};

export default page;
