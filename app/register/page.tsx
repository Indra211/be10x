"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState("");
  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleCnfPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnfPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    if (!formData.email || !formData.password || !formData.fullName) {
      return setError("Please enter all details");
    }
    if (formData.password !== cnfPassword) {
      return setError("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return setError("Password should be atleast 6 characters");
    }
    if (formData.password.length > 20) {
      return setError("Password should be less than 20 characters");
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return setError("Please enter a valid email");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.status === "success") {
        alert(data?.message);
        router.replace("/login");
      }
      if (data?.status === "error") {
        alert(data?.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
      setCnfPassword("");
      setError("");
    }
  };
  return (
    <div className="grid w-screen h-screen place-items-center bg-slate-100">
      <form
        className="p-4 shadow-lg bg-white rounded-lg flex flex-col w-1/2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-medium self-start text-slate-600 mb-4">
          Enter your details
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleFormData}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleFormData}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleFormData}
        />
        <input
          value={cnfPassword}
          onChange={handleCnfPassword}
          type="password"
          placeholder="confirm password"
          name="cnfPassword"
        />

        {error && (
          <h3 className="bg-red-500 mb-4 p-2 rounded-lg  text-white font-medium w-[60%] text-center">
            {error}
          </h3>
        )}

        <button
          style={{ alignSelf: "center" }}
          type="submit"
          className="px-2 py-1 bg-blue-400 text-xl text-white rounded-lg hover:bg-blue-500"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <Link href="/login" className="self-center">
          Do you have an account? <span className="text-blue-500">Login</span>
        </Link>
      </form>
    </div>
  );
};

export default Register;
