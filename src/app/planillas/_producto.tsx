// Landing de producto pago, compartida por /planillas (Comercio) y /planillas/uocra.
//
// No es un archivo de ruta (Next solo rutea page.tsx / route.ts), así que vive acá adentro
// y no en components/: es la página, no un componente reusable del sitio.
//
// POR QUÉ ESTÁ ARMADA ASÍ. Hasta el 4/9/2026 la landing tenía tráfico y una sola venta. Lo que
// le faltaba no era copy: era PRUEBA. Nadie paga $14.900 por una planilla que no vio, de una
// marca que no conoce, sin saber qué pasa si no le sirve. El orden de la página responde, en
// ese orden, las cuatro preguntas que frenan la compra:
//   1. ¿Qué me llevo? → vista previa con números REALES, calculados en el server con el mismo
//      motor que la calculadora gratis. No es una captura que puede quedar vieja.
//   2. ¿Los números son confiables? → fuente oficial con link y fecha de verificación a la vista.
//   3. ¿Y si no me sirve? → devolución de 7 días, escrita sin letra chica.
//   4. ¿Quién me lo vende? → link a /sobre y a /contacto, con el nombre del que responde.
// Nada de urgencia falsa, contadores ni "X personas compraron": el moat es la confianza.

import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { PlanillaComprarBtn } from "@/components/PlanillaComprarBtn";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { formatARS } from "@/lib/formato";
import type { Producto } from "@/lib/mp";

export type FilaPreview = {
  etiqueta: string;
  valor: number | string;
  tono?: "input" | "resultado" | "total";
  nota?: string;
};

export type ConfigLanding = {
  producto: Producto;
  /** Badge del convenio, arriba del título. */
  etiquetaConvenio: string;
  h1: ReactNode;
  bajada: string;
  respuestaPrimero: ReactNode;
  /** Encabezado de la vista previa: qué caso concreto se está liquidando. */
  previewTitulo: string;
  previewSubtitulo: string;
  preview: FilaPreview[];
  /** Link a la calculadora gratis que da estos mismos números. */
  calculadoraGratis: { href: string; texto: string };
  hojas: { titulo: string; descripcion: string }[];
  fuente: { nombre: string; url: string; verificadoEl: string };
  actualizacion: string;
  faqs: { q: string; a: string }[];
  relacionadas: { href: string; texto: string }[];
  /** La otra planilla del catálogo, para no perder al que cayó en la equivocada. */
  otraPlanilla: { href: string; titulo: string; detalle: string };
};

const CHECKOUT_BASE = "/api/mp/checkout";

function Check() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Comprar({ producto, id }: { producto: Producto; id?: string }) {
  return (
    <PlanillaComprarBtn
      href={`${CHECKOUT_BASE}?p=${producto.slug}`}
      producto={producto.slug}
      precio={producto.precio}
      id={id}
    />
  );
}

