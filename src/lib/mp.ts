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
  | "planilla-monotributo"
  | "planilla-alquileres"
  | "informe-cuota-alimentaria"
  | "planilla-mi-sueldo"
  | "planilla-camioneros"
  | "planilla-vacaciones"
  | "planilla-plazo-fijo"
  | "informe-indemnizacion"
  | "informe-ganancias"
  | "informe-inflacion"
  | "informe-credito-laboral";

type ProductoComun = {
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
  /** Dónde se entrega, con `?payment_id=`: la ruta de descarga del .xlsx o la página del informe.
   *  Es el enlace del mail de entrega y del botón de gracias, y siempre re-verifica el pago. */
  rutaDescarga: string;
  rutaLanding: string;
};

// `entrega` decide todo lo que cambia entre productos: el informe no tiene archivo en /private ni
// ruta /api/*/download, se arma en una página con los datos que la persona cargó.
export type Producto = ProductoComun &
  ({ entrega: "xlsx"; archivo: string } | { entrega: "informe"; archivo: null });

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
    entrega: "xlsx",
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
    entrega: "xlsx",
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
    entrega: "xlsx",
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
    entrega: "xlsx",
    archivo: "planilla-monotributo-2026.xlsx",
    rutaDescarga: "/api/planilla-monotributo/download",
    rutaLanding: "/planillas/monotributo",
  },
  "planilla-alquileres": {
    slug: "planilla-alquileres",
    titulo: "Planilla de alquileres 2026",
    tituloCorto: "Planilla de alquileres 2026",
    convenio: "Contratos de alquiler — ajustes por IPC",
    paraQuien: "Para el dueño que alquila una o varias propiedades: ajustes, recibos y la carta de aumento",
    disparadorActualizacion: "cada mes, cuando el INDEC publica el IPC nuevo,",
    precio: 9900,
    moneda: "ARS",
    entrega: "xlsx",
    archivo: "planilla-alquileres-2026.xlsx",
    rutaDescarga: "/api/planilla-alquileres/download",
    rutaLanding: "/planillas/alquileres",
  },
  "informe-cuota-alimentaria": {
    slug: "informe-cuota-alimentaria",
    titulo: "Informe de cuota alimentaria",
    tituloCorto: "Informe de cuota alimentaria",
    convenio: "Referencia con la Canasta de Crianza del INDEC",
    paraQuien: "Para llevar a la mediación o al abogado la cuenta de la cuota, explicada y con fuentes",
    disparadorActualizacion: "cada mes, cuando el INDEC publica la canasta de crianza,",
    precio: 4900,
    moneda: "ARS",
    entrega: "informe",
    archivo: null,
    rutaDescarga: "/informes/cuota-alimentaria/ver",
    rutaLanding: "/informes/cuota-alimentaria",
  },
  "planilla-mi-sueldo": {
    slug: "planilla-mi-sueldo",
    titulo: "Planilla Mi Sueldo 2026",
    tituloCorto: "Planilla Mi Sueldo 2026",
    convenio: "Control de recibos de sueldo — LCT y aportes de ley",
    paraQuien: "Para el empleado que quiere controlar cada recibo y saber cuánto le comió la inflación",
    disparadorActualizacion: "cada mes, cuando el INDEC publica el IPC nuevo,",
    precio: 6900,
    moneda: "ARS",
    entrega: "xlsx",
    archivo: "planilla-mi-sueldo-2026.xlsx",
    rutaDescarga: "/api/planilla-mi-sueldo/download",
    rutaLanding: "/planillas/mi-sueldo",
  },
  "planilla-camioneros": {
    slug: "planilla-camioneros",
    titulo: "Planilla de sueldos Camioneros 2026",
    tituloCorto: "Planilla Camioneros 2026",
    convenio: "CCT 40/89 — Camioneros (FADEEAC)",
    paraQuien: "Para liquidar sueldos de choferes y personal de transporte con la escala firmada cargada",
    disparadorActualizacion: "cada vez que Camioneros y FADEEAC firman una escala nueva",
    precio: 14900,
    moneda: "ARS",
    entrega: "xlsx",
    archivo: "planilla-camioneros-2026.xlsx",
    rutaDescarga: "/api/planilla-camioneros/download",
    rutaLanding: "/planillas/camioneros",
  },
  "planilla-vacaciones": {
    slug: "planilla-vacaciones",
    titulo: "Planilla de vacaciones 2026",
    tituloCorto: "Planilla de vacaciones 2026",
    convenio: "LCT arts. 150 a 157 — Vacaciones anuales",
    paraQuien: "Para el empleador que organiza y liquida las vacaciones de su equipo sin errores",
    disparadorActualizacion: "cada vez que cambia una norma o un feriado que afecta las vacaciones",
    precio: 9900,
    moneda: "ARS",
    entrega: "xlsx",
    archivo: "planilla-vacaciones-2026.xlsx",
    rutaDescarga: "/api/planilla-vacaciones/download",
    rutaLanding: "/planillas/vacaciones",
  },
  "planilla-plazo-fijo": {
    slug: "planilla-plazo-fijo",
    titulo: "Planilla de plazos fijos 2026",
    tituloCorto: "Planilla de plazos fijos 2026",
    convenio: "Plazo fijo tradicional y UVA — tasas del BCRA e IPC del INDEC",
    paraQuien: "Para el ahorrista que quiere seguir sus plazos fijos y saber si le ganan a la inflación",
    disparadorActualizacion: "cada mes, cuando el INDEC publica el IPC nuevo,",
    precio: 5900,
    moneda: "ARS",
    entrega: "xlsx",
    archivo: "planilla-plazo-fijo-2026.xlsx",
    rutaDescarga: "/api/planilla-plazo-fijo/download",
    rutaLanding: "/planillas/plazo-fijo",
  },
  "informe-indemnizacion": {
    slug: "informe-indemnizacion",
    titulo: "Informe de liquidación final por despido",
    tituloCorto: "Informe de liquidación por despido",
    convenio: "Ley de Contrato de Trabajo — liquidación final por despido",
    paraQuien: "Para quien fue despedido y quiere comparar, rubro por rubro, lo que le ofrecen con lo que le corresponde",
    disparadorActualizacion: "cada vez que cambia una norma que afecta la liquidación final",
    precio: 7900,
    moneda: "ARS",
    entrega: "informe",
    archivo: null,
    rutaDescarga: "/informes/indemnizacion/ver",
    rutaLanding: "/informes/indemnizacion",
  },
  "informe-ganancias": {
    slug: "informe-ganancias",
    titulo: "Informe de Ganancias 2026",
    tituloCorto: "Informe de Ganancias 2026",
    convenio: "Impuesto a las Ganancias — 4.ª categoría",
    paraQuien: "Para el empleado al que le retienen Ganancias y quiere saber cuánto paga en el año y cómo pagar menos",
    disparadorActualizacion: "cada vez que ARCA actualiza las deducciones y la escala,",
    precio: 5900,
    moneda: "ARS",
    entrega: "informe",
    archivo: null,
    rutaDescarga: "/informes/ganancias/ver",
    rutaLanding: "/informes/ganancias",
  },
  "informe-inflacion": {
    slug: "informe-inflacion",
    titulo: "Informe de actualización por inflación",
    tituloCorto: "Informe de actualización por IPC",
    convenio: "Índice de Precios al Consumidor (IPC) — INDEC",
    paraQuien: "Para justificar con el dato oficial un aumento de sueldo, de honorarios o de precio",
    disparadorActualizacion: "cada mes, cuando el INDEC publica el IPC nuevo,",
    precio: 3900,
    moneda: "ARS",
    entrega: "informe",
    archivo: null,
    rutaDescarga: "/informes/inflacion/ver",
    rutaLanding: "/informes/inflacion",
  },
  "informe-credito-laboral": {
    slug: "informe-credito-laboral",
    titulo: "Informe de actualización de crédito laboral",
    tituloCorto: "Informe de crédito laboral",
    convenio: "Actualización de créditos laborales — IPC más 3 % anual",
    paraQuien: "Para el trabajador o el abogado que necesita la deuda laboral actualizada, mes a mes y con fuentes",
    disparadorActualizacion: "cada mes, cuando el INDEC publica el IPC nuevo,",
    precio: 6900,
    moneda: "ARS",
    entrega: "informe",
    archivo: null,
    rutaDescarga: "/informes/credito-laboral/ver",
    rutaLanding: "/informes/credito-laboral",
  },
};

