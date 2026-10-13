"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ETIQUETAS_BASE, RUBROS } from "@/data/impuestos-internos";
import { calcularImpuestoInterno } from "@/lib/impuestos-internos";
import { errorMonto, primerError, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;
const pct = (t: number) =>
  `${(t * 100).toLocaleString("es-AR", { maximumFractionDigits: 2 })}%`;

export function CalculadoraImpuestosInternos() {
  const [rubroId, setRubroId] = useState("celular");
  const [importe, setImporte] = useState("50000");

  const error = primerError({
    "Importe": errorMonto(importe),
  });

  const res = useMemo(
    () => calcularImpuestoInterno({ rubroId, importe: parseMonto(importe) }),
    [rubroId, importe],
  );

  const rubro = RUBROS.find((r) => r.id === rubroId);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rubro" className="block text-sm font-semibold text-zinc-800">
            Rubro
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Los cinco que nombra el art. 195, abiertos por alícuota.
          </p>
          <select
            id="rubro"
            value={rubroId}
            onChange={(e) => setRubroId(e.target.value)}
            className={claseInput}
          >
            {RUBROS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.etiqueta} — {r.alicuotaTexto}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="importe" className="block text-sm font-semibold text-zinc-800">
            Importe con impuesto ($)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            {rubro ? `El ${ETIQUETAS_BASE[rubro.base]}.` : "El importe de la operación."}
          </p>
          <input
            id="importe"
            inputMode="numeric"
            value={importe}
            onChange={(e) => setImporte(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {rubro && (
        <p className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
          <strong className="text-zinc-800">{rubro.etiqueta}</strong> · Ley 24.674,{" "}
          {rubro.articulo} — {rubro.detalle}
        </p>
      )}

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Cargá un importe mayor que cero.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Impuesto interno contenido en ese importe</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-700">
            {pesos(res.impuestoContenido)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Es el {pct(res.participacionEnElImporte)} del importe. Sin el impuesto, quedaban{" "}
            {pesos(res.importeSinImpuesto)}.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Concepto</th>
                  <th className="py-2 pl-3 text-right font-medium text-zinc-600">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Alícuota nominal</span>
                    <span className="block text-xs text-zinc-500">
                      la que dice la ley ({res.rubro.articulo})
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {res.rubro.alicuotaTexto}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Sobrecosto sobre el precio limpio
                    </span>
                    <span className="block text-xs text-zinc-500">
                      la tasa efectiva: alícuota ÷ (1 − alícuota), por el art. 4°
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-zinc-900">
                    {pct(res.tasaEfectiva)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-medium text-zinc-800">
                    Precio sin el impuesto interno
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {pesos(res.importeSinImpuesto)}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3 font-medium text-zinc-800">
                    Etapas alcanzadas
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {res.rubro.todasLasEtapas ? "todas las de comercialización" : "una sola"}
                    <span className="block text-xs font-normal text-zinc-500">
                      art. 2° de la Ley 24.674
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Por qué acá no dice cuánto bajó el precio
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Porque no lo dice la ley. El art. 195 elimina el impuesto; que el vendedor traslade ese
              ahorro al precio es una decisión comercial suya. Lo que sí es un hecho verificable es
              cuánto del importe era impuesto, y es lo que muestra la tabla.
            </p>
          </div>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            ¿Buscabas el otro impuesto que la misma ley tocó?{" "}
            <Link href="/plazo-fijo" className="font-medium text-emerald-700 hover:underline">
              la exención de Ganancias a los plazos fijos
            </Link>{" "}
            cambió con el art. 191 de la Ley 27.802.
          </p>
        </div>
      )}
    </div>
  );
}
