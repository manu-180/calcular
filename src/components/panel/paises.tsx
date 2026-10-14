"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import { Bandera } from "@/motor/ui/Bandera";
import { MERCADO_AR, MERCADO_GLOBAL, MERCADOS_INTL, mercadoMedido, nombreDeMercado } from "@/lib/medicion/mercados";
import { deCada100, dolares, importe, numero, porcentaje } from "@/lib/panel/formato";
import type { EmbudoMercado, FilaMercado, PanelDatos } from "@/lib/panel/tipos";
import { IcoLupa } from "./iconos";
import { Bandeja, Seccion, TARJETA, Vacio } from "./ui";

export type OpcionPais = { codigo: string | null; nombre: string; pais: string | null; visitantes: number | null };

const alfabetico = new Intl.Collator("es");

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Un mercado que ya no está en el registro (o todavía no) igual puede tener datos: se nombra por su código.
function paisDe(codigo: string): string | null {
  return mercadoMedido(codigo)?.pais ?? (codigo === MERCADO_GLOBAL ? null : codigo.slice(0, 2).toUpperCase());
}

export function nombreMercado(codigo: string | null): string {
  if (!codigo) return "Todos los países";
  return mercadoMedido(codigo)?.nombre ?? nombreDeMercado(codigo, paisDe(codigo), codigo.split("-")[1]);
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
  const codigos = new Set<string>(MERCADOS_INTL.map((m) => m.codigo));
  for (const m of datos.mercados) if (m.mercado !== "ar") codigos.add(m.mercado);
  const intl = [...codigos].map((codigo) => ({ codigo, nombre: nombreMercado(codigo), pais: paisDe(codigo), visitantes: visitas.get(codigo) ?? 0 }));
  intl.sort(
    (a, b) =>
      b.visitantes - a.visitantes ||
      Number(a.codigo === MERCADO_GLOBAL) - Number(b.codigo === MERCADO_GLOBAL) ||
      alfabetico.compare(a.nombre, b.nombre),
  );
  return [...base, ...intl];
}

