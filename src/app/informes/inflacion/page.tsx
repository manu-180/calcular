// Landing del Informe de actualización por inflación.
//
// QUIÉN LLEGA ACÁ: alguien que ya sabe el número (la calculadora gratis se lo dio) y tiene una
// conversación incómoda por delante: pedir aumento, subir honorarios, actualizar un presupuesto o
// hablar de una plata prestada. Lo que le falta es el papel y las palabras. La página responde,
// en orden:
//   1. ¿Qué me llevo? → el informe real con la carta, renderizado con el componente que se entrega.
//   2. ¿Me sirve a mí? → los cuatro casos, con lo que resuelve en cada uno.
//   3. ¿Es confiable? → IPC del INDEC con el mes del último dato y la cuenta a la vista.
//   4. ¿Qué NO es? → dicho de frente, antes de cobrar (deudas: Ley 23.928).
//   5. ¿Y si no me sirve? → devolución de 7 días.

import type { Metadata } from "next";
import Link from "next/link";
import { BarraCompraMovil } from "@/components/BarraCompraMovil";
import { CompraDialogo } from "@/components/CompraDialogo";
import { JsonLd } from "@/components/JsonLd";
import { PlanillaComprarBtn } from "@/components/PlanillaComprarBtn";
import { InformeInflacionVistaPrevia } from "@/components/informe-inflacion/InformeInflacionVistaPrevia";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "@/data/inflacion";
import { formatARS } from "@/lib/formato";
import { nombrePeriodo, ULTIMO_PERIODO } from "@/lib/inflacion";
import { productoPorSlug, type Producto } from "@/lib/mp";
import { PRECIO_INFORME_REFERENCIA, RUTA_LANDING_INFORME, SLUG_INFORME } from "./_modelo";

