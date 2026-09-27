import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraMonotributo } from "@/components/CalculadoraMonotributo";
import { CATEGORIAS, RECATEGORIZACION, VIGENCIA } from "@/data/monotributo";
import { formatARS } from "@/lib/monotributo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { PlanillaCTA } from "@/components/PlanillaCTA";

// RECATEGORIZACION.proximaVentana se deriva de la fecha (data/monotributo.ts): revalidar cada
// hora evita que la FAQ quede hablando de una ventana ya cerrada entre deploys.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Calculadora de Monotributo 2026: categoría y cuota mensual",
  description:
    "Calculá gratis tu categoría de monotributo y cuánto pagás por mes en 2026. Con los valores oficiales de ARCA vigentes y el detalle de impuesto, jubilación y obra social.",
  alternates: { canonical: "/monotributo" },
};

const faqs = [
  {
    q: "¿Cómo sé qué categoría de monotributo me corresponde?",
    a: `La categoría depende principalmente de tus ingresos brutos de los últimos 12 meses: te corresponde la primera categoría cuyo tope de facturación no superes. Por ejemplo, con los valores vigentes desde el ${VIGENCIA.desde}, si facturaste hasta ${formatARS(CATEGORIAS[0].ingresosBrutosMax, 0)} sos categoría A. También se consideran la superficie del local, la energía eléctrica consumida y los alquileres pagados, si aplican a tu actividad.`,
  },
  {
    q: "¿Cuánto paga un monotributista en 2026?",
    a: `Depende de la categoría y la actividad. Con los valores vigentes, la cuota total va desde ${formatARS(CATEGORIAS[0].totalServicios, 0)} por mes en la categoría A hasta ${formatARS(CATEGORIAS[CATEGORIAS.length - 1].totalServicios, 0)} en la categoría K para servicios. La cuota incluye tres componentes: impuesto integrado, aporte jubilatorio (SIPA) y obra social.`,
  },
  {
    q: "¿Qué incluye la cuota del monotributo?",
    a: "La cuota mensual tiene tres partes: el impuesto integrado (reemplaza a Ganancias e IVA), el aporte jubilatorio al SIPA y el aporte a la obra social. Quienes además trabajan en relación de dependencia solo pagan el impuesto integrado, porque ya aportan jubilación y obra social por su empleo.",
  },
  {
    q: "¿Qué pasa si me paso del límite de facturación?",
    a: `Si tus ingresos de los últimos 12 meses superan el tope de tu categoría, te corresponde recategorizarte a una superior en la próxima ventana (${RECATEGORIZACION.proximaVentana}). Si superás el tope máximo del régimen (${formatARS(CATEGORIAS[CATEGORIAS.length - 1].ingresosBrutosMax, 0)}), quedás excluido del monotributo y pasás al Régimen General como responsable inscripto.`,
  },
  {
    q: "¿Cuándo se paga el monotributo?",
    a: "La cuota vence todos los meses el día 20 (o el día hábil siguiente si cae feriado o fin de semana). Se puede pagar por débito automático, billeteras virtuales, home banking (VEP) o en efectivo con la credencial de pago.",
  },
  {
    q: "¿Cuándo cambian los valores de las categorías?",
    a: `Las escalas se actualizan dos veces por año por inflación (IPC). Los valores actuales rigen desde el ${VIGENCIA.desde} y la próxima actualización está prevista para ${VIGENCIA.proximaActualizacion}.`,
  },
  {
    q: "¿Monotributo o responsable inscripto: qué conviene?",
    a: "Mientras tu facturación entre en las categorías del monotributo, el régimen simplificado casi siempre conviene: una sola cuota fija reemplaza IVA y Ganancias, e incluye jubilación y obra social. El Régimen General puede convenir en casos puntuales (gastos deducibles muy altos o clientes que necesitan discriminar IVA). Ante la duda, consultá con un contador.",
  },
];

