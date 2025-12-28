import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "ArchFlow — AI-Powered Architecture Decision Platform",
  description: "AI-assisted platform for architecture analysis and decision support. Automate documentation, detect architectural risk, and generate traceable recommendations.",
  keywords: ["AI", "architecture", "software engineering", "tech debt", "analysis", "decision support"],
  authors: [{ name: "Michael Marquis" }],
  
  // Open Graph
  openGraph: {
    title: "ArchFlow — AI-Powered Architecture Decision Platform",
    description: "AI-assisted platform for architecture analysis and decision support",
    url: "https://archflow-sigma.vercel.app/",
    siteName: "ArchFlow",
    images: [
      {
        url: "https://archflow-sigma.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArchFlow Dashboard Preview",
      },
    ],
    type: "website",
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "ArchFlow — AI-Powered Architecture Decision Platform",
    description: "AI-assisted platform for architecture analysis and decision support",
    images: ["https://archflow-sigma.vercel.app/og-image.png"],
    creator: "@quis_tech", // Optional: add your Twitter handle if you have one
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* You can add additional head tags here if needed */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}