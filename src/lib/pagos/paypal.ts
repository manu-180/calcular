import "server-only";
import { modoPublicacion, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import {
  centavos,
  decimal,
  ProveedorNoConfigurado,
  type CheckoutCreado,
  type EstadoPago,
  type NotificacionEntrante,
  type PagoVerificado,
  type PedidoCheckout,
  type ProveedorPago,
} from "./tipos";

// PayPal Orders v2 por REST, sin SDK (mismo patrón que mp.ts). PayPal es la fuente de verdad:
// el pago se lee siempre de su API con nuestras credenciales, nunca del navegador ni del cuerpo
// del webhook.

const BASES = {
  sandbox: "https://api-m.sandbox.paypal.com",
  live: "https://api-m.paypal.com",
} as const;

type Entorno = keyof typeof BASES;

type Config = { base: string; entorno: Entorno; clientId: string; secret: string; webhookId: string };

export function configPaypal(): Config | null {
  const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
  const secret = process.env.PAYPAL_CLIENT_SECRET?.trim();
  const webhookId = process.env.PAYPAL_WEBHOOK_ID?.trim();
  const entorno = process.env.PAYPAL_ENV?.trim();
  if (!clientId || !secret || !webhookId) return null;
  if (entorno !== "sandbox" && entorno !== "live") return null;
  // Un build de producción con credenciales sandbox "vendería" sin cobrar: se apaga la venta.
  if (entorno === "sandbox" && modoPublicacion() === "produccion") return null;
  return { base: BASES[entorno], entorno, clientId, secret, webhookId };
}

function exigirConfig(): Config {
  const c = configPaypal();
  if (!c) throw new ProveedorNoConfigurado("paypal");
  return c;
}

let tokenGuardado: { clave: string; token: string; vence: number } | null = null;

export function olvidarTokenPaypal() {
  tokenGuardado = null;
}

async function token(c: Config): Promise<string> {
  const clave = `${c.entorno}:${c.clientId}`;
  if (tokenGuardado && tokenGuardado.clave === clave && tokenGuardado.vence > Date.now()) return tokenGuardado.token;
  const res = await fetch(`${c.base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${c.clientId}:${c.secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PayPal token ${res.status}`);
  const j = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!j.access_token) throw new Error("PayPal token sin access_token");
  // Un minuto de margen: un token que vence en vuelo da 401 en la captura.
  tokenGuardado = { clave, token: j.access_token, vence: Date.now() + Math.max(0, (j.expires_in ?? 300) - 60) * 1000 };
  return j.access_token;
}

async function llamar(c: Config, ruta: string, init: { method?: string; body?: string; headers?: Record<string, string> } = {}): Promise<Response> {
  const t = await token(c);
  return fetch(`${c.base}${ruta}`, {
    method: init.method ?? "GET",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json", ...init.headers },
    body: init.body,
    cache: "no-store",
  });
}

async function detalle(res: Response): Promise<string> {
  return (await res.text().catch(() => "")).slice(0, 300);
}

type Monto = { currency_code?: string; value?: string };
export type PaypalCaptura = {
  id?: string;
  status?: string;
  amount?: Monto;
  custom_id?: string;
  invoice_id?: string;
  create_time?: string;
  update_time?: string;
  supplementary_data?: { related_ids?: { order_id?: string } };
};
export type PaypalOrden = {
  id?: string;
  status?: string;
  payer?: { email_address?: string };
  purchase_units?: { custom_id?: string; payments?: { captures?: PaypalCaptura[] } }[];
  links?: { rel?: string; href?: string }[];
};

export function estadoCaptura(status: string | undefined): EstadoPago | null {
  switch (status) {
    case "COMPLETED":
      return "aprobado";
    case "PENDING":
      return "pendiente";
    case "DECLINED":
    case "FAILED":
      return "rechazado";
    case "REFUNDED":
      return "reembolsado";
    // Sin el monto devuelto no se puede asentar: tratarlo como "reembolsado" descontaría el precio
    // entero. Queda sin estado y procesarPagoIntl lo ignora con motivo explícito.
    case "PARTIALLY_REFUNDED":
      return null;
    case "REVERSED":
      return "contracargo";
    default:
      return null;
  }
}

