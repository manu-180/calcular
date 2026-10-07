"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TIPOS_OPERACION, type TipoOperacion } from "@/data/transferencia-establecimiento";
import { calcularTransferencia, type MotivoEgreso } from "@/lib/transferencia-establecimiento";
import { formatARS } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraTransferencia() {
  const [tipoId, setTipoId] = useState<TipoOperacion["id"]>("definitiva");
  const [motivo, setMotivo] = useState<MotivoEgreso>("despido-sin-causa");
  const [remuneracion, setRemuneracion] = useState("1400000");
  const [ingreso, setIngreso] = useState("2016-02-15");
  const [transferencia, setTransferencia] = useState("2023-07-01");
  const [egreso, setEgreso] = useState("2026-08-20");
  const [tope, setTope] = useState("");

  const res = useMemo(
    () =>
      calcularTransferencia({
        tipoId,
        ingresoISO: ingreso,
        transferenciaISO: transferencia,
        egresoISO: egreso,
        mejorRemuneracion: Number(remuneracion) || 0,
        motivo,
        topeCCT: Number(tope) > 0 ? Number(tope) : undefined,
      }),
    [tipoId, ingreso, transferencia, egreso, remuneracion, motivo, tope],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="tipo" className="block text-sm font-semibold text-zinc-800">
            Qué pasó con la empresa
          </label>
          <select
            id="tipo"
            value={tipoId}
            onChange={(e) => setTipoId(e.target.value as TipoOperacion["id"])}
            className={claseInput}
          >
            {TIPOS_OPERACION.map((t) => (
              <option key={t.id} value={t.id}>
                Art. {t.articulo} — {t.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="motivo" className="block text-sm font-semibold text-zinc-800">
            Cómo terminó tu contrato
          </label>
          <select
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value as MotivoEgreso)}
            className={claseInput}
          >
            <option value="despido-sin-causa">Me despidieron sin causa</option>
            <option value="art-226">
              Me considero despedido por el perjuicio de la transferencia (art. 226)
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Mejor remuneración mensual, normal y habitual
          </label>
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
            Ingreso con el dueño anterior
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
          <label htmlFor="transferencia" className="block text-sm font-semibold text-zinc-800">
            Fecha del cambio de dueño
          </label>
          <input
            id="transferencia"
            type="date"
            value={transferencia}
            onChange={(e) => setTransferencia(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="egreso" className="block text-sm font-semibold text-zinc-800">
            Fecha de egreso
          </label>
          <input
            id="egreso"
            type="date"
            value={egreso}
            onChange={(e) => setEgreso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="tope" className="block text-sm font-semibold text-zinc-800">
            Tope del convenio <span className="font-normal">(opcional)</span>
          </label>
          <input
            id="tope"
            inputMode="numeric"
            value={tope}
            onChange={(e) => setTope(e.target.value)}
            placeholder="sin tope"
            className={claseInput}
          />
        </div>
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá las fechas y el sueldo. Tienen que ir en este orden: ingreso, cambio de dueño y
          egreso.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Lo que se juega en la antigüedad anterior al cambio de dueño
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.diferencia, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {formatARS(res.conAntiguedad.totalGeneral, 2)} con la antigüedad completa (lo que manda
            el art. 225) contra {formatARS(res.sinAntiguedad.totalGeneral, 2)} si te liquidaran
            desde la transferencia.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Rubro</th>
                  <th className="py-2 text-right font-semibold text-emerald-800">
                    Con toda la antigüedad
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.antiguedadTotal.anios} a {res.antiguedadTotal.meses} m · art. 225
                    </span>
                  </th>
                  <th className="py-2 pl-3 text-right font-semibold text-rose-800">
                    Desde la transferencia
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.antiguedadDesdeLaTransferencia.anios} a{" "}
                      {res.antiguedadDesdeLaTransferencia.meses} m · liquidación mal hecha
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Indemnización por antigüedad (art. 245)
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.conAntiguedad.indemnizacionAntiguedad, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.conAntiguedad.aniosComputables} año(s)
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {formatARS(res.sinAntiguedad.indemnizacionAntiguedad, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.sinAntiguedad.aniosComputables} año(s)
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Preaviso omitido, con SAC</span>
                    <span className="block text-xs text-zinc-500">
                      1 mes hasta 5 años de antigüedad, 2 si los supera
                      {res.cambiaElPreaviso ? ". Acá el umbral lo define la antigüedad anterior" : ""}
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {res.conAntiguedad.preaviso
                      ? formatARS(
                          res.conAntiguedad.preaviso.monto + res.conAntiguedad.preaviso.sac,
                          2,
                        )
                      : "—"}
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {res.sinAntiguedad.preaviso
                      ? formatARS(
                          res.sinAntiguedad.preaviso.monto + res.sinAntiguedad.preaviso.sac,
                          2,
                        )
                      : "—"}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Integración y liquidación final
                    </span>
                  </td>
                  <td className="py-2 text-right text-zinc-700">
                    {formatARS(
                      (res.conAntiguedad.integracion
                        ? res.conAntiguedad.integracion.monto + res.conAntiguedad.integracion.sac
                        : 0) + res.conAntiguedad.totalLiquidacionFinal,
                      2,
                    )}
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {formatARS(
                      (res.sinAntiguedad.integracion
                        ? res.sinAntiguedad.integracion.monto + res.sinAntiguedad.integracion.sac
                        : 0) + res.sinAntiguedad.totalLiquidacionFinal,
                      2,
                    )}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">Total</td>
                  <td className="py-2 text-right text-base font-bold text-emerald-800">
                    {formatARS(res.conAntiguedad.totalGeneral, 2)}
                  </td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-rose-800">
                    {formatARS(res.sinAntiguedad.totalGeneral, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">Quién responde por esa deuda</p>
            <ul className="mt-2 space-y-2">
              {res.responsables.map((r) => (
                <li
                  key={r.quien}
                  className={`rounded-lg border p-3 text-sm ${
                    r.condicionado
                      ? "border-rose-200 bg-rose-50/50"
                      : "border-emerald-200 bg-emerald-50/40"
                  }`}
                >
                  <span className="font-medium text-zinc-900">{r.quien}</span>
                  {r.condicionado ? (
                    <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-800">
                      excepción nueva
                    </span>
                  ) : null}
                  <span className="mt-1 block text-xs text-zinc-600">{r.base}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-3 text-xs text-zinc-500">{res.tipo.nota}</p>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            El cálculo de cada columna es el mismo de{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la calculadora de despido sin causa
            </Link>
            : lo único que cambia entre las dos es la fecha de ingreso que se computa.
          </p>
        </div>
      )}
    </div>
  );
}
