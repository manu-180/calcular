import { NextResponse } from "next/server";
import { leerArchivoIntl, type ProductoIntl } from "./catalogo-intl";

// Sin gate: quien la llama ya verificó el derecho (el pago en el proveedor, o la compra propia en
// /api/cuenta/descargar).
export async function servirArchivoIntl(producto: ProductoIntl): Promise<NextResponse> {
  let bytes: Buffer;
  try {
    bytes = await leerArchivoIntl(producto);
  } catch (e) {
    // Casi siempre falta ./private/intl/** en outputFileTracingIncludes de next.config.ts.
    console.error("[pagos/descarga] archivo no disponible en el bundle", producto.id, producto.archivo, e);
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
