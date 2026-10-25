"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RUTA_HORAS_AR } from "@/lib/horas-ar/catalogo";
import { guardarTraspasoAR } from "@/lib/mundo/traspaso-ar";
import { rastrear } from "@/lib/rastreo";
import { variantePuente, type VariantePuente } from "@/motor/compartir/ref";
import { guardarSueldoHoras } from "./traspaso";

// Una exposición por variante y carga de página: el resultado se monta y desmonta mientras la persona tipea.
const expuestos = new Set<VariantePuente>();

// La línea debajo del resultado de /sueldo-neto. Antes llevaba a «Tu sueldo en el mundo»; desde el
// 25/10/2026 lleva a las horas de trabajo, que se entiende sin explicación y tiene tarjeta para compartir
// (el mundo sigue a un toque desde esa página). Mismo A/B 50 % que calcularya (variantePuente): la
// variante «sin» no ve la línea y sirve de control. La variante se lee en el primer render y no en un
// efecto, que haría aparecer la línea un cuadro después.
export function PuenteHoras({ neto, bruto }: { neto: number; bruto: number }) {
  const [variante] = useState<VariantePuente | null>(() => (typeof window === "undefined" ? null : variantePuente()));

  useEffect(() => {
    if (!variante || expuestos.has(variante)) return;
    expuestos.add(variante);
    rastrear("puente_visto", { props: { v: variante } });
  }, [variante]);

  if (variante !== "con") return null;

  return (
    <p className="text-sm text-zinc-600 [text-wrap:pretty]">
      ¿Y en tiempo?{" "}
      <Link
        href={RUTA_HORAS_AR}
        onClick={() => {
          guardarSueldoHoras(neto, bruto);
          guardarTraspasoAR(bruto);
          rastrear("puente_clic", { props: { v: "con" } });
        }}
        className="group font-medium text-emerald-800 underline decoration-emerald-700/40 decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-300 hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Mirá cuántas horas de trabajo te cuesta un kilo de asado
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
