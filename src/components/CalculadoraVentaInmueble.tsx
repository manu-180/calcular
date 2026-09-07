"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALICUOTA_CEDULAR, ETIQUETAS_REGIMEN } from "@/data/venta-inmuebles";
import { calcularVentaInmueble } from "@/lib/venta-inmuebles";
import { nombrePeriodo } from "@/lib/inflacion";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;

export function CalculadoraVentaInmueble() {
  const [adquisicion, setAdquisicion] = useState("2019-06");
  const [venta, setVenta] = useState("2026-06");
  const [precioVenta, setPrecioVenta] = useState("250000000");
  const [costoAdquisicion, setCostoAdquisicion] = useState("4500000");
  const [gastos, setGastos] = useState("7500000");

  const res = useMemo(
    () =>
      calcularVentaInmueble({
        adquisicion,
        venta,
        precioVenta: Number(precioVenta) || 0,
        costoAdquisicion: Number(costoAdquisicion) || 0,
        gastos: Number(gastos) || 0,
      }),
    [adquisicion, venta, precioVenta, costoAdquisicion, gastos],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="adquisicion" className="block text-sm font-semibold text-zinc-800">
            Mes de compra
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Decide si el inmueble entró al cedular: la línea es el 1/1/2018.
          </p>
          <input
            id="adquisicion"
            type="month"
            value={adquisicion}
            onChange={(e) => setAdquisicion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="venta" className="block text-sm font-semibold text-zinc-800">
            Mes de la venta o transferencia
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Desde el 1/1/2026 la operación está exenta.
          </p>
          <input
            id="venta"
            type="month"
            value={venta}
            onChange={(e) => setVenta(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="precioVenta" className="block text-sm font-semibold text-zinc-800">
            Precio de venta ($)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">El de la escritura de venta, en pesos.</p>
          <input
            id="precioVenta"
            inputMode="numeric"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="costoAdquisicion" className="block text-sm font-semibold text-zinc-800">
            Costo de compra ($)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El nominal del momento de la compra: la calculadora lo actualiza por IPC.
          </p>
          <input
            id="costoAdquisicion"
            inputMode="numeric"
            value={costoAdquisicion}
            onChange={(e) => setCostoAdquisicion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="gastos" className="block text-sm font-semibold text-zinc-800">
            Gastos de la operación ($)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Comisiones, honorarios, impuestos y tasas relacionados con la operación — el último
            párrafo del art. 99 los deja computar.
          </p>
          <input
            id="gastos"
            inputMode="numeric"
            value={gastos}
            onChange={(e) => setGastos(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá los datos: el precio de venta tiene que ser mayor que cero y la venta no puede ser
          anterior a la compra.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">{ETIQUETAS_REGIMEN[res.regimen]}</p>
          <p
            className={`mt-1 text-3xl font-bold tracking-tight ${
              res.impuesto > 0 ? "text-rose-700" : "text-emerald-700"
            }`}
          >
            {res.impuesto > 0 ? pesos(res.impuesto) : "No se paga"}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.regimen === "exento"
              ? `Con estas cifras, antes del 1/1/2026 el cedular habría sido de ${pesos(res.impuestoSiNoEstuvieraExento)}.`
              : res.regimen === "cedular"
                ? `El ${ALICUOTA_CEDULAR * 100}% de la ganancia gravada.`
                : "Ningún impuesto nacional a la transferencia alcanza a esta operación."}
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Concepto</th>
                  <th className="py-2 pl-3 text-right font-medium text-zinc-600">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-medium text-zinc-800">Precio de venta</td>
                  <td className="py-2 pl-3 text-right text-zinc-900">
                    {pesos(Number(precioVenta) || 0)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Costo actualizado por IPC</span>
                    <span className="block text-xs text-zinc-500">
                      art. 99 inc. a) — coeficiente ×
                      {res.coeficiente.toLocaleString("es-AR", { maximumFractionDigits: 2 })} entre{" "}
                      {nombrePeriodo(adquisicion)} y {nombrePeriodo(venta)}
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-900">
                    − {pesos(res.costoActualizado)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Gastos de la operación</span>
                    <span className="block text-xs text-zinc-500">
                      comisiones, honorarios, impuestos y tasas
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-900">
                    − {pesos(Number(gastos) || 0)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">Ganancia gravada</td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-zinc-900">
                    {pesos(res.gananciaGravada)}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Impuesto cedular ({ALICUOTA_CEDULAR * 100}%)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {res.regimen === "exento"
                        ? "exento desde el 1/1/2026 — se muestra para dimensionar"
                        : "art. 99 de la Ley de Ganancias"}
                    </span>
                  </td>
                  <td
                    className={`py-2 pl-3 text-right text-base font-bold ${
                      res.impuesto > 0 ? "text-rose-700" : "text-emerald-700"
                    }`}
                  >
                    {res.regimen === "cedular"
                      ? pesos(res.impuesto)
                      : res.regimen === "exento"
                        ? `${pesos(res.impuestoSiNoEstuvieraExento)} → $0`
                        : "no aplica"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Por qué el costo se actualiza, y por qué cambia todo
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              El art. 99 inc. a) no manda restar el precio de compra: manda restar «el costo de
              adquisición, <strong>actualizado</strong>», con el índice del segundo párrafo del art.
              93 — que para las compras desde 2018 es el IPC nivel general del INDEC. Sin actualizar,
              el impuesto se calcularía sobre inflación pura: un departamento comprado en 2019
              «ganaría» miles por ciento en pesos nominales sin que su dueño haya ganado nada.
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
            ¿Alquilás en vez de vender?{" "}
            <Link href="/deduccion-alquiler" className="font-medium text-emerald-700 hover:underline">
              la deducción del alquiler y la exención del locador
            </Link>{" "}
            — es la otra mitad del mismo inciso n).
          </p>
        </div>
      )}
    </div>
  );
}
