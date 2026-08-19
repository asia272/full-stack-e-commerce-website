

import { Outfit } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Store",
  description: "Your e-commerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans`}>

        <Toaster position="top-right" richColors />
        {children}

      </body>
    </html>
  );
}