export function pagoDeCaptura(cap: PaypalCaptura, orden?: PaypalOrden | null): PagoVerificado | null {
  if (!cap.id) return null;
  return {
    proveedor: "paypal",
    id: cap.id,
    ordenId: cap.supplementary_data?.related_ids?.order_id ?? orden?.id ?? null,
    estado: estadoCaptura(cap.status),
    estadoProveedor: cap.status ?? "",
    montoCentavos: centavos(cap.amount?.value),
    moneda: cap.amount?.currency_code ?? null,
    referencia: cap.custom_id ?? orden?.purchase_units?.[0]?.custom_id ?? null,
    email: orden?.payer?.email_address ?? null,
    fecha: cap.create_time ?? null,
  };
}

function capturaDeOrden(o: PaypalOrden): PaypalCaptura | null {
  const caps = o.purchase_units?.[0]?.payments?.captures ?? [];
  return caps.find((c) => c.status === "COMPLETED") ?? caps[0] ?? null;
}

export const ID_PAYPAL = /^[A-Z0-9]{10,30}$/;

async function obtenerOrden(c: Config, ordenId: string): Promise<PaypalOrden | null> {
  const res = await llamar(c, `/v2/checkout/orders/${encodeURIComponent(ordenId)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`PayPal orden ${res.status}: ${await detalle(res)}`);
  return (await res.json()) as PaypalOrden;
}

export const paypal: ProveedorPago = {
  nombre: "paypal",

  configurado: () => configPaypal() !== null,

  async crearCheckout(p: PedidoCheckout): Promise<CheckoutCreado> {
    const c = exigirConfig();
    const [, uuid = p.idempotencia] = p.referencia.split(":");
    const res = await llamar(c, "/v2/checkout/orders", {
      method: "POST",
      headers: { "PayPal-Request-Id": `orden-${p.idempotencia}`, Prefer: "return=minimal" },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: p.producto.id.replace("/", "-"),
            custom_id: p.referencia,
            // PayPal rechaza un invoice_id repetido: un mismo checkout no se puede cobrar dos veces.
            invoice_id: uuid,
            description: p.producto.titulo.slice(0, 127),
            amount: { currency_code: p.producto.moneda, value: decimal(p.producto.precioCentavos) },
          },
        ],
        payment_source: {
          paypal: {
            ...(p.email ? { email_address: p.email } : {}),
            experience_context: {
              brand_name: NOMBRE_SITIO_INTL,
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              return_url: p.urlVuelta,
              cancel_url: p.urlCancelar,
            },
          },
        },
      }),
    });
    if (!res.ok) throw new Error(`PayPal crear orden ${res.status}: ${await detalle(res)}`);
    const o = (await res.json()) as PaypalOrden;
    const href = o.links?.find((l) => l.rel === "payer-action" || l.rel === "approve")?.href;
    if (!o.id || !href) throw new Error("PayPal no devolvió el enlace de aprobación");
    return { id: o.id, urlPago: href };
  },

  // Captura la orden aprobada. Idempotente: un segundo intento (la vuelta y el webhook a la vez,
  // o un F5) recibe la misma captura en vez de un error.
  async confirmarPago(ordenId: string): Promise<PagoVerificado | null> {
    if (!ID_PAYPAL.test(ordenId)) return null;
    const c = exigirConfig();
    const res = await llamar(c, `/v2/checkout/orders/${encodeURIComponent(ordenId)}/capture`, {
      method: "POST",
      headers: { "PayPal-Request-Id": `captura-${ordenId}`, Prefer: "return=representation" },
    });
    let orden: PaypalOrden | null;
    if (res.ok) {
      orden = (await res.json()) as PaypalOrden;
    } else if (res.status === 422 || res.status === 404) {
      const texto = await detalle(res);
      if (res.status === 404) return null;
      if (!/ORDER_ALREADY_CAPTURED|DUPLICATE_INVOICE_ID|ORDER_NOT_APPROVED/.test(texto)) throw new Error(`PayPal captura 422: ${texto}`);
      orden = await obtenerOrden(c, ordenId);
    } else {
      throw new Error(`PayPal captura ${res.status}: ${await detalle(res)}`);
    }
    if (!orden) return null;
    const cap = capturaDeOrden(orden);
    if (!cap) return null;
    return pagoDeCaptura(cap, orden);
  },

  async consultarPago(capturaId: string): Promise<PagoVerificado | null> {
    if (!ID_PAYPAL.test(capturaId)) return null;
    const c = exigirConfig();
    const res = await llamar(c, `/v2/payments/captures/${encodeURIComponent(capturaId)}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`PayPal captura ${res.status}: ${await detalle(res)}`);
    const cap = (await res.json()) as PaypalCaptura;
    const ordenId = cap.supplementary_data?.related_ids?.order_id;
    // El mail del comprador está en la orden, no en la captura. Sin él no se rompe nada.
    let orden: PaypalOrden | null = null;
    if (ordenId && ID_PAYPAL.test(ordenId)) {
      try {
        orden = await obtenerOrden(c, ordenId);
      } catch (e) {
        console.warn("[paypal] no pude leer la orden de la captura", capturaId, e instanceof Error ? e.message : e);
      }
    }
    return pagoDeCaptura(cap, orden);
  },

  async validarWebhook(n: NotificacionEntrante): Promise<boolean> {
    const c = configPaypal();
    if (!c) return false;
    const h = (k: string) => n.headers.get(k) ?? "";
    const campos = {
      auth_algo: h("paypal-auth-algo"),
      cert_url: h("paypal-cert-url"),
      transmission_id: h("paypal-transmission-id"),
      transmission_sig: h("paypal-transmission-sig"),
      transmission_time: h("paypal-transmission-time"),
      webhook_id: c.webhookId,
    };
    if (Object.values(campos).some((v) => !v)) return false;
    if (!cabecerasDePaypal(campos)) return false;
    try {
      JSON.parse(n.cuerpo);
    } catch {
      return false;
    }
    // El evento va tal cual llegó: PayPal firma los bytes originales y volver a serializarlo
    // (orden de claves, escapes) puede hacer fallar una firma válida.
    const cuerpo = `${JSON.stringify(campos).slice(0, -1)},"webhook_event":${n.cuerpo}}`;
    const res = await llamar(c, "/v1/notifications/verify-webhook-signature", { method: "POST", body: cuerpo });
    // Cabeceras armadas que pasan el filtro previo hacen que PayPal conteste 4xx: es firma inválida,
    // no un error nuestro (401 y 429 sí son nuestros: credenciales o cupo).
    if (res.status >= 400 && res.status < 500 && res.status !== 401 && res.status !== 429) return false;
    if (!res.ok) throw new Error(`PayPal verificar firma ${res.status}: ${await detalle(res)}`);
    const j = (await res.json()) as { verification_status?: string };
    return j.verification_status === "SUCCESS";
  },
};

