"use client";

import { useEffect, useState } from "react";
import { PlanillaComprarBtn } from "@/components/PlanillaComprarBtn";

// En mobile la sidebar de compra queda al fondo de la página: pasado el hero, el único botón
// de compra estaba a 6 pantallas de distancia. La barra aparece recién cuando el CTA del hero
// salió por arriba, y se va cuando el CTA de cierre entra en pantalla (no compite con él).
export function BarraCompraMovil({
  slug,
  tituloCorto,
  precio,
}: {
  slug: string;
  tituloCorto: string;
  precio: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("compra-hero");
    const cierre = document.getElementById("compra-cierre");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    let heroArriba = false;
    let cierreVisible = false;
    const actualizar = () => setVisible(heroArriba && !cierreVisible);

    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.target === hero) heroArriba = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === cierre) cierreVisible = e.isIntersecting;
      }
      actualizar();
    });
    obs.observe(hero);
    if (cierre) obs.observe(cierre);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      data-visible={visible}
      aria-hidden={!visible}
      inert={!visible}
      className="ca-barra fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-12px_rgba(0,0,0,0.22)] backdrop-blur lg:hidden"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900">{tituloCorto}</p>
          <p className="text-xs text-zinc-500">
            ${precio.toLocaleString("es-AR")} · pago único · devolución 7 días
          </p>
        </div>
        <PlanillaComprarBtn producto={slug} precio={precio} id="cta-barra-movil" etiqueta="Comprar" compacto />
      </div>
    </div>
  );
}
