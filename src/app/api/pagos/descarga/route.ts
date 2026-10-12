import { NextResponse, type NextRequest } from "next/server";
import { dentroDelCupoEntrega, ipDelPedido } from "@/lib/acceso-entrega";
import { proveedor } from "@/lib/pagos";
import { leerReferenciaIntl } from "@/lib/pagos/catalogo-intl";
import { servirArchivoIntl } from "@/lib/pagos/entrega-intl";
import { rutaVerInformeIntl } from "@/lib/pagos/flujo-intl";
import { validarDatosDeProducto } from "@/lib/pagos/ofertas-servidor";
import { ID_PAYPAL } from "@/lib/pagos/paypal";
import { pagoCubre } from "@/lib/pagos/tipos";
import { leerDatosCheckoutIntl } from "@/lib/pagos/ventas-intl";
import { parsearDatosIntl, type DatosIntl } from "@/lib/prefill/intl";
import { claveServicio, servicio } from "@/lib/supabase/servicio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ID_PAGO_INTL = ID_PAYPAL;

// GET /api/pagos/descarga?proveedor=paypal&pago=<captura>: el enlace permanente del mail. Cada
// apertura vuelve a leer el pago del proveedor y recién con aprobado, monto y moneda exactos sale
// el archivo del producto que dice la referencia del pago, con los datos de la calculadora que
// viajaron con el checkout si los hay. Un informe no se descarga: se manda a su página.
// POST (mismos parámetros, form con `datos`): la página de gracias manda los datos que quedaron en
// el navegador cuando la base no los tiene. Son los números de quien ya pagó: no abren nada nuevo.
async function entregar(req: NextRequest, datosDelForm: unknown) {
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
  if (ref.producto.tipo === "informe") return NextResponse.redirect(new URL(rutaVerInformeIntl(ref.producto, p.nombre, pago.id), req.url), 303);

  let datos: DatosIntl | null = null;
  if (datosDelForm !== undefined) datos = validarDatosDeProducto(ref.producto, datosDelForm);
  else if (process.env.SUPABASE_URL && claveServicio()) {
    const crudo = await leerDatosCheckoutIntl(servicio(), ref.checkoutId, ref.producto);
    if (crudo !== null) datos = validarDatosDeProducto(ref.producto, crudo);
  }
  return servirArchivoIntl(ref.producto, datos);
}

export async function GET(req: NextRequest) {
  return entregar(req, undefined);
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = parsearDatosIntl((await req.formData()).get("datos"));
  } catch {
    raw = undefined;
  }
  return entregar(req, raw ?? null);
}
