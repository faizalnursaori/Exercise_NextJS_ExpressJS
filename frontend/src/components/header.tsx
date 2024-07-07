"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <div>
      <header className="flex justify-between p-4 max-w-screen-xl mx-auto gap-5">
        <nav className="flex h-[90px] items-center justify-between container mx-auto px-4 py-2">
          <div className="flex items-center">
            <Link href={"/"} className="text-md font-bold">
              MERN
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href={"/dashboard"} className="text-md font-bold">
              Home
            </Link>
            <Link href={"/post"} className="text-md font-bold">
              Post
            </Link>
            <Link href={"/blog"} className="text-md font-bold">
              Blog
            </Link>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="flex gap-2">
              <button className="button" onClick={() => router.push("/login")}>
                Login
              </button>
              <button className="button btn-primary" onClick={() => router.push("/register")}>
                Register
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
