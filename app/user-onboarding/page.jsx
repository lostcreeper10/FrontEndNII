"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserOnboardPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pet, setPet] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !pet) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); // clear previous error
    // save profile data (could be to database)
    console.log({ firstName, lastName, pet });
    // redirect to home
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Pet"
          value={pet}
          onChange={(e) => setPet(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
}
