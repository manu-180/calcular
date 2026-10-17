"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALQUILER_VIGENCIA } from "@/data/deduccion-alquiler";
import { calcularDeduccionAlquiler } from "@/lib/deduccion-alquiler";
import { formatARS, errorMonto, primerError, CANTIDAD_MAXIMA, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const claseSelect =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraDeduccionAlquiler() {
  const [alquilerMensual, setAlquilerMensual] = useState("450000");
  const [mesesPagados, setMesesPagados] = useState("12");
  const [brutoMensual, setBrutoMensual] = useState("3000000");
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState("0");
  const [titularDeInmueble, setTitularDeInmueble] = useState(false);
  const [computarDiezPorCiento, setComputarDiezPorCiento] = useState(false);

  const error = primerError({
    "Alquiler mensual": errorMonto(alquilerMensual),
    "Sueldo bruto mensual": errorMonto(brutoMensual),
    "Hijos a cargo": errorMonto(hijos, CANTIDAD_MAXIMA),
  });

  const res = useMemo(
    () =>
      calcularDeduccionAlquiler({
        alquilerMensual: parseMonto(alquilerMensual),
        mesesPagados: Number(mesesPagados) || 0,
        brutoMensual: parseMonto(brutoMensual),
        conyuge,
        hijos: parseMonto(hijos),
        titularDeInmueble,
        computarDiezPorCiento,
      }),
    [alquilerMensual, mesesPagados, brutoMensual, conyuge, hijos, titularDeInmueble, computarDiezPorCiento],
  );

  const meses = res.mesesDeAlquilerQueVuelven;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="alquiler" className="block text-sm font-semibold text-zinc-800">
            Alquiler mensual que pagás
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sólo el alquiler de tu casa habitación, sin expensas ni impuestos.
          </p>
          <input
            id="alquiler"
            inputMode="numeric"
            value={alquilerMensual}
            onChange={(e) => setAlquilerMensual(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="bruto" className="block text-sm font-semibold text-zinc-800">
            Tu sueldo bruto mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Define tu alícuota: de eso depende cuánta plata te vuelve.
          </p>
          <input
            id="bruto"
            inputMode="numeric"
            value={brutoMensual}
            onChange={(e) => setBrutoMensual(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="meses" className="block text-sm font-semibold text-zinc-800">
            Meses que pagaste alquiler en el año
          </label>
          <select
            id="meses"
            value={mesesPagados}
            onChange={(e) => setMesesPagados(e.target.value)}
            className={claseSelect}
          >
            {Array.from({ length: 12 }, (_, i) => 12 - i).map((m) => (
              <option key={m} value={m}>
                {m} {m === 1 ? "mes" : "meses"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hijos" className="block text-sm font-semibold text-zinc-800">
            Hijos a cargo (para Ganancias)
          </label>
          <input
            id="hijos"
            inputMode="numeric"
            value={hijos}
            onChange={(e) => setHijos(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="flex flex-col justify-end gap-2 pb-1 sm:col-span-2">
          <label className="flex items-start gap-2 text-sm font-medium text-zinc-800">
            <input
              type="checkbox"
              checked={titularDeInmueble}
              onChange={(e) => setTitularDeInmueble(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-600"
            />
            <span>
              Soy titular de algún inmueble
              <span className="block text-xs font-normal text-zinc-500">
                Aunque sea una parte heredada o en otra provincia: la ley dice «cualquiera sea la
                proporción».
              </span>
            </span>
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-800">
            <input
              type="checkbox"
              checked={conyuge}
              onChange={(e) => setConyuge(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Deducís cónyuge en tu Ganancias
          </label>
          <label className="flex items-start gap-2 text-sm font-medium text-zinc-800">
            <input
              type="checkbox"
              checked={computarDiezPorCiento}
              onChange={(e) => setComputarDiezPorCiento(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-600"
            />
            <span>
              Sumar el 10% del inciso k)
              <span className="block text-xs font-normal text-zinc-500">
                Régimen hasta el ejercicio 2025. Desde 2026 no corre sobre la casa habitación (Ley
                27.802).
              </span>
            </span>
          </label>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Lo que te vuelve en el año por deducir el alquiler</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.ahorroAnual, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.ahorroAnual > 0 ? (
              <>
                {formatARS(res.ahorroMensual, 2)} por mes · equivale a{" "}
                <strong>
                  {meses.toLocaleString("es-AR", { maximumFractionDigits: 1 })}{" "}
                  {meses >= 2 ? "meses" : "mes"} de alquiler
                </strong>{" "}
                · te devuelve el{" "}
                {(res.alicuotaEfectiva * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
                de lo que deducís, no el total
              </>
            ) : (
              "no hay ahorro: la deducción baja la base imponible, pero no estás pagando el impuesto"
            )}
          </p>

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Alquiler pagado en el año</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.alquilerAnual, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">40% del art. 85 inc. h)</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.cuarentaPorCiento, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Tope anual (ganancia no imponible)</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.tope, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Deducción del inc. h) que podés computar</dt>
              <dd className="font-semibold text-emerald-700">{formatARS(res.deduccionIncH, 2)}</dd>
            </div>
            {res.excedente > 0 && (
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Excedente que se pierde</dt>
                <dd className="font-semibold text-amber-700">{formatARS(res.excedente, 2)}</dd>
              </div>
            )}
            {computarDiezPorCiento && (
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">10% del inc. k) (hasta 2025)</dt>
                <dd className="font-medium text-zinc-900">{formatARS(res.deduccionIncK, 2)}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Total deducido</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.deduccionTotal, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Tu Ganancias del año: antes → después</dt>
              <dd className="font-medium text-zinc-900">
                {formatARS(res.impuestoSin.impuestoAnual, 2)} →{" "}
                {formatARS(res.impuestoCon.impuestoAnual, 2)}
              </dd>
            </div>
          </dl>

          {res.avisos.length > 0 && (
            <ul className="mt-4 space-y-2">
              {res.avisos.map((a, i) => (
                <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
                  {a.texto}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-xs text-zinc-500">
            Tope y escala del impuesto: {ALQUILER_VIGENCIA}. Estimación orientativa, no una
            liquidación: tu impuesto mes a mes, con el método acumulado que usa tu empleador, está en{" "}
            <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
              la calculadora de Ganancias
            </Link>
            , y el ajuste de tu alquiler por índice en{" "}
            <Link href="/inflacion/alquiler" className="font-medium text-emerald-700 hover:underline">
              la de aumento de alquiler
            </Link>
            .
          </p>
        </div>
        </>
      )}
    </div>
  );
}
