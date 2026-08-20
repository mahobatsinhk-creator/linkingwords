import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { buildMetadata } from "@/lib/seo/metadata";
import { fontVariableClassNames } from "@/styles/fonts";

import "./globals.css";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#104547",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariableClassNames}>
      <body>{children}</body>
    </html>
  );
}
