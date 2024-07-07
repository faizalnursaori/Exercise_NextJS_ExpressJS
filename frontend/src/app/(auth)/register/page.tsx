"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
      }

      toast.success("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(error.message || "An error occurred during registration");
    }
  };

  return (
    <>
      <main className="flex h-screen justify-center items-center">
        <form onSubmit={handleSubmit} method="POST" className="w-[300px] space-y-2">
          <h1 className="font-bold text-2xl">Create an Account</h1>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full"
          />
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
          <button type="submit" className="button btn-primary w-full">
            Register
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link href={"/login"} className="font-semibold text-indigo-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
