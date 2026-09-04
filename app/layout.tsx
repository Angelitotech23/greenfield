import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pasaporte Profesional",
  description:
    "Currículum público verificable. Títulos y certificados en blockchain; antecedentes solo off-chain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <Providers>
          <SiteHeader />
          <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-10">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
