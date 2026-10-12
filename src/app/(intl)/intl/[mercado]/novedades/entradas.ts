import { formatearFecha } from "@/motor/formato";
import { feedDe, type EntradaFeed, type ValorFeed } from "@/motor/novedades";
import { rutaIntl } from "@/motor/seo";
import type { EntradaCalculadora, FechaISO } from "@/motor/tipos";
import { calculadorasDe, tarjetaDe, type ContextoSitio } from "@/motor/ui/contexto";
import { textosInicio, type TextosInicio } from "@/motor/ui/textos-inicio";

// Lo mismo para la página /<m>/novedades y para su feed Atom: así el feed nunca dice otra cosa que
// la página.

export interface CalculadoraEnlazada {
  id: string;
  titulo: string;
  href: string;
}

export interface RegistroNovedades {
  ctx: ContextoSitio;
  tn: TextosInicio["novedades"];
  feed: EntradaFeed[];
  proximos: Extract<EntradaFeed, { tipo: "dato" }>[];
  registro: EntradaFeed[];
  calculadorasDe: (e: EntradaFeed) => CalculadoraEnlazada[];
}

export function valorTexto(v: ValorFeed, tn: TextosInicio["novedades"]): string {
  switch (v.tipo) {
    case "numero":
      return v.texto;
    case "rango":
      return tn.rango(v.min, v.max, v.zonas);
    case "tabla":
      return tn.tabla(v.filas);
    case "valores":
      return tn.valores(v.cantidad);
  }
}

export function registroNovedades(ctx: ContextoSitio): RegistroNovedades {
  const m = ctx.mercado;
  const tn = textosInicio(m.idioma, m.trato).novedades;
  const feed = feedDe(ctx.registro, m.codigo, ctx.fecha);
  const publicadas = calculadorasDe(ctx, m);
  const enlace = (c: EntradaCalculadora): CalculadoraEnlazada => ({ id: c.definicion.id, titulo: tarjetaDe(ctx, m, c).titulo, href: rutaIntl(m.codigo, c.definicion.slug) });
  const queUsan = (id: string) => publicadas.filter((c) => Object.prototype.hasOwnProperty.call(c.definicion.requiere, id)).map(enlace);
  return {
    ctx,
    tn,
    feed,
    proximos: feed.filter((e): e is Extract<EntradaFeed, { tipo: "dato" }> => e.tipo === "dato" && e.proximo).sort((a, b) => a.desde.localeCompare(b.desde)),
    registro: feed.filter((e) => !(e.tipo === "dato" && e.proximo)),
    calculadorasDe: (e) => {
      switch (e.tipo) {
        case "editorial":
          return e.calculadoras.flatMap((id) => publicadas.filter((c) => c.definicion.id === id).map(enlace));
        case "dato":
          return queUsan(e.dato);
        case "serie":
          return queUsan(e.serie);
        case "revision":
          return [];
      }
    },
  };
}

export function fecha(f: FechaISO, ctx: ContextoSitio): string {
  return formatearFecha(f, ctx.mercado.locale);
}

// Título y resumen en texto plano (el feed no lleva HTML). La página arma lo mismo con nodos.
export function textoDe(e: EntradaFeed, r: Pick<RegistroNovedades, "ctx" | "tn">): { titulo: string; resumen: string } {
  const { ctx, tn } = r;
  switch (e.tipo) {
    case "editorial":
      return { titulo: e.titulo, resumen: [e.texto, e.vigenteDesde ? `${tn.rige(fecha(e.vigenteDesde, ctx))}.` : "", `${e.fuente.organismo}: ${e.fuente.titulo}.`].filter(Boolean).join(" ") };
    case "dato":
      return {
        titulo: `${e.nombre}: ${valorTexto(e.valor, tn)}`,
        resumen: `${e.hasta ? tn.rigeDesdeHasta(fecha(e.desde, ctx), fecha(e.hasta, ctx)) : tn.rige(fecha(e.desde, ctx))}. ${e.fuente.organismo}: ${e.fuente.titulo}.`,
      };
    case "serie":
      return {
        titulo: `${e.nombre}: ${valorTexto(e.valor, tn)}`,
        resumen: [e.anterior ? `${tn.antes(valorTexto(e.anterior.valor, tn), fecha(e.anterior.fecha, ctx))}.` : "", `${e.fuente.organismo}: ${e.fuente.titulo}.`].filter(Boolean).join(" "),
      };
    case "revision":
      return { titulo: tn.revisados(e.datos.length), resumen: tn.revisadosTexto(new Intl.ListFormat(ctx.mercado.locale, { type: "conjunction" }).format(e.organismos)) };
  }
}
