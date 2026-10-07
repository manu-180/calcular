import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, datasetSchema } from "@/lib/schema";
import { INFLACION_FUENTES } from "@/data/inflacion";
import {
  actualizarMonto,
  aniosDisponibles,
  inflacionAcumuladaAnio,
  nombreMes,
  nombrePeriodo,
  periodoDe,
  tablaAnio,
  ULTIMO_PERIODO,
} from "@/lib/inflacion";
import { formatARS, formatPct } from "@/lib/formato";

export const dynamicParams = false;

export function generateStaticParams() {
  return aniosDisponibles().map((anio) => ({ anio: String(anio) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ anio: string }>;
}): Promise<Metadata> {
  const { anio: anioStr } = await params;
  const anio = Number(anioStr);
  const r = inflacionAcumuladaAnio(anio);
  if (!r) return {};
  const pct = formatPct(r.pct, 1);
  return {
    title: r.completa
      ? `Inflación ${anio} en Argentina: ${pct} anual, mes a mes`
      : `Inflación ${anio}: ${pct} acumulada hasta ${nombreMes(r.hastaPeriodo)}`,
    description: r.completa
      ? `La inflación de ${anio} según el IPC del INDEC, con la tabla mes a mes (mensual, acumulada e interanual) y cuánto vale hoy esa plata.`
      : `La inflación de ${anio} según el IPC del INDEC: ${pct} acumulada hasta ${nombreMes(r.hastaPeriodo)}. Tabla mes a mes que se actualiza con cada dato nuevo.`,
    alternates: { canonical: `/inflacion/${anio}` },
  };
}

export default async function InflacionAnioPage({
  params,
}: {
  params: Promise<{ anio: string }>;
}) {
  const { anio: anioStr } = await params;
  const anio = Number(anioStr);
  const acumulada = inflacionAcumuladaAnio(anio);
  const filas = tablaAnio(anio);
  if (!acumulada || filas.length === 0) notFound();

  const anios = aniosDisponibles();
  const anterior = anios.includes(anio - 1) ? anio - 1 : null;
  const siguiente = anios.includes(anio + 1) ? anio + 1 : null;

  const conMensual = filas.filter((f) => f.mensualPct !== null);
  const maxMes = conMensual.reduce((a, b) => (b.mensualPct! > a.mensualPct! ? b : a));
  const minMes = conMensual.reduce((a, b) => (b.mensualPct! < a.mensualPct! ? b : a));
  const promedioMensualPct =
    (Math.pow(1 + acumulada.pct / 100, 1 / conMensual.length) - 1) * 100;

  const mil = actualizarMonto(1000, periodoDe(anio, 1), ULTIMO_PERIODO);

  const faqs = [
    {
      q: `¿Cuánto fue la inflación en ${anio}?`,
      a: acumulada.completa
        ? `La inflación de ${anio} fue del ${formatPct(acumulada.pct, 1)} anual, medida por el IPC Nacional del INDEC (diciembre de ${anio - 1} a diciembre de ${anio}).`
        : `${anio} acumula ${formatPct(acumulada.pct, 1)} de inflación hasta ${nombreMes(acumulada.hastaPeriodo)}, según el IPC Nacional del INDEC. El dato anual se completa con el IPC de diciembre.`,
    },
    {
      q: `¿Cuál fue el mes de mayor inflación de ${anio}?`,
      a: `${capitalizar(nombreMes(maxMes.periodo))}, con ${formatPct(maxMes.mensualPct!, 1)} mensual. El de menor inflación fue ${nombreMes(minMes.periodo)}, con ${formatPct(minMes.mensualPct!, 1)}.`,
    },
    {
      q: `¿Cuánto valen hoy $1.000 de ${anio}?`,
      a: mil
        ? `$1.000 de enero de ${anio} equivalen a ${formatARS(mil.montoActualizado, 0)} de ${nombrePeriodo(ULTIMO_PERIODO)} (los precios se multiplicaron por ${mil.factor.toLocaleString("es-AR", { maximumFractionDigits: 1 })}). Podés actualizar cualquier monto con nuestra calculadora de inflación.`
        : "Usá nuestra calculadora de inflación para actualizar cualquier monto entre dos fechas.",
    },
    {
      q: "¿De dónde salen estos datos?",
      a: "De la serie oficial del IPC Nacional nivel general (base diciembre 2016 = 100) que publica el INDEC en la API de series de tiempo del Estado argentino. No usamos estimaciones privadas ni de consultoras.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      datasetSchema({
        nombre: `Inflación mensual de ${anio} en Argentina (IPC INDEC)`,
        descripcion: acumulada.completa
          ? `Variación mensual, acumulada e interanual del IPC Nacional del INDEC para cada mes de ${anio}. La inflación anual de ${anio} fue del ${formatPct(acumulada.pct, 1)}.`
          : `Variación mensual, acumulada e interanual del IPC Nacional del INDEC para ${anio}, actualizada con cada publicación. Acumulada hasta ${nombreMes(acumulada.hastaPeriodo)}: ${formatPct(acumulada.pct, 1)}.`,
        url: `/inflacion/${anio}`,
        modificado: `${ULTIMO_PERIODO}-15`,
        fuenteNombre: INFLACION_FUENTES.ipc.nombre,
        fuenteUrl: INFLACION_FUENTES.ipc.url,
      }),
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-sm font-medium text-emerald-700">
          <Link href="/inflacion" className="hover:underline">
            Inflación
          </Link>{" "}
          · {anio}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Inflación {anio} en Argentina:{" "}
          {acumulada.completa
            ? `${formatPct(acumulada.pct, 1)} anual`
            : `${formatPct(acumulada.pct, 1)} acumulada hasta ${nombreMes(acumulada.hastaPeriodo)}`}
        </h1>
        <p className="text-zinc-600">
          {acumulada.completa ? (
            <>
              En {anio} los precios subieron <strong>{formatPct(acumulada.pct, 1)}</strong> según
              el IPC Nacional del INDEC, un promedio del {formatPct(promedioMensualPct, 1)}{" "}
              mensual. El mes más alto fue {nombreMes(maxMes.periodo)} (
              {formatPct(maxMes.mensualPct!, 1)}) y el más bajo, {nombreMes(minMes.periodo)} (
              {formatPct(minMes.mensualPct!, 1)}).
            </>
          ) : (
            <>
              En lo que va de {anio} los precios acumulan{" "}
              <strong>{formatPct(acumulada.pct, 1)}</strong> de suba según el IPC Nacional del
              INDEC, con un promedio del {formatPct(promedioMensualPct, 1)} mensual. Esta página
              se actualiza con cada publicación del INDEC.
            </>
          )}
        </p>
      </header>

      <RespuestaPrimero actualizado={INFLACION_FUENTES.consultadoEl}>
        <p>
          {acumulada.completa ? (
            <>
              La inflación de {anio} en Argentina fue del{" "}
              <strong>{formatPct(acumulada.pct, 1)} anual</strong> según el IPC Nacional del INDEC
              (diciembre {anio - 1} a diciembre {anio}), un promedio de{" "}
              <strong>{formatPct(promedioMensualPct, 1)} mensual</strong>. El mes de mayor suba fue{" "}
              {nombreMes(maxMes.periodo)} ({formatPct(maxMes.mensualPct!, 1)}) y el de menor,{" "}
              {nombreMes(minMes.periodo)} ({formatPct(minMes.mensualPct!, 1)}).
            </>
          ) : (
            <>
              {anio} acumula <strong>{formatPct(acumulada.pct, 1)}</strong> de inflación hasta{" "}
              {nombreMes(acumulada.hastaPeriodo)} según el IPC Nacional del INDEC, con un promedio de{" "}
              <strong>{formatPct(promedioMensualPct, 1)} mensual</strong>. Esta página se actualiza
              con cada publicación del INDEC.
            </>
          )}{" "}
          Tenés la tabla mes a mes abajo y podés{" "}
          <Link href="/inflacion">actualizar cualquier monto por inflación</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Inflación {anio}, mes a mes</h2>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-zinc-700">
              <tr>
                <th className="px-3 py-2 font-semibold">Mes</th>
                <th className="px-3 py-2 text-right font-semibold">Mensual</th>
                <th className="px-3 py-2 text-right font-semibold">Acumulada en {anio}</th>
                <th className="px-3 py-2 text-right font-semibold">Interanual</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.periodo} className="border-t border-zinc-100">
                  <td className="px-3 py-1.5 capitalize text-zinc-700">{nombreMes(f.periodo)}</td>
                  <td className="px-3 py-1.5 text-right font-medium text-zinc-900">
                    {f.mensualPct === null ? "—" : formatPct(f.mensualPct, 1)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-zinc-600">
                    {f.acumuladaAnioPct === null ? "—" : formatPct(f.acumuladaAnioPct, 1)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-zinc-600">
                    {f.interanualPct === null ? "—" : formatPct(f.interanualPct, 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          «Acumulada» mide desde diciembre de {anio - 1}; «interanual», contra el mismo mes del
          año anterior. Fuente: IPC Nacional nivel general, INDEC.
        </p>
      </section>

      {mil && (
        <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <h2 className="text-base font-semibold text-zinc-900">
            $1.000 de {anio} son {formatARS(mil.montoActualizado, 0)} de hoy
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            Entre enero de {anio} y {nombrePeriodo(ULTIMO_PERIODO)} los precios se multiplicaron
            por{" "}
            {mil.factor.toLocaleString("es-AR", {
              maximumFractionDigits: mil.factor >= 10 ? 0 : 1,
            })}
            . ¿Querés actualizar un sueldo, una cuota o cualquier otro monto?
          </p>
          <Link
            href="/inflacion"
            className="mt-3 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Actualizar un monto por inflación →
          </Link>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="ca-acordeon group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="flex items-center justify-between text-sm font-medium">
        {anterior ? (
          <Link href={`/inflacion/${anterior}`} className="text-emerald-700 hover:underline">
            ← Inflación {anterior}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link href={`/inflacion/${siguiente}`} className="text-emerald-700 hover:underline">
            Inflación {siguiente} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          {[INFLACION_FUENTES.ipc, INFLACION_FUENTES.indec].map((f) => (
            <li key={f.url}>
              •{" "}
              <a
                href={f.url}
                rel="nofollow noopener"
                target="_blank"
                className="text-emerald-700 underline"
              >
                {f.nombre}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {INFLACION_FUENTES.consultadoEl}. Si alquilás, calculá tu{" "}
          <Link href="/inflacion/alquiler" className="text-emerald-700 underline">
            ajuste de alquiler por IPC
          </Link>
          .
        </p>
      </section>
    </article>
  );
}

function capitalizar(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
