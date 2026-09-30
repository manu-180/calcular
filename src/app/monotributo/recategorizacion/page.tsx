import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraRecategorizacion } from "@/components/CalculadoraRecategorizacion";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { RECATEGORIZACION, VIGENCIA, ventanaRecategorizacion } from "@/data/monotributo";
import { ORGANIZACION, articleSchema } from "@/lib/schema";
import { PlanillaCTA } from "@/components/PlanillaCTA";

// La ventana se deriva de la fecha (ver data/monotributo.ts). Revalidar cada hora hace que la
// página cambie sola el día 6 de febrero/agosto (y que la cuenta regresiva sea del día correcto),
// sin depender de que haya un deploy.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const v = ventanaRecategorizacion();
  const cuando = `${v.textoMes.replace(" de ", " ")}`; // "agosto 2026"
  return {
    title: `Recategorización del Monotributo ${cuando}: calculadora, fechas y cómo hacerla`,
    description: `La recategorización del monotributo se hace ${v.textoCierre}. Calculá gratis si te toca subir o bajar de categoría, cuánto cambia tu cuota y cómo hacer el trámite en ARCA.`,
    alternates: { canonical: "/monotributo/recategorizacion" },
    openGraph: {
      images: [
        {
          url: `/og?t=${encodeURIComponent(`Recategorización ${cuando}`)}&s=${encodeURIComponent(`¿Subís o bajás de categoría? Calculalo gratis. Trámite ${v.textoCierre}.`)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const faqsFijas = [
  {
    q: "¿Qué es la recategorización de oficio?",
    a: "Si te correspondía subir de categoría y no hiciste el trámite, ARCA puede recategorizarte de oficio usando la información que ya tiene: tu facturación electrónica, las acreditaciones bancarias y de billeteras, los consumos y otros indicadores. Viene con la cuota nueva retroactiva y sanciones, así que siempre conviene adelantarse y hacerlo uno mismo.",
  },
  {
    q: "¿ARCA mira los movimientos de Mercado Pago y las billeteras virtuales?",
    a: "Las billeteras virtuales y los bancos informan a ARCA los movimientos de sus cuentas a través de regímenes de información. Si tus acreditaciones superan con holgura el tope de tu categoría, es una señal que puede derivar en recategorización de oficio o en pedidos de justificación. Ojo: no todo movimiento es facturación — préstamos, transferencias entre cuentas propias o ventas de bienes personales no son ingresos de tu actividad, pero conviene poder justificarlos.",
  },
  {
    q: "¿Qué pasa si no me recategorizo y me correspondía?",
    a: "Si te correspondía subir, te exponés a la recategorización de oficio con retroactivo y sanciones. Si te correspondía bajar y no lo hiciste, no hay multa: simplemente seguís pagando de más todos los meses, hasta la próxima ventana.",
  },
  {
    q: "¿Y si no cambió nada, tengo que hacer el trámite igual?",
    a: "No. Si tu facturación de los últimos 12 meses (y tus parámetros de local, si tenés) siguen dentro de tu categoría actual, no tenés que hacer nada: tu categoría se mantiene sola.",
  },
];

/** Las dos FAQ que dependen de la fecha se arman con la ventana derivada. */
function faqsDeLaVentana(v: ReturnType<typeof ventanaRecategorizacion>) {
  return [
    {
      q: "¿Cuándo es la próxima recategorización del monotributo?",
      a: `La recategorización se hace dos veces por año, en febrero y en agosto, y el trámite se puede realizar hasta el día 5 de esos meses. La próxima es ${v.textoCierre}: se evalúan los últimos 12 meses de actividad (entre ${v.dozeMeses}) y la categoría que declares rige desde el período devengado ${v.rigeDesde} hasta ${v.rigeHasta} inclusive.`,
    },
    {
      q: `¿Puedo recategorizarme después del 5 de ${v.textoMes.split(" de ")[0]}?`,
      a: `No: pasado el día 5 el sistema ya no permite la recategorización de ese semestre y hay que esperar a la ventana siguiente (${v.mes === 8 ? "la de febrero" : "la de agosto"}). Si mientras tanto superaste los topes de tu categoría, conviene regularizarlo cuanto antes para evitar una recategorización de oficio con retroactivo.`,
    },
  ];
}

function pasosDelTramite(v: ReturnType<typeof ventanaRecategorizacion>) {
  return [
    "Sumá tu facturación de los últimos 12 meses (todas las facturas emitidas, sin descontar gastos).",
    "Compará ese total con los topes de cada categoría y fijate también superficie, energía y alquileres si tenés local.",
    "Entrá al Portal Monotributo de ARCA (monotributo.afip.gob.ar) con tu CUIT y clave fiscal.",
    "Elegí la opción “Recategorizarme”, revisá la categoría que el sistema sugiere y confirmá la que te corresponde.",
    `Guardá la constancia: la categoría declarada rige desde el período devengado ${v.rigeDesde}.`,
  ];
}

export default function RecategorizacionPage() {
  const v = ventanaRecategorizacion();
  const faqs = [...faqsDeLaVentana(v), ...faqsFijas];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: `Calculadora de recategorización del monotributo ${v.anio}`,
        url: "https://calcular.ar/monotributo/recategorizacion",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: `Recategorización del monotributo ${v.anio}: cuándo, cómo y si te toca subir o bajar`,
        descripcion: `La recategorización del monotributo se hace ${v.textoCierre}. Cómo saber si te corresponde cambiar de categoría, cuánto cambia la cuota y cómo hacer el trámite en ARCA.`,
        url: "/monotributo/recategorizacion",
        modificado: "2026-08-05",
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
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Recategorización del monotributo {v.anio}: ¿te toca subir o bajar de categoría?
        </h1>
        <p className="text-zinc-600">
          Elegí tu categoría actual, ingresá tu facturación de los últimos 12 meses y descubrí al
          instante <strong>si te corresponde recategorizarte</strong> y{" "}
          <strong>cuánto cambia tu cuota</strong>. Más abajo: fechas, paso a paso del trámite y qué
          pasa si no lo hacés.
        </p>
      </header>

      <RespuestaPrimero actualizado={VIGENCIA.consultadoEl}>
        <p>
          {v.abierta ? (
            <>
              La recategorización del monotributo <strong>está abierta</strong>: el trámite se puede
              hacer <strong>{v.textoCierre}</strong>
              {v.diasParaElCierre === 0
                ? " — hoy es el último día"
                : ` — quedan ${v.diasParaElCierre} ${v.diasParaElCierre === 1 ? "día" : "días"}`}
              .
            </>
          ) : (
            <>
              La recategorización del monotributo se hace{" "}
              <strong>dos veces por año, en febrero y en agosto</strong>, y el trámite se puede
              realizar hasta el día 5 de esos meses. La próxima ventana es{" "}
              <strong>{v.textoCierre}</strong>.
            </>
          )}{" "}
          Se evalúan {RECATEGORIZACION.periodoEvaluado} (entre {v.dozeMeses}).{" "}
          <strong>Te corresponde subir</strong> de categoría si tu facturación o tus parámetros de
          local superaron el tope de tu categoría actual, y <strong>bajar</strong> si quedaron por
          debajo. Si nada cambió de escala, no hacés ningún trámite: tu categoría se mantiene sola.
        </p>
        <p>
          Subir y no declararlo expone a la <strong>recategorización de oficio</strong> con
          retroactivo y multas; bajar y no hacerlo solo significa pagar de más. La categoría que
          declares en esta ventana rige desde el período devengado <strong>{v.rigeDesde}</strong>{" "}
          hasta {v.rigeHasta} inclusive. Calculá gratis cuál te toca con la herramienta de abajo.
        </p>
      </RespuestaPrimero>

      <CalculadoraRecategorizacion />

      <PlanillaCTA producto="planilla-monotributo" desde="monotributo-recategorizacion" />

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="font-semibold text-emerald-900">
          {v.abierta
            ? `Ventana abierta: recategorización de ${v.textoMes}`
            : `Próxima ventana: recategorización de ${v.textoMes}`}
        </h2>
        <p className="mt-1 text-2xl font-bold text-emerald-800">
          Trámite {v.textoCierre}
          {v.abierta && v.diasParaElCierre === 0 ? " — último día" : ""}
        </p>
        <p className="mt-2 text-sm text-emerald-900">
          La recategorización se hace dos veces por año, en febrero y en agosto, y el trámite se
          confirma en el portal de ARCA hasta el día 5 inclusive, evaluando{" "}
          {RECATEGORIZACION.periodoEvaluado}. La categoría declarada rige desde el período devengado{" "}
          {v.rigeDesde} hasta {v.rigeHasta} inclusive.
        </p>
      </section>

      <EmailCapture
        source="recategorizacion"
        headline={`Avisame antes de que cierre la ventana de ${v.textoMes.split(" de ")[0]}`}
        subtext={`Te aviso cuando se acerque el cierre (${v.textoCierre}) y cuando ARCA actualice los topes de las categorías. Sin spam.`}
      />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">¿Tengo que recategorizarme?</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Sí, si tus parámetros cambiaron de escala: corresponde subir de categoría cuando tu
            facturación de los últimos 12 meses (o tu superficie, energía o alquileres) supera el
            tope de tu categoría actual, y corresponde <strong>bajar</strong> cuando quedó por
            debajo. Si nada cambió de escala, no tenés que hacer ningún trámite.
          </p>
          <p>
            La calculadora de arriba compara tu categoría actual con la que te corresponde por
            facturación. Si tenés local, revisá también superficie, energía y alquileres en la{" "}
            <Link href="/monotributo/categorias" className="text-emerald-700 underline">
              tabla completa de categorías 2026
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo hacer el trámite, paso a paso</h2>
        <ol className="space-y-2.5">
          {pasosDelTramite(v).map((p, i) => (
            <li key={i} className="flex gap-3 text-zinc-600">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                {i + 1}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué pasa si no me recategorizo</h2>
        <p className="text-zinc-600">
          Si te correspondía subir de categoría y no lo hiciste, ARCA puede recategorizarte de
          oficio en base a tu facturación electrónica y otros indicadores, con retroactivo y
          sanciones. Si te correspondía bajar y no lo hiciste, simplemente seguís pagando una cuota
          más alta de la necesaria. En los dos casos, hacer el trámite a tiempo te conviene.
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
              href={RECATEGORIZACION.fuenteUrl}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — Ayuda sobre recategorización
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={VIGENCIA.fuenteUrl}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — Categorías y valores vigentes
            </a>{" "}
            (desde el {VIGENCIA.desde})
          </li>
        </ul>
        <p className="text-xs text-zinc-400">Última verificación: {VIGENCIA.consultadoEl}.</p>
      </section>
    </article>
  );
}
