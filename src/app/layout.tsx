import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@/styles/main.scss";
import "./globals.css";
import Providers from "@/context/providers";

const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "fallback",
});

export const metadata: Metadata = {
  title: "Lallan.AI",
  description: "Do smart work. Instead of hard work",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
