import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Inter, Noto_Sans } from 'next/font/google';
import Navbar from "@/common/ui/Navbar";
import { ToastContainer } from "react-toastify";
import LoadingLayout from '@/components/layouts/LoadingLayout';
import { Suspense } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter'
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans'
});

export const metadata: Metadata = {
  title: "Movierex",
  description: "Movie recommendation application"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${inter.variable} ${notoSans.variable} flex flex-col bg-white dark:bg-black text-black dark:text-white`}>
        <Navbar />
        <Suspense fallback={<LoadingLayout loading={true}>
          <div />
        </LoadingLayout>}>
          <LoadingLayout loading={false}>
            {children}
          </LoadingLayout>
        </Suspense>
        <ToastContainer />
      </body>
    </html>
  );
}
