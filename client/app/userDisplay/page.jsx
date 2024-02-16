"use client";
import { useParams } from "next/navigation";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
require("dotenv").config();
const page = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const username = (localStorage.getItem("username"));

  return (
    <>
      <h1 className="text-5xl">{username}</h1>
      
    </>

  );
};

export default page;
