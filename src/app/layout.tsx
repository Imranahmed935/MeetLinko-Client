export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeetlinkO",
  description: "Connect with travelers worldwide! Discover, explore, and share adventures with like-minded travel buddies on MeetLinkO."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
          <Toaster position="top-right" richColors />
           <Suspense fallback={null}>
            <LoginSuccessToast/>
           </Suspense>
      </body>
    </html>
  );
}
