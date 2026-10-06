"use client";

import { CompraDialogo, abrirCompra } from "@/components/CompraDialogo";
import { HojaCalculo } from "@/components/HojaCalculo";
import type { DatosOferta } from "@/lib/oferta";
import { formatARS } from "@/lib/formato";
import { NotaMiniatura } from "./NotaMiniatura";
import { fechaConDia } from "./cronograma";
import type { hojaVacaciones } from "./previa";

// La oferta de la planilla de vacaciones, debajo del resultado de /vacaciones. Esa calculadora la usan
// tanto empleados como empleadores: el resultado gratis queda igual y la oferta se presenta como lo que
// es, una herramienta para quien tiene gente a cargo, con el caso que acaba de cargar ya adentro (la
// hoja Liquidación y la nota de vacaciones con sus fechas). Mismo estuche que OfertaPlanilla.

type Previa = NonNullable<ReturnType<typeof hojaVacaciones>>;

const PUNTOS = [
  {
    titulo: "La nota de vacaciones, lista para firmar",
    texto: "Con los días, las fechas y el día de regreso de cada persona, por duplicado en una hoja A4.",
  },
  {
    titulo: "Te avisa antes de que se pase un plazo",
    texto:
      "Si la fecha no cae en lunes, si el aviso de 30 días está por vencer, si un tramo tiene menos de 7 días o si se pasa del 30 de abril.",
  },
  {
    titulo: "Cuánto pagás en cada mes de la temporada",
    texto:
      "Hasta 40 personas, con el pago al inicio y el plus vacacional agrupados de octubre a abril. Y las vacaciones no gozadas si alguien se va.",
  },
];

export function OfertaVacaciones({ producto, previa }: { producto: DatosOferta; previa: Previa }) {
  const precio = `$${producto.precio.toLocaleString("es-AR")}`;
  const idTitulo = `oferta-${producto.slug}`;
  const { resumen } = previa;
  const c = resumen.cronograma;

  return (
    <section
      data-oferta={producto.slug}
      aria-labelledby={idTitulo}
      className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/[0.06]"
    >
      <CompraDialogo producto={{ slug: producto.slug, tituloCorto: producto.tituloCorto, precio: producto.precio }} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[1.375rem] bg-white p-4 shadow-[var(--shadow-apoyo)] sm:p-7 md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:gap-x-8">
        <header className="md:col-start-2 md:row-start-1">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-emerald-800 uppercase ring-1 ring-emerald-700/10">
            <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="5.5" cy="5" r="2.3" />
              <circle cx="11" cy="6" r="1.8" />
              <path d="M1.5 13.5c.4-2.4 2-3.8 4-3.8s3.6 1.4 4 3.8M9.6 10.2c.4-.3.9-.4 1.4-.4 1.6 0 2.8 1.2 3.1 3.2" strokeLinecap="round" />
            </svg>
            Si tenés gente a cargo
          </p>
          <h3 id={idTitulo} className="mt-3 text-[1.375rem] leading-tight font-bold tracking-tight text-zinc-900 sm:text-2xl">
            Las vacaciones de todo tu equipo, con el aviso y la nota resueltos
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
            Para este caso: {resumen.diasTramo} días desde el {fechaConDia(c.inicio)}, el aviso por escrito hasta el{" "}
            <strong className="font-semibold text-zinc-800">{fechaConDia(c.avisarAntesDe)}</strong> y{" "}
            {formatARS(resumen.pagar, 0)} para pagar al empezar. La planilla hace esta misma cuenta para cada persona y te
            arma la nota para firmar.
          </p>
        </header>

        <div className="md:col-start-1 md:row-span-2 md:row-start-1">
          <HojaCalculo hoja={previa.hoja} />
          <NotaMiniatura
            className="relative mt-4 md:mx-5 md:-mt-4"
            dias={resumen.diasTramo}
            saldo={resumen.saldo}
            inicio={c.inicio}
            fin={c.fin}
            vuelve={c.vuelve}
            pagar={resumen.pagar}
          />
          <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
            <span aria-hidden className="inline-block size-2.5 rounded-sm bg-[#FFFDE7] ring-1 ring-amber-300/70" />
            Te llega con este caso cargado. Sumás al resto del equipo y se recalcula todo.
          </p>
        </div>

        <div className="md:col-start-2 md:row-start-2">
          <ul className="space-y-3.5">
            {PUNTOS.map((p) => (
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
              <span className="text-sm text-zinc-500">pago único, para toda la temporada</span>
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
              Comprar la planilla
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
              Pagás con MercadoPago y te llega al mail al instante, en Excel y Google Sheets. Si no te sirve, tenés 7 días
              para pedir la devolución.
            </p>
            <a
              href={`${producto.rutaLanding}?desde=vacaciones`}
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
