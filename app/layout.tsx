// Types
import type { Metadata } from "next";

// Styles
import "./globals.css";
import { NeueMontreal } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Stock Manager",
  description: "Manage your stock.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={NeueMontreal.className} lang="en">
      <body className="flex min-h-screen flex-col text-slate-700">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
