import type { CSSProperties } from "react";
import { formatearFecha } from "../formato";
import { rutaIntl } from "../seo";
import { hoyEn } from "../vigencia";
import { Bandera } from "./Bandera";
import { calculadorasDe, porCategoria, tarjetaDe, type ContextoSitio } from "./contexto";
import { IconoFlecha, IconoSello } from "./Iconos";
import { ldInicioGlobal, ldInicioPais } from "./metadatos";
import { AvisoDePais, JsonLd } from "./Sitio";

// Un país de otro sitio en la grilla (Argentina vive en calcular.ar): mismo formato, link absoluto.
export interface PaisExterno {
  codigo: string;
  nombre: string;
  pais: string;
  locale: string;
  href: string;
  calculadoras: number;
}

export function InicioGlobal({ ctx, externos = [] }: { ctx: ContextoSitio; externos?: readonly PaisExterno[] }) {
  const t = ctx.textos;
  const tarjetas = [
    ...ctx.paises.map((m) => ({ codigo: m.codigo, nombre: m.nombre, pais: m.pais, locale: m.locale, href: rutaIntl(m.codigo), calculadoras: calculadorasDe(ctx, m).length })),
    ...externos,
  ].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  return (
    <div className="cy-pagina cy-inicio">
      <JsonLd datos={ldInicioGlobal(ctx)} />
      <header className="cy-heroe">
        <p className="cy-pildora">{t.global.eyebrow}</p>
        <h1 className="cy-display">{t.global.titulo}</h1>
        <p className="cy-bajada">{t.global.bajada}</p>
      </header>

      <section className="cy-paises" aria-labelledby="cy-paises-titulo">
        <h2 id="cy-paises-titulo" className="cy-seccion-titulo">
          {t.global.elegir}
        </h2>
        {ctx.paises.length ? (
          <ul className="cy-paises-grilla">
            {tarjetas.map((m, i) => {
              return (
                <li key={m.codigo} style={{ "--i": i } as CSSProperties}>
                  <a className="cy-pais" href={m.href} hrefLang={m.locale}>
                    <span className="cy-pais-bandera">
                      <Bandera pais={m.pais} ancho={36} />
                    </span>
                    <span className="cy-pais-nombre">{m.nombre}</span>
                    <span className="cy-pais-cuenta">{t.global.calculadoras(m.calculadoras)}</span>
                    <span className="cy-boton-icono">
                      <IconoFlecha />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="cy-vacio">{t.global.vacio}</p>
        )}
      </section>

      <section className="cy-promesas" aria-labelledby="cy-promesas-titulo">
        <h2 id="cy-promesas-titulo" className="cy-seccion-titulo">
          {t.global.promesaTitulo}
        </h2>
        <ol>
          {t.global.promesas.map((p) => (
            <li key={p.titulo}>
              <p className="cy-promesa-titulo">{p.titulo}</p>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>
      <AvisoDePais ctx={ctx} />
    </div>
  );
}

export function InicioPais({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const m = ctx.mercado;
  const entradas = calculadorasDe(ctx, m);
  const grupos = porCategoria(entradas);
  const pais = ctx.registro.pais(m.codigo);
  const novedades = [...(pais?.novedades ?? [])].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);
  const revisiones = ctx.registro
    .fichas(m.codigo, hoyEn(m))
    .flatMap((f) => f.vigentes.map((v) => v.fuente.verificadoEl))
    .sort();
  const ultimaRevision = revisiones.at(-1);

  return (
    <div className="cy-pagina cy-inicio-pais">
      <JsonLd datos={ldInicioPais(ctx)} />
      <header className="cy-heroe cy-heroe-pais">
        <p className="cy-ceja">
          <Bandera pais={m.pais} ancho={22} />
          {m.nombre}
        </p>
        <h1 className="cy-display">{t.pais.titulo(m.nombre)}</h1>
        <p className="cy-bajada">{t.pais.bajada(m.nombre)}</p>
        {ultimaRevision ? (
          <a className="cy-pildora cy-pildora-sello" href={rutaIntl(m.codigo, "fuentes")}>
            <IconoSello />
            {t.pais.eyebrow}
            <time className="cy-pildora-fecha" dateTime={ultimaRevision}>
              {formatearFecha(ultimaRevision, m.locale)}
            </time>
          </a>
        ) : null}
      </header>

      <div className="cy-inicio-pais-cuerpo">
        <div className="cy-categorias">
          {grupos.length ? (
            grupos.map((g) => (
              <section key={g.categoria} aria-labelledby={`cy-cat-${g.categoria}`}>
                <h2 id={`cy-cat-${g.categoria}`} className="cy-seccion-titulo">
                  {t.categorias[g.categoria]}
                </h2>
                <ul className="cy-tarjetas">
                  {g.entradas.map((e) => (
                    <li key={e.definicion.id}>
                      <a className="cy-tarjeta" href={rutaIntl(m.codigo, e.definicion.slug)}>
                        <span className="cy-tarjeta-titulo">{tarjetaDe(ctx, m, e).titulo}</span>
                        <span className="cy-tarjeta-texto">{tarjetaDe(ctx, m, e).resumen}</span>
                        <span className="cy-boton-icono">
                          <IconoFlecha />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          ) : (
            <p className="cy-vacio">{t.pais.sinCalculadoras}</p>
          )}
        </div>

        {novedades.length ? (
          <aside className="cy-novedades-lateral" aria-labelledby="cy-novedades-titulo">
            <h2 id="cy-novedades-titulo" className="cy-seccion-titulo">
              {t.pais.novedades}
            </h2>
            <ol className="cy-linea-tiempo">
              {novedades.map((n) => (
                <li key={n.id}>
                  <time dateTime={n.fecha}>{formatearFecha(n.fecha, m.locale)}</time>
                  <p className="cy-novedad-titulo">{n.titulo}</p>
                  <p>{n.texto}</p>
                </li>
              ))}
            </ol>
            <a className="cy-enlace-flecha" href={rutaIntl(m.codigo, "novedades")}>
              {t.pais.verNovedades}
              <IconoFlecha />
            </a>
          </aside>
        ) : null}
      </div>
      <AvisoDePais ctx={ctx} />
    </div>
  );
}
