import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraRecategorizacion } from "@/components/CalculadoraRecategorizacion";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { RECATEGORIZACION, VIGENCIA, ventanaRecategorizacion } from "@/data/monotributo";
import { ORGANIZACION, articleSchema } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import { datosOferta } from "@/lib/oferta";

// La ventana se deriva de la fecha (ver data/monotributo.ts). Revalidar cada hora hace que la
// página cambie sola el día 6 de febrero/agosto (y que la cuenta regresiva sea del día correcto),
// sin depender de que haya un deploy.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const v = ventanaRecategorizacion();
  const cuando = `${v.textoMes.replace(" de ", " ")}`; // "agosto 2026"
  return {
    title: `Recategorización del monotributo ${cuando}`,
    description: `Se hace ${v.textoCierre}: calculá si te toca subir o bajar de categoría, cuánto cambia tu cuota y cómo hacer el trámite en ARCA.`,
    alternates: { canonical: "/monotributo/recategorizacion" },
    openGraph: openGraphDe({
      ruta: "/monotributo/recategorizacion",
      titulo: `Recategorización ${cuando}`,
      bajada: `¿Subís o bajás de categoría? Calculalo gratis. Trámite ${v.textoCierre}.`,
    }),
  };
}

const faqsFijas = [
  {
    q: "¿Qué es la recategorización de oficio?",
    a: "Si te tocaba subir de categoría y no hiciste el trámite, ARCA te puede recategorizar por su cuenta con la información que ya tiene: tu facturación electrónica, lo que entra a tus cuentas y billeteras, tus consumos y otros datos. Eso viene con la cuota nueva hacia atrás y con sanciones. Por eso siempre conviene adelantarse y hacerlo vos.",
  },
  {
    q: "¿ARCA mira los movimientos de Mercado Pago y las billeteras virtuales?",
    a: "Sí. Las billeteras virtuales y los bancos le informan a ARCA los movimientos de tus cuentas. Si lo que te entra pasa con holgura el tope de tu categoría, puede terminar en una recategorización de oficio o en un pedido de explicaciones. Ojo: no todo lo que entra es facturación. Un préstamo, una transferencia entre tus propias cuentas o la venta de algo personal no son ingresos de tu actividad, pero conviene poder demostrarlo.",
  },
  {
    q: "¿Qué pasa si no me recategorizo y me correspondía?",
    a: "Si te tocaba subir, te arriesgás a una recategorización de oficio con retroactivo y sanciones. Si te tocaba bajar y no lo hiciste, no hay multa: seguís pagando de más todos los meses hasta la próxima ventana.",
  },
  {
    q: "¿Y si no cambió nada, tengo que hacer el trámite igual?",
    a: "No. Si lo que facturaste en los últimos 12 meses (y los datos de tu local, si tenés) sigue dentro de tu categoría, no tenés que hacer nada. Tu categoría se mantiene sola.",
  },
];

/** Las dos FAQ que dependen de la fecha se arman con la ventana derivada. */
function faqsDeLaVentana(v: ReturnType<typeof ventanaRecategorizacion>) {
  return [
    {
      q: "¿Cuándo es la próxima recategorización del monotributo?",
      a: `Se hace dos veces por año, en febrero y en agosto, y el trámite se puede hacer hasta el día 5 de esos meses. La próxima es ${v.textoCierre}. Se miran los últimos 12 meses de actividad (entre ${v.dozeMeses}), y la categoría que declares rige desde el período ${v.rigeDesde} hasta ${v.rigeHasta} inclusive.`,
    },
    {
      q: `¿Puedo recategorizarme después del 5 de ${v.textoMes.split(" de ")[0]}?`,
      a: `No. Después del día 5 el sistema ya no te deja recategorizarte en ese semestre, y tenés que esperar a la ventana siguiente (${v.mes === 8 ? "la de febrero" : "la de agosto"}). Si mientras tanto pasaste los topes de tu categoría, conviene regularizarlo cuanto antes para evitar una recategorización de oficio con retroactivo.`,
    },
  ];
}

