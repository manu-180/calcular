import { NextResponse, type NextRequest } from "next/server";
import { esAdminEmail } from "@/lib/auth/admin";
import { usuarioActual } from "@/lib/auth/sesion";
import { ipDelPedido } from "@/lib/acceso-entrega";
import { permitido } from "@/lib/limite";
import { claveServicio } from "@/lib/supabase/servicio";
import { leerReferenciaIntl } from "@/lib/pagos/catalogo-intl";
import { procesarPagoIntl } from "@/lib/pagos/flujo-intl";
import { configPaypal, idCapturaDeRecurso, paypal } from "@/lib/pagos/paypal";
import type { PagoVerificado } from "@/lib/pagos/tipos";
import { marcaVentaIntl } from "@/lib/pagos/ventas-intl";
import { idsConLaMarca } from "@/lib/mp-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Evento = { id?: string; event_type?: string; resource?: Record<string, unknown> };

const EVENTOS_CAPTURA = new Set([
  "PAYMENT.CAPTURE.COMPLETED",
  "PAYMENT.CAPTURE.PENDING",
  "PAYMENT.CAPTURE.DENIED",
  "PAYMENT.CAPTURE.REFUNDED",
  "PAYMENT.CAPTURE.REVERSED",
]);

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

// El mail del comprador está en la orden y no en la captura: si leer la orden falló, se reintenta
// un par de veces antes de seguir.
async function conEmailDeLaOrden(captura: string, pago: PagoVerificado): Promise<PagoVerificado> {
  for (const espera of [300, 1000]) {
    await dormir(espera);
    const otra = await paypal.consultarPago(captura).catch(() => null);
    if (otra?.email) return otra;
  }
  return pago;
}

// Pasadas unas horas se asienta igual sin mail: la venta no puede quedar sin registrar para siempre.
const ESPERA_MAIL_MS = 6 * 60 * 60 * 1000;

function esReciente(fecha: string | null): boolean {
  const t = fecha ? Date.parse(fecha) : NaN;
  return Number.isFinite(t) && Date.now() - t < ESPERA_MAIL_MS;
}

async function ventaYaAsentada(id: string): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const clave = claveServicio();
  if (!url || !clave) return false;
  try {
    return (await idsConLaMarca({ fetch, supabaseUrl: url, serviceRole: clave }, marcaVentaIntl("paypal", id))).length > 0;
  } catch {
    return false;
  }
}

/**
 * POST /api/pagos/paypal/webhook. Contrato: 401 a una firma inválida, 500 a un error nuestro (que
 * PayPal reintente) y 200 a todo lo demás, incluidos los eventos que no usamos y los repetidos.
 * La firma se verifica con la API de PayPal sobre el cuerpo crudo y el pago se vuelve a leer de
 * PayPal: el contenido del evento nunca decide una entrega.
 */
export async function POST(req: NextRequest) {
  // Cada POST con cabeceras armadas le cuesta una llamada a PayPal con nuestro token. 120 por
  // minuto por IP sobra para los reintentos de PayPal.
  if (!(await permitido(`paypal-webhook:${ipDelPedido(req.headers) ?? "sin-ip"}`, 120, 60))) {
    return NextResponse.json({ error: "demasiados pedidos" }, { status: 429 });
  }
  const cuerpo = await req.text();
  let evento: Evento;
  try {
    evento = JSON.parse(cuerpo) as Evento;
  } catch {
    return NextResponse.json({ error: "cuerpo inválido" }, { status: 400 });
  }

  let firmaOk: boolean;
  try {
    firmaOk = await paypal.validarWebhook({ url: new URL(req.url), headers: req.headers, cuerpo });
  } catch (e) {
    console.error("[pagos/paypal/webhook] no pude verificar la firma", evento.id, e);
    return NextResponse.json({ error: "no se pudo verificar" }, { status: 500 });
  }
  if (!firmaOk) {
    console.error("[pagos/paypal/webhook] firma inválida", evento.id, evento.event_type);
    return NextResponse.json({ error: "firma inválida" }, { status: 401 });
  }

  const tipo = evento.event_type ?? "";
  try {
    let pago: PagoVerificado | null = null;
    if (tipo === "CHECKOUT.ORDER.APPROVED") {
      // La persona aprobó y cerró la pestaña antes de volver: la captura la hacemos nosotros.
      const orden = typeof evento.resource?.id === "string" ? evento.resource.id : "";
      // La app de PayPal es compartida: sin una referencia nuestra en la orden no se captura nada.
      const cid = (evento.resource as { purchase_units?: { custom_id?: string }[] } | undefined)?.purchase_units?.[0]?.custom_id;
      pago = orden && leerReferenciaIntl(cid) ? await paypal.confirmarPago(orden) : null;
    } else if (EVENTOS_CAPTURA.has(tipo)) {
      const captura = idCapturaDeRecurso(tipo, evento.resource);
      pago = captura ? await paypal.consultarPago(captura) : null;
      if (captura && pago && pago.estado === "aprobado" && !pago.email && pago.ordenId) {
        pago = await conEmailDeLaOrden(captura, pago);
        if (!pago.email && esReciente(pago.fecha) && !(await ventaYaAsentada(pago.id))) {
          // Sin el mail, procesarPagoIntl asentaría la venta como «sin email» y el reintento la vería
          // duplicada: nadie volvería a mandar la entrega. El 500 hace que PayPal reintente más tarde.
          console.error("[pagos/paypal/webhook] no pude leer el mail de la orden, queda para el reintento de PayPal", pago.id);
          return NextResponse.json({ error: "falta el mail de la orden" }, { status: 500 });
        }
      }
    } else {
      return NextResponse.json({ ok: true, ignorado: tipo || "sin tipo" });
    }
    if (!pago) return NextResponse.json({ ok: true, ignorado: "pago desconocido" });

    const r = await procesarPagoIntl(pago);
    console.log(`[pagos/paypal/webhook] ${tipo} · ${pago.id} · ${r.tipo}${r.tipo === "venta" ? (r.registrado ? " · REGISTRADO" : " · ya registrado") : ""}`);
    return NextResponse.json(
      r.tipo === "venta"
        ? { ok: true, registrado: r.registrado, producto: r.producto.id, entregado: r.entregado }
        : r.tipo === "ignorado"
          ? { ok: true, ignorado: r.motivo }
          : { ok: true, tipo: r.tipo },
    );
  } catch (e) {
    console.error("[pagos/paypal/webhook]", tipo, evento.id, e);
    return NextResponse.json({ error: "error procesando el evento" }, { status: 500 });
  }
}

// Presencia de la configuración, nunca valores, y sólo para un admin: a cualquier otro le
// contestaría qué está configurado en el deploy.
export async function GET() {
  const usuario = await usuarioActual().catch(() => null);
  if (!usuario?.verificado || !esAdminEmail(usuario.email)) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json({
    ok: true,
    servicio: "webhook de PayPal",
    config: {
      paypal: configPaypal() !== null,
      entorno: configPaypal()?.entorno ?? null,
      supabase: Boolean(process.env.SUPABASE_URL && claveServicio()),
      entregaPorEmail: Boolean(process.env.RESEND_API_KEY),
    },
  });
}
