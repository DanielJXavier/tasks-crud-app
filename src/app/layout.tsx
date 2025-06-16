import type { Metadata } from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tasks App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="w-vw h-vh">
        <header className="fixed top-0 right-0 left-0 border-b text-center py-2 shadow-xl">
          <Link href="/">Tasks App</Link>
        </header>

        <main className="mt-24 mb-14 h-full flex items-start justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
