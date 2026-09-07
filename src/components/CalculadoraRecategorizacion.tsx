"use client";

import { useMemo, useState } from "react";
import { compararRecategorizacion, type Actividad } from "@/lib/monotributo";
import { formatARS, parseMonto } from "@/lib/formato";
import { CATEGORIAS, RECATEGORIZACION } from "@/data/monotributo";

export function CalculadoraRecategorizacion() {
  const [catActual, setCatActual] = useState("");
  const [facturacionInput, setFacturacionInput] = useState("");
  const [actividad, setActividad] = useState<Actividad>("servicios");
  const [relacionDependencia, setRelacionDependencia] = useState(false);

  const facturacion = useMemo(() => parseMonto(facturacionInput), [facturacionInput]);
  const resultado = useMemo(
    () =>
      catActual && facturacion > 0
        ? compararRecategorizacion(catActual, facturacion, actividad, relacionDependencia)
        : null,
    [catActual, facturacion, actividad, relacionDependencia]
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cat-actual" className="block text-sm font-semibold text-zinc-800">
              ¿En qué categoría estás hoy?
            </label>
            <select
              id="cat-actual"
              value={catActual}
              onChange={(e) => setCatActual(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="">Elegí tu categoría</option>
              {CATEGORIAS.map((c) => (
                <option key={c.cat} value={c.cat}>
                  Categoría {c.cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="fact-recat" className="block text-sm font-semibold text-zinc-800">
              ¿Cuánto facturaste en los últimos 12 meses?
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="fact-recat"
                inputMode="numeric"
                placeholder="Ej: 25.000.000"
                value={facturacionInput}
                onChange={(e) => setFacturacionInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
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
              Si tenés un empleo registrado, tu cuota solo incluye el impuesto integrado.
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
                Con más de {formatARS(resultado.tope)} facturados en los últimos 12 meses quedás
                excluido del régimen: no te corresponde recategorizarte sino pasar al Régimen
                General (responsable inscripto). Consultalo con un contador cuanto antes.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {resultado.movimiento === "igual" ? (
                <div className="rounded-lg bg-emerald-50 p-4">
                  <p className="font-semibold text-emerald-900">
                    Seguís en la categoría {resultado.actual.cat}: no tenés que hacer nada
                  </p>
                  <p className="mt-1 text-sm text-emerald-900">
                    Tu facturación sigue dentro de los topes de tu categoría actual. Si tampoco
                    cambiaron tu superficie, energía o alquileres, no hace falta ningún trámite en
                    esta ventana.
                  </p>
                </div>
              ) : (
                <div
                  className={`rounded-lg p-4 ${
                    resultado.movimiento === "sube" ? "bg-amber-50" : "bg-emerald-50"
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      resultado.movimiento === "sube" ? "text-amber-900" : "text-emerald-900"
                    }`}
                  >
                    {resultado.movimiento === "sube"
                      ? `Te corresponde subir de la categoría ${resultado.actual.cat} a la ${resultado.nueva.cat}`
                      : `Podés bajar de la categoría ${resultado.actual.cat} a la ${resultado.nueva.cat}`}
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      resultado.movimiento === "sube" ? "text-amber-900" : "text-emerald-900"
                    }`}
                  >
                    {resultado.movimiento === "sube"
                      ? `Tu facturación superó el tope de tu categoría actual. Hacé el trámite ${RECATEGORIZACION.proximaVentana} para evitar una recategorización de oficio con retroactivo.`
                      : `Tu facturación quedó por debajo del tope de una categoría menor. Si te recategorizás ${RECATEGORIZACION.proximaVentana}, pagás ${formatARS(Math.abs(resultado.diferenciaMensual), 0)} menos por mes.`}
                  </p>
                </div>
              )}

              <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-600">
                    Cuota actual (categoría {resultado.actual.cat})
                  </dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.cuotaActual.total)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">
                    Cuota nueva (categoría {resultado.nueva.cat})
                  </dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.cuotaNueva.total)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                  <dt className="font-semibold text-zinc-800">Diferencia por mes</dt>
                  <dd
                    className={`font-semibold ${
                      resultado.diferenciaMensual > 0
                        ? "text-amber-700"
                        : resultado.diferenciaMensual < 0
                          ? "text-emerald-700"
                          : "text-zinc-900"
                    }`}
                  >
                    {resultado.diferenciaMensual > 0 ? "+" : ""}
                    {formatARS(resultado.diferenciaMensual)}
                  </dd>
                </div>
                {resultado.movimiento !== "igual" && (
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">Diferencia en un año</dt>
                    <dd className="font-medium text-zinc-900">
                      {resultado.diferenciaMensual > 0 ? "+" : ""}
                      {formatARS(resultado.diferenciaMensual * 12, 0)}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="text-xs text-zinc-400">
                Comparación según ingresos brutos de los últimos 12 meses. La categoría también
                depende de superficie afectada, energía consumida y alquileres devengados: si
                alguno supera el de la categoría sugerida, te corresponde una mayor.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
