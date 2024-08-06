"use client";
import { Loader } from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const App = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/home";
    }
  }, [status]);

  return <Loader />;
};

export default App;
