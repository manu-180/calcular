import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraConservacion } from "@/components/CalculadoraConservacion";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_LABORAL,
  ANIOS_PREVISIONAL,
  ARTICULO_SUSTITUYENTE,
  CONSERVACION_FUENTES,
  CONSERVACION_TEXTOS,
  MESES_INTERRUPCION_ART257,
  VIGENCIA_REFORMA,
} from "@/data/conservacion-recibos";

export const metadata: Metadata = {
  title: `Cuánto tiempo hay que guardar los recibos de sueldo: ${ANIOS_LABORAL} y ${ANIOS_PREVISIONAL} años (art. 143 LCT)`,
  description: `Hasta el ${VIGENCIA_REFORMA} la ley no traía ningún número: remitía «a la prescripción liberatoria del beneficio de que se trate». El art. 143 vigente escribe los dos plazos: ${ANIOS_LABORAL} años laborales y ${ANIOS_PREVISIONAL} previsionales. Calculá la fecha exacta de tu recibo.`,
  alternates: { canonical: "/conservacion-de-recibos" },
  openGraph: {
    title: "Recibos de sueldo: la ley por fin puso los números",
    description: `El art. 40 de la Ley 27.802 sustituyó el art. 143 de la LCT: ${ANIOS_LABORAL} años por las obligaciones laborales y ${ANIOS_PREVISIONAL} por las previsionales, escritos en el artículo.`,
    url: "https://calcular.ar/conservacion-de-recibos",
    images: [
      {
        url: "/og?t=Conservaci%C3%B3n%20de%20recibos&s=Art.%20143%20LCT%3A%202%20a%C3%B1os%20laborales%2C%2010%20previsionales",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto tiempo tengo que guardar los recibos de sueldo?",
    a: `El artículo 143 de la Ley de Contrato de Trabajo, en su texto vigente desde el ${VIGENCIA_REFORMA}, dice que el empleador debe conservar los recibos y otras constancias de pago "a fin de acreditar sus obligaciones considerando el plazo de prescripción de obligaciones laborales -dos (2) años-, y previsionales -diez (10) años-". En la práctica manda el más largo: el mismo papel prueba las dos cosas.`,
  },
  {
    q: "¿No eran cinco años, o diez?",
    a: `Antes de la reforma la ley no decía ningún número. El texto anterior era una remisión: "durante todo el plazo correspondiente a la prescripción liberatoria del beneficio de que se trate". Por eso circulan tantas cifras distintas, y por eso casi todo lo publicado sobre el tema sigue sin dar una. Desde el ${VIGENCIA_REFORMA} los dos plazos están escritos en el propio artículo.`,
  },
  {
    q: `¿Puedo destruir los recibos a los ${ANIOS_LABORAL} años?`,
    a: `No es lo que dice el artículo. El texto enuncia los dos plazos que hay que "considerar", y un mismo recibo acredita tanto la obligación laboral como la previsional. Si lo destruís cuando vence el plazo laboral, quedás sin respaldo por los ${ANIOS_PREVISIONAL - ANIOS_LABORAL} años que le siguen corriendo al previsional. La calculadora de esta página te da las dos fechas y te marca cuál manda.`,
  },
  {
    q: "¿Tengo que guardar el papel o alcanza con el archivo digital?",
    a: 'Alcanza con el digital, y lo dice la misma norma: "A efectos de la conservación de los recibos y otras constancias de pago, los mismos podrán ser digitalizados, los cuales tendrán la misma validez que en formato papel". Esa oración ya estaba antes de la reforma —la había incorporado el Decreto 70/2023— y la Ley 27.802 no la tocó.',
  },
  {
    q: `¿De dónde salen los ${ANIOS_LABORAL} años?`,
    a: `Del artículo 256 de la misma ley: "Prescriben a los dos (2) años las acciones relativas a créditos provenientes de las relaciones individuales de trabajo". Ese artículo agrega algo importante: el plazo "tiene carácter de orden público y no puede ser modificado por convenciones individuales o colectivas". El artículo 143 no inventó un plazo nuevo: escribió el que ya estaba.`,
  },
  {
    q: `¿Los ${ANIOS_LABORAL} años corren siempre de corrido?`,
    a: `No necesariamente. El artículo 257 dice que la reclamación ante la autoridad administrativa del trabajo interrumpe el curso de la prescripción durante el trámite, "pero en ningún caso por un lapso mayor de ${MESES_INTERRUPCION_ART257} meses". Si hubo un reclamo administrativo, la fecha límite real se corre. La calculadora usa el plazo sin interrupciones: es el piso, no el techo.`,
  },
  {
    q: "Si pagué el último mes, ¿se presume que pagué los anteriores?",
    a: 'No, y el propio artículo 143 lo dice en su última oración: "El pago hecho por un último o ulteriores períodos no hace presumir el pago de los anteriores". Cada período se prueba con su propia constancia. Es otra razón para no archivar antes de tiempo.',
  },
  {
    q: "¿Qué pasa si no tengo la constancia?",
    a: "Que perdés la prueba justo donde más pesa. Desde la reforma, el artículo 55 de la LCT hace nacer la presunción a favor del trabajador de la omisión de registración, y las constancias de pago son parte de lo que la desactiva. Guardar no es un trámite: es la defensa.",
  },
];

export default function ConservacionRecibosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de conservación de recibos de sueldo (art. 143 LCT)",
        url: "https://calcular.ar/conservacion-de-recibos",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Conservación de recibos de sueldo: el art. 143 de la LCT después de la Ley 27.802",
        descripcion:
          "El art. 40 de la Ley 27.802 sustituyó el art. 143 de la LCT el 6/3/2026 y le puso números a una regla que no los tenía: dos años por las obligaciones laborales y diez por las previsionales, en lugar de la remisión genérica a «la prescripción liberatoria del beneficio de que se trate».",
        url: "/conservacion-de-recibos",
        modificado: CONSERVACION_FUENTES.consultadoEl,
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
          Cuánto tiempo hay que guardar los recibos de sueldo
        </h1>
        <p className="text-zinc-600">
          Es la pregunta que circula con cinco respuestas distintas, y por una buena razón:{" "}
          <strong>hasta marzo de 2026 la ley no daba ninguna</strong>. Decía «durante todo el plazo
          correspondiente a la prescripción liberatoria del beneficio de que se trate». Ahora el
          artículo trae los dos números escritos.
        </p>
      </header>

      <RespuestaPrimero actualizado={CONSERVACION_FUENTES.consultadoEl}>
        <p>
          <strong>
            {ANIOS_LABORAL} años por las obligaciones laborales y {ANIOS_PREVISIONAL} por las
            previsionales
          </strong>
          , y en la práctica manda el más largo. Lo dice el art. 143 de la LCT en el texto que le
          dio el art. {ARTICULO_SUSTITUYENTE} de la Ley 27.802 el {VIGENCIA_REFORMA}: hay que
          conservar los recibos «{CONSERVACION_TEXTOS.reglaVigente}». El texto anterior no traía
          ningún número — era una remisión, y por eso todavía se publican cifras contradictorias. Los{" "}
          {ANIOS_LABORAL} años no son un invento del artículo: son los del art. 256, que además los
          declara de orden público. Y no hace falta papel: la misma norma admite el archivo
          digitalizado «con la misma validez que en formato papel».
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Hasta cuándo guardar este recibo</h2>
        <CalculadoraConservacion />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 143 — texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{CONSERVACION_TEXTOS.art143Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{CONSERVACION_TEXTOS.art143Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 143 — texto anterior (hasta el {VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{CONSERVACION_TEXTOS.art143Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Recuperado de la captura oficial del 15 de diciembre de 2025 de esa misma página de
              InfoLEG. La única diferencia entre los dos textos es la primera oración: las otras dos
              —la del archivo digital y la de los pagos anteriores— son idénticas.
            </p>
          </blockquote>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              El control cruzado
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-800">LCT, art. 256 — Plazo común</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{CONSERVACION_TEXTOS.art256}»</p>
            <p className="mt-2 text-xs text-zinc-600">
              Un número no se publica sin anclarlo contra otra norma. Los {ANIOS_LABORAL} años del
              art. 143 son exactamente los de este artículo, que ya existía y no fue tocado por la
              reforma.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que rodea al recibo</h2>
        <div className="space-y-3">
          {[
            {
              art: "Art. 144 — Firmar una planilla no reemplaza el recibo",
              texto: CONSERVACION_TEXTOS.art144,
            },
            {
              art: "Art. 145 — El recibo no puede contener renuncias",
              texto: CONSERVACION_TEXTOS.art145,
            },
            {
              art: `Art. 257 — El plazo se puede interrumpir, hasta ${MESES_INTERRUPCION_ART257} meses`,
              texto: CONSERVACION_TEXTOS.art257,
            },
          ].map((a) => (
            <details key={a.art} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
            </details>
          ))}
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
          El otro lado de la documentación laboral:{" "}
          <Link href="/libro-de-sueldos" className="font-medium text-emerald-700 hover:underline">
            el libro de sueldos y la presunción del art. 55
          </Link>{" "}
          y{" "}
          <Link href="/blog/nuevo-recibo-de-sueldo-2026" className="font-medium text-emerald-700 hover:underline">
            el recibo de sueldo digital de 2026
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {CONSERVACION_FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial de la Ley de Contrato de Trabajo publicado en InfoLEG y
          el texto anterior del art. 143 recuperado de una captura de esa misma página previa a la
          reforma — no un resumen de prensa. Es informativa y orientativa: no reemplaza el
          asesoramiento de un profesional. Consultada el {CONSERVACION_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
