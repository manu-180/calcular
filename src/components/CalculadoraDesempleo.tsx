"use client";

import { useMemo, useState } from "react";
import { calcularDesempleo, etiquetaMes, DIAS_POR_CUOTA } from "@/lib/desempleo";
import { REGLAS_DESEMPLEO as R } from "@/data/desempleo";
import { formatARS, formatPct, parseMonto, errorMonto, primerError } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

/** Opciones de antigüedad: los cuatro tramos del art. 117 más el que deja afuera. */
const TRAMOS_APORTES = [
  { valor: 3, label: "Menos de 6 meses" },
  { valor: 8, label: "Entre 6 y 11 meses" },
  { valor: 18, label: "Entre 1 y 2 años" },
  { valor: 30, label: "Entre 2 y 3 años" },
  { valor: 40, label: "3 años o más" },
];

function parseEntero(v: string): number {
  const n = Number(v.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function CalculadoraDesempleo() {
  const [netoInput, setNetoInput] = useState("");
  const [mesesCotizados, setMesesCotizados] = useState(40);
  const [edadInput, setEdadInput] = useState("");
  const [diasInput, setDiasInput] = useState("");

  const neto = useMemo(() => parseMonto(netoInput), [netoInput]);
  const edad = useMemo(() => parseEntero(edadInput), [edadInput]);
  const diasDesdeCese = useMemo(() => parseEntero(diasInput), [diasInput]);

  const res = useMemo(
    () =>
      calcularDesempleo({
        mejorRemuneracionNeta: neto,
        mesesCotizados,
        edad,
        diasDesdeCese,
      }),
    [neto, mesesCotizados, edad, diasDesdeCese],
  );

  const mostrar = netoInput.trim() !== "";
  const primera = res.cuotas[0];

  const error = primerError({
    "Sueldo neto": errorMonto(netoInput),
  });

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="neto" className="block text-sm font-semibold text-zinc-800">
            ¿Cuál fue tu mejor sueldo <em>neto</em> de los últimos 6 meses?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El neto, no el bruto: lo que efectivamente cobrabas por mes, sin contar horas extras ni
            aguinaldo (tiene que ser una remuneración normal y habitual).
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="neto"
              inputMode="numeric"
              placeholder="Ej: 850.000"
              value={netoInput}
              onChange={(e) => setNetoInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="aportes" className="block text-sm font-semibold text-zinc-800">
            ¿Cuánto tiempo trabajaste con aportes?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sumando todos los empleos registrados de los últimos 3 años.
          </p>
          <select
            id="aportes"
            value={mesesCotizados}
            onChange={(e) => setMesesCotizados(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {TRAMOS_APORTES.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="edad" className="block text-sm font-semibold text-zinc-800">
            ¿Qué edad tenés?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            De 45 años en adelante te corresponden {R.extension45.cuotasExtra} cuotas más.
          </p>
          <input
            id="edad"
            inputMode="numeric"
            placeholder="Ej: 38"
            value={edadInput}
            onChange={(e) => setEdadInput(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 py-2.5 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dias" className="block text-sm font-semibold text-zinc-800">
            ¿Cuántos días pasaron desde que terminó tu trabajo? <span className="font-normal text-zinc-400">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Tenés {R.diasParaSolicitar} días para pedirla. Cada día que te pasás de ese plazo se te
            descuenta del total del período (art. 115, Ley 24.013). Si ya la pediste o estás en
            fecha, dejalo vacío.
          </p>
          <input
            id="dias"
            inputMode="numeric"
            placeholder="Ej: 45"
            value={diasInput}
            onChange={(e) => setDiasInput(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 py-2.5 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : mostrar && (
        <div className="mt-6 space-y-5 border-t border-zinc-100 pt-5" aria-live="polite">
          {!res.elegible ? (
            <div className="rounded-xl bg-amber-50 p-4 text-amber-900">
              <p className="font-semibold">No te correspondería la prestación</p>
              <p className="mt-1 text-sm">{res.motivo}</p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm text-zinc-500">
                  El primer mes cobrás (valores de {etiquetaMes(res.smvm.periodo)})
                </p>
                <p className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                  {formatARS(primera.monto, 0)}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {res.cuotas.length} cuota{res.cuotas.length === 1 ? "" : "s"} en total ·{" "}
                  <strong className="text-zinc-700">{formatARS(res.total, 0)}</strong> a cobrar en
                  todo el período
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
                <p>
                  La prestación arranca en el <strong>{formatPct(R.porcentajeBase * 100, 0)}</strong> de{" "}
                  {formatARS(neto, 0)} = {formatARS(res.base, 0)}
                  {res.topeInicial === "techo" && (
                    <>
                      , pero el <strong>techo</strong> la baja a {formatARS(res.techo, 0)}: ninguna
                      cuota puede superar el salario mínimo vigente.
                    </>
                  )}
                  {res.topeInicial === "piso" && (
                    <>
                      , pero el <strong>piso</strong> la sube a {formatARS(res.piso, 0)}: ninguna
                      cuota puede ser menor a la mitad del salario mínimo vigente.
                    </>
                  )}
                  {res.topeInicial === null && ", que queda entre el piso y el techo del mes."}
                </p>
                {res.cuotasExtension > 0 && (
                  <p className="mt-2">
                    Por tener 45 años o más sumás {res.cuotasExtension} cuotas extra al{" "}
                    {formatPct(R.extension45.porcentaje * 100, 0)} (Decreto 267/2006).
                  </p>
                )}
                {res.diasDescontados > 0 && (
                  <p className="mt-2 font-medium text-amber-900">
                    Presentarla {res.diasDescontados} días fuera de plazo te cuesta{" "}
                    {formatARS(res.totalSinDemora - res.total, 0)}: en fecha habrías cobrado{" "}
                    {formatARS(res.totalSinDemora, 0)}.
                  </p>
                )}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-zinc-800">
                  Cuánto cobrás mes a mes
                </h3>
                <div className="overflow-hidden rounded-xl border border-zinc-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-zinc-50 text-left text-zinc-700">
                          <th className="px-3 py-2 font-semibold">Cuota</th>
                          <th className="px-3 py-2 text-right font-semibold">% de la original</th>
                          <th className="px-3 py-2 text-right font-semibold">Importe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {res.cuotas.map((c) => (
                          <tr key={c.numero} className="border-t border-zinc-100">
                            <td className="px-3 py-2 text-zinc-600">
                              Mes {c.numero}
                              {c.tramo === "extension45" && (
                                <span className="ml-1.5 rounded bg-sky-100 px-1.5 py-0.5 text-[11px] font-medium text-sky-800">
                                  extensión 45+
                                </span>
                              )}
                              {c.dias < DIAS_POR_CUOTA && (
                                <span className="ml-1.5 rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-800">
                                  {c.dias} días
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2 text-right text-zinc-600">
                              {formatPct(c.porcentaje * 100, 0)}
                              {c.topeAplicado === "piso" && (
                                <span className="block text-[11px] text-zinc-400">
                                  elevada al piso
                                </span>
                              )}
                              {c.topeAplicado === "techo" && (
                                <span className="block text-[11px] text-zinc-400">
                                  bajada al techo
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2 text-right font-semibold text-zinc-900">
                              {formatARS(c.monto, 0)}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-zinc-200 bg-zinc-50">
                          <td className="px-3 py-2 font-semibold text-zinc-800" colSpan={2}>
                            Total del período
                          </td>
                          <td className="px-3 py-2 text-right font-bold text-zinc-900">
                            {formatARS(res.total, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  El escalonamiento del art. 118 de la Ley 24.013 baja la prestación al 85% entre
                  los meses 5 y 8, y al 70% entre el 9 y el 12. Los topes de {formatARS(res.piso, 0)}{" "}
                  y {formatARS(res.techo, 0)} son el 50% y el 100% del salario mínimo de{" "}
                  {etiquetaMes(res.smvm.periodo)} ({formatARS(res.smvm.mensual, 0)}) y se aplican a
                  cada cuota, no sólo a la primera.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
