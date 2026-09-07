"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ANIOS_LABORAL, ANIOS_PREVISIONAL } from "@/data/conservacion-recibos";
import { calcularConservacion } from "@/lib/conservacion-recibos";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function hoyISO(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(
    n.getDate(),
  ).padStart(2, "0")}`;
}

export function CalculadoraConservacion() {
  const [pago, setPago] = useState("2024-06-05");
  const hoy = useMemo(() => hoyISO(), []);
  const res = useMemo(() => calcularConservacion({ pagoISO: pago, hoyISO: hoy }), [pago, hoy]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label htmlFor="pago" className="block text-sm font-semibold text-zinc-800">
          Fecha del recibo (cuándo se pagó ese sueldo)
        </label>
        <p className="mt-0.5 text-xs text-zinc-500">
          El plazo corre desde el pago, que es el momento en que nace la obligación que el recibo
          acredita.
        </p>
        <input
          id="pago"
          type="date"
          value={pago}
          onChange={(e) => setPago(e.target.value)}
          className={claseInput}
        />
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Revisá la fecha del recibo.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Hay que conservarlo hasta</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {fechaLarga(res.limiteQueMandaISO)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.previsionalVencido
              ? "Los dos plazos del artículo 143 ya vencieron para este recibo."
              : `Faltan ${res.aniosRestantes.toLocaleString("es-AR", {
                  maximumFractionDigits: 1,
                })} años. Manda el plazo previsional, que es el más largo de los dos.`}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div
              className={`rounded-xl border p-4 ${
                res.laboralVencido
                  ? "border-zinc-200 bg-white"
                  : "border-emerald-200 bg-emerald-50/50"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Obligaciones laborales · {ANIOS_LABORAL} años
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-900">
                {fechaLarga(res.limiteLaboralISO)}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                {res.laboralVencido ? "Ya vencido" : "Corriendo"} · es el plazo de prescripción del
                art. 256, que la propia ley declara de orden público.
              </p>
            </div>
            <div
              className={`rounded-xl border p-4 ${
                res.previsionalVencido
                  ? "border-zinc-200 bg-white"
                  : "border-rose-200 bg-rose-50/50"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Obligaciones previsionales · {ANIOS_PREVISIONAL} años
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-900">
                {fechaLarga(res.limitePrevisionalISO)}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                {res.previsionalVencido ? "Ya vencido" : "Corriendo"} · es el que manda mientras
                siga abierto.
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            Del otro lado del mismo problema:{" "}
            <Link href="/libro-de-sueldos" className="font-medium text-emerald-700 hover:underline">
              la presunción del art. 55
            </Link>{" "}
            — desde la reforma nace de la omisión de registración, y la constancia de pago es
            justamente la prueba que la desactiva.
          </p>
        </div>
      )}
    </div>
  );
}
