"use client";

import { useMemo, useState } from "react";
import { ALICUOTA_DIVIDENDOS, ULTIMO_ANIO_ESCALA, escalasDisponibles } from "@/data/ganancias-sociedades";
import { calcularGananciasSociedades } from "@/lib/ganancias-sociedades";
import { formatARS, parseMonto, errorMonto, primerError } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pct = (n: number, d = 2) => `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: d })}%`;

const ANIOS = escalasDisponibles()
  .map((e) => e.anio)
  .reverse();

const DISTRIBUCIONES = [
  { valor: "0", label: "Nada: queda en la sociedad" },
  { valor: "0.5", label: "La mitad" },
  { valor: "1", label: "Todo" },
];

export function CalculadoraGananciasSociedades() {
  const [ganancia, setGanancia] = useState("500000000");
  const [anio, setAnio] = useState(String(ULTIMO_ANIO_ESCALA));
  const [distribuido, setDistribuido] = useState("0");

  const error = primerError({
    "Ganancia neta imponible": errorMonto(ganancia),
  });

  const res = useMemo(
    () =>
      calcularGananciasSociedades({
        gananciaNetaImponible: parseMonto(ganancia),
        anioInicioEjercicio: Number(anio),
        porcentajeDistribuido: Number(distribuido),
      }),
    [ganancia, anio, distribuido],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="ganancia" className="block text-sm font-semibold text-zinc-800">
            Ganancia neta imponible del ejercicio
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La del balance impositivo, después de ajustes y quebrantos. En pesos, sin puntos.
          </p>
          <input
            id="ganancia"
            inputMode="numeric"
            value={ganancia}
            onChange={(e) => setGanancia(e.target.value)}
            className={claseInput}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="anio" className="block text-sm font-semibold text-zinc-800">
            Año en que empezó el ejercicio
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">No el del cierre.</p>
          <select id="anio" value={anio} onChange={(e) => setAnio(e.target.value)} className={claseInput}>
            {ANIOS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="distribuido" className="block text-sm font-semibold text-zinc-800">
            ¿Cuánto se reparte como dividendos a socios personas humanas?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Sobre lo que queda después del impuesto.</p>
          <select
            id="distribuido"
            value={distribuido}
            onChange={(e) => setDistribuido(e.target.value)}
            className={claseInput}
          >
            {DISTRIBUCIONES.map((d) => (
              <option key={d.valor} value={d.valor}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res && (
        <div className="mt-6 space-y-4 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-emerald-800">Impuesto determinado</p>
              <p className="text-xl font-bold text-emerald-800">{formatARS(res.impuesto, 2)}</p>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-xs text-zinc-500">Alícuota efectiva</p>
              <p className="text-xl font-bold text-zinc-900">{pct(res.alicuotaEfectiva)}</p>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-xs text-zinc-500">Cada peso extra paga</p>
              <p className="text-xl font-bold text-zinc-900">{pct(res.alicuotaMarginal, 0)}</p>
            </div>
          </div>

          <p className="text-sm text-zinc-600">
            Escala de los ejercicios iniciados en <strong>{res.escala.anio}</strong>: tramo del{" "}
            {pct(res.tramo.alicuota, 0)}. Pagás {formatARS(res.tramo.fijo, 2)} de fijo más el{" "}
            {pct(res.tramo.alicuota, 0)} de lo que supera {formatARS(res.tramo.desde, 2)}. A ese monto se le restan
            los anticipos, retenciones y percepciones del período.
          </p>

          {res.dividendos > 0 && (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-xs text-zinc-500">Dividendos repartidos</p>
                <p className="text-lg font-bold text-zinc-900">{formatARS(res.dividendos, 0)}</p>
              </div>
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-xs text-zinc-500">Retención del {pct(ALICUOTA_DIVIDENDOS, 0)}</p>
                <p className="text-lg font-bold text-zinc-900">{formatARS(res.retencionDividendos, 0)}</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-800">Carga total sobre la ganancia</p>
                <p className="text-lg font-bold text-emerald-800">{pct(res.cargaTotalEfectiva)}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
