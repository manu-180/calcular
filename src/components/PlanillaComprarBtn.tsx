"use client";

import { track } from "@vercel/analytics";

// Botón de compra. Navega en la MISMA pestaña a propósito: con target="_blank" el checkout de
// MercadoPago se abre en otra, y cuando MP hace el auto_return a /planillas/gracias el comprador
// termina con dos pestañas y la descarga en la que no está mirando. En mobile, además, los
// bloqueadores de popups se comen la apertura y el click no hace nada visible.
export function PlanillaComprarBtn({
  href,
  producto,
  precio,
  id,
  etiqueta,
}: {
  href: string;
  producto: string;
  precio: number;
  /** Identifica QUÉ botón de la página se tocó: sin esto, los tres CTA son indistinguibles
   *  en analytics y no hay forma de saber cuál convierte. */
  id?: string;
  etiqueta?: string;
}) {
  const texto = etiqueta ?? `Comprar ahora · $${precio.toLocaleString("es-AR")}`;
  return (
    <a
      href={href}
      className="block rounded-lg bg-emerald-600 px-5 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:translate-y-px"
      onClick={() => track("planilla_comprar_click", { producto, precio, cta: id ?? "sin-id" })}
    >
      {texto}
    </a>
  );
}
