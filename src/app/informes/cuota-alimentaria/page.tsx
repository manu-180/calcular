// Landing del Informe de cuota alimentaria.
//
// QUIÉN LLEGA ACÁ: alguien en medio de una separación, con una mediación o una consulta por
// delante, que ya usó la calculadora gratis. No necesita que lo apuren: necesita confiar. Por eso
// la página no tiene urgencia, contadores ni promesas de resultado. Responde, en orden:
//   1. ¿Qué me llevo? → el informe real, renderizado con el mismo componente que se entrega.
//   2. ¿Para qué me sirve? → mediación, abogado, conversación entre los dos.
//   3. ¿Es confiable? → INDEC con mes y link, y el dato oficial de que los juzgados usan la canasta.
//   4. ¿Qué NO es? → dicho de frente, antes de cobrar (tema YMYL).
//   5. ¿Y si no me sirve? → devolución de 7 días.

import type { Metadata } from "next";
import Link from "next/link";
import { BarraCompraMovil } from "@/components/BarraCompraMovil";
import { CompraDialogo } from "@/components/CompraDialogo";
import { InformeCuotaVistaPrevia } from "@/components/InformeCuotaVistaPrevia";
import { JsonLd } from "@/components/JsonLd";
import { PlanillaComprarBtn } from "@/components/PlanillaComprarBtn";
import { CANASTA_CRIANZA_FUENTE, CANASTA_CRIANZA_ULTIMO } from "@/data/canasta-crianza";
import { formatARS } from "@/lib/formato";
import { productoPorSlug, type Producto } from "@/lib/mp";
import { PRECIO_INFORME_REFERENCIA, RUTA_LANDING_INFORME, SLUG_INFORME } from "./_modelo";

