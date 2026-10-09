import "server-only";
import { intlActivo } from "@/motor/sitio";
import { mercadopago } from "./mercadopago";
import { paypal } from "./paypal";
import { stripe } from "./stripe";
import type { NombreProveedor, ProveedorPago } from "./tipos";

export const PROVEEDORES: Record<NombreProveedor, ProveedorPago> = { mercadopago, paypal, stripe };

export function proveedor(nombre: string | null | undefined): ProveedorPago | null {
  return nombre && Object.prototype.hasOwnProperty.call(PROVEEDORES, nombre) ? PROVEEDORES[nombre as NombreProveedor] : null;
}

// calcularya.com cobra con PayPal o Stripe. Mercado Pago queda fuera: es de calcular.ar y cobra en pesos.
export function nombreProveedorIntl(): "paypal" | "stripe" {
  return process.env.PAGOS_INTL_PROVEEDOR?.trim() === "stripe" ? "stripe" : "paypal";
}

export function proveedorIntl(): ProveedorPago {
  return PROVEEDORES[nombreProveedorIntl()];
}

export function ventaIntlActiva(): boolean {
  return intlActivo() && proveedorIntl().configurado();
}
