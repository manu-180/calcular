"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { VIGENCIA_REFORMA } from "@/data/propinas";
import { calcularPropinas } from "@/lib/propinas";
import { formatARS } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const claseSelect =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraPropinas() {
  const [remuneracion, setRemuneracion] = useState("950000");
  const [propinas, setPropinas] = useState("400000");
  const [anios, setAnios] = useState("6");
  const [meses, setMeses] = useState("0");

  const res = useMemo(
    () =>
      calcularPropinas({
        remuneracionMensual: Number(remuneracion) || 0,
        propinasMensuales: Number(propinas) || 0,
        anios: Number(anios) || 0,
        meses: Number(meses) || 0,
      }),
    [remuneracion, propinas, anios, meses],
  );

  const filas: { rubro: string; nota: string; vigente: number; anterior: number }[] = [
    {
      rubro: "Base remunerativa mensual",
      nota: "lo que cuenta como salario",
      vigente: res.vigente.base,
      anterior: res.anterior.base,
    },
    {
      rubro: "Medio aguinaldo (SAC del semestre)",
      nota: "50% de la mayor remuneración del semestre",
      vigente: res.vigente.sacSemestral,
      anterior: res.anterior.sacSemestral,
    },
    {
      rubro: `Vacaciones (${res.vigente.diasVacaciones} días corridos)`,
      nota: "art. 155 inc. a): la remuneración mensual dividida 25, por día",
      vigente: res.vigente.vacaciones,
      anterior: res.anterior.vacaciones,
    },
    {
      rubro: `Indemnización por antigüedad (${res.aniosComputables} ${res.aniosComputables === 1 ? "año" : "años"})`,
      nota: "art. 245: un mes de la base por año de servicio o fracción mayor de 3 meses",
      vigente: res.vigente.indemnizacionAntiguedad,
      anterior: res.anterior.indemnizacionAntiguedad,
    },
    {
      rubro: "Aportes del trabajador por mes (17%)",
      nota: "11% SIPA + 3% obra social + 3% PAMI: lo que se descuenta y lo que suma para jubilarse",
      vigente: res.vigente.aportesMensuales,
      anterior: res.anterior.aportesMensuales,
    },
  ];

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Tu sueldo bruto mensual, sin propinas
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Lo que figura en el recibo: básico, adicionales y todo lo que paga el empleador.
          </p>
          <input
            id="remuneracion"
            inputMode="numeric"
            value={remuneracion}
            onChange={(e) => setRemuneracion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="propinas" className="block text-sm font-semibold text-zinc-800">
            Propinas que cobrás por mes (promedio)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Lo que dejan los clientes, en efectivo o por tarjeta. No lo paga el empleador.
          </p>
          <input
            id="propinas"
            inputMode="numeric"
            value={propinas}
            onChange={(e) => setPropinas(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="anios" className="block text-sm font-semibold text-zinc-800">
            Años de antigüedad
          </label>
          <input
            id="anios"
            inputMode="numeric"
            value={anios}
            onChange={(e) => setAnios(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="meses" className="block text-sm font-semibold text-zinc-800">
            Meses sueltos de antigüedad
          </label>
          <select
            id="meses"
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            className={claseSelect}
          >
            {Array.from({ length: 12 }, (_, i) => i).map((m) => (
              <option key={m} value={m}>
                {m} {m === 1 ? "mes" : "meses"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          Lo que dejás de cobrar si te despiden, por sacar las propinas de la base
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {formatARS(res.difTotalDespido, 2)}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          {formatARS(res.difIndemnizacion, 2)} de indemnización por antigüedad +{" "}
          {formatARS(res.difSacAnual, 2)} de aguinaldo del año + {formatARS(res.difVacaciones, 2)}{" "}
          de vacaciones. Además, {formatARS(res.difAportesMensuales, 2)} por mes que ya no van a tu
          jubilación.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="pb-2 font-semibold">Rubro</th>
                <th className="pb-2 text-right font-semibold">
                  Texto vigente
                  <span className="block text-[10px] font-normal normal-case tracking-normal">
                    desde el {VIGENCIA_REFORMA}
                  </span>
                </th>
                <th className="pb-2 text-right font-semibold">
                  Criterio anterior
                  <span className="block text-[10px] font-normal normal-case tracking-normal">
                    con el art. 113 derogado
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.rubro} className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">{f.rubro}</span>
                    <span className="block text-xs text-zinc-500">{f.nota}</span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(f.vigente, 2)}
                  </td>
                  <td className="py-2 text-right text-zinc-600">{formatARS(f.anterior, 2)}</td>
                </tr>
              ))}
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
          Estimación orientativa, no una liquidación. Para el cálculo completo del despido (con
          preaviso, integración del mes, topes y vacaciones proporcionales), usá{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de indemnización
          </Link>
          ; para el aguinaldo exacto,{" "}
          <Link href="/aguinaldo" className="font-medium text-emerald-700 hover:underline">
            la de aguinaldo
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
