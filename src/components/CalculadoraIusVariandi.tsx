"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAMINOS, MOTIVOS_VEDA, type MotivoVeda } from "@/data/ius-variandi";
import { evaluarIusVariandi, type EstadoIntimacion } from "@/lib/ius-variandi";
import { formatARS, errorMonto, primerError, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const OPCIONES_INTIMACION: { id: EstadoIntimacion; label: string }[] = [
  { id: "no-intimo", label: "Todavía no intimé al empleador" },
  { id: "intimo-desoida", label: "Intimé y no rectificaron (intimación desoída)" },
  { id: "intimo-rectificaron", label: "Intimé y rectificaron el cambio" },
];

export function CalculadoraIusVariandi() {
  const [motivos, setMotivos] = useState<MotivoVeda["id"][]>(["esenciales"]);
  const [intimacion, setIntimacion] = useState<EstadoIntimacion>("intimo-desoida");
  const [remuneracion, setRemuneracion] = useState("1400000");
  const [ingreso, setIngreso] = useState("2019-05-06");
  const [egreso, setEgreso] = useState("2026-08-20");
  const [tope, setTope] = useState("");

  const error = primerError({
    "Mejor remuneración": errorMonto(remuneracion),
    "Tope indemnizatorio": errorMonto(tope),
  });

  const res = useMemo(
    () =>
      evaluarIusVariandi({
        motivos,
        intimacion,
        ingresoISO: ingreso,
        egresoISO: egreso,
        mejorRemuneracion: parseMonto(remuneracion),
        topeCCT: parseMonto(tope) > 0 ? parseMonto(tope) : undefined,
      }),
    [motivos, intimacion, ingreso, egreso, remuneracion, tope],
  );

  function toggle(id: MotivoVeda["id"]) {
    setMotivos((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-zinc-800">
          ¿Qué le pasa al cambio que te dispusieron?
        </legend>
        <p className="text-xs text-zinc-500">
          Marcá todo lo que aplique. Los dos primeros son los límites que el artículo 66 conserva;
          los dos últimos son los que la reforma sacó del texto.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {MOTIVOS_VEDA.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${
                motivos.includes(m.id)
                  ? m.vedaHoy
                    ? "border-emerald-300 bg-emerald-50/60"
                    : "border-rose-300 bg-rose-50/60"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={motivos.includes(m.id)}
                onChange={() => toggle(m.id)}
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <span>
                <span className="block text-sm font-medium text-zinc-900">{m.etiqueta}</span>
                <span className="mt-0.5 block text-xs text-zinc-500">{m.ayuda}</span>
                <span
                  className={`mt-1 block text-xs font-semibold ${
                    m.vedaHoy ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {m.vedaHoy
                    ? "Sigue en el texto vigente"
                    : "Ya NO está en el texto vigente del art. 66"}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="intimacion" className="block text-sm font-semibold text-zinc-800">
          ¿Intimaste al empleador?
        </label>
        <p className="mt-0.5 text-xs text-zinc-500">
          El requisito que la reforma agregó: «previa intimación y si ésta fuere desoída».
        </p>
        <select
          id="intimacion"
          value={intimacion}
          onChange={(e) => setIntimacion(e.target.value as EstadoIntimacion)}
          className={claseInput}
        >
          {OPCIONES_INTIMACION.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Mejor remuneración mensual, normal y habitual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La base del art. 245, en bruto. Si te bajaron el sueldo con el cambio, la base es la
            mejor remuneración anterior a la rebaja.
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
          <label htmlFor="egreso" className="block text-sm font-semibold text-zinc-800">
            Fecha en que te considerás despedido
          </label>
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
            Tope indemnizatorio del convenio <span className="font-normal">(opcional)</span>
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

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div
              className={`rounded-xl border p-4 ${
                res.vedadoHoy ? "border-emerald-200 bg-emerald-50/60" : "border-zinc-200 bg-white"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Con el texto vigente
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-900">
                {res.vedadoHoy ? "El cambio está vedado" : "El cambio no está vedado por el art. 66"}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                {res.caminosHoy.length} camino disponible: considerarte despedido sin causa, previa
                intimación desoída.
              </p>
            </div>
            <div
              className={`rounded-xl border p-4 ${
                res.vedadoAntes ? "border-amber-200 bg-amber-50/60" : "border-zinc-200 bg-white"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Antes del 6 de marzo de 2026
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-900">
                {res.vedadoAntes ? "El cambio estaba vedado" : "Tampoco estaba vedado"}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                {CAMINOS.length} caminos: considerarte despedido o accionar por el restablecimiento,
                sin irte.
              </p>
            </div>
          </div>

          {res.liquidacion ? (
            <div className="mt-5">
              <p className="text-sm text-zinc-600">
                Si te considerás despedido, lo que te corresponde (art. 246 → arts. 232, 233 y 245)
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
                {formatARS(res.liquidacion.totalGeneral, 2)}
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[30rem] text-sm">
                  <tbody>
                    <tr className="border-b border-zinc-200">
                      <td className="py-2 pr-3 text-zinc-700">
                        Indemnización por antigüedad (art. 245)
                        <span className="block text-xs text-zinc-500">
                          {res.liquidacion.aniosComputables} año(s) computable(s) sobre{" "}
                          {res.liquidacion.antiguedad.anios} a {res.liquidacion.antiguedad.meses} m
                        </span>
                      </td>
                      <td className="py-2 text-right font-semibold text-zinc-900">
                        {formatARS(res.liquidacion.indemnizacionAntiguedad, 2)}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200">
                      <td className="py-2 pr-3 text-zinc-700">
                        Preaviso omitido, con SAC (arts. 231/232)
                      </td>
                      <td className="py-2 text-right font-semibold text-zinc-900">
                        {res.liquidacion.preaviso
                          ? formatARS(res.liquidacion.preaviso.monto + res.liquidacion.preaviso.sac, 2)
                          : "—"}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200">
                      <td className="py-2 pr-3 text-zinc-700">
                        Integración del mes, con SAC (art. 233)
                      </td>
                      <td className="py-2 text-right text-zinc-700">
                        {res.liquidacion.integracion
                          ? formatARS(
                              res.liquidacion.integracion.monto + res.liquidacion.integracion.sac,
                              2,
                            )
                          : "—"}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200">
                      <td className="py-2 pr-3 text-zinc-700">
                        Liquidación final (SAC proporcional y vacaciones)
                      </td>
                      <td className="py-2 text-right text-zinc-700">
                        {formatARS(res.liquidacion.totalLiquidacionFinal, 2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold text-zinc-900">Total</td>
                      <td className="py-2 text-right text-base font-bold text-zinc-900">
                        {formatARS(res.liquidacion.totalGeneral, 2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Es el mismo cálculo que{" "}
                <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
                  la calculadora de despido sin causa
                </Link>
                : el art. 246 remite a los mismos tres artículos. El despido indirecto no paga ni más
                ni menos que el directo.
              </p>
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
              La liquidación aparece cuando se dan las dos condiciones que hoy pide el artículo 66: un
              cambio vedado por el texto vigente y una intimación desoída.
            </p>
          )}

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>
        </div>
        </>
      )}
    </div>
  );
}
