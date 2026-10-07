"use client";

import { useEffect, useId, useState } from "react";
import { leerDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { CASOS, prefill, type Caso, type Datos } from "@/lib/prefill/inflacion";
import { formatARS } from "@/lib/formato";
import { CASO_EJEMPLO, NOMBRE_CASO_CORTO, SLUG_INFORME, armarInforme, mesTxt } from "@/app/(ar)/informes/inflacion/_modelo";
import { InformeInflacionDocumento } from "./InformeInflacionDocumento";
import { tratoPorDefecto, PERSONALES_VACIOS } from "./carta";

// Vista previa REAL: el mismo componente que se entrega, con el caso de ejemplo o, si la persona
// viene de la calculadora, con sus números. El HTML del servidor siempre trae el ejemplo (no
// conoce el localStorage); el cambio pasa adentro de una caja de alto fijo, así no mueve la página.
export function InformeInflacionVistaPrevia() {
  const id = useId();
  const [propios, setPropios] = useState<Datos | null>(null);
  const [caso, setCaso] = useState<Caso>(CASO_EJEMPLO.caso);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const d = prefill.validar(leerDatosCompra(SLUG_INFORME));
    if (d && armarInforme(d)) {
      setPropios(d);
      setCaso(d.caso);
    }
  }, []);

  const elegir = (c: Caso) => {
    setCaso(c);
    // Con números propios, el caso elegido acá es el que viaja con la compra.
    if (propios) recordarDatosCompra(SLUG_INFORME, { ...propios, caso: c });
  };

  const base = propios ?? CASO_EJEMPLO;
  const datos: Datos = { ...base, caso, actual: caso === "sueldo" ? base.actual : null };
  const informe = armarInforme(datos);
  if (!informe) return null;

  return (
    <figure className="relative">
      <figcaption className="mb-3 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
            <span aria-hidden className={`size-1.5 rounded-full ${propios ? "bg-emerald-500" : "bg-zinc-400"}`} />
            {propios
              ? `Con tus números: ${formatARS(base.monto, 0)} de ${mesTxt(base.desde)}`
              : `Ejemplo: ${formatARS(base.monto, 0)} de ${mesTxt(base.desde)}`}
          </span>
          <span className="text-xs text-zinc-500">Es el informe real, no una captura</span>
        </div>
        <div role="group" aria-label="Cambiar la carta del informe" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {CASOS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={caso === c}
              onClick={() => elegir(c)}
              className={`min-h-10 shrink-0 rounded-full px-3.5 text-xs font-medium transition-colors duration-150 ${
                caso === c ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:text-zinc-900 hover:ring-zinc-300"
              }`}
            >
              {NOMBRE_CASO_CORTO[c]}
            </button>
          ))}
        </div>
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
            <InformeInflacionDocumento
              datos={datos}
              informe={informe}
              personales={{ ...PERSONALES_VACIOS, trato: tratoPorDefecto(caso) }}
              muestra
            />
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
            {abierto ? "Achicar la vista previa" : "Ver el informe completo, con la carta"}
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
