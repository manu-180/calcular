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
  title: "Reingreso al mismo empleador: antigüedad e indemnización",
  description: `Los arts. ${ARTICULO_ANTIGUEDAD} y 255 de la LCT cambiaron el 6/3/2026: la antigüedad vieja no cuenta pasados ${CORTE_ANIOS} años y se descuenta lo cobrado actualizado. Calculalo.`,
  alternates: { canonical: "/reingreso" },
  openGraph: {
    title: "Reingreso al mismo empleador: la antigüedad que se pierde a los 2 años",
    description:
      "La Ley 27.802 reescribió los arts. 18 y 255 de la LCT. Si entre la salida y el reingreso pasaron dos años, el tiempo viejo no cuenta. Y si cuenta, lo que cobraste se descuenta actualizado por IPC.",
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
    a: `Depende de cuánto tiempo pasó, y esta es la regla nueva. Desde el ${VIGENCIA_REFORMA}, el artículo ${ARTICULO_ANTIGUEDAD} de la LCT (reescrito por el artículo ${ARTICULO_SUSTITUTIVO_ANTIGUEDAD}º de la Ley 27.802) dice que "si transcurriese un plazo de dos (2) años entre el cese del vínculo laboral, cualquiera fuera la causa, y el trabajador reingresara a prestar servicios con el mismo empleador, la antigüedad del tiempo de servicio anterior no será computada". Antes de la reforma el tiempo viejo se sumaba siempre, sin importar cuántos años hubieran pasado. Es el cambio que más plata mueve en este tema y casi no se publica, porque está en un artículo distinto del que todos citan para el reingreso.`,
  },
  {
    q: "¿Cuánto me descuentan de la indemnización nueva?",
    a: `Lo que cobraste por la salida anterior, pero actualizado. El artículo 255, reescrito por el artículo ${ARTICULO_SUSTITUTIVO} de la misma ley, manda descontar "lo pagado oportunamente, actualizado por el Índice de Precios al Consumidor (IPC)". La diferencia con lo que repiten los resúmenes ("se deduce lo pagado oportunamente", y nada más) es enorme con inflación de tres dígitos: una indemnización cobrada hace cinco años, actualizada, puede valer varias veces lo que se cobró en su momento.`,
  },
  {
    q: "¿Hay un límite a ese descuento?",
    a: "Sí, y es la protección más importante del artículo: «en ningún caso la indemnización resultante podrá ser inferior a la que hubiera correspondido al trabajador si su período de servicios hubiera sido solo el último y con prescindencia de los períodos anteriores al reingreso». O sea: aunque el descuento actualizado sea grande, nunca podés cobrar menos que si solo contara la última etapa. La calculadora te avisa cuando ese piso es el que define tu resultado.",
  },
  {
    q: "¿El descuento lleva intereses además del IPC?",
    a: "No, y es un cambio fino que conviene mirar. La versión anterior del artículo (la del artículo 83 del DNU 70/2023) decía «actualizado por el Índice de Precios al Consumidor (IPC) con más una tasa de interés pura del 3% anual». El texto vigente dejó el IPC y sacó esa tasa. Lo que casi nadie cruza: la misma Ley 27.802 dejó ese 3% en el artículo 276, para actualizar los créditos laborales. Hoy la LCT tiene dos fórmulas distintas para actualizar montos, y la de este artículo (la que se te descuenta) es la más chica.",
  },
  {
    q: "¿De qué indemnizaciones se deduce?",
    a: `La lista del artículo es cerrada: arts. 245 (despido sin causa), 246 (despido indirecto), 247 (falta o disminución de trabajo y fuerza mayor), 250 (plazo fijo), 251 (quiebra), 253 (jubilado que reingresa) y 254 (incapacidad). Si el rubro no está en esa lista (el preaviso, la integración del mes, las vacaciones proporcionales, el aguinaldo), no se descuenta nada.`,
  },
  {
    q: "Si pasaron más de dos años, ¿igual me descuentan lo que cobré?",
    a: "No, según la lectura que aplica esta calculadora. El descuento del artículo 255 existe para no pagar dos veces la misma antigüedad, y si esa antigüedad quedó afuera por el artículo 18, no hay nada que evitar. La ley no lo dice con todas las letras y la reforma es de marzo de 2026, así que todavía no hay fallos. Lo decimos abiertamente en vez de esconderlo en el resultado.",
  },
  {
    q: "Mi reingreso fue antes de marzo de 2026, ¿me aplica el corte de los dos años?",
    a: `Las dos reformas rigen desde el ${VIGENCIA_REFORMA} y no son retroactivas: la nota de vigencia de los artículos dice "a partir de su publicación en el Boletín Oficial". Si volviste a entrar antes, el corte de los dos años no existía cuando retomaste la relación, y si se aplica a un vínculo que ya estaba en curso es una discusión abierta (de las que se resuelven en juicio). La calculadora aplica el texto vigente y lo aclara en el resultado.`,
  },
  {
    q: "¿La antigüedad incluye el preaviso?",
    a: "Sí. El artículo 19 de la LCT, que la reforma no tocó, dice que también cuenta como tiempo de servicio el plazo de preaviso fijado por la ley o los estatutos especiales, cuando se haya dado.",
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
          "La Ley 27.802 reescribió los arts. 18 y 255 de la LCT: la antigüedad anterior no cuenta si pasaron dos años entre la salida y el reingreso, y lo cobrado en la salida anterior se descuenta actualizado por IPC, con el piso del último período.",
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
          Te indemnizaron, después te volvieron a tomar, y ahora te vuelven a despedir. Dos
          artículos de la Ley de Contrato de Trabajo deciden cuánto cobrás, y la Ley 27.802
          reescribió los dos el mismo día. Uno de ellos (el que nadie cita para este caso) puede
          borrar de golpe todos tus años anteriores.
        </p>
      </header>

      <RespuestaPrimero actualizado={REINGRESO_FUENTES.consultadoEl}>
        <p>
          <strong>
            Primero se mira el calendario, no la plata: si entre la salida y el reingreso pasaron{" "}
            {CORTE_ANIOS} años, la antigüedad anterior ya no cuenta.
          </strong>{" "}
          Lo dice el artículo {ARTICULO_ANTIGUEDAD} de la LCT desde el {VIGENCIA_REFORMA}. Antes no
          era así: el tiempo viejo se sumaba siempre. Si volviste <strong>dentro</strong> de esos
          dos años, la antigüedad suma las dos etapas, pero de la indemnización se descuenta lo que
          cobraste en la salida anterior <strong>actualizado por IPC</strong> (art. 255). Con un
          piso: nunca podés cobrar menos que si solo contara la última etapa.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te queda</h2>
        <p className="text-sm text-zinc-600">
          Cargá las cuatro fechas y lo que cobraste. La calculadora resuelve primero el corte del
          artículo {ARTICULO_ANTIGUEDAD} y después, si corresponde, el descuento actualizado del
          artículo 255 con su piso. Para el resto de la liquidación (preaviso, vacaciones,
          aguinaldo) usá la{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de indemnización por despido
          </Link>
          .
        </p>
        <CalculadoraReingreso />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la ley</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_ANTIGUEDAD}: Antigüedad del trabajador (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{REINGRESO_TEXTOS.art18}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              {REINGRESO_TEXTOS.art18Nota} La última oración es nueva: no estaba en ninguna versión
              anterior del artículo.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 255: Reingreso del trabajador (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{REINGRESO_TEXTOS.vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">{REINGRESO_TEXTOS.vigenteNota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto anterior del art. 255, con el 3% que la reforma sacó
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
          La lista del artículo 255 es cerrada. Lo que no está acá (preaviso, integración del mes,
          vacaciones proporcionales, aguinaldo) no se descuenta.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {INDEMNIZACIONES_ALCANZADAS.map((i) => (
            <li
              key={i.articulo}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              <span className="font-semibold text-zinc-900">Art. {i.articulo}</span>: {i.concepto}
            </li>
          ))}
        </ul>
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
            el contrato a tiempo parcial sin el tope de 2/3
          </Link>
          ,{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas que dejaron de ser remuneración
          </Link>
          ,{" "}
          <Link
            href="/transferencia-del-establecimiento"
            className="font-medium text-emerald-700 hover:underline"
          >
            qué pasa con tu antigüedad si cambia el dueño de la empresa
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página usa el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG, comparado con el texto anterior, no un resumen de prensa. Es una guía
          informativa: no reemplaza el consejo de un profesional ni una liquidación. Consultada el{" "}
          {REINGRESO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
