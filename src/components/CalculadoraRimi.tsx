"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BIENES,
  ETIQUETAS_CATEGORIA,
  MONTOS_MINIMOS,
  type CategoriaPyme,
  type TipoBien,
} from "@/data/rimi";
import { calcularRimi } from "@/lib/rimi";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const usd = (n: number) =>
  `USD ${n.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;

export function CalculadoraRimi() {
  const [categoria, setCategoria] = useState<CategoriaPyme>("micro");
  const [tipoBien, setTipoBien] = useState<TipoBien>("mueble");
  const [monto, setMonto] = useState("250000");
  const [vidaUtil, setVidaUtil] = useState("10");

  const res = useMemo(
    () =>
      calcularRimi({
        categoria,
        tipoBien,
        montoUsd: Number(monto) || 0,
        vidaUtilAnios: Number(vidaUtil) || 0,
      }),
    [categoria, tipoBien, monto, vidaUtil],
  );

  const bien = BIENES.find((b) => b.id === tipoBien);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="categoria" className="block text-sm font-semibold text-zinc-800">
            Categoría MiPyME
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La del art. 2° de la Ley 24.467. Decide el piso del art. 181.
          </p>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as CategoriaPyme)}
            className={claseInput}
          >
            {(Object.keys(ETIQUETAS_CATEGORIA) as CategoriaPyme[]).map((c) => (
              <option key={c} value={c}>
                {ETIQUETAS_CATEGORIA[c]} (mínimo {usd(MONTOS_MINIMOS[c])})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tipoBien" className="block text-sm font-semibold text-zinc-800">
            Tipo de bien
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Define en cuántas cuotas se amortiza y si se aplica el piso.
          </p>
          <select
            id="tipoBien"
            value={tipoBien}
            onChange={(e) => setTipoBien(e.target.value as TipoBien)}
            className={claseInput}
          >
            {BIENES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="monto" className="block text-sm font-semibold text-zinc-800">
            Monto de la inversión (USD)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            En dólares: el art. 181 fija los mínimos en esa moneda y no dice con qué tipo de cambio
            se miden.
          </p>
          <input
            id="monto"
            inputMode="numeric"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="vidaUtil" className="block text-sm font-semibold text-zinc-800">
            Vida útil estimada (años)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La del régimen general de Ganancias. Para obras es la que define las cuotas aceleradas.
          </p>
          <input
            id="vidaUtil"
            inputMode="numeric"
            value={vidaUtil}
            onChange={(e) => setVidaUtil(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {bien && (
        <p className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
          <strong className="text-zinc-800">{bien.etiqueta}</strong> · {bien.inciso} —{" "}
          {bien.detalle}
        </p>
      )}

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Cargá un monto y una vida útil mayores que cero.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            {res.califica ? "La inversión califica" : "La inversión no llega al mínimo"}
          </p>
          <p
            className={`mt-1 text-3xl font-bold tracking-tight ${
              res.califica ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {res.califica ? "Entra al RIMI" : `Faltan ${usd(res.faltaParaElMinimo)}`}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.exentoDelMinimo
              ? "Sin monto mínimo: el artículo 180 exceptúa a este bien del piso del artículo 181."
              : `El piso de tu categoría es ${usd(res.montoMinimo)}.`}
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left align-bottom">
                  <th className="py-2 pr-3 font-medium text-zinc-600">Concepto</th>
                  <th className="py-2 pl-3 text-right font-medium text-zinc-600">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Amortización acelerada ({res.inciso})
                    </span>
                    <span className="block text-xs text-zinc-500">
                      cuotas anuales, iguales y consecutivas
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {res.cuotasAceleradas} cuota(s)
                    <span className="block text-xs font-normal text-zinc-500">
                      {usd(res.cuotaAcelerada)} por año
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Régimen general, para comparar</span>
                    <span className="block text-xs text-zinc-500">
                      la vida útil que declaraste, sin el beneficio
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {res.cuotasGenerales} cuota(s)
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">
                    Años que se adelanta la deducción completa
                  </td>
                  <td className="py-2 pl-3 text-right text-base font-bold text-zinc-900">
                    {res.aniosQueAdelanta}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Devolución del crédito fiscal de IVA (art. 183)
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    a partir del período {res.periodosIva + 1}
                    <span className="block text-xs font-normal text-zinc-500">
                      tras {res.periodosIva} períodos fiscales mensuales
                    </span>
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Permanencia mínima del bien (art. 186)
                    </span>
                  </td>
                  <td className="py-2 pl-3 text-right text-zinc-700">
                    {res.aniosPermanencia} años fiscales
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Por qué acá no hay un número de ahorro
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              El beneficio de la amortización acelerada es de <strong>timing</strong>: deducís antes
              lo mismo, no más. Cuánto vale ese adelanto depende de tu alícuota de Ganancias y de tu
              tasa de descuento, y ninguna de las dos está en la ley. Lo que sí es aritmética
              verificable es el cronograma de cuotas, y es lo que muestra la tabla.
            </p>
          </div>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-zinc-500">
            ¿Sos monotributista y no sociedad? Mirá{" "}
            <Link href="/monotributo" className="font-medium text-emerald-700 hover:underline">
              las escalas del monotributo
            </Link>
            . El RIMI alcanza a los sujetos del art. 53 de la Ley de Ganancias, no al monotributo.
          </p>
        </div>
      )}
    </div>
  );
}
