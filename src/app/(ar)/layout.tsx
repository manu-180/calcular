import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdSense from "@/components/AdSense";
import { Rastreador } from "@/components/Rastreador";
import { AcordeonesFluidos } from "@/components/AcordeonesFluidos";
import { HerramientasCalculo } from "@/components/herramientas/HerramientasCalculo";
import { tabsDelEncabezado } from "@/data/navegacion";
import { JsonLd } from "@/components/JsonLd";
import { grafoDelSitio } from "@/lib/seo";
import { hoyAR, META_HOY } from "@/lib/hoy";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calcular.ar"),
  // Sin template de marca a propósito (6/10/2026): " · CalculAR" sumaba 11 caracteres y dejaba 162 de
  // 166 títulos por encima de los 60 que muestra Google, que igual pone el nombre del sitio arriba
  // de cada resultado a partir del WebSite de grafoDelSitio().
  title: "CalculAR: calculadoras claras para la Argentina",
  description:
    "Calculadoras gratuitas y actualizadas para la Argentina: monotributo, aguinaldo, vacaciones y más. Datos oficiales, resultados claros y sin vueltas.",
  applicationName: "CalculAR",
  authors: [{ name: "Manuel Navarro", url: "https://calcular.ar/sobre" }],
  creator: "Manuel Navarro",
  publisher: "CalculAR",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "CalculAR",
    locale: "es_AR",
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  // Verificacion de propiedad de AdSense por meta tag. El <script> de adsbygoogle se
  // inyecta recien despues de `load` + idle (ver components/AdSense.tsx, es lo que baja
  // el FCP movil), asi que el publisher ID NO aparece en el HTML servido: un crawler que
  // no ejecuta JS no encuentra nada que verificar. Esta meta es el metodo oficial
  // alternativo de Google, cuesta cero bytes de JS y deja el pub ID en el HTML crudo.
  // NO sacarla aunque el script parezca suficiente.
  other: { "google-adsense-account": "ca-pub-1118110129260994" },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

// Las páginas AR eligen el mes vigente (haberes, SMVM, escalas de convenio) en el render. Sin esto
// son estáticas para siempre y el día 1 siguen mostrando el mes anterior hasta que alguien
// redeploye. El revalidate más bajo entre layout y página manda en toda la ruta (doc de Next 16,
// caching-without-cache-components), así que vale para todas las páginas de (ar) sin tocarlas.
export const revalidate = 3600;

// Se calcula en el servidor y viaja como prop: el header sabe qué tab marcar sin cargar
// el modelo de navegación entero en el JS de cada página.
const TABS = tabsDelEncabezado();
const GRAFO_DEL_SITIO = grafoDelSitio();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="font-sans">
        <meta name={META_HOY} content={hoyAR()} />
        <JsonLd data={GRAFO_DEL_SITIO} />
        <a href="#contenido" className="ca-saltar">
          Saltar al contenido
        </a>
        {/* La columna flex va en este wrapper y NO en <body> a propósito: AdSense y el CMP
            (FundingChoices) inyectan nodos como hijos directos de <body> — ya está ahí el
            <ins class="adsbygoogle-noablate"> del anchor ad. Con display:flex en <body> esos
            nodos entran como flex items y redistribuyen la columna (main tiene flex-1),
            moviendo la página entera. Con el wrapper caen fuera del layout de la app. */}
        <div className="flex min-h-dvh flex-col">
          <SiteHeader tabs={TABS} />
          <main id="contenido" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Rastreador />
        <AcordeonesFluidos />
        <HerramientasCalculo />
        <AdSense />
      </body>
    </html>
  );
}
