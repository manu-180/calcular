// Landing del Informe de Ganancias 2026.
//
// QUIÉN LLEGA ACÁ: un empleado que acaba de ver en la calculadora cuánto le retienen y siente que es
// mucho. No quiere volverse contador: quiere saber qué puede hacer, legalmente, y hacerlo. La página
// responde, en orden: qué me llevo (el informe real), cuánto vale una deducción para mí (el ejemplo
// con números del motor), por qué conviene hacerlo ahora (el plazo oficial, sin urgencia inventada),
// qué no es (YMYL) y qué pasa si no me sirve.

import type { Metadata } from "next";
import Link from "next/link";
import { BarraCompraMovil } from "@/components/BarraCompraMovil";
import { CompraDialogo } from "@/components/CompraDialogo";
import { JsonLd } from "@/components/JsonLd";
import { PlanillaComprarBtn } from "@/components/PlanillaComprarBtn";
import { InformeGananciasVistaPrevia } from "@/components/informe-ganancias/VistaPrevia";
import { GANANCIAS_FUENTES, GANANCIAS_VIGENCIA } from "@/data/ganancias";
import { formatARS, formatPctFijo } from "@/lib/formato";
import { fechaLarga } from "@/lib/hoy";
import { productoPorSlug, type Producto } from "@/lib/mp";
import {
  ANIO_FISCAL,
  CASO_EJEMPLO,
  FECHA_TOPE_SIRADIG,
  GASTOS_EJEMPLO,
  PRECIO_INFORME_REFERENCIA,
  RUTA_LANDING_INFORME,
  SLUG_INFORME,
  armarInforme,
} from "./_modelo";

