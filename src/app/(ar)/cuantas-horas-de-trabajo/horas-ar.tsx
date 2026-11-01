import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { HorasAR } from "@/components/horas/HorasAR";
import { JsonLd } from "@/components/JsonLd";
import { ITEM_INICIAL, RUTA_HORAS_AR } from "@/lib/horas-ar/catalogo";
import { datosHorasAR, type DatosHorasAR } from "@/lib/horas-ar/datos";
import { codigoHoras, duracion, duracionLarga, leerCodigoHoras, mayuscula, minutosDe } from "@/lib/horas-ar/formato";
import { ORGANIZACION } from "@/lib/schema";
import { NOMBRE_SITIO } from "@/lib/seo";
import { textosRedes } from "@/motor/i18n/redes";
import { origenAR } from "@/motor/sitio";
import "@/app/(ar)/sueldo-en-el-mundo/estilos-ar.css";
import "./estilos.css";

// «¿Cuántas horas de trabajo te cuesta?»: /cuantas-horas-de-trabajo es la página y
// /cuantas-horas-de-trabajo/<ítem>.<minutos> el link que se comparte (noindex, canonical a la página).
// El sueldo nunca sale del navegador: el link y la tarjeta llevan solo el ítem y los minutos.

const TITULO = "¿Cuántas horas de trabajo te cuesta? Asado, nafta, canasta y más";
const DESCRIPCION = "Poné tu sueldo y tus horas y mirá cuánto de tu trabajo se va en un kilo de asado, un litro de nafta o la canasta básica, con precios oficiales del INDEC y la Secretaría de Energía.";

const urlBase = () => `${origenAR()}${RUTA_HORAS_AR}`;

function datos(): DatosHorasAR {
  try {
    return datosHorasAR();
  } catch (err) {
    console.error("[horas ar] datos", err);
    return { items: [], excluidos: [], minimo: null, afuera: null };
  }
}

type Resuelto = { datos: DatosHorasAR; amigo: { id: string; minutos: number; canonico: boolean } | null };

function resolver(c?: string): Resuelto | null {
  const d = datos();
  if (c === undefined) return { datos: d, amigo: null };
  const amigo = leerCodigoHoras(c);
  return amigo ? { datos: d, amigo } : null;
}

export function metadataHorasAR(c?: string): Metadata {
  const r = resolver(c);
  // Una carga que no es la canónica va con 308 a la canónica (cada tarjeta tiene una sola URL en caché).
  if (!r || (r.amigo && !r.amigo.canonico)) return {};
  const base: Metadata = {
    title: { absolute: TITULO },
    description: DESCRIPCION,
    alternates: { canonical: RUTA_HORAS_AR },
    openGraph: {
      type: "website",
      siteName: NOMBRE_SITIO,
      locale: "es_AR",
      url: RUTA_HORAS_AR,
      title: "¿Cuántas horas de trabajo te cuesta un kilo de asado?",
      description: DESCRIPCION,
      images: [{ url: `${RUTA_HORAS_AR}/og?c=${ITEM_INICIAL}`, width: 1200, height: 630 }],
    },
  };
  if (!r.amigo || !c) return base;
  const item = r.datos.items.find((i) => i.id === r.amigo!.id);
  const titulo = `Tu amigo trabaja cerca de ${duracion(r.amigo.minutos).texto} por ${item?.nombre ?? "esto"}. ¿Y vos?`;
  return {
    ...base,
    title: { absolute: titulo },
    robots: { index: false, follow: true },
    openGraph: { ...base.openGraph, url: `${RUTA_HORAS_AR}/${c}`, title: titulo, images: [{ url: `${RUTA_HORAS_AR}/og?c=${c}`, width: 1200, height: 630 }] },
  };
}

const pesos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

function preguntas(d: DatosHorasAR) {
  const asado = d.items.find((i) => i.id === "asado");
  const conMinimo = asado && d.minimo ? duracionLarga(minutosDe(asado.monto, d.minimo.porHora)) : null;
  return [
    {
      pregunta: "¿Cómo se calcula cuánto vale mi hora de trabajo?",
      respuesta: "Se divide el sueldo del mes por las horas que trabajás en un mes: días por semana, por horas por día, por 4,33 semanas. Con 8 horas de lunes a viernes, un mes tiene unas 173 horas. Si ponés el sueldo bruto, primero le restamos el 17 % de aportes y una Ganancias estimada.",
    },
    {
      pregunta: "¿Cuántas horas de trabajo cuesta un kilo de asado?",
      respuesta: conMinimo
        ? `Con el salario mínimo, ${conMinimo}: el kilo cuesta ${pesos.format(asado!.monto)} según el INDEC (${asado!.fecha}) y la hora del mínimo, ${pesos.format(d.minimo!.porHora)}. Con tu sueldo, la cuenta cambia: ponelo arriba y la ves al instante.`
        : "Depende de tu sueldo y de tus horas: ponelos arriba y la cuenta sale al instante, con el precio promedio del INDEC.",
    },
    {
      pregunta: "¿De dónde salen los precios?",
      respuesta: "Los alimentos y la cerveza, de los precios promedio del Gran Buenos Aires que publica el INDEC cada mes. La nafta, de los precios que las estaciones de la Ciudad informan a la Secretaría de Energía. La canasta básica, del INDEC, y Spotify, de su página oficial. Cada precio dice de cuándo es y se deja de mostrar solo si queda viejo.",
    },
    {
      pregunta: "¿Se guarda mi sueldo?",
      respuesta: "No. La cuenta se hace en tu navegador. La tarjeta y el link que compartís llevan solo las horas, nunca tu sueldo ni lo que vale tu hora.",
    },
  ];
}

