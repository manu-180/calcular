import { createHash, randomBytes } from "node:crypto";
import { esMercadoIntl, mercadoDeRuta, type Sitio } from "@/lib/medicion/mercados";
import { esTipoEvento, limpiarRuta, type TipoEvento } from "@/lib/rastreo";
import { origenIntl } from "@/motor/sitio";

export const MAX_CUERPO = 8192;
export const MAX_ITEMS = 20;
const MAX_VISTAS = 3;
// El check de la tabla mide `props::text`, que suma espacios al serializar: con margen, un evento
// cerca del tope no voltea el insert del lote entero.
const MAX_PROPS_BYTES = 1500;
const TOPE_ACTIVO_MS = 4 * 3_600_000;

export type Dispositivo = "movil" | "tablet" | "escritorio";

export type FilaVista = {
  id: string;
  vid: string;
  sid: string;
  path: string;
  ref_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  dispositivo: Dispositivo;
  pais: string | null;
  sitio?: "intl";
  mercado?: string;
};

export type ArgsCierre = {
  p_id: string;
  p_activo_ms: number;
  p_interacciones: number;
  p_scroll: number;
  p_uso: boolean;
};

export type Props = Record<string, string | number | boolean | null>;

export type FilaEvento = {
  vid: string | null;
  sid: string | null;
  vista_id: string | null;
  tipo: TipoEvento;
  path: string | null;
  producto: string | null;
  valor: number | null;
  props: Props | null;
  user_id: string | null;
  sitio?: "intl";
  mercado?: string;
};

// Las filas de calcular.ar no llevan sitio ni mercado: la base pone 'ar' por defecto, y así el
// insert anda igual antes y después de la migración 20261008120000.
export type Contexto = { dispositivo: Dispositivo; pais: string | null; sitio?: Sitio };

