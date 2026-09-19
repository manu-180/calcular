import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { calcularAguinaldo } from "@/lib/aguinaldo";
import { SEMESTRES_2026 } from "@/data/aguinaldo";
import { formatARS } from "@/lib/formato";

const PUBLICADO = "23 de junio de 2026";
const PUBLICADO_ISO = "2026-06-23";

const titulo =
  "Aguinaldo proporcional 2026: cómo se calcula si no trabajaste todo el semestre";
const descripcion =
  "Si entraste o saliste del trabajo a mitad de año, el aguinaldo es proporcional a los días trabajados — no a los meses redondeados. La fórmula correcta de la LCT, ejemplos con números reales y la calculadora que lo computa por vos.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/blog/aguinaldo-proporcional-como-se-calcula" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Aguinaldo proporcional 2026")}&s=${encodeURIComponent("Cómo se calcula si no trabajaste todo el semestre")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Semestre de referencia: enero–junio 2026 (181 días).
const SEM = SEMESTRES_2026[0];
// Sueldo de ejemplo para la tabla de escenarios (el lector reemplaza por el suyo).
const SUELDO_EJEMPLO = 900_000;

// Escenarios computados con el MISMO motor testeado que la calculadora (never-drift).
const escenarios = [
  { etiqueta: "Entró el 1 de febrero", ingresoISO: "2026-02-01" },
  { etiqueta: "Entró el 1 de marzo", ingresoISO: "2026-03-01" },
  { etiqueta: "Entró el 1 de abril", ingresoISO: "2026-04-01" },
  { etiqueta: "Entró el 16 de mayo", ingresoISO: "2026-05-16" },
].map((e) => {
  const r = calcularAguinaldo({
    mejorSueldo: SUELDO_EJEMPLO,
    semestre: SEM,
    ingresoISO: e.ingresoISO,
  });
  return { ...e, r };
});

// Caso completo (semestre entero) para contrastar.
const completo = calcularAguinaldo({ mejorSueldo: SUELDO_EJEMPLO, semestre: SEM });

// Ejemplo desarrollado: ingreso el 1 de marzo.
const ej = calcularAguinaldo({
  mejorSueldo: SUELDO_EJEMPLO,
  semestre: SEM,
  ingresoISO: "2026-03-01",
});
// Comparación con la fórmula simplificada "por meses" (la que usan los medios).
const porMeses = (SUELDO_EJEMPLO / 12) * 4; // marzo, abril, mayo, junio

