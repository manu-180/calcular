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
  title: "Dos trabajos y un accidente: qué ART te cubre y con qué sueldo",
  description:
    "Determiná qué ART responde en pluriempleo, qué ingresos base cuentan y calculá la incapacidad incremental de un segundo accidente por capacidad restante.",
  alternates: { canonical: "/pluriempleo-art" },
  openGraph: {
    title: "Pluriempleo y ART: quién paga y cómo se suma la incapacidad",
    description:
      "La ART obligada no siempre es la del lugar del accidente, la base puede reunir varios ingresos y el segundo porcentaje se aplica sobre la capacidad restante.",
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
    a: "No necesariamente. El art. 13 inc. a) señala a la Aseguradora del empleador cuya actividad implica la presencia del agente de riesgo. Si el hecho es atribuible a más de un empleo, el inc. b) elige a la del empleo con mayor remuneración sujeta a cotización en el mes anterior a la primera manifestación invalidante.",
  },
  {
    q: "¿Para elegir la ART se compara el ingreso base?",
    a: "No. Cuando el hecho es atribuible a más de un empleo, la regla de elección compara la remuneración sujeta a cotización del mes anterior. El ingreso base cumple otra función: determinar la cuantía de la prestación dineraria.",
  },
  {
    q: "¿La indemnización se calcula con el sueldo del empleo cuya ART paga?",
    a: "No siempre. El art. 13 inc. c) manda considerar los ingresos base de las actividades con presencia del agente de riesgo o de los empleos para los que el trabajador se encontraba trabajando al producirse el accidente.",
  },
  {
    q: "¿Qué pasa si dos empleos tienen exactamente la misma remuneración?",
    a: "El art. 13 inc. b) no establece un desempate adicional. Por eso la calculadora deja el responsable indeterminado y no elige por ingreso base ni por orden de carga.",
  },
  {
    q: "¿Cómo se suman dos porcentajes de incapacidad?",
    a: "Se aplica capacidad restante. Con 30 % previo, queda 70 % de capacidad; una nueva incapacidad del 20 % se aplica sobre esos 70 puntos y agrega 14. La integral es 44 %, no 50 %.",
  },
  {
    q: "¿Cuánto paga la última ART en un segundo accidente?",
    a: "Como regla general, paga la incapacidad incremental: la diferencia entre la integral y la previa. Si la incapacidad previa era definitiva y cambia la modalidad de pago, paga la integral a su exclusivo cargo. Si era provisoria, las Aseguradoras concurren proporcionalmente.",
  },
  {
    q: "¿La calculadora conoce el porcentaje conjunto de la tabla?",
    a: "No. Sólo lo usa si vos ingresás un porcentaje obtenido de la Tabla de Evaluación de Incapacidades Laborales y es mayor que el resultado por capacidad restante. Nunca lo inventa ni lo aproxima.",
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
          La ART obligada puede no ser la del lugar donde ocurrió el accidente. Y si ya existía una
          incapacidad, el nuevo porcentaje se aplica sobre lo que quedaba sano: no se suma directo.
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
          Si una sola actividad implica el agente de riesgo, responde su ART. Si el hecho es
          atribuible a varios empleos, responde la ART del empleo con la <strong>mayor remuneración
          sujeta a cotización del mes anterior</strong>. La prestación puede tomar los ingresos base
          de más de un empleo. En siniestros sucesivos, la regla general es que la última ART pague
          sólo la <strong>incapacidad incremental</strong> calculada por capacidad restante.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá la cobertura o el segundo accidente</h2>
        <p className="text-sm text-zinc-600">
          Remuneración del mes anterior e ingreso base son datos distintos. La primera elige a la
          ART cuando hay atribución múltiple; los segundos determinan la cuantía.
        </p>
        <CalculadoraPluriempleoArt />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice la Ley 24.557</h2>
        <p className="text-zinc-600">
          El art. 45 no desarrolla estas reglas. Encomienda al Poder Ejecutivo dictar normas
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
          Que los incisos b) y d) no estén reglamentados por estos dos artículos no afirma que no
          exista otra norma sobre esas materias.
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
            Con una incapacidad previa de <strong>30 %</strong> queda una capacidad sana de 70 %.
            La nueva incapacidad del <strong>20 %</strong> se aplica sobre esos 70 puntos:
          </p>
          <p className="mt-2 font-bold text-zinc-900">30 + 20 × (100 − 30) ÷ 100 = 44 %</p>
          <p className="mt-1">
            La incapacidad incremental es <strong>44 − 30 = 14 puntos</strong>, no 20.
          </p>
        </div>
        <p className="text-sm text-zinc-600">
          Si la Tabla de Evaluación de Incapacidades Laborales prevé para la pérdida conjunta un
          porcentaje mayor, rige ese valor. La tabla no está incorporada: la calculadora sólo usa el
          porcentaje que ingreses y dice expresamente cuándo reemplaza el cálculo.
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
          Para convertir el porcentaje aplicable en una prestación dineraria, usá la{" "}
          <Link href="/indemnizacion-art" className="text-emerald-700 hover:underline">
            calculadora de indemnización por accidente de trabajo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
