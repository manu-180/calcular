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
 * ARREGLO ESTRUCTURAL PENDIENTE: una columna `payment_id` con índice único en `revenue_events`
 * (migración). Mientras no exista, este código compensa la carrera después del hecho:
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
  const headers = {
    "Content-Type": "application/json",
    apikey: deps.serviceRole,
    Authorization: `Bearer ${deps.serviceRole}`,
  };
  const marca = marcaPago(v.paymentId);
  const filtro = `note=ilike.*${encodeURIComponent(marca)}*`;

  async function idsConLaMarca(): Promise<number[]> {
    const res = await deps.fetch(
      `${deps.supabaseUrl}/rest/v1/revenue_events?select=id&${filtro}&order=id.asc`,
      { headers, cache: "no-store" },
    );
    if (!res.ok) throw new Error(`Supabase dedupe ${res.status}`);
    return ((await res.json()) as { id: number }[]).map((f) => f.id);
  }

  // 1. Atajo para el reintento normal de MP (llega segundos después y sí ve la fila).
  if ((await idsConLaMarca()).length > 0) return { duplicado: true };

  // 2. Insertar pidiendo la fila de vuelta: sin el id propio no hay forma de saber, después,
  //    si la superviviente es la nuestra.
  const res = await deps.fetch(`${deps.supabaseUrl}/rest/v1/revenue_events`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({
      project_slug: "planillas-ar",
      source: "mercadopago",
      amount: v.monto,
      currency: v.moneda,
      note:
        `Venta automática de ${v.productoTitulo} ${marca}` +
        ` · producto ${v.productoSlug}` +
        (v.email ? ` · comprador ${v.email}` : "") +
        ". Registrada por el webhook de MercadoPago. Monto bruto, sin descontar comisión.",
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase insert ${res.status}: ${await res.text().catch(() => "")}`);
  }
  const insertadas = (await res.json().catch(() => [])) as { id?: number }[];
  const miId = Array.isArray(insertadas) ? insertadas[0]?.id : undefined;

  // 3. Resolver la carrera. Sin id propio no se puede decidir: se prefiere NO entregar de más
  //    (la descarga sigue viva en /planillas/gracias) antes que mandar dos mails.
  const ids = await idsConLaMarca();
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
              sufijo: ` · ENTREGA POR EMAIL FALLÓ el ${fecha} — reenviar a mano a ${email ?? "email no disponible"}.`,
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
