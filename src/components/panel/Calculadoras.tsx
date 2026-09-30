"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import type { FilaPagina, PanelDatos, Rango } from "@/lib/panel/tipos";
import { deCada100, duracion, numero, plural } from "@/lib/panel/formato";
import { Desplegable } from "./Desplegable";
import { DetallePagina } from "./DetallePagina";
import { IcoChevron, IcoLupa } from "./iconos";
import { tituloDeProducto } from "./meta";
import { Bandeja, Chip, Seccion, TARJETA, Vacio } from "./ui";

type Orden = "usos" | "tiempo" | "tasa" | "interes";

const ORDENES: { clave: Orden; texto: string; ayuda: string }[] = [
  { clave: "usos", texto: "Más usadas", ayuda: "Las que más veces se usaron" },
  { clave: "tiempo", texto: "Más tiempo", ayuda: "Donde la gente se queda más tiempo usándolas" },
  { clave: "tasa", texto: "Enganchan más", ayuda: "De cada 100 que entran, cuántos la usan" },
  { clave: "interes", texto: "Más quieren comprar", ayuda: "Desde donde más gente quiso comprar una planilla" },
];

const VISIBLES = 10;

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function metrica(orden: Orden, f: FilaPagina): number {
  switch (orden) {
    case "usos":
      return f.usos;
    case "tiempo":
      return f.usos >= 5 ? f.tiempoMedianoMs : 0;
    case "tasa":
      return f.visitantes >= 30 ? f.tasaUso : 0;
    case "interes":
      return f.interesCompra;
  }
}

function textoMetrica(orden: Orden, f: FilaPagina): string {
  switch (orden) {
    case "usos":
      return numero(f.usos);
    case "tiempo":
      return f.usos > 0 ? duracion(f.tiempoMedianoMs) : "—";
    case "tasa":
      return deCada100(f.tasaUso);
    case "interes":
      return numero(f.interesCompra);
  }
}

function secundario(orden: Orden, f: FilaPagina): string {
  const partes = [
    orden !== "usos" ? plural(f.usos, "uso", "usos") : null,
    orden !== "tasa" ? `la usan ${deCada100(f.tasaUso)}` : `de ${numero(f.visitantes)} que entraron`,
    orden === "usos" && f.usos > 0 ? duracion(f.tiempoMedianoMs) : null,
    orden === "interes" ? null : f.interesCompra > 0 ? `${numero(f.interesCompra)} quisieron comprar` : null,
  ].filter(Boolean);
  return partes.slice(0, 3).join(" · ");
}

