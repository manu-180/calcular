import { NextRequest, NextResponse, after } from "next/server";
import {
  CATALOGO,
  buscarPago,
  checkoutIdDeReferencia,
  destinosDeEntrega,
  esPagoDePlanilla,
  pagoAprobado,
  productoDePago,
  rutaEntrega,
  type Producto,
} from "@/lib/mp";
import {
  enmascararEmail,
  esPagoAjeno,
  extraerPaymentId,
  marcarEntrega,
  registrarDevolucion,
  registrarVenta,
  sincronizarPago,
  verificarFirma,
  type CuerpoNotificacion,
} from "@/lib/mp-webhook";
import { FROM, informeEntregaHtml, planillaEntregaHtml, sendSingle, sendSingleConReintentos } from "@/lib/email";
import { emailsAdmin, esAdminEmail } from "@/lib/auth/admin";
import { usuarioActual } from "@/lib/auth/sesion";
import { ipDelPedido } from "@/lib/acceso-entrega";
import { permitido } from "@/lib/limite";
import { datosDelPago } from "@/lib/prefill/servidor";
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
 * que MP reintente, y el reintento vería `duplicado: true` y tampoco mandaría el mail. Por eso
 * los reintentos van acá adentro, con esperas cortas.
 */
async function enviarEntrega(
  producto: Producto,
  paymentId: string,
  email: string,
  checkoutId: string | null,
  conDatos: boolean,
): Promise<boolean> {
  const urlEntrega = `${SITE}${rutaEntrega(producto, paymentId)}`;
  const otras = CATALOGO.filter((p) => p.slug !== producto.slug).map((p) => ({
    titulo: p.tituloCorto,
    paraQuien: p.paraQuien,
    url: `${SITE}${p.rutaLanding}`,
  }));
  try {
    return await sendSingleConReintentos({
      from: FROM,
      to: [email],
      subject:
        producto.entrega === "informe"
          ? `Tu ${producto.tituloCorto} está listo`
          : `Tu ${producto.tituloCorto}: descarga y actualizaciones`,
      html:
        producto.entrega === "informe"
          ? informeEntregaHtml({
              titulo: producto.titulo,
              urlInforme: urlEntrega,
              urlLanding: `${SITE}${producto.rutaLanding}`,
              conDatos,
              checkoutId,
              otras,
            })
          : planillaEntregaHtml({
              titulo: producto.titulo,
              convenio: producto.convenio,
              urlDescarga: urlEntrega,
              urlLanding: `${SITE}${producto.rutaLanding}`,
              disparadorActualizacion: producto.disparadorActualizacion,
              checkoutId,
              otras,
            }),
    });
  } catch (e) {
    console.error("[mp/webhook] error armando la entrega del pago", paymentId, e instanceof Error ? e.message : e);
    return false;
  }
}

/** Prueba cada destino en orden y devuelve al que llegó, o null si no llegó a ninguno. */
async function entregarPorEmail(
  producto: Producto,
  paymentId: string,
  destinos: string[],
  checkoutId: string | null,
  conDatos: boolean,
): Promise<string | null> {
  for (const email of destinos) {
    if (await enviarEntrega(producto, paymentId, email, checkoutId, conDatos)) return email;
    console.error(`[mp/webhook] la entrega a ${enmascararEmail(email)} falló después de reintentar · pago ${paymentId}`);
  }
  return null;
}

const DIA_SEG = 24 * 60 * 60;

// El comprador pagó y no le llegó nada: sin este aviso el fallo sólo vive en un log que nadie mira.
async function avisarEntregaFallida(producto: Producto, paymentId: string, motivo: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  const para = emailsAdmin();
  if (!para.length || !(await permitido("entrega-ar-aviso:global", 30, DIA_SEG))) return;
  const texto = [
    `${producto.titulo} no se pudo entregar por mail (${motivo}).`,
    `Pago de MercadoPago: ${paymentId}`,
    `Enlace de entrega: ${SITE}${rutaEntrega(producto, paymentId)}`,
  ].join("\n");
  try {
    await sendSingle({
      from: FROM,
      to: para,
      subject: `Entrega fallida: ${producto.slug} (pago ${paymentId})`,
      html: `<pre style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;">${texto.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>`,
      text: texto,
    });
  } catch (e) {
    console.error("[mp/webhook] tampoco salió el aviso de entrega fallida", paymentId, e instanceof Error ? e.message : e);
  }
}