/** Orden en que se muestran en el catálogo y en los cross-sell. */
export const CATALOGO: Producto[] = [
  PRODUCTOS["planilla-comercio"],
  PRODUCTOS["planilla-casas-particulares"],
  PRODUCTOS["planilla-monotributo"],
  PRODUCTOS["planilla-alquileres"],
  PRODUCTOS["planilla-uocra"],
  PRODUCTOS["informe-cuota-alimentaria"],
  PRODUCTOS["planilla-camioneros"],
  PRODUCTOS["planilla-vacaciones"],
  PRODUCTOS["planilla-mi-sueldo"],
  PRODUCTOS["planilla-plazo-fijo"],
  PRODUCTOS["informe-indemnizacion"],
  PRODUCTOS["informe-ganancias"],
  PRODUCTOS["informe-credito-laboral"],
  PRODUCTOS["informe-inflacion"],
];

/** Alias histórico: había un único producto y medio repo lo importa así. */
export const PRODUCTO = PRODUCTOS["planilla-comercio"];

/** «la Planilla …» / «el Informe …», para el copy que nombra el producto en una frase. */
export function conArticulo(p: Producto): string {
  return `${p.entrega === "informe" ? "el" : "la"} ${p.tituloCorto}`;
}

/** Enlace permanente de entrega de un pago (relativo; el mail le antepone el dominio). */
export function rutaEntrega(p: Producto, paymentId: string): string {
  return `${p.rutaDescarga}?payment_id=${encodeURIComponent(paymentId)}`;
}

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
  if (producto.entrega !== "xlsx") throw new Error(`${producto.slug} no se entrega como archivo`);
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
  /** Lo que la persona cargó en la calculadora, ya validado y serializado (ver prefill/servidor.ts). */
  datos?: string | null;
};

