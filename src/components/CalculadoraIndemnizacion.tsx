"use client";

import { useEffect, useMemo, useState } from "react";
import { calcularIndemnizacion, tratamientoGanancias } from "@/lib/indemnizacion";
import { formatARS, parseMonto } from "@/lib/formato";
import { MESES_PERIODO_PRUEBA } from "@/data/indemnizacion";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { datosDeLaCalculadora, prefill } from "@/lib/prefill/indemnizacion";
import { OfertaInformeIndemnizacion } from "@/components/informe-indemnizacion/OfertaInforme";
import { PRECIO_INFORME_REFERENCIA, SLUG_INFORME } from "@/app/(ar)/informes/indemnizacion/_modelo";

function textoAntiguedad(antiguedad: { anios: number; meses: number; dias: number }): string {
  const partes: string[] = [];
  if (antiguedad.anios > 0)
    partes.push(`${antiguedad.anios} ${antiguedad.anios === 1 ? "año" : "años"}`);
  if (antiguedad.meses > 0)
    partes.push(`${antiguedad.meses} ${antiguedad.meses === 1 ? "mes" : "meses"}`);
  if (antiguedad.dias > 0 && antiguedad.anios === 0)
    partes.push(`${antiguedad.dias} ${antiguedad.dias === 1 ? "día" : "días"}`);
  return partes.length ? partes.join(" y ") : "menos de un día";
}

