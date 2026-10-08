import { ProveedorNoConfigurado, type CheckoutCreado, type NotificacionEntrante, type PagoVerificado, type PedidoCheckout, type ProveedorPago } from "./tipos";

// Esqueleto para pasar de PayPal a Stripe cambiando PAGOS_INTL_PROVEEDOR=stripe. Para completarlo:
//   crearCheckout  -> POST /v1/checkout/sessions (mode=payment, client_reference_id = referencia,
//                     metadata.referencia, success_url = urlVuelta + "?session_id={CHECKOUT_SESSION_ID}")
//   confirmarPago  -> GET /v1/checkout/sessions/:id con expand payment_intent (la vuelta trae session_id)
//   consultarPago  -> GET /v1/payment_intents/:id
//   validarWebhook -> stripe.webhooks.constructEvent con el cuerpo crudo y STRIPE_WEBHOOK_SECRET
// y una ruta /api/pagos/stripe/{vuelta,webhook}. El resto del flujo (catálogo, ca_compras,
// revenue_events, mail, descarga) ya es del proveedor que esté activo.

export function configStripe(): { secreto: string; webhook: string } | null {
  const secreto = process.env.STRIPE_SECRET_KEY?.trim();
  const webhook = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  return secreto && webhook ? { secreto, webhook } : null;
}

export const stripe: ProveedorPago = {
  nombre: "stripe",
  // Hasta que el adaptador esté completo, Stripe nunca se da por configurado: la venta queda apagada.
  configurado: () => false,
  async crearCheckout(_p: PedidoCheckout): Promise<CheckoutCreado> {
    throw new ProveedorNoConfigurado("stripe");
  },
  async confirmarPago(_id: string): Promise<PagoVerificado | null> {
    throw new ProveedorNoConfigurado("stripe");
  },
  async consultarPago(_id: string): Promise<PagoVerificado | null> {
    throw new ProveedorNoConfigurado("stripe");
  },
  async validarWebhook(_n: NotificacionEntrante): Promise<boolean> {
    return false;
  },
};
