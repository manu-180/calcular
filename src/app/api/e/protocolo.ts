import { createHash, randomBytes } from "node:crypto";
import { esMercadoIntl, mercadoDeRuta, type Sitio } from "@/lib/medicion/mercados";
import { esTipoEvento, limpiarRuta, type TipoEvento } from "@/lib/rastreo";
import { ORIGENES_COMPARTIR, ORIGENES_CORTOS, REF_VALIDO, VARIANTES_PUENTE } from "@/motor/compartir/ref";
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
  exp?: Record<string, string>;
};

// Los campos que no vinieron quedan afuera del objeto: ca_cerrar_vista2 los toma como null y no pisa
// lo que la vista ya tenía. Un lote puede traer sólo los vitals de una vista que cerró en otro lote.
export type ArgsCierre = {
  p_id: string;
  p_activo_ms?: number;
  p_interacciones?: number;
  p_scroll?: number;
  p_uso?: boolean;
  p_resultado_ms?: number;
  p_campo_ult?: string;
  p_rabia?: number;
  p_rabia_el?: string;
  p_lcp_ms?: number;
  p_inp_ms?: number;
  p_cls_milli?: number;
  p_ttfb_ms?: number;
  p_lcp_el?: string;
  p_inp_el?: string;
};

export const CLAVES_BASE_CIERRE = ["p_id", "p_activo_ms", "p_interacciones", "p_scroll", "p_uso"] as const;

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
  pais?: string | null;
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
// calcular.ar: `planilla-comercio`. calcularya: `<mercado>/<slug>` (src/lib/pagos/catalogo-intl.ts), hasta
// los 60 caracteres de ca_eventos.producto.
const PRODUCTO = /^(?:[a-z0-9-]{1,40}|(?=.{4,60}$)(?:[a-z]{2}(?:-[a-z]{2,3})?|global)\/[a-z0-9-]+)$/;
const CLAVE_PROP = /^[a-z_][a-z0-9_]{0,23}$/;
const EMAIL = /[^\s@<>()[\]]+@[^\s@<>()[\]]+\.[a-z]{2,}/gi;
const HOSTS_PROPIOS = /(^|\.)calcular\.ar$|(^|\.)calcularya\.com$|^localhost$|\.vercel\.app$/;

export function esProducto(x: unknown): x is string {
  return typeof x === "string" && PRODUCTO.test(x);
}

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

type Regla = (v: unknown) => boolean;
const enLista = (lista: readonly string[]): Regla => (v) => typeof v === "string" && lista.includes(v);
const conForma = (re: RegExp): Regla => (v) => typeof v === "string" && re.test(v);
const booleano: Regla = (v) => typeof v === "boolean";

// Ids de calculadora del motor: `mx.sueldo-neto`, `ca-fr.impot`, `pk.short-term-savings-certificate-calculator`.
const CALCULADORA = /^(?=.{4,72}$)(?:[a-z]{2}(?:-[a-z]{2,3})?|global)\.[a-z0-9-]+$/;
// «link» es el de la barra de calcular.ar (src/components/herramientas/Barra.tsx); el resto, de src/motor/compartir.
const CANALES = ["nativo", "copiar", "whatsapp", "x", "telegram", "linkedin", "link"] as const;
const VARIANTE = enLista(VARIANTES_PUENTE);

type Esquema = { requeridas: Readonly<Record<string, Regla>>; opcionales?: Readonly<Record<string, Regla>> };

// Los eventos del boca en boca se guardan con una lista cerrada de props por tipo: una clave de más se
// tira y un valor que no cumple tira el evento. Así no entra un monto ni un texto libre por ahí, aunque
// alguien arme el beacon a mano. Ninguna de estas props es numérica a propósito.
const ESQUEMAS: Partial<Record<TipoEvento, Esquema>> = {
  llegada: { requeridas: { ref: conForma(REF_VALIDO) }, opcionales: { origen: enLista(ORIGENES_CORTOS), nuevo: booleano } },
  puente_visto: { requeridas: { v: VARIANTE } },
  puente_clic: { requeridas: { v: VARIANTE } },
  compartir: {
    requeridas: { canal: enLista(CANALES) },
    opcionales: { origen: enLista(ORIGENES_COMPARTIR), calc: conForma(CALCULADORA), ref: conForma(REF_VALIDO), v: VARIANTE },
  },
};

function propsDeEsquema(esquema: Esquema, x: unknown): Props | undefined {
  const pp = x === undefined ? {} : x;
  if (!esObjeto(pp)) return undefined;
  const out: Props = {};
  for (const [k, ok] of Object.entries(esquema.requeridas)) {
    if (!ok(pp[k])) return undefined;
    out[k] = pp[k] as string | boolean;
  }
  for (const [k, ok] of Object.entries(esquema.opcionales ?? {})) {
    if (!(k in pp)) continue;
    if (!ok(pp[k])) return undefined;
    out[k] = pp[k] as string | boolean;
  }
  return out;
}

