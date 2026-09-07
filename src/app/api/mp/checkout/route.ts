import { NextRequest, NextResponse } from "next/server";
import { PRODUCTO, crearPreferencia, productoPorSlug, referenciaExterna } from "@/lib/mp";

// Necesita Node (no edge): crypto.randomUUID y el fetch server-side con el token.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Dominio canónico — back_urls deben ser absolutas y públicas para auto_return.
const SITE = "https://calcular.ar";

// GET /api/mp/checkout?p=<slug> → crea la preferencia y redirige al checkout de MP.
// Sin `p` cae en Comercio: NEXT_PUBLIC_PLANILLA_COMERCIO_URL apunta a esta ruta pelada desde
// antes de que hubiera catálogo, y esa env var vive en Vercel. Romper el default sería romper
// el botón de compra en producción.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("p");
  const producto = productoPorSlug(slug) ?? PRODUCTO;

  if (slug && !productoPorSlug(slug)) {
    // No es fatal (cae en Comercio), pero es un link roto en alguna página: que se vea.
    console.error("[mp/checkout] slug de producto desconocido:", slug);
  }

  try {
    const pref = await crearPreferencia({
      producto,
      // El slug viaja adentro de la referencia: es lo que le deja al webhook y a la descarga
      // saber CUÁL de las planillas se pagó.
      externalReference: referenciaExterna(producto.slug),
      backUrls: {
        // MP le agrega ?payment_id=...&status=...&external_reference=... al volver.
        success: `${SITE}/planillas/gracias`,
        pending: `${SITE}/planillas/gracias`,
        failure: `${SITE}${producto.rutaLanding}?pago=fallido`,
      },
      // v1.1: MP avisa acá cuando el pago cambia de estado → la venta se asienta sola en
      // revenue_events y sale el mail de entrega. Sin esto, un ingreso solo existe si alguien
      // lo carga a mano (la venta del 8/8 estuvo 8 días sin registrar). La descarga desde la
      // página de gracias NO depende de esta URL.
      notificationUrl: `${SITE}/api/mp/webhook`,
    });

    if (!pref.init_point) {
      throw new Error("MP no devolvió init_point");
    }
    // 303 → el navegador hace GET a la página de pago de MP.
    return NextResponse.redirect(pref.init_point, 303);
  } catch (e) {
    console.error("[mp/checkout]", producto.slug, e);
    // Nunca dejar al comprador en un error crudo: volver a la landing con flag.
    return NextResponse.redirect(`${SITE}${producto.rutaLanding}?pago=error`, 303);
  }
}
