// MercadoPago Checkout Pro — capa de cobro del catálogo de productos pagos.
//
// Patrón del repo: rutas Next.js + `fetch` contra la REST API de MP (sin SDK,
// igual que /api/subscribe). MercadoPago es la FUENTE DE VERDAD del pago: nunca
// confiar en los query params del redirect — siempre re-consultar el pago acá.
//
// Server-only: usa MP_ACCESS_TOKEN (producción, APP_USR-...). JAMÁS exponer como
// NEXT_PUBLIC. Las formas de request/response están verificadas contra los tipos
// del SDK oficial de MP (mercadopago/sdk-nodejs) — no de memoria.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { limpiarRuta } from "./rastreo";

const MP_API = "https://api.mercadopago.com";

function accessToken(): string {
  const t = process.env.MP_ACCESS_TOKEN;
  if (!t) throw new Error("MP_ACCESS_TOKEN no configurado");
  return t;
}

// ─── Catálogo ────────────────────────────────────────────────────────────────

export type ProductoSlug =
  | "planilla-comercio"
  | "planilla-uocra"
  | "planilla-casas-particulares"
  | "planilla-monotributo";

export type Producto = {
  slug: ProductoSlug;
  /** Slug con el que se guardó `metadata.producto` en pagos viejos. Sin esto, la compra del
   *  8/8/2026 (la primera del imperio) dejaría de resolverse y esa clienta perdería el acceso
   *  a las actualizaciones que le prometimos. */
  slugLegado?: string;
  titulo: string;
  tituloCorto: string;
  convenio: string;
  /** Para quién es, en una línea: lo usan el catálogo, el cross-sell y el mail de recupero. */
  paraQuien: string;
  /** Qué dispara una versión nueva del archivo (va en el mail de entrega, completando la frase
   *  «Ese enlace no vence: …, actualizamos la planilla»). */
  disparadorActualizacion: string;
  precio: number;
  moneda: "ARS";
  archivo: string;
  rutaDescarga: string;
  rutaLanding: string;
};

// Single source of truth de precio/moneda/archivo: el cobro, la validación del pago y la
// entrega leen de acá, así no hay drift entre lo que se cobra y lo que se valida.
export const PRODUCTOS: Record<ProductoSlug, Producto> = {
  "planilla-comercio": {
    slug: "planilla-comercio",
    slugLegado: "planilla-comercio-2026",
    titulo: "Planilla de sueldos Empleados de Comercio 2026",
    tituloCorto: "Planilla Comercio 2026",
    convenio: "CCT 130/75 — Empleados de Comercio",
    paraQuien: "Para liquidar sueldos de comercio con la escala de FAECYS ya cargada",
    disparadorActualizacion: "cada vez que FAECYS publica una circular con escala nueva",
    precio: 14900,
    moneda: "ARS",
    archivo: "planilla-comercio-2026.xlsx",
    rutaDescarga: "/api/planilla-comercio/download",
    rutaLanding: "/planillas",
  },
  "planilla-uocra": {
    slug: "planilla-uocra",
    titulo: "Planilla de sueldos UOCRA 2026",
    tituloCorto: "Planilla UOCRA 2026",
    convenio: "CCT 76/75 — Construcción (UOCRA)",
    paraQuien: "Para liquidar jornales de la construcción en las cuatro zonas",
    disparadorActualizacion: "cada vez que UOCRA y CAMARCO firman un tramo nuevo",
    precio: 14900,
    moneda: "ARS",
    archivo: "planilla-uocra-2026.xlsx",
    rutaDescarga: "/api/planilla-uocra/download",
    rutaLanding: "/planillas/uocra",
  },
  // Los dos productos de audiencia masiva valen menos que los de liquidación por convenio a
  // propósito: quien compra la de Comercio es un comercio o un estudio (gasto del negocio);
  // éstas las paga una familia o un monotributista de su bolsillo.
  "planilla-casas-particulares": {
    slug: "planilla-casas-particulares",
    titulo: "Planilla de sueldo de Casas Particulares 2026",
    tituloCorto: "Planilla Casas Particulares 2026",
    convenio: "Ley 26.844 — Personal de Casas Particulares",
    paraQuien: "Para la familia que le paga el sueldo a una empleada doméstica",
    disparadorActualizacion: "cada vez que la Comisión Nacional de Trabajo en Casas Particulares fija una escala nueva",
    precio: 9900,
    moneda: "ARS",
    archivo: "planilla-casas-particulares-2026.xlsx",
    rutaDescarga: "/api/planilla-casas-particulares/download",
    rutaLanding: "/planillas/casas-particulares",
  },
  "planilla-monotributo": {
    slug: "planilla-monotributo",
    titulo: "Planilla de control de Monotributo 2026",
    tituloCorto: "Planilla Monotributo 2026",
    convenio: "Régimen Simplificado (Monotributo) — ARCA",
    paraQuien: "Para el monotributista que quiere saber cuánto más puede facturar sin saltar de categoría",
    disparadorActualizacion: "cada vez que ARCA actualiza las categorías (febrero y agosto)",
    precio: 9900,
    moneda: "ARS",
    archivo: "planilla-monotributo-2026.xlsx",
    rutaDescarga: "/api/planilla-monotributo/download",
    rutaLanding: "/planillas/monotributo",
  },
};