export function PaginaHorasAR({ c }: { c?: string }) {
  const r = resolver(c);
  if (!r) notFound();
  if (r.amigo && !r.amigo.canonico) permanentRedirect(`${RUTA_HORAS_AR}/${codigoHoras(r.amigo.id, r.amigo.minutos)}`);
  const { datos: d, amigo } = r;
  const url = urlBase();
  const faq = preguntas(d);
  const inicial = amigo && d.items.some((i) => i.id === amigo.id) ? amigo.id : d.items.some((i) => i.id === ITEM_INICIAL) ? ITEM_INICIAL : (d.items[0]?.id ?? ITEM_INICIAL);
  const fuentes = [...new Map(d.items.map((i) => [`${i.fuente.url}|${i.fecha}`, i])).values()];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      { "@type": "WebApplication", name: "¿Cuántas horas de trabajo te cuesta?", url, applicationCategory: "FinanceApplication", operatingSystem: "Web", image: `${url}/og?c=${ITEM_INICIAL}`, offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" }, inLanguage: "es-AR" },
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })) },
    ],
  };

  return (
    <article className="ca-mundo ca-hs" data-sin-herramientas="">
      <JsonLd data={jsonLd} />
      <header className="ca-hs-cabeza">
        {amigo ? (
          <p className="ca-hs-amigo" role="note">
            <span className="ca-hs-amigo-punto" aria-hidden="true" />
            <span>
              Tu amigo trabaja cerca de <strong>{duracion(amigo.minutos).texto}</strong> por {d.items.find((i) => i.id === amigo.id)?.nombre ?? "esto"}. ¿Y vos?{" "}
              <a className="ca-hs-amigo-cta" href="#calculadora">
                Calculá tus horas
              </a>
            </span>
          </p>
        ) : null}
        <p className="ca-hs-ceja">
          <span className="cy-punto-vivo" aria-hidden="true" />
          Precios oficiales, al día
        </p>
        <h1 className="ca-hs-h1">¿Cuántas horas de trabajo te cuesta un kilo de asado?</h1>
        <p className="ca-hs-intro">Poné cuánto cobrás y cuántas horas trabajás. Te mostramos cuánto de tu tiempo se va en el asado, la nafta, la cerveza y la canasta básica.</p>
      </header>

      {d.items.length ? (
        <HorasAR datos={d} base={url} redes={textosRedes("es", "vos", "es-AR")} amigo={amigo} inicial={inicial} />
      ) : (
        <p className="ca-hs-intro">Estamos actualizando los precios oficiales. Volvé en un rato.</p>
      )}

      <section className="ca-hs-metodo" aria-labelledby="ca-hs-metodo-titulo">
        <div className="ca-hs-cabeza-seccion">
          <h2 id="ca-hs-metodo-titulo" className="ca-hs-h2">
            De dónde sale cada número
          </h2>
          <p className="ca-hs-bajada">Tu hora vale tu sueldo del mes dividido por tus horas del mes (días × horas × 4,33 semanas). Cada precio se divide por ese valor.</p>
        </div>
        <ul className="ca-hs-fuentes">
          {fuentes.map((i) => (
            <li key={`${i.fuente.url}|${i.fecha}`}>
              <p className="ca-hs-fuente-titulo">
                {i.fuente.organismo}: {i.fuente.titulo}
              </p>
              <p>
                {d.items
                  .filter((x) => x.fuente.url === i.fuente.url && x.fecha === i.fecha)
                  .map((x) => `${mayuscula(x.corto)} (${x.cantidad}): ${pesos.format(x.monto)}`)
                  .join(" · ")}
              </p>
              <p className="ca-hs-fuente-fecha">
                Dato de {i.fecha}. {i.nota ?? ""}
              </p>
              <a href={i.fuente.url} rel="nofollow noopener" target="_blank">
                Ver la fuente
                <svg viewBox="0 0 16 16" aria-hidden="true" width="14" height="14">
                  <path d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5 7 9" />
                </svg>
              </a>
            </li>
          ))}
          {d.minimo ? (
            <li>
              <p className="ca-hs-fuente-titulo">Boletín Oficial: {d.minimo.nombre}</p>
              <p>{pesos.format(d.minimo.porHora)} la hora. Es el valor que usamos hasta que pongas tu sueldo.</p>
              <a href={d.minimo.url} rel="nofollow noopener" target="_blank">
                Ver la resolución
                <svg viewBox="0 0 16 16" aria-hidden="true" width="14" height="14">
                  <path d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5 7 9" />
                </svg>
              </a>
            </li>
          ) : null}
        </ul>
        <p className="ca-hs-sello">Un precio que queda viejo se deja de mostrar solo. Los del INDEC valen tres meses después del mes del dato; la nafta, 45 días.</p>
      </section>

      <section className="ca-hs-faq" aria-labelledby="ca-hs-faq-titulo">
        <h2 id="ca-hs-faq-titulo" className="ca-hs-h2">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 space-y-3">
          {faq.map((f) => (
            <details key={f.pregunta} className="ca-acordeon group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">{f.pregunta}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.respuesta}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-600">
          ¿No sabés cuánto te queda en mano?{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 underline decoration-emerald-700/40 underline-offset-4 hover:decoration-current">
            Calculá tu sueldo neto
          </Link>{" "}
          y volvé con el número.
        </p>
      </section>
    </article>
  );
}
