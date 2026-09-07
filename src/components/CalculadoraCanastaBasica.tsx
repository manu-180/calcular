"use client";

import { useMemo, useState } from "react";
import {
  calcularCanastaBasica,
  etiquetaPeriodo,
  type IntegranteHogar,
} from "@/lib/canasta-basica";
import { CANASTA_BASICA_ULTIMO } from "@/data/canasta-basica";
import type { SexoAE } from "@/data/adulto-equivalente";
import { formatARS, parseMonto } from "@/lib/formato";

const MAX_INTEGRANTES = 10;

// Familia tipo del INDEC: es el hogar que publica todos los meses, así el default ya dice algo.
const INICIAL: IntegranteHogar[] = [
  { edad: 35, sexo: "varon" },
  { edad: 31, sexo: "mujer" },
  { edad: 6, sexo: "varon" },
  { edad: 8, sexo: "mujer" },
];

const TEXTO_SITUACION = {
  indigente: {
    titulo: "El hogar está por debajo de la línea de indigencia",
    detalle:
      "Con ese ingreso no se cubre ni la canasta de alimentos que el INDEC considera indispensable para el hogar.",
    clase: "bg-rose-50 text-rose-900",
    monto: "text-rose-700",
  },
  pobre: {
    titulo: "El hogar está por debajo de la línea de pobreza",
    detalle:
      "El ingreso cubre la canasta de alimentos, pero no llega a la canasta total (que suma vestimenta, transporte, salud, educación y vivienda).",
    clase: "bg-amber-50 text-amber-900",
    monto: "text-amber-700",
  },
  "no-pobre": {
    titulo: "El hogar está por encima de la línea de pobreza",
    detalle:
      "El ingreso supera el valor de la canasta básica total para esa composición de hogar, que es el umbral con el que el INDEC mide la pobreza por ingresos.",
    clase: "bg-emerald-50 text-emerald-900",
    monto: "text-emerald-700",
  },
} as const;

