"use client";

import { useMemo, useState } from "react";
import { calcularMuerteTrabajador } from "@/lib/muerte-trabajador";
import { formatARS, parseMonto } from "@/lib/formato";
import { MESES_PERIODO_PRUEBA } from "@/data/indemnizacion";
import { DIAS_LIBERACION_EMPLEADOR } from "@/data/muerte-trabajador";

function textoAntiguedad(a: { anios: number; meses: number; dias: number }): string {
  const partes: string[] = [];
  if (a.anios > 0) partes.push(`${a.anios} ${a.anios === 1 ? "año" : "años"}`);
  if (a.meses > 0) partes.push(`${a.meses} ${a.meses === 1 ? "mes" : "meses"}`);
  if (a.dias > 0 && a.anios === 0) partes.push(`${a.dias} ${a.dias === 1 ? "día" : "días"}`);
  return partes.length ? partes.join(" y ") : "menos de un día";
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

function ContadorPersonas({
  id,
  label,
  ayuda,
  valor,
  onChange,
}: {
  id: string;
  label: string;
  ayuda: string;
  valor: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-800">
        {label}
      </label>
      <p className="mt-0.5 text-xs text-zinc-500">{ayuda}</p>
      <input
        id={id}
        inputMode="numeric"
        placeholder="0"
        value={valor}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, "").slice(0, 2))}
        className="mt-2 w-24 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}

