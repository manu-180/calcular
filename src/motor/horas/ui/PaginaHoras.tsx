import { formatearFecha } from "../../formato";
import { GRAMATICA } from "../../i18n/gramatica";
import { rellenarHoras, textosHoras, type TextosHoras } from "../../i18n/horas";
import { grafo, ldFaq, ldPagina, origenPublicoIntl } from "../../seo";
import type { ContextoSitio } from "../../ui/contexto";
import { IconoExterno } from "../../ui/Iconos";
import { JsonLd } from "../../ui/Sitio";
import type { FechaISO } from "../../tipos";
import { PRODUCTOS, productoDe, conArticulo, NOMBRE_TIENDA } from "../productos";
import { SLUG_HORAS } from "../rutas";
import type { ConversionHora, FilaHoras, IndiceHoras } from "../tipos";
import { datosCliente, nombreEnPagina } from "./datos-cliente";
import { formatoNumero, formatoPrecioConCodigo } from "./formato";
import { HorasCliente } from "./HorasCliente";
import { urlHoras } from "./seo";
import "./estilos-horas.css";

const iso = (s: string) => s as FechaISO;

// País inicial: el de la ruta (tarjeta compartida), el de la edición, o Estados Unidos en global.
export function paisInicialDe(indice: IndiceHoras, ctx: ContextoSitio, pedido: string | null): string {
  const propios = [pedido, ctx.mercado.pais?.toUpperCase(), "US"].filter((x): x is string => Boolean(x));
  return propios.find((p) => indice.filas.some((f) => f.iso === p)) ?? indice.filas[0]?.iso ?? "US";
}

