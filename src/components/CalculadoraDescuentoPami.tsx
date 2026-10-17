"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { REGIMENES } from "@/data/descuento-pami";
import { bonoVigente, prestacionesVigentes } from "@/data/prestaciones";
import { calcularDescuentoPami } from "@/lib/descuento-pami";
import { formatARS, parseMonto } from "@/lib/formato";

const TONOS = {
  info: "border-zinc-200 bg-zinc-50 text-zinc-700",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  alerta: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraDescuentoPami() {
  const [regimenId, setRegimenId] = useState(REGIMENES[0].id);
  const [haber, setHaber] = useState("");
  const [conBono, setConBono] = useState(false);
  const [conAguinaldo, setConAguinaldo] = useState(false);

  const res = useMemo(
    () =>
      calcularDescuentoPami({
        haber: parseMonto(haber),
        regimenId,
        bono: conBono ? bonoVigente().monto : 0,
        conAguinaldo,
      }),
    [haber, regimenId, conBono, conAguinaldo],
  );

  const aporta = res.regimen.tramos !== null;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="pami-regimen" className="block text-sm font-semibold text-zinc-800">
            Tu prestación
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La alícuota depende de por dónde aportaste, no de cuánto cobrás: el artículo 8 de la Ley
            19.032 le da un inciso propio a cada caso.
          </p>
          <select
            id="pami-regimen"
            value={regimenId}
            onChange={(e) => setRegimenId(e.target.value as typeof regimenId)}
            className={claseInput}
          >
            {REGIMENES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pami-haber" className="block text-sm font-semibold text-zinc-800">
            Tu haber bruto mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            En blanco se usa el haber mínimo garantizado de{" "}
            {formatARS(prestacionesVigentes().haberMinimo, 0)}.
          </p>
          <input
            id="pami-haber"
            inputMode="numeric"
            placeholder="Ej.: 620.000"
            value={haber}
            onChange={(e) => setHaber(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="space-y-3 sm:mt-8">
          <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <input
              id="pami-bono"
              type="checkbox"
              checked={conBono}
              onChange={(e) => setConBono(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <label htmlFor="pami-bono" className="text-sm text-zinc-700">
              <span className="font-semibold text-zinc-800">
                Cobro el bono de {formatARS(bonoVigente().monto, 0)}
              </span>
              <span className="mt-0.5 block text-xs text-zinc-500">
                {bonoVigente().norma}. Es no remunerativo y no sufre descuentos: suma al neto sin
                pasar por el aporte.
              </span>
            </label>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <input
              id="pami-aguinaldo"
              type="checkbox"
              checked={conAguinaldo}
              onChange={(e) => setConAguinaldo(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <label htmlFor="pami-aguinaldo" className="text-sm text-zinc-700">
              <span className="font-semibold text-zinc-800">Es mes de aguinaldo</span>
              <span className="mt-0.5 block text-xs text-zinc-500">
                El artículo dice «incluido el haber complementario»: el aguinaldo también aporta.
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          className={`rounded-xl border p-5 ${
            aporta ? "border-emerald-200 bg-emerald-50/60" : "border-zinc-200 bg-zinc-50"
          }`}
        >
          <p className={`text-sm font-semibold ${aporta ? "text-emerald-900" : "text-zinc-700"}`}>
            Te descuentan del haber
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.aporte, 0)}
          </p>
          <p className={`mt-1 text-sm ${aporta ? "text-emerald-900/80" : "text-zinc-600"}`}>
            {aporta ? (
              <>
                Es el {res.alicuotaEfectiva.toLocaleString("es-AR", { maximumFractionDigits: 2 })}%
                de tu haber de {formatARS(res.haber, 0)}. Esa es la alícuota efectiva: no es ni el 3%
                ni el 6%, salvo en los extremos.
              </>
            ) : (
              <>{res.regimen.resumen}</>
            )}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm font-semibold text-zinc-700">Te queda de bolsillo</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.neto, 0)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {formatARS(res.haber, 0)} menos {formatARS(res.aporte, 0)} de obra social
            {res.bono > 0 ? <> más {formatARS(res.bono, 0)} de bono</> : null}. Es el neto por este
            concepto: puede haber otras retenciones (cuota de mutual, Ganancias, embargos) que la
            norma no fija.
          </p>
        </div>
      </div>

      {aporta ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5 text-zinc-700">
                  Hasta el haber mínimo ({formatARS(res.haberMinimo, 0)})
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                  {formatARS(res.baseBajo, 0)} ×{" "}
                  {(res.regimen.tramos!.hastaMinimo * 100).toLocaleString("es-AR")}%
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-zinc-900">
                  {formatARS(res.tramoBajo, 0)}
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5 text-zinc-700">Sobre el excedente</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                  {formatARS(res.baseAlto, 0)} ×{" "}
                  {(res.regimen.tramos!.excedente * 100).toLocaleString("es-AR")}%
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-zinc-900">
                  {formatARS(res.tramoAlto, 0)}
                </td>
              </tr>
              {res.aporteAguinaldo > 0 ? (
                <tr className="border-b border-zinc-100 bg-amber-50/50">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Aguinaldo (medio haber), se liquida aparte
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                    sobre {formatARS(res.haber / 2, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-zinc-900">
                    {formatARS(res.aporteAguinaldo, 0)}
                  </td>
                </tr>
              ) : null}
              <tr className="bg-zinc-50">
                <td className="px-4 py-2.5 font-semibold text-zinc-800">Aporte del mes</td>
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5 text-right tabular-nums font-bold text-zinc-900">
                  {formatARS(res.aporte, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="mt-4 space-y-2">
        {res.avisos.map((a) => (
          <p key={a.texto} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
            {a.texto}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        El haber mínimo que parte la escala sale de la resolución mensual de ANSES: acá no se
        estima. Quien liquida el descuento es ANSeS, que lo transfiere al Instituto en forma directa
        y automática (art. 9 de la Ley 19.032). Para ver cuánto cobrás este mes con la movilidad y
        el bono, usá la{" "}
        <Link href="/jubilacion" className="text-emerald-700 hover:underline">
          calculadora de jubilación
        </Link>
        .
      </p>
    </div>
  );
}
