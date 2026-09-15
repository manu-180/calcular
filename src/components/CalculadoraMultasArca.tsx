"use client";

import { useMemo, useState } from "react";
import { CLAUSURA, INFRACCIONES } from "@/data/multas-arca";
import { calcularMulta, diasClausura, habilitaClausura, type Sujeto } from "@/lib/multas-arca";
import { formatARS, parseMonto } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const claseCheck =
  "mt-0.5 size-4 shrink-0 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-400";

function Rango({ minimo, maximo }: { minimo: number; maximo: number }) {
  if (minimo === maximo) return <>{formatARS(minimo, 0)}</>;
  return (
    <>
      {formatARS(minimo, 0)} <span className="text-zinc-400">a</span> {formatARS(maximo, 0)}
    </>
  );
}

export function CalculadoraMultasArca() {
  const [infraccionId, setInfraccionId] = useState(INFRACCIONES[0].id);
  const [sujeto, setSujeto] = useState<Sujeto>("persona");
  const [reduce, setReduce] = useState(false);
  const [valorOperacion, setValorOperacion] = useState("");
  const [reincidente, setReincidente] = useState(false);

  const res = useMemo(
    () => calcularMulta({ infraccionId, sujeto, aplicaReduccion: reduce }),
    [infraccionId, sujeto, reduce],
  );

  const valor = parseMonto(valorOperacion);
  const clausura = habilitaClausura(valor);
  const dias = diasClausura(reincidente);
  const tieneReduccion = res.infraccion.reducciones.length > 0;
  const esFija = res.infraccion.fijo !== undefined;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5">
        <div>
          <label htmlFor="multa-infraccion" className="block text-sm font-semibold text-zinc-800">
            ¿Qué pasó?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Cada supuesto tiene su propio artículo y su propio monto. No hay una «multa de ARCA»:
            hay una escala.
          </p>
          <select
            id="multa-infraccion"
            value={infraccionId}
            onChange={(e) => {
              setInfraccionId(e.target.value);
              setReduce(false);
            }}
            className={claseInput}
          >
            {INFRACCIONES.map((i) => (
              <option key={i.id} value={i.id}>
                {i.etiqueta}
              </option>
            ))}
          </select>
        </div>

        {esFija ? (
          <fieldset>
            <legend className="text-sm font-semibold text-zinc-800">¿Quién es el obligado?</legend>
            <p className="mt-0.5 text-xs text-zinc-500">
              El monto se duplica para sociedades, asociaciones y entidades constituidas en el país,
              y para establecimientos estables de titulares del exterior.
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ["persona", "Persona humana"],
                  ["sociedad", "Sociedad o entidad"],
                ] as const
              ).map(([valorId, etiqueta]) => (
                <label
                  key={valorId}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${
                    sujeto === valorId
                      ? "border-emerald-400 bg-emerald-50/70 font-semibold text-zinc-900"
                      : "border-zinc-300 text-zinc-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="multa-sujeto"
                    value={valorId}
                    checked={sujeto === valorId}
                    onChange={() => setSujeto(valorId)}
                    className="size-4 text-emerald-600 focus:ring-emerald-400"
                  />
                  {etiqueta}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {tieneReduccion ? (
          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50/60 p-3">
            <input
              type="checkbox"
              checked={reduce}
              onChange={(e) => setReduce(e.target.checked)}
              className={claseCheck}
            />
            <span className="text-sm text-zinc-700">
              <span className="font-semibold text-zinc-900">
                {res.infraccion.reducciones[0].etiqueta}
              </span>{" "}
              — {res.infraccion.reducciones[0].condicion}.
              <span className="mt-0.5 block text-xs text-zinc-500">
                {res.infraccion.reducciones[0].norma}
              </span>
            </span>
          </label>
        ) : null}

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {res.reduccion ? "Con la reducción aplicada" : "Sanción prevista"}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-zinc-900">
            {res.montoReducido !== null ? (
              formatARS(res.montoReducido, 0)
            ) : res.rangoReducido ? (
              <Rango minimo={res.rangoReducido.minimo} maximo={res.rangoReducido.maximo} />
            ) : null}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {res.infraccion.articulo} de la Ley 11.683
            {res.infraccion.sinRequerimientoPrevio
              ? " — se aplica sin requerimiento previo"
              : null}
            .
          </p>

          {res.reduccion ? (
            <p className="mt-2 text-sm text-emerald-800">
              Sin la reducción serían{" "}
              <strong className="tabular-nums">
                {res.monto !== null ? (
                  formatARS(res.monto, 0)
                ) : res.rango ? (
                  <Rango minimo={res.rango.minimo} maximo={res.rango.maximo} />
                ) : null}
              </strong>
              {res.ahorro > 0 ? (
                <>
                  {" "}
                  — la diferencia es de hasta{" "}
                  <strong className="tabular-nums">{formatARS(res.ahorro, 0)}</strong>
                </>
              ) : null}
              .
            </p>
          ) : null}

          {res.anterior !== null && res.multiplicador !== null ? (
            <p className="mt-3 border-t border-emerald-200/70 pt-3 text-sm text-zinc-600">
              Antes de la Ley 27.799 este importe era de{" "}
              <strong className="tabular-nums text-zinc-900">{formatARS(res.anterior, 0)}</strong>:
              se multiplicó por{" "}
              <strong className="tabular-nums text-zinc-900">
                {res.multiplicador.toLocaleString("es-AR", { maximumFractionDigits: 1 })}
              </strong>
              . Sustituido por el {res.infraccion.sustituidoPor}.
            </p>
          ) : null}
        </div>

        <p className="text-sm text-zinc-600">{res.infraccion.nota}</p>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm font-semibold text-zinc-900">
            ¿La conducta habilita además la clausura del art. 40?
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sólo si el valor de los bienes o servicios de la operación <strong>excede</strong> el
            piso del acápite. Es el cambio que menos se publica: ese piso era de{" "}
            {formatARS(CLAUSURA.pisoAnterior, 0)} y hoy es de{" "}
            {formatARS(CLAUSURA.pisoValorOperacion, 0)}.
          </p>
          <label htmlFor="multa-valor" className="mt-3 block text-sm font-semibold text-zinc-800">
            Valor de la operación
          </label>
          <input
            id="multa-valor"
            inputMode="numeric"
            value={valorOperacion}
            onChange={(e) => setValorOperacion(e.target.value)}
            placeholder="Por ejemplo, 45.000"
            className={claseInput}
          />
          <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={reincidente}
              onChange={(e) => setReincidente(e.target.checked)}
              className={claseCheck}
            />
            <span>
              Hubo otra infracción del art. 40 dentro de los últimos {CLAUSURA.aniosReincidencia}{" "}
              años
            </span>
          </label>

          <div
            className={`mt-3 rounded-lg border px-3 py-2.5 text-sm ${
              valor === 0
                ? "border-zinc-200 bg-zinc-50 text-zinc-600"
                : clausura
                  ? "border-rose-200 bg-rose-50/70 text-rose-900"
                  : "border-emerald-200 bg-emerald-50/70 text-emerald-900"
            }`}
          >
            {valor === 0 ? (
              <>Cargá el valor de la operación para ver si el piso del art. 40 queda superado.</>
            ) : clausura ? (
              <>
                <strong>
                  Supera el piso: la conducta puede sancionarse con clausura de {dias.minimo} a{" "}
                  {dias.maximo} días
                </strong>
                {reincidente ? " (mínimo y máximo duplicados por el último párrafo del art. 40)" : ""}
                , además de la multa.
              </>
            ) : (
              <>
                <strong>No supera el piso de {formatARS(CLAUSURA.pisoValorOperacion, 0)}</strong>:
                la clausura del art. 40 no queda habilitada por esta operación. La conducta puede
                seguir siendo una infracción a los deberes formales del art. 39.
              </>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Los montos son los de la Ley 11.683 con la redacción vigente. Dentro de cada rango, ARCA
        gradúa «conforme a la condición del contribuyente y a la gravedad de la infracción»: esta
        página muestra el rango que fija la ley, no predice el monto que va a aplicar el organismo.
      </p>
    </div>
  );
}
