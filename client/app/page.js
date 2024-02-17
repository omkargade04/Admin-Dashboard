import  Link  from "next/link";
import React from 'react'

export default function Home() {
  return (
    <>
      <div className="min-h-screen  flex justify-center items-center">
        <div className="bg-slate-200 p-10 rounded-lg shadow-xl w-72 sm:w-auto sm:h-auto">
          <h1 className="flex justify-center items-center  font-semibold text-2xl mb-5">
            Log In
          </h1>
          
          <button
            className="w-full h-10 sm:h-12  p-2 mb-3 bg-slate-300 rounded hover:bg-white"
          >
            <Link href="/admin-login">Admin Login</Link>
          </button>
          <button
            className="w-full h-10 sm:h-12  p-2 mb-3 bg-slate-300 rounded hover:bg-white"
          >
            <Link href="/user-login">User Login</Link>
          </button>
        </div>
      </div>
    </>
  );
}