export type Lote = {
  vistas: FilaVista[];
  cierres: ArgsCierre[];
  eventos: FilaEvento[];
  descartados: string[];
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HOST = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;
const PRODUCTO = /^[a-z0-9-]{1,40}$/;
const CLAVE_PROP = /^[a-z_][a-z0-9_]{0,23}$/;
const EMAIL = /[^\s@<>()[\]]+@[^\s@<>()[\]]+\.[a-z]{2,}/gi;
const HOSTS_PROPIOS = /(^|\.)calcular\.ar$|(^|\.)calcularya\.com$|^localhost$|\.vercel\.app$/;

export function esUuid(x: unknown): x is string {
  return typeof x === "string" && UUID.test(x);
}

const esObjeto = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null && !Array.isArray(x);

export const limpiarPath = limpiarRuta;

export function limpiarHost(x: unknown): string | null {
  if (typeof x !== "string" || x.length > 100) return null;
  const h = x.toLowerCase().replace(/^www\./, "");
  return HOST.test(h) && !HOSTS_PROPIOS.test(h) ? h : null;
}

export function limpiarUtm(x: unknown): string | null {
  if (typeof x !== "string" || x.length > 200 || x.includes("@")) return null;
  const v = x
    .toLowerCase()
    .replace(/[^a-z0-9._+\- ]+/g, "-")
    .trim()
    .slice(0, 60);
  return v || null;
}

// Una búsqueda o un mensaje de error pueden traer datos que la persona tipeó: mails, CUIT, un
// número de tarjeta o una URL con su query. Nada de eso tiene que llegar a la base.
export function limpiarTexto(s: string): string {
  return s
    .replace(EMAIL, "[email]")
    .replace(/(https?:\/\/[^\s?#]*)[?#]\S*/g, "$1")
    .replace(/\b\d{2}-\d{8}-\d\b|\d(?:[ -]?\d){10,}/g, "[num]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

export function limpiarProps(x: unknown): Props | null | undefined {
  if (x === undefined) return null;
  if (!esObjeto(x)) return undefined;
  const claves = Object.keys(x);
  if (claves.length > 8) return undefined;
  const out: Props = {};
  for (const k of claves) {
    if (!CLAVE_PROP.test(k)) return undefined;
    const v = x[k];
    if (typeof v === "string") out[k] = limpiarTexto(v);
    else if (typeof v === "number" && Number.isFinite(v)) out[k] = v;
    else if (typeof v === "boolean" || v === null) out[k] = v;
    else return undefined;
  }
  if (Buffer.byteLength(JSON.stringify(out)) > MAX_PROPS_BYTES) return undefined;
  return claves.length ? out : null;
}

const entero = (x: unknown, max: number): number | null =>
  typeof x === "number" && Number.isFinite(x) && x >= 0 ? Math.min(Math.round(x), max) : null;

export function validarLote(cuerpo: unknown, ctx: Contexto): Lote | { error: string } {
  if (!esObjeto(cuerpo)) return { error: "cuerpo" };
  const { vid, sid, i } = cuerpo;
  if (!esUuid(vid) || !esUuid(sid)) return { error: "ids" };
  if (!Array.isArray(i) || i.length === 0 || i.length > MAX_ITEMS) return { error: "items" };

  const intl = ctx.sitio === "intl";
  const lote: Lote = { vistas: [], cierres: [], eventos: [], descartados: [] };
  const mercadoOk = (m: unknown) => !intl || m === undefined || esMercadoIntl(m);
  const delMercado = (m: unknown, path: string | null) =>
    intl ? { sitio: "intl" as const, mercado: esMercadoIntl(m) ? m : mercadoDeRuta(path ?? "/") } : {};
  const cierres = new Map<string, ArgsCierre>();

  for (const it of i) {
    if (!esObjeto(it)) {
      lote.descartados.push("item");
      continue;
    }
    if (it.t === "v") {
      const path = limpiarPath(it.p);
      if (!esUuid(it.id) || !path || lote.vistas.length >= MAX_VISTAS || !mercadoOk(it.m)) {
        lote.descartados.push("vista");
        continue;
      }
      lote.vistas.push({
        id: it.id.toLowerCase(),
        vid: vid.toLowerCase(),
        sid: sid.toLowerCase(),
        path,
        ref_host: limpiarHost(it.r),
        utm_source: limpiarUtm(it.us),
        utm_medium: limpiarUtm(it.um),
        utm_campaign: limpiarUtm(it.uc),
        dispositivo: ctx.dispositivo,
        pais: ctx.pais,
        ...delMercado(it.m, path),
      });
    } else if (it.t === "x") {
      const a = entero(it.a, TOPE_ACTIVO_MS);
      const n = entero(it.n, 10_000);
      const s = entero(it.s, 100);
      if (!esUuid(it.id) || a === null || n === null || s === null || typeof it.u !== "boolean") {
        lote.descartados.push("cierre");
        continue;
      }
      const id = it.id.toLowerCase();
      const previo = cierres.get(id);
      cierres.set(id, {
        p_id: id,
        p_activo_ms: Math.max(a, previo?.p_activo_ms ?? 0),
        p_interacciones: Math.max(n, previo?.p_interacciones ?? 0),
        p_scroll: Math.max(s, previo?.p_scroll ?? 0),
        p_uso: it.u || !!previo?.p_uso,
      });
    } else if (it.t === "e") {
      const path = it.p === undefined ? null : limpiarPath(it.p);
      const props = limpiarProps(it.pp);
      const valorOk = it.va === undefined || (typeof it.va === "number" && Number.isFinite(it.va) && Math.abs(it.va) <= 1e10);
      const productoOk = it.pr === undefined || (typeof it.pr === "string" && PRODUCTO.test(it.pr));
      const vistaOk = it.v === undefined || esUuid(it.v);
      if (!esTipoEvento(it.k) || (it.p !== undefined && !path) || props === undefined || !valorOk || !productoOk || !vistaOk || !mercadoOk(it.m)) {
        lote.descartados.push("evento");
        continue;
      }
      lote.eventos.push({
        vid: vid.toLowerCase(),
        sid: sid.toLowerCase(),
        vista_id: typeof it.v === "string" ? it.v.toLowerCase() : null,
        tipo: it.k,
        path,
        producto: typeof it.pr === "string" ? it.pr : null,
        valor: typeof it.va === "number" ? it.va : null,
        props,
        user_id: null,
        ...delMercado(it.m, path),
      });
    } else {
      lote.descartados.push("tipo");
    }
  }
  lote.cierres = [...cierres.values()];
  return lote;
}

// Conservadora a propósito: un falso positivo es una vista perdida; un falso negativo, una
// vista inventada. Los agentes que ejecutan JS sin decirlo quedan afuera por navigator.webdriver.
// `(?<!cu)` salva a los celulares Cubot, que llevan «bot» en el modelo.
const BOT =
  /(?<!cu)bot|crawl|spider|slurp|scrape|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|preview|facebookexternalhit|embedly|mediapartners|inspectiontool|curl\/|wget|python|httpx|aiohttp|axios|node-fetch|undici|go-http|java\/|okhttp|libwww|phantom|puppeteer|playwright|selenium|claude-(?:web|user)|chatgpt-user|perplexity/i;

export function esBot(ua: string | null): boolean {
  return !ua || ua.length < 20 || BOT.test(ua);
}

export function dispositivo(ua: string | null, chMovil?: string | null): Dispositivo {
  const u = ua ?? "";
  if (/ipad|tablet|kindle|silk|playbook|(android(?!.*mobile))/i.test(u)) return "tablet";
  if (chMovil === "?1" || /mobi|iphone|ipod|windows phone|blackberry|opera mini/i.test(u)) return "movil";
  return "escritorio";
}

export function pais(x: string | null): string | null {
  return x && /^[A-Z]{2}$/.test(x) && x !== "XX" ? x : null;
}

const ORIGENES_PROD = ["https://calcular.ar", "https://www.calcular.ar"];
const ORIGENES_DEV = ["http://localhost:3107", "http://localhost:3000", "http://127.0.0.1:3107"];

function variantes(origen: string | null): string[] {
  if (!origen) return [];
  const u = new URL(origen);
  if (u.hostname.startsWith("www.")) return [origen];
  return [origen, `${u.protocol}//www.${u.host}`];
}

const coincide = (lista: readonly string[], origin: string | null, referer: string | null) =>
  origin ? lista.includes(origin) : !!referer && lista.some((o) => referer === o || referer.startsWith(`${o}/`));

// El sitio sale del Origin (o del Referer), nunca del cuerpo: en producción calcularya no puede
// escribir filas de calcular.ar ni al revés. "dev" deja que el cuerpo lo diga, sólo en next dev.
export function sitioDeOrigen(
  origin: string | null,
  referer: string | null,
  dev: boolean,
  origenesIntl: readonly string[] = variantes(origenIntl()),
): Sitio | "dev" | null {
  if (coincide(ORIGENES_PROD, origin, referer)) return "ar";
  if (origenesIntl.length && coincide(origenesIntl, origin, referer)) return "intl";
  if (dev && coincide(ORIGENES_DEV, origin, referer)) return "dev";
  return null;
}

export function origenPermitido(origin: string | null, referer: string | null, dev: boolean): boolean {
  return sitioDeOrigen(origin, referer, dev) !== null;
}

// El límite vive en memoria de la instancia y con la IP hasheada con una sal que nunca sale
// del proceso: frena una ráfaga sin guardar la IP en ningún lado ni sumar un viaje a la base
// por cada beacon. Con varias instancias el tope real es N veces este; alcanza para un abuso burdo.
const SAL = randomBytes(16);
const MAX_POR_MINUTO = 240;
const cuenta = new Map<string, number>();
let ventana = 0;

export function claveCliente(ip: string | null): string {
  return createHash("sha256").update(SAL).update(ip ?? "").digest("base64url").slice(0, 16);
}

export function dentroDelLimite(clave: string, ahora = Date.now(), max = MAX_POR_MINUTO): boolean {
  if (ahora - ventana >= 60_000 || cuenta.size > 20_000) {
    cuenta.clear();
    ventana = ahora;
  }
  const n = (cuenta.get(clave) ?? 0) + 1;
  cuenta.set(clave, n);
  return n <= max;
}

export async function leerCuerpo(req: Request, max = MAX_CUERPO): Promise<string | null> {
  const largo = Number(req.headers.get("content-length") ?? "0");
  if (largo > max || !req.body) return null;
  const lector = req.body.getReader();
  const partes: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await lector.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await lector.cancel().catch(() => {});
      return null;
    }
    partes.push(value);
  }
  return Buffer.concat(partes).toString("utf8");
}
