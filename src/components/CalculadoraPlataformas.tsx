"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { VIGENCIA } from "@/data/monotributo";
import {
  DIAS_VACACIONES_BASE,
  PAGOS_EQUIVALENTES_EMPLEADO,
  calcularPlataforma,
} from "@/lib/plataformas";
import { formatARS, parseMonto } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pct = (n: number) => `${n.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%`;

export function CalculadoraPlataformas() {
  const [bruto, setBruto] = useState("900.000");
  const [otroEmpleo, setOtroEmpleo] = useState(false);

  const res = useMemo(
    () => calcularPlataforma({ brutoMensual: parseMonto(bruto), otroEmpleo }),
    [bruto, otroEmpleo],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bruto" className="block text-sm font-semibold text-zinc-800">
            Lo que te transfiere la app por mes
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El total que cobrás, antes de pagar nada. Si trabajás en varias apps, sumalas: la
            categoría se define por el total facturado, no por plataforma.
          </p>
          <input
            id="bruto"
            inputMode="numeric"
            value={bruto}
            onChange={(e) => setBruto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <span className="block text-sm font-semibold text-zinc-800">
            ¿Tenés además un trabajo en relación de dependencia?
          </span>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si ya te descuentan jubilación y obra social de un sueldo, del monotributo pagás sólo el
            impuesto integrado.
          </p>
          <label className="mt-2 flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2.5">
            <input
              type="checkbox"
              checked={otroEmpleo}
              onChange={(e) => setOtroEmpleo(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            <span className="text-sm text-zinc-700">Sí, además soy empleado en blanco</span>
          </label>
        </div>
      </div>

      {res.tipo === "excedido" ? (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 p-5 text-rose-900">
          <p className="font-semibold">Con esa facturación te quedás afuera del monotributo.</p>
          <p className="mt-1 text-sm">
            Facturarías {formatARS(res.facturacionAnual, 0)} al año y el tope del régimen es{" "}
            {formatARS(res.tope, 0)}. Ahí la vía es el régimen general (responsable inscripto), que
            esta calculadora no cubre.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 sm:col-span-2">
              <p className="text-sm font-semibold text-emerald-900">Te queda por mes</p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-900">
                {formatARS(res.netoMensual, 2)}
              </p>
              <p className="mt-1 text-sm text-emerald-900/80">
                {formatARS(res.brutoMensual, 2)} menos {formatARS(res.cuota.total, 2)} de cuota de
                monotributo, que es el {pct(res.porcentajeCuota)} de lo que facturás.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-700">Tu categoría</p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-zinc-900">
                {res.categoria.cat}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Por {formatARS(res.facturacionAnual, 0)} de facturación anual (tope de la categoría:{" "}
                {formatARS(res.categoria.ingresosBrutosMax, 0)}).
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <tbody>
                <tr className="border-b border-zinc-200">
                  <td className="py-2 text-zinc-600">Impuesto integrado</td>
                  <td className="py-2 text-right font-medium text-zinc-800">
                    {formatARS(res.cuota.impuestoIntegrado, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="py-2 text-zinc-600">
                    Aportes jubilatorios (SIPA, art. 125 inc. 2)
                  </td>
                  <td className="py-2 text-right font-medium text-zinc-800">
                    {formatARS(res.cuota.sipa, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="py-2 text-zinc-600">Obra social</td>
                  <td className="py-2 text-right font-medium text-zinc-800">
                    {formatARS(res.cuota.obraSocial, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-300">
                  <td className="py-2 font-semibold text-zinc-800">Cuota mensual</td>
                  <td className="py-2 text-right font-bold text-zinc-900">
                    {formatARS(res.cuota.total, 2)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-zinc-600">En el año</td>
                  <td className="py-2 text-right font-medium text-zinc-800">
                    {formatARS(res.cuotaAnual, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {res.mesesHastaSaltarDeCategoria !== null &&
          res.mesesHastaSaltarDeCategoria < 2 &&
          res.margenHastaTope > 0 ? (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-sm text-amber-900">
              Ojo: te faltan {formatARS(res.margenHastaTope, 0)} de facturación anual para pasar de
              categoría, o sea menos de {Math.ceil(res.mesesHastaSaltarDeCategoria)} mes a este
              ritmo. La recategorización mira los últimos 12 meses.
            </p>
          ) : null}

          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5">
            <p className="text-sm font-semibold text-zinc-800">
              Lo mismo, comparado con un empleado que cobra {formatARS(res.netoMensual, 0)} de
              bolsillo por mes
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              No es una opinión sobre el régimen: es la cuenta de dos cosas que la Ley de Contrato
              de Trabajo le paga al empleado y que a vos, desde el 6 de marzo de 2026, no te
              alcanzan. Son el aguinaldo (arts. 121 y 122) y el plus de los {DIAS_VACACIONES_BASE}{" "}
              días de vacaciones, que se pagan dividiendo por 25 en lugar de por 30 (art. 155 inc.
              a).
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-zinc-50 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Vos, en el año</p>
                <p className="mt-1 text-xl font-bold text-zinc-900">
                  {formatARS(res.brecha.ingresoAnualPrestador, 0)}
                </p>
                <p className="mt-1 text-xs text-zinc-500">12 pagos.</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">El empleado</p>
                <p className="mt-1 text-xl font-bold text-zinc-900">
                  {formatARS(res.brecha.ingresoAnualEmpleado, 0)}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {PAGOS_EQUIVALENTES_EMPLEADO.toLocaleString("es-AR", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  pagos equivalentes.
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="text-xs uppercase tracking-wide text-rose-700">La diferencia</p>
                <p className="mt-1 text-xl font-bold text-rose-900">
                  {formatARS(res.brecha.brechaAnual, 0)}
                </p>
                <p className="mt-1 text-xs text-rose-800/80">
                  {pct(res.brecha.brechaPorcentaje)} más al año, sólo por esos dos conceptos.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              El desglose: {formatARS(res.brecha.aguinaldoNoCobrado, 0)} de aguinaldo y{" "}
              {formatARS(res.brecha.plusVacacionalNoCobrado, 0)} de plus vacacional. Quedan afuera de
              la cuenta la indemnización por despido y la ART, que no tienen equivalente en pesos
              porque dependen de un hecho que puede no ocurrir.
            </p>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Escala de monotributo vigente desde el {VIGENCIA.desde}. Para ver la tabla completa,
            recategorizarte o simular otra actividad está{" "}
            <Link href="/monotributo" className="font-medium text-emerald-700 hover:underline">
              la calculadora de monotributo
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
