import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { calcularVacaciones } from "@/lib/vacaciones";
import { DIVISOR_DIA_NORMAL, DIVISOR_VACACIONES } from "@/data/vacaciones";
import { formatARS } from "@/lib/formato";

const PUBLICADO = "25 de junio de 2026";
const PUBLICADO_ISO = "2026-06-25";

const titulo =
  "Cuánto se cobra de vacaciones en 2026: el plus vacacional explicado";
const descripcion =
  "Las vacaciones se pagan más que un mes normal: cada día se cobra el sueldo dividido 25, no dividido 30. Por qué pasa, cuánto es el plus vacacional por tramo de antigüedad y la calculadora que lo resuelve.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/blog/cuanto-se-cobra-de-vacaciones-plus-vacacional-2026" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Plus vacacional 2026")}&s=${encodeURIComponent("Por qué las vacaciones se pagan más que un mes normal")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Sueldo de ejemplo para los cálculos (el lector reemplaza por el suyo en la calculadora).
const SUELDO_EJEMPLO = 1_000_000;

// Un caso por cada tramo de la escala del art. 150, computado con el MISMO motor testeado
// que la calculadora del sitio (never-drift): la fecha de ingreso ubica a cada uno en su tramo.
const TRAMOS = [
  { etiqueta: "Hasta 5 años", ingresoISO: "2023-01-01" },
  { etiqueta: "Más de 5 y hasta 10", ingresoISO: "2018-01-01" },
  { etiqueta: "Más de 10 y hasta 20", ingresoISO: "2010-01-01" },
  { etiqueta: "Más de 20 años", ingresoISO: "2000-01-01" },
].map((t) => {
  const r = calcularVacaciones({ sueldo: SUELDO_EJEMPLO, ingresoISO: t.ingresoISO })!;
  return { ...t, r };
});

// Caso desarrollado para el ejemplo del cuerpo: tramo de 14 días.
const ej = TRAMOS[0].r;

