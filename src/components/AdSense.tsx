"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { vendeAlgo } from "@/lib/paginas-que-venden";

const SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1118110129260994";

// El script de AdSense pesa ~250 KiB entre adsbygoogle.js y show_ads_impl, y en <head>
// se descarga y ejecuta ANTES del primer pintado: en PSI móvil eso empujaba el FCP a 4,2 s
// (el trabajo cae antes del FCP, por eso el TBT salía bajo y no lo delataba).
// Se inyecta después de `load` + idle: los auto ads siguen apareciendo, pero ya no compiten
// con el texto por CPU ni por ancho de banda. El timeout del idle es la red de seguridad
// para pestañas en background, donde requestIdleCallback puede no dispararse nunca.
export default function AdSense() {
  const pathname = usePathname();

  useEffect(() => {
    // En una página que vende, el anuncio compite con el producto y pierde por 100 a 1
    // (la cuenta está en src/lib/paginas-que-venden.ts). Acá no se carga.
    if (vendeAlgo(pathname)) return;

    if (document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'))
      return;

    let cancelado = false;

    const inyectar = () => {
      if (cancelado) return;
      cancelado = true;
      const pre = document.createElement("link");
      pre.rel = "preconnect";
      pre.href = "https://pagead2.googlesyndication.com";
      pre.crossOrigin = "anonymous";
      document.head.appendChild(pre);

      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    };

    const programar = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(inyectar, { timeout: 2500 });
      } else {
        window.setTimeout(inyectar, 800);
      }
    };

    if (document.readyState === "complete") {
      programar();
      return;
    }
    window.addEventListener("load", programar, { once: true });
    return () => {
      cancelado = true;
      window.removeEventListener("load", programar);
    };
  }, [pathname]);

  return null;
}
