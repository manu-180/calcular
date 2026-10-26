"use client";

import { useMemo, useState } from "react";
import type { BocaDatos, PaginaBoca } from "@/lib/panel/tipos";
import { hrefInterno, numero } from "@/lib/panel/formato";
import { IcoCalculadora } from "../iconos";
import { Bloque, NOMBRE_SITIO, Pais, VacioBoca } from "./comun";

type Orden = "llegadas" | "compartidos" | "coeficiente" | "usaron";

const COLUMNAS: { clave: Orden; texto: string; ayuda: string; movil: boolean }[] = [
  { clave: "compartidos", texto: "Compartidos", ayuda: "Veces que se compartió la página", movil: true },
  { clave: "llegadas", texto: "Llegadas", ayuda: "Gente que entró por esos links", movil: true },
  { clave: "coeficiente", texto: "Nuevas por persona", ayuda: "Llegadas nuevas dividido personas que la compartieron", movil: false },
  { clave: "usaron", texto: "Usaron", ayuda: "Llegadas que usaron una calculadora", movil: false },
];

const VISIBLES = 10;
const unDecimal = new Intl.NumberFormat("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const coef = (p: PaginaBoca) => (p.personas > 0 ? p.nuevas / p.personas : -1);

function valor(o: Orden, p: PaginaBoca): number {
  return o === "coeficiente" ? coef(p) : p[o];
}

export function TablaPaginas({ boca, mercado }: { boca: BocaDatos; mercado: string | null }) {
  const [orden, setOrden] = useState<Orden>("llegadas");
  const [todas, setTodas] = useState(false);
  const filas = useMemo(
    () => [...boca.paginas].sort((a, b) => valor(orden, b) - valor(orden, a) || b.llegadas - a.llegadas || b.compartidos - a.compartidos),
    [boca.paginas, orden],
  );
  const mostradas = todas ? filas : filas.slice(0, VISIBLES);

  return (
    <Bloque
      titulo="Qué páginas se comparten"
      significa="Cada compartido trae su código, así que se sabe qué página trajo a quién. Tocá una columna para ordenar."
    >
      {filas.length === 0 ? (
        <VacioBoca titulo="Ninguna página compartida en este período" icono={<IcoCalculadora className="size-4" />}>
          Apenas alguien comparta un resultado, la página aparece acá con la gente que trajo.
        </VacioBoca>
      ) : (
        <>
          <div className="-mx-2 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[19rem] border-separate border-spacing-0 text-sm">
              <caption className="sr-only">Páginas compartidas, ordenadas por {COLUMNAS.find((c) => c.clave === orden)?.texto.toLowerCase()}</caption>
              <thead>
                <tr className="text-left text-xs text-zinc-600">
                  <th scope="col" className="border-b border-zinc-100 px-2 pb-2 font-medium">
                    Página
                  </th>
                  {COLUMNAS.map((c) => (
                    <th
                      key={c.clave}
                      scope="col"
                      aria-sort={orden === c.clave ? "descending" : "none"}
                      className={`border-b border-zinc-100 pb-2 text-right font-medium ${c.movil ? "" : "hidden sm:table-cell"}`}
                    >
                      <button
                        type="button"
                        title={c.ayuda}
                        onClick={() => setOrden(c.clave)}
                        className={`inline-flex h-8 items-center gap-1 rounded-full px-2 transition-[background-color,color] duration-200 hover:bg-zinc-100 ${
                          orden === c.clave ? "text-zinc-900" : ""
                        }`}
                      >
                        {c.texto}
                        <span aria-hidden className={`text-[10px] ${orden === c.clave ? "opacity-100" : "opacity-0"}`}>
                          ▼
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mostradas.map((p) => {
                  const href = p.sitio === "ar" ? hrefInterno(p.path) : null;
                  return (
                    <tr key={`${p.sitio}${p.mercado}${p.path}`} className="align-top">
                      <th scope="row" className="border-b border-zinc-100 px-2 py-2.5 text-left font-normal">
                        {href ? (
                          <a href={href} target="_blank" rel="noopener" className="font-medium text-zinc-900 underline-offset-2 hover:underline">
                            {p.titulo}
                          </a>
                        ) : (
                          <span className="font-medium text-zinc-900">{p.titulo}</span>
                        )}
                        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-zinc-600">
                          {mercado ? null : <Pais mercado={p.mercado} />}
                          <span>{NOMBRE_SITIO[p.sitio]}</span>
                        </span>
                      </th>
                      <td className="border-b border-zinc-100 px-2 py-2.5 text-right tabular-nums text-zinc-900">{numero(p.compartidos)}</td>
                      <td className="border-b border-zinc-100 px-2 py-2.5 text-right tabular-nums text-zinc-900">
                        {numero(p.llegadas)}
                        <span className="block text-xs text-zinc-600">{numero(p.nuevas)} nuevas</span>
                      </td>
                      <td className="hidden border-b border-zinc-100 px-2 py-2.5 text-right tabular-nums text-zinc-900 sm:table-cell">
                        {p.personas > 0 ? unDecimal.format(p.nuevas / p.personas) : "—"}
                      </td>
                      <td className="hidden border-b border-zinc-100 px-2 py-2.5 text-right tabular-nums text-zinc-900 sm:table-cell">{numero(p.usaron)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filas.length > VISIBLES ? (
            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setTodas((t) => !t)}
                className="h-10 rounded-full px-4 text-sm font-medium text-zinc-700 transition-[background-color,transform] duration-200 hover:bg-zinc-100 active:scale-[0.97]"
              >
                {todas ? "Mostrar menos" : `Ver las ${numero(filas.length)} páginas`}
              </button>
            </div>
          ) : null}
        </>
      )}
    </Bloque>
  );
}
