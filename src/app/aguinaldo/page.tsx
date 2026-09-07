import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraAguinaldo } from "@/components/CalculadoraAguinaldo";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { AGUINALDO_FUENTES, SEMESTRES_2026 } from "@/data/aguinaldo";

export const metadata: Metadata = {
  title: "Calculadora de Aguinaldo 2026: cuánto cobrás de SAC y cuándo se paga",
  description:
    "Calculá gratis tu aguinaldo 2026: el 50% del mejor sueldo del semestre, proporcional si no lo trabajaste completo. Fechas de pago: 30 de junio y 18 de diciembre.",
  alternates: { canonical: "/aguinaldo" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Calculadora de Aguinaldo 2026")}&s=${encodeURIComponent("Cuánto cobrás de SAC, en bruto y en mano. Vence el 30 de junio.")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuándo se paga el aguinaldo 2026?",
    a: "La primera cuota vence el 30 de junio y la segunda el 18 de diciembre de 2026 (art. 122 de la Ley de Contrato de Trabajo, texto según Ley 27.073). Por la tolerancia general del art. 128 de la LCT, se suele admitir el pago hasta 4 días hábiles después del vencimiento.",
  },
  {
    q: "¿Cómo se calcula el aguinaldo?",
    a: "Cada cuota es el 50% de la mayor remuneración mensual devengada por todo concepto dentro del semestre (Ley 23.041). En criollo: tu mejor sueldo bruto del semestre dividido 2. Si no trabajaste el semestre completo, cobrás la parte proporcional al tiempo trabajado.",
  },
  {
    q: "¿Qué pasa si no trabajé todo el semestre?",
    a: "Cobrás el proporcional: el aguinaldo completo (mejor sueldo ÷ 2) multiplicado por los días trabajados sobre el total de días del semestre. Aplica si entraste durante el semestre o si el contrato terminó antes de que cierre (en ese caso se paga junto con la liquidación final).",
  },
  {
    q: "¿El aguinaldo tiene descuentos?",
    a: "Sí. Es remunerativo, así que sufre los mismos aportes que el sueldo: 11% de jubilación, 3% de PAMI (Ley 19.032) y 3% de obra social — un 17% en total. Si pagás impuesto a las Ganancias o tenés cuota sindical, también se descuentan según tu caso.",
  },
  {
    q: "¿Se incluyen horas extras, comisiones y premios en el cálculo?",
    a: "Sí: la ley toma la mayor remuneración mensual devengada «por todo concepto», así que incluye horas extras, comisiones, premios y adicionales remunerativos del mes que se toma como base. No se incluyen los conceptos no remunerativos (por ejemplo, ciertos bonos o viáticos no remunerativos).",
  },
  {
    q: "¿Quiénes cobran aguinaldo?",
    a: "Todos los trabajadores en relación de dependencia: empleados privados, del Estado y del personal de casas particulares. Los monotributistas, autónomos y quienes facturan como independientes no cobran aguinaldo, porque no tienen empleador.",
  },
  {
    q: "¿Qué hago si no me pagan el aguinaldo?",
    a: "Primero reclamalo por escrito a tu empleador (idealmente por carta documento, intimando al pago). Si no responde, podés denunciar ante la Secretaría de Trabajo de tu provincia o iniciar un reclamo laboral. El aguinaldo es un derecho irrenunciable: no se puede pactar no cobrarlo.",
  },
  {
    q: "¿El aguinaldo se cobra en junio o en julio?",
    a: "El vencimiento legal de la primera cuota es el 30 de junio (art. 122 LCT, texto Ley 27.073). Pero por la tolerancia general del art. 128 de la LCT, el pago puede acreditarse hasta 4 días hábiles después sin que el empleador esté en infracción: en la práctica, muchos lo cobran los primeros días hábiles de julio. Pasada esa tolerancia, corresponde reclamar.",
  },
  {
    q: "¿Desde cuántos meses de trabajo se cobra el aguinaldo?",
    a: "No hay un mínimo: el derecho nace desde el primer día trabajado. Si no llegaste a trabajar el semestre completo, cobrás el proporcional a los días trabajados — incluso con un solo mes de antigüedad.",
  },
  {
    q: "¿Cuánto cobro de aguinaldo si trabajé 1, 2, 3 o 4 meses?",
    a: "Aproximadamente, por cada mes trabajado del semestre te corresponde un sexto de la cuota completa: con 3 meses cobrás más o menos la mitad. La cuenta exacta es por días trabajados: mirá la tabla de esta página o usá la calculadora, que la hace al día exacto.",
  },
  {
    q: "¿El aguinaldo se descuenta del sueldo?",
    a: "No. El aguinaldo se paga además del sueldo del mes: en junio cobrás tu salario habitual más la cuota del SAC. Es un pago extra de naturaleza salarial, no un adelanto ni una parte de tu sueldo.",
  },
  {
    q: "¿El aguinaldo se cobra en bruto o en neto?",
    a: "Se calcula en bruto (50% del mejor sueldo bruto del semestre) pero se cobra en neto: se le descuenta el mismo 17% de aportes que a un sueldo. En mano te queda aproximadamente el 41,5% de tu mejor sueldo bruto. En calcular.ar/aguinaldo/neto está la tabla completa por rangos de sueldo.",
  },
  {
    q: "¿Los jubilados y la AUH cobran aguinaldo?",
    a: "Los jubilados y pensionados de ANSES sí: cobran medio haber adicional junto con la mensualidad de junio y de diciembre, según el calendario de pagos por terminación de DNI. La AUH y las asignaciones familiares no cobran aguinaldo, porque no son remuneraciones.",
  },
];

