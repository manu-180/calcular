"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ANIOS_MAXIMO_PLAZO, ARTICULO_REFORMADO } from "@/data/despido-plazo-fijo";
import { calcularDespidoPlazoFijo } from "@/lib/despido-plazo-fijo";
import { formatARS } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraDespidoPlazoFijo() {
  const [remuneracion, setRemuneracion] = useState("1400000");
  const [inicio, setInicio] = useState("2026-03-02");
  const [finPactado, setFinPactado] = useState("2028-03-01");
  const [despido, setDespido] = useState("2026-06-15");
  const [tope, setTope] = useState("");

  const res = useMemo(
    () =>
      calcularDespidoPlazoFijo({
        inicioISO: inicio,
        finPactadoISO: finPactado,
        despidoISO: despido,
        mejorRemuneracion: Number(remuneracion) || 0,
        topeCCT: Number(tope) > 0 ? Number(tope) : undefined,
      }),
    [inicio, finPactado, despido, remuneracion, tope],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Mejor remuneración mensual, normal y habitual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La base del art. 245, en bruto. Es la misma base que usa la calculadora de despido sin
            causa: el art. {ARTICULO_REFORMADO} no cambia la base, cambia la antigüedad con la que
            se multiplica.
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
          <label htmlFor="inicio" className="block text-sm font-semibold text-zinc-800">
            Inicio del contrato
          </label>
          <input
            id="inicio"
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="finPactado" className="block text-sm font-semibold text-zinc-800">
            Fin del plazo pactado originariamente
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La fecha que dice el contrato firmado, no una renovación posterior: el artículo habla
            del «plazo originariamente pactado».
          </p>
          <input
            id="finPactado"
            type="date"
            value={finPactado}
            onChange={(e) => setFinPactado(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="despido" className="block text-sm font-semibold text-zinc-800">
            Fecha del despido
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El día en que te comunicaron la ruptura anticipada.
          </p>
          <input
            id="despido"
            type="date"
            value={despido}
            onChange={(e) => setDespido(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="tope" className="block text-sm font-semibold text-zinc-800">
            Tope indemnizatorio del convenio <span className="font-normal">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si lo conocés. Con tope, la base nunca baja del 67% de tu remuneración real.
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
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá las fechas y el sueldo. El inicio del contrato tiene que ser anterior al despido y
          al fin del plazo pactado.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Total a cobrar por el despido anticipado (art. {ARTICULO_REFORMADO}, texto vigente)
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.totalGeneral, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {formatARS(res.totalIndemnizatorio, 2)} de indemnizaciones más{" "}
            {formatARS(res.liquidacionFinal.total, 2)} de liquidación final. El artículo 245 se
            calculó sobre {res.antiguedadFicta.anios} año(s) y {res.antiguedadFicta.meses} mes(es)
            (la antigüedad que habrías acumulado hasta el vencimiento) y no sobre los{" "}
            {res.antiguedadReal.anios} año(s) y {res.antiguedadReal.meses} mes(es) trabajados.
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
                      Indemnización por antigüedad (art. 245)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      un mes por año o fracción mayor de 3 meses, sobre la antigüedad ficta del
                      art. {ARTICULO_REFORMADO}
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {formatARS(res.art245Hoy.monto, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.art245Hoy.aniosComputables}{" "}
                      {res.art245Hoy.aniosComputables === 1 ? "año" : "años"} computable(s)
                      {res.art245Hoy.topeAplicado ? " · con tope de convenio" : ""}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Preaviso omitido (arts. 231/232)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      con su SAC. Calculado también con la antigüedad ficta: el artículo{" "}
                      {ARTICULO_REFORMADO} habla de «las indemnizaciones», en plural
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {formatARS(res.preaviso.monto + res.preaviso.sac, 2)}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.preaviso.meses} mes(es)
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
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {res.integracion
                      ? formatARS(res.integracion.monto + res.integracion.sac, 2)
                      : "—"}
                    <span className="block text-xs font-normal text-zinc-500">
                      {res.integracion ? `${res.integracion.dias} día(s)` : "el despido cayó a fin de mes"}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      SAC proporcional y vacaciones no gozadas
                    </span>
                    <span className="block text-xs text-zinc-500">
                      arts. 123 y 156, sobre el tiempo realmente trabajado (la antigüedad ficta rige
                      «a ese solo efecto»: el de las indemnizaciones)
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

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Lo que suma la antigüedad ficta
              </p>
              <p className="mt-1 text-xl font-bold text-zinc-900">
                {formatARS(res.loQueSumaLaFicta, 2)}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Diferencia entre el art. 245 sobre la antigüedad hasta el vencimiento (
                {res.art245Hoy.aniosComputables} año/s) y sobre la trabajada (
                {res.art245Antes.aniosComputables} año/s). Tiene techo: el art. 93 no deja pactar
                más de {ANIOS_MAXIMO_PLAZO} años.
              </p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                La ventana que cerró la reforma
              </p>
              <p className="mt-1 text-xl font-bold text-zinc-900">
                {formatARS(res.ventanaQueSeCerro, 2)}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Los {res.diasQueFaltaban} día(s) que faltaban hasta el vencimiento, en sueldos.{" "}
                <strong>No es una indemnización</strong>: es la magnitud sobre la que, hasta el 6 de
                marzo de 2026, un juez podía fijar los daños y perjuicios del derecho común. Ese
                rubro ya no está en el artículo.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Si en vez de romperlo antes lo dejaban vencer, con preaviso
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {res.siHubieraVencido.aplicaArt250 ? (
                <>
                  Habrías cobrado {formatARS(res.siHubieraVencido.monto, 2)}: el segundo párrafo del
                  art. {ARTICULO_REFORMADO} remite al art. 250 y éste al art. 247, que es la mitad
                  del art. 245. Ese párrafo no lo tocó la reforma.
                </>
              ) : (
                <>
                  No habrías cobrado indemnización por la extinción: el art. 250 exige que el
                  contrato haya durado un año o más, y el plazo pactado acá es más corto. Es por eso
                  que el despido anticipado y el vencimiento normal se pagan tan distinto.
                </>
              )}
            </p>
          </div>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li
                key={i}
                className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}
              >
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            ¿El contrato era por tiempo indeterminado? Entonces el cálculo es otro:{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              calculadora de despido sin causa
            </Link>
            . ¿Te fuiste vos?{" "}
            <Link href="/renuncia" className="font-medium text-emerald-700 hover:underline">
              liquidación por renuncia
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