function pasosDelTramite(v: ReturnType<typeof ventanaRecategorizacion>) {
  return [
    "Sumá lo que facturaste en los últimos 12 meses (todas las facturas, sin restar gastos).",
    "Compará ese total con los topes de cada categoría. Si tenés local, mirá también superficie, energía y alquileres.",
    "Entrá al Portal Monotributo de ARCA (monotributo.afip.gob.ar) con tu CUIT y clave fiscal.",
    "Elegí “Recategorizarme”, revisá la categoría que te sugiere el sistema y confirmá la que te toca.",
    `Guardá la constancia: la categoría que declaraste rige desde el período ${v.rigeDesde}.`,
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
        descripcion: `La recategorización del monotributo se hace ${v.textoCierre}. Cómo saber si te toca cambiar de categoría, cuánto cambia la cuota y cómo hacer el trámite en ARCA.`,
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
          Elegí tu categoría actual, poné lo que facturaste en los últimos 12 meses y mirá en el
          momento <strong>si te toca recategorizarte</strong> y{" "}
          <strong>cuánto cambia tu cuota</strong>. Más abajo están las fechas, el trámite paso a paso
          y qué pasa si no lo hacés.
        </p>
      </header>

      <RespuestaPrimero actualizado={VIGENCIA.consultadoEl}>
        <p>
          {v.abierta ? (
            <>
              La recategorización del monotributo <strong>está abierta</strong>. El trámite se puede
              hacer <strong>{v.textoCierre}</strong>
              {v.diasParaElCierre === 0
                ? " (hoy es el último día)"
                : ` (quedan ${v.diasParaElCierre} ${v.diasParaElCierre === 1 ? "día" : "días"})`}
              .
            </>
          ) : (
            <>
              La recategorización del monotributo se hace{" "}
              <strong>dos veces por año, en febrero y en agosto</strong>, y el trámite se puede hacer
              hasta el día 5 de esos meses. La próxima ventana es{" "}
              <strong>{v.textoCierre}</strong>.
            </>
          )}{" "}
          Se miran {RECATEGORIZACION.periodoEvaluado} (entre {v.dozeMeses}).{" "}
          <strong>Te toca subir</strong> si lo que facturaste o los datos de tu local pasaron el tope
          de tu categoría, y <strong>bajar</strong> si quedaron por debajo. Si nada cambió de escala,
          no hacés ningún trámite: tu categoría se mantiene sola.
        </p>
        <p>
          Si te toca subir y no lo declarás, te arriesgás a la{" "}
          <strong>recategorización de oficio</strong> con retroactivo y multas. Si te toca bajar y
          no lo hacés, solo pagás de más. La categoría que declares en esta ventana rige desde el
          período <strong>{v.rigeDesde}</strong> hasta {v.rigeHasta} inclusive. Calculá gratis cuál
          te toca con la herramienta de abajo.
        </p>
      </RespuestaPrimero>

      <CalculadoraRecategorizacion oferta={datosOferta("planilla-monotributo")} />


      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="font-semibold text-emerald-900">
          {v.abierta
            ? `Ventana abierta: recategorización de ${v.textoMes}`
            : `Próxima ventana: recategorización de ${v.textoMes}`}
        </h2>
        <p className="mt-1 text-2xl font-bold text-emerald-800">
          Trámite {v.textoCierre}
          {v.abierta && v.diasParaElCierre === 0 ? " (último día)" : ""}
        </p>
        <p className="mt-2 text-sm text-emerald-900">
          Se hace dos veces por año, en febrero y en agosto. Se confirma en el portal de ARCA hasta
          el día 5 inclusive y se miran {RECATEGORIZACION.periodoEvaluado}. La categoría que
          declares rige desde el período {v.rigeDesde} hasta {v.rigeHasta} inclusive.
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
            Sí, si cambiaste de escala. Te toca subir cuando lo que facturaste en los últimos 12
            meses (o la superficie, la energía o el alquiler) pasa el tope de tu categoría. Te toca{" "}
            <strong>bajar</strong> cuando quedó por debajo. Si nada cambió de escala, no tenés que
            hacer nada.
          </p>
          <p>
            La calculadora compara tu categoría actual con la que te toca por facturación. Si tenés
            local, revisá también superficie, energía y alquileres en la{" "}
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
          Si te tocaba subir y no lo hiciste, ARCA te puede recategorizar de oficio con lo que ve en
          tu facturación electrónica y otros datos, con retroactivo y sanciones. Si te tocaba bajar
          y no lo hiciste, seguís pagando una cuota más alta de la necesaria. En los dos casos te
          conviene hacer el trámite a tiempo. Si ya te pasaste del tope, leé{" "}
          <Link
            href="/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo"
            className="text-emerald-700 underline"
          >
            qué pasa si te pasás del límite de facturación del monotributo
          </Link>
          .
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
              ARCA: ayuda sobre recategorización
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
              ARCA: categorías y valores vigentes
            </a>{" "}
            (desde el {VIGENCIA.desde})
          </li>
        </ul>
        <p className="text-xs text-zinc-400">Última verificación: {VIGENCIA.consultadoEl}.</p>
      </section>
    </article>
  );
}
