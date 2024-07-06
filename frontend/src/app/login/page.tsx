"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(error.message || "An error occurred during logging in");
    }
  };

  return (
    <>
      <main className="flex h-screen justify-center items-center">
        <form onSubmit={handleSubmit} method="POST" className="w-[300px] space-y-2">
          <h1 className="font-bold text-2xl">Login</h1>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-indigo-500 rounded-lg text-white p-2 block w-full">
            Login
          </button>
          <p className="text-center">
            Dont have account?{" "}
            <Link href={"/register"} className="font-semibold text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
