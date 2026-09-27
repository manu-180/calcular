import { NextRequest, NextResponse } from "next/server";
import {
  PRODUCTO,
  crearPreferencia,
  emailValido,
  productoPorSlug,
  referenciaExterna,
  type Producto,
} from "@/lib/mp";

// Necesita Node (no edge): crypto.randomUUID y el fetch server-side con el token.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Dominio canónico — back_urls deben ser absolutas y públicas para auto_return.
const SITE = "https://calcular.ar";

async function irAPagar(
  producto: Producto,
  opciones: { email?: string | null; desde?: string | null } = {},
): Promise<NextResponse> {
  try {
    const pref = await crearPreferencia({
      producto,
      // El slug viaja adentro de la referencia: es lo que le deja al webhook y a la descarga
      // saber CUÁL de las planillas se pagó.
      externalReference: referenciaExterna(producto.slug, opciones.desde),
      backUrls: {
        // MP le agrega ?payment_id=...&status=...&external_reference=... al volver.
        success: `${SITE}/planillas/gracias`,
        pending: `${SITE}/planillas/gracias`,
        failure: `${SITE}${producto.rutaLanding}?pago=fallido`,
      },
      // v1.1: MP avisa acá cuando el pago cambia de estado → la venta se asienta sola en
      // revenue_events y sale el mail de entrega. La descarga desde la página de gracias NO
      // depende de esta URL.
      notificationUrl: `${SITE}/api/mp/webhook`,
      emailComprador: opciones.email,
    });

    if (!pref.init_point) {
      throw new Error("MP no devolvió init_point");
    }
    // 303 → el navegador hace GET a la página de pago de MP (también después de un POST).
    return NextResponse.redirect(pref.init_point, 303);
  } catch (e) {
    console.error("[mp/checkout]", producto.slug, e);
    // Nunca dejar al comprador en un error crudo: volver a la landing con flag.
    return NextResponse.redirect(`${SITE}${producto.rutaLanding}?pago=error`, 303);
  }
}

// GET /api/mp/checkout?p=<slug> → sin email. Queda vivo porque NEXT_PUBLIC_PLANILLA_COMERCIO_URL
// (Vercel) y mails viejos apuntan acá; sin `p` cae en Comercio por la misma razón.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("p");
  const producto = productoPorSlug(slug) ?? PRODUCTO;
  if (slug && !productoPorSlug(slug)) {
    console.error("[mp/checkout] slug de producto desconocido:", slug);
  }
  return irAPagar(producto, { desde: req.nextUrl.searchParams.get("desde") });
}

// POST (form del diálogo de compra) → con el email del comprador. Un POST además no lo dispara
// un crawler que siga links: con el GET, cada bot que ignoraba robots.txt creaba una preferencia
// y ensuciaba la medición del embudo.
// El mail que se deja acá recibe, un día después, el recordatorio del cron de recupero. Sin estas
// dos barreras, cualquiera podría cargar mails ajenos y hacer que calcular.ar les escriba:
//   · Origin: un navegador lo manda siempre en un POST de formulario; si viene de otro sitio, no.
//   · `sitio`: campo trampa oculto; un humano no lo ve y lo deja vacío, un bot lo completa.
// En los dos casos se sigue al pago igual, pero SIN guardar el mail.
const ORIGENES = new Set([SITE, "https://www.calcular.ar", "http://localhost:3107", "http://localhost:3000"]);

export async function POST(req: NextRequest) {
  let datos: FormData;
  try {
    datos = await req.formData();
  } catch {
    return NextResponse.redirect(`${SITE}/planillas?pago=error`, 303);
  }
  const slug = String(datos.get("p") ?? "");
  const producto = productoPorSlug(slug);
  if (!producto) {
    console.error("[mp/checkout] POST con slug desconocido:", slug);
    return NextResponse.redirect(`${SITE}/planillas?pago=error`, 303);
  }

  const email = emailValido(String(datos.get("email") ?? ""));
  if (!email) {
    return NextResponse.redirect(`${SITE}/planillas/comprar?p=${producto.slug}&error=email`, 303);
  }

  const origen = req.headers.get("origin");
  const sospechoso = (origen !== null && !ORIGENES.has(origen)) || String(datos.get("sitio") ?? "") !== "";
  if (sospechoso) console.warn("[mp/checkout] POST sospechoso, se sigue sin guardar el mail", producto.slug, origen);

  return irAPagar(producto, { email: sospechoso ? null : email, desde: String(datos.get("desde") ?? "") });
}
