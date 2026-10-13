// src/lib/mp-webhook.ts — lógica pura del webhook de MercadoPago (v1.1).
//
// POR QUÉ EXISTE. La primera venta real (8/8/2026, $14.900) NO quedó registrada en
// `revenue_events`: el webhook nunca se había construido, así que el ingreso dependía de que
// alguien le avisara a Manuel y de que una sesión lo cargara a mano (se cargó el 16/8, ocho días
// después). Eso viola la regla dura «100% AUTOMÁTICO»: una venta tiene que asentarse sola.
//
// Acá vive lo VERIFICABLE sin red (firma, parseo, dedupe) para que `scripts/check_mp_webhook.ts`
// lo pruebe de verdad; la ruta `/api/mp/webhook` solo orquesta: verifica → re-consulta el pago a
// MP → inserta.
//
// SEGURIDAD. La fuente de verdad del pago NUNCA es el cuerpo de la notificación: es la respuesta
// de `GET /v1/payments/{id}` con nuestro token (mismo principio que la entrega). La firma
// `x-signature` es una capa extra: si `MP_WEBHOOK_SECRET` está cargado se exige y un manifiesto
// que no cierra se rechaza con 401; si no está cargado se sigue adelante apoyado en la
// re-consulta (un id inventado devuelve 404 y no inserta nada).

import { createHmac, timingSafeEqual } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  checkoutIdDeReferencia,
  emailValido,
  esPagoDePlanilla,
  pagoAprobado,
  productoDePago,
  rutaDeReferencia,
  type MpPayment,
  type PagoEncontrado,
  type Producto,
  type ProductoSlug,
} from "./mp";

/** La cuenta legado es la personal de Manuel y cobra otras cosas: un pago de ahí sin la marca de
 *  una planilla no es una venta nuestra, aunque cueste lo mismo que una. `productoDePago` lo daría
 *  por Comercio y saldría el mail de entrega. Las ventas viejas (8/8, 25/8) llevan
 *  `metadata.producto`, así que siguen pasando. */
export function esPagoAjeno(e: PagoEncontrado): boolean {
  return e.legado && !esPagoDePlanilla(e.pago);
}

/** Marca canónica del pago dentro de `note`. Es la clave de dedupe: `revenue_events` no
 *  tiene columna propia para el id de MercadoPago, así que la idempotencia se apoya en
 *  buscar esta marca antes de insertar. Formato estable — no cambiarlo sin migrar. */
export function marcaPago(paymentId: string): string {
  return `[mp:${paymentId}]`;
}

/** Parsea el header `x-signature` de MP: `ts=1704908010,v1=<hex>`. */
export function parsearFirma(header: string | null): { ts: string; v1: string } | null {
  if (!header) return null;
  let ts = "";
  let v1 = "";
  for (const parte of header.split(",")) {
    const [k, ...resto] = parte.trim().split("=");
    const v = resto.join("=");
    if (k === "ts") ts = v;
    else if (k === "v1") v1 = v;
  }
  return ts && v1 ? { ts, v1 } : null;
}

/** Manifiesto que MP firma: `id:<data.id>;request-id:<x-request-id>;ts:<ts>;`
 *  (los tramos cuyo valor no llega se omiten, según la doc de MP). */
export function manifiesto(dataId: string, requestId: string | null, ts: string): string {
  const partes = [`id:${dataId};`];
  if (requestId) partes.push(`request-id:${requestId};`);
  partes.push(`ts:${ts};`);
  return partes.join("");
}

/** El `data.id` que entra al manifiesto sale de la query string, como en los ejemplos de la doc de MP
 *  (`req.query['data.id']`), no del cuerpo ni del `id` del IPN viejo. */
export function dataIdDeFirma(url: URL): string | null {
  const id = url.searchParams.get("data.id")?.trim();
  return id ? id : null;
}

/** IPN viejo (`?topic=payment&id=N`): según la doc de MP trae `x-signature` pero no se puede validar
 *  con la clave secreta. */
export function esIpn(url: URL): boolean {
  return url.searchParams.has("topic") && !url.searchParams.has("data.id");
}

export type VerificacionFirma = "valida" | "invalida" | "sin-firma";

/**
 * "sin-firma" no es un rechazo: el IPN y los avisos sin `x-signature` llegan junto a la notificación
 * firmada del mismo pago. "invalida" es una firma presente que no cierra con el secret.
 */
