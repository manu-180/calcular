"use client";

import { useMemo, useState } from "react";
import { calcularCuotaAlimentaria, type HijoInput } from "@/lib/cuota-alimentaria";
import { CANASTA_CRIANZA_ULTIMO, TRAMOS_CRIANZA } from "@/data/canasta-crianza";
import { formatARS, parseMonto } from "@/lib/formato";

const OPCIONES: { valor: HijoInput["tramo"]; texto: string }[] = [
  ...TRAMOS_CRIANZA.map((t) => ({ valor: t.id as HijoInput["tramo"], texto: t.nombre })),
  { valor: "mayor-12", texto: "13 años o más" },
];

const MAX_HIJOS = 6;

export function CalculadoraCuotaAlimentaria() {
  const [hijos, setHijos] = useState<HijoInput["tramo"][]>(["6-a-12"]);
  const [ingresoInput, setIngresoInput] = useState("");
  const [otroInput, setOtroInput] = useState("");
  const [informaOtro, setInformaOtro] = useState(true);
  const [cuidadoCompartido, setCuidadoCompartido] = useState(false);

  const ingreso = useMemo(() => parseMonto(ingresoInput), [ingresoInput]);
  const otro = useMemo(() => parseMonto(otroInput), [otroInput]);

  const resultado = useMemo(
    () =>
      calcularCuotaAlimentaria({
        hijos: hijos.map((tramo) => ({ tramo })),
        ingresoAlimentante: ingreso,
        ingresoOtro: informaOtro ? otro : null,
        cuidadoLoEjerceElOtro: !cuidadoCompartido,
      }),
    [hijos, ingreso, otro, informaOtro, cuidadoCompartido],
  );

  const todosMayores = hijos.length > 0 && hijos.every((t) => t === "mayor-12");

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <fieldset>
          <legend className="block text-sm font-semibold text-zinc-800">
            ¿Qué edad tienen los hijos?
          </legend>
          <p className="mt-0.5 text-xs text-zinc-500">
            El INDEC publica el costo de crianza por tramo de edad, hasta los 12 años inclusive.
          </p>
          <div className="mt-2 space-y-2">
            {hijos.map((tramo, i) => (
              <div key={i} className="flex items-center gap-2">
                <label htmlFor={`hijo-${i}`} className="w-20 shrink-0 text-sm text-zinc-600">
                  Hijo {i + 1}
                </label>
                <select
                  id={`hijo-${i}`}
                  value={tramo}
                  onChange={(e) =>
                    setHijos((prev) =>
                      prev.map((t, j) => (j === i ? (e.target.value as HijoInput["tramo"]) : t)),
                    )
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                >
                  {OPCIONES.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.texto}
                    </option>
                  ))}
                </select>
                {hijos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setHijos((prev) => prev.filter((_, j) => j !== i))}
                    aria-label={`Quitar hijo ${i + 1}`}
                    className="shrink-0 rounded-lg border border-zinc-200 px-2.5 py-2 text-sm text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
                  >
                    Quitar
                  </button>
                )}
              </div>
            ))}
          </div>
          {hijos.length < MAX_HIJOS && (
            <button
              type="button"
              onClick={() => setHijos((prev) => [...prev, "6-a-12"])}
              className="mt-2.5 text-sm font-medium text-emerald-700 hover:underline"
            >
              + Agregar otro hijo
            </button>
          )}
        </fieldset>

        <div>
          <label htmlFor="ingreso-alimentante" className="block text-sm font-semibold text-zinc-800">
            Ingreso neto mensual de quien paga la cuota
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Lo que le queda en mano por mes (sueldo de bolsillo, o el promedio si es variable).
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="ingreso-alimentante"
              inputMode="numeric"
              placeholder="Ej: 1.500.000"
              value={ingresoInput}
              onChange={(e) => setIngresoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={informaOtro}
            onChange={(e) => setInformaOtro(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Sé cuánto gana el otro progenitor
            <span className="block text-xs text-zinc-500">
              Con los dos ingresos se puede repartir el costo según la capacidad de cada uno, que
              es lo que mira el juez (art. 666 del Código Civil y Comercial).
            </span>
          </span>
        </label>

        {informaOtro && (
          <div>
            <label htmlFor="ingreso-otro" className="block text-sm font-semibold text-zinc-800">
              Ingreso neto mensual del otro progenitor
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Si no tiene ingresos propios, poné 0.
            </p>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="ingreso-otro"
                inputMode="numeric"
                placeholder="Ej: 900.000"
                value={otroInput}
                onChange={(e) => setOtroInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        )}

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={cuidadoCompartido}
            onChange={(e) => setCuidadoCompartido(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            El cuidado es compartido, con residencia alternada
            <span className="block text-xs text-zinc-500">
              Por defecto asumimos que el día a día lo lleva el otro progenitor: ese trabajo tiene
              valor económico y cuenta como aporte suyo (art. 660).
            </span>
          </span>
        </label>
      </div>

      {todosMayores && (
        <div className="mt-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Para 13 años o más no hay dato oficial de costo</p>
          <p className="mt-1">
            La canasta de crianza del INDEC llega hasta los 12 años inclusive, así que no tenemos
            un número oficial para estimar. Preferimos decírtelo antes que inventar una cifra. La
            obligación alimentaria igual sigue: llega hasta los 21 años, o 25 si estudia y no puede
            mantenerse (art. 663).
          </p>
        </div>
      )}

      {resultado && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500">
                Criar {resultado.hijosComputados === 1 ? "a ese hijo" : `a esos ${resultado.hijosComputados} hijos`}{" "}
                cuesta por mes ({resultado.mesEtiqueta})
              </p>
              <p className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                {formatARS(resultado.costoTotal, 0)}
              </p>
            </div>

            {resultado.cuotaEstimada !== null ? (
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-sm text-emerald-900">
                  Repartiendo ese costo según lo que gana cada uno, a quien paga la cuota le
                  correspondería aportar el{" "}
                  <strong>{Math.round(resultado.participacion! * 100)}%</strong>:
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-700 sm:text-4xl">
                  {formatARS(resultado.cuotaEstimada, 0)}
                  <span className="text-base font-medium text-emerald-800"> por mes</span>
                </p>
                <p className="mt-1.5 text-sm text-emerald-900">
                  Es el <strong>{resultado.pctIngreso!.toFixed(1)}%</strong> de su ingreso neto.
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
                <p>
                  Sin saber cuánto gana el otro progenitor no se puede repartir el costo por
                  capacidad económica. Dos referencias para ubicarte:
                </p>
                <ul className="mt-2 space-y-1">
                  <li>
                    Si los dos ganaran parecido, a cada uno le tocaría{" "}
                    <strong>{formatARS(resultado.refMitad, 0)}</strong> por mes.
                  </li>
                  <li>
                    Si el otro progenitor no tuviera ingresos, el costo completo quedaría de un solo
                    lado: <strong>{formatARS(resultado.refTotal, 0)}</strong>.
                  </li>
                </ul>
              </div>
            )}

            <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-600">Bienes y servicios (comida, ropa, salud, escuela, transporte)</dt>
                <dd className="shrink-0 font-medium text-zinc-900">
                  {formatARS(resultado.costoBienes, 0)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-600">Cuidado (las horas de crianza, valorizadas)</dt>
                <dd className="shrink-0 font-medium text-zinc-900">
                  {formatARS(resultado.costoCuidado, 0)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-zinc-200 pt-1.5">
                <dt className="font-semibold text-zinc-800">Costo total de crianza</dt>
                <dd className="shrink-0 font-semibold text-zinc-900">
                  {formatARS(resultado.costoTotal, 0)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-600">
                  {cuidadoCompartido
                    ? "Cuidado que aporta en especie el otro progenitor (mitad)"
                    : "Cuidado que aporta en especie el otro progenitor"}
                </dt>
                <dd className="shrink-0 font-medium text-emerald-700">
                  {formatARS(resultado.aporteEnEspecieDelOtro, 0)}
                </dd>
              </div>
            </dl>

            {resultado.hijosSinTramoOficial > 0 && (
              <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                {resultado.hijosSinTramoOficial === 1
                  ? "Un hijo de 13 años o más quedó fuera de la cuenta"
                  : `${resultado.hijosSinTramoOficial} hijos de 13 años o más quedaron fuera de la cuenta`}
                : la canasta del INDEC no llega a esa edad y no extrapolamos. El costo real es más
                alto que el que ves acá.
              </p>
            )}

            <p className="text-xs text-zinc-400">
              Esto es una <strong>estimación orientativa</strong> con el último dato del INDEC
              ({resultado.mesEtiqueta}), no una cuota fijada. El monto lo acuerdan los progenitores
              y, si no hay acuerdo, lo resuelve un juez caso por caso: pondera las necesidades del
              hijo y la capacidad económica real de cada progenitor, e incluye cosas que ninguna
              tabla puede saber (colegio privado, tratamientos de salud, obra social, deudas,
              vivienda). Consultá con un abogado antes de tomar cualquier decisión.
            </p>
          </div>
        </div>
      )}

      {!resultado && !todosMayores && (
        <p className="mt-5 text-sm text-zinc-500">
          Completá el ingreso mensual para ver la estimación. La canasta que usamos es la de{" "}
          {CANASTA_CRIANZA_ULTIMO.etiqueta}, el último mes publicado por el INDEC.
        </p>
      )}
    </div>
  );
}