const U = CANASTA_CRIANZA_ULTIMO;
const TITULO = "Informe de cuota alimentaria para la mediación";
const DESCRIPCION = `Un informe para imprimir o guardar en PDF: cuánto cuesta criar a tus hijos según la canasta de crianza del INDEC (${U.etiqueta}), cómo se reparte entre los dos progenitores y cómo se actualiza. Pago único.`;

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
        url: `/og?t=${encodeURIComponent("Informe de cuota alimentaria")}&s=${encodeURIComponent(
          "La cuenta hecha con el dato del INDEC, lista para llevar a la mediación",
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PARA_QUE = [
  {
    titulo: "En la mediación",
    texto:
      "Llegás con un número que tiene fuente y fecha, no con una opinión. Es más fácil sostenerlo, y más difícil descartarlo.",
  },
  {
    titulo: "Con tu abogado",
    texto:
      "La primera consulta rinde más si la cuenta ya está hecha y explicada. Tu abogado parte de ahí y suma lo que la tabla no ve.",
  },
  {
    titulo: "Entre ustedes dos",
    texto:
      "Un papel neutral, con datos que no son de ninguno de los dos, ayuda a hablar de cuánto y no de quién tiene razón.",
  },
];

const CONTENIDO = [
  ["La cifra de referencia", "La cuota que surge del cálculo, y qué parte del ingreso de quien paga representa."],
  ["El costo de crianza, hijo por hijo", "Bienes y servicios por un lado y cuidado por otro, según la edad de cada uno."],
  ["El reparto entre los dos", "Cuánto le toca a cada progenitor según lo que gana, y el valor del cuidado del día a día."],
  ["Cómo se actualiza", "Cómo se movió el mismo caso en los últimos meses y la cuenta para mantener la cuota al día."],
  ["Qué llevar a la mediación", "Los gastos que ninguna tabla mide y conviene tener a mano, en una lista para tildar."],
  ["Glosario y fuentes", "Las palabras que vas a escuchar, explicadas, y cada fuente oficial con su fecha."],
];

const FAQS = [
  {
    q: "¿El informe tiene validez legal?",
    a: "No es un documento oficial ni una pericia: es una referencia de cálculo con fuentes oficiales, que podés mostrar y dejar sobre la mesa. El monto de la cuota lo acuerdan los progenitores y, si no hay acuerdo, lo decide un juez. Lo que el informe hace es que llegues a esa instancia con la cuenta hecha y explicada.",
  },
  {
    q: "¿Qué datos necesito para armarlo?",
    a: "La edad de cada hijo y el ingreso neto mensual de quien paga la cuota. Si sabés cuánto gana el otro progenitor, mejor: con los dos ingresos el costo se reparte según la capacidad de cada uno. Si venís de la calculadora, el informe ya sale con esos números.",
  },
  {
    q: "¿Puedo cambiar algo después de pagar?",
    a: "Sí. En la página del informe podés sumar los nombres, cambiar edades o ajustar montos, y se recalcula al instante. Lo descargás en PDF o lo imprimís las veces que quieras.",
  },
  {
    q: "¿Guardan mis datos?",
    a: "Los nombres no salen de tu navegador: se escriben en la página y van directo a la hoja impresa. Las edades y los ingresos viajan con el pago, en MercadoPago, sólo para que el informe se arme solo cuando lo abrís. No los cargamos en ninguna otra base.",
  },
  {
    q: "Mi hijo tiene más de 12 años, ¿me sirve?",
    a: "La canasta de crianza del INDEC llega hasta los 12 años inclusive, y no inventamos números para edades que nadie midió. Si tenés hijos más chicos, el informe los calcula y marca a los mayores aparte. Si todos tienen 13 o más, hoy no hay dato oficial para hacer la cuenta y te recomendamos no comprarlo.",
  },
  {
    q: "¿Y si el INDEC publica un mes nuevo?",
    a: "El enlace de tu informe no vence. Cada vez que lo abrís, se arma con el último mes publicado por el INDEC: si volvés el mes que viene, ya tiene el dato nuevo.",
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

export default function InformeCuotaLanding() {
  const producto: Producto | null = productoPorSlug(SLUG_INFORME);
  const precio = producto?.precio ?? PRECIO_INFORME_REFERENCIA;
  const precioTxt = formatARS(precio, 0);
  const tituloCorto = producto?.tituloCorto ?? "Informe de cuota alimentaria";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Informe de cuota alimentaria — referencia con la canasta de crianza del INDEC",
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
          <Ojo>Para la mediación o la consulta con tu abogado</Ojo>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            Llevá la cuenta de la cuota hecha, con el dato oficial del INDEC
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Un informe claro, para imprimir o guardar en PDF: cuánto cuesta criar a tus hijos, cómo se reparte
            entre los dos según lo que gana cada uno y cómo se actualiza. Con cada fuente a la vista.
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
                <PlanillaComprarBtn
                  producto={SLUG_INFORME}
                  precio={precio}
                  id="cta-hero"
                  etiqueta={`Quiero mi informe · ${precioTxt}`}
                />
                <p className="mt-2 text-center text-xs text-zinc-500">
                  Lo abrís apenas se acredita el pago y te llega por mail.
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
            <li className="flex items-start gap-1.5">
              <Tilde /> Canasta de crianza del INDEC de {U.etiqueta}
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Devolución dentro de los 7 días
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Los nombres no salen de tu navegador
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
              El mismo informe que vas a recibir, con números calculados hoy. Si venís de la calculadora, ya
              tiene los tuyos.
            </p>
          </div>
          <InformeCuotaVistaPrevia />
        </section>

        {/* ── Para qué sirve ── */}
        <section aria-labelledby="para-que">
          <h2 id="para-que" className="max-w-2xl text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Para que la conversación sea sobre números, no sobre quién tiene razón
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PARA_QUE.map((p, i) => (
              <div key={p.titulo} className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5">
                <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)]">
                  <p className="text-xs font-semibold tabular-nums text-emerald-700">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-semibold text-zinc-900">{p.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{p.texto}</p>
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
              Seis partes, en el orden en que te las van a preguntar, en pocas hojas A4.
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

        {/* ── Por qué la canasta + qué no es ── */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-emerald-900/[0.05] p-1.5 ring-1 ring-emerald-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Por qué la canasta de crianza</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Es la medición oficial del INDEC de lo que cuesta criar a un chico, mes a mes y por edad. No es un
                mínimo legal, pero los juzgados la toman como referencia: un relevamiento del Ministerio de Economía
                encontró 22 resoluciones de 11 jurisdicciones que la usaron para fijar o actualizar cuotas.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-500">
                <li>
                  <a href={CANASTA_CRIANZA_FUENTE.informe} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    INDEC — canasta de crianza
                  </a>{" "}
                  · último mes publicado: {U.etiqueta}
                </li>
                <li>
                  <a
                    href="https://argentina.gob.ar/sites/default/files/2023/11/informe_fallos_nov_2023.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline decoration-emerald-300 underline-offset-2"
                  >
                    Ministerio de Economía — «¿Para qué sirve el Índice Crianza?» (2023)
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-amber-900/[0.04] p-1.5 ring-1 ring-amber-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Lo que no es</h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-600">
                <li>
                  <strong className="font-semibold text-zinc-800">No reemplaza a un abogado.</strong> Es una referencia
                  de cálculo. Antes de firmar un acuerdo, consultá con uno o con la defensoría oficial, que en muchos
                  lugares atiende gratis.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No es la cuota que te van a fijar.</strong> Un juez
                  mira también colegio, salud, vivienda e ingresos reales que ninguna tabla conoce.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No inventa datos.</strong> Para hijos de 13 años o
                  más el INDEC no publica un costo, y el informe lo dice en vez de estimar.
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
              ["Lo abrís al instante", "Si venís de la calculadora, ya tiene tus números. El enlace también te llega por mail y no vence."],
              ["Lo ajustás y lo descargás", "Sumás nombres o corregís un monto, y lo guardás en PDF o lo imprimís."],
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
        <section
          data-oferta={SLUG_INFORME}
          className="rounded-[2rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5"
        >
          <div className="rounded-[calc(2rem-0.375rem)] bg-white px-6 py-10 text-center shadow-[var(--shadow-apoyo)] sm:px-10">
            <p className="text-2xl font-bold tracking-tight text-zinc-900">
              Tu informe, listo para llevar
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              {precioTxt}, pago único. Si no te sirve, te devolvemos el dinero dentro de los 7 días.
            </p>
            <div id="compra-cierre" className="mx-auto mt-6 max-w-xs">
              <PlanillaComprarBtn
                producto={SLUG_INFORME}
                precio={precio}
                id="cta-cierre"
                etiqueta={`Quiero mi informe · ${precioTxt}`}
              />
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              ¿Sólo querés ver el número?{" "}
              <Link href="/cuota-alimentaria" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2">
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
