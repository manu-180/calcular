import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPluriempleoArt } from "@/components/CalculadoraPluriempleoArt";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import {
  PLURIEMPLEO_FUENTES,
  REGLAS_PLURIEMPLEO,
  REGLAS_SUCESION,
  SITUACIONES_ART_45,
  VIGENCIA_PLURIEMPLEO,
} from "@/data/pluriempleo-art";
import { articleSchema, ORGANIZACION } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pluriempleo y ART: qué ART te cubre y con qué sueldo",
  description:
    "Con dos trabajos, qué ART responde por el accidente, qué sueldos cuentan para la base y cómo se calcula la incapacidad de un segundo accidente.",
  alternates: { canonical: "/pluriempleo-art" },
  openGraph: {
    title: "Pluriempleo y ART: quién paga y cómo se suma la incapacidad",
    description:
      "La ART que paga no siempre es la del lugar del accidente, la base puede sumar varios sueldos y el segundo porcentaje se aplica sobre la capacidad que te quedaba.",
    url: "https://calcular.ar/pluriempleo-art",
    images: [
      {
        url:
          "/og?t=" +
          encodeURIComponent("Pluriempleo y ART") +
          "&s=" +
          encodeURIComponent("Quién paga · base plural · capacidad restante"),
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Si tengo dos trabajos, ¿paga la ART del lugar donde ocurrió el accidente?",
    a: "No siempre. El art. 13 inc. a) dice que paga la ART del empleador cuya actividad tiene el riesgo que causó el daño. Si el daño se puede atribuir a más de un trabajo, el inc. b) elige la ART del trabajo con mayor sueldo con aportes en el mes anterior a la primera manifestación de la incapacidad.",
  },
  {
    q: "¿Para elegir la ART se compara el ingreso base?",
    a: "No. Cuando el daño se puede atribuir a más de un trabajo, para elegir la ART se compara el sueldo con aportes del mes anterior. El ingreso base sirve para otra cosa: calcular cuánto te pagan.",
  },
  {
    q: "¿La indemnización se calcula con el sueldo del empleo cuya ART paga?",
    a: "No siempre. El art. 13 inc. c) manda tomar los ingresos base de las actividades que tenían ese riesgo, o de los trabajos en los que estabas trabajando cuando pasó el accidente.",
  },
  {
    q: "¿Qué pasa si dos empleos tienen exactamente la misma remuneración?",
    a: "El art. 13 inc. b) no dice cómo desempatar. Por eso la calculadora deja sin definir qué ART responde, y no elige por ingreso base ni por el orden en que cargaste los trabajos.",
  },
  {
    q: "¿Cómo se suman dos porcentajes de incapacidad?",
    a: "Por capacidad restante. Con un 30 % previo te queda un 70 % de capacidad. Una incapacidad nueva del 20 % se aplica sobre esos 70 puntos y suma 14. La incapacidad total es 44 %, no 50 %.",
  },
  {
    q: "¿Cuánto paga la última ART en un segundo accidente?",
    a: "Por regla general, paga solo lo que se sumó: la diferencia entre la incapacidad total y la anterior. Si la incapacidad anterior era definitiva y cambia la forma de pago, paga la incapacidad total, toda a su cargo. Si era provisoria, las ART pagan en proporción.",
  },
  {
    q: "¿La calculadora conoce el porcentaje conjunto de la tabla?",
    a: "No. Solo lo usa si vos cargás un porcentaje sacado de la Tabla de Evaluación de Incapacidades Laborales y es mayor que el resultado por capacidad restante. Nunca lo inventa ni lo estima.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Pluriempleo y sucesión de siniestros en la ART",
        descripcion:
          "Quién paga, qué ingresos base cuentan y cómo se obtiene la incapacidad incremental según los arts. 13 y 14 del Decreto 491/97.",
        url: "/pluriempleo-art",
        modificado: VIGENCIA_PLURIEMPLEO.consultadoEl,
      }),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Dos trabajos y un accidente: qué ART te cubre y con qué sueldo
        </h1>
        <p className="text-zinc-600">
          La ART que paga puede no ser la del lugar donde pasó el accidente. Y si ya tenías una
          incapacidad, el porcentaje nuevo se aplica sobre lo que te quedaba sano: no se suma directo.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={VIGENCIA_PLURIEMPLEO.consultadoEl}
        norma={VIGENCIA_PLURIEMPLEO.norma}
        fuente={{
          nombre: PLURIEMPLEO_FUENTES.lista[0].nombre,
          url: PLURIEMPLEO_FUENTES.lista[0].url,
        }}
      />

      <RespuestaPrimero actualizado={VIGENCIA_PLURIEMPLEO.consultadoEl}>
        <p>
          Si solo uno de tus trabajos tiene el riesgo que causó el daño, paga su ART. Si el daño se
          puede atribuir a varios trabajos, paga la ART del que tuvo el{" "}
          <strong>sueldo con aportes más alto el mes anterior</strong>. Para calcular cuánto te
          pagan se pueden sumar los ingresos de más de un trabajo. Si es un segundo accidente, por
          regla general la última ART paga solo la <strong>incapacidad que se sumó</strong>,
          calculada sobre la capacidad que te quedaba.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá la cobertura o el segundo accidente</h2>
        <p className="text-sm text-zinc-600">
          El sueldo del mes anterior y el ingreso base son datos distintos. El primero elige la ART
          cuando el daño viene de varios trabajos; el segundo define cuánto te pagan.
        </p>
        <CalculadoraPluriempleoArt />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice la Ley 24.557</h2>
        <p className="text-zinc-600">
          El art. 45 no trae estas reglas. Le encarga al Poder Ejecutivo dictar normas
          complementarias para estas cuatro situaciones:
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {SITUACIONES_ART_45.map((situacion) => (
            <li key={situacion.id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-bold text-zinc-900">
                {situacion.id}) {situacion.texto}
              </p>
              <p className="mt-1 text-xs text-zinc-600">{situacion.reglamentacion}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">
          Que estos dos artículos no reglamenten los incisos b) y d) no quiere decir que no haya
          otra norma sobre esos temas.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Pluriempleo: art. 13 del Decreto 491/97</h2>
        <p className="text-zinc-600">
          «En caso de producirse alguna de las contingencias previstas en la Ley N° 24.557 en
          situación de pluriempleo deberá estarse a lo siguiente:»
        </p>
        <div className="space-y-3">
          {REGLAS_PLURIEMPLEO.map((regla) => (
            <blockquote key={regla.id} className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
              <p className="text-sm font-semibold text-emerald-900">
                {regla.id}) {regla.titulo}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-700">«{regla.texto}»</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Sucesión de siniestros: art. 14 del Decreto 491/97</h2>
        <div className="space-y-3">
          {REGLAS_SUCESION.map((regla) => (
            <blockquote key={regla.id} className="rounded-xl border-l-4 border-violet-400 bg-violet-50/70 p-4">
              <p className="text-sm font-semibold text-violet-900">
                {regla.id}) {regla.titulo}
              </p>
              <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                «{regla.texto}»
              </p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La cuenta de capacidad restante</h2>
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-zinc-700">
          <p>
            Con una incapacidad previa de <strong>30 %</strong> te queda una capacidad sana de 70 %.
            La incapacidad nueva del <strong>20 %</strong> se aplica sobre esos 70 puntos:
          </p>
          <p className="mt-2 font-bold text-zinc-900">30 + 20 × (100 − 30) ÷ 100 = 44 %</p>
          <p className="mt-1">
            Lo que se suma es <strong>44 − 30 = 14 puntos</strong>, no 20.
          </p>
        </div>
        <p className="text-sm text-zinc-600">
          Si la Tabla de Evaluación de Incapacidades Laborales fija para la pérdida conjunta un
          porcentaje mayor, vale ese. La tabla no está cargada: la calculadora solo usa el
          porcentaje que cargues y te avisa cuándo reemplaza la cuenta.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <dl className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <dt className="text-sm font-bold text-zinc-900">{faq.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-zinc-700">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <p className="text-sm text-zinc-600">
          Textos actualizados consultados el {PLURIEMPLEO_FUENTES.consultadoEl}.
        </p>
        <ul className="space-y-3">
          {PLURIEMPLEO_FUENTES.lista.map((fuente) => (
            <li key={fuente.nombre} className="rounded-xl border border-zinc-200 bg-white p-4">
              <a
                href={fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                {fuente.nombre}
              </a>
              <p className="mt-1 text-sm text-zinc-600">{fuente.detalle}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">
          Para pasar el porcentaje a pesos, usá la{" "}
          <Link href="/indemnizacion-art" className="text-emerald-700 hover:underline">
            calculadora de indemnización por accidente de trabajo
          </Link>
          . Si la ART te rechazó el accidente, mirá{" "}
          <Link href="/rechazo-art" className="text-emerald-700 hover:underline">
            si el rechazo llegó en plazo
          </Link>
          , y para reclamar,{" "}
          <Link href="/comision-medica" className="text-emerald-700 hover:underline">
            los plazos de la comisión médica
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