/** Orden en que se muestran en el catálogo y en los cross-sell. */
export const CATALOGO: Producto[] = [
  PRODUCTOS["planilla-comercio"],
  PRODUCTOS["planilla-casas-particulares"],
  PRODUCTOS["planilla-monotributo"],
  PRODUCTOS["planilla-uocra"],
];

/** Alias histórico: había un único producto y medio repo lo importa así. */
export const PRODUCTO = PRODUCTOS["planilla-comercio"];

export function productoPorSlug(slug: string | null | undefined): Producto | null {
  if (!slug) return null;
  const directo = PRODUCTOS[slug as ProductoSlug];
  if (directo) return directo;
  return Object.values(PRODUCTOS).find((p) => p.slugLegado === slug) ?? null;
}

/** `external_reference` de la preferencia: `<slug>:<uuid>[:<desde>]`. El slug viaja adelante porque
 *  MP devuelve `external_reference` SIEMPRE en el pago (a diferencia de `metadata`, que depende
 *  de la integración), y es lo que le deja al webhook y a la descarga saber qué se compró.
 *  `desde` (de qué página vino el comprador) va al final porque la búsqueda de preferencias de MP
 *  no devuelve `metadata`: es la única forma de medir qué página vende sin una base propia. */
export function referenciaExterna(slug: ProductoSlug, desde?: string | null): string {
  const base = `${slug}:${crypto.randomUUID()}`;
  const origen = normalizarDesde(desde);
  return origen ? `${base}:${origen}` : base;
}

/** Deja `desde` en un slug corto y seguro para la referencia (MP corta en 256 caracteres). */
export function normalizarDesde(desde: string | null | undefined): string {
  if (!desde) return "";
  return desde
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9._/-]+/g, "-")
    .replace(/^[-/]+|[-/]+$/g, "")
    .slice(0, 60);
}

