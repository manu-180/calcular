import { NextResponse, type NextRequest } from "next/server";
import { dentroDelCupoEntrega, ipDelPedido } from "@/lib/acceso-entrega";
import { leerReferenciaIntl, productoIntlDe } from "@/lib/pagos/catalogo-intl";
import { origenDelPedido, procesarPagoIntl, rutaGraciasIntl, rutaPlanillasIntl } from "@/lib/pagos/flujo-intl";
import { ID_PAYPAL, paypal } from "@/lib/pagos/paypal";
import { pagoCubre } from "@/lib/pagos/tipos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ir = (url: string) => NextResponse.redirect(url, 303);

// GET /api/pagos/paypal/vuelta?m=&p=&token=<orden>&PayerID=… : PayPal vuelve acá después de que la
// persona aprueba. La captura ocurre en el servidor y lo que se entrega sale de la captura, no de
// la query: m y p sólo eligen a qué página volver si algo falla.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const base = origenDelPedido(req.nextUrl.origin);
  const elegido = productoIntlDe(sp.get("m") ?? "", sp.get("p") ?? "");
  const volver = (estado: string) =>
    ir(elegido ? `${base}${rutaPlanillasIntl(elegido.mercado, "comprar")}?p=${elegido.slug}&pago=${estado}` : `${base}/`);

  const orden = sp.get("token") ?? "";
  if (!ID_PAYPAL.test(orden)) return volver("error");
  if (!(await dentroDelCupoEntrega(ipDelPedido(req.headers)))) return volver("error");

  let pago;
  try {
    pago = await paypal.confirmarPago(orden);
  } catch (e) {
    console.error("[pagos/paypal/vuelta] captura falló", orden, e);
    return volver("error");
  }
  const ref = leerReferenciaIntl(pago?.referencia);
  if (!pago || !ref) return volver("error");
  if (pago.estado === "rechazado") return volver("fallido");
  if (pago.estado === "aprobado" && !pagoCubre(pago, ref.producto)) {
    console.error("[pagos/paypal/vuelta] captura que no cierra con el producto", pago.id, pago.montoCentavos, pago.moneda, ref.producto.id);
    return volver("error");
  }

  try {
    await procesarPagoIntl(pago);
  } catch (e) {
    // La plata ya está cobrada: la persona sigue a gracias y el webhook reintenta el asiento.
    console.error("[pagos/paypal/vuelta] no pude asentar la venta, queda para el webhook", pago.id, e);
  }
  return ir(`${base}${rutaGraciasIntl(ref.producto.mercado, "paypal", pago.id)}`);
}
