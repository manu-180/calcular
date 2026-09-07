"use client";

import { useMemo, useState } from "react";
import { formatARS, formatPct, parseMonto } from "@/lib/formato";
import {
  actualizarMonto,
  nombrePeriodo,
  PRIMER_PERIODO,
  sueldoVsInflacion,
  sumarMeses,
  ULTIMO_PERIODO,
  type Periodo,
} from "@/lib/inflacion";
import { SelectorPeriodo } from "@/components/SelectorPeriodo";

type Modo = "monto" | "sueldo";

const HACE_12_MESES = sumarMeses(ULTIMO_PERIODO, -12);

export function CalculadoraInflacion() {
  const [modo, setModo] = useState<Modo>("monto");

  // Modo "actualizar un monto"
  const [montoInput, setMontoInput] = useState("");
  const [desde, setDesde] = useState<Periodo>(HACE_12_MESES);
  const [hasta, setHasta] = useState<Periodo>(ULTIMO_PERIODO);

  // Modo "sueldo vs inflación"
  const [sueldoAntesInput, setSueldoAntesInput] = useState("");
  const [periodoSueldo, setPeriodoSueldo] = useState<Periodo>(HACE_12_MESES);
  const [sueldoHoyInput, setSueldoHoyInput] = useState("");

  const monto = useMemo(() => parseMonto(montoInput), [montoInput]);
  const resultadoMonto = useMemo(
    () => (monto > 0 ? actualizarMonto(monto, desde, hasta) : null),
    [monto, desde, hasta]
  );

  const sueldoAntes = useMemo(() => parseMonto(sueldoAntesInput), [sueldoAntesInput]);
  const sueldoHoy = useMemo(() => parseMonto(sueldoHoyInput), [sueldoHoyInput]);
  const resultadoSueldo = useMemo(
    () =>
      sueldoAntes > 0 && sueldoHoy > 0
        ? sueldoVsInflacion(sueldoAntes, periodoSueldo, sueldoHoy)
        : null,
    [sueldoAntes, periodoSueldo, sueldoHoy]
  );

  const clasePestania = (activo: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      activo
        ? "bg-emerald-600 text-white"
        : "border border-zinc-300 text-zinc-600 hover:border-emerald-500 hover:text-emerald-700"
    }`;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Modo de cálculo">
        <button
          type="button"
          role="tab"
          aria-selected={modo === "monto"}
          onClick={() => setModo("monto")}
          className={clasePestania(modo === "monto")}
        >
          Actualizar un monto
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={modo === "sueldo"}
          onClick={() => setModo("sueldo")}
          className={clasePestania(modo === "sueldo")}
        >
          Tu sueldo vs. la inflación
        </button>
      </div>

      {modo === "monto" ? (
        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor="monto-inf" className="block text-sm font-semibold text-zinc-800">
              ¿Qué monto querés actualizar?
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="monto-inf"
                inputMode="numeric"
                placeholder="Ej: 100.000"
                value={montoInput}
                onChange={(e) => setMontoInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="desde-inf" className="block text-sm font-semibold text-zinc-800">
                Es plata de…
              </label>
              <div className="mt-2">
                <SelectorPeriodo
                  id="desde-inf"
                  value={desde}
                  onChange={setDesde}
                  min={PRIMER_PERIODO}
                  max={ULTIMO_PERIODO}
                />
              </div>
            </div>
            <div>
              <label htmlFor="hasta-inf" className="block text-sm font-semibold text-zinc-800">
                ¿Cuánto vale en…?
              </label>
              <div className="mt-2">
                <SelectorPeriodo
                  id="hasta-inf"
                  value={hasta}
                  onChange={setHasta}
                  min={PRIMER_PERIODO}
                  max={ULTIMO_PERIODO}
                />
              </div>
              <p className="mt-1.5 text-xs text-zinc-500">
                {nombrePeriodo(ULTIMO_PERIODO)} es el último IPC publicado por el INDEC.
              </p>
            </div>
          </div>

          {resultadoMonto && (
            <div className="space-y-3 border-t border-zinc-100 pt-5" aria-live="polite">
              <div>
                <p className="text-sm text-zinc-500">
                  {formatARS(monto, 0)} de {nombrePeriodo(desde)} equivalen en{" "}
                  {nombrePeriodo(hasta)} a
                </p>
                <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                  {formatARS(resultadoMonto.montoActualizado, 0)}
                </p>
              </div>
              <p className="text-sm text-zinc-600">
                {resultadoMonto.variacionPct >= 0 ? (
                  <>
                    Entre {nombrePeriodo(desde)} y {nombrePeriodo(hasta)} los precios subieron{" "}
                    <strong>{formatPct(resultadoMonto.variacionPct, 1)}</strong> según el IPC: la
                    plata se multiplicó por{" "}
                    {resultadoMonto.factor.toLocaleString("es-AR", { maximumFractionDigits: 2 })}.
                  </>
                ) : (
                  <>
                    Elegiste un período hacia atrás: estás deflactando. Los precios de{" "}
                    {nombrePeriodo(hasta)} eran{" "}
                    <strong>{formatPct(Math.abs(resultadoMonto.variacionPct), 1)}</strong> más
                    bajos que los de {nombrePeriodo(desde)}.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="sueldo-antes" className="block text-sm font-semibold text-zinc-800">
                ¿Cuánto cobrabas?
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  $
                </span>
                <input
                  id="sueldo-antes"
                  inputMode="numeric"
                  placeholder="Ej: 800.000"
                  value={sueldoAntesInput}
                  onChange={(e) => setSueldoAntesInput(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
            <div>
              <label htmlFor="periodo-sueldo" className="block text-sm font-semibold text-zinc-800">
                ¿En qué mes?
              </label>
              <div className="mt-2">
                <SelectorPeriodo
                  id="periodo-sueldo"
                  value={periodoSueldo}
                  onChange={setPeriodoSueldo}
                  min={PRIMER_PERIODO}
                  max={sumarMeses(ULTIMO_PERIODO, -1)}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="sueldo-hoy" className="block text-sm font-semibold text-zinc-800">
              ¿Cuánto cobrás hoy?
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="sueldo-hoy"
                inputMode="numeric"
                placeholder="Ej: 1.000.000"
                value={sueldoHoyInput}
                onChange={(e) => setSueldoHoyInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          {resultadoSueldo && (
            <div className="space-y-4 border-t border-zinc-100 pt-5" aria-live="polite">
              <div
                className={`rounded-xl p-4 ${resultadoSueldo.gana ? "bg-emerald-50" : "bg-red-50"}`}
              >
                <p
                  className={`font-semibold ${
                    resultadoSueldo.gana ? "text-emerald-900" : "text-red-900"
                  }`}
                >
                  {resultadoSueldo.gana
                    ? "✓ Tu sueldo le ganó a la inflación"
                    : "✗ Tu sueldo perdió contra la inflación"}
                </p>
                <p
                  className={`mt-2 text-sm ${
                    resultadoSueldo.gana ? "text-emerald-900" : "text-red-900"
                  }`}
                >
                  Para comprar lo mismo que con {formatARS(sueldoAntes, 0)} en{" "}
                  {nombrePeriodo(periodoSueldo)}, hoy necesitás{" "}
                  <strong>{formatARS(resultadoSueldo.sueldoEquivalente, 0)}</strong> (los precios
                  subieron {formatPct(resultadoSueldo.inflacionPct, 1)}). Cobrás{" "}
                  {formatARS(sueldoHoy, 0)}:{" "}
                  {resultadoSueldo.gana ? "ganaste" : "perdiste"}{" "}
                  <strong>{formatPct(Math.abs(resultadoSueldo.diferenciaRealPct), 1)}</strong> de
                  poder de compra
                  {resultadoSueldo.gana
                    ? ` — ${formatARS(Math.abs(resultadoSueldo.diferencia), 0)} de más por mes en plata de hoy.`
                    : ` — te faltan ${formatARS(Math.abs(resultadoSueldo.diferencia), 0)} por mes para empatar.`}
                </p>
              </div>
              <p className="text-xs text-zinc-400">
                Comparación a valores de {nombrePeriodo(resultadoSueldo.hastaPeriodo)}, el último
                IPC publicado. Mide solo la inflación general: tu canasta personal puede haber
                subido distinto.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
