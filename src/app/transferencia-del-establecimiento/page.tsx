import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraTransferencia } from "@/components/CalculadoraTransferencia";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULOS_INTACTOS,
  ARTICULO_SUSTITUYENTE_225,
  ARTICULO_SUSTITUYENTE_228,
  TIPOS_OPERACION,
  TRANSFERENCIA_FUENTES,
  TRANSFERENCIA_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/transferencia-establecimiento";

export const metadata: Metadata = {
  title: "Cambió el dueño de la empresa: tu antigüedad y quién responde (arts. 225 a 229 LCT)",
  description: `La antigüedad se conserva entera: el art. 225 no cambió en eso. Lo que sí cambió el ${VIGENCIA_REFORMA} es el art. 228: el nuevo dueño puede quedar eximido de la solidaridad por las deudas que estaban ocultas. Calculá cuánto se juega.`,
  alternates: { canonical: "/transferencia-del-establecimiento" },
  openGraph: {
    title: "Transferencia del establecimiento: la antigüedad queda, la solidaridad tiene excepción",
    description: `El art. 47 de la Ley 27.802 sustituyó el art. 228 de la LCT: la debida diligencia del adquirente ahora lo exime de responder solidariamente por la información oculta o viciada.`,
    url: "https://calcular.ar/transferencia-del-establecimiento",
    images: [
      {
        url: "/og?t=Transferencia%20del%20establecimiento&s=La%20antig%C3%BCedad%20queda%2C%20la%20solidaridad%20tiene%20excepci%C3%B3n",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Cambió el dueño de la empresa. ¿Pierdo la antigüedad?",
    a: `No, y esta parte la reforma no la tocó. El artículo 225 dice que el contrato "continuará con el sucesor o adquirente, y el trabajador conservará la antigüedad adquirida con el transmitente y los derechos que de ella se deriven". Tus años siguen contando desde el día que entraste, no desde el cambio de dueño.`,
  },
  {
    q: "Me hicieron firmar un ingreso nuevo con la fecha de la transferencia. ¿Vale?",
    a: "Firmar un papel no borra los años trabajados: el artículo 225 hace continuar el mismo contrato, y el artículo 12 de la LCT declara nula toda convención que suprima o reduzca los derechos previstos en la ley. El riesgo no es legal, es práctico: si nadie lo discute, la liquidación sale calculada sobre la antigüedad equivocada. La calculadora de esta página te muestra, en pesos, exactamente cuánto es esa diferencia en tu caso.",
  },
  {
    q: "¿Quién me paga lo que me deben: el dueño viejo o el nuevo?",
    a: `Los dos, en principio. El artículo 228 hace solidariamente responsables al transmitente y al adquirente por las obligaciones laborales existentes al momento de la transmisión. Pero desde el ${VIGENCIA_REFORMA} tiene una excepción que antes no existía: si la deuda venía de "información oculta o viciada" que el adquirente no llegó a conocer "luego de realizar los actos de debida diligencia", queda eximido de la responsabilidad solidaria.`,
  },
  {
    q: "Entonces, ¿pierdo el crédito si el nuevo dueño prueba la debida diligencia?",
    a: "No: lo que perdés es un deudor, no el crédito. La obligación sigue existiendo y sigue siendo del transmitente — el que vendió la empresa. El problema es concreto y conviene decirlo sin vueltas: la solidaridad existía justamente para el caso en que ese transmitente ya no tenga con qué responder. Con el texto anterior, la excepción no existía en ningún supuesto.",
  },
  {
    q: "¿Qué cambió exactamente en el artículo 225?",
    a: `Cuatro palabras que cambian el alcance. El texto anterior decía que pasan al adquirente "todas las obligaciones emergentes del contrato de trabajo que el transmitente tuviera con el trabajador al tiempo de la transferencia, aun aquéllas que se originen con motivo de la misma", punto. El vigente agrega: "${TRANSFERENCIA_TEXTOS.remisionNueva}". El pase de obligaciones dejó de ser incondicional y quedó atado a las excepciones del artículo 228.`,
  },
  {
    q: "¿Puedo considerarme despedido por la transferencia?",
    a: "Sí, pero no automáticamente. El artículo 226 —que la reforma no tocó— exige un perjuicio que, apreciado con el criterio del artículo 242, justifique la denuncia del contrato, y enumera qué se pondera: que cambie el objeto de la explotación, que se alteren las funciones, el cargo o el empleo, o que una separación entre secciones, dependencias o sucursales derive en una disminución de la responsabilidad patrimonial del empleador. La causa hay que poder probarla; el monto es el de un despido sin causa.",
  },
  {
    q: "¿Y si no vendieron la empresa sino que la alquilaron?",
    a: "El artículo 227 aplica las mismas reglas de los artículos 225 y 226 al arrendamiento y a la cesión transitoria, y agrega una regla que casi nadie recuerda: cuando el propietario recupera el establecimiento —al vencer el arrendamiento o la cesión—, asume las mismas obligaciones del artículo 225. Ese artículo está intacto: la Ley 27.802 no lo tocó.",
  },
  {
    q: "Me quieren pasar a otra empresa sin que se transfiera el establecimiento. ¿Pueden?",
    a: "Sólo con tu conformidad. El artículo 229 dice que la cesión del personal sin el establecimiento \"requiere la aceptación expresa y por escrito del trabajador\", y agrega que aun mediando esa conformidad cedente y cesionario responden solidariamente por todas las obligaciones de la relación cedida. También quedó intacto.",
  },
  {
    q: "La transferencia fue antes de marzo de 2026. ¿Qué texto se aplica?",
    a: `El anterior, que no tenía ninguna excepción a la solidaridad: "${TRANSFERENCIA_TEXTOS.solidaridadAnterior}". Las notas de los artículos 225 y 228 fijan la vigencia de los textos nuevos "a partir de su publicación en el Boletín Oficial", que fue el ${VIGENCIA_REFORMA}. Esta página publica los cuatro textos —vigentes y anteriores— para que puedas comparar.`,
  },
];

export default function TransferenciaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de transferencia del establecimiento (arts. 225 a 229 LCT)",
        url: "https://calcular.ar/transferencia-del-establecimiento",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Transferencia del establecimiento: los arts. 225 y 228 de la LCT después de la Ley 27.802",
        descripcion:
          "Los arts. 46 y 47 de la Ley 27.802 sustituyeron los arts. 225 y 228 de la LCT el 6/3/2026. La antigüedad del trabajador se sigue conservando, pero la solidaridad del transmitente y el adquirente dejó de ser absoluta: la debida diligencia del adquirente lo exime respecto de la información oculta o viciada.",
        url: "/transferencia-del-establecimiento",
        modificado: TRANSFERENCIA_FUENTES.consultadoEl,
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
          Cambió el dueño de la empresa: tu antigüedad y quién responde
        </h1>
        <p className="text-zinc-600">
          Vendieron la empresa, la alquilaron o te pasaron a otra razón social. Hay dos preguntas y
          se contestan distinto: <strong>tu antigüedad no se toca</strong> —eso la reforma no lo
          cambió— pero <strong>quién te la tiene que pagar sí cambió</strong>, el{" "}
          {VIGENCIA_REFORMA}.
        </p>
      </header>

      <RespuestaPrimero actualizado={TRANSFERENCIA_FUENTES.consultadoEl}>
        <p>
          <strong>La antigüedad se conserva entera.</strong> El art. 225 sigue diciendo, con las
          mismas palabras de siempre, que «{TRANSFERENCIA_TEXTOS.antiguedadQueSeConserva}». Lo que
          cambió está en el art. 228, sustituido por el art. {ARTICULO_SUSTITUYENTE_228} de la Ley
          27.802: la solidaridad entre el que vendió y el que compró{" "}
          <strong>dejó de ser absoluta</strong>. Hoy el texto exime al adquirente de responder
          solidariamente por «{TRANSFERENCIA_TEXTOS.defensaDeDebidaDiligencia}». El texto anterior
          no tenía excepción alguna. Y el art. 225 se ató a esa regla: el art.{" "}
          {ARTICULO_SUSTITUYENTE_225} de la reforma le agregó «{TRANSFERENCIA_TEXTOS.remisionNueva}
          ». Ojo con la lectura: <strong>el crédito no se extingue, desaparece un deudor</strong> — y
          el que queda es el que vendió.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto se juega en tu caso</h2>
        <p className="text-sm text-zinc-600">
          Cargá las tres fechas y tu mejor remuneración. La calculadora liquida los dos escenarios
          —con toda la antigüedad, como manda el art. 225, y desde la transferencia, como sale una
          liquidación mal hecha— y te dice quién responde por esa deuda.
        </p>
        <CalculadoraTransferencia />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las tres formas de cambiar de empleador</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {TIPOS_OPERACION.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Art. {t.articulo}
              </p>
              <p className="mt-1 font-semibold text-zinc-900">{t.etiqueta}</p>
              <p className="mt-2 text-xs font-medium text-emerald-700">
                {t.conservaAntiguedad ? "Conservás la antigüedad" : ""}
              </p>
              <p className="mt-2 text-sm text-zinc-600">{t.nota}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 228 — texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TRANSFERENCIA_TEXTOS.art228Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{TRANSFERENCIA_TEXTOS.art228Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 228 — texto anterior (hasta el {VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TRANSFERENCIA_TEXTOS.art228Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Recuperado de la captura oficial del 15 de diciembre de 2025 de esa misma página de
              InfoLEG. La primera oración es la que todo el mundo cita: solidaridad sin condiciones.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 225 — texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TRANSFERENCIA_TEXTOS.art225Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{TRANSFERENCIA_TEXTOS.art225Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 225 — texto anterior (hasta el {VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TRANSFERENCIA_TEXTOS.art225Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              La única diferencia con el vigente son las palabras «
              {TRANSFERENCIA_TEXTOS.remisionNueva}». La oración de la antigüedad es idéntica en los
              dos.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cuatro artículos del título que la reforma NO tocó
        </h2>
        <p className="text-sm text-zinc-600">
          Ninguno de estos lleva nota de sustitución en el texto actualizado: arts.{" "}
          {ARTICULOS_INTACTOS.join(", ")}. Se citan porque son la mitad de la respuesta.
        </p>
        <div className="space-y-3">
          {[
            { art: "Art. 226 — Situación de despido", texto: TRANSFERENCIA_TEXTOS.art226 },
            {
              art: "Art. 227 — Arrendamiento o cesión transitoria",
              texto: TRANSFERENCIA_TEXTOS.art227,
            },
            { art: "Art. 229 — Cesión del personal", texto: TRANSFERENCIA_TEXTOS.art229 },
            { art: "Art. 230 — Transferencia a favor del Estado", texto: TRANSFERENCIA_TEXTOS.art230 },
          ].map((a) => (
            <details
              key={a.art}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
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
          Otros artículos de la LCT que la misma reforma cambió de raíz:{" "}
          <Link href="/ius-variandi" className="font-medium text-emerald-700 hover:underline">
            el ius variandi de los arts. 66 y 68
          </Link>
          ,{" "}
          <Link href="/despido-plazo-fijo" className="font-medium text-emerald-700 hover:underline">
            el despido antes del vencimiento del plazo
          </Link>{" "}
          y{" "}
          <Link href="/reingreso" className="font-medium text-emerald-700 hover:underline">
            el reingreso del art. 18
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {TRANSFERENCIA_FUENTES.lista.map((f) => (
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
          los textos anteriores de los arts. 225 y 228 recuperados de una captura de esa misma
          página previa a la reforma — no un resumen de prensa. Es informativa y orientativa: no
          reemplaza el asesoramiento de un profesional ni una liquidación. Consultada el{" "}
          {TRANSFERENCIA_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
