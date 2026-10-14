"use client";

import { useState, type CSSProperties } from "react";
import { Bandera } from "@/motor/ui/Bandera";
import { usePaises } from "@/motor/ui/ListaPaises";
import type { OpcionPais } from "@/motor/ui/paises";

// La lista sale de ProveedorPaises (una sola copia por página) y se pinta recién al abrir el
// <details>: cerrado, el cajón de cada página llevaba un link por país en el HTML. En el inicio
// global arranca abierto y se pinta en el servidor, como antes.
export function PaisesCajon({ actual, abierto, textos }: { actual: OpcionPais | null; abierto: boolean; textos: { elegir: string; cambiar: string } }) {
  const opciones = usePaises();
  const [visto, setVisto] = useState(abierto);
  return (
    <details open={abierto} onToggle={(ev) => ev.currentTarget.open && setVisto(true)} className="ca-cajon-item group/d" style={{ "--i": 2 } as CSSProperties}>
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 text-[15px] font-semibold text-zinc-800 outline-none transition-colors hover:bg-zinc-50 active:bg-zinc-100 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2.5">
          {actual ? <Bandera pais={actual.pais} ancho={20} /> : null}
          <span className="truncate">{actual ? actual.nombre : textos.elegir}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-zinc-400">
          {actual ? textos.cambiar : null}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4 transition-transform duration-200 group-open/d:rotate-180">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>
      <ul className="mb-1 grid grid-cols-2 pb-2 pl-2">
        {(visto ? opciones : []).map((o) => {
          const esActual = o.codigo === actual?.codigo;
          return (
            <li key={o.codigo}>
              <a
                href={o.href}
                aria-current={esActual ? "page" : undefined}
                className={
                  esActual
                    ? "flex min-h-11 items-center gap-2.5 rounded-xl bg-emerald-50 px-3 text-[14.5px] font-medium text-emerald-700 outline-none"
                    : "flex min-h-11 items-center gap-2.5 rounded-xl px-3 text-[14.5px] text-zinc-700 outline-none transition-colors hover:bg-zinc-50 active:bg-zinc-100"
                }
              >
                <Bandera pais={o.pais} ancho={18} />
                <span className="min-w-0 leading-tight">{o.nombre}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
