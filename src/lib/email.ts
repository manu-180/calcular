// Helpers de email — usa la API REST de Resend directamente (sin SDK).
// FROM debe coincidir con un dominio verificado en la cuenta Resend.

import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { origenIntl } from "@/motor/sitio";

const RESEND_API = "https://api.resend.com";
export const FROM = "CalculAR <soporte@theapexweb.com>";
// Mismo dominio verificado en Resend; cambia sólo el nombre que ve quien lo recibe.
export const FROM_INTL = "CalcularYa <soporte@theapexweb.com>";
const BASE = "https://calcular.ar";

export const remitente = (sitio: "ar" | "intl") => (sitio === "intl" ? FROM_INTL : FROM);

type Marca = { nombre: string; dominio: string; base: string; problema: string };

const MARCA_AR: Marca = {
  nombre: "CalculAR",
  dominio: "calcular.ar",
  base: BASE,
  problema: `¿Algún problema? Respondé este mail o escribinos desde <a href="${BASE}/contacto" style="color:#059669;">calcular.ar/contacto</a>.`,
};

function marcaIntl(): Marca {
  const base = origenIntl() ?? "https://calcularya.com";
  const dominio = new URL(base).host;
  return {
    nombre: "CalcularYa",
    dominio,
    base,
    problema: `¿Algún problema? Responde este correo o escríbenos desde <a href="${base}/contacto" style="color:#059669;">${dominio}/contacto</a>.`,
  };
}

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
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">Ya estás anotado en CalculAR</h2>
<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
  Te anotaste para recibir las novedades de <strong>calcular.ar</strong>: calculadoras laborales y
  financieras de Argentina, con datos de fuentes oficiales verificadas (INDEC, ARCA, BCRA).
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
  <li><a href="${BASE}/monotributo" style="color:#059669;">Monotributo 2026</a>: categoría y cuota mensual</li>
  <li><a href="${BASE}/aguinaldo" style="color:#059669;">Aguinaldo</a>: monto, fechas de pago y neto</li>
  <li><a href="${BASE}/indemnizacion" style="color:#059669;">Indemnización por despido</a>: todos los rubros</li>
  <li><a href="${BASE}/vacaciones" style="color:#059669;">Vacaciones</a>: días y cuánto cobrás</li>
  <li><a href="${BASE}/inflacion" style="color:#059669;">Inflación</a>: actualizá cualquier monto por IPC</li>
  <li><a href="${BASE}/plazo-fijo" style="color:#059669;">Plazo fijo</a>: TNA en vivo del BCRA y UVA</li>
  <li><a href="${BASE}/convenios" style="color:#059669;">Convenios colectivos</a>: Comercio y UOCRA</li>
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
    <p style="margin:0 0 4px;font-size:11px;color:#92400e;text-transform:uppercase;letter-spacing:.06em;">Planillas de calcular.ar</p>
    <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#111827;">La misma cuenta, en Excel y actualizada todo el año</p>
    <p style="margin:0 0 12px;font-size:13px;color:#374151;line-height:1.7;">
      <a href="${BASE}/planillas/casas-particulares" style="color:#b45309;">Sueldo de empleada doméstica</a> ·
      <a href="${BASE}/planillas/monotributo" style="color:#b45309;">Control de monotributo</a> ·
      <a href="${BASE}/planillas" style="color:#b45309;">Sueldos de Comercio</a> ·
      <a href="${BASE}/planillas/uocra" style="color:#b45309;">Jornales UOCRA</a>
    </p>
    <p style="margin:0;font-size:12px;color:#6b7280;">Pago único, con las actualizaciones del año y 7 días para pedir la devolución.</p>
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

