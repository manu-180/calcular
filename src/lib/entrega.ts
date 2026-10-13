// Entrega de un producto pago: verificar el pago contra MercadoPago y recién ahí streamear el
// .xlsx. Compartido por las rutas /api/planilla-*/download, que son idénticas salvo el producto.
//
// El archivo vive en /private (fuera de /public): la ÚNICA forma de bajarlo es por acá, con un
// payment_id que MP confirme aprobado y que corresponda a ESTE producto.

import { NextRequest, NextResponse } from "next/server";
import { habilitaDescarga, leerArchivoProducto, obtenerPagoSiExiste, type MpPayment, type Producto } from "@/lib/mp";
import { datosDelPago, personalizable, xlsxConDatos } from "@/lib/prefill/servidor";
import { ID_PAGO, dentroDelCupoEntrega, ipDelPedido } from "@/lib/acceso-entrega";

export async function servirPlanilla(req: NextRequest, producto: Producto): Promise<NextResponse> {
  const sp = req.nextUrl.searchParams;
  // MP manda payment_id; collection_id es el alias histórico (mismo valor).
  const paymentId = sp.get("payment_id") ?? sp.get("collection_id");
  if (!paymentId) {
    return new NextResponse("Falta payment_id", { status: 400 });
  }
  if (!ID_PAGO.test(paymentId)) {
    return new NextResponse("payment_id inválido", { status: 400 });
  }
  if (!(await dentroDelCupoEntrega(ipDelPedido(req.headers)))) {
    console.warn(`[descarga/${producto.slug}] fuera de cupo, no se consulta MP`, paymentId);
    return new NextResponse("Demasiados intentos. Probá de nuevo en unos minutos.", {
      status: 429,
      headers: { "Retry-After": "600" },
    });
  }

  let pago;
  try {
    pago = await obtenerPagoSiExiste(paymentId);
  } catch (e) {
    console.error(`[descarga/${producto.slug}] verificación MP falló`, paymentId, e);
    return new NextResponse("No pudimos verificar el pago", { status: 502 });
  }
  // Un id que ninguna de las dos cuentas conoce no es una falla de MP: 502 lo hacía parecer una caída.
  if (!pago) {
    console.warn(`[descarga/${producto.slug}] pago inexistente`, paymentId);
    return new NextResponse("No encontramos ese pago", { status: 404 });
  }

  // Gate doble: pago aprobado por el monto exacto Y comprado ESTE producto. Sin la segunda
  // mitad, con dos productos al mismo precio el link de uno bajaría el archivo del otro.
  if (!habilitaDescarga(pago, producto)) {
    console.warn(
      `[descarga/${producto.slug}] rechazada · pago ${paymentId} · estado ${pago.status ?? "?"} · ref ${pago.external_reference ?? "?"}`,
    );
    return new NextResponse("Pago no aprobado para este producto", { status: 403 });
  }

  return servirArchivoProducto(producto, pago);
}

/** El archivo con los datos que la persona cargó en la calculadora, o el genérico si no hay datos,
 *  no sirven o algo falla al cargarlos: una descarga pagada nunca se rompe por el prefill. */
async function conDatosDelComprador(bytes: Buffer, producto: Producto, pago: MpPayment | null | undefined): Promise<Buffer> {
  if (!pago || !personalizable(producto)) return bytes;
  try {
    const datos = datosDelPago(pago, producto);
    if (datos === null) return bytes;
    return await xlsxConDatos(bytes, producto, datos);
  } catch (e) {
    console.error(`[descarga/${producto.slug}] no pude cargar los datos del pago ${pago.id ?? "?"}, va la genérica`, e);
    return bytes;
  }
}

// Sin gate: quien la llame ya verificó el derecho a la descarga (el pago en MP, o la compra propia
// en /api/cuenta/descargar). `pago` sólo decide si el archivo sale con los datos del comprador.
export async function servirArchivoProducto(producto: Producto, pago?: MpPayment | null): Promise<NextResponse> {
  if (producto.entrega !== "xlsx") {
    console.error(`[descarga/${producto.slug}] se pidió como archivo un producto que no lo es`);
    return new NextResponse("Este producto no se descarga", { status: 404 });
  }
  let bytes: Buffer;
  try {
    bytes = await leerArchivoProducto(producto);
  } catch (e) {
    // Casi siempre significa que falta la entrada de este archivo en outputFileTracingIncludes
    // (next.config.ts): la función serverless se deployó sin el .xlsx adentro.
    console.error(`[descarga/${producto.slug}] archivo no disponible en el bundle`, producto.archivo, e);
    return new NextResponse("Archivo no disponible", { status: 500 });
  }
  bytes = await conDatosDelComprador(bytes, producto, pago);

  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${producto.archivo}"`,
      "Content-Length": String(bytes.length),
      "Cache-Control": "private, no-store",
    },
  });
}
