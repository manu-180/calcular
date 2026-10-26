import { etiquetaIdioma } from "../../i18n/direccion";
import type { TextosSueldos } from "../../i18n/sueldos";
import type { Idioma } from "../../tipos";
import { JsonLd } from "../../ui/Sitio";
import { EXPERIENCIAS, OCUPACIONES, type Ocupacion } from "../catalogo";
import { TRAMOS, type AgregadosPais, type OcupacionPublica, type TramoPublicado } from "../tipos";
import { dinero, lugares, mesLegible, rellenar } from "./comun";
import { BarraRango } from "./piezas";
import "../../mundo/ui/estilos-mundo.css";
import "./estilos-sueldos.css";

// «Sueldos reales» de un país: solo lo que la base publica (celdas con K aportes o más), con la fecha y
// la metodología. Sin datos (la base no respondió o ninguna celda llegó a K) la página igual se dibuja,
// con el llamado a aportar, y queda fuera del índice (lo decide quien la monta).

export interface PropsPaginaSueldos {
  t: TextosSueldos;
  idioma: Idioma;
  locale: string;
  nombrePais: string;
  moneda: string;
  datos: AgregadosPais | null;
  k: number;
  // Página del mundo de la edición, donde se carga el aporte.
  urlAporte: string;
  url: string;
}

type Fila = { o: Ocupacion; d: OcupacionPublica };

