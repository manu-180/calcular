import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { grillaMundo } from "@/lib/mundo/grilla";
import { hoyAR } from "@/lib/hoy";
import { ORGANIZACION } from "@/lib/schema";
import { NOMBRE_SITIO } from "@/lib/seo";
import { formatearFecha } from "@/motor/formato";
import { textosMundo, type PreguntaMundo } from "@/motor/i18n/mundo";
import { codificarCarga, diaDeCarga, normalizarCarga } from "@/motor/mundo/calculo";
import { RUTA_MUNDO_AR } from "@/motor/mundo/rutas";
import type { CargaCompartida, GrillaMundo } from "@/motor/mundo/tipos";
import { compactar, type GrillaCliente } from "@/motor/mundo/ui/compacta";
import { textosRedes } from "@/motor/i18n/redes";
import { MundoCliente, type MarcaMundo } from "@/motor/mundo/ui/MundoCliente";
import { textosCliente } from "@/motor/mundo/ui/textos-cliente";
import { origenAR, origenIntl } from "@/motor/sitio";
import type { FechaISO } from "@/motor/tipos";
import "@/motor/mundo/ui/estilos-mundo.css";
import "./estilos-ar.css";

// «Tu sueldo en el mundo» en calcular.ar: el mismo comparador de calcularya con Argentina como país de
// origen, voseo y la marca del sitio. /sueldo-en-el-mundo es la página y /sueldo-en-el-mundo/<c> el duelo
// (el `c` de un link compartido, la misma forma canónica que en calcularya).

const LOCALE = "es-AR";
export const MARCA_AR: MarcaMundo = { nombre: NOMBRE_SITIO, dominio: "calcular.ar" };
const TITULO = "Día de libertad tributaria: tu sueldo en el mundo";

const t = textosMundo("es", "vos", LOCALE);

function grilla(): GrillaMundo | null {
  try {
    const g = grillaMundo();
    return g.paises.length ? g : null;
  } catch (err) {
    console.error("[mundo ar] no se pudo leer la grilla", err);
    return null;
  }
}

const urlBase = () => `${origenAR()}${RUTA_MUNDO_AR}`;

// La fila argentina queda en este sitio; las demás llevan a la calculadora de su país en calcularya.
function clienteAR(g: GrillaMundo): GrillaCliente {
  const c = compactar(g, LOCALE, origenAR());
  const intl = origenIntl() ?? "https://calcularya.com";
  const porMercado = new Map(g.paises.map((p) => [p.mercado, p]));
  return {
    ...c,
    paises: c.paises.map((p) => {
      const original = porMercado.get(p.mercado);
      const href = original?.sitio === "ar" ? original.ruta : `${intl}${original?.ruta ?? ""}`;
      return { ...p, href };
    }),
  };
}

function origenDe(g: GrillaMundo): string {
  return (g.paises.find((p) => p.mercado === "ar") ?? g.paises.find((p) => p.iso === "US") ?? g.paises[0]).mercado;
}

function mesesDe(anio: number): string[] {
  const f = new Intl.DateTimeFormat(LOCALE, { month: "short", timeZone: "UTC" });
  return Array.from({ length: 12 }, (_, m) => f.format(new Date(Date.UTC(anio, m, 15))).replace(/\.$/, ""));
}

function fechaCorta(dia: number, anio: number): string {
  return new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(anio, 0, dia)));
}

function descripcion(n: number): string {
  return `Mirá hasta qué día del año trabajás para el Estado con tu sueldo argentino y cuánto te quedaría en mano en ${n} países, con el mismo poder de compra.`;
}

function preguntas(n: number): PreguntaMundo[] {
  // La segunda del diccionario (por qué en poder de compra) la reemplaza la del dólar oficial y el blue.
  const [primera, , ...resto] = t.faq(n);
  return [
    primera,
    {
      pregunta: "¿Cómo se calcula el sueldo argentino?",
      respuesta:
        "Con la misma cuenta de la calculadora de sueldo neto de calcular.ar: 17 % de aportes con el tope SIPA y Ganancias estimada sobre el año, para una persona soltera, sin hijos y sin cuota sindical. El año tiene 13 pagas porque se suma el aguinaldo.",
    },
    {
      pregunta: "¿Por qué no se usa el dólar oficial ni el blue?",
      respuesta:
        "Porque el tipo de cambio se mueve todas las semanas y no dice cuánto se compra con un sueldo. Usamos la paridad de poder adquisitivo del Banco Mundial, llevada a hoy con el IPC del INDEC: compara niveles de vida, no cotizaciones.",
    },
    ...resto,
  ];
}

type Resuelto = { grilla: GrillaMundo; carga: CargaCompartida | null; canonica: boolean };

// El `c` llega decodificado y la forma canónica solo usa [a-zA-Z0-9.-]. Una carga válida que no es la
// canónica va con 308 a la canónica; una inválida es 404: cada tarjeta tiene una sola URL en caché.
function resolver(c: string | undefined): Resuelto | null {
  const g = grilla();
  if (!g) return null;
  if (c === undefined) return { grilla: g, carga: null, canonica: true };
  const n = normalizarCarga(c, g);
  return n ? { grilla: g, carga: n.carga, canonica: n.canonica } : null;
}

