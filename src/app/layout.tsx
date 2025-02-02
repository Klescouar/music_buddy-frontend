import type { Metadata } from "next";
import { AuthProvider } from "./AuthProvider";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";

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
    <AuthProvider>
      <html lang="en">
        <body className={`h-screen ${josefin.className}`}>
          <div className="flex items-center justify-center bg-gray-100 w-full h-full">
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
