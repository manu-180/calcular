import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraCuotaAlimentaria } from "@/components/CalculadoraCuotaAlimentaria";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CANASTA_CRIANZA,
  CANASTA_CRIANZA_FUENTE,
  CANASTA_CRIANZA_ULTIMO,
  TRAMOS_CRIANZA,
} from "@/data/canasta-crianza";
import { MESES_CUOTA, slugDeMes } from "@/lib/canasta-meses";
import { ArchivoMensualLinks } from "@/components/ArchivoMensualLinks";
import { formatARS } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Cuota alimentaria 2026: cuánto es por hijo según la canasta de crianza del INDEC",
  description:
    "Calculá gratis el monto de referencia de la cuota alimentaria con el último dato oficial del INDEC: cuánto cuesta criar un hijo por mes y cómo se reparte ese costo entre los progenitores.",
  alternates: { canonical: "/cuota-alimentaria" },
};

const U = CANASTA_CRIANZA_ULTIMO;
const menor = U.valores["menor-1"].total;
const mayor = U.valores["6-a-12"].total;

// Variación año contra año del tramo más consultado (6 a 12), computada — nunca a mano.
const hace12 = CANASTA_CRIANZA[CANASTA_CRIANZA.length - 13];
const varAnual = Math.round((U.valores["6-a-12"].total / hace12.valores["6-a-12"].total - 1) * 1000) / 10;

const faqs = [
  {
    q: "¿Cuánto es la cuota alimentaria en 2026?",
    a: `No hay un monto único: la ley no fija una suma ni un porcentaje del sueldo. Lo que sí existe es un dato oficial de referencia, la canasta de crianza del INDEC, que mide cuánto cuesta por mes mantener y cuidar a un hijo. En ${U.etiqueta} va de ${formatARS(menor, 0)} para un bebé menor de 1 año a ${formatARS(mayor, 0)} para un chico de 6 a 12 años. Ese costo lo tienen que cubrir los dos progenitores en proporción a lo que gana cada uno, así que la cuota de uno solo es una parte de ese total, no el total.`,
  },
  {
    q: "¿Qué es la canasta de crianza del INDEC?",
    a: "Es la valorización mensual de lo que cuesta criar a un chico, que el INDEC publica desde 2020. Tiene dos componentes: los bienes y servicios (comida, ropa, salud, educación, transporte, vivienda) y el costo del cuidado, que es el tiempo de crianza valorizado en plata. Se calcula para cuatro tramos de edad, hasta los 12 años inclusive. No es una cuota alimentaria ni un mínimo legal: es una medición estadística que los jueces y los abogados usan como referencia del costo real.",
  },
  {
    q: "¿Quién fija el monto de la cuota alimentaria?",
    a: "Lo acuerdan los progenitores y, si no hay acuerdo, lo fija un juez (art. 721 del Código Civil y Comercial). El juez pondera dos cosas: las necesidades concretas del hijo y la capacidad económica real de cada progenitor. Ninguna calculadora reemplaza esa decisión: sirve para llegar a la conversación con un número fundado en datos oficiales.",
  },
  {
    q: "¿Por qué el cuidado cuenta como aporte y no solo la plata?",
    a: "Porque lo dice la ley: el art. 660 del Código Civil y Comercial establece que las tareas cotidianas que hace el progenitor que tiene el cuidado del hijo tienen valor económico y son un aporte a su manutención. Por eso la canasta separa el componente de cuidado: quien lleva el día a día ya está aportando esa parte en especie, y eso se computa a la hora de fijar cuánto pone el otro en dinero.",
  },
  {
    q: "¿Se reparte mitad y mitad entre los dos progenitores?",
    a: "No necesariamente. Los dos deben la manutención (arts. 658 y 659), pero el art. 666 apunta a que el hijo mantenga un nivel de vida equivalente en los dos hogares: si uno tiene más recursos, aporta más. Por eso la calculadora reparte el costo en proporción a los ingresos de cada uno en lugar de dividirlo por dos.",
  },
  {
    q: "¿Hasta qué edad se paga la cuota alimentaria?",
    a: "Hasta los 21 años. Se extiende hasta los 25 si el hijo estudia o se capacita en un arte u oficio y eso le impide mantenerse por sus propios medios (art. 663 del Código Civil y Comercial).",
  },
  {
    q: "Mi hijo tiene más de 12 años, ¿cuánto cuesta criarlo?",
    a: "El INDEC no publica ese tramo: la canasta de crianza llega hasta los 12 años inclusive. Preferimos decirlo antes que extrapolar un número que nadie midió. Como referencia, el tramo de 6 a 12 años es el más caro de los cuatro, y a partir de la adolescencia los gastos de educación, transporte y vestimenta siguen subiendo — así que tomá ese valor como piso, no como techo.",
  },
  {
    q: "¿La cuota alimentaria se actualiza?",
    a: "Sí, y conviene que el acuerdo o la sentencia diga cómo. Es habitual atarla a un índice (el IPC del INDEC o la propia canasta de crianza) o a un porcentaje del ingreso del alimentante, justamente para que no haya que volver a litigar cada vez que suben los precios. Esta página usa siempre el último mes publicado por el INDEC, así que el número de referencia se actualiza solo.",
  },
  {
    q: "¿Qué pasa si no se paga la cuota?",
    a: "El incumplimiento se reclama judicialmente y puede derivar en medidas como el embargo de sueldo, la inscripción en el Registro de Deudores Alimentarios Morosos de la jurisdicción (que traba trámites como renovar el registro de conducir u obtener créditos) e intereses sobre la deuda. Es un tema que conviene ver con un abogado, porque el procedimiento y los registros varían por provincia.",
  },
];

