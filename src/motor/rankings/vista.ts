import { coma } from "../i18n/direccion";
import { textosMundo } from "../i18n/mundo";
import { textosRankings, type TextosRankings } from "../i18n/rankings";
import type { GrillaMundo, PaisMundo } from "../mundo/tipos";
import type { Mercado } from "../tipos";
import { nombreDePais } from "../ui/paises";
import { IDS_NIVEL, NIVELES, RANKINGS, TRAMOS, paisDeEdicion, rankingDe, type IdTramo, type ResultadoRanking, type Variante } from "./calculo";
import { cambioDe, fotoAnterior, type Cambio, type FotoMensual } from "./historial";
import { IDS_RANKING, type IdRanking } from "./rutas";
import { rutaOg, urlRanking } from "./urls";

export { rutaIndice, rutaRanking, urlIndice, urlRanking } from "./urls";

// Todo lo que pinta una página de ranking, ya formateado en el idioma de la edición. Solo cadenas y
// números: viaja tal cual al navegador (RankingCliente) y el cliente no formatea ni calcula nada.

export interface CambioVista {
  tipo: Cambio["tipo"];
  // «+3», «−2», «=», o vacío para «nuevo».
  corto: string;
  texto: string;
}

export interface FilaVista {
  iso: string;
  nombre: string;
  href: string;
  puesto: number;
  empate: boolean;
  valor: string;
  detalle: string;
  barra: number;
  cambio: CambioVista | null;
  propia: boolean;
}

export interface DestacadoVista {
  iso: string;
  nombre: string;
  puesto: number;
  total: number;
  valor: string;
  detalle: string;
  // Solo el porcentaje, para el panel (la etiqueta ya dice qué es).
  pct: string;
  cambio: CambioVista | null;
}

export interface VarianteVista {
  id: Variante;
  etiqueta: string;
  sub: string;
  referencia: string;
  caption: string;
  filas: FilaVista[];
  // El país de la edición, o el primero del ranking en global y en una edición fuera de la grilla.
  destacado: DestacadoVista;
  esPropia: boolean;
  frase: string;
  cita: string;
  texto: string;
  og: string;
  descarga: string;
}

export interface VistaRanking {
  id: IdRanking;
  titulo: string;
  corto: string;
  bajada: string;
  url: string;
  total: number;
  // Día de actualización (ISO) y su texto: el de la zona de la edición, o UTC en global.
  fechaIso: string;
  fecha: string;
  mesAnterior: string | null;
  tituloVariantes: string;
  variantes: VarianteVista[];
  porDefecto: number;
  // Edición cuyo país todavía no está en la grilla: el aviso, en vez del panel propio.
  fuera: string | null;
}

export function formatoFecha(iso: string, locale: string, conAnio: boolean): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  const texto = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", ...(conAnio ? { year: "numeric" } : {}), timeZone: "UTC" }).format(d);
  return locale.toLowerCase().startsWith("fr") && d.getUTCDate() === 1 ? texto.replace(/^1(?=\s)/, "1er") : texto;
}

function fechaDelDia(dia: number, anio: number, locale: string): string {
  const d = new Date(Date.UTC(anio, 0, dia));
  return formatoFecha(d.toISOString().slice(0, 10), locale, false);
}

export function nombrePais(p: Pick<PaisMundo, "mercado" | "iso">, locale: string): string {
  return nombreDePais({ codigo: p.mercado, pais: p.iso, nombre: p.iso, idioma: "en" }, locale);
}

function mesLargo(mes: string, locale: string): string {
  const [a, m] = mes.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(a, m - 1, 15)));
}

interface Formatos {
  entero: Intl.NumberFormat;
  pct: Intl.NumberFormat;
}

function formatos(locale: string): Formatos {
  return {
    entero: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    pct: new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  };
}

function textoCambio(t: TextosRankings, c: Cambio | null): CambioVista | null {
  if (!c) return null;
  if (c.tipo === "sube") return { tipo: "sube", corto: `+${c.puestos}`, texto: t.cambio.sube(c.puestos) };
  if (c.tipo === "baja") return { tipo: "baja", corto: `−${c.puestos}`, texto: t.cambio.baja(c.puestos) };
  if (c.tipo === "igual") return { tipo: "igual", corto: "=", texto: t.cambio.igual };
  return { tipo: "nuevo", corto: "", texto: t.cambio.nuevo };
}

export function etiquetasVariante(t: TextosRankings, id: IdRanking, v: Variante, f: Formatos): { etiqueta: string; sub: string; referencia: string } {
  if (id === "aumento") {
    const [a, b] = TRAMOS[v as IdTramo];
    const desde = f.entero.format(NIVELES[a]);
    const hasta = f.entero.format(NIVELES[b]);
    return { etiqueta: t.tramos.nombre(desde, hasta), sub: `${t.niveles.nombres[a]} · ${t.niveles.nombres[b]}`, referencia: t.referencia.tramo(desde, hasta) };
  }
  const monto = f.entero.format(NIVELES[v as keyof typeof NIVELES]);
  return { etiqueta: t.niveles.nombres[v as keyof typeof NIVELES], sub: t.niveles.anual(monto), referencia: t.referencia.nivel(monto) };
}

function valoresDe(t: TextosRankings, r: ResultadoRanking, f: Formatos, locale: string, fila: ResultadoRanking["filas"][number]): { valor: string; grande: string; detalle: string } {
  const pct = f.pct.format(fila.carga);
  if (r.id === "rinde") {
    const v = f.entero.format(fila.valor);
    return { valor: v, grande: t.valores.porMes(v), detalle: t.valores.carga(pct) };
  }
  if (r.id === "libertad") {
    const v = fila.valor > 0 ? fechaDelDia(fila.valor, r.anio, locale) : t.valores.ningunDia;
    return { valor: v, grande: v, detalle: t.valores.carga(pct) };
  }
  const v = f.entero.format(fila.clave);
  return { valor: v, grande: t.valores.deCada(v), detalle: t.valores.cargaAumento(pct) };
}

