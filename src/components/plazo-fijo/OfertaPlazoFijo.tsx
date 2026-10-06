"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { CompraDialogo, abrirCompra } from "@/components/CompraDialogo";
import { HojaCalculo } from "@/components/HojaCalculo";
import { RegistroPrevia } from "@/components/plazo-fijo/RegistroPrevia";
import type { PreviaPlazoFijo } from "@/components/plazo-fijo/hojas";
import type { DatosOferta } from "@/lib/oferta";
import { formatARS, formatPct } from "@/lib/formato";

// La oferta de la planilla, debajo del resultado de /plazo-fijo. Misma familia que OfertaPlanilla
// (doble bisel, precio a la vista, compra sin salir de la página), pero con tres hojas para mirar:
// lo que vende esta planilla no es una cuenta, es el control de varios plazos fijos y saber si le
// ganaron a la inflación. Las tres muestran SU plazo fijo, con los números que trae el archivo.

type Pestana = "registro" | "renovacion" | "uva";

export function OfertaPlazoFijo({ producto, previa }: { producto: DatosOferta; previa: PreviaPlazoFijo }) {
  const [activa, setActiva] = useState<Pestana>("registro");
  const base = useId();
  const refs = useRef<Record<Pestana, HTMLButtonElement | null>>({ registro: null, renovacion: null, uva: null });
  const precio = `$${producto.precio.toLocaleString("es-AR")}`;
  const r = previa.resultado;
  const meses = Math.round(r.diasTotales / 30);

  const pestanas: { id: Pestana; titulo: string }[] = [
    { id: "registro", titulo: "Tus plazos fijos" },
    { id: "renovacion", titulo: `Renovar ${meses >= 11 && meses <= 13 ? "un año" : `${r.diasTotales} días`}` },
    { id: "uva", titulo: "Contra un UVA" },
  ];

  function teclas(e: KeyboardEvent<HTMLDivElement>) {
    const i = pestanas.findIndex((p) => p.id === activa);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? pestanas.length - 1 : null;
    if (n === null) return;
    e.preventDefault();
    const sig = pestanas[(n + pestanas.length) % pestanas.length].id;
    setActiva(sig);
    refs.current[sig]?.focus();
  }

  const leyenda =
    activa === "registro"
      ? "Tu plazo fijo ya cargado en la fila 15. Abajo sumás los de tus otros bancos."
      : activa === "renovacion"
        ? `Renovando capital + intereses ${previa.renovaciones} ${previa.renovaciones === 1 ? "vez" : "veces"}, con la inflación que estimaste.`
        : previa.empatePct !== null
          ? `Si la inflación mensual promedio supera ${formatPct(previa.empatePct, 2)}, el UVA termina con más; si no, el tradicional.`
          : "El UVA exige 90 días como mínimo: en la planilla lo comparás a 90 días o más.";

  return (
    <section
      data-oferta={producto.slug}
      aria-labelledby={`${base}-titulo`}
      className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/[0.06]"
    >
      <CompraDialogo producto={{ slug: producto.slug, tituloCorto: producto.tituloCorto, precio: producto.precio }} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[1.375rem] bg-white p-4 shadow-[var(--shadow-apoyo)] sm:p-7 md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:gap-x-8">
        <header className="md:col-start-2 md:row-start-1">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800 ring-1 ring-emerald-700/10">
            <svg aria-hidden viewBox="0 0 16 16" className="size-3">
              <rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M1.5 6h13M6 6v8.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Excel y Google Sheets
          </p>
          <h3 id={`${base}-titulo`} className="mt-3 text-[1.375rem] font-bold leading-tight tracking-tight text-zinc-900 sm:text-2xl">
            Todos tus plazos fijos, medidos contra la inflación real
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
            Tu plazo fijo de <strong className="font-semibold text-zinc-800">{formatARS(previa.registro.capital, 0)}</strong> a{" "}
            {previa.registro.dias} días ya viene cargado. Sumás los de tus otros bancos y la planilla te dice cuándo vence
            cada uno, cuánto cobrás y si le ganó al IPC oficial del INDEC.
          </p>
        </header>

        <div className="min-w-0 md:col-start-1 md:row-span-2 md:row-start-1">
          <div
            role="tablist"
            aria-label="Hojas de la planilla"
            onKeyDown={teclas}
            className="mb-3 grid grid-cols-3 gap-1 rounded-xl bg-zinc-100 p-1"
          >
            {pestanas.map((p) => {
              const sel = p.id === activa;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    refs.current[p.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${base}-tab-${p.id}`}
                  aria-selected={sel}
                  aria-controls={`${base}-panel`}
                  tabIndex={sel ? 0 : -1}
                  onClick={() => setActiva(p.id)}
                  className={`min-h-11 rounded-lg px-2 text-[13px] font-semibold leading-tight transition-[background-color,color,box-shadow] duration-200 ease-[var(--ease-snappy)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                    sel ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08)] ring-1 ring-zinc-900/5" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {p.titulo}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${activa}`} tabIndex={0} className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
            {activa === "registro" ? (
              <RegistroPrevia archivo={producto.archivo} fila={previa.registro} pestanas={previa.renovacion.pestanas} />
            ) : (
              <HojaCalculo hoja={activa === "renovacion" ? previa.renovacion : previa.uva} />
            )}
          </div>
          <p className="mt-2.5 flex items-start gap-1.5 text-xs leading-snug text-zinc-500" aria-live="polite">
            <span aria-hidden className="mt-0.5 inline-block size-2.5 shrink-0 rounded-sm bg-[#FFFDE7] ring-1 ring-amber-300/70" />
            {leyenda}
          </p>
        </div>

        <div className="md:col-start-2 md:row-start-2">
          <ul className="space-y-3.5">
            {[
              {
                t: "Todos tus bancos en una hoja",
                d: "Hasta 24 plazos fijos: cuándo vence cada uno, cuánto se acredita y un calendario mes por mes.",
              },
              {
                t: "Si le ganaste a la inflación, con el dato oficial",
                d: "Mientras el INDEC no publica, usa tu estimación; cuando sale el IPC de esos meses, cada fila pasa al número real.",
              },
              {
                t: "Renovar, UVA y escalera",
                d: "Simulá un año renovando, compará con un UVA con la regla del BCRA y escaloná vencimientos para tener plata seguido.",
              },
              {
                t: "Al día sin pagar de nuevo",
                d: "Cada IPC nuevo y la tasa de referencia del BCRA te llegan en la misma descarga.",
              },
            ].map((p) => (
              <li key={p.t} className="flex gap-3">
                <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-3">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="text-sm leading-snug text-zinc-600">
                  <strong className="block font-semibold text-zinc-900">{p.t}</strong>
                  {p.d}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-zinc-100 pt-5">
            <p className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">{precio}</span>
              <span className="text-sm text-zinc-500">pago único, sin suscripción</span>
            </p>

            <a
              href={`/planillas/comprar?p=${producto.slug}`}
              rel="nofollow"
              data-evento="cta_compra"
              data-producto={producto.slug}
              data-ubicacion="calculadora"
              onClick={(e) => {
                if (abrirCompra(producto.slug)) e.preventDefault();
              }}
              className="group mt-4 flex min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-emerald-600 py-1.5 pr-1.5 pl-5 text-base font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.35)] active:scale-[0.99]"
            >
              Comprar mi planilla
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-lg bg-white/15 transition-transform duration-200 ease-[var(--ease-snappy)] group-hover:translate-x-0.5"
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-4">
                  <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              Pagás con MercadoPago y te llega al mail al instante. Si no te sirve, tenés 7 días para pedir la devolución.
              Es una herramienta de cálculo: no es asesoramiento financiero ni recomienda bancos.
            </p>
            <a
              href={`${producto.rutaLanding}?desde=plazo-fijo`}
              data-evento="cta_compra"
              data-producto={producto.slug}
              data-ubicacion="calculadora-landing"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition-colors hover:text-emerald-900"
            >
              Ver todo lo que trae la planilla
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
