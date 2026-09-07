import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPeriodoPrueba } from "@/components/CalculadoraPeriodoPrueba";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
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
  title: "Despido en período de prueba: qué te tienen que pagar (texto 2026)",
  description: `Los ${PREAVISO_ANTERIOR_DIAS} días de preaviso en período de prueba dejaron de existir el ${VIGENCIA_REFORMA}: el art. 48 de la Ley 27.802 los borró del art. 231 de la LCT. Calculá la liquidación final real — aguinaldo y vacaciones proporcionales se siguen cobrando.`,
  alternates: { canonical: "/periodo-de-prueba" },
  openGraph: {
    title: "Período de prueba: los 15 días de preaviso ya no existen",
    description:
      "Casi toda la web sigue publicando que en el período de prueba te tienen que preavisar 15 días. Desde el 6/3/2026 el art. 231 dice lo contrario. Qué se cobra y qué no, con el texto vigente al lado del anterior.",
    url: "https://calcular.ar/periodo-de-prueba",
    images: [
      {
        url: "/og?t=Despido%20en%20per%C3%ADodo%20de%20prueba&s=El%20preaviso%20de%2015%20d%C3%ADas%20ya%20no%20existe%20(Ley%2027.802)",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Me tienen que preavisar 15 días si me despiden en el período de prueba?",
    a: `Ya no, y es el dato que casi toda la web sigue publicando mal. Hasta el 5 de marzo de 2026, el inciso b) del artículo 231 de la LCT decía «por el empleador, de QUINCE (15) días cuando el trabajador se encontrare en período de prueba». El artículo ${ARTICULO_SUSTITUTIVO_231} de la Ley 27.802 reescribió ese inciso: sacó la mención al período de prueba de la escala y le agregó una oración final que dice exactamente lo contrario — «Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso». Desde el ${VIGENCIA_REFORMA}, cero días y cero indemnización sustitutiva.`,
  },
  {
    q: "Entonces, ¿no me corresponde nada?",
    a: "No: eso es el otro error, el de siempre. El artículo 92 bis dice que «el período de prueba se computará como tiempo de servicio a todos los efectos laborales y de la seguridad social», y los artículos 123 y 156 hablan de extinción «por cualquier causa». Se cobran los días trabajados del mes, el aguinaldo proporcional, las vacaciones proporcionales no gozadas y el aguinaldo sobre esas vacaciones. Lo que no se cobra es la indemnización por antigüedad, el preaviso y la integración del mes de despido.",
  },
  {
    q: "Si me despidieron antes del 6 de marzo de 2026, ¿cobro los 15 días?",
    a: `Sí. La nota de vigencia del propio artículo dice «a partir de su publicación en el Boletín Oficial»: la reforma no es retroactiva. Para las extinciones ocurridas hasta el 5 de marzo de 2026 rige el texto de la Ley 25.877, con sus ${PREAVISO_ANTERIOR_DIAS} días de preaviso y la indemnización sustitutiva del artículo 232 si no te lo dieron. La calculadora aplica el texto que corresponde según la fecha que cargues.`,
  },
  {
    q: "¿Cuánto dura el período de prueba en 2026?",
    a: `${PERIODO_PRUEBA.mesesBase} meses. Eso lo fijó la Ley 27.742 en julio de 2024 al sustituir el artículo 92 bis, y la reforma de 2026 no lo tocó: lo que cambió es el preaviso, no la duración. Los convenios colectivos pueden ampliarlo hasta 8 meses en empresas de 6 a 100 trabajadores y hasta 1 año en empresas de hasta 5. Es una facultad del convenio: si tu CCT no dice nada, son ${PERIODO_PRUEBA.mesesBase} meses.`,
  },
  {
    q: "¿Me corresponde la integración del mes de despido?",
    a: "No, y esto no es novedad de 2026. El artículo 233 lo excluye expresamente desde la reforma de 2004: «La integración del mes de despido no procederá cuando la extinción se produzca durante el período de prueba establecido en el artículo 92 bis». Si te despiden un 14, cobrás hasta el 14, no hasta fin de mes.",
  },
  {
    q: "¿Cobro vacaciones si trabajé sólo tres meses?",
    a: "Sí, proporcionales. Con menos de la mitad de los días hábiles del año trabajados —que dentro del período de prueba es siempre el caso— se aplica el artículo 153: un día de descanso por cada 20 días de trabajo efectivo. Esos días se pagan al valor del artículo 155 (sueldo mensual dividido 25, no 30), y como no se gozaron se cobran como indemnización del artículo 156. Ojo con la cuenta: si trabajaste menos de 20 días hábiles, todavía no se llegó al primer día.",
  },
  {
    q: "¿Y si no me registraron desde el primer día?",
    a: "Cambia todo. El propio artículo 92 bis dice que «el empleador deberá registrar al trabajador desde la fecha de inicio de la relación; caso contrario, se considerará que ha renunciado al período de prueba». Renunciado el período de prueba, el despido se liquida como uno común: con indemnización por antigüedad del artículo 245 y con preaviso. Lo mismo pasa si ese empleador ya te había contratado antes usando el período de prueba: no se puede usar dos veces con el mismo trabajador.",
  },
  {
    q: "¿Pueden usar el período de prueba para no efectivizar a nadie?",
    a: "El artículo lo prohíbe y lo dice con nombre propio: «se considerará abusiva la conducta del empleador que contratare sucesivamente a distintos trabajadores para un mismo puesto de trabajo de naturaleza permanente», y eso es pasible de las sanciones de los regímenes de infracciones a las leyes de trabajo. Es una conducta sancionable del empleador, no un derecho automático a indemnización del trabajador: se denuncia ante la autoridad laboral.",
  },
  {
    q: "Durante el período de prueba, ¿tengo obra social y ART?",
    a: "Sí. El artículo 92 bis obliga a las partes al pago de los aportes y contribuciones a la seguridad social «con los beneficios establecidos en cada caso», y reconoce expresamente el derecho a las prestaciones por accidente o enfermedad del trabajo. También por enfermedad inculpable, aunque con un límite: esa cobertura «perdurará exclusivamente hasta la finalización del período de prueba si el empleador rescindiere el contrato durante ese lapso».",
  },
  {
    q: "¿Puedo renunciar yo durante el período de prueba?",
    a: `Sí, y ahí hay una asimetría que conviene ver. El artículo 92 bis dice que «cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa». Pero el inciso a) del artículo 231 —el del preaviso que da el trabajador, ${PREAVISO_ANTERIOR_DIAS} días— no fue modificado por la reforma: el artículo ${ARTICULO_SUSTITUTIVO_231} de la Ley 27.802 sólo tocó el inciso b), el del empleador. La oración final que exime del preaviso en período de prueba se agregó al final del inciso b).`,
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
        titulo: "Despido en período de prueba: qué se cobra con el texto vigente",
        descripcion:
          "El art. 48 de la Ley 27.802 eliminó el preaviso de 15 días en período de prueba el 6/3/2026. Qué se cobra igual (aguinaldo y vacaciones proporcionales, que se computan como tiempo de servicio) y qué no, con el texto vigente al lado del anterior.",
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
          {VIGENCIA_REFORMA} dejó de ser cierta — el artículo {ARTICULO_SUSTITUTIVO_231} de la Ley
          27.802 borró esa mención del artículo 231 y la reemplazó por su contraria. Acá están los
          dos textos, uno al lado del otro, y la liquidación final que corresponde según la fecha en
          que terminó tu contrato.
        </p>
      </header>

      <RespuestaPrimero actualizado={PERIODO_PRUEBA_FUENTES.consultadoEl}>
        <p>
          <strong>
            El preaviso de {PREAVISO_ANTERIOR_DIAS} días en período de prueba ya no existe.
          </strong>{" "}
          Desde el {VIGENCIA_REFORMA}, el art. 231 inc. b) de la LCT termina diciendo: «Para el
          supuesto en que el trabajador se encuentre en período de prueba no se requerirá la
          obligación de preaviso». Pero <strong>no es cierto que no te corresponda nada</strong>: el
          art. 92 bis computa el período de prueba como tiempo de servicio a todos los efectos, así
          que se cobran los días trabajados, el <strong>aguinaldo proporcional</strong>, las{" "}
          <strong>vacaciones proporcionales no gozadas</strong> y el aguinaldo sobre esas vacaciones.
          Lo que no se cobra: indemnización por antigüedad, preaviso e integración del mes.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu liquidación final</h2>
        <p className="text-sm text-zinc-600">
          Cargá el sueldo y las dos fechas. La fecha de salida decide qué texto del art. 231 se
          aplica: la calculadora usa el que corresponde y te muestra cuánto habría sido con el otro.
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
              LCT, art. 231 — texto vigente desde el {VIGENCIA_REFORMA}
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
              de prueba», está aplicando este texto. Y sigue siendo el correcto para las extinciones
              anteriores al {VIGENCIA_REFORMA}: la reforma no es retroactiva.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 92 bis — el que dice que el período de prueba SÍ cuenta
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art92bisComputo}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Es la razón por la que el aguinaldo y las vacaciones proporcionales se cobran igual. Y
              la duración, en el mismo artículo: «{PERIODO_PRUEBA_TEXTOS.art92bisDuracion}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, arts. 232 y 233 — la sustitutiva y la integración del mes
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{PERIODO_PRUEBA_TEXTOS.art232}»</p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{PERIODO_PRUEBA_TEXTOS.art233Integracion}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              El art. 232 no fue modificado: sigue mandando pagar la remuneración de «los plazos
              señalados en el artículo 231». Lo que cambió es que ahora, en período de prueba, ese
              plazo es cero.
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
            <details key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Si tu contrato ya salió del período de prueba, lo que corresponde se calcula en{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de indemnización por despido
          </Link>
          . Otras páginas de la misma reforma:{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            horas extras y banco de horas
          </Link>{" "}
          y{" "}
          <Link href="/reingreso" className="font-medium text-emerald-700 hover:underline">
            el reingreso al mismo empleador
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página aplica el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG, comparado contra el texto original de la ley anterior, no un resumen de prensa. Es
          informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          liquidación. Consultada el {PERIODO_PRUEBA_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
