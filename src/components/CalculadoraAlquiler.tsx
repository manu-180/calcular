"use client";

import { useEffect, useMemo, useState } from "react";
import { formatARS, formatPct, parseMonto } from "@/lib/formato";
import {
  ajustesAlquiler,
  nombreMes,
  nombrePeriodo,
  sumarMeses,
  ULTIMO_PERIODO,
  type Periodo,
} from "@/lib/inflacion";
import { IPC_DIA_PUBLICACION, PERIODICIDADES_ALQUILER } from "@/data/inflacion";
import { SelectorPeriodo } from "@/components/SelectorPeriodo";
import { CompartirWhatsApp } from "@/components/CompartirWhatsApp";
import { AlquilerPlanillaCTA, type OfertaAlquileres } from "@/components/AlquilerPlanillaCTA";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { prefill } from "@/lib/prefill/alquileres";

const ETIQUETAS: Record<number, string> = {
  3: "Trimestral",
  4: "Cuatrimestral",
  6: "Semestral",
  12: "Anual",
};

// El índice base es el del mes anterior al inicio → el contrato más viejo simulable
// arranca en enero 2017; el más nuevo, un mes después del último IPC publicado.
const INICIO_MIN: Periodo = "2017-01";
const INICIO_MAX: Periodo = sumarMeses(ULTIMO_PERIODO, 1);

