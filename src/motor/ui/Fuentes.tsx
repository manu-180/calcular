import { formatearFecha, formatearNumero, formatearPorcentaje, formatearValorUnidad } from "../formato";
import { rutaIntl } from "../seo";
import type { Dato, FilaEscala, Fuente, Mercado } from "../tipos";
import { Bandera } from "./Bandera";
import { calculadorasDe, tarjetaDe, type ContextoSitio } from "./contexto";
import { IconoExterno } from "./Iconos";
import { ldPaginaDeMercado } from "./metadatos";
import { AvisoDePais, JsonLd, Migas } from "./Sitio";

function Valor({ dato, valor, m, tramos }: { dato: Dato; valor: unknown; m: Mercado; tramos: (n: number) => string }) {
  if (typeof valor === "number") return <>{formatearValorUnidad(valor, dato.unidad, m.locale, m.simbolos)}</>;
  if (Array.isArray(valor)) {
    const filas = valor as FilaEscala[];
    const fmt = (n: number) => formatearValorUnidad(n, dato.unidad, m.locale, m.simbolos);
    return (
      <details className="cy-escala">
        <summary>{tramos(filas.length)}</summary>
        <table>
          <tbody>
            {filas.map((f) => (
              <tr key={f.desde}>
                <td>{f.hasta === null ? `${fmt(f.desde)} +` : `${fmt(f.desde)} / ${fmt(f.hasta)}`}</td>
                <td>{formatearPorcentaje(f.tasa, m.locale)}</td>
                {f.cuotaFija ? <td>{formatearNumero(f.cuotaFija, m.locale, 2)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    );
  }
  if (valor && typeof valor === "object") {
    return (
      <ul className="cy-mapa">
        {Object.entries(valor as Record<string, number>).map(([k, n]) => (
          <li key={k}>
            <span>{dato.etiquetas?.[k] ?? k}</span> {formatearValorUnidad(n, dato.unidad, m.locale, m.simbolos)}
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

function EnlaceFuente({ f }: { f: Fuente }) {
  return f.url.startsWith("https://") ? (
    <a href={f.url} rel="noopener" target="_blank" className="cy-fuente-enlace">
      <span>{f.organismo}</span>
      <span className="cy-sello-documento">{f.titulo}</span>
      <IconoExterno />
    </a>
  ) : (
    <span>{f.organismo}</span>
  );
}

export function PaginaFuentes({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const m = ctx.mercado;
  const fichas = ctx.registro.fichas(m.codigo, ctx.fecha);
  const series = ctx.registro.fichasSeries(m.codigo, ctx.fecha);
  const region = (id?: string) => (id ? (m.regiones?.find((r) => r.id === id)?.nombre ?? id) : null);
  const titulo = t.fuentes.titulo(m.nombre);
  return (
    <div className="cy-pagina cy-fuentes">
      <JsonLd datos={ldPaginaDeMercado(ctx, { tipo: "fuentes" })} />
      <Migas etiqueta={t.migas.etiqueta} items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: titulo }]} />
      <header className="cy-heroe cy-heroe-chico">
        <p className="cy-ceja">
          <Bandera pais={m.pais} ancho={18} />
          {m.nombre}
        </p>
        <h1 className="cy-titular">{titulo}</h1>
        <p className="cy-bajada">{t.fuentes.bajada}</p>
      </header>

      <ul className="cy-fichas">
        {fichas.map(({ dato, vigentes }) => (
          <li key={dato.id} className="cy-ficha">
            <h2 className="cy-ficha-nombre">{dato.nombre}</h2>
            {vigentes.length ? (
              vigentes.map((v) => (
                <dl key={v.region ?? "unica"} className="cy-ficha-datos">
                  {region(v.region) ? (
                    <div>
                      <dt>{t.fuentes.region}</dt>
                      <dd>{region(v.region)}</dd>
                    </div>
                  ) : null}
                  <div className="cy-ficha-valor">
                    <dt>{t.fuentes.vigente}</dt>
                    <dd>
                      <Valor dato={dato} valor={v.valor} m={m} tramos={t.fuentes.tramos} />
                    </dd>
                  </div>
                  <div>
                    <dt>{t.fuentes.desde}</dt>
                    <dd>{formatearFecha(v.desde, m.locale)}</dd>
                  </div>
                  {v.hasta ? (
                    <div>
                      <dt>{t.fuentes.hasta}</dt>
                      <dd>{formatearFecha(v.hasta, m.locale)}</dd>
                    </div>
                  ) : null}
                  <div className="cy-ficha-fuente">
                    <dt>{t.fuentes.fuente}</dt>
                    <dd>
                      <EnlaceFuente f={v.fuente} />
                    </dd>
                  </div>
                  <div>
                    <dt>{t.fuentes.verificado}</dt>
                    <dd>{formatearFecha(v.fuente.verificadoEl, m.locale)}</dd>
                  </div>
                </dl>
              ))
            ) : (
              <p className="cy-vacio">{t.fuentes.sinVerificar}</p>
            )}
          </li>
        ))}
      </ul>

      {series.length ? (
        <section aria-labelledby="cy-series">
          <h2 id="cy-series" className="cy-seccion-titulo">
            {t.fuentes.series}
          </h2>
          <ul className="cy-fichas">
            {series.map(({ serie: s, vigente: punto, ultimo }) => {
              const adelantado = ultimo && punto && ultimo.fecha > punto.fecha ? ultimo : null;
              return (
                <li key={s.id} className="cy-ficha">
                  <h3 className="cy-ficha-nombre">{s.nombre}</h3>
                  <dl className="cy-ficha-datos">
                    {punto ? (
                      <>
                        <div className="cy-ficha-valor">
                          <dt>{t.fuentes.vigente}</dt>
                          <dd>{formatearValorUnidad(punto.valor, s.unidad, m.locale, m.simbolos)}</dd>
                        </div>
                        <div>
                          <dt>{t.fuentes.ultimoDato}</dt>
                          <dd>{formatearFecha(punto.fecha, m.locale)}</dd>
                        </div>
                        {adelantado ? (
                          <p className="cy-ficha-nota">
                            {t.fuentes.proximo(formatearValorUnidad(adelantado.valor, s.unidad, m.locale, m.simbolos), formatearFecha(adelantado.fecha, m.locale))}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <div>
                        <dt>{t.fuentes.vigente}</dt>
                        <dd>{t.fuentes.sinVerificar}</dd>
                      </div>
                    )}
                    <div className="cy-ficha-fuente">
                      <dt>{t.fuentes.fuente}</dt>
                      <dd>
                        <EnlaceFuente f={s.fuente} />
                      </dd>
                    </div>
                  </dl>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
      <AvisoDePais ctx={ctx} />
    </div>
  );
}

export function PaginaNovedades({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const m = ctx.mercado;
  const novedades = [...(ctx.registro.pais(m.codigo)?.novedades ?? [])].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const titulo = t.novedades.titulo(m.nombre);
  const publicadas = calculadorasDe(ctx, m);
  const nombreCalc = (id: string) => publicadas.find((c) => c.definicion.id === id);
  return (
    <div className="cy-pagina cy-novedades">
      <JsonLd datos={ldPaginaDeMercado(ctx, { tipo: "novedades" })} />
      <Migas etiqueta={t.migas.etiqueta} items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: titulo }]} />
      <header className="cy-heroe cy-heroe-chico">
        <p className="cy-ceja">
          <Bandera pais={m.pais} ancho={18} />
          {m.nombre}
        </p>
        <h1 className="cy-titular">{titulo}</h1>
        <p className="cy-bajada">{t.novedades.bajada}</p>
      </header>
      {novedades.length ? (
        <ol className="cy-linea-tiempo cy-linea-tiempo-grande">
          {novedades.map((n) => (
            <li key={n.id}>
              <time dateTime={n.fecha}>{formatearFecha(n.fecha, m.locale)}</time>
              <h2 className="cy-novedad-titulo">{n.titulo}</h2>
              <p>{n.texto}</p>
              <p className="cy-novedad-meta">
                {n.vigenteDesde ? <span>{t.novedades.vigenteDesde(formatearFecha(n.vigenteDesde, m.locale))}</span> : null}
                <EnlaceFuente f={n.fuente} />
              </p>
              {n.calculadoras.length ? (
                <ul className="cy-novedad-calcs">
                  {n.calculadoras.map((id) => {
                    const c = nombreCalc(id);
                    return c ? (
                      <li key={id}>
                        <a href={rutaIntl(m.codigo, c.definicion.slug)}>{tarjetaDe(ctx, m, c).titulo}</a>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="cy-vacio">{t.novedades.vacio}</p>
      )}
      <AvisoDePais ctx={ctx} />
    </div>
  );
}
