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
  title: "¿Las propinas son remunerativas? Qué cambió con la Ley 27.802",
  description: `Desde el ${VIGENCIA_REFORMA} el artículo 104 de la LCT dice que en ningún caso las propinas son remuneración, aun cuando sean habituales, y el artículo ${ARTICULO_DEROGADO} —el que las regulaba— quedó derogado. Calculá cuánto cambia tu aguinaldo, tus vacaciones y tu indemnización.`,
  alternates: { canonical: "/propinas" },
  openGraph: {
    title: "¿Las propinas son remunerativas? Qué cambió con la Ley 27.802",
    description: `El artículo ${ARTICULO_DEROGADO} de la LCT fue derogado y el 104 ahora excluye a las propinas de la remuneración. Cuánto cambia tu indemnización, tu aguinaldo y tus aportes.`,
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
    a: `No. El artículo 104 de la Ley de Contrato de Trabajo, con el texto que le dio el artículo 32 de la Ley 27.802 (B.O. ${VIGENCIA_REFORMA}), dice textualmente que «en ningún caso las propinas podrán ser consideradas como remuneración aun cuando por los usos y costumbres de determinadas actividades sean habituales». La misma ley, en su artículo ${ARTICULO_DEROGATORIO}, derogó el artículo ${ARTICULO_DEROGADO} de la LCT, que era el que regulaba las propinas y del que salía la respuesta anterior. Por eso la mayoría de las notas que circulan —escritas antes de marzo de 2026 o copiadas de otras— siguen contestando lo contrario.`,
  },
  {
    q: "¿Desde cuándo rige? ¿Vale para lo que cobré antes?",
    a: `Rige desde el ${VIGENCIA_REFORMA} y no es retroactivo: la nota de vigencia del propio artículo dice «a partir de su publicación en el Boletín Oficial». Lo devengado antes de esa fecha se sigue rigiendo por el artículo ${ARTICULO_DEROGADO} derogado. Para un despido que se discute hoy con muchos años de antigüedad, eso significa que puede haber un tramo bajo cada régimen: es exactamente lo que se está litigando.`,
  },
  {
    q: "¿Entonces dejo de cobrar las propinas?",
    a: "No. Las propinas se siguen cobrando igual: son plata que deja el cliente y no la paga el empleador. Lo que cambia es que ya no integran la base sobre la que se calculan el aguinaldo, el día de vacaciones, la indemnización por antigüedad y los aportes. Dicho de otra forma: el bolsillo de fin de mes no cambia; el del despido y el de la jubilación futura, sí.",
  },
  {
    q: "¿Y el adicional «por manejo de dinero» del convenio?",
    a: "Ese es otro concepto y sigue siendo salario. Lo que el artículo 104 excluye es la propina, o sea lo que paga un tercero. Un adicional que fija el convenio colectivo o que paga el empleador —cualquiera sea el nombre que le pongan— es remuneración del artículo 103 e integra la base como cualquier otro rubro del recibo.",
  },
  {
    q: "¿Qué es el artículo 104 bis que agregó la misma reforma?",
    a: `El artículo 33 de la Ley 27.802 incorporó un artículo nuevo a la LCT, el 104 bis, que permite sumar «otros componentes retributivos dinámicos adicionales, transitorios, fijos o variables» por convenio, por acuerdo individual o por decisión unilateral del empleador, mirando el mérito personal del trabajador y aspectos de la organización. La parte que conviene leer despacio es la segunda: esos componentes se pueden modificar o sacar con la frecuencia que las partes determinen, y el artículo dice expresamente que no se les aplica «la continuidad tácita, la ultraactividad, ni la costumbre, cualquiera fuere el tiempo transcurrido en su mantenimiento y aplicación». O sea: cobrarlos durante años no los vuelve un derecho adquirido.`,
  },
  {
    q: "¿Qué otros conceptos no son remuneración?",
    a: `Los beneficios sociales del artículo 103 bis, cuya lista también sustituyó esta reforma (artículo 31 de la Ley 27.802): comedor y alimentación, reintegros médicos y planes de salud, ropa de trabajo, guardería para hijos de hasta 6 años, útiles escolares y guardapolvos, capacitación y gastos de sepelio de familiares a cargo. Son no remunerativos, no son salario en especie y el artículo dice que en ningún caso corresponde pagar aportes ni contribuciones sobre ellos. Todo lo demás que el empleador entregue en dinero o en especie y no encaje en esa lista integra la remuneración (artículo 105), salvo las excepciones que el mismo artículo enumera: retiros de socios, distribución de utilidades o acciones, reintegros de automóvil por kilómetro con comprobante y viáticos documentados.`,
  },
  {
    q: "¿Cuánta plata es, en concreto?",
    a: "Depende del peso de las propinas sobre el total y de la antigüedad, y por eso está la calculadora de arriba. El rubro que más mueve es la indemnización del artículo 245, porque multiplica la diferencia de base por cada año de servicio: para alguien con propinas equivalentes a un tercio de su ingreso y diez años de antigüedad, la diferencia es de diez veces esa propina mensual. Ojo con el tope del artículo 245, calculado sobre el promedio de las remuneraciones del convenio: si en el caso concreto se aplica, la diferencia real puede ser menor.",
  },
  {
    q: "¿Esto vale para todos los trabajadores?",
    a: "Vale para los trabajadores comprendidos en la Ley de Contrato de Trabajo, que es el régimen general. Los estatutos especiales con régimen propio —casas particulares, trabajo agrario, construcción— se rigen por sus leyes, y el personal de casas particulares tiene su propia página acá. La actividad donde la reforma más se nota es la gastronómica, seguida por peluquerías, hotelería, estacionamientos y reparto.",
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
          "El art. 104 de la LCT, sustituido por la Ley 27.802, excluye a las propinas de la remuneración aun cuando sean habituales, y el art. 113 quedó derogado. Efecto en aguinaldo, vacaciones, indemnización y aportes.",
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
          de Trabajo. Ese artículo ya no existe: la Ley 27.802 lo derogó y, en el mismo acto,
          reescribió el artículo 104 para decir lo contrario. Acá está el texto vigente y —lo que
          ninguna nota calcula— cuánta plata cambia de lugar por eso.
        </p>
      </header>

      <RespuestaPrimero actualizado={PROPINAS_FUENTES.consultadoEl}>
        <p>
          <strong>No: desde el {VIGENCIA_REFORMA} las propinas no son remuneración.</strong> El
          artículo 104 de la LCT, con el texto que le dio el artículo 32 de la Ley 27.802, dice que
          «en ningún caso las propinas podrán ser consideradas como remuneración aun cuando por los
          usos y costumbres de determinadas actividades sean habituales», y el artículo{" "}
          {ARTICULO_DEROGATORIO} de la misma ley derogó el artículo {ARTICULO_DEROGADO}, que era el
          que las regulaba. Se siguen cobrando igual, pero <strong>ya no cuentan</strong> para el
          aguinaldo, el día de vacaciones, la indemnización por antigüedad ni los aportes
          jubilatorios. No es retroactivo: lo devengado antes de esa fecha se rige por el texto
          derogado.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuánto cambia en tu caso
        </h2>
        <p className="text-sm text-zinc-600">
          Cargá tu sueldo registrado, lo que cobrás de propinas y tu antigüedad. La tabla compara,
          rubro por rubro, el texto vigente contra el criterio anterior a la reforma.
        </p>
        <CalculadoraPropinas />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 104 — Formas de determinar la remuneración
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{PROPINAS_TEXTOS.art104}»</p>
            <p className="mt-2 text-xs text-zinc-500">{PROPINAS_TEXTOS.art104Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_DEROGADO} — el artículo que regulaba las propinas
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Hoy el texto actualizado de InfoLEG no muestra artículo: sólo la nota de derogación.
            </p>
            <p className="mt-2 text-xs text-zinc-500">{PROPINAS_TEXTOS.art113Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 104 bis — Otros componentes remunerativos (artículo nuevo)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{PROPINAS_TEXTOS.art104bis}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              (Artículo incorporado por art. 33 de la Ley Nº 27.802 B.O. 6/3/2026.) La frase que
              conviene releer es la última: cobrar uno de estos componentes durante años no lo
              convierte en un derecho adquirido.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que tampoco es remuneración: los beneficios sociales del art. 103 bis
        </h2>
        <p className="text-sm text-zinc-600">
          La misma reforma sustituyó la lista del artículo 103 bis. Estos siete conceptos no son
          salario ni salario en especie, y el artículo dice que en ningún caso corresponde pagar
          aportes ni contribuciones sobre ellos.
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
          Todo lo demás que el empleador entregue, en dinero o en especie, integra la remuneración
          (art. 105), con las excepciones que el propio artículo enumera: retiros de socios,
          distribución de utilidades o acciones, reintegros de automóvil por kilómetro recorrido
          con comprobante y viáticos documentados. Si querés ver qué queda en mano después de los
          descuentos, está{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            la calculadora de sueldo neto
          </Link>
          , y si el tema es un despido,{" "}
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
          , que también salió del art. 276 reformado por esta misma ley.
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página aplica el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG, no un resumen de prensa. Es informativa y orientativa: no reemplaza el
          asesoramiento de un profesional ni una liquidación. Consultada el{" "}
          {PROPINAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
