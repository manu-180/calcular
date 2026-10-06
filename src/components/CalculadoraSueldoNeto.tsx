"use client";

import { useEffect, useMemo, useState } from "react";
import { brutoANeto, netoABruto } from "@/lib/sueldo";
import { estimarGananciasAnual } from "@/lib/ganancias";
import { TOPE_SIPA } from "@/data/sueldo";
import { formatARS, parseMonto, parseDecimal } from "@/lib/formato";
import { CompartirWhatsApp } from "@/components/CompartirWhatsApp";
import { OfertaMiSueldo } from "@/components/mi-sueldo/OfertaMiSueldo";
import { PLANILLA_MS, prefill } from "@/lib/prefill/mi-sueldo";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { periodoActualAR } from "@/lib/hoy";
import type { DatosOferta } from "@/lib/oferta";

type Direccion = "brutoANeto" | "netoABruto";

export function CalculadoraSueldoNeto({ oferta }: { oferta?: DatosOferta }) {
  const [montoInput, setMontoInput] = useState("");
  const [tocado, setTocado] = useState(false);
  const [ultimoAumento, setUltimoAumento] = useState<string | null>(null);
  const [direccion, setDireccion] = useState<Direccion>("brutoANeto");
  const [sindicalInput, setSindicalInput] = useState("");
  const [pagaGanancias, setPagaGanancias] = useState(false);
  const [conyuge, setConyuge] = useState(false);
  const [hijosInput, setHijosInput] = useState("");
  const [otrasInput, setOtrasInput] = useState("");

  const monto = useMemo(() => parseMonto(montoInput), [montoInput]);
  const sindicalPct = useMemo(
    () => Math.min(Math.max(0, parseDecimal(sindicalInput)), 100) / 100,
    [sindicalInput],
  );
  const hijos = useMemo(() => Math.max(0, Math.floor(parseMonto(hijosInput))), [hijosInput]);
  const otrasDeduccionesAnual = useMemo(() => Math.max(0, parseMonto(otrasInput)), [otrasInput]);

  const r = useMemo(() => {
    if (monto <= 0) return null;
    if (direccion === "brutoANeto") {
      const gan =
        pagaGanancias
          ? estimarGananciasAnual({
              brutoMensual: monto,
              conyuge,
              hijos,
              sindicalPct,
              otrasDeduccionesAnual,
            })
          : null;
      const d = brutoANeto(monto, { sindicalPct, ganancias: gan?.retencionMensual ?? 0 });
      return { tipo: "brutoANeto" as const, d, gan };
    }
    const bruto = netoABruto(monto, { sindicalPct });
    const d = brutoANeto(bruto, { sindicalPct });
    return { tipo: "netoABruto" as const, d, gan: null, netoObjetivo: monto };
  }, [monto, direccion, sindicalPct, pagaGanancias, conyuge, hijos, otrasDeduccionesAnual]);

  // Lo que viaja con la compra y se escribe en la planilla. Las cargas de familia sólo cuentan si
  // la persona pidió estimar Ganancias: si no, las casillas quedan como estaban y no son sus datos.
  const datosCompra = useMemo(
    () =>
      r
        ? prefill.validar({
            bruto: r.d.bruto,
            sindicalPct: Math.round(sindicalPct * 10000) / 100,
            periodo: periodoActualAR(),
            ultimoAumento,
            conyuge: r.tipo === "brutoANeto" && pagaGanancias ? conyuge : false,
            hijos: r.tipo === "brutoANeto" && pagaGanancias ? Math.min(hijos, PLANILLA_MS.hijosMax) : 0,
            otrasDeducciones: r.tipo === "brutoANeto" && pagaGanancias ? otrasDeduccionesAnual : 0,
          })
        : null,
    [r, sindicalPct, ultimoAumento, pagaGanancias, conyuge, hijos, otrasDeduccionesAnual],
  );
  useEffect(() => {
    if (!tocado) return;
    if (datosCompra) recordarDatosCompra("planilla-mi-sueldo", datosCompra);
    else olvidarDatosCompra("planilla-mi-sueldo");
  }, [tocado, datosCompra]);

  const inputId = "monto-sueldo";

  return (
    <div className="space-y-6">
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        {/* Dirección */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-800">¿Qué querés calcular?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              [
                ["brutoANeto", "Bruto → Neto", "Cuánto cobro en mano"],
                ["netoABruto", "Neto → Bruto", "Qué bruto pedir"],
              ] as const
            ).map(([id, titulo, sub]) => (
              <button
                key={id}
                type="button"
                onClick={() => setDireccion(id)}
                aria-pressed={direccion === id}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                  direccion === id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {titulo}
                <span className="block text-xs font-normal opacity-75">{sub}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Monto */}
        <div>
          <label htmlFor={inputId} className="block text-sm font-semibold text-zinc-800">
            {direccion === "brutoANeto"
              ? "Tu sueldo bruto mensual"
              : "El neto que querés cobrar en mano"}
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            {direccion === "brutoANeto"
              ? "El total bruto del recibo, antes de los descuentos."
              : "Cuánto querés que te quede depositado; te decimos qué bruto pedir."}
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id={inputId}
              inputMode="numeric"
              placeholder="Ej: 1.200.000"
              value={montoInput}
              onChange={(e) => {
                setMontoInput(e.target.value);
                setTocado(true);
              }}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        {/* Cuota sindical */}
        <div>
          <label htmlFor="sindical" className="block text-sm font-semibold text-zinc-800">
            Cuota sindical <span className="font-normal text-zinc-500">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si estás afiliado, el porcentaje que te descuenta tu sindicato (suele ser 1% a 3%).
          </p>
          <div className="relative mt-2 w-32">
            <input
              id="sindical"
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

        {/* Ganancias (solo en bruto → neto) */}
        {direccion === "brutoANeto" && (
          <div className="rounded-lg bg-zinc-50 p-4">
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={pagaGanancias}
                onChange={(e) => setPagaGanancias(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-emerald-600"
              />
              <span>
                Estimar también el impuesto a las Ganancias
                <span className="block text-xs text-zinc-500">
                  Recién aplica desde aproximadamente $2.800.000 de sueldo bruto (soltero sin
                  hijos). Estimación anual orientativa, no la liquidación de tu empleador.
                </span>
              </span>
            </label>

            {pagaGanancias && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
                  <label htmlFor="hijos" className="block text-xs font-medium text-zinc-600">
                    Hijos a cargo
                  </label>
                  <input
                    id="hijos"
                    inputMode="numeric"
                    placeholder="0"
                    value={hijosInput}
                    onChange={(e) => setHijosInput(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <div>
                  <label htmlFor="otras" className="block text-xs font-medium text-zinc-600">
                    Otras deduc. anuales
                  </label>
                  <div className="relative mt-1">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                      $
                    </span>
                    <input
                      id="otras"
                      inputMode="numeric"
                      placeholder="0"
                      value={otrasInput}
                      onChange={(e) => setOtrasInput(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 py-2 pl-7 pr-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {r && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              {r.tipo === "brutoANeto" ? (
                <>
                  <div>
                    <p className="text-sm text-zinc-500">Sueldo en mano (estimado)</p>
                    <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                      {formatARS(r.d.neto, 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-500">Bruto</p>
                    <p className="text-xl font-semibold text-zinc-900">{formatARS(r.d.bruto, 0)}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-zinc-500">Bruto que tenés que pedir</p>
                    <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                      {formatARS(r.d.bruto, 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-500">Para cobrar en mano</p>
                    <p className="text-xl font-semibold text-zinc-900">
                      {formatARS(r.netoObjetivo, 0)}
                    </p>
                  </div>
                </>
              )}
            </div>

            <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-600">Sueldo bruto</dt>
                <dd className="font-medium text-zinc-900">{formatARS(r.d.bruto)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-600">Jubilación (11%)</dt>
                <dd className="font-medium text-zinc-900">−{formatARS(r.d.aportes.jubilacion)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-600">PAMI — Ley 19.032 (3%)</dt>
                <dd className="font-medium text-zinc-900">−{formatARS(r.d.aportes.pami)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-600">Obra social (3%)</dt>
                <dd className="font-medium text-zinc-900">−{formatARS(r.d.aportes.obraSocial)}</dd>
              </div>
              {r.d.cuotaSindical > 0 && (
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Cuota sindical</dt>
                  <dd className="font-medium text-zinc-900">−{formatARS(r.d.cuotaSindical)}</dd>
                </div>
              )}
              {r.tipo === "brutoANeto" && r.gan && r.gan.pagaGanancias && (
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Ganancias (estimado mensual)</dt>
                  <dd className="font-medium text-zinc-900">−{formatARS(r.gan.retencionMensual)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                <dt className="font-semibold text-zinc-800">
                  {r.tipo === "brutoANeto" ? "Neto en mano" : "Neto resultante"}
                </dt>
                <dd className="font-semibold text-zinc-900">{formatARS(r.d.neto)}</dd>
              </div>
            </dl>

            {r.d.aportes.topeAplicado && (
              <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                Tu bruto supera la base imponible máxima de aportes ({formatARS(TOPE_SIPA.baseMaxima, 0)},
                vigente {TOPE_SIPA.vigencia}): los aportes se calcularon sobre ese tope, no sobre el
                bruto completo. Por encima del tope, el 17% deja de crecer.
              </p>
            )}

            {r.tipo === "brutoANeto" && pagaGanancias && r.gan && !r.gan.pagaGanancias && (
              <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                Con ese sueldo y esas cargas de familia, <strong>no pagás Ganancias</strong>: las
                deducciones (mínimo no imponible + deducción especial) superan tu ganancia anual.
              </p>
            )}

            {r.tipo === "brutoANeto" && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-zinc-600">
                  En mano te queda <strong>{(r.d.bruto > 0 ? (r.d.neto / r.d.bruto) * 100 : 0).toFixed(1)}%</strong> de tu bruto.
                </p>
                <CompartirWhatsApp
                  mensaje={`Sueldo en mano: ${formatARS(r.d.neto, 0)} de ${formatARS(r.d.bruto, 0)} brutos. Calculá el tuyo gratis:`}
                  path="/sueldo-neto"
                  campania="sueldo-neto"
                />
              </div>
            )}

            {r.tipo === "netoABruto" && (
              <p className="text-xs text-zinc-400">
                El inverso usa los aportes de ley (17%) y la cuota sindical. No incluye Ganancias: si
                tu sueldo paga el impuesto, el bruto necesario es algo mayor.
              </p>
            )}

            {r.tipo === "brutoANeto" && r.gan && r.gan.pagaGanancias && (
              <p className="text-xs text-zinc-400">
                La retención de Ganancias es una <strong>estimación anual orientativa</strong>{" "}
                (impuesto anual ÷ 12 con la escala y deducciones oficiales del primer semestre 2026):
                no reemplaza la liquidación de tu empleador, que la calcula mes a mes en forma
                acumulada y puede contemplar deducciones adicionales (prepaga, alquiler, etc.).
              </p>
            )}
          </div>
        </div>
      )}
    </div>

      {oferta && datosCompra && (
        <OfertaMiSueldo producto={oferta} datos={datosCompra} onUltimoAumento={setUltimoAumento} />
      )}
    </div>
  );
}
