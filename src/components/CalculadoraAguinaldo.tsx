"use client";

import { useEffect, useMemo, useState } from "react";
import { calcularAguinaldo } from "@/lib/aguinaldo";
import { formatARS, parseMonto } from "@/lib/formato";
import { SEMESTRES_2026, type Semestre } from "@/data/aguinaldo";
import { CompartirWhatsApp } from "@/components/CompartirWhatsApp";

export function CalculadoraAguinaldo() {
  const [sueldoInput, setSueldoInput] = useState("");
  const [semestreId, setSemestreId] = useState<Semestre["id"]>("primero");
  const [semestreIncompleto, setSemestreIncompleto] = useState(false);
  const [ingresoISO, setIngresoISO] = useState("");
  const [egresoISO, setEgresoISO] = useState("");

  // Después de montar, preseleccionamos el semestre en curso (julio-diciembre → 2do).
  useEffect(() => {
    if (new Date().getMonth() >= 6) setSemestreId("segundo");
  }, []);

  const semestre = SEMESTRES_2026.find((s) => s.id === semestreId) ?? SEMESTRES_2026[0];
  const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);

  const resultado = useMemo(
    () =>
      sueldo > 0
        ? calcularAguinaldo({
            mejorSueldo: sueldo,
            semestre,
            ingresoISO: semestreIncompleto && ingresoISO ? ingresoISO : undefined,
            egresoISO: semestreIncompleto && egresoISO ? egresoISO : undefined,
          })
        : null,
    [sueldo, semestre, semestreIncompleto, ingresoISO, egresoISO]
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="mejor-sueldo" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál fue tu mejor sueldo bruto del semestre?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La mayor remuneración mensual del semestre, en bruto (antes de descuentos) y por todo
            concepto: incluye horas extras, comisiones y adicionales habituales.
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

        <fieldset>
          <legend className="text-sm font-semibold text-zinc-800">¿Qué cuota querés calcular?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {SEMESTRES_2026.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSemestreId(s.id)}
                aria-pressed={semestreId === s.id}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                  semestreId === s.id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {s.etiqueta}
                <span className="block text-xs font-normal opacity-75">
                  se paga el {s.fechaPago.replace(" de 2026", "")}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={semestreIncompleto}
            onChange={(e) => setSemestreIncompleto(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            No trabajé el semestre completo
            <span className="block text-xs text-zinc-500">
              Si entraste o saliste del trabajo durante el semestre, el aguinaldo es proporcional
              a los días trabajados.
            </span>
          </span>
        </label>

        {semestreIncompleto && (
          <div className="grid gap-4 rounded-lg bg-zinc-50 p-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fecha-ingreso" className="block text-sm font-semibold text-zinc-800">
                Fecha de ingreso
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Si empezaste antes del semestre, dejala vacía.
              </p>
              <input
                id="fecha-ingreso"
                type="date"
                value={ingresoISO}
                onChange={(e) => setIngresoISO(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label htmlFor="fecha-egreso" className="block text-sm font-semibold text-zinc-800">
                Fecha de egreso (si te fuiste)
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Solo si el trabajo terminó durante el semestre.
              </p>
              <input
                id="fecha-egreso"
                type="date"
                value={egresoISO}
                onChange={(e) => setEgresoISO(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        )}
      </div>

      {resultado && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          {resultado.diasTrabajados === 0 ? (
            <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold">Las fechas no caen dentro del semestre elegido</p>
              <p className="mt-1">
                Con esa fecha de ingreso o egreso no hay días trabajados entre el{" "}
                {semestre.periodo} de 2026. Revisá las fechas o cambiá de semestre.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Tu aguinaldo bruto</p>
                  <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                    {formatARS(resultado.bruto, 0)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-500">En mano (estimado)</p>
                  <p className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                    {formatARS(resultado.netoEstimado, 0)}
                  </p>
                </div>
              </div>

              {resultado.esProporcional && (
                <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                  Aguinaldo proporcional: trabajaste {resultado.diasTrabajados} de los{" "}
                  {resultado.diasTotales} días del semestre. El aguinaldo completo hubiera sido{" "}
                  {formatARS(resultado.brutoSemestreCompleto, 0)}.
                </p>
              )}

              <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Aguinaldo bruto</dt>
                  <dd className="font-medium text-zinc-900">{formatARS(resultado.bruto)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Jubilación (11%)</dt>
                  <dd className="font-medium text-zinc-900">
                    −{formatARS(resultado.aportes.jubilacion)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">PAMI — Ley 19.032 (3%)</dt>
                  <dd className="font-medium text-zinc-900">
                    −{formatARS(resultado.aportes.pami)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Obra social (3%)</dt>
                  <dd className="font-medium text-zinc-900">
                    −{formatARS(resultado.aportes.obraSocial)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                  <dt className="font-semibold text-zinc-800">Neto estimado</dt>
                  <dd className="font-semibold text-zinc-900">
                    {formatARS(resultado.netoEstimado)}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-zinc-600">
                  Esta cuota vence el <strong>{semestre.fechaPago}</strong>.
                </p>
                <CompartirWhatsApp
                  mensaje={`Mi aguinaldo: ${formatARS(resultado.netoEstimado, 0)} en mano (${formatARS(resultado.bruto, 0)} brutos). Calculá el tuyo gratis:`}
                  path="/aguinaldo"
                  campania="aguinaldo"
                />
              </div>

              <p className="text-xs text-zinc-400">
                El neto es una estimación con los aportes de ley (jubilación, PAMI y obra social).
                No incluye impuesto a las Ganancias ni descuentos sindicales, que dependen de cada
                caso y convenio.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
