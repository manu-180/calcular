import { etiquetaIdioma } from "../../i18n/direccion";
import type { CSSProperties } from "react";
import { textosMundo } from "../../i18n/mundo";
import { textosRankings, type TextosRankings } from "../../i18n/rankings";
import { rutaMundo } from "../../mundo/rutas";
import type { GrillaMundo } from "../../mundo/tipos";
import { grafo, ldLista, ldMigas, ldPagina, origenPublicoIntl, rutaIntl, urlIntl } from "../../seo";
import { origenAR } from "../../sitio";
import type { ContextoSitio } from "../../ui/contexto";
import { IconoExterno, IconoFlecha } from "../../ui/Iconos";
import { JsonLd, Migas } from "../../ui/Sitio";
import type { FechaISO } from "../../tipos";
import { NIVELES_DATOS } from "../calculo";
import { altosFranja } from "../franja";
import { rutaDatos } from "../rutas";
import { formatoFecha, hrefDe, nivelesFormateados, nombreMundo, nombrePais, rutaIndice, rutaRanking, urlIndice, type VistaRanking } from "../vista";
import { RankingCliente, type TextosRankingCliente } from "./RankingCliente";
import "./estilos-rankings.css";

const iso = (s: string) => s as FechaISO;

function Cabeza({ ceja, h1, bajada, actualizado, fecha }: { ceja: string; h1: string; bajada: string; actualizado: string; fecha: string }) {
  return (
    <header className="cy-rk-cabeza">
      <p className="cy-rk-ceja">
        <span className="cy-punto-vivo" aria-hidden="true" />
        <span>{ceja}</span>
        {fecha ? (
          <>
            <span className="cy-rk-ceja-sep" aria-hidden="true" />
            <time dateTime={fecha}>{actualizado}</time>
          </>
        ) : null}
      </p>
      <h1 className="cy-rk-h1">{h1}</h1>
      <p className="cy-rk-intro">{bajada}</p>
    </header>
  );
}

function Mundo({ ctx, t }: { ctx: ContextoSitio; t: TextosRankings }) {
  const m = ctx.mercado;
  return (
    <aside className="cy-rk-mundo" aria-labelledby="cy-rk-mundo-titulo">
      <div className="cy-rk-mundo-nucleo">
        <h2 id="cy-rk-mundo-titulo" className="cy-rk-h3">
          {t.mundo.titulo}
        </h2>
        <p>{t.mundo.texto(nombreMundo(m))}</p>
        <a className="cy-rk-boton cy-rk-boton-principal" href={rutaMundo(m.codigo, m.idioma)}>
          <span>{t.mundo.ir}</span>
          <span className="cy-rk-boton-icono" aria-hidden="true">
            <IconoFlecha />
          </span>
        </a>
      </div>
    </aside>
  );
}

