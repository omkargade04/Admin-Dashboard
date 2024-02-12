"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const page = () => {
  const [user, setUser] = useState([]);
  const getData = async (req, res) => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/admin/getAllUsers`
      );
      const data = await response.data.data;
      setUser(data);
    } catch (err) {
      throw err;
    }
  };
  const handleDelete = async(id) => {
    await axios.delete(`${process.env.BASE_URL}/api/admin/deleteUser`+id)
    .then(result => {
      if(result.data.status){
        window.location.reload();
      }else{
        alert(result.data.message);
      }
    })
  }
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
                <tr>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    <Link href="/admin/editUser/:id">Edit</Link>
                    <button onClick={()=>handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className=" mb-3 bg-slate-400 rounded hover:bg-slate-300">
          <Link href="/newUser">Create New User</Link>
        </button>
      </div>
    </main>
  );
};

export default page;
