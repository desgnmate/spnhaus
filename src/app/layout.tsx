import type { Metadata } from "next";
import { Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const druk = localFont({
  src: "./fonts/DrukWide-SuperItalic-Trial.otf",
  variable: "--font-druk",
  weight: "900",
  style: "italic",
});

const drukWideBold = localFont({
  src: "./fonts/DrukWide-Bold-Trial.otf",
  variable: "--font-druk-wide-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "SPNHAUS — DJ Collective",
  description:
    "SPNHAUS is a DJ collective that brings music to spaces with intention. Business launches, private events, corporate events, weddings, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${druk.variable} ${drukWideBold.variable} font-sans antialiased bg-black text-white`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
