"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularContinuidad, type SupuestoId } from "@/lib/obra-social-continuidad";
import { SUPUESTOS } from "@/data/obra-social-continuidad";
import {
  APORTE_TRABAJADOR,
  CONTRIBUCION_EMPLEADOR,
} from "@/data/obra-social-aportes";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${Number(d)} de ${MESES[Number(m) - 1]} de ${a}`;
}

const puntos = (APORTE_TRABAJADOR + CONTRIBUCION_EMPLEADOR) * 100;

export function CalculadoraObraSocialContinuidad() {
  const [supuesto, setSupuesto] = useState<SupuestoId>("extincion");
  const [hecho, setHecho] = useState("2026-09-05");
  const [ingreso, setIngreso] = useState("2024-03-01");
  const [cargas, setCargas] = useState(false);

  const res = useMemo(
    () =>
      calcularContinuidad({
        supuesto,
        hechoISO: hecho,
        ingresoISO: ingreso,
        cargasDeFamilia: cargas,
      }),
    [supuesto, hecho, ingreso, cargas],
  );

  const elegido = SUPUESTOS.find((s) => s.id === supuesto);
  const etiquetaHecho =
    supuesto === "extincion"
      ? "Fecha del distracto (último día de trabajo)"
      : supuesto === "fallecimiento"
        ? "Fecha del fallecimiento"
        : supuesto === "enfermedad"
          ? "Primer día de la enfermedad o el accidente"
          : "Primer día de la suspensión, licencia o inactividad";

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="osc-supuesto" className="block text-sm font-semibold text-zinc-800">
            Qué pasó
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El art. 10 tiene ocho supuestos y cada uno tiene su plazo y su respuesta a «¿hay que
            pagar?».
          </p>
          <select
            id="osc-supuesto"
            value={supuesto}
            onChange={(e) => setSupuesto(e.target.value as SupuestoId)}
            className={claseInput}
          >
            {SUPUESTOS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.titulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="osc-hecho" className="block text-sm font-semibold text-zinc-800">
            {etiquetaHecho}
          </label>
          <input
            id="osc-hecho"
            type="date"
            value={hecho}
            onChange={(e) => setHecho(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="osc-ingreso" className="block text-sm font-semibold text-zinc-800">
            Fecha de ingreso
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Define si se cumple el piso de más de tres meses continuados, y la antigüedad del art.
            208.
          </p>
          <input
            id="osc-ingreso"
            type="date"
            value={ingreso}
            onChange={(e) => setIngreso(e.target.value)}
            className={claseInput}
          />
        </div>

        {supuesto === "enfermedad" ? (
          <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:col-span-2">
            <input
              id="osc-cargas"
              type="checkbox"
              checked={cargas}
              onChange={(e) => setCargas(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <label htmlFor="osc-cargas" className="text-sm text-zinc-700">
              <span className="font-semibold text-zinc-800">Tenés cargas de familia</span>
              <span className="mt-0.5 block text-xs text-zinc-500">
                Duplican la licencia paga del art. 208, y con eso corren la fecha final casi un año.
              </span>
            </label>
          </div>
        ) : null}
      </div>

      {res ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div
              className={`rounded-xl border p-5 ${
                res.bloqueadoPorAntiguedad
                  ? "border-rose-200 bg-rose-50/70"
                  : "border-emerald-200 bg-emerald-50/60"
              }`}
            >
              <p className="text-sm font-semibold text-zinc-700">Hasta cuándo</p>
              {res.hastaISO ? (
                <>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                    {fechaLarga(res.hastaISO)}
                  </p>
                  <p className="mt-1 text-sm text-zinc-700">
                    {res.mesesSinAporte} {res.mesesSinAporte === 1 ? "mes" : "meses"} de cobertura sin
                    obligación de aportar.
                  </p>
                </>
              ) : (
                <p className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
                  {res.veredicto}
                </p>
              )}
              <p className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-zinc-700">
                {res.detalle}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-700">¿Hay que pagar algo?</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                {res.mesesSinAporte > 0
                  ? res.hayOpcionPaga
                    ? "No, y después es opcional"
                    : "No"
                  : "Sí, desde el primer día"}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {res.mesesSinAporte > 0 && !res.hayOpcionPaga
                  ? "La ley dice «sin obligación de efectuar aportes»: durante ese plazo la cobertura sigue sin que se descuente ni se pague nada."
                  : `Para seguir hay que cubrir el aporte del trabajador y también la contribución del empleador: ${puntos.toLocaleString("es-AR")} puntos, no ${(APORTE_TRABAJADOR * 100).toLocaleString("es-AR")}. La ley no fija sobre qué remuneración se calculan cuando ya no hay sueldo, así que ese monto lo define la obra social: hay que preguntarlo antes de contar con la cobertura.`}
              </p>
              {elegido ? (
                <p className="mt-2 text-xs text-zinc-500">
                  Norma: Ley 23.660, {elegido.inciso}.
                </p>
              ) : null}
            </div>
          </div>

          {res.mesesLicenciaPaga !== null ? (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              La cuenta tiene dos tramos: {res.mesesLicenciaPaga} meses de licencia paga del art. 208
              y después los 12 meses de conservación del empleo del art. 211. Por eso la respuesta
              depende de la antigüedad y de las cargas de familia, y va de 15 meses a 2 años. El
              detalle de la licencia paga está en la{" "}
              <Link href="/licencia-por-enfermedad" className="underline">
                calculadora de licencia por enfermedad
              </Link>
              .
            </p>
          ) : null}

          {supuesto === "extincion" && !res.bloqueadoPorAntiguedad ? (
            <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
              Después de esa fecha ya no sos beneficiario por la relación de trabajo. Las salidas
              habituales (monotributo, adherente voluntario de la misma obra social o un plan de
              adhesión voluntaria de una prepaga) se pagan enteras: no hay aportes que derivar
              mientras no tengas un empleo nuevo. Cómo funciona esa derivación cuando volvés a
              trabajar está en{" "}
              <Link href="/derivar-aportes-a-prepaga" className="underline">
                derivar aportes a una prepaga
              </Link>
              .
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Revisá las fechas: el ingreso tiene que ser anterior al hecho, y las dos con día, mes y
          año.
        </p>
      )}

      <p className="mt-4 text-xs text-zinc-500">
        Los plazos salen del texto vigente del art. 10 de la Ley 23.660 y de los arts. 208 y 211 de
        la Ley de Contrato de Trabajo. Acá no se estima ninguno.
      </p>
    </div>
  );
}
