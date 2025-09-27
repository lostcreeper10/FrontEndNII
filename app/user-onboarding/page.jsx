"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UserOnboardPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    petsName: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`${API}/api/auth/onBoarding`, formData, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }).then((res) => {
      if(res.data.satus){
        console.log("You are now all set!");
        router.push("/home");
      }
    })

    setError("");
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-gray-800 p-6 rounded shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">User Onboarding</h1>

        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Pet"
          name="petsName"
          value={formData.petsName}
          onChange={handleChange}
          className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition cursor-pointer"
        >
          Create
        </button>
        <a href="/home">Set up later?</a>
      </form>
    </div>
  );
}