const faqs = [
  {
    q: "¿Por qué las vacaciones se pagan más que un día de trabajo normal?",
    a: "Porque la ley manda dividir el sueldo mensual por 25 para sacar el valor del día de vacaciones (art. 155 inc. a LCT), mientras que un día normal se calcula sobre un mes de 30 días. Dividir por un número más chico da un valor por día más alto: alrededor de un 20% más. Esa diferencia es el «plus vacacional».",
  },
  {
    q: "¿Qué es exactamente el plus vacacional?",
    a: "Es la diferencia entre lo que cobrás por tus días de vacaciones (sueldo ÷ 25 por día) y lo que esos mismos días pagarían a valor de día normal (sueldo ÷ 30). No es un extra que se suma aparte: es la consecuencia de la fórmula legal de pago. En el recibo puede aparecer desglosado o ya incluido en el total de vacaciones.",
  },
  {
    q: "¿Cuántos días de vacaciones me corresponden?",
    a: "Según la antigüedad al 31 de diciembre (art. 150 LCT): 14 días corridos hasta 5 años, 21 días de 5 a 10, 28 días de 10 a 20 y 35 días con más de 20 años. Si entraste durante el año y no llegaste a la mitad de los días hábiles, cobrás 1 día por cada 20 trabajados (art. 153).",
  },
  {
    q: "¿Las vacaciones tienen los mismos descuentos que el sueldo?",
    a: "Sí: la retribución de vacaciones es remunerativa, así que sufre los aportes personales de ley (11% jubilación, 3% PAMI y 3% obra social). El plus vacacional ya está dentro de esa retribución; lo que mostramos en la tabla es el bruto antes de aportes.",
  },
  {
    q: "¿Me pueden pagar las vacaciones en plata sin que me las tome?",
    a: "No, salvo que termine la relación laboral. Las vacaciones son de goce obligatorio: el descanso no se puede reemplazar por dinero mientras seguís trabajando (art. 162 LCT). La única excepción es la liquidación final, donde se pagan las vacaciones proporcionales no gozadas.",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo,
        descripcion,
        url: "/blog/cuanto-se-cobra-de-vacaciones-plus-vacacional-2026",
        modificado: PUBLICADO_ISO,
        publicado: PUBLICADO_ISO,
      }),
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · {PUBLICADO} · LCT 20.744 (arts. 150 y 155)
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cuánto se cobra de vacaciones: el plus vacacional explicado
        </h1>
        <p className="text-zinc-600">
          Mucha gente nota que el mes que se toma vacaciones cobra un poco más, y no entiende por
          qué. No es un error ni un premio: la ley paga cada día de vacaciones más caro que un día
          normal. Acá está la razón, cuánto es el plus según tu antigüedad y la calculadora que lo
          resuelve por vos.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          Cada día de vacaciones se paga el <strong>sueldo mensual dividido 25</strong> (art. 155
          inc. a de la LCT), mientras que un día de trabajo normal se mide sobre un mes de 30 días:
        </p>
        <p className="mt-2 rounded-lg bg-zinc-900 px-4 py-3 text-center font-mono text-sm text-emerald-300">
          valor del día de vacaciones = sueldo ÷ {DIVISOR_VACACIONES}
        </p>
        <p className="mt-2">
          Dividir por {DIVISOR_VACACIONES} en lugar de {DIVISOR_DIA_NORMAL} da un valor por día{" "}
          <strong>~20% más alto</strong>. Esa diferencia, multiplicada por tus días de descanso, es
          el <strong>plus vacacional</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          El plus, con números (sueldo de {formatARS(SUELDO_EJEMPLO, 0)})
        </h2>
        <p className="text-zinc-600">
          Con un sueldo de {formatARS(SUELDO_EJEMPLO, 0)}, un día de vacaciones vale{" "}
          {formatARS(ej.valorDiaVacaciones, 0)} ({formatARS(SUELDO_EJEMPLO, 0)} ÷{" "}
          {DIVISOR_VACACIONES}), contra {formatARS(ej.valorDiaNormal, 0)} de un día normal (
          {formatARS(SUELDO_EJEMPLO, 0)} ÷ {DIVISOR_DIA_NORMAL}). La diferencia de{" "}
          {formatARS(ej.valorDiaVacaciones - ej.valorDiaNormal, 0)} por día es el plus. Sobre los{" "}
          {ej.dias} días del primer tramo, el plus suma {formatARS(ej.plus, 0)}.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuánto cobrás de vacaciones según tu antigüedad
        </h2>
        <p className="text-sm text-zinc-600">
          Días de la escala del art. 150 y su retribución con un sueldo de{" "}
          {formatARS(SUELDO_EJEMPLO, 0)}. El plus es cuánto más cobrás respecto de pagar esos mismos
          días a valor de día normal. Montos en bruto (antes de aportes).
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-3 py-2.5 text-left font-medium">Antigüedad</th>
                <th className="px-3 py-2.5 text-right font-medium">Días</th>
                <th className="px-3 py-2.5 text-right font-medium">Retribución</th>
                <th className="px-3 py-2.5 text-right font-medium text-emerald-700">Plus vacacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {TRAMOS.map((t) => (
                <tr key={t.etiqueta} className="bg-white hover:bg-zinc-50">
                  <td className="px-3 py-2.5 text-zinc-700">{t.etiqueta}</td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">{t.r.dias}</td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">
                    {formatARS(t.r.retribucion, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold text-emerald-700">
                    {formatARS(t.r.plus, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Calculado con el mismo motor que la calculadora del sitio: día de vacaciones = sueldo ÷ 25
          (art. 155), día normal = sueldo ÷ 30. Reemplazá el sueldo por el tuyo en la calculadora.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h2 className="text-lg font-bold text-emerald-900">Calculá tus vacaciones</h2>
        <p className="text-sm text-emerald-800">
          Poné tu sueldo y tu fecha de ingreso: la calculadora te dice cuántos días te corresponden,
          cuánto cobrás y cuánto de eso es el plus vacacional.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vacaciones"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Calcular mis vacaciones →
          </Link>
          <Link
            href="/sueldo-neto"
            className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400"
          >
            Calcular mi sueldo neto →
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Vacaciones no gozadas: el otro momento del plus</h2>
        <p className="text-zinc-600">
          Cuando termina la relación laboral —por renuncia o despido— te pagan las vacaciones
          proporcionales que no llegaste a tomarte, también a valor sueldo ÷ 25 (art. 156 LCT).
          Entran en la liquidación final junto con el aguinaldo proporcional.
        </p>
        <p className="text-sm text-zinc-600">
          ¿Te despidieron? Mirá cómo se calcula la{" "}
          <Link
            href="/blog/como-se-calcula-la-indemnizacion-por-despido-2026"
            className="text-emerald-700 underline"
          >
            indemnización por despido
          </Link>
          , donde las vacaciones proporcionales son uno de los conceptos que se suman.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <EmailCapture
        source="blog-vacaciones-plus-vacacional"
        headline="Avisame cuando cambien los datos laborales"
        subtext="Escalas, aportes y reglas de liquidación se actualizan varias veces al año. Cuando cambie algo que afecta tu sueldo o tus vacaciones, te aviso. Sin spam."
      />

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley de Contrato de Trabajo 20.744, arts. 150 a 157
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Esta guía es informativa y orientativa. La escala y la fórmula son las vigentes en 2026;
          tu caso puntual puede tener particularidades de convenio. Ante una duda concreta, consultá
          con tu empleador, tu sindicato o un profesional.
        </p>
      </section>
    </article>
  );
}