export default function CuotaAlimentariaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de cuota alimentaria 2026",
        url: "https://calcular.ar/cuota-alimentaria",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Cuota alimentaria 2026: cuánto es por hijo según la canasta de crianza del INDEC",
        descripcion:
          "Monto de referencia de la cuota alimentaria a partir del costo oficial de crianza del INDEC y del reparto por capacidad económica entre progenitores (arts. 658, 660 y 666 CCyC).",
        url: "/cuota-alimentaria",
        modificado: "2026-07-30",
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
          Cuota alimentaria 2026: el monto de referencia, con el dato del INDEC
        </h1>
        <p className="text-zinc-600">
          La ley no fija un monto ni un porcentaje: fija un <strong>criterio</strong>. Acá lo
          aplicamos con números oficiales — cuánto cuesta criar a esos hijos según la{" "}
          <strong>canasta de crianza del INDEC</strong> y cómo se reparte ese costo entre los dos
          progenitores según lo que gana cada uno.
        </p>
      </header>

      <RespuestaPrimero actualizado={CANASTA_CRIANZA_FUENTE.consultadoEl}>
        <p>
          No existe un monto legal de cuota alimentaria: el monto lo acuerdan los progenitores o lo
          fija un juez (art. 721 CCyC), ponderando las necesidades del hijo y la capacidad económica
          de cada uno. El dato oficial de referencia es la{" "}
          <strong>canasta de crianza del INDEC</strong>: en {U.etiqueta}, criar a un chico cuesta
          entre <strong>{formatARS(menor, 0)}</strong> (menor de 1 año) y{" "}
          <strong>{formatARS(mayor, 0)}</strong> (6 a 12 años) por mes, incluyendo bienes, servicios
          y el valor del cuidado. Ese costo lo deben <strong>los dos</strong> progenitores en
          proporción a sus ingresos (art. 666), y el trabajo de cuidado de quien convive con el hijo
          cuenta como aporte económico (art. 660).
        </p>
      </RespuestaPrimero>

      <CalculadoraCuotaAlimentaria />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuánto cuesta criar un hijo por mes en {U.etiqueta}
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Estos son los valores oficiales del INDEC para el último mes publicado, abiertos en sus
            dos componentes: los <strong>bienes y servicios</strong> que consume el chico y el{" "}
            <strong>costo del cuidado</strong> (las horas de crianza, valorizadas en plata).
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Tramo de edad</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bienes y servicios</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Cuidado</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {TRAMOS_CRIANZA.map((t) => (
                  <tr key={t.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">
                      {t.nombre}
                      <span className="block text-xs text-zinc-400">{t.escolaridad}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(U.valores[t.id].bienes, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(U.valores[t.id].cuidado, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(U.valores[t.id].total, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Fuente: INDEC, canasta de crianza de {U.etiqueta}. En doce meses, el tramo de 6 a 12 años
          pasó de {formatARS(hace12.valores["6-a-12"].total, 0)} ({hace12.etiqueta}) a{" "}
          {formatARS(U.valores["6-a-12"].total, 0)}: un <strong>{varAnual.toFixed(1)}%</strong> más.
          Por eso conviene que el acuerdo o la sentencia prevea cómo se actualiza la cuota.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La canasta de crianza, mes por mes</h2>
        <p className="text-zinc-600">
          Cada mes tiene su página con los valores de los cuatro tramos, cuánto se movió contra la
          inflación de ese mes y cuánto habría que actualizar un monto fijado entonces. Sirve para
          revisar una cuota vieja con el dato del mes en que se acordó.
        </p>
        <ArchivoMensualLinks
          items={[...MESES_CUOTA].reverse().map((m) => ({
            periodo: m.periodo,
            href: `/cuota-alimentaria/${slugDeMes(m)}`,
            etiqueta: m.etiqueta,
          }))}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo se pasa del costo de crianza a la cuota
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El costo de criar al hijo no es la cuota: es el <strong>total a cubrir</strong>. La
            cuota es la parte que le toca al progenitor que no convive con el chico. La ley da tres
            reglas para repartir:
          </p>
          <ol className="ml-5 list-decimal space-y-2">
            <li>
              <strong>Los dos deben la manutención</strong> (arts. 658 y 659): comida, vivienda,
              salud, educación, esparcimiento, vestimenta y lo necesario para aprender un oficio o
              profesión.
            </li>
            <li>
              <strong>El cuidado también es un aporte</strong> (art. 660): las tareas cotidianas de
              quien convive con el hijo tienen valor económico y se computan. Es la razón por la que
              separamos el componente de cuidado en la tabla: quien lleva el día a día ya está
              poniendo esa parte.
            </li>
            <li>
              <strong>Se reparte según la capacidad de cada uno</strong> (art. 666): el objetivo es
              que el hijo tenga un nivel de vida equivalente en los dos hogares, así que quien más
              recursos tiene aporta más. No es automáticamente mitad y mitad.
            </li>
          </ol>
          <p>
            La calculadora aplica exactamente eso: suma el costo de crianza de los hijos y lo
            prorratea por los ingresos declarados. Es un punto de partida fundado, no una sentencia.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que esta calculadora no puede saber</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Honestidad primero: la canasta del INDEC es un promedio del Gran Buenos Aires y la
            realidad de cada familia tiene cosas que ninguna tabla mide. Un juez sí las mira:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Colegio privado, obra social o prepaga, y tratamientos de salud específicos.</li>
            <li>Gastos extraordinarios (una cirugía, un viaje de egresados, útiles de inicio de clases).</li>
            <li>Vivienda: quién paga el alquiler o la hipoteca donde vive el chico.</li>
            <li>
              Ingresos no declarados, trabajo informal, o capacidad económica que no coincide con el
              recibo de sueldo.
            </li>
            <li>Deudas, otras obligaciones alimentarias e hijos de otras uniones.</li>
            <li>Hijos de 13 años o más, para los que el INDEC no publica un tramo.</li>
          </ul>
          <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Esto no es asesoramiento legal.</strong> Es una estimación con datos oficiales
            para que llegues informado a la negociación o a la consulta. Antes de firmar un acuerdo o
            presentar un reclamo, hablá con un abogado de familia. En muchas provincias hay defensorías
            y patrocinio jurídico gratuito para temas de alimentos.
          </p>
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

      <section className="space-y-2 border-t border-zinc-100 pt-6">
        <h2 className="text-sm font-semibold text-zinc-700">Fuentes oficiales</h2>
        <ul className="space-y-1 text-sm">
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
              href={CANASTA_CRIANZA_FUENTE.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              INDEC — serie mensual por tramo de edad (planilla oficial, enero 2020 en adelante)
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
              721 del Código Civil y Comercial)
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {CANASTA_CRIANZA_FUENTE.consultadoEl} · canasta de {U.etiqueta}. Mirá
          también la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 underline">
            calculadora de sueldo neto
          </Link>{" "}
          para estimar el ingreso de bolsillo que entra en esta cuenta, la{" "}
          <Link href="/inflacion" className="text-emerald-700 underline">
            calculadora de inflación
          </Link>{" "}
          para actualizar una cuota vieja, y la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