export function CalculadoraMuerteTrabajador() {
  const [sueldoInput, setSueldoInput] = useState("");
  const [ingresoISO, setIngresoISO] = useState("");
  const [fallecimientoISO, setFallecimientoISO] = useState("");
  const [conyuge, setConyuge] = useState(false);
  const [menores, setMenores] = useState("");
  const [conCUD, setConCUD] = useState("");
  const [mayores, setMayores] = useState("");
  const [padres, setPadres] = useState("");
  const [conoceTope, setConoceTope] = useState(false);
  const [topeInput, setTopeInput] = useState("");

  const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);
  const tope = useMemo(() => parseMonto(topeInput), [topeInput]);
  const fechasInvertidas = Boolean(
    ingresoISO && fallecimientoISO && fallecimientoISO <= ingresoISO,
  );

  const resultado = useMemo(() => {
    if (!(sueldo > 0) || !ingresoISO || !fallecimientoISO || fechasInvertidas) return null;
    return calcularMuerteTrabajador({
      ingresoISO,
      fallecimientoISO,
      mejorRemuneracion: sueldo,
      topeCCT: conoceTope && tope > 0 ? tope : undefined,
      familia: {
        conyugeOConviviente: conyuge,
        hijosMenores: Number(menores || 0),
        hijosMayoresConCUD: Number(conCUD || 0),
        hijosMayores: Number(mayores || 0),
        padresACargo: Number(padres || 0),
      },
    });
  }, [
    sueldo,
    ingresoISO,
    fallecimientoISO,
    fechasInvertidas,
    conoceTope,
    tope,
    conyuge,
    menores,
    conCUD,
    mayores,
    padres,
  ]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="mejor-sueldo" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál era su mejor sueldo bruto mensual del último año?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La «mejor remuneración mensual, normal y habitual»: el sueldo bruto más alto de los
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
              ¿Cuándo entró a trabajar?
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
            <label htmlFor="fecha-deceso" className="block text-sm font-semibold text-zinc-800">
              Fecha del fallecimiento
            </label>
            <input
              id="fecha-deceso"
              type="date"
              value={fallecimientoISO}
              onChange={(e) => setFallecimientoISO(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <fieldset className="rounded-xl border border-zinc-200 p-4">
          <legend className="px-1 text-sm font-semibold text-zinc-800">
            ¿Quiénes quedaron? (art. 248)
          </legend>
          <p className="mb-3 text-xs text-zinc-500">
            El artículo llama primero al cónyuge o conviviente, a los hijos menores y a los hijos
            mayores con CUD. Los hijos mayores sin CUD y los padres entran sólo si no hay ninguno
            de los anteriores.
          </p>
          <div className="space-y-4">
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={conyuge}
                onChange={(e) => setConyuge(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-emerald-600"
              />
              <span>
                Hay cónyuge o conviviente
                <span className="block text-xs text-zinc-500">
                  El texto vigente los nombra a los dos, sin distinguir entre matrimonio y unión
                  convivencial.
                </span>
              </span>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <ContadorPersonas
                id="hijos-menores"
                label="Hijos menores de edad"
                ayuda="Menores de 18 años al momento del fallecimiento."
                valor={menores}
                onChange={setMenores}
              />
              <ContadorPersonas
                id="hijos-cud"
                label="Hijos mayores con CUD"
                ayuda="Mayores de edad con Certificado Único de Discapacidad."
                valor={conCUD}
                onChange={setConCUD}
              />
              <ContadorPersonas
                id="hijos-mayores"
                label="Hijos mayores sin CUD"
                ayuda="Cobran sólo si no hay ninguno de los tres anteriores."
                valor={mayores}
                onChange={setMayores}
              />
              <ContadorPersonas
                id="padres"
                label="Padres a cargo"
                ayuda="Sólo si estaban a cargo del trabajador y no hay hijos ni cónyuge."
                valor={padres}
                onChange={setPadres}
              />
            </div>
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={conoceTope}
            onChange={(e) => setConoceTope(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Conozco el tope indemnizatorio del convenio
            <span className="block text-xs text-zinc-500">
              Es el triple del sueldo promedio del convenio. Si no lo sabés, dejalo sin marcar: la
              base nunca puede bajar del 67% del sueldo real.
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
          <p className="mt-1">El fallecimiento tiene que ser posterior a la fecha de ingreso.</p>
        </div>
      )}

      {resultado && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500">Le corresponde a la familia, en total</p>
              <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                {formatARS(resultado.totalGeneral, 0)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Antigüedad: {textoAntiguedad(resultado.antiguedad)}
                {!resultado.enPeriodoPrueba && (
                  <>
                    {" "}
                    → {resultado.aniosComputables}{" "}
                    {resultado.aniosComputables === 1 ? "año computable" : "años computables"} (la
                    fracción mayor a 3 meses cuenta como año entero)
                  </>
                )}
              </p>
            </div>

            {resultado.enPeriodoPrueba && (
              <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">
                  Estaba dentro del período de prueba ({MESES_PERIODO_PRUEBA} meses)
                </p>
                <p className="mt-1">
                  La indemnización del artículo 248 se calcula sobre la del artículo 245, que se
                  debe recién pasado el período de prueba (art. 92 bis). Por eso da cero. La
                  liquidación final se paga igual, y las prestaciones de la ART y del sistema
                  previsional no dependen de esto.
                </p>
              </div>
            )}

            <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
              <Fila
                label="Indemnización por muerte (art. 248)"
                detalle={`La mitad del art. 245 (art. 247): ${formatARS(
                  resultado.indemnizacionArt245,
                  0,
                )} ÷ 2`}
                monto={resultado.indemnizacionArt248}
              />
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
                <dt className="font-semibold text-zinc-800">Total</dt>
                <dd className="font-semibold text-zinc-900">
                  {formatARS(resultado.totalGeneral)}
                </dd>
              </div>
            </dl>

            {resultado.topeAplicado && (
              <p className="text-xs text-zinc-500">
                Se aplicó el tope del convenio: la base bajó a {formatARS(resultado.baseAplicada, 0)}{" "}
                (nunca menos del 67% del sueldo real, {formatARS(resultado.base * 0.67, 0)}).
              </p>
            )}

            {resultado.beneficiarios.titulares > 0 && resultado.porBeneficiario !== null ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
                <p className="font-semibold text-emerald-900">
                  Cómo se reparte: {resultado.beneficiarios.titulares}{" "}
                  {resultado.beneficiarios.titulares === 1 ? "titular" : "titulares"}, partes
                  iguales
                </p>
                <ul className="mt-2 space-y-1 text-emerald-900">
                  {resultado.beneficiarios.detalle.map((d) => (
                    <li key={d.concepto}>
                      {d.concepto}: {d.cantidad}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-emerald-900">
                  Cada uno cobra{" "}
                  <strong className="text-emerald-800">
                    {formatARS(resultado.porBeneficiario, 0)}
                  </strong>{" "}
                  de la indemnización del artículo 248.
                </p>
                {resultado.beneficiarios.desplazados.length > 0 && (
                  <p className="mt-3 text-xs text-emerald-800">
                    No entran en el reparto:{" "}
                    {resultado.beneficiarios.desplazados
                      .map((d) => `${d.concepto} (${d.cantidad})`)
                      .join(", ")}
                    . El artículo los llama sólo ante la falta de los beneficiarios anteriores.
                  </p>
                )}
              </div>
            ) : (
              <p className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-600">
                Cargá quiénes quedaron para ver cuánto le toca a cada uno. La indemnización se
                divide en partes iguales entre los titulares que llama el artículo.
              </p>
            )}

            <p className="text-xs text-zinc-400">
              A esto se le suman los días trabajados del último mes. El empleador queda liberado si
              paga dentro de los {DIAS_LIBERACION_EMPLEADOR} días del deceso. Esta indemnización es
              independiente de lo que pague la ART y de cualquier seguro o beneficio del convenio:
              no se suma ni se descuenta.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
