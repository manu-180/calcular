import "server-only";
// Datos de «¿Cuántas horas de trabajo te cuesta?» en calcular.ar, ya resueltos para la página y la OG.
// Nunca tira: un ítem sin precio vigente queda afuera con su motivo y el resto se publica.
import { CANASTA_BASICA_FUENTE, CANASTA_BASICA_ULTIMO } from "@/data/canasta-basica";
import { hoyAR } from "@/lib/hoy";
import { minimoAr } from "@/lib/horas/ar";
import { ppaArgentina } from "@/lib/mundo/ar";
import type { TablaPpa } from "@/motor/mundo/grilla";
import tablaPpa from "@/motor/mundo/ppa.json";
import { registro } from "@/paises";
import { indiceHoras } from "@/lib/horas/indice";
import precios from "@/lib/horas/precios.json";
import cotidianos from "@/lib/horas/cotidianos-ar.json";
import { precioVigente, VIGENCIA_PRECIO_DIAS } from "@/motor/horas/calculo";
import { nombreEnPagina } from "@/motor/horas/ui/datos-cliente";
import type { ArchivoPrecios } from "@/motor/horas/tipos";
import { DIAS_VIGENCIA_NAFTA, FUENTES_COTIDIANOS, finDeVigenciaPeriodo, ITEMS_COTIDIANOS, sumarDias, type ArchivoCotidianos, type ItemCotidiano } from "./catalogo";

const ARCHIVO = cotidianos as ArchivoCotidianos;
const PRECIOS = precios as ArchivoPrecios;
const PPA = tablaPpa as TablaPpa;

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const mesDe = (periodo: string) => `${MESES[Number(periodo.slice(5, 7)) - 1]} de ${periodo.slice(0, 4)}`;
const fechaDe = (iso: string) => `${Number(iso.slice(8, 10))} de ${MESES[Number(iso.slice(5, 7)) - 1]} de ${iso.slice(0, 4)}`;

export interface FuenteItem {
  organismo: string;
  titulo: string;
  url: string;
}

export interface ItemPublicado {
  id: string;
  nombre: string;
  corto: string;
  cantidad: string;
  monto: number;
  // «agosto de 2026» (precio mensual) o «25 de octubre de 2026» (lectura del día).
  fecha: string;
  vence: string;
  fuente: FuenteItem;
  // Cómo se llegó al precio cuando no es el número tal cual de la fuente.
  nota?: string;
}

export interface PaisAfuera {
  iso: string;
  nombre: string;
  // Salario mínimo por hora en dólares internacionales (moneda local ÷ PPA del Banco Mundial): cuánto
  // compra una hora del mínimo de ese país. Con esto se lleva cualquier precio de acá a ese país.
  minimoPpa: number;
  // Horas con el mínimo de ese país según el precio oficial de la tienda, por id de ítem de acá.
  oficial: Readonly<Record<string, number>>;
}

export interface DatosHorasAR {
  items: readonly ItemPublicado[];
  excluidos: readonly { id: string; motivo: string }[];
  minimo: { porHora: number; nombre: string; url: string } | null;
  // El mínimo argentino en dólares internacionales, para escalar contra cada país.
  afuera: { minimoPpa: number; paises: readonly PaisAfuera[] } | null;
}

type Resuelto = { ok: true; item: ItemPublicado } | { ok: false; motivo: string };

