"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Bandera } from "@/motor/ui/Bandera";
import { MERCADO_AR, MERCADO_GLOBAL, MERCADOS_INTL, mercadoMedido } from "@/lib/medicion/mercados";
import { importe, numero } from "@/lib/panel/formato";
import type { FilaMercado, Importe, PanelDatos } from "@/lib/panel/tipos";
import { Bandeja, Seccion, TARJETA, Vacio } from "./ui";

export type OpcionPais = { codigo: string | null; nombre: string; pais: string | null; visitantes: number | null };

const alfabetico = new Intl.Collator("es");

export function nombreMercado(codigo: string | null): string {
  if (!codigo) return "Todos los países";
  return mercadoMedido(codigo)?.nombre ?? codigo.toUpperCase();
}

// Todos y Argentina siempre arriba; los de calcularya, primero los que tuvieron visitas (de más a
// menos) y después el resto por nombre. Sin la migración de mercado no hay otra opción que mostrar.
export function opcionesDePais(datos: PanelDatos): OpcionPais[] {
  const visitas = new Map((datos.mercados ?? []).map((m) => [m.mercado, m.visitantes]));
  const base: OpcionPais[] = [
    { codigo: null, nombre: nombreMercado(null), pais: null, visitantes: null },
    { codigo: MERCADO_AR.codigo, nombre: MERCADO_AR.nombre, pais: MERCADO_AR.pais, visitantes: visitas.get("ar") ?? null },
  ];
  if (!datos.mercados) return base;
  const intl = MERCADOS_INTL.map((m) => ({ codigo: m.codigo, nombre: m.nombre, pais: m.pais, visitantes: visitas.get(m.codigo) ?? 0 }));
  intl.sort(
    (a, b) =>
      b.visitantes - a.visitantes ||
      Number(a.codigo === MERCADO_GLOBAL) - Number(b.codigo === MERCADO_GLOBAL) ||
      alfabetico.compare(a.nombre, b.nombre),
  );
  return [...base, ...intl];
}

function Marca({ pais, codigo }: { pais: string | null; codigo: string | null }) {
  if (pais) return <Bandera pais={pais} ancho={20} className="shrink-0 rounded-[3px] ring-1 ring-zinc-900/10" />;
  return (
    <span
      aria-hidden
      className={`inline-flex h-[13px] w-5 shrink-0 items-center justify-center rounded-[3px] text-[8px] font-semibold uppercase tracking-wide ring-1 ring-inset ${
        codigo ? "bg-emerald-50 text-emerald-800 ring-emerald-700/20" : "bg-zinc-100 text-zinc-600 ring-zinc-900/10"
      }`}
    >
      {codigo ? "CY" : "∑"}
    </span>
  );
}

