"use client";

import { useMemo, useState } from "react";
import {
  DIAS_TRAMO_MORA,
  ESCALONES,
  MULTIPLICADOR_REINCIDENCIA,
  TOPE_CUOTAS,
  type EscalonInfraccion,
} from "@/data/practicas-desleales";
import { calcularMultaPractica } from "@/lib/practicas-desleales";
import { formatARS, parseMonto, errorMonto, primerError, CANTIDAD_MAXIMA } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";
import { etiquetaMes } from "@/lib/desempleo";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraPracticasDesleales() {
  const [escalon, setEscalon] = useState<EscalonInfraccion["id"]>("muy-grave");
  const [trabajadores, setTrabajadores] = useState("10");
  const [reincidencia, setReincidencia] = useState(false);
  const [cuotasInput, setCuotasInput] = useState("");
  const [diasMora, setDiasMora] = useState("0");
  const [reparada, setReparada] = useState(false);

  const info = ESCALONES.find((x) => x.id === escalon)!;

  const error = primerError({
    "Trabajadores afectados": errorMonto(trabajadores, CANTIDAD_MAXIMA),
    "Cuotas sindicales": errorMonto(cuotasInput),
    "Días de mora": errorMonto(diasMora, CANTIDAD_MAXIMA),
  });

  const res = useMemo(
    () =>
      calcularMultaPractica({
        escalon,
        trabajadores: parseMonto(trabajadores) || 1,
        reincidencia,
        cuotasDelMes: cuotasInput.trim() ? parseMonto(cuotasInput) : undefined,
        diasDeMora: parseMonto(diasMora),
        reparadaEnPlazo: reparada,
      }),
    [escalon, trabajadores, reincidencia, cuotasInput, diasMora, reparada],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="escalon" className="block text-sm font-semibold text-zinc-800">
            ¿En qué escalón cae la infracción?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La ley sólo lo dice para las conductas del art. 20 ter (bloqueo, toma, daños): son muy
            graves. Para el resto de los incisos del art. 53 bis lo califica el juez.
          </p>
          <select
            id="escalon"
            value={escalon}
            onChange={(e) => setEscalon(e.target.value as EscalonInfraccion["id"])}
            className={claseInput}
          >
            {ESCALONES.map((x) => (
              <option key={x.id} value={x.id}>
                {x.etiqueta}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-zinc-500">{info.base}</p>
        </div>

        <div>
          <label htmlFor="trabajadores" className="block text-sm font-semibold text-zinc-800">
            Trabajadores afectados
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            {info.porTrabajador
              ? "Este escalón se multa «por cada trabajador afectado»: acá está la diferencia entre una multa chica y una enorme."
              : "En la infracción leve la ley no manda multiplicar por trabajador, así que este número no mueve el importe."}
          </p>
          <input
            id="trabajadores"
            inputMode="numeric"
            value={trabajadores}
            onChange={(e) => setTrabajadores(e.target.value)}
            disabled={!info.porTrabajador}
            className={`${claseInput} ${info.porTrabajador ? "" : "bg-zinc-100 text-zinc-400"}`}
          />
        </div>

        <div>
          <label htmlFor="cuotas" className="block text-sm font-semibold text-zinc-800">
            Cuotas sindicales recaudadas ese mes (opcional)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El art. 55 le pone al juez un techo del {Math.round(TOPE_CUOTAS * 100)}% de «los ingresos
            provenientes de las cuotas sindicales que deban pagar los afiliados en el mes en que se
            cometió la infracción».
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="cuotas"
              inputMode="numeric"
              placeholder="Ej: 40.000.000"
              value={cuotasInput}
              onChange={(e) => setCuotasInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="mora" className="block text-sm font-semibold text-zinc-800">
            Días de mora en cesar la medida
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El importe originario «se incrementará automáticamente en un diez por ciento (10%) por
            cada cinco (5) días de mora, mientras se mantenga el incumplimiento».
          </p>
          <input
            id="mora"
            inputMode="numeric"
            value={diasMora}
            onChange={(e) => setDiasMora(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
          <input
            type="checkbox"
            checked={reincidencia}
            onChange={(e) => setReincidencia(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span className="text-sm text-zinc-700">
            Prácticas desleales múltiples o reincidencia.
            <span className="block text-xs text-zinc-500">
              El art. 55 permite elevar la multa «hasta el quíntuplo del máximo previsto en la ley
              25.212». Sube el techo ×{MULTIPLICADOR_REINCIDENCIA}, no el piso.
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
          <input
            type="checkbox"
            checked={reparada}
            onChange={(e) => setReparada(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span className="text-sm text-zinc-700">
            La práctica se reparó dentro del plazo que fijó la decisión judicial.
            <span className="block text-xs text-zinc-500">
              «El importe de la sanción podrá reducirse hasta el cincuenta por ciento (50%)». Acá se
              aplica la reducción máxima, que es la que la ley habilita.
            </span>
          </span>
        </label>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 rounded-xl border-2 border-emerald-500 bg-white p-5">
          <p className="text-sm font-semibold text-zinc-700">La multa, según el art. 55</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-700">
            {formatARS(res.minimoFinal, 0)} — {formatARS(res.maximoFinal, 0)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Con el SMVM de {etiquetaMes(res.smvmPeriodo)} ({formatARS(res.smvmMensual, 0)}), que es el
            «vigente al momento de la constatación de la infracción».
          </p>
        </div>

        <dl className="mt-4 space-y-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-600">
              Escala del Anexo II
              <span className="block text-xs text-zinc-400">
                {Math.round(res.escalon.min * 100)}% a {Math.round(res.escalon.max * 100)}% del SMVM
                {res.escalon.porTrabajador
                  ? ` × ${res.trabajadoresComputados} trabajador(es)`
                  : " (no se multiplica por trabajador)"}
              </span>
            </dt>
            <dd className="shrink-0 font-medium text-zinc-900">
              {formatARS(res.minimo, 0)} — {formatARS(res.maximo, 0)}
            </dd>
          </div>
          {reincidencia && (
            <div className="flex justify-between gap-3">
              <dt className="text-zinc-600">
                Máximo quintuplicado (art. 55)
                <span className="block text-xs text-zinc-400">
                  sólo sube el techo; el piso queda igual
                </span>
              </dt>
              <dd className="shrink-0 font-medium text-zinc-900">
                {formatARS(res.maximoConReincidencia, 0)}
              </dd>
            </div>
          )}
          {res.topeCuotas !== null && (
            <div className="flex justify-between gap-3">
              <dt className="text-zinc-600">
                Techo del {Math.round(TOPE_CUOTAS * 100)}% de las cuotas del mes
                <span className="block text-xs text-zinc-400">
                  {res.topeCuotas < res.maximoConReincidencia
                    ? "manda este techo: es menor que el máximo de la escala"
                    : "no muerde: el máximo de la escala queda por debajo"}
                </span>
              </dt>
              <dd className="shrink-0 font-medium text-zinc-900">{formatARS(res.topeCuotas, 0)}</dd>
            </div>
          )}
          {res.tramosDeMora > 0 && (
            <div className="flex justify-between gap-3">
              <dt className="text-zinc-600">
                Recargo por mora
                <span className="block text-xs text-zinc-400">
                  {res.tramosDeMora} tramo(s) de {DIAS_TRAMO_MORA} días × 10%
                </span>
              </dt>
              <dd className="shrink-0 font-medium text-zinc-900">
                +{Math.round(res.recargoMora * 100)}%
              </dd>
            </div>
          )}
          {reparada && (
            <div className="flex justify-between gap-3">
              <dt className="text-zinc-600">Reducción por reparar en plazo</dt>
              <dd className="shrink-0 font-medium text-zinc-900">−50%</dd>
            </div>
          )}
        </dl>

        {res.topeChocaConElMinimo && (
          <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
            Ojo: acá el techo del {Math.round(TOPE_CUOTAS * 100)}% de las cuotas (
            {formatARS(res.topeCuotas!, 0)}) queda <strong>por debajo del mínimo</strong> de la escala
            del Anexo II ({formatARS(res.minimo, 0)}). El art. 55 no resuelve ese choque: manda aplicar
            el régimen de la Ley 25.212 «salvo las modificaciones que aquí se establecen» y después
            pone el tope, sin decir cuál gana. Los dos números están arriba; la respuesta la va a dar
            la jurisprudencia, no esta calculadora.
          </p>
        )}

        {res.smvmVencido && (
          <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
            La escala oficial del SMVM que tenemos cargada llega hasta {etiquetaMes(res.smvmPeriodo)}.
            Mientras no salga la resolución nueva del Consejo del Salario, ese es el último valor
            publicado: la multa de un mes posterior puede ser mayor.
          </p>
        )}

        <p className="mt-4 text-xs text-zinc-500">
          Orientativo. La multa la fija el juez dentro de esta escala, y el art. 55 agrega que «los
          importes de las multas serán actualizados a la fecha del efectivo pago, de acuerdo a las
          pautas de ajuste que correspondan a los créditos laborales». Eso se calcula aparte, con el
          IPC más el 3% anual del art. 276 de la LCT.
        </p>
        </>
      )}
    </div>
  );
}