const RE_CERT_PAYPAL = /^https:\/\/api(-m)?\.(sandbox\.)?paypal\.com\//;
const TOLERANCIA_TRANSMISION_MS = 10 * 60 * 1000;

// Filtro previo a la API de PayPal: descarta lo que no puede ser un evento suyo sin gastar una
// llamada, y un evento viejo reenviado (replay) aunque su firma haya sido válida.
export function cabecerasDePaypal(c: { auth_algo: string; cert_url: string; transmission_time: string }, ahora = Date.now()): boolean {
  if (c.auth_algo !== "SHA256withRSA" || !RE_CERT_PAYPAL.test(c.cert_url)) return false;
  const t = Date.parse(c.transmission_time);
  return Number.isFinite(t) && Math.abs(ahora - t) <= TOLERANCIA_TRANSMISION_MS;
}

export function idCapturaDeRecurso(tipo: string, recurso: Record<string, unknown> | null | undefined): string | null {
  if (!recurso) return null;
  if (tipo.startsWith("PAYMENT.CAPTURE.") && tipo !== "PAYMENT.CAPTURE.REFUNDED") {
    return typeof recurso.id === "string" ? recurso.id : null;
  }
  const links = Array.isArray(recurso.links) ? (recurso.links as { rel?: string; href?: string }[]) : [];
  const arriba = links.find((l) => l.rel === "up" && /\/captures\//.test(l.href ?? ""))?.href;
  const m = arriba ? /\/captures\/([A-Z0-9]+)/.exec(arriba) : null;
  return m ? m[1] : null;
}
