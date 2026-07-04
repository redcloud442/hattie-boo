import type { Metadata } from "next";
import "@fontsource-variable/fredoka";
import "@fontsource-variable/nunito";
import "@fontsource/pacifico";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Christening Celebration",
  description:
    "You're warmly invited to celebrate our little angel's christening.",
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
