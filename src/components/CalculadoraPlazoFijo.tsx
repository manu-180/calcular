"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { calcularPlazoFijo } from "@/lib/plazofijo";
import { formatARS, formatPct, parseDecimal, parseMonto } from "@/lib/formato";
import {
  BCRA_TNA_URL,
  INFLACION_DEFAULT,
  PLAZO_MINIMO_DIAS,
  TNA_FALLBACK,
  UVA,
} from "@/data/plazofijo";
import { OfertaPlazoFijo } from "@/components/plazo-fijo/OfertaPlazoFijo";
import { previaPlazoFijo } from "@/components/plazo-fijo/hojas";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { hoyISO, prefill } from "@/lib/prefill/plazo-fijo";
import type { DatosOferta } from "@/lib/oferta";

const PLAZOS_RAPIDOS = [30, 60, 90, 180, 365];

function fechaCorta(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function numeroAInput(n: number): string {
  return n.toLocaleString("es-AR", { maximumFractionDigits: 2, useGrouping: false });
}

export function CalculadoraPlazoFijo({ oferta }: { oferta?: DatosOferta }) {
  const [montoInput, setMontoInput] = useState("");
  const [diasInput, setDiasInput] = useState("30");
  const [tnaInput, setTnaInput] = useState(numeroAInput(TNA_FALLBACK.valor));
  const [renovacionesInput, setRenovacionesInput] = useState("0");
  const [inflacionInput, setInflacionInput] = useState(
    numeroAInput(INFLACION_DEFAULT.mensualPct)
  );
  const [uvaTnaInput, setUvaTnaInput] = useState(numeroAInput(UVA.tnaAdicionalDefaultPct));

  // Fuente de la TNA mostrada: fallback embebido o dato en vivo del BCRA.
  const [tnaFuente, setTnaFuente] = useState<{ fechaISO: string; enVivo: boolean }>({
    fechaISO: TNA_FALLBACK.fechaISO,
    enVivo: false,
  });
  const usuarioTocoTna = useRef(false);
  const [tocado, setTocado] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    fetch(BCRA_TNA_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json) => {
        const dato = json?.results?.[0]?.detalle?.[0];
        if (typeof dato?.valor === "number" && typeof dato?.fecha === "string") {
          setTnaFuente({ fechaISO: dato.fecha, enVivo: true });
          if (!usuarioTocoTna.current) setTnaInput(numeroAInput(dato.valor));
        }
      })
      .catch(() => {
        /* sin red o API caída: queda el fallback con su fecha visible */
      })
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  const capital = useMemo(() => parseMonto(montoInput), [montoInput]);
  const dias = Math.floor(parseDecimal(diasInput));
  const tna = parseDecimal(tnaInput);
  const renovaciones = Math.min(Math.max(Math.floor(parseDecimal(renovacionesInput)), 0), 24);
  const inflacionMensual = parseDecimal(inflacionInput);
  const uvaTna = parseDecimal(uvaTnaInput);

  const plazoCorto = dias > 0 && dias < PLAZO_MINIMO_DIAS;

  const resultado = useMemo(
    () =>
      capital > 0 && dias >= PLAZO_MINIMO_DIAS && tna >= 0
        ? calcularPlazoFijo({
            capital,
            dias,
            tnaPct: tna,
            renovaciones,
            inflacionMensualPct: inflacionMensual,
            uvaTnaAdicionalPct: uvaTna,
          })
        : null,
    [capital, dias, tna, renovaciones, inflacionMensual, uvaTna]
  );

  // Lo mismo que se ve acá viaja con la compra y se escribe en la planilla. La fecha es la del reloj
  // de la persona (no la del build): es el día en que armaría el plazo fijo que simuló.
  const datosCompra = useMemo(
    () =>
      resultado
        ? prefill.validar({
            capital,
            dias,
            tnaPct: tna,
            renovaciones,
            inflacionMensualPct: inflacionMensual,
            uvaTnaAdicionalPct: uvaTna,
            fecha: hoyISO(),
          })
        : null,
    [resultado, capital, dias, tna, renovaciones, inflacionMensual, uvaTna]
  );
  useEffect(() => {
    if (!tocado) return;
    if (datosCompra) recordarDatosCompra("planilla-plazo-fijo", datosCompra);
    else olvidarDatosCompra("planilla-plazo-fijo");
  }, [tocado, datosCompra]);
  const previa = useMemo(
    () => (oferta && datosCompra ? previaPlazoFijo(oferta.archivo, datosCompra) : null),
    [oferta, datosCompra]
  );

  return (
    <div className="space-y-6">
      <div onChange={() => setTocado(true)} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="monto-pf" className="block text-sm font-semibold text-zinc-800">
              ¿Cuánta plata ponés?
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="monto-pf"
                inputMode="numeric"
                placeholder="Ej: 1.000.000"
                value={montoInput}
                onChange={(e) => setMontoInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="dias-pf" className="block text-sm font-semibold text-zinc-800">
                ¿A cuántos días?
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                El mínimo de un plazo fijo tradicional es {PLAZO_MINIMO_DIAS} días.
              </p>
              <input
                id="dias-pf"
                type="number"
                min={PLAZO_MINIMO_DIAS}
                inputMode="numeric"
                value={diasInput}
                onChange={(e) => setDiasInput(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PLAZOS_RAPIDOS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setTocado(true);
                      setDiasInput(String(p));
                    }}
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium transition ${
                      dias === p
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-zinc-300 text-zinc-600 hover:border-emerald-500 hover:text-emerald-700"
                    }`}
                  >
                    {p} días
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="tna-pf" className="block text-sm font-semibold text-zinc-800">
                TNA (% anual)
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Precargamos la tasa promedio de los bancos; poné la que te ofrece el tuyo.
              </p>
              <div className="relative mt-2">
                <input
                  id="tna-pf"
                  inputMode="decimal"
                  value={tnaInput}
                  onChange={(e) => {
                    usuarioTocoTna.current = true;
                    setTnaInput(e.target.value);
                  }}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-8 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  %
                </span>
              </div>
              <p className="mt-1.5 text-xs text-zinc-500">
                Promedio de depósitos a 30 días al {fechaCorta(tnaFuente.fechaISO)} · fuente BCRA{" "}
                {tnaFuente.enVivo ? (
                  <span className="font-medium text-emerald-700">(dato en vivo)</span>
                ) : (
                  <span>(último dato guardado)</span>
                )}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="renovaciones-pf" className="block text-sm font-semibold text-zinc-800">
              ¿Cuántas veces lo renovás al vencimiento? (opcional)
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Si al vencer volvés a poner capital + intereses, el interés se vuelve compuesto.
              Asumimos que la TNA se mantiene.
            </p>
            <input
              id="renovaciones-pf"
              type="number"
              min={0}
              max={24}
              inputMode="numeric"
              value={renovacionesInput}
              onChange={(e) => setRenovacionesInput(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
            />
          </div>
        </div>

        {plazoCorto && (
          <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">El plazo mínimo es de {PLAZO_MINIMO_DIAS} días</p>
            <p className="mt-1">
              Los plazos fijos tradicionales en pesos se constituyen por {PLAZO_MINIMO_DIAS} días o
              más. Probá con {PLAZO_MINIMO_DIAS} días.
            </p>
          </div>
        )}

        {resultado && (
          <div className="mt-6 space-y-5 border-t border-zinc-100 pt-5" aria-live="polite">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-500">
                  Interés ganado en {resultado.renovaciones > 0 ? "el primer plazo" : `${dias} días`}
                </p>
                <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                  +{formatARS(resultado.interes, 0)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500">Total al vencimiento</p>
                <p className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                  {formatARS(resultado.total, 0)}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-2 rounded-lg bg-zinc-50 p-4 text-center text-sm">
              <div>
                <dt className="text-xs text-zinc-500">Tasa del período</dt>
                <dd className="font-semibold text-zinc-900">
                  {formatPct(resultado.tasaEfectivaPeriodoPct)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Efectiva mensual (TEM)</dt>
                <dd className="font-semibold text-zinc-900">{formatPct(resultado.temPct)}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Efectiva anual (TEA)</dt>
                <dd className="font-semibold text-zinc-900">{formatPct(resultado.teaPct)}</dd>
              </div>
            </dl>

            {resultado.renovaciones > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-zinc-600">
                  Renovando <strong>{resultado.renovaciones}</strong>{" "}
                  {resultado.renovaciones === 1 ? "vez" : "veces"} ({resultado.diasTotales} días en
                  total), terminás con{" "}
                  <strong className="text-emerald-700">{formatARS(resultado.totalFinal, 0)}</strong>.
                  Es un rendimiento total del {formatPct(resultado.rendimientoTotalPct)} gracias al
                  interés compuesto.
                </p>
                <div className="max-h-64 overflow-y-auto rounded-lg border border-zinc-200">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-zinc-50 text-left text-zinc-700">
                      <tr>
                        <th className="px-3 py-2 font-semibold">Vencimiento</th>
                        <th className="px-3 py-2 font-semibold">Interés del período</th>
                        <th className="px-3 py-2 text-right font-semibold">Acumulado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.periodos.map((p) => (
                        <tr key={p.n} className="border-t border-zinc-100">
                          <td className="px-3 py-1.5 text-zinc-600">
                            #{p.n} · día {p.diasAcumulados}
                          </td>
                          <td className="px-3 py-1.5 text-emerald-700">
                            +{formatARS(p.interesDelPeriodo, 0)}
                          </td>
                          <td className="px-3 py-1.5 text-right font-medium text-zinc-900">
                            {formatARS(p.capital, 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div
              className={`rounded-xl p-4 ${
                resultado.leGanaALaInflacion ? "bg-emerald-50" : "bg-red-50"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p
                  className={`font-semibold ${
                    resultado.leGanaALaInflacion ? "text-emerald-900" : "text-red-900"
                  }`}
                >
                  {resultado.leGanaALaInflacion
                    ? "✓ Le ganás a la inflación"
                    : "✗ La inflación le gana a tu plazo fijo"}
                </p>
                <label
                  htmlFor="inflacion-pf"
                  className={`flex items-center gap-1.5 text-xs ${
                    resultado.leGanaALaInflacion ? "text-emerald-900" : "text-red-900"
                  }`}
                >
                  Inflación mensual estimada
                  <input
                    id="inflacion-pf"
                    inputMode="decimal"
                    value={inflacionInput}
                    onChange={(e) => setInflacionInput(e.target.value)}
                    className="w-14 rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-right text-xs text-zinc-900 outline-none focus:border-emerald-500"
                  />
                  %
                </label>
              </div>
              <p
                className={`mt-2 text-sm ${
                  resultado.leGanaALaInflacion ? "text-emerald-900" : "text-red-900"
                }`}
              >
                Con una inflación del {formatPct(inflacionMensual)} mensual, los precios suben{" "}
                {formatPct(resultado.inflacionPeriodoPct)} en {resultado.diasTotales} días, y tu
                plazo fijo rinde {formatPct(resultado.rendimientoTotalPct)}. En plata de hoy, tus{" "}
                {formatARS(resultado.totalFinal, 0)} equivalen a{" "}
                <strong>{formatARS(resultado.poderCompraFinal, 0)}</strong>:{" "}
                {resultado.resultadoRealPct >= 0 ? "ganás" : "perdés"}{" "}
                <strong>{formatPct(Math.abs(resultado.resultadoRealPct))}</strong> de poder de
                compra.
              </p>
              <p
                className={`mt-1.5 text-xs ${
                  resultado.leGanaALaInflacion ? "text-emerald-800/70" : "text-red-800/70"
                }`}
              >
                Último dato oficial: {formatPct(INFLACION_DEFAULT.mensualPct)} en{" "}
                {INFLACION_DEFAULT.periodo} (IPC INDEC). El futuro puede ser distinto: probá tu
                propia estimación.
              </p>
            </div>

            {resultado.uva ? (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-zinc-900">
                    ¿Y con un plazo fijo UVA? {formatARS(resultado.uva.total, 0)}
                  </p>
                  <label
                    htmlFor="uva-tna-pf"
                    className="flex items-center gap-1.5 text-xs text-zinc-600"
                  >
                    Tasa adicional (TNA)
                    <input
                      id="uva-tna-pf"
                      inputMode="decimal"
                      value={uvaTnaInput}
                      onChange={(e) => setUvaTnaInput(e.target.value)}
                      className="w-14 rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-right text-xs text-zinc-900 outline-none focus:border-emerald-500"
                    />
                    %
                  </label>
                </div>
                <p className="mt-2 text-sm text-zinc-600">
                  En un plazo fijo UVA el capital se ajusta por inflación y el banco suma una tasa
                  adicional. Si la inflación de los próximos {resultado.diasTotales} días fuera la
                  que estimaste, terminarías con {formatARS(resultado.uva.total, 0)} —{" "}
                  {resultado.uva.total > resultado.totalFinal ? (
                    <strong className="text-emerald-700">
                      {formatARS(resultado.uva.total - resultado.totalFinal, 0)} más que el
                      tradicional
                    </strong>
                  ) : (
                    <strong>
                      {formatARS(resultado.totalFinal - resultado.uva.total, 0)} menos que el
                      tradicional
                    </strong>
                  )}
                  . Eso sí: exige {UVA.plazoMinimoDias} días como mínimo (podés precancelar desde el
                  día {UVA.precancelableDesdeDia}, pero perdés el ajuste UVA).
                </p>
              </div>
            ) : (
              <p className="text-xs text-zinc-400">
                El plazo fijo UVA (que ajusta por inflación) exige un mínimo de{" "}
                {UVA.plazoMinimoDias} días: simulá {UVA.plazoMinimoDias} días o más para compararlo.
              </p>
            )}

            <p className="text-xs text-zinc-400">
              Cálculo orientativo con la convención bancaria estándar (interés simple, año de 365
              días). La TNA la define cada banco y puede cambiar el día que constituyas el plazo
              fijo. No es asesoramiento financiero.
            </p>
          </div>
        )}
      </div>

      {oferta && previa && <OfertaPlazoFijo producto={oferta} previa={previa} />}
    </div>
  );
}
