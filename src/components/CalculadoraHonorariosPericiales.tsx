"use client";

import { useMemo, useState } from "react";
import { CONSULTADO_EL, SUPUESTOS, UMA_VIGENTE, type ClaveSupuesto } from "@/data/uma";
import {
  actualizarRegulacion,
  calcularPiso,
  serieContinua,
} from "@/lib/honorarios-periciales";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;
const pct = (t: number) => `${(t * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}%`;
const fechaLarga = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const HOY = CONSULTADO_EL;

export function CalculadoraHonorariosPericiales() {
  const [modo, setModo] = useState<"piso" | "actualizar">("piso");

  // Modo piso
  const [clave, setClave] = useState<ClaveSupuesto>("pecuniario");
  const [fecha, setFecha] = useState(HOY);
  const [pericias, setPericias] = useState("1");

  // Modo actualización (art. 51)
  const [umaReguladas, setUmaReguladas] = useState("6");
  const [fechaRegulacion, setFechaRegulacion] = useState("2025-06-01");

  const piso = useMemo(
    () => calcularPiso(clave, fecha, Number(pericias) || 1),
    [clave, fecha, pericias],
  );
  const actualizacion = useMemo(
    () => actualizarRegulacion(Number(umaReguladas) || 0, fechaRegulacion),
    [umaReguladas, fechaRegulacion],
  );

  const minFecha = serieContinua().at(-1)!.desde;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Qué querés calcular">
        {(
          [
            ["piso", "El piso legal en pesos"],
            ["actualizar", "Cuánto vale hoy una regulación"],
          ] as const
        ).map(([id, etiqueta]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={modo === id}
            onClick={() => setModo(id)}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              modo === id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
        <strong className="text-zinc-800">UMA vigente: {pesos(UMA_VIGENTE.valor)}</strong> — desde el{" "}
        {fechaLarga(UMA_VIGENTE.desde)}, por la Resolución SGA {UMA_VIGENTE.resolucion} de la Corte
        Suprema. Es el 3% del sueldo básico de un juez federal de primera instancia (art. 19 de la
        Ley 27.423).
      </p>

      {modo === "piso" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="supuesto" className="block text-sm font-semibold text-zinc-800">
                Qué proceso es
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Los tres supuestos con piso escrito en la ley.
              </p>
              <select
                id="supuesto"
                value={clave}
                onChange={(e) => setClave(e.target.value as ClaveSupuesto)}
                className={claseInput}
              >
                {SUPUESTOS.map((s) => (
                  <option key={s.clave} value={s.clave}>
                    {s.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fecha" className="block text-sm font-semibold text-zinc-800">
                Fecha de la regulación
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Decide el piso (2 o 6 UMA) y el valor de la UMA.
              </p>
              <input
                id="fecha"
                type="date"
                min={minFecha}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className={claseInput}
              />
            </div>

            <div>
              <label htmlFor="pericias" className="block text-sm font-semibold text-zinc-800">
                Cantidad de pericias
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                El art. 61 bis fija el mínimo «por cada pericia».
              </p>
              <input
                id="pericias"
                inputMode="numeric"
                value={pericias}
                onChange={(e) => setPericias(e.target.value)}
                disabled={clave === "sinPericia"}
                className={`${claseInput} disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400`}
              />
            </div>
          </div>

          {piso === null ? (
            <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
              Para esa fecha no tenemos el valor de la UMA verificado. La serie continua arranca el{" "}
              {fechaLarga(minFecha)}: antes de eso la Corte publicó varias resoluciones escaneadas y
              no las transcribimos a ojo.{" "}
              <a
                href="https://www.csjn.gov.ar/transparencia/uma"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline"
              >
                Los valores anteriores están acá
              </a>
              .
            </p>
          ) : (
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-600">
                {piso.totalPesos > 0
                  ? "Piso legal — por debajo de esto el juez no puede regular"
                  : "Para ese supuesto y esa fecha no hay piso escrito"}
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-700">
                {pesos(piso.totalPesos)}
              </p>
              {piso.totalPesos > 0 && (
                <p className="mt-1 text-sm text-zinc-600">
                  {piso.umaDelPiso} UMA
                  {piso.pericias > 1 ? ` × ${piso.pericias} pericias` : ""} × {pesos(piso.uma.valor)}{" "}
                  (UMA vigente al {fechaLarga(piso.uma.desde)}).
                </p>
              )}

              {piso.comparacionReforma && (
                <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/60 p-4">
                  <p className="text-sm font-semibold text-rose-900">
                    Antes del 6 de marzo de 2026 este mismo piso era{" "}
                    {pesos(piso.comparacionReforma.pisoAnteriorPesos)}
                  </p>
                  <p className="mt-1 text-sm text-rose-800">
                    La Ley 27.802 lo bajó de {piso.comparacionReforma.umaAnterior} UMA a{" "}
                    {piso.supuesto.uma} UMA: {pesos(piso.comparacionReforma.diferencia)} menos, un{" "}
                    {pct(piso.comparacionReforma.caidaPorcentual)} de caída. El texto del artículo es
                    idéntico palabra por palabra salvo ese número.
                  </p>
                </div>
              )}

              <div className="mt-5 space-y-2">
                {piso.avisos.map((a, i) => (
                  <p
                    key={i}
                    className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}
                  >
                    {a.texto}
                  </p>
                ))}
              </div>

              <details className="mt-5 rounded-xl border border-zinc-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-zinc-800">
                  El artículo, textual — {piso.supuesto.articulo}
                </summary>
                <p className="mt-2 text-sm italic text-zinc-600">«{piso.supuesto.texto}»</p>
                <p className="mt-2 text-sm text-zinc-700">{piso.supuesto.requisito}</p>
              </details>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="uma-reguladas" className="block text-sm font-semibold text-zinc-800">
                UMA que dice tu regulación
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                El art. 51 obliga a expresarlas, bajo pena de nulidad.
              </p>
              <input
                id="uma-reguladas"
                inputMode="decimal"
                value={umaReguladas}
                onChange={(e) => setUmaReguladas(e.target.value)}
                className={claseInput}
              />
            </div>

            <div>
              <label
                htmlFor="fecha-regulacion"
                className="block text-sm font-semibold text-zinc-800"
              >
                Fecha de la resolución que reguló
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Sólo para mostrar cuánto valían entonces.
              </p>
              <input
                id="fecha-regulacion"
                type="date"
                min={minFecha}
                value={fechaRegulacion}
                onChange={(e) => setFechaRegulacion(e.target.value)}
                className={claseInput}
              />
            </div>
          </div>

          {actualizacion === null ? (
            <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
              Cargá una cantidad de UMA mayor que cero y una fecha desde el {fechaLarga(minFecha)},
              que es donde arranca la serie que verificamos resolución por resolución.
            </p>
          ) : (
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-600">
                Lo que hay que pagar hoy para que el pago sea cancelatorio
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-700">
                {pesos(actualizacion.montoHoy)}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {actualizacion.umaReguladas} UMA × {pesos(actualizacion.umaHoy.valor)}.
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[30rem] text-sm">
                  <tbody>
                    <tr className="border-b border-zinc-200 align-top">
                      <td className="py-2 pr-3">
                        <span className="font-medium text-zinc-800">Valía cuando se reguló</span>
                        <span className="block text-xs text-zinc-500">
                          UMA de {pesos(actualizacion.umaEntonces.valor)} (Res. SGA{" "}
                          {actualizacion.umaEntonces.resolucion})
                        </span>
                      </td>
                      <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                        {pesos(actualizacion.montoEntonces)}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200 align-top">
                      <td className="py-2 pr-3">
                        <span className="font-medium text-zinc-800">Diferencia</span>
                        <span className="block text-xs text-zinc-500">
                          lo que se pierde si se paga el importe nominal
                        </span>
                      </td>
                      <td className="py-2 pl-3 text-right font-semibold text-emerald-700">
                        {pesos(actualizacion.diferencia)}
                      </td>
                    </tr>
                    <tr className="align-top">
                      <td className="py-2 pr-3">
                        <span className="font-medium text-zinc-800">Variación de la UMA</span>
                      </td>
                      <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                        {pct(actualizacion.variacion)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5 space-y-2">
                {actualizacion.avisos.map((a, i) => (
                  <p key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                    {a.texto}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
