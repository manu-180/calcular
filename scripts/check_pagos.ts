// Capa de pagos de calcularya.com (src/lib/pagos) con PayPal simulado: ningún pedido sale a la red.
// Prueba lo que regala o pierde plata: la orden sale con el precio del catálogo, la captura con
// otro monto o moneda no entrega, una firma inválida no escribe nada, un evento repetido asienta
// una sola venta y manda un solo mail, y el adaptador de Mercado Pago hace lo mismo que mp.ts.
//
// Correr con: npx tsx scripts/check_pagos.ts  (o vía scripts/check-all.ts)

import "./sin-server-only";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { definirProductoIntl, usarCatalogoIntl, referenciaIntl } from "../src/lib/pagos/catalogo-intl";
import { paypal, configPaypal, olvidarTokenPaypal } from "../src/lib/pagos/paypal";
import { stripe } from "../src/lib/pagos/stripe";
import { mercadopago } from "../src/lib/pagos/mercadopago";
import { proveedorIntl, ventaIntlActiva } from "../src/lib/pagos";
import { centavos, pagoCubre, ProveedorNoConfigurado } from "../src/lib/pagos/tipos";
import { marcaDevolucionIntl, marcaVentaIntl, sincronizarPagoIntl } from "../src/lib/pagos/ventas-intl";
import * as mp from "../src/lib/mp";
import * as mpWebhook from "../src/lib/mp-webhook";
import * as rutaCheckout from "../src/app/api/pagos/checkout/route";
import * as rutaVuelta from "../src/app/api/pagos/paypal/vuelta/route";
import * as rutaWebhook from "../src/app/api/pagos/paypal/webhook/route";
import * as rutaDescarga from "../src/app/api/pagos/descarga/route";