export function verificarFirma(url: URL, headers: Headers, secret: string | undefined): VerificacionFirma {
  if (!secret) return "valida";
  const cabecera = headers.get("x-signature");
  if (!cabecera || esIpn(url)) return "sin-firma";
  const firma = parsearFirma(cabecera);
  const dataId = dataIdDeFirma(url);
  if (!firma || !dataId) return "invalida";
  return firmaValida(firmar(manifiesto(dataId, headers.get("x-request-id"), firma.ts), secret), firma.v1) ? "valida" : "invalida";
}

/** `ana.perez@gmail.com` → `an***@gmail.com`: alcanza para reconocer el caso en un log sin publicar el mail. */
export function enmascararEmail(email: string | null | undefined): string {
  const e = (email ?? "").trim();
  const arroba = e.lastIndexOf("@");
  if (arroba < 1) return e ? "***" : "(sin email)";
  return `${e.slice(0, Math.min(2, arroba))}***${e.slice(arroba)}`;
}

/** HMAC-SHA256 hex del manifiesto con el secret del panel de MP. */
export function firmar(manifest: string, secret: string): string {
  return createHmac("sha256", secret).update(manifest).digest("hex");
}

/** Compara en tiempo constante (evita filtrar el hash por timing). */
export function firmaValida(esperado: string, recibido: string): boolean {
  const a = Buffer.from(esperado, "utf8");
  const b = Buffer.from(recibido, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export type CuerpoNotificacion = {
  type?: string;
  topic?: string;
  action?: string;
  data?: { id?: string | number };
  id?: string | number;
};

/**
 * Saca el id del pago de una notificación. MP manda el mismo evento de varias formas según la
 * antigüedad de la integración: `?type=payment&data.id=N` (webhook moderno), `?topic=payment&id=N`
 * (IPN viejo) y/o el id en el cuerpo. Devuelve null si el evento NO es de un pago (ej.
 * `merchant_order`, que MP dispara para el mismo checkout y no debe insertar nada).
 */
export function extraerPaymentId(url: URL, cuerpo: CuerpoNotificacion | null): string | null {
  const tipo = (cuerpo?.type ?? cuerpo?.topic ?? url.searchParams.get("type") ?? url.searchParams.get("topic") ?? "")
    .toString()
    .toLowerCase();
  // `action` viene como "payment.created" / "payment.updated".
  const accion = (cuerpo?.action ?? "").toString().toLowerCase();
  const esPago = tipo === "payment" || accion.startsWith("payment.");
  if (!esPago) return null;

  const id =
    cuerpo?.data?.id ??
    url.searchParams.get("data.id") ??
    (tipo === "payment" ? url.searchParams.get("id") : null) ??
    cuerpo?.id;
  if (id === undefined || id === null) return null;
  const s = String(id).trim();
  return /^\d+$/.test(s) ? s : null;
}

// ─── Registro de la venta (idempotente) ──────────────────────────────────────
//
// Vive acá y no dentro de la ruta para que `scripts/check_mp_webhook.ts` pueda ejercitarlo de
// verdad con un `fetch` falso: la idempotencia es lo que separa "una venta" de "tres ventas
// infladas en el dashboard y tres mails al mismo comprador", y MP reintenta la MISMA
// notificación hasta recibir un 2xx (además de mandar payment.created y payment.updated).
// Testear esa lógica leyendo el código no alcanza — hay que correrla dos veces.

export type Http = (input: string, init?: RequestInit) => Promise<Response>;

export type DepsVenta = {
  fetch: Http;
  supabaseUrl: string;
  serviceRole: string;
};

export type Venta = {
  paymentId: string;
  monto: number;
  moneda: string;
  email?: string;
  productoTitulo: string;
  productoSlug: string;
};

/**
 * Asienta la venta en `revenue_events` una sola vez por `payment_id`.
 *
 * INCIDENTE QUE ORIGINA ESTE DISEÑO (25/8/2026, segunda venta real del imperio): el pago
 * 175627733834 entró DOS veces (filas id=2 e id=3, con 1,2 ms de diferencia). MP disparó
 * `payment.created` y `payment.updated` casi simultáneos; los dos SELECT de dedupe corrieron
 * ANTES de que cualquiera de los dos INSERT aterrizara y los dos vieron la tabla vacía. Un
 * "SELECT y después INSERT" NO es atómico. Los ingresos del dashboard quedaron inflados en
 * $14.900 y, con la entrega colgada del mismo booleano, la compradora habría recibido dos mails.
 *
 * ARREGLO ESTRUCTURAL: supabase/migrations/20261013120000_revenue_events_venta_unica.sql pone un
 * índice único sobre la marca. Con el índice aplicado, el INSERT perdedor de la carrera recibe 409 y
 * se toma como duplicado; sin él, este código compensa la carrera después del hecho:
 *
 *   1. SELECT por la marca (atajo barato para el reintento normal de MP, que llega segundos
 *      después y sí ve la fila).
 *   2. INSERT pidiendo `return=representation` para conocer el id propio.
 *   3. Re-SELECT: si quedó más de una fila con la misma marca, GANA LA DE ID MÁS BAJO y las
 *      demás se borran. La regla es determinística, así que los dos corredores eligen la MISMA
 *      superviviente y borran el MISMO conjunto — no importa quién llegue primero.
 *   4. Devuelve `duplicado: false` solo al dueño de la fila superviviente → un único mail.
 */
export async function registrarVenta(
  deps: DepsVenta,
  v: Venta,
): Promise<{ duplicado: boolean; filaId?: number }> {
  const marca = marcaPago(v.paymentId);
  return asentarUnaVez(deps, marca, {
    project_slug: "planillas-ar",
    source: "mercadopago",
    amount: v.monto,
    currency: v.moneda,
    note:
      `Venta automática de ${v.productoTitulo} ${marca}` +
      ` · producto ${v.productoSlug}` +
      (v.email ? ` · comprador ${v.email}` : "") +
      ". Registrada por el webhook de MercadoPago. Monto bruto, sin descontar comisión.",
  });
}

function cabeceras(deps: DepsVenta) {
  return {
    "Content-Type": "application/json",
    apikey: deps.serviceRole,
    Authorization: `Bearer ${deps.serviceRole}`,
  };
}

export async function idsConLaMarca(deps: DepsVenta, marca: string): Promise<number[]> {
  const filtro = `note=ilike.*${encodeURIComponent(marca)}*`;
  const res = await deps.fetch(
    `${deps.supabaseUrl}/rest/v1/revenue_events?select=id&${filtro}&order=id.asc`,
    { headers: cabeceras(deps), cache: "no-store" },
  );
  if (!res.ok) throw new Error(`Supabase dedupe ${res.status}`);
  return ((await res.json()) as { id: number }[]).map((f) => f.id);
}

/** Los pasos 1–4 de arriba, para cualquier fila de `revenue_events` que tenga que existir una sola
 *  vez por marca (la venta y, si la hay, su devolución). */
export async function asentarUnaVez(
  deps: DepsVenta,
  marca: string,
  fila: Record<string, unknown>,
): Promise<{ duplicado: boolean; filaId?: number }> {
  const headers = cabeceras(deps);

  // 1. Atajo para el reintento normal de MP (llega segundos después y sí ve la fila).
  if ((await idsConLaMarca(deps, marca)).length > 0) return { duplicado: true };

  // 2. Insertar pidiendo la fila de vuelta: sin el id propio no hay forma de saber, después,
  //    si la superviviente es la nuestra.
  const res = await deps.fetch(`${deps.supabaseUrl}/rest/v1/revenue_events`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(fila),
    cache: "no-store",
  });
  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    // 23505 = unique_violation: otro corredor ya asentó esta marca (índice de la migración 20261013).
    if (res.status === 409 && detalle.includes("23505")) return { duplicado: true };
    throw new Error(`Supabase insert ${res.status}: ${detalle}`);
  }
  const insertadas = (await res.json().catch(() => [])) as { id?: number }[];
  const miId = Array.isArray(insertadas) ? insertadas[0]?.id : undefined;

  // 3. Resolver la carrera. Sin id propio no se puede decidir: se prefiere NO entregar de más
  //    (la descarga sigue viva en /planillas/gracias) antes que mandar dos mails.
  const ids = await idsConLaMarca(deps, marca);
  if (ids.length <= 1) return { duplicado: false, filaId: miId };

  const superviviente = ids[0];
  const sobrantes = ids.slice(1);
  console.warn(
    `[revenue_events] carrera de webhooks en ${marca}: ${ids.length} filas, me quedo con id=${superviviente}`,
  );
  const del = await deps.fetch(
    `${deps.supabaseUrl}/rest/v1/revenue_events?id=in.(${sobrantes.join(",")})`,
    { method: "DELETE", headers, cache: "no-store" },
  );
  // Si el borrado falla queda una fila de más: es un número mal en el dashboard, no una venta
  // perdida. Se loguea y se sigue — nunca romper la entrega por limpiar la tabla.
  if (!del.ok) console.error(`[revenue_events] no pude borrar las filas duplicadas ${sobrantes.join(",")}`);

  const duplicado = miId === undefined || miId !== superviviente;
  return duplicado ? { duplicado: true } : { duplicado: false, filaId: superviviente };
}

