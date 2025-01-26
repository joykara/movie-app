import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Inter, Noto_Sans } from 'next/font/google';

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
        className={`${roboto.variable} ${inter.variable} ${notoSans.variable} bg-white dark:bg-black`}
        >
        {children}
      </body>
    </html>
  );
}