export default function AguinaldoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Aguinaldo 2026",
        url: "https://calcular.ar/aguinaldo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Calculadora de Aguinaldo 2026: cuánto cobrás de SAC y cuándo se paga",
        descripcion:
          "Cómo se calcula el aguinaldo 2026 (50% del mejor sueldo del semestre), fechas de pago y cuánto queda en mano tras los aportes.",
        url: "/aguinaldo",
        modificado: "2026-06-13",
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
          Calculadora de Aguinaldo 2026
        </h1>
        <p className="text-zinc-600">
          Ingresá tu mejor sueldo del semestre y descubrí al instante{" "}
          <strong>cuánto te corresponde de aguinaldo</strong>, en bruto y en mano. Si no
          trabajaste el semestre completo, calcula automáticamente el proporcional por días
          trabajados.
        </p>
      </header>

      <RespuestaPrimero actualizado="13 de junio de 2026">
        <p>
          El aguinaldo (SAC) es <strong>el 50% de tu mejor sueldo bruto del semestre</strong>.
          La primera cuota de 2026 vence el <strong>30 de junio</strong> y la segunda el{" "}
          <strong>18 de diciembre</strong>. Como es remunerativo, se le descuenta el 17% de
          aportes: <strong>en mano te queda cerca del 41,5%</strong> de tu mejor sueldo bruto.
          Si no trabajaste el semestre completo, cobrás el proporcional a los días trabajados.
          Monotributistas y autónomos no cobran aguinaldo.
        </p>
      </RespuestaPrimero>

      <CalculadoraAguinaldo />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/aguinaldo/neto"
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
        >
          <p className="font-semibold text-zinc-900">¿Bruto o neto? →</p>
          <p className="mt-1 text-sm text-zinc-600">
            Tabla de cuánto queda en mano según tu sueldo, con los descuentos explicados.
          </p>
        </Link>
        <Link
          href="/aguinaldo/fechas"
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
        >
          <p className="font-semibold text-zinc-900">¿Cuándo se cobra? →</p>
          <p className="mt-1 text-sm text-zinc-600">
            Fechas de pago 2026: privados, estatales, jubilados y provincia por provincia.
          </p>
        </Link>
        <Link
          href="/blog/aguinaldo-paga-ganancias"
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
        >
          <p className="font-semibold text-zinc-900">¿Paga Ganancias? →</p>
          <p className="mt-1 text-sm text-zinc-600">
            Solo los sueldos altos, y prorrateado mes a mes: desde qué sueldo te alcanza.
          </p>
        </Link>
        <Link
          href="/blog/que-hacer-con-el-aguinaldo-2026"
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
        >
          <p className="font-semibold text-zinc-900">¿Qué hago con el aguinaldo? →</p>
          <p className="mt-1 text-sm text-zinc-600">
            Plazo fijo, UVA, dólares o pagar deudas: qué dice la matemática hoy, con la cuenta.
          </p>
        </Link>
        <Link
          href="/blog/aguinaldo-proporcional-como-se-calcula"
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
        >
          <p className="font-semibold text-zinc-900">¿Entraste o saliste a mitad de año? →</p>
          <p className="mt-1 text-sm text-zinc-600">
            El aguinaldo proporcional se calcula por días trabajados, no por meses: la fórmula y los
            ejemplos.
          </p>
        </Link>
        <Link
          href="/blog/aguinaldo-monotributista"
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
        >
          <p className="font-semibold text-zinc-900">¿Soy monotributista, cobro aguinaldo? →</p>
          <p className="mt-1 text-sm text-zinc-600">
            No, salvo que además tengas un empleo en blanco. Por qué la ley lo deja afuera y cómo
            armarte tu propio aguinaldo.
          </p>
        </Link>
      </div>

      <EmailCapture
        source="aguinaldo"
        headline="Avisame cuando cambien los datos"
        subtext="Cuando salga el nuevo IPC, cambien las escalas del SAC o aparezca la fecha de diciembre, te mando un aviso. Sin spam."
      />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se calcula el aguinaldo</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El aguinaldo —formalmente, <strong>Sueldo Anual Complementario (SAC)</strong>— se paga
            en dos cuotas por año. Cada cuota es{" "}
            <strong>
              el 50% de la mayor remuneración mensual devengada por todo concepto
            </strong>{" "}
            dentro del semestre (Ley 23.041). La cuenta es simple: tu mejor sueldo bruto del
            semestre, dividido 2.
          </p>
          <p>
            Por ejemplo: si entre enero y junio tu mejor mes fue de $1.500.000 brutos, tu primera
            cuota del aguinaldo es de <strong>$750.000 brutos</strong>. Sobre ese monto se aplican
            los mismos descuentos que a un sueldo normal (jubilación, PAMI y obra social, un 17%
            en total), así que en mano quedan unos $622.500.
          </p>
          <p>
            «Por todo concepto» significa que el mes que se toma como base incluye horas extras,
            comisiones, premios y todo adicional remunerativo: si en marzo hiciste muchas horas
            extras y fue tu mejor mes, ese es el sueldo que se usa.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuándo se paga el aguinaldo en 2026</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SEMESTRES_2026.map((s) => (
            <div key={s.id} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="font-semibold text-emerald-900">
                {s.id === "primero" ? "Primera cuota" : "Segunda cuota"}
              </h3>
              <p className="mt-1 text-2xl font-bold text-emerald-800">{s.fechaPago}</p>
              <p className="mt-2 text-sm text-emerald-900">
                Sobre el mejor sueldo de {s.periodo}.
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-3 text-zinc-600">
          <p>
            Esos son los vencimientos legales del art. 122 de la Ley de Contrato de Trabajo (texto
            según la Ley 27.073). Por la tolerancia general del art. 128, en la práctica se admite
            el pago hasta <strong>4 días hábiles después</strong> de cada vencimiento.
          </p>
          <p>
            Para la cuota de diciembre, el empleador estima el sueldo de ese mes para poder pagar
            el 18: si el sueldo real termina siendo mayor, la diferencia se integra con el salario
            de diciembre.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Aguinaldo proporcional: cuándo aplica</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Si no trabajaste el semestre completo —porque entraste después de que empezó o porque
            el contrato terminó antes del cierre— cobrás el{" "}
            <strong>proporcional al tiempo trabajado</strong>:
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Aguinaldo proporcional = (mejor sueldo del semestre ÷ 2) × (días trabajados ÷ días del
            semestre)
          </p>
          <p>
            Por ejemplo: si empezaste a trabajar el 1 de abril de 2026 con un mejor sueldo de
            $1.500.000, trabajaste 91 de los 181 días del primer semestre. Tu aguinaldo bruto es
            $750.000 × 91 ÷ 181 = <strong>$377.072</strong>. Y si te vas de un trabajo a mitad del
            semestre, el proporcional se paga junto con la liquidación final, sin esperar a junio
            o diciembre.
          </p>
        </div>
      </section>

      <section id="por-meses-trabajados" className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          ¿Cuánto cobro si trabajé 1, 2, 3, 4 o 5 meses?
        </h2>
        <p className="text-zinc-600">
          Regla rápida: <strong>cada mes trabajado del semestre vale un sexto de la cuota
          completa</strong>. Ejemplo con un mejor sueldo bruto de $1.500.000 (cuota completa:
          $750.000 brutos):
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-3 font-semibold">Meses trabajados</th>
                <th className="px-4 py-3 font-semibold">Parte que cobrás</th>
                <th className="px-4 py-3 font-semibold">Aguinaldo bruto</th>
                <th className="px-4 py-3 font-semibold">En mano (aprox.)</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((meses) => {
                const bruto = (750_000 * meses) / 6;
                return (
                  <tr key={meses} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-zinc-900">
                      {meses} {meses === 1 ? "mes" : "meses"}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-700">{meses}/6 de la cuota</td>
                    <td className="px-4 py-2.5 text-zinc-700">
                      ${bruto.toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-2.5 font-semibold text-emerald-700">
                      ${Math.round(bruto * 0.83).toLocaleString("es-AR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          La cuenta legal exacta es por días trabajados sobre los días del semestre (181 días el
          primero de 2026): la calculadora de arriba la hace al día, con tus fechas reales de
          ingreso y egreso.
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

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href={AGUINALDO_FUENTES.ley23041.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {AGUINALDO_FUENTES.ley23041.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={AGUINALDO_FUENTES.lct.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {AGUINALDO_FUENTES.lct.nombre}
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {AGUINALDO_FUENTES.consultadoEl}. ¿Querés saber cuánto rinde tu
          aguinaldo si lo ahorrás? Probá la{" "}
          <Link href="/plazo-fijo" className="text-emerald-700 underline">
            calculadora de plazo fijo
          </Link>
          . ¿Sos empleado de comercio o de la construcción? La base de tu aguinaldo es tu
          sueldo de convenio: miralo en las{" "}
          <Link href="/convenios" className="text-emerald-700 underline">
            escalas salariales verificadas
          </Link>
          . Mirá también la{" "}
          <Link href="/vacaciones" className="text-emerald-700 underline">
            calculadora de vacaciones
          </Link>{" "}
          y, si sos monotributista, la{" "}
          <Link href="/monotributo" className="text-emerald-700 underline">
            calculadora de monotributo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
