"use client";

import { useMemo, useState } from "react";
import { calcularART } from "@/lib/riesgos-trabajo";
import { PISOS, TRAMOS, VIGENCIA_ART } from "@/data/riesgos-trabajo";
import { errorCantidad, errorMonto, parseDecimal, parseMonto, primerError } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function pesos(n: number): string {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export function CalculadoraART() {
  const [ingresoBase, setIngresoBase] = useState("1500000");
  const [edad, setEdad] = useState("40");
  const [incapacidad, setIncapacidad] = useState("20");
  const [muerte, setMuerte] = useState(false);
  const [enElTrabajo, setEnElTrabajo] = useState(true);

  const error = primerError({
    "Ingreso base mensual": errorMonto(ingresoBase),
    "Edad": errorCantidad(edad),
    "Porcentaje de incapacidad": errorCantidad(incapacidad),
  });

  const res = useMemo(
    () =>
      calcularART(
        {
          ingresoBase: parseMonto(ingresoBase),
          edad: parseDecimal(edad),
          incapacidad: parseDecimal(incapacidad),
          enElTrabajo,
        },
        muerte,
      ),
    [ingresoBase, edad, incapacidad, enElTrabajo, muerte],
  );

  const tramo = res ? TRAMOS.find((t) => t.id === res.tramo) : null;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="art-ib" className="block text-sm font-semibold text-zinc-800">
            Ingreso base mensual (art. 12)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Promedio de todos los salarios del año anterior a la primera manifestación
            invalidante, <strong>actualizado mes a mes por RIPTE</strong>. No es el último sueldo.
          </p>
          <input
            id="art-ib"
            inputMode="numeric"
            value={ingresoBase}
            onChange={(e) => setIngresoBase(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="art-edad" className="block text-sm font-semibold text-zinc-800">
            Edad a la primera manifestación invalidante
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La del día del accidente o del diagnóstico, no la de hoy.
          </p>
          <input
            id="art-edad"
            type="number"
            min={14}
            max={100}
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="art-inc" className="block text-sm font-semibold text-zinc-800">
            Porcentaje de incapacidad (ILP)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El que determina la comisión médica. En muerte no se usa.
          </p>
          <input
            id="art-inc"
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={incapacidad}
            disabled={muerte}
            onChange={(e) => setIncapacidad(e.target.value)}
            className={`${claseInput} ${muerte ? "opacity-50" : ""}`}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="art-muerte"
            type="checkbox"
            checked={muerte}
            onChange={(e) => setMuerte(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="art-muerte" className="text-sm text-zinc-700">
            El accidente fue <strong>fatal</strong>
            <span className="block text-xs text-zinc-500">
              Art. 18: los derechohabientes cobran la prestación del art. 15 ap. 2, sin porcentaje.
            </span>
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="art-lugar"
            type="checkbox"
            checked={enElTrabajo}
            onChange={(e) => setEnElTrabajo(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="art-lugar" className="text-sm text-zinc-700">
            Ocurrió <strong>en el lugar de trabajo</strong> o a disposición del empleador
            <span className="block text-xs text-zinc-500">
              Desmarcalo si fue <em>in itinere</em>: ahí no corre el 20% del art. 3 de la Ley
              26.773.
            </span>
          </label>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res === null ? (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Revisá los datos: el ingreso base tiene que ser mayor a cero y la edad, de 14 a 100. Si
          no es un accidente fatal, la incapacidad va de 0 a 100.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-emerald-50 px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-900">
              Total a cobrar
            </p>
            <p className="text-3xl font-bold text-emerald-950" style={{ fontVariantNumeric: "tabular-nums" }}>
              {pesos(res.total)}
            </p>
            {tramo && (
              <p className="mt-1 text-sm text-emerald-900">
                {tramo.titulo} — {tramo.norma}
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="px-4 py-2.5 text-zinc-600">
                    Fórmula: 53 × ingreso base × {res.coeficienteEdad.toFixed(4)} (65 ÷ {edad})
                    {res.tramo === "parcial" || res.tramo === "parcial-grave"
                      ? ` × ${incapacidad}%`
                      : ""}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                    {pesos(res.formula)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-600">
                    Piso legal (Res. SRT vigente)
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                    {pesos(res.piso)}
                  </td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-2.5 font-semibold text-zinc-900">
                    Indemnización que rige (la mayor de las dos)
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pesos(res.indemnizacion)}
                  </td>
                </tr>
                {res.compensacion > 0 && (
                  <tr>
                    <td className="px-4 py-2.5 text-zinc-600">
                      Compensación adicional de pago único (art. 11 ap. 4)
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      + {pesos(res.compensacion)}
                    </td>
                  </tr>
                )}
                {res.adicional20 > 0 && (
                  <tr>
                    <td className="px-4 py-2.5 text-zinc-600">
                      Adicional del 20% (art. 3, Ley 26.773)
                      {(res.tramo === "muerte" || res.tramo === "total") && (
                        <span className="block text-xs text-zinc-500">
                          Con piso propio de {pesos(PISOS.adicional20)} en muerte e incapacidad
                          total.
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      + {pesos(res.adicional20)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {res.mandaElPiso && (
            <div
              className="rounded-xl px-4 py-3"
              style={{ backgroundColor: "#FEF3C7", border: "1px solid #E8CE8A" }}
            >
              <p className="text-sm" style={{ color: "#7A5B12" }}>
                <strong>En este caso manda el piso, no la fórmula.</strong> La fórmula del art. 14
                da {pesos(res.formula)} y el piso de la resolución vigente es {pesos(res.piso)}: se
                cobra el piso. Justo en este caso, la web que copia el texto de la ley (que todavía
                dice «en ningún caso será <em>superior</em> a $180.000») publica lo contrario de lo
                que rige.
              </p>
            </div>
          )}

          <p className="text-xs text-zinc-500">
            Valores de la {VIGENCIA_ART.resolucion} ({VIGENCIA_ART.boletin}), vigentes del{" "}
            {VIGENCIA_ART.desde} al {VIGENCIA_ART.hasta}. Si la ART no pone la plata a
            disposición en plazo, el art. 12 ap. 3 suma intereses a la tasa activa del Banco
            Nación, que esta calculadora no incluye.
          </p>
        </div>
      )}
    </div>
  );
}
