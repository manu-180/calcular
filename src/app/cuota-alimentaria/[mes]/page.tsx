import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, datasetSchema } from "@/lib/schema";
import {
  CANASTA_CRIANZA_FUENTE,
  TRAMOS_CRIANZA,
  type TramoCrianzaId,
} from "@/data/canasta-crianza";
import {
  MESES_CUOTA,
  actualizacionHastaHoy,
  formatPct,
  mesAnterior,
  mesPorSlug,
  slugDeMes,
  varMensualCanasta,
  varMensualIPC,
} from "@/lib/canasta-meses";
import { formatARS } from "@/lib/formato";

export const dynamicParams = false;

// Tramo de referencia del answer-first: el más consultado y el más caro de los cuatro.
const REF: TramoCrianzaId = "6-a-12";

export function generateStaticParams() {
  return MESES_CUOTA.map((m) => ({ mes: slugDeMes(m) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mes: string }>;
}): Promise<Metadata> {
  const { mes: slug } = await params;
  const mes = mesPorSlug(slug);
  if (!mes) return {};

  return {
    title: `Cuota alimentaria ${mes.etiqueta}: la canasta de crianza del INDEC`,
    description: `Cuánto costaba criar un hijo en ${mes.etiqueta} según el INDEC: ${formatARS(mes.valores["menor-1"].total, 0)} a ${formatARS(mes.valores[REF].total, 0)} por mes según la edad, abierto en bienes y cuidado, comparado con la inflación del mes y actualizado a hoy.`,
    alternates: { canonical: `/cuota-alimentaria/${slug}` },
    openGraph: {
      images: [
        {
          url: `/og?t=${encodeURIComponent(`Canasta de crianza · ${mes.etiqueta}`)}&s=${encodeURIComponent("Dato oficial del INDEC, mes por mes")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CuotaAlimentariaMesPage({
  params,
}: {
  params: Promise<{ mes: string }>;
}) {
  const { mes: slug } = await params;
  const idx = MESES_CUOTA.findIndex((m) => slugDeMes(m) === slug);
  if (idx === -1) notFound();

  const mes = MESES_CUOTA[idx];
  const anterior = idx > 0 ? MESES_CUOTA[idx - 1] : null;
  const siguiente = idx < MESES_CUOTA.length - 1 ? MESES_CUOTA[idx + 1] : null;
  const previoSerie = mesAnterior(mes);

  const varCanasta = varMensualCanasta(mes, REF);
  const varIPC = varMensualIPC(mes.periodo);
  const act = actualizacionHastaHoy(mes, REF);
  const esUltimo = act.hasta.periodo === mes.periodo;

  const modificadoISO = `${mes.periodo}-01`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      datasetSchema({
        nombre: `Canasta de crianza del INDEC — ${mes.etiqueta}, por tramo de edad`,
        descripcion: `Costo mensual de criar un hijo en ${mes.etiqueta} según el INDEC, abierto en bienes y servicios y en costo del cuidado, para los cuatro tramos de edad (menor de 1 año, 1 a 3, 4 a 5 y 6 a 12 años). Es el dato oficial que se usa como referencia del costo en una cuota alimentaria.`,
        url: `/cuota-alimentaria/${slug}`,
        modificado: modificadoISO,
        fuenteNombre: CANASTA_CRIANZA_FUENTE.nombre,
        fuenteUrl: CANASTA_CRIANZA_FUENTE.url,
      }),
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-sm font-medium text-emerald-700">
          <Link href="/cuota-alimentaria" className="hover:underline">
            Cuota alimentaria
          </Link>{" "}
          · {mes.etiqueta}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cuota alimentaria en {mes.etiqueta}: cuánto costaba criar un hijo
        </h1>
        <p className="text-zinc-600">
          El dato oficial del mes, sin vueltas: la canasta de crianza que el INDEC publicó para{" "}
          {mes.etiqueta}, abierta en lo que se gasta y lo que se cuida, comparada con la inflación
          de ese mismo mes{esUltimo ? "" : " y actualizada a hoy"}.
        </p>
      </header>

      <RespuestaPrimero actualizado={CANASTA_CRIANZA_FUENTE.consultadoEl}>
        <p>
          En {mes.etiqueta}, criar a un chico costaba entre{" "}
          <strong>{formatARS(mes.valores["menor-1"].total, 0)}</strong> por mes (menor de 1 año) y{" "}
          <strong>{formatARS(mes.valores[REF].total, 0)}</strong> (de 6 a 12 años), según la canasta
          de crianza del INDEC — bienes, servicios y el valor del cuidado incluidos.{" "}
          <strong>Ese número no es la cuota alimentaria</strong>: es el costo total del chico, que
          los dos progenitores deben cubrir en proporción a lo que gana cada uno (art. 666 CCyC),
          computando el cuidado cotidiano como aporte (art. 660). Para pasar del costo a la cuota,
          usá la <Link href="/cuota-alimentaria">calculadora de cuota alimentaria</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Canasta de crianza de {mes.etiqueta}, por tramo de edad
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Tramo de edad</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bienes y servicios</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Cuidado</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total</th>
                  <th className="px-4 py-2.5 text-right font-semibold">vs. mes anterior</th>
                </tr>
              </thead>
              <tbody>
                {TRAMOS_CRIANZA.map((t) => {
                  const v = mes.valores[t.id];
                  const dv = varMensualCanasta(mes, t.id);
                  return (
                    <tr key={t.id} className="border-t border-zinc-100">
                      <td className="px-4 py-2.5 text-zinc-600">
                        {t.nombre}
                        <span className="block text-xs text-zinc-400">{t.escolaridad}</span>
                      </td>
                      <td className="px-4 py-2.5 text-right text-zinc-900">
                        {formatARS(v.bienes, 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-zinc-900">
                        {formatARS(v.cuidado, 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                        {formatARS(v.total, 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-zinc-500">
                        {dv === null ? "—" : formatPct(dv)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Fuente: INDEC, serie mensual de la canasta de crianza. El componente{" "}
          <strong>cuidado</strong> es el tiempo de crianza valorizado en plata: por eso el tramo de
          4 a 5 años baja respecto del de 1 a 3 pese a gastar más en bienes — con el nivel inicial,
          el chico pasa horas escolarizado y se necesitan menos horas de cuidado pagas.
        </p>
      </section>

      {varCanasta !== null && varIPC !== null ? (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">
            Cómo se movió contra la inflación de {mes.etiqueta}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Canasta de crianza (6 a 12 años)
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{formatPct(varCanasta)}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {previoSerie
                  ? `de ${formatARS(previoSerie.valores[REF].total, 0)} en ${previoSerie.etiqueta} a ${formatARS(mes.valores[REF].total, 0)}`
                  : null}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Inflación del mes (IPC nacional)
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{formatPct(varIPC)}</p>
              <p className="mt-1 text-xs text-zinc-500">INDEC, nivel general</p>
            </div>
          </div>
          <p className="text-sm text-zinc-600">
            {Math.abs(varCanasta - varIPC) < 0.15 ? (
              <>
                En {mes.etiqueta} la canasta de crianza se movió prácticamente igual que la
                inflación general.
              </>
            ) : varCanasta > varIPC ? (
              <>
                En {mes.etiqueta} criar un hijo se encareció{" "}
                <strong>más que la inflación general</strong> ({formatPct(varCanasta)} contra{" "}
                {formatPct(varIPC)}). Una cuota atada al IPC quedó ese mes por debajo del costo real
                del chico.
              </>
            ) : (
              <>
                En {mes.etiqueta} la canasta de crianza subió{" "}
                <strong>menos que la inflación general</strong> ({formatPct(varCanasta)} contra{" "}
                {formatPct(varIPC)}). Suele pasar cuando el componente de cuidado —que se actualiza
                a saltos, no todos los meses— queda quieto mientras los precios corren.
              </>
            )}{" "}
            Podés actualizar cualquier monto por IPC en la{" "}
            <Link href="/inflacion" className="font-medium text-emerald-700 hover:underline">
              calculadora de inflación
            </Link>
            .
          </p>
        </section>
      ) : null}

      {!esUltimo ? (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">
            ¿Tenés una cuota fijada en {mes.etiqueta}? Cuánto sería hoy
          </h2>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
            <p className="text-[15px] leading-relaxed text-zinc-700">
              Desde {mes.etiqueta} hasta {act.hasta.etiqueta}, el costo de criar un chico de 6 a 12
              años pasó de <strong>{formatARS(mes.valores[REF].total, 0)}</strong> a{" "}
              <strong>{formatARS(act.hasta.valores[REF].total, 0)}</strong>: un{" "}
              <strong>{formatPct(act.pct)}</strong>. Un monto acordado en {mes.etiqueta} y nunca
              actualizado hoy cubre, en términos reales, alrededor de{" "}
              <strong>{Math.round((1 / act.coeficiente) * 100)}%</strong> de lo que cubría entonces.
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              Para actualizar el monto por la propia canasta, multiplicalo por{" "}
              <strong>{act.coeficiente.toFixed(3).replace(".", ",")}</strong>. Es una cuenta de
              referencia: cómo se actualiza una cuota depende de lo que diga el acuerdo o la
              sentencia (índice pactado, porcentaje del sueldo, revisión judicial).
            </p>
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Del costo de crianza a la cuota</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El número de arriba es <strong>el costo total del chico</strong>, no lo que paga un
            progenitor. La ley reparte ese costo con tres reglas: los dos deben la manutención
            (arts. 658 y 659), el cuidado cotidiano de quien convive con el hijo cuenta como aporte
            económico (art. 660), y el reparto va según la capacidad de cada uno para que el chico
            tenga un nivel de vida equivalente en los dos hogares (art. 666).
          </p>
          <p>
            La{" "}
            <Link
              href="/cuota-alimentaria"
              className="font-medium text-emerald-700 hover:underline"
            >
              calculadora de cuota alimentaria
            </Link>{" "}
            hace exactamente ese reparto con los ingresos de cada progenitor. Si querés entender de
            dónde sale el dato y por qué el cuidado pesa tanto, está desarrollado en{" "}
            <Link
              href="/blog/cuanto-cuesta-criar-un-hijo-argentina"
              className="font-medium text-emerald-700 hover:underline"
            >
              cuánto cuesta criar un hijo en Argentina
            </Link>
            .
          </p>
          <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Esto no es asesoramiento legal.</strong> La canasta de crianza es una medición
            estadística del INDEC para el Gran Buenos Aires, no un mínimo legal ni una cuota fijada:
            el monto lo acuerdan los progenitores o lo determina un juez caso por caso (art. 721
            CCyC), mirando las necesidades concretas del hijo y la capacidad económica real de cada
            uno. Antes de firmar un acuerdo o presentar un reclamo, consultá con un abogado de
            familia; en la mayoría de las provincias hay defensorías y patrocinio jurídico gratuito
            para temas de alimentos.
          </p>
        </div>
      </section>

      <nav className="flex items-center justify-between text-sm font-medium">
        {anterior ? (
          <Link
            href={`/cuota-alimentaria/${slugDeMes(anterior)}`}
            className="text-emerald-700 hover:underline"
          >
            ← {anterior.etiqueta}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link
            href={`/cuota-alimentaria/${slugDeMes(siguiente)}`}
            className="text-emerald-700 hover:underline"
          >
            {siguiente.etiqueta} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href={CANASTA_CRIANZA_FUENTE.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              INDEC — serie mensual de la canasta de crianza por tramo de edad (planilla oficial)
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={CANASTA_CRIANZA_FUENTE.informe}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              INDEC — Valorización mensual de la canasta de crianza (informes técnicos)
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://www.argentina.gob.ar/justicia/derechofacil/aplicalaley/los-alimentos-de-los-hijos"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ministerio de Justicia — Los alimentos de los hijos (arts. 658, 659, 660, 663, 666 y
              721 CCyC)
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación de la serie: {CANASTA_CRIANZA_FUENTE.consultadoEl}. Mirá también el{" "}
          <Link href="/cuota-alimentaria" className="text-emerald-700 underline">
            monto de referencia con el último dato publicado
          </Link>{" "}
          o la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 underline">
            calculadora de sueldo neto
          </Link>{" "}
          para estimar el ingreso que entra en el reparto.
        </p>
      </section>
    </article>
  );
}
