"use client";
import { Item } from "@/types/Spotify";
import { getRandomIndex } from "@/utils/array";
import { fetchJson } from "@/utils/fetch";
import { extractTopArtistImageUrls } from "@/utils/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const User = () => {
  const { data: session } = useSession();
  const [topArtistImages, setTopArtistImages] = useState<string[] | null>(null);
  const hasFetchedTopArtists = useRef(false);

  useEffect(() => {
    if (!session || hasFetchedTopArtists.current) return;

    const fetchUser = async () => {
      const data: { items: Item[] } = await fetchJson(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${session?.token?.access_token}`,
          },
        }
      );
      setTopArtistImages(extractTopArtistImageUrls(data.items));
    };
    fetchUser();
    hasFetchedTopArtists.current = true;
  }, [session, topArtistImages]);

  return (
    <div className="flex items-center space-x-4 p-2 mb-5">
      <Image
        className="rounded-full"
        src={
          topArtistImages?.[getRandomIndex(topArtistImages)] ||
          "http://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
        }
        alt="James Bhatta"
        width={50}
        height={50}
      />
      <div>
        <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
          {session?.user?.name}
        </h4>
        <span className="text-sm tracking-wide flex items-center space-x-1">
          <svg
            className="h-4 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-gray-600">{session?.user?.email}</span>
        </span>
      </div>
    </div>
  );
};
