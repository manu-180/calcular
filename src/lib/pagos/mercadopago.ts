import { buscarPago, crearPreferencia, productoPorSlug, type MpPayment } from "@/lib/mp";
import { extraerPaymentId, firmaValida, firmar, manifiesto, parsearFirma, type CuerpoNotificacion } from "@/lib/mp-webhook";
import { centavos, type CheckoutCreado, type EstadoPago, type NotificacionEntrante, type PagoVerificado, type PedidoCheckout, type ProveedorPago } from "./tipos";

// Adaptador de calcular.ar. Envuelve las funciones de mp.ts y mp-webhook.ts sin cambiarlas: las
// rutas /api/mp/* siguen llamándolas directo y su comportamiento no depende de este archivo.

export function estadoMp(status: string | undefined): EstadoPago | null {
  switch (status) {
    case "approved":
      return "aprobado";
    case "pending":
    case "in_process":
    case "in_mediation":
    case "authorized":
      return "pendiente";
    case "rejected":
    case "cancelled":
      return "rechazado";
    case "refunded":
      return "reembolsado";
    case "charged_back":
      return "contracargo";
    default:
      return null;
  }
}

export function pagoDeMp(p: MpPayment, id: string): PagoVerificado {
  return {
    proveedor: "mercadopago",
    id: p.id !== undefined ? String(p.id) : id,
    ordenId: null,
    estado: estadoMp(p.status),
    estadoProveedor: p.status ?? "",
    montoCentavos: typeof p.transaction_amount === "number" ? centavos(p.transaction_amount) : null,
    moneda: p.currency_id ?? null,
    referencia: p.external_reference ?? null,
    email: p.payer?.email ?? null,
    fecha: p.date_approved ?? p.date_created ?? null,
  };
}

export const mercadopago: ProveedorPago = {
  nombre: "mercadopago",

  configurado: () => Boolean(process.env.MP_ACCESS_TOKEN),

  async crearCheckout(p: PedidoCheckout): Promise<CheckoutCreado> {
    const producto = productoPorSlug(p.producto.id);
    if (!producto) throw new Error(`mercadopago: producto desconocido ${p.producto.id}`);
    const pref = await crearPreferencia({
      producto,
      externalReference: p.referencia,
      backUrls: { success: p.urlVuelta, pending: p.urlVuelta, failure: p.urlCancelar },
      emailComprador: p.email,
    });
    if (!pref.id || !pref.init_point) throw new Error("MP no devolvió init_point");
    return { id: pref.id, urlPago: pref.init_point };
  },

  // En Checkout Pro el cobro ya ocurrió cuando la persona vuelve: confirmar es consultar.
  async confirmarPago(id: string): Promise<PagoVerificado | null> {
    return mercadopago.consultarPago(id);
  },

  async consultarPago(id: string): Promise<PagoVerificado | null> {
    if (!/^\d{1,20}$/.test(id)) return null;
    const r = await buscarPago(id);
    return r ? pagoDeMp(r.pago, id) : null;
  },

  async validarWebhook(n: NotificacionEntrante): Promise<boolean> {
    let cuerpo: CuerpoNotificacion | null = null;
    try {
      cuerpo = n.cuerpo ? (JSON.parse(n.cuerpo) as CuerpoNotificacion) : null;
    } catch {
      cuerpo = null;
    }
    const paymentId = extraerPaymentId(n.url, cuerpo);
    const secret = process.env.MP_WEBHOOK_SECRET;
    if (!paymentId) return false;
    if (!secret) return true;
    const firma = parsearFirma(n.headers.get("x-signature"));
    return !!firma && firmaValida(firmar(manifiesto(paymentId, n.headers.get("x-request-id"), firma.ts), secret), firma.v1);
  },
};