const ULTIMO = nombrePeriodo(ULTIMO_PERIODO);
const TITULO = "Informe de actualización por inflación, con la carta lista";
const DESCRIPCION = `Un informe para imprimir o guardar en PDF: tu monto actualizado mes a mes con el IPC del INDEC (último dato: ${ULTIMO}), la cuenta explicada y una carta lista para pedir aumento, actualizar honorarios, un presupuesto o una deuda. Pago único.`;
const LEY_23928 = "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/328/texact.htm";

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
        url: `/og?t=${encodeURIComponent("Informe de actualización por inflación")}&s=${encodeURIComponent(
          "La cuenta con el IPC del INDEC y la carta lista para mandar",
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CASOS_USO = [
  {
    titulo: "Pedir un aumento",
    texto:
      "Llegás con cuánto perdió tu sueldo y cuánto tendría que ser hoy, con la fuente. Un pedido con número es más fácil de aprobar que uno con sensaciones.",
  },
  {
    titulo: "Actualizar honorarios",
    texto:
      "El aviso a tus clientes ya está escrito: el valor de hoy es el mismo de antes, en pesos de hoy. Sin pedir perdón ni dar vueltas.",
  },
  {
    titulo: "Actualizar un precio o presupuesto",
    texto:
      "El presupuesto viejo, llevado a hoy con un índice que el cliente puede chequear. Menos regateo, porque la cuenta no es tuya.",
  },
  {
    titulo: "Una plata prestada",
    texto:
      "Para proponer cuánto vale hoy lo que se prestó, de cualquiera de los dos lados, con un tono que cuida la relación.",
  },
];

const CONTENIDO = [
  ["El monto de hoy", "Cuánto vale tu monto en pesos del último mes publicado por el INDEC, con el porcentaje y el coeficiente."],
  ["La cuenta explicada", "La fórmula con los dos índices del INDEC escritos, para que cualquiera la rehaga y le dé lo mismo."],
  ["Mes a mes", "Cómo fue creciendo el monto con la inflación de cada mes. En períodos largos, año por año."],
  ["Tu sueldo contra la inflación", "Si venís de comparar tu sueldo: cuánto te falta por mes y cuánto tendría que subir."],
  ["La carta, lista para mandar", "Escrita con tus números, de usted o de vos, para copiar en un mail o un mensaje, o imprimir sola."],
  ["Si te preguntan", "Las respuestas a lo que te van a decir: por qué el IPC, por qué desde ese mes, «lo mío no subió tanto»."],
];

const FAQS = [
  {
    q: "¿Qué datos necesito?",
    a: "El monto y el mes en que se fijó: el sueldo, los honorarios, el presupuesto o la plata prestada. Si venís de la calculadora, el informe ya sale con esos números. Si comparaste tu sueldo, también usa lo que cobrás hoy.",
  },
  {
    q: "¿De dónde salen los números?",
    a: `De la serie oficial del IPC Nacional del INDEC (nivel general, base diciembre 2016 = 100), sin retoques. El último dato cargado es ${ULTIMO}. El INDEC publica cada mes ${IPC_DIA_PUBLICACION} del mes siguiente.`,
  },
  {
    q: "¿Puedo cambiar algo después de pagar?",
    a: "Sí. En la página del informe podés cambiar el monto, el mes o para qué es la carta, y sumar tu nombre, el de quien la recibe y la ciudad. Se recalcula al instante y lo descargás o lo imprimís las veces que quieras.",
  },
  {
    q: "¿Guardan mis datos?",
    a: "Los nombres, la ciudad y el concepto no salen de tu navegador: se escriben en la página y van directo a la hoja. El monto, los meses y para qué es viajan con el pago, en MercadoPago, sólo para que el informe se arme solo cuando lo abrís.",
  },
  {
    q: "¿Y cuando salga el IPC del mes que viene?",
    a: "El enlace de tu informe no vence. Si lo armaste hasta el último dato, cada vez que lo abrís se calcula con el último IPC publicado: si volvés el mes que viene, ya tiene el dato nuevo.",
  },
  {
    q: "¿Me obliga a algo a mí o al otro?",
    a: "No. Es una referencia de cálculo con el dato oficial para apoyar un pedido o una propuesta. Un aumento de sueldo se acuerda con el empleador (y el convenio fija los mínimos), y en las deudas de dinero la ley no admite la indexación: por eso la carta de deudas es una propuesta de acuerdo.",
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

export default function InformeInflacionLanding() {
  const producto: Producto | null = productoPorSlug(SLUG_INFORME);
  const precio = producto?.precio ?? PRECIO_INFORME_REFERENCIA;
  const precioTxt = formatARS(precio, 0);
  const tituloCorto = producto?.tituloCorto ?? "Informe de actualización por IPC";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Informe de actualización por inflación — IPC del INDEC con carta lista para mandar",
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
          <Ojo>Para pedir aumento, subir honorarios o actualizar un precio</Ojo>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            El número ya lo tenés. Acá está el papel que lo respalda
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Tu monto actualizado mes a mes con el IPC del INDEC, la cuenta explicada para que el otro la pueda revisar y una
            carta escrita con tus números, lista para mandar. Para imprimir o guardar en PDF.
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
              <Tilde /> IPC del INDEC hasta {ULTIMO}
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
              El mismo informe que vas a recibir, calculado hoy. Si venís de la calculadora, ya tiene tus números. Tocá cada caso
              para ver cómo cambia la carta.
            </p>
          </div>
          <InformeInflacionVistaPrevia />
        </section>

        {/* ── Para qué sirve ── */}
        <section aria-labelledby="para-que">
          <h2 id="para-que" className="max-w-2xl text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Cuando la cuenta no es tuya, es más difícil decir que no
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CASOS_USO.map((p, i) => (
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
            <p className="mt-3 text-zinc-600">Pocas hojas A4. La carta va en una hoja aparte, para mandarla sola.</p>
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

        {/* ── Por qué el IPC + qué no es ── */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-emerald-900/[0.05] p-1.5 ring-1 ring-emerald-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Por qué el IPC del INDEC</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Es el índice oficial de precios del país: lo publica el INDEC todos los meses y cualquiera lo puede consultar. No
                es un número tuyo ni del otro, y eso es lo que lo vuelve difícil de descartar. El informe muestra los dos índices
                que usa la cuenta, para que se pueda rehacer.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-500">
                <li>
                  <a href={INFLACION_FUENTES.ipc.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    INDEC — serie oficial del IPC Nacional
                  </a>{" "}
                  · último mes publicado: {ULTIMO}
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-amber-900/[0.04] p-1.5 ring-1 ring-amber-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Lo que no es</h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-600">
                <li>
                  <strong className="font-semibold text-zinc-800">No mide tus gastos.</strong> El IPC es un promedio de todos los
                  hogares; lo tuyo puede haber subido más o menos.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No obliga a nadie.</strong> Apoya un pedido o una propuesta. Un
                  sueldo se acuerda con el empleador y el convenio fija los mínimos.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No sirve para exigir una deuda indexada.</strong> En deudas de
                  dinero, el{" "}
                  <a href={LEY_23928} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    art. 7 de la Ley 23.928
                  </a>{" "}
                  no admite la indexación: la carta es una propuesta de acuerdo. Para un reclamo, un abogado.
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
              ["Completás la carta y la mandás", "Sumás tu nombre y el de quien la recibe, copiás la carta o descargás el PDF."],
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
            <p className="text-2xl font-bold tracking-tight text-zinc-900">Tu informe y tu carta, listos para mandar</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              {precioTxt}, pago único. Si no te sirve, te devolvemos el dinero dentro de los 7 días.
            </p>
            <div id="compra-cierre" className="mx-auto mt-6 max-w-xs">
              <PlanillaComprarBtn producto={SLUG_INFORME} precio={precio} id="cta-cierre" etiqueta={`Quiero mi informe · ${precioTxt}`} />
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              ¿Sólo querés ver el número?{" "}
              <Link href="/inflacion" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2">
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