export function Calculadoras({
  datos,
  rango,
  ancho,
  abierta,
  ultimaAbierta,
  onAbrir,
  onCerrar,
}: {
  datos: PanelDatos;
  rango: Rango;
  ancho: boolean;
  abierta: string | null;
  ultimaAbierta: string | null;
  onAbrir: (path: string) => void;
  onCerrar: () => void;
}) {
  const [orden, setOrden] = useState<Orden>("usos");
  const [busqueda, setBusqueda] = useState("");
  const [todas, setTodas] = useState(false);
  const diferida = useDeferredValue(busqueda);
  const idBusqueda = useId();

  const filas = useMemo(() => {
    const q = normalizar(diferida.trim());
    const filtradas = q
      ? datos.paginas.filter((p) => normalizar(`${p.titulo} ${p.path}`).includes(q))
      : datos.paginas;
    return [...filtradas].sort((a, b) => metrica(orden, b) - metrica(orden, a) || b.usos - a.usos);
  }, [datos.paginas, diferida, orden]);

  const tope = Math.max(1e-9, ...filas.map((f) => metrica(orden, f)));
  const mostradas = todas || diferida.trim() ? filas : filas.slice(0, VISIBLES);

  return (
    <Seccion
      id="calculadoras"
      indice={4}
      titulo="Calculadoras"
      bajada="Cuáles usan, cuánto tiempo y desde cuáles quieren comprar. Tocá una para ver su detalle."
    >
      <Bandeja>
        <div className={`${TARJETA} p-3 sm:p-4`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label htmlFor={idBusqueda} className="relative block lg:w-72">
              <span className="sr-only">Buscar una calculadora</span>
              <IcoLupa className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                id={idBusqueda}
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre"
                autoComplete="off"
                className="h-11 w-full rounded-full bg-zinc-50 pl-10 pr-4 text-[16px] text-zinc-900 ring-1 ring-inset ring-zinc-900/[0.08] transition-[background-color,box-shadow] placeholder:text-zinc-500 focus:bg-white sm:text-sm"
              />
            </label>
            <div role="group" aria-label="Ordenar por" className="-mx-1 flex flex-wrap gap-1.5 px-1">
              {ORDENES.map((o) => (
                <button
                  key={o.clave}
                  type="button"
                  aria-pressed={orden === o.clave}
                  title={o.ayuda}
                  onClick={() => setOrden(o.clave)}
                  className={`h-9 rounded-full px-3.5 text-sm font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.96] ${
                    orden === o.clave
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-900"
                  }`}
                >
                  {o.texto}
                </button>
              ))}
            </div>
          </div>

          {mostradas.length === 0 ? (
            <Vacio>
              {datos.paginas.length ? "No hay ninguna calculadora que se llame así." : "Todavía no hay usos medidos."}
            </Vacio>
          ) : (
            <ol className="mt-3 divide-y divide-zinc-100">
              {mostradas.map((f, i) => {
                const expandida = ancho && abierta === f.path;
                const idDetalle = `detalle-${i}-${f.path.replace(/[^a-z0-9]/gi, "")}`;
                const pct = Math.max(0, Math.min(100, (metrica(orden, f) / tope) * 100));
                return (
                  <li key={f.path}>
                    <button
                      type="button"
                      aria-expanded={ancho ? expandida : undefined}
                      aria-controls={ancho ? idDetalle : undefined}
                      aria-haspopup={ancho ? undefined : "dialog"}
                      onClick={() => (expandida ? onCerrar() : onAbrir(f.path))}
                      className="group flex w-full items-start gap-3 rounded-2xl px-2 py-3 text-left transition-[background-color,transform] duration-200 ease-fluid hover:bg-zinc-50 active:scale-[0.995] sm:px-3"
                    >
                      <span className="w-6 shrink-0 pt-0.5 text-right text-xs font-medium tabular-nums text-zinc-500">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="min-w-0 text-[15px] font-medium text-zinc-900">{f.titulo}</span>
                          <span className="shrink-0 text-sm font-semibold tabular-nums text-zinc-900">
                            {textoMetrica(orden, f)}
                          </span>
                        </span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-600">
                          <span>{secundario(orden, f)}</span>
                          {f.producto ? (
                            <Chip tono="esmeralda" className="ml-0.5">
                              Vende {tituloDeProducto(datos, f.producto)}
                            </Chip>
                          ) : null}
                        </span>
                        <span className="mt-2 block h-1.5 rounded-full bg-zinc-100" aria-hidden>
                          <span
                            className="panel-barra block h-full rounded-full bg-emerald-500"
                            style={{ clipPath: `inset(0 ${100 - (pct > 0 ? Math.max(1.5, pct) : 0)}% 0 0 round 999px)` }}
                          />
                        </span>
                      </span>
                      <IcoChevron
                        className={`mt-0.5 size-4 shrink-0 text-zinc-400 transition-transform duration-300 ease-fluid ${
                          expandida ? "rotate-180" : "-rotate-90 md:rotate-0"
                        }`}
                      />
                    </button>
                    {ancho ? (
                      <Desplegable abierto={expandida} id={idDetalle}>
                        {expandida || ultimaAbierta === f.path ? (
                          <div className="pb-3">
                            <div className="rounded-2xl ring-1 ring-inset ring-zinc-900/[0.06]">
                              <DetallePagina fila={f} datos={datos} rango={rango} onCerrar={onCerrar} />
                            </div>
                          </div>
                        ) : null}
                      </Desplegable>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          )}

          {!diferida.trim() && filas.length > VISIBLES ? (
            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setTodas((t) => !t)}
                className="h-10 rounded-full px-4 text-sm font-medium text-zinc-700 transition-[background-color,transform] duration-200 hover:bg-zinc-100 active:scale-[0.97]"
              >
                {todas ? "Mostrar menos" : `Ver las ${numero(filas.length)} calculadoras`}
              </button>
            </div>
          ) : null}
        </div>
      </Bandeja>
    </Seccion>
  );
}
