// Landing del Informe de actualización de crédito laboral.
//
// QUIÉN LLEGA ACÁ: un trabajador con una deuda laboral impaga (liquidación final, diferencias,
// indemnización) que quiere saber cuánto vale hoy, o un abogado laboralista que necesita la
// liquidación actualizada para presentar o negociar. Los dos ya usaron la calculadora gratis, que
// resuelve UN rubro. Lo que se vende es lo que la calculadora no hace: todos los rubros con su
// fecha, la tabla de índices para verificar, la carátula y el formato para adjuntar. Sin urgencia
// ni promesas de resultado: es YMYL y el juez fija el criterio.

import type { Metadata } from "next";
import Link from "next/link";
import { BarraCompraMovil } from "@/components/BarraCompraMovil";
import { CompraDialogo } from "@/components/CompraDialogo";
import { InformeCreditoVistaPrevia } from "@/components/informe-credito-laboral/InformeCreditoVistaPrevia";
import { JsonLd } from "@/components/JsonLd";
import { PlanillaComprarBtn } from "@/components/PlanillaComprarBtn";
import { CREDITOS_FUENTES, TASA_PURA_ANUAL, VIGENCIA_ART_276 } from "@/data/actualizacion-creditos";
import { formatARS, formatPct } from "@/lib/formato";
import { ULTIMO_PERIODO, nombrePeriodo } from "@/lib/inflacion";
import { productoPorSlug, type Producto } from "@/lib/mp";
import { PRECIO_INFORME_REFERENCIA, RUTA_LANDING_INFORME, SLUG_INFORME } from "./_modelo";

