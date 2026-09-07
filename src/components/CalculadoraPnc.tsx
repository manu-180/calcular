"use client";

import { useMemo, useState } from "react";
import { PRESTACIONES_PNC, type ClavePnc } from "@/data/pnc";
import { BONO_VIGENTE } from "@/data/prestaciones";
import { evaluarSituacion, totalMinimaConBono } from "@/lib/pnc";
import { formatARS, formatPct, parseMonto } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

export function CalculadoraPnc() {
  const [clave, setClave] = useState<ClavePnc>("discapacidad");
  const [cobraOtro, setCobraOtro] = useState(false);
  const [ingresosInput, setIngresosInput] = useState("");

  const ingresos = useMemo(() => parseMonto(ingresosInput), [ingresosInput]);

  const res = useMemo(
    () =>
      evaluarSituacion({
        clave,
        cobraOtroBeneficio: cobraOtro,
        ingresosPorTrabajo: ingresos,
      }),
    [clave, cobraOtro, ingresos],
  );

  const { monto, topeIngresos, margenDeIngresos } = res;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="tipo" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál de las prestaciones estás mirando?
          </label>
          <select
            id="tipo"
            value={clave}
            onChange={(e) => setClave(e.target.value as ClavePnc)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {PRESTACIONES_PNC.map((p) => (
              <option key={p.clave} value={p.clave}>
                {p.nombre}
                {p.alias ? ` (la que se conocía como ${p.alias})` : ""}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-zinc-500">{monto.prestacion.paraQuien}</p>
        </div>

        <div>
          <label htmlFor="ingresos" className="block text-sm font-semibold text-zinc-800">
            ¿Tenés ingresos por trabajo registrado o monotributo?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Ingresos netos por mes. Dejalo vacío o en cero si no trabajás.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="ingresos"
              inputMode="numeric"
              placeholder="Ej: 400.000"
              value={ingresosInput}
              onChange={(e) => setIngresosInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div className="flex items-start">
          <label
            htmlFor="otro"
            className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 text-sm text-zinc-700"
          >
            <input
              id="otro"
              type="checkbox"
              checked={cobraOtro}
              onChange={(e) => setCobraOtro(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>
              Ya cobro una jubilación, pensión o retiro
              <span className="block text-xs text-zinc-500">
                De cualquier caja, contributivo o no contributivo.
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          {monto.prestacion.nombre} — lo que se deposita este mes
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {formatARS(monto.total, 2)}
        </p>
        <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">
              Haber ({formatPct(monto.prestacion.proporcionHaberMinimo * 100, 0)} de la mínima)
            </dt>
            <dd className="font-medium text-zinc-900">{formatARS(monto.haber, 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Bono ({BONO_VIGENTE.norma})</dt>
            <dd className="font-medium text-zinc-900">{formatARS(monto.bono, 0)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Un jubilado de la mínima cobra</dt>
            <dd className="font-medium text-zinc-900">{formatARS(totalMinimaConBono(), 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">O sea que cobrás el</dt>
            <dd className="font-medium text-zinc-900">
              {formatPct(monto.proporcionSobreMinimaConBono * 100, 1)} de eso
            </dd>
          </div>
        </dl>

        {topeIngresos !== null && (
          <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-3 text-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-zinc-600">
                Tope de ingresos compatible (2 salarios mínimos)
              </span>
              <span className="font-semibold text-zinc-900">{formatARS(topeIngresos, 0)}</span>
            </div>
            {margenDeIngresos !== null && ingresos > 0 && (
              <p className="mt-1.5 text-zinc-600">
                {margenDeIngresos > 0 ? (
                  <>
                    Te quedan <strong>{formatARS(margenDeIngresos, 0)}</strong> de margen antes de
                    llegar al tope. Sumando la pensión, el total del mes es{" "}
                    <strong>{formatARS(res.totalConIngresos, 0)}</strong>.
                  </>
                ) : (
                  <>Estás por encima del tope: no queda margen.</>
                )}
              </p>
            )}
          </div>
        )}

        {res.observaciones.length > 0 && (
          <ul className="mt-4 space-y-2">
            {res.observaciones.map((o, i) => (
              <li
                key={i}
                className={`rounded-lg border px-3 py-2 text-sm ${TONOS[o.tono]}`}
              >
                {o.texto}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs text-zinc-500">
          El otorgamiento no depende sólo de estos datos: hay una evaluación socioeconómica y, en la
          pensión por discapacidad, el Certificado Único de Discapacidad. Acá ves lo que fija la
          norma, no una resolución del organismo.
        </p>
      </div>
    </div>
  );
}
