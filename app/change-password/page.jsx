"use client";

import { useState } from "react";
import Navigation from "../components/navigation";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    // TODO: Connect with backend API to change password
    console.log({ oldPassword, newPassword });
    setMessage("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Change Password</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md bg-gray-800 p-6 rounded shadow-lg"
        >
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded cursor-pointer"
          >
            Change Password
          </button>
          {message && <p className="text-green-400">{message}</p>}
        </form>
      </div>
    </>
  );
}
