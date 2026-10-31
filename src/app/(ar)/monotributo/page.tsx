import type { Metadata } from "next";
import { hreflangHeadAR } from "@/lib/hreflang-ar";
import Link from "next/link";
import { CalculadoraMonotributo } from "@/components/CalculadoraMonotributo";
import { CATEGORIAS, RECATEGORIZACION, VIGENCIA } from "@/data/monotributo";
import { formatARS } from "@/lib/monotributo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { datosOferta } from "@/lib/oferta";
import { OtrosPaises } from "@/components/OtrosPaises";

// RECATEGORIZACION.proximaVentana se deriva de la fecha (data/monotributo.ts): revalidar cada
// hora evita que la FAQ quede hablando de una ventana ya cerrada entre deploys.
export const revalidate = 86400;

// Función y no constante: el clúster hreflang se evalúa con la fecha del día (check_mes_en_render).
export function generateMetadata(): Metadata {
  return {
    title: "Calculadora de monotributo 2026: categoría y cuota",
    description:
      "Calculá tu categoría de monotributo y cuánto pagás por mes en 2026, con los valores oficiales de ARCA y el desglose de impuesto, jubilación y obra social.",
    alternates: { canonical: "/monotributo", languages: hreflangHeadAR("/monotributo") },
  };
}

