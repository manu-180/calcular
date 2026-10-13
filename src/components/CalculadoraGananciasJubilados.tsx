"use client";

import { useMemo, useState } from "react";
import { REGIMENES } from "@/data/descuento-pami";
import { calcularGananciasJubilados } from "@/lib/ganancias-jubilados";
import { formatARS, parseMonto, errorMonto, primerError, CANTIDAD_MAXIMA } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";


const MOTIVOS = {
  "otros-ingresos":
    "Tus otros ingresos superan la ganancia no imponible anual: la ley te saca la deducción de ocho haberes mínimos y volvés al mínimo no imponible más la deducción especial.",
  "bienes-personales":
    "Estás obligado a pagar Bienes Personales por algo más que tu vivienda única: la ley te saca la deducción de ocho haberes mínimos y volvés al mínimo no imponible más la deducción especial.",
  "no-supera":
    "Este año los ocho haberes mínimos no superan al mínimo no imponible más la deducción especial, así que se usa lo más alto.",
} as const;

export function CalculadoraGananciasJubilados() {
  const [haber, setHaber] = useState("3500000");
  const [regimen, setRegimen] = useState("dependencia");
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState("0");
  const [otrosIngresos, setOtrosIngresos] = useState(false);
  const [bienesPersonales, setBienesPersonales] = useState(false);

  const error = primerError({
    "Haber bruto mensual": errorMonto(haber),
    "Hijos a cargo": errorMonto(hijos, CANTIDAD_MAXIMA),
  });

  const res = useMemo(
    () =>
      calcularGananciasJubilados({
        haberBruto: parseMonto(haber),
        regimenPamiId: regimen,
        conyuge,
        hijos: parseMonto(hijos),
        otrosIngresos,
        bienesPersonales,
      }),
    [haber, regimen, conyuge, hijos, otrosIngresos, bienesPersonales],
  );

  const regimenesConAporte = REGIMENES.filter((r) => r.tramos !== null);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="haber" className="block text-sm font-semibold text-zinc-800">
            Tu haber bruto mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">El de tu recibo, antes de descuentos y sin el bono.</p>
          <input
            id="haber"
            inputMode="numeric"
            value={haber}
            onChange={(e) => setHaber(e.target.value)}
            className={claseInput}
          />
        </div>
        <div>
          <label htmlFor="regimen" className="block text-sm font-semibold text-zinc-800">
            Tu jubilación o pensión
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Define el descuento de obra social, que se resta.</p>
          <select
            id="regimen"
            value={regimen}
            onChange={(e) => setRegimen(e.target.value)}
            className={claseInput}
          >
            {regimenesConAporte.map((r) => (
              <option key={r.id} value={r.id}>
                {r.etiqueta}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-sm font-semibold text-zinc-800">Cónyuge a cargo</span>
            <label className="mt-4 flex items-center gap-2 text-sm text-zinc-700">
              <input type="checkbox" checked={conyuge} onChange={(e) => setConyuge(e.target.checked)} />
              Sí
            </label>
          </div>
          <div>
            <label htmlFor="hijos" className="block text-sm font-semibold text-zinc-800">
              Hijos a cargo
            </label>
            <input
              id="hijos"
              inputMode="numeric"
              value={hijos}
              onChange={(e) => setHijos(e.target.value)}
              className={claseInput}
            />
          </div>
        </div>
        <div className="space-y-2 text-sm text-zinc-700">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={otrosIngresos}
              onChange={(e) => setOtrosIngresos(e.target.checked)}
            />
            <span>Tengo otros ingresos gravados (alquileres, honorarios, un trabajo) por más de la ganancia no imponible del año</span>
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={bienesPersonales}
              onChange={(e) => setBienesPersonales(e.target.checked)}
            />
            <span>Pago Bienes Personales por algo más que mi vivienda única</span>
          </label>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 space-y-4 border-t border-zinc-100 pt-5">
          <div
            className={`rounded-xl p-4 ${res.pagaGanancias ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}
          >
            <p className="text-lg font-bold">
              {res.pagaGanancias
                ? `Pagás Ganancias: unos ${formatARS(res.retencionMensual, 0)} por mes`
                : "No pagás Ganancias con ese haber"}
            </p>
            <p className="mt-1 text-sm">
              Empezarías a pagar con un haber bruto de <strong>{formatARS(res.umbralHaber, 0)}</strong> por mes (
              {res.umbralEnHaberesMinimos.toLocaleString("es-AR", { maximumFractionDigits: 1 })} haberes mínimos de hoy).
            </p>
          </div>

          {!res.aplicaEspecifica && res.motivoSinEspecifica && (
            <p className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 text-sm text-rose-900">
              {MOTIVOS[res.motivoSinEspecifica]}
            </p>
          )}

          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 text-zinc-700">13 haberes del año (12 + aguinaldo)</td>
                  <td className="px-3 py-2 text-right text-zinc-900">{formatARS(res.brutoAnual, 0)}</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 text-zinc-700">− Aporte a PAMI (Ley 19.032), sobre los 13</td>
                  <td className="px-3 py-2 text-right text-zinc-900">{formatARS(res.obraSocialAnual, 0)}</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 text-zinc-700">
                    {res.aplicaEspecifica
                      ? "− Deducción específica (8 × los haberes mínimos del año)"
                      : "− No imponible + deducción especial (art. 30 inc. a y c)"}
                  </td>
                  <td className="px-3 py-2 text-right text-zinc-900">{formatARS(res.deduccionBase, 0)}</td>
                </tr>
                {res.doceava > 0 && (
                  <tr className="border-b border-zinc-100">
                    <td className="px-3 py-2 text-zinc-700">− Doceava parte (por el aguinaldo)</td>
                    <td className="px-3 py-2 text-right text-zinc-900">{formatARS(res.doceava, 0)}</td>
                  </tr>
                )}
                {res.cargasFamilia > 0 && (
                  <tr className="border-b border-zinc-100">
                    <td className="px-3 py-2 text-zinc-700">− Cargas de familia (se suman igual)</td>
                    <td className="px-3 py-2 text-right text-zinc-900">{formatARS(res.cargasFamilia, 0)}</td>
                  </tr>
                )}
                <tr className="bg-zinc-50">
                  <td className="px-3 py-2 font-semibold text-zinc-800">Ganancia sujeta a impuesto</td>
                  <td className="px-3 py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.gananciaNetaImponible, 0)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold text-zinc-800">Impuesto del año</td>
                  <td className="px-3 py-2 text-right font-semibold text-zinc-900">{formatARS(res.impuestoAnual, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            Estimación anual con la escala y las deducciones vigentes. Los meses que ANSES todavía no fijó se completan
            con el último haber mínimo: como sube todos los meses, la deducción real va a ser algo mayor y el impuesto
            algo menor. La retención mes a mes la hace ANSES (o tu caja) con el método acumulado.
          </p>
        </div>
        </>
      )}
    </div>
  );
}
