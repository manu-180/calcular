"use client";

import { useState } from "react";
import { calcularGananciasAutonomos, umbralAutonomos } from "@/lib/ganancias-autonomos";
import { formatARS, parseDecimal, parseMonto, errorMonto, primerError, errorCantidad, CANTIDAD_MAXIMA } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";


type CampoProps = { id: string; label: string; ayuda: string; value: string; onChange: (v: string) => void };

function Campo({ id, label, ayuda, value, onChange }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-zinc-800">
        {label}
      </label>
      <p className="mt-0.5 text-xs text-zinc-500">{ayuda}</p>
      <input id={id} inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)} className={claseInput} />
    </div>
  );
}

export function CalculadoraGananciasAutonomos() {
  const [ganancia, setGanancia] = useState("36000000");
  const [aporte, setAporte] = useState("150000");
  const [anios, setAnios] = useState("5");
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState("0");
  const [otras, setOtras] = useState("0");

  const error = primerError({
    "Ganancia neta anual": errorMonto(ganancia),
    "Aporte mensual": errorMonto(aporte),
    "Años de matrícula": errorCantidad(anios),
    "Hijos a cargo": errorMonto(hijos, CANTIDAD_MAXIMA),
    "Otras deducciones": errorMonto(otras),
  });

  const entrada = {
    gananciaNetaAnual: parseMonto(ganancia),
    aporteMensual: parseMonto(aporte),
    mesesDeAntiguedad: Math.round(parseDecimal(anios) * 12),
    conyuge,
    hijos: parseMonto(hijos),
    otrasDeduccionesAnual: parseMonto(otras),
  };
  const res = calcularGananciasAutonomos(entrada);
  const umbral = umbralAutonomos(entrada);

  const etiquetaTipo = {
    nuevo: "Nuevo profesional o emprendedor: deducción especial de 3 veces el no imponible",
    comun: "Deducción especial de 2,5 veces el no imponible",
    "sin-aportes": "Sin aportes: no hay deducción especial",
  }[res.tipo];

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo
          id="ganancia"
          label="Ganancia neta del año"
          ayuda="Lo que facturaste en el año menos los gastos de la actividad."
          value={ganancia}
          onChange={setGanancia}
        />
        <Campo
          id="aporte"
          label="Aporte de autónomos por mes"
          ayuda="Lo que pagás al SIPA o a tu caja profesional. Si no aportás, poné 0."
          value={aporte}
          onChange={setAporte}
        />
        <Campo
          id="anios"
          label="Años desde tu matrícula o inscripción"
          ayuda="Con hasta 3 años, sos «nuevo profesional»."
          value={anios}
          onChange={setAnios}
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-sm font-semibold text-zinc-800">Cónyuge a cargo</span>
            <label className="mt-4 flex items-center gap-2 text-sm text-zinc-700">
              <input type="checkbox" checked={conyuge} onChange={(e) => setConyuge(e.target.checked)} />
              Sí
            </label>
          </div>
          <Campo id="hijos" label="Hijos a cargo" ayuda="Menores de 18." value={hijos} onChange={setHijos} />
        </div>
        <Campo
          id="otras"
          label="Otras deducciones del año"
          ayuda="Prepaga, alquiler, seguros… ya con sus topes."
          value={otras}
          onChange={setOtras}
        />
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 space-y-4 border-t border-zinc-100 pt-5">
          <div className={`rounded-xl p-4 ${res.impuestoAnual > 0 ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}>
            <p className="text-lg font-bold">
              {res.impuestoAnual > 0
                ? `Ganancias del año: ${formatARS(res.impuestoAnual, 0)}`
                : "No pagás Ganancias con esa ganancia"}
            </p>
            <p className="mt-1 text-sm">
              {etiquetaTipo}. Empezás a pagar con una ganancia neta de <strong>{formatARS(umbral, 0)}</strong> al año.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 text-zinc-700">Ganancia neta del año</td>
                  <td className="px-3 py-2 text-right text-zinc-900">{formatARS(entrada.gananciaNetaAnual, 0)}</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 text-zinc-700">− Aportes de autónomos (12 meses)</td>
                  <td className="px-3 py-2 text-right text-zinc-900">{formatARS(res.aportesAnual, 0)}</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 text-zinc-700">− Ganancia no imponible, especial, cargas y otras</td>
                  <td className="px-3 py-2 text-right text-zinc-900">{formatARS(res.deduccionesTotales, 0)}</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-3 py-2 font-semibold text-zinc-800">Ganancia sujeta a impuesto</td>
                  <td className="px-3 py-2 text-right font-semibold text-zinc-900">{formatARS(res.gananciaNetaImponible, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {res.tipo === "nuevo" && (
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-800">Te ahorra ser «nuevo profesional»</p>
                <p className="text-xl font-bold text-emerald-800">{formatARS(res.ahorroPorNuevo, 0)}</p>
              </div>
            )}
            {res.tipo !== "sin-aportes" && (
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-xs text-zinc-500">Si dejaras de pagar los aportes, Ganancias sería</p>
                <p className="text-xl font-bold text-zinc-900">{formatARS(res.impuestoSinAportes, 0)}</p>
              </div>
            )}
          </div>

          {res.tipo === "sin-aportes" && (
            <p className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 text-sm text-rose-900">
              Sin aportes al día, la ley no deja computar la deducción especial: sólo queda el no imponible. Por eso el
              impuesto puede subir más de lo que se ahorra en aportes.
            </p>
          )}
          <p className="text-xs text-zinc-500">
            Estimación anual con la escala y las deducciones vigentes para la declaración jurada de 2026. Si sos
            monotributista, no pagás Ganancias por esta actividad.
          </p>
        </div>
        </>
      )}
    </div>
  );
}
