// Entrega de un producto pago: verificar el pago contra MercadoPago y recién ahí streamear el
// .xlsx. Compartido por las rutas /api/planilla-*/download, que son idénticas salvo el producto.
//
// El archivo vive en /private (fuera de /public): la ÚNICA forma de bajarlo es por acá, con un
// payment_id que MP confirme aprobado y que corresponda a ESTE producto.

import { NextRequest, NextResponse } from "next/server";
import { habilitaDescarga, leerArchivoProducto, obtenerPago, type Producto } from "@/lib/mp";

export async function servirPlanilla(req: NextRequest, producto: Producto): Promise<NextResponse> {
  const sp = req.nextUrl.searchParams;
  // MP manda payment_id; collection_id es el alias histórico (mismo valor).
  const paymentId = sp.get("payment_id") ?? sp.get("collection_id");
  if (!paymentId) {
    return new NextResponse("Falta payment_id", { status: 400 });
  }

  let pago;
  try {
    pago = await obtenerPago(paymentId);
  } catch (e) {
    console.error(`[descarga/${producto.slug}] verificación MP falló`, paymentId, e);
    return new NextResponse("No pudimos verificar el pago", { status: 502 });
  }

  // Gate doble: pago aprobado por el monto exacto Y comprado ESTE producto. Sin la segunda
  // mitad, con dos productos al mismo precio el link de uno bajaría el archivo del otro.
  if (!habilitaDescarga(pago, producto)) {
    console.warn(
      `[descarga/${producto.slug}] rechazada · pago ${paymentId} · estado ${pago.status ?? "?"} · ref ${pago.external_reference ?? "?"}`,
    );
    return new NextResponse("Pago no aprobado para este producto", { status: 403 });
  }

  return servirArchivoProducto(producto);
}

// Sin gate: quien la llame ya verificó el derecho a la descarga (el pago en MP, o la compra propia
// en /api/cuenta/descargar).
export async function servirArchivoProducto(producto: Producto): Promise<NextResponse> {
  let bytes: Buffer;
  try {
    bytes = await leerArchivoProducto(producto);
  } catch (e) {
    // Casi siempre significa que falta la entrada de este archivo en outputFileTracingIncludes
    // (next.config.ts): la función serverless se deployó sin el .xlsx adentro.
    console.error(`[descarga/${producto.slug}] archivo no disponible en el bundle`, producto.archivo, e);
    return new NextResponse("Archivo no disponible", { status: 500 });
  }

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
