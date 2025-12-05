"use client";

import Link from "next/link";
import { useState } from "react";

type UserRole = "guest" | "user" | "admin";

export default function PublicNavbar() {
  // 🔹 Later replace this with your real auth state from Context/Redux/NextAuth
  const [role] = useState<UserRole>("guest"); // guest | user | admin

  const commonLinks = [
    { name: "Explore Travelers", href: "/explore" },
    { name: "Find Travel Buddy", href: "/explore" },
  ];

  const userLinks = [
    { name: "My Travel Plans", href: "/travel-plans" },
    { name: "Profile", href: "/profile/me" },
  ];

  const adminLinks = [
    { name: "Admin Dashboard", href: "/dashboard" },
    { name: "Manage Users", href: "/dashboard/users" },
    { name: "Manage Travel Plans", href: "/dashboard/travel-plans" },
  ];

  const authLinks = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* 🔹 Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MeetlinkO
        </Link>

        {/* 🔹 Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {commonLinks.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-blue-600">
              {item.name}
            </Link>
          ))}

          {role === "user" &&
            userLinks.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-blue-600">
                {item.name}
              </Link>
            ))}

          {role === "admin" &&
            adminLinks.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-blue-600">
                {item.name}
              </Link>
            ))}

          {role === "guest" &&
            authLinks.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-blue-600">
                {item.name}
              </Link>
            ))}

          {(role === "user" || role === "admin") && (
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          )}
        </div>

        {/* 🔹 Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {commonLinks.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}

          {role === "user" &&
            userLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}

          {role === "admin" &&
            adminLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}

          {role === "guest" &&
            authLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}

          {(role === "user" || role === "admin") && (
            <button className="bg-red-500 text-white py-2 rounded">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
