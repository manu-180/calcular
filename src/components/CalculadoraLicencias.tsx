"use client";

import { useMemo, useState } from "react";
import { MATERNIDAD } from "@/data/licencias";
import { calcularMaternidad, fechaLarga } from "@/lib/licencias";
import { formatARS, parseMonto, errorMonto, primerError } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

export function CalculadoraLicencias() {
  const [fechaParto, setFechaParto] = useState("");
  const [diasAntes, setDiasAntes] = useState<number>(MATERNIDAD.diasAntes);
  const [brutoInput, setBrutoInput] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");

  const bruto = useMemo(() => parseMonto(brutoInput), [brutoInput]);

  const res = useMemo(
    () =>
      fechaParto
        ? calcularMaternidad({
            fechaParto,
            diasAntes,
            brutoMensual: bruto,
            fechaIngreso: fechaIngreso || undefined,
          })
        : null,
    [fechaParto, diasAntes, bruto, fechaIngreso],
  );

  const error = primerError({
    "Sueldo bruto mensual": errorMonto(brutoInput),
  });

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="parto" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál es la fecha probable de parto?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La que figura en el certificado médico que presentás en el trabajo.
          </p>
          <input
            id="parto"
            type="date"
            value={fechaParto}
            onChange={(e) => setFechaParto(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="bruto" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál es tu sueldo <em>bruto</em> mensual?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El bruto, no el de bolsillo: durante la licencia cobrás el bruto.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="bruto"
              inputMode="numeric"
              placeholder="Ej: 1.200.000"
              value={brutoInput}
              onChange={(e) => setBrutoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dias" className="block text-sm font-semibold text-zinc-800">
            ¿Cuántos días querés tomarte <em>antes</em> del parto?{" "}
            <span className="font-bold text-emerald-700">{diasAntes}</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El artículo 177 te deja bajar hasta {MATERNIDAD.diasAntesMinimo} días. Lo que no tomás
            antes se acumula después: el total siempre son {MATERNIDAD.diasTotal} días.
          </p>
          <input
            id="dias"
            type="range"
            min={MATERNIDAD.diasAntesMinimo}
            max={MATERNIDAD.diasAntes}
            value={diasAntes}
            onChange={(e) => setDiasAntes(Number(e.target.value))}
            className="mt-3 w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-zinc-400">
            <span>{MATERNIDAD.diasAntesMinimo} antes / {MATERNIDAD.diasTotal - MATERNIDAD.diasAntesMinimo} después</span>
            <span>{MATERNIDAD.diasAntes} antes / {MATERNIDAD.diasDespues} después</span>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="ingreso" className="block text-sm font-semibold text-zinc-800">
            ¿Cuándo entraste a trabajar? <span className="font-normal text-zinc-400">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sirve para verificar los 3 meses de antigüedad que exige ANSES para pagar la asignación.
          </p>
          <input
            id="ingreso"
            type="date"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:w-64"
          />
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res && (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Tu licencia por maternidad</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
            Del {fechaLarga(res.inicio)}
          </p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900">
            al {fechaLarga(res.fin)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Volvés a trabajar el <strong>{fechaLarga(res.reintegro)}</strong>.
          </p>

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Antes del parto</dt>
              <dd className="font-medium text-zinc-900">{res.diasAntes} días</dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Desde el parto</dt>
              <dd className="font-medium text-zinc-900">{res.diasDespues} días</dd>
            </div>
            {bruto > 0 && (
              <>
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Cobrás por mes (ANSES)</dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(res.asignacionMensual, 0)}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Total por los 90 días</dt>
                  <dd className="font-semibold text-zinc-900">
                    {formatARS(res.asignacionTotal, 0)}
                  </dd>
                </div>
              </>
            )}
            {res.antiguedadMeses !== null && (
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Antigüedad al parto</dt>
                <dd className="font-medium text-zinc-900">{Math.max(0, res.antiguedadMeses)} meses</dd>
              </div>
            )}
          </dl>

          <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-600">
            <p className="font-semibold text-zinc-800">No te pueden despedir sin consecuencias</p>
            <p className="mt-1">
              Entre el <strong>{fechaLarga(res.estabilidadDesde)}</strong> y el{" "}
              <strong>{fechaLarga(res.estabilidadHasta)}</strong> se presume que cualquier despido
              es por causa de maternidad (art. 178 LCT), y da derecho a una indemnización especial
              de <strong>un año de remuneraciones</strong> que se <em>suma</em> a la indemnización
              común por despido (art. 182).
            </p>
          </div>

          {res.avisos.length > 0 && (
            <ul className="mt-4 space-y-2">
              {res.avisos.map((a, i) => (
                <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
                  {a.texto}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-xs text-zinc-500">
            Las fechas salen de aplicar el artículo 177 a la fecha que cargaste. La fecha real de
            inicio depende del certificado médico y, si el parto se adelanta o se atrasa, el tramo
            posterior se ajusta para completar los {MATERNIDAD.diasTotal} días.
          </p>
        </div>
      )}
    </div>
  );
}
