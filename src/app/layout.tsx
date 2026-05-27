import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SignalOS | AI Web Intelligence",
  description: "Premium AI-powered web intelligence frontend for live business monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