/**
 * POST /api/mp/webhook — notification_url de la preferencia de Checkout Pro.
 *
 * Contrato con MP: hay que responder 2xx rápido o reintenta. Por eso todo lo que NO es un pago
 * aprobado nuestro (otro tipo de evento, un pago pendiente, un duplicado) también sale 200: son
 * casos esperados, no fallas. 401 sólo para una firma presente que no cierra, 429 por exceso de
 * pedidos y 500 para un error real de escritura: ahí SÍ queremos el reintento de MP.
 */
export async function POST(req: NextRequest) {
  // Cada aviso con un id le cuesta una consulta a MP con nuestro token. 120 por minuto por IP sobra
  // para los reintentos de MP, igual que en el webhook de PayPal.
  if (!(await permitido(`mp-webhook:${ipDelPedido(req.headers) ?? "sin-ip"}`, 120, 60))) {
    return NextResponse.json({ error: "demasiados pedidos" }, { status: 429 });
  }
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

  // El secret es el de la app de la cuenta CalculAR. Un aviso sin firma verificable (el IPN viejo
  // ?topic=payment&id=, que según la doc de MP no se puede validar, o uno sin x-signature) no se
  // procesa para esa cuenta y se contesta 200: MP manda además la notificación firmada del mismo pago,
  // que es la que asienta. Con 401 MP reintentaba el IPN durante días. Procesarlo re-consultando a MP
  // no sumaría nada y dejaría que un pedido sin autenticar dispare escrituras y mails. La cuenta vieja
  // nunca tuvo secret: sus avisos se aceptan como antes y el gate es la re-consulta del pago.
  const firma = verificarFirma(url, req.headers, process.env.MP_WEBHOOK_SECRET, paymentId);
  if (firma === "sin-firma" && !process.env.MP_ACCESS_TOKEN_LEGADO) {
    return NextResponse.json({ ok: true, ignorado: "aviso sin firma verificable" });
  }

  try {
    // FUENTE DE VERDAD: el pago según MP, nunca el cuerpo de la notificación.
    const encontrado = await buscarPago(paymentId);
    if (encontrado && !encontrado.legado && firma === "invalida") {
      console.error("[mp/webhook] firma inválida para el pago", paymentId);
      return NextResponse.json({ error: "firma inválida" }, { status: 401 });
    }
    if (encontrado && !encontrado.legado && firma === "sin-firma") {
      return NextResponse.json({ ok: true, ignorado: "aviso sin firma verificable" });
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
    const destinos = destinosDeEntrega(pago);
    if (!r.duplicado) {
      if (destinos.length) {
        entregado =
          (await entregarPorEmail(
            producto,
            paymentId,
            destinos,
            checkoutIdDeReferencia(pago.external_reference),
            datosDelPago(pago, producto) !== null,
          )) !== null;
        if (!entregado) {
          console.error(`[mp/webhook] ENTREGA POR EMAIL FALLÓ · payment_id ${paymentId} · ${producto.slug} · ${destinos.length} destino(s)`);
          await avisarEntregaFallida(producto, paymentId, "el mail de entrega falló después de reintentar");
        }
      } else {
        // MP puede no exponer el mail del pagador y una compra por GET no lleva el del formulario.
        // La descarga sigue viva en /planillas/gracias, pero sin mail el comprador depende de esa pestaña.
        console.warn("[mp/webhook] pago sin email de comprador, no hay a quién entregar:", paymentId);
      }
    }

    if (r.filaId !== undefined) {
      const resultado = destinos.length ? (entregado ? "ok" : "fallo") : "sin-email";
      rastro = await marcarEntrega(
        { fetch, supabaseUrl: SUPABASE_URL, serviceRole: SERVICE_ROLE },
        r.filaId,
        resultado,
        destinos[0],
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
 * GET — la forma de PROBAR que el webhook publicado tiene sus llaves, sin esperar a la primera venta
 * (pasó tres veces que un proyecto de Vercel recreado no tenía la env var). Devuelve BOOLEANOS de
 * presencia, nunca valores, y sólo a un admin con sesión: a cualquier otro le contestaría qué está
 * configurado en el deploy. Mismo gate que el webhook de PayPal.
 */
export async function GET() {
  const usuario = await usuarioActual().catch(() => null);
  if (!usuario?.verificado || !esAdminEmail(usuario.email)) return new NextResponse("Not Found", { status: 404 });
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
