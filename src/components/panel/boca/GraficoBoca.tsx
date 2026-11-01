"use client";

import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { BocaDatos } from "@/lib/panel/tipos";
import { etiquetaEje, etiquetaPunto, numero } from "@/lib/panel/formato";

type Punto = BocaDatos["serie"][number];

function escala(max: number) {
  if (max <= 0) return { tope: 1, marcas: [0] };
  const bruto = max / 3;
  const pot = 10 ** Math.floor(Math.log10(bruto));
  const paso = Math.max(1, [1, 2, 2.5, 5, 10].map((m) => m * pot).find((p) => p >= bruto) ?? 10 * pot);
  const marcas: number[] = [];
  for (let v = 0; v < max + paso * 0.001; v += paso) marcas.push(v);
  if (marcas[marcas.length - 1] < max) marcas.push(marcas[marcas.length - 1] + paso);
  return { tope: marcas[marcas.length - 1], marcas };
}

function indicesEje(n: number, cuantos: number): number[] {
  if (n <= cuantos) return Array.from({ length: n }, (_, i) => i);
  return [...new Set(Array.from({ length: cuantos }, (_, k) => Math.round((k * (n - 1)) / (cuantos - 1))))];
}

// Compartidos en columnas y llegadas en línea, sobre el mismo eje: las dos son cuentas de cosas y se
// leen juntas («compartí el martes, llegaron el miércoles»). Colores validados con el script de dataviz
// (emerald-600 / indigo-500: ΔE 28 normal, 23,6 deutan).
export function GraficoBoca({ serie, granularidad, alto = 210 }: { serie: Punto[]; granularidad: "hora" | "dia"; alto?: number }) {
  const caja = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(0);
  const [idx, setIdx] = useState<number | null>(null);
  const [tabla, setTabla] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const idTabla = useId();

  useLayoutEffect(() => {
    const el = caja.current;
    if (!el) return;
    setAncho(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setAncho(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = serie.length;
  const max = Math.max(0, ...serie.map((p) => Math.max(p.compartidos, p.llegadas)));
  const { tope, marcas } = escala(max);
  const izq = Math.max(26, String(numero(tope)).length * 6.6 + 12);
  const der = 10;
  const arr = 12;
  const abj = 26;
  const w = Math.max(0, ancho - izq - der);
  const h = alto - arr - abj;
  const banda = n ? w / n : w;
  const anchoCol = Math.max(2, Math.min(18, banda * 0.56));
  const x = (i: number) => izq + (i + 0.5) * banda;
  const y = (v: number) => arr + h - (v / tope) * h;
  const base = arr + h;
  const columna = (i: number) => {
    const cx = x(i);
    const x0 = cx - anchoCol / 2;
    const x1 = cx + anchoCol / 2;
    const top = y(serie[i].compartidos);
    const r = Math.min(4, (base - top) / 2, anchoCol / 2);
    return `M${x0},${base}V${top + r}Q${x0},${top} ${x0 + r},${top}H${x1 - r}Q${x1},${top} ${x1},${top + r}V${base}Z`;
  };
  const linea = serie.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.llegadas).toFixed(1)}`).join("");
  const ejeX = indicesEje(n, ancho < 480 ? 4 : 7);
  const etiqueta = (i: number) => etiquetaPunto(serie[i].t, granularidad);
  const resumir = (p: Punto) =>
    `${numero(p.compartidos)} ${p.compartidos === 1 ? "compartido" : "compartidos"}, ${numero(p.llegadas)} ${p.llegadas === 1 ? "llegada" : "llegadas"}`;

  const elegir = (i: number | null, anunciar = false) => {
    setIdx(i);
    if (anunciar && i !== null) setAnuncio(`${etiqueta(i)}: ${resumir(serie[i])}`);
  };
  const desdePuntero = (e: PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (n <= 1 || r.width === 0) return 0;
    return Math.min(n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * n)));
  };
  const teclas = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!n) return;
    const actual = idx ?? n - 1;
    const destino = e.key === "ArrowLeft" ? actual - 1 : e.key === "ArrowRight" ? actual + 1 : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (destino === null) return;
    e.preventDefault();
    elegir(Math.min(n - 1, Math.max(0, destino)), true);
  };

  const p = idx !== null ? serie[idx] : null;
  const px = idx !== null ? x(idx) : 0;
  const alineacion = px < 100 ? "0%" : px > ancho - 100 ? "-100%" : "-50%";
  const totalC = serie.reduce((a, s) => a + s.compartidos, 0);
  const totalL = serie.reduce((a, s) => a + s.llegadas, 0);

  return (
    <figure className="m-0">
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-700">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-[3px] bg-emerald-600" />
          Compartidos
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="relative h-0.5 w-4 rounded-full bg-indigo-500">
            <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 ring-2 ring-white" />
          </span>
          Llegadas por esos links
        </span>
      </div>
      <div
        ref={caja}
        tabIndex={0}
        role="group"
        aria-label={`Compartidos y llegadas por ${granularidad === "hora" ? "hora" : "día"}: ${numero(totalC)} compartidos y ${numero(totalL)} llegadas en el período. Usá las flechas para recorrer.`}
        onKeyDown={teclas}
        onFocus={(e) => {
          if (idx === null && n && e.currentTarget.matches(":focus-visible")) elegir(n - 1, true);
        }}
        onBlur={() => elegir(null)}
        className="relative rounded-2xl"
        style={{ height: alto }}
      >
        {ancho > 0 && n > 0 ? (
          <svg width={ancho} height={alto} className="block select-none overflow-visible" aria-hidden>
            {marcas.map((m, i) => (
              <g key={m}>
                <line x1={izq} x2={ancho - der} y1={y(m)} y2={y(m)} className={i === 0 ? "stroke-zinc-300" : "stroke-zinc-200/80"} strokeWidth={1} shapeRendering="crispEdges" />
                <text x={izq - 8} y={y(m)} dy="0.32em" textAnchor="end" className="fill-zinc-500 text-[11px] tabular-nums">
                  {numero(m)}
                </text>
              </g>
            ))}
            {ejeX.map((i) => (
              <text key={i} x={x(i)} y={alto - 6} textAnchor="middle" className="fill-zinc-500 text-[11px]">
                {etiquetaEje(serie[i].t, granularidad)}
              </text>
            ))}
            {idx !== null ? <rect x={px - banda / 2} y={arr} width={banda} height={h} rx={6} className="fill-zinc-900/[0.04]" /> : null}
            {serie.map((s, i) =>
              s.compartidos > 0 ? (
                <path key={s.t} d={columna(i)} className={`transition-[fill] duration-150 ${idx === i ? "fill-emerald-700" : "fill-emerald-600"}`} />
              ) : null,
            )}
            <path d={linea} fill="none" className="stroke-indigo-500" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {serie.map((s, i) =>
              s.llegadas > 0 && (n <= 31 || idx === i) ? (
                <circle key={s.t} cx={x(i)} cy={y(s.llegadas)} r={idx === i ? 4.5 : 3} className="fill-indigo-500 stroke-white" strokeWidth={2} />
              ) : null,
            )}
            <rect
              x={izq}
              y={0}
              width={w}
              height={alto}
              fill="transparent"
              style={{ touchAction: "pan-y", cursor: "crosshair" }}
              onPointerDown={(e) => elegir(desdePuntero(e))}
              onPointerMove={(e) => elegir(desdePuntero(e))}
              onPointerLeave={(e) => e.pointerType === "mouse" && elegir(null)}
            />
          </svg>
        ) : null}
        {max === 0 && ancho > 0 ? (
          <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm text-zinc-500">Nadie compartió en este período</p>
        ) : null}
        {p ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-xl bg-zinc-900 px-3 py-2 text-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.45)]"
            style={{ transform: `translate(${px}px, 4px) translateX(${alineacion})` }}
          >
            <p className="text-xs text-zinc-300">{etiqueta(idx ?? 0)}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm tabular-nums">
              <span className="size-2 rounded-[2px] bg-emerald-400" />
              {numero(p.compartidos)} compartidos
            </p>
            <p className="flex items-center gap-1.5 text-sm tabular-nums">
              <span className="size-2 rounded-full bg-indigo-300" />
              {numero(p.llegadas)} llegadas · {numero(p.nuevas)} nuevas
            </p>
          </div>
        ) : null}
        <p className="sr-only" aria-live="polite">
          {anuncio}
        </p>
      </div>
      <figcaption className="mt-2 flex justify-end">
        <button
          type="button"
          aria-expanded={tabla}
          aria-controls={idTabla}
          onClick={() => setTabla((t) => !t)}
          className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          {tabla ? "Ocultar los números" : "Ver los números"}
        </button>
      </figcaption>
      {tabla ? (
        <div id={idTabla} className="mt-2 max-h-64 overflow-auto rounded-xl ring-1 ring-inset ring-zinc-900/[0.06]">
          <table className="w-full text-sm">
            <caption className="sr-only">Compartidos y llegadas por {granularidad === "hora" ? "hora" : "día"}</caption>
            <thead className="sticky top-0 bg-zinc-50 text-left text-xs text-zinc-600">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">{granularidad === "hora" ? "Hora" : "Día"}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Compartidos</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Llegadas</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Nuevas</th>
              </tr>
            </thead>
            <tbody>
              {serie.map((s, i) => (
                <tr key={s.t} className="border-t border-zinc-100">
                  <td className="px-3 py-1.5 text-zinc-700">{etiqueta(i)}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-zinc-900">{numero(s.compartidos)}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-zinc-900">{numero(s.llegadas)}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-zinc-900">{numero(s.nuevas)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </figure>
  );
}
