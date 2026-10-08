"use client";

import { useCallback } from "react";
import { CalculadoraDiferida, type DefinicionVisible } from "@/motor/cliente";
import type { DefinicionCalculadora, PropsCalculadora } from "@/motor/tipos";
import { CARGADORES } from "./cargadores";

// Un import() literal por calculadora (cargadores.ts, generado desde el registro): Turbopack arma
// un chunk por definición y el navegador baja solo el de esta página. Antes era un import() con
// plantilla, que metía en el build los chunks de todos los mercados, zz e internos incluidos. Por
// eso zz y los mercados internos no calculan en un preview: no tienen cargador.
// El cliente de cuatro líneas de cada país (<slug>.cliente.tsx) no se usa acá: si el servidor lo
// importara, Next 16 metería todas las calculadoras en el JS de todas las páginas intl (lo
// neutraliza la regla turbopack de next.config.ts).
export function CalculadoraIntl({ mercado, slug, definicion, ...props }: PropsCalculadora & { mercado: string; slug: string; definicion: DefinicionVisible }) {
  const cargar = useCallback(() => {
    const cargador = CARGADORES[mercado]?.[slug];
    if (!cargador) return Promise.reject(new Error(`sin cargador para ${mercado}/${slug}`));
    return cargador().then((m) => m.default as DefinicionCalculadora);
  }, [mercado, slug]);
  return <CalculadoraDiferida definicion={definicion} cargar={cargar} {...props} />;
}
