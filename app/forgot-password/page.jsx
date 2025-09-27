"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: ""
  })
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    setCodeSent(true);

    console.log(`Verification code for ${email}: ${code}`);
    setMessage("A verification code has been sent to your email.");
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if(formData.newPassword !== formData.confirmNewPassword)
    {
      alert("New password and Confirm New Password doesn't match!");
      return;
    }
    if (inputCode === verificationCode) {
      router.push("/login");
      try {
        await axios.post(`${API}/api/auth/forgot-password`, formData, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }).then((res) => {
          if (res.data.status) {
            let message = res.data.message;
            console.log(message);
          } else {
            let message = res.data.message;
            alert(message);
          }
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("Incorrect verification code.");
    }
  };

  return (
    <>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-900 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Forgot Password
        </h1>

        <div className="w-full max-w-md p-6 bg-gray-800 rounded shadow-lg flex flex-col gap-4">
          {!codeSent ? (
            <form onSubmit={handleSendCode} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition cursor-pointer"
              >
                Send Verification Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter verification code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                required
              />
              <button
                type="submit"
                className="p-2 bg-green-600 hover:bg-green-700 rounded text-white transition cursor-pointer"
              >
                Verify Code
              </button>
            </form>
          )}

          {message && <p className="text-center text-red-400">{message}</p>}

          <button
            onClick={() => router.push("/login")}
            className="text-blue-400 underline self-center mt-4 cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    </>
  );
}
