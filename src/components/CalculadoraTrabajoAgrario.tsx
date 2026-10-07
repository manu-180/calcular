"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MESES_PERIODO_PRUEBA_AGRARIO,
  MESES_PERIODO_PRUEBA_LCT,
  MESES_PISO_ART22,
} from "@/data/trabajo-agrario";
import { calcularDespidoRural, type ModalidadRural } from "@/lib/trabajo-agrario";
import { formatARS } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraTrabajoAgrario() {
  const [modalidad, setModalidad] = useState<ModalidadRural>("permanente");
  const [remuneracion, setRemuneracion] = useState("1100000");
  const [ingreso, setIngreso] = useState("2026-01-15");
  const [egreso, setEgreso] = useState("2026-08-18");
  const [tope, setTope] = useState("");
  const [devengadas, setDevengadas] = useState("3300000");
  const [mesesEfectivos, setMesesEfectivos] = useState("");

  const res = useMemo(
    () =>
      calcularDespidoRural({
        modalidad,
        ingresoISO: ingreso,
        egresoISO: egreso,
        mejorRemuneracion: Number(remuneracion) || 0,
        topeCCT: Number(tope) > 0 ? Number(tope) : undefined,
        remuneracionesDevengadas: Number(devengadas) > 0 ? Number(devengadas) : undefined,
        mesesEfectivos: Number(mesesEfectivos) > 0 ? Number(mesesEfectivos) : undefined,
      }),
    [modalidad, ingreso, egreso, remuneracion, tope, devengadas, mesesEfectivos],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-zinc-800">Modalidad del contrato</legend>
        <p className="mt-0.5 text-xs text-zinc-500">
          Es lo primero que decide todo: el permanente se extingue por el Título XII de la LCT, el
          temporario se extingue con la temporada.
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {(
            [
              {
                valor: "permanente" as const,
                titulo: "Permanente de prestación continua",
                bajada: `Art. 16 · período de prueba de ${MESES_PERIODO_PRUEBA_AGRARIO} meses`,
              },
              {
                valor: "temporario" as const,
                titulo: "Temporario (cíclico o estacional)",
                bajada: "Art. 17 · cosecha, esquila, ferias y remates",
              },
            ] as const
          ).map((op) => (
            <button
              key={op.valor}
              type="button"
              onClick={() => setModalidad(op.valor)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                modalidad === op.valor
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                  : "border-zinc-300 bg-white hover:border-emerald-300"
              }`}
            >
              <span className="block text-sm font-semibold text-zinc-900">{op.titulo}</span>
              <span className="mt-0.5 block text-xs text-zinc-500">{op.bajada}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Mejor remuneración mensual, normal y habitual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            En bruto. Es la base del art. 245 de la LCT y también la del piso de {MESES_PISO_ART22}{" "}
            meses del art. 22 de la Ley 26.727.
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
          <label htmlFor="ingreso" className="block text-sm font-semibold text-zinc-800">
            {modalidad === "permanente" ? "Fecha de ingreso" : "Inicio de la temporada"}
          </label>
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
            {modalidad === "permanente" ? "Fecha del despido" : "Fin de la temporada"}
          </label>
          <input
            id="egreso"
            type="date"
            value={egreso}
            onChange={(e) => setEgreso(e.target.value)}
            className={claseInput}
          />
        </div>

        {modalidad === "permanente" ? (
          <div className="sm:col-span-2">
            <label htmlFor="tope" className="block text-sm font-semibold text-zinc-800">
              Tope indemnizatorio del convenio <span className="font-normal">(opcional)</span>
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Si lo conocés. Recorta la base del art. 245, pero no el piso del art. 22: ese artículo
              no menciona tope alguno.
            </p>
            <input
              id="tope"
              inputMode="numeric"
              value={tope}
              onChange={(e) => setTope(e.target.value)}
              placeholder="sin tope"
              className={claseInput}
            />
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="devengadas" className="block text-sm font-semibold text-zinc-800">
                Total de remuneraciones devengadas en la temporada
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Todo lo que te liquidaron por el ciclo, en bruto. El 10% del art. 20 se calcula
                sobre ese total, no sobre el último sueldo.
              </p>
              <input
                id="devengadas"
                inputMode="numeric"
                value={devengadas}
                onChange={(e) => setDevengadas(e.target.value)}
                className={claseInput}
              />
            </div>
            <div>
              <label
                htmlFor="mesesEfectivos"
                className="block text-sm font-semibold text-zinc-800"
              >
                Meses trabajados sumando todas las temporadas{" "}
                <span className="font-normal">(opcional)</span>
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Sólo si el mismo empleador te contrató más de una vez. Sirve para ver lo que el
                artículo 18 derogado te reconocía y hoy ya no.
              </p>
              <input
                id="mesesEfectivos"
                inputMode="numeric"
                value={mesesEfectivos}
                onChange={(e) => setMesesEfectivos(e.target.value)}
                placeholder="una sola temporada"
                className={claseInput}
              />
            </div>
          </>
        )}
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá las fechas y el sueldo: el ingreso tiene que ser anterior al egreso y la
          remuneración, mayor que cero.
        </p>
      ) : res.modalidad === "permanente" ? (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Total a cobrar por el despido (Ley 26.727 art. 16 → Título XII de la LCT)
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.totalGeneral, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {formatARS(res.totalIndemnizatorio, 2)} de indemnizaciones más{" "}
            {formatARS(res.liquidacionFinal.total, 2)} de liquidación final, con{" "}
            {res.antiguedad.anios} año(s) y {res.antiguedad.meses} mes(es) de antigüedad
            {res.enPeriodoPrueba
              ? `, dentro del período de prueba de ${MESES_PERIODO_PRUEBA_AGRARIO} meses del artículo 16.`
              : "."}
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Rubro</th>
                  <th className="py-2 pl-3 text-right font-medium text-zinc-600">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Indemnización por antigüedad (art. 245 LCT, con el piso del art. 22)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      un mes por año o fracción mayor de 3 meses, y nunca menos de{" "}
                      {MESES_PISO_ART22} meses de sueldo
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {formatARS(res.indemnizacionAntiguedad, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.enPeriodoPrueba
                        ? "en período de prueba: no corresponde"
                        : `${res.art245.aniosComputables} año(s) computable(s)${
                            res.pisoAplicado ? " · manda el piso del art. 22" : ""
                          }`}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Preaviso omitido (arts. 231/232 LCT)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      con su SAC. La Ley 26.727 no tiene preaviso propio
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {res.preaviso ? formatARS(res.preaviso.monto + res.preaviso.sac, 2) : "—"}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.preaviso
                        ? `${res.preaviso.meses} mes(es)`
                        : "en período de prueba no se preavisa"}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Integración del mes de despido (art. 233 LCT)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      los días que faltan hasta fin de mes, con su SAC
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {res.integracion
                      ? formatARS(res.integracion.monto + res.integracion.sac, 2)
                      : "—"}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.integracion
                        ? `${res.integracion.dias} día(s)`
                        : res.enPeriodoPrueba
                          ? "el art. 233 la excluye en período de prueba"
                          : "el despido cayó a fin de mes"}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      SAC proporcional y vacaciones proporcionales
                    </span>
                    <span className="block text-xs text-zinc-500">
                      arts. 123 y 156 de la LCT, aplicables al rural por el art. 50 de la Ley 26.727
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {formatARS(res.liquidacionFinal.total, 2)}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">Total</td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-zinc-900">
                    {formatARS(res.totalGeneral, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {!res.enPeriodoPrueba && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                  Art. 245 de la LCT, solo
                </p>
                <p className="mt-1 text-xl font-bold text-zinc-900">
                  {formatARS(res.art245.monto, 2)}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  {res.art245.aniosComputables} año(s) computable(s)
                  {res.art245.topeAplicado ? ", con el tope de convenio aplicado" : ""}.
                </p>
              </div>
              <div
                className={`rounded-xl border p-4 ${
                  res.pisoAplicado
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  Piso rural del art. 22 ({MESES_PISO_ART22} meses)
                </p>
                <p className="mt-1 text-xl font-bold text-zinc-900">
                  {formatARS(res.pisoArt22, 2)}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  {res.pisoAplicado ? (
                    <>
                      Es el que manda: suma {formatARS(res.loQueAgregaElPiso, 2)} por encima del
                      art. 245. La LCT, para el resto de los trabajadores, sólo garantiza un mes.
                    </>
                  ) : (
                    <>
                      En tu caso no se activa, porque el art. 245 ya lo supera. Existe igual y es el
                      doble del piso de un mes de la LCT.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            ¿El trabajo no era rural?{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              calculadora de despido sin causa
            </Link>
            . ¿Dudás con el período de prueba urbano?{" "}
            <Link href="/periodo-de-prueba" className="font-medium text-emerald-700 hover:underline">
              los {MESES_PERIODO_PRUEBA_LCT} meses del art. 92 bis
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Total a cobrar al concluir la temporada (Ley 26.727, arts. 17 y 20)
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.totalGeneral, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            No hay indemnización por antigüedad: el contrato temporario se extingue con el ciclo.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Rubro</th>
                  <th className="py-2 pl-3 text-right font-medium text-zinc-600">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Indemnización sustitutiva de vacaciones (art. 20)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      10% del total de remuneraciones devengadas en el ciclo
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {formatARS(res.sustitutivaVacaciones, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">SAC proporcional</span>
                    <span className="block text-xs text-zinc-500">
                      arts. 121 y 123 de la LCT, por el semestre en el que terminó el ciclo
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {formatARS(res.sac.monto, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.sac.dias} de {res.sac.totalDiasSemestre} días del semestre
                    </span>
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">Total</td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-zinc-900">
                    {formatARS(res.totalGeneral, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {res.loQueReconociaElArt18 && (
            <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                Lo que reconocía el art. 18, derogado el 6 de marzo de 2026
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {formatARS(res.loQueReconociaElArt18.monto, 2)}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Indemnización por antigüedad como <strong>permanente discontinuo</strong>, con la
                antigüedad computada «en función de los períodos efectivamente trabajados» (art. 21,
                también derogado): {res.loQueReconociaElArt18.antiguedad.anios} año(s) y{" "}
                {res.loQueReconociaElArt18.antiguedad.meses} mes(es) ={" "}
                {res.loQueReconociaElArt18.art245.aniosComputables} año(s) computable(s), con el
                piso de {MESES_PISO_ART22} meses del art. 22. A eso, el art. 21 le sumaba además un
                reclamo de daños y perjuicios del derecho común que fijaba el juez y que{" "}
                <strong>no se calcula acá</strong>: no tenía fórmula legal.
              </p>
            </div>
          )}

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            ¿Tu contrato era permanente y te despidieron? Cambiá la modalidad arriba. ¿Buscás la
            liquidación común?{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              despido sin causa
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
