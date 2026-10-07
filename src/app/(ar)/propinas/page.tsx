import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPropinas } from "@/components/CalculadoraPropinas";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_DEROGADO,
  ARTICULO_DEROGATORIO,
  BENEFICIOS_SOCIALES,
  PROPINAS_FUENTES,
  PROPINAS_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/propinas";

export const metadata: Metadata = {
  title: "¿Las propinas son remunerativas? Qué cambió en 2026",
  description:
    "Desde el 6/3/2026 el art. 104 de la LCT dice que las propinas nunca son remuneración. Calculá cuánto cambia tu aguinaldo, vacaciones e indemnización.",
  alternates: { canonical: "/propinas" },
  openGraph: {
    title: "¿Las propinas son remunerativas? Qué cambió con la Ley 27.802",
    description: `El artículo ${ARTICULO_DEROGADO} de la LCT se derogó y el 104 ahora deja a las propinas fuera de la remuneración. Cuánto cambia tu indemnización, tu aguinaldo y tus aportes.`,
    url: "https://calcular.ar/propinas",
    images: [
      {
        url: "/og?t=%C2%BFLas%20propinas%20son%20remunerativas%3F&s=LCT%20art.%20104%20seg%C3%BAn%20la%20Ley%2027.802",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Las propinas son remunerativas en 2026?",
    a: `No. El artículo 104 de la Ley de Contrato de Trabajo, con el texto que le dio el artículo 32 de la Ley 27.802 (B.O. ${VIGENCIA_REFORMA}), dice textualmente que «en ningún caso las propinas podrán ser consideradas como remuneración aun cuando por los usos y costumbres de determinadas actividades sean habituales». La misma ley, en su artículo ${ARTICULO_DEROGATORIO}, derogó el artículo ${ARTICULO_DEROGADO} de la LCT, que regulaba las propinas y del que salía la respuesta anterior. Por eso la mayoría de las notas que circulan (escritas antes de marzo de 2026 o copiadas de otras) siguen diciendo lo contrario.`,
  },
  {
    q: "¿Desde cuándo rige? ¿Vale para lo que cobré antes?",
    a: `Rige desde el ${VIGENCIA_REFORMA} y no es retroactivo: la nota de vigencia del artículo dice «a partir de su publicación en el Boletín Oficial». Lo que ganaste antes de esa fecha se sigue rigiendo por el artículo ${ARTICULO_DEROGADO} derogado. En un despido de hoy con muchos años de antigüedad puede haber un tramo bajo cada régimen, y eso es justo lo que se está discutiendo en los juicios.`,
  },
  {
    q: "¿Entonces dejo de cobrar las propinas?",
    a: "No. Las propinas se siguen cobrando igual: es plata que deja el cliente, no la paga el empleador. Lo que cambia es que ya no cuentan para calcular el aguinaldo, el día de vacaciones, la indemnización por antigüedad y los aportes. Dicho de otra forma: lo que te llevás a fin de mes no cambia; lo que cobrarías en un despido y tu jubilación futura, sí.",
  },
  {
    q: "¿Y el adicional «por manejo de dinero» del convenio?",
    a: "Es otra cosa y sigue siendo sueldo. Lo que el artículo 104 deja afuera es la propina, o sea lo que paga un tercero. Un adicional que fija el convenio colectivo o que paga el empleador (se llame como se llame) es remuneración del artículo 103 y cuenta como cualquier otro rubro del recibo.",
  },
  {
    q: "¿Qué es el artículo 104 bis que agregó la misma reforma?",
    a: `El artículo 33 de la Ley 27.802 sumó un artículo nuevo a la LCT, el 104 bis. Permite agregar «otros componentes retributivos dinámicos adicionales, transitorios, fijos o variables» por convenio, por acuerdo individual o por decisión del empleador, según el mérito del trabajador y aspectos de la organización. La parte que conviene leer despacio es la segunda: esos componentes se pueden cambiar o sacar cuando las partes decidan, y el artículo dice que no se les aplica «la continuidad tácita, la ultraactividad, ni la costumbre, cualquiera fuere el tiempo transcurrido en su mantenimiento y aplicación». O sea: cobrarlos durante años no los vuelve un derecho adquirido.`,
  },
  {
    q: "¿Qué otros conceptos no son remuneración?",
    a: `Los beneficios sociales del artículo 103 bis, cuya lista también cambió esta reforma (artículo 31 de la Ley 27.802): comedor y alimentación, reintegros médicos y planes de salud, ropa de trabajo, guardería para hijos de hasta 6 años, útiles escolares y guardapolvos, capacitación y gastos de sepelio de familiares a cargo. No son remunerativos, no son salario en especie y el artículo dice que nunca se pagan aportes ni contribuciones sobre ellos. Todo lo demás que el empleador entregue, en plata o en especie, y no esté en esa lista, es remuneración (artículo 105). Salvo las excepciones que nombra el mismo artículo: retiros de socios, reparto de utilidades o acciones, reintegros de auto por kilómetro con comprobante y viáticos documentados.`,
  },
  {
    q: "¿Cuánta plata es, en concreto?",
    a: "Depende de cuánto pesan las propinas en tu ingreso y de tu antigüedad, y para eso está la calculadora de arriba. El rubro que más mueve es la indemnización del artículo 245, porque multiplica la diferencia por cada año trabajado. Si tus propinas son un tercio de lo que ganás y tenés diez años de antigüedad, la diferencia es diez veces esa propina mensual. Ojo con el tope del artículo 245, que se calcula sobre el promedio de sueldos del convenio: si se aplica en tu caso, la diferencia real puede ser menor.",
  },
  {
    q: "¿Esto vale para todos los trabajadores?",
    a: "Vale para quienes están en la Ley de Contrato de Trabajo, que es el régimen general. Los estatutos especiales con régimen propio (casas particulares, trabajo agrario, construcción) se rigen por sus leyes, y casas particulares tiene su propia página acá. Donde más se nota la reforma es en la gastronomía, y después en peluquerías, hotelería, estacionamientos y reparto.",
  },
];

export default function PropinasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora: cuánto cambia tu sueldo si las propinas no son remuneración",
        url: "https://calcular.ar/propinas",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "¿Las propinas son remunerativas? Qué cambió con la Ley 27.802",
        descripcion:
          "El art. 104 de la LCT, reescrito por la Ley 27.802, deja a las propinas fuera de la remuneración aunque sean habituales, y el art. 113 quedó derogado. Efecto en aguinaldo, vacaciones, indemnización y aportes.",
        url: "/propinas",
        modificado: PROPINAS_FUENTES.consultadoEl,
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
          ¿Las propinas son remunerativas? Lo que cambió el {VIGENCIA_REFORMA}
        </h1>
        <p className="text-zinc-600">
          Durante décadas la respuesta salió del artículo {ARTICULO_DEROGADO} de la Ley de Contrato
          de Trabajo. Ese artículo ya no existe: la Ley 27.802 lo derogó y, al mismo tiempo,
          reescribió el artículo 104 para decir lo contrario. Acá tenés el texto vigente y cuánta
          plata cambia de lugar por eso (la cuenta que ninguna nota hace).
        </p>
      </header>

      <RespuestaPrimero actualizado={PROPINAS_FUENTES.consultadoEl}>
        <p>
          <strong>No: desde el {VIGENCIA_REFORMA} las propinas no son remuneración.</strong> El
          artículo 104 de la LCT, con el texto que le dio el artículo 32 de la Ley 27.802, dice que
          «en ningún caso las propinas podrán ser consideradas como remuneración aun cuando por los
          usos y costumbres de determinadas actividades sean habituales». Y el artículo{" "}
          {ARTICULO_DEROGATORIO} de la misma ley derogó el artículo {ARTICULO_DEROGADO}, que era el
          que las regulaba. Se siguen cobrando igual, pero <strong>ya no cuentan</strong> para el
          aguinaldo, el día de vacaciones, la indemnización por antigüedad ni los aportes
          jubilatorios. No es retroactivo: lo que ganaste antes de esa fecha se rige por el texto
          derogado.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuánto cambia en tu caso
        </h2>
        <p className="text-sm text-zinc-600">
          Cargá tu sueldo registrado, lo que cobrás de propinas y tu antigüedad. La tabla compara,
          rubro por rubro, el texto vigente con el criterio de antes de la reforma.
        </p>
        <CalculadoraPropinas />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la ley</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 104: formas de determinar la remuneración
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{PROPINAS_TEXTOS.art104}»</p>
            <p className="mt-2 text-xs text-zinc-500">{PROPINAS_TEXTOS.art104Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_DEROGADO}: el artículo que regulaba las propinas
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Hoy InfoLEG no muestra el artículo: solo la nota de derogación.
            </p>
            <p className="mt-2 text-xs text-zinc-500">{PROPINAS_TEXTOS.art113Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 104 bis: otros componentes remunerativos (artículo nuevo)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{PROPINAS_TEXTOS.art104bis}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              (Artículo incorporado por art. 33 de la Ley Nº 27.802 B.O. 6/3/2026.) La frase que
              conviene releer es la última: cobrar uno de estos componentes durante años no lo
              vuelve un derecho adquirido.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que tampoco es remuneración: los beneficios sociales del art. 103 bis
        </h2>
        <p className="text-sm text-zinc-600">
          La misma reforma cambió la lista del artículo 103 bis. Estos siete conceptos no son
          sueldo ni sueldo en especie, y el artículo dice que nunca se pagan aportes ni
          contribuciones sobre ellos.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {BENEFICIOS_SOCIALES.map((b) => (
            <li
              key={b.inciso}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              <span className="font-semibold text-zinc-900">Inciso {b.inciso})</span> {b.texto}
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-500">
          Todo lo demás que el empleador entregue, en plata o en especie, es remuneración (art.
          105), con las excepciones que nombra el mismo artículo: retiros de socios, reparto de
          utilidades o acciones, reintegros de auto por kilómetro con comprobante y viáticos
          documentados. Si querés ver qué te queda en mano después de los descuentos, está{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            la calculadora de sueldo neto
          </Link>
          . Para ver cuánto cobrás de vacaciones sin las propinas, usá{" "}
          <Link href="/vacaciones" className="font-medium text-emerald-700 hover:underline">
            la calculadora de vacaciones
          </Link>
          . Y si el tema es un despido, están{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la de indemnización
          </Link>{" "}
          y{" "}
          <Link
            href="/actualizacion-creditos-laborales"
            className="font-medium text-emerald-700 hover:underline"
          >
            la de actualización de créditos laborales
          </Link>
          , que también sale del art. 276 que cambió esta misma ley.
        </p>
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
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PROPINAS_FUENTES.lista.map((f) => (
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
          InfoLEG, no un resumen de prensa. Es una guía informativa: no reemplaza el consejo de un
          profesional ni una liquidación. Consultada el {PROPINAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
