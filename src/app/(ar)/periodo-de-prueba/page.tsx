import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPeriodoPrueba } from "@/components/CalculadoraPeriodoPrueba";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import {
  ARTICULO_SUSTITUTIVO_231,
  CONCEPTOS,
  PERIODO_PRUEBA,
  PERIODO_PRUEBA_FUENTES,
  PERIODO_PRUEBA_TEXTOS,
  PREAVISO_ANTERIOR_DIAS,
  VIGENCIA_REFORMA,
} from "@/data/periodo-prueba";

export const metadata: Metadata = {
  title: "Despido en período de prueba: qué te tienen que pagar",
  description: `Desde el ${VIGENCIA_REFORMA} ya no hay ${PREAVISO_ANTERIOR_DIAS} días de preaviso en el período de prueba. Calculá la liquidación final con aguinaldo y vacaciones proporcionales.`,
  alternates: { canonical: "/periodo-de-prueba" },
  openGraph: {
    ...openGraphDe({
      ruta: "/periodo-de-prueba",
      titulo: "Despido en período de prueba",
      bajada: "El preaviso de 15 días ya no existe (Ley 27.802)",
    }),
    title: "Período de prueba: los 15 días de preaviso ya no existen",
    description:
      "Casi toda la web sigue diciendo que en el período de prueba te tienen que preavisar 15 días. Desde el 6/3/2026 el art. 231 dice lo contrario. Qué se cobra y qué no, con el texto nuevo al lado del anterior.",
  },
};

