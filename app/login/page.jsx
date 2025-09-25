"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const HARD_EMAIL = "jameboy@gmail.com";
  const HARD_PASSWORD = "123";

  useEffect(() => {
    if (session) {
      router.push("/user-onboarding");
    }
  }, [session, router]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (email === HARD_EMAIL && password === HARD_PASSWORD) {
      router.push("/user-onboarding");
    } else {
      setError("Invalid email or password.");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-600">{error}</p>}

          <div className="flex items-center justify-between text-sm ">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-blue-600 underline "
            >
              Forgot password
            </button>
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