export function metadataMundoAR(c?: string): Metadata {
  const r = resolver(c);
  if (!r || !r.canonica) return {};
  const n = r.grilla.paises.length;
  const codigo = r.carga ? codificarCarga(r.carga) : null;
  const description = descripcion(n);
  const base: Metadata = {
    title: { absolute: TITULO },
    description,
    alternates: { canonical: RUTA_MUNDO_AR },
    openGraph: {
      type: "website",
      siteName: NOMBRE_SITIO,
      locale: "es_AR",
      url: RUTA_MUNDO_AR,
      title: TITULO,
      description,
      images: [{ url: `${RUTA_MUNDO_AR}/og${codigo ? `?c=${codigo}` : ""}`, width: 1200, height: 630 }],
    },
  };
  if (!r.carga || !codigo) return base;
  const anio = Number(hoyAR().slice(0, 4));
  const dia = diaDeCarga(r.carga, anio);
  const titulo = dia > 0 ? t.tarjeta.texto(fechaCorta(dia, anio)) : t.cero.texto;
  return {
    ...base,
    title: { absolute: titulo },
    robots: { index: false, follow: true },
    openGraph: { ...base.openGraph, url: `${RUTA_MUNDO_AR}/${codigo}`, title: titulo },
  };
}

const iso = (s: string) => s as FechaISO;

export function PaginaMundoAR({ c }: { c?: string }) {
  const r = resolver(c);
  if (!r) notFound();
  if (r.carga && !r.canonica) permanentRedirect(`${RUTA_MUNDO_AR}/${codificarCarga(r.carga)}`);
  const { grilla: g, carga } = r;
  const anio = Number(hoyAR().slice(0, 4));
  const cliente = clienteAR(g);
  const n = cliente.paises.length;
  const faq = preguntas(n);
  const fuente = g.fuentePpa;
  const masVieja = [...g.paises.map((p) => p.datosVerificadosEl)].sort()[0];
  const fuentes = [...cliente.paises].sort((a, b) => a.nombre.localeCompare(b.nombre, LOCALE));
  const url = urlBase();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: t.nombre,
        url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: `${url}/og`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: LOCALE,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })),
      },
    ],
  };

  return (
    <article className="ca-mundo cy-mundo" data-sin-herramientas="">
      <JsonLd data={jsonLd} />
      <header className="cy-mundo-cabeza" data-duelo={carga ? "" : undefined}>
        <p className="cy-mundo-ceja">
          <span className="cy-punto-vivo" aria-hidden="true" />
          {t.ceja}
        </p>
        <h1 className="cy-mundo-h1">{t.h1}</h1>
        <p className="cy-mundo-intro">{t.bajada(n)}</p>
      </header>

      <MundoCliente
        grilla={cliente}
        textos={textosCliente(t, cliente.paises)}
        locale={LOCALE}
        anio={anio}
        origenInicial={origenDe(g)}
        meses={mesesDe(anio)}
        base={url}
        carga={carga}
        redes={textosRedes("es", "vos", LOCALE)}
        conCuadrado={false}
        marca={MARCA_AR}
      />

      <section className="cy-mundo-metodo" aria-labelledby="cy-mundo-metodo-titulo">
        <div className="cy-mundo-seccion-cabeza">
          <h2 id="cy-mundo-metodo-titulo" className="cy-mundo-h2">
            {t.metodo.titulo}
          </h2>
          <p className="cy-mundo-bajada">{t.metodo.estimacion}</p>
        </div>
        <ul className="cy-mundo-supuestos">
          {t.metodo.supuestos.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="cy-mundo-fuentes">
          <div className="cy-mundo-ppa">
            <p className="cy-mundo-ppa-titulo">{t.metodo.ppaTitulo}</p>
            <p>{t.metodo.ppa(fuente.organismo || t.metodo.bancoMundial, fuente.indicador, String(fuente.anio))}</p>
            {fuente.consultadoEl ? <p className="cy-mundo-ppa-fecha">{t.metodo.consultado(formatearFecha(iso(fuente.consultadoEl), LOCALE))}</p> : null}
            {fuente.url.startsWith("https://") ? (
              <a className="cy-mundo-enlace-fuente" href={fuente.url} rel="nofollow noopener" target="_blank">
                {t.metodo.verFuente}
                <svg viewBox="0 0 16 16" aria-hidden="true" width="14" height="14">
                  <path d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5 7 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : null}
          </div>
          <details className="ca-acordeon cy-mundo-paises-fuente">
            <summary>{t.metodo.fuentesTitulo}</summary>
            <p>{t.metodo.fuentesBajada}</p>
            <ul>
              {fuentes.map((p) => (
                <li key={p.mercado}>
                  <a href={p.href}>
                    <img className="cy-bandera" src={`/banderas/${p.iso.toLowerCase()}.svg`} width={18} height={12} alt="" loading="lazy" decoding="async" />
                    <span>{p.nombre}</span>
                  </a>
                  <time dateTime={p.verificadoEl}>{t.metodo.verificado(formatearFecha(iso(p.verificadoEl), LOCALE))}</time>
                </li>
              ))}
            </ul>
          </details>
        </div>
        {masVieja ? (
          <p className="cy-mundo-sello">
            <span className="cy-punto-vivo" aria-hidden="true" />
            {t.metodo.sello(formatearFecha(iso(masVieja), LOCALE))}
          </p>
        ) : null}
      </section>

      <section className="ca-mundo-faq" aria-labelledby="ca-mundo-faq-titulo">
        <h2 id="ca-mundo-faq-titulo" className="cy-mundo-h2">
          {t.faqTitulo}
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
          ¿Querés el detalle de tu recibo, con cuota sindical, cargas de familia y Ganancias?{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 underline decoration-emerald-700/40 underline-offset-4 hover:decoration-current">
            Calculadora de sueldo neto
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
