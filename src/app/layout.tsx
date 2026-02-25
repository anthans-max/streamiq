import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = "https://streamiq.lotusailab.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "StreamIQ — AI Analytics for OTT Streaming",
  description:
    "StreamIQ by Lotus AI Lab. Upload your streaming data and get instant AI-powered insights on content performance, audience behavior, and revenue trends.",
  keywords: [
    "OTT analytics",
    "streaming data",
    "AI insights",
    "content performance",
    "Lotus AI Lab",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StreamIQ — AI Analytics for OTT Streaming",
    description:
      "StreamIQ by Lotus AI Lab. Upload your streaming data and get instant AI-powered insights on content performance, audience behavior, and revenue trends.",
    type: "website",
    url: BASE_URL,
    siteName: "StreamIQ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StreamIQ — AI Analytics for OTT Streaming Platforms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamIQ — AI Analytics for OTT Streaming",
    description:
      "StreamIQ by Lotus AI Lab. Upload your streaming data and get instant AI-powered insights on content performance, audience behavior, and revenue trends.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmMono.variable} ${outfit.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
