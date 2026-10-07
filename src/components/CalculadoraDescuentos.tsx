"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SMVM_SERIE } from "@/data/desempleo";
import { smvmVigente } from "@/lib/desempleo";
import {
  TOPE_CAMARAS_EMPRESARIAS,
  TOPE_CUOTA_SOLIDARIA,
  TOPE_GENERAL,
} from "@/data/descuentos-sueldo";
import { calcularDescuentos } from "@/lib/descuentos-sueldo";
import { formatARS, parseMonto } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pct = (n: number) =>
  `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}%`;

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const etiquetaPeriodo = (periodo: string) => {
  const [anio, mes] = periodo.split("-");
  return `${MESES[Number(mes) - 1]} de ${anio}`;
};

const PERIODOS = [...SMVM_SERIE].reverse();

// El mes que arranca seleccionado es el VIGENTE, no el último de la escala: desde la Res. 4/2026
// el SMVM está fijado hasta abril de 2027 y "el último" es un mes que todavía no llegó.
const PERIODO_VIGENTE = smvmVigente().mes.periodo;

export function CalculadoraDescuentos() {
  const [bruto, setBruto] = useState("1.200.000");
  const [periodo, setPeriodo] = useState(PERIODO_VIGENTE);

  const res = useMemo(
    () => calcularDescuentos({ bruto: parseMonto(bruto), periodo }),
    [bruto, periodo],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bruto" className="block text-sm font-semibold text-zinc-800">
            Tu remuneración mensual bruta, en dinero
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El total del recibo antes de descuentos. El Decreto 484/87 manda usar el importe bruto,
            no el neto de bolsillo.
          </p>
          <input
            id="bruto"
            inputMode="numeric"
            value={bruto}
            onChange={(e) => setBruto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="periodo" className="block text-sm font-semibold text-zinc-800">
            Mes del recibo
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Decide qué salario mínimo se usa para el embargo. No afecta al tope del 20%.
          </p>
          <select
            id="periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className={claseInput}
          >
            {PERIODOS.map((m) => (
              <option key={m.periodo} value={m.periodo}>
                {etiquetaPeriodo(m.periodo)}: SMVM {formatARS(m.mensual, 0)}
                {m.periodo > PERIODO_VIGENTE ? " (ya fijado)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">
            Tope de descuentos del empleador ({pct(TOPE_GENERAL)})
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.topeGeneral, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Art. 133 de la LCT: la deducción, retención o compensación «no podrá insumir en conjunto
            más del veinte por ciento (20%) del monto total de la remuneración en dinero».
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">
            {res.embargo.tramo === 0
              ? "Embargable por orden judicial"
              : `Embargable por orden judicial (${pct(res.embargo.porcentaje)})`}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.embargo.maximoSobreExcedente, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.embargo.tramo === 0 ? (
              <>
                Tu sueldo no supera el salario mínimo de {etiquetaPeriodo(res.smvmPeriodo)} (
                {formatARS(res.smvm, 0)}): es inembargable por completo.
              </>
            ) : (
              <>
                {pct(res.embargo.porcentaje)} de {formatARS(res.embargo.excedente, 2)}, que es lo que
                excede el salario mínimo de {etiquetaPeriodo(res.smvmPeriodo)} (
                {formatARS(res.smvm, 0)}), inembargable por el art. 1º del Decreto 484/87.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[34rem] text-sm">
          <tbody>
            <tr className="border-b border-zinc-200 align-top">
              <td className="py-2 pr-3">
                <span className="font-medium text-zinc-800">
                  Aportes de ley ({pct(res.aportesDeLey.total / (res.bruto || 1))})
                </span>
                <span className="block text-xs text-zinc-500">
                  jubilación {formatARS(res.aportesDeLey.jubilacion, 2)} · PAMI{" "}
                  {formatARS(res.aportesDeLey.pami, 2)} · obra social{" "}
                  {formatARS(res.aportesDeLey.obraSocial, 2)}. Art. 132 inc. b): no necesitan tu
                  consentimiento.
                </span>
              </td>
              <td className="py-2 text-right font-semibold text-zinc-900">
                {formatARS(res.aportesDeLey.total, 2)}
              </td>
            </tr>
            <tr className="border-b border-zinc-200 align-top">
              <td className="py-2 pr-3">
                <span className="font-medium text-zinc-800">
                  Tope de la cuota solidaria ({pct(TOPE_CUOTA_SOLIDARIA)})
                </span>
                <span className="block text-xs text-zinc-500">
                  Aportes de convenio a favor del sindicato válidos también para no afiliados. Este
                  techo <strong>no existía</strong> antes del 6 de marzo de 2026: lo puso el art. 133
                  de la Ley 27.802 al reescribir el art. 9º de la Ley 14.250.
                </span>
              </td>
              <td className="py-2 text-right font-semibold text-zinc-900">
                {formatARS(res.topeCuotaSolidaria, 2)}
              </td>
            </tr>
            <tr className="border-b border-zinc-200 align-top">
              <td className="py-2 pr-3">
                <span className="font-medium text-zinc-800">
                  Tope de aportes a cámaras empresarias ({pct(TOPE_CAMARAS_EMPRESARIAS)})
                </span>
                <span className="block text-xs text-zinc-500">
                  Del mismo artículo. No sale de tu recibo, pero es el otro número que la reforma
                  puso por primera vez.
                </span>
              </td>
              <td className="py-2 text-right font-semibold text-zinc-900">
                {formatARS(res.topeCamaras, 2)}
              </td>
            </tr>
            <tr className="border-b border-zinc-200 align-top">
              <td className="py-2 pr-3">
                <span className="font-medium text-zinc-800">
                  Margen que queda del 20% después de los aportes de ley
                </span>
                <span className="block text-xs text-zinc-500">
                  Leído al pie de la letra, el art. 133 no excluye del tope a los aportes del art.
                  132 inc. b). Si es negativo, cualquier descuento adicional ya excede el 20%.
                </span>
              </td>
              <td
                className={`py-2 text-right font-semibold ${
                  res.margenSobreTope < 0 ? "text-rose-700" : "text-zinc-900"
                }`}
              >
                {formatARS(res.margenSobreTope, 2)}
              </td>
            </tr>
            {res.embargo.maximoSobreTotal !== null ? (
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">
                    Embargo: la otra lectura del inciso 2
                  </span>
                  <span className="block text-xs text-zinc-500">
                    El inciso 2 del art. 1º dice sólo «hasta el veinte por ciento (20%)» y, a
                    diferencia del inciso 1, no repite sobre qué base. Leído como 20% del total, da
                    este número. La lectura habitual es la de arriba (sobre el excedente).
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {formatARS(res.embargo.maximoSobreTotal, 2)}
                </td>
              </tr>
            ) : null}
            <tr className="align-top">
              <td className="py-2 pr-3">
                <span className="font-medium text-zinc-800">
                  Si el embargo cae sobre la liquidación final ({pct(res.embargoIndemnizacion.porcentaje)})
                </span>
                <span className="block text-xs text-zinc-500">
                  Art. 3º del Decreto 484/87: sobre las indemnizaciones el porcentaje se aplica al
                  importe entero, no al excedente, y se toman todos los conceptos de la extinción en
                  conjunto.
                </span>
              </td>
              <td className="py-2 text-right font-semibold text-zinc-900">
                {formatARS(res.embargoIndemnizacion.maximo, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 space-y-2">
        {res.avisos.map((a) => (
          <p key={a.texto} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
            {a.texto}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        El neto aproximado después de los aportes de ley, sin contar Ganancias ni descuentos de
        convenio, es {formatARS(res.netoAproximado, 2)}. Para la cuenta completa con el impuesto,
        usá{" "}
        <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
          la calculadora de sueldo neto
        </Link>
        .
      </p>
    </div>
  );
}
