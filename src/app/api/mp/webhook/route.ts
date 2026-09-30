import { NextRequest, NextResponse, after } from "next/server";
import {
  CATALOGO,
  buscarPago,
  checkoutIdDeReferencia,
  esPagoDePlanilla,
  pagoAprobado,
  productoDePago,
  type Producto,
} from "@/lib/mp";
import {
  esPagoAjeno,
  extraerPaymentId,
  firmaValida,
  firmar,
  marcarEntrega,
  manifiesto,
  parsearFirma,
  registrarDevolucion,
  registrarVenta,
  sincronizarPago,
  type CuerpoNotificacion,
} from "@/lib/mp-webhook";
import { FROM, planillaEntregaHtml, sendSingle } from "@/lib/email";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { servicio } from "@/lib/supabase/servicio";

// Node: HMAC + fetch server-side con tokens. Nunca edge, nunca cacheado.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://calcular.ar";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Manda la planilla al comprador. Se llama UNA sola vez por pago: `registrarVenta` devuelve
 * `duplicado: true` en los reintentos de MP y ahí no se entra acá.
 *
 * Devuelve un booleano en vez de tirar: la venta YA quedó asentada y el comprador YA puede
 * bajar el archivo desde la página de gracias. Romper el webhook por un fallo de Resend haría
 * que MP reintente, y el reintento vería `duplicado: true` y tampoco mandaría el mail — o sea,
 * el 500 no arregla nada y encima ensucia el registro. El fallo se loguea con el payment_id
 * para poder reenviarlo a mano.
 */
async function entregarPorEmail(
  producto: Producto,
  paymentId: string,
  email: string,
  checkoutId: string | null,
): Promise<boolean> {
  const urlDescarga = `${SITE}${producto.rutaDescarga}?payment_id=${encodeURIComponent(paymentId)}`;
  try {
    const ok = await sendSingle({
      from: FROM,
      to: [email],
      subject: `Tu ${producto.tituloCorto} — descarga y actualizaciones`,
      html: planillaEntregaHtml({
        titulo: producto.titulo,
        convenio: producto.convenio,
        urlDescarga,
        urlLanding: `${SITE}${producto.rutaLanding}`,
        disparadorActualizacion: producto.disparadorActualizacion,
        checkoutId,
        otras: CATALOGO.filter((p) => p.slug !== producto.slug).map((p) => ({
          titulo: p.tituloCorto,
          paraQuien: p.paraQuien,
          url: `${SITE}${p.rutaLanding}`,
        })),
      }),
    });
    if (!ok) console.error("[mp/webhook] Resend rechazó la entrega del pago", paymentId, email);
    return ok;
  } catch (e) {
    console.error("[mp/webhook] error mandando la entrega del pago", paymentId, e);
    return false;
  }
}

