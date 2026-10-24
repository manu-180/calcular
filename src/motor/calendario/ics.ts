import type { FechaISO } from "../tipos";
import { sumarDias } from "../vigencia";

// iCalendar (RFC 5545) a mano: es poco y así no entra una dependencia. Eventos de día completo
// (DTSTART;VALUE=DATE), UID estable (mismo evento, mismo UID: una suscripción lo actualiza en vez de
// duplicarlo), CRLF y líneas plegadas a 75 octetos sin partir un carácter UTF-8.

export interface EventoIcs {
  uid: string;
  fecha: FechaISO;
  resumen: string;
  descripcion: string;
  url?: string;
  categoria?: string;
  // Del dato, no del pedido: el archivo es igual entre pedidos del mismo día y cachea bien.
  sello: FechaISO;
}

export interface CalendarioIcs {
  nombre: string;
  descripcion: string;
  idioma: string;
  eventos: readonly EventoIcs[];
  // Solo el calendario completo (suscripción): cada cuánto lo vuelve a pedir el cliente.
  refresco?: boolean;
}

export function escaparTexto(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");
}

const codificador = new TextEncoder();

export function plegar(linea: string): string {
  if (codificador.encode(linea).length <= 75) return linea;
  const partes: string[] = [];
  let actual = "";
  let octetos = 0;
  for (const c of linea) {
    const n = codificador.encode(c).length;
    // La primera línea lleva 75 octetos; las siguientes 74 más el espacio que las marca.
    const tope = partes.length === 0 ? 75 : 74;
    if (octetos + n > tope) {
      partes.push(actual);
      actual = "";
      octetos = 0;
    }
    actual += c;
    octetos += n;
  }
  partes.push(actual);
  return partes.join("\r\n ");
}

const fechaIcs = (f: FechaISO) => f.replace(/-/g, "");
const selloIcs = (f: FechaISO) => `${fechaIcs(f)}T000000Z`;

export function armarIcs(c: CalendarioIcs): string {
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CalcularYa//Calendario laboral//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escaparTexto(c.nombre)}`,
    `X-WR-CALDESC:${escaparTexto(c.descripcion)}`,
    ...(c.refresco ? ["REFRESH-INTERVAL;VALUE=DURATION:P1D", "X-PUBLISHED-TTL:P1D"] : []),
  ];
  for (const e of c.eventos) {
    lineas.push(
      "BEGIN:VEVENT",
      `UID:${e.uid}`,
      `DTSTAMP:${selloIcs(e.sello)}`,
      `LAST-MODIFIED:${selloIcs(e.sello)}`,
      `DTSTART;VALUE=DATE:${fechaIcs(e.fecha)}`,
      `DTEND;VALUE=DATE:${fechaIcs(sumarDias(e.fecha, 1))}`,
      `SUMMARY;LANGUAGE=${c.idioma}:${escaparTexto(e.resumen)}`,
      `DESCRIPTION;LANGUAGE=${c.idioma}:${escaparTexto(e.descripcion)}`,
      ...(e.url && /^https:\/\/[^\s]+$/.test(e.url) ? [`URL:${e.url}`] : []),
      ...(e.categoria ? [`CATEGORIES:${escaparTexto(e.categoria)}`] : []),
      "TRANSP:TRANSPARENT",
      "STATUS:CONFIRMED",
      "END:VEVENT",
    );
  }
  lineas.push("END:VCALENDAR");
  return lineas.map(plegar).join("\r\n") + "\r\n";
}

export interface IcsLeido {
  propiedades: Record<string, string>;
  eventos: Record<string, string>[];
  errores: string[];
}

// Lector estricto para check_calendario: despliega, valida CRLF, largo de línea y lo mínimo que
// pide RFC 5545 a cada VEVENT.
export function leerIcs(texto: string): IcsLeido {
  const errores: string[] = [];
  if (!texto.endsWith("\r\n")) errores.push("no termina en CRLF");
  if (/(?<!\r)\n/.test(texto)) errores.push("hay saltos de línea sin CR");
  const fisicas = texto.split("\r\n").slice(0, -1);
  fisicas.forEach((l, i) => {
    if (codificador.encode(l).length > 75) errores.push(`línea ${i + 1}: ${codificador.encode(l).length} octetos (máximo 75)`);
  });
  const logicas: string[] = [];
  for (const l of fisicas) {
    if (l.startsWith(" ") && logicas.length) logicas[logicas.length - 1] += l.slice(1);
    else logicas.push(l);
  }
  const propiedades: Record<string, string> = {};
  const eventos: Record<string, string>[] = [];
  let actual: Record<string, string> | null = null;
  const pila: string[] = [];
  for (const l of logicas) {
    const dos = l.indexOf(":");
    if (dos < 1) {
      errores.push(`línea sin «:»: ${l.slice(0, 40)}`);
      continue;
    }
    const nombre = l.slice(0, dos).split(";")[0].toUpperCase();
    const valor = l.slice(dos + 1);
    if (nombre === "BEGIN") {
      pila.push(valor);
      if (valor === "VEVENT") actual = {};
      continue;
    }
    if (nombre === "END") {
      if (pila.pop() !== valor) errores.push(`END:${valor} sin su BEGIN`);
      if (valor === "VEVENT" && actual) {
        eventos.push(actual);
        actual = null;
      }
      continue;
    }
    if (actual) actual[nombre] = valor;
    else propiedades[nombre] = valor;
  }
  if (pila.length) errores.push(`bloques sin cerrar: ${pila.join(", ")}`);
  if (propiedades.VERSION !== "2.0") errores.push("VERSION no es 2.0");
  if (!propiedades.PRODID) errores.push("falta PRODID");
  const uids = new Set<string>();
  eventos.forEach((e, i) => {
    for (const p of ["UID", "DTSTAMP", "DTSTART", "SUMMARY"]) if (!e[p]) errores.push(`VEVENT ${i + 1}: falta ${p}`);
    if (e.UID && uids.has(e.UID)) errores.push(`UID repetido: ${e.UID}`);
    if (e.UID) uids.add(e.UID);
    if (e.DTSTART && !/^\d{8}$/.test(e.DTSTART)) errores.push(`VEVENT ${i + 1}: DTSTART no es una fecha de día completo`);
    if (e.DTSTAMP && !/^\d{8}T\d{6}Z$/.test(e.DTSTAMP)) errores.push(`VEVENT ${i + 1}: DTSTAMP no es UTC`);
    if (e.DTEND && e.DTSTART && e.DTEND <= e.DTSTART) errores.push(`VEVENT ${i + 1}: DTEND no es posterior a DTSTART`);
    if (e.SUMMARY && /(?<!\\)[,;]/.test(e.SUMMARY)) errores.push(`VEVENT ${i + 1}: SUMMARY con «,» o «;» sin escapar`);
  });
  return { propiedades, eventos, errores };
}