export default function MonotributoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Monotributo 2026",
        url: "https://calcular.ar/monotributo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Calculadora de Monotributo 2026: categoría y cuota mensual",
        descripcion:
          "Qué categoría de monotributo te corresponde según tu facturación y cuánto pagás por mes en 2026, con los valores oficiales de ARCA.",
        url: "/monotributo",
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
          Calculadora de Monotributo 2026
        </h1>
        <p className="text-zinc-600">
          Ingresá tu facturación y descubrí al instante <strong>qué categoría te corresponde</strong>{" "}
          y <strong>cuánto vas a pagar por mes</strong>, con el detalle de impuesto, jubilación y
          obra social. Usamos la tabla oficial de ARCA vigente desde el {VIGENCIA.desde}.
        </p>
      </header>

      <RespuestaPrimero>
        <p>
          El monotributo es un régimen simplificado: pagás{" "}
          <strong>una sola cuota mensual fija</strong> que reemplaza IVA y Ganancias e incluye
          jubilación y obra social. Tu <strong>categoría</strong> (de la A a la K) la define tu
          facturación de los últimos 12 meses: te toca la primera cuya escala no superes. Con los
          valores vigentes desde el {VIGENCIA.desde}, la cuota de servicios va desde{" "}
          <strong>{formatARS(CATEGORIAS[0].totalServicios, 0)}</strong> (categoría A) hasta{" "}
          <strong>{formatARS(CATEGORIAS[CATEGORIAS.length - 1].totalServicios, 0)}</strong>{" "}
          (categoría K) por mes. La cuota vence el día 20 y las escalas se actualizan dos veces por
          año.
        </p>
      </RespuestaPrimero>

      <CalculadoraMonotributo />

      <PlanillaCTA producto="planilla-monotributo" desde="monotributo" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Categorías del monotributo 2026: tabla resumida
        </h2>
        <p className="text-sm text-zinc-600">
          Topes de facturación anual y cuota mensual total por categoría (valores vigentes desde el{" "}
          {VIGENCIA.desde}, fuente:{" "}
          <a
            href={VIGENCIA.fuenteUrl}
            rel="nofollow noopener"
            target="_blank"
            className="text-emerald-700 underline"
          >
            ARCA
          </a>
          ).
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Facturación anual hasta</th>
                <th className="px-4 py-3">Cuota servicios</th>
                <th className="px-4 py-3">Cuota venta</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIAS.map((c) => (
                <tr key={c.cat} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-2.5 font-bold text-emerald-700">{c.cat}</td>
                  <td className="px-4 py-2.5">{formatARS(c.ingresosBrutosMax)}</td>
                  <td className="px-4 py-2.5">{formatARS(c.totalServicios)}</td>
                  <td className="px-4 py-2.5">{formatARS(c.totalVenta)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600">
          ¿Querés ver todos los parámetros (superficie, energía, alquileres y el desglose completo
          de cada cuota)? Mirá la{" "}
          <Link href="/monotributo/categorias" className="text-emerald-700 underline">
            tabla completa de categorías 2026
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo funciona el cálculo</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El monotributo es el régimen simplificado para pequeños contribuyentes: una cuota fija
            mensual reemplaza el IVA y el impuesto a las Ganancias, e incluye el aporte jubilatorio
            y la obra social. Tu categoría se define por la primera escala cuyo tope de{" "}
            <strong>ingresos brutos de los últimos 12 meses</strong> no superás.
          </p>
          <p>
            Además de la facturación, ARCA contempla parámetros físicos: superficie afectada a la
            actividad, energía eléctrica consumida y alquileres devengados. Si alguno de esos
            parámetros supera el de tu categoría según facturación, te corresponde la categoría
            mayor. Para la venta de productos también rige un precio unitario máximo de{" "}
            {formatARS(CATEGORIAS[0].precioUnitarioMax)}.
          </p>
          <p>
            Dos veces por año (febrero y agosto) tenés que revisar si seguís en la categoría
            correcta: eso es la{" "}
            <Link href="/monotributo/recategorizacion" className="text-emerald-700 underline">
              recategorización
            </Link>
            . La próxima ventana cierra el 5 de agosto de 2026.
          </p>
          <p>
            ¿Facturaste más de lo que permite tu categoría? Leé{" "}
            <Link
              href="/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo"
              className="text-emerald-700 underline"
            >
              qué pasa si te pasás del límite de facturación
            </Link>{" "}
            — cuándo te recategorizás y cuándo quedás excluido del régimen.
          </p>
        </div>
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

      <p className="text-xs text-zinc-400">
        Última verificación contra la fuente oficial: {VIGENCIA.consultadoEl}. Valores vigentes
        desde el {VIGENCIA.desde}; próxima actualización de escalas prevista para{" "}
        {VIGENCIA.proximaActualizacion}.
      </p>
    </article>
  );
}
