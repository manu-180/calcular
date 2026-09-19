import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { calcularIndemnizacion } from "@/lib/indemnizacion";
import { formatARS } from "@/lib/formato";

const PUBLICADO = "25 de junio de 2026";
const PUBLICADO_ISO = "2026-06-25";

const titulo =
  "Cómo se calcula la indemnización por despido en 2026 (ejemplo paso a paso)";
const descripcion =
  "El método completo del art. 245 de la LCT con la reforma de la Ley 27.802: antigüedad, preaviso, integración del mes y liquidación final. Un ejemplo real desarrollado peso por peso y la calculadora que lo resuelve por vos.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/blog/como-se-calcula-la-indemnizacion-por-despido-2026" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Indemnización por despido 2026")}&s=${encodeURIComponent("Cómo se calcula, paso a paso, con la reforma de la Ley 27.802")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Caso desarrollado, computado con el MISMO motor testeado que la calculadora del sitio
// (never-drift): si cambian las reglas, este ejemplo se recalcula solo.
const SUELDO_EJEMPLO = 1_500_000;
const INGRESO = "2021-03-01";
const DESPIDO = "2026-06-11";
const r = calcularIndemnizacion({
  ingresoISO: INGRESO,
  despidoISO: DESPIDO,
  mejorRemuneracion: SUELDO_EJEMPLO,
  preavisoOtorgado: false,
})!;