/** Tope de `metadata` serializada que acepta MP: con más, responde 400 «metadata field is invalid;
 *  it must be less than 4000 chars length» (probado el 6/10/2026). Se deja margen. */
export const METADATA_MAX = 3800;

/** Metadata de la preferencia. MP la copia al pago (`GET /v1/payments/:id` la devuelve: así se
 *  resuelven las ventas viejas por `metadata.producto`) y en el pago puede pasar las claves a
 *  snake_case (en la preferencia quedan como se mandaron). Por eso las claves son una palabra en
 *  minúscula y `datos` viaja como texto JSON: sus claves internas no las toca nadie. Si no entra
 *  en el tope, sale sin `datos`. */
export function metadataPreferencia(producto: Producto, datos?: string | null): Record<string, string> {
  const base = { producto: producto.slug };
  if (!datos) return base;
  const con = { ...base, datos };
  return JSON.stringify(con).length <= METADATA_MAX ? con : base;
}

async function postPreferencia(p: CrearPreferenciaParams, metadata: Record<string, string>): Promise<Response> {
  return fetch(`${MP_API}/checkout/preferences`, {
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
      metadata,
      ...(p.notificationUrl ? { notification_url: p.notificationUrl } : {}),
    }),
    cache: "no-store",
  });
}

// Crea la preferencia de Checkout Pro y devuelve el init_point al que redirigir.
export async function crearPreferencia(p: CrearPreferenciaParams): Promise<MpPreference> {
  const metadata = metadataPreferencia(p.producto, p.datos);
  let res = await postPreferencia(p, metadata);
  // Los datos de la calculadora son un extra: si MP rechaza la preferencia por su contenido (400),
  // se cobra igual sin ellos y la persona recibe el entregable genérico. Un 401/403/429 no es por
  // los datos: reintentar sólo duplicaría la llamada que va a fallar igual.
  if (res.status === 400 && "datos" in metadata) {
    const detalle = await res.text().catch(() => "");
    console.error(`[mp] preferencia rechazada con datos (${res.status}), reintento sin datos:`, p.producto.slug, detalle.slice(0, 200));
    res = await postPreferencia(p, metadataPreferencia(p.producto, null));
  }

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
