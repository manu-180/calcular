"use client";

import { useMemo, useState } from "react";
import { calcularVacaciones } from "@/lib/vacaciones";
import { formatARS, parseMonto } from "@/lib/formato";
import { ANIO_VACACIONES } from "@/data/vacaciones";

function textoAntiguedad(antiguedad: { anios: number; meses: number }): string {
  const partes: string[] = [];
  if (antiguedad.anios > 0)
    partes.push(`${antiguedad.anios} ${antiguedad.anios === 1 ? "año" : "años"}`);
  if (antiguedad.meses > 0)
    partes.push(`${antiguedad.meses} ${antiguedad.meses === 1 ? "mes" : "meses"}`);
  return partes.length ? partes.join(" y ") : "menos de un mes";
}

export function CalculadoraVacaciones() {
  const [sueldoInput, setSueldoInput] = useState("");
  const [ingresoISO, setIngresoISO] = useState("");
  const [tomaParcial, setTomaParcial] = useState(false);
  const [diasParcialesInput, setDiasParcialesInput] = useState("");

  const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);
  const diasParciales = Number(diasParcialesInput);

  const ingresoFuturo = ingresoISO > `${ANIO_VACACIONES}-12-31`;

  const resultado = useMemo(
    () =>
      sueldo > 0 && ingresoISO && !ingresoFuturo
        ? calcularVacaciones({
            sueldo,
            ingresoISO,
            diasATomar:
              tomaParcial && Number.isFinite(diasParciales) && diasParciales > 0
                ? Math.floor(diasParciales)
                : undefined,
          })
        : null,
    [sueldo, ingresoISO, ingresoFuturo, tomaParcial, diasParciales]
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="sueldo-mensual" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál es tu sueldo bruto mensual?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El sueldo que percibís al momento de tomarte las vacaciones, en bruto (antes de
            descuentos), incluyendo adicionales habituales.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="sueldo-mensual"
              inputMode="numeric"
              placeholder="Ej: 1.500.000"
              value={sueldoInput}
              onChange={(e) => setSueldoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="fecha-ingreso" className="block text-sm font-semibold text-zinc-800">
            ¿Cuándo entraste a este trabajo?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La antigüedad se mide al 31 de diciembre de {ANIO_VACACIONES} y define cuántos días te
            corresponden.
          </p>
          <input
            id="fecha-ingreso"
            type="date"
            value={ingresoISO}
            onChange={(e) => setIngresoISO(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={tomaParcial}
            onChange={(e) => setTomaParcial(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Me tomo solo una parte
            <span className="block text-xs text-zinc-500">
              Desde 2026 podés fraccionar las vacaciones en tramos de al menos 7 días, de común
              acuerdo con tu empleador.
            </span>
          </span>
        </label>

        {tomaParcial && (
          <div>
            <label htmlFor="dias-a-tomar" className="block text-sm font-semibold text-zinc-800">
              ¿Cuántos días te tomás?
            </label>
            <input
              id="dias-a-tomar"
              type="number"
              min={1}
              inputMode="numeric"
              placeholder="Ej: 7"
              value={diasParcialesInput}
              onChange={(e) => setDiasParcialesInput(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
            />
          </div>
        )}
      </div>

      {ingresoFuturo && (
        <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">La fecha de ingreso es posterior a {ANIO_VACACIONES}</p>
          <p className="mt-1">
            Esta calculadora estima las vacaciones que corresponden por el año{" "}
            {ANIO_VACACIONES}. Revisá la fecha de ingreso.
          </p>
        </div>
      )}

      {resultado && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          {resultado.dias === 0 ? (
            <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold">Todavía no llegás a un día completo de vacaciones</p>
              <p className="mt-1">
                Como entraste hace poco, te corresponde 1 día de descanso por cada 20 días de
                trabajo efectivo (art. 153 LCT). Con
                {" "}{resultado.diasHabilesTrabajados ?? 0} días hábiles estimados hasta el 31/12,
                aún no se completa el primer día. Sumás el primero a los 20 días de trabajo.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Te corresponden</p>
                  <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                    {resultado.dias} días corridos
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Antigüedad al 31/12/{ANIO_VACACIONES}: {textoAntiguedad(resultado.antiguedad)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-500">
                    Cobrás por {resultado.diasTomados === resultado.dias ? "esos" : "los"}{" "}
                    {resultado.diasTomados} días
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                    {formatARS(resultado.retribucion, 0)}
                  </p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">
                    +{formatARS(resultado.plus, 0)} de plus vacacional
                  </p>
                </div>
              </div>

              {resultado.modo === "proporcional" && (
                <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                  Como entraste durante {ANIO_VACACIONES} y no llegás a medio año trabajado, te
                  corresponde 1 día de descanso por cada 20 de trabajo efectivo (art. 153 LCT):
                  estimamos {resultado.diasHabilesTrabajados} días hábiles hasta el 31/12 →{" "}
                  {resultado.dias} {resultado.dias === 1 ? "día" : "días"} de vacaciones.
                </p>
              )}

              <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Valor del día de vacaciones (sueldo ÷ 25)</dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.valorDiaVacaciones)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Valor del día trabajado (sueldo ÷ 30)</dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.valorDiaNormal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Días que cobrás</dt>
                  <dd className="font-medium text-zinc-900">{resultado.diasTomados}</dd>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                  <dt className="font-semibold text-zinc-800">Retribución bruta</dt>
                  <dd className="font-semibold text-zinc-900">
                    {formatARS(resultado.retribucion)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Plus vacacional incluido</dt>
                  <dd className="font-medium text-emerald-700">+{formatARS(resultado.plus)}</dd>
                </div>
              </dl>

              <p className="text-xs text-zinc-400">
                La retribución de las vacaciones se paga antes de que empieces a gozarlas (art.
                155 LCT) y es bruta: tiene los mismos descuentos que un sueldo normal. El cálculo
                aplica a trabajos con sueldo mensual; con remuneraciones variables se usa el
                promedio (art. 155 inc. c).
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
