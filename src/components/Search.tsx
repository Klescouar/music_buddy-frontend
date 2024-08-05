"use client";

import { ISong } from "@/types/Song";
import { fetchJson } from "@/utils/fetch";
import { useState, useEffect } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length < 3) return;
    const timer = setTimeout(async () => {
      const response = await fetchJson<ISong[]>(
        "http://localhost:8000/search?input=" + query
      );
      console.log(response);
    }, 2000);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="flex align items-center h-full p-10">
      <h1
        className="text-6xl text-gray-900 mb-5 text-center font-normal"
        style={{ lineHeight: "80px" }}
      >
        I’m looking for music that sounds like
        <input
          type="search"
          id="default-search"
          className="border-0 focus:outline-none bg-transparent ml-4"
          style={{ maxWidth: "610px" }}
          placeholder="Nirvana - Nevermind..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </h1>
    </div>
  );
};