const faqs = [
  {
    q: "¿Cómo se calcula el aguinaldo si no trabajé los 6 meses completos?",
    a: "El aguinaldo proporcional toma el 50% de tu mejor sueldo del semestre y lo multiplica por los días que efectivamente trabajaste sobre los días totales del semestre. La fórmula es: (mejor sueldo ÷ 2) × (días trabajados ÷ días del semestre). El cálculo correcto es por días, no por meses redondeados.",
  },
  {
    q: "¿Es lo mismo calcular por meses que por días?",
    a: "No siempre. Muchas guías simplifican dividiendo por 12 y multiplicando por los meses trabajados, pero eso redondea. La Ley de Contrato de Trabajo manda calcular sobre el tiempo efectivo de trabajo, que se mide en días. Si entraste o saliste a mitad de mes, el cálculo por días es el correcto y puede dar distinto.",
  },
  {
    q: "Si me despiden o renuncio, ¿cobro el aguinaldo proporcional?",
    a: "Sí. Al terminar la relación laboral te corresponde el SAC proporcional a los días trabajados en el semestre en curso, y se paga dentro de la liquidación final. Aplica tanto en despido como en renuncia (art. 123 de la LCT).",
  },
  {
    q: "¿El aguinaldo proporcional también tiene descuentos?",
    a: "Sí. El SAC es remunerativo, así que se le aplican los mismos aportes personales que al sueldo: 11% de jubilación (SIPA), 3% de PAMI y 3% de obra social. Por eso el neto que cobrás en mano es menor que el bruto calculado.",
  },
  {
    q: "Si trabajé el semestre completo pero falté varios días, ¿es proporcional?",
    a: "No. Las ausencias por enfermedad, vacaciones o licencias legales no reducen el aguinaldo. El SAC solo se prorratea cuando no estuviste vinculado todo el semestre (ingreso o egreso a mitad de período), no por faltas dentro de una relación laboral vigente.",
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
        url: "/blog/aguinaldo-proporcional-como-se-calcula",
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
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · Ley 23.041 y LCT 20.744 (arts. 121-123)
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Aguinaldo proporcional: cómo se calcula si no trabajaste todo el semestre
        </h1>
        <p className="text-zinc-600">
          Si entraste a trabajar a mitad de año, o te fuiste antes de que cierre el semestre, no
          cobrás el aguinaldo completo: cobrás la parte proporcional al tiempo que trabajaste. Acá
          está la fórmula correcta —la que manda la ley, por días— con ejemplos reales y la
          calculadora que la resuelve por vos.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          El aguinaldo proporcional es el <strong>50% de tu mejor sueldo del semestre</strong>{" "}
          multiplicado por los <strong>días que trabajaste</strong> sobre los días totales del
          semestre:
        </p>
        <p className="mt-2 rounded-lg bg-zinc-900 px-4 py-3 text-center font-mono text-sm text-emerald-300">
          (mejor sueldo ÷ 2) × (días trabajados ÷ días del semestre)
        </p>
        <p className="mt-2">
          La clave: el cálculo correcto es <strong>por días</strong>, no por meses redondeados.
          La Ley de Contrato de Trabajo lo mide sobre el tiempo efectivo de trabajo, así que si
          entraste o saliste a mitad de mes, contar días te da el número exacto.
        </p>
      </RespuestaPrimero>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">El error de calcular &quot;por meses&quot;</h2>
        <p className="text-zinc-600">
          La mayoría de las guías simplifican: dividen el sueldo por 12 y lo multiplican por los
          meses trabajados. Funciona como aproximación, pero redondea. La Ley de Contrato de
          Trabajo manda calcular sobre el <strong>tiempo efectivo</strong>, que se mide en días.
          Mirá la diferencia con un sueldo de {formatARS(SUELDO_EJEMPLO, 0)} y un ingreso el 1 de
          marzo de 2026:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-500">Fórmula &quot;por meses&quot; (aproximada)</p>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              ({formatARS(SUELDO_EJEMPLO, 0)} ÷ 12) × 4 meses
            </p>
            <p className="mt-2 text-2xl font-bold text-zinc-700">{formatARS(porMeses, 0)}</p>
          </div>
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-4">
            <p className="text-sm font-semibold text-emerald-700">Fórmula legal (por días)</p>
            <p className="mt-1 font-mono text-xs text-emerald-700">
              ({formatARS(SUELDO_EJEMPLO / 2, 0)}) × ({ej.diasTrabajados} ÷ {ej.diasTotales} días)
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-800">{formatARS(ej.bruto, 0)}</p>
          </div>
        </div>
        <p className="text-xs text-zinc-400">
          Del 1 de marzo al 30 de junio hay {ej.diasTrabajados} días trabajados sobre los{" "}
          {ej.diasTotales} del semestre. La diferencia es chica en este caso, pero crece cuando el
          ingreso o el egreso cae a mitad de mes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuánto cobrás según cuándo entraste (sueldo de {formatARS(SUELDO_EJEMPLO, 0)})
        </h2>
        <p className="text-sm text-zinc-600">
          Aguinaldo del 1er semestre 2026 (enero a junio, {completo.diasTotales} días), con un mejor
          sueldo de {formatARS(SUELDO_EJEMPLO, 0)}. El bruto es lo que se calcula; el neto es lo que
          cobrás en mano tras los aportes de ley (17%).
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-3 py-2.5 text-left font-medium">Caso</th>
                <th className="px-3 py-2.5 text-right font-medium">Días</th>
                <th className="px-3 py-2.5 text-right font-medium">Bruto</th>
                <th className="px-3 py-2.5 text-right font-medium text-emerald-700">Neto en mano</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {escenarios.map((e) => (
                <tr key={e.etiqueta} className="bg-white hover:bg-zinc-50">
                  <td className="px-3 py-2.5 text-zinc-700">{e.etiqueta}</td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">
                    {e.r.diasTrabajados}/{e.r.diasTotales}
                  </td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">{formatARS(e.r.bruto, 0)}</td>
                  <td className="px-3 py-2.5 text-right font-semibold text-emerald-700">
                    {formatARS(e.r.netoEstimado, 0)}
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-50 font-semibold">
                <td className="px-3 py-2.5 text-emerald-900">Semestre completo</td>
                <td className="px-3 py-2.5 text-right text-emerald-900">
                  {completo.diasTrabajados}/{completo.diasTotales}
                </td>
                <td className="px-3 py-2.5 text-right text-emerald-900">
                  {formatARS(completo.bruto, 0)}
                </td>
                <td className="px-3 py-2.5 text-right text-emerald-900">
                  {formatARS(completo.netoEstimado, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Calculado con las mismas fórmulas que la calculadora del sitio (mejor sueldo ÷ 2 × días
          trabajados ÷ días del semestre, menos 11% SIPA + 3% PAMI + 3% obra social). Reemplazá el
          sueldo por el tuyo en la calculadora de abajo.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h2 className="text-lg font-bold text-emerald-900">Calculá tu aguinaldo proporcional</h2>
        <p className="text-sm text-emerald-800">
          Poné tu mejor sueldo del semestre y tildá &quot;semestre incompleto&quot; para cargar tu
          fecha de ingreso o de egreso. La calculadora hace la cuenta por días y te muestra el neto:
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/aguinaldo/neto"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Calcular mi aguinaldo proporcional →
          </Link>
          <Link
            href="/aguinaldo"
            className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400"
          >
            Todo sobre el aguinaldo →
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Si te despiden o renunciás: el SAC va en la liquidación final
        </h2>
        <p className="text-zinc-600">
          Cuando termina la relación laboral —por despido o por renuncia— te corresponde el
          aguinaldo proporcional a los días trabajados del semestre en curso. No se pierde: se
          liquida junto con el resto de la liquidación final (art. 123 de la LCT). El cálculo es el
          mismo: 50% del mejor sueldo del semestre por los días trabajados sobre el total.
        </p>
        <p className="text-sm text-zinc-600">
          ¿Te están por despedir? Mirá también cómo se calcula la{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            indemnización por despido
          </Link>
          , que incluye el SAC proporcional sobre el preaviso y la integración del mes.
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
        source="blog-aguinaldo-proporcional"
        headline="Avisame cuando cambien los datos laborales"
        subtext="Aportes, topes y escalas se actualizan varias veces al año. Cuando cambie algo que afecta tu sueldo o tu aguinaldo, te aviso. Sin spam."
      />

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href="https://www.argentina.gob.ar/normativa/nacional/ley-23041-1983-28165"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley 23.041 — Sueldo Anual Complementario
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley de Contrato de Trabajo 20.744, arts. 121 a 123
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Esta guía es informativa; para tu caso puntual consultá con tu empleador, tu sindicato o
          un profesional. Los aportes personales son los de ley vigentes en 2026.
        </p>
        <p className="text-sm text-zinc-600">
          ¿El aguinaldo paga Ganancias? Leé{" "}
          <Link href="/blog/aguinaldo-paga-ganancias" className="text-emerald-700 underline">
            si el aguinaldo paga impuesto a las Ganancias en 2026
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
