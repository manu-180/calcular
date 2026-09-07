"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PREAVISO_DEL_TRABAJADOR_DIAS } from "@/data/renuncia";
import { calcularRenuncia } from "@/lib/renuncia";
import { formatARS, parseMonto } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const claseSelect =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const dias = (n: number) =>
  n.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export function CalculadoraRenuncia() {
  const [sueldo, setSueldo] = useState("1.200.000");
  const [ingreso, setIngreso] = useState("2021-03-15");
  const [egreso, setEgreso] = useState("2026-08-31");
  const [preaviso, setPreaviso] = useState("si");

  const res = useMemo(
    () =>
      calcularRenuncia({
        sueldoMensual: parseMonto(sueldo),
        ingresoISO: ingreso,
        egresoISO: egreso,
        preaviso: preaviso === "si",
      }),
    [sueldo, ingreso, egreso, preaviso],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sueldo" className="block text-sm font-semibold text-zinc-800">
            Sueldo bruto mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El del recibo: básico, adicionales y todo lo remunerativo.
          </p>
          <input
            id="sueldo"
            inputMode="numeric"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="preaviso" className="block text-sm font-semibold text-zinc-800">
            ¿Preavisaste los {PREAVISO_DEL_TRABAJADOR_DIAS} días?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El art. 231 inc. a) se los pide al trabajador que renuncia.
          </p>
          <select
            id="preaviso"
            value={preaviso}
            onChange={(e) => setPreaviso(e.target.value)}
            className={claseSelect}
          >
            <option value="si">Sí, avisé con anticipación</option>
            <option value="no">No, me fui de un día para el otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="ingreso" className="block text-sm font-semibold text-zinc-800">
            Fecha de ingreso
          </label>
          <input
            id="ingreso"
            type="date"
            value={ingreso}
            onChange={(e) => setIngreso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="egreso" className="block text-sm font-semibold text-zinc-800">
            Último día trabajado
          </label>
          <input
            id="egreso"
            type="date"
            value={egreso}
            onChange={(e) => setEgreso(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {!res ? (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 p-5 text-sm text-rose-900">
          Cargá un sueldo mayor que cero y dos fechas válidas (la salida no puede ser anterior al
          ingreso).
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">Tu liquidación final por renuncia, en bruto</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.totalNetoDeDescuento, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            En mano quedan aproximadamente {formatARS(res.enMano, 2)} después del 17% de aportes
            sobre los rubros remunerativos ({formatARS(res.aportes.total, 2)}). No incluye Ganancias:
            depende del acumulado del año.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                  <th className="pb-2 font-semibold">Rubro</th>
                  <th className="pb-2 text-right font-semibold">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Días trabajados del mes ({res.diasDelMes})
                    </span>
                    <span className="block text-xs text-zinc-500">
                      art. 74 · sueldo ÷ 30 = {formatARS(res.valorDia, 2)} por día
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.sueldoDelMes, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">SAC proporcional</span>
                    <span className="block text-xs text-zinc-500">
                      art. 123 · {res.diasTrabajadosSemestre} de {res.diasSemestre} días del
                      semestre
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.sacImporte, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Vacaciones no gozadas ({dias(res.diasVacaciones)} días)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {res.reglaVacaciones === "escala"
                        ? `arts. 150 y 156 · escala por antigüedad, proporcional a la fracción del año`
                        : `art. 153 · un día cada 20 de trabajo efectivo (${res.diasHabilesTrabajadosAnio} hábiles trabajados)`}{" "}
                      · sueldo ÷ 25 = {formatARS(res.valorDiaVacaciones, 2)} por día
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.vacacionesImporte, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">SAC sobre esas vacaciones</span>
                    <span className="block text-xs text-zinc-500">
                      la doceava parte del renglón anterior
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.sacSobreVacaciones, 2)}
                  </td>
                </tr>
                {res.descuentoPreaviso > 0 && (
                  <tr className="border-b border-zinc-200 align-top">
                    <td className="py-2 pr-3">
                      <span className="font-medium text-rose-800">
                        Preaviso omitido ({PREAVISO_DEL_TRABAJADOR_DIAS} días)
                      </span>
                      <span className="block text-xs text-rose-700">
                        arts. 231 inc. a) y 232 · lo puede reclamar el empleador
                      </span>
                    </td>
                    <td className="py-2 text-right font-semibold text-rose-800">
                      −{formatARS(res.descuentoPreaviso, 2)}
                    </td>
                  </tr>
                )}
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-semibold text-zinc-900">Total bruto</span>
                  </td>
                  <td className="py-2 text-right font-bold text-zinc-900">
                    {formatARS(res.totalNetoDeDescuento, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
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
            Orientativo, no una liquidación. Si en cambio te despidieron, la cuenta es otra y está en{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la calculadora de indemnización
            </Link>
            ; el aguinaldo completo, en{" "}
            <Link href="/aguinaldo" className="font-medium text-emerald-700 hover:underline">
              la de aguinaldo
            </Link>
            ; y los días de vacaciones del año, en{" "}
            <Link href="/vacaciones" className="font-medium text-emerald-700 hover:underline">
              la de vacaciones
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
