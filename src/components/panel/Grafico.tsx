"use client";

import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { Punto } from "@/lib/panel/tipos";
import { etiquetaEje, etiquetaPunto } from "@/lib/panel/formato";

type Props = {
  puntos: Punto[];
  granularidad: "hora" | "dia";
  formatoEje: (n: number) => string;
  formatoValor: (n: number) => string;
  titulo: string;
  resumen: string;
  parcial?: boolean;
  forma?: "linea" | "columnas";
  alto?: number;
};

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
  const out = Array.from({ length: cuantos }, (_, k) => Math.round((k * (n - 1)) / (cuantos - 1)));
  return [...new Set(out)];
}

export function Grafico({
  puntos,
  granularidad,
  formatoEje,
  formatoValor,
  titulo,
  resumen,
  parcial = false,
  forma = "linea",
  alto = 220,
}: Props) {
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

  const n = puntos.length;
  const max = Math.max(0, ...puntos.map((p) => p.v));
  const { tope, marcas } = escala(max);
  const textosY = marcas.map(formatoEje);
  const izq = Math.max(28, Math.max(...textosY.map((t) => t.length)) * 6.4 + 10);
  const der = 14;
  const arr = 10;
  const abj = 26;
  const w = Math.max(0, ancho - izq - der);
  const h = alto - arr - abj;
  const columnas = forma === "columnas";
  const banda = n ? w / n : w;
  const anchoColumna = Math.max(2, Math.min(24, banda * 0.62));
  const x = (i: number) =>
    columnas ? izq + (i + 0.5) * banda : izq + (n <= 1 ? w / 2 : (i * w) / (n - 1));
  const base = arr + h;
  const columna = (i: number) => {
    const cx = x(i);
    const x0 = cx - anchoColumna / 2;
    const x1 = cx + anchoColumna / 2;
    const top = y(puntos[i].v);
    const r = Math.min(4, (base - top) / 2, anchoColumna / 2);
    return `M${x0},${base}V${top + r}Q${x0},${top} ${x0 + r},${top}H${x1 - r}Q${x1},${top} ${x1},${top + r}V${base}Z`;
  };
  const y = (v: number) => arr + h - (v / tope) * h;
  const tramo = (desde: number, hasta: number) =>
    puntos
      .slice(desde, hasta + 1)
      .map((p, k) => `${k ? "L" : "M"}${x(desde + k).toFixed(1)},${y(p.v).toFixed(1)}`)
      .join("");
  const cortado = parcial && n > 1;
  const linea = tramo(0, cortado ? n - 2 : n - 1);
  const lineaParcial = cortado ? tramo(n - 2, n - 1) : "";
  const area = n ? `${tramo(0, n - 1)}L${x(n - 1).toFixed(1)},${arr + h}L${x(0).toFixed(1)},${arr + h}Z` : "";
  const etiqueta = (i: number) =>
    `${etiquetaPunto(puntos[i].t, granularidad)}${cortado && i === n - 1 ? " (hasta ahora)" : ""}`;
  const ejeX = indicesEje(n, ancho < 480 ? 4 : 7);

  const elegir = (i: number | null, anunciar = false) => {
    setIdx(i);
    if (anunciar && i !== null) setAnuncio(`${formatoValor(puntos[i].v)}, ${etiqueta(i)}`);
  };

  const indiceDesdePuntero = (e: PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (n <= 1 || r.width === 0) return 0;
    const f = (e.clientX - r.left - 6) / Math.max(1, r.width - 12);
    const i = columnas ? Math.floor(f * n) : Math.round(f * (n - 1));
    return Math.min(n - 1, Math.max(0, i));
  };

  const teclas = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!n) return;
    const actual = idx ?? n - 1;
    const destino =
      e.key === "ArrowLeft"
        ? actual - 1
        : e.key === "ArrowRight"
          ? actual + 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (destino === null) return;
    e.preventDefault();
    elegir(Math.min(n - 1, Math.max(0, destino)), true);
  };

  const punto = idx !== null ? puntos[idx] : null;
  const px = idx !== null ? x(idx) : 0;
  const py = punto ? y(punto.v) : 0;
  const alineacion = px < 90 ? "0%" : px > ancho - 90 ? "-100%" : "-50%";
  const arribaDelPunto = py - 64 > 0;

  return (
    <figure className="m-0">
      <div
        ref={caja}
        tabIndex={0}
        role="group"
        aria-label={`${titulo}. ${resumen} Usá las flechas para recorrer ${granularidad === "hora" ? "las horas" : "los días"}.`}
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
                <line
                  x1={izq}
                  x2={ancho - der}
                  y1={y(m)}
                  y2={y(m)}
                  className={i === 0 ? "stroke-zinc-300" : "stroke-zinc-200/80"}
                  strokeWidth={1}
                  shapeRendering="crispEdges"
                />
                <text x={izq - 8} y={y(m)} dy="0.32em" textAnchor="end" className="fill-zinc-500 text-[11px] tabular-nums">
                  {textosY[i]}
                </text>
              </g>
            ))}
            {ejeX.map((i, k) => (
              <text
                key={i}
                x={x(i)}
                y={alto - 6}
                textAnchor={
                  columnas || n <= 1 ? "middle" : k === 0 ? "start" : k === ejeX.length - 1 ? "end" : "middle"
                }
                className="fill-zinc-500 text-[11px]"
              >
                {etiquetaEje(puntos[i].t, granularidad)}
              </text>
            ))}
            {idx !== null && columnas ? (
              <rect
                x={px - banda / 2}
                y={arr}
                width={banda}
                height={h}
                rx={6}
                className="fill-zinc-900/[0.04]"
              />
            ) : null}
            {columnas ? (
              puntos.map((p, i) =>
                p.v > 0 ? (
                  <path
                    key={p.t}
                    d={columna(i)}
                    className={`transition-[fill] duration-150 ${
                      idx === i ? "fill-emerald-700" : cortado && i === n - 1 ? "fill-emerald-600/45" : "fill-emerald-600"
                    }`}
                  />
                ) : null,
              )
            ) : (
              <>
                <path d={area} className="fill-emerald-500/10" />
                <path
                  d={linea}
                  fill="none"
                  className="stroke-emerald-600"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </>
            )}
            {!columnas && lineaParcial ? (
              <path
                d={lineaParcial}
                fill="none"
                className="stroke-emerald-600"
                strokeWidth={2}
                strokeDasharray="2 5"
                strokeLinecap="round"
              />
            ) : null}
            {idx !== null && !columnas ? (
              <line x1={px} x2={px} y1={arr} y2={arr + h} className="stroke-zinc-400" strokeWidth={1} shapeRendering="crispEdges" />
            ) : null}
            {!columnas ? (
              <circle
                cx={idx !== null ? px : x(n - 1)}
                cy={idx !== null ? py : y(puntos[n - 1].v)}
                r={4}
                className="fill-emerald-600 stroke-white"
                strokeWidth={2}
              />
            ) : null}
            <rect
              x={izq - 6}
              y={0}
              width={w + 12}
              height={alto}
              fill="transparent"
              style={{ touchAction: "pan-y", cursor: "crosshair" }}
              onPointerDown={(e) => elegir(indiceDesdePuntero(e))}
              onPointerMove={(e) => elegir(indiceDesdePuntero(e))}
              onPointerLeave={(e) => e.pointerType === "mouse" && elegir(null)}
            />
          </svg>
        ) : null}
        {max === 0 && ancho > 0 ? (
          <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm text-zinc-500">
            Sin movimiento en este período
          </p>
        ) : null}
        {punto ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-xl bg-zinc-900 px-3 py-2 text-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.45)]"
            style={{
              transform: `translate(${px}px, ${arribaDelPunto ? py - 60 : py + 14}px) translateX(${alineacion})`,
            }}
          >
            <p className="text-sm font-semibold tabular-nums">{formatoValor(punto.v)}</p>
            <p className="text-xs text-zinc-300">{etiqueta(idx ?? 0)}</p>
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
            <caption className="sr-only">{titulo}</caption>
            <thead className="sticky top-0 bg-zinc-50 text-left text-xs text-zinc-600">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">
                  {granularidad === "hora" ? "Hora" : "Día"}
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {puntos.map((p) => (
                <tr key={p.t} className="border-t border-zinc-100">
                  <td className="px-3 py-1.5 text-zinc-700">{etiqueta(puntos.indexOf(p))}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-zinc-900">{formatoValor(p.v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </figure>
  );
}
