import type { Metadata } from "next";
// Fonts must be imported from next/font/google
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google"; 
import "./globals.css";

// Components are imported cleanly by themselves
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "St. Mary's AIPCA Church - Kathelwa",
  description: "Worshipping God, Serving Community in Meru County.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}