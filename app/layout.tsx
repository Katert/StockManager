// Types
import type { Metadata } from "next";

// Styles
import "./globals.css";
import { NeueMontreal } from "@/styles/fonts";

// Components
import { Header, Footer } from "@/components/layout";

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
        <Header />
        <main className="flex flex-grow flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
