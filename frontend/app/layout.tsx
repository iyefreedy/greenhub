import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const author = localFont({
  src: [
    {
      path: '../assets/fonts/Author-Extralight.otf',
      weight: '200',
    },
    {
      path: '../assets/fonts/Author-Light.otf',
      weight: '300',
    },

    {
      path: '../assets/fonts/Author-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Author-Medium.otf',
      weight: '500',

    },
    {
      path: '../assets/fonts/Author-Semibold.otf',
      weight: '600',

    },
    {
      path: '../assets/fonts/Author-Bold.otf',
      weight: '700',

    },
  ],
});

export const metadata: Metadata = {
  title: "Green Hub",
  description: "Large community where every local seller gathered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={author.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