function Fuentes({ ctx, grilla }: { ctx: ContextoSitio; grilla: GrillaMundo }) {
  const m = ctx.mercado;
  const tm = textosMundo(m.idioma, m.trato, m.locale);
  const fuente = grilla.fuentePpa;
  const organismo = fuente.organismo === "Banco Mundial" ? tm.metodo.bancoMundial : fuente.organismo;
  const ar = origenAR();
  const paises = [...grilla.paises].map((p) => ({ p, nombre: nombrePais(p, m.locale) })).sort((a, b) => a.nombre.localeCompare(b.nombre, m.locale));
  return (
    <div className="cy-rk-fuentes">
      <div className="cy-rk-ppa">
        <p className="cy-rk-ppa-titulo">{tm.metodo.ppaTitulo}</p>
        <p>{tm.metodo.ppa(organismo, fuente.indicador, String(fuente.anio))}</p>
        {fuente.consultadoEl ? <p className="cy-rk-suave">{tm.metodo.consultado(formatoFecha(fuente.consultadoEl, m.locale, true))}</p> : null}
        {fuente.url.startsWith("https://") ? (
          <a className="cy-rk-enlace" href={fuente.url} rel="noopener" target="_blank">
            {tm.metodo.verFuente}
            <IconoExterno />
          </a>
        ) : null}
      </div>
      <details className="ca-acordeon cy-rk-paises-fuente">
        <summary>{tm.metodo.fuentesTitulo}</summary>
        <p>{tm.metodo.fuentesBajada}</p>
        <ul>
          {paises.map(({ p, nombre }) => (
            <li key={p.mercado}>
              <a href={hrefDe(p, ar)}>
                <img className="cy-bandera" src={`/banderas/${p.iso.toLowerCase()}.svg`} width={18} height={12} alt="" loading="lazy" decoding="async" />
                <span>{nombre}</span>
              </a>
              <time dateTime={p.datosVerificadosEl}>{tm.metodo.verificado(formatoFecha(p.datosVerificadosEl, m.locale, true))}</time>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function textosCliente(t: TextosRankings, vista: VistaRanking): TextosRankingCliente {
  const tr = t.rankings[vista.id];
  return {
    puesto: t.tabla.puesto,
    pais: t.tabla.pais,
    metrica: tr.metrica,
    carga: tr.carga,
    unidad: vista.id === "rinde" ? t.tabla.unidad : null,
    cambio: vista.mesAnterior ? t.cambio.titulo(vista.mesAnterior) : null,
    de: t.de(vista.total),
    edicion: t.tabla.edicion,
    lider: t.lider,
    kit: {
      titulo: t.kit.titulo,
      bajada: t.kit.bajada,
      compartir: t.kit.compartir,
      descargar: t.kit.descargar,
      copiar: t.kit.copiar,
      copiado: t.kit.copiado,
      enlace: t.kit.enlace,
      compartido: t.kit.compartido,
      error: t.kit.error,
      alt: t.kit.alt(tr.titulo),
    },
  };
}

function Tarjeta({ vista, ctx, t, grande }: { vista: VistaRanking; ctx: ContextoSitio; t: TextosRankings; grande: boolean }) {
  const v = vista.variantes[vista.porDefecto];
  const d = v.destacado;
  return (
    <a className="cy-rk-tarjeta" href={rutaRanking(ctx.mercado, vista.id)} data-grande={grande ? "" : undefined}>
      <span className="cy-rk-tarjeta-nucleo">
        <span className="cy-rk-tarjeta-ceja">{v.etiqueta} · {v.sub}</span>
        <span className="cy-rk-tarjeta-titulo">{vista.titulo}</span>
        <span className="cy-rk-tarjeta-dato">
          <img className="cy-bandera" src={`/banderas/${d.iso.toLowerCase()}.svg`} width={24} height={16} alt="" loading="lazy" decoding="async" />
          <span className="cy-rk-tarjeta-puesto">{d.puesto}</span>
          <span className="cy-rk-tarjeta-de">{t.de(d.total)}</span>
        </span>
        <span className="cy-rk-tarjeta-frase">
          {d.nombre} · {d.valor}
        </span>
        <span className="cy-rk-franja cy-rk-franja-clara" aria-hidden="true">
          {altosFranja(v.filas).map((h, i) => (
            <i key={v.filas[i].iso} data-propia={v.filas[i].iso === d.iso ? "" : undefined} style={{ "--h": h } as CSSProperties} />
          ))}
        </span>
        <span className="cy-rk-tarjeta-ir">
          {t.ver}
          <span className="cy-rk-boton-icono" aria-hidden="true">
            <IconoFlecha />
          </span>
        </span>
      </span>
    </a>
  );
}

function Otros({ vistas, ctx, t, actual }: { vistas: readonly VistaRanking[]; ctx: ContextoSitio; t: TextosRankings; actual: string }) {
  const otros = vistas.filter((v) => v.id !== actual);
  if (!otros.length) return null;
  return (
    <section className="cy-rk-otros" aria-labelledby="cy-rk-otros-titulo">
      <h2 id="cy-rk-otros-titulo" className="cy-rk-h2">
        {t.otros}
      </h2>
      <div className="cy-rk-tarjetas" data-cuantas={otros.length}>
        {otros.map((v) => (
          <Tarjeta key={v.id} vista={v} ctx={ctx} t={t} grande={false} />
        ))}
      </div>
    </section>
  );
}

export function PaginaRanking({ ctx, grilla, vista, vistas }: { ctx: ContextoSitio; grilla: GrillaMundo; vista: VistaRanking; vistas: readonly VistaRanking[] }) {
  const m = ctx.mercado;
  const t = textosRankings(m.idioma, m.trato, m.locale);
  const tr = t.rankings[vista.id];
  const v = vista.variantes[vista.porDefecto];
  const [b, me, a] = nivelesFormateados(m.locale);
  const origen = origenPublicoIntl();
  const absoluta = (href: string) => (href.startsWith("http") ? href : `${origen}${href}`);

  return (
    <article className="cy-pagina cy-rk">
      <JsonLd
        datos={grafo([
          ldPagina({
            url: vista.url,
            nombre: vista.titulo,
            descripcion: tr.descripcion(vista.total),
            locale: m.locale,
            actualizado: grilla.generadoEl ? iso(grilla.generadoEl) : undefined,
            imagen: absoluta(v.og),
            principal: ldLista(v.filas.map((f) => ({ nombre: f.nombre, url: absoluta(f.href) }))),
          }),
          ldMigas([
            { nombre: m.nombre, url: urlIntl(m.codigo) },
            { nombre: t.nombre, url: urlIndice(m) },
            { nombre: vista.titulo, url: vista.url },
          ]),
        ])}
      />
      <Migas
        etiqueta={ctx.textos.migas.etiqueta}
        items={[
          { nombre: m.codigo === "global" ? ctx.textos.migas.inicio : m.nombre, href: rutaIntl(m.codigo) },
          { nombre: t.nombre, href: rutaIndice(m) },
          { nombre: vista.corto },
        ]}
      />
      <Cabeza ceja={t.nombre} h1={vista.titulo} bajada={vista.bajada} actualizado={t.actualizado(vista.fecha)} fecha={vista.fechaIso} />
      {vista.fuera ? <p className="cy-rk-fuera">{vista.fuera}</p> : null}

      <RankingCliente vista={vista} textos={textosCliente(t, vista)} />

      <section className="cy-rk-metodo" aria-labelledby="cy-rk-metodo-titulo">
        <h2 id="cy-rk-metodo-titulo" className="cy-rk-h2">
          {t.metodo.titulo}
        </h2>
        <ul className="cy-rk-lista">
          <li>{tr.como}</li>
          <li>{t.metodo.niveles(b, me, a)}</li>
          <li>{t.metodo.empates}</li>
          <li>{t.metodo.historial}</li>
        </ul>
        <p className="cy-rk-enlaces">
          <a className="cy-rk-enlace" href={`${rutaIndice(m)}#metodologia`}>
            {t.metodo.ver}
          </a>
          <a className="cy-rk-enlace" href={rutaDatos("csv")}>
            {t.datos.csv}
          </a>
          <a className="cy-rk-enlace" href={rutaDatos("json")}>
            {t.datos.json}
          </a>
        </p>
      </section>

      <Otros vistas={vistas} ctx={ctx} t={t} actual={vista.id} />
      <Mundo ctx={ctx} t={t} />
    </article>
  );
}

export function PaginaIndice({ ctx, grilla, vistas }: { ctx: ContextoSitio; grilla: GrillaMundo; vistas: readonly VistaRanking[] }) {
  const m = ctx.mercado;
  const t = textosRankings(m.idioma, m.trato, m.locale);
  const tm = textosMundo(m.idioma, m.trato, m.locale);
  const n = grilla.paises.length;
  const url = urlIndice(m);
  const origen = origenPublicoIntl();
  const [b, me, a] = nivelesFormateados(m.locale);
  const dia = vistas[0]?.fechaIso ?? grilla.generadoEl;
  const fecha = dia ? formatoFecha(dia, m.locale, true) : "";
  const citaSugerida = `CalcularYa (${grilla.generadoEl.slice(0, 4)}). ${t.nombre}. ${url}`;
  const dataset = {
    "@type": "Dataset",
    "@id": `${origen}${rutaDatos("json")}#dataset`,
    name: t.seo.titulo[0],
    description: t.seo.descripcion(n),
    url,
    inLanguage: etiquetaIdioma(m.locale),
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Organization", name: "CalcularYa", url: `${origen}/` },
    ...(grilla.generadoEl ? { dateModified: grilla.generadoEl, temporalCoverage: grilla.generadoEl.slice(0, 4) } : {}),
    spatialCoverage: grilla.paises.map((p) => ({ "@type": "Country", name: nombrePais(p, "en"), identifier: p.iso })),
    variableMeasured: [
      { "@type": "PropertyValue", name: "Take-home pay", unitText: "international dollars (PPP) per year" },
      { "@type": "PropertyValue", name: "Effective rate of income tax and employee contributions", unitText: "share of gross pay" },
      { "@type": "PropertyValue", name: "Tax freedom day", unitText: "day of the year" },
    ],
    measurementTechnique: `Each country's official take-home pay calculator run at gross salaries of ${NIVELES_DATOS.join(", ")} international dollars a year (World Bank PPP, ${grilla.fuentePpa.indicador}).`,
    distribution: [
      { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${origen}${rutaDatos("json")}` },
      { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${origen}${rutaDatos("csv")}` },
    ],
  };

  return (
    <article className="cy-pagina cy-rk">
      <JsonLd
        datos={grafo([
          ldPagina({ tipo: "CollectionPage", url, nombre: t.h1, descripcion: t.seo.descripcion(n), locale: m.locale, actualizado: grilla.generadoEl ? iso(grilla.generadoEl) : undefined }),
          dataset,
          ldMigas([
            { nombre: m.nombre, url: urlIntl(m.codigo) },
            { nombre: t.nombre, url },
          ]),
        ])}
      />
      <Migas etiqueta={ctx.textos.migas.etiqueta} items={[{ nombre: m.codigo === "global" ? ctx.textos.migas.inicio : m.nombre, href: rutaIntl(m.codigo) }, { nombre: t.nombre }]} />
      <Cabeza ceja={t.ceja} h1={t.h1} bajada={t.bajada(n)} actualizado={t.actualizado(fecha)} fecha={dia} />
      {vistas[0]?.fuera ? <p className="cy-rk-fuera">{vistas[0].fuera}</p> : null}

      <div className="cy-rk-tarjetas" data-cuantas={vistas.length}>
        {vistas.map((v, i) => (
          <Tarjeta key={v.id} vista={v} ctx={ctx} t={t} grande={i === 0} />
        ))}
      </div>

      <section className="cy-rk-datos" aria-labelledby="cy-rk-datos-titulo">
        <div className="cy-rk-datos-nucleo">
          <div className="cy-rk-datos-texto">
            <p className="cy-rk-ceja cy-rk-ceja-oscura">CC BY 4.0</p>
            <h2 id="cy-rk-datos-titulo" className="cy-rk-h2">
              {t.datos.titulo}
            </h2>
            <p>{t.datos.bajada}</p>
            <p className="cy-rk-suave">{t.datos.licencia}</p>
          </div>
          <div className="cy-rk-datos-acciones">
            <a className="cy-rk-boton cy-rk-boton-principal" href={rutaDatos("csv")}>
              <span>{t.datos.csv}</span>
              <span className="cy-rk-boton-icono" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M8 2.5v8M5 7.5l3 3 3-3M3 13.5h10" />
                </svg>
              </span>
            </a>
            <a className="cy-rk-boton" href={rutaDatos("json")}>
              <span>{t.datos.json}</span>
              <span className="cy-rk-boton-icono" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M8 2.5v8M5 7.5l3 3 3-3M3 13.5h10" />
                </svg>
              </span>
            </a>
            <div className="cy-rk-sugerida">
              <p className="cy-rk-sugerida-titulo">{t.datos.atribucion}</p>
              <p>
                <code>{citaSugerida}</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cy-rk-metodo" id="metodologia" aria-labelledby="cy-rk-metodo-indice">
        <h2 id="cy-rk-metodo-indice" className="cy-rk-h2">
          {t.metodo.titulo}
        </h2>
        <p className="cy-rk-intro">{t.metodo.bajada}</p>
        <ul className="cy-rk-lista">
          <li>{t.metodo.niveles(b, me, a)}</li>
          {tm.metodo.supuestos.map((s) => (
            <li key={s}>{s}</li>
          ))}
          {vistas.map((v) => (
            <li key={v.id}>
              <strong>{v.corto}.</strong> {t.rankings[v.id].como}
            </li>
          ))}
          <li>{t.metodo.empates}</li>
          <li>{t.metodo.historial}</li>
          <li>{t.metodo.actualizacion}</li>
        </ul>
        <Fuentes ctx={ctx} grilla={grilla} />
      </section>

      <Mundo ctx={ctx} t={t} />
    </article>
  );
}