async function main() {
process.env.PAYPAL_CLIENT_ID = "cliente-de-prueba";
process.env.PAYPAL_CLIENT_SECRET = "secreto-de-prueba";
process.env.PAYPAL_WEBHOOK_ID = "WH-PRUEBA";
process.env.PAYPAL_ENV = "live";
process.env.NEXT_PUBLIC_SITIO_INTL_URL = "https://calcularya.com";
process.env.SUPABASE_URL = "https://base.prueba";
process.env.SUPABASE_SERVICE_ROLE_KEY = "rol-de-servicio-de-prueba";
process.env.RESEND_API_KEY = "re_prueba";
process.env.MP_ACCESS_TOKEN = "APP_USR-token-de-prueba";
delete process.env.MP_ACCESS_TOKEN_LEGADO;
delete process.env.NEXT_PUBLIC_CUENTAS_ACTIVAS;
delete process.env.VERCEL_ENV;
delete process.env.PAGOS_INTL_PROVEEDOR;
delete process.env.PAYPAL_SANDBOX_EN_PRODUCCION;


const IP = { "x-forwarded-for": "203.0.113.7" };
const limites: string[] = [];

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
async function revienta(p: Promise<unknown>): Promise<unknown> {
  try {
    await p;
    return null;
  } catch (e) {
    return e;
  }
}

// ─── Catálogo de prueba y archivo ─────────────────────────────────────────────────────────────
const PRODUCTO = definirProductoIntl({
  mercado: "mx",
  slug: "planilla-prueba",
  titulo: "Planilla de prueba México 2026",
  tituloCorto: "Planilla de prueba",
  paraQuien: "Para probar el cobro",
  descripcion: ["Una planilla que sólo existe en este check."],
  disparadorActualizacion: "Cada vez que cambia el salario mínimo",
  precioCentavos: 900,
  archivo: "planilla-prueba.xlsx",
});
const restaurar = usarCatalogoIntl([PRODUCTO]);
const tmp = mkdtempSync(path.join(tmpdir(), "check-pagos-"));
mkdirSync(path.join(tmp, "private", "intl", "mx"), { recursive: true });
const BYTES = Buffer.from("PK\u0003\u0004 planilla de prueba");
writeFileSync(path.join(tmp, "private", "intl", "mx", "planilla-prueba.xlsx"), BYTES);
const cwd = process.cwd();
process.chdir(tmp);

check("definirProductoIntl: id <mercado>/<slug> y USD", PRODUCTO.id === "mx/planilla-prueba" && PRODUCTO.moneda === "USD");
check("definirProductoIntl rechaza un archivo con carpetas", (() => {
  try {
    definirProductoIntl({ ...PRODUCTO, archivo: "../mp.ts" });
    return false;
  } catch {
    return true;
  }
})());
check("definirProductoIntl rechaza el slug «gracias»", (() => {
  try {
    definirProductoIntl({ ...PRODUCTO, slug: "gracias" });
    return false;
  } catch {
    return true;
  }
})());
check("centavos: 9.00 → 900, 9.5 → 950, 14900 → 1490000", centavos("9.00") === 900 && centavos("9.5") === 950 && centavos(14900) === 1490000);
check("centavos: 9.001 y basura → null", centavos("9.001") === null && centavos("9,00") === null && centavos("-9") === null);

// ─── PayPal simulado ─────────────────────────────────────────────────────────────────────────
type Captura = { id: string; status: string; value: string; currency: string; custom_id: string; orden: string };
const capturas = new Map<string, Captura>();
type Unidad = { custom_id: string; amount: { value: string; currency_code: string } };
const ordenes = new Map<string, { capturaId: string; aprobada: boolean; unidad: Unidad }>();
const llamadas: { metodo: string; url: string; headers: Record<string, string>; body: string }[] = [];
const revenue: { id: number; note: string; amount: number; currency: string; project_slug: string; source: string }[] = [];
const mails: { to: string[]; subject: string; html: string; from: string }[] = [];
let proximaCaptura: Partial<Captura> = {};
let secuencia = 0;

const json = (cuerpo: unknown, status = 200) => new Response(JSON.stringify(cuerpo), { status, headers: { "Content-Type": "application/json" } });
const capturaJson = (c: Captura) => ({
  id: c.id,
  status: c.status,
  amount: { currency_code: c.currency, value: c.value },
  custom_id: c.custom_id,
  create_time: "2026-10-09T12:00:00Z",
  supplementary_data: { related_ids: { order_id: c.orden } },
});
const ordenJson = (id: string) => {
  const o = ordenes.get(id)!;
  const c = capturas.get(o.capturaId);
  return {
    id,
    status: c ? "COMPLETED" : o.aprobada ? "APPROVED" : "PAYER_ACTION_REQUIRED",
    payer: { email_address: "compradora@example.com" },
    purchase_units: [{ custom_id: c?.custom_id, payments: c ? { captures: [capturaJson(c)] } : undefined }],
  };
};

globalThis.fetch = (async (entrada: string | URL | Request, init?: RequestInit) => {
  const url = new URL(typeof entrada === "string" ? entrada : entrada instanceof URL ? entrada.href : entrada.url);
  const metodo = (init?.method ?? "GET").toUpperCase();
  const headers: Record<string, string> = {};
  new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
  const body = typeof init?.body === "string" ? init.body : "";
  llamadas.push({ metodo, url: url.href, headers, body });

  if (url.origin === "https://api-m.paypal.com") {
    if (url.pathname === "/v1/oauth2/token") return json({ access_token: "token-paypal", expires_in: 32400 });
    if (url.pathname === "/v2/checkout/orders" && metodo === "POST") {
      const id = `ORDEN${String(++secuencia).padStart(10, "0")}`;
      ordenes.set(id, { capturaId: `CAP${String(secuencia).padStart(14, "0")}`, aprobada: true, unidad: JSON.parse(body).purchase_units[0] });
      return json({ id, status: "PAYER_ACTION_REQUIRED", links: [{ rel: "payer-action", href: `https://www.paypal.com/checkoutnow?token=${id}` }] }, 201);
    }
    let m = /^\/v2\/checkout\/orders\/([A-Z0-9]+)\/capture$/.exec(url.pathname);
    if (m && metodo === "POST") {
      const o = ordenes.get(m[1]);
      if (!o) return json({ name: "RESOURCE_NOT_FOUND" }, 404);
      if (capturas.has(o.capturaId)) return json({ name: "UNPROCESSABLE_ENTITY", details: [{ issue: "ORDER_ALREADY_CAPTURED" }] }, 422);
      const unidad = o.unidad;
      capturas.set(o.capturaId, {
        id: o.capturaId,
        status: "COMPLETED",
        value: unidad.amount.value,
        currency: unidad.amount.currency_code,
        custom_id: unidad.custom_id,
        orden: m[1],
        ...proximaCaptura,
      });
      return json(ordenJson(m[1]), 201);
    }
    m = /^\/v2\/checkout\/orders\/([A-Z0-9]+)$/.exec(url.pathname);
    if (m) return ordenes.has(m[1]) ? json(ordenJson(m[1])) : json({}, 404);
    m = /^\/v2\/payments\/captures\/([A-Z0-9]+)$/.exec(url.pathname);
    if (m) {
      const c = capturas.get(m[1]);
      return c ? json(capturaJson(c)) : json({ name: "RESOURCE_NOT_FOUND" }, 404);
    }
    if (url.pathname === "/v1/notifications/verify-webhook-signature") {
      const v = JSON.parse(body) as { transmission_sig?: string; webhook_id?: string };
      return json({ verification_status: v.transmission_sig === "firma-buena" && v.webhook_id === "WH-PRUEBA" ? "SUCCESS" : "FAILURE" });
    }
  }
  if (url.origin === "https://base.prueba" && url.pathname === "/rest/v1/rpc/ca_limite") {
    limites.push((JSON.parse(body) as { p_clave: string }).p_clave);
    return json(true);
  }
  if (url.origin === "https://base.prueba" && url.pathname === "/rest/v1/revenue_events") {
    if (metodo === "GET") {
      const marca = decodeURIComponent((url.searchParams.get("note") ?? "").replace(/^ilike\.\*|\*$/g, ""));
      const id = url.searchParams.get("id");
      if (id) return json(revenue.filter((r) => `eq.${r.id}` === id).map((r) => ({ note: r.note })));
      return json(revenue.filter((r) => r.note.includes(marca)).map((r) => ({ id: r.id })));
    }
    if (metodo === "POST") {
      const fila = { id: revenue.length + 1, ...(JSON.parse(body) as Omit<(typeof revenue)[number], "id">) };
      revenue.push(fila);
      return json([fila], 201);
    }
    if (metodo === "PATCH") {
      const id = Number((url.searchParams.get("id") ?? "").replace("eq.", ""));
      const fila = revenue.find((r) => r.id === id);
      if (fila) fila.note = (JSON.parse(body) as { note: string }).note;
      return new Response(null, { status: 204 });
    }
  }
  if (url.origin === "https://api.resend.com" && url.pathname === "/emails") {
    mails.push(JSON.parse(body));
    return json({ id: "mail" });
  }
  if (url.origin === "https://api.mercadopago.com") {
    if (url.pathname === "/checkout/preferences") return json({ id: "pref-1", init_point: "https://www.mercadopago.com.ar/checkout?pref=1" }, 201);
    const m = /^\/v1\/payments\/(\d+)$/.exec(url.pathname);
    if (m)
      return json({
        id: Number(m[1]),
        status: "approved",
        transaction_amount: 14900,
        currency_id: "ARS",
        external_reference: `planilla-comercio:${"0".repeat(8)}-0000-4000-8000-${"0".repeat(12)}`,
        payer: { email: "ar@example.com" },
      });
  }
  throw new Error(`check_pagos: pedido sin simular ${metodo} ${url.href}`);
}) as typeof fetch;

// ─── Configuración ──────────────────────────────────────────────────────────────────────────
check("PayPal live con las tres credenciales: configurado", configPaypal()?.base === "https://api-m.paypal.com");
check("proveedor intl por defecto: paypal", proveedorIntl().nombre === "paypal" && ventaIntlActiva());
process.env.PAYPAL_ENV = "sandbox";
check("sandbox en un build de producción: venta apagada", configPaypal() === null && !ventaIntlActiva());
process.env.PAYPAL_ENV = "";
check("PAYPAL_ENV vacío: venta apagada", configPaypal() === null);
process.env.PAYPAL_ENV = "live";
const wh = process.env.PAYPAL_WEBHOOK_ID;
delete process.env.PAYPAL_WEBHOOK_ID;
check("sin PAYPAL_WEBHOOK_ID: venta apagada", !ventaIntlActiva());
const sinCred = await rutaCheckout.POST(
  new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: IP, body: new URLSearchParams({ p: PRODUCTO.id, email: "a@b.com" }) }),
);
check("checkout sin credenciales: vuelve a comprar con pago=pronto, sin llamar a PayPal", (sinCred.headers.get("location") ?? "").endsWith("/mx/planillas/comprar?p=planilla-prueba&pago=pronto") && !llamadas.some((l) => l.url.includes("paypal")));
process.env.PAYPAL_WEBHOOK_ID = wh;
process.env.PAGOS_INTL_PROVEEDOR = "stripe";
check("PAGOS_INTL_PROVEEDOR=stripe: el esqueleto no se da por configurado", proveedorIntl().nombre === "stripe" && !ventaIntlActiva());
check("stripe.crearCheckout lanza «no configurado»", (await revienta(stripe.crearCheckout({ producto: PRODUCTO, referencia: "x", urlVuelta: "", urlCancelar: "", idempotencia: "x" }))) instanceof ProveedorNoConfigurado);
delete process.env.PAGOS_INTL_PROVEEDOR;

