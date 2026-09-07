"use client";

import { useMemo, useState } from "react";
import {
  DEROGACION_TEXTO,
  MESES_ESPECIAL,
  ULTIMO_DIA_VIGENTE_TEXTO,
} from "@/data/periodistas";
import { formatARS, parseMonto } from "@/lib/formato";
import { calcularPeriodista } from "@/lib/periodistas";

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

export function CalculadoraPeriodista() {
  const [baseInput, setBaseInput] = useState("");
  const [ingresoISO, setIngresoISO] = useState("");
  const [despidoISO, setDespidoISO] = useState("");
  const [preavisoOtorgado, setPreavisoOtorgado] = useState(false);

  const base = useMemo(() => parseMonto(baseInput), [baseInput]);
  const fechasInvertidas = Boolean(ingresoISO && despidoISO && despidoISO <= ingresoISO);

  const res = useMemo(() => {
    if (!(base > 0) || !ingresoISO || !despidoISO || fechasInvertidas) return null;
    return calcularPeriodista({ ingresoISO, despidoISO, base, preavisoOtorgado });
  }, [base, ingresoISO, despidoISO, fechasInvertidas, preavisoOtorgado]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="base" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál es el promedio bruto de tus últimos seis meses?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El inc. e) del art. 43 no usa el mejor sueldo: usa «el promedio que resulte de lo
            percibido (…) en los últimos seis meses», con extras, comisiones, gratificaciones,
            pagos en especie y los viáticos que no se acreditaron con comprobantes.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="base"
              inputMode="numeric"
              placeholder="Ej: 1.400.000"
              value={baseInput}
              onChange={(e) => setBaseInput(e.target.value)}
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
            <label htmlFor="fecha-despido" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo te despidieron?
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              El estatuto rige hasta el {ULTIMO_DIA_VIGENTE_TEXTO} inclusive.
            </p>
            <input
              id="fecha-despido"
              type="date"
              value={despidoISO}
              onChange={(e) => setDespidoISO(e.target.value)}
              className={claseInput}
            />
          </div>
        </div>

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
              Apaga la sustitutiva del inc. b), pero <strong>no</strong> la indemnización especial
              de {MESES_ESPECIAL} meses: el inc. d) la paga «haya o no mediado preaviso».
            </span>
          </span>
        </label>
      </div>

      {fechasInvertidas && (
        <p className="mt-5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          La fecha de despido tiene que ser posterior a la de ingreso.
        </p>
      )}

      {res && (
        <div className="mt-6 space-y-4">
          {res.vigenteAlDespido ? (
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/70 p-5">
              <p className="text-sm font-semibold text-emerald-900">
                Con el Estatuto del Periodista (hasta el {ULTIMO_DIA_VIGENTE_TEXTO})
              </p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-900">
                {formatARS(res.estatuto.total)}
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <Fila
                  label="Antigüedad (art. 43 inc. c)"
                  monto={res.estatuto.antiguedad}
                  detalle={`${res.estatuto.aniosComputables} ${
                    res.estatuto.aniosComputables === 1 ? "año computable" : "años computables"
                  }, con piso de dos meses`}
                />
                {res.estatuto.sustitutiva > 0 && (
                  <Fila
                    label="Sustitutiva del preaviso (art. 43 inc. b)"
                    monto={res.estatuto.sustitutiva}
                    detalle={`${res.estatuto.mesesSustitutiva} meses — el doble del plazo de preaviso del inc. a)`}
                  />
                )}
                <Fila
                  label="Indemnización especial (art. 43 inc. d)"
                  monto={res.estatuto.especial}
                  detalle={`${MESES_ESPECIAL} meses, haya o no mediado preaviso`}
                />
              </dl>
              {res.enElCorte && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  Tu antigüedad cae <strong>justo en el tercer aniversario</strong>. El inc. b)
                  dice «menor o mayor tres años» y no resuelve ese día exacto: acá se aplicó el
                  tramo de dos meses. Un día más y son cuatro.
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-900">
                Este despido cae después de la derogación
              </p>
              <p className="mt-1 text-sm text-amber-900/90">
                El art. 197 de la Ley 27.802 derogó la Ley 12.908 a partir del {DEROGACION_TEXTO}.
                Con el estatuto derogado no hay indemnización especial ni escala propia: queda la
                liquidación de la Ley de Contrato de Trabajo, que es la de abajo.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm font-semibold text-zinc-700">
              Con la Ley de Contrato de Trabajo (desde el {DEROGACION_TEXTO})
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
              {formatARS(res.lctTotal)}
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <Fila
                label="Antigüedad (art. 245)"
                monto={res.lct.indemnizacionAntiguedad}
                detalle={
                  res.lct.enPeriodoPrueba
                    ? "período de prueba del art. 92 bis: no corresponde"
                    : `${res.lct.aniosComputables} ${
                        res.lct.aniosComputables === 1 ? "año computable" : "años computables"
                      }`
                }
              />
              {res.lct.preaviso && (
                <Fila
                  label="Preaviso omitido + su SAC"
                  monto={res.lct.preaviso.monto + res.lct.preaviso.sac}
                  detalle={`${res.lct.preaviso.meses} ${
                    res.lct.preaviso.meses === 1 ? "mes" : "meses"
                  } (arts. 231/232)`}
                />
              )}
              {res.lct.integracion && (
                <Fila
                  label="Integración del mes + su SAC"
                  monto={res.lct.integracion.monto + res.lct.integracion.sac}
                  detalle={`${res.lct.integracion.dias} días (art. 233)`}
                />
              )}
            </dl>
          </div>

          {res.vigenteAlDespido && (
            <div className="rounded-xl border-2 border-emerald-500 bg-white p-5">
              <p className="text-sm font-semibold text-zinc-700">
                Lo que se pierde el {DEROGACION_TEXTO}
              </p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-700">
                {formatARS(res.diferencia)}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {res.vecesLct === null ? (
                  <>
                    Con esta antigüedad la LCT <strong>no paga indemnización</strong> (art. 92 bis,
                    período de prueba de seis meses) y el estatuto paga{" "}
                    {formatARS(res.estatuto.total)}: la diferencia es todo.
                  </>
                ) : (
                  <>
                    El estatuto paga <strong>{res.vecesLct.toFixed(2)} veces</strong> lo de la Ley
                    de Contrato de Trabajo para el mismo despido, la misma antigüedad y la misma
                    base.
                  </>
                )}
              </p>
            </div>
          )}

          <p className="text-xs text-zinc-500">
            Orientativo. Estos son los rubros indemnizatorios: el SAC proporcional y las vacaciones
            no gozadas se suman aparte y corresponden en los dos regímenes. En la columna de la LCT
            no se aplicó tope de convenio; el estatuto no tiene tope. Tampoco se le suma SAC a las
            indemnizaciones del art. 43: la norma no lo dice.
          </p>
        </div>
      )}
    </div>
  );
}
