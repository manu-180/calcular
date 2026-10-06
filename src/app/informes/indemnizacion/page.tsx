// Landing del Informe de liquidación final por despido.
//
// QUIÉN LLEGA ACÁ: alguien al que acaban de despedir, o al que le están por pagar la liquidación,
// con miedo de que lo estafen y una cita por delante (la empresa, el SECLO, un abogado). Ya usó la
// calculadora gratis. No necesita que lo apuren: necesita poder mostrar, rubro por rubro y con el
// artículo al lado, de dónde sale cada número. Por eso no hay urgencia, contadores ni promesas de
// lo que dirá un juez. La página responde, en orden:
//   1. ¿Qué me llevo? → el informe real, con el mismo componente que se entrega.
//   2. ¿Para qué me sirve mañana? → la empresa, el SECLO, el abogado.
//   3. ¿Es confiable? → el texto vigente de la LCT (Ley 27.802) y el mismo motor de la calculadora.
//   4. ¿Qué NO es? → dicho de frente, antes de cobrar (YMYL).
//   5. ¿Y si no me sirve? → devolución de 7 días.

import type { Metadata } from "next";
import Link from "next/link";
import { BarraCompraMovil } from "@/components/BarraCompraMovil";
import { CompraDialogo } from "@/components/CompraDialogo";
import { InformeIndemnizacionVistaPrevia } from "@/components/informe-indemnizacion/VistaPrevia";
import { JsonLd } from "@/components/JsonLd";
import { PlanillaComprarBtn } from "@/components/PlanillaComprarBtn";
import { INDEMNIZACION_FUENTES } from "@/data/indemnizacion";
import { formatARS } from "@/lib/formato";
import { productoPorSlug, type Producto } from "@/lib/mp";
import { PRECIO_INFORME_REFERENCIA, RUTA_LANDING_INFORME, SLUG_INFORME } from "./_modelo";

