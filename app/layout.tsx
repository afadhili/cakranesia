import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import {
  generateMetadata as genMetadata,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/metadata";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-Inter-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontSerif = Source_Serif_4({
  variable: "--font-Source-Serif-4-serif",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = genMetadata({
  keywords: [
    "kuliner indonesia",
    "resep indonesia",
    "makanan nusantara",
    "resep tradisional",
    "masakan indonesia",
    "kuliner nusantara",
    "resep daerah",
    "makanan khas indonesia",
    "food blog indonesia",
    "komunitas kuliner",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        <meta name="theme-color" content="#facc15" />
        <meta name="application-name" content="Cakranesia" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cakranesia" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="google-site-verification"
          content="XSKggyaQHzGCGlIY-1sqQH-bw8EJYIpZLE4pf6bVTrg"
        />

        {/* Structured Data */}
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
      </head>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
