"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-transparent text-white z-50">
      {/* Left: App Name */}
      <div
        className="text-xl font-bold cursor-pointer ml-20"
        onClick={() => router.push("/home")}
      >
        CREEPERS
      </div>

      {/* Right: Links and Menu */}
      <div className="flex items-center gap-6 mr-20">
        {/* Links */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => router.push("/home")}
            className="hover:text-gray-300 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/about")}
            className="hover:text-gray-300 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="hover:text-gray-300 cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-700 bg-opacity-50 px-3 py-1 rounded hover:bg-gray-600 cursor-pointer"
          >
            Menu
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <button
                onClick={() => { router.push("/profile"); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Manage Profile
              </button>
              <button
                onClick={() => { router.push("/change-password"); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Change Password
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