/** Marca de la devolución (reembolso o contracargo) de un pago. No contiene `[mp:<id>]`: si lo
 *  contuviera, el dedupe de la venta la tomaría por la venta y un reintento no se asentaría. */
export function marcaDevolucion(paymentId: string): string {
  return `[mp-devuelto:${paymentId}]`;
}

export type Devolucion = {
  paymentId: string;
  monto: number;
  moneda: string;
  motivo: "reembolso" | "contracargo";
  productoTitulo: string;
  productoSlug: string;
};

/** Asienta el monto negativo de un pago devuelto, una sola vez y sólo si la venta se había
 *  asentado: descontar algo que nunca se sumó dejaría los ingresos por debajo de la realidad. */
export async function registrarDevolucion(
  deps: DepsVenta,
  d: Devolucion,
): Promise<{ duplicado: boolean; sinVenta?: boolean; filaId?: number }> {
  if ((await idsConLaMarca(deps, marcaPago(d.paymentId))).length === 0) return { duplicado: false, sinVenta: true };
  const marca = marcaDevolucion(d.paymentId);
  return asentarUnaVez(deps, marca, {
    project_slug: "planillas-ar",
    source: "mercadopago",
    amount: -Math.abs(d.monto),
    currency: d.moneda,
    note:
      `${d.motivo === "reembolso" ? "Reembolso" : "Contracargo"} de ${d.productoTitulo} ${marca}` +
      ` · producto ${d.productoSlug} · descuenta la venta del pago ${d.paymentId}.` +
      " Registrado por el webhook de MercadoPago.",
  });
}