export function hrefDe(p: PaisMundo, origenAR: string): string {
  return p.sitio === "ar" ? `${origenAR}${p.ruta}` : p.ruta;
}

export function frasePosicion(t: TextosRankings, nombre: string, puesto: number, total: number, empatados: number, separador = ", "): string {
  const base = t.posicion(nombre, puesto, total);
  return empatados > 1 ? `${base}${separador}${t.empate(empatados - 1)}` : base;
}

export interface EntradaVista {
  grilla: GrillaMundo;
  mercado: Mercado;
  id: IdRanking;
  origenAR: string;
  fotos?: readonly FotoMensual[];
  // Hoy en la zona de la edición (UTC en global). La grilla se fecha con la zona más adelantada del
  // planeta, y mostrar esa fecha decía «actualizado el 25» a quien todavía estaba en el 24.
  hoy?: string;
}

export function diaActualizacion(generadoEl: string, hoy?: string): string {
  return generadoEl && hoy && hoy < generadoEl ? hoy : generadoEl;
}

export function vistaRanking({ grilla, mercado: m, id, origenAR, fotos, hoy }: EntradaVista): VistaRanking | null {
  const t = textosRankings(m.idioma, m.trato, m.locale);
  const tr = t.rankings[id];
  const f = formatos(m.locale);
  const def = RANKINGS[id];
  const propio = paisDeEdicion(grilla, m);
  const porMercado = new Map(grilla.paises.map((p) => [p.iso, p]));
  const mes = grilla.generadoEl.slice(0, 7);
  const foto = mes ? fotoAnterior(mes, fotos) : null;
  const fechaIso = diaActualizacion(grilla.generadoEl, hoy);
  const fecha = fechaIso ? formatoFecha(fechaIso, m.locale, true) : "";
  const url = urlRanking(m, id);
  const variantes: VarianteVista[] = [];

  for (const v of def.variantes) {
    const r = rankingDe(grilla, id, v);
    if (!r.filas.length) return null;
    const total = r.filas.length;
    const et = etiquetasVariante(t, id, v, f);
    const filas: FilaVista[] = r.filas.map((fila) => {
      const pais = porMercado.get(fila.iso)!;
      const val = valoresDe(t, r, f, m.locale, fila);
      return {
        iso: fila.iso,
        nombre: nombrePais(pais, m.locale),
        href: hrefDe(pais, origenAR),
        puesto: fila.puesto,
        empate: fila.empatados > 1,
        valor: val.valor,
        detalle: f.pct.format(fila.carga),
        barra: Math.round(fila.barra * 1000) / 1000,
        cambio: textoCambio(t, cambioDe(foto, id, v, fila.iso, fila.puesto)),
        propia: propio?.iso === fila.iso,
      };
    });
    const filaDestacada = r.filas.find((x) => x.iso === propio?.iso) ?? r.filas[0];
    const paisDestacado = porMercado.get(filaDestacada.iso)!;
    const val = valoresDe(t, r, f, m.locale, filaDestacada);
    const nombre = nombrePais(paisDestacado, m.locale);
    const frase = frasePosicion(t, nombre, filaDestacada.puesto, total, filaDestacada.empatados, coma(m.idioma));
    variantes.push({
      id: v,
      ...et,
      caption: t.tabla.caption(tr.titulo, et.referencia),
      filas,
      destacado: {
        iso: filaDestacada.iso,
        nombre,
        puesto: filaDestacada.puesto,
        total,
        valor: val.grande,
        detalle: val.detalle,
        pct: f.pct.format(filaDestacada.carga),
        cambio: textoCambio(t, cambioDe(foto, id, v, filaDestacada.iso, filaDestacada.puesto)),
      },
      esPropia: propio?.iso === filaDestacada.iso,
      frase,
      cita: `${t.kit.cita(frase, tr.titulo, et.referencia, fecha)} ${url}`,
      texto: t.kit.texto(frase, tr.titulo),
      og: rutaOg(m, id, v),
      descarga: rutaOg(m, id, v, true),
    });
  }

  const nombreEdicion = m.codigo === "global" ? null : nombreDePais(m, m.locale);
  return {
    id,
    titulo: tr.titulo,
    corto: tr.corto,
    bajada: tr.bajada,
    url,
    total: variantes[0].filas.length,
    fechaIso,
    fecha,
    mesAnterior: foto ? mesLargo(foto.mes, m.locale) : null,
    tituloVariantes: id === "aumento" ? t.tramos.titulo : t.niveles.titulo,
    variantes,
    porDefecto: Math.max(0, def.variantes.indexOf(def.porDefecto)),
    fuera: !propio && nombreEdicion ? t.fuera(nombreEdicion) : null,
  };
}

export function vistasDeRankings(e: Omit<EntradaVista, "id">): VistaRanking[] {
  return IDS_RANKING.map((id) => vistaRanking({ ...e, id })).filter((v): v is VistaRanking => v !== null);
}

// Para la metodología: «12.000, 30.000 y 75.000».
export function nivelesFormateados(locale: string): [string, string, string] {
  const f = formatos(locale);
  return IDS_NIVEL.map((n) => f.entero.format(NIVELES[n])) as [string, string, string];
}

export function nombreMundo(m: Mercado): string {
  return textosMundo(m.idioma, m.trato, m.locale).nombre;
}
