import { actualizacionDeFuentes, actualizacionDeInicioPais, actualizacionDeNovedades, actualizacionDePagina } from "../mapa";
import { ACTUALIZACION_PAGINAS_GLOBALES, esPaginaGlobal, type PaginaGlobal } from "../paginas";
import type { PaginaResuelta } from "../registro";
import type { FechaISO } from "../tipos";
import { etiquetaIdioma } from "../i18n/direccion";
import {
  elegirTitulo,
  grafo,
  hreflangDelHead,
  ldFaq,
  ldLista,
  ldSitio,
  ldMigas,
  ldPagina,
  ldWebApplication,
  metadataDe,
  tituloConPais,
  urlImagenOg,
  urlIntl,
  type Idiomas,
  type MetadataSeo,
} from "../seo";
import { calculadorasDe, type ContextoSitio } from "./contexto";
import { paginasLegales } from "./Legales";

// Lo que va en el <head> y en el JSON-LD de cada página de calcularya, en un solo lugar: lo usan
// las páginas de src/app/(intl) y scripts/check_seo_intl.ts, así el check mide lo mismo que sale.

export type PaginaIntl =
  | { tipo: "legal"; slug: PaginaGlobal }
  | { tipo: "fuentes" }
  | { tipo: "novedades" }
  | { tipo: "calculadora"; pagina: PaginaResuelta };

export function resolverPagina(ctx: ContextoSitio, slug: string): PaginaIntl | null {
  const m = ctx.mercado;
  if (m.codigo === "global") return esPaginaGlobal(slug) ? { tipo: "legal", slug } : null;
  if (slug === "fuentes" || slug === "novedades") return { tipo: slug };
  const pagina = ctx.registro.pagina(m.codigo, slug, ctx.fecha, ctx.modo);
  return pagina ? { tipo: "calculadora", pagina } : null;
}

const anio = (ctx: ContextoSitio) => Number(ctx.fecha.slice(0, 4));

export function slugDe(r: PaginaIntl): string {
  return r.tipo === "calculadora" ? r.pagina.calculadora.slug : r.tipo === "legal" ? r.slug : r.tipo;
}

export function actualizacionDe(ctx: ContextoSitio, r: PaginaIntl | null): FechaISO | undefined {
  const m = ctx.mercado;
  if (!r) return m.codigo === "global" ? undefined : actualizacionDeInicioPais(ctx.registro, m, ctx.modo);
  switch (r.tipo) {
    case "calculadora":
      return actualizacionDePagina(ctx.registro, r.pagina, ctx.fecha);
    case "fuentes":
      return actualizacionDeFuentes(ctx.registro, m.codigo, ctx.fecha);
    case "novedades":
      return actualizacionDeNovedades(ctx.registro, m.codigo, ctx.fecha);
    case "legal":
      return ACTUALIZACION_PAGINAS_GLOBALES;
  }
}

function textosDe(ctx: ContextoSitio, r: PaginaIntl | null): { title: string; description: string } {
  const t = ctx.textos;
  const m = ctx.mercado;
  if (!r) {
    return m.codigo === "global"
      ? { title: t.seo.tituloGlobal, description: t.seo.descripcionGlobal }
      : { title: elegirTitulo(t.seo.tituloPais(m.nombre, anio(ctx))), description: t.pais.descripcion(m.nombre) };
  }
  switch (r.tipo) {
    case "legal": {
      const legal = paginasLegales(m.idioma, m.trato, m.locale)[r.slug];
      return { title: legal.title, description: legal.description };
    }
    case "fuentes":
      return { title: elegirTitulo(t.seo.tituloFuentes(m.nombre)), description: t.fuentes.description(m.nombre) };
    case "novedades":
      return { title: elegirTitulo(t.seo.tituloNovedades(m.nombre, anio(ctx))), description: t.novedades.description(m.nombre) };
    case "calculadora":
      return { title: tituloConPais(r.pagina.contenido.title, m), description: r.pagina.contenido.description };
  }
}

// Las páginas globales comparten la imagen de la home: son cuatro y no se comparten en redes.
export function imagenDe(ctx: ContextoSitio, r: PaginaIntl | null): string {
  const m = ctx.mercado;
  const version = actualizacionDe(ctx, r);
  if (m.codigo === "global") return urlImagenOg("global", undefined, r ? undefined : version);
  return urlImagenOg(m.codigo, r ? slugDe(r) : undefined, version);
}

