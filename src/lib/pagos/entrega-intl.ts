import { NextResponse } from "next/server";
import type { DatosIntl } from "@/lib/prefill/intl";
import { leerArchivoIntl, type ProductoIntl } from "./catalogo-intl";
import { planillaConDatos } from "./ofertas-servidor";

// Sin gate: quien la llama ya verificó el derecho (el pago en el proveedor, o la compra propia en
// /api/cuenta/descargar). Con datos válidos sale la planilla con los números de la persona; si eso
// falla por lo que sea, sale la planilla sin datos: nunca se deja sin archivo a quien pagó.
export async function servirArchivoIntl(producto: ProductoIntl, datos?: DatosIntl | null): Promise<NextResponse> {
  if (producto.tipo !== "planilla") {
    // El informe es una página que se abre con el enlace del correo (verifica el pago cada vez).
    return new NextResponse("Este producto es un informe: se abre desde el enlace del correo de la compra.", { status: 409 });
  }
  let bytes: Buffer;
  try {
    bytes = await leerArchivoIntl(producto);
  } catch (e) {
    // Casi siempre falta ./private/intl/** en outputFileTracingIncludes de next.config.ts.
    console.error("[pagos/descarga] archivo no disponible en el bundle", producto.id, producto.archivo, e);
    return new NextResponse("Archivo no disponible", { status: 500 });
  }
  if (datos) {
    try {
      bytes = await planillaConDatos(producto, datos, bytes);
    } catch (e) {
      console.error("[pagos/descarga] no pude cargar los datos en la planilla, sale sin datos", producto.id, datos.calc, e instanceof Error ? e.message : e);
    }
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