function GananciasDesglose({
  t,
}: {
  t: { exento: number; noExentoPorLey: number; sinExencion: number };
}) {
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 p-4 text-sm">
      <p className="font-semibold text-zinc-800">¿Qué parte paga Ganancias?</p>
      <dl className="space-y-1.5">
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-600">Exento por ley (antigüedad, art. 26 inc. i)</dt>
          <dd className="font-medium text-emerald-700">{formatARS(t.exento, 0)}</dd>
        </div>
        {t.noExentoPorLey > 0 && (
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-600">Preaviso y su SAC: la ley lo declara no exento</dt>
            <dd className="font-medium text-zinc-900">{formatARS(t.noExentoPorLey, 0)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-600">Integración, aguinaldo y vacaciones: sin exención</dt>
          <dd className="font-medium text-zinc-900">{formatARS(t.sinExencion, 0)}</dd>
        </div>
      </dl>
      <p className="text-xs text-zinc-500">
        Que un rubro no esté exento no quiere decir que te lo descuenten: solo pagás si tus
        ingresos del año superan las deducciones personales de la cuarta categoría.
      </p>
    </div>
  );
}

function Fila({ label, monto, detalle }: { label: string; monto: number; detalle?: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-zinc-600">
        {label}
        {detalle && <span className="block text-xs text-zinc-400">{detalle}</span>}
      </dt>
      <dd className="font-medium text-zinc-900">{formatARS(monto)}</dd>
    </div>
  );
}

export function CalculadoraIndemnizacion({
  precioInforme = PRECIO_INFORME_REFERENCIA,
}: {
  /** Viene del catálogo (src/lib/mp.ts) desde la página: este componente no puede importarlo. */
  precioInforme?: number;
}) {
  const [sueldoInput, setSueldoInput] = useState("");
  const [ingresoISO, setIngresoISO] = useState("");
  const [despidoISO, setDespidoISO] = useState("");
  const [preavisoOtorgado, setPreavisoOtorgado] = useState(false);
  const [conoceTope, setConoceTope] = useState(false);
  const [topeInput, setTopeInput] = useState("");
  const [tocado, setTocado] = useState(false);

  const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);
  const tope = useMemo(() => parseMonto(topeInput), [topeInput]);

  const fechasInvertidas = Boolean(ingresoISO && despidoISO && despidoISO <= ingresoISO);

  const resultado = useMemo(
    () =>
      sueldo > 0 && ingresoISO && despidoISO && !fechasInvertidas
        ? calcularIndemnizacion({
            ingresoISO,
            despidoISO,
            mejorRemuneracion: sueldo,
            preavisoOtorgado,
            topeCCT: conoceTope && tope > 0 ? tope : undefined,
          })
        : null,
    [sueldo, ingresoISO, despidoISO, fechasInvertidas, preavisoOtorgado, conoceTope, tope]
  );

  // Lo que el informe necesita para salir con este mismo caso. Sólo cuando hay resultado y si pasa
  // el `validar` del servidor: si no, el informe saldría vacío aunque acá se vea un número.
  const datosCompra = useMemo(
    () =>
      resultado
        ? prefill.validar(
            datosDeLaCalculadora({ sueldo, ingresoISO, despidoISO, preavisoOtorgado, conoceTope, topeInput })
          )
        : null,
    [resultado, sueldo, ingresoISO, despidoISO, preavisoOtorgado, conoceTope, topeInput]
  );
  useEffect(() => {
    if (datosCompra) recordarDatosCompra(SLUG_INFORME, datosCompra);
    else if (tocado) olvidarDatosCompra(SLUG_INFORME);
  }, [tocado, datosCompra]);

  return (
    <>
    <div onChange={() => setTocado(true)} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="mejor-sueldo" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál fue tu mejor sueldo bruto mensual del último año?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La «mejor remuneración mensual, normal y habitual»: tu sueldo bruto más alto de los
            últimos 12 meses, sin aguinaldo ni premios que no se paguen todos los meses.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="mejor-sueldo"
              inputMode="numeric"
              placeholder="Ej: 1.500.000"
              value={sueldoInput}
              onChange={(e) => setSueldoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fecha-ingreso" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo entraste a trabajar?
            </label>
            <input
              id="fecha-ingreso"
              type="date"
              value={ingresoISO}
              onChange={(e) => setIngresoISO(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label htmlFor="fecha-despido" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo fue (o sería) el despido?
            </label>
            <input
              id="fecha-despido"
              type="date"
              value={despidoISO}
              onChange={(e) => setDespidoISO(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={preavisoOtorgado}
            onChange={(e) => setPreavisoOtorgado(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Me dieron preaviso
            <span className="block text-xs text-zinc-500">
              Te avisaron por escrito con 1 o 2 meses de anticipación y trabajaste ese período
              (se cobra como sueldo normal, no como indemnización).
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={conoceTope}
            onChange={(e) => setConoceTope(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Conozco el tope indemnizatorio de mi convenio
            <span className="block text-xs text-zinc-500">
              Es el triple del sueldo promedio de tu convenio colectivo. Si no lo sabés, dejalo
              sin marcar: te mostramos el cálculo sin tope y el piso garantizado.
            </span>
          </span>
        </label>

        {conoceTope && (
          <div>
            <label htmlFor="tope-cct" className="block text-sm font-semibold text-zinc-800">
              Tope indemnizatorio del convenio
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="tope-cct"
                inputMode="numeric"
                placeholder="Ej: 1.200.000"
                value={topeInput}
                onChange={(e) => setTopeInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
              />
            </div>
          </div>
        )}
      </div>

      {fechasInvertidas && (
        <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Revisá las fechas</p>
          <p className="mt-1">La fecha de despido tiene que ser posterior a la de ingreso.</p>
        </div>
      )}

      {resultado && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          {resultado.enPeriodoPrueba ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">
                  Estás dentro del período de prueba ({MESES_PERIODO_PRUEBA} meses)
                </p>
                <p className="mt-1">
                  Con {textoAntiguedad(resultado.antiguedad)} de antigüedad, el empleador puede
                  extinguir el contrato sin indemnización por antigüedad ni preaviso (art. 92
                  bis LCT). Igual te corresponde la liquidación final:
                </p>
              </div>
              <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
                <Fila
                  label="SAC (aguinaldo) proporcional"
                  detalle={`${resultado.sacProporcional.dias} días del semestre`}
                  monto={resultado.sacProporcional.monto}
                />
                <Fila
                  label="Vacaciones proporcionales no gozadas"
                  detalle={`${resultado.vacaciones.dias.toFixed(1)} días a sueldo ÷ 25`}
                  monto={resultado.vacaciones.monto}
                />
                <Fila label="SAC sobre vacaciones" monto={resultado.vacaciones.sac} />
                <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                  <dt className="font-semibold text-zinc-800">Liquidación final estimada</dt>
                  <dd className="font-semibold text-zinc-900">
                    {formatARS(resultado.totalLiquidacionFinal)}
                  </dd>
                </div>
              </dl>
              <p className="text-xs text-zinc-400">
                A esto se suman los días trabajados del último mes. Algunos convenios amplían el
                período de prueba hasta 8 meses (empresas de 6 a 100 trabajadores) o 12 (hasta
                5 trabajadores).
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-zinc-500">Te corresponde aproximadamente</p>
                <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                  {formatARS(resultado.totalGeneral, 0)}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Antigüedad: {textoAntiguedad(resultado.antiguedad)} →{" "}
                  {resultado.aniosComputables}{" "}
                  {resultado.aniosComputables === 1 ? "año computable" : "años computables"}{" "}
                  (la fracción mayor a 3 meses cuenta como año entero)
                </p>
              </div>

              <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
                <Fila
                  label="Indemnización por antigüedad (art. 245)"
                  detalle={`${resultado.aniosComputables} ${
                    resultado.aniosComputables === 1 ? "año" : "años"
                  } × ${formatARS(resultado.baseAplicada, 0)}`}
                  monto={resultado.indemnizacionAntiguedad}
                />
                {resultado.preaviso && (
                  <>
                    <Fila
                      label="Preaviso no otorgado (art. 232)"
                      detalle={`${resultado.preaviso.meses} ${
                        resultado.preaviso.meses === 1 ? "mes" : "meses"
                      } de sueldo`}
                      monto={resultado.preaviso.monto}
                    />
                    <Fila label="SAC sobre preaviso" monto={resultado.preaviso.sac} />
                  </>
                )}
                {resultado.integracion && (
                  <>
                    <Fila
                      label="Integración del mes de despido (art. 233)"
                      detalle={`${resultado.integracion.dias} días hasta fin de mes`}
                      monto={resultado.integracion.monto}
                    />
                    <Fila label="SAC sobre integración" monto={resultado.integracion.sac} />
                  </>
                )}
                <Fila
                  label="SAC (aguinaldo) proporcional"
                  detalle={`${resultado.sacProporcional.dias} días del semestre`}
                  monto={resultado.sacProporcional.monto}
                />
                <Fila
                  label="Vacaciones proporcionales no gozadas"
                  detalle={`${resultado.vacaciones.dias.toFixed(1)} días a sueldo ÷ 25`}
                  monto={resultado.vacaciones.monto}
                />
                <Fila label="SAC sobre vacaciones" monto={resultado.vacaciones.sac} />
                <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                  <dt className="font-semibold text-zinc-800">Total estimado</dt>
                  <dd className="font-semibold text-zinc-900">
                    {formatARS(resultado.totalGeneral)}
                  </dd>
                </div>
              </dl>

              <GananciasDesglose t={tratamientoGanancias(resultado)} />

              {resultado.topeAplicado && (
                <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                  Tu sueldo supera el tope del convenio, así que la base se ajustó a{" "}
                  {formatARS(resultado.baseAplicada, 0)}. Por ley nunca puede ser menor al 67%
                  de tu remuneración real (art. 245, texto Ley 27.802).
                </p>
              )}
              {!resultado.topeAplicado && resultado.aniosComputables > 0 && (
                <p className="text-xs text-zinc-400">
                  Calculado sin tope de convenio. Si tu convenio tiene tope y tu sueldo lo
                  supera, la indemnización por antigüedad puede bajar, pero nunca menos de{" "}
                  {formatARS(resultado.indemnizacionMinimaConTope, 0)} (piso del 67%).
                </p>
              )}
              <p className="text-xs text-zinc-400">
                Estimación orientativa para despido sin causa. No incluye los días trabajados
                del último mes (eso se cobra como sueldo). La indemnización, el preaviso y la
                integración no llevan aportes; el SAC proporcional sí es remunerativo.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
    {resultado && datosCompra && <OfertaInformeIndemnizacion r={resultado} precio={precioInforme} />}
    </>
  );
}
