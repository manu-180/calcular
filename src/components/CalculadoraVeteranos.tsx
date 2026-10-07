"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO } from "@/data/jubilaciones";
import { calcularVeteranos } from "@/lib/veteranos-malvinas";
import { formatARS } from "@/lib/formato";

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

// Últimos 24 meses, del más nuevo al más viejo: alcanza para consultar un retroactivo sin volver
// la lista inmanejable.
const PERIODOS = [...HABER_MINIMO_SERIE].reverse().slice(0, 24);

export function CalculadoraVeteranos() {
  const [periodo, setPeriodo] = useState(HABER_MINIMO_ULTIMO.periodo);
  const [quien, setQuien] = useState<"titular" | "derechohabientes">("titular");
  const [hayConyuge, setHayConyuge] = useState(true);
  const [hijos, setHijos] = useState("0");

  const res = useMemo(
    () =>
      calcularVeteranos({
        periodo,
        quien,
        hayConyuge,
        hijos: Number(hijos.replace(/[^\d]/g, "")),
      }),
    [periodo, quien, hayConyuge, hijos],
  );

  const esTitular = quien === "titular";

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vet-periodo" className="block text-sm font-semibold text-zinc-800">
            Mes
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El monto sale del haber mínimo de ese mes: se actualiza solo con la movilidad.
          </p>
          <select
            id="vet-periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className={claseInput}
          >
            {PERIODOS.map((m) => (
              <option key={m.periodo} value={m.periodo}>
                {etiquetaPeriodo(m.periodo)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vet-quien" className="block text-sm font-semibold text-zinc-800">
            Quién cobra
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La pensión derivada se reparte entre los copartícipes con su propia tabla.
          </p>
          <select
            id="vet-quien"
            value={quien}
            onChange={(e) => setQuien(e.target.value as "titular" | "derechohabientes")}
            className={claseInput}
          >
            <option value="titular">El veterano titular</option>
            <option value="derechohabientes">Los derechohabientes (el titular falleció)</option>
          </select>
        </div>

        {!esTitular ? (
          <>
            <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:self-start">
              <input
                id="vet-conyuge"
                type="checkbox"
                checked={hayConyuge}
                onChange={(e) => setHayConyuge(e.target.checked)}
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <label htmlFor="vet-conyuge" className="text-sm text-zinc-700">
                <span className="font-semibold text-zinc-800">
                  Hay viuda, viudo o conviviente con derecho
                </span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Los derechohabientes son los del art. 53 de la Ley 24.241.
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="vet-hijos" className="block text-sm font-semibold text-zinc-800">
                Hijos con derecho a pensión
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Entre ellos el reparto es siempre por partes iguales.
              </p>
              <input
                id="vet-hijos"
                inputMode="numeric"
                value={hijos}
                onChange={(e) => setHijos(e.target.value)}
                className={claseInput}
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="text-sm font-semibold text-emerald-900">
            {esTitular
              ? `Pensión del titular en ${etiquetaPeriodo(res.periodo)}`
              : "Beneficio del causante (el total que se reparte)"}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.montoTitular, 0)}
          </p>
          <p className="mt-1 text-sm text-emerald-900/80">
            Son tres veces el haber mínimo de {formatARS(res.haberMinimoUsado, 0)} (art. 2º del
            Decreto 1357/2004). Cobra además las asignaciones familiares que le correspondan.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">
            {esTitular ? "Con qué se puede cobrar a la vez" : "Cómo se reparte"}
          </p>
          {esTitular ? (
            <p className="mt-2 text-sm text-zinc-600">
              Con <strong>cualquier otro beneficio previsional permanente o de retiro</strong>{" "}
              (nacional, provincial o municipal), con otro ingreso, con el subsidio de la Ley 22.674
              y con las pensiones graciables de las Leyes 23.598 y 24.310. No hay que elegir: se
              cobran las dos cosas completas.
            </p>
          ) : res.sinDerechohabientes ? (
            <p className="mt-2 text-sm text-zinc-600">
              Marcá quiénes tienen derecho para ver el reparto.
            </p>
          ) : (
            <ul className="mt-2 space-y-2.5">
              {res.partes.map((p) => (
                <li key={p.quien} className="text-sm">
                  <span className="font-medium text-zinc-800">{p.quien}</span>
                  <span className="block tabular-nums text-zinc-900">
                    {formatARS(p.monto, 0)}{" "}
                    <span className="text-xs font-normal text-zinc-500">
                      ({(p.fraccion * 100).toLocaleString("es-AR")}% del beneficio
                      {p.personas > 1
                        ? ` · ${formatARS(p.montoPorPersona, 0)} cada uno`
                        : ""}
                      )
                    </span>
                  </span>
                  <span className="block text-xs text-zinc-500">{p.norma}</span>
                </li>
              ))}
            </ul>
          )}
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
        El haber mínimo de cada mes sale de la resolución de ANSES publicada en el Boletín Oficial;
        el multiplicador, del decreto. Acá no se estima ninguno de los dos. Para ver el haber mínimo
        y el bono del mes, está la{" "}
        <Link href="/jubilacion" className="text-emerald-700 hover:underline">
          calculadora de jubilación
        </Link>
        .
      </p>
    </div>
  );
}
