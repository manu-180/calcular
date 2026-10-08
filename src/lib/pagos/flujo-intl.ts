import "server-only";
import { after } from "next/server";
import { sendSingle } from "@/lib/email";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { claveServicio, servicio } from "@/lib/supabase/servicio";
import { MAIL_CONTACTO } from "@/motor/ui/Legales";
import { rutaIntl } from "@/motor/seo";
import { entornoDePrueba, origenIntl } from "@/motor/sitio";
import type { CodigoMercado, Trato } from "@/motor/tipos";
import { registro } from "@/paises";
import { leerReferenciaIntl, type ProductoIntl } from "./catalogo-intl";
import { asuntoEntregaIntl, entregaIntlHtml, FROM_INTL } from "./email-intl";
import { pagoCubre, type NombreProveedor, type PagoVerificado } from "./tipos";
import { marcarEntrega, registrarDevolucionIntl, registrarVentaIntl, sincronizarPagoIntl } from "./ventas-intl";

export const ORIGEN_INTL_POR_DEFECTO = "https://calcularya.com";

export function origenVentaIntl(): string {
  return origenIntl() ?? ORIGEN_INTL_POR_DEFECTO;
}

// En producción las URLs públicas salen de NEXT_PUBLIC_SITIO_INTL_URL. En un preview o en next dev
// salen del pedido: así PayPal sandbox vuelve al mismo preview (con su cookie sitio=intl) y no a
// calcularya.com.
export function origenDelPedido(origenPedido: string): string {
  return entornoDePrueba() ? origenPedido : origenVentaIntl();
}

export function origenesPermitidos(origenPedido: string): Set<string> {
  const o = new Set([origenVentaIntl()]);
  const u = new URL(origenVentaIntl());
  if (!u.hostname.startsWith("www.")) o.add(`${u.protocol}//www.${u.host}`);
  if (entornoDePrueba()) o.add(origenPedido);
  return o;
}

export function tratoDe(mercado: string): Trato {
  return registro.pais(mercado as CodigoMercado)?.mercado.trato ?? "tu";
}

export function rutaPlanillasIntl(mercado: string, resto?: string): string {
  return rutaIntl(mercado as CodigoMercado, resto ? `planillas/${resto}` : "planillas");
}

export function rutaDescargaIntl(proveedor: NombreProveedor, id: string): string {
  return `/api/pagos/descarga?proveedor=${proveedor}&pago=${encodeURIComponent(id)}`;
}

export function rutaGraciasIntl(mercado: string, proveedor: NombreProveedor, id: string): string {
  return `${rutaPlanillasIntl(mercado, "gracias")}?proveedor=${proveedor}&pago=${encodeURIComponent(id)}`;
}

function despues(tarea: () => Promise<void>) {
  try {
    after(tarea);
  } catch {
    void tarea().catch(() => {});
  }
}

async function entregarPorEmail(pago: PagoVerificado, producto: ProductoIntl, email: string): Promise<boolean> {
  const origen = origenVentaIntl();
  try {
    const ok = await sendSingle({
      from: FROM_INTL,
      to: [email],
      subject: asuntoEntregaIntl(producto),
      html: entregaIntlHtml({
        producto,
        trato: tratoDe(producto.mercado),
        urlDescarga: `${origen}${rutaDescargaIntl(pago.proveedor, pago.id)}`,
        urlLanding: `${origen}${rutaPlanillasIntl(producto.mercado, producto.slug)}`,
        origen,
        contacto: MAIL_CONTACTO,
      }),
    });
    if (!ok) console.error("[pagos] Resend rechazó la entrega", pago.proveedor, pago.id);
    return ok;
  } catch (e) {
    console.error("[pagos] error mandando la entrega", pago.proveedor, pago.id, e);
    return false;
  }
}

export type ResultadoPago =
  | { tipo: "ignorado"; motivo: string }
  | { tipo: "pendiente"; estado: string }
  | { tipo: "venta"; producto: ProductoIntl; registrado: boolean; entregado: boolean | null }
  | { tipo: "devolucion"; producto: ProductoIntl; asentada: boolean };

// Lo comparten la vuelta de PayPal y el webhook: lo que llegue primero asienta la venta y manda el
// mail; el segundo ve la marca en revenue_events y no repite nada.
export async function procesarPagoIntl(pago: PagoVerificado): Promise<ResultadoPago> {
  const ref = leerReferenciaIntl(pago.referencia);
  if (!ref) return { tipo: "ignorado", motivo: "referencia desconocida" };
  const { producto } = ref;

  if (CUENTAS_ACTIVAS) despues(() => sincronizarPagoIntl(servicio(), pago));

  const url = process.env.SUPABASE_URL;
  const clave = claveServicio();

  if (pago.estado === "reembolsado" || pago.estado === "contracargo") {
    if (!url || !clave) return { tipo: "devolucion", producto, asentada: false };
    try {
      const d = await registrarDevolucionIntl({ fetch, supabaseUrl: url, serviceRole: clave }, pago, producto);
      return { tipo: "devolucion", producto, asentada: !("sinVenta" in d && d.sinVenta) && !d.duplicado };
    } catch (e) {
      console.error("[pagos] no pude asentar la devolución", pago.proveedor, pago.id, e);
      return { tipo: "devolucion", producto, asentada: false };
    }
  }

  if (!pagoCubre(pago, producto)) return { tipo: "pendiente", estado: pago.estadoProveedor || "desconocido" };

  // Sin base no hay forma de saber si el mail ya salió: se tira para que el webhook reintente.
  if (!url || !clave) throw new Error("SUPABASE_URL / clave de servicio no configuradas");
  const deps = { fetch, supabaseUrl: url, serviceRole: clave };
  const r = await registrarVentaIntl(deps, pago, producto);
  let entregado: boolean | null = null;
  if (!r.duplicado) {
    if (pago.email) entregado = await entregarPorEmail(pago, producto, pago.email);
    else console.warn("[pagos] pago sin email del comprador:", pago.proveedor, pago.id);
    if (r.filaId !== undefined) {
      await marcarEntrega(deps, r.filaId, pago.email ? (entregado ? "ok" : "fallo") : "sin-email", pago.email ?? undefined);
    }
  }
  return { tipo: "venta", producto, registrado: !r.duplicado, entregado };
}
