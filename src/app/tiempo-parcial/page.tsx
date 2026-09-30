import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraTiempoParcial } from "@/components/CalculadoraTiempoParcial";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_SUSTITUTIVO,
  CAMBIOS,
  JORNADA_LEGAL_SEMANAL,
  TIEMPO_PARCIAL_FUENTES,
  TIEMPO_PARCIAL_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/tiempo-parcial";

export const metadata: Metadata = {
  title: "Media jornada: cuánto te tienen que pagar (LCT art. 92 ter, texto 2026)",
  description: `El tope de dos tercios de la jornada ya no existe: la Ley 27.802 reescribió el art. 92 ter el ${VIGENCIA_REFORMA} y también permitió las horas suplementarias, que antes estaban prohibidas. Calculá tu sueldo proporcional, las horas extra y el aporte de obra social que no se prorratea.`,
  alternates: { canonical: "/tiempo-parcial" },
  openGraph: {
    title: "Contrato a tiempo parcial: qué cambió el 6/3/2026",
    description:
      "Se cayó el tope de 2/3 de la jornada y con él la obligación de pagar jornada completa. Las horas suplementarias pasaron de prohibidas a permitidas. Cuánto te corresponde, con el texto vigente.",
    url: "https://calcular.ar/tiempo-parcial",
    images: [
      {
        url: "/og?t=Media%20jornada%3A%20cu%C3%A1nto%20te%20tienen%20que%20pagar&s=LCT%20art.%2092%20ter%20seg%C3%BAn%20la%20Ley%2027.802",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Sigue existiendo el tope de dos tercios de la jornada?",
    a: `No. Ese tope venía del texto que la Ley 26.474 le dio al artículo 92 ter en 2009 y que rigió hasta el 5 de marzo de 2026: definía el contrato a tiempo parcial como el de jornada "inferior a las dos terceras (2/3) partes de la jornada habitual de la actividad". El artículo ${ARTICULO_SUSTITUTIVO} de la Ley 27.802 sustituyó el artículo entero y ahora dice, simplemente, "inferiores a la jornada legal o convencional de la actividad". La frase "dos terceras" ya no aparece en ningún artículo del texto actualizado de la Ley de Contrato de Trabajo.`,
  },
  {
    q: "Si trabajo más de 2/3 de la jornada, ¿me tienen que pagar el sueldo completo?",
    a: "Con el texto vigente, no. Esa consecuencia estaba escrita en el mismo artículo que fijaba el tope —«si la jornada pactada supera esa proporción, el empleador deberá abonar la remuneración correspondiente a un trabajador de jornada completa»— y desapareció junto con él. Hoy, mientras las horas sean inferiores a la jornada legal o convencional de la actividad, el contrato sigue siendo a tiempo parcial y la remuneración es la proporcional. Es probablemente la afirmación desactualizada más repetida sobre este tema: casi todas las notas que circulan fueron escritas antes de marzo de 2026 o copiadas de otras que lo fueron.",
  },
  {
    q: "¿Puedo hacer horas extra si trabajo media jornada?",
    a: `Sí, desde el ${VIGENCIA_REFORMA}. El texto anterior las prohibía expresamente («no podrán realizar horas suplementarias o extraordinarias, salvo el caso del artículo 89») y castigaba el incumplimiento obligando al empleador a pagar el salario de jornada completa de ese mes. El texto vigente dice que los trabajadores a tiempo parcial "podrán realizar voluntariamente horas suplementarias respecto de la jornada reducida pactada". La palabra que importa es voluntariamente: no te las pueden imponer. El único techo es la jornada legal: por encima de las ${JORNADA_LEGAL_SEMANAL} horas semanales no se puede ir, salvo el caso del artículo 89 (auxilios por peligro grave o inminente).`,
  },
  {
    q: "¿Esas horas se pagan con recargo del 50%?",
    a: "Es la lectura literal, pero conviene saber que todavía no está resuelto. El artículo 201 de la LCT manda pagar un recargo del 50% sobre el salario habitual —100% los sábados después de las 13, domingos y feriados— a quien preste servicios en «horas suplementarias», sin exigir que se supere la jornada legal, y el nuevo 92 ter usa exactamente ese término para las horas por encima de la jornada reducida pactada. Como la reforma es de marzo de 2026, todavía no hay reglamentación ni jurisprudencia sobre las horas que van entre la jornada pactada y la legal. Por eso la calculadora muestra los dos números: con recargo y a valor simple.",
  },
  {
    q: "¿Cuánto es el mínimo que me pueden pagar?",
    a: "La proporcional. El inciso 1 dice que la remuneración «no podrá ser inferior a la proporcional que le corresponda a un trabajador a tiempo completo, establecida por ley o convenio colectivo, de la misma categoría o puesto de trabajo». Si en tu categoría la jornada completa son 48 horas y vos trabajás 24, el piso es la mitad del sueldo de convenio de esa categoría —con sus adicionales—, no el salario mínimo ni lo que arregle cada uno.",
  },
  {
    q: "¿Por qué me descuentan tanto de obra social si trabajo media jornada?",
    a: "Porque ese aporte es el único que no se prorratea, y la reforma no lo tocó. El inciso 3 dice que las cotizaciones a la seguridad social se hacen «en proporción a la remuneración del trabajador», pero el inciso 4 aclara que «los aportes y contribuciones para la obra social será la que corresponda a un trabajador de tiempo completo de la categoría». Traducido: el 11% de jubilación y el 3% de PAMI se calculan sobre lo que cobrás, y el 3% de obra social sobre el sueldo de jornada entera de tu categoría. Por eso, en proporción, a media jornada te descuentan más que a un compañero de jornada completa. La contrapartida es que la cobertura de la obra social es la misma que la de él.",
  },
  {
    q: "¿Tengo pluriempleo? ¿Qué pasa con los aportes?",
    a: "El mismo inciso 3 dice que en caso de pluriempleo las cotizaciones se unifican, y que el trabajador debe elegir entre las obras sociales a las que aporta aquella a la cual pertenecerá. O sea: se aporta por cada empleo, pero la obra social es una sola y la elegís vos.",
  },
  {
    q: "¿Puede la empresa tener a todo el personal a tiempo parcial?",
    a: "El artículo dejó ese límite en manos de los convenios colectivos, y ahí hay otro cambio silencioso: el texto anterior decía que los convenios «determinarán» el porcentaje máximo de trabajadores bajo esta modalidad, y el vigente dice que «podrán determinar». Pasó de obligación a facultad. Lo que sí agrega el texto nuevo con todas las letras es que los convenios podrán establecer la prioridad de los trabajadores a tiempo parcial para ocupar las vacantes de jornada completa que se produzcan en la empresa.",
  },
  {
    q: "¿Vale para el tiempo que trabajé antes de la reforma?",
    a: `No. La nota de vigencia del propio artículo dice "a partir de su publicación en el Boletín Oficial": rige desde el ${VIGENCIA_REFORMA} y no es retroactivo. Los períodos anteriores se siguen rigiendo por el texto de la Ley 26.474, con su tope de dos tercios y su sanción — y eso importa mucho para un reclamo por horas trabajadas antes de esa fecha.`,
  },
  {
    q: "¿Se aplica a empleadas de casas particulares?",
    a: "No. El artículo 92 ter es de la Ley de Contrato de Trabajo, que es el régimen general. El personal de casas particulares tiene régimen propio (Ley 26.844) con su escala por horas, y lo mismo pasa con el trabajo agrario y la construcción.",
  },
];

export default function TiempoParcialPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de sueldo a tiempo parcial (media jornada)",
        url: "https://calcular.ar/tiempo-parcial",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Contrato a tiempo parcial: qué te tienen que pagar con el art. 92 ter reformado",
        descripcion:
          "La Ley 27.802 sustituyó el art. 92 ter de la LCT: cayó el tope de 2/3 de la jornada y con él la obligación de pagar jornada completa, y las horas suplementarias pasaron de prohibidas a permitidas. Sueldo proporcional, horas extra y el aporte de obra social que no se prorratea.",
        url: "/tiempo-parcial",
        modificado: TIEMPO_PARCIAL_FUENTES.consultadoEl,
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
          Trabajo a tiempo parcial: cuánto te tienen que pagar desde el {VIGENCIA_REFORMA}
        </h1>
        <p className="text-zinc-600">
          Durante diecisiete años la respuesta a «¿hasta cuántas horas es media jornada?» fue{" "}
          <em>dos tercios de la jornada de la actividad</em>, y si se pasaba había que pagar el
          sueldo entero. La Ley 27.802 reescribió el artículo 92 ter completo: ese tope ya no está,
          la sanción tampoco, y las horas suplementarias pasaron de prohibidas a permitidas. Acá
          está el texto vigente, al lado del anterior, y el cálculo de lo que te corresponde hoy.
        </p>
      </header>

      <RespuestaPrimero actualizado={TIEMPO_PARCIAL_FUENTES.consultadoEl}>
        <p>
          <strong>
            El tope de los dos tercios ya no existe y las horas suplementarias ahora están
            permitidas.
          </strong>{" "}
          Desde el {VIGENCIA_REFORMA}, el contrato a tiempo parcial es el de jornada «inferior a la
          jornada legal o convencional de la actividad», sin proporción máxima; superar los dos
          tercios ya <strong>no</strong> obliga al empleador a pagar la jornada completa. A cambio,
          el trabajador puede hacer horas suplementarias voluntarias hasta la jornada legal de{" "}
          {JORNADA_LEGAL_SEMANAL} horas semanales. Lo que no cambió: el sueldo no puede ser inferior
          a la <strong>proporcional</strong> del trabajador de tiempo completo de la misma categoría,
          y el aporte de obra social se calcula como si trabajaras la jornada entera.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te corresponde</h2>
        <p className="text-sm text-zinc-600">
          Cargá el sueldo de jornada completa de tu categoría y tus horas. La calculadora devuelve el
          piso legal del inciso 1, las horas suplementarias con y sin recargo, y el descuento real —
          con el aporte de obra social que no se prorratea.
        </p>
        <CalculadoraTiempoParcial />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué cambió, punto por punto</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="pb-2 font-semibold">Tema</th>
                <th className="pb-2 font-semibold">
                  Hasta el 5/3/2026
                  <span className="block text-[10px] font-normal normal-case tracking-normal">
                    texto de la Ley 26.474
                  </span>
                </th>
                <th className="pb-2 font-semibold">
                  Texto vigente
                  <span className="block text-[10px] font-normal normal-case tracking-normal">
                    art. {ARTICULO_SUSTITUTIVO} de la Ley 27.802
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {CAMBIOS.map((c) => (
                <tr key={c.tema} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-medium text-zinc-800">{c.tema}</td>
                  <td className="py-3 pr-3 text-zinc-500">{c.antes}</td>
                  <td
                    className={`py-3 ${c.peor ? "text-rose-800" : "text-emerald-800"}`}
                  >
                    {c.ahora}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500">
          En rojo, los cambios que dejan al trabajador en peor posición que antes; en verde, los que
          amplían lo que puede hacer.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 ter, inc. 1 — texto vigente
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.vigenteInc1}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{TIEMPO_PARCIAL_TEXTOS.vigenteNota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 ter, inc. 2 — horas suplementarias
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.vigenteInc2}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              El artículo 89 al que remite es el de los auxilios extraordinarios: «{TIEMPO_PARCIAL_TEXTOS.art89}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto ANTERIOR, que es el que sigue circulando (Ley 26.474, art. 1º)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.anteriorInc1}»
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.anteriorInc2}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Rigió desde el 23 de enero de 2009 hasta el 5 de marzo de 2026. Si una nota, un modelo
              de contrato o un liquidador todavía menciona «las dos terceras partes», está aplicando
              este texto.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 ter, inc. 4 — el aporte que no se prorratea
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.vigenteInc4}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              La reforma no tocó este inciso. Es la razón de que el descuento de obra social pese, en
              proporción, más en un contrato de media jornada que en uno de jornada completa.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 201 — recargo de las horas suplementarias
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TIEMPO_PARCIAL_TEXTOS.art201}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Y la jornada legal a la que el inciso 2 le pone el techo sale del art. 196: «
              {TIEMPO_PARCIAL_TEXTOS.art196}»
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Otras páginas de la misma reforma:{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            propinas y remuneración
          </Link>
          ,{" "}
          <Link
            href="/certificado-de-trabajo"
            className="font-medium text-emerald-700 hover:underline"
          >
            el certificado de trabajo del art. 80
          </Link>{" "}
          y{" "}
          <Link
            href="/actualizacion-creditos-laborales"
            className="font-medium text-emerald-700 hover:underline"
          >
            la actualización de créditos laborales del art. 276
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {TIEMPO_PARCIAL_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página aplica el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG, comparado contra el texto original de la ley anterior, no un resumen de prensa. Es
          informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          liquidación. Consultada el {TIEMPO_PARCIAL_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