// ─── 1. Crear orden ──────────────────────────────────────────────────────────────────────────
const r1 = await rutaCheckout.POST(
  new NextRequest("https://calcularya.com/api/pagos/checkout", {
    method: "POST",
    headers: { ...IP, origin: "https://calcularya.com" },
    body: new URLSearchParams({ p: PRODUCTO.id, email: "Compradora@Example.com ", precio: "0.01", sitio: "" }),
  }),
);
const pedidoOrden = llamadas.find((l) => l.url === "https://api-m.paypal.com/v2/checkout/orders");
const cuerpoOrden = pedidoOrden ? JSON.parse(pedidoOrden.body) : null;
const unidad = cuerpoOrden?.purchase_units?.[0];
check("checkout: 303 a la página de aprobación de PayPal", r1.status === 303 && (r1.headers.get("location") ?? "").startsWith("https://www.paypal.com/checkoutnow?token=ORDEN"), r1.headers.get("location"));
check("orden: intent CAPTURE, 9.00 USD del catálogo (el precio del form se ignora)", cuerpoOrden?.intent === "CAPTURE" && unidad?.amount?.value === "9.00" && unidad?.amount?.currency_code === "USD", unidad);
check("orden: custom_id = <mercado>/<slug>:<uuid> e invoice_id = uuid", /^mx\/planilla-prueba:[0-9a-f-]{36}$/.test(unidad?.custom_id ?? "") && unidad?.invoice_id === unidad?.custom_id.split(":")[1]);
check("orden: PayPal-Request-Id para no duplicar", (pedidoOrden?.headers["paypal-request-id"] ?? "").startsWith("orden-"));
const ctxExp = cuerpoOrden?.payment_source?.paypal?.experience_context;
check(
  "orden: vuelve a calcularya.com/api/pagos/paypal/vuelta y cancela a comprar",
  ctxExp?.return_url === "https://calcularya.com/api/pagos/paypal/vuelta?m=mx&p=planilla-prueba" && ctxExp?.cancel_url === "https://calcularya.com/mx/planillas/comprar?p=planilla-prueba&pago=cancelado",
  ctxExp,
);
check("orden: el mail normalizado prellena PayPal", cuerpoOrden?.payment_source?.paypal?.email_address === "compradora@example.com");
const rTrampa = await rutaCheckout.POST(
  new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: { ...IP, origin: "https://otro.sitio" }, body: new URLSearchParams({ p: PRODUCTO.id, email: "a@b.com" }) }),
);
const ultimaOrden = JSON.parse(llamadas.filter((l) => l.url === "https://api-m.paypal.com/v2/checkout/orders").at(-1)!.body);
check("checkout desde otro origen: se cobra igual, sin prellenar el mail", rTrampa.status === 303 && ultimaOrden.payment_source.paypal.email_address === undefined);
const ordenesAntesSinIp = llamadas.filter((l) => l.url === "https://api-m.paypal.com/v2/checkout/orders").length;
const rSinIp = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", body: new URLSearchParams({ p: PRODUCTO.id, email: "a@b.com" }) }));
check(
  "checkout sin IP: no crea orden y vuelve con pago=error",
  (rSinIp.headers.get("location") ?? "").endsWith("pago=error") && llamadas.filter((l) => l.url === "https://api-m.paypal.com/v2/checkout/orders").length === ordenesAntesSinIp,
);
check("checkout: el cupo pasa por el limitador persistente", limites.some((k) => k.startsWith("checkout-intl:")));
const rMal = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: IP, body: new URLSearchParams({ p: "mx/no-existe", email: "a@b.com" }) }));
check("checkout de un producto que no está en el catálogo: 404", rMal.status === 404);
const rSinMail = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: IP, body: new URLSearchParams({ p: PRODUCTO.id, email: "no-es-mail" }) }));
check("checkout sin mail válido: vuelve con error=email", (rSinMail.headers.get("location") ?? "").includes("error=email"));

