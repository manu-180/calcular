import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/SiteHeader";
import AdSense from "@/components/AdSense";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calcular.ar"),
  title: {
    default: "CalculAR — Calculadoras claras para la Argentina",
    template: "%s · CalculAR",
  },
  description:
    "Calculadoras gratuitas y actualizadas para la Argentina: monotributo, aguinaldo, vacaciones y más. Datos oficiales, resultados claros y sin vueltas.",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "CalculAR",
    locale: "es_AR",
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="font-sans">
        {/* La columna flex va en este wrapper y NO en <body> a propósito: AdSense y el CMP
            (FundingChoices) inyectan nodos como hijos directos de <body> — ya está ahí el
            <ins class="adsbygoogle-noablate"> del anchor ad. Con display:flex en <body> esos
            nodos entran como flex items y redistribuyen la columna (main tiene flex-1),
            moviendo la página entera. Con el wrapper caen fuera del layout de la app. */}
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
            {children}
          </main>
          <footer className="border-t border-zinc-200 bg-white">
            <div className="mx-auto w-full max-w-4xl space-y-3 px-4 py-6 text-xs text-zinc-500 sm:px-6">
              <p>
                Los cálculos de este sitio son orientativos y se basan en fuentes oficiales (ARCA,
                BCRA, INDEC y la legislación vigente). No constituyen asesoramiento impositivo,
                contable, legal ni financiero: ante una decisión importante, consultá con un
                profesional matriculado.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>© 2026 CalculAR · Hecho en Argentina 🇦🇷</span>
                <Link href="/blog" className="hover:text-emerald-700">
                  Guías
                </Link>
                <Link href="/sobre" className="hover:text-emerald-700">
                  Sobre CalculAR
                </Link>
                <Link href="/privacidad" className="hover:text-emerald-700">
                  Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-emerald-700">
                  Términos
                </Link>
                <Link href="/contacto" className="hover:text-emerald-700">
                  Contacto
                </Link>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
        <AdSense />
      </body>
    </html>
  );
}
