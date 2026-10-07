import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraIusVariandi } from "@/components/CalculadoraIusVariandi";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIO_LEY_26088,
  ARTICULO_SUSTITUYENTE_66,
  ARTICULO_SUSTITUYENTE_68,
  CAMINOS,
  IUS_VARIANDI_FUENTES,
  IUS_VARIANDI_TEXTOS,
  LEY_QUE_CREO_EL_RESTABLECIMIENTO,
  VIGENCIA_REFORMA,
} from "@/data/ius-variandi";

export const metadata: Metadata = {
  title: "Ius variandi: qué hacer si te cambian las condiciones",
  description:
    "La Ley 27.802 reescribió los arts. 66 y 68 de la LCT: cayó la acción de restablecimiento y entró la intimación previa. Calculá qué opciones te quedan.",
  alternates: { canonical: "/ius-variandi" },
  openGraph: {
    title: "Ius variandi: quedó un solo camino, y termina el contrato",
    description: `Los arts. 66 y 68 de la LCT cambiaron el ${VIGENCIA_REFORMA}. La opción de reclamar que las condiciones vuelvan a ser las de antes (creada en ${ANIO_LEY_26088}) se eliminó del artículo.`,
    url: "https://calcular.ar/ius-variandi",
    images: [
      {
        url: "/og?t=Ius%20variandi&s=Arts.%2066%20y%2068%20LCT%3A%20qued%C3%B3%20un%20solo%20camino",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Qué es el ius variandi?",
    a: "Es el permiso que tiene el empleador para cambiar cómo se hace el trabajo: horarios, tareas, lugar, organización. La ley se lo da, pero con límites. El artículo 66 de la Ley de Contrato de Trabajo fija esos límites y dice qué podés hacer si los pasan por encima.",
  },
  {
    q: "¿Qué límites tiene hoy?",
    a: `Dos, y están escritos en el texto vigente: que el cambio no toque partes esenciales del contrato y que no te cause un perjuicio material. El texto anterior tenía cuatro: esos dos, más el perjuicio moral y que el cambio no fuera "un ejercicio irrazonable de esa facultad". Esas dos últimas frases salieron del artículo el ${VIGENCIA_REFORMA}.`,
  },
  {
    q: "¿Sigo pudiendo pedirle al juez que las cosas vuelvan como estaban?",
    a: `Por el artículo 66, no. Hasta el ${VIGENCIA_REFORMA} el trabajador podía "optar por considerarse despedido sin causa o accionar persiguiendo el restablecimiento de las condiciones alteradas", en un juicio rápido y "no pudiéndose innovar en las condiciones y modalidades de trabajo (…) hasta que recaiga sentencia definitiva". Esa opción la había creado la Ley ${LEY_QUE_CREO_EL_RESTABLECIMIENTO} en ${ANIO_LEY_26088}, y la Ley 27.802 la eliminó entera. Hoy el artículo deja un solo camino, y es el que termina el contrato.`,
  },
  {
    q: "¿Tengo que intimar antes de considerarme despedido?",
    a: "Sí, y esto es nuevo. El texto vigente dice que podés considerarte despedido «previa intimación y si ésta fuere desoída». El texto anterior no pedía ese paso. Conviene hacerlo por un medio que deje constancia (telegrama laboral o carta documento): describí el cambio, nombrá el artículo 66 y dales un plazo para corregirlo. Es el requisito que más rápido puede tirar abajo un reclamo bien armado.",
  },
  {
    q: "Si el cambio me hace daño moral pero no económico, ¿qué me queda?",
    a: `Por el texto del artículo 66, hoy no alcanza: el vigente solo prohíbe el perjuicio "material". Pero hay que decir dónde termina el texto y empieza la interpretación. El artículo 65, que la reforma no tocó, sigue exigiendo que las facultades de dirección se ejerzan "con carácter funcional (…) sin perjuicio de la preservación y mejora de los derechos personales y patrimoniales del trabajador". Si queda algún límite, va a salir de ahí. La reforma es de marzo de 2026 y todavía no hay fallos. Por eso esta página publica los textos y no una respuesta que todavía no existe.`,
  },
  {
    q: "¿Qué cambió en el artículo 68?",
    a: 'Perdió su última oración entera. Decía que "siempre se cuidará de satisfacer las exigencias de la organización del trabajo en la empresa y el respeto debido a la dignidad del trabajador y sus derechos patrimoniales, excluyendo toda forma de abuso del derecho". Esa frase era el límite general de todas las facultades del empleador (dirección, organización, sanciones, ius variandi y suspensiones económicas), y ya no está. Lo que quedó es que esas facultades se usen según la ley, los estatutos profesionales y los convenios colectivos.',
  },
  {
    q: "¿Cuánto cobro si me considero despedido?",
    a: "Lo mismo que en un despido sin causa. El artículo 246 dice que quien termina el contrato con justa causa tiene derecho a las indemnizaciones de los artículos 232 (preaviso), 233 (integración del mes) y 245 (antigüedad). El despido indirecto no paga ni más ni menos que el directo. Lo que cambia es quién tiene que probar la causa, y ahí está todo el riesgo.",
  },
  {
    q: "¿Pueden bajarme la categoría como sanción?",
    a: "No, y ese artículo no cambió. El artículo 69 dice que \"no podrán aplicarse sanciones disciplinarias que constituyan una modificación del contrato de trabajo\". Bajarte de categoría o cambiarte las tareas como castigo sigue prohibido por ese artículo, además del 66.",
  },
  {
    q: "Me cambiaron las condiciones antes de marzo de 2026. ¿Qué texto se aplica?",
    a: `El anterior. Las notas de los dos artículos dicen que rigen "a partir de su publicación en el Boletín Oficial", que fue el ${VIGENCIA_REFORMA}. Si el cambio fue antes de esa fecha, el artículo 66 todavía tenía los cuatro límites y la opción de pedir que todo vuelva atrás. Esta página publica los cuatro textos completos (los vigentes y los anteriores) para que puedas comparar.`,
  },
];

export default function IusVariandiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de ius variandi y despido indirecto (arts. 66 y 68 LCT)",
        url: "https://calcular.ar/ius-variandi",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Ius variandi: los arts. 66 y 68 de la LCT después de la Ley 27.802",
        descripcion:
          "Los arts. 23 y 24 de la Ley 27.802 sustituyeron los arts. 66 y 68 de la LCT el 6/3/2026. Cayeron el ejercicio irrazonable y el perjuicio moral como límites del ius variandi, cayó la cláusula de dignidad y abuso del derecho del art. 68, y desapareció la acción de restablecimiento que la Ley 26.088 había creado en 2006. Entró un requisito nuevo: intimación previa desoída.",
        url: "/ius-variandi",
        modificado: IUS_VARIANDI_FUENTES.consultadoEl,
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
          Ius variandi: qué podés hacer hoy si te cambian las condiciones
        </h1>
        <p className="text-zinc-600">
          Te cambiaron el horario, las tareas o el lugar de trabajo. Hasta marzo de 2026 tenías dos
          caminos: irte cobrando la indemnización, o quedarte y pedirle al juez que las cosas
          volvieran atrás. <strong>El segundo camino ya no está en la ley</strong>. Y de paso, el
          artículo perdió dos de los cuatro límites que le ponía al empleador.
        </p>
      </header>

      <RespuestaPrimero actualizado={IUS_VARIANDI_FUENTES.consultadoEl}>
        <p>
          <strong>
            Los arts. 66 y 68 de la LCT se reescribieron el {VIGENCIA_REFORMA}
          </strong>{" "}
          con los arts. {ARTICULO_SUSTITUYENTE_66} y {ARTICULO_SUSTITUYENTE_68} de la Ley 27.802, y
          rigen desde ese día. Del art. 66 salieron tres cosas. El límite del{" "}
          <strong>«ejercicio irrazonable de esa facultad»</strong>. La palabra{" "}
          <strong>«moral»</strong> en el perjuicio que el cambio no puede causar. Y la más grande:
          la opción de{" "}
          <strong>«accionar persiguiendo el restablecimiento de las condiciones alteradas»</strong>{" "}
          en un juicio rápido, que la Ley {LEY_QUE_CREO_EL_RESTABLECIMIENTO} había creado en{" "}
          {ANIO_LEY_26088}. Entró un requisito: <strong>«previa intimación y si ésta fuere
          desoída»</strong>. Del art. 68 salió su última oración entera, la de la dignidad del
          trabajador y el abuso del derecho, que era el límite general de todas las facultades del
          empleador. El <strong>art. 65 quedó intacto</strong>, y hoy es lo único en lo que se
          puede apoyar un reclamo por un cambio irrazonable.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Evaluá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Marcá qué pasa con el cambio que te impusieron y en qué estado está la intimación. Si el
          camino que queda es el despido indirecto, la calculadora lo liquida con la misma cuenta
          que{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de despido sin causa
          </Link>
          .
        </p>
        <CalculadoraIusVariandi />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los dos caminos, y el que se cerró</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CAMINOS.map((c) => (
            <div
              key={c.id}
              className={`rounded-xl border p-4 shadow-sm ${
                c.disponibleHoy
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-rose-200 bg-rose-50/40"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {c.disponibleHoy ? "Sigue disponible" : `Eliminado el ${VIGENCIA_REFORMA}`}
              </p>
              <p className="mt-1 font-semibold text-zinc-900">{c.titulo}</p>
              <p className="mt-2 text-sm text-zinc-600">{c.detalle}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-600">
          Lo que hace grande a este cambio es que el camino que quedó{" "}
          <strong>termina el contrato</strong>. Si no podías darte el lujo de quedarte sin trabajo
          mientras discutías, hasta marzo de 2026 tenías una forma de reclamar sin irte. Hoy el
          artículo 66 no te la da. Si el cambio vino porque la empresa cambió de dueño, mirá también{" "}
          <Link
            href="/transferencia-del-establecimiento"
            className="font-medium text-emerald-700 hover:underline"
          >
            qué pasa con tu antigüedad cuando venden la empresa
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 66: texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{IUS_VARIANDI_TEXTOS.art66Vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">{IUS_VARIANDI_TEXTOS.art66Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 66: texto anterior (hasta el {VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{IUS_VARIANDI_TEXTOS.art66Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Sale de la captura oficial del 15 de diciembre de 2025 de esa misma página de InfoLEG.
              Es el texto que sigue citando casi todo lo que se publicó sobre ius variandi.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 68: texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{IUS_VARIANDI_TEXTOS.art68Vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">{IUS_VARIANDI_TEXTOS.art68Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 68: texto anterior (hasta el {VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{IUS_VARIANDI_TEXTOS.art68Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              La última oración es la que desapareció:{" "}
              <em>«{IUS_VARIANDI_TEXTOS.clausulaDeDignidadQueSalio}»</em>
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-400 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 65: intacto, la reforma no lo tocó
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{IUS_VARIANDI_TEXTOS.art65}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              No tiene nota de cambio. Es el único lugar del capítulo donde sigue escrito que las
              facultades del empleador se ejercen «con carácter funcional» y «sin perjuicio de la
              preservación y mejora de los derechos personales y patrimoniales del trabajador».
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que la reforma NO tocó (y conviene saber)
        </h2>
        <div className="space-y-3">
          <details className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-semibold text-zinc-800">
              Art. 69: cambiarte el contrato no puede ser una sanción
            </summary>
            <p className="mt-2 text-sm italic text-zinc-600">«{IUS_VARIANDI_TEXTOS.art69}»</p>
            <p className="mt-2 text-sm text-zinc-700">
              Sigue vigente, sin cambios. Bajarte de categoría o cambiarte las tareas como castigo
              está prohibido por este artículo, además del 66.
            </p>
          </details>
          <details className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-semibold text-zinc-800">
              Art. 246: el despido indirecto paga lo mismo que el directo
            </summary>
            <p className="mt-2 text-sm italic text-zinc-600">«{IUS_VARIANDI_TEXTOS.art246}»</p>
            <p className="mt-2 text-sm text-zinc-700">
              Los mismos tres artículos que en un despido sin causa. Lo que cambia no es el monto:
              es quién tiene que probar la causa.
            </p>
          </details>
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
          Otros artículos de la LCT que la misma reforma cambió de raíz:{" "}
          <Link href="/despido-plazo-fijo" className="font-medium text-emerald-700 hover:underline">
            el despido antes del vencimiento del plazo
          </Link>
          ,{" "}
          <Link href="/reserva-del-empleo" className="font-medium text-emerald-700 hover:underline">
            la reserva del empleo
          </Link>{" "}
          y{" "}
          <Link href="/libro-de-sueldos" className="font-medium text-emerald-700 hover:underline">
            la presunción del art. 55
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {IUS_VARIANDI_FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial de la Ley de Contrato de Trabajo publicado en InfoLEG, y
          los textos anteriores de los arts. 66 y 68 sacados de una captura de esa misma página de
          antes de la reforma. No es un resumen de prensa. Es informativa: no reemplaza el consejo
          de un profesional. Considerarte despedido es una decisión con riesgo propio, así que
          consultala antes de tomarla. Consultada el{" "}
          {IUS_VARIANDI_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
