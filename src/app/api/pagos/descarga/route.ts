import { NextResponse, type NextRequest } from "next/server";
import { dentroDelCupoEntrega, ipDelPedido } from "@/lib/acceso-entrega";
import { proveedor } from "@/lib/pagos";
import { leerReferenciaIntl } from "@/lib/pagos/catalogo-intl";
import { servirArchivoIntl } from "@/lib/pagos/entrega-intl";
import { ID_PAYPAL } from "@/lib/pagos/paypal";
import { pagoCubre } from "@/lib/pagos/tipos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ID_PAGO_INTL = ID_PAYPAL;

// GET /api/pagos/descarga?proveedor=paypal&pago=<captura>: el enlace permanente del mail. Cada
// apertura vuelve a leer el pago del proveedor y recién con aprobado, monto y moneda exactos sale
// el archivo del producto que dice la referencia del pago.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const p = proveedor(sp.get("proveedor"));
  const id = sp.get("pago") ?? "";
  if (!p || p.nombre === "mercadopago") return new NextResponse("Proveedor inválido", { status: 400 });
  if (!ID_PAGO_INTL.test(id)) return new NextResponse("Pago inválido", { status: 400 });
  if (!(await dentroDelCupoEntrega(ipDelPedido(req.headers)))) {
    return new NextResponse("Demasiados intentos. Prueba de nuevo en unos minutos.", { status: 429, headers: { "Retry-After": "600" } });
  }

  let pago;
  try {
    pago = await p.consultarPago(id);
  } catch (e) {
    console.error("[pagos/descarga] verificación falló", p.nombre, id, e);
    return new NextResponse("No pudimos verificar el pago", { status: 502 });
  }
  const ref = leerReferenciaIntl(pago?.referencia);
  if (!pago || !ref || !pagoCubre(pago, ref.producto)) {
    console.warn(`[pagos/descarga] rechazada · ${p.nombre} ${id} · ${pago?.estadoProveedor ?? "sin pago"} · ${pago?.referencia ?? "?"}`);
    return new NextResponse("Pago no aprobado para este producto", { status: 403 });
  }
  return servirArchivoIntl(ref.producto);
}
