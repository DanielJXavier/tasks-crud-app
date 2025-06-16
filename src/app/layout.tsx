import type { Metadata } from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Tasks App", template: "Tasks App | %s" },
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
          <Link className="font-bold" href="/">
            Tasks App
          </Link>
        </header>

        <main className="mt-24 mb-14 flex items-start justify-center">
          {children}
        </main>

        <footer className="text-center">
          <p className="text-sm">
            Projeto desenvolvido durante o curso de Fundamentos de Front-End com
            React
          </p>
          <p className="text-xs">Por Daniel Xavier (2025)</p>
        </footer>
      </body>
    </html>
  );
}
