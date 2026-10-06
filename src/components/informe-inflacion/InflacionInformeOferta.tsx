"use client";

import Link from "next/link";
import { formatARS, formatPctFijo } from "@/lib/formato";
import { CASOS, type Caso, type Datos } from "@/lib/prefill/inflacion";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import { NOMBRE_CASO, RUTA_LANDING_INFORME, SLUG_INFORME, armarInforme, mesCorto } from "@/app/informes/inflacion/_modelo";
import { armarCarta, PERSONALES_VACIOS, tratoPorDefecto } from "./carta";

const SERIF = "[font-family:var(--font-informe),Georgia,serif]";

const TITULO: Record<Caso, string> = {
  sueldo: "Pedí el aumento con el dato oficial en la mano",
  honorarios: "Subí tus honorarios sin tener que justificarte de más",
  precio: "Actualizá el presupuesto con una cuenta que el cliente puede revisar",
  "deuda-presto": "Proponé cuánto vale hoy esa plata, sin pelear",
  "deuda-debo": "Devolvé esa plata en lo que vale hoy, con la cuenta a la vista",
};

const PUNTOS = [
  "La carta escrita con tus números, lista para mandar o imprimir",
  "La cuenta mes a mes con el IPC del INDEC, para que la puedan revisar",
  "Respuestas a lo que te van a decir («el IPC es un promedio»)",
];

// Va a la landing y no abre el diálogo de compra: ahí la persona ve el informe entero con SUS
// números antes de pagar. `desde` termina en la referencia de MercadoPago: es como se sabe qué
// calculadora vendió.
export function InflacionInformeOferta({
  datos,
  precio,
  onCaso,
}: {
  datos: Datos;
  precio: number;
  onCaso: (c: Caso) => void;
}) {
  const informe = armarInforme(datos);
  if (!informe) return null;
  const carta = armarCarta(datos.caso, informe, { ...PERSONALES_VACIOS, trato: tratoPorDefecto(datos.caso) });
  const ultimas = informe.filas.slice(-3);

  return (
    <section
      data-oferta={SLUG_INFORME}
      aria-labelledby="cta-informe-inflacion"
      className="mt-6 rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5"
    >
      <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Informe + carta para mandar</p>
        <h2 id="cta-informe-inflacion" className="mt-1.5 text-xl font-bold tracking-tight text-balance text-zinc-900">
          {TITULO[datos.caso]}
        </h2>

        <fieldset className="mt-4">
          <legend className="text-sm text-zinc-600">¿Para qué lo necesitás?</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CASOS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={datos.caso === c}
                onClick={() => onCaso(c)}
                className={`min-h-10 rounded-full px-3.5 text-[13px] font-medium transition-[background-color,color,box-shadow] duration-150 ${
                  datos.caso === c
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:text-zinc-900 hover:ring-zinc-300"
                }`}
              >
                {NOMBRE_CASO[c]}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_15rem] md:items-start">
          {/* La carta con sus números: es la prueba de que lo que compra ya tiene su caso adentro. */}
          <div
            aria-label="Vista previa de la carta"
            className={`${fuenteInforme.variable} relative max-h-64 overflow-hidden rounded-xl bg-[#fcfbf8] px-5 pb-6 pt-5 ring-1 ring-zinc-900/[0.07]`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Asunto: {carta.asunto}</p>
            <div className={`${SERIF} mt-3 space-y-2.5 text-[15px] leading-[1.6] text-zinc-800`}>
              <p>{carta.saludo}</p>
              {carta.parrafos.slice(0, 3).map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fcfbf8] via-[#fcfbf8]/90 to-transparent" />
          </div>

          <div className="space-y-4">
            <dl aria-label="Resumen de la cuenta" className="rounded-xl bg-zinc-50 p-4 text-[13px] ring-1 ring-zinc-200/70">
              {ultimas.map((f) => (
                <div key={f.periodo} className="flex justify-between gap-3 border-b border-zinc-200/70 py-1.5 tabular-nums">
                  <dt className="capitalize text-zinc-500">{mesCorto(f.periodo)}</dt>
                  <dd className="text-zinc-700">{formatARS(f.montoActualizado, 0)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-3 pt-2 font-semibold tabular-nums text-zinc-900">
                <dt>Hoy</dt>
                <dd>
                  {formatARS(informe.act.montoActualizado, 0)}{" "}
                  <span className="font-normal text-zinc-500">(+{formatPctFijo(informe.act.variacionPct, 1)})</span>
                </dd>
              </div>
            </dl>
            <ul className="space-y-2 text-sm text-zinc-600">
              {PUNTOS.map((p) => (
                <li key={p} className="flex gap-2">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600">
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center">
          <Link
            href={`${RUTA_LANDING_INFORME}?desde=inflacion`}
            data-evento="cta_compra"
            data-producto={SLUG_INFORME}
            data-ubicacion="calculadora-resultado"
            className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-emerald-600 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] active:scale-[0.98]"
          >
            Ver mi informe completo
            <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:translate-x-0.5">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4">
                <path d="M4.5 10h11m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-zinc-500">
            <span className="font-semibold text-zinc-800">${precio.toLocaleString("es-AR")}</span> · pago único · lo ves entero
            antes de pagar · devolución dentro de los 7 días
          </p>
        </div>
      </div>
    </section>
  );
}
