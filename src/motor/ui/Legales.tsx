import { formatearFecha } from "../formato";
import { ACTUALIZACION_PAGINAS_GLOBALES, type PaginaGlobal } from "../paginas";
import { grafo, ldMigas, ldPagina, rutaIntl, urlIntl } from "../seo";
import { resolverLegales, type PaginasLegales } from "../i18n/legales";
import type { Idioma, Trato } from "../tipos";
import type { ContextoSitio } from "./contexto";
import { JsonLd, Migas } from "./Sitio";

export const MAIL_CONTACTO = "manunv97@gmail.com";

export function paginasLegales(idioma: Idioma, trato: Trato, locale: string): PaginasLegales {
  return resolverLegales(idioma, trato, { actualizado: formatearFecha(ACTUALIZACION_PAGINAS_GLOBALES, locale), mail: MAIL_CONTACTO });
}

function conMail(texto: string) {
  const i = texto.indexOf(MAIL_CONTACTO);
  if (i < 0) return texto;
  return (
    <>
      {texto.slice(0, i)}
      <a href={`mailto:${MAIL_CONTACTO}`}>{MAIL_CONTACTO}</a>
      {texto.slice(i + MAIL_CONTACTO.length)}
    </>
  );
}

const paginasDe = (ctx: ContextoSitio) => paginasLegales(ctx.mercado.idioma, ctx.mercado.trato, ctx.mercado.locale);

function ldLegal(ctx: ContextoSitio, slug: PaginaGlobal) {
  const p = paginasDe(ctx)[slug];
  const url = urlIntl("global", slug);
  const tipo = slug === "sobre" ? "AboutPage" : slug === "contacto" ? "ContactPage" : "WebPage";
  return grafo([
    ldPagina({ tipo, url, nombre: p.title, descripcion: p.description, locale: ctx.mercado.locale, actualizado: ACTUALIZACION_PAGINAS_GLOBALES }),
    ldMigas([
      { nombre: ctx.textos.migas.inicio, url: urlIntl("global") },
      { nombre: p.h1, url },
    ]),
  ]);
}

export function PaginaLegalVista({ ctx, slug }: { ctx: ContextoSitio; slug: PaginaGlobal }) {
  const p = paginasDe(ctx)[slug];
  return (
    <div className="cy-pagina cy-legal">
      <JsonLd datos={ldLegal(ctx, slug)} />
      <Migas etiqueta={ctx.textos.migas.etiqueta} items={[{ nombre: ctx.textos.migas.inicio, href: rutaIntl("global") }, { nombre: p.h1 }]} />
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{p.h1}</h1>
        <p className="cy-bajada">{conMail(p.bajada)}</p>
      </header>
      <div className="cy-texto">
        {p.bloques.map((b, i) => (
          <section key={b.titulo ?? i}>
            {b.titulo ? <h2>{b.titulo}</h2> : null}
            {b.parrafos.map((t) => (
              <p key={t}>{conMail(t)}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
