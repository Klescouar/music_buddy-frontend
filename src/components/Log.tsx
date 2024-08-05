"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export const LogButton = () => {
  const { data: session } = useSession();

  return (
    <li>
      <button
        onClick={() => (session ? signOut() : signIn())}
        className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline w-full"
      >
        <span className="text-gray-600">
          <svg
            className="h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </span>
        <span>{session ? "Logout" : "Login"}</span>
      </button>
    </li>
  );
};
