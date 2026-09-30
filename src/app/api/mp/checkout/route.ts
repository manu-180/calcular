import { NextRequest, NextResponse, after } from "next/server";
import {
  PRODUCTO,
  crearPreferencia,
  emailValido,
  filaCheckout,
  productoPorSlug,
  referenciaExterna,
  type FilaCheckout,
  type Producto,
} from "@/lib/mp";
import { usuarioActual } from "@/lib/auth/sesion";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { permitido } from "@/lib/limite";
import { limpiarRuta } from "@/lib/rastreo";
import { servicio } from "@/lib/supabase/servicio";
import { claveCliente, dentroDelLimite, esBot } from "@/app/api/e/protocolo";

// Necesita Node (no edge): crypto.randomUUID y el fetch server-side con el token.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Dominio canónico — back_urls deben ser absolutas y públicas para auto_return.
const SITE = "https://calcular.ar";

async function usuarioSinDemora() {
  const espera = new Promise<null>((r) => setTimeout(() => r(null), 1500));
  return Promise.race([usuarioActual().catch(() => null), espera]);
}

async function registrarCheckout(fila: FilaCheckout) {
  try {
    const { error } = await servicio()
      .from("ca_checkouts")
      .upsert(fila, { onConflict: "id", ignoreDuplicates: true })
      .abortSignal(AbortSignal.timeout(4000));
    if (error) console.error("[mp/checkout] ca_checkouts:", error.code, error.message);
  } catch (e) {
    console.error("[mp/checkout] ca_checkouts:", e instanceof Error ? e.message : e);
  }
}

// `after` fuera de un request tira: la medición nunca puede costar el viaje a MercadoPago.
function despues(tarea: () => Promise<void>) {
  try {
    after(tarea);
  } catch {
    void tarea().catch(() => {});
  }
}

// Cada pedido crea una preferencia real en MercadoPago: sin cupo, un script llena la cuenta de
// preferencias basura y el embudo de inicios deja de significar algo. Sin las tablas, el cupo
// vive en la memoria de la instancia.
async function dentroDelCupo(req: NextRequest): Promise<boolean> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip");
  if (!ip) return true;
  return CUENTAS_ACTIVAS
    ? permitido(`checkout:${ip}`, 10, 600)
    : dentroDelLimite(`checkout:${claveCliente(ip)}`, Date.now(), 5);
}

function rutaDelReferer(referer: string | null): string | null {
  try {
    const u = new URL(referer ?? "");
    return ORIGENES.has(u.origin) ? limpiarRuta(u.pathname) : null;
  } catch {
    return null;
  }
}

async function irAPagar(
  producto: Producto,
  opciones: {
    email?: string | null;
    desde?: string | null;
    ruta?: string | null;
    vid?: string | null;
    registrar?: boolean;
  } = {},
): Promise<NextResponse> {
  // El slug viaja adentro de la referencia: es lo que le deja al webhook y a la descarga saber
  // CUÁL de las planillas se pagó. El uuid del medio es la PK de ca_checkouts.
  const referencia = referenciaExterna(producto.slug, opciones.desde);
  // La sesión se lee en paralelo con la preferencia y se usa recién después de responder:
  // la cuenta nunca demora el viaje a MercadoPago.
  const usuario = CUENTAS_ACTIVAS && opciones.registrar !== false ? usuarioSinDemora() : null;
  try {
    const pref = await crearPreferencia({
      producto,
      externalReference: referencia,
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
    if (usuario) {
      despues(async () => {
        const u = await usuario;
        const fila = filaCheckout({
          referencia,
          producto,
          ruta: opciones.ruta,
          email: opciones.email,
          vid: opciones.vid,
          userId: u?.id,
        });
        if (fila) await registrarCheckout(fila);
      });
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
  if (!(await dentroDelCupo(req))) {
    console.warn("[mp/checkout] GET fuera de cupo, no se crea la preferencia", producto.slug);
    return NextResponse.redirect(`${SITE}${producto.rutaLanding}?pago=error`, 303);
  }
  return irAPagar(producto, {
    desde: req.nextUrl.searchParams.get("desde"),
    ruta: rutaDelReferer(req.headers.get("referer")),
    registrar: !esBot(req.headers.get("user-agent")),
  });
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

  if (!(await dentroDelCupo(req))) {
    console.warn("[mp/checkout] POST fuera de cupo, no se crea la preferencia", producto.slug);
    return NextResponse.redirect(`${SITE}${producto.rutaLanding}?pago=error`, 303);
  }

  const origen = req.headers.get("origin");
  const sospechoso = (origen !== null && !ORIGENES.has(origen)) || String(datos.get("sitio") ?? "") !== "";
  if (sospechoso) console.warn("[mp/checkout] POST sospechoso, se sigue sin guardar el mail", producto.slug, origen);

  return irAPagar(producto, {
    email: sospechoso ? null : email,
    desde: String(datos.get("desde") ?? ""),
    ruta: String(datos.get("ruta") ?? ""),
    vid: String(datos.get("vid") ?? ""),
  });
}
