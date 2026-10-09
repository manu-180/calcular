import { NextResponse, type NextRequest } from "next/server";
import { esAdminEmail } from "@/lib/auth/admin";
import { usuarioActual } from "@/lib/auth/sesion";
import { ipDelPedido } from "@/lib/acceso-entrega";
import { permitido } from "@/lib/limite";
import { claveServicio } from "@/lib/supabase/servicio";
import { procesarPagoIntl } from "@/lib/pagos/flujo-intl";
import { configPaypal, idCapturaDeRecurso, paypal } from "@/lib/pagos/paypal";
import type { PagoVerificado } from "@/lib/pagos/tipos";

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
      pago = orden ? await paypal.confirmarPago(orden) : null;
    } else if (EVENTOS_CAPTURA.has(tipo)) {
      const captura = idCapturaDeRecurso(tipo, evento.resource);
      pago = captura ? await paypal.consultarPago(captura) : null;
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
