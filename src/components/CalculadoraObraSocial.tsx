"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularObraSocial } from "@/lib/obra-social-aportes";
import {
  APORTE_ADICIONAL_FAMILIAR,
  APORTE_TRABAJADOR,
  CONTRIBUCION_EMPLEADOR,
  REPARTO_VIGENTE,
  TIPOS_ENTIDAD,
  type TipoEntidad,
} from "@/data/obra-social-aportes";
import { TOPE_SIPA } from "@/data/sueldo";
import { formatARS, formatPct, parseMonto } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pct = (n: number) => formatPct(n * 100, 1);

export function CalculadoraObraSocial() {
  const [bruto, setBruto] = useState("1.800.000");
  const [familiares, setFamiliares] = useState("0");
  const [tipoEntidad, setTipoEntidad] = useState<TipoEntidad>("obra-social");
  const [cuota, setCuota] = useState("0");

  const res = useMemo(
    () =>
      calcularObraSocial({
        brutoMensual: parseMonto(bruto),
        familiaresACargo: parseMonto(familiares),
        tipoEntidad,
        cuotaPlan: parseMonto(cuota),
      }),
    [bruto, familiares, tipoEntidad, cuota],
  );

  const filas = [
    {
      concepto: `Aporte tuyo — ${pct(APORTE_TRABAJADOR)} del bruto`,
      norma: "Ley 23.660, art. 16 inc. b)",
      monto: res.aporteTrabajador,
    },
    {
      concepto: `Aporte adicional — ${pct(APORTE_ADICIONAL_FAMILIAR)} por cada familiar autorizado`,
      norma: "Ley 23.660, art. 16 inc. b), 2ª oración",
      monto: res.aporteAdicional,
    },
    {
      concepto: `Contribución de tu empleador — ${pct(CONTRIBUCION_EMPLEADOR)} del bruto`,
      norma: "Ley 23.660, art. 16 inc. a) · Ley 25.565, art. 80",
      monto: res.contribucionEmpleador,
    },
  ];

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="os-bruto" className="block text-sm font-semibold text-zinc-800">
            Sueldo bruto mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El remunerativo: es la base sobre la que se calculan los nueve puntos.
          </p>
          <input
            id="os-bruto"
            inputMode="numeric"
            value={bruto}
            onChange={(e) => setBruto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="os-entidad" className="block text-sm font-semibold text-zinc-800">
            A qué entidad van tus aportes
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Desde el 1/8/2024 el reparto es el mismo para las dos. Antes no lo era.
          </p>
          <select
            id="os-entidad"
            value={tipoEntidad}
            onChange={(e) => setTipoEntidad(e.target.value as TipoEntidad)}
            className={claseInput}
          >
            {TIPOS_ENTIDAD.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="os-familiares" className="block text-sm font-semibold text-zinc-800">
            Familiares a cargo con adicional
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sólo los ascendientes o descendientes que la SSS autorizó a incluir. Cónyuge e hijos del
            grupo familiar primario van sin adicional: no se cuentan acá.
          </p>
          <input
            id="os-familiares"
            inputMode="numeric"
            value={familiares}
            onChange={(e) => setFamiliares(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="os-cuota" className="block text-sm font-semibold text-zinc-800">
            Cuota del plan de prepaga (opcional)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si ponés el precio de lista del plan, la calculadora te dice cuánto te queda de bolsillo.
          </p>
          <input
            id="os-cuota"
            inputMode="numeric"
            value={cuota}
            onChange={(e) => setCuota(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="text-sm font-semibold text-emerald-900">
            Llega a tu entidad — {pct(REPARTO_VIGENTE.entidad)} del total
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.aLaEntidad, 0)}
          </p>
          <p className="mt-1 text-sm text-emerald-900/80">
            Por mes. Es lo que la prepaga puede «tomar a cuenta» si derivás los aportes.
          </p>
          {res.reparoCambio ? (
            <p className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-emerald-900">
              Hasta el 31/7/2024 a esta entidad le llegaba el{" "}
              <strong>{pct(res.porcentajeEntidadAnterior)}</strong>:{" "}
              {formatARS(res.aLaEntidadAnterior, 0)}. El Decreto 600/2024 le sumó{" "}
              <strong>{formatARS(res.aLaEntidad - res.aLaEntidadAnterior, 0)}</strong> por mes.
            </p>
          ) : (
            <p className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-emerald-900">
              Con la escala anterior al Decreto 600/2024 también le llegaba el{" "}
              {pct(res.porcentajeEntidadAnterior)}: para este caso, el reparto{" "}
              <strong>no cambió</strong>.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">
            Al Fondo Solidario de Redistribución — {pct(REPARTO_VIGENTE.fondo)}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.alFondo, 0)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            No se pierde: financia el reintegro de prestaciones de alto costo del sistema entero. Pero
            no llega a tu entidad, y por eso la cuenta de «tengo nueve puntos de aportes» siempre da
            de más.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Total recaudado sobre tu sueldo: {formatARS(res.totalRecaudado, 0)} por mes.
          </p>
        </div>
      </div>

      {res.diferenciaBolsillo !== null ? (
        <div
          className={`mt-4 rounded-xl border p-5 ${
            res.cubrePlan
              ? "border-emerald-200 bg-emerald-50/70"
              : "border-amber-200 bg-amber-50/70"
          }`}
        >
          <p className="text-sm font-semibold text-zinc-800">
            {res.cubrePlan ? "Los aportes cubren el plan" : "Diferencia de bolsillo"}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.cubrePlan ? 0 : res.diferenciaBolsillo, 0)}
          </p>
          <p className="mt-1 text-sm text-zinc-700">
            {res.cubrePlan ? (
              <>
                Lo que llega por aportes ({formatARS(res.aLaEntidad, 0)}) alcanza para la cuota que
                cargaste. El excedente de {formatARS(res.excedente ?? 0, 0)}{" "}
                <strong>no se devuelve ni se acumula</strong>: queda en la entidad.
              </>
            ) : (
              <>
                Es la cuota del plan menos lo que llega por aportes. Ojo: es el precio de lista, y las
                entidades del inciso i) pueden cobrar un valor diferencial autorizado si declarás una
                enfermedad preexistente.
              </>
            )}
          </p>
        </div>
      ) : null}

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-left text-zinc-700">
                <th className="px-4 py-2.5 font-semibold">De dónde sale cada peso</th>
                <th className="px-4 py-2.5 font-semibold">Norma</th>
                <th className="px-4 py-2.5 text-right font-semibold">Por mes</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.concepto} className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">{f.concepto}</td>
                  <td className="px-4 py-2.5 text-xs text-zinc-500">{f.norma}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                    {formatARS(f.monto, 0)}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-zinc-200 bg-zinc-50">
                <td className="px-4 py-2.5 font-semibold text-zinc-900">Total sobre tu sueldo</td>
                <td className="px-4 py-2.5 text-xs text-zinc-500">Ley 23.660, art. 19</td>
                <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                  {formatARS(res.totalRecaudado, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {res.topeAplicado ? (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Tu bruto supera la base máxima de {formatARS(TOPE_SIPA.baseMaxima, 0)} (
          {TOPE_SIPA.vigencia}), así que <strong>tu aporte</strong> se calcula sobre esa base y no
          sobre el sueldo entero. La contribución del empleador sí va sobre el bruto completo: el
          Decreto 491/2004 le sacó el tope máximo.
        </p>
      ) : null}

      <p className="mt-4 text-xs text-zinc-500">
        Los porcentajes salen del texto vigente de la Ley 23.660 y del Decreto 600/2024; la base
        máxima, de la resolución de ANSES del mes. Acá no se estima ninguno. Para ver el recibo
        completo está la{" "}
        <Link href="/sueldo-neto" className="text-emerald-700 hover:underline">
          calculadora de sueldo neto
        </Link>
        , y para comparar planes y precios de prepagas,{" "}
        <a
          href="https://miprepaga.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:underline"
        >
          MiPrepaga
        </a>
        .
      </p>
    </div>
  );
}
