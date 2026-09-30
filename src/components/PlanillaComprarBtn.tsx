"use client";

import { abrirCompra } from "@/components/CompraDialogo";

// Abre el diálogo de compra (pide el mail antes de ir a MercadoPago). Sin JS, o en una página
// que no monta el diálogo, sigue el href a /planillas/comprar, que tiene el mismo formulario.
// El pago se hace en la MISMA pestaña a propósito: con target="_blank" el auto_return de MP a
// /planillas/gracias deja al comprador con la descarga en la pestaña que no está mirando.
export function PlanillaComprarBtn({
  producto,
  precio,
  id,
  etiqueta,
  compacto = false,
}: {
  producto: string;
  precio: number;
  /** Identifica QUÉ botón de la página se tocó (va como `ubicacion` del evento `cta_compra`):
   *  sin esto, los CTA son indistinguibles y no hay forma de saber cuál convierte. */
  id?: string;
  etiqueta?: string;
  compacto?: boolean;
}) {
  const texto = etiqueta ?? `Comprar ahora · $${precio.toLocaleString("es-AR")}`;
  return (
    <a
      href={`/planillas/comprar?p=${producto}`}
      rel="nofollow"
      data-evento="cta_compra"
      data-producto={producto}
      data-ubicacion={id ?? "sin-id"}
      className={
        compacto
          ? "block shrink-0 rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform] duration-200 hover:bg-emerald-700 active:translate-y-px"
          : "block rounded-lg bg-emerald-600 px-5 py-3.5 text-center text-base font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-emerald-700 hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.22)] active:translate-y-px"
      }
      onClick={(e) => {
        if (abrirCompra(producto)) e.preventDefault();
      }}
    >
      {texto}
    </a>
  );
}