const faqs = [
  {
    q: "¿Me tienen que preavisar 15 días si me despiden en el período de prueba?",
    a: `Ya no, y es el dato que casi toda la web sigue publicando mal. Hasta el 5 de marzo de 2026, el inciso b) del artículo 231 de la LCT decía «por el empleador, de QUINCE (15) días cuando el trabajador se encontrare en período de prueba». El artículo ${ARTICULO_SUSTITUTIVO_231} de la Ley 27.802 reescribió ese inciso. Sacó el período de prueba de la escala y le agregó al final una oración que dice justo lo contrario: «Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso». Desde el ${VIGENCIA_REFORMA}, son cero días y no hay indemnización por falta de preaviso.`,
  },
  {
    q: "Entonces, ¿no me corresponde nada?",
    a: "Sí te corresponde algo. Ese es el otro error, el de siempre. El artículo 92 bis dice que «el período de prueba se computará como tiempo de servicio a todos los efectos laborales y de la seguridad social», y los artículos 123 y 156 hablan de despido «por cualquier causa». Cobrás los días trabajados del mes, el aguinaldo proporcional, las vacaciones proporcionales que no te tomaste y el aguinaldo sobre esas vacaciones. Lo que no cobrás es la indemnización por antigüedad, el preaviso y la integración del mes de despido.",
  },
  {
    q: "Si me despidieron antes del 6 de marzo de 2026, ¿cobro los 15 días?",
    a: `Sí. El propio artículo dice que rige «a partir de su publicación en el Boletín Oficial»: la reforma no va para atrás. Si te despidieron hasta el 5 de marzo de 2026, vale el texto de la Ley 25.877, con sus ${PREAVISO_ANTERIOR_DIAS} días de preaviso y la indemnización del artículo 232 si no te lo dieron. La calculadora usa el texto que corresponde según la fecha que pongas.`,
  },
  {
    q: "¿Cuánto dura el período de prueba en 2026?",
    a: `${PERIODO_PRUEBA.mesesBase} meses. Lo fijó la Ley 27.742 en julio de 2024 al cambiar el artículo 92 bis, y la reforma de 2026 no lo tocó: cambió el preaviso, no la duración. Los convenios colectivos lo pueden alargar hasta 8 meses en empresas de 6 a 100 trabajadores, y hasta 1 año en empresas de hasta 5. Es algo que puede hacer el convenio: si el tuyo no dice nada, son ${PERIODO_PRUEBA.mesesBase} meses.`,
  },
  {
    q: "¿Me corresponde la integración del mes de despido?",
    a: "No, y no es algo nuevo de 2026. El artículo 233 lo excluye desde la reforma de 2004: «La integración del mes de despido no procederá cuando la extinción se produzca durante el período de prueba establecido en el artículo 92 bis». Si te despiden un 14, cobrás hasta el 14, no hasta fin de mes.",
  },
  {
    q: "¿Cobro vacaciones si trabajé sólo tres meses?",
    a: "Sí, la parte proporcional. Si trabajaste menos de la mitad de los días hábiles del año (en el período de prueba siempre pasa), se aplica el artículo 153: un día de descanso por cada 20 días trabajados. Esos días se pagan al valor del artículo 155 (sueldo dividido 25, no 30). Y como no te los tomaste, se cobran como indemnización del artículo 156. Ojo con la cuenta: si trabajaste menos de 20 días hábiles, todavía no llegaste al primer día.",
  },
  {
    q: "¿Y si no me registraron desde el primer día?",
    a: "Cambia todo. El mismo artículo 92 bis dice que «el empleador deberá registrar al trabajador desde la fecha de inicio de la relación; caso contrario, se considerará que ha renunciado al período de prueba». Sin período de prueba, el despido se paga como uno común: con indemnización por antigüedad del artículo 245 y con preaviso. Pasa lo mismo si ese empleador ya te había contratado antes con período de prueba: no se puede usar dos veces con la misma persona.",
  },
  {
    q: "¿Pueden usar el período de prueba para no efectivizar a nadie?",
    a: "El artículo lo prohíbe con todas las letras: «se considerará abusiva la conducta del empleador que contratare sucesivamente a distintos trabajadores para un mismo puesto de trabajo de naturaleza permanente», y eso tiene sanciones previstas en las leyes de trabajo. Es una falta del empleador, no un derecho automático a indemnización para vos: se denuncia ante la autoridad laboral.",
  },
  {
    q: "Durante el período de prueba, ¿tengo obra social y ART?",
    a: "Sí. El artículo 92 bis obliga a pagar los aportes y contribuciones «con los beneficios establecidos en cada caso», y reconoce el derecho a la cobertura por accidente o enfermedad del trabajo. También por enfermedad inculpable (la que no tiene que ver con el trabajo), pero con un límite: esa cobertura «perdurará exclusivamente hasta la finalización del período de prueba si el empleador rescindiere el contrato durante ese lapso».",
  },
  {
    q: "¿Puedo renunciar yo durante el período de prueba?",
    a: `Sí, pero ojo con una diferencia. El artículo 92 bis dice que «cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa». Pero la reforma no cambió el inciso a) del artículo 231, el del preaviso que da el trabajador (${PREAVISO_ANTERIOR_DIAS} días). El artículo ${ARTICULO_SUSTITUTIVO_231} de la Ley 27.802 solo tocó el inciso b), el del empleador. La oración que saca el preaviso en período de prueba se agregó al final del inciso b).`,
  },
];

