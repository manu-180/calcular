import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraCanastaBasica } from "@/components/CalculadoraCanastaBasica";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { CANASTA_BASICA, CANASTA_BASICA_FUENTE, CANASTA_BASICA_ULTIMO } from "@/data/canasta-basica";
import { ADULTO_EQUIVALENTE_FUENTE, TABLA_ADULTO_EQUIVALENTE } from "@/data/adulto-equivalente";
import { etiquetaPeriodo, varInteranual, varMensual } from "@/lib/canasta-basica";
import {
  MESES_CANASTA,
  hogaresDelMes,
  slugDeMesCanasta,
} from "@/lib/canasta-basica-meses";
import { formatARS } from "@/lib/formato";

const U = CANASTA_BASICA_ULTIMO;
const MES = etiquetaPeriodo(U.periodo);

// Todo computado, nada a mano: cuando el generador carga el mes nuevo, la página se actualiza sola.
const varCbaMes = varMensual(CANASTA_BASICA, U.periodo, "cba");
const varCbtMes = varMensual(CANASTA_BASICA, U.periodo, "cbt");
const varCbaAnio = varInteranual(CANASTA_BASICA, U.periodo, "cba");
const varCbtAnio = varInteranual(CANASTA_BASICA, U.periodo, "cbt");

const pct = (n: number | null) => (n === null ? "—" : `${n.toFixed(1).replace(".", ",")}%`);

// Los tres hogares que el propio INDEC publica cada mes como ejemplo. La definición vive en
// `@/lib/canasta-basica-meses` porque también la usan las páginas por mes: una sola fuente ⇒ la
// tabla de acá y la de /canasta-basica/[mes] no pueden diferir. Se resuelven con el motor, así lo
// que muestra la página es exactamente lo que devuelve la calculadora.
const HOGARES = hogaresDelMes(U);

const FAMILIA_TIPO = HOGARES[1].r;

export const metadata: Metadata = {
  title: `Canasta básica ${MES}: cuánto necesita TU familia para no ser pobre`,
  description: `Calculá la línea de pobreza y de indigencia de tu hogar con el dato oficial del INDEC de ${MES}. La familia tipo necesita ${formatARS(FAMILIA_TIPO.lineaPobreza, 0)} por mes — pero tu hogar no es la familia tipo: poné las edades reales y mirá tu propio umbral.`,
  alternates: { canonical: "/canasta-basica" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Canasta básica · ${MES}`)}&s=${encodeURIComponent("La línea de pobreza de TU hogar, no la de la familia tipo")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto necesita una familia para no ser pobre en ${MES}?`,
    a: `Depende de quiénes la componen, no del número de integrantes. La "familia tipo" que publica el INDEC (dos adultos de 35 y 31 y dos hijos de 6 y 8 años) necesitó ${formatARS(FAMILIA_TIPO.lineaPobreza, 0)} en ${MES} para no ser pobre, y ${formatARS(FAMILIA_TIPO.lineaIndigencia, 0)} para no ser indigente. Un hogar con un adolescente varón o con adultos mayores tiene un umbral distinto, porque cada persona "pesa" diferente según su requerimiento nutricional. Por eso esta calculadora pide las edades reales en lugar de asumir la familia tipo.`,
  },
  {
    q: "¿Qué diferencia hay entre canasta básica alimentaria y canasta básica total?",
    a: `La canasta básica alimentaria (CBA) es el costo mensual de los alimentos que cubren los requerimientos de energía y proteínas de un adulto: define la línea de indigencia. La canasta básica total (CBT) toma esa CBA y la amplía con el coeficiente de Engel para incluir los bienes y servicios no alimentarios —vestimenta, transporte, salud, educación, vivienda—: define la línea de pobreza. En ${MES} la CBA del adulto equivalente fue de ${formatARS(U.cba, 0)} y la CBT de ${formatARS(U.cbt, 0)}.`,
  },
  {
    q: "¿Qué es un «adulto equivalente»?",
    a: "Es la unidad de medida del INDEC. La referencia es el requerimiento energético de un varón adulto de 30 a 60 años con actividad moderada (2.750 kcal), que vale 1 adulto equivalente. Cada persona del hogar vale una fracción según su sexo y su edad: un bebé menor de 1 año vale 0,35; un chico de 6, 0,64; una mujer de 30 a 45, 0,77; un varón de 17, 1,04. Sumando esas fracciones se obtiene cuántos adultos equivalentes tiene el hogar, y ese número multiplica la canasta.",
  },
  {
    q: "¿Estar por debajo de la línea de pobreza tiene algún efecto legal?",
    a: "No. Es un umbral estadístico que el INDEC usa para medir cuánta gente es pobre en el país, no una categoría legal ni un requisito para acceder a un plan, una asignación o un beneficio. Cada programa social tiene sus propios criterios de acceso, que no son estos.",
  },
  {
    q: "¿Sirve para todo el país o sólo para Buenos Aires?",
    a: "La serie mensual que publica el INDEC —y que usa esta calculadora— es la del Gran Buenos Aires. Para medir la pobreza en el resto del país, el INDEC aplica coeficientes regionales sobre esa base, que no se publican en la serie mensual. Tomá el resultado como una referencia nacional aproximada: en las regiones más caras el umbral real es algo más alto y en las más baratas, algo más bajo.",
  },
  {
    q: "¿Cada cuánto se actualiza este número?",
    a: `Todos los meses. El INDEC publica la valorización de la CBA y la CBT alrededor del día 14 o 15, con los datos del mes anterior. Esta página toma la serie oficial completa, así que se actualiza sola: el último dato disponible es el de ${MES}.`,
  },
  {
    q: "¿Por qué la canasta sube distinto que la inflación?",
    a: "Porque mide otra cosa. El IPC sigue el precio de todo lo que consume un hogar promedio; la CBA sigue una lista fija de alimentos y la CBT la amplía con el coeficiente de Engel. Cuando la comida sube más rápido que el resto, la canasta corre por encima del IPC, y al revés. Podés comparar los dos en la calculadora de inflación.",
  },
];