export function PaginaSueldos({ t, idioma, locale, nombrePais, moneda, datos, k, urlAporte, url }: PropsPaginaSueldos) {
  const tp = t.pagina;
  const { enPais } = lugares(idioma, nombrePais);
  const plata = (n: number) => dinero(n, datos?.moneda || moneda, locale);
  const filas: Fila[] = datos ? OCUPACIONES.flatMap((o) => (datos.ocupaciones[o] ? [{ o, d: datos.ocupaciones[o]! }] : [])) : [];
  const publicadas = filas.filter((f) => f.d.cifras).sort((a, b) => b.d.cifras!.p50 - a.d.cifras!.p50);
  // Las que tienen aportes pero no se publican: primero las que están cerca, después en el orden del idioma.
  const enCamino = filas
    .filter((f) => !f.d.cifras)
    .sort((a, b) => TRAMOS.indexOf(b.d.tramo) - TRAMOS.indexOf(a.d.tramo) || t.ocupaciones[a.o].localeCompare(t.ocupaciones[b.o], locale));
  const tramo = (x: string) => t.tramos[x as TramoPublicado] ?? "";
  const titulo = rellenar(tp.h1, { enPais, pais: nombrePais });
  const cifrasTabla = publicadas.flatMap(({ d }) => [d.cifras!, ...EXPERIENCIAS.flatMap((e) => (d.porExperiencia[e]?.cifras ? [d.porExperiencia[e]!.cifras!] : []))]);
  const tope = cifrasTabla.length ? { min: Math.min(...cifrasTabla.map((c) => c.p25)), max: Math.max(...cifrasTabla.map((c) => c.p75)) } : undefined;

  return (
    <article className="cy-pagina cy-su-pagina">
      {publicadas.length ? (
        <JsonLd
          datos={{
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: titulo,
            description: rellenar(tp.seoDescripcion, { enPais, pais: nombrePais, k }),
            url,
            inLanguage: etiquetaIdioma(locale),
            isAccessibleForFree: true,
            spatialCoverage: nombrePais,
            ...(datos?.desde && datos.hasta ? { temporalCoverage: `${datos.desde}/${datos.hasta}` } : {}),
            variableMeasured: tp.colMediana,
          }}
        />
      ) : null}

      <header className="cy-su-pagina-cabeza">
        <p className="cy-su-ceja">
          <span className="cy-punto-vivo" aria-hidden="true" />
          {tp.ceja}
        </p>
        <h1 className="cy-su-h1">{titulo}</h1>
        <p className="cy-su-intro">{rellenar(tp.bajada, { k })}</p>
        {publicadas.length && datos?.desde && datos.hasta ? (
          <p className="cy-su-sello">
            <span className="cy-punto-vivo" aria-hidden="true" />
            {rellenar(tp.actualizado, { desde: mesLegible(datos.desde, locale), hasta: mesLegible(datos.hasta, locale) })}
          </p>
        ) : null}
      </header>

      {publicadas.length ? (
        <section className="cy-su-seccion" aria-labelledby="cy-su-tabla-titulo">
          <div className="cy-su-cabeza">
            <h2 id="cy-su-tabla-titulo" className="cy-mundo-h2">
              {tp.tablaTitulo}
            </h2>
            <p className="cy-mundo-bajada">{rellenar(tp.tablaBajada, { moneda: datos?.moneda || moneda })}</p>
          </div>
          <div className="cy-su-tabla-marco">
            <div className="cy-su-tabla-nucleo">
              <table className="cy-su-tabla">
                <caption>{titulo}</caption>
                <thead>
                  <tr>
                    <th scope="col">{tp.colOcupacion}</th>
                    <th scope="col" className="cy-su-num">
                      {tp.colMediana}
                    </th>
                    <th scope="col" className="cy-su-ocultar-movil">
                      {tp.colRango}
                    </th>
                    <th scope="col" className="cy-su-ocultar-movil" aria-hidden="true" />
                    <th scope="col" className="cy-su-num">
                      {tp.colAportes}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {publicadas.flatMap(({ o, d }) => {
                    const c = d.cifras!;
                    const fila = (
                      <tr key={o}>
                        <th scope="row">{t.ocupaciones[o]}</th>
                        <td className="cy-su-num cy-su-mediana-celda">{plata(c.p50)}</td>
                        <td className="cy-su-rango-celda cy-su-ocultar-movil">{rellenar(tp.entre, { p25: plata(c.p25), p75: plata(c.p75) })}</td>
                        <td className="cy-su-barra-celda cy-su-ocultar-movil">
                          <BarraRango p25={c.p25} p50={c.p50} p75={c.p75} tope={tope} />
                        </td>
                        <td className="cy-su-num">{tramo(d.tramo)}</td>
                      </tr>
                    );
                    const subs = EXPERIENCIAS.flatMap((e) => {
                      const sub = d.porExperiencia[e];
                      const ce = sub?.cifras;
                      if (!sub || !ce) return [];
                      return [
                        <tr key={`${o}-${e}`} data-sub="">
                          <th scope="row">{t.experiencias[e]}</th>
                          <td className="cy-su-num">{plata(ce.p50)}</td>
                          <td className="cy-su-rango-celda cy-su-ocultar-movil">{rellenar(tp.entre, { p25: plata(ce.p25), p75: plata(ce.p75) })}</td>
                          <td className="cy-su-barra-celda cy-su-ocultar-movil">
                            <BarraRango p25={ce.p25} p50={ce.p50} p75={ce.p75} tope={tope} />
                          </td>
                          <td className="cy-su-num">{tramo(sub.tramo)}</td>
                        </tr>,
                      ];
                    });
                    return [fila, ...subs];
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <section className="cy-su-vacio" aria-labelledby="cy-su-vacio-titulo">
          <h2 id="cy-su-vacio-titulo">{tp.vacioTitulo}</h2>
          <p>{rellenar(tp.vacio, { k, enPais, pais: nombrePais })}</p>
          <a className="cy-su-boton cy-su-boton-claro" href={urlAporte}>
            <span>{tp.cta}</span>
            <span className="cy-su-boton-icono" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </section>
      )}

      {enCamino.length ? (
        <section className="cy-su-seccion" aria-labelledby="cy-su-camino-titulo">
          <div className="cy-su-cabeza">
            <h2 id="cy-su-camino-titulo" className="cy-mundo-h2">
              {tp.enCaminoTitulo}
            </h2>
            <p className="cy-mundo-bajada">{tp.enCaminoBajada}</p>
          </div>
          <ul className="cy-su-en-camino">
            {enCamino.map(({ o, d }) => (
              <li key={o}>
                {t.ocupaciones[o]}
                <span>{d.tramo === "cerca" ? tp.cerca : tp.lejos}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {publicadas.length ? (
        <div className="cy-su-cta">
          <a className="cy-su-boton" href={urlAporte}>
            <span>{tp.cta}</span>
            <span className="cy-su-boton-icono" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <p className="cy-su-nota">{tp.ctaBajada}</p>
        </div>
      ) : (
        <p className="cy-su-nota">{tp.ctaBajada}</p>
      )}

      <section className="cy-su-seccion" aria-labelledby="cy-su-metodo-titulo">
        <h2 id="cy-su-metodo-titulo" className="cy-mundo-h2">
          {tp.metodoTitulo}
        </h2>
        <ul className="cy-su-metodo">
          {tp.metodo.map((m) => (
            <li key={m}>{rellenar(m, { k })}</li>
          ))}
        </ul>
        <p className="cy-su-aviso-pagina">{tp.aviso}</p>
      </section>
    </article>
  );
}