function shellTransaccional(content: string, pie?: string, marca: Marca = MARCA_AR): string {
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
    <a href="${marca.base}" style="color:#fff;font-size:20px;font-weight:700;text-decoration:none;">${marca.nombre}</a>
    <span style="color:#a7f3d0;font-size:12px;margin-left:8px;">${marca.dominio}</span>
  </td></tr>
  <tr><td style="padding:32px;">${content}</td></tr>
  <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
      ${pie ?? `Este es el comprobante de tu compra en <a href="${BASE}" style="color:#059669;">calcular.ar</a>.
      Guardalo: el enlace de descarga es permanente.`}<br>
      ${marca.problema}
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function bloqueCuenta(checkoutId?: string | null, informe = false): string {
  if (!CUENTAS_ACTIVAS) return "";
  const registro = checkoutId && UUID_RE.test(checkoutId)
    ? `${BASE}/registro?compra=${checkoutId.toLowerCase()}`
    : `${BASE}/registro`;
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e4e4e7;border-radius:8px;">
  <tr><td style="padding:16px 20px;">
    <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#18181b;">Tenela siempre a mano en tu cuenta</p>
    <p style="margin:0 0 12px;font-size:14px;color:#3f3f46;line-height:1.6;">
      ${informe
        ? "Creá tu cuenta gratis con este mismo mail y el informe queda guardado ahí. Si perdés este mail, lo abrís desde tu cuenta."
        : `Creá tu cuenta gratis con este mismo mail y la planilla queda guardada ahí, siempre en su
      última versión. Si perdés este mail, la bajás desde tu cuenta.`}
    </p>
    <a href="${registro}" style="color:#047857;font-size:14px;font-weight:600;">Crear mi cuenta →</a>
    <span style="color:#a1a1aa;font-size:14px;">&nbsp;·&nbsp;</span>
    <a href="${BASE}/login?next=%2Fcuenta" style="color:#52525b;font-size:14px;">Ya tengo cuenta</a>
  </td></tr>
</table>`;
}

export function planillaEntregaHtml(opts: {
  titulo: string;
  convenio: string;
  urlDescarga: string;
  urlLanding: string;
  /** Qué dispara una versión nueva. Monotributo no tiene paritaria: tiene escalas semestrales. */
  disparadorActualizacion?: string;
  otras?: { titulo: string; paraQuien: string; url: string }[];
  /** uuid del checkout (`ca_checkouts.id`): prellena el registro sin poner el mail en la URL. */
  checkoutId?: string | null;
}): string {
  const otras = opts.otras?.length
    ? `<p style="margin:24px 0 8px;font-size:13px;color:#6b7280;">Más de calcular.ar, por si te sirve:</p>
<ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.9;">
${opts.otras.map((o) => `  <li><a href="${o.url}" style="color:#059669;">${o.titulo}</a>: ${o.paraQuien.charAt(0).toLowerCase()}${o.paraQuien.slice(1)}</li>`).join("\n")}
</ul>`
    : "";
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
      Ese enlace es tuyo y no vence: ${opts.disparadorActualizacion ?? "cada vez que se firma una paritaria nueva"}
      actualizamos la planilla y el mismo enlace te descarga la versión al día. No tenés que pagar
      de nuevo ni pedirnos nada.
    </p>
  </td></tr>
</table>
${bloqueCuenta(opts.checkoutId)}
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">
  Los números de la planilla son los mismos que los de la
  <a href="${opts.urlLanding}" style="color:#059669;">calculadora gratuita de calcular.ar</a>:
  misma escala oficial, misma fórmula. Si alguna vez no coinciden, avisanos y lo corregimos.
</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
  Si la planilla no te sirve, respondé este mail dentro de los 7 días y te devolvemos el dinero.
</p>
${otras}
  `);
}

/** Entrega de un informe: no hay archivo ni actualizaciones, hay una página que se arma con los datos
 *  que la persona cargó y que re-verifica el pago cada vez que se abre. */
