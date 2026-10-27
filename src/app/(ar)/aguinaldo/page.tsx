import type { Metadata } from "next";
import { hreflangHeadAR } from "@/lib/hreflang-ar";
import Link from "next/link";
import { CalculadoraAguinaldo } from "@/components/CalculadoraAguinaldo";
import { datosOferta } from "@/lib/oferta";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import { AGUINALDO_FUENTES, SEMESTRES_2026 } from "@/data/aguinaldo";
import { OtrosPaises } from "@/components/OtrosPaises";

// Función y no constante: el clúster hreflang se evalúa con la fecha del día (check_mes_en_render).
export function generateMetadata(): Metadata {
  return {
    title: "Calculadora de aguinaldo 2026: cuánto cobrás de SAC",
    description:
      "Calculá tu aguinaldo 2026: 50% del mejor sueldo del semestre, proporcional por días. Bruto y en mano, con las fechas de pago de junio y diciembre.",
    alternates: { canonical: "/aguinaldo", languages: hreflangHeadAR("/aguinaldo") },
    openGraph: openGraphDe({
      ruta: "/aguinaldo",
      titulo: "Calculadora de aguinaldo 2026",
      bajada: "Cuánto cobrás de SAC, en bruto y en mano",
    }),
  };
}

const faqs = [
  {
    q: "¿Cuándo se paga el aguinaldo 2026?",
    a: "La segunda cuota vence el 18 de diciembre de 2026. La primera venció el 30 de junio (art. 122 de la Ley de Contrato de Trabajo, texto según Ley 27.073). Por la tolerancia general del art. 128 de la LCT, se suele aceptar el pago hasta 4 días hábiles después de cada vencimiento.",
  },
  {
    q: "¿Cómo se calcula el aguinaldo?",
    a: "Cada cuota es el 50% de tu mejor sueldo bruto del semestre. La ley lo dice así: la mayor remuneración mensual devengada por todo concepto dentro del semestre (Ley 23.041). Si no trabajaste el semestre completo, cobrás la parte proporcional.",
  },
  {
    q: "¿Qué pasa si no trabajé todo el semestre?",
    a: "Cobrás el proporcional: el aguinaldo completo (mejor sueldo ÷ 2) multiplicado por los días que trabajaste, dividido los días del semestre. Vale si entraste en la mitad del semestre o si te fuiste antes de que cierre (en ese caso se paga con la liquidación final).",
  },
  {
    q: "¿El aguinaldo tiene descuentos?",
    a: "Sí. Es remunerativo, así que tiene los mismos aportes que el sueldo: 11% de jubilación, 3% de PAMI (Ley 19.032) y 3% de obra social. En total, 17%. Si pagás Ganancias o tenés cuota sindical, también se descuentan.",
  },
  {
    q: "¿Se incluyen horas extras, comisiones y premios en el cálculo?",
    a: "Sí. La ley toma el mejor sueldo «por todo concepto», así que suma horas extras, comisiones, premios y adicionales remunerativos del mes que se usa de base. Los conceptos no remunerativos (por ejemplo, algunos bonos o viáticos) no entran.",
  },
  {
    q: "¿Quiénes cobran aguinaldo?",
    a: "Todas las personas en relación de dependencia: empleados privados, estatales y personal de casas particulares. Los monotributistas, autónomos y quienes facturan por su cuenta no cobran aguinaldo, porque no tienen empleador.",
  },
  {
    q: "¿Qué hago si no me pagan el aguinaldo?",
    a: "Primero reclamalo por escrito a tu empleador (mejor por carta documento, intimando el pago). Si no responde, podés denunciarlo ante la Secretaría de Trabajo de tu provincia o hacer un reclamo laboral. El aguinaldo es irrenunciable: no se puede pactar no cobrarlo.",
  },
  {
    q: "¿El aguinaldo se cobra en junio o en julio?",
    a: "La primera cuota vence el 30 de junio (art. 122 LCT, texto Ley 27.073). Por la tolerancia general del art. 128 de la LCT, se puede pagar hasta 4 días hábiles después sin que el empleador esté en falta. Por eso muchos lo cobran en los primeros días hábiles de julio. Pasada esa tolerancia, corresponde reclamar. Con la cuota de diciembre pasa lo mismo a partir del 18.",
  },
  {
    q: "¿Desde cuántos meses de trabajo se cobra el aguinaldo?",
    a: "No hay un mínimo: el derecho empieza el primer día de trabajo. Si no trabajaste el semestre completo, cobrás la parte proporcional a los días que trabajaste. Aunque tengas un solo mes de antigüedad.",
  },
  {
    q: "¿Cuánto cobro de aguinaldo si trabajé 1, 2, 3 o 4 meses?",
    a: "Más o menos, cada mes trabajado del semestre vale un sexto de la cuota completa: con 3 meses cobrás cerca de la mitad. La cuenta exacta es por días. Mirá la tabla de esta página o usá la calculadora, que la hace al día.",
  },
  {
    q: "¿El aguinaldo se descuenta del sueldo?",
    a: "No. El aguinaldo se paga además del sueldo del mes: en diciembre cobrás tu sueldo de siempre más la cuota del SAC. Es un pago extra, no un adelanto ni una parte de tu sueldo.",
  },
  {
    q: "¿El aguinaldo se cobra en bruto o en neto?",
    a: "Se calcula en bruto (50% del mejor sueldo bruto del semestre) y se cobra en neto, con el mismo 17% de aportes que un sueldo. En mano te queda cerca del 41,5% de tu mejor sueldo bruto. En calcular.ar/aguinaldo/neto tenés la tabla completa por sueldo.",
  },
  {
    q: "¿Los jubilados y la AUH cobran aguinaldo?",
    a: "Los jubilados y pensionados de ANSES sí: cobran medio haber extra con la mensualidad de junio y la de diciembre, según el calendario por terminación de DNI. La AUH y las asignaciones familiares no tienen aguinaldo, porque no son sueldos.",
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
        titulo: "Calculadora de aguinaldo 2026: cuánto cobrás de SAC",
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
          Poné tu mejor sueldo del semestre y mirá{" "}
          <strong>cuánto te toca de aguinaldo</strong>, en bruto y en mano. Si no trabajaste el
          semestre completo, la calculadora saca sola el proporcional por días.
        </p>
        <p className="text-sm text-zinc-600">
          La cuota de diciembre vence el <strong>18 de diciembre</strong>. ¿Sos jubilado o estatal?
          Mirá{" "}
          <Link href="/aguinaldo/fechas" className="font-medium text-emerald-700 underline">
            cuándo se paga el aguinaldo en tu caso
          </Link>
          .
        </p>
      </header>

      <RespuestaPrimero actualizado="13 de junio de 2026">
        <p>
          El aguinaldo (en la ley se llama SAC) es{" "}
          <strong>el 50% de tu mejor sueldo bruto del semestre</strong>. La segunda cuota de 2026
          vence el <strong>18 de diciembre</strong>; la primera venció el{" "}
          <strong>30 de junio</strong>. Como es remunerativo, se le descuenta el 17% de aportes:{" "}
          <strong>en mano te queda cerca del 41,5%</strong> de tu mejor sueldo bruto. Si no
          trabajaste el semestre completo, cobrás la parte proporcional a los días trabajados.
          Monotributistas y autónomos no cobran aguinaldo.
        </p>
      </RespuestaPrimero>

      <CalculadoraAguinaldo oferta={datosOferta("planilla-mi-sueldo")} />

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
        subtext="Te aviso cuando salga el nuevo IPC, cambien las escalas o se publiquen las fechas de diciembre. Sin spam."
      />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se calcula el aguinaldo</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El aguinaldo (en la ley se llama <strong>Sueldo Anual Complementario, SAC</strong>) se
            paga en dos cuotas por año. Cada cuota es{" "}
            <strong>
              el 50% de la mayor remuneración mensual devengada por todo concepto
            </strong>{" "}
            dentro del semestre (Ley 23.041). Dicho fácil: tu mejor sueldo bruto del semestre,
            dividido 2.
          </p>
          <p>
            Un ejemplo: si entre julio y diciembre tu mejor mes fue de $1.500.000 brutos, tu cuota
            de aguinaldo es de <strong>$750.000 brutos</strong>. Ese monto tiene los mismos
            descuentos que un sueldo (jubilación, PAMI y obra social, 17% en total), así que en mano
            te quedan unos $622.500.
          </p>
          <p>
            «Por todo concepto» quiere decir que el mes que se usa de base incluye horas extras,
            comisiones, premios y cualquier adicional remunerativo. Si en septiembre hiciste muchas
            horas extras y fue tu mejor mes, ese es el sueldo que cuenta.
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
            Son los vencimientos legales del art. 122 de la Ley de Contrato de Trabajo (texto según
            la Ley 27.073). Por la tolerancia general del art. 128, en la práctica se acepta el pago
            hasta <strong>4 días hábiles después</strong> de cada vencimiento.
          </p>
          <p>
            Para pagar el 18 de diciembre, el empleador estima el sueldo de ese mes. Si después el
            sueldo real es más alto, la diferencia se paga con el sueldo de diciembre.
          </p>
          <p>
            Las fechas de jubilados y estatales están en{" "}
            <Link href="/aguinaldo/fechas" className="text-emerald-700 underline">
              cuándo se cobra el aguinaldo
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Aguinaldo proporcional: cuándo aplica</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Si no trabajaste el semestre completo (porque entraste después o porque te fuiste
            antes), cobrás la <strong>parte proporcional al tiempo trabajado</strong>:
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Aguinaldo proporcional = (mejor sueldo del semestre ÷ 2) × (días trabajados ÷ días del
            semestre)
          </p>
          <p>
            Por ejemplo: si empezaste a trabajar el 1 de abril de 2026 con un mejor sueldo de
            $1.500.000, trabajaste 91 de los 181 días del primer semestre. Tu aguinaldo bruto es
            $750.000 × 91 ÷ 181 = <strong>$377.072</strong>. Y si dejás un trabajo a mitad del
            semestre, el proporcional se paga con la liquidación final, sin esperar a junio o
            diciembre.
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
          La cuenta exacta es por días trabajados sobre los días del semestre (181 días el primero
          de 2026). La calculadora de arriba la hace al día, con tus fechas reales de entrada y
          salida.
        </p>
      </section>

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
      <OtrosPaises concepto="bono-semestral" />
    </article>
  );
}
