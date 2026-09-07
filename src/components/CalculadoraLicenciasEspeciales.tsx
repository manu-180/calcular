"use client";

import { useMemo, useState } from "react";
import { LICENCIAS_ESPECIALES, type CausaLicencia } from "@/data/licencias-especiales";
import { calcularLicenciaEspecial } from "@/lib/licencias-especiales";
import { fechaLarga, parseFechaISO } from "@/lib/licencias";
import { formatARS, parseMonto } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

export function CalculadoraLicenciasEspeciales() {
  const [causa, setCausa] = useState<CausaLicencia>("fallecimiento-directo");
  const [fecha, setFecha] = useState("2026-08-17");
  const [sabadoEsHabil, setSabadoEsHabil] = useState(false);
  const [brutoInput, setBrutoInput] = useState("");

  const bruto = useMemo(() => parseMonto(brutoInput), [brutoInput]);
  const res = useMemo(
    () => calcularLicenciaEspecial({ causa, fechaInicio: fecha, sabadoEsHabil, brutoMensual: bruto }),
    [causa, fecha, sabadoEsHabil, bruto],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="causa" className="block text-sm font-semibold text-zinc-800">
            ¿Qué licencia estás mirando?
          </label>
          <select
            id="causa"
            value={causa}
            onChange={(e) => setCausa(e.target.value as CausaLicencia)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {LICENCIAS_ESPECIALES.map((l) => (
              <option key={l.causa} value={l.causa}>
                {l.nombre} — {l.dias} día{l.dias > 1 ? "s" : ""} ({l.inciso})
              </option>
            ))}
          </select>
          {res && <p className="mt-1.5 text-xs text-zinc-500">{res.licencia.detalle}</p>}
        </div>

        <div>
          <label htmlFor="fecha" className="block text-sm font-semibold text-zinc-800">
            ¿Qué día empieza?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La fecha del hecho: el nacimiento, el casamiento, el fallecimiento o el examen.
          </p>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="bruto" className="block text-sm font-semibold text-zinc-800">
            Sueldo bruto mensual (opcional)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Para calcular lo que se paga por esos días. Dejalo vacío si solo querés las fechas.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="bruto"
              inputMode="numeric"
              placeholder="Ej: 1.500.000"
              value={brutoInput}
              onChange={(e) => setBrutoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <label
          htmlFor="sabado"
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 text-sm text-zinc-700 sm:col-span-2"
        >
          <input
            id="sabado"
            type="checkbox"
            checked={sabadoEsHabil}
            onChange={(e) => setSabadoEsHabil(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            En mi trabajo el sábado también se trabaja
            <span className="block text-xs text-zinc-500">
              Cambia qué cuenta como día hábil para la garantía del art. 160 y para el día de
              reintegro.
            </span>
          </span>
        </label>
      </div>

      {!res ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
          Esa fecha no existe. Revisá el día que cargaste.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Volvés a trabajar el</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {fechaLarga(parseFechaISO(res.reintegro)!)}
          </p>

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Días que fija la ley</dt>
              <dd className="font-medium text-zinc-900">
                {res.diasLey} {res.licencia.corridos ? "corrido(s)" : ""}
              </dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Días que se gozan</dt>
              <dd className="font-medium text-zinc-900">
                {res.diasTotales}
                {res.diasTotales > res.diasLey ? " (art. 160)" : ""}
              </dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Último día de licencia</dt>
              <dd className="font-medium text-zinc-900">
                {fechaLarga(parseFechaISO(res.fin)!)}
              </dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Días de trabajo que cubre</dt>
              <dd className="font-medium text-zinc-900">{res.diasHabilesCubiertos}</dd>
            </div>
          </dl>

          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-600">
                  <th className="px-3 py-2 font-medium">Día</th>
                  <th className="px-3 py-2 font-medium">Qué es</th>
                </tr>
              </thead>
              <tbody>
                {res.dias.map((d) => (
                  <tr key={d.fecha} className="border-t border-zinc-100">
                    <td className="px-3 py-2 text-zinc-800">
                      {fechaLarga(parseFechaISO(d.fecha)!)}
                      {d.agregadoPorArt160 && (
                        <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800">
                          art. 160
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-zinc-600">
                      {d.feriado ?? (d.habil ? "día hábil" : "día no laborable")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bruto > 0 && (
            <dl className="mt-4 grid gap-x-6 gap-y-2 rounded-lg border border-emerald-200 bg-white p-3 text-sm sm:grid-cols-2">
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Valor del día (sueldo ÷ 25, art. 155)</dt>
                <dd className="font-medium text-zinc-900">{formatARS(res.valorDia, 2)}</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Por los {res.diasTotales} día(s)</dt>
                <dd className="font-semibold text-zinc-900">{formatARS(res.totalLicencia, 2)}</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Si se pagara a día común (÷ 30)</dt>
                <dd className="font-medium text-zinc-500">{formatARS(res.totalADiaComun, 2)}</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Diferencia a favor</dt>
                <dd className="font-bold text-emerald-700">
                  {formatARS(res.plusPorElArt155, 2)}
                </dd>
              </div>
            </dl>
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
            Este es el piso de la LCT. Tu convenio colectivo puede darte más días o causales que la
            ley no tiene: si el convenio dice más, manda el convenio. Los feriados provinciales y
            municipales tampoco entran acá.
          </p>
        </div>
      )}
    </div>
  );
}
