"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "@/components/ui/toaster"

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { api } from "@/convex/_generated/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export const metadata: Metadata = {
//   title: "Andon AMF",
//   description: "Gerenciador de todas as linhas de produção",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexProvider client={convex}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