// ─── 2. Captura ok al volver ─────────────────────────────────────────────────────────────────
const orden1 = new URL(r1.headers.get("location")!).searchParams.get("token")!;
const v1 = await rutaVuelta.GET(new NextRequest(`https://calcularya.com/api/pagos/paypal/vuelta?m=mx&p=planilla-prueba&token=${orden1}&PayerID=ABC`));
const cap1 = ordenes.get(orden1)!.capturaId;
check("vuelta: captura y lleva a gracias con el id de la captura", (v1.headers.get("location") ?? "") === `https://calcularya.com/mx/planillas/gracias?proveedor=paypal&pago=${cap1}`, v1.headers.get("location"));
check("vuelta: la captura lleva PayPal-Request-Id estable", llamadas.some((l) => l.url.endsWith(`/orders/${orden1}/capture`) && l.headers["paypal-request-id"] === `captura-${orden1}`));
check("vuelta: UNA venta en revenue_events, en USD y con la marca", revenue.length === 1 && revenue[0].currency === "USD" && revenue[0].amount === 9 && revenue[0].note.includes(marcaVentaIntl("paypal", cap1)) && revenue[0].project_slug === "planillas-intl", revenue);
check("vuelta: un mail de entrega, marca CalcularYa, con el enlace de descarga", mails.length === 1 && mails[0].from.startsWith("CalcularYa") && mails[0].html.includes(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&amp;pago=${cap1}`) === false && mails[0].html.includes(`/api/pagos/descarga?proveedor=paypal&pago=${cap1}`));
check("vuelta: el rastro de entrega queda en la nota", revenue[0].note.includes("Entregado por email"));
check("mail en tú para México, sin rayas", mails[0].html.includes("Descárgala") && !/[–—]/.test(mails[0].html));

const v1b = await rutaVuelta.GET(new NextRequest(`https://calcularya.com/api/pagos/paypal/vuelta?m=mx&p=planilla-prueba&token=${orden1}&PayerID=ABC`));
check("vuelta repetida (F5): ORDER_ALREADY_CAPTURED se resuelve, sin venta ni mail nuevos", (v1b.headers.get("location") ?? "").includes(cap1) && revenue.length === 1 && mails.length === 1);

// ─── 3. Descarga ─────────────────────────────────────────────────────────────────────────────
const d1 = await rutaDescarga.GET(new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${cap1}`));
const bytes = Buffer.from(await d1.arrayBuffer());
check("descarga con la captura: 200 y el archivo del producto", d1.status === 200 && bytes.equals(BYTES) && (d1.headers.get("content-disposition") ?? "").includes("planilla-prueba.xlsx"));
const d2 = await rutaDescarga.GET(new NextRequest("https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=CAP99999999999999"));
check("descarga con una captura inexistente: 403", d2.status === 403);
const d3 = await rutaDescarga.GET(new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=mercadopago&pago=${cap1}`));
check("descarga intl no acepta mercadopago", d3.status === 400);
const d4 = await rutaDescarga.GET(new NextRequest("https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=../../etc"));
check("descarga con id basura: 400 sin consultar a PayPal", d4.status === 400);

// ─── 4. Captura con monto o moneda distinta ─────────────────────────────────────────────────
async function compraConCaptura(cambio: Partial<Captura>) {
  const r = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: IP, body: new URLSearchParams({ p: PRODUCTO.id, email: "x@example.com" }) }));
  const orden = new URL(r.headers.get("location")!).searchParams.get("token")!;
  proximaCaptura = cambio;
  const v = await rutaVuelta.GET(new NextRequest(`https://calcularya.com/api/pagos/paypal/vuelta?m=mx&p=planilla-prueba&token=${orden}`));
  proximaCaptura = {};
  return { v, captura: ordenes.get(orden)!.capturaId };
}
for (const [nombre, cambio] of [
  ["monto menor (1.00)", { value: "1.00" }],
  ["moneda distinta (9.00 MXN)", { currency: "MXN" }],
  ["referencia de otro producto", { custom_id: `mx/otra-planilla:${crypto.randomUUID()}` }],
] as const) {
  const antes = { r: revenue.length, m: mails.length };
  const { v, captura } = await compraConCaptura(cambio);
  const d = await rutaDescarga.GET(new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${captura}`));
  check(`captura con ${nombre}: sin venta, sin mail, sin gracias y descarga 403`, revenue.length === antes.r && mails.length === antes.m && !(v.headers.get("location") ?? "").includes("/gracias") && d.status === 403, v.headers.get("location"));
}

// ─── 5. Webhook ──────────────────────────────────────────────────────────────────────────────
function evento(tipo: string, recurso: Record<string, unknown>, id = `WH-${++secuencia}`) {
  return JSON.stringify({ id, event_type: tipo, resource: recurso });
}
function pedidoWebhook(cuerpo: string, firma = "firma-buena", sinCabeceras = false) {
  const h: Record<string, string> = sinCabeceras
    ? {}
    : {
        "paypal-auth-algo": "SHA256withRSA",
        "paypal-cert-url": "https://api.paypal.com/v1/notifications/certs/CERT",
        "paypal-transmission-id": "tx-1",
        "paypal-transmission-sig": firma,
        "paypal-transmission-time": new Date().toISOString(),
      };
  return new NextRequest("https://calcularya.com/api/pagos/paypal/webhook", { method: "POST", headers: h, body: cuerpo });
}

// Una compra aprobada que la persona no volvió a capturar.
const r5 = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: IP, body: new URLSearchParams({ p: PRODUCTO.id, email: "y@example.com" }) }));
const orden5 = new URL(r5.headers.get("location")!).searchParams.get("token")!;
const antesFalsa = { r: revenue.length, verif: llamadas.filter((l) => l.url.endsWith("verify-webhook-signature")).length };
const falsa = await rutaWebhook.POST(pedidoWebhook(evento("CHECKOUT.ORDER.APPROVED", { id: orden5 }), "firma-falsa"));
check("webhook con firma inválida: 401 y no captura ni asienta", falsa.status === 401 && revenue.length === antesFalsa.r && !capturas.has(ordenes.get(orden5)!.capturaId));
const sinH = await rutaWebhook.POST(pedidoWebhook(evento("PAYMENT.CAPTURE.COMPLETED", { id: cap1 }), "", true));
check("webhook sin cabeceras de PayPal: 401 sin consultar la verificación", sinH.status === 401 && llamadas.filter((l) => l.url.endsWith("verify-webhook-signature")).length === antesFalsa.verif + 1);
const verif = llamadas.filter((l) => l.url.endsWith("verify-webhook-signature")).at(-1)!;
check("verificación: el evento viaja con los bytes originales", verif.body.endsWith(`"webhook_event":${evento("CHECKOUT.ORDER.APPROVED", { id: orden5 }, JSON.parse(verif.body).webhook_event.id)}}`));
for (const [nombre, cambio] of [
  ["cert_url fuera de paypal.com", { "paypal-cert-url": "https://evil.example/paypal.com/cert" }],
  ["auth_algo distinto", { "paypal-auth-algo": "SHA1withRSA" }],
  ["transmission_time de hace 11 minutos", { "paypal-transmission-time": new Date(Date.now() - 11 * 60_000).toISOString() }],
] as const) {
  const antesV = llamadas.filter((l) => l.url.endsWith("verify-webhook-signature")).length;
  const req = pedidoWebhook(evento("PAYMENT.CAPTURE.COMPLETED", { id: cap1 }));
  const h = new Headers(req.headers);
  for (const [k, v] of Object.entries(cambio)) h.set(k, v);
  const r = await rutaWebhook.POST(new NextRequest(req.url, { method: "POST", headers: h, body: await req.text() }));
  check(`webhook con ${nombre}: 401 sin consultar a PayPal`, r.status === 401 && llamadas.filter((l) => l.url.endsWith("verify-webhook-signature")).length === antesV);
}
check("webhook: pasa por el limitador persistente", limites.some((k) => k.startsWith("paypal-webhook:")));
const basura = await rutaWebhook.POST(new NextRequest("https://calcularya.com/api/pagos/paypal/webhook", { method: "POST", body: "no es json" }));
check("webhook con cuerpo que no es JSON: 400", basura.status === 400);

// PayPal manda la orden con sus purchase_units: sin una referencia nuestra el webhook no captura.
const aprobada = await rutaWebhook.POST(pedidoWebhook(evento("CHECKOUT.ORDER.APPROVED", { id: orden5, purchase_units: [{ custom_id: ordenes.get(orden5)!.unidad.custom_id }] })));
const ajena = await rutaWebhook.POST(pedidoWebhook(evento("CHECKOUT.ORDER.APPROVED", { id: orden5, purchase_units: [{ custom_id: "otro-producto-de-la-misma-app" }] })));
check("CHECKOUT.ORDER.APPROVED sin referencia nuestra: 200 e ignorado, no se captura", ajena.status === 200 && (((await ajena.json()) as { ignorado?: string }).ignorado ?? "").length > 0);
const cap5 = ordenes.get(orden5)!.capturaId;
check("CHECKOUT.ORDER.APPROVED: el webhook captura y asienta la venta", aprobada.status === 200 && capturas.has(cap5) && revenue.some((r) => r.note.includes(marcaVentaIntl("paypal", cap5))));
const mailsAntes = mails.length;
const filasAntes = revenue.length;
const ev = evento("PAYMENT.CAPTURE.COMPLETED", { id: cap5, amount: { value: "0.01", currency_code: "USD" } });
const w1 = await rutaWebhook.POST(pedidoWebhook(ev));
const w2 = await rutaWebhook.POST(pedidoWebhook(ev));
const j1 = (await w1.json()) as { registrado?: boolean };
const j2 = (await w2.json()) as { registrado?: boolean };
check("PAYMENT.CAPTURE.COMPLETED repetido: 200, 200 y sin filas ni mails nuevos", w1.status === 200 && w2.status === 200 && j1.registrado === false && j2.registrado === false && revenue.length === filasAntes && mails.length === mailsAntes);
check("el monto del cuerpo del evento (0.01) no se usa: la venta quedó en 9", revenue.find((r) => r.note.includes(marcaVentaIntl("paypal", cap5)))?.amount === 9);

// Venta que entra primero por el webhook (la persona cerró la pestaña después de pagar).
const r6 = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: IP, body: new URLSearchParams({ p: PRODUCTO.id, email: "z@example.com" }) }));
const orden6 = new URL(r6.headers.get("location")!).searchParams.get("token")!;
await paypal.confirmarPago(orden6);
const cap6 = ordenes.get(orden6)!.capturaId;
const antes6 = { r: revenue.length, m: mails.length };
const w6a = await rutaWebhook.POST(pedidoWebhook(evento("PAYMENT.CAPTURE.COMPLETED", { id: cap6 })));
const w6b = await rutaWebhook.POST(pedidoWebhook(evento("PAYMENT.CAPTURE.COMPLETED", { id: cap6 })));
check("webhook primero: una venta y un mail; el reenvío de PayPal con otro id de evento no repite", w6a.status === 200 && w6b.status === 200 && revenue.length === antes6.r + 1 && mails.length === antes6.m + 1);

const otro = await rutaWebhook.POST(pedidoWebhook(evento("BILLING.SUBSCRIPTION.CREATED", { id: "I-1" })));
check("evento que no usamos: 200 ignorado", otro.status === 200 && ((await otro.json()) as { ignorado?: string }).ignorado === "BILLING.SUBSCRIPTION.CREATED");

// Devolución
capturas.get(cap6)!.status = "REFUNDED";
const refund = evento("PAYMENT.CAPTURE.REFUNDED", { id: "REF123456789012", links: [{ rel: "up", href: `https://api.paypal.com/v2/payments/captures/${cap6}` }] });
await rutaWebhook.POST(pedidoWebhook(refund));
await rutaWebhook.POST(pedidoWebhook(refund));
const devol = revenue.filter((r) => r.note.includes(marcaDevolucionIntl("paypal", cap6)));
check("reembolso: una sola fila negativa, aunque llegue dos veces", devol.length === 1 && devol[0].amount === -9);
const dRef = await rutaDescarga.GET(new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${cap6}`));
check("descarga de una captura reembolsada: 403", dRef.status === 403);

const salud = await rutaWebhook.GET();
check("GET del webhook sin sesión de admin: 404 sin publicar la config", salud.status === 404 && !(await salud.text()).includes("paypal"));

// Reembolso parcial: sin el monto devuelto no se asienta nada.
const r7 = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: IP, body: new URLSearchParams({ p: PRODUCTO.id, email: "p@example.com" }) }));
const orden7 = new URL(r7.headers.get("location")!).searchParams.get("token")!;
await paypal.confirmarPago(orden7);
const cap7 = ordenes.get(orden7)!.capturaId;
await rutaWebhook.POST(pedidoWebhook(evento("PAYMENT.CAPTURE.COMPLETED", { id: cap7 })));
capturas.get(cap7)!.status = "PARTIALLY_REFUNDED";
const filas7 = revenue.length;
const w7 = await rutaWebhook.POST(pedidoWebhook(evento("PAYMENT.CAPTURE.REFUNDED", { id: "REF777777777777", links: [{ rel: "up", href: `https://api.paypal.com/v2/payments/captures/${cap7}` }] })));
const j7 = (await w7.json()) as { ignorado?: string };
check("reembolso parcial: 200 ignorado, sin fila negativa", w7.status === 200 && (j7.ignorado ?? "").includes("reembolso parcial") && revenue.length === filas7 && !revenue.some((r) => r.note.includes(marcaDevolucionIntl("paypal", cap7))), j7);

// ─── 6. Sincronización con degradación (ca_checkouts / ca_compras) ──────────────────────────
{
  const escrituras: { tabla: string; fila: Record<string, unknown> }[] = [];
  const filtros: string[] = [];
  let faltanColumnas = true;
  const consulta = (tabla: string) => {
    const q = {
      update: () => q,
      eq: () => q,
      or: (f: string) => {
        filtros.push(f);
        return q;
      },
      select: () => q,
      upsert: (fila: Record<string, unknown>) => {
        escrituras.push({ tabla, fila });
        const sinMigracion = faltanColumnas && "proveedor" in fila;
        return { abortSignal: async () => ({ error: sinMigracion ? { code: "PGRST204", message: "falta proveedor" } : null }) };
      },
      abortSignal: async () => ({ data: [{ email: "checkout@example.com", user_id: "aaaaaaaa-0000-4000-8000-000000000001" }], error: null }),
    };
    return q;
  };
  const db = { from: consulta } as unknown as Parameters<typeof sincronizarPagoIntl>[0];
  const pago = await paypal.consultarPago(cap1);
  await sincronizarPagoIntl(db, pago!);
  const compras = escrituras.filter((e) => e.tabla === "ca_compras");
  check("ca_checkouts: el id con «paypal:» va entrecomillado en el filtro .or()", filtros.some((f) => f.endsWith(`mp_payment_id.eq."paypal:${cap1}"`)), filtros);
  check("ca_compras: sin la migración nueva se reintenta sin proveedor/pago_id", compras.length === 2 && "proveedor" in compras[0].fila && !("proveedor" in compras[1].fila));
  const f = compras[0].fila;
  check(
    "ca_compras: mp_payment_id prefijado, USD, sitio intl, mercado y user_id del checkout",
    f.mp_payment_id === `paypal:${cap1}` && f.moneda === "USD" && f.monto === 9 && f.sitio === "intl" && f.mercado === "mx" && f.user_id === "aaaaaaaa-0000-4000-8000-000000000001" && f.pago_id === cap1,
    f,
  );
  faltanColumnas = false;
  escrituras.length = 0;
  await sincronizarPagoIntl(db, pago!);
  check("ca_compras: con la migración entra en un solo intento", escrituras.filter((e) => e.tabla === "ca_compras").length === 1);
}

// ─── 7. Adaptador de Mercado Pago sin cambios ───────────────────────────────────────────────
{
  const comercio = mp.PRODUCTOS["planilla-comercio"];
  const ref = mp.referenciaExterna(comercio.slug);
  const urls = { success: "https://calcular.ar/planillas/gracias", pending: "https://calcular.ar/planillas/gracias", failure: "https://calcular.ar/planillas?pago=fallido" };
  const n0 = llamadas.length;
  await mp.crearPreferencia({ producto: comercio, externalReference: ref, backUrls: urls, emailComprador: "ar@example.com" });
  await mercadopago.crearCheckout({
    producto: { id: comercio.slug, titulo: comercio.titulo, precioCentavos: comercio.precio * 100, moneda: comercio.moneda },
    referencia: ref,
    urlVuelta: urls.success,
    urlCancelar: urls.failure,
    email: "ar@example.com",
    idempotencia: "x",
  });
  const [directo, adaptado] = llamadas.slice(n0).filter((l) => l.url.endsWith("/checkout/preferences"));
  check("MP: el adaptador manda la misma preferencia que mp.crearPreferencia", !!directo && directo.body === adaptado?.body, { directo: directo?.body, adaptado: adaptado?.body });
  const crudo = await mp.obtenerPago("123456789");
  const normal = await mercadopago.consultarPago("123456789");
  check(
    "MP: consultarPago normaliza sin cambiar el veredicto de pagoAprobado",
    !!normal && normal.montoCentavos === 1490000 && normal.moneda === "ARS" &&
      pagoCubre(normal, { id: comercio.slug, titulo: "", precioCentavos: comercio.precio * 100, moneda: "ARS" }) === mp.pagoAprobado(crudo, comercio),
  );
  check("MP: un id no numérico no se consulta", (await mercadopago.consultarPago("abc")) === null);
  const secreto = "secreto-mp-de-prueba";
  process.env.MP_WEBHOOK_SECRET = secreto;
  const ts = "1755300000";
  const firma = mpWebhook.firmar(mpWebhook.manifiesto("555", "req-1", ts), secreto);
  const notif = (v1: string) => ({
    url: new URL("https://calcular.ar/api/mp/webhook?type=payment&data.id=555"),
    headers: new Headers({ "x-signature": `ts=${ts},v1=${v1}`, "x-request-id": "req-1" }),
    cuerpo: "",
  });
  check("MP: validarWebhook acepta la firma que acepta la ruta y rechaza otra", (await mercadopago.validarWebhook(notif(firma))) && !(await mercadopago.validarWebhook(notif("0".repeat(64)))));
  delete process.env.MP_WEBHOOK_SECRET;
}

// ─── 8. Nada salió a la red real ─────────────────────────────────────────────────────────────
check("ningún pedido a PayPal sandbox", !llamadas.some((l) => l.url.includes("sandbox.paypal.com")));
check("referenciaIntl arma la referencia del catálogo", referenciaIntl(PRODUCTO, "00000000-0000-4000-8000-000000000000") === "mx/planilla-prueba:00000000-0000-4000-8000-000000000000");

olvidarTokenPaypal();
restaurar();
process.chdir(cwd);
rmSync(tmp, { recursive: true, force: true });

console.log(fallas === 0 ? "\nTODO OK check_pagos" : `\n${fallas} FALLAS check_pagos`);
process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("check_pagos se cortó:", e);
  process.exit(1);
});
