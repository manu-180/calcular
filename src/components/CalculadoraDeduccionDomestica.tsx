"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CONDICIONES, VIGENCIA_APORTES, type CondicionTrabajador } from "@/data/aportes-casas-particulares";
import { DEDUCCION_VIGENCIA } from "@/data/deduccion-domestica";
import { calcularDeduccionDomestica } from "@/lib/deduccion-domestica";
import { formatARS, errorMonto, primerError, CANTIDAD_MAXIMA, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraDeduccionDomestica() {
  const [sueldoMensual, setSueldoMensual] = useState("450000");
  const [mesesTrabajados, setMesesTrabajados] = useState("12");
  const [incluirAguinaldo, setIncluirAguinaldo] = useState(true);
  const [horasSemanales, setHorasSemanales] = useState(16);
  const [condicion, setCondicion] = useState<CondicionTrabajador>("activo-mayor-18");
  const [brutoEmpleador, setBrutoEmpleador] = useState("3500000");
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState("0");

  const error = primerError({
    "Sueldo que le pagás": errorMonto(sueldoMensual),
    "Tu sueldo bruto mensual": errorMonto(brutoEmpleador),
    "Hijos a cargo": errorMonto(hijos, CANTIDAD_MAXIMA),
  });

  const res = useMemo(
    () =>
      calcularDeduccionDomestica({
        sueldoMensual: parseMonto(sueldoMensual),
        mesesTrabajados: Number(mesesTrabajados) || 0,
        incluirAguinaldo,
        horasSemanales,
        condicion,
        brutoMensualEmpleador: parseMonto(brutoEmpleador),
        conyuge,
        hijos: parseMonto(hijos),
      }),
    [sueldoMensual, mesesTrabajados, incluirAguinaldo, horasSemanales, condicion, brutoEmpleador, conyuge, hijos],
  );

  const topeAlcanzado = res.excedente > 0;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sueldo" className="block text-sm font-semibold text-zinc-800">
            Sueldo mensual que le pagás
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Lo que cobra de bolsillo por mes, sin los aportes.</p>
          <input
            id="sueldo"
            inputMode="numeric"
            value={sueldoMensual}
            onChange={(e) => setSueldoMensual(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="bruto" className="block text-sm font-semibold text-zinc-800">
            Tu sueldo bruto mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Define tu alícuota: de eso depende cuánta plata te vuelve.
          </p>
          <input
            id="bruto"
            inputMode="numeric"
            value={brutoEmpleador}
            onChange={(e) => setBrutoEmpleador(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="horas" className="block text-sm font-semibold text-zinc-800">
            Horas por semana en tu casa: <span className="font-bold text-emerald-700">{horasSemanales}</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Determinan la fila de la tabla de ARCA, o sea cuánto ingresás por mes en contribuciones.
          </p>
          <input
            id="horas"
            type="range"
            min={1}
            max={48}
            value={horasSemanales}
            onChange={(e) => setHorasSemanales(Number(e.target.value))}
            className="mt-3 w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-zinc-400">
            <span>1 h</span>
            <span>48 h</span>
          </div>
        </div>

        <div>
          <label htmlFor="meses" className="block text-sm font-semibold text-zinc-800">
            Meses trabajados en el año
          </label>
          <select
            id="meses"
            value={mesesTrabajados}
            onChange={(e) => setMesesTrabajados(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {Array.from({ length: 12 }, (_, i) => 12 - i).map((m) => (
              <option key={m} value={m}>
                {m} {m === 1 ? "mes" : "meses"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cond" className="block text-sm font-semibold text-zinc-800">
            Situación de la persona
          </label>
          <select
            id="cond"
            value={condicion}
            onChange={(e) => setCondicion(e.target.value as CondicionTrabajador)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {CONDICIONES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hijos" className="block text-sm font-semibold text-zinc-800">
            Hijos a cargo (tuyos, para Ganancias)
          </label>
          <input
            id="hijos"
            inputMode="numeric"
            value={hijos}
            onChange={(e) => setHijos(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="flex flex-col justify-end gap-2 pb-1">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-800">
            <input
              type="checkbox"
              checked={incluirAguinaldo}
              onChange={(e) => setIncluirAguinaldo(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Le pagaste aguinaldo
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-800">
            <input
              type="checkbox"
              checked={conyuge}
              onChange={(e) => setConyuge(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Deducís cónyuge en tu Ganancias
          </label>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Lo que te vuelve en el año por esta deducción</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.ahorroAnual, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.ahorroAnual > 0 ? (
              <>
                {formatARS(res.ahorroMensual, 2)} por mes · te devuelve el{" "}
                <strong>
                  {(res.alicuotaEfectiva * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
                </strong>{" "}
                de lo que deducís, no el total
              </>
            ) : (
              "no hay ahorro: la deducción baja la base imponible, pero no estás pagando el impuesto"
            )}
          </p>

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Sueldos + aguinaldo del año</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.remuneracionAnual, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Contribuciones (SIPA + salud)</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.contribucionesAnual, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Total computable</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.computable, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Tope anual (ganancia no imponible)</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.tope, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Deducción que podés computar</dt>
              <dd className="font-semibold text-emerald-700">{formatARS(res.deduccionAplicada, 2)}</dd>
            </div>
            {topeAlcanzado && (
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Excedente que se pierde</dt>
                <dd className="font-semibold text-amber-700">{formatARS(res.excedente, 2)}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Cuota ART del año (pagada, no computada)</dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.artAnual, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Tu Ganancias del año: antes → después</dt>
              <dd className="font-medium text-zinc-900">
                {formatARS(res.impuestoSin.impuestoAnual, 2)} → {formatARS(res.impuestoCon.impuestoAnual, 2)}
              </dd>
            </div>
          </dl>

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
            Tope y escala del impuesto: {DEDUCCION_VIGENCIA}. Contribuciones: tabla de ARCA de{" "}
            {VIGENCIA_APORTES.mesVigente}, tomadas como referencia para todos los meses del año (si
            durante el año hubo tablas distintas, el número real es algo mayor). Estimación orientativa,
            no una liquidación: el sueldo lo calculás en{" "}
            <Link href="/empleada-domestica" className="font-medium text-emerald-700 hover:underline">
              la escala de casas particulares
            </Link>{" "}
            y tu impuesto, mes a mes, en{" "}
            <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
              la calculadora de Ganancias
            </Link>
            .
          </p>
        </div>
        </>
      )}
    </div>
  );
}
