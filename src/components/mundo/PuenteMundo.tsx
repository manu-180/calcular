"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { guardarTraspasoAR } from "@/lib/mundo/traspaso-ar";
import { rastrear } from "@/lib/rastreo";
import { variantePuente, type VariantePuente } from "@/motor/compartir/ref";
import { PAISES_PUENTE, RUTA_MUNDO_AR } from "@/motor/mundo/rutas";

// Una exposición por variante y carga de página: el resultado se monta y desmonta mientras la persona tipea.
const expuestos = new Set<VariantePuente>();

// El mismo A/B 50 % que calcularya (variantePuente): la variante «sin» no ve la línea y sirve de control
// para saber si sacar gente de la calculadora le baja el uso. Solo existe con un resultado en pantalla,
// que nunca se pinta en el servidor: por eso la variante se lee en el primer render y no en un efecto,
// que haría aparecer la línea un cuadro después.
export function PuenteMundo({ brutoMensual }: { brutoMensual: number }) {
  const [variante] = useState<VariantePuente | null>(() => (typeof window === "undefined" ? null : variantePuente()));

  useEffect(() => {
    if (!variante || expuestos.has(variante)) return;
    expuestos.add(variante);
    rastrear("puente_visto", { props: { v: variante } });
  }, [variante]);

  if (variante !== "con") return null;

  return (
    <p className="text-sm text-zinc-600 [text-wrap:pretty]">
      ¿Y en otros países?{" "}
      <Link
        href={RUTA_MUNDO_AR}
        onClick={() => {
          guardarTraspasoAR(brutoMensual);
          rastrear("puente_clic", { props: { v: "con" } });
        }}
        className="group font-medium text-emerald-800 underline decoration-emerald-700/40 decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-300 hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Mirá cuánto te quedaría en mano en más de {PAISES_PUENTE} países
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="ml-1 inline-block h-3.5 w-3.5 align-[-0.125em] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] motion-reduce:transition-none"
        >
          <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </p>
  );
}
