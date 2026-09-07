"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DIVISOR_USUAL_48,
  JORNADA_LEGAL_SEMANAL,
  TOPES_DECRETO_484,
  VIGENCIA_REFORMA,
} from "@/data/horas-extras";
import { calcularHorasExtras } from "@/lib/horas-extras";
import { formatARS } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const numero = (n: number, dec = 1) =>
  n.toLocaleString("es-AR", { maximumFractionDigits: dec });

export function CalculadoraHorasExtras() {
  const [sueldo, setSueldo] = useState("1200000");
  const [jornada, setJornada] = useState("48");
  const [comunes, setComunes] = useState("10");
  const [agravadas, setAgravadas] = useState("4");
  const [acumuladas, setAcumuladas] = useState("0");

  const res = useMemo(
    () =>
      calcularHorasExtras({
        sueldoMensual: Number(sueldo) || 0,
        jornadaSemanal: Number(jornada) || 0,
        horasComunes: Number(comunes) || 0,
        horasAgravadas: Number(agravadas) || 0,
        horasAcumuladasAnio: Number(acumuladas) || 0,
      }),
    [sueldo, jornada, comunes, agravadas, acumuladas],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sueldo" className="block text-sm font-semibold text-zinc-800">
            Tu remuneración mensual bruta, normal y habitual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El sueldo de convenio con sus adicionales fijos, sin las extras del mes ni el aguinaldo.
            Es el «salario habitual» sobre el que el art. 201 manda calcular el recargo.
          </p>
          <input
            id="sueldo"
            inputMode="numeric"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="jornada" className="block text-sm font-semibold text-zinc-800">
            Tu jornada semanal (horas)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La legal son {JORNADA_LEGAL_SEMANAL}; tu convenio puede fijar menos.
          </p>
          <input
            id="jornada"
            inputMode="numeric"
            value={jornada}
            onChange={(e) => setJornada(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="acumuladas" className="block text-sm font-semibold text-zinc-800">
            Horas extras ya hechas este año
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sin contar las de este mes. Sirve para el tope anual de {TOPES_DECRETO_484.anual} horas.
          </p>
          <input
            id="acumuladas"
            inputMode="numeric"
            value={acumuladas}
            onChange={(e) => setAcumuladas(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="comunes" className="block text-sm font-semibold text-zinc-800">
            Horas extras del mes al 50%
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Días comunes: de lunes a sábado hasta las 13.
          </p>
          <input
            id="comunes"
            inputMode="numeric"
            value={comunes}
            onChange={(e) => setComunes(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="agravadas" className="block text-sm font-semibold text-zinc-800">
            Horas extras del mes al 100%
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sábado después de las 13, domingo y feriados.
          </p>
          <input
            id="agravadas"
            inputMode="numeric"
            value={agravadas}
            onChange={(e) => setAgravadas(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          Lo que te tienen que pagar por {numero(res.totalHoras)} horas extras (bruto)
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {formatARS(res.totalBruto, 2)}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          Sin el recargo del artículo 201 serían {formatARS(res.totalSinRecargo, 2)}: el recargo
          aporta {formatARS(res.aporteDelRecargo, 2)}. Neto estimado tras el 17% de aportes:{" "}
          {formatARS(res.neto, 2)}.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <tbody>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">Valor de tu hora normal</span>
                  <span className="block text-xs text-zinc-500">
                    remuneración ÷ {numero(res.horasMensuales)} horas al mes (jornada semanal ×
                    52/12). El divisor no está en ninguna ley.
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {formatARS(res.valorHora, 2)}
                </td>
              </tr>
              {res.valorHoraDivisor200 !== null && (
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      La misma hora, con el divisor {DIVISOR_USUAL_48}
                    </span>
                    <span className="block text-xs text-zinc-500">
                      el que usan muchísimas liquidaciones y convenios para la jornada de 48 horas
                      (8 × 25 días). Da {formatARS(res.diferenciaPorDivisor, 2)} más por hora, o{" "}
                      {formatARS((res.totalBrutoDivisor200 ?? 0) - res.totalBruto, 2)} más en el
                      mes. Si tu recibo o tu CCT fijan un divisor, ese manda.
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.valorHoraDivisor200, 2)}
                  </td>
                </tr>
              )}
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">
                    {numero(res.horasComunes)} horas al 50% (días comunes)
                  </span>
                  <span className="block text-xs text-zinc-500">
                    hora normal × 1,5, art. 201 primera parte
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {formatARS(res.importeComunes, 2)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">
                    {numero(res.horasAgravadas)} horas al 100% (sábado tarde, domingo, feriado)
                  </span>
                  <span className="block text-xs text-zinc-500">
                    hora normal × 2, art. 201 segunda parte
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {formatARS(res.importeAgravadas, 2)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">Aportes (17%)</span>
                  <span className="block text-xs text-zinc-500">
                    11% jubilación + 3% obra social + 3% PAMI: las horas extras son remuneración
                  </span>
                </td>
                <td className="py-2 text-right text-zinc-700">
                  −{formatARS(res.aportes.total, 2)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">Neto de las extras</span>
                  <span className="block text-xs text-zinc-500">
                    lo que suman en el bolsillo, además de tu sueldo
                  </span>
                </td>
                <td className="py-2 text-right text-lg font-bold text-zinc-900">
                  {formatARS(res.neto, 2)}
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">
                    Arrastre al aguinaldo, si este es tu mejor mes del semestre
                  </span>
                  <span className="block text-xs text-zinc-500">
                    el SAC es el 50% de la mayor remuneración mensual del semestre (art. 122 LCT):
                    las extras entran en esa base
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-emerald-800">
                  +{formatARS(res.impactoAguinaldo, 2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Si te las compensan con francos en vez de pagártelas
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Desde el {VIGENCIA_REFORMA} se puede pactar uno a uno con el empleador, por escrito.
            Cuánto vale el franco no lo dice la ley, así que hay dos lecturas:{" "}
            <strong>{numero(res.banco.horasSimple, 2)} horas</strong> si se compensa hora por hora, o{" "}
            <strong>{numero(res.banco.horasConRecargo, 2)} horas</strong> si el franco arrastra el
            recargo del art. 201. La diferencia son {numero(res.banco.diferencia, 2)} horas de
            descanso, equivalentes a {formatARS(res.banco.diferenciaEnPesos, 2)}.
          </p>
        </div>

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
          Estimación orientativa sobre el texto vigente desde el {VIGENCIA_REFORMA}, no una
          liquidación: no incluye adicionales del convenio, antigüedad, presentismo ni Ganancias.
          Para el recibo completo está{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            la calculadora de sueldo neto
          </Link>
          , y si trabajás media jornada,{" "}
          <Link href="/tiempo-parcial" className="font-medium text-emerald-700 hover:underline">
            la de tiempo parcial
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
