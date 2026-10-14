import type { Categoria } from "../i18n";
import { rutaIntl } from "../seo";
import type { EntradaCalculadora } from "../tipos";
import { calculadorasDe, porCategoria, type ContextoSitio } from "./contexto";

// Mismas formas que el shell de calcular.ar (src/components/shell/tipos.ts). Se repiten acá porque
// el motor no importa nada de Argentina (scripts/check_fronteras.ts); TypeScript las compara por forma.
export interface PaginaDelMenu {
  href: string;
  titulo: string;
  grupo: string;
  tipo: "calculadora";
  corto: string;
  claves: string[];
}

export interface SeccionDelMenu {
  id: string;
  titulo: string;
  paginas: PaginaDelMenu[];
  destacados: PaginaDelMenu[];
}

export interface TabDelMenu {
  key: string;
  label: string;
  type: "group" | "link";
  href?: string;
  match: string[];
}

export interface MenuDelPais {
  tabs: TabDelMenu[];
  navegacion: { columnas: Record<string, SeccionDelMenu[][]>; secciones: SeccionDelMenu[] };
  paginas: PaginaDelMenu[];
  masUsadas: string[];
}

export type ClaveGrupo = "trabajo" | "impuestos" | "dinero" | "vida";

// Las 12 categorías en cuatro grupos, los mismos en el menú y en el inicio del país. Familia y
// "otras" quedan en Dinero: son cuentas legales con plata (pensión de alimentos, jubilación,
// trabajo doméstico), no de todos los días. Vida diaria es la casa de las universales cotidianas.
export const GRUPOS: readonly { key: ClaveGrupo; cols: readonly (readonly Categoria[])[] }[] = [
  { key: "trabajo", cols: [["sueldo"], ["fin"]] },
  { key: "impuestos", cols: [["impuestos"]] },
  { key: "dinero", cols: [["dinero", "finanzas"], ["negocio", "familia", "otras"]] },
  { key: "vida", cols: [["calculos", "fechas"], ["salud", "hogar"]] },
];

export function etiquetaGrupo(ctx: ContextoSitio, key: ClaveGrupo): string {
  return ctx.textos.shell.menu[key];
}

export interface GrupoInicio {
  key: ClaveGrupo;
  titulo: string;
  total: number;
  categorias: { categoria: Categoria; entradas: EntradaCalculadora[] }[];
}

export function porGrupo(ctx: ContextoSitio, categorias: readonly { categoria: Categoria; entradas: EntradaCalculadora[] }[]): GrupoInicio[] {
  const porId = new Map(categorias.map((c) => [c.categoria, c]));
  return GRUPOS.flatMap((g) => {
    const presentes = g.cols.flat().flatMap((c) => porId.get(c) ?? []);
    if (!presentes.length) return [];
    return [{ key: g.key, titulo: etiquetaGrupo(ctx, g.key), total: presentes.reduce((n, c) => n + c.entradas.length, 0), categorias: presentes }];
  });
}

// El H1 viene con año, país y a veces un marcador ({{cl.imm}}): para el menú queda el nombre corto.
export function nombreCorto(h1: string, pais: string): string {
  let t = h1.replace(/\{\{[^}]*\}\}/g, "").split(":")[0];
  t = t.replace(/\s*\([^)]*\)/g, "");
  if (pais) t = t.split(new RegExp(`\\s+en\\s+${pais.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=[\\s,.;]|$)`, "i"))[0];
  t = t
    .replace(/\s+20\d\d\b/g, "")
    .replace(/^(calculadora|c[aá]lculo)\s+((de\s+la|de\s+los|de\s+las|del|de)\s+)?/i, "")
    .trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : h1;
}

function titulo(h1: string): string {
  return h1.replace(/\{\{[^}]*\}\}/g, "").replace(/:\s*$/, "").trim();
}

export function menuDelPais(ctx: ContextoSitio): MenuDelPais {
  const m = ctx.mercado;
  const t = ctx.textos;
  const grupos = porCategoria(calculadorasDe(ctx, m));
  const pagina = (categoria: Categoria, e: EntradaCalculadora): PaginaDelMenu => ({
    href: rutaIntl(m.codigo, e.definicion.slug),
    titulo: titulo(e.contenido.h1),
    grupo: t.categorias[categoria],
    tipo: "calculadora",
    corto: nombreCorto(e.contenido.h1, m.nombre),
    claves: [e.definicion.slug.replace(/-/g, " ")],
  });
  const secciones: SeccionDelMenu[] = grupos.map((g) => ({
    id: g.categoria,
    titulo: t.categorias[g.categoria],
    paginas: g.entradas.map((e) => pagina(g.categoria, e)),
    destacados: [],
  }));
  const porId = new Map(secciones.map((s) => [s.id, s]));

  const columnas: Record<string, SeccionDelMenu[][]> = {};
  const tabs: TabDelMenu[] = [];
  for (const tab of GRUPOS) {
    const cols = tab.cols.map((col) => col.map((c) => porId.get(c)).filter((s): s is SeccionDelMenu => !!s)).filter((col) => col.length > 0);
    if (!cols.length) continue;
    columnas[tab.key] = cols;
    tabs.push({ key: tab.key, label: etiquetaGrupo(ctx, tab.key), type: "group", match: cols.flat().flatMap((s) => s.paginas.map((p) => p.href)) });
  }
  const novedades = rutaIntl(m.codigo, "novedades");
  // Fuentes no va como tab: a 1024 px la barra no entraba con la cuenta. Queda en el cajón, el footer
  // y el sello de cada calculadora.
  tabs.push({ key: "novedades", label: t.shell.menu.novedades, type: "link", href: novedades, match: [novedades] });

  const paginas = secciones.flatMap((s) => s.paginas);
  const orden = ["sueldo-neto", "bono-semestral", "liquidacion-final", "indemnizacion-despido", "vacaciones", "impuesto-renta", "iva", "tipo-de-cambio"];
  const entradas = grupos.flatMap((g) => g.entradas);
  const masUsadas = orden
    .flatMap((concepto) => entradas.filter((e) => e.definicion.concepto === concepto))
    .map((e) => rutaIntl(m.codigo, e.definicion.slug))
    .slice(0, 8);

  return { tabs, navegacion: { columnas, secciones }, paginas, masUsadas };
}