export async function marcarEntrega(
  deps: DepsVenta,
  filaId: number,
  resultado: "ok" | "fallo" | "sin-email",
  email?: string,
): Promise<boolean> {
  const headers = {
    "Content-Type": "application/json",
    apikey: deps.serviceRole,
    Authorization: `Bearer ${deps.serviceRole}`,
  };
  const url = `${deps.supabaseUrl}/rest/v1/revenue_events?id=eq.${filaId}`;

  try {
    const res = await deps.fetch(`${url}&select=note&limit=1`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[revenue_events] no pude leer el rastro de entrega de id=${filaId}: ${res.status}`);
      return false;
    }

    const filas = (await res.json()) as { note?: string | null }[];
    const note = Array.isArray(filas) && typeof filas[0]?.note === "string" ? filas[0].note : null;
    if (note === null) {
      console.error(`[revenue_events] no encontré la fila id=${filaId} para guardar el rastro de entrega`);
      return false;
    }

    const fecha = new Date().toISOString().slice(0, 10);
    const datos =
      resultado === "ok"
        ? { fijo: "Entregado por email el ", sufijo: ` · Entregado por email el ${fecha}.` }
        : resultado === "fallo"
          ? {
              fijo: "ENTREGA POR EMAIL FALLÓ el ",
              sufijo: ` · ENTREGA POR EMAIL FALLÓ el ${fecha}: reenviar a mano a ${email ?? "email no disponible"}.`,
            }
          : {
              fijo: "MercadoPago no expuso el email del comprador: la única entrega fue el botón de la página de gracias.",
              sufijo:
                " · MercadoPago no expuso el email del comprador: la única entrega fue el botón de la página de gracias.",
            };

    if (note.includes(datos.fijo)) return true;

    const patch = await deps.fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ note: `${note}${datos.sufijo}` }),
      cache: "no-store",
    });
    if (!patch.ok) {
      console.error(`[revenue_events] no pude guardar el rastro de entrega de id=${filaId}: ${patch.status}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error(`[revenue_events] error guardando el rastro de entrega de id=${filaId}`, e);
    return false;
  }
}

// ─── Embudo propio y biblioteca del comprador (ca_checkouts / ca_compras) ────────────────────
//
// Todo esto es ADICIONAL a revenue_events + mail de entrega: corre después de responderle a MP
// y nunca tira. Si las tablas no están o la base no contesta, la venta ya quedó asentada y
// entregada por el camino de siempre.

export type EstadoCheckout = "pendiente" | "pagado" | "rechazado" | "reembolsado";
export type EstadoCompra = "aprobado" | "reembolsado" | "contracargo";

export function estadoCheckout(status: string | undefined): EstadoCheckout | null {
  switch (status) {
    case "approved":
    case "authorized":
      return "pagado";
    case "pending":
    case "in_process":
    case "in_mediation":
      return "pendiente";
    case "rejected":
    case "cancelled":
      return "rechazado";
    case "refunded":
    case "charged_back":
      return "reembolsado";
    default:
      return null;
  }
}

export function estadoCompra(status: string | undefined): EstadoCompra | null {
  if (status === "approved") return "aprobado";
  if (status === "refunded") return "reembolsado";
  if (status === "charged_back") return "contracargo";
  return null;
}

export type FilaCompra = {
  mp_payment_id: string;
  producto: ProductoSlug;
  email: string | null;
  monto: number;
  moneda: string;
  estado: EstadoCompra;
  legado: boolean;
  checkout_id: string | null;
  pagado_at: string;
};

export function filaCompra(
  pago: MpPayment,
  e: { paymentId: string; legado: boolean; producto: Producto; estado: EstadoCompra; emailCheckout?: string | null },
): FilaCompra {
  return {
    mp_payment_id: e.paymentId,
    producto: e.producto.slug,
    email: emailValido(pago.payer?.email) ?? emailValido(e.emailCheckout),
    monto: pago.transaction_amount ?? e.producto.precio,
    moneda: pago.currency_id ?? e.producto.moneda,
    estado: e.estado,
    legado: e.legado,
    checkout_id: checkoutIdDeReferencia(pago.external_reference),
    pagado_at: pago.date_approved ?? pago.date_created ?? new Date().toISOString(),
  };
}

const tope = () => AbortSignal.timeout(4000);

async function sincronizarCheckout(
  db: SupabaseClient,
  pago: MpPayment,
  paymentId: string,
  producto: Producto,
): Promise<string | null> {
  const id = checkoutIdDeReferencia(pago.external_reference);
  const estado = estadoCheckout(pago.status);
  if (!id || !estado) return null;
  const ahora = new Date().toISOString();

  // Una misma preferencia puede tener varios pagos (tarjeta rechazada y después aprobada). Un
  // aviso tardío del rechazado no puede bajar a «rechazado» un checkout que otro pago ya pagó.
  const { data, error } = await db
    .from("ca_checkouts")
    .update({ estado, mp_payment_id: paymentId, updated_at: ahora })
    .eq("id", id)
    .or(`estado.is.null,estado.in.(iniciado,pendiente,rechazado),mp_payment_id.eq.${paymentId}`)
    .select("email")
    .abortSignal(tope());
  if (error) {
    console.error("[mp/webhook] ca_checkouts:", error.code, error.message);
    return null;
  }
  if (data.length) return (data[0] as { email: string | null }).email;

  const { error: e2 } = await db
    .from("ca_checkouts")
    .upsert(
      {
        id,
        producto: producto.slug,
        email: emailValido(pago.payer?.email),
        desde: rutaDeReferencia(pago.external_reference),
        estado,
        mp_payment_id: paymentId,
        monto: pago.transaction_amount ?? producto.precio,
        updated_at: ahora,
      },
      { onConflict: "id", ignoreDuplicates: true },
    )
    .abortSignal(tope());
  if (e2) console.error("[mp/webhook] ca_checkouts (alta):", e2.code, e2.message);
  return null;
}

export async function sincronizarPago(
  db: SupabaseClient,
  e: { pago: MpPayment; paymentId: string; legado: boolean },
): Promise<void> {
  try {
    const { pago, paymentId, legado } = e;
    if (!esPagoDePlanilla(pago)) return;
    const producto = productoDePago(pago);
    if (!producto) return;

    const emailCheckout = await sincronizarCheckout(db, pago, paymentId, producto);

    const estado = estadoCompra(pago.status);
    if (!estado) return;
    if (estado === "aprobado" && !pagoAprobado(pago, producto)) {
      console.warn("[mp/webhook] pago aprobado que no cierra con el producto, no va a ca_compras:", paymentId);
      return;
    }
    const fila = filaCompra(pago, { paymentId, legado, producto, estado, emailCheckout });
    // Alta: ignoreDuplicates, así un reintento no pisa el user_id que completó el trigger.
    // Devolución: merge, para que el estado cambie en la fila que ya existe.
    const cuerpo: Record<string, unknown> =
      estado === "aprobado" ? fila : { ...fila, updated_at: new Date().toISOString() };
    const { error } = await db
      .from("ca_compras")
      .upsert(cuerpo, { onConflict: "mp_payment_id", ignoreDuplicates: estado === "aprobado" })
      .abortSignal(tope());
    if (error) console.error("[mp/webhook] ca_compras:", error.code, error.message);
  } catch (err) {
    console.error("[mp/webhook] sincronizarPago:", err instanceof Error ? err.message : err);
  }
}