export function SelectorPais({
  datos,
  mercado,
  pendiente,
  onMercado,
  onPrecargar,
}: {
  datos: PanelDatos;
  mercado: string | null;
  pendiente: boolean;
  onMercado: (m: string | null) => void;
  onPrecargar?: (m: string | null) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const opciones = opcionesDePais(datos);
  const actual = opciones.find((o) => o.codigo === mercado) ?? opciones[0];

  useEffect(() => {
    if (!abierto) return;
    lista.current?.querySelector<HTMLButtonElement>("[aria-current='true']")?.focus();
    const afuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
        return;
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const botones = [...(lista.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
      const i = botones.indexOf(document.activeElement as HTMLButtonElement);
      const sig = e.key === "ArrowDown" ? Math.min(botones.length - 1, i + 1) : Math.max(0, i - 1);
      botones[sig]?.focus();
    };
    document.addEventListener("pointerdown", afuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", afuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  const elegir = (codigo: string | null) => {
    setAbierto(false);
    boton.current?.focus();
    if (codigo !== mercado) onMercado(codigo);
  };

  return (
    <div ref={caja} className="relative w-full sm:w-auto">
      <button
        ref={boton}
        type="button"
        aria-haspopup="true"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((a) => !a)}
        className="inline-flex h-12 w-full items-center gap-2.5 rounded-full bg-white pl-4 pr-3.5 text-sm font-medium text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_14px_-6px_rgba(0,0,0,0.16)] ring-1 ring-zinc-900/[0.07] transition-[transform,box-shadow] duration-200 ease-fluid hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_20px_-8px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.98] sm:h-10 sm:w-auto"
      >
        <span className="sr-only">País: </span>
        <Marca pais={actual.pais} codigo={actual.codigo} />
        <span className="min-w-0 flex-1 truncate text-left">{actual.nombre}</span>
        {pendiente ? <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden /> : null}
        <svg
          className={`size-4 shrink-0 text-zinc-500 transition-transform duration-300 ease-snappy ${abierto ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m5.5 8 4.5 4.5L14.5 8" />
        </svg>
      </button>
      {abierto ? (
        <div
          id={id}
          className="panel-entra absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full origin-top-left rounded-2xl bg-white p-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.22)] ring-1 ring-zinc-900/[0.07] sm:w-72"
        >
          <ul ref={lista} aria-label="Elegí un país" className="max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain">
            {opciones.map((o, i) => {
              const activa = o.codigo === actual.codigo;
              return (
                <li key={o.codigo ?? "todos"} className={i === 2 ? "mt-1 border-t border-zinc-100 pt-1" : undefined}>
                  <button
                    type="button"
                    aria-current={activa}
                    onClick={() => elegir(o.codigo)}
                    onPointerEnter={() => onPrecargar?.(o.codigo)}
                    onFocus={() => onPrecargar?.(o.codigo)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm outline-none transition-colors duration-150 focus-visible:bg-zinc-100 ${
                      activa ? "bg-zinc-900/[0.05] font-medium text-zinc-900" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <Marca pais={o.pais} codigo={o.codigo} />
                    <span className="min-w-0 flex-1 truncate">{o.nombre}</span>
                    {o.visitantes !== null ? (
                      <span className={`shrink-0 text-xs tabular-nums ${o.visitantes ? "text-zinc-500" : "text-zinc-400"}`}>
                        {numero(o.visitantes)}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
          {!datos.mercados ? (
            <p className="px-2.5 pb-1.5 pt-2 text-xs leading-relaxed text-zinc-500">
              Los países de CalcularYa aparecen cuando se corra la migración de medición por país.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

type Columna = "visitantes" | "usos" | "ventas" | "ingresos";

const COLUMNAS: { clave: Columna; texto: string }[] = [
  { clave: "visitantes", texto: "Visitantes" },
  { clave: "usos", texto: "Usos" },
  { clave: "ventas", texto: "Ventas" },
  { clave: "ingresos", texto: "Ingresos" },
];

// Pesos primero y después el resto: dos monedas no se suman, así que se ordena por la de más peso.
function claveIngresos(ingresos: Importe[]): [number, number] {
  const ars = ingresos.find((i) => i.moneda === "ARS")?.monto ?? 0;
  const otras = ingresos.filter((i) => i.moneda !== "ARS").reduce((a, i) => a + i.monto, 0);
  return [ars, otras];
}

function comparar(a: FilaMercado, b: FilaMercado, col: Columna): number {
  if (col !== "ingresos") return a[col] - b[col];
  const [x1, x2] = claveIngresos(a.ingresos);
  const [y1, y2] = claveIngresos(b.ingresos);
  return x1 - y1 || x2 - y2;
}

export function PorPais({
  datos,
  mercado,
  onMercado,
  onPrecargar,
}: {
  datos: PanelDatos;
  mercado: string | null;
  onMercado: (m: string | null) => void;
  onPrecargar?: (m: string | null) => void;
}) {
  const [orden, setOrden] = useState<{ col: Columna; desc: boolean }>({ col: "visitantes", desc: true });
  const filas = [...(datos.mercados ?? [])].sort(
    (a, b) => (orden.desc ? -1 : 1) * comparar(a, b, orden.col) || alfabetico.compare(nombreMercado(a.mercado), nombreMercado(b.mercado)),
  );
  const totalVisitantes = filas.reduce((a, f) => a + f.visitantes, 0) || 1;

  const ordenar = (col: Columna) => setOrden((o) => (o.col === col ? { col, desc: !o.desc } : { col, desc: true }));

  return (
    <Seccion
      id="paises"
      indice={2}
      titulo="Por país"
      bajada="calcular.ar y cada país de CalcularYa, lado a lado. Tocá una fila para ver solo ese país."
    >
      <Bandeja>
        <div className={`${TARJETA} overflow-hidden`}>
          {filas.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 text-xs text-zinc-500">
                    <th scope="col" className="px-5 py-3 text-left font-medium">
                      País
                    </th>
                    {COLUMNAS.map((c) => {
                      const activa = orden.col === c.clave;
                      return (
                        <th
                          key={c.clave}
                          scope="col"
                          aria-sort={activa ? (orden.desc ? "descending" : "ascending") : "none"}
                          className="px-3 py-1.5 text-right font-medium last:pr-5"
                        >
                          <button
                            type="button"
                            onClick={() => ordenar(c.clave)}
                            className={`inline-flex h-9 items-center gap-1 rounded-full px-2 transition-colors duration-150 hover:text-zinc-900 ${
                              activa ? "text-zinc-900" : ""
                            }`}
                          >
                            {c.texto}
                            <svg
                              className={`size-3 transition-[transform,opacity] duration-200 ease-snappy ${activa ? "opacity-100" : "opacity-0"} ${
                                activa && !orden.desc ? "rotate-180" : ""
                              }`}
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M6 2.5v7M3 6.5l3 3 3-3" />
                            </svg>
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filas.map((f) => {
                    const m = mercadoMedido(f.mercado);
                    const elegida = f.mercado === mercado;
                    const pct = (f.visitantes / totalVisitantes) * 100;
                    return (
                      <tr key={f.mercado} className={`group transition-colors duration-150 ${elegida ? "bg-emerald-50/60" : "hover:bg-zinc-50"}`}>
                        <th scope="row" className="px-5 py-2.5 text-left font-normal">
                          <button
                            type="button"
                            onClick={() => onMercado(elegida ? null : f.mercado)}
                            onPointerEnter={() => onPrecargar?.(elegida ? null : f.mercado)}
                            onFocus={() => onPrecargar?.(elegida ? null : f.mercado)}
                            aria-pressed={elegida}
                            className="flex w-full items-center gap-2.5 text-left"
                          >
                            <Marca pais={m?.pais ?? null} codigo={f.mercado} />
                            <span className={`truncate ${elegida ? "font-medium text-zinc-900" : "text-zinc-800"}`}>{nombreMercado(f.mercado)}</span>
                          </button>
                        </th>
                        <td className="px-3 py-2.5 text-right tabular-nums text-zinc-900">
                          <span className="inline-flex items-center justify-end gap-2.5">
                            <span aria-hidden className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-zinc-100 sm:block">
                              <span className="block h-full rounded-full bg-emerald-500/80" style={{ width: `${Math.max(pct, f.visitantes ? 3 : 0)}%` }} />
                            </span>
                            {numero(f.visitantes)}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-zinc-700">{numero(f.usos)}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-zinc-700">{numero(f.ventas)}</td>
                        <td className="px-3 py-2.5 pr-5 text-right tabular-nums text-zinc-700">
                          {f.ingresos.length ? f.ingresos.map((i) => <span key={i.moneda} className="block">{importe(i.monto, i.moneda)}</span>) : <span className="text-zinc-400">0</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Vacio>Todavía no hay visitas medidas en este período.</Vacio>
          )}
        </div>
      </Bandeja>
    </Seccion>
  );
}
