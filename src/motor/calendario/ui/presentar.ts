import { anchoVisual } from "../../ancho";
import { formatearFecha } from "../../formato";
import { textosCalendario, type TextosCalendario } from "../../i18n/calendario";
import type { ValorFeed } from "../../novedades";
import { rutaIntl, urlIntl } from "../../seo";
import type { FechaISO, Mercado } from "../../tipos";
import { tarjetaDe, type ContextoSitio } from "../../ui/contexto";
import { textosInicio, type TextosInicio } from "../../ui/textos-inicio";
import { diasEntre, sumarDias } from "../../vigencia";
import { esPublicable, type Calendario, type EventoCalendario, type TipoEvento } from "../eventos";
import type { CalendarioIcs, EventoIcs } from "../ics";
import { rutaIcsEvento, urlCalendario, urlIcs, webcal } from "../rutas";

// Del evento del motor (datos) a lo que pinta la página, el .ics y la OG (textos ya formateados en el
// idioma de la edición). Los tres salen de acá: el archivo nunca dice otra cosa que la página.

export interface Enlace {
  titulo: string;
  href: string;
}

export interface EventoVista {
  id: string;
  fecha: FechaISO;
  dias: number;
  tipo: TipoEvento;
  etiqueta: string;
  titulo: string;
  texto?: string;
  cambio?: string;
  zonas?: string;
  limite: boolean;
  fechaLarga: string;
  dia: string;
  mesCorto: string;
  corta: string;
  semana: string;
  fuente: { organismo: string; titulo: string; url: string; linea: string };
  calculadora: Enlace;
  otras: Enlace[];
  ics: string;
  google: string;
}

export interface VistaCalendario {
  m: Mercado;
  t: TextosCalendario;
  fecha: FechaISO;
  anios: string;
  url: string;
  ics: string;
  webcal: string;
  googleSuscribir: string;
  proximos: EventoVista[];
  pasados: EventoVista[];
  meses: { clave: string; nombre: string; anio: number; dias: number; inicio: number; eventos: EventoVista[] }[];
  fuentes: { organismo: string; url: string; titulo: string; verificado: string }[];
  calendario: Extract<Calendario, { ok: true }>;
}