const faqs = [
  {
    q: "¿Cuál es la fórmula de la indemnización por antigüedad?",
    a: "Un mes de tu mejor sueldo por cada año trabajado o fracción mayor de 3 meses (art. 245 LCT). Se toma la mejor remuneración mensual, normal y habitual del último año. Por ejemplo, con 6 años computables y un mejor sueldo de $1.500.000, la indemnización por antigüedad es 6 × $1.500.000 = $9.000.000. A eso se suman el preaviso, la integración del mes y la liquidación final.",
  },
  {
    q: "¿Una fracción de año cuenta como un año entero?",
    a: "Solo si supera los 3 meses. La ley dice «un mes de sueldo por año de servicio o fracción mayor de 3 meses». Si trabajaste 5 años y 3 meses justos, computa 5 años; si trabajaste 5 años y 3 meses y un día, computa 6. Los 3 meses justos no suman.",
  },
  {
    q: "¿Qué cambió con la reforma de la Ley 27.802 en 2026?",
    a: "El piso del tope quedó escrito en la ley: aunque tu convenio tenga un tope (3 veces el sueldo promedio del CCT), la base de cálculo nunca puede bajar del 67% de tu remuneración real. Antes ese piso era solo jurisprudencia (el fallo «Vizzoti»); desde la Ley 27.802 (B.O. 6/3/2026) es texto legal del art. 245. También se precisó la definición de la base y el preaviso del art. 231.",
  },
  {
    q: "¿Siguen vigentes la doble indemnización y las multas por trabajo en negro?",
    a: "No. La Ley 27.742 (julio de 2024) derogó las multas por empleo no registrado (Ley 24.013) y las indemnizaciones agravadas (Leyes 25.323 y 25.345), incluida la «doble indemnización». Si tu relación no estaba registrada conservás el derecho a la indemnización común y a reclamar los aportes adeudados, pero las multas agravadas ya no corren.",
  },
  {
    q: "¿La indemnización por despido paga impuesto a las Ganancias?",
    a: "La indemnización por antigüedad del art. 245 está exenta de Ganancias (art. 26 inc. i de la ley del impuesto, y jurisprudencia consolidada). El preaviso y la integración del mes, en cambio, sí pueden estar alcanzados según el caso. La liquidación final (aguinaldo y vacaciones proporcionales) tributa como un sueldo.",
  },
  {
    q: "¿Me corresponde indemnización si renuncio o me despiden con causa?",
    a: "No corresponde la indemnización por antigüedad ni el preaviso. Pero siempre te deben la liquidación final: los días trabajados del mes, el aguinaldo proporcional del semestre y las vacaciones proporcionales no gozadas (arts. 123 y 156 LCT). Si la «justa causa» que invocó el empleador no es real, podés discutirla judicialmente.",
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
        url: "/blog/como-se-calcula-la-indemnizacion-por-despido-2026",
        modificado: PUBLICADO_ISO,
        publicado: PUBLICADO_ISO,
      }),
    ],
  };

  const ant = r.antiguedad;

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · LCT 20.744 (art. 245, texto Ley 27.802)
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cómo se calcula la indemnización por despido en 2026 (paso a paso)
        </h1>
        <p className="text-zinc-600">
          Si te despiden sin causa, lo que cobrás no es un solo número: son cuatro conceptos que se
          suman. Acá está el método completo del art. 245 de la Ley de Contrato de Trabajo —con la
          reforma de la Ley 27.802 ya incorporada— desarrollado con un ejemplo real, peso por peso,
          y la calculadora que lo resuelve por vos.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          La indemnización por despido sin causa se arma con <strong>cuatro conceptos</strong>:
        </p>
        <ol className="mt-2 ml-4 list-decimal space-y-1">
          <li>
            <strong>Indemnización por antigüedad</strong>: un mes de tu mejor sueldo por cada año
            trabajado o fracción mayor de 3 meses (art. 245).
          </li>
          <li>
            <strong>Preaviso</strong>: 1 mes de sueldo (2 si tenés más de 5 años de antigüedad) si
            no te avisaron con anticipación (arts. 231-232).
          </li>
          <li>
            <strong>Integración del mes</strong>: los días que faltan hasta fin de mes desde el día
            del despido (art. 233).
          </li>
          <li>
            <strong>Liquidación final</strong>: aguinaldo y vacaciones proporcionales, que
            corresponden siempre (arts. 123 y 156).
          </li>
        </ol>
      </RespuestaPrimero>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Un ejemplo desarrollado, peso por peso</h2>
        <p className="text-zinc-600">
          Tomemos un caso concreto: alguien que <strong>ingresó el 1 de marzo de 2021</strong>, fue{" "}
          <strong>despedido sin causa ni preaviso el 11 de junio de 2026</strong>, con una mejor
          remuneración mensual de <strong>{formatARS(SUELDO_EJEMPLO, 0)}</strong>. La antigüedad es
          de {ant.anios} años, {ant.meses} meses y {ant.dias} días. Como la fracción supera los 3
          meses, computa <strong>{r.aniosComputables} años</strong>.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-3 py-2.5 text-left font-medium">Concepto</th>
                <th className="px-3 py-2.5 text-left font-medium">Cómo se calcula</th>
                <th className="px-3 py-2.5 text-right font-medium">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr className="bg-white">
                <td className="px-3 py-2.5 font-medium text-zinc-700">Antigüedad (art. 245)</td>
                <td className="px-3 py-2.5 text-zinc-600">
                  {r.aniosComputables} años × {formatARS(SUELDO_EJEMPLO, 0)}
                </td>
                <td className="px-3 py-2.5 text-right text-zinc-700">
                  {formatARS(r.indemnizacionAntiguedad, 0)}
                </td>
              </tr>
              {r.preaviso && (
                <tr className="bg-white">
                  <td className="px-3 py-2.5 font-medium text-zinc-700">
                    Preaviso ({r.preaviso.meses} {r.preaviso.meses === 1 ? "mes" : "meses"})
                  </td>
                  <td className="px-3 py-2.5 text-zinc-600">
                    {r.preaviso.meses} × {formatARS(SUELDO_EJEMPLO, 0)} + SAC
                  </td>
                  <td className="px-3 py-2.5 text-right text-zinc-700">
                    {formatARS(r.preaviso.monto + r.preaviso.sac, 0)}
                  </td>
                </tr>
              )}
              {r.integracion && (
                <tr className="bg-white">
                  <td className="px-3 py-2.5 font-medium text-zinc-700">
                    Integración del mes (art. 233)
                  </td>
                  <td className="px-3 py-2.5 text-zinc-600">
                    {r.integracion.dias} días hasta fin de mes + SAC
                  </td>
                  <td className="px-3 py-2.5 text-right text-zinc-700">
                    {formatARS(r.integracion.monto + r.integracion.sac, 0)}
                  </td>
                </tr>
              )}
              <tr className="bg-white">
                <td className="px-3 py-2.5 font-medium text-zinc-700">
                  Aguinaldo proporcional (art. 123)
                </td>
                <td className="px-3 py-2.5 text-zinc-600">
                  {r.sacProporcional.dias}/{r.sacProporcional.totalDiasSemestre} días del semestre
                </td>
                <td className="px-3 py-2.5 text-right text-zinc-700">
                  {formatARS(r.sacProporcional.monto, 0)}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-3 py-2.5 font-medium text-zinc-700">
                  Vacaciones proporcionales (art. 156)
                </td>
                <td className="px-3 py-2.5 text-zinc-600">
                  {r.vacaciones.dias.toFixed(1)} días no gozados + SAC
                </td>
                <td className="px-3 py-2.5 text-right text-zinc-700">
                  {formatARS(r.vacaciones.monto + r.vacaciones.sac, 0)}
                </td>
              </tr>
              <tr className="bg-emerald-50 font-bold">
                <td className="px-3 py-2.5 text-emerald-900">Total a cobrar</td>
                <td className="px-3 py-2.5 text-emerald-800" />
                <td className="px-3 py-2.5 text-right text-emerald-900">
                  {formatARS(r.totalGeneral, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Calculado con el mismo motor que la calculadora del sitio. La indemnización por antigüedad
          ({formatARS(r.indemnizacionAntiguedad, 0)}) es la parte exenta de Ganancias; los demás
          conceptos pueden tributar según el caso. Cambiá las fechas y el sueldo por los tuyos en la
          calculadora.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h2 className="text-lg font-bold text-emerald-900">Calculá tu indemnización exacta</h2>
        <p className="text-sm text-emerald-800">
          Poné tu fecha de ingreso, la de despido y tu mejor sueldo. La calculadora arma los cuatro
          conceptos, aplica el tope de convenio con el piso del 67% y te muestra el total:
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/indemnizacion"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Calcular mi indemnización →
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
        <h2 className="text-xl font-bold text-zinc-900">
          Qué cambió con la reforma laboral de 2026
        </h2>
        <p className="text-zinc-600">
          Dos leyes recientes reescribieron el régimen indemnizatorio. Si leíste una guía vieja,
          probablemente tenga datos que ya no corren:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">Ley 27.802 (B.O. 6/3/2026)</p>
            <p className="mt-1.5 text-sm text-zinc-600">
              El piso del tope quedó en la ley: aunque tu convenio tenga tope, la base nunca baja
              del <strong>67% de tu sueldo real</strong>. Antes era solo el fallo «Vizzoti»; ahora
              es el texto del art. 245. También se ajustó el preaviso del art. 231.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">Ley 27.742 (julio 2024)</p>
            <p className="mt-1.5 text-sm text-zinc-600">
              Derogó las multas por empleo no registrado y las indemnizaciones agravadas, incluida
              la <strong>«doble indemnización»</strong>. La indemnización común sigue intacta; las
              multas extra ya no se aplican.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Cuándo NO cobrás la indemnización</h2>
        <ul className="space-y-2 text-zinc-600">
          <li>
            • <strong>Período de prueba</strong>: en los primeros 6 meses (ampliables por convenio)
            cualquiera puede extinguir el contrato sin indemnización y, desde la Ley 27.802, sin
            preaviso. Pero la liquidación final te corresponde igual.
          </li>
          <li>
            • <strong>Renuncia</strong>: no hay indemnización por antigüedad ni preaviso, pero sí
            días trabajados, aguinaldo y vacaciones proporcionales.
          </li>
          <li>
            • <strong>Despido con justa causa</strong>: si la causa es real y grave, no corresponde
            indemnización. Si no lo es, podés reclamarla judicialmente.
          </li>
        </ul>
        <p className="text-sm text-zinc-600">
          ¿Renunciaste o te vas a fin de mes? Mirá cómo se calcula el{" "}
          <Link
            href="/blog/aguinaldo-proporcional-como-se-calcula"
            className="text-emerald-700 underline"
          >
            aguinaldo proporcional
          </Link>{" "}
          que entra en tu liquidación final.
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
        source="blog-indemnizacion-como-se-calcula"
        headline="Avisame cuando cambien los datos laborales"
        subtext="Topes, escalas de convenio y reglas indemnizatorias se actualizan varias veces al año. Cuando cambie algo que afecta tu liquidación, te aviso. Sin spam."
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
              Ley de Contrato de Trabajo 20.744, arts. 231-233 y 245
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley 27.802 — nuevo art. 245 LCT (B.O. 6/3/2026)
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=401266"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley 27.742 (Bases) — derogación de multas laborales
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Esta guía es informativa y orientativa, no asesoramiento legal. El cálculo definitivo
          depende de tu convenio, tu antigüedad exacta y las particularidades de tu caso: ante un
          despido, consultá con un abogado laboralista o tu sindicato antes de firmar nada.
        </p>
      </section>
    </article>
  );
}
