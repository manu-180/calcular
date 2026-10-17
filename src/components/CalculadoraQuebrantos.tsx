"use client";

import { useMemo, useState } from "react";
import { calcularQuebranto } from "@/lib/quebrantos";
import { nombrePeriodo } from "@/lib/inflacion";
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

export function CalculadoraQuebrantos() {
  const [monto, setMonto] = useState("15000000");
  const [cierreOrigen, setCierreOrigen] = useState("2025-12");
  const [cierreLiquidado, setCierreLiquidado] = useState("2026-12");

  const error = primerError({
    "Quebranto a computar": errorMonto(monto),
  });

  const res = useMemo(
    () =>
      calcularQuebranto({
        monto: parseMonto(monto),
        cierreOrigen,
        cierreLiquidado,
      }),
    [monto, cierreOrigen, cierreLiquidado],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="monto" className="block text-sm font-semibold text-zinc-800">
            Quebranto a computar ($)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El saldo nominal, en pesos del ejercicio en que se generó.
          </p>
          <input
            id="monto"
            inputMode="numeric"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="cierreOrigen" className="block text-sm font-semibold text-zinc-800">
            Cierre del ejercicio en que se originó
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Ojo: la ley mira el <strong>inicio</strong> del ejercicio, y la calculadora lo deriva de
            acá restando once meses.
          </p>
          <input
            id="cierreOrigen"
            type="month"
            value={cierreOrigen}
            onChange={(e) => setCierreOrigen(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="cierreLiquidado" className="block text-sm font-semibold text-zinc-800">
            Cierre del ejercicio que se liquida
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Aquel contra cuyas ganancias se quiere computar el quebranto.
          </p>
          <input
            id="cierreLiquidado"
            type="month"
            value={cierreLiquidado}
            onChange={(e) => setCierreLiquidado(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá los datos: el quebranto tiene que ser mayor que cero y el ejercicio que se liquida
          tiene que cerrar después del ejercicio en que se originó.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            {res.vencido
              ? "Quebranto vencido: no se puede computar"
              : res.alcanzado
                ? "Quebranto actualizado por IPC"
                : "Quebranto sin actualización (ejercicio anterior a la reforma)"}
          </p>
          <p
            className={`mt-1 text-3xl font-bold tracking-tight ${
              res.vencido ? "text-rose-700" : "text-emerald-700"
            }`}
          >
            {res.vencido ? "No se deduce" : pesos(res.actualizado)}
          </p>
          {!res.vencido && (
            <p className="mt-1 text-sm text-zinc-600">
              Coeficiente ×
              {res.coeficiente.toLocaleString("es-AR", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}{" "}
              entre {nombrePeriodo(cierreOrigen)} y {nombrePeriodo(cierreLiquidado)}.
            </p>
          )}

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Concepto</th>
                  <th className="py-2 pl-3 text-right font-medium text-zinc-600">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Quebranto nominal</span>
                    <span className="block text-xs text-zinc-500">
                      como quedó en la declaración del ejercicio de origen
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-900">{pesos(res.nominal)}</td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Actualización por IPC</span>
                    <span className="block text-xs text-zinc-500">
                      {res.alcanzado && !res.vencido
                        ? "art. 25, undécimo párrafo, texto del art. 190 de la Ley 27.802"
                        : "no corresponde en este caso"}
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-900">
                    {res.diferencia > 0 ? `+ ${pesos(res.diferencia)}` : "—"}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">
                    Quebranto computable en el ejercicio que se liquida
                  </td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-zinc-900">
                    {res.vencido ? "$0" : pesos(res.actualizado)}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Vida útil del quebranto</span>
                    <span className="block text-xs text-zinc-500">
                      cinco años desde el ejercicio de la pérdida (art. 25, noveno párrafo)
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-900">
                    hasta el cierre de {res.ultimoAnioComputable}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a) => (
              <li
                key={a.texto}
                className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}
              >
                {a.texto}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
