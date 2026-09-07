"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { VIGENCIA_REFORMA } from "@/data/trabajo-mujeres";
import { calcularTrabajoMujeres } from "@/lib/trabajo-mujeres";
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

const horas = (n: number) =>
  `${n.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} h`;

export function CalculadoraTrabajoMujeres() {
  const [horasDiarias, setHorasDiarias] = useState("8");
  const [diasPorSemana, setDiasPorSemana] = useState("5");
  const [descanso, setDescanso] = useState("2");
  const [insalubre, setInsalubre] = useState("no");
  const [enConvenio, setEnConvenio] = useState("no");
  const [sueldo, setSueldo] = useState("950000");

  const res = useMemo(
    () =>
      calcularTrabajoMujeres({
        horasDiarias: Number(horasDiarias.replace(",", ".")) || 0,
        diasPorSemana: Number(diasPorSemana) || 0,
        descansoMediodia: Number(descanso.replace(",", ".")) || 0,
        insalubreDeclarada: insalubre === "si",
        enConvenio: enConvenio === "si",
        sueldoMensual: Number(sueldo) || 0,
      }),
    [horasDiarias, diasPorSemana, descanso, insalubre, enConvenio, sueldo],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="horasDiarias" className="block text-sm font-semibold text-zinc-800">
            Horas que trabajás por día
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sin contar el descanso: sólo el tiempo a disposición del empleador (art. 197).
          </p>
          <input
            id="horasDiarias"
            inputMode="decimal"
            value={horasDiarias}
            onChange={(e) => setHorasDiarias(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="diasPorSemana" className="block text-sm font-semibold text-zinc-800">
            Días por semana
          </label>
          <select
            id="diasPorSemana"
            value={diasPorSemana}
            onChange={(e) => setDiasPorSemana(e.target.value)}
            className={claseSelect}
          >
            {[1, 2, 3, 4, 5, 6].map((d) => (
              <option key={d} value={d}>
                {d} {d === 1 ? "día" : "días"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="descanso" className="block text-sm font-semibold text-zinc-800">
            Descanso del mediodía que se pierde
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El art. 174 derogado fijaba dos horas. Cargá el corte real de tu jornada partida.
          </p>
          <input
            id="descanso"
            inputMode="decimal"
            value={descanso}
            onChange={(e) => setDescanso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="insalubre" className="block text-sm font-semibold text-zinc-800">
            ¿La autoridad declaró insalubre la tarea o el lugar?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El art. 200 exige declaración previa: sin ella no hay insalubridad legal.
          </p>
          <select
            id="insalubre"
            value={insalubre}
            onChange={(e) => setInsalubre(e.target.value)}
            className={claseSelect}
          >
            <option value="no">No, o no lo sé</option>
            <option value="si">Sí, está declarada</option>
          </select>
        </div>

        <div>
          <label htmlFor="enConvenio" className="block text-sm font-semibold text-zinc-800">
            ¿El descanso está en tu convenio o contrato?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si está escrito ahí, sobrevive a la derogación de la ley (art. 8 LCT).
          </p>
          <select
            id="enConvenio"
            value={enConvenio}
            onChange={(e) => setEnConvenio(e.target.value)}
            className={claseSelect}
          >
            <option value="no">No, sólo lo daba la ley</option>
            <option value="si">Sí, lo prevé el convenio o el contrato</option>
          </select>
        </div>

        <div>
          <label htmlFor="sueldo" className="block text-sm font-semibold text-zinc-800">
            Sueldo bruto mensual (opcional)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sólo se usa para valorizar las horas que queden por encima del tope.
          </p>
          <input
            id="sueldo"
            inputMode="numeric"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          Horas de tu día que dejan de estar comprometidas si te pasan a horario continuo
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {horas(res.liberadasPorDia)} por día
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          {horas(res.liberadasPorSemana)} por semana y {horas(res.liberadasPorMes)} por mes. Las
          horas trabajadas no cambian: seguís haciendo {horas(res.horasDiarias)} por día y{" "}
          {horas(res.horasSemanales)} por semana. Lo que se achica es la amplitud —el tiempo entre
          la primera entrada y la última salida—, que pasa de {horas(res.amplitudAntes)} a{" "}
          {horas(res.amplitudAhora)}.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="pb-2 font-semibold">Concepto</th>
                <th className="pb-2 text-right font-semibold">
                  Hasta el 6/3/2026
                  <span className="block text-[10px] font-normal normal-case tracking-normal">
                    con el art. 174 vigente
                  </span>
                </th>
                <th className="pb-2 text-right font-semibold">
                  Texto vigente
                  <span className="block text-[10px] font-normal normal-case tracking-normal">
                    desde el {VIGENCIA_REFORMA}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">Pausa obligatoria al mediodía</span>
                  <span className="block text-xs text-zinc-500">
                    sólo para la mujer que trabajaba mañana y tarde
                  </span>
                </td>
                <td className="py-2 text-right text-zinc-600">2 h</td>
                <td className="py-2 text-right font-semibold text-zinc-900">ninguna</td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">Amplitud del día</span>
                  <span className="block text-xs text-zinc-500">
                    de la primera entrada a la última salida
                  </span>
                </td>
                <td className="py-2 text-right text-zinc-600">{horas(res.amplitudAntes)}</td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {horas(res.amplitudAhora)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">Tope de jornada que te rige</span>
                  <span className="block text-xs text-zinc-500">
                    {res.regimen === "insalubre"
                      ? "insalubridad declarada: art. 200 de la LCT"
                      : "régimen general: art. 196 de la LCT y Ley 11.544"}
                  </span>
                </td>
                <td className="py-2 text-right text-zinc-600">
                  {res.topeDiario} h / {res.topeSemanal} h
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {res.topeDiario} h / {res.topeSemanal} h
                </td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">
                    Presunción del art. 195 por tarea prohibida
                  </span>
                  <span className="block text-xs text-zinc-500">
                    responsabilidad del empleador sin admitirse prueba en contrario
                  </span>
                </td>
                <td className="py-2 text-right text-zinc-600">alcanzaba a las mujeres</td>
                <td className="py-2 text-right font-semibold text-zinc-900">no las alcanza</td>
              </tr>
            </tbody>
          </table>
        </div>

        {res.excedenteSemanal > 0 && res.valorHora > 0 && (
          <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50/70 px-3 py-2 text-sm text-rose-900">
            Las {horas(res.excedenteSemanal)} semanales que pasan del tope valen alrededor de{" "}
            {formatARS(res.excedenteMensualEnPesos, 2)} por mes con el recargo del 50% del art. 201
            (valor hora estimado: {formatARS(res.valorHora, 2)}). Es una estimación de orden de
            magnitud: el cálculo fino está en la calculadora de horas extras.
          </p>
        )}

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
          Orientativo, no una liquidación. Para las horas suplementarias con recargo, el banco de
          horas y los topes del Decreto 484/2000 está{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            la calculadora de horas extras
          </Link>
          ; si trabajás menos de la jornada completa,{" "}
          <Link href="/tiempo-parcial" className="font-medium text-emerald-700 hover:underline">
            la de media jornada
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