// La bandera tapa el código: los países sin dibujo (Bandera devuelve null) se ven igual, con su ISO.
function Marca({ pais, codigo }: { pais: string | null; codigo: string | null }) {
  if (pais) {
    return (
      <span aria-hidden className="relative inline-flex h-[13px] w-5 shrink-0">
        <span className="absolute inset-0 inline-flex items-center justify-center rounded-[3px] bg-zinc-100 text-[7px] font-semibold tracking-wide text-zinc-600 ring-1 ring-inset ring-zinc-900/10">
          {pais}
        </span>
        <Bandera pais={pais} ancho={20} className="absolute inset-0 rounded-[3px] ring-1 ring-zinc-900/10" />
      </span>
    );
  }
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

function Buscador({ id, valor, onCambio, etiqueta, className = "" }: { id: string; valor: string; onCambio: (v: string) => void; etiqueta: string; className?: string }) {
  return (
    <label htmlFor={id} className={`relative block ${className}`}>
      <span className="sr-only">{etiqueta}</span>
      <IcoLupa className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
      <input
        id={id}
        type="search"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
        placeholder="Buscar un país"
        autoComplete="off"
        className="h-11 w-full rounded-full bg-zinc-50 pl-10 pr-4 text-[16px] text-zinc-900 ring-1 ring-inset ring-zinc-900/[0.08] transition-[background-color,box-shadow] placeholder:text-zinc-500 focus:bg-white sm:h-10 sm:text-sm"
      />
    </label>
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
  const [busqueda, setBusqueda] = useState("");
  const caja = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const idBusqueda = useId();
  const opciones = opcionesDePais(datos);
  const actual = opciones.find((o) => o.codigo === mercado) ?? { codigo: mercado, nombre: nombreMercado(mercado), pais: mercado ? paisDe(mercado) : null, visitantes: null };
  const conBusqueda = opciones.length > 12;
  const q = normalizar(busqueda.trim());
  const visibles = q ? opciones.filter((o) => normalizar(`${o.nombre} ${o.codigo ?? ""}`).includes(q)) : opciones;

  useEffect(() => {
    if (!abierto) return;
    if (!conBusqueda) lista.current?.querySelector<HTMLButtonElement>("[aria-current='true']")?.focus();
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
  }, [abierto, conBusqueda]);

  const elegir = (codigo: string | null) => {
    setAbierto(false);
    setBusqueda("");
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
          {conBusqueda ? (
            <div className="p-1 pb-1.5">
              <Buscador id={idBusqueda} valor={busqueda} onCambio={setBusqueda} etiqueta="Buscar un país" />
            </div>
          ) : null}
          <ul ref={lista} aria-label="Elegí un país" className="max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain">
            {visibles.map((o, i) => {
              const activa = o.codigo === actual.codigo;
              return (
                <li key={o.codigo ?? "todos"} className={!q && i === 2 ? "mt-1 border-t border-zinc-100 pt-1" : undefined}>
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
            {visibles.length === 0 ? <li className="px-2.5 py-3 text-sm text-zinc-500">Ningún país se llama así.</li> : null}
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

type Columna = "visitantes" | "usos" | "conversion" | "ventas" | "ingresos";

const COLUMNAS: { clave: Columna; texto: string; soloAncho?: boolean }[] = [
  { clave: "visitantes", texto: "Visitas" },
  { clave: "usos", texto: "Usos", soloAncho: true },
  { clave: "conversion", texto: "Compran", soloAncho: true },
  { clave: "ventas", texto: "Ventas", soloAncho: true },
  { clave: "ingresos", texto: "Ingresos" },
];

const conversion = (f: FilaMercado) => (f.visitantes > 0 ? f.ventas / f.visitantes : 0);

function valor(f: FilaMercado, col: Columna): number {
  switch (col) {
    case "conversion":
      return conversion(f);
    case "ingresos":
      return f.ingresosUsd;
    default:
      return f[col];
  }
}

const PRIMERAS = 15;
const DE_A = 25;

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
  const [busqueda, setBusqueda] = useState("");
  const [cuantas, setCuantas] = useState(PRIMERAS);
  const diferida = useDeferredValue(busqueda);
  const idBusqueda = useId();

  const todas = useMemo(
    () =>
      [...(datos.mercados ?? [])].sort(
        (a, b) => (orden.desc ? -1 : 1) * (valor(a, orden.col) - valor(b, orden.col)) || alfabetico.compare(nombreMercado(a.mercado), nombreMercado(b.mercado)),
      ),
    [datos.mercados, orden],
  );
  const puesto = useMemo(() => new Map(todas.map((f, i) => [f.mercado, i + 1])), [todas]);
  const q = normalizar(diferida.trim());
  const filtradas = q ? todas.filter((f) => normalizar(`${nombreMercado(f.mercado)} ${f.mercado}`).includes(q)) : todas;
  const filas = q ? filtradas : filtradas.slice(0, cuantas);
  const tope = Math.max(1, ...todas.map((f) => f.visitantes));
  const conVisitas = todas.filter((f) => f.visitantes > 0).length;
  const totalUsd = todas.reduce((a, f) => a + f.ingresosUsd, 0);
  const elegida = mercado ? todas.find((f) => f.mercado === mercado) ?? null : null;

  const ordenar = (col: Columna) => {
    setOrden((o) => (o.col === col ? { col, desc: !o.desc } : { col, desc: true }));
    setCuantas(PRIMERAS);
  };

  return (
    <Seccion
      id="paises"
      indice={2}
      titulo="Por país"
      bajada={`${conVisitas === 1 ? "1 país con visitas" : `${numero(conVisitas)} países con visitas`}${
        totalUsd > 0 ? ` y ${dolares(totalUsd)} en ventas` : ""
      }. Tocá uno para ver su embudo y sus calculadoras. Cada persona cuenta una vez por día.`}
    >
      <Bandeja>
        <div className={`${TARJETA} overflow-hidden`}>
          <div className={`flex items-center gap-2 border-b border-zinc-100 p-3 sm:px-5 ${todas.length > 8 ? "" : "sm:hidden"}`}>
            {todas.length > 8 ? (
              <Buscador id={idBusqueda} valor={busqueda} onCambio={setBusqueda} etiqueta="Buscar un país en el ranking" className="min-w-0 flex-1 sm:w-72 sm:flex-none" />
            ) : null}
            <label className="shrink-0 sm:hidden">
              <span className="sr-only">Ordenar por</span>
              <select
                value={orden.col}
                onChange={(e) => {
                  setOrden({ col: e.target.value as Columna, desc: true });
                  setCuantas(PRIMERAS);
                }}
                className="h-11 rounded-full bg-zinc-50 px-3 text-[16px] text-zinc-800 ring-1 ring-inset ring-zinc-900/[0.08]"
              >
                {COLUMNAS.map((c) => (
                  <option key={c.clave} value={c.clave}>
                    {c.texto}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {filas.length ? (
            <table className="w-full table-fixed text-[13px] sm:text-sm">
              <colgroup>
                <col />
                <col className="w-[4.25rem] sm:w-28" />
                <col className="hidden sm:table-column sm:w-20" />
                <col className="hidden sm:table-column sm:w-24" />
                <col className="hidden sm:table-column sm:w-20" />
                <col className="w-[5.25rem] sm:w-32" />
              </colgroup>
              <thead>
                <tr className="border-b border-zinc-100 text-xs text-zinc-500">
                  <th scope="col" className="py-3 pl-3 pr-1 text-left font-medium sm:pl-5">
                    País
                  </th>
                  {COLUMNAS.map((c) => {
                    const activa = orden.col === c.clave;
                    return (
                      <th
                        key={c.clave}
                        scope="col"
                        aria-sort={activa ? (orden.desc ? "descending" : "ascending") : "none"}
                        className={`px-0.5 py-1.5 text-right font-medium last:pr-2 sm:px-2 sm:last:pr-4 ${c.soloAncho ? "hidden sm:table-cell" : ""}`}
                      >
                        <button
                          type="button"
                          onClick={() => ordenar(c.clave)}
                          className={`inline-flex h-9 items-center gap-0.5 rounded-full px-1.5 transition-colors duration-150 hover:text-zinc-900 sm:gap-1 sm:px-2 ${
                            activa ? "text-zinc-900" : ""
                          }`}
                        >
                          {c.texto}
                          <svg
                            className={`size-3 shrink-0 transition-[transform,opacity] duration-200 ease-snappy ${activa ? "opacity-100" : "opacity-0"} ${
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
                  const esta = f.mercado === mercado;
                  // Sólo se filtra por mercados del registro: el panel no acepta otro código como filtro.
                  const elegible = f.mercado === MERCADO_AR.codigo || !!mercadoMedido(f.mercado);
                  const pct = (f.visitantes / tope) * 100;
                  const otras = f.ingresos.filter((i) => i.moneda !== "USD");
                  return (
                    <tr key={f.mercado} className={`transition-colors duration-150 ${esta ? "bg-emerald-50/60" : "hover:bg-zinc-50"}`}>
                      <th scope="row" className="py-2.5 pl-3 pr-1 text-left font-normal sm:pl-5">
                        <button
                          type="button"
                          disabled={!elegible}
                          onClick={() => onMercado(esta ? null : f.mercado)}
                          onPointerEnter={() => elegible && onPrecargar?.(esta ? null : f.mercado)}
                          onFocus={() => elegible && onPrecargar?.(esta ? null : f.mercado)}
                          aria-pressed={esta}
                          className="flex w-full min-w-0 items-center gap-2 text-left disabled:cursor-default sm:gap-2.5"
                        >
                          <span className="hidden w-5 shrink-0 text-right text-[11px] tabular-nums text-zinc-400 sm:inline">{puesto.get(f.mercado)}</span>
                          <Marca pais={paisDe(f.mercado)} codigo={f.mercado} />
                          <span className="min-w-0">
                            <span className={`block truncate ${esta ? "font-medium text-zinc-900" : "text-zinc-800"}`}>{nombreMercado(f.mercado)}</span>
                            {f.ventas > 0 ? (
                              <span className="block truncate text-[11px] text-zinc-500 sm:hidden">
                                {f.ventas === 1 ? "1 venta" : `${numero(f.ventas)} ventas`}, compran {porcentaje(conversion(f), conversion(f) < 0.01 ? 2 : 1)}
                              </span>
                            ) : null}
                          </span>
                        </button>
                      </th>
                      <td className="px-0.5 py-2.5 text-right tabular-nums text-zinc-900 sm:px-2">
                        <span className="inline-flex items-center justify-end gap-2.5">
                          <span aria-hidden className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-zinc-100 lg:block">
                            <span className="block h-full rounded-full bg-emerald-500/80" style={{ width: `${Math.max(pct, f.visitantes ? 3 : 0)}%` }} />
                          </span>
                          {numero(f.visitantes)}
                        </span>
                      </td>
                      <td className="hidden px-2 py-2.5 text-right tabular-nums text-zinc-700 sm:table-cell">{numero(f.usos)}</td>
                      <td className="hidden px-2 py-2.5 text-right tabular-nums text-zinc-700 sm:table-cell">
                        {f.ventas > 0 ? porcentaje(conversion(f), conversion(f) < 0.01 ? 2 : 1) : <span className="text-zinc-400">0</span>}
                      </td>
                      <td className="hidden px-2 py-2.5 text-right tabular-nums text-zinc-700 sm:table-cell">{numero(f.ventas)}</td>
                      <td className="py-2.5 pl-0.5 pr-3 text-right tabular-nums text-zinc-700 sm:pl-2 sm:pr-5">
                        {f.ingresosUsd > 0 || otras.length ? (
                          <>
                            <span className="block text-zinc-900">{dolares(f.ingresosUsd)}</span>
                            {otras.map((i) => (
                              <span key={i.moneda} className="block text-[11px] text-zinc-500">
                                {importe(i.monto, i.moneda)}
                              </span>
                            ))}
                          </>
                        ) : (
                          <span className="text-zinc-400">0</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Vacio>{todas.length ? "Ningún país se llama así." : "Todavía no hay visitas medidas en este período."}</Vacio>
          )}
          {!q && filtradas.length > filas.length ? (
            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 px-3 py-2 sm:px-5">
              <span className="text-xs text-zinc-500">
                {numero(filas.length)} de {numero(filtradas.length)}
              </span>
              <button
                type="button"
                onClick={() => setCuantas((n) => n + DE_A)}
                className="h-10 rounded-full px-4 text-sm font-medium text-zinc-700 transition-[background-color,transform] duration-200 hover:bg-zinc-100 active:scale-[0.97]"
              >
                Ver {numero(Math.min(DE_A, filtradas.length - filas.length))} más
              </button>
            </div>
          ) : !q && cuantas > PRIMERAS ? (
            <div className="flex justify-center border-t border-zinc-100 px-3 py-2">
              <button
                type="button"
                onClick={() => setCuantas(PRIMERAS)}
                className="h-10 rounded-full px-4 text-sm font-medium text-zinc-700 transition-[background-color,transform] duration-200 hover:bg-zinc-100 active:scale-[0.97]"
              >
                Mostrar menos
              </button>
            </div>
          ) : null}
        </div>
        <EmbudoPais datos={datos} mercado={mercado} fila={elegida} todas={todas} />
      </Bandeja>
    </Seccion>
  );
}

const PASOS: { clave: keyof EmbudoMercado; texto: string }[] = [
  { clave: "visitas", texto: "Entraron" },
  { clave: "usaron", texto: "Usaron una calculadora" },
  { clave: "ofertas", texto: "Vieron la oferta" },
  { clave: "clics", texto: "Tocaron comprar" },
  { clave: "checkouts", texto: "Fueron a pagar" },
  { clave: "ventas", texto: "Compraron" },
];

function sumar(filas: FilaMercado[]): EmbudoMercado | null {
  if (!filas.length || filas.some((f) => !f.embudo)) return null;
  const total: EmbudoMercado = { visitas: 0, usaron: 0, ofertas: 0, clics: 0, checkouts: 0, ventas: 0 };
  for (const f of filas) for (const p of PASOS) total[p.clave] += f.embudo![p.clave];
  return total;
}

function EmbudoPais({ datos, mercado, fila, todas }: { datos: PanelDatos; mercado: string | null; fila: FilaMercado | null; todas: FilaMercado[] }) {
  if (!todas.length) return null;
  const embudo = mercado ? (fila?.embudo ?? null) : sumar(todas);
  const nombre = nombreMercado(mercado);
  const delPais = datos.mercado === mercado;
  const valores = embudo ? PASOS.map((p) => embudo[p.clave]) : [];
  const tope = Math.max(1, ...valores);

  return (
    <div className="mt-1.5 grid gap-1.5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className={`${TARJETA} p-5`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-zinc-900">Embudo de {mercado ? nombre : "todos los países"}</h3>
            <p className="mt-0.5 text-sm text-zinc-600">
              {fila && fila.ingresosUsd > 0
                ? `${dolares(fila.ingresosUsd)} en ${fila.ventas === 1 ? "1 venta" : `${numero(fila.ventas)} ventas`}`
                : mercado && fila
                  ? "Sin ventas en este período"
                  : "Del primer clic a la venta"}
            </p>
          </div>
        </div>
        {embudo ? (
          <ol className="mt-4">
            {PASOS.map((p, i) => {
              const n = valores[i];
              const tasa = i > 0 && valores[i - 1] > 0 ? n / valores[i - 1] : null;
              return (
                <li key={p.clave}>
                  {i > 0 ? (
                    <p className="flex items-center gap-2 py-1 pl-0.5 text-xs text-zinc-600">
                      <span aria-hidden className="text-zinc-400">
                        ↓
                      </span>
                      {tasa === null ? "sin datos" : tasa === 0 ? "no pasó nadie" : `pasan ${deCada100(Math.min(1, tasa))}`}
                    </p>
                  ) : null}
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-zinc-800">{p.texto}</span>
                    <span className="font-semibold tabular-nums text-zinc-900">{numero(n)}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-zinc-100" aria-hidden>
                    <div
                      className={`panel-barra h-full rounded-full ${i === PASOS.length - 1 ? "bg-emerald-700" : "bg-emerald-500"}`}
                      style={{ clipPath: `inset(0 ${n > 0 ? 100 - Math.max(1.5, (n / tope) * 100) : 100}% 0 0 round 999px)` }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            {mercado && !fila
              ? `${nombre} no tuvo visitas en este período.`
              : "El embudo por país aparece cuando se corra la migración de métricas del mundo."}
          </p>
        )}
        {embudo ? <p className="mt-4 text-xs leading-relaxed text-zinc-500">Cada persona cuenta una vez por día. Los pagos son ventas aprobadas.</p> : null}
      </div>
      <div className={`${TARJETA} p-5`}>
        <h3 className="text-[15px] font-semibold text-zinc-900">Desde dónde entran</h3>
        <p className="mt-0.5 text-sm text-zinc-600">
          {mercado && mercado !== "ar" ? `El país real de quienes leen ${nombre}` : "El país real de quienes entran"}
        </p>
        {delPais ? (
          <ListaPaises filas={datos.paises} vacio="Sin visitas medidas." />
        ) : (
          <p className="mt-4 text-sm text-zinc-500">Cargando…</p>
        )}
        {delPais && datos.paisesCompra && datos.paisesCompra.length ? (
          <>
            <h4 className="mt-5 text-sm font-semibold text-zinc-900">Desde dónde compran</h4>
            <ListaPaises filas={datos.paisesCompra} vacio="" />
          </>
        ) : null}
      </div>
    </div>
  );
}

function ListaPaises({ filas, vacio }: { filas: { clave: string; n: number }[]; vacio: string }) {
  const total = filas.reduce((a, f) => a + f.n, 0) || 1;
  if (!filas.length) return vacio ? <p className="mt-4 text-sm text-zinc-500">{vacio}</p> : null;
  return (
    <ul className="mt-3 space-y-2">
      {filas.slice(0, 6).map((f) => {
        const conocido = /^[A-Z]{2}$/.test(f.clave);
        return (
          <li key={f.clave} className="flex items-center gap-2.5 text-sm">
            {conocido ? <Marca pais={f.clave} codigo={f.clave} /> : <span className="w-5 shrink-0" aria-hidden />}
            <span className="min-w-0 flex-1 truncate text-zinc-800">{conocido ? nombreDeMercado(f.clave.toLowerCase(), f.clave) : "Sin dato"}</span>
            <span className="shrink-0 tabular-nums text-zinc-600">{porcentaje(f.n / total, 0)}</span>
          </li>
        );
      })}
    </ul>
  );
}
