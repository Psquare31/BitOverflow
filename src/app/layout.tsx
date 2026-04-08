import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "@/lib/utils";

import ClientComponent from "./c";
import PageLoader from "./components/PageLoader";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bit-overflow.vercel.app"),
  title: {
    default: "BitOverflow",
    template: "%s | BitOverflow",
  },
  description:
    "BitOverflow is a student-first platform for BIT Mesra where questions, clubs, events, and campus discovery live in one place.",
  keywords: [
    "BitOverflow",
    "BIT Mesra community",
    "BIT Mesra forum",
    "BIT Mesra events",
    "BIT Mesra clubs",
    "student platform BIT Mesra",
    "college community platform",
  ],
  authors: [{ name: "Sumit Shekhar" }, { name: "Pranav Prajyot" }],
  creator: "BitOverflow",
  openGraph: {
    title: "BitOverflow",
    description:
      "A focused campus network for BIT Mesra students to ask better questions, stay close to clubs and events, and discover what matters on campus.",
    url: "https://bit-overflow.vercel.app",
    siteName: "BitOverflow",
    images: [
      {
        url: "/bitoverflow_preview.png",
        width: 1200,
        height: 630,
        alt: "BitOverflow platform preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitOverflow",
    description:
      "Ask questions, follow campus happenings, and stay connected with the BIT Mesra community.",
    images: ["/bitoverflow_preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="lkm3vAuVAaNjtOxkw09hQEncIv4eMoE5rpWDkqcrK6I"
        />
      </head>
      <body
        className={cn(
          manrope.variable,
          ibmPlexMono.variable,
          "bg-[var(--bg)] text-[var(--text)] antialiased"
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <PageLoader />
        </Suspense>
        <ClientComponent>{children}</ClientComponent>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