export default function CanastaBasicaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de canasta básica y línea de pobreza",
        url: "https://calcular.ar/canasta-basica",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `Canasta básica alimentaria y total del adulto equivalente — ${MES} (INDEC, Gran Buenos Aires)`,
        descripcion: `Valores mensuales de la canasta básica alimentaria (línea de indigencia) y de la canasta básica total (línea de pobreza) por adulto equivalente, publicados por el INDEC para el Gran Buenos Aires. En ${MES}: CBA ${formatARS(U.cba, 0)} y CBT ${formatARS(U.cbt, 0)}.`,
        url: "/canasta-basica",
        modificado: `${U.periodo}-01`,
        fuenteNombre: CANASTA_BASICA_FUENTE.nombre,
        fuenteUrl: CANASTA_BASICA_FUENTE.informe,
      }),
      articleSchema({
        titulo: `Canasta básica ${MES}: cuánto necesita tu familia para no ser pobre`,
        descripcion:
          "Línea de pobreza e indigencia de un hogar concreto, calculada con la canasta del INDEC y la tabla oficial de adultos equivalentes.",
        url: "/canasta-basica",
        modificado: CANASTA_BASICA_FUENTE.consultadoEl,
      }),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Canasta básica de {MES}: cuánto necesita <em>tu</em> hogar para no ser pobre
        </h1>
        <p className="text-zinc-600">
          Todos los meses sale la noticia con el número de la «familia tipo». El problema es que
          casi nadie vive en la familia tipo: el umbral depende de la edad y el sexo de cada
          integrante. Poné tu hogar real y mirá el número que te corresponde a vos, con el dato
          oficial del INDEC.
        </p>
      </header>

      <RespuestaPrimero actualizado={CANASTA_BASICA_FUENTE.consultadoEl}>
        <p>
          En {MES}, la canasta básica total del <strong>adulto equivalente</strong> fue de{" "}
          <strong>{formatARS(U.cbt, 0)}</strong> y la alimentaria, de{" "}
          <strong>{formatARS(U.cba, 0)}</strong> (INDEC, Gran Buenos Aires). Para la familia tipo —dos
          adultos y dos hijos de 6 y 8 años, que suman 3,09 adultos equivalentes— eso significa{" "}
          <strong>{formatARS(FAMILIA_TIPO.lineaPobreza, 0)}</strong> por mes para no ser pobre y{" "}
          <strong>{formatARS(FAMILIA_TIPO.lineaIndigencia, 0)}</strong> para no ser indigente. Tu
          hogar tiene su propio umbral: se calcula sumando los adultos equivalentes de cada
          integrante según la tabla oficial y multiplicando por la canasta.
        </p>
      </RespuestaPrimero>

      <CalculadoraCanastaBasica />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los tres hogares que publica el INDEC en {MES}
        </h2>
        <p className="text-zinc-600">
          Estos son los ejemplos del informe oficial. Fijate cómo un hogar de 3 personas con un
          adolescente varón y una adulta mayor está más cerca de uno de 5 con chicos chicos que de
          la familia tipo: lo que manda es la composición, no la cantidad.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Hogar</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Adultos eq.</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Línea de indigencia</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Línea de pobreza</th>
                </tr>
              </thead>
              <tbody>
                {HOGARES.map((h) => (
                  <tr key={h.titulo} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">
                      {h.titulo}
                      <span className="block text-xs text-zinc-400">{h.descripcion}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {h.r.adultosEquivalentes.toString().replace(".", ",")}
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
          Fuente: INDEC, informe de valorización mensual de la CBA y la CBT de {MES}. Los valores de
          esta tabla no están escritos a mano: los calcula el mismo motor que la calculadora de
          arriba, y una suite de verificación los compara contra el informe oficial en cada deploy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se movió la canasta</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Canasta básica alimentaria (línea de indigencia)
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{formatARS(U.cba, 0)}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {pct(varCbaMes)} respecto de {etiquetaPeriodo(CANASTA_BASICA[CANASTA_BASICA.length - 2].periodo)} ·{" "}
              {pct(varCbaAnio)} interanual
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Canasta básica total (línea de pobreza)
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{formatARS(U.cbt, 0)}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {pct(varCbtMes)} respecto de {etiquetaPeriodo(CANASTA_BASICA[CANASTA_BASICA.length - 2].periodo)} ·{" "}
              {pct(varCbtAnio)} interanual
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          Los dos son valores por <strong>adulto equivalente</strong>, no por hogar. Para comparar
          contra los precios generales o para actualizar un monto viejo, usá la{" "}
          <Link href="/inflacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de inflación
          </Link>
          ; para ver si tu sueldo le sigue el ritmo, la{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La tabla oficial de adultos equivalentes
        </h2>
        <p className="text-zinc-600">
          Es el corazón del cálculo y casi nunca se publica completa. Sale del cuadro 4 del informe
          del INDEC: cuánto vale cada persona en relación con el varón adulto de referencia
          (2.750 kcal = 1). Hasta los 9 años el coeficiente es igual para ambos sexos.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2 font-semibold">Edad</th>
                  <th className="px-4 py-2 text-right font-semibold">Mujeres</th>
                  <th className="px-4 py-2 text-right font-semibold">Varones</th>
                </tr>
              </thead>
              <tbody>
                {TABLA_ADULTO_EQUIVALENTE.map((t) => (
                  <tr key={t.etiqueta} className="border-t border-zinc-100">
                    <td className="px-4 py-1.5 text-zinc-600">{t.etiqueta}</td>
                    <td className="px-4 py-1.5 text-right text-zinc-900">
                      {t.mujer.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-4 py-1.5 text-right text-zinc-900">
                      {t.varon.toFixed(2).replace(".", ",")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Fuente: INDEC, cuadro 4 «Unidades de adulto equivalente, según sexo y edad», del informe
          mensual de valorización de la CBA y la CBT. Consultado el{" "}
          {ADULTO_EQUIVALENTE_FUENTE.consultadoEl}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que este número no dice</h2>
        <div className="space-y-3 text-zinc-600">
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>No es una categoría legal.</strong> Estar por debajo de la línea no da acceso
              a ningún plan ni beneficio: cada programa tiene sus propios criterios.
            </li>
            <li>
              <strong>Es del Gran Buenos Aires.</strong> El INDEC aplica coeficientes regionales
              para medir el resto del país; la serie mensual publica sólo el GBA.
            </li>
            <li>
              <strong>No cuenta la vivienda propia.</strong> Dos hogares con el mismo ingreso están
              en situaciones muy distintas si uno alquila y el otro no; la medición por ingresos no
              lo distingue.
            </li>
            <li>
              <strong>Es ingreso, no patrimonio ni consumo.</strong> Un hogar puede estar debajo de
              la línea en un mes puntual sin ser pobre estructuralmente, y al revés.
            </li>
            <li>
              <strong>La canasta de alimentos es de 1996/97.</strong> La composición se validó con
              la Encuesta de Gastos de los Hogares 2004/05, pero la lista de productos sigue siendo
              la de esa metodología.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-900 marker:content-none">
                {f.q}
              </summary>
              <p className="mt-2 text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La canasta básica, mes por mes</h2>
        <p className="text-zinc-600">
          Cada mes tiene su página con el valor de la canasta, el umbral de los tres hogares de
          ejemplo del INDEC, la comparación contra la inflación de ese mismo mes y el coeficiente
          para traer un ingreso de entonces a valores de hoy.
        </p>
        <ul className="flex flex-wrap gap-2">
          {[...MESES_CANASTA].reverse().map((m) => (
            <li key={m.periodo}>
              <Link
                href={`/canasta-basica/${slugDeMesCanasta(m)}`}
                className="inline-block rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
              >
                {etiquetaPeriodo(m.periodo)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 border-t border-zinc-100 pt-6">
        <h2 className="text-sm font-semibold text-zinc-700">Fuentes oficiales</h2>
        <ul className="space-y-1 text-sm">
          <li>
            •{" "}
            <a
              href={CANASTA_BASICA_FUENTE.informe}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              INDEC — Valorización mensual de la canasta básica alimentaria y total (informes técnicos)
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={CANASTA_BASICA_FUENTE.serie}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              INDEC — serie mensual CBA/CBT desde abril de 2016 (planilla oficial)
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
              INDEC — Metodología N° 22, La medición de la pobreza y la indigencia en la Argentina
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {CANASTA_BASICA_FUENTE.consultadoEl} · canasta de {MES}. Mirá también
          cuánto cuesta criar un hijo en la{" "}
          <Link href="/cuota-alimentaria" className="text-emerald-700 underline">
            calculadora de cuota alimentaria
          </Link>{" "}
          o cuánto te queda de bolsillo en la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 underline">
            calculadora de sueldo neto
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