export function PlanillaLanding(c: ConfigLanding) {
  const { producto } = c;
  const precio = formatARS(producto.precio, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${producto.titulo} — ${producto.convenio}`,
    description: c.bajada,
    brand: { "@type": "Brand", name: "CalculAR" },
    offers: {
      "@type": "Offer",
      price: String(producto.precio),
      priceCurrency: producto.moneda,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "CalculAR" },
      url: `https://calcular.ar${producto.rutaLanding}`,
      // Producto digital: se entrega por mail al instante y sin costo. shippingDetails
      // en cero es lo que Google acepta para cerrar el aviso de "Fichas de comerciantes"
      // cuando no hay envio fisico — schema.org no tiene un flag "es digital".
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: producto.moneda,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "AR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
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
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqLd} />

      {/* ── Hero: promesa + precio + CTA, todo arriba del pliegue ── */}
      <section className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
            {c.etiquetaConvenio}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-semibold text-zinc-700">
            Excel y Google Sheets
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{c.h1}</h1>
        <p className="max-w-2xl text-lg text-zinc-600">{c.bajada}</p>

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 sm:flex sm:items-center sm:gap-6">
          <div className="shrink-0">
            <p className="text-3xl font-bold text-zinc-900">{precio}</p>
            <p className="text-sm text-zinc-600">pago único · sin suscripción</p>
          </div>
          <div className="mt-4 flex-1 sm:mt-0">
            <Comprar producto={producto} id="cta-hero" />
            <p className="mt-2 text-center text-xs text-zinc-600">
              Pagás con MercadoPago (tarjeta, débito o dinero en cuenta) y te llega al mail al instante.
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600">
          <li className="flex items-start gap-1.5">
            <Check /> Actualizaciones del año incluidas
          </li>
          <li className="flex items-start gap-1.5">
            <Check /> Devolución dentro de los 7 días
          </li>
          <li className="flex items-start gap-1.5">
            <Check /> Fuente oficial verificada el {c.fuente.verificadoEl}
          </li>
        </ul>
      </section>

      <div className="mb-10">
        <RespuestaPrimero>{c.respuestaPrimero}</RespuestaPrimero>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* ── 1. Qué me llevo: la hoja de verdad, con números de verdad ── */}
          <section>
            <h2 className="mb-1 text-xl font-semibold text-zinc-900">Esto es lo que vas a ver al abrirla</h2>
            <p className="mb-4 text-sm text-zinc-600">
              No es una captura de pantalla: son los números que la planilla devuelve hoy, calculados
              con la escala vigente. Si mañana cambia la paritaria, cambia esto y cambia el archivo.
            </p>

            <div className="overflow-hidden rounded-xl border border-zinc-300 shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-300 bg-zinc-800 px-4 py-2.5">
                <p className="text-sm font-semibold text-white">{c.previewTitulo}</p>
                <span className="hidden shrink-0 rounded bg-zinc-700 px-2 py-0.5 text-[11px] font-medium text-zinc-200 sm:inline">
                  hoja «Liquidador»
                </span>
              </div>
              <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-600">
                {c.previewSubtitulo}
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {c.preview.map((f, i) => {
                    const total = f.tono === "total";
                    const input = f.tono === "input";
                    return (
                      <tr
                        key={i}
                        className={
                          total
                            ? "bg-emerald-100/80 font-semibold text-zinc-900"
                            : input
                              ? "bg-amber-50/70 text-zinc-700"
                              : "bg-white text-zinc-700"
                        }
                      >
                        <th
                          scope="row"
                          className="border-b border-zinc-200 px-4 py-2 text-left font-normal first-letter:uppercase"
                        >
                          <span className={total ? "font-semibold" : undefined}>{f.etiqueta}</span>
                          {f.nota ? <span className="ml-2 text-xs text-zinc-500">{f.nota}</span> : null}
                        </th>
                        <td className="border-b border-zinc-200 px-4 py-2 text-right tabular-nums">
                          {typeof f.valor === "number" ? formatARS(f.valor, 0) : f.valor}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-600">
                <span className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900">amarillo</span>
                lo completás vos ·
                <span className="rounded bg-white px-1.5 py-0.5 font-medium text-zinc-700 ring-1 ring-zinc-200">
                  blanco
                </span>
                lo calcula la planilla
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">
                Comprobalo antes de pagar: da los mismos números que la calculadora gratis
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Es la misma escala y la misma fórmula. Meté el mismo caso en la calculadora del sitio
                y compará: si alguna vez no coinciden, escribinos y lo corregimos.
              </p>
              <Link
                href={c.calculadoraGratis.href}
                className="mt-2 inline-block text-sm font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
              >
                {c.calculadoraGratis.texto} →
              </Link>
            </div>
          </section>

          {/* ── 2. Qué trae el archivo ── */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-900">Qué trae el archivo</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {c.hojas.map((h, i) => (
                <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold text-zinc-900">{h.titulo}</p>
                  <p className="mt-1 text-sm text-zinc-600">{h.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. De dónde salen los números ── */}
          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="mb-2 font-semibold text-emerald-900">De dónde salen los números</h2>
            <p className="text-sm text-emerald-900/90">
              De los documentos oficiales, leídos completos. Ni de un blog, ni de un resumen de
              terceros, ni de otra planilla de internet. La fuente y la fecha de verificación están
              adentro del archivo, en una hoja aparte, para que puedas mostrárselas a quien te
              discuta un número.
            </p>
            <div className="mt-3 rounded-lg bg-white/70 p-3 text-sm">
              <p className="font-medium text-emerald-900">{c.fuente.nombre}</p>
              <a
                href={c.fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-block break-all text-xs text-emerald-700 underline"
              >
                {c.fuente.url}
              </a>
              <p className="mt-1 text-xs text-emerald-800">Verificado el {c.fuente.verificadoEl}.</p>
            </div>
          </section>

          {/* ── 4. Qué pasa cuando cambia la paritaria ── */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-zinc-900">
              Qué pasa cuando cambia la paritaria
            </h2>
            <p className="text-zinc-600">{c.actualizacion}</p>
            <p className="mt-2 text-sm text-zinc-600">
              El enlace de descarga que te llega por mail no vence: siempre te baja la última versión.
              No hay que pedir nada ni pagar de nuevo.
            </p>
          </section>

          {/* ── 5. Objeción principal: ¿y si no me sirve? ── */}
          <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 font-semibold text-zinc-900">Si no te sirve, te devolvemos el dinero</h2>
            <p className="text-sm text-zinc-600">
              Tenés 7 días desde la compra. Respondés el mail de la entrega diciendo que no te sirvió
              —no hace falta que expliques por qué— y te devolvemos los {precio} por MercadoPago. Sin
              formularios, sin llamadas, sin letra chica.
            </p>
          </section>

          {/* ── 6. FAQ ── */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-900">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {c.faqs.map((faq, i) => (
                <details key={i} className="group rounded-lg border border-zinc-200 bg-white p-4 open:shadow-sm">
                  <summary className="cursor-pointer list-none font-semibold text-zinc-900 marker:content-none">
                    <span className="flex items-start justify-between gap-3">
                      {faq.q}
                      <span className="mt-1 shrink-0 text-zinc-400 transition group-open:rotate-180" aria-hidden>
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-zinc-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ── 7. Quién está atrás ── */}
          <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <h2 className="mb-2 font-semibold text-zinc-900">Quién está atrás de esto</h2>
            <p className="text-sm text-zinc-600">
              CalculAR es un proyecto argentino de calculadoras laborales y fiscales con datos de
              fuentes oficiales verificadas. Las calculadoras del sitio son gratis y siempre lo van a
              ser; estas planillas son la versión que te llevás puesta, para liquidar sin depender de
              tener internet ni de entrar cada mes.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
              <Link href="/sobre" className="text-emerald-700 underline hover:text-emerald-900">
                Sobre nosotros
              </Link>
              <Link href="/contacto" className="text-emerald-700 underline hover:text-emerald-900">
                Escribinos
              </Link>
            </div>
          </section>

          {/* ── CTA de cierre: el que llegó hasta acá ya leyó todo ── */}
          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="text-lg font-semibold text-zinc-900">
              {c.producto.tituloCorto} — {precio}, pago único
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-zinc-600">
              Con las actualizaciones del año y 7 días para arrepentirte.
            </p>
            <div className="mx-auto mt-4 max-w-xs">
              <Comprar producto={producto} id="cta-cierre" />
            </div>
          </section>
        </div>

        {/* ── Sidebar de compra ── */}
        <aside className="space-y-4">
          <div className="sticky top-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-900">{producto.tituloCorto}</p>
            <p className="mt-2 text-4xl font-bold text-zinc-900">{precio}</p>
            <p className="mt-0.5 text-sm text-zinc-500">pago único · actualizaciones del año incluidas</p>

            <div className="mt-5">
              <Comprar producto={producto} id="cta-sidebar" />
              <p className="mt-2 text-center text-xs text-zinc-500">
                Te llega al mail apenas se acredita el pago
              </p>
            </div>

            <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-5 text-sm text-zinc-600">
              <li className="flex items-start gap-2">
                <Check /> Excel (.xlsx) y Google Sheets
              </li>
              <li className="flex items-start gap-2">
                <Check /> Escala oficial embebida, no la buscás más
              </li>
              <li className="flex items-start gap-2">
                <Check /> Los mismos números que la calculadora gratis
              </li>
              <li className="flex items-start gap-2">
                <Check /> Funciona sin internet
              </li>
              <li className="flex items-start gap-2">
                <Check /> Devolución dentro de los 7 días
              </li>
            </ul>

            <p className="mt-5 border-t border-zinc-100 pt-4 text-xs text-zinc-500">
              Pago procesado por MercadoPago. No guardamos ni vemos los datos de tu tarjeta.
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
            <p className="font-semibold text-amber-900">{c.otraPlanilla.titulo}</p>
            <p className="mt-1 text-amber-800">{c.otraPlanilla.detalle}</p>
            <Link
              href={c.otraPlanilla.href}
              className="mt-2 inline-block font-semibold text-amber-700 underline hover:text-amber-900"
            >
              Verla →
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-12 border-t border-zinc-200 pt-8">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">Calculadoras gratuitas relacionadas</h2>
        <div className="flex flex-wrap gap-3">
          {c.relacionadas.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              {r.texto}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
