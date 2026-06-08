import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Dr. Sourav Bhadwal | Geographer & Remote Sensing Researcher",
  description:
    "Portfolio of Dr. Sourav Bhadwal — Ph.D. Geography, specializing in Remote Sensing, GIS, Urban Green Spaces, Carbon Sequestration, and Environmental Sustainability.",
  keywords: [
    "Dr. Sourav Bhadwal",
    "Geography",
    "Remote Sensing",
    "GIS",
    "Urban Green Space",
    "Carbon Sequestration",
    "Urban Heat Island",
    "IIT BHU",
    "Central University Haryana",
    "Environmental Research",
  ],
  authors: [{ name: "Dr. Sourav Bhadwal", url: "mailto:bhadwalsourav@gmail.com" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Dr. Sourav Bhadwal | Geographer & Remote Sensing Researcher",
    description:
      "Portfolio of Dr. Sourav Bhadwal — Ph.D. Geography, Remote Sensing & GIS Expert",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
