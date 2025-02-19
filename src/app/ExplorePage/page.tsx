import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // Nếu bạn dùng React Router

import { IoMdPerson } from "react-icons/io";

export function Navbar({ className, ...props }: React.ComponentProps<"div">) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(" bg-s text-w fixed top-0 left-0 w-full z-10", className)}
      {...props}
    >
      <div className="w-full ">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ml-8">
            <Link to="/" className="text-xl font-bold left-0">
              Gen2Play
            </Link>
          </div>

          {/* Links cho màn hình lớn */}
          <div className="hidden sm:flex space-x-4 mr-8">
            <Link
              to="/homepage"
              className="text-black hover:text-red-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-red-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-red-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>

            <div className="group relative">
              <Link to="/login">
                <IoMdPerson className="w-5 h-8 cursor-pointer hover:text-red-900" />
              </Link>
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 px-5 bg-slate-700 text-white rounded">
                  <p className="cursor-pointer hover:text-red-900">
                    My Profile
                  </p>
                  <p className="cursor-pointer hover:text-red-900">Order</p>
                  <p className="cursor-pointer hover:text-red-900">Logout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nút menu di động nằm bên phải */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={cn(
          "fixed top-0 right-0 w-64 h-full bg-slate-700 p-4 transform transition-transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-red-500"
        >
          ✖
        </button>

        <div className="space-y-4 mt-10">
          <Link
            to="/homepage"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
