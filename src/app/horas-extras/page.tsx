import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraHorasExtras } from "@/components/CalculadoraHorasExtras";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_SUSTITUTIVO_197BIS,
  ARTICULO_SUSTITUTIVO_198,
  CAMBIOS,
  DESCANSOS_MINIMOS,
  HORAS_EXTRAS_FUENTES,
  HORAS_EXTRAS_TEXTOS,
  REQUISITOS_ACUERDO,
  TOPES_DECRETO_484,
  VIGENCIA_REFORMA,
} from "@/data/horas-extras";

export const metadata: Metadata = {
  title: "Horas extras 2026: cuánto se cobra y cuándo te las pueden pagar con francos",
  description: `El recargo del 50% y del 100% no cambió, pero desde el ${VIGENCIA_REFORMA} el banco de horas se puede pactar uno a uno con el empleador: hasta esa fecha sólo podía nacer de un convenio colectivo. Calculá el importe, los francos equivalentes y el tope de ${TOPES_DECRETO_484.mensual} horas mensuales.`,
  alternates: { canonical: "/horas-extras" },
  openGraph: {
    title: "Horas extras: qué cambió el 6/3/2026",
    description:
      "El banco de horas dejó de ser materia exclusivamente colectiva: ahora el empleador y el trabajador pueden pactarlo uno a uno, por escrito y con cinco requisitos. Cuánto se cobra, cuántos francos equivalen y qué topes siguen vigentes.",
    url: "https://calcular.ar/horas-extras",
    images: [
      {
        url: "/og?t=Horas%20extras%3A%2050%25%2C%20100%25%20y%20banco%20de%20horas&s=LCT%20arts.%20197%20bis%2C%20198%20y%20201%20seg%C3%BAn%20la%20Ley%2027.802",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto se paga la hora extra en 2026?",
    a: "Con un recargo del 50% sobre el salario habitual en días comunes y del 100% los sábados después de las 13, los domingos y los feriados. Es el artículo 201 de la Ley de Contrato de Trabajo, y la reforma de 2026 no lo tocó: el recargo es el mismo desde 1974. Lo que sí cambió es que ahora esas horas pueden compensarse con francos en vez de pagarse, si hay un acuerdo escrito.",
  },
  {
    q: "¿Me pueden pagar las horas extras con francos en vez de plata?",
    a: `Desde el ${VIGENCIA_REFORMA}, sí — y esta es la respuesta que cambió. Hasta el 5 de marzo de 2026, el artículo 197 bis empezaba diciendo «Las convenciones colectivas de trabajo (…) podrán establecer regímenes»: el banco de horas era materia exclusivamente colectiva y sin convenio que lo previera no había forma de compensar, las extras se pagaban. El artículo ${ARTICULO_SUSTITUTIVO_197BIS} de la Ley 27.802 lo reescribió: «El empleador y el trabajador podrán acordar voluntariamente un régimen de compensación de horas extraordinarias de trabajo». Pasó a poder pactarse uno a uno.`,
  },
  {
    q: "¿Qué tiene que decir ese acuerdo para ser válido?",
    a: "Cinco cosas, todas escritas en el mismo artículo: tiene que formalizarse por escrito, consignar la naturaleza voluntaria de la prestación de horas extras, fijar sus límites, especificar el modo de funcionamiento del sistema y establecer un método fehaciente de control que permita a ambas partes registrar las horas efectivamente trabajadas y las horas disponibles para su goce. Ese último requisito es el que más pesa en la práctica: sin un registro que las dos partes puedan ver, el saldo de horas lo lleva sólo el empleador.",
  },
  {
    q: "Si me compensan con francos, ¿un franco es de una hora o de una hora y media?",
    a: "La ley no lo dice, y conviene saberlo antes de firmar. El artículo 197 bis no fija ninguna equivalencia: lo único que exige es que el régimen respete los descansos mínimos legales «asegurando en todo momento la protección, beneficio e interés del trabajador». Si el franco fuera hora por hora, el trabajador perdería el recargo del artículo 201, que es la única razón por la que la hora extra vale más que una normal. Por eso la calculadora muestra los dos números y no elige por vos: es exactamente el punto que hay que dejar escrito en el acuerdo.",
  },
  {
    q: "¿Cuántas horas extras me pueden hacer hacer por mes?",
    a: `${TOPES_DECRETO_484.mensual} por mes y ${TOPES_DECRETO_484.anual} por año, sin autorización administrativa previa. Está en el artículo 1º del ${TOPES_DECRETO_484.norma} (${TOPES_DECRETO_484.boletin}), que la reforma de 2026 no derogó ni modificó. Son dos topes independientes: se puede estar dentro de las ${TOPES_DECRETO_484.mensual} de un mes y aun así haber excedido el año. Y le corren también al banco de horas, porque la hora extra existe antes de que se decida cómo se compensa.`,
  },
  {
    q: "¿Estoy obligado a hacer horas extras?",
    a: "No. El artículo 203 dice que el trabajador «no estará obligado a prestar servicios en horas suplementarias», salvo casos de peligro o accidente ocurrido o inminente, de fuerza mayor, o por exigencias excepcionales de la economía nacional o de la empresa. La reforma lo reforzó desde el otro lado: el acuerdo de compensación tiene que consignar expresamente la naturaleza voluntaria de esas horas. Un régimen que las imponga contradice el propio artículo que lo habilita.",
  },
  {
    q: "¿Cuánto descanso me tienen que dar entre una jornada y otra?",
    a: `${DESCANSOS_MINIMOS.entreJornadas} horas entre el cese de una jornada y el comienzo de la siguiente, y ${DESCANSOS_MINIMOS.semanal} horas de descanso semanal. La pausa de ${DESCANSOS_MINIMOS.entreJornadas} horas ya estaba en el artículo 197; las ${DESCANSOS_MINIMOS.semanal} horas semanales, en cambio, se derivaban del artículo 204 (de las 13 del sábado a las 24 del domingo) y el artículo ${ARTICULO_SUSTITUTIVO_198} de la Ley 27.802 las escribió con número en el artículo 198. Ningún acuerdo de compensación puede bajar de ahí: el 197 bis manda respetar los descansos mínimos legales.`,
  },
  {
    q: "Trabajo por turnos rotativos o «por equipos». ¿Sigue el tope del promedio de tres semanas?",
    a: "No, y es un cambio de la misma reforma que casi no se comentó, porque está en otro título: el de la Ley 11.544. El inciso b) de su artículo 3° siempre permitió prolongar la jornada más allá de las 8 horas diarias y 48 semanales cuando se trabaja por equipos, pero terminaba con una condición: «a condición de que el término medio de las horas de trabajo sobre un período de tres semanas a lo menos, no exceda de ocho horas por día o de cuarenta y ocho horas semanales». El artículo 100 de la Ley 27.802 sustituyó el artículo entero y esa condición ya no está: el inciso termina en «cuarenta y ocho (48) semanales». El promedio de tres semanas dejó de ser el techo. Lo que queda como límite son los descansos mínimos —12 horas entre jornadas y 35 semanales— que el artículo 198 de la LCT escribió con número el mismo día.",
  },
  {
    q: "¿Con qué divisor se calcula el valor de mi hora?",
    a: "Con el que diga tu recibo o tu convenio, porque no hay ninguno en la ley. La Ley 11.544 y el artículo 196 de la LCT fijan la jornada por semana —48 horas—, y pasar de semanal a mensual es aritmética, no derecho. El promedio real de una jornada de 48 horas es 208 horas mensuales (48 × 52/12), pero muchísimas liquidaciones y convenios usan 200 (8 horas × 25 días), que da una hora más cara: alrededor de un 4% de diferencia. Esta página muestra los dos números para que puedas controlar tu recibo, no para reemplazarlo.",
  },
  {
    q: "¿Las horas extras entran en el aguinaldo y en la indemnización?",
    a: "En el aguinaldo, sí: el SAC es el 50% de la mayor remuneración mensual devengada del semestre (art. 122 LCT), y las horas extras son remuneración, así que el mes en que se cobran empuja esa base hacia arriba. Si ese resulta el mejor mes del semestre, la mitad de esas extras se vuelve a cobrar en el aguinaldo. Para la indemnización del artículo 245 la discusión es más vieja y depende de si las horas eran normales y habituales o esporádicas: la base del 245 es «la mejor remuneración mensual, normal y habitual», y las extras ocasionales suelen quedar afuera.",
  },
  {
    q: "¿Y si me pagan las horas extras «en negro» o no me las registran?",
    a: "El artículo 201 empieza diciendo que el recargo se paga «medie o no autorización del organismo administrativo competente»: la falta de registro o de autorización no borra el derecho a cobrarlas. Y el registro es justamente lo que la reforma le exige al acuerdo de compensación —un método fehaciente que permita a ambas partes ver las horas trabajadas y las disponibles—, porque sin ese dato no se puede discutir nada.",
  },
];

export default function HorasExtrasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de horas extras (50% y 100%) y banco de horas",
        url: "https://calcular.ar/horas-extras",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Horas extras: cuánto se cobra y cuándo te las pueden compensar con francos",
        descripcion:
          "El recargo del 50% y del 100% del art. 201 no cambió, pero la Ley 27.802 reescribió el art. 197 bis: el banco de horas dejó de ser materia exclusivamente colectiva y ahora puede pactarse entre empleador y trabajador, por escrito y con cinco requisitos. Importe, francos equivalentes y topes vigentes.",
        url: "/horas-extras",
        modificado: HORAS_EXTRAS_FUENTES.consultadoEl,
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
          Horas extras: cuánto se cobra y cuándo te las pueden pagar con francos
        </h1>
        <p className="text-zinc-600">
          El 50% y el 100% del artículo 201 son de 1974 y no los tocó nadie: por eso todas las
          calculadoras dan el mismo número y el tema parece cerrado. Lo que cambió el{" "}
          {VIGENCIA_REFORMA} es otra cosa, y es la que decide el caso de la mayoría:{" "}
          <strong>quién puede pactar que esas horas se compensen con descanso en vez de plata</strong>.
          Hasta esa fecha sólo podía hacerlo un convenio colectivo. Ahora, el empleador y vos.
        </p>
      </header>

      <RespuestaPrimero actualizado={HORAS_EXTRAS_FUENTES.consultadoEl}>
        <p>
          <strong>
            El recargo sigue siendo 50% en días comunes y 100% los sábados después de las 13,
            domingos y feriados.
          </strong>{" "}
          Lo nuevo es el banco de horas: desde el {VIGENCIA_REFORMA}, el empleador y el trabajador
          pueden acordar <strong>voluntariamente</strong> compensar las horas extras con francos, por
          escrito y con cinco requisitos (naturaleza voluntaria, límites, modo de funcionamiento y un
          registro que ambas partes puedan ver). Antes eso sólo podía nacer de un convenio colectivo.
          Lo que no se puede bajar en ningún acuerdo: {DESCANSOS_MINIMOS.entreJornadas} horas entre
          jornada y jornada, {DESCANSOS_MINIMOS.semanal} horas de descanso semanal y el tope de{" "}
          {TOPES_DECRETO_484.mensual} horas extras mensuales / {TOPES_DECRETO_484.anual} anuales.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te corresponde</h2>
        <p className="text-sm text-zinc-600">
          Cargá tu sueldo y las horas del mes. La calculadora devuelve el importe con el recargo del
          art. 201, el mismo cálculo con los dos divisores de valor hora que se usan en la práctica,
          los francos equivalentes si te las compensan con banco de horas y cuánto margen te queda
          antes de los topes del {TOPES_DECRETO_484.norma}.
        </p>
        <CalculadoraHorasExtras />
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
                    art. 197 bis del DNU 70/2023 · art. 198 de la Ley 24.013
                  </span>
                </th>
                <th className="pb-2 font-semibold">
                  Texto vigente
                  <span className="block text-[10px] font-normal normal-case tracking-normal">
                    arts. {ARTICULO_SUSTITUTIVO_197BIS} y {ARTICULO_SUSTITUTIVO_198} de la Ley 27.802
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {CAMBIOS.map((c) => (
                <tr key={c.tema} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-medium text-zinc-800">{c.tema}</td>
                  <td className="py-3 pr-3 text-zinc-500">{c.antes}</td>
                  <td className={`py-3 ${c.peor ? "text-rose-800" : "text-emerald-800"}`}>
                    {c.ahora}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500">
          En rojo, los cambios que dejan al trabajador en peor posición que antes; en verde, los que
          no lo empeoran o le suman garantías.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cinco requisitos que tiene que cumplir el acuerdo
        </h2>
        <p className="text-sm text-zinc-600">
          Están todos en el mismo artículo 197 bis. Si al papel que te ponen a firmar le falta alguno,
          le falta un requisito de la norma que lo habilita.
        </p>
        <ol className="space-y-3">
          {REQUISITOS_ACUERDO.map((r, i) => (
            <li
              key={r.titulo}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-zinc-800">
                {i + 1}. {r.titulo}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{r.detalle}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 197 bis — texto vigente
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{HORAS_EXTRAS_TEXTOS.art197bisVigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {HORAS_EXTRAS_TEXTOS.notaVigencia197bis}
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto ANTERIOR, que es el que sigue circulando (DNU 70/2023, art. 79)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{HORAS_EXTRAS_TEXTOS.art197bisAnterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Las cinco primeras palabras son todo el cambio: «Las convenciones colectivas de
              trabajo». Si una nota, un modelo de acuerdo o un asesor te dice que el banco de horas
              necesita convenio colectivo, está aplicando este texto, que rigió hasta el 5 de marzo
              de 2026.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 198 — texto vigente: los pisos con número
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{HORAS_EXTRAS_TEXTOS.art198Vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              {HORAS_EXTRAS_TEXTOS.notaVigencia198} Es la primera vez que el articulado escribe las{" "}
              {DESCANSOS_MINIMOS.semanal} horas de descanso semanal: antes se derivaban del art. 204.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 201 — el recargo, que no cambió
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{HORAS_EXTRAS_TEXTOS.art201}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Y el art. 203, sobre la voluntariedad: «{HORAS_EXTRAS_TEXTOS.art203}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.544, art. 3° inc. b) — el trabajo por equipos, antes y después
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              Vigente: «{HORAS_EXTRAS_TEXTOS.ley11544Art3IncBVigente}»
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              Anterior: «{HORAS_EXTRAS_TEXTOS.ley11544Art3IncBAnterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {HORAS_EXTRAS_TEXTOS.notaVigencia11544Art3} — La diferencia es la última oración del
              texto viejo: el <strong>promedio de tres semanas</strong> dejó de operar como techo en
              el trabajo por equipos. Este cambio no está en el título de la LCT sino en el de la
              Ley 11.544, y por eso pasó casi inadvertido.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              {TOPES_DECRETO_484.norma}, art. 1º — el tope que sigue vigente
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{HORAS_EXTRAS_TEXTOS.decreto484}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Verificado el {HORAS_EXTRAS_FUENTES.consultadoEl} contra la lista de normas que lo
              modifican en InfoLEG: la Ley 27.802 no lo tocó.
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
          Otras páginas de la misma reforma:{" "}
          <Link href="/tiempo-parcial" className="font-medium text-emerald-700 hover:underline">
            el contrato a tiempo parcial
          </Link>
          ,{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            propinas y remuneración
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
          {HORAS_EXTRAS_FUENTES.lista.map((f) => (
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
          InfoLEG, comparado contra el texto original de la norma anterior, no un resumen de prensa.
          Es informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          liquidación. Consultada el {HORAS_EXTRAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
