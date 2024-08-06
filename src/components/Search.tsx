"use client";

import { ISong } from "@/types/Song";
import { SpotifySong } from "@/types/Spotify";
import { fetchJson } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [songs, setSongs] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (query.length < 3) return;

    const timer = setTimeout(async () => {
      setIsFetching(true);
      const response = await fetchJson<ISong[]>(
        "http://localhost:8000/search?input=" + query
      );

      const promises = response.map((song) =>
        fetchJson<{ tracks: SpotifySong }>(
          `https://api.spotify.com/v1/search?q=track:${song.title} artist:${song.artist}&type=track&limit=1`,
          {
            headers: {
              Authorization: `Bearer ${session?.token?.access_token}`,
            },
          }
        )
      );

      const results = await Promise.allSettled(promises);
      const songIds = results.reduce((acc: string[], result) => {
        if (result.status === "fulfilled" && result.value.tracks.items[0]?.id) {
          acc.push(result.value.tracks.items[0].id);
        }
        return acc;
      }, []);

      setSongs(songIds);
      setIsFetching(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, session?.token?.access_token]);

  return (
    <div className="flex align flex-col h-full">
      <h1
        className="text-6xl text-gray-900 mb-5 mt-20 text-center font-normal"
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
      {isFetching && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {!isFetching && (
        <div className="grid grid-cols-3 grid-rows-5 gap-1 w-full mt-10">
          {songs.map((song) => (
            <div className="flex items-center justify-center" key={song}>
              <iframe
                src={`https://open.spotify.com/embed/track/${song}`}
                width="300"
                height="380"
                frameBorder="0"
                allow="encrypted-media"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
