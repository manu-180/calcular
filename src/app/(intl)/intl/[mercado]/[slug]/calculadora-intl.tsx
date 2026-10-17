"use client";

import { useCallback } from "react";
import { CalculadoraDiferida, type DefinicionVisible } from "@/motor/cliente";
import type { DefinicionCalculadora, OrigenTraduccion, PropsCalculadora } from "@/motor/tipos";
import type { ContextoUniversal } from "@/motor/universales/tipos";
import { cargadorLocal } from "./cargadores";

// Dos niveles de import() (cargadores/index.ts y cargadores/<m>.ts, generados desde el registro): el
// JS de la página lleva un índice de mercados y baja el mapa de su país y el chunk de su calculadora.
// Con un mapa único, las 600 entradas de todos los países viajaban en cada calculadora. Las
// universales no están en esos mapas: se rearman con su contexto (src/motor/universales/cargadores.ts).
// zz, las ediciones y los mercados internos no tienen mapa generado: en `next dev` los resuelve
// cargadores/dev.ts; en un preview solo calculan sus universales.
// El cliente de cuatro líneas de cada país (<slug>.cliente.tsx) no se usa acá: si el servidor lo
// importara, Next 16 metería todas las calculadoras en el JS de todas las páginas intl (lo
// neutraliza la regla turbopack de next.config.ts).
export function CalculadoraIntl({
  mercado,
  slug,
  definicion,
  universal,
  traduccion,
  ...props
}: PropsCalculadora & { mercado: string; slug: string; definicion: DefinicionVisible; universal?: { id: string; contexto: ContextoUniversal }; traduccion?: OrigenTraduccion }) {
  const cargar = useCallback(async (): Promise<DefinicionCalculadora> => {
    if (universal) {
      const { cargarUniversal } = await import("@/motor/universales/cargadores");
      return cargarUniversal(universal.id, universal.contexto);
    }
    const cargador = cargadorLocal(mercado, slug, traduccion);
    if (!cargador) throw new Error(`sin cargadores para ${mercado}`);
    return (await cargador()).default as DefinicionCalculadora;
  }, [mercado, slug, universal, traduccion]);
  return <CalculadoraDiferida definicion={definicion} cargar={cargar} {...props} />;
}
