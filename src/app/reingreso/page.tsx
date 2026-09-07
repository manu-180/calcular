import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraReingreso } from "@/components/CalculadoraReingreso";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_ANTIGUEDAD,
  ARTICULO_SUSTITUTIVO,
  ARTICULO_SUSTITUTIVO_ANTIGUEDAD,
  CORTE_ANIOS,
  INDEMNIZACIONES_ALCANZADAS,
  REINGRESO_FUENTES,
  REINGRESO_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/reingreso";

export const metadata: Metadata = {
  title: "Reingreso al mismo empleador: qué antigüedad te cuentan y cuánto te descuentan",
  description: `Si volviste a trabajar para el mismo empleador, dos artículos de la LCT deciden tu indemnización, y los dos cambiaron el ${VIGENCIA_REFORMA}: el art. ${ARTICULO_ANTIGUEDAD} ya no computa la antigüedad vieja si pasaron ${CORTE_ANIOS} años, y el art. ${255} deduce lo que cobraste actualizado por IPC. Calculalo con las dos reglas nuevas.`,
  alternates: { canonical: "/reingreso" },
  openGraph: {
    title: "Reingreso al mismo empleador: la antigüedad que se pierde a los 2 años",
    description:
      "La Ley 27.802 reescribió los arts. 18 y 255 de la LCT: si entre el cese y el reingreso pasaron dos años, el tiempo viejo no se computa; y si se computa, lo que cobraste se deduce actualizado por IPC.",
    url: "https://calcular.ar/reingreso",
    images: [
      {
        url: "/og?t=Reingreso%20al%20mismo%20empleador&s=Arts.%2018%20y%20255%20LCT%20seg%C3%BAn%20la%20Ley%2027.802",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Volví a trabajar para el mismo empleador, ¿me cuentan la antigüedad vieja?",
    a: `Depende de cuánto tiempo pasó, y ésta es la regla nueva: desde el ${VIGENCIA_REFORMA}, el artículo ${ARTICULO_ANTIGUEDAD} de la LCT —sustituido por el artículo ${ARTICULO_SUSTITUTIVO_ANTIGUEDAD}º de la Ley 27.802— dice que "si transcurriese un plazo de dos (2) años entre el cese del vínculo laboral, cualquiera fuera la causa, y el trabajador reingresara a prestar servicios con el mismo empleador, la antigüedad del tiempo de servicio anterior no será computada". Antes de esa reforma el tiempo viejo se computaba siempre, sin importar cuántos años hubieran pasado en el medio. Es el cambio que más plata mueve en este tema y casi no se publica, porque vive en un artículo distinto del que todos citan para el reingreso.`,
  },
  {
    q: "¿Cuánto me descuentan de la indemnización nueva?",
    a: `Lo que cobraste por el cese anterior, pero actualizado. El artículo 255, sustituido por el artículo ${ARTICULO_SUSTITUTIVO} de la misma ley, manda deducir "lo pagado oportunamente, actualizado por el Índice de Precios al Consumidor (IPC)". La diferencia con el texto que repiten los resúmenes —"se deduce lo pagado oportunamente", a secas— es enorme en una economía con inflación de tres dígitos: una indemnización cobrada hace cinco años, actualizada, puede ser varias veces su valor nominal.`,
  },
  {
    q: "¿Hay un límite a ese descuento?",
    a: "Sí, y es la protección más importante del artículo: «en ningún caso la indemnización resultante podrá ser inferior a la que hubiera correspondido al trabajador si su período de servicios hubiera sido solo el último y con prescindencia de los períodos anteriores al reingreso». O sea: por más que la deducción actualizada sea grande, nunca podés cobrar menos de lo que te correspondería si sólo contara la última etapa. La calculadora marca cuándo ese piso es el que define tu resultado.",
  },
  {
    q: "¿El descuento lleva intereses además del IPC?",
    a: "No, y es un cambio fino que conviene mirar. La versión inmediatamente anterior del artículo (la que le dio el artículo 83 del DNU 70/2023) decía «actualizado por el Índice de Precios al Consumidor (IPC) con más una tasa de interés pura del 3% anual». El texto vigente conservó el IPC y eliminó esa tasa. El detalle que casi nadie cruza es que la misma Ley 27.802 dejó ese 3% en el artículo 276, para la actualización de los créditos laborales: hoy la LCT tiene dos fórmulas distintas de repotenciación, y la de este artículo —la que se descuenta— es la más chica.",
  },
  {
    q: "¿De qué indemnizaciones se deduce?",
    a: `La lista del artículo es taxativa: arts. 245 (despido sin causa), 246 (despido indirecto), 247 (falta o disminución de trabajo y fuerza mayor), 250 (plazo fijo), 251 (quiebra), 253 (jubilado que reingresa) y 254 (incapacidad). Si el rubro no está en esa lista —el preaviso, la integración del mes, las vacaciones proporcionales, el aguinaldo— no se deduce nada.`,
  },
  {
    q: "Si pasaron más de dos años, ¿igual me descuentan lo que cobré?",
    a: "No, según la lectura que aplica esta calculadora: la deducción del artículo 255 existe para que no se pague dos veces el mismo tramo de antigüedad, y si ese tramo quedó afuera del cómputo por el artículo 18, no hay nada que evitar. La norma no lo resuelve con todas las letras y la reforma es de marzo de 2026, así que todavía no hay jurisprudencia: lo decimos abiertamente en vez de esconderlo dentro del resultado.",
  },
  {
    q: "Mi reingreso fue antes de marzo de 2026, ¿me aplica el corte de los dos años?",
    a: `Las dos reformas rigen desde el ${VIGENCIA_REFORMA} y no son retroactivas: la nota de vigencia de los propios artículos dice "a partir de su publicación en el Boletín Oficial". Si tu reingreso ocurrió antes, el corte de los dos años no existía cuando la relación se reanudó, y es una discusión abierta —de las que se resuelven en juicio— si se aplica a un vínculo que ya estaba en curso. La calculadora aplica el texto vigente y lo aclara en el resultado.`,
  },
  {
    q: "¿La antigüedad incluye el preaviso?",
    a: "Sí. El artículo 19 de la LCT, que la reforma no tocó, dice que también es tiempo de servicio el que corresponde al plazo de preaviso fijado por la ley o los estatutos especiales, cuando haya sido concedido.",
  },
];

export default function ReingresoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de reingreso al mismo empleador (arts. 18 y 255 LCT)",
        url: "https://calcular.ar/reingreso",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Reingreso al mismo empleador: antigüedad computable y deducción del art. 255",
        descripcion:
          "La Ley 27.802 sustituyó los arts. 18 y 255 de la LCT: la antigüedad anterior no se computa si pasaron dos años entre el cese y el reingreso, y lo cobrado en el cese anterior se deduce actualizado por IPC, con el piso del último período.",
        url: "/reingreso",
        modificado: REINGRESO_FUENTES.consultadoEl,
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
          Reingreso al mismo empleador: qué antigüedad te cuentan y cuánto te descuentan
        </h1>
        <p className="text-zinc-600">
          Te indemnizaron, después te volvieron a tomar, y ahora te vuelven a despedir. Dos artículos
          de la Ley de Contrato de Trabajo deciden cuánto cobrás — y la Ley 27.802 reescribió los
          dos el mismo día. Uno de ellos, el que nadie cita para este caso, puede borrar de un plumazo
          todos tus años anteriores.
        </p>
      </header>

      <RespuestaPrimero actualizado={REINGRESO_FUENTES.consultadoEl}>
        <p>
          <strong>
            Primero se mira el calendario, no la plata: si entre el cese y el reingreso pasaron{" "}
            {CORTE_ANIOS} años, la antigüedad anterior ya no se computa.
          </strong>{" "}
          Lo dice el artículo {ARTICULO_ANTIGUEDAD} de la LCT desde el {VIGENCIA_REFORMA}, y antes de
          esa fecha no era así: el tiempo viejo se sumaba siempre. Si el reingreso fue{" "}
          <strong>dentro</strong> de esos dos años, la antigüedad es la suma de las dos etapas, pero
          de la indemnización se deduce lo que cobraste en el cese anterior{" "}
          <strong>actualizado por IPC</strong> (art. 255) — con un piso: nunca podés terminar
          cobrando menos que si sólo contara la última etapa.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te queda</h2>
        <p className="text-sm text-zinc-600">
          Cargá las cuatro fechas y lo que cobraste. La calculadora resuelve primero el corte del
          artículo {ARTICULO_ANTIGUEDAD} y después, si corresponde, la deducción actualizada del
          artículo 255 con su piso.
        </p>
        <CalculadoraReingreso />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_ANTIGUEDAD} — Antigüedad del trabajador (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{REINGRESO_TEXTOS.art18}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              {REINGRESO_TEXTOS.art18Nota} La última oración es nueva: no estaba en ninguna versión
              anterior del artículo.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 255 — Reingreso del trabajador (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{REINGRESO_TEXTOS.vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">{REINGRESO_TEXTOS.vigenteNota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto inmediatamente anterior del art. 255, con el 3% que la reforma eliminó
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{REINGRESO_TEXTOS.anteriorDnu}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              {REINGRESO_TEXTOS.anteriorDnuNota} La única diferencia con el texto vigente son las
              nueve palabras «con más una tasa de interés pura del 3% anual». Ese mismo 3% sigue
              vivo en el art. 276, para{" "}
              <Link
                href="/actualizacion-creditos-laborales"
                className="font-medium text-emerald-700 hover:underline"
              >
                la actualización de los créditos laborales
              </Link>
              .
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">De qué indemnizaciones se deduce</h2>
        <p className="text-sm text-zinc-600">
          La lista del artículo 255 es taxativa. Lo que no está acá —preaviso, integración del mes,
          vacaciones proporcionales, aguinaldo— no se deduce.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {INDEMNIZACIONES_ALCANZADAS.map((i) => (
            <li
              key={i.articulo}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              <span className="font-semibold text-zinc-900">Art. {i.articulo}</span> — {i.concepto}
            </li>
          ))}
        </ul>
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
            el contrato a tiempo parcial sin el tope de 2/3
          </Link>
          ,{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas que dejaron de ser remuneración
          </Link>{" "}
          y{" "}
          <Link
            href="/certificado-de-trabajo"
            className="font-medium text-emerald-700 hover:underline"
          >
            el certificado de trabajo del art. 80
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {REINGRESO_FUENTES.lista.map((f) => (
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
          InfoLEG, comparado contra el texto de la norma anterior, no un resumen de prensa. Es
          informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          liquidación. Consultada el {REINGRESO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
