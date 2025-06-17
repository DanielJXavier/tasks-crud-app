import type { Metadata } from "next";

import Link from "next/link";

import "./globals.css";

const PAGE_TITLE = "Tasks App";

export const metadata: Metadata = {
  title: { default: PAGE_TITLE, template: `${PAGE_TITLE} | %s` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="fixed top-0 right-0 left-0 py-2 border-b text-center shadow-xl">
          <Link className="font-bold" href="/">
            {PAGE_TITLE}
          </Link>
        </header>

        <main className="mt-24 mb-14 flex justify-center">{children}</main>

        <footer className="mb-14 text-center">
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
