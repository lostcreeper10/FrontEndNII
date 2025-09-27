"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  
  console.log(formData);

  // useEffect(() => {
  //   if (session) {
  //     router.push("/user-onboarding");
  //   }
  // }, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }).then((res) => {
        if (res.data.status && res.data.onBoarding) {
          router.push("/home");
        } else {
          router.push("/user-onboarding");
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl  p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl text-gray-500 mb-1">Please enter your details</h2>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center justify-between text-sm ">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-blue-600 underline "
            >
              Forgot password
            </button>
          </div>
          <div className="mt-4 text-sm text-center">
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </div>

          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <hr className="flex-1 border-gray-300" />
          <span>OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={() => signIn("google")}
          className="p-3 border border-gray-300 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition cursor-pointer"
        >
          <img src="/google.png" alt="Google" className="w-5 h-5 " />
          Sign in with Google
        </button>


      </div>
    </div>
  );
}