/**
 * POST /api/mp/webhook — notification_url de la preferencia de Checkout Pro.
 *
 * Contrato con MP: hay que responder 2xx rápido o reintenta. Por eso todo lo que NO es un pago
 * aprobado nuestro (otro tipo de evento, un pago pendiente, un duplicado) también sale 200: son
 * casos esperados, no fallas. Solo devuelve 401 una firma inválida y 500 un error real de
 * escritura — ahí SÍ queremos el reintento de MP.
 */
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const crudo = await req.text();
  let cuerpo: CuerpoNotificacion | null = null;
  try {
    cuerpo = crudo ? (JSON.parse(crudo) as CuerpoNotificacion) : null;
  } catch {
    cuerpo = null; // MP también notifica con los datos solo en la query string.
  }

  const paymentId = extraerPaymentId(url, cuerpo);
  if (!paymentId) {
    // merchant_order y demás eventos del mismo checkout: reconocidos y descartados.
    return NextResponse.json({ ok: true, ignorado: "evento sin payment id" });
  }

  // Firma: el secret es el de la app de la cuenta CalculAR. La cuenta vieja nunca tuvo secret,
  // así que una notificación de un pago de esa cuenta llega sin firma válida y se acepta igual:
  // el gate real es la re-consulta del pago a MP más abajo.
  const secret = process.env.MP_WEBHOOK_SECRET;
  let firmaOk = !secret;
  if (secret) {
    const firma = parsearFirma(req.headers.get("x-signature"));
    firmaOk =
      !!firma &&
      firmaValida(firmar(manifiesto(paymentId, req.headers.get("x-request-id"), firma.ts), secret), firma.v1);
  }

  try {
    // FUENTE DE VERDAD: el pago según MP, nunca el cuerpo de la notificación.
    const encontrado = await buscarPago(paymentId);
    if (encontrado && !encontrado.legado && !firmaOk) {
      console.error("[mp/webhook] firma ausente o inválida para el pago", paymentId);
      return NextResponse.json({ error: "firma inválida" }, { status: 401 });
    }
    const pago = encontrado?.pago ?? null;
    if (!pago) {
      // MP no conoce ese pago con nuestro token: notificación ajena o falsificada. 200 para
      // que no reintente eternamente; no se registra nada.
      console.warn("[mp/webhook] pago inexistente para nuestro token:", paymentId);
      return NextResponse.json({ ok: true, ignorado: "pago desconocido" });
    }
    if (encontrado && esPagoAjeno(encontrado)) {
      console.warn("[mp/webhook] pago de la cuenta legado sin marca de planilla, no es una venta nuestra:", paymentId);
      return NextResponse.json({ ok: true, ignorado: "pago ajeno" });
    }

    const producto = productoDePago(pago);
    if (!producto) {
      console.error("[mp/webhook] no pude resolver el producto del pago", paymentId, pago.external_reference);
      return NextResponse.json({ ok: true, ignorado: "producto desconocido" });
    }

    // El embudo propio y la biblioteca de la cuenta se escriben después de contestarle a MP: no
    // demoran la respuesta ni la entrega, y si fallan no las frenan.
    const legado = encontrado?.legado ?? false;
    const sincronizar = async () => {
      try {
        await sincronizarPago(servicio(), { pago, paymentId, legado });
      } catch (e) {
        console.error("[mp/webhook] tablas del embudo:", e instanceof Error ? e.message : e);
      }
    };
    if (CUENTAS_ACTIVAS) {
      try {
        after(sincronizar);
      } catch {
        void sincronizar();
      }
    }

    if ((pago.status === "refunded" || pago.status === "charged_back") && esPagoDePlanilla(pago)) {
      if (SUPABASE_URL && SERVICE_ROLE) {
        try {
          const d = await registrarDevolucion(
            { fetch, supabaseUrl: SUPABASE_URL, serviceRole: SERVICE_ROLE },
            {
              paymentId,
              monto: pago.transaction_amount ?? producto.precio,
              moneda: pago.currency_id ?? producto.moneda,
              motivo: pago.status === "refunded" ? "reembolso" : "contracargo",
              productoTitulo: producto.titulo,
              productoSlug: producto.slug,
            },
          );
          console.log(
            `[mp/webhook] pago ${paymentId} · ${pago.status} · ` +
              (d.sinVenta ? "sin venta asentada, no descuento nada" : d.duplicado ? "devolución ya asentada" : "DEVOLUCIÓN ASENTADA"),
          );
        } catch (e) {
          // Una devolución no asentada es un ingreso de más en el dashboard, no una venta perdida:
          // se loguea con el id para corregirla y se le contesta 200 a MP como con cualquier estado.
          console.error("[mp/webhook] no pude asentar la devolución del pago", paymentId, e);
        }
      }
      return NextResponse.json({ ok: true, estado: pago.status });
    }

    if (!pagoAprobado(pago, producto)) {
      // pending / in_process / rechazado / monto ajeno: no es venta (todavía). MP vuelve a avisar.
      return NextResponse.json({ ok: true, estado: pago.status ?? "desconocido" });
    }

    if (!SUPABASE_URL || !SERVICE_ROLE) {
      // 500 a propósito: la venta existe y no la podemos asentar. Que MP reintente.
      throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY no configurados");
    }

    const r = await registrarVenta(
      { fetch, supabaseUrl: SUPABASE_URL, serviceRole: SERVICE_ROLE },
      {
        paymentId,
        monto: pago.transaction_amount ?? producto.precio,
        moneda: pago.currency_id ?? producto.moneda,
        email: pago.payer?.email,
        productoTitulo: producto.titulo,
        productoSlug: producto.slug,
      },
    );

    // La entrega va atada al mismo gate de idempotencia que el registro: un solo mail por pago.
    let entregado: boolean | null = null;
    let rastro: boolean | null = null;
    if (!r.duplicado) {
      if (pago.payer?.email) {
        entregado = await entregarPorEmail(
          producto,
          paymentId,
          pago.payer.email,
          checkoutIdDeReferencia(pago.external_reference),
        );
      } else {
        // MP puede no exponer el mail del pagador. No es fatal: la descarga sigue viva en
        // /planillas/gracias, pero sin mail el comprador depende de esa pestaña.
        console.warn("[mp/webhook] pago sin email de comprador, no hay a quién entregar:", paymentId);
      }
    }

    if (r.filaId !== undefined) {
      const resultado = pago.payer?.email ? (entregado ? "ok" : "fallo") : "sin-email";
      rastro = await marcarEntrega(
        { fetch, supabaseUrl: SUPABASE_URL, serviceRole: SERVICE_ROLE },
        r.filaId,
        resultado,
        pago.payer?.email,
      );
    }

    console.log(
      `[mp/webhook] pago ${paymentId} · ${producto.slug} · ${r.duplicado ? "ya registrado" : "REGISTRADO"}` +
        (entregado === null ? "" : entregado ? " · entregado por email" : " · ENTREGA POR EMAIL FALLÓ"),
    );
    return NextResponse.json({ ok: true, registrado: !r.duplicado, producto: producto.slug, entregado, rastro });
  } catch (e) {
    console.error("[mp/webhook]", e);
    // 500 a propósito: MP reintenta y no perdemos la venta.
    return NextResponse.json({ error: "error procesando la notificación" }, { status: 500 });
  }
}

/**
 * GET — MP a veces valida la URL con un GET antes de guardarla en el panel, y además es la
 * única forma de PROBAR desde afuera que el webhook publicado tiene sus llaves.
 *
 * Sin esto sería un "automatismo fantasma" clásico: la ruta responde 200, parece viva, y la
 * primera venta real explota porque el proyecto de Vercel no tenía la env var (pasó tres veces
 * con proyectos recreados). Devuelve BOOLEANOS de presencia — nunca valores, ni prefijos.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    servicio: "webhook de MercadoPago",
    config: {
      mpToken: Boolean(process.env.MP_ACCESS_TOKEN),
      cuentaLegado: Boolean(process.env.MP_ACCESS_TOKEN_LEGADO),
      supabase: Boolean(SUPABASE_URL && SERVICE_ROLE),
      firmaExigida: Boolean(process.env.MP_WEBHOOK_SECRET),
      entregaPorEmail: Boolean(process.env.RESEND_API_KEY),
    },
  });
}
