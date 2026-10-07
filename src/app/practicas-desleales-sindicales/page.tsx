import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPracticasDesleales } from "@/components/CalculadoraPracticasDesleales";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CAMBIOS,
  CONDUCTAS_MUY_GRAVES,
  ESCALONES,
  MULTIPLICADOR_REINCIDENCIA,
  PD_FUENTES,
  PRACTICAS_SINDICALES,
  REFORMA_PUBLICADA,
  TEXTOS,
  TOPE_CUOTAS,
} from "@/data/practicas-desleales";

// La multa se deriva del SMVM vigente: la página revalida a diario para que el importe no dependa
// de que alguien redeploye cuando sale la resolución nueva del Consejo del Salario.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Prácticas desleales sindicales: conductas y multas",
  description:
    "La Ley 27.802 sumó el art. 53 bis a la Ley 23.551 con 8 conductas desleales de los sindicatos y habilitó al empleador a querellar. Calculá la multa.",
  alternates: { canonical: "/practicas-desleales-sindicales" },
  openGraph: {
    title: "El art. 53 bis: ocho prácticas desleales que antes no existían",
    description:
      "Bloqueo, toma del establecimiento, afiliación compulsiva, no acatar la conciliación obligatoria. Qué escalón le pone la ley a cada una y cuánto sale, con el salario mínimo vigente.",
    url: "https://calcular.ar/practicas-desleales-sindicales",
    images: [
      {
        url: "/og?t=Pr%C3%A1cticas%20desleales%20sindicales&s=El%20art.%2053%20bis%20y%20la%20multa%20en%20pesos",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function PracticasDeslealesPage() {
  const muyGrave = ESCALONES.find((e) => e.id === "muy-grave")!;

  const faqs = [
    {
      q: "¿Un sindicato puede cometer una práctica desleal?",
      a: `Desde el ${REFORMA_PUBLICADA}, sí. Hasta esa fecha la Ley 23.551 solo castigaba prácticas desleales del empleador (el art. 53, con sus once incisos, igual desde 1988). La Ley 27.802 no tocó ese artículo: le sumó al lado el art. 53 bis, con ocho conductas desleales «por parte de las asociaciones sindicales, o en su caso, de quienes las representen».`,
    },
    {
      q: "¿Cuáles son las ocho conductas?",
      a: "Hacer lo que prohíbe el art. 20 ter (bloqueo, toma, daños, afectar la libertad de trabajo de quien no adhiere); convocar asambleas violando el art. 20 bis u otras medidas de acción directa que afecten la actividad de la empresa; promover la afiliación compulsiva e involuntaria; usar mecanismos extorsivos para lograr esa afiliación; usar mecanismos extorsivos contra los empleadores; tomar represalias contra quienes no adhieren a una medida de fuerza; negarse a negociar colectivamente o demorar la negociación; y no acatar la conciliación obligatoria.",
    },
    {
      q: "¿Cuánto es la multa?",
      a: `El art. 55 nuevo remite al Anexo II de la Ley 25.212, que fija las multas como porcentaje del salario mínimo vigente cuando se constata la falta. Del 25% al 150% para las infracciones leves; del 30% al 200% por cada trabajador afectado para las graves; y del ${Math.round(
        muyGrave.min * 100,
      )}% al ${Math.round(
        muyGrave.max * 100,
      )}% por cada trabajador afectado para las muy graves. Si hay varias prácticas o reincidencia, el máximo puede subir hasta cinco veces. Antes de la reforma el artículo remitía a la Ley 18.694, de 1972.`,
    },
    {
      q: "¿Qué es una infracción muy grave acá?",
      a: "La ley lo define en un solo lugar. El art. 20 ter dice que «serán consideradas infracciones muy graves» afectar la libertad de trabajo de quienes no adhieren a una medida de fuerza, provocar, instar u organizar el bloqueo o la toma de un establecimiento, impedir u obstruir la entrada o salida de personas y cosas, y causar daños o retener indebidamente bienes de la empresa o de terceros. Para los demás incisos del art. 53 bis la ley no fija escalón: lo decide el juez.",
    },
    {
      q: "¿Hay un techo para la multa?",
      a: `Sí. El art. 55 dice que «la multa será fijada por el juez hasta un máximo del equivalente al ${Math.round(
        TOPE_CUOTAS * 100,
      )}% de los ingresos provenientes de las cuotas sindicales que deban pagar los afiliados en el mes en que se cometió la infracción». En el texto de 1988 ese tope existía solo para las prácticas de las entidades que representan a los empleadores.`,
    },
    {
      q: "¿Y si el sindicato no cesa la medida?",
      a: "El monto original «se incrementará automáticamente en un diez por ciento (10%) por cada cinco (5) días de mora, mientras se mantenga el incumplimiento». Y si una parte lo pide, el juez puede sumar las astreintes del art. 804 del Código Civil y Comercial, «quedando los importes que así se establezcan en favor del damnificado». Al revés: si la práctica se repara dentro del plazo que fije el juez, «el importe de la sanción podrá reducirse hasta el cincuenta por ciento (50%)».",
    },
    {
      q: "¿Se le puede sacar la personería gremial a un sindicato?",
      a: "Es la sanción más grave del capítulo, y es nueva: «En aquellos casos en los que la asociación sindical o el empleado incurra reiteradamente en las conductas estipuladas en el artículo 53 bis del presente cuerpo normativo, la Justicia Nacional del Trabajo podrá revocarle la personería y/o la inscripción gremial». El texto anterior no tenía ninguna consecuencia sobre la personería.",
    },
    {
      q: "¿Quién puede iniciar la querella?",
      a: "Cualquier damnificado. El art. 54 pasó de «La asociación sindical de trabajadores o el damnificado, conjunta o indistintamente, podrán promover querella» a «Todo damnificado por una acción y/u omisión que la presente ley define como práctica desleal podrá promover una querella ante el juez o tribunal competente». En la práctica, el empleador damnificado puede querellar por su cuenta.",
    },
    {
      q: "¿Se cobra el tiempo de asamblea?",
      a: "No. El art. 20 bis, con el texto de la reforma, termina diciendo: «El trabajador no devengará salarios durante el tiempo de la misma». Y agrega que la asamblea (dentro o fuera del establecimiento) necesita autorización previa del empleador sobre el horario y la duración, y también sobre el lugar si se hace adentro. Convocarla sin respetar eso es justamente la práctica desleal del art. 53 bis inciso b).",
    },
    {
      q: "¿La multa la cobra la empresa damnificada?",
      a: "No. El art. 55 mantiene la regla de siempre: «El importe de las multas será percibido por la autoridad administrativa del trabajo, e ingresado en una cuenta especial, y será destinado al mejoramiento de los servicios de inspección del trabajo». Lo que sí queda para el damnificado son las astreintes del art. 804 del Código Civil y Comercial, si el juez las aplica.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de multas por prácticas desleales sindicales (art. 55 Ley 23.551)",
        url: "https://calcular.ar/practicas-desleales-sindicales",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Prácticas desleales sindicales: el art. 53 bis y la multa del art. 55",
        descripcion:
          "El Título XV de la Ley 27.802 sumó ocho prácticas desleales de las asociaciones sindicales, habilitó a todo damnificado a querellar y cambió la escala de multas a la del Anexo II de la Ley 25.212, que se calcula sobre el salario mínimo vigente.",
        url: "/practicas-desleales-sindicales",
        modificado: PD_FUENTES.consultadoEl,
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
          Prácticas desleales del sindicato: las ocho conductas nuevas y cuánto cuestan
        </h1>
        <p className="text-zinc-600">
          Durante 38 años la Ley 23.551 castigó prácticas desleales de una sola parte: el
          empleador. El {REFORMA_PUBLICADA} la Ley 27.802 le sumó el{" "}
          <strong>artículo 53 bis</strong>, con ocho conductas de los sindicatos que antes no eran
          infracción. La parte legal se explicó en todos lados. El número, no: acá está la multa en
          pesos.
        </p>
      </header>

      <RespuestaPrimero actualizado={PD_FUENTES.consultadoEl}>
        <p>
          El <strong>art. 53 bis</strong> define ocho prácticas desleales sindicales, y el{" "}
          <strong>art. 54</strong> ahora habilita a «todo damnificado» a querellar, el empleador
          incluido. La multa ya no remite a la Ley 18.694 de 1972: se calcula con el{" "}
          <strong>Anexo II de la Ley 25.212</strong>. Va del 25% al 150% del{" "}
          <Link href="/salario-minimo" className="text-emerald-700 hover:underline">
            salario mínimo
          </Link>{" "}
          en las infracciones leves, del 30% al 200% <em>por cada trabajador afectado</em> en las
          graves, y del <strong>50% al 2.000% por cada trabajador</strong> en las muy graves (el
          escalón donde el art. 20 ter pone al bloqueo, la toma y los daños). Si hay varias
          prácticas o reincidencia, el máximo se multiplica por {MULTIPLICADOR_REINCIDENCIA}, con un
          techo del {Math.round(TOPE_CUOTAS * 100)}% de las cuotas sindicales del mes. Y si la
          conducta se repite, la Justicia del Trabajo puede{" "}
          <strong>revocar la personería gremial</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La multa, en pesos</h2>
        <p className="text-sm text-zinc-600">
          El monto sale del salario mínimo vigente «al momento de la constatación de la
          infracción», el mismo dato que usa{" "}
          <Link href="/desempleo" className="font-medium text-emerald-700 hover:underline">
            la calculadora de prestación por desempleo
          </Link>
          . En calcular.ar hay un solo salario mínimo para todas las cuentas.
        </p>
        <CalculadoraPracticasDesleales />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las ocho conductas del art. 53 bis
        </h2>
        <p className="text-sm text-zinc-600">
          El artículo entero es nuevo: lo sumó el art. 145 de la Ley 27.802. Solo el inciso a) trae
          el escalón puesto por la ley, porque remite al art. 20 ter, que califica esas conductas
          como muy graves. Los otros siete los califica el juez.
        </p>
        <div className="space-y-2">
          {PRACTICAS_SINDICALES.map((p) => (
            <div
              key={p.inciso}
              className={`rounded-xl border p-4 ${
                p.muyGravePorLey ? "border-rose-200 bg-rose-50/40" : "border-zinc-200 bg-white"
              }`}
            >
              <p className="flex flex-wrap items-start gap-2 text-sm text-zinc-700">
                <span className="font-mono text-xs font-semibold text-zinc-500">{p.inciso})</span>
                <span className="flex-1">{p.texto}</span>
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.muyGravePorLey
                      ? "bg-rose-100 text-rose-800"
                      : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {p.muyGravePorLey ? "muy grave por ley" : "escalón: lo fija el juez"}
                </span>
                {p.nota && <span className="text-xs text-zinc-500">{p.nota}</span>}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que la ley llama «muy grave», textual
        </h2>
        <p className="text-sm text-zinc-600">
          Son las tres conductas del art. 20 ter. Importan porque es el único caso en que el
          escalón (y con él, el tramo de la multa) no depende de lo que decida el juez.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-sm">
            <tbody>
              {CONDUCTAS_MUY_GRAVES.map((c) => (
                <tr key={c.inciso} className="border-b border-zinc-200 align-top">
                  <td className="w-12 py-3 pr-3 font-mono text-xs text-zinc-500">{c.inciso}.</td>
                  <td className="py-3 text-zinc-700">{c.texto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué cambió en el capítulo</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-3">Artículo</th>
                <th className="py-2 pr-3">Decía</th>
                <th className="py-2 pr-3">Dice</th>
                <th className="py-2">Qué cambia</th>
              </tr>
            </thead>
            <tbody>
              {CAMBIOS.map((c) => (
                <tr key={c.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-semibold text-zinc-800">{c.articulo}</td>
                  <td className="py-3 pr-3 text-zinc-600">{c.antes}</td>
                  <td className="py-3 pr-3 text-zinc-700">{c.ahora}</td>
                  <td className="py-3 font-medium text-emerald-800">{c.plata}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la ley</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 53 bis (lo sumó el art. 145 de la Ley 27.802)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art53bis}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 20 ter: las infracciones muy graves
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art20ter}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 55: la multa, el tope y la revocación de la personería
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art55Nuevo}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 25.212, Anexo II, art. 5º: la escala con la que se calcula
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art5Anexo2}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Texto según el art. 1° de la Ley 26.941 (B.O. 2/6/2014). Es el régimen al que remite
              el art. 55 nuevo; el viejo remitía a la Ley 18.694.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 20 bis: las asambleas y el sueldo
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art20bis}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 54: quién puede querellar
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art54Nuevo}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El texto de 1988 decía: «{TEXTOS.art54Viejo}»
            </p>
          </blockquote>
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
          Del otro lado del mismo conflicto:{" "}
          <Link
            href="/despido-de-delegado-gremial"
            className="font-medium text-emerald-700 hover:underline"
          >
            qué cobra un delegado despedido
          </Link>{" "}
          con el art. 52 nuevo, y{" "}
          <Link
            href="/actualizacion-creditos-laborales"
            className="font-medium text-emerald-700 hover:underline"
          >
            cómo se actualizan los montos hasta que se pagan
          </Link>
          . Negarse a negociar es una de las ocho conductas: qué exige hoy{" "}
          <Link
            href="/negociacion-de-buena-fe"
            className="font-medium text-emerald-700 hover:underline"
          >
            la negociación de buena fe
          </Link>
          . Y para las medidas de fuerza,{" "}
          <Link
            href="/servicios-esenciales-huelga"
            className="font-medium text-emerald-700 hover:underline"
          >
            las guardias mínimas en servicios esenciales
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PD_FUENTES.lista.map((f) => (
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
          Los textos citados salen del <strong>texto actualizado</strong> de InfoLEG. Esta página es
          una guía informativa: la multa la fija un juez dentro de la escala legal, y no reemplaza
          el consejo de un profesional. Consultada el {PD_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