const TITULO = "Informe de liquidación final por despido, rubro por rubro";
const DESCRIPCION =
  "Un informe para imprimir o llevar en el celular: cada rubro de tu liquidación por despido con su artículo y la cuenta a la vista, lo que te ofrecen comparado con lo que surge de la ley, qué revisar antes de firmar y tus plazos con fecha. Texto vigente de la Ley 27.802. Pago único.";

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
        url: `/og?t=${encodeURIComponent("Informe de liquidación por despido")}&s=${encodeURIComponent(
          "Rubro por rubro, con la ley a la vista, antes de firmar",
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PARA_QUE = [
  {
    titulo: "Cuando te pasan el número",
    texto:
      "Ponés la oferta de la empresa al lado de lo que surge de la ley y ves, rubro por rubro, dónde está la diferencia. Preguntar por un rubro concreto es mucho más fácil que discutir un total.",
  },
  {
    titulo: "En el SECLO o la conciliación",
    texto:
      "Llegás con la cuenta hecha, los artículos citados y los papeles que tenés que llevar en una lista para tildar. Es un papel que se puede dejar sobre la mesa.",
  },
  {
    titulo: "Con tu abogado o tu sindicato",
    texto:
      "La primera consulta rinde más si los datos y la cuenta ya están ordenados. Quien te asesora parte de ahí y se concentra en lo que la cuenta no ve.",
  },
];

const CONTENIDO = [
  ["La cifra que surge de la ley", "El total, separado en indemnización y liquidación final, con tu antigüedad computable y la base de cálculo."],
  ["Rubro por rubro", "Antigüedad, preaviso, integración del mes, aguinaldos, vacaciones y días trabajados: cada uno con su artículo y la cuenta."],
  ["Lo que te ofrecen y lo que surge de la ley", "Cargás el monto de la empresa y el informe muestra la diferencia en cada rubro. Si no lo tenés todavía, sale con la columna en blanco para completar a mano."],
  ["Qué parte puede pagar Ganancias", "Lo exento, lo que la ley declara no exento y lo que suma como sueldo, según el art. 26 de la ley del impuesto."],
  ["Antes de firmar", "Lo que conviene revisar en el recibo y en un acuerdo, con lo que dice la ley después de la reforma de 2026."],
  ["Qué papeles pedir", "Recibos, certificado de trabajo, constancia de aportes y lo que vas a necesitar en una conciliación."],
  ["Tus plazos, con fecha", "Hasta cuándo te tienen que pagar, cuándo vence el certificado de trabajo y hasta cuándo pedir el desempleo."],
  ["Glosario y fuentes", "Las palabras que vas a escuchar, explicadas, y cada norma oficial con su fecha de consulta."],
];

const FAQS = [
  {
    q: "¿El informe tiene validez legal?",
    a: "No es una liquidación oficial ni una pericia: es una referencia de cálculo con la ley vigente y sus artículos citados, que podés mostrar y dejar sobre la mesa. Lo que se paga lo acuerdan las partes y, si hay juicio, lo decide un juez. Lo que el informe hace es que llegues a esa instancia sabiendo de dónde sale cada número.",
  },
  {
    q: "¿Qué datos necesito para armarlo?",
    a: "Tu mejor sueldo bruto mensual del último año, la fecha de ingreso, la fecha del despido y si te dieron preaviso. Si sabés el tope de tu convenio, mejor. Si venís de la calculadora, el informe ya sale con esos datos.",
  },
  {
    q: "Todavía no me dijeron cuánto me van a pagar, ¿me sirve?",
    a: "Sí. Sale con la columna de lo ofrecido en blanco para completarla a mano cuando te pasen el número, o volvés a abrir el enlace y lo cargás ahí: el enlace no vence.",
  },
  {
    q: "¿Es el mismo cálculo que la calculadora gratis?",
    a: "Sí, sale del mismo motor, rubro por rubro. El informe suma los días trabajados del mes del despido, que la calculadora no muestra, y deja a la vista el subtotal sin ese rubro para que las dos cifras se puedan comparar.",
  },
  {
    q: "¿Está actualizado con la reforma laboral?",
    a: "Sí. Usa el texto vigente de la Ley de Contrato de Trabajo con los cambios de la Ley 27.802 (Boletín Oficial del 6 de marzo de 2026): la nueva definición de la base de cálculo, el piso del 67% con tope de convenio, el preaviso y el nuevo plazo del certificado de trabajo.",
  },
  {
    q: "¿Guardan mis datos?",
    a: "Tu nombre, el de la empresa y lo que te ofrecen no salen de tu navegador: se escriben en la página y van directo a la hoja. El sueldo, las fechas, si hubo preaviso y el tope viajan con el pago, en MercadoPago, sólo para que el informe se arme solo cuando lo abrís.",
  },
  {
    q: "¿Me sirve si renuncié o me despidieron con causa?",
    a: "No es el caso para el que está hecho: calcula un despido sin causa (o indirecto). Si renunciaste, la calculadora de renuncia de calcular.ar te muestra la liquidación final. Si te despidieron con causa y no estás de acuerdo con ella, eso se discute con un abogado.",
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

export default function InformeIndemnizacionLanding() {
  const producto: Producto | null = productoPorSlug(SLUG_INFORME);
  const precio = producto?.precio ?? PRECIO_INFORME_REFERENCIA;
  const precioTxt = formatARS(precio, 0);
  const tituloCorto = producto?.tituloCorto ?? "Informe de liquidación por despido";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Informe de liquidación final por despido — rubro por rubro, con la Ley de Contrato de Trabajo vigente",
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
          <Ojo>Para el día que te pasan el número</Ojo>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            Sabé si tu liquidación por despido está bien, antes de firmar
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Un informe claro, para imprimir o llevar en el celular: cada rubro con el artículo que lo manda y la cuenta
            hecha, lo que te ofrecen al lado de lo que surge de la ley, qué revisar antes de firmar y tus plazos con fecha.
          </p>

          <div data-oferta={SLUG_INFORME} className="mt-8 rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 sm:max-w-xl">
            <div className="flex flex-col gap-5 rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:flex-row sm:items-center sm:p-6">
              <div className="shrink-0">
                <p className="text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">{precioTxt}</p>
                <p className="text-sm text-zinc-500">pago único</p>
              </div>
              <div id="compra-hero" className="flex-1">
                <PlanillaComprarBtn producto={SLUG_INFORME} precio={precio} id="cta-hero" etiqueta={`Quiero mi informe · ${precioTxt}`} />
                <p className="mt-2 text-center text-xs text-zinc-500">Lo abrís apenas se acredita el pago y te llega por mail.</p>
              </div>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
            <li className="flex items-start gap-1.5">
              <Tilde /> Ley de Contrato de Trabajo con la reforma 2026
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Devolución dentro de los 7 días
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Tu nombre y el de la empresa no salen de tu navegador
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
              El mismo informe que vas a recibir, calculado ahora. Si venís de la calculadora, ya tiene tus números.
            </p>
          </div>
          <InformeIndemnizacionVistaPrevia />
        </section>

        {/* ── Para qué sirve ── */}
        <section aria-labelledby="para-que">
          <h2 id="para-que" className="max-w-2xl text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Para hablar de rubros concretos, no de un total que no sabés de dónde sale
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
            <p className="mt-3 text-zinc-600">Ocho partes, en el orden en que las vas a necesitar, en pocas hojas A4.</p>
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

        {/* ── Por qué confiar + qué no es ── */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-emerald-900/[0.05] p-1.5 ring-1 ring-emerald-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Con la ley que rige hoy</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                La reforma laboral de 2026 cambió la definición del sueldo que se usa de base, dejó escrito el piso del 67%
                cuando hay tope de convenio, sacó el preaviso del período de prueba y le puso plazo al certificado de
                trabajo. Mucho de lo que circula todavía calcula con las reglas viejas. Este informe usa el texto vigente,
                leído en InfoLEG, y el mismo motor que la calculadora.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-500">
                <li>
                  <a href={INDEMNIZACION_FUENTES.lct.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    Ley de Contrato de Trabajo — texto actualizado
                  </a>
                </li>
                <li>
                  <a href={INDEMNIZACION_FUENTES.ley27802.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    Ley 27.802 — Boletín Oficial del 6/3/2026
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
                  <strong className="font-semibold text-zinc-800">No reemplaza a un abogado.</strong> Es una referencia de
                  cálculo. Antes de firmar un acuerdo, consultá con un abogado laboralista o con tu sindicato.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No adivina lo que dirá un juez.</strong> Calcula lo que
                  surge de la ley con tus datos. Un recibo distinto, un convenio con tope o una causa en discusión cambian el
                  resultado.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No suma multas que ya no existen.</strong> Las de las
                  leyes 24.013, 25.323 y 25.345 fueron derogadas en 2024, y el informe lo dice en vez de inflar el número.
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
              ["Lo completás y lo descargás", "Cargás lo que te ofrecen, tu nombre si querés, y lo guardás en PDF o lo imprimís."],
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
            <p className="text-2xl font-bold tracking-tight text-zinc-900">Tu liquidación, rubro por rubro</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              {precioTxt}, pago único. Si no te sirve, te devolvemos el dinero dentro de los 7 días.
            </p>
            <div id="compra-cierre" className="mx-auto mt-6 max-w-xs">
              <PlanillaComprarBtn producto={SLUG_INFORME} precio={precio} id="cta-cierre" etiqueta={`Quiero mi informe · ${precioTxt}`} />
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              ¿Sólo querés ver el número?{" "}
              <Link href="/indemnizacion" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2">
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
