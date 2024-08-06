import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Music Suggestions",
  description: "A music suggestion app",
};

const josefin = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="flex-1 h-full overflow-y-scroll">{children}</div>
    </>
  );
}
