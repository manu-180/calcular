"use client";

import { useMemo, useState } from "react";
import {
  DEROGACION_TEXTO,
  MOTIVOS,
  ULTIMO_DIA_VIGENTE_TEXTO,
  type MotivoDisolucion,
} from "@/data/viajantes";
import { formatARS, parseMonto } from "@/lib/formato";
import { calcularViajante } from "@/lib/viajantes";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function Fila({ label, monto, detalle }: { label: string; monto: number; detalle?: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-zinc-600">
        {label}
        {detalle && <span className="block text-xs text-zinc-400">{detalle}</span>}
      </dt>
      <dd className="shrink-0 font-medium text-zinc-900">{formatARS(monto)}</dd>
    </div>
  );
}

export function CalculadoraViajante() {
  const [motivo, setMotivo] = useState<MotivoDisolucion>("despido-sin-causa");
  const [sueldoInput, setSueldoInput] = useState("");
  const [ingresoISO, setIngresoISO] = useState("");
  const [egresoISO, setEgresoISO] = useState("");
  const [preavisoOtorgado, setPreavisoOtorgado] = useState(false);

  const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);
  const fechasInvertidas = Boolean(ingresoISO && egresoISO && egresoISO <= ingresoISO);
  const motivoInfo = MOTIVOS.find((m) => m.id === motivo)!;

  const res = useMemo(() => {
    if (!(sueldo > 0) || !ingresoISO || !egresoISO || fechasInvertidas) return null;
    return calcularViajante({
      ingresoISO,
      egresoISO,
      mejorRemuneracion: sueldo,
      motivo,
      preavisoOtorgado,
    });
  }, [sueldo, ingresoISO, egresoISO, fechasInvertidas, motivo, preavisoOtorgado]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="motivo" className="block text-sm font-semibold text-zinc-800">
            ¿Cómo terminó el contrato?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Para la clientela da igual: el art. 14 la paga «cualquiera sea el motivo determinante de
            la disolución». Lo que cambia según el motivo es el resto de la liquidación.
          </p>
          <select
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value as MotivoDisolucion)}
            className={claseInput}
          >
            {MOTIVOS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.etiqueta}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-zinc-500">{motivoInfo.nota}</p>
        </div>

        <div>
          <label htmlFor="mejor-sueldo" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál fue tu mejor remuneración bruta mensual del último año?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La «mejor remuneración mensual, normal y habitual» del art. 245: sueldo más comisiones
            del mes más alto de los últimos 12, sin aguinaldo.
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
              className={claseInput}
            />
          </div>
          <div>
            <label htmlFor="fecha-egreso" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo se disolvió el contrato?
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Es la fecha que decide todo: hasta el {ULTIMO_DIA_VIGENTE_TEXTO} rige la Ley 14.546.
            </p>
            <input
              id="fecha-egreso"
              type="date"
              value={egresoISO}
              onChange={(e) => setEgresoISO(e.target.value)}
              className={claseInput}
            />
          </div>
        </div>

        {motivo === "despido-sin-causa" && (
          <label className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
            <input
              type="checkbox"
              checked={preavisoOtorgado}
              onChange={(e) => setPreavisoOtorgado(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-600"
            />
            <span className="text-sm text-zinc-700">
              Me dieron el preaviso por escrito y lo trabajé.
              <span className="block text-xs text-zinc-500">
                No cambia la clientela: el art. 14 se calcula siempre sobre un despido
                «intempestivo», es decir, sin preaviso.
              </span>
            </span>
          </label>
        )}
      </div>

      {fechasInvertidas && (
        <p className="mt-5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          La fecha de disolución tiene que ser posterior a la de ingreso.
        </p>
      )}

      {res && (
        <div className="mt-6 space-y-4">
          {res.clientela.corresponde ? (
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/70 p-5">
              <p className="text-sm font-semibold text-emerald-900">
                Indemnización por clientela (art. 14, Ley 14.546)
              </p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-900">
                {formatARS(res.clientela.estricta)}
                <span className="text-2xl font-semibold text-emerald-800">
                  {" "}
                  a {formatARS(res.clientela.amplia)}
                </span>
              </p>
              <p className="mt-2 text-sm text-emerald-900/80">
                El art. 14 manda pagar «el veinticinco por ciento de lo que le hubiere correspondido
                en caso de despido intempestivo e injustificado», pero no enumera los rubros de ese
                despido. Por eso hay un piso y un techo, y esta página muestra los dos.
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <Fila
                  label="Lectura estricta: 25% de la indemnización por antigüedad"
                  monto={res.clientela.estricta}
                  detalle={`25% de ${formatARS(res.clientela.baseEstricta)} (art. 245 LCT)`}
                />
                <Fila
                  label="Lectura amplia: 25% de la antigüedad más el preaviso omitido"
                  monto={res.clientela.amplia}
                  detalle={`25% de ${formatARS(res.clientela.baseAmplia)} (arts. 245, 232 y 233 LCT, con sus SAC)`}
                />
              </dl>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-900">
                Acá no corresponde la indemnización por clientela
              </p>
              <p className="mt-1 text-sm text-amber-900/90">
                {res.clientela.motivoRechazo === "derogada" ? (
                  <>
                    La disolución cae el {DEROGACION_TEXTO} o después, y el art. 198 de la Ley
                    27.802 derogó la Ley 14.546 a partir de ese día. Con el estatuto derogado no
                    hay indemnización por clientela: queda sólo la liquidación de la Ley de Contrato
                    de Trabajo, que es la de abajo.
                  </>
                ) : (
                  <>
                    El art. 14 pide «una vez transcurrido un año de vigencia» del contrato, y acá la
                    antigüedad es de {res.antiguedad.totalMeses}{" "}
                    {res.antiguedad.totalMeses === 1 ? "mes" : "meses"}. El resto de la liquidación
                    se cobra igual.
                  </>
                )}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm font-semibold text-zinc-700">
              El resto de la liquidación ({motivoInfo.etiqueta.toLowerCase()})
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              {res.conIndemnizacionDespido ? (
                <>
                  <Fila
                    label="Antigüedad (art. 245 LCT)"
                    monto={res.hipotetico.indemnizacionAntiguedad}
                    detalle={`${res.hipotetico.aniosComputables} ${
                      res.hipotetico.aniosComputables === 1 ? "año computable" : "años computables"
                    }`}
                  />
                  {!preavisoOtorgado && res.hipotetico.preaviso && (
                    <Fila
                      label="Preaviso omitido + su SAC"
                      monto={res.hipotetico.preaviso.monto + res.hipotetico.preaviso.sac}
                      detalle={`${res.hipotetico.preaviso.meses} ${
                        res.hipotetico.preaviso.meses === 1 ? "mes" : "meses"
                      } (arts. 231/232)`}
                    />
                  )}
                  {!preavisoOtorgado && res.hipotetico.integracion && (
                    <Fila
                      label="Integración del mes + su SAC"
                      monto={res.hipotetico.integracion.monto + res.hipotetico.integracion.sac}
                      detalle={`${res.hipotetico.integracion.dias} días (art. 233)`}
                    />
                  )}
                </>
              ) : (
                <p className="text-sm text-zinc-500">
                  Este motivo no genera las indemnizaciones de los arts. 232, 233 y 245 de la LCT.
                </p>
              )}
              <Fila
                label="Liquidación final: SAC proporcional y vacaciones no gozadas"
                monto={res.liquidacionFinal}
                detalle="arts. 123 y 156 LCT: corresponde sea cual sea el motivo del egreso"
              />
            </dl>
          </div>

          <div className="rounded-xl border-2 border-emerald-500 bg-white p-5">
            <p className="text-sm font-semibold text-zinc-700">Total a cobrar</p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-700">
              {formatARS(res.totalEstricto)}
              {res.clientela.corresponde && (
                <span className="text-2xl font-semibold text-emerald-600">
                  {" "}
                  a {formatARS(res.totalAmplio)}
                </span>
              )}
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {res.clientela.corresponde
                ? "Liquidación de la LCT más la indemnización por clientela, en sus dos lecturas."
                : "Liquidación de la Ley de Contrato de Trabajo, sin clientela."}
            </p>
          </div>

          <p className="text-xs text-zinc-500">
            Orientativo. No se aplicó tope de convenio a la indemnización del art. 245: si el
            convenio colectivo tiene tope, la base puede bajar hasta el 67% de la remuneración real.
            La calculadora tampoco liquida comisiones pendientes de los arts. 5 y 6 del estatuto,
            que se suman aparte.
          </p>
        </div>
      )}
    </div>
  );
}