export function CalculadoraAlquiler({ oferta }: { oferta?: OfertaAlquileres }) {
  const [alquilerInput, setAlquilerInput] = useState("");
  const [inicio, setInicio] = useState<Periodo>(sumarMeses(ULTIMO_PERIODO, -11));
  const [cadaMeses, setCadaMeses] = useState<number>(3);
  const [tocado, setTocado] = useState(false);

  const alquilerInicial = useMemo(() => parseMonto(alquilerInput), [alquilerInput]);
  const resultado = useMemo(
    () =>
      alquilerInicial > 0
        ? ajustesAlquiler({ alquilerInicial, periodoInicio: inicio, cadaMeses })
        : null,
    [alquilerInicial, inicio, cadaMeses]
  );

  // Lo que cargó la persona viaja con la compra y precarga «Contrato 1» de la planilla. Pasa por el
  // mismo `validar` que el servidor: lo que él descartaría no se ofrece como «ya cargado».
  const datosCompra = useMemo(
    () => (resultado ? prefill.validar({ alquilerInicial, inicio, cadaMeses }) : null),
    [resultado, alquilerInicial, inicio, cadaMeses]
  );
  useEffect(() => {
    if (datosCompra) recordarDatosCompra("planilla-alquileres", datosCompra);
    else if (tocado) olvidarDatosCompra("planilla-alquileres");
  }, [tocado, datosCompra]);

  return (
    <div className="space-y-6">
      <div onChange={() => setTocado(true)} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="alquiler-inicial" className="block text-sm font-semibold text-zinc-800">
                ¿Cuál es el alquiler inicial del contrato?
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  $
                </span>
                <input
                  id="alquiler-inicial"
                  inputMode="numeric"
                  placeholder="Ej: 500.000"
                  value={alquilerInput}
                  onChange={(e) => setAlquilerInput(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
            <div>
              <label htmlFor="inicio-alq" className="block text-sm font-semibold text-zinc-800">
                ¿Cuándo empezó el contrato?
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                El primer mes en que pagaste el valor inicial.
              </p>
              <div className="mt-2">
                <SelectorPeriodo
                  id="inicio-alq"
                  value={inicio}
                  onChange={setInicio}
                  min={INICIO_MIN}
                  max={INICIO_MAX}
                />
              </div>
            </div>
          </div>

          <div>
            <span className="block text-sm font-semibold text-zinc-800">
              ¿Cada cuánto se ajusta?
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PERIODICIDADES_ALQUILER.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setCadaMeses(n);
                    setTocado(true);
                  }}
                  className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                    cadaMeses === n
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-300 text-zinc-600 hover:border-emerald-500 hover:text-emerald-700"
                  }`}
                >
                  {ETIQUETAS[n]} ({n} meses)
                </button>
              ))}
            </div>
          </div>
        </div>

        {resultado && (
          <div className="mt-6 space-y-5 border-t border-zinc-100 pt-5" aria-live="polite">
            <div>
              <p className="text-sm text-zinc-500">
                Alquiler vigente desde {nombrePeriodo(resultado.vigenteDesde)}
              </p>
              <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                {formatARS(resultado.alquilerVigente, 0)}
              </p>
              {resultado.ajustes.length > 0 && (
                <p className="mt-1 text-sm text-zinc-600">
                  Subió{" "}
                  <strong>
                    {formatPct((resultado.alquilerVigente / alquilerInicial - 1) * 100, 1)}
                  </strong>{" "}
                  desde el inicio del contrato, en {resultado.ajustes.length}{" "}
                  {resultado.ajustes.length === 1 ? "ajuste" : "ajustes"}.
                </p>
              )}
            </div>

            {resultado.ajustes.length > 0 ? (
              <div className="max-h-72 overflow-y-auto rounded-lg border border-zinc-200">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-zinc-50 text-left text-zinc-700">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Rige desde</th>
                      <th className="px-3 py-2 font-semibold">IPC del período</th>
                      <th className="px-3 py-2 text-right font-semibold">Nuevo alquiler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-zinc-100">
                      <td className="px-3 py-1.5 text-zinc-600">{nombrePeriodo(inicio)}</td>
                      <td className="px-3 py-1.5 text-zinc-400">Valor inicial</td>
                      <td className="px-3 py-1.5 text-right font-medium text-zinc-900">
                        {formatARS(alquilerInicial, 0)}
                      </td>
                    </tr>
                    {resultado.ajustes.map((a) => (
                      <tr key={a.n} className="border-t border-zinc-100">
                        <td className="px-3 py-1.5 text-zinc-600">
                          {nombrePeriodo(a.periodoEfecto)}
                        </td>
                        <td className="px-3 py-1.5 text-emerald-700">
                          +{formatPct(a.variacionPct, 1)}
                        </td>
                        <td className="px-3 py-1.5 text-right font-medium text-zinc-900">
                          {formatARS(a.alquilerNuevo, 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-zinc-600">
                Tu contrato todavía no llegó al primer ajuste: seguís pagando el valor inicial.
              </p>
            )}

            {resultado.proximo && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="font-semibold text-zinc-900">
                  Próximo ajuste: {nombrePeriodo(resultado.proximo.periodoEfecto)}
                </p>
                <p className="mt-1.5 text-sm text-zinc-600">
                  Se calcula con el IPC hasta{" "}
                  {nombrePeriodo(sumarMeses(resultado.proximo.periodoEfecto, -1))}, y el INDEC
                  publica cada dato {IPC_DIA_PUBLICACION} del mes siguiente (falta desde{" "}
                  {nombreMes(resultado.proximo.esperandoIpcDe)}).
                  {resultado.proximo.estimado && (
                    <>
                      {" "}
                      Si la inflación siguiera en{" "}
                      {formatPct(resultado.proximo.estimado.mensualUsadaPct, 1)} mensual (el último
                      dato), el ajuste rondaría{" "}
                      <strong>+{formatPct(resultado.proximo.estimado.variacionPct, 1)}</strong> y tu
                      alquiler pasaría a{" "}
                      <strong>~{formatARS(resultado.proximo.estimado.alquilerNuevo, 0)}</strong>. Es
                      una estimación, no el número final.
                    </>
                  )}
                </p>
              </div>
            )}

            <CompartirWhatsApp
              mensaje={`Ajuste de alquiler por IPC: desde ${nombrePeriodo(resultado.vigenteDesde)} el alquiler queda en ${formatARS(resultado.alquilerVigente, 0)}${resultado.proximo ? `. Próximo ajuste: ${nombrePeriodo(resultado.proximo.periodoEfecto)}` : ""}.`}
              path="/inflacion/alquiler"
              campania="alquiler"
            />

            <p className="text-xs text-zinc-400">
              Convención: cada ajuste aplica la variación del IPC de los {cadaMeses} meses
              calendario completos anteriores al mes del ajuste. La letra de tu contrato manda: si
              indica otro índice (por ejemplo ICL) u otra forma de tomar los meses, el número exacto
              puede diferir. No es asesoramiento legal.
            </p>
          </div>
        )}
      </div>

      {resultado && oferta && (
        <AlquilerPlanillaCTA
          oferta={oferta}
          resultado={resultado}
          inicio={inicio}
          cadaMeses={cadaMeses}
          cargado={datosCompra !== null}
        />
      )}
    </div>
  );
}
