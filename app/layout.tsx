import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cozy-island-daycare-website.vercel.app"),
  title: "Cozy Island Day Care | Where Every Child Feels at Home | Lakewood, NJ",
  description:
    "Cozy Island Day Care in Lakewood, NJ provides a warm, safe, and nurturing environment for children ages 0-6. Licensed childcare center with experienced teachers. Infant care, toddler programs, preschool, pre-K, and after school. Schedule a tour today!",
  keywords: [
    "daycare Lakewood NJ",
    "childcare center Lakewood",
    "Cozy Island Day Care",
    "infant care NJ",
    "toddler program Lakewood",
    "preschool Lakewood NJ",
    "after school program",
    "licensed daycare NJ",
  ],
  openGraph: {
    title: "Cozy Island Day Care | Where Every Child Feels at Home",
    description:
      "A warm, safe, and nurturing childcare center in Lakewood, NJ. Serving children ages 0-6 with experienced, loving teachers.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
