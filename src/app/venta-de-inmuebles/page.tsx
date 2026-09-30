import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraVentaInmueble } from "@/components/CalculadoraVentaInmueble";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ALICUOTA_CEDULAR,
  BO_LEY_27802,
  DEROGACION_ITI,
  VENTA_INMUEBLES_FUENTES,
  VENTA_INMUEBLES_TEXTOS,
} from "@/data/venta-inmuebles";

export const metadata: Metadata = {
  title: "¿Se paga impuesto al vender una casa? Desde 2026, no",
  description:
    "El impuesto cedular del 15% sobre la venta de inmuebles quedó exento para las operaciones desde el 1/1/2026 (art. 192 de la Ley 27.802), y el ITI está derogado desde julio de 2024. Calculá la ganancia con el costo actualizado por IPC oficial y mirá qué régimen te toca.",
  alternates: { canonical: "/venta-de-inmuebles" },
  openGraph: {
    title: "Vender una casa hoy no paga impuesto nacional — y hacen falta tres leyes para verlo",
    description:
      "Comprado antes de 2018: nunca entró al cedular y el ITI está derogado desde el 8/7/2024. Comprado desde 2018: el cedular del 15% quedó exento para las ventas desde el 1/1/2026.",
    url: "https://calcular.ar/venta-de-inmuebles",
    images: [
      {
        url: "/og?t=Venta%20de%20inmuebles&s=El%20cedular%20del%2015%25%20quedo%20exento%20desde%202026",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Hay que pagar impuesto a las ganancias al vender un inmueble?",
    a: `Para una persona humana, hoy no. El impuesto era el cedular del ${ALICUOTA_CEDULAR * 100}% del art. 99 de la Ley de Ganancias, y el art. 26 inc. n) —en el texto que le puso el art. 192 de la Ley 27.802 (B.O. ${BO_LEY_27802})— exime «el resultado derivado de la enajenación de inmuebles y de la transferencia de derechos sobre inmuebles, alcanzados por las disposiciones del artículo 99 (…) que se enajenen o transfieran a partir del 1° de enero de 2026». Antes de esa fecha sí se pagaba, y por eso la calculadora igual muestra la cuenta.`,
  },
  {
    q: "¿Y el ITI, el impuesto a la transferencia de inmuebles?",
    a: `No existe más. El Título VII de la Ley 23.905, sus artículos 7° a 18, fue derogado por el art. 67 de la Ley 27.743 el ${DEROGACION_ITI}, con vigencia desde su publicación en el Boletín Oficial. En InfoLEG los dieciocho artículos figuran hoy como notas de derogación. Es un dato de 2024 que buena parte de las guías de compraventa todavía no incorporó: se sigue explicando «el 1,5% del ITI» para operaciones de 2026.`,
  },
  {
    q: "¿De qué depende cuál de los dos impuestos me tocaba?",
    a: "De la fecha de COMPRA, no de la de venta. El art. 86 inc. a) de la Ley 27.430 dice que el cedular alcanza a la operación «en tanto el enajenante o cedente hubiera adquirido el bien a partir del 1° de enero de 2018», y agrega que «en tales supuestos, las operaciones no estarán alcanzadas por el Título VII de la ley 23.905». O sea: comprado desde 2018, cedular; comprado antes, ITI. Los dos se repartían el universo, sin superponerse.",
  },
  {
    q: "Compré antes de 2018 y vendo ahora. ¿Pago algo?",
    a: `Ningún impuesto nacional a la transferencia. El inmueble nunca entró al cedular por el art. 86 inc. a) de la Ley 27.430, y el ITI que le habría correspondido está derogado desde el ${DEROGACION_ITI}. Es la mitad del universo que quedó sin impuesto dos años antes que la otra, y por una ley distinta.`,
  },
  {
    q: "¿Y si heredé el inmueble?",
    a: "El art. 86 inc. a) de la Ley 27.430 lo resuelve mirando hacia atrás: en los bienes recibidos por herencia, legado o donación, la fecha que cuenta es la de adquisición «del causante o donante». Si esa persona lo compró antes del 1/1/2018, la operación queda fuera del cedular igual que si lo hubieras comprado vos antes de esa fecha.",
  },
  {
    q: "¿Cómo se calculaba la ganancia del cedular?",
    a: "El art. 99 inc. a) manda deducir del precio de venta «el costo de adquisición, actualizado mediante la aplicación del índice mencionado en el segundo párrafo del artículo 93, desde la fecha de adquisición hasta la fecha de enajenación o transferencia», y ese índice, para las compras desde 2018, es el IPC nivel general del INDEC. Después, el último párrafo del artículo deja computar los gastos «(comisiones, honorarios, impuestos, tasas, etcétera) directa o indirectamente relacionados» con la operación. El 15% se aplica sobre lo que queda.",
  },
  {
    q: "¿Se puede restar el mínimo no imponible?",
    a: "No. El art. 100 es explícito: contra las ganancias de este capítulo «sólo podrán computarse (…) los costos de adquisición y gastos directa o indirectamente relacionados con ellas, no pudiendo deducirse los conceptos previstos en los artículos 29, 30 y 85 de la ley». Ni ganancia no imponible, ni cargas de familia, ni deducción especial: el impuesto cedular es una caja aparte.",
  },
  {
    q: "¿La exención vale para una empresa que vende un inmueble?",
    a: "No. El art. 99 habla de «las personas humanas y de las sucesiones indivisas», y la exención del inc. n) está escrita sobre las operaciones «alcanzadas por las disposiciones del artículo 99». El resultado de un inmueble que integra el activo de una empresa va por el régimen general de tercera categoría, que este artículo no toca.",
  },
  {
    q: "¿Falta reglamentación?",
    a: `El inciso n) termina diciendo «en los términos que al respecto establezca la reglamentación». La exención está en la ley y rige desde el 1/1/2026; lo que puede faltar es la operatoria —qué se presenta ante el escribano, cómo se acredita la exención—. Al ${VENTA_INMUEBLES_FUENTES.consultadoEl}, esta página publica lo que dice la ley y avisa que la parte procedimental conviene verificarla en ARCA antes de escriturar.`,
  },
  {
    q: "¿Y los impuestos provinciales?",
    a: "Siguen. El impuesto de sellos, ingresos brutos cuando corresponde y las tasas municipales son de cada jurisdicción y ninguna de las tres leyes que se cruzan acá los toca. Que no haya impuesto nacional a la transferencia no significa que escriturar salga cero.",
  },
];

export default function VentaDeInmueblesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora del impuesto a la venta de inmuebles (cedular art. 99)",
        url: "https://calcular.ar/venta-de-inmuebles",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Venta de inmuebles: el cedular del 15%, su exención desde 2026 y el ITI derogado",
        descripcion:
          "El art. 99 de la Ley de Ganancias, la exención del art. 26 inc. n) que le puso el art. 192 de la Ley 27.802, la línea de 2018 del art. 86 de la Ley 27.430 y la derogación del ITI por el art. 67 de la Ley 27.743.",
        url: "/venta-de-inmuebles",
        modificado: VENTA_INMUEBLES_FUENTES.consultadoEl,
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
          Vender un inmueble: ¿qué impuesto se paga hoy?
        </h1>
        <p className="text-zinc-600">
          Para una persona humana, <strong>ninguno de los dos que existían</strong>. Pero para llegar
          a esa respuesta hay que juntar <strong>tres leyes de tres años distintos</strong>, y por eso
          casi ninguna guía la cuenta entera: la mitad de internet sigue explicando el ITI —derogado
          en 2024— y la otra mitad, el cedular del 15% —exento desde 2026—.
        </p>
      </header>

      <RespuestaPrimero actualizado={VENTA_INMUEBLES_FUENTES.consultadoEl}>
        <p>
          Si el inmueble se <strong>compró antes del 1/1/2018</strong>, nunca entró al impuesto
          cedular (art. 86 inc. a) de la Ley 27.430) y le correspondía el <strong>ITI</strong>, que
          quedó <strong>derogado el {DEROGACION_ITI}</strong> por el art. 67 de la Ley 27.743. Si se{" "}
          <strong>compró desde el 1/1/2018</strong>, estaba alcanzado por el{" "}
          <strong>cedular del {ALICUOTA_CEDULAR * 100}%</strong> del art. 99 de la Ley de Ganancias —
          y ese impuesto quedó <strong>exento para las operaciones desde el 1/1/2026</strong>, por el
          art. 26 inc. n) en el texto del art. 192 de la Ley 27.802. Las dos mitades del universo
          llegaron al mismo lugar, por dos leyes distintas y con dos años de diferencia.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          La calculadora resuelve qué régimen te toca según las dos fechas, y arma la cuenta del
          cedular con el <strong>costo actualizado por la serie oficial del IPC del INDEC</strong>,
          que es lo que manda el art. 99 inc. a) y lo que nadie hace a ojo.
        </p>
        <CalculadoraVentaInmueble />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las tres leyes, en orden</h2>
        <div className="space-y-3">
          {[
            {
              art: "1. Ley 27.430, art. 86 inc. a) (2017) — la línea de 2018 que parte el universo",
              texto: VENTA_INMUEBLES_TEXTOS.art86Ley27430,
              porQue:
                "Lo que decide no es cuándo vendés sino cuándo compraste. Comprado desde el 1/1/2018: cedular. Comprado antes: ITI, y el propio artículo lo dice al revés («no estarán alcanzadas por el Título VII de la ley 23.905») para el caso del cedular. En herencias y donaciones la fecha que cuenta es la del causante o donante.",
            },
            {
              art: `2. Ley 27.743, art. 67 (2024) — el ITI dejó de existir el ${DEROGACION_ITI}`,
              texto: VENTA_INMUEBLES_TEXTOS.derogacionIti,
              porQue:
                "Es la nota que InfoLEG repite en los dieciocho artículos del Título VII de la Ley 23.905. Con el ITI derogado, la mitad del universo —los inmuebles comprados antes de 2018— se quedó sin ningún impuesto nacional a la transferencia, dos años antes que la otra mitad.",
            },
            {
              art: "3. Ley 27.802, art. 192 (2026) — el cedular quedó exento",
              texto: VENTA_INMUEBLES_TEXTOS.exencion,
              porQue:
                "El art. 192 sustituyó el inciso n) del art. 26 de la Ley de Ganancias y le agregó esta segunda oración. La primera mitad del inciso exime las ganancias del alquiler de casa habitación; ésta exime el resultado de la venta. Un solo inciso, dos exenciones grandes, y ninguna de las dos estaba en el título de la reforma.",
            },
          ].map((a) => (
            <details
              key={a.art}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              open
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
              <p className="mt-2 text-sm text-zinc-700">{a.porQue}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El error caro: calcular la ganancia sobre el precio de la escritura vieja
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley de Ganancias, art. 99 — el impuesto y a quién alcanza
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{VENTA_INMUEBLES_TEXTOS.art99}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley de Ganancias, art. 99 inc. a)</p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{VENTA_INMUEBLES_TEXTOS.art99IncA}»
          </p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            El índice del segundo párrafo del art. 93, para las compras desde 2018
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{VENTA_INMUEBLES_TEXTOS.actualizacionIpc}»
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Las dos piezas encajan exactamente: el cedular sólo alcanza a los inmuebles comprados desde
          el 1/1/2018, y la actualización por IPC se aplica justamente a «las adquisiciones o
          inversiones efectuadas en los ejercicios fiscales que se inicien a partir del 1° de enero
          de 2018». Todo el universo del cedular actualiza el costo por IPC. Restar el precio nominal
          de una escritura de 2019 contra una venta de 2025 no es una simplificación: es calcular el
          impuesto sobre inflación pura.
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 99, último párrafo — los gastos</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{VENTA_INMUEBLES_TEXTOS.art99Gastos}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El cedular es una caja aparte: no entra el mínimo no imponible
        </h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley de Ganancias, art. 100</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{VENTA_INMUEBLES_TEXTOS.art100}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Los artículos que el 100 deja afuera son los tres que más se usan en una liquidación
          común: el 29 (ganancia no imponible), el 30 (deducciones personales, cargas de familia,
          deducción especial) y el 85 (deducciones generales, donde vive la deducción del alquiler).
          Contra la ganancia de la venta sólo se computan el costo y los gastos de la operación.
        </p>
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
          La otra mitad del mismo inciso n):{" "}
          <Link href="/deduccion-alquiler" className="font-medium text-emerald-700 hover:underline">
            la exención del alquiler de casa habitación y el 10% del inciso k)
          </Link>
          . Y los otros impuestos que tocó la misma ley:{" "}
          <Link href="/impuestos-internos" className="font-medium text-emerald-700 hover:underline">
            los impuestos internos eliminados
          </Link>{" "}
          y{" "}
          <Link href="/plazo-fijo" className="font-medium text-emerald-700 hover:underline">
            la exención de los plazos fijos
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {VENTA_INMUEBLES_FUENTES.lista.map((f) => (
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
          Esta página cita los textos oficiales publicados en InfoLEG — no un resumen de prensa. Es
          informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          liquidación impositiva. Consultada el {VENTA_INMUEBLES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
