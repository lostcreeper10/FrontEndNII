"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/auth/me`, { withCredentials: true });
        setFormData({
          email: res.data.email || "",
        });
      } catch (error) {
        alert("You must be logged in to view this page.");
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    try {
      console.log(formData);
      await axios.post(`${API}/api/auth/change-password`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }).then((res) => {
        if (res.data.status) return alert("Password changed successfully!");
      })
    } catch (error) {
      console.log(error);
    }

    // TODO: Connect with backend API to change password
    setMessage("Password changed successfully!");
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
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-100 text-white "
            disabled
          />
          <input
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            value={formData.currentPassword || ""}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={formData.newPassword || ""}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword || ""}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            required
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
