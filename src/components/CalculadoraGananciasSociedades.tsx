"use client";

import { useMemo, useState } from "react";
import { ALICUOTA_DIVIDENDOS, ULTIMO_ANIO_ESCALA, escalaDe, escalasDisponibles } from "@/data/ganancias-sociedades";
import { calcularGananciasSociedades } from "@/lib/ganancias-sociedades";
import { formatARS, parseMonto, errorMonto, primerError } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";
import { OfertaPlanilla } from "@/components/OfertaPlanilla";
import { previaSociedades } from "@/components/ganancias-sociedades/previa";
import { ANIOS_DE_VIDA, PRIMER_INICIO_ACTUALIZABLE } from "@/data/quebrantos";
import type { DatosOferta } from "@/lib/oferta";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pct = (n: number, d = 2) => `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: d })}%`;

const ANIOS = escalasDisponibles()
  .map((e) => e.anio)
  .reverse();

const DISTRIBUCIONES = [
  { valor: "0", label: "Nada: queda en la sociedad" },
  { valor: "0.5", label: "La mitad" },
  { valor: "1", label: "Todo" },
];

export function CalculadoraGananciasSociedades({ oferta }: { oferta?: DatosOferta }) {
  const [ganancia, setGanancia] = useState("500000000");
  const [anio, setAnio] = useState(String(ULTIMO_ANIO_ESCALA));
  const [distribuido, setDistribuido] = useState("0");

  const error = primerError({
    "Ganancia neta imponible": errorMonto(ganancia),
  });

  const res = useMemo(
    () =>
      calcularGananciasSociedades({
        gananciaNetaImponible: parseMonto(ganancia),
        anioInicioEjercicio: Number(anio),
        porcentajeDistribuido: Number(distribuido),
      }),
    [ganancia, anio, distribuido],
  );

  // La previa de la planilla con SU caso. El mes de cierre es diciembre: es el cierre más común y
  // el único que no obliga a suponer un dato que la calculadora no pregunta (con diciembre el
  // ejercicio empieza y cierra el mismo año, así que no se muestra ninguna comparación de tablas).
  const previa = useMemo(
    () =>
      oferta && !error
        ? previaSociedades(oferta.archivo, {
            gananciaNetaImponible: parseMonto(ganancia),
            anioInicioEjercicio: Number(anio),
            porcentajeDistribuido: Number(distribuido),
            mesCierre: 12,
          })
        : null,
    [oferta, error, ganancia, anio, distribuido],
  );

  // Lo que le costaría a ESTA sociedad equivocarse de tabla, si su ejercicio cerrara antes de
  // diciembre. Sólo existe cuando la escala del año siguiente ya está publicada.
  const conTablaSiguiente = useMemo(() => {
    const siguiente = Number(anio) + 1;
    if (error || !escalaDe(siguiente)) return null;
    const equivocada = calcularGananciasSociedades({
      gananciaNetaImponible: parseMonto(ganancia),
      anioInicioEjercicio: siguiente,
      porcentajeDistribuido: 0,
    });
    if (!equivocada || !res) return null;
    const diferencia = Math.round((res.impuesto - equivocada.impuesto) * 100) / 100;
    return diferencia > 0 ? { siguiente, diferencia } : null;
  }, [error, anio, ganancia, res]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="ganancia" className="block text-sm font-semibold text-zinc-800">
            Ganancia neta imponible del ejercicio
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La del balance impositivo, después de ajustes y quebrantos. En pesos, sin puntos.
          </p>
          <input
            id="ganancia"
            inputMode="numeric"
            value={ganancia}
            onChange={(e) => setGanancia(e.target.value)}
            className={claseInput}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="anio" className="block text-sm font-semibold text-zinc-800">
            Año en que empezó el ejercicio
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">No el del cierre.</p>
          <select id="anio" value={anio} onChange={(e) => setAnio(e.target.value)} className={claseInput}>
            {ANIOS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="distribuido" className="block text-sm font-semibold text-zinc-800">
            ¿Cuánto se reparte como dividendos a socios personas humanas?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Sobre lo que queda después del impuesto.</p>
          <select
            id="distribuido"
            value={distribuido}
            onChange={(e) => setDistribuido(e.target.value)}
            className={claseInput}
          >
            {DISTRIBUCIONES.map((d) => (
              <option key={d.valor} value={d.valor}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res && (
        <div className="mt-6 space-y-4 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-emerald-800">Impuesto determinado</p>
              <p className="text-xl font-bold text-emerald-800">{formatARS(res.impuesto, 2)}</p>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-xs text-zinc-500">Alícuota efectiva</p>
              <p className="text-xl font-bold text-zinc-900">{pct(res.alicuotaEfectiva)}</p>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-xs text-zinc-500">Cada peso extra paga</p>
              <p className="text-xl font-bold text-zinc-900">{pct(res.alicuotaMarginal, 0)}</p>
            </div>
          </div>

          <p className="text-sm text-zinc-600">
            Escala de los ejercicios iniciados en <strong>{res.escala.anio}</strong>: tramo del{" "}
            {pct(res.tramo.alicuota, 0)}. Pagás {formatARS(res.tramo.fijo, 2)} de fijo más el{" "}
            {pct(res.tramo.alicuota, 0)} de lo que supera {formatARS(res.tramo.desde, 2)}. A ese monto se le restan
            los anticipos, retenciones y percepciones del período.
          </p>

          {res.dividendos > 0 && (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-xs text-zinc-500">Dividendos repartidos</p>
                <p className="text-lg font-bold text-zinc-900">{formatARS(res.dividendos, 0)}</p>
              </div>
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-xs text-zinc-500">Retención del {pct(ALICUOTA_DIVIDENDOS, 0)}</p>
                <p className="text-lg font-bold text-zinc-900">{formatARS(res.retencionDividendos, 0)}</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-800">Carga total sobre la ganancia</p>
                <p className="text-lg font-bold text-emerald-800">{pct(res.cargaTotalEfectiva)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {oferta && previa && res && (
        <div className="mt-7">
          <OfertaPlanilla
            producto={oferta}
            desde="cta-ganancias-sociedades"
            hoja={previa.hoja}
            titulo="Toda la liquidación de la sociedad en Excel"
            bajada={
              <>
                Así se ve tu caso adentro de la planilla, con{" "}
                <strong className="font-semibold text-zinc-800">{formatARS(parseMonto(ganancia), 0)}</strong> y el
                ejercicio iniciado en <strong className="font-semibold text-zinc-800">{anio}</strong>. Cargás el mes
                de cierre y ella sola elige la tabla que te toca, suma los quebrantos actualizados y te deja el
                impuesto determinado para el balance.
              </>
            }
            incluye={[
              {
                titulo:
                  conTablaSiguiente !== null
                    ? `Si cerrás antes de diciembre, son ${formatARS(conTablaSiguiente.diferencia, 0)} de diferencia`
                    : "La tabla la elige el año de inicio, no el de cierre",
                texto:
                  conTablaSiguiente !== null
                    ? `Cargando el mes de cierre, la planilla deduce el año de inicio y elige la escala correcta. Con tu ganancia, usar la de ${conTablaSiguiente.siguiente} en vez de la de ${anio} declararía ${formatARS(conTablaSiguiente.diferencia, 0)} de menos. La planilla te muestra las dos cuentas lado a lado.`
                    : "Cargás el mes y el año de cierre y la planilla deduce el año de inicio del ejercicio, que es el que manda. Te muestra el impuesto con la tabla correcta y con la equivocada, lado a lado.",
              },
              {
                titulo: "Los quebrantos, actualizados por IPC",
                texto: `Hasta seis quebrantos de ejercicios anteriores con la serie oficial del INDEC embebida. Aplica las dos condiciones del art. 25 (que el ejercicio se haya iniciado desde el 1/1/${PRIMER_INICIO_ACTUALIZABLE.slice(0, 4)} y que no hayan pasado los ${ANIOS_DE_VIDA} años) y te dice en cada fila por qué.`,
              },
              {
                titulo: "Al día cuando sale la escala nueva",
                texto: `Las ${ANIOS.length} escalas publicadas, con los dos límites, los importes fijos y de dónde sale cada una. Cuando el INDEC publica el IPC de octubre y queda definida la del año que viene, te llega al mismo enlace sin pagar de nuevo.`,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
