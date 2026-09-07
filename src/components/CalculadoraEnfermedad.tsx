"use client";

import { useMemo, useState } from "react";
import { PLAZOS_ART_208, RECIDIVA_ANIOS } from "@/data/enfermedad";
import { calcularEnfermedad } from "@/lib/enfermedad";
import { fechaLarga } from "@/lib/licencias";
import { formatARS, parseMonto } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

export function CalculadoraEnfermedad() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [cargasDeFamilia, setCargasDeFamilia] = useState(false);
  const [huboRecaida, setHuboRecaida] = useState(false);
  const [diasUsadosInput, setDiasUsadosInput] = useState("");
  const [brutoInput, setBrutoInput] = useState("");

  const bruto = useMemo(() => parseMonto(brutoInput), [brutoInput]);
  const diasUsados = useMemo(
    () => (huboRecaida ? Math.max(0, Number(diasUsadosInput) || 0) : 0),
    [huboRecaida, diasUsadosInput],
  );

  const res = useMemo(
    () =>
      fechaInicio && fechaIngreso
        ? calcularEnfermedad({
            fechaInicio,
            fechaIngreso,
            cargasDeFamilia,
            diasYaUsados: diasUsados,
            brutoMensual: bruto,
          })
        : null,
    [fechaInicio, fechaIngreso, cargasDeFamilia, diasUsados, bruto],
  );

  const faltaIngreso = Boolean(fechaInicio && fechaIngreso && !res);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="inicio" className="block text-sm font-semibold text-zinc-800">
            ¿Qué día empezó la licencia?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El primer día que no pudiste ir a trabajar, según el certificado.
          </p>
          <input
            id="inicio"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="ingreso" className="block text-sm font-semibold text-zinc-800">
            ¿Cuándo entraste a trabajar?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            De acá sale la antigüedad: el corte del artículo 208 está en los{" "}
            {PLAZOS_ART_208.corteAntiguedadAnios} años.
          </p>
          <input
            id="ingreso"
            type="date"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <input
              type="checkbox"
              checked={cargasDeFamilia}
              onChange={(e) => setCargasDeFamilia(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-600"
            />
            <span className="text-sm text-zinc-700">
              <strong className="text-zinc-900">Tengo cargas de familia</strong> (cónyuge o hijos a
              cargo).{" "}
              <span className="text-zinc-500">
                Duplica el plazo: {PLAZOS_ART_208.sinCargas.hasta5} y{" "}
                {PLAZOS_ART_208.sinCargas.mas5} meses pasan a {PLAZOS_ART_208.conCargas.hasta5} y{" "}
                {PLAZOS_ART_208.conCargas.mas5}.
              </span>
            </span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <input
              type="checkbox"
              checked={huboRecaida}
              onChange={(e) => setHuboRecaida(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-600"
            />
            <span className="text-sm text-zinc-700">
              <strong className="text-zinc-900">
                Ya falté por esta misma enfermedad en los últimos {RECIDIVA_ANIOS} años
              </strong>
              .{" "}
              <span className="text-zinc-500">
                Esos días consumen el mismo plazo, no abren uno nuevo.
              </span>
            </span>
          </label>
          {huboRecaida && (
            <div className="mt-3">
              <label htmlFor="dias-usados" className="block text-sm font-semibold text-zinc-800">
                ¿Cuántos días usaste por esa misma dolencia?
              </label>
              <input
                id="dias-usados"
                inputMode="numeric"
                placeholder="Ej: 45"
                value={diasUsadosInput}
                onChange={(e) => setDiasUsadosInput(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:w-48"
              />
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="bruto-enf" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál es tu sueldo bruto mensual?{" "}
            <span className="font-normal text-zinc-400">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Para estimar cuánto suma el tramo pago. Durante la licencia el sueldo lo paga el
            empleador, no ANSES.
          </p>
          <div className="relative mt-2 sm:w-72">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="bruto-enf"
              inputMode="numeric"
              placeholder="Ej: 1.200.000"
              value={brutoInput}
              onChange={(e) => setBrutoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>
      </div>

      {faltaIngreso && (
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-sm text-amber-900">
          La fecha de ingreso tiene que ser anterior al inicio de la licencia. Revisá las dos fechas.
        </p>
      )}

      {res && (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Te corresponden</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {res.mesesPlazo} meses de licencia paga
          </p>
          {res.fin ? (
            <p className="mt-1 text-sm text-zinc-600">
              Cobrás sueldo hasta el <strong>{fechaLarga(res.fin)}</strong> inclusive
              {res.diasConsumidos > 0 ? ` (te quedaban ${res.diasDisponibles} días)` : ""}.
            </p>
          ) : (
            <p className="mt-1 text-sm text-rose-700">
              El plazo pago ya está agotado por la misma dolencia: desde el inicio declarado la
              licencia sigue sin goce de sueldo.
            </p>
          )}

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Antigüedad al enfermarte</dt>
              <dd className="font-medium text-zinc-900">
                {res.antiguedadAnios} año{res.antiguedadAnios === 1 ? "" : "s"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Plazo del art. 208</dt>
              <dd className="font-medium text-zinc-900">{res.plazoDias} días corridos</dd>
            </div>
            {res.diasConsumidos > 0 && (
              <>
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Ya usados por lo mismo</dt>
                  <dd className="font-medium text-rose-700">−{res.diasConsumidos} días</dd>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Te quedan</dt>
                  <dd className="font-semibold text-zinc-900">{res.diasDisponibles} días</dd>
                </div>
              </>
            )}
            {bruto > 0 && res.diasDisponibles > 0 && (
              <div className="flex justify-between border-b border-zinc-200 pb-1.5 sm:col-span-2">
                <dt className="text-zinc-600">Suma del tramo pago que te queda</dt>
                <dd className="font-semibold text-zinc-900">{formatARS(res.totalPago, 0)}</dd>
              </div>
            )}
          </dl>

          <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-600">
            <p className="font-semibold text-zinc-800">
              Después del sueldo no viene el despido: viene un año de puesto guardado
            </p>
            <p className="mt-1">
              Del <strong>{fechaLarga(res.conservacionDesde)}</strong> al{" "}
              <strong>{fechaLarga(res.conservacionHasta)}</strong> corre la conservación del empleo
              del artículo 211: no cobrás sueldo, pero el empleador tiene que guardarte el puesto.
              Recién vencido ese año cualquiera de las partes puede notificar que rescinde, y esa
              extinción no genera indemnización.
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
            Las fechas salen de aplicar los artículos 208 y 211 de la LCT a los datos que cargaste.
            El plazo se mide en meses de calendario desde el día de inicio, por eso los días corridos
            cambian según el mes en que empiece la licencia.
          </p>
        </div>
      )}
    </div>
  );
}
