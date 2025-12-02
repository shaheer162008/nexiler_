import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig, pageMetadata } from "@/lib/siteContent";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: pageMetadata.home.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: pageMetadata.home.openGraph.title,
    description: pageMetadata.home.openGraph.description,
    siteName: siteConfig.name,
    images: pageMetadata.home.openGraph.images,
  },
  twitter: {
    card: pageMetadata.home.twitter.card,
    title: pageMetadata.home.twitter.title,
    description: pageMetadata.home.twitter.description,
    images: pageMetadata.home.twitter.images,
    creator: "@nexiler",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#00040F" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
