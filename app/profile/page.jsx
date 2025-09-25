"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navigation from "../components/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pet, setPet] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load existing user info from session or backend
    if (session) {
      setFirstName(session.user?.firstName || "");
      setLastName(session.user?.lastName || "");
      setPet(session.user?.pet || "");
    }
  }, [session]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !pet) {
      setMessage("Please fill in all fields.");
      return;
    }
    // Save profile data (could send to backend)
    console.log({ firstName, lastName, pet });
    setMessage("Profile updated successfully!");
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Please log in to manage your profile.</p>
      </div>
    );
  }

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Manage Profile</h1>

        {/* Profile Form */}
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-4 w-full max-w-md bg-gray-800 p-6 rounded shadow-lg"
        >
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
          <button
            type="submit"
            className="p-2 bg-green-600 hover:bg-green-700 transition text-white rounded cursor-pointer"
          >
            Save
          </button>
          {message && <p className="text-green-400">{message}</p>}
        </form>
      </div>
    </>
  );
}
