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
  title: "Media jornada 2026: cuánto te tienen que pagar",
  description:
    "La Ley 27.802 eliminó el tope de dos tercios del art. 92 ter y permitió horas suplementarias. Calculá tu sueldo proporcional, extras y obra social.",
  alternates: { canonical: "/tiempo-parcial" },
  openGraph: {
    title: "Contrato a tiempo parcial: qué cambió el 6/3/2026",
    description:
      "Se cayó el tope de 2/3 de la jornada y con él la obligación de pagar jornada completa. Las horas extra pasaron de prohibidas a permitidas. Cuánto te corresponde, con el texto vigente.",
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
    a: `No. Ese tope venía del texto que la Ley 26.474 le dio al artículo 92 ter en 2009, y rigió hasta el 5 de marzo de 2026. Definía el contrato a tiempo parcial como el de jornada "inferior a las dos terceras (2/3) partes de la jornada habitual de la actividad". El artículo ${ARTICULO_SUSTITUTIVO} de la Ley 27.802 reescribió el artículo entero y ahora dice, simplemente, "inferiores a la jornada legal o convencional de la actividad". La frase "dos terceras" ya no aparece en ningún artículo de la Ley de Contrato de Trabajo actualizada.`,
  },
  {
    q: "Si trabajo más de 2/3 de la jornada, ¿me tienen que pagar el sueldo completo?",
    a: "Con el texto vigente, no. Esa regla estaba en el mismo artículo que fijaba el tope («si la jornada pactada supera esa proporción, el empleador deberá abonar la remuneración correspondiente a un trabajador de jornada completa») y desapareció con él. Hoy, mientras trabajes menos horas que la jornada legal o convencional de tu actividad, el contrato sigue siendo a tiempo parcial y cobrás la proporción. Es probablemente el dato viejo más repetido sobre este tema: casi todas las notas que circulan se escribieron antes de marzo de 2026 o se copiaron de otras que sí.",
  },
  {
    q: "¿Puedo hacer horas extra si trabajo media jornada?",
    a: `Sí, desde el ${VIGENCIA_REFORMA}. El texto anterior las prohibía («no podrán realizar horas suplementarias o extraordinarias, salvo el caso del artículo 89») y, si no se cumplía, obligaba al empleador a pagar el sueldo de jornada completa de ese mes. El texto vigente dice que los trabajadores a tiempo parcial "podrán realizar voluntariamente horas suplementarias respecto de la jornada reducida pactada". La palabra que importa es voluntariamente: no te las pueden imponer. El único techo es la jornada legal: no se puede pasar de ${JORNADA_LEGAL_SEMANAL} horas por semana, salvo el caso del artículo 89 (auxilios por peligro grave o inminente).`,
  },
  {
    q: "¿Esas horas se pagan con recargo del 50%?",
    a: "Es lo que dice la letra de la ley, pero todavía no está resuelto. El artículo 201 de la LCT manda pagar un 50% más sobre el sueldo habitual (100% los sábados después de las 13, domingos y feriados) a quien trabaje «horas suplementarias», sin exigir que se pase la jornada legal. Y el nuevo 92 ter usa justo ese término para las horas por encima de la jornada reducida pactada. Como la reforma es de marzo de 2026, todavía no hay reglamentación ni fallos sobre las horas que quedan entre la jornada pactada y la legal. Por eso la calculadora muestra los dos números: con recargo y sin recargo.",
  },
  {
    q: "¿Cuánto es el mínimo que me pueden pagar?",
    a: "La proporción. El inciso 1 dice que el sueldo «no podrá ser inferior a la proporcional que le corresponda a un trabajador a tiempo completo, establecida por ley o convenio colectivo, de la misma categoría o puesto de trabajo». Si en tu categoría la jornada completa es de 48 horas y vos trabajás 24, el piso es la mitad del sueldo de convenio de esa categoría (con sus adicionales), no el salario mínimo ni lo que se arregle de palabra.",
  },
  {
    q: "¿Por qué me descuentan tanto de obra social si trabajo media jornada?",
    a: "Porque ese aporte es el único que no se reduce en proporción, y la reforma no lo tocó. El inciso 3 dice que los aportes se hacen «en proporción a la remuneración del trabajador», pero el inciso 4 aclara que «los aportes y contribuciones para la obra social será la que corresponda a un trabajador de tiempo completo de la categoría». En criollo: el 11% de jubilación y el 3% de PAMI se calculan sobre lo que cobrás, y el 3% de obra social sobre el sueldo de jornada completa de tu categoría. Por eso, en proporción, a media jornada te descuentan más que a un compañero de jornada completa. A cambio, tenés la misma cobertura de obra social que él.",
  },
  {
    q: "¿Tengo pluriempleo? ¿Qué pasa con los aportes?",
    a: "El mismo inciso 3 dice que con varios empleos los aportes se unifican, y que el trabajador elige a cuál de las obras sociales a las que aporta va a pertenecer. O sea: se aporta por cada empleo, pero la obra social es una sola y la elegís vos.",
  },
  {
    q: "¿Puede la empresa tener a todo el personal a tiempo parcial?",
    a: "El artículo deja ese límite en manos de los convenios colectivos, y ahí hay otro cambio silencioso. El texto anterior decía que los convenios «determinarán» el porcentaje máximo de trabajadores con esta modalidad; el vigente dice que «podrán determinar». Pasó de obligación a opción. Lo que sí suma el texto nuevo, con todas las letras, es que los convenios pueden darles prioridad a los trabajadores a tiempo parcial para ocupar las vacantes de jornada completa que se abran en la empresa.",
  },
  {
    q: "¿Vale para el tiempo que trabajé antes de la reforma?",
    a: `No. La nota de vigencia del artículo dice "a partir de su publicación en el Boletín Oficial": rige desde el ${VIGENCIA_REFORMA} y no es retroactivo. Los períodos anteriores se siguen rigiendo por el texto de la Ley 26.474, con su tope de dos tercios y su sanción. Eso pesa mucho en un reclamo por horas trabajadas antes de esa fecha.`,
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
          "La Ley 27.802 reescribió el art. 92 ter de la LCT: cayó el tope de 2/3 de la jornada y con él la obligación de pagar jornada completa, y las horas suplementarias pasaron de prohibidas a permitidas. Sueldo proporcional, horas extra y el aporte de obra social que no se reduce en proporción.",
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
          <em>dos tercios de la jornada de la actividad</em>, y si te pasabas te tenían que pagar el
          sueldo entero. La Ley 27.802 reescribió el artículo 92 ter completo: ese tope ya no está,
          la sanción tampoco, y las horas extra pasaron de prohibidas a permitidas. Acá tenés el
          texto vigente al lado del anterior, y la cuenta de lo que te corresponde hoy.
        </p>
      </header>

      <RespuestaPrimero actualizado={TIEMPO_PARCIAL_FUENTES.consultadoEl}>
        <p>
          <strong>
            El tope de los dos tercios ya no existe y las horas extra ahora están permitidas.
          </strong>{" "}
          Desde el {VIGENCIA_REFORMA}, el contrato a tiempo parcial es el de jornada «inferior a la
          jornada legal o convencional de la actividad», sin proporción máxima. Pasar los dos
          tercios ya <strong>no</strong> obliga al empleador a pagar la jornada completa. A cambio,
          podés hacer horas extra voluntarias hasta la jornada legal de {JORNADA_LEGAL_SEMANAL}{" "}
          horas semanales. Lo que no cambió: tu sueldo no puede ser menor que la{" "}
          <strong>proporción</strong> del de jornada completa de tu categoría, y el aporte de obra
          social se calcula como si trabajaras la jornada entera.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te corresponde</h2>
        <p className="text-sm text-zinc-600">
          Cargá el sueldo de jornada completa de tu categoría y tus horas. La calculadora te da el
          piso legal del inciso 1, las horas extra con y sin recargo, y el descuento real (con el
          aporte de obra social que no se reduce en proporción). Para comparar con el piso general,
          mirá el{" "}
          <Link href="/salario-minimo" className="font-medium text-emerald-700 hover:underline">
            salario mínimo proporcional a tus horas
          </Link>
          .
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
          En rojo, los cambios que dejan al trabajador peor que antes; en verde, los que amplían lo
          que puede hacer.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la ley</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 ter, inc. 1 (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.vigenteInc1}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{TIEMPO_PARCIAL_TEXTOS.vigenteNota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 ter, inc. 2: horas suplementarias
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
              El texto anterior, que es el que sigue circulando (Ley 26.474, art. 1º)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.anteriorInc1}»
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.anteriorInc2}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Rigió desde el 23 de enero de 2009 hasta el 5 de marzo de 2026. Si una nota, un modelo
              de contrato o un sistema de liquidación todavía habla de «las dos terceras partes»,
              está usando este texto.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 ter, inc. 4: el aporte que no se reduce en proporción
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TIEMPO_PARCIAL_TEXTOS.vigenteInc4}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              La reforma no tocó este inciso. Por eso el descuento de obra social pesa, en
              proporción, más en un contrato de media jornada que en uno de jornada completa.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 201: recargo de las horas suplementarias
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TIEMPO_PARCIAL_TEXTOS.art201}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Y la jornada legal que el inciso 2 pone como techo sale del art. 196: «
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
          Para calcular las horas extra con su recargo (y el banco de horas), está{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            la calculadora de horas extras
          </Link>
          . Otras páginas de la misma reforma:{" "}
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página usa el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG, comparado con el texto original de la ley anterior, no un resumen de prensa. Es
          una guía informativa: no reemplaza el consejo de un profesional ni una liquidación.
          Consultada el {TIEMPO_PARCIAL_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
