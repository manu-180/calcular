"use client";

import { useMemo, useState } from "react";
import { calcular, type Actividad } from "@/lib/monotributo";
import { formatARS, parseMonto } from "@/lib/formato";
import { VIGENCIA } from "@/data/monotributo";

export function CalculadoraMonotributo() {
  const [facturacionInput, setFacturacionInput] = useState("");
  const [actividad, setActividad] = useState<Actividad>("servicios");
  const [relacionDependencia, setRelacionDependencia] = useState(false);

  const facturacion = useMemo(() => parseMonto(facturacionInput), [facturacionInput]);
  const resultado = useMemo(
    () => (facturacion > 0 ? calcular(facturacion, actividad, relacionDependencia) : null),
    [facturacion, actividad, relacionDependencia]
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="facturacion" className="block text-sm font-semibold text-zinc-800">
            ¿Cuánto facturaste en los últimos 12 meses?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Ingresos brutos totales, en pesos. Si recién empezás, estimá lo que pensás facturar en un año.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="facturacion"
              inputMode="numeric"
              placeholder="Ej: 18.000.000"
              value={facturacionInput}
              onChange={(e) => setFacturacionInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-zinc-800">¿Cuál es tu actividad?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              [
                ["servicios", "Prestación de servicios"],
                ["venta", "Venta de productos"],
              ] as const
            ).map(([valor, etiqueta]) => (
              <button
                key={valor}
                type="button"
                onClick={() => setActividad(valor)}
                aria-pressed={actividad === valor}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                  actividad === valor
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {etiqueta}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={relacionDependencia}
            onChange={(e) => setRelacionDependencia(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Además trabajo en relación de dependencia
            <span className="block text-xs text-zinc-500">
              Si tenés un empleo registrado, no pagás jubilación ni obra social por el monotributo:
              solo el impuesto integrado.
            </span>
          </span>
        </label>
      </div>

      {resultado && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          {resultado.tipo === "excedido" ? (
            <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold">Superás el tope del monotributo</p>
              <p className="mt-1">
                Con una facturación mayor a {formatARS(resultado.tope)} anuales quedás fuera del
                régimen y te corresponde inscribirte en el Régimen General (responsable inscripto).
                Te conviene consultarlo con un contador.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Tu categoría</p>
                  <p className="text-4xl font-bold text-emerald-700">
                    {resultado.categoria.cat}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-500">Cuota mensual</p>
                  <p className="text-3xl font-bold text-zinc-900">
                    {formatARS(resultado.cuota.total, 0)}
                  </p>
                </div>
              </div>

              <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Impuesto integrado</dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.cuota.impuestoIntegrado)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Aporte jubilatorio (SIPA)</dt>
                  <dd className="font-medium text-zinc-900">{formatARS(resultado.cuota.sipa)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Obra social</dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.cuota.obraSocial)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                  <dt className="font-semibold text-zinc-800">Total por mes</dt>
                  <dd className="font-semibold text-zinc-900">
                    {formatARS(resultado.cuota.total)}
                  </dd>
                </div>
              </dl>

              <ul className="space-y-1 text-sm text-zinc-600">
                <li>
                  • Te quedan <strong>{formatARS(resultado.margenHastaTope, 0)}</strong> de margen
                  antes de pasar al tope de tu categoría (
                  {formatARS(resultado.categoria.ingresosBrutosMax, 0)} anuales).
                </li>
                {resultado.porcentajeSobreFacturacion !== null && (
                  <li>
                    • La cuota representa el{" "}
                    <strong>{resultado.porcentajeSobreFacturacion.toFixed(1)}%</strong> de tu
                    facturación mensual promedio.
                  </li>
                )}
              </ul>

              <p className="text-xs text-zinc-400">
                Cálculo según ingresos brutos con la tabla oficial de ARCA vigente desde el{" "}
                {VIGENCIA.desde}. La categoría también depende de superficie afectada, energía
                consumida y alquileres: si superás esos parámetros, puede corresponderte una
                categoría mayor.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
