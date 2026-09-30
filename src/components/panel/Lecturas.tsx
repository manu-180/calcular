"use client";

import Link from "next/link";
import { hrefInterno } from "@/lib/panel/formato";
import type { Lectura } from "@/lib/panel/tipos";
import { IcoAlerta, IcoDato, IcoFlechaDerecha, IcoIdea, IcoLogro } from "./iconos";
import { Bandeja, Seccion, TARJETA } from "./ui";

const TONOS = {
  oportunidad: { etiqueta: "Oportunidad", Icono: IcoIdea, clase: "bg-sky-50 text-sky-800 ring-sky-700/15" },
  alerta: { etiqueta: "Ojo con esto", Icono: IcoAlerta, clase: "bg-amber-50 text-amber-800 ring-amber-700/15" },
  logro: { etiqueta: "Viene bien", Icono: IcoLogro, clase: "bg-emerald-50 text-emerald-800 ring-emerald-700/15" },
  dato: { etiqueta: "Para tener en cuenta", Icono: IcoDato, clase: "bg-zinc-100 text-zinc-700 ring-zinc-900/[0.06]" },
} as const;

export function Lecturas({ lecturas, onAncla }: { lecturas: Lectura[]; onAncla: (href: string) => void }) {
  if (!lecturas.length) return null;
  const impar = lecturas.length % 2 === 1;
  return (
    <Seccion
      id="lecturas"
      indice={1}
      titulo="Lo que haría yo"
      bajada="Miré los números por vos. Por acá empezaría."
    >
      <Bandeja>
        <ul className="grid gap-1.5 md:grid-cols-2">
          {lecturas.map((l, i) => {
            const t = TONOS[l.tono] ?? TONOS.dato;
            return (
              <li
                key={l.id}
                className={`${TARJETA} flex flex-col p-5 ${impar && i === 0 ? "md:col-span-2" : ""}`}
              >
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${t.clase}`}
                >
                  <t.Icono className="size-3.5" />
                  {t.etiqueta}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug text-zinc-900 [text-wrap:balance]">
                  {l.titulo}
                </h3>
                <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-zinc-600 [text-wrap:pretty]">
                  {l.detalle}
                </p>
                {l.accion ? <Accion texto={l.accion.texto} href={l.accion.href} onAncla={onAncla} /> : null}
              </li>
            );
          })}
        </ul>
      </Bandeja>
    </Seccion>
  );
}

const BOTON =
  "group mt-4 inline-flex w-fit items-center gap-2 rounded-full py-1 pl-3.5 pr-1 text-sm font-medium text-zinc-900 ring-1 ring-zinc-900/10 transition-[transform,background-color] duration-200 ease-fluid hover:bg-zinc-50 active:scale-[0.97]";

function Accion({ texto, href, onAncla }: { texto: string; href?: string; onAncla: (href: string) => void }) {
  const icono = (
    <span className="grid size-7 place-items-center rounded-full bg-zinc-900 text-white transition-transform duration-200 ease-fluid group-hover:translate-x-0.5">
      <IcoFlechaDerecha className="size-3.5" />
    </span>
  );
  if (!href) return null;
  if (href.startsWith("#")) {
    return (
      <button type="button" className={BOTON} onClick={() => onAncla(href)}>
        {texto}
        {icono}
      </button>
    );
  }
  const interno = hrefInterno(href);
  if (!interno) return null;
  return (
    <Link href={interno} className={BOTON} target="_blank" rel="noopener">
      {texto}
      {icono}
      <span className="sr-only">(se abre en otra pestaña)</span>
    </Link>
  );
}
