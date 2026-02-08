import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WalletProvider } from "@/components/providers/WalletProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Percolator | Perpetual Futures Terminal",
  description:
    "Professional perpetual futures trading terminal for the Percolator protocol on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