// Inicio, fuentes y novedades de un país con varias ediciones (/ca y /ca-fr) son la misma página en
// otro idioma: forman su propio clúster. Un país con una sola edición no lleva hreflang ahí.
export function hreflangDeEdiciones(ctx: ContextoSitio, slug?: "fuentes" | "novedades"): Idiomas | undefined {
  if (ctx.mercado.codigo === "global") return undefined;
  const ediciones = ctx.registro.ediciones(ctx.mercado.codigo, ctx.modo);
  if (ediciones.length < 2) return undefined;
  const idiomas: Idiomas = {};
  for (const e of ediciones) idiomas[etiquetaIdioma(e.locale)] = urlIntl(e.codigo, slug);
  idiomas["x-default"] = urlIntl("global");
  return idiomas;
}

export function metadatosDe(ctx: ContextoSitio, r: PaginaIntl | null): MetadataSeo {
  const { title, description } = textosDe(ctx, r);
  const idiomas =
    r?.tipo === "calculadora"
      ? hreflangDelHead(r.pagina.calculadora.concepto, r.pagina.equivalentes)
      : !r || r.tipo === "fuentes" || r.tipo === "novedades"
        ? hreflangDeEdiciones(ctx, r?.tipo)
        : undefined;
  return metadataDe({
    mercado: ctx.mercado,
    ...(r ? { slug: slugDe(r) } : {}),
    title,
    description,
    ...(idiomas ? { idiomas } : {}),
    imagen: imagenDe(ctx, r),
  });
}

export function ldInicioGlobal(ctx: ContextoSitio) {
  const url = urlIntl("global");
  const paises = ctx.paises.map((m) => ({ url: urlIntl(m.codigo) }));
  return grafo([
    ...ldSitio(),
    ldPagina({
      tipo: "CollectionPage",
      url,
      nombre: ctx.textos.seo.tituloGlobal,
      descripcion: ctx.textos.seo.descripcionGlobal,
      locale: ctx.mercado.locale,
      imagen: imagenDe(ctx, null),
      ...(paises.length ? { principal: ldLista(paises) } : {}),
    }),
  ]);
}

export function ldInicioPais(ctx: ContextoSitio) {
  const m = ctx.mercado;
  const url = urlIntl(m.codigo);
  const { title, description } = textosDe(ctx, null);
  // Lista de resumen (solo URL): el nombre ya está en el HTML de cada tarjeta y acá pesaba 1,5 KB doble.
  const items = calculadorasDe(ctx, m).map((e) => ({ url: urlIntl(m.codigo, e.definicion.slug) }));
  return grafo([
    ldPagina({
      tipo: "CollectionPage",
      url,
      nombre: title,
      descripcion: description,
      locale: m.locale,
      actualizado: actualizacionDe(ctx, null),
      imagen: imagenDe(ctx, null),
      ...(items.length ? { principal: ldLista(items) } : {}),
    }),
  ]);
}

export function ldCalculadora(ctx: ContextoSitio, pagina: PaginaResuelta) {
  const m = ctx.mercado;
  const r: PaginaIntl = { tipo: "calculadora", pagina };
  const url = urlIntl(m.codigo, pagina.calculadora.slug);
  return grafo([
    ldWebApplication({ nombre: pagina.contenido.h1, url, mercado: m, actualizado: actualizacionDe(ctx, r) }),
    ldMigas([
      { nombre: m.nombre, url: urlIntl(m.codigo) },
      { nombre: pagina.contenido.h1, url },
    ]),
    ldFaq(pagina.contenido.faq),
  ]);
}

export function ldPaginaDeMercado(ctx: ContextoSitio, r: { tipo: "fuentes" } | { tipo: "novedades" }) {
  const m = ctx.mercado;
  const url = urlIntl(m.codigo, r.tipo);
  const { title, description } = textosDe(ctx, r);
  const h1 = r.tipo === "fuentes" ? ctx.textos.fuentes.titulo(m.nombre) : ctx.textos.novedades.titulo(m.nombre);
  return grafo([
    ldPagina({ url, nombre: title, descripcion: description, locale: m.locale, actualizado: actualizacionDe(ctx, r) }),
    ldMigas([
      { nombre: m.nombre, url: urlIntl(m.codigo) },
      { nombre: h1, url },
    ]),
  ]);
}