/** Lee el tercer segmento de la referencia. Vacío en referencias viejas (sin origen). */
export function desdeDeReferencia(ref: string | null | undefined): string {
  const partes = (ref ?? "").split(":");
  return partes.length >= 3 ? partes.slice(2).join(":") : "";
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** El uuid de la referencia es la PK de `ca_checkouts`. Null en referencias viejas sin uuid. */
export function checkoutIdDeReferencia(ref: string | null | undefined): string | null {
  const id = (ref ?? "").split(":")[1] ?? "";
  return UUID_RE.test(id) ? id.toLowerCase() : null;
}

export type FilaCheckout = {
  id: string;
  producto: ProductoSlug;
  email: string | null;
  vid: string | null;
  user_id: string | null;
  desde: string | null;
  estado: "iniciado";
  monto: number;
};

/** `ca_checkouts.desde` es la ruta donde se abrió la compra (`/planillas`, `/aguinaldo`), nunca la
 *  marca de la referencia: qué página vendió lo resuelve el panel por `vid`. */
export function filaCheckout(p: {
  referencia: string;
  producto: Producto;
  ruta?: string | null;
  email?: string | null;
  vid?: string | null;
  userId?: string | null;
}): FilaCheckout | null {
  const id = checkoutIdDeReferencia(p.referencia);
  if (!id) return null;
  return {
    id,
    producto: p.producto.slug,
    email: emailValido(p.email),
    vid: p.vid && UUID_RE.test(p.vid) ? p.vid.toLowerCase() : null,
    user_id: p.userId && UUID_RE.test(p.userId) ? p.userId : null,
    desde: limpiarRuta(p.ruta),
    estado: "iniciado",
    monto: p.producto.precio,
  };
}

/** La ruta que el diálogo dejó al final de la marca (`<origen>_<ruta>`), para los checkouts que
 *  sólo se conocen por la referencia. Una marca sin ruta (un slug de CTA) o que pudo haberse
 *  cortado en los 60 caracteres da null: mejor sin dato que con una ruta inventada. */
export function rutaDeReferencia(ref: string | null | undefined): string | null {
  const marca = desdeDeReferencia(ref);
  const i = marca.lastIndexOf("_/");
  if (i < 0 || marca.length >= 55) return null;
  return limpiarRuta(marca.slice(i + 1));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Email de comprador apto para la preferencia, o null. */
export function emailValido(email: string | null | undefined): string | null {
  const e = (email ?? "").trim().toLowerCase();
  return e.length <= 254 && EMAIL_RE.test(e) ? e : null;
}

/**
 * Qué producto se pagó. Orden de resolución, del dato más confiable al menos:
 *   1. prefijo de `external_reference` (lo escribimos nosotros y MP lo devuelve siempre)
 *   2. `metadata.producto` (así quedaron marcados los pagos previos al catálogo)
 *   3. Comercio (era el ÚNICO producto hasta el 4/9/2026; un pago viejo sin marca solo puede
 *      ser ese). El default nunca puede devolver otro producto: si mañana se agrega uno,
 *      un pago sin marca sigue siendo Comercio y jamás habilita la descarga del nuevo.
 */
export function productoDePago(p: MpPayment): Producto | null {
  const ref = p.external_reference ?? "";
  const prefijo = ref.includes(":") ? ref.slice(0, ref.indexOf(":")) : "";
  const porRef = productoPorSlug(prefijo);
  if (porRef) return porRef;

  const meta = p.metadata?.producto;
  const porMeta = productoPorSlug(typeof meta === "string" ? meta : null);
  if (porMeta) return porMeta;

  return PRODUCTOS["planilla-comercio"];
}

/** ¿El pago lo marcamos nosotros como de una planilla? `productoDePago` cae en Comercio con
 *  cualquier pago sin marca, y la cuenta legado tiene cobros que no son de calcular: todo lo que
 *  escriba en `ca_compras` o descuente ingresos tiene que pasar por acá antes. */
export function esPagoDePlanilla(p: MpPayment): boolean {
  const prefijo = (p.external_reference ?? "").split(":")[0];
  if (productoPorSlug(prefijo)) return true;
  const meta = p.metadata?.producto;
  return typeof meta === "string" && productoPorSlug(meta) !== null;
}

/** Lee el .xlsx entregable. Vive en /private (fuera de /public): solo sale por una ruta
 *  gateada por el pago. Lo regenera scripts/gen_planilla_todas.ts en cada build. */
export async function leerArchivoProducto(producto: Producto): Promise<Buffer> {
  return readFile(path.join(process.cwd(), "private", producto.archivo));
}

// ─── Tipos de la API de MP ───────────────────────────────────────────────────

// Respuesta de POST /checkout/preferences (campos que usamos; todos opcionales
// del lado del server según el SDK oficial).
export type MpPreference = {
  id?: string;
  init_point?: string;
  sandbox_init_point?: string;
};

// Respuesta de GET /v1/payments/{id} (subconjunto que validamos).
export type MpPayment = {
  id?: number;
  status?: string; // approved | pending | in_process | rejected | cancelled | refunded | charged_back
  status_detail?: string;
  transaction_amount?: number;
  currency_id?: string;
  external_reference?: string;
  metadata?: Record<string, unknown>;
  date_approved?: string;
  date_created?: string;
  payer?: { email?: string };
};

export type CrearPreferenciaParams = {
  producto: Producto;
  externalReference: string;
  backUrls: { success: string; pending: string; failure: string };
  notificationUrl?: string; // v1.1 (webhook); v1 entrega sin esto
  /** Prellena el checkout y queda en la preferencia (`payer_email` en la búsqueda de MP): es lo
   *  que permite mandar UN recordatorio a quien no terminó de pagar, sin tabla propia. */
  emailComprador?: string | null;
};

// Crea la preferencia de Checkout Pro y devuelve el init_point al que redirigir.
export async function crearPreferencia(p: CrearPreferenciaParams): Promise<MpPreference> {
  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: p.producto.titulo,
          quantity: 1,
          unit_price: p.producto.precio,
          currency_id: p.producto.moneda,
        },
      ],
      back_urls: p.backUrls,
      auto_return: "approved",
      // Lo que ve el comprador en el resumen de la tarjeta. El nombre de la pantalla de pago NO
      // sale de acá: es el de la cuenta de MP de Manuel (decía «Programador freelance» el 27/9).
      statement_descriptor: "CALCULAR",
      ...(p.emailComprador ? { payer: { email: p.emailComprador } } : {}),
      external_reference: p.externalReference,
      metadata: { producto: p.producto.slug },
      ...(p.notificationUrl ? { notification_url: p.notificationUrl } : {}),
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`MP crearPreferencia ${res.status}: ${detalle}`);
  }
  return (await res.json()) as MpPreference;
}

