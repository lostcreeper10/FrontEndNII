"use client";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const [decoded, setDecoded] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    petsName: ""
  })
  console.log(formData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/auth/me`, { withCredentials: true });
        setDecoded(res.data);
        setFormData({
          firstName: res.data.firstName || "",
          middleName: res.data.middleName || "",
          lastName: res.data.lastName || "",
          petsName: res.data.petsName || ""
        });
      } catch (error) {
        alert("You must be logged in to view this page.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/auth/profile`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }).then((res) => {
        if (res.data.status) {
          alert("Profile updated successfully!");
        }
      })

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

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
            type="email"
            placeholder="First Name"
            className="w-full border p-2 rounded bg-gray-100"
            value={decoded?.email || ""}
            disabled
          />

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="text"
            name="petsName"
            placeholder="Pet"
            value={formData.petsName}
            onChange={handleChange}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="p-2 bg-green-600 hover:bg-green-700 transition text-white rounded cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
