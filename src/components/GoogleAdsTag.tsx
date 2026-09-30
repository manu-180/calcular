"use client";

import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/ads";

// page_location sin query a propósito: en /planillas/gracias la URL trae ?payment_id=, que es la
// credencial de descarga del comprador; no puede viajar a Google en la config.
// El shim inline define window.gtag (declaración de función en script clásico) apenas
// corre, antes de que baje gtag/js. ConversionGoogleAds sale sin reportar nada si
// `typeof window.gtag !== "function"`, así que el inline nunca puede quedar con una
// estrategia más tardía que la librería: se perderían conversiones en silencio.
// La librería va lazyOnload: con afterInteractive el App Router la precarga con prioridad alta y sus
// 167 KB le robaban la red al CSS (FCP de /planillas 2,8 s en Lighthouse móvil). El shim encola
// en dataLayer lo que pase antes, así que la conversión de /planillas/gracias no se pierde.
export default function GoogleAdsTag() {
  return (
    <>
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <Script
        id="ga-ads-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}', { page_location: location.origin + location.pathname });`}
      </Script>
    </>
  );
}
