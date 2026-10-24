"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { esMercadoIntl, mercadoDeRuta, type Sitio } from "@/lib/medicion/mercados";
import { abrirVista, iniciar } from "@/lib/rastreo";
import { CapturaLlegada } from "@/motor/compartir/CapturaLlegada";

export function Rastreador({ sitio = "ar", mercado }: { sitio?: Sitio; mercado?: string }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!CUENTAS_ACTIVAS) return;
    iniciar();
    if (sitio === "ar") {
      abrirVista(pathname);
      return;
    }
    // En calcularya el path real es el del navegador (/mx/x), no el reescrito (/intl/mx/x).
    const ruta = window.location.pathname;
    abrirVista(ruta, { sitio, mercado: esMercadoIntl(mercado) ? mercado : mercadoDeRuta(ruta) });
  }, [pathname, sitio, mercado]);
  // La llegada por un link compartido se lee antes de que iniciar() cree ca_vid: el efecto del hijo corre
  // antes que el de este componente. calcularya la monta aparte en su layout.
  return sitio === "ar" ? <CapturaLlegada /> : null;
}

export default Rastreador;
