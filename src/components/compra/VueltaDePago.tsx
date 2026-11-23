"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { idaPendiente, olvidarIda, useComprar } from "@/components/compra/directa";

// Quien toca «Comprar» sale a MercadoPago, y de ahí vuelve más gente de la que paga: del 4/9 al
// 3/11/2026 fueron 35 idas y 13 pagos. Hasta hoy el que volvía con «atrás» encontraba la página
// igual que la había dejado, sin una palabra. Este aviso aparece una sola vez, arriba, y contesta
// (en forma de pregunta: no sabemos si pagó y cerró antes de volver a la página de gracias)
// lo que suele frenar en esa pantalla: que no hace falta tener cuenta de MercadoPago, que se puede
// pagar en efectivo y que hay devolución. El botón reintenta la misma compra, con los mismos datos
// de la calculadora, y se mide como `cta_compra` con ubicación «vuelta-de-pago».
//
// No aparece si MercadoPago ya lo devolvió con su propio resultado: la página de gracias (pagó) o
// la landing con ?pago= (rechazo o error, que explica AvisoPago). Tampoco en /planillas/comprar,
// que ya es el formulario de esa misma compra. Y se va solo cuando la persona pasa a otra página:
// vive en el layout, que no se desmonta al navegar.

export type ProductoVuelta = { titulo: string; precio: number };

function altoDelHeader(): number {
  for (const h of document.querySelectorAll<HTMLElement>("header")) {
    const pos = getComputedStyle(h).position;
    if (pos === "sticky" || pos === "fixed") return h.offsetHeight;
  }
  return 64;
}

export function VueltaDePago({ productos }: { productos: Record<string, ProductoVuelta> }) {
  const [slug, setSlug] = useState<string | null>(null);
  // Dónde apareció y debajo de qué: el header fijo cambia de alto entre celular y escritorio.
  const [lugar, setLugar] = useState<{ ruta: string; top: number } | null>(null);
  const ruta = usePathname();
  const producto = slug ? productos[slug] : undefined;
  const { enviando, onClick } = useComprar(slug ?? "", producto?.precio);

  useEffect(() => {
    const mirar = () => {
      const pendiente = idaPendiente();
      if (!pendiente) return;
      // Se muestra una vez: si la cierra o sigue navegando, no la perseguimos por el sitio.
      olvidarIda();
      const q = new URLSearchParams(location.search);
      const aca = location.pathname;
      if (aca.startsWith("/planillas/gracias") || aca.startsWith("/planillas/comprar")) return;
      if (q.has("pago") || q.has("payment_id") || q.has("error")) return;
      if (!productos[pendiente]) return;
      setLugar({ ruta: aca, top: altoDelHeader() + 8 });
      setSlug(pendiente);
    };
    mirar();
    // «Atrás» desde MercadoPago suele restaurar la página del bfcache: no se vuelve a montar nada.
    const alVolver = (e: PageTransitionEvent) => {
      if (e.persisted) mirar();
    };
    window.addEventListener("pageshow", alVolver);
    return () => window.removeEventListener("pageshow", alVolver);
  }, [productos]);

  useEffect(() => {
    if (!slug) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSlug(null);
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [slug]);

  if (!slug || !producto || !lugar || lugar.ruta !== ruta) return null;

  return (
    <div
      style={{ top: lugar.top }}
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4 print:hidden"
    >
      <section
        role="region"
        aria-labelledby="vuelta-de-pago-titulo"
        className="ca-vuelta pointer-events-auto w-full max-w-[34rem] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] ring-1 ring-zinc-900/10 sm:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <p id="vuelta-de-pago-titulo" className="text-[15px] font-semibold text-zinc-900">
            ¿No pudiste terminar la compra?
          </p>
          <button
            type="button"
            onClick={() => setSlug(null)}
            aria-label="Cerrar el aviso"
            className="-m-2 grid size-10 shrink-0 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">
          <span className="font-semibold text-zinc-800">
            {producto.titulo}, ${producto.precio.toLocaleString("es-AR")}.
          </span>{" "}
          Podés pagar con tarjeta de crédito o débito sin tener cuenta de MercadoPago, o en efectivo en Pago Fácil y
          Rapipago. Si no te sirve, tenés 7 días para pedir la devolución.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
          Si ya pagaste, no hace falta que hagas nada más: te llega al mail.
        </p>
        <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={`/planillas/comprar?p=${slug}`}
            rel="nofollow"
            data-evento="cta_compra"
            data-producto={slug}
            data-ubicacion="vuelta-de-pago"
            aria-busy={enviando || undefined}
            onClick={onClick}
            className="inline-flex min-h-11 items-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:scale-[0.98] aria-busy:cursor-wait aria-busy:bg-emerald-700"
          >
            {enviando ? "Te llevamos a MercadoPago…" : "Terminar la compra"}
          </a>
          <a
            href="/contacto"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition-colors hover:text-emerald-900"
          >
            Tuve un problema con el pago
          </a>
        </div>
      </section>
    </div>
  );
}
