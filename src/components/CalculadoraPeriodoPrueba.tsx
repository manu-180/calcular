"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PERIODO_PRUEBA,
  PREAVISO_ANTERIOR_DIAS,
  VIGENCIA_REFORMA,
} from "@/data/periodo-prueba";
import { calcularPeriodoPrueba } from "@/lib/periodo-prueba";
import { formatARS, errorMonto, primerError, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const numero = (n: number, dec = 0) =>
  n.toLocaleString("es-AR", { maximumFractionDigits: dec });

const TOPES = [
  { valor: PERIODO_PRUEBA.mesesBase, label: "6 meses (el de la ley)" },
  { valor: 8, label: "8 meses (por convenio, empresas de 6 a 100)" },
  { valor: 12, label: "12 meses (por convenio, empresas de hasta 5)" },
];

export function CalculadoraPeriodoPrueba() {
  const [sueldo, setSueldo] = useState("1200000");
  const [ingreso, setIngreso] = useState("2026-04-01");
  const [egreso, setEgreso] = useState("2026-08-14");
  const [tope, setTope] = useState(String(PERIODO_PRUEBA.mesesBase));

  const error = primerError({
    "Remuneración mensual": errorMonto(sueldo),
  });

  const res = useMemo(
    () =>
      calcularPeriodoPrueba({
        sueldoMensual: parseMonto(sueldo),
        ingresoISO: ingreso,
        egresoISO: egreso,
        topeMeses: Number(tope) || PERIODO_PRUEBA.mesesBase,
      }),
    [sueldo, ingreso, egreso, tope],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sueldo" className="block text-sm font-semibold text-zinc-800">
            Tu remuneración mensual bruta
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El sueldo de convenio con sus adicionales fijos, antes de descuentos.
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
          <label htmlFor="ingreso" className="block text-sm font-semibold text-zinc-800">
            Fecha de ingreso
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La de inicio real de la relación, no la del alta si son distintas.
          </p>
          <input
            id="ingreso"
            type="date"
            value={ingreso}
            onChange={(e) => setIngreso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="egreso" className="block text-sm font-semibold text-zinc-800">
            Último día de trabajo
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Es la fecha que decide qué texto del art. 231 se aplica.
          </p>
          <input
            id="egreso"
            type="date"
            value={egreso}
            onChange={(e) => setEgreso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="tope" className="block text-sm font-semibold text-zinc-800">
            Duración del período de prueba que te aplica
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La ley son {PERIODO_PRUEBA.mesesBase} meses. Sólo un convenio colectivo puede ampliarlo,
            y sólo en empresas chicas: si tu CCT no lo dice, son {PERIODO_PRUEBA.mesesBase}.
          </p>
          <select
            id="tope"
            value={tope}
            onChange={(e) => setTope(e.target.value)}
            className={claseInput}
          >
            {TOPES.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Liquidación final bruta, con {numero(res.mesesTrabajados)}{" "}
            {res.mesesTrabajados === 1 ? "mes" : "meses"} completos trabajados (
            {numero(res.diasTrabajadosTotales)} días)
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.totalACobrar, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.rigeTextoNuevo ? (
              <>
                Sin preaviso: el art. 231 dejó de exigirlo el {VIGENCIA_REFORMA}. Con el texto
                anterior, este mismo caso habría cerrado en{" "}
                {formatARS(res.totalTextoAnterior, 2)} — {formatARS(res.diferencia, 2)} más.
              </>
            ) : (
              <>
                Incluye {PREAVISO_ANTERIOR_DIAS} días de preaviso ({formatARS(res.diferencia, 2)}),
                porque tu contrato terminó antes del {VIGENCIA_REFORMA}.
              </>
            )}
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Días trabajados del último mes ({numero(res.diasDelMes)})
                    </span>
                    <span className="block text-xs text-zinc-500">
                      a razón de {formatARS(res.valorDia, 2)} por día (sueldo ÷ 30)
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.sueldoDelMes, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Aguinaldo proporcional (art. 123)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {numero(res.sac.diasTrabajadosSemestre)} de los {numero(res.sac.diasSemestre)}{" "}
                      días del semestre. Se cobra «por cualquier causa»: el período de prueba no es una
                      excepción.
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.sac.importe, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Vacaciones proporcionales ({numero(res.vacaciones.dias)} días)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      art. 153: un día por cada 20 hábiles de trabajo efectivo (van{" "}
                      {numero(res.vacaciones.diasHabilesTrabajados)}), pagados a{" "}
                      {formatARS(res.valorDiaVacaciones, 2)} (sueldo ÷ 25, art. 155)
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.vacaciones.importe, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Aguinaldo sobre las vacaciones proporcionales
                    </span>
                    <span className="block text-xs text-zinc-500">
                      la doceava parte del renglón anterior: el que más veces falta en las
                      liquidaciones
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.vacaciones.sacSobreVacaciones, 2)}
                  </td>
                </tr>
                <tr
                  className={`border-b border-zinc-200 align-top ${
                    res.rigeTextoNuevo ? "text-rose-800" : ""
                  }`}
                >
                  <td className="py-2 pr-3">
                    <span className="font-medium">
                      Preaviso de {PREAVISO_ANTERIOR_DIAS} días (art. 231 inc. b)
                    </span>
                    <span className="block text-xs opacity-80">
                      {res.rigeTextoNuevo
                        ? "Ya no corresponde: la Ley 27.802 sacó el período de prueba de la escala del preaviso y agregó que «no se requerirá la obligación de preaviso»."
                        : "Corresponde: tu contrato terminó antes del 6 de marzo de 2026 y la reforma no es retroactiva."}
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold">
                    {res.rigeTextoNuevo ? (
                      <span className="text-rose-800">
                        <span className="line-through opacity-60">
                          {formatARS(res.diferencia, 2)}
                        </span>{" "}
                        → {formatARS(0, 2)}
                      </span>
                    ) : (
                      formatARS(res.preavisoQueCorresponde, 2)
                    )}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Total bruto a cobrar</span>
                    <span className="block text-xs text-zinc-500">
                      sobre el sueldo y el aguinaldo se descuentan aportes (
                      {formatARS(res.aportes.total, 2)}); las vacaciones no gozadas son
                      indemnizatorias y no los pagan
                    </span>
                  </td>
                  <td className="py-2 text-right text-lg font-bold text-zinc-900">
                    {formatARS(res.totalACobrar, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
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
            Estimación orientativa, no una liquidación: no incluye adicionales del convenio,
            presentismo ni Ganancias. Si el contrato ya salió del período de prueba, lo que
            corresponde se calcula en{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la calculadora de indemnización por despido
            </Link>
            .
          </p>
        </div>
        </>
      )}
    </div>
  );
}
