"use client";

import { useEffect, useId, useState } from "react";
import { formatARS } from "@/lib/formato";
import { leerDatosCompra } from "@/lib/prefill/cliente";
import { prefill, type Datos } from "@/lib/prefill/ganancias";
import {
  CASO_EJEMPLO,
  GASTOS_EJEMPLO,
  GASTOS_VACIOS,
  SLUG_INFORME,
  armarInforme,
} from "@/app/informes/ganancias/_modelo";
import { InformeGananciasDocumento } from "@/components/informe-ganancias/Documento";

// Vista previa REAL: el mismo componente que se entrega. El HTML del servidor trae el ejemplo (no
// conoce el localStorage); si la persona viene de la calculadora, el cambio pasa adentro de una caja
// de alto fijo, así no mueve la página.
export function InformeGananciasVistaPrevia() {
  const id = useId();
  const [propios, setPropios] = useState<Datos | null>(null);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const d = prefill.validar(leerDatosCompra(SLUG_INFORME));
    if (d && armarInforme(d)?.paga) setPropios(d);
  }, []);

  const informe = propios ? armarInforme(propios, GASTOS_VACIOS) : armarInforme(CASO_EJEMPLO, GASTOS_EJEMPLO);
  if (!informe) return null;

  return (
    <figure className="relative">
      <figcaption className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
          <span aria-hidden className={`size-1.5 rounded-full ${propios ? "bg-emerald-500" : "bg-zinc-400"}`} />
          {propios
            ? "Con el sueldo que cargaste en la calculadora"
            : `Ejemplo: ${formatARS(CASO_EJEMPLO.bruto, 0)} de bruto, ${CASO_EJEMPLO.hijos} hijos, alquiler, prepaga y colegio`}
        </span>
        <span className="text-xs text-zinc-500">Es el informe real, no una captura</span>
      </figcaption>

      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-x-6 -bottom-2 top-3 hidden rounded-[1.5rem] bg-white shadow-[var(--shadow-apoyo)] ring-1 ring-zinc-900/5 md:block md:rotate-[1.4deg]"
        />
        <div className="relative rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5">
          <div
            id={id}
            className={`relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white px-5 pt-7 shadow-[var(--shadow-alzada)] sm:px-10 sm:pt-10 ${
              abierto ? "pb-10" : "max-h-[34rem] sm:max-h-[40rem]"
            }`}
          >
            <InformeGananciasDocumento informe={informe} muestra />
            {!abierto ? (
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/85 to-transparent" />
            ) : null}
          </div>
        </div>
        <div className="relative -mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls={id}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white shadow-[var(--shadow-alzada)] transition-transform duration-200 ease-[var(--ease-snappy)] active:scale-[0.98]"
          >
            {abierto ? "Achicar la vista previa" : "Ver el informe completo"}
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
              className={`size-4 transition-transform duration-300 ease-[var(--ease-snappy)] ${abierto ? "rotate-180" : ""}`}
            >
              <path d="m5.5 8 4.5 4.5L14.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </figure>
  );
}
