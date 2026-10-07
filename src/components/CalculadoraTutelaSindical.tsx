"use client";

import { useMemo, useState } from "react";
import { ROLES, type RolSindical } from "@/data/tutela-sindical";
import { calcularTutelaSindical } from "@/lib/tutela-sindical";
import { formatARS, parseDecimal, parseMonto } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function textoTramo(t: { meses: number; dias: number }): string {
  const partes: string[] = [];
  if (t.meses > 0) partes.push(`${t.meses} ${t.meses === 1 ? "mes" : "meses"}`);
  if (t.dias > 0) partes.push(`${t.dias} ${t.dias === 1 ? "día" : "días"}`);
  return partes.length ? partes.join(" y ") : "0 días";
}

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

export function CalculadoraTutelaSindical() {
  const [rol, setRol] = useState<RolSindical>("titular");
  const [sueldoInput, setSueldoInput] = useState("");
  const [ingresoISO, setIngresoISO] = useState("");
  const [despidoISO, setDespidoISO] = useState("");
  const [preavisoOtorgado, setPreavisoOtorgado] = useState(false);
  const [finMandatoISO, setFinMandatoISO] = useState("");
  const [postulacionISO, setPostulacionISO] = useState("");
  const [votosInput, setVotosInput] = useState("");

  const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);
  const fechasInvertidas = Boolean(ingresoISO && despidoISO && despidoISO <= ingresoISO);
  const rolInfo = ROLES.find((r) => r.id === rol)!;

  const res = useMemo(() => {
    if (!(sueldo > 0) || !ingresoISO || !despidoISO || fechasInvertidas) return null;
    const votos = votosInput.trim() ? parseDecimal(votosInput) : undefined;
    return calcularTutelaSindical({
      ingresoISO,
      despidoISO,
      mejorRemuneracion: sueldo,
      preavisoOtorgado,
      rol,
      finMandatoISO: finMandatoISO || undefined,
      postulacionISO: postulacionISO || undefined,
      porcentajeVotos: votos,
    });
  }, [
    sueldo,
    ingresoISO,
    despidoISO,
    fechasInvertidas,
    preavisoOtorgado,
    rol,
    finMandatoISO,
    postulacionISO,
    votosInput,
  ]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="rol" className="block text-sm font-semibold text-zinc-800">
            ¿Qué cargo gremial tenías al momento del despido?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Es la pregunta que más cambió con la reforma: el art. 52 nuevo dejó afuera a los
            suplentes y le puso cupo a los congresales.
          </p>
          <select
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value as RolSindical)}
            className={claseInput}
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.etiqueta}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-zinc-500">{rolInfo.descripcion}</p>
        </div>

        <div>
          <label htmlFor="mejor-sueldo" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál fue tu mejor sueldo bruto mensual del último año?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La «mejor remuneración mensual, normal y habitual»: el bruto más alto de los últimos 12
            meses, sin aguinaldo ni premios que no se paguen todos los meses.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="mejor-sueldo"
              inputMode="numeric"
              placeholder="Ej: 1.200.000"
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
            <label htmlFor="fecha-despido" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo te despidieron?
            </label>
            <input
              id="fecha-despido"
              type="date"
              value={despidoISO}
              onChange={(e) => setDespidoISO(e.target.value)}
              className={claseInput}
            />
          </div>
        </div>

        {rol === "titular" && (
          <div>
            <label htmlFor="fin-mandato" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo terminaba tu mandato?
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              El art. 52 paga «las remuneraciones que le hubieren correspondido durante el tiempo
              faltante del mandato». Si lo dejás vacío, la cuenta muestra sólo el año de estabilidad
              posterior.
            </p>
            <input
              id="fin-mandato"
              type="date"
              value={finMandatoISO}
              onChange={(e) => setFinMandatoISO(e.target.value)}
              className={claseInput}
            />
          </div>
        )}

        {rol === "candidato-no-electo" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="postulacion" className="block text-sm font-semibold text-zinc-800">
                ¿Cuándo se notificó tu postulación al empleador?
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Desde esa notificación fehaciente corren los seis meses del art. 50.
              </p>
              <input
                id="postulacion"
                type="date"
                value={postulacionISO}
                onChange={(e) => setPostulacionISO(e.target.value)}
                className={claseInput}
              />
            </div>
            <div>
              <label htmlFor="votos" className="block text-sm font-semibold text-zinc-800">
                ¿Qué porcentaje de los votos válidos sacaste?
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Por debajo del 5% la protección cesa (art. 50 nuevo). Dejalo vacío si la elección
                todavía no se resolvió.
              </p>
              <input
                id="votos"
                inputMode="decimal"
                placeholder="Ej: 12,5"
                value={votosInput}
                onChange={(e) => setVotosInput(e.target.value)}
                className={claseInput}
              />
            </div>
          </div>
        )}

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
              Si te avisaron y seguiste trabajando el plazo, no corresponde la indemnización
              sustitutiva ni la integración del mes.
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
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm font-semibold text-zinc-700">
              Indemnización común (la que cobra cualquier trabajador)
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              {formatARS(res.base.totalGeneral)}
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <Fila
                label="Antigüedad (art. 245 LCT)"
                monto={res.base.indemnizacionAntiguedad}
                detalle={`${res.base.aniosComputables} ${
                  res.base.aniosComputables === 1 ? "año computable" : "años computables"
                }`}
              />
              {res.base.preaviso && (
                <Fila
                  label="Preaviso omitido + su SAC"
                  monto={res.base.preaviso.monto + res.base.preaviso.sac}
                  detalle={`${res.base.preaviso.meses} ${
                    res.base.preaviso.meses === 1 ? "mes" : "meses"
                  } (arts. 231/232)`}
                />
              )}
              {res.base.integracion && (
                <Fila
                  label="Integración del mes de despido + su SAC"
                  monto={res.base.integracion.monto + res.base.integracion.sac}
                  detalle={`${res.base.integracion.dias} días (art. 233)`}
                />
              )}
              <Fila label="SAC proporcional (art. 123)" monto={res.base.sacProporcional.monto} />
              <Fila
                label="Vacaciones no gozadas + su SAC"
                monto={res.base.vacaciones.monto + res.base.vacaciones.sac}
                detalle={`${res.base.vacaciones.dias.toFixed(1)} días (art. 156)`}
              />
            </dl>
          </div>

          {res.cuantificado ? (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-5">
              <p className="text-sm font-semibold text-emerald-900">
                Agravamiento del art. 52 de la Ley 23.551
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-900">
                {formatARS(res.agravamientoArt52)}
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                {res.tramoPendiente && (
                  <Fila
                    label={
                      res.rol === "titular"
                        ? "Remuneraciones del mandato que faltaba"
                        : "Período de tutela del art. 50 aún no agotado"
                    }
                    monto={res.tramoPendiente.monto}
                    detalle={textoTramo(res.tramoPendiente)}
                  />
                )}
                {res.tramoAnioExtra && (
                  <Fila
                    label={
                      res.rol === "titular"
                        ? "Año de estabilidad posterior (art. 48)"
                        : "El año más que la ley le reconoce al candidato"
                    }
                    monto={res.tramoAnioExtra.monto}
                    detalle={`${res.tramoAnioExtra.meses} meses de sueldo`}
                  />
                )}
              </dl>
              <p className="mt-3 text-xs text-emerald-900/70">
                Son sueldos, no indemnizaciones: la ley dice «una suma equivalente al importe de las
                remuneraciones». No se le aplica el tope del convenio ni se le suma aguinaldo. Si
                el SAC corresponde o no sobre esta suma lo discuten los tribunales: la norma no lo
                dice.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-5">
              <p className="text-sm font-semibold text-amber-900">
                Acá la ley no fija un importe
              </p>
              <p className="mt-1 text-sm text-amber-900/90">{res.sinAgravamiento}</p>
            </div>
          )}

          <div className="rounded-xl border-2 border-emerald-500 bg-white p-5">
            <p className="text-sm font-semibold text-zinc-700">Total a reclamar</p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-700">
              {formatARS(res.totalConArt52)}
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {res.cuantificado
                ? "Indemnización común más el agravamiento del art. 52."
                : "Es la indemnización común: en este caso el art. 52 no agrega un importe."}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <p className="text-sm font-semibold text-zinc-800">
              Y si el despido además fue discriminatorio: el art. 245 bis de la LCT
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              El art. 245 bis enumera expresamente la «opinión política o gremial». Pero{" "}
              <strong>no se suma</strong>: el art. 52 dice que su indemnización no es «acumulable a
              las dispuestas en el artículo 245 bis», y el art. 245 bis dice que no es acumulable
              «con ningún otro régimen especial que establezca agravamientos». Se elige uno.
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <Fila
                label="Art. 245 bis en su piso (50% del art. 245)"
                monto={res.art245bisPiso}
                detalle="lo mínimo que corresponde si se prueba la discriminación"
              />
              <Fila
                label="Art. 245 bis llevado al 100% por el juez"
                monto={res.art245bisTecho}
                detalle="«según la gravedad de los hechos»"
              />
            </dl>
            {res.cuantificado && (
              <p
                className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                  res.conviene === "art52"
                    ? "bg-emerald-50 text-emerald-900"
                    : "bg-amber-50 text-amber-900"
                }`}
              >
                {res.conviene === "art52" ? (
                  <>
                    En este caso el <strong>art. 52 deja más</strong>:{" "}
                    {formatARS(res.agravamientoArt52)} contra {formatARS(res.art245bisPiso)} del
                    piso del art. 245 bis.
                  </>
                ) : res.conviene === "art245bis" ? (
                  <>
                    En este caso el <strong>art. 245 bis deja más</strong> aun en su piso:{" "}
                    {formatARS(res.art245bisPiso)} contra {formatARS(res.agravamientoArt52)} del
                    art. 52, y el juez puede llevarlo hasta {formatARS(res.art245bisTecho)}.
                  </>
                ) : (
                  <>Los dos caminos dan lo mismo en este caso.</>
                )}
              </p>
            )}
          </div>

          <p className="text-xs text-zinc-500">
            Orientativo. La indemnización agravada del art. 52 se reclama judicialmente y el propio
            artículo ofrece dos caminos alternativos: pedir la reinstalación con los salarios caídos,
            o considerarse en despido indirecto y cobrar esto. Esta calculadora hace el segundo.
          </p>
        </div>
      )}
    </div>
  );
}