const IPC_MES = nombrePeriodo(ULTIMO_PERIODO);
const TASA = formatPct(TASA_PURA_ANUAL * 100, 0);
const TITULO = "Informe de crédito laboral actualizado (art. 276 LCT)";
const DESCRIPCION = `Tu liquidación laboral actualizada con IPC más ${TASA} anual, rubro por rubro, con tabla de índices y fuentes oficiales. En A4 para imprimir o PDF. Pago único.`;

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: RUTA_LANDING_INFORME },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: RUTA_LANDING_INFORME,
    images: [
      {
        url: `/og?t=${encodeURIComponent("Informe de crédito laboral")}&s=${encodeURIComponent(
          "Todos los rubros actualizados por ley, con la tabla de índices del INDEC",
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PARA_QUIEN = [
  {
    ojo: "Si te deben plata",
    titulo: "Sabé cuánto vale hoy lo que te deben",
    texto:
      "Liquidación final, diferencias, una indemnización que no llegó. El informe la actualiza como dice la ley y te explica cada paso con palabras simples. Si te ofrecen un arreglo, lo comparás contra un número con fuente, no contra una corazonada.",
  },
  {
    ojo: "Si sos abogado o abogada",
    titulo: "La planilla de liquidación, hecha y verificable",
    texto:
      "Todos los rubros con su fecha de exigibilidad, el coeficiente de cada uno, el interés y la tabla de índices del INDEC para que cualquiera la controle. Le cargás la carátula y la firma, y la usás como base para la demanda, la audiencia o la propuesta.",
  },
];

const CONTENIDO = [
  ["El total al mes del pago", "Capital histórico, actualización por IPC e interés del 3% anual, separados y sumados."],
  ["La liquidación rubro por rubro", "Cada suma desde el mes en que se hizo exigible, con su coeficiente, sus meses y su interés."],
  ["Lo que mueve el número", "El total si el interés se capitalizara, cuánto suma cada mes de demora y la cuota litis si hay pacto."],
  ["La tabla de índices mes a mes", "El IPC del INDEC con el coeficiente de cada mes: para verificar la cuenta o sumar un rubro a mano."],
  ["El método, en palabras simples", "La fórmula, el texto del art. 276 y las tres decisiones de lectura que cambian el resultado."],
  ["Juicios en trámite y fuentes", "El tope y el piso del art. 55 para juicios anteriores a la reforma, y cada fuente oficial con su fecha."],
];

const FAQS = [
  {
    q: "¿Qué diferencia hay con la calculadora gratis?",
    a: "La calculadora actualiza un monto por vez. Una liquidación real tiene varios rubros con fechas distintas (indemnización, preaviso, vacaciones, diferencias de meses anteriores), y el art. 276 manda actualizar cada suma desde que se debe. El informe los toma todos juntos, cada uno con su coeficiente, y suma la tabla de índices, la carátula y la explicación del método en un documento que se puede presentar.",
  },
  {
    q: "¿Lo puedo presentar en un expediente?",
    a: "Es una liquidación de referencia con el método y las fuentes a la vista, pensada para que un abogado la adjunte, la use como base o la revise. No es una pericia ni una liquidación aprobada: el criterio de actualización que se aplica en cada causa lo fija el juez, y el informe lo dice en el propio documento.",
  },
  {
    q: "Mi juicio empezó antes de marzo de 2026, ¿me sirve?",
    a: `Sí, con una aclaración que el informe hace por escrito. Para los juicios en trámite y sin sentencia definitiva al ${VIGENCIA_ART_276}, el art. 55 de la Ley 27.802 fija intereses a la tasa pasiva del BCRA. Tienen un tope (la cuenta de IPC más ${TASA} anual) y un piso del 67% de esa cuenta. El informe muestra los dos valores. No calcula la tasa pasiva, y esa regla se está discutiendo en los tribunales.`,
  },
  {
    q: "¿Qué datos necesito?",
    a: "El monto de cada rubro sin actualizar (lo que valía cuando se empezó a deber) y el mes en que se empezó a deber. Para una indemnización, suele ser el mes del despido. Y el mes del pago, o el mes al que querés liquidar. Si venís de la calculadora, el informe ya arranca con ese crédito.",
  },
  {
    q: "¿Guardan los datos del expediente?",
    a: "No. La carátula, las partes, el número de expediente y los nombres de los rubros se escriben en la página del informe y van directo a la hoja impresa: no salen de tu navegador. Lo único que viaja con el pago, en MercadoPago, son los montos, los meses y el tipo de rubro, para que el informe se arme solo cuando lo abrís.",
  },
  {
    q: "¿Y cuando el INDEC publique un mes nuevo?",
    a: "El enlace de tu informe no vence. Cada vez que lo abrís, se arma con el último IPC publicado: si volvés el mes que viene, ya tiene el índice nuevo. Sirve para actualizar la liquidación antes de cada audiencia o propuesta.",
  },
  {
    q: "¿Cómo se paga y qué pasa si no me sirve?",
    a: "Pagás una sola vez con MercadoPago (tarjeta, débito o dinero en cuenta) y lo abrís al instante; el enlace también te llega por mail. Si no te sirve, respondé ese mail dentro de los 7 días y te devolvemos el dinero, sin preguntas.",
  },
];

function Tilde() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Ojo({ children }: { children: string }) {
  return (
    <p className="inline-flex rounded-full bg-white px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-emerald-800 ring-1 ring-emerald-200/70">
      {children}
    </p>
  );
}

export default function InformeCreditoLanding() {
  const producto: Producto | null = productoPorSlug(SLUG_INFORME);
  const precio = producto?.precio ?? PRECIO_INFORME_REFERENCIA;
  const precioTxt = formatARS(precio, 0);
  const tituloCorto = producto?.tituloCorto ?? "Informe de crédito laboral";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Informe de actualización de crédito laboral (art. 276 LCT, IPC del INDEC + 3% anual)",
    description: DESCRIPCION,
    brand: { "@type": "Brand", name: "CalculAR" },
    offers: {
      "@type": "Offer",
      price: String(precio),
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "CalculAR" },
      url: `https://calcular.ar${RUTA_LANDING_INFORME}`,
      // Producto digital, entrega inmediata y sin costo: Google pide shippingDetails igual.
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "ARS" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "AR" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "AR",
        returnPolicyCountry: "AR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqLd} />
      <CompraDialogo producto={{ slug: SLUG_INFORME, tituloCorto, precio, entrega: "informe" }} />

      <div className="space-y-20 sm:space-y-24">
        {/* ── Hero ── */}
        <section className="pt-2">
          <Ojo>Para el reclamo, la audiencia o el expediente</Ojo>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            La liquidación de lo que te deben, actualizada como dice la ley
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Todos los rubros juntos, cada uno desde el mes en que se hizo exigible, con IPC del INDEC más {TASA} anual. Con
            la tabla de índices para verificarla, la carátula del expediente y el método explicado. En A4, lista para
            imprimir o guardar en PDF.
          </p>

          <div
            data-oferta={SLUG_INFORME}
            className="mt-8 rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 sm:max-w-xl"
          >
            <div className="flex flex-col gap-5 rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:flex-row sm:items-center sm:p-6">
              <div className="shrink-0">
                <p className="text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">{precioTxt}</p>
                <p className="text-sm text-zinc-500">pago único</p>
              </div>
              <div id="compra-hero" className="flex-1">
                <PlanillaComprarBtn producto={SLUG_INFORME} precio={precio} id="cta-hero" etiqueta={`Quiero mi liquidación · ${precioTxt}`} />
                <p className="mt-2 text-center text-xs text-zinc-500">Lo abrís apenas se acredita el pago y te llega por mail.</p>
              </div>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
            <li className="flex items-start gap-1.5">
              <Tilde /> IPC del INDEC hasta {IPC_MES}
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Art. 276 LCT, texto vigente
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Devolución dentro de los 7 días
            </li>
          </ul>
        </section>

        {/* ── Vista previa ── */}
        <section aria-labelledby="vista-previa">
          <div className="mb-6 max-w-2xl">
            <h2 id="vista-previa" className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Esto es lo que te llevás
            </h2>
            <p className="mt-2 text-zinc-600">
              El mismo informe que vas a recibir, calculado hoy con el último índice publicado. Si venís de la calculadora,
              ya tiene tu crédito; después de pagar le sumás los otros rubros.
            </p>
          </div>
          <InformeCreditoVistaPrevia />
        </section>

        {/* ── Para quién ── */}
        <section aria-labelledby="para-quien">
          <h2 id="para-quien" className="max-w-2xl text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Un mismo documento, para los dos lados del escritorio
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PARA_QUIEN.map((p) => (
              <div key={p.ojo} className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5">
                <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{p.ojo}</p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900">{p.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Qué tiene ── */}
        <section aria-labelledby="contenido" className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <div>
            <h2 id="contenido" className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Qué tiene adentro
            </h2>
            <p className="mt-3 text-zinc-600">
              Lo que se pregunta en una audiencia, en el orden en que se pregunta. Cada número, con de dónde sale.
            </p>
          </div>
          <ol className="divide-y divide-zinc-200 border-y border-zinc-200">
            {CONTENIDO.map(([t, d], i) => (
              <li key={t} className="flex gap-4 py-4">
                <span className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-emerald-700">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-semibold text-zinc-900">{t}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-600">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Por qué esta cuenta + qué no es ── */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-emerald-900/[0.05] p-1.5 ring-1 ring-emerald-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Por qué esta cuenta</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Desde el {VIGENCIA_ART_276} la actualización de un crédito laboral la fija la ley, no la tasa de cada fuero:
                el art. 276 de la LCT, con el texto de la Ley 27.802, manda aplicar el IPC Nivel General del INDEC más un{" "}
                {TASA} anual, desde que cada suma es debida hasta el pago. El informe aplica ese texto, con la serie
                oficial, y deja escritas las decisiones de lectura que mueven el número.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-500">
                {CREDITOS_FUENTES.lista.map((f) => (
                  <li key={f.url}>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                      {f.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-amber-900/[0.04] p-1.5 ring-1 ring-amber-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Lo que no es</h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-600">
                <li>
                  <strong className="font-semibold text-zinc-800">No es asesoramiento legal.</strong> Es una referencia de
                  cálculo. Si sos trabajador, antes de aceptar o rechazar una propuesta consultá con un abogado laboralista.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No decide qué criterio se aplica.</strong> Es una norma
                  nueva, con lecturas distintas y una regla especial para juicios ya iniciados. Eso lo resuelve el juez de
                  cada causa.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No calcula cuánto te corresponde.</strong> Actualiza los
                  montos que cargás. Para saber cuánto es la indemnización, está{" "}
                  <Link href="/indemnizacion" className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    la calculadora de despido
                  </Link>
                  .
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Cómo funciona ── */}
        <section aria-labelledby="como">
          <h2 id="como" className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Cómo funciona
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Pagás una vez", `${precioTxt} con MercadoPago: tarjeta, débito o dinero en cuenta.`],
              ["Lo abrís al instante", "Si venís de la calculadora, ya tiene tu crédito. El enlace también te llega por mail y no vence."],
              ["Sumás rubros y lo descargás", "Cargás los otros rubros, la carátula y la firma, y lo guardás en PDF o lo imprimís."],
            ].map(([t, d], i) => (
              <li key={t} className="border-t-2 border-zinc-900 pt-4">
                <p className="text-sm tabular-nums text-zinc-400">Paso {i + 1}</p>
                <p className="mt-1 font-semibold text-zinc-900">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="ca-acordeon group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm">
                <summary className="cursor-pointer font-semibold text-zinc-900 marker:content-none">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Cierre ── */}
        <section data-oferta={SLUG_INFORME} className="rounded-[2rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5">
          <div className="rounded-[calc(2rem-0.375rem)] bg-white px-6 py-10 text-center shadow-[var(--shadow-apoyo)] sm:px-10">
            <p className="text-2xl font-bold tracking-tight text-zinc-900">Tu liquidación, lista para llevar</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              {precioTxt}, pago único. Si no te sirve, te devolvemos el dinero dentro de los 7 días.
            </p>
            <div id="compra-cierre" className="mx-auto mt-6 max-w-xs">
              <PlanillaComprarBtn producto={SLUG_INFORME} precio={precio} id="cta-cierre" etiqueta={`Quiero mi liquidación · ${precioTxt}`} />
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              ¿Solo querés actualizar un monto?{" "}
              <Link
                href="/actualizacion-creditos-laborales"
                className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2"
              >
                La calculadora es gratis
              </Link>
              .
            </p>
          </div>
        </section>
      </div>

      <BarraCompraMovil slug={SLUG_INFORME} tituloCorto={tituloCorto} precio={precio} />
    </>
  );
}
