import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { PlanillaComercioCTA } from "@/components/PlanillaComercioCTA";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { COMERCIO_FUENTES } from "@/data/convenios/comercio";

export const metadata: Metadata = {
  title: "Aguinaldo de empleado de Comercio 2026: cómo calcularlo",
  description:
    "El SAC de Comercio es el 50% del mejor sueldo del semestre e incluye los no remunerativos. Fórmula, ejemplo real y los 2 errores que te hacen cobrar menos.",
  alternates: { canonical: "/blog/como-calcular-aguinaldo-empleado-de-comercio" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Aguinaldo de Comercio 2026: cómo calcularlo")}&s=${encodeURIComponent("50% del mejor sueldo, con los $120.000 incluidos. Ejemplo real")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PUBLICADO = "15 de junio de 2026";

const pasos = [
  {
    n: 1,
    titulo: "Tomá el mejor sueldo bruto del semestre",
    cuerpo:
      "El aguinaldo es el 50% del mejor sueldo mensual que cobraste en el semestre (Ley 23.041, art. 121 LCT). Para el aguinaldo de junio, el semestre va de enero a junio. Como la escala de Comercio subió mes a mes en 2026, el mejor sueldo casi siempre es el de junio. Tomá el bruto de ese mes: básico + sumas no remunerativas + antigüedad + presentismo.",
  },
  {
    n: 2,
    titulo: "Sumá los $120.000 no remunerativos (esto es clave en Comercio)",
    cuerpo:
      "El acuerdo paritario 2026 de Comercio dice expresamente que las sumas no remunerativas cuentan para el aguinaldo. O sea: para el aguinaldo, tu mejor sueldo incluye los $120.000. Dejarlos afuera es el error más caro: son $60.000 menos de aguinaldo bruto (la mitad de $120.000).",
  },
  {
    n: 3,
    titulo: "Dividí ese sueldo por dos",
    cuerpo:
      "El aguinaldo bruto es justo la mitad de ese mejor sueldo. Si trabajaste el semestre completo, esa es tu cuota. Si entraste o te fuiste en el medio, es proporcional a los días trabajados (días que estuviste / días totales del semestre).",
  },
  {
    n: 4,
    titulo: "Restá los aportes para llegar al neto",
    cuerpo:
      "Acá va el segundo detalle: a la parte remunerativa del aguinaldo se le descuenta el 17% (11% jubilación + 3% PAMI + 3% obra social), pero a la parte que viene de los $120.000 no remunerativos solo el 3% de obra social. Si aplicás el 17% a todo el aguinaldo, descontás de más y te queda menos en mano.",
  },
];

const errores = [
  {
    q: "Calcular el aguinaldo solo sobre el básico (sin los $120.000)",
    a: "Es el error más común y el más caro. En Comercio, el acuerdo 2026 mete las sumas no remunerativas en la base del aguinaldo. Si te las olvidás, perdés $60.000 de aguinaldo bruto (la mitad de los $120.000). Esos $120.000 se cobran cada mes hasta junio 2026.",
  },
  {
    q: "Descontar el 17% sobre todo el aguinaldo",
    a: "La parte del aguinaldo que viene de las sumas no remunerativas solo paga el 3% de obra social, no el 17%. Si aplicás el 17% parejo a todo el aguinaldo, descontás de más: en el ejemplo de un Vendedor B son unos $9.100 menos en mano.",
  },
  {
    q: "Promediar los sueldos del semestre en vez de tomar el mejor",
    a: "El aguinaldo NO es el promedio: es el 50% del mejor sueldo mensual del semestre. Como la escala de Comercio sube en cada paritaria, promediar (con sueldos viejos más bajos) siempre da menos de lo que corresponde.",
  },
  {
    q: "Olvidar la antigüedad y el presentismo",
    a: "El mejor sueldo del que sale el aguinaldo es el bruto completo: incluye la antigüedad (1% por año, sobre básico y no remunerativo) y el presentismo (8,33%) si los cobrás. Si tomás solo el básico de convenio, dejás plata afuera.",
  },
];

// Rango de SAC bruto por categoría (junio 2026, jornada completa, sin antigüedad, con
// presentismo). Computado por calcularAguinaldoComercio y fijado en check_convenios.ts.
const sacPorCategoria = [
  { cat: "Maestranza A", sac: "$668.192" },
  { cat: "Vendedor B (la más común en locales)", sac: "$689.946" },
  { cat: "Administrativo F / Vendedor D", sac: "$703.866" },
];

const faqs = [
  {
    q: "¿Cuánto es el aguinaldo de un empleado de comercio en junio de 2026?",
    a: "Para un Vendedor B (la categoría más común en locales), jornada completa, sin antigüedad y con presentismo: el mejor sueldo de junio es $1.379.892 bruto, así que el aguinaldo bruto es $689.946 y quedan ≈ $581.755 en mano (después de aportes). Según la categoría, el aguinaldo bruto va de unos $668.192 (Maestranza A) a $703.866 (Vendedor D). Si tenés antigüedad, sumá un 1% por año al sueldo antes de dividirlo por dos.",
  },
  {
    q: "¿Las sumas no remunerativas cuentan para el aguinaldo de comercio?",
    a: "Sí. El acuerdo paritario 2026 de Comercio dice expresamente que los montos no remunerativos cuentan para el aguinaldo (SAC), las vacaciones, la antigüedad, el presentismo, las horas extra y las indemnizaciones. Por eso, para el aguinaldo, tu mejor sueldo incluye los $120.000.",
  },
  {
    q: "¿Cuándo se cobra el aguinaldo 2026?",
    a: "La primera cuota se paga hasta el 30 de junio y la segunda hasta el 18 de diciembre, con una tolerancia legal de cuatro días hábiles. Cada cuota es el 50% del mejor sueldo del semestre que corresponde (enero a junio para la primera, julio a diciembre para la segunda).",
  },
  {
    q: "¿El aguinaldo de diciembre se calcula igual?",
    a: "El método es el mismo (50% del mejor sueldo del semestre). Ojo con un cambio: el acuerdo del 22/7/2026 postergó el pase de los $120.000 al básico, que ahora empieza en diciembre de 2026 y termina en mayo de 2027. Para el aguinaldo de diciembre, los $120.000 siguen siendo casi todos no remunerativos. Entonces los aportes siguen siendo 17% sobre la parte remunerativa y 3% sobre la no remunerativa. El bono de $50.000 (julio y agosto) NO suma para el aguinaldo.",
  },
  {
    q: "¿Y si no trabajé todo el semestre?",
    a: "El aguinaldo es proporcional a los días trabajados: tomás el 50% del mejor sueldo y lo multiplicás por (días trabajados en el semestre ÷ días del semestre). Lo mismo si te despiden o renunciás en el medio: te corresponde el aguinaldo proporcional hasta el día que te vas.",
  },
  {
    q: "¿El aguinaldo paga Ganancias?",
    a: "Solo si tu sueldo es alto, y no se retiene todo junto: para Ganancias, el aguinaldo se reparte a lo largo del año. Lo explicamos en la guía «¿El aguinaldo paga Ganancias en 2026?».",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Aguinaldo de empleado de Comercio 2026: cómo calcularlo",
        descripcion:
          "Guía para calcular el aguinaldo (SAC) de un empleado de Comercio (CCT 130/75) en 2026: el 50% del mejor sueldo del semestre con los $120.000 no remunerativos incluidos, el neto correcto con aportes 17%/3%, y un ejemplo real de junio 2026.",
        url: "/blog/como-calcular-aguinaldo-empleado-de-comercio",
        modificado: "2026-06-15",
        publicado: "2026-06-15",
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
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · datos verificados al {PUBLICADO}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cómo calcular el aguinaldo de un empleado de comercio en 2026, paso a paso
        </h1>
        <p className="text-zinc-600">
          El aguinaldo (SAC) es simple: la mitad del mejor sueldo del semestre. Pero en Comercio
          hay dos detalles que cambian el número: los $120.000 no remunerativos y cómo se
          descuentan los aportes. Acá tenés el método completo, con un ejemplo real de junio de
          2026 y la fuente oficial.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          El aguinaldo de un empleado de comercio es el <strong>50% de la mejor remuneración
          mensual del semestre</strong>. En 2026 ese sueldo <strong>incluye los $120.000 no
          remunerativos</strong> (así lo fija el acuerdo paritario). Ejemplo: un Vendedor B de
          junio 2026, jornada completa y sin antigüedad, tiene un mejor sueldo de{" "}
          <strong>$1.379.892</strong>, por lo que su aguinaldo bruto es <strong>$689.946</strong> y
          quedan <strong>≈ $581.755 en mano</strong> (los aportes son 17% sobre la parte
          remunerativa y solo 3% sobre la no remunerativa). La primera cuota se paga hasta el{" "}
          <strong>30 de junio</strong> y la segunda, hasta el <strong>18 de diciembre</strong>.
        </p>
      </RespuestaPrimero>

      <p className="text-zinc-600">
        ¿Querés el número ya, sin hacer la cuenta? Poné el mejor sueldo en la{" "}
        <Link href="/aguinaldo" className="text-emerald-700 underline">
          calculadora de aguinaldo
        </Link>{" "}
        (gratis) y, si no sabés cuánto es el sueldo de la categoría, lo sacás de la{" "}
        <Link href="/convenios/comercio" className="text-emerald-700 underline">
          calculadora de sueldo de comercio
        </Link>
        . Abajo está el método para entender de dónde sale cada peso.
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">El método en 4 pasos</h2>
        <ol className="space-y-4">
          {pasos.map((p) => (
            <li key={p.n} className="flex gap-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {p.n}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{p.titulo}</p>
                <p className="mt-0.5 text-sm text-zinc-600">{p.cuerpo}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="rounded-xl bg-white p-4 text-sm font-medium text-zinc-800 shadow-sm">
          La fórmula corta: <strong>Aguinaldo bruto = mejor sueldo del semestre ÷ 2</strong> (con
          los $120.000 incluidos en ese sueldo), proporcional a los días trabajados si no estuviste
          el semestre completo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Ejemplo completo: Vendedor B, aguinaldo de junio 2026
        </h2>
        <p className="text-zinc-600">
          Jornada completa, sin antigüedad, cobrando presentismo. El mejor sueldo del semestre es
          el de junio (la escala fue subiendo todo el año):
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[420px] text-sm">
            <tbody className="text-zinc-700">
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Mejor sueldo bruto del semestre (junio)</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">$1.379.892</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5 font-semibold text-zinc-900">
                  = Aguinaldo bruto (÷ 2)
                </td>
                <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">$689.946</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">− Aportes 17% sobre la parte remunerativa</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">−$106.241</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">− Aportes 3% (OS) sobre la parte no remunerativa</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">−$1.950</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-zinc-900">≈ Aguinaldo en mano</td>
                <td className="px-4 py-2.5 text-right font-semibold text-emerald-700">
                  ≈ $581.755
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Del mejor sueldo de $1.379.892, son $1.249.892 remunerativos y $130.000 no remunerativos
          (los $120.000 + su parte de presentismo). El aguinaldo mantiene esa proporción: por eso
          una parte paga 17% y la otra solo 3%. Si le aplicás un 17% parejo a los $689.946, te da ≈
          $9.100 menos de lo que corresponde.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Aguinaldo bruto de junio 2026 por categoría
        </h2>
        <p className="text-zinc-600">
          Jornada completa, sin antigüedad, con presentismo. A cada uno le sumás un 1% por año de
          antigüedad antes de dividir por dos:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[360px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="px-4 py-2.5 font-medium">Categoría</th>
                <th className="px-4 py-2.5 text-right font-medium">Aguinaldo bruto</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700">
              {sacPorCategoria.map((r) => (
                <tr key={r.cat} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-2.5">{r.cat}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-zinc-900">{r.sac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Para tu categoría, mes y antigüedad exactos, usá la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>{" "}
          con el sueldo que te da la{" "}
          <Link href="/convenios/comercio" className="text-emerald-700 underline">
            calculadora de comercio
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los errores que te hacen cobrar de menos
        </h2>
        <div className="space-y-3">
          {errores.map((e) => (
            <div key={e.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="font-semibold text-zinc-900">{e.q}</p>
              <p className="mt-1 text-sm text-zinc-600">{e.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Si liquidás sueldos de comercio</h2>
        <p className="text-zinc-600">
          Calcular un aguinaldo suelto es fácil. Lo que cansa, si liquidás a varias personas o todos
          los meses, es <strong>buscar la escala nueva en cada paritaria</strong> y rehacer las
          cuentas (sueldo, aguinaldo, vacaciones) sin equivocarte con los $120.000 ni con los
          aportes. Para eso armamos la planilla de Excel/Google Sheets con la escala oficial adentro
          y actualizada con cada acuerdo: ponés categoría, mes y jornada, y tenés el sueldo y el
          aguinaldo desglosados, con los mismos números que esta guía.
        </p>
      </section>

      {/* CTA al producto pago, enmarcado para quien liquida */}
      <PlanillaComercioCTA />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="ca-acordeon group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          {[COMERCIO_FUENTES.acuerdo, COMERCIO_FUENTES.escalas, COMERCIO_FUENTES.cct].map((f) => (
            <li key={f.url}>
              •{" "}
              <a
                href={f.url}
                rel="nofollow noopener"
                target="_blank"
                className="text-emerald-700 underline"
              >
                {f.nombre}
              </a>
            </li>
          ))}
          <li>• Ley 23.041 y art. 121 LCT (Sueldo Anual Complementario), texto en Infoleg.</li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {PUBLICADO}. Calculá tu aguinaldo en la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>
          , mirá{" "}
          <Link href="/aguinaldo/fechas" className="text-emerald-700 underline">
            cuándo se cobra en tu provincia
          </Link>
          , o aprendé a{" "}
          <Link
            href="/blog/como-liquidar-sueldo-empleado-de-comercio"
            className="text-emerald-700 underline"
          >
            liquidar el sueldo completo de comercio
          </Link>
          . ¿Liquidás todos los meses? Mirá la{" "}
          <Link href="/planillas" className="text-emerald-700 underline">
            planilla
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