export function mesDe(fecha: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${fecha}T12:00:00Z`));
}

function conversionTexto(t: TextosHoras, c: ConversionHora, locale: string): string {
  const n = (x: number | undefined) => formatoNumero(locale, x ?? 0, x !== undefined && x % 1 ? 1 : 0);
  const v = { h: n(c.horasSemana ?? c.horasDia), d: n(c.diasPagados ?? c.divisor), p: n(c.pagas) };
  const k = t.metodo.conversion;
  switch (c.tipo) {
    case "hora":
      return k.hora;
    case "mes":
      return rellenarHoras(c.pagas && c.pagas !== 12 ? k.mesPagas : k.mes, v);
    case "anio":
      return rellenarHoras(k.anio, v);
    case "semana":
      return rellenarHoras(k.semana, v);
    case "dia":
      return rellenarHoras(c.diasPagados ? k.diaPagado : k.dia, v);
    case "divisor":
      return rellenarHoras(k.divisor, v);
  }
}

function Enlace({ url, texto }: { url: string; texto: string }) {
  return url.startsWith("https://") ? (
    <a className="cy-horas-enlace-fuente" href={url} rel="noopener nofollow" target="_blank">
      {texto}
      <IconoExterno />
    </a>
  ) : null;
}

function FuentePais({ f, t, locale, idioma }: { f: FilaHoras; t: TextosHoras; locale: string; idioma: ContextoSitio["mercado"]["idioma"] }) {
  const m = f.minimo;
  const fecha = (x: string) => formatearFecha(iso(x), locale);
  return (
    <li>
      <p className="cy-horas-fuente-pais">
        <img className="cy-horas-bandera" src={`/banderas/${f.iso.toLowerCase()}.svg`} width={20} height={14} alt="" loading="lazy" decoding="async" />
        <strong>{nombreEnPagina(f.iso, idioma, locale)}</strong>
      </p>
      <dl>
        <div>
          <dt>{t.metodo.salario}</dt>
          <dd>
            {m.nombre} · {formatoPrecioConCodigo(locale, m.porHora, m.moneda)} / h · {conversionTexto(t, m.conversion, locale)} · {m.fuente.organismo}, {rellenarHoras(t.metodo.verificado, { fecha: fecha(m.fuente.verificadoEl) })}. <Enlace url={m.fuente.url} texto={t.metodo.verFuente} />
          </dd>
        </div>
        {m.jornada ? (
          <div>
            <dt>{t.metodo.jornada}</dt>
            <dd>
              {m.jornada.titulo} · {m.jornada.organismo}. <Enlace url={m.jornada.url} texto={t.metodo.verFuente} />
            </dd>
          </div>
        ) : null}
        {Object.values(f.celdas).map((c) => {
          const p = productoDe(c.producto);
          return (
            <div key={c.producto}>
              <dt>{p?.nombre ?? c.producto}</dt>
              <dd>
                {formatoPrecioConCodigo(locale, c.precio.monto, c.precio.moneda)} · {p ? NOMBRE_TIENDA[p.tienda] : ""} · {rellenarHoras(t.metodo.consultado, { fecha: fecha(c.precio.consultadoEl) })}. <Enlace url={c.precio.url} texto={t.metodo.verFuente} />
                {c.cambio ? (
                  <>
                    {" "}
                    {t.metodo.cambio}: {formatoNumero(locale, c.cambio.valor, 2)} {m.moneda} ({c.cambio.fuente.organismo}, {fecha(c.cambio.fecha)}). <Enlace url={c.cambio.fuente.url} texto={t.metodo.verFuente} />
                  </>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </li>
  );
}

export function PaginaHoras({ ctx, indice, producto, esIndice, pais, inicial, productos }: { ctx: ContextoSitio; indice: IndiceHoras; producto: string; esIndice: boolean; pais: string | null; inicial: string; productos: readonly string[] }) {
  const m = ctx.mercado;
  const t = textosHoras(m.idioma, m.trato, m.locale);
  const datos = datosCliente(indice, m.idioma, m.locale, productos);
  const n = indice.filas.length;
  const p = productoDe(producto) ?? PRODUCTOS[0];
  const url = urlHoras(m, esIndice || p.id === inicial ? undefined : p.id);
  const base = urlHoras(m);
  const nombrePais = m.codigo === "global" ? "" : nombreEnPagina(m.pais.toUpperCase(), m.idioma, m.locale);
  const descripcion = m.codigo === "global" ? rellenarHoras(t.seo.descripcionGlobal, { n }) : rellenarHoras(t.seo.descripcion, { en: GRAMATICA[m.idioma].en(nombrePais), n });
  const lecturas = indice.filas.flatMap((f) => Object.values(f.celdas).map((c) => c.precio.consultadoEl)).sort();
  const fuentes = [...indice.filas].sort((a, b) => nombreEnPagina(a.iso, m.idioma, m.locale).localeCompare(nombreEnPagina(b.iso, m.idioma, m.locale), m.locale));
  const h1 = esIndice ? t.h1 : rellenarHoras(t.h1Producto, { producto: conArticulo(p, m.idioma, m.locale) });
  const dataset = {
    "@type": "Dataset",
    name: t.nombre,
    description: descripcion,
    url,
    inLanguage: m.locale,
    ...(lecturas.length ? { dateModified: lecturas.at(-1), temporalCoverage: `${lecturas[0]}/${lecturas.at(-1)}` } : {}),
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: "CalcularYa", url: `${origenPublicoIntl()}/` },
    variableMeasured: ["hours of minimum wage work", "official retail price", "hourly minimum wage"],
    spatialCoverage: indice.filas.map((f) => ({ "@type": "Country", name: nombreEnPagina(f.iso, m.idioma, m.locale) })),
  };

  return (
    <article className="cy-pagina cy-horas">
      <JsonLd datos={grafo([ldPagina({ url, nombre: h1, descripcion, locale: m.locale, actualizado: lecturas.length ? iso(lecturas.at(-1)!) : undefined }), dataset, ldFaq(t.faq)])} />
      <header className="cy-horas-cabeza">
        <p className="cy-horas-ceja">
          <span className="cy-horas-reloj" aria-hidden="true" />
          {rellenarHoras(t.ceja, { mes: mesDe(indice.preciosActualizadosEl || ctx.fecha, m.locale) })}
        </p>
        <h1 className="cy-horas-h1">{h1}</h1>
        <p className="cy-horas-intro">{rellenarHoras(t.bajada, { n })}</p>
      </header>

      <HorasCliente datos={datos} t={t} locale={m.locale} productoInicial={p.id} productoIndice={inicial} paisInicial={paisInicialDe(indice, ctx, pais)} base={base} slug={SLUG_HORAS[m.idioma]} />

      <section className="cy-horas-metodo" aria-labelledby="cy-horas-metodo-titulo">
        <div className="cy-horas-seccion-cabeza">
          <h2 id="cy-horas-metodo-titulo" className="cy-horas-h2">
            {t.metodo.titulo}
          </h2>
          <p className="cy-horas-formula">{t.metodo.estimacion}</p>
        </div>
        <ul className="cy-horas-supuestos">
          {t.metodo.supuestos.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <details className="ca-acordeon cy-horas-fuentes">
          <summary>{t.metodo.fuentesTitulo}</summary>
          <p>{t.metodo.fuentesBajada}</p>
          <ul>
            {fuentes.map((f) => (
              <FuentePais key={f.iso} f={f} t={t} locale={m.locale} idioma={m.idioma} />
            ))}
          </ul>
        </details>
        {lecturas.length ? (
          <p className="cy-horas-sello">
            <span className="cy-horas-reloj" aria-hidden="true" />
            {rellenarHoras(t.metodo.sello, { desde: formatearFecha(iso(lecturas[0]), m.locale), hasta: formatearFecha(iso(lecturas.at(-1)!), m.locale) })}
          </p>
        ) : null}
      </section>

      <section className="cy-seccion cy-preguntas cy-horas-faq" aria-labelledby="cy-horas-faq">
        <h2 id="cy-horas-faq" className="cy-horas-h2">
          {t.faqTitulo}
        </h2>
        <div className="cy-preguntas-lista">
          {t.faq.map((q) => (
            <details key={q.pregunta} className="ca-acordeon">
              <summary>{q.pregunta}</summary>
              <p>{q.respuesta}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
