"use client";

import { useMemo, useState } from "react";
import {
  actualizarHaber,
  calcularBono,
  etiquetaPeriodo,
  proximoMesDeterminado,
  sumarMeses,
} from "@/lib/jubilacion";
import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO } from "@/data/jubilaciones";
import { bonoVigente, prestacionesVigentes } from "@/data/prestaciones";
import { formatARS, formatPct, parseMonto, errorMonto, primerError } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";


/** Meses que se pueden elegir como "desde cuándo" (todos menos el vigente). */
const MESES_DESDE = HABER_MINIMO_SERIE.slice(0, -1).map((m) => m.periodo).reverse();

export function CalculadoraJubilacion() {
  const V = prestacionesVigentes();
  const [haberInput, setHaberInput] = useState(String(V.haberMinimo).replace(".", ","));
  const [desde, setDesde] = useState("");

  const haber = useMemo(() => parseMonto(haberInput), [haberInput]);

  const bono = useMemo(
    () => (haberInput.trim() === "" ? null : calcularBono(haber, V.haberMinimo, bonoVigente().monto)),
    [haber, haberInput],
  );

  const proximo = useMemo(() => proximoMesDeterminado(), []);

  const historia = useMemo(
    () => (desde === "" || bono === null ? null : actualizarHaber(haber, desde, V.periodo)),
    [desde, haber, bono],
  );

  const error = primerError({
    "Haber": errorMonto(haberInput),
  });

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="haber" className="block text-sm font-semibold text-zinc-800">
            ¿Cuánto es tu haber de {V.vigencia}?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El haber bruto del mes, antes de descuentos (PAMI, obra social, cuotas). Si cobrás la
            mínima, dejalo como está.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              $
            </span>
            <input
              id="haber"
              inputMode="numeric"
              placeholder="Ej: 419.775,93"
              value={haberInput}
              onChange={(e) => setHaberInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setHaberInput(String(V.haberMinimo).replace(".", ","))}
              className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:border-emerald-300 hover:text-emerald-700"
            >
              Cobro la mínima
            </button>
            <button
              type="button"
              onClick={() => setHaberInput(String(V.puam).replace(".", ","))}
              className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:border-emerald-300 hover:text-emerald-700"
            >
              Cobro la PUAM
            </button>
            <button
              type="button"
              onClick={() => setHaberInput(String(V.haberMaximo).replace(".", ","))}
              className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:border-emerald-300 hover:text-emerald-700"
            >
              Cobro la máxima
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : bono && (
        <div className="mt-6 space-y-4 border-t border-zinc-100 pt-5" aria-live="polite">
          <div>
            <p className="text-sm text-zinc-500">Cobrás en {V.vigencia}</p>
            <p className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              {formatARS(bono.total, 0)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {formatARS(haber, 0)} de haber
              {bono.bono > 0 ? ` + ${formatARS(bono.bono, 0)} de bono` : " · sin bono"}
            </p>
          </div>

          <div
            className={`rounded-xl p-4 ${
              bono.tramo === "completo"
                ? "bg-emerald-50 text-emerald-900"
                : bono.tramo === "parcial"
                  ? "bg-amber-50 text-amber-900"
                  : "bg-zinc-50 text-zinc-800"
            }`}
          >
            {bono.tramo === "completo" && (
              <>
                <p className="font-semibold">Te corresponde el bono completo</p>
                <p className="mt-1 text-sm">
                  Tu haber no supera el mínimo garantizado ({formatARS(V.haberMinimo, 0)}), así que
                  cobrás los {formatARS(bonoVigente().monto, 0)} enteros.
                </p>
              </>
            )}
            {bono.tramo === "parcial" && (
              <>
                <p className="font-semibold">Te corresponde un bono parcial</p>
                <p className="mt-1 text-sm">
                  Esto es lo que casi nadie cuenta: cobrar por encima de la mínima{" "}
                  <strong>no</strong> significa cobrar los {formatARS(bonoVigente().monto, 0)}{" "}
                  completos. El bono se recorta hasta llegar al tope de{" "}
                  <strong>{formatARS(bono.tope, 0)}</strong> (mínima + bono). Por eso todos los
                  haberes entre {formatARS(V.haberMinimo, 0)} y {formatARS(bono.tope, 0)} terminan
                  cobrando exactamente lo mismo.
                </p>
              </>
            )}
            {bono.tramo === "sin-bono" && (
              <>
                <p className="font-semibold">No te corresponde bono</p>
                <p className="mt-1 text-sm">
                  Tu haber ya supera el tope de {formatARS(bono.tope, 0)} (la mínima de{" "}
                  {formatARS(V.haberMinimo, 0)} más los {formatARS(bonoVigente().monto, 0)} del
                  bono), que es hasta donde llega el refuerzo.
                </p>
              </>
            )}
          </div>

          <div className="rounded-xl border border-zinc-200 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Tu haber del mes que viene ({etiquetaPeriodo(sumarMeses(V.periodo, 1))})
            </p>
            {proximo ? (
              <>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {formatARS(Math.round(haber * (1 + proximo.movilidad / 100) * 100) / 100, 0)}
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Ya está determinado: la movilidad de {etiquetaPeriodo(proximo.periodo)} es{" "}
                  <strong>{formatPct(proximo.movilidad)}</strong>, la variación del IPC de{" "}
                  {etiquetaPeriodo(proximo.ipcDe)} que el INDEC ya publicó. No es un pronóstico
                  nuestro: es la cuenta que manda el Decreto 274/2024. ANSES lo va a oficializar por
                  resolución a fin de mes.
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-zinc-600">
                Todavía no se puede saber: la movilidad de{" "}
                {etiquetaPeriodo(sumarMeses(V.periodo, 1))} es la variación del IPC de{" "}
                {etiquetaPeriodo(sumarMeses(V.periodo, -1))}, que el INDEC publica alrededor del día
                12. Apenas salga, este número aparece acá, semanas antes de que ANSES dicte la
                resolución.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="desde" className="block text-sm font-semibold text-zinc-800">
              ¿Desde qué mes cobrás ese haber?{" "}
              <span className="font-normal text-zinc-500">(opcional)</span>
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Sirve para ver cuánto se movió tu haber desde entonces y si le ganó o le perdió a la
              inflación.
            </p>
            <select
              id="desde"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="">Elegí un mes</option>
              {MESES_DESDE.map((p) => (
                <option key={p} value={p}>
                  {etiquetaPeriodo(p)}
                </option>
              ))}
            </select>
          </div>

          {historia && (
            <div className="rounded-xl bg-zinc-50 p-4 text-sm">
              <p className="text-zinc-700">
                Un haber de <strong>{formatARS(historia.haberInicial, 0)}</strong> en{" "}
                {etiquetaPeriodo(historia.desde)} es hoy{" "}
                <strong className="text-zinc-900">{formatARS(historia.haberFinal, 0)}</strong>: se
                multiplicó por{" "}
                <strong>{historia.coeficiente.toFixed(3).replace(".", ",")}</strong> en{" "}
                {historia.pasos.length} meses de movilidad.
              </p>
              {historia.inflacionAcumulada !== null && historia.brechaReal !== null && (
                <p className="mt-2 text-zinc-700">
                  En el mismo tramo la inflación acumuló{" "}
                  <strong>{formatPct(historia.inflacionAcumulada, 1)}</strong>, así que el haber{" "}
                  {historia.brechaReal >= 0 ? (
                    <strong className="text-emerald-700">
                      le ganó por {formatPct(historia.brechaReal, 1)}
                    </strong>
                  ) : (
                    <strong className="text-rose-700">
                      perdió {formatPct(Math.abs(historia.brechaReal), 1)} de poder de compra
                    </strong>
                  )}
                  .
                </p>
              )}
              {historia.inflacionAcumulada === null && (
                <p className="mt-2 text-zinc-500">
                  La comparación contra la inflación aparece cuando el INDEC publique el IPC de{" "}
                  {etiquetaPeriodo(V.periodo)}.
                </p>
              )}
            </div>
          )}

          <p className="text-xs text-zinc-400">
            Es una referencia sobre valores oficiales, no una liquidación. Lo que llega a tu cuenta
            puede diferir por descuentos (PAMI, obra social, cuotas, embargos), por prestaciones de
            cajas provinciales o regímenes especiales, y por topes propios de cada beneficio. El
            bono es no remunerativo y se cuenta por titular: una pensión con varios copartícipes
            cuenta como uno solo. Ante cualquier duda sobre tu caso, la fuente es ANSES.
          </p>
        </div>
      )}

      {!bono && (
        <p className="mt-5 text-sm text-zinc-500">
          Escribí tu haber para ver cuánto cobrás. El haber mínimo de {V.vigencia} es{" "}
          {formatARS(HABER_MINIMO_ULTIMO.haberMinimo, 0)}.
        </p>
      )}
    </div>
  );
}
