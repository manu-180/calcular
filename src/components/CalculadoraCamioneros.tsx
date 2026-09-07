"use client";

import { useMemo, useState, useRef } from "react";
import { CATEGORIAS_CAMIONEROS, MESES_CAMIONEROS } from "@/data/convenios/camioneros";
import { calcularCamioneros } from "@/lib/convenios";
import { formatARS } from "@/lib/formato";
import { CompartirWhatsApp } from "@/components/CompartirWhatsApp";

export function CalculadoraCamioneros() {
  const [mesId, setMesId] = useState("junio-2026");
  const [categoriaId, setCategoriaId] = useState("chofer-primera");
  const [aniosStr, setAniosStr] = useState("0");

  const aniosAntiguedad = useMemo(() => {
    const n = parseInt(aniosStr, 10);
    return Number.isFinite(n) ? Math.max(0, Math.min(60, n)) : 0;
  }, [aniosStr]);

  const resultado = useMemo(
    () => calcularCamioneros({ mesId, categoriaId, aniosAntiguedad }),
    [mesId, categoriaId, aniosAntiguedad]
  );

  const categoria = CATEGORIAS_CAMIONEROS.find((c) => c.id === categoriaId);
  const mes = MESES_CAMIONEROS.find((m) => m.id === mesId);
  const grupos = Array.from(new Set(CATEGORIAS_CAMIONEROS.map((c) => c.grupo)));

  // Copiar el resultado ya desglosado: quien liquida lo pega en un mail o un recibo,
  // y sacar el número a mano de la pantalla es donde se cuelan los errores de tipeo.
  const [copia, setCopia] = useState<"idle" | "ok" | "error">("idle");
  const copiaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const volverAIdle = (ms: number) => {
    if (copiaTimer.current) clearTimeout(copiaTimer.current);
    copiaTimer.current = setTimeout(() => setCopia("idle"), ms);
  };
  async function copiarResultado() {
    if (!resultado) return;
    try {
      await navigator.clipboard.writeText(`Camioneros · ${categoria?.nombre} · ${mes?.etiqueta}
Bruto: ${formatARS(resultado.totalRemunerativo, 0)}
En mano (estimado): ${formatARS(resultado.neto, 0)}
Escala oficial CCT 40/89 — https://calcular.ar/convenios/camioneros`);
      setCopia("ok");
      volverAIdle(2000);
    } catch {
      // Sin portapapeles (contexto no seguro, permiso denegado) el botón tiene que
      // decirlo: un botón que no hace nada y no avisa se lee como roto.
      setCopia("error");
      volverAIdle(3000);
    }
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cam-mes" className="block text-sm font-semibold text-zinc-800">
            Mes a liquidar
          </label>
          <select
            id="cam-mes"
            value={mesId}
            onChange={(e) => setMesId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {MESES_CAMIONEROS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cam-categoria" className="block text-sm font-semibold text-zinc-800">
            Categoría
          </label>
          <select
            id="cam-categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {grupos.map((grupo) => (
              <optgroup key={grupo} label={grupo}>
                {CATEGORIAS_CAMIONEROS.filter((c) => c.grupo === grupo).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cam-antiguedad" className="block text-sm font-semibold text-zinc-800">
            Años de antigüedad
          </label>
          <input
            id="cam-antiguedad"
            type="number"
            inputMode="numeric"
            min="0"
            max="60"
            step="1"
            value={aniosStr}
            onChange={(e) => setAniosStr(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 py-2.5 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
          <p className="mt-1 text-xs text-zinc-500">
            CCT 40/89: 1% del sueldo básico por cada año de antigüedad.
          </p>
        </div>
      </div>

      {resultado && mes && categoria && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="space-y-4">
            {/* Dos tarjetas en grilla, no dos números enfrentados: a 375px el layout
                anterior apretaba las cifras contra el medio y se cortaban. */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/70">
                  Bruto
                </p>
                <p className="mt-1 text-[2rem] font-bold leading-none tabular-nums text-emerald-700 sm:text-[2.25rem]">
                  {formatARS(resultado.totalRemunerativo, 0)}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-zinc-500">
                  Bruto de {categoria.nombre} · {mes.etiqueta}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  En mano (estimado)
                </p>
                <p className="mt-1 text-[2rem] font-bold leading-none tabular-nums text-zinc-900 sm:text-[2.25rem]">
                  {formatARS(resultado.neto, 0)}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-zinc-500">
                  Después de los aportes de ley
                </p>
              </div>
            </div>

            <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-600">Sueldo básico</dt>
                <dd className="font-medium text-zinc-900">{formatARS(resultado.basico, 0)}</dd>
              </div>
              {resultado.antiguedad > 0 && (
                <div className="flex justify-between">
                  <dt className="text-zinc-600">
                    Antigüedad ({aniosAntiguedad}%)
                  </dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.antiguedad, 0)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                <dt className="font-semibold text-zinc-800">Total bruto</dt>
                <dd className="font-semibold text-zinc-900">
                  {formatARS(resultado.totalRemunerativo, 0)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-600">Descuentos (−17%)</dt>
                <dd className="font-medium text-rose-700">
                  −{formatARS(resultado.descuentos, 0)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-zinc-800">Neto estimado</dt>
                <dd className="font-semibold text-emerald-700">
                  {formatARS(resultado.neto, 0)}
                </dd>
              </div>
            </dl>

            <p className="text-xs text-zinc-400">
              El CCT 40/89 fija un piso salarial; tu empleador puede pagarte más. El neto
              descuenta el 17% de aportes de ley sobre el total remunerativo (jubilación 11%,
              PAMI 3%, obra social 3%). No incluye horas extra, viáticos, Ganancias ni
              aporte sindical.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copiarResultado}
                aria-live="polite"
                className={`inline-flex min-h-11 items-center gap-2 rounded-lg border bg-white px-4 text-sm font-semibold outline-none transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] ${
                  copia === "error"
                    ? "border-rose-300 text-rose-700"
                    : "border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                }`}
              >
                {copia === "ok" ? (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-4 text-emerald-600">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`size-4 ${copia === "error" ? "text-rose-400" : "text-zinc-400"}`}>
                    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
                {copia === "ok" ? "Copiado" : copia === "error" ? "No se pudo copiar" : "Copiar resultado"}
              </button>
              <CompartirWhatsApp
                mensaje={`Sueldo de ${categoria.nombre} en ${mes.etiqueta.toLowerCase()} según CCT 40/89 (Camioneros): ${formatARS(resultado.totalRemunerativo, 0)} bruto, ≈ ${formatARS(resultado.neto, 0)} en mano:`}
                path="/convenios/camioneros"
                campania="convenios-camioneros"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
