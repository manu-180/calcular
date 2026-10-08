"use client";

import { useCallback } from "react";
import { CalculadoraDiferida, type DefinicionVisible } from "@/motor/cliente";
import type { DefinicionCalculadora, PropsCalculadora } from "@/motor/tipos";

// import() con plantilla desde el cliente: Turbopack arma un chunk por cada definición de
// src/paises/<m>/calculadoras/*.ts y el navegador baja solo el de esta página. El cliente de
// cuatro líneas de cada país (<slug>.cliente.tsx) no se usa acá: si el servidor lo importara,
// Next 16 metería todas las calculadoras en el JS de todas las páginas intl (lo neutraliza la
// regla turbopack de next.config.ts).
export function CalculadoraIntl({ mercado, slug, definicion, ...props }: PropsCalculadora & { mercado: string; slug: string; definicion: DefinicionVisible }) {
  const cargar = useCallback(
    () => import(`../../../../../paises/${mercado}/calculadoras/${slug}.ts`).then((m: { default: DefinicionCalculadora }) => m.default),
    [mercado, slug],
  );
  return <CalculadoraDiferida definicion={definicion} cargar={cargar} {...props} />;
}
