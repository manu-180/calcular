"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { abrirVista, iniciar } from "@/lib/rastreo";

export function Rastreador() {
  const pathname = usePathname();
  useEffect(() => {
    if (!CUENTAS_ACTIVAS) return;
    iniciar();
    abrirVista(pathname);
  }, [pathname]);
  return null;
}

export default Rastreador;
