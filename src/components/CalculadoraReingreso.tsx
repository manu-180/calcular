"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CORTE_ANIOS } from "@/data/reingreso";
import { calcularReingreso } from "@/lib/reingreso";
import { formatARS } from "@/lib/formato";
import { nombrePeriodo } from "@/lib/inflacion";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraReingreso() {
  const [remuneracion, setRemuneracion] = useState("1400000");
  const [ingresoAnterior, setIngresoAnterior] = useState("2015-03-01");
  const [ceseAnterior, setCeseAnterior] = useState("2021-06-30");
  const [reingreso, setReingreso] = useState("2022-09-01");
  const [despido, setDespido] = useState("2026-08-31");
  const [cobradoAntes, setCobradoAntes] = useState("900000");

  const res = useMemo(
    () =>
      calcularReingreso({
        mejorRemuneracion: Number(remuneracion) || 0,
        ingresoAnterior,
        ceseAnterior,
        reingreso,
        despido,
        cobradoAntes: Number(cobradoAntes) || 0,
      }),
    [remuneracion, ingresoAnterior, ceseAnterior, reingreso, despido, cobradoAntes],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Mejor remuneración mensual, normal y habitual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La base del art. 245, del último año o del tiempo trabajado si es menor.
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
          <label htmlFor="ingresoAnterior" className="block text-sm font-semibold text-zinc-800">
            Ingreso original
          </label>
          <input
            id="ingresoAnterior"
            type="date"
            value={ingresoAnterior}
            onChange={(e) => setIngresoAnterior(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="ceseAnterior" className="block text-sm font-semibold text-zinc-800">
            Cese de esa primera etapa
          </label>
          <input
            id="ceseAnterior"
            type="date"
            value={ceseAnterior}
            onChange={(e) => setCeseAnterior(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="reingreso" className="block text-sm font-semibold text-zinc-800">
            Reingreso al mismo empleador
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La fecha que decide todo: {CORTE_ANIOS} años desde el cese es el corte.
          </p>
          <input
            id="reingreso"
            type="date"
            value={reingreso}
            onChange={(e) => setReingreso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="despido" className="block text-sm font-semibold text-zinc-800">
            Despido actual
          </label>
          <input
            id="despido"
            type="date"
            value={despido}
            onChange={(e) => setDespido(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cobradoAntes" className="block text-sm font-semibold text-zinc-800">
            Indemnización que cobraste en el cese anterior
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sólo la indemnización por antigüedad de aquel cese, en pesos de aquel momento. Si
            cobraste cero (renuncia, por ejemplo), poné 0.
          </p>
          <input
            id="cobradoAntes"
            inputMode="numeric"
            value={cobradoAntes}
            onChange={(e) => setCobradoAntes(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá las fechas y el sueldo: el cese tiene que ser posterior al ingreso y el despido,
          posterior al reingreso.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Indemnización por antigüedad que te queda, después de la deducción del art. 255
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.indemnizacionFinal, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.cortaLaAntiguedad ? (
              <>
                Sobre {res.aniosComputables}{" "}
                {res.aniosComputables === 1 ? "año computable" : "años computables"} de la última
                etapa solamente: la anterior no se computa.
              </>
            ) : (
              <>
                {formatARS(res.indemnizacionBruta, 2)} por {res.aniosComputables}{" "}
                {res.aniosComputables === 1 ? "año computable" : "años computables"} de las dos
                etapas, menos {formatARS(res.deduccionActualizada, 2)} de deducción actualizada.
              </>
            )}
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Etapa anterior</span>
                    <span className="block text-xs text-zinc-500">
                      {res.cortaLaAntiguedad
                        ? "queda afuera: pasaron dos años o más hasta el reingreso (art. 18)"
                        : "se computa: el reingreso fue dentro de los dos años (art. 18)"}
                    </span>
                  </td>
                  <td
                    className={`py-2 text-right font-semibold ${
                      res.cortaLaAntiguedad ? "text-rose-700 line-through" : "text-zinc-900"
                    }`}
                  >
                    {res.etapaAnterior.anios} a {res.etapaAnterior.meses} m
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Corte entre cese y reingreso</span>
                    <span className="block text-xs text-zinc-500">
                      el artículo 18 corta a los {CORTE_ANIOS} años ({CORTE_ANIOS * 12} meses)
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {res.mesesDeCorte} meses
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Etapa actual</span>
                    <span className="block text-xs text-zinc-500">
                      reingreso hasta el despido: siempre se computa
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {res.etapaActual.anios} a {res.etapaActual.meses} m
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Indemnización del art. 245 antes de deducir
                    </span>
                    <span className="block text-xs text-zinc-500">
                      base × {res.aniosComputables}{" "}
                      {res.aniosComputables === 1 ? "año" : "años"} (cada año de servicio o fracción
                      mayor de 3 meses)
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.indemnizacionBruta, 2)}
                  </td>
                </tr>
                {!res.cortaLaAntiguedad && (
                  <>
                    <tr className="border-b border-zinc-200 align-top">
                      <td className="py-2 pr-3">
                        <span className="font-medium text-zinc-800">
                          Lo que cobraste en el cese anterior, nominal
                        </span>
                        <span className="block text-xs text-zinc-500">
                          en pesos de {nombrePeriodo(ceseAnterior.slice(0, 7))}
                        </span>
                      </td>
                      <td className="py-2 text-right text-zinc-600">
                        {formatARS(res.deduccionNominal, 2)}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200 align-top">
                      <td className="py-2 pr-3">
                        <span className="font-medium text-zinc-800">
                          …actualizado por IPC hasta {nombrePeriodo(res.actualizadoHasta)}
                        </span>
                        <span className="block text-xs text-zinc-500">
                          la actualización sola suma {formatARS(res.efectoActualizacion, 2)} al
                          descuento ({res.inflacionAplicada.toLocaleString("es-AR", {
                            maximumFractionDigits: 1,
                          })}
                          % de inflación acumulada)
                        </span>
                      </td>
                      <td className="py-2 text-right font-semibold text-rose-700">
                        −{formatARS(res.deduccionActualizada, 2)}
                      </td>
                    </tr>
                  </>
                )}
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Piso del art. 255: sólo el último período
                    </span>
                    <span className="block text-xs text-zinc-500">
                      «en ningún caso» se puede cobrar menos que esto
                      {res.pisoAplicado ? ", y es lo que definió tu resultado" : ""}
                    </span>
                  </td>
                  <td
                    className={`py-2 text-right font-semibold ${
                      res.pisoAplicado ? "text-emerald-700" : "text-zinc-600"
                    }`}
                  >
                    {formatARS(res.pisoUltimoPeriodo, 2)}
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
            Estimación orientativa, no una liquidación. Para el despido completo (con preaviso,
            integración del mes y vacaciones proporcionales), usá{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la calculadora de indemnización
            </Link>
            ; y si lo que querés saber es cuánto vale hoy una suma que te deben,{" "}
            <Link
              href="/actualizacion-creditos-laborales"
              className="font-medium text-emerald-700 hover:underline"
            >
              la de actualización de créditos laborales
            </Link>
            , que aplica el art. 276 (IPC más 3% anual).
          </p>
        </div>
      )}
    </div>
  );
}
