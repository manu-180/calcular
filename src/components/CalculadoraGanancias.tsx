"use client";

import { useEffect, useMemo, useState } from "react";
import { calcularRetencionMensual } from "@/lib/ganancias";
import { GANANCIAS_VIGENCIA } from "@/data/ganancias";
import { formatARS } from "@/lib/formato";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { datosDeLaCalculadora, entradaDelMotor, prefill } from "@/lib/prefill/ganancias";
import { PRECIO_INFORME_REFERENCIA, SLUG_INFORME, armarInforme } from "@/app/informes/ganancias/_modelo";
import { GananciasInformeCTA } from "@/components/informe-ganancias/OfertaCTA";

export function CalculadoraGanancias({
  precioInforme = PRECIO_INFORME_REFERENCIA,
}: {
  /** Viene del catálogo (src/lib/mp.ts) desde la página: este componente no puede importarlo. */
  precioInforme?: number;
}) {
  const [brutoInput, setBrutoInput] = useState("");
  const [conyuge, setConyuge] = useState(false);
  const [hijosInput, setHijosInput] = useState("");
  const [sindicalInput, setSindicalInput] = useState("");
  const [otrasInput, setOtrasInput] = useState("");
  const [tocado, setTocado] = useState(false);

  const datos = useMemo(
    () => datosDeLaCalculadora({ brutoInput, conyuge, hijosInput, sindicalInput, otrasInput }),
    [brutoInput, conyuge, hijosInput, sindicalInput, otrasInput],
  );

  const filas = useMemo(() => {
    if (datos.bruto <= 0) return null;
    return calcularRetencionMensual(entradaDelMotor(datos));
  }, [datos]);

  const noRetiene = filas && filas.every((f) => f.retencionMes === 0);
  const totalAnual = filas ? filas[11].retencionAcumulada : 0;

  // El informe sale con este mismo caso sólo si hay impuesto que bajar y si pasa el `validar` del
  // servidor: si no, se ofrecería un informe que llega vacío.
  const datosCompra = useMemo(() => (filas && !noRetiene ? prefill.validar(datos) : null), [filas, noRetiene, datos]);
  const informe = useMemo(() => (datosCompra ? armarInforme(datosCompra) : null), [datosCompra]);
  useEffect(() => {
    if (datosCompra) recordarDatosCompra(SLUG_INFORME, datosCompra);
    else if (tocado) olvidarDatosCompra(SLUG_INFORME);
  }, [tocado, datosCompra]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div onChange={() => setTocado(true)} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-5">
          {/* Bruto */}
          <div>
            <label htmlFor="bruto-gan" className="block text-sm font-semibold text-zinc-800">
              Sueldo bruto mensual
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              El total antes de descuentos que figura en tu recibo.
            </p>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="bruto-gan"
                inputMode="numeric"
                placeholder="Ej: 3.500.000"
                value={brutoInput}
                onChange={(e) => setBrutoInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          {/* Cargas de familia */}
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={conyuge}
                onChange={(e) => setConyuge(e.target.checked)}
                className="h-4 w-4 accent-emerald-600"
              />
              Cónyuge a cargo
            </label>
            <div>
              <label htmlFor="hijos-gan" className="block text-xs font-medium text-zinc-600">
                Hijos a cargo
              </label>
              <input
                id="hijos-gan"
                inputMode="numeric"
                placeholder="0"
                value={hijosInput}
                onChange={(e) => setHijosInput(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label htmlFor="sindical-gan" className="block text-xs font-medium text-zinc-600">
                Cuota sindical (%)
              </label>
              <div className="relative mt-1">
                <input
                  id="sindical-gan"
                  inputMode="decimal"
                  placeholder="0"
                  value={sindicalInput}
                  onChange={(e) => setSindicalInput(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 py-2 pl-3 pr-7 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Otras deducciones mensuales */}
          <div>
            <label htmlFor="otras-gan" className="block text-sm font-semibold text-zinc-800">
              Otras deducciones mensuales{" "}
              <span className="font-normal text-zinc-500">(opcional)</span>
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Prepaga, alquiler, honorarios médicos: lo que declarás ante tu empleador. El total
              anual se reparte mes a mes.
            </p>
            <div className="relative mt-2 max-w-xs">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="otras-gan"
                inputMode="numeric"
                placeholder="0"
                value={otrasInput}
                onChange={(e) => setOtrasInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resultado */}
      {filas && (
        <div aria-live="polite" className="space-y-4">
          {noRetiene ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-semibold text-emerald-800">
                Con ese sueldo y cargas de familia, <strong>no pagás Ganancias</strong>.
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                Las deducciones personales (MNI + deducción especial + familiares) superan tu
                ganancia neta imponible anual.
              </p>
            </div>
          ) : (
            <>
              {/* Resumen anual */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-end gap-6">
                  <div>
                    <p className="text-sm text-zinc-500">Retención total estimada (año)</p>
                    <p className="text-3xl font-bold text-zinc-900">{formatARS(totalAnual, 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Mes sin aguinaldo (aprox.)</p>
                    <p className="text-2xl font-semibold text-zinc-700">
                      {formatARS(filas[0].retencionMes, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Mes con aguinaldo (junio / dic.)</p>
                    <p className="text-2xl font-semibold text-amber-700">
                      {formatARS(filas[5].retencionMes, 0)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabla mensual */}
              <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50">
                      <th className="px-4 py-3 text-left font-semibold text-zinc-700">Mes</th>
                      <th className="px-4 py-3 text-right font-semibold text-zinc-700">Bruto</th>
                      <th className="px-4 py-3 text-right font-semibold text-zinc-700">Aportes</th>
                      <th className="hidden px-4 py-3 text-right font-semibold text-zinc-700 sm:table-cell">
                        GNI extrap.
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-zinc-700">
                        Retención
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filas.map((f) => {
                      const esSAC = f.mes === 6 || f.mes === 12;
                      return (
                        <tr
                          key={f.mes}
                          className={`border-b border-zinc-50 ${esSAC ? "bg-amber-50/60" : ""}`}
                        >
                          <td className="px-4 py-2.5 font-medium text-zinc-900">
                            {f.nombreMes}
                            {esSAC && (
                              <span className="ml-1.5 rounded bg-amber-100 px-1 py-0.5 text-[10px] font-semibold text-amber-800">
                                SAC
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-right text-zinc-700">
                            {formatARS(f.brutoMes, 0)}
                          </td>
                          <td className="px-4 py-2.5 text-right text-zinc-600">
                            {formatARS(f.aportesMes, 0)}
                          </td>
                          <td className="hidden px-4 py-2.5 text-right text-zinc-500 sm:table-cell">
                            {formatARS(f.gniExtrapolada, 0)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                            {formatARS(f.retencionMes, 0)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-zinc-200 bg-zinc-50">
                      <td colSpan={3} className="px-4 py-3 font-semibold text-zinc-800">
                        Total anual
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell" />
                      <td className="px-4 py-3 text-right font-bold text-zinc-900">
                        {formatARS(totalAnual, 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p className="text-xs text-zinc-400">
                Estimación orientativa basada en la escala y deducciones del{" "}
                <strong>{GANANCIAS_VIGENCIA}</strong> (RG ARCA 5008). Asume sueldo fijo todo el año y
                SAC = 50% del bruto mensual. No reemplaza la liquidación de tu empleador, que puede
                contemplar variables adicionales (antigüedad, presentismo, horas extras).
              </p>

              {informe?.paga ? <GananciasInformeCTA informe={informe} precio={precioInforme} /> : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}