function resolver(i: ItemCotidiano, hoy: string): Resuelto {
  const base = { id: i.id, nombre: i.nombre, corto: i.corto, cantidad: i.cantidad };
  switch (i.fuente) {
    case "indec": {
      const p = ARCHIVO.indec[i.id];
      if (!p) return { ok: false, motivo: "sin precio leído del INDEC (la serie de la API está cortada)" };
      const vence = finDeVigenciaPeriodo(p.periodo);
      if (hoy > vence) return { ok: false, motivo: `el precio de ${mesDe(p.periodo)} venció el ${vence}` };
      return { ok: true, item: { ...base, monto: p.monto, fecha: mesDe(p.periodo), vence, fuente: FUENTES_COTIDIANOS.indec, nota: "Precio promedio del Gran Buenos Aires." } };
    }
    case "energia": {
      const n = ARCHIVO.nafta;
      if (!n) return { ok: false, motivo: "sin lectura de precios en surtidor" };
      const vence = sumarDias(n.consultadoEl, DIAS_VIGENCIA_NAFTA);
      if (hoy > vence) return { ok: false, motivo: `la lectura del ${n.consultadoEl} venció el ${vence}` };
      const litros = i.litros ?? 1;
      const nota = `Mediana de ${n.estaciones} estaciones de la Ciudad que informaron su precio desde el ${fechaDe(n.desde)}${litros > 1 ? `, por ${litros} litros` : ""}.`;
      return { ok: true, item: { ...base, monto: Math.round(n.monto * litros), fecha: fechaDe(n.consultadoEl), vence, fuente: FUENTES_COTIDIANOS.energia, nota } };
    }
    case "canasta": {
      const c = CANASTA_BASICA_ULTIMO;
      const vence = finDeVigenciaPeriodo(c.periodo);
      if (hoy > vence) return { ok: false, motivo: `la canasta de ${mesDe(c.periodo)} venció el ${vence}` };
      return {
        ok: true,
        item: { ...base, monto: c.cbt, fecha: mesDe(c.periodo), vence, fuente: { organismo: "INDEC", titulo: "Canasta básica total del adulto equivalente, Gran Buenos Aires", url: CANASTA_BASICA_FUENTE.informe }, nota: "La línea de pobreza de un adulto por mes: alimentos, transporte, ropa y servicios." },
      };
    }
    case "spotify": {
      const p = PRECIOS.precios.AR?.["spotify-premium"];
      if (!p || p.moneda !== "ARS") return { ok: false, motivo: "sin precio de Spotify en pesos" };
      if (!precioVigente(p.consultadoEl, hoy)) return { ok: false, motivo: `el precio se leyó el ${p.consultadoEl}, hace más de ${VIGENCIA_PRECIO_DIAS} días` };
      return { ok: true, item: { ...base, monto: p.monto, fecha: fechaDe(p.consultadoEl), vence: sumarDias(p.consultadoEl, VIGENCIA_PRECIO_DIAS), fuente: { organismo: "Spotify", titulo: "Precio oficial de Premium Individual en la Argentina", url: p.url }, nota: "Plan Individual, precio de lista." } };
    }
  }
}

// Países que más le dicen algo a alguien de acá.
const AFUERA = ["US", "ES", "BR", "CL", "UY", "MX", "IT", "DE"];
// Ítems de acá con precio oficial de la misma tienda en cada país (src/lib/horas/precios.json).
const OFICIALES: Readonly<Record<string, string>> = { spotify: "spotify-premium" };

function afuera(hoy: string): DatosHorasAR["afuera"] {
  try {
    const filas = indiceHoras().filas;
    const minimoPpa = (iso: string) => {
      const porHora = filas.find((x) => x.iso === iso)?.minimo.porHora;
      const ppa = PPA.paises[iso]?.valor;
      return porHora && ppa ? porHora / ppa : null;
    };
    const smvm = minimoAr(hoy);
    const ppaAr = ppaArgentina(registro, PPA);
    const ar = typeof smvm === "string" || typeof ppaAr === "string" ? null : smvm.porHora / ppaAr.valor;
    if (!ar) return null;
    const paises: PaisAfuera[] = [];
    for (const iso of AFUERA) {
      const m = minimoPpa(iso);
      const fila = filas.find((f) => f.iso === iso);
      if (!m || !fila) continue;
      const oficial: Record<string, number> = {};
      for (const [id, producto] of Object.entries(OFICIALES)) {
        const c = fila.celdas[producto];
        if (c) oficial[id] = Math.round(c.horas * 1000) / 1000;
      }
      paises.push({ iso, nombre: nombreEnPagina(iso, "es", "es-AR"), minimoPpa: Math.round(m * 1e4) / 1e4, oficial });
    }
    return paises.length >= 3 ? { minimoPpa: Math.round(ar * 1e4) / 1e4, paises } : null;
  } catch (err) {
    console.error("[horas ar] índice internacional", err);
    return null;
  }
}

export function datosHorasAR(hoy = hoyAR()): DatosHorasAR {
  const items: ItemPublicado[] = [];
  const excluidos: { id: string; motivo: string }[] = [];
  for (const i of ITEMS_COTIDIANOS) {
    try {
      const r = resolver(i, hoy);
      if (r.ok) items.push(r.item);
      else excluidos.push({ id: i.id, motivo: r.motivo });
    } catch (err) {
      excluidos.push({ id: i.id, motivo: err instanceof Error ? err.message : String(err) });
    }
  }
  let minimo: DatosHorasAR["minimo"] = null;
  try {
    const m = minimoAr(hoy);
    if (typeof m !== "string") minimo = { porHora: m.porHora, nombre: m.nombre, url: m.fuente.url };
  } catch {}
  return { items, excluidos, minimo, afuera: afuera(hoy) };
}
