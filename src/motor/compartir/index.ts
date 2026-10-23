"use client";

import { useCallback, useState } from "react";

export type EstadoCompartir = "listo" | "compartido" | "copiado" | "error";

export interface OpcionesCompartir {
  // De dónde sale el compartido, para medir: "calculadora:<id>", "mundo", "duelo"...
  origen: string;
  // URL absoluta o relativa al sitio actual, sin parámetros de seguimiento (se agregan acá).
  url: string;
  titulo: string;
  texto: string;
  // Imagen opcional para compartir como archivo (Stories). Solo se usa si el navegador lo soporta.
  imagen?: () => Promise<Blob | null>;
}

// STUB del contrato: el frente de compartir lo reemplaza (ref por persona, medición, Web Share con
// archivo, fallback a copiar). Las firmas no cambian.
export function conRef(url: string): string {
  return url;
}

export function usarCompartir(opciones: OpcionesCompartir) {
  const [estado, setEstado] = useState<EstadoCompartir>("listo");
  const compartir = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(conRef(opciones.url));
      setEstado("copiado");
    } catch {
      setEstado("error");
    }
  }, [opciones.url]);
  return { compartir, estado, soportaNativo: false };
}
