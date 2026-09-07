import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraMuerteTrabajador } from "@/components/CalculadoraMuerteTrabajador";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_SUSTITUTIVO,
  BENEFICIARIOS_PRIMER_GRUPO,
  DIAS_LIBERACION_EMPLEADOR,
  MUERTE_FUENTES,
  MUERTE_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/muerte-trabajador";

export const metadata: Metadata = {
  title: "Indemnización por fallecimiento del trabajador: quién cobra y cuánto (art. 248 LCT)",
  description: `Desde el ${VIGENCIA_REFORMA} el artículo 248 de la LCT tiene texto nuevo: cambió quiénes cobran y cómo se reparte. Calculá el monto (la mitad del art. 245) y cuánto le toca a cada beneficiario.`,
  alternates: { canonical: "/indemnizacion-por-fallecimiento" },
  openGraph: {
    title: "Indemnización por fallecimiento del trabajador (art. 248 LCT)",
    description: `Quiénes cobran según el texto vigente desde el ${VIGENCIA_REFORMA}, cuánto es y cómo se divide en partes iguales.`,
    url: "https://calcular.ar/indemnizacion-por-fallecimiento",
    images: [
      {
        url: "/og?t=Indemnizaci%C3%B3n%20por%20fallecimiento&s=LCT%20art.%20248%20seg%C3%BAn%20la%20Ley%2027.802",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Si fallece un trabajador, ¿cuánto cobra la familia?",
    a: "La mitad de la indemnización por despido. El artículo 248 de la Ley de Contrato de Trabajo manda pagar «una indemnización igual a la prevista en el artículo 247», y el 247 dice que es «equivalente a la mitad de la prevista en el artículo 245». O sea: se calcula la indemnización por antigüedad como si fuera un despido sin causa (un mes de sueldo por año de servicio o fracción mayor de tres meses, sobre la mejor remuneración mensual, normal y habitual) y se paga el 50%. A eso se le suma la liquidación final que corresponde siempre: aguinaldo proporcional, vacaciones no gozadas y los días trabajados del último mes. No hay preaviso ni integración del mes de despido, porque la muerte no es un despido.",
  },
  {
    q: "¿Quiénes son los beneficiarios según el texto vigente?",
    a: `El artículo 248, con el texto que le dio el artículo ${ARTICULO_SUSTITUTIVO} de la Ley 27.802 (B.O. ${VIGENCIA_REFORMA}), llama primero a tres supuestos que concurren entre sí: el cónyuge o conviviente del causante, los hijos menores de edad y los hijos mayores de edad con Certificado Único de Discapacidad (CUD). Si no hay ninguno de esos, cobran los hijos mayores de edad. Y si tampoco hay hijos mayores, los padres del causante «que estuvieren a cargo al momento del fallecimiento». Esto es importante porque el artículo fue reescrito entero: si estás leyendo una nota anterior a marzo de 2026 —o una que copia a otra anterior— vas a ver una lista de beneficiarios distinta.`,
  },
  {
    q: "¿Cómo se reparte entre varios beneficiarios?",
    a: `En partes iguales. El texto es literal: «De concurrir dos (2) o más de los supuestos detallados anteriormente, se distribuirá la indemnización en partes iguales, es decir, considerando cada titular del crédito como uno (1)». No hay mitad para el cónyuge y mitad para los hijos, ni porcentajes por parentesco: si quedan la esposa y dos hijos menores, son tres titulares y cada uno cobra un tercio.`,
  },
  {
    q: "¿Los hijos mayores de edad cobran junto con el cónyuge?",
    a: "No, salvo que tengan CUD. Los hijos mayores sin certificado de discapacidad están en el tramo subsidiario del artículo: entran «en caso de ausencia» de los supuestos anteriores. Si hay cónyuge o conviviente, o hijos menores, o hijos mayores con CUD, el reparto se agota entre ellos. Es uno de los puntos donde más se equivocan las notas que replican el texto viejo.",
  },
  {
    q: "¿Hace falta hacer la sucesión para cobrar?",
    a: `El artículo no pide juicio sucesorio: fija una lista propia de titulares y le da al empleador una regla práctica para pagar. Dice que «el empleador queda liberado del pago si cancela la misma dentro de los ${DIAS_LIBERACION_EMPLEADOR} días de ocurrido el deceso considerando la documentación con la que contaba y/o que le fuera entregada con motivo del mismo». Si después aparece alguien con igual o mejor derecho que los que cobraron, el artículo le da acción de repetición contra los otros acreedores, no contra el empleador. En la práctica: lo que decide quién cobra es la documentación que acredita el vínculo (partida de matrimonio, certificado de unión convivencial, partidas de nacimiento, CUD).`,
  },
  {
    q: "¿Se suma o se resta lo que paga la ART?",
    a: "Ninguna de las dos: se cobran las dos cosas. El propio artículo 248 dice que esta indemnización «es independiente de la que se reconozca a los causahabientes del trabajador por el Sistema de Riesgos del Trabajo, según el caso, y de cualquier otro beneficio que, por las leyes, Convenciones Colectivas de Trabajo, seguros, actos o contratos de previsión, le fuesen concedidos a los mismos en razón del fallecimiento del trabajador». Si la muerte fue por un accidente de trabajo o una enfermedad profesional, la prestación de la ART va aparte, igual que el seguro de vida obligatorio y que la pensión derivada de ANSES.",
  },
  {
    q: "¿Qué pasa si estaba en período de prueba?",
    a: "La indemnización del artículo 248 se calcula sobre la del 245, que se debe «luego de transcurrido el período de prueba» (artículo 92 bis: seis meses, ampliables por convenio). Si el fallecimiento ocurre dentro de ese plazo, la indemnización por antigüedad da cero. Lo que se paga igual es la liquidación final —aguinaldo proporcional, vacaciones no gozadas y días trabajados— y todo lo que no depende de la LCT: la ART, el seguro de vida obligatorio y la pensión de ANSES.",
  },
  {
    q: "¿Desde cuándo rige el texto nuevo?",
    a: `Desde el ${VIGENCIA_REFORMA}, fecha de publicación de la Ley 27.802 en el Boletín Oficial. La nota de vigencia del propio artículo dice «a partir de su publicación en el Boletín Oficial», así que no es retroactivo: un fallecimiento anterior a esa fecha se rige por el texto que estaba vigente entonces.`,
  },
  {
    q: "¿El tope del convenio también se aplica acá?",
    a: "Sí, porque el monto sale del artículo 245 y ese artículo tiene su tope: la base no puede exceder tres veces el salario mensual promedio del convenio colectivo aplicable. Pero el mismo artículo pone un piso: aun aplicando el tope, la base nunca puede quedar por debajo del 67% de la remuneración real. La calculadora de arriba te deja cargar el tope si lo conocés, y si no, calcula sin tope y te muestra el piso garantizado.",
  },
];

export default function IndemnizacionPorFallecimientoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de indemnización por fallecimiento del trabajador (art. 248 LCT)",
        url: "https://calcular.ar/indemnizacion-por-fallecimiento",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Indemnización por fallecimiento del trabajador: quién cobra y cuánto (art. 248 LCT)",
        descripcion:
          "El art. 248 de la LCT, sustituido por la Ley 27.802, cambió la lista de beneficiarios y el reparto. Monto (la mitad del art. 245), quiénes cobran y cómo se divide.",
        url: "/indemnizacion-por-fallecimiento",
        modificado: MUERTE_FUENTES.consultadoEl,
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
          Indemnización por fallecimiento del trabajador: quién cobra y cuánto
        </h1>
        <p className="text-zinc-600">
          El artículo 248 de la Ley de Contrato de Trabajo es el que decide qué le corresponde a la
          familia cuando un trabajador muere. La Ley 27.802 lo reescribió entero el{" "}
          {VIGENCIA_REFORMA}: cambió la lista de beneficiarios, cambió cómo se reparte la plata y le
          puso al empleador un plazo de {DIAS_LIBERACION_EMPLEADOR} días. Acá está el texto vigente
          y el cálculo, paso por paso.
        </p>
      </header>

      <RespuestaPrimero actualizado={MUERTE_FUENTES.consultadoEl}>
        <p>
          <strong>Se paga la mitad de la indemnización por despido</strong> —el artículo 248 remite
          al 247, que manda «la mitad de la prevista en el artículo 245»— y se reparte{" "}
          <strong>en partes iguales</strong> entre los titulares que llama el artículo, contando{" "}
          <strong>cada uno como uno</strong>: cónyuge o conviviente, hijos menores y hijos mayores
          con CUD. Los hijos mayores sin CUD y los padres a cargo cobran sólo si no hay ninguno de
          los anteriores. Se suma la liquidación final (aguinaldo proporcional, vacaciones no
          gozadas y días trabajados), no hay preaviso, y todo esto es{" "}
          <strong>independiente de lo que pague la ART</strong>, el seguro de vida obligatorio y la
          pensión de ANSES.
        </p>
      </RespuestaPrimero>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900">Calculá el monto y el reparto</h2>
        <CalculadoraMuerteTrabajador />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900">
          Quiénes cobran, según el texto vigente
        </h2>
        <p className="text-zinc-600">{MUERTE_TEXTOS.art248Encabezado}</p>
        <ol className="space-y-2">
          {BENEFICIARIOS_PRIMER_GRUPO.map((b) => (
            <li key={b.inciso} className="flex gap-3 rounded-lg bg-zinc-50 p-3 text-sm">
              <span className="font-semibold text-emerald-700">{b.inciso})</span>
              <span className="text-zinc-700">{b.texto}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-zinc-600">{MUERTE_TEXTOS.art248Reparto}</p>
        <p className="text-sm text-zinc-600">{MUERTE_TEXTOS.art248Subsidiarios}</p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>El detalle que cambia el resultado:</strong> los hijos mayores de edad sin CUD no
          concurren con el cónyuge. El artículo los llama «en caso de ausencia» de los supuestos
          anteriores, así que si hay cónyuge, conviviente, hijos menores o hijos con CUD, el reparto
          se agota entre ellos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900">Cómo se llega al número</h2>
        <ol className="space-y-3 text-zinc-700">
          <li>
            <strong>1. Indemnización por antigüedad del artículo 245.</strong> Un mes de sueldo por
            cada año de servicio o fracción mayor de tres meses, tomando la mejor remuneración
            mensual, normal y habitual del último año. Es el mismo cálculo que hace nuestra{" "}
            <Link href="/indemnizacion" className="text-emerald-700 underline">
              calculadora de indemnización por despido
            </Link>
            , con su tope de convenio y el piso del 67%.
          </li>
          <li>
            <strong>2. La mitad, por el artículo 247.</strong> «{MUERTE_TEXTOS.art247}» El 248
            remite justamente a ese monto.
          </li>
          <li>
            <strong>3. El reparto del artículo 248.</strong> Se divide en partes iguales entre los
            titulares llamados, cada uno contando como uno.
          </li>
          <li>
            <strong>4. La liquidación final, que va siempre.</strong> Aguinaldo proporcional al
            semestre (art. 123), vacaciones proporcionales no gozadas a sueldo ÷ 25 (arts. 155 y
            156) y los días trabajados del último mes. No hay preaviso ni integración del mes: la
            muerte no es un despido.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">Lo que se cobra aparte</h2>
        <p className="text-zinc-600">{MUERTE_TEXTOS.art248Independencia}</p>
        <p className="text-sm text-zinc-600">
          En criollo: la indemnización del artículo 248 no reemplaza ni descuenta la prestación por
          fallecimiento de la ART (si fue accidente de trabajo o enfermedad profesional), el seguro
          de vida obligatorio, la pensión derivada de ANSES ni los beneficios que fije el convenio
          colectivo. Son conceptos distintos y se cobran todos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">
          El plazo de {DIAS_LIBERACION_EMPLEADOR} días
        </h2>
        <p className="text-zinc-600">{MUERTE_TEXTOS.art248Liberacion}</p>
        <p className="text-sm text-zinc-600">
          Es la novedad más práctica del texto nuevo: le da al empleador una regla clara para pagar
          rápido con la documentación que tiene a mano, sin esperar una sucesión. Si más adelante
          aparece alguien con igual o mejor derecho, el artículo le da acción de repetición contra
          los que cobraron —no contra el empleador.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-lg border border-zinc-200 p-4">
              <summary className="cursor-pointer font-medium text-zinc-900">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">Fuentes oficiales</h2>
        <p className="text-sm text-zinc-500">
          Consultadas el {MUERTE_FUENTES.consultadoEl}. Sólo texto normativo oficial: nunca una nota
          periodística ni un resumen de terceros.
        </p>
        <ul className="space-y-3">
          {MUERTE_FUENTES.lista.map((f) => (
            <li key={f.nombre} className="text-sm">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 underline"
              >
                {f.nombre}
              </a>
              <p className="text-zinc-600">{f.detalle}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-400">
          Esta página es informativa y calcula lo que surge de la Ley de Contrato de Trabajo. Cada
          caso concreto —vínculos a acreditar, convenios con beneficios propios, discusiones sobre
          la base de cálculo— conviene consultarlo con un profesional.
        </p>
      </section>
    </article>
  );
}
