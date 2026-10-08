"use client";

import { useEffect, useId, useRef, useState } from "react";
import { RANGOS, type PanelDatos, type Rango } from "@/lib/panel/tipos";
import { CONTRA, NOMBRE_RANGO, PERIODO, haceCuanto, numero } from "@/lib/panel/formato";
import { useAhora } from "./hooks";
import { IcoRefrescar } from "./iconos";
import { tituloDePagina } from "./meta";
import { SelectorPais, nombreMercado } from "./paises";

function titulo(datos: PanelDatos, mercado: string | null): string {
  if (mercado === "ar") return "Cómo viene calcular.ar";
  if (mercado === "global") return "Cómo viene el inicio de CalcularYa";
  if (mercado) return `Cómo viene CalcularYa en ${nombreMercado(mercado)}`;
  const hayIntl = (datos.mercados ?? []).some((m) => m.mercado !== "ar" && m.visitantes > 0);
  return hayIntl ? "Cómo vienen calcular.ar y CalcularYa" : "Cómo viene calcular.ar";
}

export function Encabezado({
  datos,
  rango,
  mercado,
  pendientes,
  cargando,
  demo,
  onRango,
  onMercado,
  onPrecargar,
  onActualizar,
}: {
  onPrecargar: (m: string | null) => void;
  datos: PanelDatos;
  rango: Rango;
  mercado: string | null;
  onMercado: (m: string | null) => void;
  pendientes: Partial<Record<Rango, boolean>>;
  cargando: boolean;
  demo: string | null;
  onRango: (r: Rango) => void;
  onActualizar: () => void;
}) {
  const ahora = useAhora(datos.generado);
  return (
    <header className="panel-aparece space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-900/[0.05] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">
              Panel privado
            </span>
            {demo ? (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-900">
                {demo === "vacio" ? "Demo sin datos" : "Datos de ejemplo"}
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-zinc-900 sm:text-4xl">
            {titulo(datos, mercado)}
          </h1>
          <p className="mt-1.5 text-[15px] text-zinc-600">
            Lo que pasó {PERIODO[rango]}
            {rango === "hoy" ? ", hasta ahora" : ""}.
          </p>
        </div>
        <EnVivo datos={datos} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <SelectorPais datos={datos} mercado={mercado} pendiente={cargando} onMercado={onMercado} onPrecargar={onPrecargar} />
          <SelectorRango rango={rango} pendientes={pendientes} onRango={onRango} />
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span className="tabular-nums">
            Actualizado {haceCuanto(datos.generado, ahora)}
          </span>
          <button
            type="button"
            onClick={onActualizar}
            disabled={cargando}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-white px-3.5 font-medium text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_14px_-6px_rgba(0,0,0,0.16)] ring-1 ring-zinc-900/[0.07] transition-[transform,box-shadow] duration-200 ease-fluid hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_20px_-8px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.97] disabled:cursor-progress"
          >
            <IcoRefrescar
              className={`size-4 text-zinc-500 ${cargando ? "animate-spin" : "transition-transform duration-500 ease-fluid group-hover:rotate-90"}`}
            />
            {cargando ? "Actualizando" : "Actualizar"}
          </button>
        </div>
      </div>
      <p className="sr-only">Las variaciones comparan contra {CONTRA[rango]}.</p>
    </header>
  );
}

function SelectorRango({
  rango,
  pendientes,
  onRango,
}: {
  rango: Rango;
  pendientes: Partial<Record<Rango, boolean>>;
  onRango: (r: Rango) => void;
}) {
  const i = RANGOS.indexOf(rango);
  return (
    <div
      role="group"
      aria-label="Período"
      className="relative grid w-full grid-cols-4 rounded-full bg-zinc-900/[0.05] p-1 ring-1 ring-inset ring-zinc-900/[0.06] sm:w-auto"
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.16)] transition-transform duration-300 ease-snappy"
        style={{ transform: `translateX(${i * 100}%)` }}
      />
      {RANGOS.map((r) => {
        const activo = r === rango;
        return (
          <button
            key={r}
            type="button"
            aria-pressed={activo}
            onClick={() => onRango(r)}
            className={`relative z-10 inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 text-sm sm:px-4 font-medium transition-[color,transform] duration-200 active:scale-[0.96] ${
              activo ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {NOMBRE_RANGO[r]}
            {activo && pendientes[r] ? (
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function EnVivo({ datos }: { datos: PanelDatos }) {
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const id = useId();
  const { ahora, paginas } = datos.vivo;
  const hay = ahora > 0;

  useEffect(() => {
    if (!abierto) return;
    const afuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("pointerdown", afuera);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", afuera);
      document.removeEventListener("keydown", esc);
    };
  }, [abierto]);

  const texto = hay ? `${numero(ahora)} ${ahora === 1 ? "persona" : "personas"} ahora` : "Nadie conectado ahora";

  return (
    <div ref={caja} className="relative">
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        disabled={!hay}
        onClick={() => setAbierto((a) => !a)}
        className="inline-flex h-10 items-center gap-2.5 rounded-full bg-white/80 pl-3 pr-4 text-sm font-medium text-zinc-800 ring-1 ring-zinc-900/[0.07] transition-[transform,background-color] duration-200 ease-fluid hover:bg-white active:scale-[0.97] disabled:cursor-default disabled:text-zinc-600"
      >
        <span className={`relative inline-flex size-2 rounded-full ${hay ? "panel-latido bg-emerald-500 text-emerald-500" : "bg-zinc-300"}`} aria-hidden />
        <span className="tabular-nums">{texto}</span>
      </button>
      {abierto && hay ? (
        <div
          id={id}
          className="panel-entra absolute right-0 top-12 z-20 w-64 origin-top-right rounded-2xl bg-white p-2 shadow-[0_2px_6px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.22)] ring-1 ring-zinc-900/[0.07]"
        >
          <p className="px-2 pb-1.5 pt-1 text-xs font-medium text-zinc-600">Dónde están ahora</p>
          <ul>
            {paginas.map((p) => (
              <li key={p.clave} className="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-sm">
                <span className="min-w-0 truncate text-zinc-800">{tituloDePagina(datos, p.clave)}</span>
                <span className="shrink-0 tabular-nums text-zinc-600">{numero(p.n)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
