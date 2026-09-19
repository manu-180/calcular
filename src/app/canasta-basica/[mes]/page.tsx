import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, datasetSchema } from "@/lib/schema";
import { CANASTA_BASICA, CANASTA_BASICA_FUENTE } from "@/data/canasta-basica";
import { SMVM_SERIE } from "@/data/desempleo";
import { etiquetaPeriodo, varInteranual, varMensual } from "@/lib/canasta-basica";
import {
  MESES_CANASTA,
  actualizacionCanastaHastaHoy,
  hogaresDelMes,
  mesCanastaAnterior,
  slugDeMesCanasta,
  varMensualIPC,
} from "@/lib/canasta-basica-meses";
import { breadcrumbSchema, robotsArchivoMensual, variacionPct } from "@/lib/archivo-mensual";
import { formatARS } from "@/lib/formato";

export const dynamicParams = false;

/** Porcentaje con signo explícito: la variación mensual se lee mejor con el "+" delante. */
const pct = (n: number, decimales = 1) =>
  `${n > 0 ? "+" : ""}${n.toFixed(decimales).replace(".", ",")}%`;

export function generateStaticParams() {
  return MESES_CANASTA.map((m) => ({ mes: slugDeMesCanasta(m) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mes: string }>;
}): Promise<Metadata> {
  const { mes: slug } = await params;
  const mes = MESES_CANASTA.find((m) => slugDeMesCanasta(m) === slug);
  if (!mes) return {};

  const etiqueta = etiquetaPeriodo(mes.periodo);
  const familiaTipo = hogaresDelMes(mes)[1].r;

  return {
    title: `Canasta básica de ${etiqueta}: la línea de pobreza del INDEC`,
    description: `Canasta básica del INDEC en ${etiqueta}: ${formatARS(mes.cbt, 0)} de CBT y ${formatARS(mes.cba, 0)} de CBA por adulto equivalente. La familia tipo necesitó ${formatARS(familiaTipo.lineaPobreza, 0)} para no ser pobre — con el umbral de otras composiciones de hogar, la comparación contra la inflación del mes y el coeficiente para traer un ingreso de ${etiqueta} a hoy.`,
    alternates: { canonical: `/canasta-basica/${slug}` },
    robots: robotsArchivoMensual(
      mes.periodo,
      MESES_CANASTA.map((m) => m.periodo),
    ),
    openGraph: {
      images: [
        {
          url: `/og?t=${encodeURIComponent(`Canasta básica · ${etiqueta}`)}&s=${encodeURIComponent("La línea de pobreza del INDEC, mes por mes")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CanastaBasicaMesPage({
  params,
}: {
  params: Promise<{ mes: string }>;
}) {
  const { mes: slug } = await params;
  const idx = MESES_CANASTA.findIndex((m) => slugDeMesCanasta(m) === slug);
  if (idx === -1) notFound();

  const mes = MESES_CANASTA[idx];
  const etiqueta = etiquetaPeriodo(mes.periodo);
  const anterior = idx > 0 ? MESES_CANASTA[idx - 1] : null;
  const siguiente = idx < MESES_CANASTA.length - 1 ? MESES_CANASTA[idx + 1] : null;
  const previoSerie = mesCanastaAnterior(mes);

  const hogares = hogaresDelMes(mes);
  const familiaTipo = hogares[1].r;

  const varCBT = varMensual(CANASTA_BASICA, mes.periodo, "cbt");
  const varCBA = varMensual(CANASTA_BASICA, mes.periodo, "cba");
  const varIPC = varMensualIPC(mes.periodo);
  const interanualCBT = varInteranual(CANASTA_BASICA, mes.periodo, "cbt");

  const act = actualizacionCanastaHastaHoy(mes);
  const esUltimo = act.hasta.periodo === mes.periodo;

  // Acumulado del año calendario: a diferencia de los convenios (que arrancan a mitad de año),
  // la serie de canasta básica sí tiene enero de cada año — se compara contra ESE enero, no
  // contra el inicio de la serie completa (que sería 2016).
  const anioActual = mes.periodo.slice(0, 4);
  const enero = CANASTA_BASICA.find((m) => m.periodo === `${anioActual}-01`);
  const acumuladoAnio = enero && enero.periodo !== mes.periodo ? variacionPct(mes.cbt, enero.cbt) : null;

  // El SMVM solo cubre desde noviembre de 2025: para meses anteriores la comparación se omite,
  // nunca se inventa un valor.
  const smvm = SMVM_SERIE.find((s) => s.periodo === mes.periodo);
  // Cobertura (SMVM ÷ línea), no variación: "-76%" leído como caída es un número absurdo en una
  // página YMYL. Lo que se afirma es qué porcentaje de la línea cubre un solo salario mínimo.
  const coberturaSmvmPct = smvm ? Math.round((smvm.mensual / familiaTipo.lineaPobreza) * 100) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        ...datasetSchema({
          nombre: `Canasta básica alimentaria y total del INDEC — ${etiqueta}`,
          descripcion: `Valores de la canasta básica alimentaria (línea de indigencia) y de la canasta básica total (línea de pobreza) por adulto equivalente publicados por el INDEC para ${etiqueta}, con el umbral resultante para tres composiciones de hogar y la variación contra el mes anterior.`,
          url: `/canasta-basica/${slug}`,
          modificado: `${mes.periodo}-01`,
          fuenteNombre: CANASTA_BASICA_FUENTE.nombre,
          fuenteUrl: CANASTA_BASICA_FUENTE.informe,
        }),
        temporalCoverage: mes.periodo,
      },
      breadcrumbSchema([
        { name: "Canasta básica", url: "/canasta-basica" },
        { name: etiqueta, url: `/canasta-basica/${slug}` },
      ]),
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-sm font-medium text-emerald-700">
          <Link href="/canasta-basica" className="hover:underline">
            Canasta básica
          </Link>{" "}
          · {etiqueta}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Canasta básica de {etiqueta}: cuánto era la línea de pobreza
        </h1>
        <p className="text-zinc-600">
          El dato oficial de ese mes, abierto: cuánto valía la canasta por adulto equivalente, qué
          umbral le tocaba a distintos hogares, cómo se movió contra la inflación de {etiqueta}
          {esUltimo ? "" : " y cuánto representa ese ingreso hoy"}.
        </p>
      </header>

      <RespuestaPrimero actualizado={CANASTA_BASICA_FUENTE.consultadoEl}>
        <p>
          En {etiqueta} la canasta básica total del INDEC fue de{" "}
          <strong>{formatARS(mes.cbt, 0)}</strong> por adulto equivalente y la alimentaria, de{" "}
          <strong>{formatARS(mes.cba, 0)}</strong>. Para la «familia tipo» —dos adultos y dos hijos
          de 6 y 8 años, que suman 3,09 adultos equivalentes— eso significaba{" "}
          <strong>{formatARS(familiaTipo.lineaPobreza, 0)}</strong> para no ser pobre y{" "}
          <strong>{formatARS(familiaTipo.lineaIndigencia, 0)}</strong> para no ser indigente.{" "}
          <strong>Ese número no es el de tu hogar</strong>: el umbral depende de la edad y el sexo de
          cada integrante, no de cuántos son. Poné tu composición real en la{" "}
          <Link href="/canasta-basica">calculadora de canasta básica</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Qué umbral le tocaba a cada hogar en {etiqueta}
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Hogar</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Adultos equiv.</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Línea de indigencia</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Línea de pobreza</th>
                </tr>
              </thead>
              <tbody>
                {hogares.map((h) => (
                  <tr key={h.titulo} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">
                      {h.titulo}
                      <span className="block text-xs text-zinc-400">{h.descripcion}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {h.r.adultosEquivalentes.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(h.r.lineaIndigencia, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(h.r.lineaPobreza, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Son los tres hogares que el propio INDEC publica como ejemplo. Fijate que el de 3
          integrantes no está a tres cuartos del de 4: lo que manda es <strong>quiénes</strong> lo
          componen —un varón de 18 años pesa más que un chico de 6— y no cuántos son. Los valores
          salen de multiplicar la canasta del mes por los adultos equivalentes del hogar, la misma
          cuenta que hace el INDEC.
        </p>
      </section>

      {varCBT !== null && varCBA !== null ? (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">
            Cómo se movió la canasta en {etiqueta}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Canasta total (CBT)
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{pct(varCBT)}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {previoSerie
                  ? `de ${formatARS(previoSerie.cbt, 0)} en ${etiquetaPeriodo(previoSerie.periodo)} a ${formatARS(mes.cbt, 0)}`
                  : null}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Canasta alimentaria (CBA)
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{pct(varCBA)}</p>
              <p className="mt-1 text-xs text-zinc-500">la que marca la indigencia</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Inflación del mes (IPC)
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {varIPC === null ? "—" : pct(varIPC)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">INDEC, nivel general</p>
            </div>
          </div>
          {varIPC !== null ? (
            <p className="text-sm text-zinc-600">
              {Math.abs(varCBT - varIPC) < 0.15 ? (
                <>
                  En {etiqueta} la línea de pobreza se movió prácticamente igual que la inflación
                  general.
                </>
              ) : varCBT > varIPC ? (
                <>
                  En {etiqueta} la línea de pobreza subió{" "}
                  <strong>más que la inflación general</strong> ({pct(varCBT)} contra {pct(varIPC)}
                  ). Un sueldo que ese mes se actualizó por IPC perdió terreno contra el umbral:
                  quedó más cerca de la línea que el mes anterior.
                </>
              ) : (
                <>
                  En {etiqueta} la línea de pobreza subió{" "}
                  <strong>menos que la inflación general</strong> ({pct(varCBT)} contra{" "}
                  {pct(varIPC)}). Pasa cuando los alimentos corren por debajo del resto de los
                  precios: la canasta sigue una lista fija de comida, el IPC sigue todo el consumo.
                </>
              )}{" "}
              {interanualCBT !== null ? (
                <>
                  En los doce meses hasta {etiqueta}, la CBT acumuló <strong>{pct(interanualCBT)}</strong>.{" "}
                </>
              ) : null}
              {acumuladoAnio !== null ? (
                <>
                  En lo que va de {anioActual} (desde enero), acumuló <strong>{pct(acumuladoAnio)}</strong>.{" "}
                </>
              ) : null}
              Podés comparar cualquier período en la{" "}
              <Link href="/inflacion" className="font-medium text-emerald-700 hover:underline">
                calculadora de inflación
              </Link>
              .
            </p>
          ) : null}
        </section>
      ) : null}

      {!esUltimo ? (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">
            ¿Mirás un ingreso de {etiqueta}? Cuánto vale hoy
          </h2>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
            <p className="text-[15px] leading-relaxed text-zinc-700">
              Desde {etiqueta} hasta {etiquetaPeriodo(act.hasta.periodo)}, la canasta básica total
              pasó de <strong>{formatARS(mes.cbt, 0)}</strong> a{" "}
              <strong>{formatARS(act.hasta.cbt, 0)}</strong> por adulto equivalente: un{" "}
              <strong>{pct(act.pct)}</strong>. Un ingreso de {etiqueta} que nunca se actualizó hoy
              compra, medido contra la canasta, alrededor de{" "}
              <strong>{Math.round((1 / act.coeficiente) * 100)}%</strong> de lo que compraba
              entonces.
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              Para traer un monto de {etiqueta} a valores de hoy por la propia canasta,
              multiplicalo por <strong>{act.coeficiente.toFixed(3).replace(".", ",")}</strong>. Es
              una cuenta de referencia contra el costo de la canasta, distinta de actualizar por
              IPC: acá el índice es la comida, no el consumo entero.
            </p>
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué mide y qué no mide este número</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La <strong>CBA</strong> marca la línea de indigencia y la <strong>CBT</strong> la de
            pobreza, las dos por adulto equivalente y comparadas contra el{" "}
            <strong>ingreso total del hogar</strong>, no contra un sueldo suelto. Ninguna es un
            mínimo legal ni da acceso a un beneficio. Cómo se arma cada canasta, de dónde sale el
            coeficiente de Engel y qué queda afuera está desarrollado en la{" "}
            <Link href="/canasta-basica" className="font-medium text-emerald-700 hover:underline">
              calculadora de canasta básica
            </Link>
            , que además hace la cuenta con tu composición de hogar; para el ingreso de bolsillo de
            un sueldo registrado, la{" "}
            <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
              calculadora de sueldo neto
            </Link>
            .
          </p>
          <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Es el dato del Gran Buenos Aires.</strong> Fuera del AMBA el INDEC aplica
            coeficientes regionales que no salen en esta serie, y el umbral no contempla la vivienda
            propia ni los servicios gratuitos.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas sobre {etiqueta}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿La canasta subió más o menos que la inflación en {etiqueta}?
            </h3>
            <p className="mt-1 text-zinc-600">
              {varIPC === null || varCBT === null ? (
                <>
                  No podemos compararlo: {etiqueta} es el primer mes de esta serie o el INDEC todavía no
                  publicó el IPC de ese período.
                </>
              ) : Math.abs(varCBT - varIPC) < 0.15 ? (
                <>Prácticamente igual: la CBT subió {pct(varCBT)} y el IPC general, {pct(varIPC)}.</>
              ) : varCBT > varIPC ? (
                <>
                  Más: la CBT subió {pct(varCBT)} contra {pct(varIPC)} del IPC general. La comida y el resto
                  de la canasta le ganaron terreno al ingreso promedio de ese mes.
                </>
              ) : (
                <>
                  Menos: la CBT subió {pct(varCBT)} contra {pct(varIPC)} del IPC general. Pasa cuando los
                  alimentos corren por debajo del resto de los precios de la economía.
                </>
              )}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿Cuánto necesitaba ganar una familia tipo para no ser pobre en {etiqueta}?
            </h3>
            <p className="mt-1 text-zinc-600">
              <strong>{formatARS(familiaTipo.lineaPobreza, 0)}</strong> de ingreso total del hogar (dos
              adultos y dos hijos de 6 y 8 años). Por debajo de <strong>{formatARS(familiaTipo.lineaIndigencia, 0)}</strong>,
              el hogar era indigente.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿Cómo se comparaba con el salario mínimo de {etiqueta}?
            </h3>
            <p className="mt-1 text-zinc-600">
              {smvm === undefined ? (
                <>
                  No tenemos el SMVM de {etiqueta} en nuestra serie (arranca en noviembre de 2025): no
                  podemos hacer esa comparación para este mes.
                </>
              ) : (
                <>
                  El Salario Mínimo, Vital y Móvil de {etiqueta} fue de{" "}
                  <strong>{formatARS(smvm.mensual, 0)}</strong>
                  {coberturaSmvmPct !== null ? (
                    <>
                      : cubría el <strong>{coberturaSmvmPct}%</strong> de la línea de pobreza de la
                      familia tipo ({formatARS(familiaTipo.lineaPobreza, 0)}) — un solo SMVM
                      {coberturaSmvmPct < 100 ? " no alcanzaba" : " superaba"} esa línea por sí solo, sin
                      sumar el resto de los ingresos del hogar.
                    </>
                  ) : null}
                </>
              )}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">¿Este valor sirve para todo el país?</h3>
            <p className="mt-1 text-zinc-600">
              No exactamente: la serie mensual del INDEC es la del Gran Buenos Aires. Para el resto del
              país el organismo aplica coeficientes regionales que no salen en esta serie mensual, así que
              fuera del AMBA el número es una referencia aproximada, no el umbral exacto de esa región.
            </p>
          </div>
        </div>
      </section>

      <nav className="flex items-center justify-between text-sm font-medium">
        {anterior ? (
          <Link
            href={`/canasta-basica/${slugDeMesCanasta(anterior)}`}
            className="text-emerald-700 hover:underline"
          >
            ← {etiquetaPeriodo(anterior.periodo)}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link
            href={`/canasta-basica/${slugDeMesCanasta(siguiente)}`}
            className="text-emerald-700 hover:underline"
          >
            {etiquetaPeriodo(siguiente.periodo)} →
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
              href={CANASTA_BASICA_FUENTE.informe}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              INDEC — Valorización mensual de la canasta básica alimentaria y total (informes
              técnicos)
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={CANASTA_BASICA_FUENTE.metodologia}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              INDEC — Metodología N° 22: la medición de la pobreza y la indigencia por ingresos
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación de la serie: {CANASTA_BASICA_FUENTE.consultadoEl}. Mirá también{" "}
          <Link href="/canasta-basica" className="text-emerald-700 underline">
            el umbral de tu hogar con el último dato publicado
          </Link>{" "}
          o la{" "}
          <Link href="/cuota-alimentaria" className="text-emerald-700 underline">
            calculadora de cuota alimentaria
          </Link>
          , que usa la canasta de crianza del mismo organismo.
        </p>
      </section>
    </article>
  );
}
