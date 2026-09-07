"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SelectorPeriodo } from "@/components/SelectorPeriodo";
import { CUOTA_LITIS_MAXIMA, TASA_PURA_ANUAL } from "@/data/actualizacion-creditos";
import {
  actualizarCreditoLaboral,
  motivoImposible,
} from "@/lib/actualizacion-creditos";
import {
  PRIMER_PERIODO,
  ULTIMO_PERIODO,
  nombrePeriodo,
  sumarMeses,
  type Periodo,
} from "@/lib/inflacion";
import { formatARS, formatPct } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

/** El pago puede ser un mes que el INDEC todavía no publicó: el selector lo tiene que permitir. */
const MAX_PAGO = sumarMeses(ULTIMO_PERIODO, 6);

export function CalculadoraActualizacionCreditos() {
  const [monto, setMonto] = useState("3000000");
  const [desde, setDesde] = useState<Periodo>(sumarMeses(ULTIMO_PERIODO, -24));
  const [hasta, setHasta] = useState<Periodo>(ULTIMO_PERIODO);
  const [cuotaLitisPct, setCuotaLitisPct] = useState("0");

  const res = useMemo(
    () =>
      actualizarCreditoLaboral({
        monto: Number(monto) || 0,
        desde,
        hasta,
        cuotaLitisPct: Number(cuotaLitisPct) || 0,
      }),
    [monto, desde, hasta, cuotaLitisPct],
  );

  const imposible = motivoImposible(desde, hasta);
  const litis = Number(cuotaLitisPct) || 0;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="monto" className="block text-sm font-semibold text-zinc-800">
            Monto del crédito, en plata de esa fecha
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La indemnización, las diferencias salariales o el rubro que reclamás, con el valor
            nominal que tenía cuando se hizo exigible.
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
          <label htmlFor="litis" className="block text-sm font-semibold text-zinc-800">
            Pacto de cuota litis (%)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Opcional. El art. 277 lo topea en el {formatPct(CUOTA_LITIS_MAXIMA * 100, 0)} del monto
            del proceso.
          </p>
          <input
            id="litis"
            inputMode="numeric"
            value={cuotaLitisPct}
            onChange={(e) => setCuotaLitisPct(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="desde-mes" className="block text-sm font-semibold text-zinc-800">
            Mes en que la suma se hizo debida
          </label>
          <p className="mt-0.5 mb-2 text-xs text-zinc-500">
            El art. 276 mide «desde que cada suma sea debida»: para una indemnización, el mes del
            despido.
          </p>
          <SelectorPeriodo
            id="desde-mes"
            value={desde}
            onChange={setDesde}
            min={PRIMER_PERIODO}
            max={MAX_PAGO}
          />
        </div>

        <div>
          <label htmlFor="hasta-mes" className="block text-sm font-semibold text-zinc-800">
            Mes del efectivo pago
          </label>
          <p className="mt-0.5 mb-2 text-xs text-zinc-500">
            Último IPC publicado: {nombrePeriodo(ULTIMO_PERIODO)}. Si el pago es posterior, se ve
            abajo cuánto queda sin repotenciar.
          </p>
          <SelectorPeriodo
            id="hasta-mes"
            value={hasta}
            onChange={setHasta}
            min={PRIMER_PERIODO}
            max={MAX_PAGO}
          />
        </div>
      </div>

      {imposible || !res ? (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 p-5 text-sm text-rose-900">
          {imposible ??
            "Cargá un monto mayor que cero para ver la actualización."}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Crédito actualizado al {nombrePeriodo(res.hastaPedido)}, art. 276 LCT
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.total, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.meses > 0 ? (
              <>
                {res.meses} {res.meses === 1 ? "mes" : "meses"} de demora ·{" "}
                <strong>
                  {res.multiplicador.toLocaleString("es-AR", { maximumFractionDigits: 2 })} veces
                </strong>{" "}
                el nominal · la inflación del tramo fue {formatPct(res.inflacionPct, 1)}
              </>
            ) : (
              "sin demora: el crédito se paga en el mismo mes en que se hizo debido"
            )}
          </p>

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Monto nominal</dt>
              <dd className="font-medium text-zinc-900">{formatARS(Number(monto) || 0, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">
                Coeficiente IPC ({nombrePeriodo(res.desde)} → {nombrePeriodo(res.hastaIpc)})
              </dt>
              <dd className="font-medium text-zinc-900">
                {res.coeficiente.toLocaleString("es-AR", {
                  minimumFractionDigits: 4,
                  maximumFractionDigits: 4,
                })}
              </dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Capital actualizado por IPC</dt>
              <dd className="font-semibold text-emerald-700">
                {formatARS(res.capitalActualizado, 2)}
              </dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">
                Interés del {formatPct(TASA_PURA_ANUAL * 100, 0)} anual (simple)
              </dt>
              <dd className="font-medium text-zinc-900">{formatARS(res.interesPuro, 2)}</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Si ese 3% se capitalizara</dt>
              <dd className="font-medium text-zinc-500">
                {formatARS(res.totalCompuesto, 2)}{" "}
                <span className="text-xs">
                  ({formatARS(res.totalCompuesto - res.total, 2)} más)
                </span>
              </dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Índices usados</dt>
              <dd className="font-medium text-zinc-900">
                {res.indiceDesde.toLocaleString("es-AR", { maximumFractionDigits: 2 })} →{" "}
                {res.indiceHasta.toLocaleString("es-AR", { maximumFractionDigits: 2 })}
              </dd>
            </div>
            {litis > 0 && (
              <>
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Cuota litis ({formatPct(Math.min(litis, 20), 0)})</dt>
                  <dd className="font-medium text-amber-700">− {formatARS(res.cuotaLitis, 2)}</dd>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Le queda al trabajador</dt>
                  <dd className="font-bold text-zinc-900">{formatARS(res.neto, 2)}</dd>
                </div>
              </>
            )}
          </dl>

          {res.avisos.length > 0 && (
            <ul className="mt-4 space-y-2">
              {res.avisos.map((a, i) => (
                <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
                  {a.texto}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-xs text-zinc-500">
            El art. 276 actualiza <strong>cada suma desde que es debida</strong>: una liquidación
            con rubros de fechas distintas se calcula rubro por rubro y se suman los resultados.
            Esta calculadora resuelve un rubro por vez. Si todavía no sabés cuánto te corresponde,
            empezá por{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la calculadora de indemnización por despido
            </Link>{" "}
            y traé ese número acá.
          </p>
        </div>
      )}
    </div>
  );
}
