"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ARTICULO_DEROGADO, SUPUESTOS_RESERVA } from "@/data/reserva-empleo";
import { calcularReservaEmpleo } from "@/lib/reserva-empleo";
import { formatARS, errorMonto, primerError, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";
import type { SupuestoReserva } from "@/data/reserva-empleo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function CalculadoraReservaEmpleo() {
  const [remuneracion, setRemuneracion] = useState("1400000");
  const [ingreso, setIngreso] = useState("2017-04-03");
  const [inicioReserva, setInicioReserva] = useState("2021-12-10");
  const [finFuncion, setFinFuncion] = useState("2025-12-10");
  const [egreso, setEgreso] = useState("2026-08-31");
  const [supuestoId, setSupuestoId] = useState<SupuestoReserva["id"]>("electivo");

  const error = primerError({
    "Mejor remuneración": errorMonto(remuneracion),
  });

  const res = useMemo(
    () =>
      calcularReservaEmpleo({
        mejorRemuneracion: parseMonto(remuneracion),
        ingreso,
        inicioReserva,
        finFuncion,
        egreso,
        supuestoId,
      }),
    [remuneracion, ingreso, inicioReserva, finFuncion, egreso, supuestoId],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="supuesto" className="block text-sm font-semibold text-zinc-800">
            Por qué dejaste de prestar servicios
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Los tres supuestos de reserva del empleo del Título X de la LCT. Dos de ellos eran los
            que el art. {ARTICULO_DEROGADO} nombraba; el tercero conserva artículo propio.
          </p>
          <select
            id="supuesto"
            value={supuestoId}
            onChange={(e) => setSupuestoId(e.target.value as SupuestoReserva["id"])}
            className={claseInput}
          >
            {SUPUESTOS_RESERVA.map((s) => (
              <option key={s.id} value={s.id}>
                Art. {s.articulo} — {s.quien}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Mejor remuneración mensual, normal y habitual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La base del art. 245. Los meses del período de reserva no se promedian: los arts. 214 y
            215 dicen que ese tiempo «no será considerado para determinar los promedios de
            remuneraciones».
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
            Ingreso a la empresa
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
          <label htmlFor="inicioReserva" className="block text-sm font-semibold text-zinc-800">
            Dejaste de prestar servicios
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Acá arranca el período de reserva.</p>
          <input
            id="inicioReserva"
            type="date"
            value={inicioReserva}
            onChange={(e) => setInicioReserva(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="finFuncion" className="block text-sm font-semibold text-zinc-800">
            Concluyó la función o el servicio
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Desde acá corren los 30 días para reincorporarte.
          </p>
          <input
            id="finFuncion"
            type="date"
            value={finFuncion}
            onChange={(e) => setFinFuncion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="egreso" className="block text-sm font-semibold text-zinc-800">
            Despido o no reincorporación
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La fecha en que te despidieron o en que quedó claro que no te reincorporaban.
          </p>
          <input
            id="egreso"
            type="date"
            value={egreso}
            onChange={(e) => setEgreso(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá las fechas y el sueldo. Tienen que ir en este orden: ingreso, inicio de la reserva,
          fin de la función y, por último, el despido o la no reincorporación.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Lo que se juega en el cómputo del período de reserva
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.diferencia, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Es la diferencia entre las dos lecturas: {formatARS(res.conReserva.totalIndemnizatorio, 2)}{" "}
            computando el período de reserva (lo que el art. {ARTICULO_DEROGADO} decía por escrito
            hasta el 6 de marzo de 2026) contra{" "}
            {formatARS(res.sinReserva.totalIndemnizatorio, 2)} sin computarlo.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[38rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Rubro</th>
                  <th className="py-2 text-right font-semibold text-emerald-800">
                    Con el período de reserva
                    <span className="block text-xs font-normal text-zinc-500">
                      el texto del art. {ARTICULO_DEROGADO} derogado
                    </span>
                  </th>
                  <th className="py-2 pl-3 text-right font-semibold text-rose-800">
                    Sin computarlo
                    <span className="block text-xs font-normal text-zinc-500">
                      ingreso equivalente: {res.ingresoEquivalente}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Antigüedad</span>
                    <span className="block text-xs text-zinc-500">
                      el período de reserva duró {res.duracionReserva.anios} años y{" "}
                      {res.duracionReserva.meses} meses ({res.diasDeReserva} días)
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {res.conReserva.antiguedad.anios} a {res.conReserva.antiguedad.meses} m
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {res.sinReserva.antiguedad.anios} a {res.sinReserva.antiguedad.meses} m
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Indemnización por antigüedad (art. 245)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      un mes por año o fracción mayor de 3 meses
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.conReserva.indemnizacionAntiguedad, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.conReserva.aniosComputables}{" "}
                      {res.conReserva.aniosComputables === 1 ? "año" : "años"}
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {formatARS(res.sinReserva.indemnizacionAntiguedad, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.sinReserva.aniosComputables}{" "}
                      {res.sinReserva.aniosComputables === 1 ? "año" : "años"}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Preaviso omitido (arts. 231/232)</span>
                    <span className="block text-xs text-zinc-500">
                      con su SAC; 1 mes hasta 5 años de antigüedad, 2 meses si los supera
                      {res.cambiaElPreaviso ? ". Acá el umbral lo define la reserva" : ""}
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {res.conReserva.preaviso
                      ? formatARS(res.conReserva.preaviso.monto + res.conReserva.preaviso.sac, 2)
                      : "—"}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.conReserva.preaviso ? `${res.conReserva.preaviso.meses} mes(es)` : ""}
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {res.sinReserva.preaviso
                      ? formatARS(res.sinReserva.preaviso.monto + res.sinReserva.preaviso.sac, 2)
                      : "—"}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.sinReserva.preaviso ? `${res.sinReserva.preaviso.meses} mes(es)` : ""}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Integración del mes de despido (art. 233)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      los días que faltan hasta fin de mes, con su SAC
                    </span>
                  </td>
                  <td className="py-2 text-right text-zinc-600">
                    {res.conReserva.integracion
                      ? formatARS(
                          res.conReserva.integracion.monto + res.conReserva.integracion.sac,
                          2,
                        )
                      : "—"}
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-600">
                    {res.sinReserva.integracion
                      ? formatARS(
                          res.sinReserva.integracion.monto + res.sinReserva.integracion.sac,
                          2,
                        )
                      : "—"}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-semibold text-zinc-900">
                      Total de los rubros del art. {ARTICULO_DEROGADO}
                    </span>
                    <span className="block text-xs text-zinc-500">
                      «las indemnizaciones que le correspondan por despido injustificado y por falta
                      u omisión del preaviso»
                    </span>
                  </td>
                  <td className="py-2 text-right text-base font-bold text-emerald-800">
                    {formatARS(res.conReserva.totalIndemnizatorio, 2)}
                  </td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-rose-800">
                    {formatARS(res.sinReserva.totalIndemnizatorio, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600">
            Plazo para reincorporarte: hasta el{" "}
            <strong className="text-zinc-900">{fechaLarga(res.limiteReincorporacion)}</strong> (30
            días después de concluida la función, art. {res.supuesto.articulo}).{" "}
            {res.egresoFueraDeVentana
              ? "El egreso que cargaste es posterior: la obligación ya estaba vencida."
              : "El egreso que cargaste cae dentro de ese plazo."}
          </p>

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
            Estimación orientativa, no una liquidación. Para el despido completo (con vacaciones
            proporcionales y aguinaldo), usá{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la calculadora de indemnización
            </Link>
            ; si el cargo es gremial, mirá también{" "}
            <Link
              href="/despido-de-delegado-gremial"
              className="font-medium text-emerald-700 hover:underline"
            >
              la tutela sindical de la Ley 23.551
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
