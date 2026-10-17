"use client";

import { abrirCompra } from "@/components/CompraDialogo";

// En mobile la vista previa empuja el precio y el botón más de una pantalla y media debajo del
// inicio de la oferta (/sueldo-neto/comercio a 375 px: 1.255 px). Quien ya decidió compra desde
// acá; quien duda sigue teniendo la prueba y el botón de abajo. Sólo mobile: en desktop la grilla
// de dos columnas ya pone el precio a la par. `data-ubicacion` distinto para medir cuál se toca.

export function PrecioArriba({
  slug,
  precio,
  boton = "Comprar mi planilla",
}: {
  slug: string;
  precio: number;
  boton?: string;
}) {
  return (
    <div className="mt-4 md:hidden">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-50 p-1.5 pl-4 ring-1 ring-zinc-900/[0.06]">
        <p className="min-w-0 leading-tight">
          <span className="block text-xl font-bold tracking-tight text-zinc-900 tabular-nums">
            ${precio.toLocaleString("es-AR")}
          </span>
          <span className="text-xs text-zinc-500">pago único</span>
        </p>
        <a
          href={`/planillas/comprar?p=${slug}`}
          rel="nofollow"
          data-evento="cta_compra"
          data-producto={slug}
          data-ubicacion="calculadora-arriba"
          onClick={(e) => {
            if (abrirCompra(slug)) e.preventDefault();
          }}
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-emerald-600 py-1 pr-1 pl-4 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 active:scale-[0.98]"
        >
          {boton}
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-white/15 transition-transform duration-200 ease-[var(--ease-snappy)] group-hover:translate-x-0.5"
          >
            <svg viewBox="0 0 20 20" fill="none" className="size-4">
              <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
      <p className="mt-2 px-1 text-xs text-zinc-500">Si no te sirve, tenés 7 días para pedir la devolución.</p>
    </div>
  );
}
