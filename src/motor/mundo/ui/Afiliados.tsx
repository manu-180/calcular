"use client";

import { lazy, Suspense } from "react";
import type { SocioAfiliado } from "../../i18n/afiliados";

export interface EnlaceAfiliado {
  socio: SocioAfiliado;
  url: string;
}

function https(valor: string | undefined): string | null {
  if (!valor?.trim()) return null;
  try {
    const u = new URL(valor.trim());
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

// Next pone el valor de NEXT_PUBLIC_* en el build solo si se lee con el nombre literal. Sin ninguna
// variable el bloque no existe y su JS (textos en diez idiomas y estilos) nunca se baja.
const ENLACES: readonly EnlaceAfiliado[] = (
  [
    ["wise", https(process.env.NEXT_PUBLIC_AFILIADO_WISE_URL)],
    ["deel", https(process.env.NEXT_PUBLIC_AFILIADO_DEEL_URL)],
  ] as const
).flatMap(([socio, url]) => (url ? [{ socio, url }] : []));

const Bloque = lazy(() => import("./AfiliadosBloque"));

// Va después del ranking y solo cuando el mejor país no es el propio: ahí la pregunta «¿y si me voy?» ya
// está en la cabeza de quien mira. Nunca popup ni banner.
export function Afiliados({ locale, mejor }: { locale: string; mejor: string }) {
  if (!ENLACES.length) return null;
  return (
    <Suspense fallback={null}>
      <Bloque locale={locale} enlaces={ENLACES} mejor={mejor} />
    </Suspense>
  );
}
