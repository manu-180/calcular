"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SMVM_SERIE } from "@/data/desempleo";
import { smvmVigente } from "@/lib/desempleo";
import { UNIVERSOS } from "@/data/garantia-82";
import { calcularGarantia82 } from "@/lib/garantia-82";
import { formatARS, parseMonto } from "@/lib/formato";

const TONOS = {
  info: "border-zinc-200 bg-zinc-50 text-zinc-700",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  alerta: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const etiquetaPeriodo = (periodo: string) => {
  const [anio, mes] = periodo.split("-");
  return `${MESES[Number(mes) - 1]} de ${anio}`;
};

const PERIODOS = [...SMVM_SERIE].reverse();

export function CalculadoraGarantia82() {
  const PERIODO_VIGENTE = smvmVigente().mes.periodo;
  const [periodo, setPeriodo] = useState(PERIODO_VIGENTE);
  const [universoId, setUniversoId] = useState(UNIVERSOS[0].id);
  const [haber, setHaber] = useState("");
  const [porMoratoria, setPorMoratoria] = useState(false);

  const res = useMemo(
    () =>
      calcularGarantia82({
        periodo,
        universoId,
        haberActual: parseMonto(haber),
        porMoratoria,
      }),
    [periodo, universoId, haber, porMoratoria],
  );

  const paga = res.suplemento > 0;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="g82-periodo" className="block text-sm font-semibold text-zinc-800">
            Mes
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El salario mínimo ya está fijado hasta el final de la escala; el haber mínimo se dicta
            mes a mes.
          </p>
          <select
            id="g82-periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className={claseInput}
          >
            {PERIODOS.map((m) => (
              <option key={m.periodo} value={m.periodo}>
                {etiquetaPeriodo(m.periodo)}
                {m.periodo > PERIODO_VIGENTE ? " (SMVM ya fijado)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="g82-universo" className="block text-sm font-semibold text-zinc-800">
            Tu situación
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La reglamentación define universos distintos, y no todos tienen el mismo nivel.
          </p>
          <select
            id="g82-universo"
            value={universoId}
            onChange={(e) => setUniversoId(e.target.value as typeof universoId)}
            className={claseInput}
          >
            {UNIVERSOS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="g82-haber" className="block text-sm font-semibold text-zinc-800">
            Tu haber mensual (opcional)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            En blanco se usa el haber mínimo garantizado, que es el piso que ya tenés por el art.
            125.
          </p>
          <input
            id="g82-haber"
            inputMode="numeric"
            placeholder="Ej.: 480.000"
            value={haber}
            onChange={(e) => setHaber(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:mt-8 sm:self-start">
          <input
            id="g82-moratoria"
            type="checkbox"
            checked={porMoratoria}
            onChange={(e) => setPorMoratoria(e.target.checked)}
            className="mt-1 h-4 w-4 accent-emerald-600"
          />
          <label htmlFor="g82-moratoria" className="text-sm text-zinc-700">
            <span className="font-semibold text-zinc-800">Me jubilé por moratoria</span>
            <span className="mt-0.5 block text-xs text-zinc-500">
              Ley 24.476 (mod. Dec. 1.454/2005), art. 6º de la Ley 25.994 o Ley 26.970. El art. 125
              bis las excluye por nombre.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          className={`rounded-xl border p-5 ${
            paga ? "border-emerald-200 bg-emerald-50/60" : "border-zinc-200 bg-zinc-50"
          }`}
        >
          <p className={`text-sm font-semibold ${paga ? "text-emerald-900" : "text-zinc-700"}`}>
            Suplemento del art. 125 bis
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.suplemento, 0)}
          </p>
          <p className={`mt-1 text-sm ${paga ? "text-emerald-900/80" : "text-zinc-600"}`}>
            {res.excluido ? (
              <>La garantía no se aplica a los beneficios obtenidos por moratoria.</>
            ) : paga ? (
              <>
                Es la diferencia entre el nivel garantizado y{" "}
                {res.haberAsumido ? "el haber mínimo" : "tu haber"} de{" "}
                {formatARS(res.haberBase, 0)}.
              </>
            ) : (
              <>
                {res.haberAsumido ? "El haber mínimo" : "Tu haber"} de {formatARS(res.haberBase, 0)}{" "}
                ya está{" "}
                {res.brechaPct.toLocaleString("es-AR", { maximumFractionDigits: 1 })}% por encima
                del nivel garantizado: no hay diferencia que pagar.
              </>
            )}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm font-semibold text-zinc-700">
            Nivel garantizado en {etiquetaPeriodo(res.mes.periodo)}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.nivel, 0)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            82% de {res.universo.smvm === 1 ? "un" : res.universo.smvm} salario
            {res.universo.smvm === 1 ? "" : "s"} mínimo{res.universo.smvm === 1 ? "" : "s"} de{" "}
            {formatARS(res.mes.mensual, 0)}.{" "}
            {res.haberMinimo === null ? (
              <>Ese mes todavía no tiene haber mínimo dictado.</>
            ) : (
              <>
                El haber mínimo garantizado de ese mes es {formatARS(res.haberMinimo, 0)}.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {res.avisos.map((a) => (
          <p key={a.texto} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
            {a.texto}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        El salario mínimo sale de la escala del Boletín Oficial y el haber mínimo, de la resolución
        mensual de ANSES: acá no se estima ninguno de los dos. Si querés ver cuánto cobrás con tu
        haber real y el bono, usá la{" "}
        <Link href="/jubilacion" className="text-emerald-700 hover:underline">
          calculadora de jubilación
        </Link>
        .
      </p>
    </div>
  );
}
