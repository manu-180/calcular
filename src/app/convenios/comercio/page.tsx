import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraComercio } from "@/components/CalculadoraComercio";
import { datosOferta } from "@/lib/oferta";
import { JsonLd } from "@/components/JsonLd";
import {
  CATEGORIAS_COMERCIO,
  COMERCIO_FUENTES,
  COMERCIO_HOMOLOGACION,
  COMERCIO_INCORPORACION,
  MESES_COMERCIO,
} from "@/data/convenios/comercio";
import { formatARS } from "@/lib/formato";
import { datasetSchema, ORGANIZACION } from "@/lib/schema";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { calcularComercio } from "@/lib/convenios";
import { periodoDeMes, vigenteEn } from "@/lib/hoy";

export const metadata: Metadata = {
  title: "Sueldo de Empleados de Comercio 2026: calculadora y escala CCT 130/75",
  description:
    "Cuánto cobra un empleado de comercio en 2026: calculadora por categoría con antigüedad, presentismo y jornada parcial + la escala oficial de FAECYS de abril a diciembre, con el acuerdo del 22/7/2026 (+5,7% y bono de $50.000) ya cargado.",
  alternates: { canonical: "/convenios/comercio" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Empleados de Comercio 2026")}&s=${encodeURIComponent("Calculadora + escala oficial CCT 130/75")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Ejemplo de referencia de las FAQ, computado desde la escala (regla 2-2: cero números a
// mano — al rotar la escala, las respuestas se actualizan solas). El mes es el que se liquida
// hoy (src/lib/hoy.ts), no uno fijo: la página no se queda anclada en un mes viejo.
const AGOSTO = vigenteEn(MESES_COMERCIO, periodoDeMes);
const MES_TXT = AGOSTO.etiqueta.toLowerCase();
const AGOSTO_VENDEDOR_B = calcularComercio({
  mesId: AGOSTO.id,
  categoriaId: "vendedor-b",
  aniosAntiguedad: 0,
  jornadaFactor: 1,
  conPresentismo: true,
})!;
const AGOSTO_MIN = Math.min(...Object.values(AGOSTO.basicos));
const AGOSTO_MAX = Math.max(...Object.values(AGOSTO.basicos));
const $ = (n: number) => formatARS(n, 0);

const faqs = [
  {
    q: `¿Cuánto cobra un empleado de comercio en ${MES_TXT}?`,
    a: `Para la categoría más común en locales (Vendedor B), jornada completa y sin antigüedad: ${$(AGOSTO.basicos["vendedor-b"])} de básico + ${$(AGOSTO.noRemunerativo)} no remunerativos${AGOSTO.asignacionExtraordinaria ? ` + ${$(AGOSTO.asignacionExtraordinaria)} de asignación extraordinaria por única vez` : ""} = ${$(AGOSTO.basicos["vendedor-b"] + AGOSTO.noRemunerativo + (AGOSTO.asignacionExtraordinaria ?? 0))} brutos; con presentismo sube a ${$(AGOSTO_VENDEDOR_B.bruto)}, y en mano quedan aproximadamente ${$(AGOSTO_VENDEDOR_B.neto)} (antes de cuota sindical y Ganancias). Las demás categorías van de ${$(AGOSTO_MIN)} (Maestranza A) a ${$(AGOSTO_MAX)} (Vendedor D / Administrativo F) de básico, siempre más los ${$(AGOSTO.noRemunerativo)}.`,
  },
  {
    q: "¿El bono de comercio es de $20.000, de $50.000 o de $120.000?",
    a: "Las tres cifras existen y por eso hay tanta confusión. Los $120.000 son la suma no remunerativa que cobrás TODOS los meses: $100.000 prorrogados de los acuerdos de 2025 ($40.000 + $60.000) más los $20.000 nuevos que creó el acuerdo del 26/3/2026. Los $50.000 son otra cosa: el bono del acuerdo del 22/7/2026, una asignación extraordinaria por única vez que se paga en dos cuotas de $25.000, en julio y en agosto de 2026, y que no suma antigüedad ni presentismo. Los $120.000 no se incorporaron al básico en julio como estaba previsto: el acuerdo nuevo corrió esa absorción a diciembre de 2026 - mayo de 2027.",
  },
  {
    q: "¿Qué aumento tiene comercio en 2026?",
    a: "Hubo dos acuerdos. El del 26/3/2026 dio un 5% en tres tramos no acumulativos (+2% abril, +1,5% mayo, +1,5% junio) sobre los básicos de marzo más las sumas no remunerativas. El del 22/7/2026 dio un 5,7% trimestral, también en tramos no acumulativos y calculado sobre el total de junio (básico + $120.000): +1,9% en julio, +3,8% en agosto y +5,7% en septiembre, escala que se mantiene hasta noviembre. Se suma el bono de $50.000 en dos cuotas (julio y agosto).",
  },
  {
    q: "¿Cómo se calcula la antigüedad en comercio?",
    a: "Es el 1% del sueldo por cada año trabajado en la empresa (art. 24 del CCT 130/75) y, por instrucción expresa de la circular de FAECYS, se aplica tanto sobre el básico como sobre las sumas no remunerativas. Con 10 años de antigüedad, por ejemplo, sumás un 10%.",
  },
  {
    q: "¿Qué es el presentismo y cuándo se pierde?",
    a: "Es la «asignación por asistencia y puntualidad» del art. 40 del CCT: una doceava parte (8,33%) de la remuneración del mes, incluida la antigüedad y las sumas no remunerativas. Se pierde si tenés más de una ausencia injustificada en el mes; las faltas por enfermedad, accidente, vacaciones o licencias legales no computan.",
  },
  {
    q: "¿Cuánto cobro si trabajo 6 horas o media jornada?",
    a: "Proporcional a la jornada: con 6 horas cobrás el 75% del básico y de las sumas no remunerativas ($90.000 en vez de $120.000), y con 4 horas el 50% ($60.000). La jornada completa del sector es de 8 horas. La proporción surge de la LCT y de la cláusula cuarta del acuerdo 2026.",
  },
  {
    q: "¿Cuándo se incorporan al básico los $120.000 no remunerativos?",
    a: "De a poco, entre diciembre de 2026 y mayo de 2027. El acuerdo de marzo preveía absorberlos de golpe en julio, pero el acuerdo del 22/7/2026 cambió el cronograma: los $120.000 siguen no remunerativos hasta noviembre y desde diciembre pasan al básico a razón de $20.000 por mes ($100.000 en diciembre, $80.000 en enero, y así hasta $0 en mayo de 2027). El total que cobrás no cambia por eso: cambia cuánto de ese total es remunerativo, lo que sube tus aportes pero también tu jubilación, tu indemnización y tus vacaciones.",
  },
  {
    q: "¿Cuándo es la próxima paritaria de comercio?",
    a: "El acuerdo del 22/7/2026 cubre hasta septiembre de 2026 en aumentos (la escala rige hasta noviembre), así que la próxima negociación de porcentajes se espera para el último trimestre de 2026. Actualizamos esta página apenas FAECYS publique la circular oficial — nunca antes, y nunca desde versiones que circulan en medios.",
  },
  {
    q: "¿Me pueden pagar menos que la escala?",
    a: "No: la escala del convenio es un piso obligatorio para todos los empleadores de la actividad, estés o no afiliado al sindicato. Sí pueden pagarte más. Si te pagan por debajo, podés reclamar las diferencias salariales (prescriben a los 2 años, art. 256 LCT).",
  },
  {
    q: "¿Cuánto queda en mano del sueldo de comercio?",
    a: "Del sueldo remunerativo se descuentan los aportes de ley: 11% jubilación + 3% PAMI + 3% obra social = 17%. Las sumas no remunerativas solo descuentan el 3% de obra social (OSECAC) — por eso «rinden» más en mano. Aparte pueden descontarte la cuota sindical (2% si estás afiliado) y, en sueldos altos, Ganancias.",
  },
  {
    q: "¿Las sumas no remunerativas cuentan para el aguinaldo?",
    a: "Sí: el acuerdo 2026 establece expresamente que los importes no remunerativos se computan para el aguinaldo (SAC), las vacaciones, las horas extra, el presentismo, la antigüedad y las indemnizaciones por despido. Tu mejor sueldo del semestre, a los efectos del aguinaldo, incluye los $120.000.",
  },
  {
    q: "¿Qué categoría me corresponde?",
    a: "El CCT 130/75 agrupa al personal en Maestranza y servicios (limpieza, mantenimiento), Administrativos (A a F según complejidad), Cajeros (A a C), Personal auxiliar (depósito, reparto), Auxiliares especializados y Vendedores (A a D). La categoría figura en tu recibo de sueldo; si hacés tareas de una categoría superior, corresponde que te paguen como tal.",
  },
];

export default function ComercioPage() {
  // Mes destacado = el que se liquida hoy.
  const destacado = AGOSTO;
  const vendedorB = AGOSTO_VENDEDOR_B;
  const vendedorBSinPresentismo =
    destacado.basicos["vendedor-b"] +
    destacado.noRemunerativo +
    (destacado.asignacionExtraordinaria ?? 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      datasetSchema({
        nombre: "Escala salarial Empleados de Comercio 2026 (CCT 130/75)",
        descripcion:
          "Básicos por categoría del CCT 130/75 (FAECYS), de abril a diciembre de 2026, con las sumas no remunerativas, la asignación extraordinaria del acuerdo 07/2026 y los adicionales, verificados contra la circular oficial.",
        url: "/convenios/comercio",
        modificado: "2026-07-30",
      }),
      {
        "@type": "WebApplication",
        name: "Calculadora de sueldo de Empleados de Comercio 2026",
        url: "https://calcular.ar/convenios/comercio",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
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
        <p className="text-sm font-medium text-emerald-700">
          <Link href="/convenios" className="hover:underline">
            Convenios
          </Link>{" "}
          · Empleados de Comercio
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldo de Empleados de Comercio 2026 (CCT 130/75)
        </h1>
        <p className="text-zinc-600">
          Elegí tu categoría y descubrí al instante <strong>tu sueldo de convenio</strong> con
          antigüedad, presentismo y jornada parcial, según la{" "}
          <strong>escala oficial de FAECYS</strong> — incluidos los $120.000 no remunerativos
          que tanta confusión generan. Verificado contra la circular, no contra blogs.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={COMERCIO_FUENTES.consultadoEl}
        fuente={COMERCIO_FUENTES.escalas}
        norma={`CCT 130/75 · ${COMERCIO_HOMOLOGACION}`}
      />

      <RespuestaPrimero actualizado={COMERCIO_FUENTES.consultadoEl}>
        <p>
          El sueldo de un Empleado de Comercio (CCT 130/75) se arma con el{" "}
          <strong>básico de la categoría</strong> + los{" "}
          <strong>{formatARS(destacado.noRemunerativo, 0)} no remunerativos</strong> + la{" "}
          <strong>antigüedad</strong> (1% por año) + el <strong>presentismo</strong> (8,33%)
          {destacado.asignacionExtraordinaria ? (
            <>
              , y este mes se suma la{" "}
              <strong>
                asignación extraordinaria de {formatARS(destacado.asignacionExtraordinaria, 0)}
              </strong>{" "}
              por única vez
            </>
          ) : null}
          . Para Vendedor B —la categoría más común en locales— en {MES_TXT}, jornada completa
          y sin antigüedad:{" "}
          <strong>{formatARS(vendedorBSinPresentismo, 0)} brutos</strong> (
          {formatARS(vendedorB.bruto, 0)} con presentismo) y{" "}
          <strong>≈ {formatARS(vendedorB.neto, 0)} en mano</strong>. La escala de FAECYS es un
          piso obligatorio para toda la actividad, estés o no afiliado al sindicato.
        </p>
      </RespuestaPrimero>

      {/* La oferta de la planilla vive adentro de la calculadora, debajo del resultado: el
          momento de máxima intención es cuando la persona acaba de ver su número. */}
      <CalculadoraComercio oferta={datosOferta("planilla-comercio")} />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Escala salarial de {MES_TXT}, completa
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Básicos de convenio de <strong>jornada completa</strong> publicados por FAECYS en la
            circular del acuerdo 07/2026. A todas las categorías se les suman los{" "}
            <strong>{formatARS(destacado.noRemunerativo, 0)} no remunerativos</strong> del mes
            (hasta noviembre: $100.000 prorrogados de 2025 + $20.000 del acuerdo de marzo) y,
            solo en julio y agosto de 2026, la{" "}
            <strong>asignación extraordinaria de $25.000</strong> por única vez, que no figura
            en esta tabla porque no suma antigüedad ni presentismo:
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Básico {MES_TXT.split(" ")[0]}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">+ No remunerativo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORIAS_COMERCIO.map((cat) => (
                  <tr key={cat.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">{cat.nombre}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {formatARS(destacado.basicos[cat.id], 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {formatARS(destacado.noRemunerativo, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(destacado.basicos[cat.id] + destacado.noRemunerativo, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          La escala de cada mes, con lo que cambió:{" "}
          {MESES_COMERCIO.map((m, i) => (
            <span key={m.id}>
              {i > 0 && " · "}
              <Link
                href={`/convenios/comercio/${m.id}`}
                className="font-medium text-emerald-700 hover:underline"
              >
                {m.etiqueta.toLowerCase()}
              </Link>
            </span>
          ))}
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se compone el sueldo</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Tu sueldo de convenio se arma con el <strong>básico de tu categoría</strong> + las{" "}
            <strong>sumas no remunerativas</strong> del mes + la{" "}
            <strong>antigüedad</strong> (1% por año trabajado, sobre las cifras remunerativas
            y no remunerativas) + el <strong>presentismo</strong> (8,33% de la remuneración del
            mes, si no tuviste más de una ausencia injustificada).
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Sueldo bruto = (básico + $120.000) × (1 + 1% × años de antigüedad) × (1 + 8,33% si
            cobrás presentismo), proporcional a tu jornada. En julio y agosto de 2026 se suma
            aparte la asignación extraordinaria de $25.000, que va sola: no la multiplica ni la
            antigüedad ni el presentismo.
          </p>
          <p>
            El acuerdo del 26 de marzo de 2026 ({COMERCIO_HOMOLOGACION}) dispuso un{" "}
            <strong>5% en tres tramos</strong> sobre los básicos de marzo (+2% abril, +1,5%
            mayo, +1,5% junio). El <strong>acuerdo del 22 de julio de 2026</strong> (FAECYS +
            CAC + CAME + UDECA) fijó el tramo siguiente: un <strong>5,7% trimestral</strong>{" "}
            sobre el total de junio, otra vez en tramos no acumulativos (+1,9% julio, +3,8%
            agosto, +5,7% septiembre, escala que rige hasta noviembre), más un{" "}
            <strong>bono de $50.000</strong> en dos cuotas de $25.000 (julio y agosto). Ese
            mismo acuerdo corrió la incorporación de los $120.000 al básico: en vez de
            absorberse de golpe en julio, pasan de a $20.000 por mes entre diciembre de 2026 y
            mayo de 2027.
          </p>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <caption className="border-b border-zinc-200 px-4 py-2.5 text-left text-xs font-semibold text-zinc-700">
                Cronograma de incorporación al básico (el total del mes no cambia)
              </caption>
              <tbody className="divide-y divide-zinc-100">
                {COMERCIO_INCORPORACION.map((tramo) => (
                  <tr key={tramo.etiqueta}>
                    <td className="px-4 py-2 text-zinc-700">{tramo.etiqueta}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900">
                      {formatARS(tramo.noRemunerativo, 0)} no remunerativos
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
          {[COMERCIO_FUENTES.escalas, COMERCIO_FUENTES.acuerdo, COMERCIO_FUENTES.cct].map(
            (f) => (
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
            )
          )}
        </ul>
        <p className="text-xs text-zinc-400">
          Este año el{" "}
          <Link href="/dia-del-empleado-de-comercio" className="text-emerald-700 underline">
            Día del Empleado de Comercio se trasladó al lunes 28 de septiembre
          </Link>{" "}
          y se paga como feriado.
        </p>
        <p className="text-xs text-zinc-400">
          Última verificación: {COMERCIO_FUENTES.consultadoEl}. Con tu sueldo de convenio,
          calculá tu{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>{" "}
          (los $120.000 computan —{" "}
          <Link
            href="/blog/como-calcular-aguinaldo-empleado-de-comercio"
            className="text-emerald-700 underline"
          >
            mirá el paso a paso
          </Link>
          ), tus{" "}
          <Link href="/vacaciones" className="text-emerald-700 underline">
            vacaciones
          </Link>{" "}
          o tu{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            indemnización por despido
          </Link>
          . ¿Tu paritaria le gana al IPC? Miralo en la{" "}
          <Link href="/inflacion" className="text-emerald-700 underline">
            calculadora de inflación
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