export function informeEntregaHtml(opts: {
  titulo: string;
  /** El pago trae datos válidos de la calculadora (`datosDelPago`). Sin ellos, el informe se completa
   *  en la página: prometer «tus datos» sería mentir. */
  conDatos?: boolean;
  urlInforme: string;
  urlLanding: string;
  otras?: { titulo: string; paraQuien: string; url: string }[];
  checkoutId?: string | null;
}): string {
  const otras = opts.otras?.length
    ? `<p style="margin:24px 0 8px;font-size:13px;color:#6b7280;">Otras herramientas de calcular.ar, por si te sirven:</p>
<ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.9;">
${opts.otras.map((o) => `  <li><a href="${o.url}" style="color:#059669;">${o.titulo}</a>: ${o.paraQuien.charAt(0).toLowerCase()}${o.paraQuien.slice(1)}</li>`).join("\n")}
</ul>`
    : "";
  return shellTransaccional(
    `
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">Tu informe está listo</h2>
<p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
  Gracias por comprar el <strong>${opts.titulo}</strong>. ${
    opts.conDatos
      ? "Lo armamos con los datos que cargaste en la calculadora; lo abrís desde acá:"
      : "Lo abrís desde acá, cargás tus datos y se arma al instante:"
  }
</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr>
    <td style="background:#059669;border-radius:8px;padding:14px 28px;">
      <a href="${opts.urlInforme}" style="color:#fff;font-size:16px;font-weight:600;text-decoration:none;">Ver mi informe →</a>
    </td>
  </tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">
  <tr><td style="padding:16px 20px;">
    <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#065f46;">Guardá este mail</p>
    <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">
      Ese enlace es tuyo y no vence: lo podés abrir las veces que quieras, desde la compu o el
      celular, para imprimirlo o mostrarlo cuando lo necesites.
    </p>
  </td></tr>
</table>
${bloqueCuenta(opts.checkoutId, true)}
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">
  Los números del informe salen de la misma cuenta que la
  <a href="${opts.urlLanding}" style="color:#059669;">calculadora de calcular.ar</a>, con datos
  oficiales. Si alguna vez algo no te cierra, avisanos y lo revisamos.
</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
  Si el informe no te sirve, respondé este mail dentro de los 7 días y te devolvemos el dinero.
</p>
${otras}
  `,
    `Este es el comprobante de tu compra en <a href="${BASE}" style="color:#059669;">calcular.ar</a>.
      Guardalo: el enlace a tu informe es permanente.`,
  );
}

// ─── Recordatorio de compra sin terminar ─────────────────────────────────────
//
// Uno solo por intento (ver src/lib/mp-recupero.ts). El tono es el de alguien que te guardó el
// lugar, no el de un cobrador: nada de urgencia ni de "últimas unidades", y la salida
// ("no hace falta que hagas nada") va escrita, para que ignorarlo no se sienta como deuda.
export function recordatorioCompraHtml(opts: {
  tituloCorto: string;
  precio: string;
  urlRetomar: string;
  /** El informe no tiene actualizaciones del año y es masculino: cambia el artículo y la promesa. */
  informe?: boolean;
}): string {
  const articulo = opts.informe ? "el" : "la";
  const incluye = opts.informe
    ? "Es un pago único, lo ves apenas se acredita y tenés 7 días para pedir la devolución si no te sirve."
    : `Es un pago único, con las actualizaciones del año incluidas y 7 días para pedir la devolución
  si no te sirve.`;
  return shellTransaccional(
    `
<h2 style="margin:0 0 16px;font-size:21px;color:#111827;">Te quedó pendiente ${articulo} ${opts.tituloCorto}</h2>
<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
  Ayer empezaste a ${opts.informe ? "comprarlo" : "comprarla"} en calcular.ar y el pago no llegó a completarse. Si fue un problema
  con la tarjeta, suele alcanzar con probar con débito o con dinero en cuenta de MercadoPago.
</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr>
    <td style="background:#059669;border-radius:8px;padding:14px 28px;">
      <a href="${opts.urlRetomar}" style="color:#fff;font-size:16px;font-weight:600;text-decoration:none;">Retomar la compra · ${opts.precio} →</a>
    </td>
  </tr>
</table>
<p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.6;">
  ${incluye}
</p>
<p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.6;">
  ¿Te frenó una duda? Respondé este mail y te contestamos.
</p>
<p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
  Si cambiaste de idea no hace falta que hagas nada: no te vamos a volver a escribir por esto.
</p>
  `,
    "Te escribimos porque dejaste este mail al empezar una compra en calcular.ar. Es el único recordatorio.",
  );
}

// ─── Mails de la cuenta (alta, enlace para entrar, clave nueva) ──────────────
//
// Los manda calcular.ar y no Supabase (decisión 5 del SPEC). El botón apunta a /auth/confirmar,
// que pide un toque más antes de canjear el token: los antivirus de correo abren los enlaces
// para escanearlos y, con un GET que canjea, le quemarían el enlace a quien lo recibe.

export type MailCuenta = "alta" | "confirmar" | "entrar" | "ya-tenias" | "recuperar" | "sin-cuenta";

