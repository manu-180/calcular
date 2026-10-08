import { categoriaDe, ORDEN_CATEGORIAS, textosSitio, type Categoria, type TextosSitio } from "../i18n";
import type { ModoPublicacion, Registro } from "../registro";
import { rutaIntl } from "../seo";
import { modoPublicacion } from "../sitio";
import type { CodigoMercado, EntradaCalculadora, FechaISO, Mercado } from "../tipos";
import { hoyEn } from "../vigencia";
import type { DestinoPais } from "./AvisoPais";
import type { OpcionPais } from "./SelectorPais";

export interface ContextoSitio {
  registro: Registro;
  modo: ModoPublicacion;
  mercado: Mercado;
  fecha: FechaISO;
  textos: TextosSitio;
  paises: Mercado[];
}

export function contextoSitio(registro: Registro, codigo: CodigoMercado): ContextoSitio | null {
  const modo = modoPublicacion();
  const visibles = registro.mercados(modo);
  const mercado = visibles.find((m) => m.codigo === codigo);
  if (!mercado) return null;
  return {
    registro,
    modo,
    mercado,
    fecha: hoyEn(mercado),
    textos: textosSitio(mercado.idioma, mercado.trato),
    paises: visibles.filter((m) => m.codigo !== "global").sort((a, b) => a.nombre.localeCompare(b.nombre, "es")),
  };
}

export function opcionesSelector(ctx: ContextoSitio): OpcionPais[] {
  return ctx.paises.map((m) => ({ codigo: m.codigo, nombre: m.nombre, pais: m.pais, href: rutaIntl(m.codigo) }));
}

export function calculadorasDe(ctx: ContextoSitio, m: Mercado): EntradaCalculadora[] {
  return ctx.registro.calculadorasPublicables(m.codigo, hoyEn(m), ctx.modo);
}

export function porCategoria(entradas: readonly EntradaCalculadora[]): { categoria: Categoria; entradas: EntradaCalculadora[] }[] {
  return ORDEN_CATEGORIAS.map((categoria) => ({ categoria, entradas: entradas.filter((e) => categoriaDe(e.definicion.concepto) === categoria) })).filter(
    (g) => g.entradas.length > 0,
  );
}

// Destinos del aviso de país: la página equivalente si existe (mismo concepto), si no la home del
// mercado. El texto va en el idioma y el trato de la página que se está mirando.
export function destinosAviso(ctx: ContextoSitio, concepto?: string): DestinoPais[] {
  const equivalentes = concepto && concepto !== "propio" ? ctx.registro.equivalentes(concepto, (m) => hoyEn(m), ctx.modo) : [];
  return ctx.paises
    .filter((m) => m.codigo !== ctx.mercado.codigo && m.pais)
    .map((m) => {
      const eq = equivalentes.find((e) => e.mercado === m.codigo);
      return { pais: m.pais, href: rutaIntl(m.codigo, eq?.slug), texto: ctx.textos.avisoPais.texto(m.nombre), ir: ctx.textos.avisoPais.ir(m.nombre) };
    });
}

// Título y resumen de una calculadora para tarjetas y listas, con los marcadores {{...}} ya
// resueltos al valor vigente (el contenido crudo del registro todavía los tiene).
// Memo por contexto (uno por render): registro.pagina() arma los equivalentes de todos los países
// y la home, las relacionadas y el JSON-LD piden la misma tarjeta varias veces.
const tarjetas = new WeakMap<ContextoSitio, Map<string, { titulo: string; resumen: string }>>();

export function tarjetaDe(ctx: ContextoSitio, m: Mercado, entrada: EntradaCalculadora): { titulo: string; resumen: string } {
  let memo = tarjetas.get(ctx);
  if (!memo) tarjetas.set(ctx, (memo = new Map()));
  const clave = `${m.codigo}/${entrada.definicion.slug}`;
  const guardada = memo.get(clave);
  if (guardada) return guardada;
  const p = ctx.registro.pagina(m.codigo, entrada.definicion.slug, hoyEn(m), ctx.modo);
  const c = p?.contenido ?? entrada.contenido;
  const tarjeta = { titulo: c.h1, resumen: c.intro[0] ?? "" };
  memo.set(clave, tarjeta);
  return tarjeta;
}