function valorTexto(v: ValorFeed, tn: TextosInicio["novedades"]): string {
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

const legible = (v?: ValorFeed) => v?.tipo === "numero" || v?.tipo === "rango";

function cambioDe(e: EventoCalendario, t: TextosCalendario, tn: TextosInicio["novedades"]): string | undefined {
  if (!e.valor) return undefined;
  if (!legible(e.valor) || (e.anterior && !legible(e.anterior))) return t.cambian;
  if (e.anterior) return t.pasa(valorTexto(e.anterior, tn), valorTexto(e.valor, tn));
  return t.queda(valorTexto(e.valor, tn));
}

const fechaIcs = (f: FechaISO) => f.replace(/-/g, "");

function google(titulo: string, detalle: string, fecha: FechaISO): string {
  const q = new URLSearchParams({ action: "TEMPLATE", text: titulo, dates: `${fechaIcs(fecha)}/${fechaIcs(sumarDias(fecha, 1))}`, details: detalle });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

function lista(locale: string, items: readonly string[]): string {
  try {
    return new Intl.ListFormat(locale, { type: "conjunction" }).format(items);
  } catch {
    return items.join(", ");
  }
}

export function presentarEvento(ctx: ContextoSitio, e: EventoCalendario, t: TextosCalendario): EventoVista {
  const m = ctx.mercado;
  const tn = textosInicio(m.idioma, m.trato, m.locale).novedades;
  const publicadas = new Map(ctx.registro.calculadorasPublicables(m.codigo, ctx.fecha, ctx.modo).map((c) => [c.definicion.slug, c]));
  const enlaces = e.calculadoras.flatMap((slug) => {
    const c = publicadas.get(slug);
    return c ? [{ titulo: tarjetaDe(ctx, m, c).titulo, href: rutaIntl(m.codigo, slug) }] : [];
  });
  const d = new Date(`${e.fecha}T12:00:00Z`);
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(m.locale, { timeZone: "UTC", ...o }).format(d);
  const verificado = formatearFecha(e.fuente.verificadoEl, m.locale);
  const cambio = cambioDe(e, t, tn);
  const zonas = e.zonas?.length ? t.zonas(lista(m.locale, e.zonas)) : undefined;
  const detalle = [cambio, zonas, e.texto, enlaces[0] ? `${t.ics.calculadora}: ${urlIntl(m.codigo, e.calculadoras[0])}` : "", `${t.ics.fuente}: ${e.fuente.organismo}, ${e.fuente.titulo}. ${e.fuente.url}`]
    .filter(Boolean)
    .join("\n");
  return {
    id: e.id,
    fecha: e.fecha,
    dias: diasEntre(ctx.fecha, e.fecha),
    tipo: e.tipo,
    etiqueta: e.limite ? t.limite : t.tipos[e.tipo],
    titulo: e.titulo,
    ...(e.texto ? { texto: e.texto } : {}),
    ...(cambio ? { cambio } : {}),
    ...(zonas ? { zonas } : {}),
    limite: Boolean(e.limite),
    fechaLarga: formatearFecha(e.fecha, m.locale),
    dia: fmt({ day: "numeric" }),
    mesCorto: fmt({ month: "short" }).replace(/\.$/, ""),
    corta: fmt({ day: "numeric", month: "short" }),
    semana: fmt({ weekday: "long" }),
    fuente: { organismo: e.fuente.organismo, titulo: e.fuente.titulo, url: e.fuente.url, linea: t.fuente(e.fuente.organismo, verificado) },
    calculadora: enlaces[0] ?? { titulo: "", href: rutaIntl(m.codigo) },
    otras: enlaces.slice(1, 3),
    ics: rutaIcsEvento(m, e.id),
    google: google(e.titulo, detalle, e.fecha),
  };
}

export function textosDe(m: Pick<Mercado, "idioma" | "trato" | "locale">): TextosCalendario {
  return textosCalendario(m.idioma, m.trato, m.locale);
}

export function vistaCalendario(ctx: ContextoSitio, c: Calendario): VistaCalendario | null {
  if (!esPublicable(c)) return null;
  const m = ctx.mercado;
  const t = textosDe(m);
  const eventos = c.eventos.map((e) => presentarEvento(ctx, e, t));
  const proximos = eventos.filter((e) => e.fecha >= c.fecha);
  const pasados = eventos.filter((e) => e.fecha < c.fecha).reverse();
  const meses: VistaCalendario["meses"] = [];
  const [a0, m0] = c.fecha.split("-").map(Number);
  // El período es el de la grilla de 12 meses que muestra la página, no el año de las fechas por delante:
  // en octubre de 2026 con todo lo próximo en 2027, «Calendario 2027» hacía creer que faltaba el resto de 2026.
  const aFin = a0 + Math.floor((m0 - 1 + 11) / 12);
  const anios = aFin === a0 ? String(a0) : `${a0}-${aFin}`;
  const nombreMes = new Intl.DateTimeFormat(m.locale, { month: "long", timeZone: "UTC" });
  for (let i = 0; i < 12; i++) {
    const anio = a0 + Math.floor((m0 - 1 + i) / 12);
    const mes = ((m0 - 1 + i) % 12) + 1;
    const clave = `${anio}-${String(mes).padStart(2, "0")}`;
    const primero = new Date(Date.UTC(anio, mes - 1, 1));
    meses.push({
      clave,
      nombre: nombreMes.format(primero),
      anio,
      dias: new Date(Date.UTC(anio, mes, 0)).getUTCDate(),
      // Lunes = 0: la grilla empieza en lunes en casi todos los países del sitio.
      inicio: (primero.getUTCDay() + 6) % 7,
      eventos: proximos.filter((e) => e.fecha.startsWith(clave)),
    });
  }
  const porUrl = new Map<string, VistaCalendario["fuentes"][number]>();
  for (const e of c.eventos) {
    const previa = porUrl.get(e.fuente.url);
    if (!previa || previa.verificado > e.fuente.verificadoEl) porUrl.set(e.fuente.url, { organismo: e.fuente.organismo, url: e.fuente.url, titulo: e.fuente.titulo, verificado: e.fuente.verificadoEl });
  }
  const fuentes = [...porUrl.values()]
    .sort((a, b) => a.organismo.localeCompare(b.organismo, m.locale))
    .map((f) => ({ ...f, verificado: formatearFecha(f.verificado as FechaISO, m.locale) }));
  const url = urlCalendario(m);
  const ics = urlIcs(m);
  return {
    m,
    t,
    fecha: c.fecha,
    anios,
    url,
    ics,
    webcal: webcal(ics),
    googleSuscribir: `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal(ics))}`,
    proximos,
    pasados,
    meses,
    fuentes,
    calendario: c,
  };
}

// Descripción para buscadores: las próximas fechas con nombre, tantas como entren en 160 de ancho.
export function descripcionSeo(v: VistaCalendario): string {
  const { t, m } = v;
  const corta = (e: EventoVista) => `${e.titulo} (${e.corta})`;
  for (let n = Math.min(3, v.proximos.length); n >= 1; n--) {
    const d = t.seo.descripcion(m.nombre, lista(m.locale, v.proximos.slice(0, n).map(corta)));
    if (anchoVisual(d) <= 160) return d;
  }
  return t.seo.descripcionSin(m.nombre);
}

export function icsDe(v: VistaCalendario, eventos: readonly EventoVista[] = [...v.pasados, ...v.proximos], refresco = true): CalendarioIcs {
  const { t, m } = v;
  const porId = new Map(v.calendario.eventos.map((e) => [e.id, e]));
  const lista: EventoIcs[] = eventos.map((e) => {
    const crudo = porId.get(e.id)!;
    const descripcion = [e.cambio, e.zonas, e.texto, `${t.ics.calculadora}: ${e.calculadora.titulo} ${urlIntl(m.codigo, crudo.calculadoras[0])}`, `${t.ics.fuente}: ${e.fuente.organismo}, ${e.fuente.titulo}. ${e.fuente.url}`, e.fuente.linea]
      .filter(Boolean)
      .join("\n");
    return {
      uid: `${m.codigo}.${e.id}@calcularya.com`,
      fecha: e.fecha,
      resumen: e.limite ? `${e.titulo} (${t.limite})` : e.titulo,
      descripcion,
      url: urlIntl(m.codigo, crudo.calculadoras[0]),
      categoria: e.etiqueta,
      sello: crudo.fuente.verificadoEl,
    };
  });
  return { nombre: t.ics.nombre(m.nombre), descripcion: t.ics.descripcion(m.nombre), idioma: m.locale, eventos: lista, refresco };
}
