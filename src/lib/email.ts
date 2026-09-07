// Helpers de email — usa la API REST de Resend directamente (sin SDK).
// FROM debe coincidir con un dominio verificado en la cuenta Resend.

const RESEND_API = "https://api.resend.com";
export const FROM = "CalculAR <soporte@theapexweb.com>";
const BASE = "https://calcular.ar";

// ─── Plantillas HTML ─────────────────────────────────────────────────────────

function shell(content: string, unsubUrl: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
  <tr><td style="background:#059669;padding:20px 32px;">
    <a href="${BASE}" style="color:#fff;font-size:20px;font-weight:700;text-decoration:none;">CalculAR</a>
    <span style="color:#a7f3d0;font-size:12px;margin-left:8px;">calcular.ar</span>
  </td></tr>
  <tr><td style="padding:32px;">${content}</td></tr>
  <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
      Recibís este email porque te suscribiste en <a href="${BASE}" style="color:#059669;">calcular.ar</a>.<br>
      <a href="${unsubUrl}" style="color:#6b7280;text-decoration:underline;">Cancelar suscripción</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function welcomeEmailHtml(token: string): string {
  const unsub = `${BASE}/api/unsubscribe?t=${token}`;
  return shell(`
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">¡Bienvenido a CalculAR!</h2>
<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
  Te anotaste para recibir actualizaciones de <strong>calcular.ar</strong> — la calculadora financiera
  y laboral argentina con datos de fuentes oficiales verificadas (INDEC, ARCA, BCRA).
</p>
<p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
  Cada semana te mandamos los números que cambiaron: IPC, tasas, paritarias. Sin spam, sin venta de datos.
</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
  <tr>
    <td style="background:#059669;border-radius:8px;padding:12px 24px;">
      <a href="${BASE}" style="color:#fff;font-size:15px;font-weight:600;text-decoration:none;">Ir a CalculAR →</a>
    </td>
  </tr>
</table>
<p style="margin:0 0 10px;font-size:14px;color:#374151;font-weight:600;">Calculadoras disponibles:</p>
<ul style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:2.2;">
  <li><a href="${BASE}/monotributo" style="color:#059669;">Monotributo 2026</a> — categoría + cuota mensual</li>
  <li><a href="${BASE}/aguinaldo" style="color:#059669;">Aguinaldo</a> — SAC + fechas de pago + neto</li>
  <li><a href="${BASE}/indemnizacion" style="color:#059669;">Indemnización por despido</a> — todos los rubros</li>
  <li><a href="${BASE}/vacaciones" style="color:#059669;">Vacaciones</a> — días + retribución</li>
  <li><a href="${BASE}/inflacion" style="color:#059669;">Inflación</a> — actualizá cualquier monto por IPC</li>
  <li><a href="${BASE}/plazo-fijo" style="color:#059669;">Plazo fijo</a> — TNA en vivo del BCRA + UVA</li>
  <li><a href="${BASE}/convenios" style="color:#059669;">Convenios colectivos</a> — Comercio, UOCRA</li>
</ul>
  `, unsub);
}

export function newsletterEmailHtml(opts: {
  weekLabel: string;
  ipcMes: string;
  ipcPct: string;
  tnaPct: string;
  unsubToken: string;
}): string {
  const unsub = `${BASE}/api/unsubscribe?t=${opts.unsubToken}`;
  return shell(`
<p style="margin:0 0 4px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em;">Semana ${opts.weekLabel}</p>
<h2 style="margin:0 0 24px;font-size:20px;color:#111827;">Números de la semana</h2>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
  <tr>
    <td width="48%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;vertical-align:top;">
      <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;">IPC ${opts.ipcMes}</p>
      <p style="margin:0;font-size:30px;font-weight:700;color:#059669;">${opts.ipcPct}%</p>
      <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">inflación mensual</p>
    </td>
    <td width="4%"></td>
    <td width="48%" style="background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;padding:16px;vertical-align:top;">
      <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;">TNA plazo fijo</p>
      <p style="margin:0;font-size:30px;font-weight:700;color:#374151;">${opts.tnaPct}%</p>
      <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">tasa nominal anual BCRA</p>
    </td>
  </tr>
</table>

<p style="margin:0 0 12px;font-size:14px;color:#374151;font-weight:600;">Calculadoras útiles esta semana:</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
  <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
    <a href="${BASE}/inflacion" style="color:#059669;font-size:14px;font-weight:500;text-decoration:none;">→ Actualizá un monto por inflación</a>
  </td></tr>
  <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
    <a href="${BASE}/plazo-fijo" style="color:#059669;font-size:14px;font-weight:500;text-decoration:none;">→ Calculá tu plazo fijo con TNA actual</a>
  </td></tr>
  <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
    <a href="${BASE}/convenios" style="color:#059669;font-size:14px;font-weight:500;text-decoration:none;">→ Escala salarial de convenios (Comercio, UOCRA)</a>
  </td></tr>
  <tr><td style="padding:8px 0;">
    <a href="${BASE}/aguinaldo" style="color:#059669;font-size:14px;font-weight:500;text-decoration:none;">→ Calculá tu aguinaldo 2026</a>
  </td></tr>
</table>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;">
  <tr><td style="padding:16px;">
    <p style="margin:0 0 4px;font-size:11px;color:#92400e;text-transform:uppercase;letter-spacing:.06em;">Para quien liquida sueldos de Comercio</p>
    <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#111827;">Planilla de liquidación — CCT 130/75</p>
    <p style="margin:0 0 12px;font-size:13px;color:#374151;line-height:1.5;">El recibo completo en Excel: básico, antigüedad, presentismo, sumas no remunerativas y aportes, con las escalas oficiales ya cargadas. Lista para usar.</p>
    <a href="${BASE}/planillas" style="color:#b45309;font-size:14px;font-weight:600;text-decoration:none;">→ Conocé la planilla</a>
  </td></tr>
</table>

<p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
  Todos los datos de calcular.ar vienen de fuentes oficiales verificadas (INDEC, ARCA, BCRA).
</p>
  `, unsub);
}

// ─── Entrega de un producto pago ─────────────────────────────────────────────
//
// POR QUÉ EXISTE. La landing prometía "recibís el archivo y las actualizaciones del año por
// email" y el webhook NUNCA mandaba nada: la única entrega era el botón de la página de
// gracias. Quien cerraba la pestaña se quedaba sin la planilla que acababa de pagar, y la
// promesa de actualizaciones no tenía por dónde llegar. Este mail cierra el ciclo.
//
// Va el ENLACE y no el archivo adjunto a propósito: el enlace re-verifica el pago contra
// MercadoPago y sirve SIEMPRE la última versión del .xlsx, así que "todas las actualizaciones
// del año incluidas" se cumple sola, sin mandar un archivo nuevo cada paritaria.

function shellTransaccional(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
  <tr><td style="background:#059669;padding:20px 32px;">
    <a href="${BASE}" style="color:#fff;font-size:20px;font-weight:700;text-decoration:none;">CalculAR</a>
    <span style="color:#a7f3d0;font-size:12px;margin-left:8px;">calcular.ar</span>
  </td></tr>
  <tr><td style="padding:32px;">${content}</td></tr>
  <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
      Este es el comprobante de tu compra en <a href="${BASE}" style="color:#059669;">calcular.ar</a>.
      Guardalo: el enlace de descarga es permanente.<br>
      ¿Algún problema? Respondé este mail o escribinos desde <a href="${BASE}/contacto" style="color:#059669;">calcular.ar/contacto</a>.
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function planillaEntregaHtml(opts: {
  titulo: string;
  convenio: string;
  urlDescarga: string;
  urlLanding: string;
}): string {
  return shellTransaccional(`
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">Tu planilla está lista</h2>
<p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
  Gracias por comprar la <strong>${opts.titulo}</strong> (${opts.convenio}). Descargala desde acá:
</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr>
    <td style="background:#059669;border-radius:8px;padding:14px 28px;">
      <a href="${opts.urlDescarga}" style="color:#fff;font-size:16px;font-weight:600;text-decoration:none;">Descargar la planilla (.xlsx) →</a>
    </td>
  </tr>
</table>
<p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">
  Abre en Excel y en Google Sheets, sin instalar nada.
</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">
  <tr><td style="padding:16px 20px;">
    <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#065f46;">Guardá este mail</p>
    <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">
      Ese enlace es tuyo y no vence: cada vez que se firma una paritaria nueva actualizamos la
      planilla y el mismo enlace te descarga la versión al día. No tenés que pagar de nuevo ni
      pedirnos nada.
    </p>
  </td></tr>
</table>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">
  Los números de la planilla son los mismos que los de la
  <a href="${opts.urlLanding}" style="color:#059669;">calculadora gratuita de calcular.ar</a>:
  misma escala oficial, misma fórmula. Si alguna vez no coinciden, avisanos y lo corregimos.
</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
  Si la planilla no te sirve, respondé este mail dentro de los 7 días y te devolvemos el dinero.
</p>
  `);
}

// ─── Envío ────────────────────────────────────────────────────────────────────

interface ResendPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
  headers?: Record<string, string>;
}

async function resendFetch(path: string, body: unknown): Promise<Response> {
  return fetch(`${RESEND_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function sendSingle(payload: ResendPayload): Promise<boolean> {
  const res = await resendFetch("/emails", payload);
  return res.ok;
}

// Resend batch: hasta 100 mensajes por llamada
export async function sendBatch(payloads: ResendPayload[]): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;
  for (let i = 0; i < payloads.length; i += 100) {
    const chunk = payloads.slice(i, i + 100);
    const res = await resendFetch("/emails/batch", chunk);
    if (res.ok) {
      sent += chunk.length;
    } else {
      failed += chunk.length;
    }
  }
  return { sent, failed };
}