const COPY_CUENTA: Record<MailCuenta, { asunto: string; titulo: string; parrafos: string[]; boton: string; nota: string }> = {
  alta: {
    asunto: "Confirmá tu cuenta de CalculAR",
    titulo: "Confirmá tu mail y listo",
    parrafos: ["Gracias por crear tu cuenta en CalculAR. Tocá el botón para confirmar que este mail es tuyo y entrar."],
    boton: "Confirmar mi cuenta",
    nota: "Si no creaste una cuenta, ignorá este mail: sin confirmar no se activa nada.",
  },
  confirmar: {
    asunto: "Confirmá tu mail en CalculAR",
    titulo: "Confirmá que este mail es tuyo",
    parrafos: ["Te falta un paso para terminar de activar tu cuenta de CalculAR. Tocá el botón y queda confirmada."],
    boton: "Confirmar mi mail",
    nota: "Si no lo pediste vos, ignorá este mail: tu cuenta sigue igual.",
  },
  entrar: {
    asunto: "Tu enlace para entrar a CalculAR",
    titulo: "Entrá a tu cuenta",
    parrafos: ["Pediste entrar a CalculAR sin clave. Tocá el botón y ya estás adentro."],
    boton: "Entrar a mi cuenta",
    nota: "Si no lo pediste vos, ignorá este mail: tu cuenta sigue igual.",
  },
  "ya-tenias": {
    asunto: "Ya tenés una cuenta en CalculAR",
    titulo: "Ya tenías cuenta con este mail",
    parrafos: [
      "Se quiso crear una cuenta en CalculAR con este mail, pero ya hay una. Podés entrar directo con el botón, sin clave.",
      "Si no te acordás la clave, una vez adentro la cambiás desde Mi cuenta, en Seguridad.",
    ],
    boton: "Entrar a mi cuenta",
    nota: "Si no fuiste vos, ignorá este mail: tu cuenta sigue igual.",
  },
  recuperar: {
    asunto: "Elegí una clave nueva para CalculAR",
    titulo: "Elegí una clave nueva",
    parrafos: ["Pediste cambiar la clave de tu cuenta de CalculAR. Tocá el botón y elegí una nueva."],
    boton: "Elegir clave nueva",
    nota: "Si no lo pediste vos, ignorá este mail: tu clave actual sigue funcionando.",
  },
  "sin-cuenta": {
    asunto: "No encontramos una cuenta con este mail",
    titulo: "Todavía no tenés cuenta",
    parrafos: [
      "Se pidió entrar a CalculAR con este mail, pero no hay ninguna cuenta creada con él.",
      "Si fuiste vos, crear una es gratis y lleva un minuto: ahí quedan guardadas tus planillas y tus cálculos.",
    ],
    boton: "Crear mi cuenta",
    nota: "Si no fuiste vos, ignorá este mail. No te vamos a volver a escribir por esto.",
  },
};

const AVISO_VENCE = "Por seguridad, el enlace sirve una sola vez y vence en poco tiempo.";

function esc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type CopyCuenta = (typeof COPY_CUENTA)[MailCuenta];

// CalcularYa: neutro para LATAM, en tú y «correo» (docs/GUIA-REDACCION.md).
const COPY_CUENTA_INTL: Record<MailCuenta, CopyCuenta> = {
  alta: {
    asunto: "Confirma tu cuenta de CalcularYa",
    titulo: "Confirma tu correo y listo",
    parrafos: ["Gracias por crear tu cuenta en CalcularYa. Toca el botón para confirmar que este correo es tuyo e ingresar."],
    boton: "Confirmar mi cuenta",
    nota: "Si no creaste una cuenta, ignora este correo: sin confirmar no se activa nada.",
  },
  confirmar: {
    asunto: "Confirma tu correo en CalcularYa",
    titulo: "Confirma que este correo es tuyo",
    parrafos: ["Te falta un paso para terminar de activar tu cuenta de CalcularYa. Toca el botón y queda confirmada."],
    boton: "Confirmar mi correo",
    nota: "Si no lo pediste tú, ignora este correo: tu cuenta sigue igual.",
  },
  entrar: {
    asunto: "Tu enlace para ingresar a CalcularYa",
    titulo: "Ingresa a tu cuenta",
    parrafos: ["Pediste ingresar a CalcularYa sin contraseña. Toca el botón y ya estás dentro."],
    boton: "Ingresar a mi cuenta",
    nota: "Si no lo pediste tú, ignora este correo: tu cuenta sigue igual.",
  },
  "ya-tenias": {
    asunto: "Ya tienes una cuenta en CalcularYa",
    titulo: "Ya tenías cuenta con este correo",
    parrafos: [
      "Alguien quiso crear una cuenta en CalcularYa con este correo, pero ya existe una. Puedes ingresar directo con el botón, sin contraseña.",
      "Si no recuerdas la contraseña, una vez dentro la cambias desde Mi cuenta, en Seguridad.",
    ],
    boton: "Ingresar a mi cuenta",
    nota: "Si no fuiste tú, ignora este correo: tu cuenta sigue igual.",
  },
  recuperar: {
    asunto: "Elige una nueva contraseña para CalcularYa",
    titulo: "Elige una nueva contraseña",
    parrafos: ["Pediste cambiar la contraseña de tu cuenta de CalcularYa. Toca el botón y elige una nueva."],
    boton: "Elegir nueva contraseña",
    nota: "Si no lo pediste tú, ignora este correo: tu contraseña actual sigue funcionando.",
  },
  "sin-cuenta": {
    asunto: "No encontramos una cuenta con este correo",
    titulo: "Todavía no tienes cuenta",
    parrafos: [
      "Alguien pidió ingresar a CalcularYa con este correo, pero no hay ninguna cuenta creada con él.",
      "Si fuiste tú, crear una es gratis y toma un minuto: ahí quedan guardadas tus planillas y tus cálculos.",
    ],
    boton: "Crear mi cuenta",
    nota: "Si no fuiste tú, ignora este correo. No te volveremos a escribir por esto.",
  },
};

