import type { Metadata } from "next";
import { hreflangHeadAR } from "@/lib/hreflang-ar";
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
import { OtrosPaises } from "@/components/OtrosPaises";

// Función y no constante: el clúster hreflang se evalúa con la fecha del día (check_mes_en_render).
export function generateMetadata(): Metadata {
  return {
    title: "Horas extras 2026: cuánto se pagan al 50% y al 100%",
    description: `Calculá tus horas extra con recargo del 50% y del 100%, el tope de ${TOPES_DECRETO_484.mensual} horas por mes y los francos del banco de horas de la Ley 27.802.`,
    alternates: { canonical: "/horas-extras", languages: hreflangHeadAR("/horas-extras") },
    openGraph: {
      title: "Horas extras: qué cambió el 6/3/2026",
      description:
        "El banco de horas ya no depende solo del convenio colectivo: ahora el empleador y el trabajador pueden pactarlo uno a uno, por escrito y con cinco requisitos. Cuánto se cobra, cuántos francos equivalen y qué topes siguen vigentes.",
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
}

const faqs = [
  {
    q: "¿Cuánto se paga la hora extra en 2026?",
    a: "Con un recargo del 50% sobre tu sueldo habitual en días comunes, y del 100% los sábados después de las 13, los domingos y los feriados. Lo dice el artículo 201 de la Ley de Contrato de Trabajo, y la reforma de 2026 no lo tocó: el recargo es el mismo desde 1974. Lo que sí cambió es que ahora esas horas se pueden compensar con francos en vez de pagarse, si hay un acuerdo escrito.",
  },
  {
    q: "¿Me pueden pagar las horas extras con francos en vez de plata?",
    a: `Desde el ${VIGENCIA_REFORMA}, sí. Esta es la respuesta que cambió. Hasta el 5 de marzo de 2026, el artículo 197 bis empezaba diciendo «Las convenciones colectivas de trabajo (…) podrán establecer regímenes». O sea, el banco de horas solo podía venir de un convenio colectivo: si tu convenio no lo preveía, las extras se pagaban. El artículo ${ARTICULO_SUSTITUTIVO_197BIS} de la Ley 27.802 lo reescribió: «El empleador y el trabajador podrán acordar voluntariamente un régimen de compensación de horas extraordinarias de trabajo». Ahora se puede pactar uno a uno.`,
  },
  {
    q: "¿Qué tiene que decir ese acuerdo para ser válido?",
    a: "Cinco cosas, todas en el mismo artículo. Tiene que estar por escrito, decir que las horas extras son voluntarias, fijar sus límites, explicar cómo funciona el sistema y tener un método de control confiable para que las dos partes registren las horas trabajadas y las que quedan para usar. Ese último requisito es el que más pesa en la práctica: sin un registro que las dos partes puedan ver, el saldo de horas lo lleva solo el empleador.",
  },
  {
    q: "Si me compensan con francos, ¿un franco es de una hora o de una hora y media?",
    a: "La ley no lo dice, y conviene saberlo antes de firmar. El artículo 197 bis no fija ninguna equivalencia. Solo exige que el régimen respete los descansos mínimos legales «asegurando en todo momento la protección, beneficio e interés del trabajador». Si el franco fuera hora por hora, perderías el recargo del artículo 201, que es justamente lo que hace que la hora extra valga más que una normal. Por eso la calculadora muestra los dos números y no elige por vos: es el punto que tenés que dejar escrito en el acuerdo.",
  },
  {
    q: "¿Cuántas horas extras me pueden hacer hacer por mes?",
    a: `${TOPES_DECRETO_484.mensual} por mes y ${TOPES_DECRETO_484.anual} por año, sin autorización administrativa previa. Está en el artículo 1º del ${TOPES_DECRETO_484.norma} (${TOPES_DECRETO_484.boletin}), que la reforma de 2026 no derogó ni cambió. Son dos topes separados: podés estar dentro de las ${TOPES_DECRETO_484.mensual} de un mes y aun así haberte pasado en el año. Y valen también para el banco de horas, porque la hora extra existe antes de que se decida cómo se compensa.`,
  },
  {
    q: "¿Estoy obligado a hacer horas extras?",
    a: "No. El artículo 203 dice que el trabajador «no estará obligado a prestar servicios en horas suplementarias». Las excepciones son peligro o accidente ocurrido o inminente, fuerza mayor, o exigencias excepcionales de la economía nacional o de la empresa. La reforma lo reforzó: el acuerdo de compensación tiene que decir de forma expresa que esas horas son voluntarias. Un régimen que las imponga va contra el mismo artículo que lo permite.",
  },
  {
    q: "¿Cuánto descanso me tienen que dar entre una jornada y otra?",
    a: `${DESCANSOS_MINIMOS.entreJornadas} horas entre el fin de una jornada y el comienzo de la siguiente, y ${DESCANSOS_MINIMOS.semanal} horas de descanso semanal. La pausa de ${DESCANSOS_MINIMOS.entreJornadas} horas ya estaba en el artículo 197. Las ${DESCANSOS_MINIMOS.semanal} horas semanales, en cambio, salían del artículo 204 (de las 13 del sábado a las 24 del domingo), y el artículo ${ARTICULO_SUSTITUTIVO_198} de la Ley 27.802 las escribió con número en el artículo 198. Ningún acuerdo de compensación puede bajar de ahí, porque el 197 bis manda respetar los descansos mínimos legales.`,
  },
  {
    q: "Trabajo por turnos rotativos o «por equipos». ¿Sigue el tope del promedio de tres semanas?",
    a: "No. Es un cambio de la misma reforma que casi no se comentó, porque está en otra ley: la 11.544. El inciso b) de su artículo 3° siempre permitió alargar la jornada más allá de las 8 horas diarias y 48 semanales cuando se trabaja por equipos. Pero terminaba con una condición: «a condición de que el término medio de las horas de trabajo sobre un período de tres semanas a lo menos, no exceda de ocho horas por día o de cuarenta y ocho horas semanales». El artículo 100 de la Ley 27.802 reescribió el artículo entero y esa condición ya no está: el inciso termina en «cuarenta y ocho (48) semanales». El promedio de tres semanas dejó de ser el techo. El límite que queda son los descansos mínimos (12 horas entre jornadas y 35 semanales), que el artículo 198 de la LCT escribió con número el mismo día.",
  },
  {
    q: "¿Con qué divisor se calcula el valor de mi hora?",
    a: "Con el que diga tu recibo o tu convenio, porque la ley no fija ninguno. La Ley 11.544 y el artículo 196 de la LCT fijan la jornada por semana (48 horas), y pasar de semana a mes es una cuenta, no una regla legal. El promedio real de una jornada de 48 horas es 208 horas por mes (48 × 52/12). Pero muchas liquidaciones y convenios usan 200 (8 horas × 25 días), que da una hora más cara: alrededor de un 4% de diferencia. Esta página muestra los dos números para que puedas controlar tu recibo, no para reemplazarlo.",
  },
  {
    q: "¿Las horas extras entran en el aguinaldo y en la indemnización?",
    a: "En el aguinaldo, sí. El aguinaldo (en la ley se llama SAC) es el 50% del mejor sueldo mensual del semestre (art. 122 LCT), y las horas extras son sueldo. Así que el mes en que las cobrás sube esa base. Si ese termina siendo el mejor mes del semestre, la mitad de esas extras la volvés a cobrar en el aguinaldo. Para la indemnización del artículo 245 es una discusión más vieja: depende de si las horas eran normales y habituales o de vez en cuando. La base del 245 es «la mejor remuneración mensual, normal y habitual», y las extras ocasionales suelen quedar afuera.",
  },
  {
    q: "¿Y si me pagan las horas extras «en negro» o no me las registran?",
    a: "El artículo 201 empieza diciendo que el recargo se paga «medie o no autorización del organismo administrativo competente». O sea, que no estén registradas ni autorizadas no te quita el derecho a cobrarlas. Y el registro es justo lo que la reforma le exige al acuerdo de compensación (un método confiable para que las dos partes vean las horas trabajadas y las disponibles), porque sin ese dato no se puede discutir nada.",
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
          "El recargo del 50% y del 100% del art. 201 no cambió, pero la Ley 27.802 reescribió el art. 197 bis: el banco de horas ya no depende solo del convenio colectivo y ahora puede pactarse entre empleador y trabajador, por escrito y con cinco requisitos. Importe, francos equivalentes y topes vigentes.",
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
          El 50% y el 100% del artículo 201 son de 1974 y nadie los tocó. Por eso todas las
          calculadoras dan el mismo número y el tema parece cerrado. Lo que cambió el{" "}
          {VIGENCIA_REFORMA} es otra cosa, y es lo que decide el caso de la mayoría:{" "}
          <strong>quién puede pactar que esas horas se compensen con descanso en vez de plata</strong>.
          Hasta esa fecha, solo un convenio colectivo. Ahora, el empleador y vos.
        </p>
      </header>

      <RespuestaPrimero actualizado={HORAS_EXTRAS_FUENTES.consultadoEl}>
        <p>
          <strong>
            El recargo sigue siendo del 50% en días comunes y del 100% los sábados después de las 13,
            domingos y feriados.
          </strong>{" "}
          Lo nuevo es el banco de horas. Desde el {VIGENCIA_REFORMA}, el empleador y el trabajador
          pueden acordar <strong>voluntariamente</strong> compensar las horas extras con francos, por
          escrito y con cinco requisitos (que sea voluntario, con límites, cómo funciona y un registro
          que las dos partes puedan ver). Antes eso solo podía venir de un convenio colectivo. Lo que
          ningún acuerdo puede bajar: {DESCANSOS_MINIMOS.entreJornadas} horas entre jornada y
          jornada, {DESCANSOS_MINIMOS.semanal} horas de descanso semanal y el tope de{" "}
          {TOPES_DECRETO_484.mensual} horas extras por mes y {TOPES_DECRETO_484.anual} por año.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te corresponde</h2>
        <p className="text-sm text-zinc-600">
          Cargá tu sueldo y las horas del mes. La calculadora te da el importe con el recargo del
          art. 201, la misma cuenta con los dos divisores de valor hora que se usan en la práctica,
          los francos equivalentes si te las compensan con banco de horas y cuánto margen te queda
          antes de los topes del {TOPES_DECRETO_484.norma}. Para ver cuánto te queda en mano a fin de
          mes, usá la{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          .
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
          En rojo, los cambios que dejan al trabajador peor que antes. En verde, los que no lo
          empeoran o le suman garantías.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cinco requisitos que tiene que cumplir el acuerdo
        </h2>
        <p className="text-sm text-zinc-600">
          Están todos en el mismo artículo 197 bis. Si al papel que te dan para firmar le falta
          alguno, no cumple con la ley que lo permite.
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
              LCT, art. 197 bis (texto vigente)
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
              El texto anterior, que es el que sigue circulando (DNU 70/2023, art. 79)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{HORAS_EXTRAS_TEXTOS.art197bisAnterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Todo el cambio está en las cinco primeras palabras: «Las convenciones colectivas de
              trabajo». Si una nota, un modelo de acuerdo o un asesor te dice que el banco de horas
              necesita convenio colectivo, está usando este texto, que rigió hasta el 5 de marzo de
              2026.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 198 (texto vigente): los mínimos, con número
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{HORAS_EXTRAS_TEXTOS.art198Vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              {HORAS_EXTRAS_TEXTOS.notaVigencia198} Es la primera vez que la ley escribe las{" "}
              {DESCANSOS_MINIMOS.semanal} horas de descanso semanal. Antes salían del art. 204.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 201: el recargo, que no cambió
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{HORAS_EXTRAS_TEXTOS.art201}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Y el art. 203, sobre la voluntariedad: «{HORAS_EXTRAS_TEXTOS.art203}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.544, art. 3° inc. b): el trabajo por equipos, antes y después
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              Vigente: «{HORAS_EXTRAS_TEXTOS.ley11544Art3IncBVigente}»
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              Anterior: «{HORAS_EXTRAS_TEXTOS.ley11544Art3IncBAnterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {HORAS_EXTRAS_TEXTOS.notaVigencia11544Art3} La diferencia es la última oración del
              texto viejo: el <strong>promedio de tres semanas</strong> dejó de ser el techo en el
              trabajo por equipos. Este cambio no está en la LCT sino en la Ley 11.544, y por eso
              pasó casi sin que nadie lo notara.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              {TOPES_DECRETO_484.norma}, art. 1º: el tope que sigue vigente
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{HORAS_EXTRAS_TEXTOS.decreto484}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Lo revisamos el {HORAS_EXTRAS_FUENTES.consultadoEl} en la lista de normas que lo
              modifican en InfoLEG: la Ley 27.802 no lo tocó.
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página usa el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG, comparado con el texto original de la norma anterior, no un resumen de prensa.
          Es informativa: no reemplaza el consejo de un profesional ni una liquidación. Consultada el {HORAS_EXTRAS_FUENTES.consultadoEl}.
        </p>
      </section>
      <OtrosPaises concepto="horas-extra" />
    </article>
  );
}