export default function PeriodoDePruebaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de liquidación final en período de prueba",
        url: "https://calcular.ar/periodo-de-prueba",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Despido en período de prueba: qué te tienen que pagar",
        descripcion:
          "El art. 48 de la Ley 27.802 eliminó el preaviso de 15 días en período de prueba el 6/3/2026. Qué se cobra igual (aguinaldo y vacaciones proporcionales, porque cuenta como tiempo trabajado) y qué no, con el texto nuevo al lado del anterior.",
        url: "/periodo-de-prueba",
        modificado: PERIODO_PRUEBA_FUENTES.consultadoEl,
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
          Despido en período de prueba: qué te tienen que pagar
        </h1>
        <p className="text-zinc-600">
          Durante veintidós años la respuesta fue la misma:{" "}
          <em>en el período de prueba te tienen que preavisar {PREAVISO_ANTERIOR_DIAS} días</em>. El{" "}
          {VIGENCIA_REFORMA} eso dejó de ser cierto. El artículo {ARTICULO_SUSTITUTIVO_231} de la Ley
          27.802 lo borró del artículo 231 y puso lo contrario. Acá tenés los dos textos lado a lado
          y la liquidación final que te toca según la fecha en que terminó tu contrato.
        </p>
      </header>

      <RespuestaPrimero actualizado={PERIODO_PRUEBA_FUENTES.consultadoEl}>
        <p>
          <strong>
            El preaviso de {PREAVISO_ANTERIOR_DIAS} días en período de prueba ya no existe.
          </strong>{" "}
          Desde el {VIGENCIA_REFORMA}, el art. 231 inc. b) de la LCT termina diciendo: «Para el
          supuesto en que el trabajador se encuentre en período de prueba no se requerirá la
          obligación de preaviso». Pero <strong>no es cierto que no te corresponda nada</strong>. El
          art. 92 bis cuenta el período de prueba como tiempo trabajado para todo. Así que cobrás
          los días trabajados, el <strong>aguinaldo proporcional</strong>, las{" "}
          <strong>vacaciones proporcionales que no te tomaste</strong> y el aguinaldo sobre esas
          vacaciones. Lo que no cobrás: indemnización por antigüedad, preaviso ni integración del
          mes.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Liquidación final por despido en período de prueba
        </h2>
        <p className="text-sm text-zinc-600">
          Poné el sueldo y las dos fechas. La fecha de salida decide qué texto del art. 231 se usa.
          La calculadora aplica el que corresponde y te muestra cuánto habría sido con el otro.
        </p>
        <CalculadoraPeriodoPrueba />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué se cobra y qué no</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="pb-2 font-semibold">Concepto</th>
                <th className="pb-2 font-semibold">¿Corresponde?</th>
                <th className="pb-2 font-semibold">Por qué</th>
              </tr>
            </thead>
            <tbody>
              {CONCEPTOS.map((c) => (
                <tr key={c.concepto} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-medium text-zinc-800">
                    {c.concepto}
                    <span className="block text-xs font-normal text-zinc-500">{c.articulo}</span>
                  </td>
                  <td
                    className={`py-3 pr-3 font-semibold ${
                      c.corresponde ? "text-emerald-800" : "text-rose-800"
                    }`}
                  >
                    {c.corresponde ? "Sí" : "No"}
                  </td>
                  <td className="py-3 text-zinc-600">{c.detalle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 231: texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art231Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{PERIODO_PRUEBA_TEXTOS.notaVigencia231}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto ANTERIOR, que es el que sigue circulando (Ley 25.877, art. 3º)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art231Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Rigió desde el 19 de marzo de 2004 hasta el 5 de marzo de 2026. Si una nota, un
              liquidador o un modelo de telegrama todavía habla de «15 días de preaviso en el período
              de prueba», está usando este texto. Y sigue siendo el correcto para los despidos de
              antes del {VIGENCIA_REFORMA}: la reforma no va para atrás.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 bis: el que dice que el período de prueba SÍ cuenta
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art92bisComputo}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Por eso el aguinaldo y las vacaciones proporcionales se cobran igual. Y la duración,
              en el mismo artículo: «{PERIODO_PRUEBA_TEXTOS.art92bisDuracion}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, arts. 232 y 233: la indemnización por falta de preaviso y la integración del mes
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{PERIODO_PRUEBA_TEXTOS.art232}»</p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art233Integracion}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              El art. 232 no cambió: sigue mandando pagar el sueldo de «los plazos señalados en el
              artículo 231». Lo que cambió es que ahora, en período de prueba, ese plazo es cero.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Los dos límites al uso del período de prueba
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art92bisUnaVez}»
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art92bisAbuso}»
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
          Si tu contrato ya había pasado el período de prueba, lo que te toca se calcula en{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de indemnización por despido
          </Link>
          . Si fuiste vos el que se fue, usá la{" "}
          <Link href="/renuncia" className="font-medium text-emerald-700 hover:underline">
            calculadora de liquidación final por renuncia
          </Link>
          . Otras páginas de la misma reforma:{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            horas extras y banco de horas
          </Link>{" "}
          y{" "}
          <Link href="/reingreso" className="font-medium text-emerald-700 hover:underline">
            volver a trabajar con el mismo empleador
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PERIODO_PRUEBA_FUENTES.lista.map((f) => (
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
          InfoLEG, comparado con el texto original de la ley anterior (no con un resumen de prensa).
          Es informativa: no reemplaza el consejo de un profesional ni una liquidación. Consultada
          el {PERIODO_PRUEBA_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