export function CalculadoraCanastaBasica() {
  const [integrantes, setIntegrantes] = useState<IntegranteHogar[]>(INICIAL);
  const [ingresoInput, setIngresoInput] = useState("");

  const ingreso = useMemo(() => parseMonto(ingresoInput), [ingresoInput]);

  const resultado = useMemo(
    () =>
      calcularCanastaBasica({
        integrantes,
        ingresoHogar: ingresoInput.trim() === "" ? null : ingreso,
      }),
    [integrantes, ingreso, ingresoInput],
  );

  const actualizar = (i: number, cambio: Partial<IntegranteHogar>) =>
    setIntegrantes((prev) => prev.map((p, j) => (j === i ? { ...p, ...cambio } : p)));

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <fieldset>
          <legend className="block text-sm font-semibold text-zinc-800">
            ¿Quiénes viven en el hogar?
          </legend>
          <p className="mt-0.5 text-xs text-zinc-500">
            La edad y el sexo de cada integrante definen cuánto &quot;pesa&quot; en la canasta: el
            INDEC usa una tabla oficial de adultos equivalentes según los requerimientos
            nutricionales de cada uno.
          </p>
          <div className="mt-2 space-y-2">
            {integrantes.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <label htmlFor={`edad-${i}`} className="w-24 shrink-0 text-sm text-zinc-600">
                  Persona {i + 1}
                </label>
                <input
                  id={`edad-${i}`}
                  type="number"
                  min={0}
                  max={120}
                  inputMode="numeric"
                  aria-label={`Edad de la persona ${i + 1}`}
                  value={p.edad}
                  onChange={(e) => actualizar(i, { edad: Number(e.target.value) })}
                  className="w-20 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
                <span className="shrink-0 text-sm text-zinc-500">años</span>
                <select
                  aria-label={`Sexo de la persona ${i + 1}`}
                  value={p.sexo}
                  onChange={(e) => actualizar(i, { sexo: e.target.value as SexoAE })}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="varon">Varón</option>
                  <option value="mujer">Mujer</option>
                </select>
                {integrantes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setIntegrantes((prev) => prev.filter((_, j) => j !== i))}
                    aria-label={`Quitar persona ${i + 1}`}
                    className="shrink-0 rounded-lg border border-zinc-200 px-2.5 py-2 text-sm text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
                  >
                    Quitar
                  </button>
                )}
              </div>
            ))}
          </div>
          {integrantes.length < MAX_INTEGRANTES && (
            <button
              type="button"
              onClick={() => setIntegrantes((prev) => [...prev, { edad: 30, sexo: "mujer" }])}
              className="mt-2.5 text-sm font-medium text-emerald-700 hover:underline"
            >
              + Agregar integrante
            </button>
          )}
        </fieldset>

        <div>
          <label htmlFor="ingreso-hogar" className="block text-sm font-semibold text-zinc-800">
            Ingreso mensual total del hogar <span className="font-normal text-zinc-500">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Todo lo que entra por mes sumando a todos los integrantes: sueldos de bolsillo,
            changas, jubilaciones, alquileres, asignaciones. Si lo dejás vacío, igual ves los
            umbrales del hogar.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="ingreso-hogar"
              inputMode="numeric"
              placeholder="Ej: 1.800.000"
              value={ingresoInput}
              onChange={(e) => setIngresoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>
      </div>

      {resultado && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500">
                Ese hogar equivale a{" "}
                <strong className="text-zinc-700">
                  {resultado.adultosEquivalentes.toString().replace(".", ",")} adultos equivalentes
                </strong>{" "}
                · canasta de {etiquetaPeriodo(resultado.periodo)}
              </p>
              <p className="mt-1 text-sm text-zinc-500">Para no ser pobre necesita por mes</p>
              <p className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                {formatARS(resultado.lineaPobreza, 0)}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                y para no ser indigente,{" "}
                <strong className="text-zinc-700">{formatARS(resultado.lineaIndigencia, 0)}</strong>.
              </p>
            </div>

            {resultado.situacion !== null && (
              <div className={`rounded-xl p-4 ${TEXTO_SITUACION[resultado.situacion].clase}`}>
                <p className="font-semibold">{TEXTO_SITUACION[resultado.situacion].titulo}</p>
                <p className="mt-1 text-sm">{TEXTO_SITUACION[resultado.situacion].detalle}</p>
                <p
                  className={`mt-2 text-2xl font-bold ${TEXTO_SITUACION[resultado.situacion].monto}`}
                >
                  {resultado.brechaPobreza! >= 0
                    ? `${formatARS(resultado.brechaPobreza!, 0)} por encima`
                    : `${formatARS(Math.abs(resultado.brechaPobreza!), 0)} por debajo`}
                </p>
                <p className="mt-1 text-sm">
                  El ingreso del hogar es{" "}
                  <strong>
                    {resultado.vecesLineaPobreza!.toFixed(2).replace(".", ",")} veces
                  </strong>{" "}
                  la línea de pobreza que le corresponde.
                </p>
              </div>
            )}

            <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
              {resultado.detalle.map((d, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <dt className="text-zinc-600">
                    Persona {i + 1} · {d.edad} años · {d.sexo === "varon" ? "varón" : "mujer"}
                  </dt>
                  <dd className="shrink-0 font-medium text-zinc-900">
                    {d.ae.toFixed(2).replace(".", ",")} adultos eq.
                  </dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-zinc-200 pt-1.5">
                <dt className="font-semibold text-zinc-800">Total del hogar</dt>
                <dd className="shrink-0 font-semibold text-zinc-900">
                  {resultado.adultosEquivalentes.toString().replace(".", ",")} adultos eq.
                </dd>
              </div>
            </dl>

            <p className="text-xs text-zinc-400">
              Los valores de la canasta que publica el INDEC mes a mes son los del{" "}
              <strong>Gran Buenos Aires</strong>: para el resto del país el instituto aplica
              coeficientes regionales que no salen en esta serie mensual, así que tomá el número
              como referencia nacional aproximada. Es un <strong>umbral estadístico</strong> de
              ingresos, no una categoría legal ni un requisito para ningún beneficio, y no
              contempla la vivienda propia ni el acceso gratuito a servicios.
            </p>
          </div>
        </div>
      )}

      {!resultado && (
        <p className="mt-5 text-sm text-zinc-500">
          Revisá que todas las edades sean válidas. La canasta que usamos es la de{" "}
          {etiquetaPeriodo(CANASTA_BASICA_ULTIMO.periodo)}, el último mes publicado por el INDEC.
        </p>
      )}
    </div>
  );
}
