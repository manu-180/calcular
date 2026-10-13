"use client";

import { useMemo, useState } from "react";
import { PUAM } from "@/data/puam";
import { bonoVigente } from "@/data/prestaciones";
import {
  compararConMinima,
  evaluarPuam,
  type Ciudadania,
  type TrabajoPuam,
} from "@/lib/puam";
import { formatARS, formatPct, errorMonto, primerError, CANTIDAD_MAXIMA, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const CIUDADANIAS: { valor: Ciudadania; label: string }[] = [
  { valor: "nativo", label: "Argentino nativo o por opción" },
  { valor: "naturalizado", label: "Argentino naturalizado" },
  { valor: "extranjero", label: "Extranjero con residencia legal" },
];

const TRABAJOS: { valor: TrabajoPuam; label: string }[] = [
  { valor: "no", label: "No trabajo" },
  { valor: "dependencia", label: "En relación de dependencia" },
  { valor: "autonomo", label: "Autónomo" },
  { valor: "monotributo", label: "Monotributo (común)" },
  { valor: "efector", label: "Monotributo Social / Registro de Efectores" },
];

export function CalculadoraPuam() {
  const [edadInput, setEdadInput] = useState("65");
  const [ciudadania, setCiudadania] = useState<Ciudadania>("nativo");
  const [residenciaInput, setResidenciaInput] = useState("20");
  const [cobraOtro, setCobraOtro] = useState(false);
  const [cobraDesempleo, setCobraDesempleo] = useState(false);
  const [trabajo, setTrabajo] = useState<TrabajoPuam>("no");

  const edad = parseMonto(edadInput);
  const aniosResidencia = parseMonto(residenciaInput);

  const error = primerError({
    "Edad": errorMonto(edadInput, CANTIDAD_MAXIMA),
    "Años de residencia": errorMonto(residenciaInput, CANTIDAD_MAXIMA),
  });

  const res = useMemo(
    () =>
      evaluarPuam({
        edad,
        ciudadania,
        aniosResidencia,
        cobraOtroBeneficio: cobraOtro,
        cobraDesempleo,
        trabajo,
      }),
    [edad, ciudadania, aniosResidencia, cobraOtro, cobraDesempleo, trabajo],
  );

  const comp = compararConMinima();
  const pideResidencia = ciudadania !== "nativo";

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="edad" className="block text-sm font-semibold text-zinc-800">
            ¿Qué edad tenés?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La PUAM se pide desde los {PUAM.edadMinima}, sin importar el género ni los aportes.
          </p>
          <input
            id="edad"
            inputMode="numeric"
            value={edadInput}
            onChange={(e) => setEdadInput(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="ciudadania" className="block text-sm font-semibold text-zinc-800">
            Ciudadanía
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Define cuántos años de residencia te piden.
          </p>
          <select
            id="ciudadania"
            value={ciudadania}
            onChange={(e) => setCiudadania(e.target.value as Ciudadania)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {CIUDADANIAS.map((c) => (
              <option key={c.valor} value={c.valor}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {pideResidencia && (
          <div>
            <label htmlFor="residencia" className="block text-sm font-semibold text-zinc-800">
              Años de residencia legal en el país
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              {ciudadania === "naturalizado"
                ? `Se exigen ${PUAM.residenciaNaturalizadoAnios} años anteriores a la solicitud.`
                : `Se exigen ${PUAM.residenciaExtranjeroAnios}, con ${PUAM.residenciaExtranjeroInmediatosAnios} inmediatamente anteriores.`}
            </p>
            <input
              id="residencia"
              inputMode="numeric"
              value={residenciaInput}
              onChange={(e) => setResidenciaInput(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        )}

        <div className={pideResidencia ? "" : "sm:col-span-2"}>
          <label htmlFor="trabajo" className="block text-sm font-semibold text-zinc-800">
            ¿Trabajás?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Desde 2018 la PUAM es incompatible con trabajar, salvo una excepción.
          </p>
          <select
            id="trabajo"
            value={trabajo}
            onChange={(e) => setTrabajo(e.target.value as TrabajoPuam)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {TRABAJOS.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <label
          htmlFor="otro"
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 text-sm text-zinc-700"
        >
          <input
            id="otro"
            type="checkbox"
            checked={cobraOtro}
            onChange={(e) => setCobraOtro(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            Ya cobro una jubilación, pensión o retiro
            <span className="block text-xs text-zinc-500">
              De cualquier caja, contributivo o no contributivo.
            </span>
          </span>
        </label>

        <label
          htmlFor="desempleo"
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 text-sm text-zinc-700"
        >
          <input
            id="desempleo"
            type="checkbox"
            checked={cobraDesempleo}
            onChange={(e) => setCobraDesempleo(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            Estoy cobrando la prestación por desempleo
            <span className="block text-xs text-zinc-500">La del fondo de desempleo, Ley 24.013.</span>
          </span>
        </label>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            {res.cumpleRequisitosObjetivos
              ? "Cumplís los requisitos con número. Esto es lo que se deposita este mes"
              : "Hoy hay un requisito que no se cumple. Si se destrabara, este es el monto del mes"}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.monto.total, 2)}
          </p>

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">
                Haber ({formatPct(PUAM.proporcionHaberMinimo * 100, 0)} del mínimo)
              </dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.monto.haber, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Bono ({bonoVigente().norma})</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.monto.bono, 0)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Un jubilado de la mínima cobra</dt>
              <dd className="font-medium text-zinc-900">{formatARS(comp.totalMinima, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">O sea que cobrás el</dt>
              <dd className="font-medium text-zinc-900">
                {formatPct(comp.proporcionTotal * 100, 1)} de eso
              </dd>
            </div>
          </dl>

          <ul className="mt-4 space-y-2">
            {res.observaciones.map((o, i) => (
              <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[o.tono]}`}>
                {o.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            Esto aplica los artículos 13 a 16 de la Ley 27.260 a lo que declaraste. El otorgamiento no
            depende solo de eso: ANSES hace una evaluación socioeconómica y patrimonial previa, caso
            por caso.
          </p>
        </div>
        </>
      )}
    </div>
  );
}