// Desde el 28/9/2026 calcular.ar cobra con una cuenta de MP propia («CalculAR»). Los pagos
// anteriores viven en la cuenta personal de Manuel (hoy APEX) y sus compradores siguen bajando la
// planilla con el enlace del mail: por eso un pago que la cuenta nueva no conoce se busca en la
// vieja (MP_ACCESS_TOKEN_LEGADO). Sacar el legado corta la descarga de esos compradores.
export type PagoEncontrado = { pago: MpPayment; legado: boolean };

async function consultarPago(id: string, token: string): Promise<MpPayment | null> {
  const res = await fetch(`${MP_API}/v1/payments/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`MP obtenerPago ${res.status}: ${detalle}`);
  }
  return (await res.json()) as MpPayment;
}

// Un 404 en las dos cuentas devuelve null: una notificación con un id que MP no reconoce como
// nuestro no es un error de nuestro lado, y responderle 500 al webhook solo genera reintentos
// eternos. Cualquier otro estado (401, 429, 5xx) SÍ tira: ahí el reintento de MP es lo correcto.
export async function buscarPago(id: string): Promise<PagoEncontrado | null> {
  const actual = await consultarPago(id, accessToken());
  if (actual) return { pago: actual, legado: false };
  const legado = process.env.MP_ACCESS_TOKEN_LEGADO;
  if (!legado || legado === accessToken()) return null;
  const viejo = await consultarPago(id, legado);
  return viejo ? { pago: viejo, legado: true } : null;
}

// Re-consulta el pago a MP por id. Es la verificación que gatea TODA entrega.
export async function obtenerPago(id: string): Promise<MpPayment> {
  const r = await buscarPago(id);
  if (!r) throw new Error("MP obtenerPago 404: pago inexistente en las cuentas de calcular");
  return r.pago;
}

export async function obtenerPagoSiExiste(id: string): Promise<MpPayment | null> {
  return (await buscarPago(id))?.pago ?? null;
}

// ¿El pago habilita la entrega DE ESTE producto? approved + monto EXACTO + moneda EXACTA.
// (Defensivo: con campos undefined, las comparaciones estrictas dan false.)
// Evita que alguien pague $1 y baje el archivo, o que un pago de un producto habilite otro
// (hoy los dos valen lo mismo: el gate real es que `productoDePago` devuelva ESTE producto).
export function pagoAprobado(p: MpPayment, producto: Producto = PRODUCTO): boolean {
  return (
    p.status === "approved" &&
    p.transaction_amount === producto.precio &&
    p.currency_id === producto.moneda
  );
}

/** Gate completo de entrega: el pago está aprobado Y corresponde a este producto. */
export function habilitaDescarga(p: MpPayment, producto: Producto): boolean {
  return pagoAprobado(p, producto) && productoDePago(p)?.slug === producto.slug;
}
