import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "A one-chair tattoo studio in Paris 11th. A drop of ink, a clean idea, and the room to make it yours.";

export const metadata: Metadata = {
  title: {
    default: "Just a Drop — Tattoo studio, Paris",
    template: "%s · Just a Drop",
  },
  description,
  applicationName: "Just a Drop",
  keywords: ["tattoo", "tattoo studio", "Paris", "Paris 11", "Bastille"],
  openGraph: {
    type: "website",
    siteName: "Just a Drop",
    title: "Just a Drop — Tattoo studio, Paris",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just a Drop — Tattoo studio, Paris",
    description,
  },
};

export const viewport: Viewport = {
  // Discord uses this for the embed's side bar color.
  themeColor: "#171717",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.className} flex min-h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
