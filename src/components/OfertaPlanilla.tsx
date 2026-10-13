"use client";

import type { ReactNode } from "react";
import { CompraDialogo, abrirCompra } from "@/components/CompraDialogo";
import { HojaCalculo, type HojaPrevia } from "@/components/HojaCalculo";
import { PrecioArriba } from "@/components/oferta/PrecioArriba";
import type { DatosOferta } from "@/lib/oferta";

// La oferta de la planilla paga, debajo del resultado de la calculadora. Hasta el 6/10/2026 era un
// recuadro de texto que mandaba a la landing («Ver la planilla →»): en Comercio, 155 usos de la
// calculadora dieron 2 clicks. La persona acaba de ver SU número; lo que la mueve es ver ese mismo
// número adentro del Excel que se lleva, con sus datos ya puestos, y poder pagar sin cambiar de
// página. Por eso: vista previa con sus filas, tres cosas que la calculadora no hace, precio a la
// vista y el diálogo de compra montado acá mismo.

export type PuntoOferta = { titulo: string; texto: ReactNode };

export function OfertaPlanilla({
  producto,
  desde,
  hoja,
  titulo,
  bajada,
  incluye,
  notaHoja = "Las celdas amarillas ya vienen con tus datos. Cambiás una y se recalcula todo.",
}: {
  producto: DatosOferta;
  /** Marca `?desde=` del link a la landing: de ahí sale qué calculadora vende. */
  desde: string;
  hoja: HojaPrevia;
  titulo: string;
  bajada: ReactNode;
  incluye: PuntoOferta[];
  /** Debajo de la vista previa: cambia cuando la previa es un ejemplo y no el caso de la persona. */
  notaHoja?: ReactNode;
}) {
  const precio = `$${producto.precio.toLocaleString("es-AR")}`;
  const idTitulo = `oferta-${producto.slug}`;

  return (
    <section
      data-oferta={producto.slug}
      aria-labelledby={idTitulo}
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
          <h3 id={idTitulo} className="mt-3 text-[1.375rem] font-bold leading-tight tracking-tight text-zinc-900 sm:text-2xl">
            {titulo}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{bajada}</p>
          <PrecioArriba slug={producto.slug} precio={producto.precio} />
        </header>

        <div className="md:col-start-1 md:row-span-2 md:row-start-1">
          <HojaCalculo hoja={hoja} />
          <p className="mt-2.5 flex items-center gap-1.5 text-xs text-zinc-500">
            <span aria-hidden className="inline-block size-2.5 rounded-sm bg-[#FFFDE7] ring-1 ring-amber-300/70" />
            {notaHoja}
          </p>
        </div>

        <div className="md:col-start-2 md:row-start-2">
          <ul className="space-y-3.5">
            {incluye.map((p) => (
              <li key={p.titulo} className="flex gap-3">
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
                  <strong className="block font-semibold text-zinc-900">{p.titulo}</strong>
                  {p.texto}
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
              Pagás con MercadoPago y te llega al mail al instante. Si no te sirve, tenés 7 días para pedir la
              devolución.
            </p>
            <a
              href={`${producto.rutaLanding}?desde=${desde}`}
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
