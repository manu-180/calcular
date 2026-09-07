"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SMVM_SERIE } from "@/data/desempleo";
import { smvmVigente } from "@/lib/desempleo";
import { JORNADA_LEGAL_SEMANAL } from "@/data/salario-minimo";
import { calcularSalarioMinimo } from "@/lib/salario-minimo";
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

// Los meses se listan del más nuevo al más viejo, pero el seleccionado arranca en el VIGENTE:
// desde la Res. 4/2026 la escala tiene ocho meses que todavía no llegaron.
const PERIODOS = [...SMVM_SERIE].reverse();
const PERIODO_VIGENTE = smvmVigente().mes.periodo;

const JORNADAS_FRECUENTES = [48, 44, 36, 30, 24, 20, 16];

export function CalculadoraSalarioMinimo() {
  const [periodo, setPeriodo] = useState(PERIODO_VIGENTE);
  const [horas, setHoras] = useState(String(JORNADA_LEGAL_SEMANAL));
  const [sueldo, setSueldo] = useState("");

  const res = useMemo(
    () =>
      calcularSalarioMinimo({
        periodo,
        horasSemanales: Number(horas.replace(",", ".")),
        sueldoBruto: parseMonto(sueldo),
      }),
    [periodo, horas, sueldo],
  );

  const jornadaCompleta = res.proporcion === 1;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="sm-periodo" className="block text-sm font-semibold text-zinc-800">
            Mes
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Los meses marcados «ya fijado» son los que el laudo dejó publicados de antemano.
          </p>
          <select
            id="sm-periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className={claseInput}
          >
            {PERIODOS.map((m) => (
              <option key={m.periodo} value={m.periodo}>
                {etiquetaPeriodo(m.periodo)}
                {m.periodo > PERIODO_VIGENTE ? " (ya fijado)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sm-horas" className="block text-sm font-semibold text-zinc-800">
            Horas por semana
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            {JORNADA_LEGAL_SEMANAL} es la jornada legal completa. Menos que eso, el piso baja en la
            misma proporción.
          </p>
          <input
            id="sm-horas"
            inputMode="decimal"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            className={claseInput}
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {JORNADAS_FRECUENTES.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHoras(String(h))}
                className={`rounded-full border px-2.5 py-1 text-xs transition ${
                  Number(horas) === h
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {h} h
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="sm-sueldo" className="block text-sm font-semibold text-zinc-800">
            Tu sueldo bruto (opcional)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Para comparar contra el piso. En blanco, no se compara nada.
          </p>
          <input
            id="sm-sueldo"
            inputMode="numeric"
            placeholder="Ej.: 420.000"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="text-sm font-semibold text-emerald-900">
            {jornadaCompleta
              ? `Salario mínimo de ${etiquetaPeriodo(res.mes.periodo)}`
              : `Tu piso mensual con ${res.horasSemanales} h semanales`}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.mensual, 0)}
          </p>
          <p className="mt-1 text-sm text-emerald-900/80">
            {jornadaCompleta ? (
              <>Monto mensual para el trabajador mensualizado de jornada legal completa.</>
            ) : (
              <>
                Es el {(res.proporcion * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
                del salario mínimo de jornada completa, que ese mes es{" "}
                {formatARS(res.mensualJornadaCompleta, 0)}.
              </>
            )}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">Valor de la hora</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.porHora, 0)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            El importe por hora del trabajador jornalizado <strong>no se prorratea</strong>: vale lo
            mismo trabajes las horas que trabajes. Tus {res.horasSemanales} horas semanales son{" "}
            {res.horasMensuales.toLocaleString("es-AR", { maximumFractionDigits: 2 })} horas
            mensuales, que a ese valor dan {formatARS(res.mensualPorHoras, 0)} — el mismo piso, por
            la otra vía.
          </p>
        </div>
      </div>

      {res.comparacion ? (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            res.comparacion.estado === "debajo" ? TONOS.alerta : TONOS.info
          }`}
        >
          {res.comparacion.estado === "debajo" ? (
            <>
              <strong>Tu sueldo bruto está por debajo del piso legal.</strong> Le faltan{" "}
              {formatARS(Math.abs(res.comparacion.diferencia), 0)} para llegar al mínimo de esa
              jornada. El artículo 119 de la LCT dice que «por ninguna causa podrán abonarse salarios
              inferiores» a los fijados por el Consejo del Salario.
            </>
          ) : res.comparacion.estado === "igual" ? (
            <>
              Tu sueldo bruto es <strong>exactamente</strong> el piso legal de esa jornada.
            </>
          ) : (
            <>
              Tu sueldo bruto está <strong>{formatARS(res.comparacion.diferencia, 0)} por encima</strong>{" "}
              del piso legal de esa jornada. Si tenés convenio colectivo, el piso que te corresponde no
              es este: es el básico de tu categoría —{" "}
              <Link href="/convenios" className="underline">
                fijate la escala de tu convenio
              </Link>
              .
            </>
          )}
        </div>
      ) : null}

      <div className="mt-4 space-y-2">
        {res.avisos.map((a) => (
          <p key={a.texto} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
            {a.texto}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Los montos salen de la escala publicada en el Boletín Oficial, no de una estimación. El
        salario mínimo es un importe <strong>bruto</strong>: sobre él se aplican los aportes de ley.
      </p>
    </div>
  );
}