const faqs = [
  {
    q: "¿Cómo sé qué categoría de monotributo me corresponde?",
    a: `Sobre todo, por lo que facturaste en los últimos 12 meses. Te toca la primera categoría cuyo tope no pasaste. Por ejemplo, con los valores vigentes desde el ${VIGENCIA.desde}, si facturaste hasta ${formatARS(CATEGORIAS[0].ingresosBrutosMax, 0)} sos categoría A. Si tu actividad lo requiere, también cuentan la superficie del local, la luz que consumís y el alquiler que pagás.`,
  },
  {
    q: "¿Cuánto paga un monotributista en 2026?",
    a: `Depende de la categoría y de la actividad. Con los valores vigentes, la cuota total va de ${formatARS(CATEGORIAS[0].totalServicios, 0)} por mes en la categoría A a ${formatARS(CATEGORIAS[CATEGORIAS.length - 1].totalServicios, 0)} en la categoría K de servicios. La cuota tiene tres partes: el impuesto integrado, el aporte jubilatorio (SIPA) y la obra social.`,
  },
  {
    q: "¿Qué incluye la cuota del monotributo?",
    a: "Tres partes: el impuesto integrado (reemplaza a Ganancias y al IVA), el aporte jubilatorio al SIPA y el aporte a la obra social. Si además trabajás en relación de dependencia, pagás solo el impuesto integrado, porque la jubilación y la obra social ya las aportás por tu empleo.",
  },
  {
    q: "¿Qué pasa si me paso del límite de facturación?",
    a: `Si lo que facturaste en los últimos 12 meses pasa el tope de tu categoría, tenés que subir de categoría en la próxima recategorización (${RECATEGORIZACION.proximaVentana}). Si pasás el tope máximo del régimen (${formatARS(CATEGORIAS[CATEGORIAS.length - 1].ingresosBrutosMax, 0)}), quedás afuera del monotributo y pasás al Régimen General como responsable inscripto.`,
  },
  {
    q: "¿Cuándo se paga el monotributo?",
    a: "Vence todos los meses el día 20 (o el día hábil siguiente si cae feriado o fin de semana). Lo podés pagar por débito automático, billetera virtual, home banking (VEP) o en efectivo con la credencial de pago.",
  },
  {
    q: "¿Cuándo cambian los valores de las categorías?",
    a: `Las escalas se actualizan dos veces por año según la inflación (IPC). Los valores de ahora rigen desde el ${VIGENCIA.desde} y la próxima actualización está prevista para ${VIGENCIA.proximaActualizacion}.`,
  },
  {
    q: "¿Monotributo o responsable inscripto: qué conviene?",
    a: "Si tu facturación entra en el monotributo, casi siempre conviene. Pagás una sola cuota fija que reemplaza IVA y Ganancias, y que ya incluye jubilación y obra social. El Régimen General puede convenir en casos puntuales: si tenés muchos gastos para deducir o clientes que necesitan factura con IVA discriminado. Si dudás, consultá con un contador.",
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
        titulo: "Calculadora de monotributo 2026: categoría y cuota",
        descripcion:
          "Qué categoría de monotributo te toca según lo que facturás y cuánto pagás por mes en 2026, con los valores oficiales de ARCA.",
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
          Poné lo que facturás y mirá en el momento <strong>qué categoría te toca</strong> y{" "}
          <strong>cuánto vas a pagar por mes</strong>, separado en impuesto, jubilación y obra
          social. Usamos la tabla oficial de ARCA vigente desde el {VIGENCIA.desde}.
        </p>
      </header>

      <RespuestaPrimero>
        <p>
          En el monotributo pagás <strong>una sola cuota fija por mes</strong>. Reemplaza al IVA y a
          Ganancias, y ya incluye jubilación y obra social. Tu <strong>categoría</strong> (de la A a
          la K) sale de lo que facturaste en los últimos 12 meses: te toca la primera cuyo tope no
          pasaste. Con los valores vigentes desde el {VIGENCIA.desde}, la cuota de servicios va de{" "}
          <strong>{formatARS(CATEGORIAS[0].totalServicios, 0)}</strong> (categoría A) a{" "}
          <strong>{formatARS(CATEGORIAS[CATEGORIAS.length - 1].totalServicios, 0)}</strong>{" "}
          (categoría K) por mes. Vence el día 20, y las escalas se actualizan dos veces por año.
        </p>
      </RespuestaPrimero>

      <CalculadoraMonotributo oferta={datosOferta("planilla-monotributo")} />


      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Categorías del monotributo 2026: tabla resumida
        </h2>
        <p className="text-sm text-zinc-600">
          Tope de facturación anual y cuota mensual total de cada categoría (valores vigentes desde
          el {VIGENCIA.desde}, fuente:{" "}
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
          Si querés ver todo (superficie, energía, alquileres y el desglose de cada cuota), mirá la{" "}
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
            El monotributo es el régimen simplificado para pequeños contribuyentes. Pagás una cuota
            fija por mes que reemplaza al IVA y a Ganancias, y que incluye jubilación y obra social.
            Tu categoría es la primera cuyo tope de{" "}
            <strong>facturación de los últimos 12 meses</strong> no pasás.
          </p>
          <p>
            Además de la facturación, ARCA mira otras tres cosas: los metros del local, la luz que
            consumís y el alquiler que pagás. Si alguna supera el límite de la categoría que te da la
            facturación, te toca la categoría más alta. Si vendés productos, además hay un precio
            máximo por unidad de {formatARS(CATEGORIAS[0].precioUnitarioMax)}.
          </p>
          <p>
            Dos veces por año (febrero y agosto) tenés que revisar si seguís en la categoría
            correcta. Eso es la{" "}
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
            </Link>
            : cuándo subís de categoría y cuándo quedás afuera del régimen.
          </p>
          <p>
            Y si te preguntás desde cuándo te atiende la obra social después de inscribirte, está
            explicado en{" "}
            <Link href="/obra-social-monotributo" className="text-emerald-700 underline">
              obra social del monotributo
            </Link>
            .
          </p>
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

      <p className="text-xs text-zinc-400">
        Última verificación contra la fuente oficial: {VIGENCIA.consultadoEl}. Valores vigentes
        desde el {VIGENCIA.desde}. La próxima actualización de las escalas está prevista para{" "}
        {VIGENCIA.proximaActualizacion}.
      </p>
      <OtrosPaises concepto="regimen-simplificado" />
    </article>
  );
}