const TITULO = "Informe de Ganancias 2026: cuánto pagás y cómo pagar menos";
const DESCRIPCION =
  "Un informe para imprimir o guardar en PDF con tu sueldo: la retención de Ganancias mes a mes, tu tramo, cuánto te devuelve cada deducción legal y el paso a paso para cargarlas en el SiRADIG. Pago único.";

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
        url: `/og?t=${encodeURIComponent("Informe de Ganancias 2026")}&s=${encodeURIComponent(
          "Cuánto pagás en el año y qué deducciones te devuelven plata",
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONTENIDO = [
  ["Tu año, mes a mes", "La retención de cada mes, el acumulado y tu tramo, con el salto de junio y diciembre explicado."],
  ["Lo que vale una deducción para vos", "Cuánto te devuelven $100.000 deducidos, calculado con tu sueldo y no con un porcentaje genérico."],
  ["Las deducciones que te pueden tocar", "Alquiler, prepaga, médicos, colegio, empleada, seguros, donaciones e hipotecario: el máximo de cada una y lo que te devolvería."],
  ["Tu número exacto", "Cargás lo que pagás y el informe recalcula al instante: cuánto recuperás en el año y cómo queda cada mes."],
  ["El paso a paso del SiRADIG", "Con los nombres reales de cada botón, los papeles que te piden y el plazo para el año 2026."],
  ["Lo que podés hacer esta semana", "Una lista corta para tildar, armada con tus deducciones."],
];

const FAQS = [
  {
    q: "¿Es legal pagar menos así?",
    a: "Sí. Todo lo que trae el informe son deducciones previstas en la ley de Ganancias y en normas oficiales, con su artículo. Nada de facturas a nombre de otro ni gastos inflados: cada deducción exige su comprobante, y el informe te dice cuál.",
  },
  {
    q: "¿Qué datos necesito?",
    a: "Tu sueldo bruto mensual y tus cargas de familia. Si venís de la calculadora, el informe ya sale con eso. Después, si querés tu número exacto, cargás cuánto pagás de alquiler, prepaga, colegio o médicos.",
  },
  {
    q: "¿Ya es tarde para el 2026?",
    a: `No. El SiRADIG se puede presentar todos los meses, y para el año ${ANIO_FISCAL} lo que cargues hasta el ${fechaLarga(FECHA_TOPE_SIRADIG)} entra en la liquidación anual de tu empleador. Como la retención es acumulada, lo de meses anteriores corrige el año entero.`,
  },
  {
    q: "¿Guardan lo que cargo?",
    a: "Lo que pagás de alquiler, prepaga y demás no sale de tu navegador: queda guardado ahí para que no lo vuelvas a escribir. El sueldo y las cargas de familia viajan con el pago, en MercadoPago, sólo para que el informe se arme solo cuando lo abrís.",
  },
  {
    q: "¿Coincide con lo que me retiene mi empleador?",
    a: "Usa el mismo método acumulado que tu empleador, con la escala y las deducciones vigentes de ARCA, suponiendo el mismo sueldo todo el año. Si cobrás bonos, horas extra o tuviste aumentos, tu recibo va a variar; el informe te sirve para entender el orden de magnitud y qué deducciones te faltan.",
  },
  {
    q: "Si no me retienen Ganancias, ¿me sirve?",
    a: "No. Si con tu sueldo y tus cargas no pagás Ganancias, no hay impuesto que bajar y no te conviene comprarlo. La calculadora gratuita te lo dice antes de que pagues.",
  },
  {
    q: "¿Cómo se paga y qué pasa si no me sirve?",
    a: "Pagás una sola vez con MercadoPago (tarjeta, débito o dinero en cuenta) y lo abrís al instante; el enlace también te llega por mail y no vence. Si no te sirve, respondé ese mail dentro de los 7 días y te devolvemos el dinero, sin preguntas.",
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

export default function InformeGananciasLanding() {
  const producto: Producto | null = productoPorSlug(SLUG_INFORME);
  const precio = producto?.precio ?? PRECIO_INFORME_REFERENCIA;
  const precioTxt = formatARS(precio, 0);
  const tituloCorto = producto?.tituloCorto ?? "Informe de Ganancias 2026";

  const ej = armarInforme(CASO_EJEMPLO, GASTOS_EJEMPLO);
  const alquilerEj = ej?.oportunidades.find((o) => o.id === "alquiler");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Informe de Ganancias 2026 — proyección anual y deducciones para empleados",
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
          <Ojo>Para empleados a los que les retienen Ganancias</Ojo>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            Sabé cuánto vas a pagar de Ganancias este año, y cómo pagar menos
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Un informe con tu sueldo, para imprimir o guardar en PDF: la retención de cada mes, cuánto te devuelve cada
            deducción que la ley permite y qué cargar en el SiRADIG, paso a paso.
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
              <Tilde /> Escala y deducciones de ARCA del {GANANCIAS_VIGENCIA}
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Devolución dentro de los 7 días
            </li>
            <li className="flex items-start gap-1.5">
              <Tilde /> Lo que pagás no sale de tu navegador
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
              El mismo informe que vas a recibir, calculado hoy. Si venís de la calculadora, ya tiene tu sueldo.
            </p>
          </div>
          <InformeGananciasVistaPrevia />
        </section>

        {/* ── Cuánto vale una deducción ── */}
        {ej && alquilerEj ? (
          <section aria-labelledby="cuanto-vale" className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
            <div>
              <h2 id="cuanto-vale" className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Una deducción no te devuelve lo que pagaste. Te devuelve tu tramo.
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-600">
                Por eso el mismo alquiler le sirve mucho a uno y casi nada a otro. Con {formatARS(CASO_EJEMPLO.bruto, 0)} de
                bruto, el tramo es del {formatPctFijo(ej.alicuotaMarginal * 100, 0)}: un alquiler de{" "}
                {formatARS(GASTOS_EJEMPLO.alquilerMensual, 0)} por mes se deduce en {formatARS(alquilerEj.deducible, 0)} y
                devuelve {formatARS(alquilerEj.ahorro, 0)} en el año. El informe hace esa cuenta con tu sueldo, para cada
                deducción.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-emerald-900/[0.05] p-1.5 ring-1 ring-emerald-900/10">
              <dl className="grid gap-px overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-zinc-200 shadow-[var(--shadow-apoyo)]">
                {[
                  ["Ganancias del año, sin deducciones", formatARS(ej.total, 0)],
                  ["Cargando alquiler, prepaga y colegio", formatARS(ej.totalCon, 0)],
                  ["Lo que recupera en el año", formatARS(ej.ahorroTotal, 0)],
                ].map(([t, v], i) => (
                  <div key={t} className={`flex items-baseline justify-between gap-4 px-5 py-4 ${i === 2 ? "bg-emerald-50" : "bg-white"}`}>
                    <dt className="text-sm text-zinc-600">{t}</dt>
                    <dd className={`tabular-nums ${i === 2 ? "text-xl font-bold text-zinc-900" : "font-semibold text-zinc-900"}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="px-4 pb-2 pt-3 text-xs text-zinc-500">
                Caso de ejemplo, calculado con la escala de ARCA del {GANANCIAS_VIGENCIA}.
              </p>
            </div>
          </section>
        ) : null}

        {/* ── Qué tiene ── */}
        <section aria-labelledby="contenido" className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <div>
            <h2 id="contenido" className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Qué tiene adentro
            </h2>
            <p className="mt-3 text-zinc-600">Seis partes, de lo que pagás a lo que hacés, en pocas hojas A4.</p>
          </div>
          <ol className="divide-y divide-zinc-200 border-y border-zinc-200">
            {CONTENIDO.map(([t, x], i) => (
              <li key={t} className="flex gap-4 py-4">
                <span className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-emerald-700">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-semibold text-zinc-900">{t}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-600">{x}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Plazo + qué no es ── */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-emerald-900/[0.05] p-1.5 ring-1 ring-emerald-900/10">
            <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white p-6 shadow-[var(--shadow-apoyo)]">
              <h2 className="text-lg font-semibold text-zinc-900">Todavía estás a tiempo para {ANIO_FISCAL}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                El SiRADIG se presenta las veces que quieras durante el año, y lo que cargues hasta el{" "}
                {fechaLarga(FECHA_TOPE_SIRADIG)} entra en la liquidación anual. Como la retención es acumulada, cargar ahora
                lo que pagaste desde enero corrige el año entero.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-500">
                <li>
                  <a href="https://www.afip.gob.ar/572Web/carga-datos/que-datos-cargar.asp" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    ARCA — SiRADIG: qué datos cargar
                  </a>
                </li>
                <li>
                  <a href={GANANCIAS_FUENTES.deducciones.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline decoration-emerald-300 underline-offset-2">
                    {GANANCIAS_FUENTES.deducciones.nombre}
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
                  <strong className="font-semibold text-zinc-800">No es la liquidación de tu empleador.</strong> Supone el
                  mismo sueldo todo el año; bonos, horas extra o aumentos mueven tu recibo.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No reemplaza a un contador.</strong> Si tenés otros
                  ingresos, más de un empleo o bienes que declarar, conviene que alguien mire tu caso completo.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-800">No inventa atajos.</strong> Sólo deducciones de la ley, y
                  cada una con su comprobante.
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
              ["Lo abrís al instante", "Si venís de la calculadora, ya tiene tu sueldo. El enlace te llega por mail y no vence."],
              ["Cargás lo que pagás y lo descargás", "Ves tu número exacto, lo guardás en PDF y lo tenés a mano para el SiRADIG."],
            ].map(([t, x], i) => (
              <li key={t} className="border-t-2 border-zinc-900 pt-4">
                <p className="text-sm tabular-nums text-zinc-400">Paso {i + 1}</p>
                <p className="mt-1 font-semibold text-zinc-900">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{x}</p>
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
            <p className="text-2xl font-bold tracking-tight text-zinc-900">Tu informe, con tu sueldo adentro</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              {precioTxt}, pago único. Si no te sirve, te devolvemos el dinero dentro de los 7 días.
            </p>
            <div id="compra-cierre" className="mx-auto mt-6 max-w-xs">
              <PlanillaComprarBtn producto={SLUG_INFORME} precio={precio} id="cta-cierre" etiqueta={`Quiero mi informe · ${precioTxt}`} />
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              ¿Sólo querés ver cuánto te retienen?{" "}
              <Link href="/ganancias" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2">
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
