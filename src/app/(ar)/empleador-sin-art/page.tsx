import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraEmpleadorSinArt } from "@/components/CalculadoraEmpleadorSinArt";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CUOTAS_PARA_EXTINGUIR,
  MESES_ESPECIE_TRAS_EXTINCION,
  PRESTACIONES_EN_ESPECIE,
  SIN_ART_FUENTES,
  SIN_ART_TEXTOS,
  VIGENCIA_SIN_ART,
} from "@/data/empleador-sin-art";

export const metadata: Metadata = {
  title: "Mi empleador no paga la ART: quién me cubre",
  description:
    "Que la empresa deba cuotas no te deja sin cobertura: la ART tiene que atenderte y después le cobra a ella. Quién responde en cada caso, con el artículo.",
  alternates: { canonical: "/empleador-sin-art" },
  openGraph: {
    title: "Empleador sin ART en regla: quién responde por el accidente",
    description:
      "Cuotas impagas no es lo mismo que contrato extinguido, y trabajar en negro no es lo mismo que trabajar sin ART. Cuatro situaciones, cuatro responsables distintos.",
    url: "https://calcular.ar/empleador-sin-art",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Empleador sin ART")}&s=${encodeURIComponent("Ley 24.557 arts. 27, 28 y 29 · quién responde")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Mi empresa le debe plata a la ART. ¿Estoy cubierto?",
    a: "Sí. El art. 28 ap. 4 de la Ley 24.557 no deja dudas: «Si el empleador omitiera (total o parcialmente) el pago de las cuotas a su cargo, la ART otorgará las prestaciones, y podrá ejecutar contra el empleador las cotizaciones adeudadas». La deuda es un problema entre la aseguradora y la empresa, no tuyo. Lo único que corta la cobertura es que la ART dé de baja el contrato, que es otra cosa.",
  },
  {
    q: "Trabajo en negro. ¿Puedo reclamarle a la ART?",
    a: "Si la empresa tiene contrato vigente con una ART, sí. El art. 28 ap. 2 dice que si el empleador no declaró a un trabajador, «la ART otorgará las prestaciones, y podrá repetir del empleador el costo de éstas». Trabajar sin registrar y trabajar en una empresa sin ART son dos cosas distintas, y la diferencia es quién te paga.",
  },
  {
    q: "¿Y si la empresa nunca contrató ninguna ART?",
    a: "Ahí no hay aseguradora a la que reclamarle: responde el empleador con su propio patrimonio. El art. 28 ap. 1 dice que «responderá directamente ante los beneficiarios por las prestaciones previstas en esta ley». O sea, te debe todo lo que te habría pagado una ART. Y si además no estabas registrado, no tenés que pasar por la comisión médica antes de ir a la Justicia: el art. 1° de la Ley 27.348 deja afuera ese caso con todas las letras.",
  },
  {
    q: "¿Cuándo puede la ART cortar el contrato por falta de pago?",
    a: `Con ${CUOTAS_PARA_EXTINGUIR} cuotas mensuales sin pagar, seguidas o salteadas, o una deuda total igual a ${CUOTAS_PARA_EXTINGUIR} cuotas, tomando como referencia la más alta del último año (art. 27 ap. 6, que sumó el art. 12 de la Ley 27.348). Y la baja «deberá ajustarse a los requisitos, modalidades y plazos que determine la reglamentación». No es que la ART deja de cubrir el día que se atrasa el pago.`,
  },
  {
    q: "Le cortaron la ART a mi empleador y me accidenté al mes. ¿Me atienden?",
    a: `Sí, y es la parte de la ley que casi no se publica. El mismo apartado 6 dice que «la aseguradora deberá otorgar prestaciones en especie, con los alcances previstos en el Capítulo V de esta ley, por las contingencias ocurridas dentro de los ${MESES_ESPECIE_TRAS_EXTINCION} (${MESES_ESPECIE_TRAS_EXTINCION}) meses posteriores a la extinción por falta de pago». Es atención médica, no indemnización. La plata la sigue debiendo el empleador, que desde la baja «se considerará no asegurado».`,
  },
  {
    q: "¿Qué son exactamente las «prestaciones en especie»?",
    a: `Las cinco del art. 20: ${PRESTACIONES_EN_ESPECIE.join(", ").toLowerCase()}. No incluyen ninguna indemnización en plata, por eso la cobertura de los ${MESES_ESPECIE_TRAS_EXTINCION} meses después de la baja es parcial.`,
  },
  {
    q: "El empleador que tiene que responder está quebrado. ¿Me quedo sin nada?",
    a: "No siempre. El art. 29 dice que, si un juez declara que el empleador sin ART no tiene con qué pagar, «las prestaciones serán financiadas por la SRT con cargo al Fondo de Garantía de la LRT». Pero no es automático: eso se prueba «a través del procedimiento sumarísimo previsto para las acciones meramente declarativas».",
  },
  {
    q: "El accidente fue antes de 2017. ¿Rige lo mismo?",
    a: `El apartado 6 del art. 27 lo sumó la Ley 27.348 (${VIGENCIA_SIN_ART.boletin}), y su nota de vigencia dice que es ${VIGENCIA_SIN_ART.aplicacion}. Lo que cuenta es la fecha en que apareció el daño por primera vez, no la del reclamo. Los apartados del art. 28, en cambio, son del texto original de la Ley 24.557.`,
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Empleador sin ART en regla: quién responde por el accidente de trabajo",
        descripcion:
          "Los cuatro apartados del art. 28 de la Ley 24.557, la extinción del contrato del art. 27 ap. 6 con su ventana de tres meses, y el Fondo de Garantía del art. 29.",
        url: "/empleador-sin-art",
        modificado: VIGENCIA_SIN_ART.consultadoEl,
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
          Mi empleador no tiene la ART al día: ¿quién me paga si me accidento?
        </h1>
        <p className="text-zinc-600">
          La respuesta cambia según <strong>qué hizo mal</strong> la empresa, y las diferencias son
          enormes. No pagar las cuotas, no declararte y no tener ART{" "}
          <strong>no son lo mismo</strong>: en dos de esos tres casos te paga igual la aseguradora.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={VIGENCIA_SIN_ART.consultadoEl}
        norma={VIGENCIA_SIN_ART.norma}
        fuente={{ nombre: SIN_ART_FUENTES[0].nombre, url: SIN_ART_FUENTES[0].url }}
      />

      <RespuestaPrimero actualizado={VIGENCIA_SIN_ART.consultadoEl}>
        <p>
          Si la empresa <strong>tiene contrato vigente con una ART</strong>, te responde la ART{" "}
          <strong>siempre</strong>: aunque la empresa le deba cuotas (art. 28 ap. 4) y aunque no te
          haya declarado (ap. 2). Después la aseguradora le cobra a la empresa. Si la empresa{" "}
          <strong>nunca contrató ART</strong>, responde el empleador con su patrimonio (ap. 1). Y si
          le <strong>dieron de baja el contrato</strong> por falta de pago, la ART todavía te debe{" "}
          <strong>{MESES_ESPECIE_TRAS_EXTINCION} meses de atención médica</strong> (no la
          indemnización) por lo que pase en ese tiempo.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Buscá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Marcá cómo estaba todo <strong>el día del accidente</strong>, no hoy. Te mostramos quién
          responde, hasta dónde y el artículo que lo dice.
        </p>
        <CalculadoraEmpleadorSinArt />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cuatro apartados que casi nadie distingue
        </h2>
        <p className="text-zinc-600">
          El art. 28 se llama «Responsabilidad por omisiones» y resuelve cuatro situaciones
          distintas. Leerlas juntas evita el error de creer que una empresa en falta te deja sin
          cobertura.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border-l-4 border-rose-400 bg-rose-50/70 p-4">
            <p className="text-sm font-semibold text-rose-900">
              Ap. 1: nunca contrató ART, responde el empleador
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SIN_ART_TEXTOS.art28ap1}»</p>
          </div>
          <div className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Ap. 2: no te declaró, responde la ART
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SIN_ART_TEXTOS.art28ap2}»</p>
          </div>
          <div className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-900">
              Ap. 3: las cuotas que no pagó van al Fondo de Garantía de la ART
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SIN_ART_TEXTOS.art28ap3}»</p>
          </div>
          <div className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Ap. 4: no pagó las cuotas, responde la ART
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SIN_ART_TEXTOS.art28ap4}»</p>
          </div>
        </div>
        <p className="text-zinc-600">
          Los apartados 2 y 4 dicen lo mismo con distintas palabras:{" "}
          <strong>la ART otorgará las prestaciones</strong>. Lo que cambia es cómo recupera la plata:
          en el ap. 2 le reclama el costo a la empresa (<em>repite el costo</em>), en el ap. 4 le
          cobra las cuotas (<em>ejecuta las cotizaciones</em>). En ninguno de los dos el trabajador
          queda en el medio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo único que corta la cobertura es la baja del contrato
        </h2>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">Ley 24.557, art. 27 ap. 6</p>
          <p className="mt-1 text-sm text-zinc-700">«{SIN_ART_TEXTOS.art27ap6Extincion}»</p>
          <p className="mt-2 text-sm text-zinc-700">«{SIN_ART_TEXTOS.art27ap6Reglamentacion}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Tres cosas que cambian el resultado. Una: hacen falta{" "}
          <strong>{CUOTAS_PARA_EXTINGUIR} cuotas</strong>, no una. Dos: la baja es una{" "}
          <strong>decisión de la aseguradora</strong> que tiene que seguir una reglamentación; no
          pasa sola por el atraso. Tres: desde ahí el empleador «se considerará no asegurado», o sea
          que pasa al apartado 1 del art. 28 y responde él.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los {MESES_ESPECIE_TRAS_EXTINCION} meses de cobertura que siguen después de la baja
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{SIN_ART_TEXTOS.art27ap6TresMeses}»</p>
        </blockquote>
        <p className="text-zinc-600">
          La aseguradora lo debe aunque el contrato ya no exista, y es <strong>parcial</strong>:
          cubre las cinco prestaciones en especie del Capítulo V y ninguna indemnización. Conviene
          tenerlas a mano, porque es justo lo que podés exigir:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {PRESTACIONES_EN_ESPECIE.map((p) => (
            <li
              key={p}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
            >
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Si el que tiene que responder no puede
        </h2>
        <blockquote className="rounded-xl border-l-4 border-violet-400 bg-violet-50/70 p-4">
          <p className="text-sm font-semibold text-violet-900">Ley 24.557, art. 29</p>
          <p className="mt-1 text-sm text-zinc-700">«{SIN_ART_TEXTOS.art29}»</p>
        </blockquote>
        <p className="text-zinc-600">
          El Fondo de Garantía existe, pero <strong>no se abre solo</strong>. Un juez tiene que
          declarar que el empleador no tiene con qué pagar, por el trámite rápido (sumarísimo) de las
          acciones meramente declarativas, en la jurisdicción que corresponda.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Desde cuándo rige</h2>
        <p className="text-zinc-600">
          El apartado 6 del art. 27 lo sumó el {VIGENCIA_SIN_ART.incorporadoPor} (
          {VIGENCIA_SIN_ART.boletin}), y su nota de vigencia dice que es{" "}
          {VIGENCIA_SIN_ART.aplicacion}. Lo que cuenta es la <strong>fecha del accidente</strong>{" "}
          (cuando apareció el daño por primera vez), no la del reclamo. Los cuatro apartados del art.
          28, en cambio, vienen del texto original de la Ley 24.557.
        </p>
        <p className="text-zinc-600">
          Lo que <strong>no</strong> publicamos: el trámite concreto de la baja. El apartado lo deja
          en manos de «los requisitos, modalidades y plazos que determine la reglamentación», y no
          pudimos verificar qué norma vigente lo fija después de la Ley 27.348. Preferimos decirlo
          antes que citar un trámite que quizás ya cambió.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <dl className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <dt className="text-sm font-bold text-zinc-900">{f.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-zinc-700">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <p className="text-sm text-zinc-600">
          Todas leídas en el texto <strong>actualizado</strong> de InfoLEG el{" "}
          {VIGENCIA_SIN_ART.consultadoEl}.
        </p>
        <ul className="space-y-3">
          {SIN_ART_FUENTES.map((f) => (
            <li key={f.nombre} className="rounded-xl border border-zinc-200 bg-white p-4">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>
              <p className="mt-1 text-sm text-zinc-600">{f.detalle}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">
          Seguí por acá: cuánto se cobra está en{" "}
          <Link href="/indemnizacion-art" className="text-emerald-700 hover:underline">
            la indemnización por accidente
          </Link>
          ; los plazos del trámite previo, en{" "}
          <Link href="/comision-medica" className="text-emerald-700 hover:underline">
            la comisión médica
          </Link>
          ; y si la contingencia fue la muerte del trabajador,{" "}
          <Link href="/derechohabientes-art" className="text-emerald-700 hover:underline">
            quién cobra
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