export function mailCuenta(tipo: MailCuenta, url: string, sitio: "ar" | "intl" = "ar"): { asunto: string; html: string; texto: string } {
  if (sitio === "intl") return mailCuentaIntl(tipo, url);
  const c = COPY_CUENTA[tipo];
  const conVencimiento = tipo !== "sin-cuenta";
  const html = shellTransaccional(
    `
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">${c.titulo}</h2>
${c.parrafos.map((p) => `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">${p}</p>`).join("\n")}
<table cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">
  <tr>
    <td style="background:#059669;border-radius:10px;">
      <a href="${esc(url)}" style="display:inline-block;padding:16px 32px;color:#fff;font-size:16px;font-weight:600;text-decoration:none;">${c.boton} →</a>
    </td>
  </tr>
</table>
<p style="margin:0 0 12px;font-size:13px;color:#6b7280;line-height:1.6;">
  ${conVencimiento ? `${AVISO_VENCE} ` : ""}${c.nota}
</p>
<p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;word-break:break-all;">
  ¿El botón no anda? Copiá este enlace en el navegador:<br>${esc(url)}
</p>
  `,
    "Te escribimos porque se pidió este acceso en calcular.ar con tu mail.",
  );
  const texto = [
    c.titulo,
    "",
    ...c.parrafos.flatMap((p) => [p, ""]),
    `${c.boton}: ${url}`,
    "",
    conVencimiento ? `${AVISO_VENCE} ${c.nota}` : c.nota,
    "",
    "CalculAR · calcular.ar",
  ].join("\n");
  return { asunto: c.asunto, html, texto };
}

function mailCuentaIntl(tipo: MailCuenta, url: string): { asunto: string; html: string; texto: string } {
  const c = COPY_CUENTA_INTL[tipo];
  const marca = marcaIntl();
  const conVencimiento = tipo !== "sin-cuenta";
  const html = shellTransaccional(
    `
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">${c.titulo}</h2>
${c.parrafos.map((p) => `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">${p}</p>`).join("\n")}
<table cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">
  <tr>
    <td style="background:#059669;border-radius:10px;">
      <a href="${esc(url)}" style="display:inline-block;padding:16px 32px;color:#fff;font-size:16px;font-weight:600;text-decoration:none;">${c.boton} →</a>
    </td>
  </tr>
</table>
<p style="margin:0 0 12px;font-size:13px;color:#6b7280;line-height:1.6;">
  ${conVencimiento ? `${AVISO_VENCE} ` : ""}${c.nota}
</p>
<p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;word-break:break-all;">
  ¿El botón no funciona? Copia este enlace en el navegador:<br>${esc(url)}
</p>
  `,
    `Te escribimos porque alguien pidió este acceso en ${marca.dominio} con tu correo.`,
    marca,
  );
  const texto = [
    c.titulo,
    "",
    ...c.parrafos.flatMap((p) => [p, ""]),
    `${c.boton}: ${url}`,
    "",
    conVencimiento ? `${AVISO_VENCE} ${c.nota}` : c.nota,
    "",
    `${marca.nombre} · ${marca.dominio}`,
  ].join("\n");
  return { asunto: c.asunto, html, texto };
}

// ─── Envío ────────────────────────────────────────────────────────────────────

interface ResendPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text?: string;
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
