import { categoriaDe, ORDEN_CATEGORIAS, textosSitio, type Categoria, type TextosSitio } from "../i18n";
import { marcadoresDe, type ModoPublicacion, type Registro } from "../registro";
import { rutaIntl } from "../seo";
import { modoPublicacion } from "../sitio";
import type { CodigoMercado, EntradaCalculadora, FechaISO, Mercado } from "../tipos";
import { hoyEn } from "../vigencia";
import { aCompacto, nombreDePais, ordenarPorNombre, type OpcionPais, type PaisCompacto } from "./paises";

export interface ContextoSitio {
  registro: Registro;
  modo: ModoPublicacion;
  mercado: Mercado;
  fecha: FechaISO;
  textos: TextosSitio;
  paises: Mercado[];
  // ISO de los países con más de una edición visible (CA con ca y ca-fr).
  conEdiciones: ReadonlySet<string>;
}

export function contextoSitio(registro: Registro, codigo: CodigoMercado): ContextoSitio | null {
  const modo = modoPublicacion();
  const visibles = registro.mercados(modo);
  const mercado = visibles.find((m) => m.codigo === codigo);
  if (!mercado) return null;
  const porIso = new Map<string, number>();
  for (const m of visibles) if (m.pais) porIso.set(m.pais, (porIso.get(m.pais) ?? 0) + 1);
  const conEdiciones = new Set([...porIso].filter(([, n]) => n > 1).map(([iso]) => iso));
  const paises = ordenarPorNombre(
    visibles.filter((m) => m.codigo !== "global").map((m) => ({ m, nombre: nombreDePais(m, mercado.locale, conEdiciones.has(m.pais)) })),
    mercado.locale,
  ).map((x) => x.m);
  return {
    registro,
    modo,
    mercado,
    fecha: hoyEn(mercado),
    textos: textosSitio(mercado.idioma, mercado.trato, mercado.locale),
    paises,
    conEdiciones,
  };
}

export function nombreEnPagina(ctx: ContextoSitio, m: Mercado): string {
  return nombreDePais(m, ctx.mercado.locale, ctx.conEdiciones.has(m.pais));
}

export function opcionesSelector(ctx: ContextoSitio): OpcionPais[] {
  return ctx.paises.map((m) => ({
    codigo: m.codigo,
    nombre: nombreEnPagina(ctx, m),
    pais: m.pais,
    href: rutaIntl(m.codigo),
    ...(ctx.conEdiciones.has(m.pais) ? { idioma: m.idioma } : {}),
  }));
}

// La lista que viaja al navegador (ProveedorPaises): los mercados más los países de otro sitio
// (Argentina, en calcular.ar), ordenados por nombre en el idioma de la página.
export function listaCompacta(ctx: ContextoSitio, externos: readonly OpcionPais[] = []): PaisCompacto[] {
  const nombrados = externos.map((e) => ({ ...e, nombre: nombreDePais({ codigo: e.codigo, pais: e.pais, nombre: e.nombre, idioma: ctx.mercado.idioma }, ctx.mercado.locale) }));
  return ordenarPorNombre([...opcionesSelector(ctx), ...nombrados], ctx.mercado.locale).map(aCompacto);
}

export function calculadorasDe(ctx: ContextoSitio, m: Mercado): EntradaCalculadora[] {
  return ctx.registro.calculadorasPublicables(m.codigo, hoyEn(m), ctx.modo);
}

export function porCategoria(entradas: readonly EntradaCalculadora[]): { categoria: Categoria; entradas: EntradaCalculadora[] }[] {
  return ORDEN_CATEGORIAS.map((categoria) => ({ categoria, entradas: entradas.filter((e) => categoriaDe(e.definicion.concepto) === categoria) })).filter(
    (g) => g.entradas.length > 0,
  );
}

export const MARCA_PAIS = "{{pais}}";

// Textos del aviso de país armados con un hueco para el nombre: el navegador elige el destino
// (país de la IP) y pone el nombre de la lista compacta. Antes viajaba un texto armado por país.
export function plantillasAviso(ctx: ContextoSitio): { texto: string; ir: string } {
  return { texto: ctx.textos.avisoPais.texto(MARCA_PAIS), ir: ctx.textos.avisoPais.ir(MARCA_PAIS) };
}

// Título y resumen de una calculadora para tarjetas y listas, con los marcadores {{...}} ya
// resueltos al valor vigente (el contenido crudo del registro todavía los tiene). Sin marcadores
// alcanza con el contenido tal cual; con marcadores pasa por registro.pagina(). Memo por contexto
// (uno por render): la home, las relacionadas y el JSON-LD piden la misma tarjeta varias veces.
const tarjetas = new WeakMap<ContextoSitio, Map<string, { titulo: string; resumen: string }>>();

export function tarjetaDe(ctx: ContextoSitio, m: Mercado, entrada: EntradaCalculadora): { titulo: string; resumen: string } {
  let memo = tarjetas.get(ctx);
  if (!memo) tarjetas.set(ctx, (memo = new Map()));
  const clave = `${m.codigo}/${entrada.definicion.slug}`;
  const guardada = memo.get(clave);
  if (guardada) return guardada;
  const crudo = entrada.contenido;
  const resumenCrudo = crudo.intro[0] ?? "";
  const c = marcadoresDe(crudo.h1).length || marcadoresDe(resumenCrudo).length ? (ctx.registro.pagina(m.codigo, entrada.definicion.slug, hoyEn(m), ctx.modo)?.contenido ?? crudo) : crudo;
  const tarjeta = { titulo: c.h1, resumen: c.intro[0] ?? "" };
  memo.set(clave, tarjeta);
  return tarjeta;
}
