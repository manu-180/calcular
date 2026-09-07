"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ALICUOTAS,
  PERIODOS_CARENCIA,
  TOPE_COMISION_ANUAL,
  VIGENCIA_FAL,
} from "@/data/fal";
import {
  calcularFal,
  periodoEnPalabras,
  type EscenarioAlicuota,
  type TipoEmpleador,
} from "@/lib/fal";
import { formatARS } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraFal() {
  const [tipoEmpleador, setTipoEmpleador] = useState<TipoEmpleador>("pyme");
  const [escenario, setEscenario] = useState<EscenarioAlicuota>("vigente");
  const [masa, setMasa] = useState("18000000");
  const [enRifl, setEnRifl] = useState(false);
  const [primerPeriodo, setPrimerPeriodo] = useState("2026-12");
  const [remuneracion, setRemuneracion] = useState("1500000");
  const [antiguedad, setAntiguedad] = useState("5");

  const res = useMemo(
    () =>
      calcularFal({
        tipoEmpleador,
        masaSalarialMensual: Number(masa) || 0,
        escenario,
        enRifl,
        primerPeriodo,
        mejorRemuneracion: Number(remuneracion) > 0 ? Number(remuneracion) : undefined,
        aniosAntiguedad: Number(antiguedad) > 0 ? Number(antiguedad) : undefined,
      }),
    [tipoEmpleador, masa, escenario, enRifl, primerPeriodo, remuneracion, antiguedad],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-zinc-800">Tamaño de la empresa</legend>
        <p className="mt-0.5 text-xs text-zinc-500">
          La categoría es la de la Ley 24.467. Decide la alícuota del art. 60: {ALICUOTAS.vigentes.pyme}%
          para MiPyME y {ALICUOTAS.vigentes.grande}% para grandes empresas.
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {(
            [
              {
                valor: "pyme" as const,
                titulo: "Micro, Pequeña o Mediana",
                bajada: `${ALICUOTAS.vigentes.pyme}% hoy · techo ${ALICUOTAS.maximas.pyme}%`,
              },
              {
                valor: "grande" as const,
                titulo: "Gran empresa",
                bajada: `${ALICUOTAS.vigentes.grande}% hoy · techo ${ALICUOTAS.maximas.grande}%`,
              },
            ] as const
          ).map((op) => (
            <button
              key={op.valor}
              type="button"
              onClick={() => setTipoEmpleador(op.valor)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                tipoEmpleador === op.valor
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
          <label htmlFor="masa" className="block text-sm font-semibold text-zinc-800">
            Masa salarial mensual (base de contribuciones patronales)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La misma base sobre la que liquidás las contribuciones al SIPA, sumando toda la nómina
            alcanzada por el régimen.
          </p>
          <input
            id="masa"
            inputMode="numeric"
            value={masa}
            onChange={(e) => setMasa(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="escenario" className="block text-sm font-semibold text-zinc-800">
            Alícuota
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El segundo párrafo del art. 60 deja subirlas, pero sólo por decisión del Poder Ejecutivo
            y con aprobación previa de la Comisión Bicameral.
          </p>
          <select
            id="escenario"
            value={escenario}
            onChange={(e) => setEscenario(e.target.value as EscenarioAlicuota)}
            className={claseInput}
          >
            <option value="vigente">La que rige hoy</option>
            <option value="maxima">El techo que permite la ley</option>
          </select>
        </div>

        <div>
          <label htmlFor="primerPeriodo" className="block text-sm font-semibold text-zinc-800">
            Primera contribución integrada
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El mes desde el que corre la carencia de {PERIODOS_CARENCIA} períodos (art. 15 del
            Decreto 408/2026).
          </p>
          <input
            id="primerPeriodo"
            type="month"
            value={primerPeriodo}
            onChange={(e) => setPrimerPeriodo(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-300 bg-white p-4">
            <input
              type="checkbox"
              checked={enRifl}
              onChange={(e) => setEnRifl(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <span>
              <span className="block text-sm font-semibold text-zinc-800">
                Las relaciones están alcanzadas por el RIFL
              </span>
              <span className="mt-0.5 block text-xs text-zinc-500">
                El art. 76 excluye ese caso de la reducción de contribuciones patronales «mientras
                persista sus efectos». Es el único supuesto en que el FAL es un costo adicional.
              </span>
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Sueldo de referencia <span className="font-normal">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Para dimensionar una contingencia: la mejor remuneración mensual, normal y habitual de un
            trabajador.
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
          <label htmlFor="antiguedad" className="block text-sm font-semibold text-zinc-800">
            Años de antigüedad <span className="font-normal">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Un sueldo por año, que es el núcleo del art. 245 de la LCT.
          </p>
          <input
            id="antiguedad"
            inputMode="numeric"
            value={antiguedad}
            onChange={(e) => setAntiguedad(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Cargá una masa salarial mayor que cero y el mes de la primera contribución.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Contribución mensual al Fondo ({res.alicuota}% de la base, art. 60)
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.contribucionMensual, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {formatARS(res.contribucionAnual, 2)} por año.{" "}
            {res.costoNetoMensual === 0 ? (
              <>
                <strong>Costo laboral adicional: cero.</strong> Esa misma suma se detrae de tus
                contribuciones patronales (art. 76 y art. 24 del decreto).
              </>
            ) : (
              <>
                <strong>
                  Costo laboral adicional: {formatARS(res.costoNetoMensual, 2)} por mes.
                </strong>{" "}
                Por el RIFL, no corresponde la reducción del art. 76.
              </>
            )}
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Concepto</th>
                  <th className="py-2 pl-3 text-right font-medium text-zinc-600">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Contribución mensual al FAL (art. 60)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {res.alicuota}% de la base de contribuciones patronales al SIPA
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {formatARS(res.contribucionMensual, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Reducción de contribuciones patronales (art. 76)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      equivalente a la alícuota del FAL, salvo relaciones alcanzadas por el RIFL
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {res.reduccionPatronal > 0 ? `− ${formatARS(res.reduccionPatronal, 2)}` : "—"}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.reduccionPatronal > 0 ? "se detrae mes a mes" : "no corresponde (RIFL)"}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">
                    Impacto neto en el costo laboral del mes
                  </td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-zinc-900">
                    {formatARS(res.costoNetoMensual, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Acumulado al cerrar la carencia ({PERIODOS_CARENCIA} períodos)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      sólo aportes: el rendimiento depende del fondo elegido y no tiene número legal
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {formatARS(res.acumuladoEnCarencia, 2)}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Comisión anual máxima de la administradora (art. 71)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {TOPE_COMISION_ANUAL}% global sobre los activos administrados, calculado acá
                      sobre el acumulado de un año de aportes
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    hasta {formatARS(res.comisionAnualMaxima, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                Desde cuándo responde el fondo
              </p>
              <p className="mt-1 text-xl font-bold text-zinc-900">
                {periodoEnPalabras(res.desdeCuandoResponde)}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Con la primera contribución integrada en {periodoEnPalabras(res.primerPeriodo)}, la
                carencia del art. 65 cierra con el período de{" "}
                {periodoEnPalabras(res.ultimoPeriodoCarencia)}: seis períodos «completos y
                consecutivos», como precisa el art. 15 del Decreto 408/2026.
              </p>
            </div>
            {res.caso && (
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                  Una indemnización de {formatARS(res.caso.indemnizacion, 2)}
                </p>
                <p className="mt-1 text-xl font-bold text-zinc-900">
                  {res.caso.mesesParaCubrirla.toLocaleString("es-AR", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  meses de aporte
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Es lo que tarda la cuenta en juntar ese importe, sin contar rendimientos. Al
                  cerrar la carencia tendrías cubierto el{" "}
                  {res.caso.cubiertoEnCarencia.toLocaleString("es-AR", {
                    maximumFractionDigits: 1,
                  })}
                  % de esa contingencia. El resto se paga igual: el fondo asiste, no reemplaza.
                </p>
              </div>
            )}
          </div>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            El régimen arranca el {VIGENCIA_FAL}. ¿Querés la indemnización completa, con fracciones y
            tope de convenio?{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              calculadora de despido sin causa
            </Link>
            . ¿Estás mirando el RIFL?{" "}
            <Link href="/rifl" className="font-medium text-emerald-700 hover:underline">
              el régimen de formalización
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
