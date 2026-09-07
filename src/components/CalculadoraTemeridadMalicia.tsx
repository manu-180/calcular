"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SelectorPeriodo } from "@/components/SelectorPeriodo";
import { MULTIPLICADOR_MAXIMO, TOPE_COSTAS, VIGENCIA_REFORMA } from "@/data/temeridad-malicia";
import { calcularTemeridad } from "@/lib/temeridad-malicia";
import { formatARS, parseMonto, parseDecimal } from "@/lib/formato";
import {
  PRIMER_PERIODO,
  ULTIMO_PERIODO,
  nombrePeriodo,
  sumarMeses,
  type Periodo,
} from "@/lib/inflacion";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const claseSelect =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const MAX_PAGO = sumarMeses(ULTIMO_PERIODO, 6);

export function CalculadoraTemeridadMalicia() {
  const [monto, setMonto] = useState("8.000.000");
  const [desde, setDesde] = useState<Periodo>(sumarMeses(ULTIMO_PERIODO, -24));
  const [hasta, setHasta] = useState<Periodo>(ULTIMO_PERIODO);
  const [tasa, setTasa] = useState("50");
  const [multiplicador, setMultiplicador] = useState("2.5");
  const [acuerdo, setAcuerdo] = useState("no");

  const res = useMemo(
    () =>
      calcularTemeridad({
        monto: parseMonto(monto),
        desde,
        hasta,
        tasaAnualPct: parseDecimal(tasa),
        multiplicador: parseDecimal(multiplicador),
        acuerdoHomologadoIncumplido: acuerdo === "si",
      }),
    [monto, desde, hasta, tasa, multiplicador, acuerdo],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="monto" className="block text-sm font-semibold text-zinc-800">
            Monto del crédito
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            En pesos del momento en que la suma se hizo debida, no de hoy.
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
          <label htmlFor="tasa" className="block text-sm font-semibold text-zinc-800">
            Tasa bancaria anual de referencia (%)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La ley no la publicaba: hablaba de la que cobran los bancos oficiales para descuento de
            documentos comerciales. La fija el expediente, no esta página.
          </p>
          <input
            id="tasa"
            inputMode="decimal"
            value={tasa}
            onChange={(e) => setTasa(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="desde-mes" className="block text-sm font-semibold text-zinc-800">
            Mes en que la suma se hizo debida
          </label>
          <p className="mt-0.5 mb-2 text-xs text-zinc-500">
            Para una indemnización, el mes del despido. Es también la mora del art. 275.
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
            Último IPC publicado: {nombrePeriodo(ULTIMO_PERIODO)}.
          </p>
          <SelectorPeriodo
            id="hasta-mes"
            value={hasta}
            onChange={setHasta}
            min={PRIMER_PERIODO}
            max={MAX_PAGO}
          />
        </div>

        <div>
          <label htmlFor="acuerdo" className="block text-sm font-semibold text-zinc-800">
            ¿Hubo un acuerdo homologado que no se cumplió?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si sí, el tercer párrafo del art. 275 aplicaba el máximo de oficio.
          </p>
          <select
            id="acuerdo"
            value={acuerdo}
            onChange={(e) => setAcuerdo(e.target.value)}
            className={claseSelect}
          >
            <option value="no">No</option>
            <option value="si">Sí, hubo acuerdo homologado incumplido</option>
          </select>
        </div>

        <div>
          <label htmlFor="multiplicador" className="block text-sm font-semibold text-zinc-800">
            Multiplicador que habría graduado el juez
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El art. 275 decía «de hasta» {MULTIPLICADOR_MAXIMO.toLocaleString("es-AR")} veces.
          </p>
          <select
            id="multiplicador"
            value={multiplicador}
            onChange={(e) => setMultiplicador(e.target.value)}
            disabled={acuerdo === "si"}
            className={`${claseSelect} disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500`}
          >
            <option value="1">1× (la tasa sola)</option>
            <option value="1.5">1,5×</option>
            <option value="2">2×</option>
            <option value="2.5">2,5× (el máximo del artículo)</option>
          </select>
        </div>
      </div>

      {!res ? (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 p-5 text-sm text-rose-900">
          Cargá un monto mayor que cero y un período que exista en la serie oficial del IPC (desde{" "}
          {nombrePeriodo(PRIMER_PERIODO)}).
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Lo que la derogación del art. {275} sacó de la mesa, a {" "}
            {res.elegido.multiplicador.toLocaleString("es-AR")}×
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.diferencia, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Hoy el crédito llega a {formatARS(res.hoy.total, 2)} por el art. 276 (IPC del INDEC más
            el 3% anual, {res.anios.toLocaleString("es-AR")} años). Hasta el {VIGENCIA_REFORMA}, si
            se declaraba maliciosa o temeraria la conducta del empleador, arriba de eso corría el
            interés sancionatorio: el reclamo habría sido de {formatARS(res.totalConSancion, 2)}.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                  <th className="pb-2 font-semibold">
                    Multiplicador del art. 275
                    <span className="block text-[10px] font-normal normal-case tracking-normal">
                      lo graduaba el juez, entre 1 y 2,5
                    </span>
                  </th>
                  <th className="pb-2 text-right font-semibold">Interés sancionatorio</th>
                  <th className="pb-2 text-right font-semibold">Total del reclamo</th>
                </tr>
              </thead>
              <tbody>
                {res.tramos.map((t) => (
                  <tr key={t.multiplicador} className="border-b border-zinc-200 align-top">
                    <td className="py-2 pr-3">
                      <span className="font-medium text-zinc-800">
                        {t.multiplicador.toLocaleString("es-AR")}×
                      </span>
                      {t.esMaximo && (
                        <span className="block text-xs text-zinc-500">
                          el que se aplicaba de oficio por acuerdo homologado incumplido
                        </span>
                      )}
                    </td>
                    <td className="py-2 text-right font-semibold text-zinc-900">
                      {formatARS(t.importe, 2)}
                    </td>
                    <td className="py-2 text-right text-zinc-600">
                      {formatARS(res.hoy.total + t.importe, 2)}
                    </td>
                  </tr>
                ))}
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Hoy: ninguno</span>
                    <span className="block text-xs text-zinc-500">
                      el art. 275 está derogado desde el {VIGENCIA_REFORMA}
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(0, 2)}
                  </td>
                  <td className="py-2 text-right text-zinc-600">
                    {formatARS(res.hoy.total, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50/70 px-3 py-2 text-sm text-rose-900">
            El riesgo que corre en el otro sentido: si se declara pluspetición inexcusable, el
            art. 20 manda que las costas las soporten solidariamente el trabajador y su abogado. El
            art. 277 las topea en el {(TOPE_COSTAS * 100).toLocaleString("es-AR")}% del monto de la
            sentencia — sobre este crédito, hasta {formatARS(res.costasMaximas, 2)}.
          </p>

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
            Orientativo, no una liquidación. La actualización del capital sale de{" "}
            <Link
              href="/actualizacion-creditos-laborales"
              className="font-medium text-emerald-700 hover:underline"
            >
              la calculadora del art. 276
            </Link>
            , que usa la serie oficial del IPC y muestra el detalle mes a mes; si el crédito viene
            de un despido,{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la de indemnización
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