const entero = (x: unknown, max: number): number | null =>
  typeof x === "number" && Number.isFinite(x) && x >= 0 ? Math.min(Math.round(x), max) : null;

const EXP_ID = /^[a-z0-9-]{1,24}$/;
const EXP_VARIANTE = /^[a-z]$/;

// La variante que vio cada experimento: sólo ids y una letra, nunca otra cosa.
export function limpiarExp(x: unknown): Record<string, string> | null | undefined {
  if (x === undefined) return null;
  if (!esObjeto(x)) return undefined;
  const claves = Object.keys(x);
  if (claves.length > 4) return undefined;
  const out: Record<string, string> = {};
  for (const k of claves) {
    const v = x[k];
    if (!EXP_ID.test(k) || typeof v !== "string" || !EXP_VARIANTE.test(v)) return undefined;
    out[k] = v;
  }
  return claves.length ? out : null;
}

// Selectores CSS de web-vitals o del clic de rabia: sirven para saber QUÉ elemento frena, no traen
// datos de la persona. Se queda la cola (lo más específico) y se tira todo carácter raro.
export function limpiarSelector(x: unknown): string | null {
  if (typeof x !== "string" || x.length > 500) return null;
  const s = x.replace(/[^A-Za-z0-9_\-#.>: ]+/g, "").replace(/\s+/g, " ").trim();
  return s ? s.slice(-80) : null;
}

// El campo donde quedó trabada la persona: el name, el id o el texto del label. Es texto de la página,
// pero igual pasa por limpiarTexto por si un name lleva algo tipeado.
export function limpiarCampo(x: unknown): string | null {
  if (typeof x !== "string" || x.length > 200) return null;
  const s = limpiarTexto(x).slice(0, 40).trim();
  return s || null;
}

const conValor = <T extends Record<string, unknown>>(o: T): Partial<T> =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined)) as Partial<T>;

function fusionar(previo: ArgsCierre | undefined, nuevo: ArgsCierre): ArgsCierre {
  if (!previo) return nuevo;
  const max = (a?: number, b?: number) => (a === undefined ? b : b === undefined ? a : Math.max(a, b));
  return conValor({
    ...previo,
    ...nuevo,
    p_activo_ms: max(previo.p_activo_ms, nuevo.p_activo_ms),
    p_interacciones: max(previo.p_interacciones, nuevo.p_interacciones),
    p_scroll: max(previo.p_scroll, nuevo.p_scroll),
    p_uso: previo.p_uso || nuevo.p_uso ? true : (nuevo.p_uso ?? previo.p_uso),
    p_rabia: max(previo.p_rabia, nuevo.p_rabia),
    p_inp_ms: max(previo.p_inp_ms, nuevo.p_inp_ms),
    p_cls_milli: max(previo.p_cls_milli, nuevo.p_cls_milli),
    p_resultado_ms: previo.p_resultado_ms ?? nuevo.p_resultado_ms,
  }) as ArgsCierre;
}

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
      const exp = limpiarExp(it.x);
      if (!esUuid(it.id) || !path || lote.vistas.length >= MAX_VISTAS || !mercadoOk(it.m) || exp === undefined) {
        lote.descartados.push("vista");
        continue;
      }
      lote.vistas.push({
        ...(exp ? { exp } : {}),
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
      cierres.set(
        id,
        fusionar(
          cierres.get(id),
          conValor({
            p_id: id,
            p_activo_ms: a,
            p_interacciones: n,
            p_scroll: s,
            p_uso: it.u,
            p_resultado_ms: entero(it.r, TOPE_ACTIVO_MS),
            p_campo_ult: limpiarCampo(it.c),
            p_rabia: entero(it.g, 1000),
            p_rabia_el: limpiarSelector(it.ge),
          }) as ArgsCierre,
        ),
      );
    } else if (it.t === "w") {
      const w = conValor({
        p_lcp_ms: entero(it.lcp, 120_000),
        p_inp_ms: entero(it.inp, 120_000),
        p_cls_milli: entero(it.cls, 100_000),
        p_ttfb_ms: entero(it.ttfb, 120_000),
        p_lcp_el: limpiarSelector(it.le),
        p_inp_el: limpiarSelector(it.ie),
      });
      if (!esUuid(it.id) || !Object.keys(w).length) {
        lote.descartados.push("vitals");
        continue;
      }
      const id = it.id.toLowerCase();
      cierres.set(id, fusionar(cierres.get(id), { p_id: id, ...w } as ArgsCierre));
    } else if (it.t === "e") {
      const path = it.p === undefined ? null : limpiarPath(it.p);
      const esquema = esTipoEvento(it.k) ? ESQUEMAS[it.k] : undefined;
      const props = esquema ? propsDeEsquema(esquema, it.pp) : limpiarProps(it.pp);
      const valorOk = it.va === undefined || (!esquema && typeof it.va === "number" && Number.isFinite(it.va) && Math.abs(it.va) <= 1e10);
      const productoOk = it.pr === undefined || (!esquema && esProducto(it.pr));
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
        pais: ctx.pais,
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
