import type { Trato } from "@/motor/tipos";
import type { ProductoIntl } from "./catalogo-intl";

// Mismo remitente verificado en Resend que calcular.ar; cambia sólo el nombre que ve la persona.
export const FROM_INTL = "CalcularYa <soporte@theapexweb.com>";

export function segun<T>(trato: Trato, opciones: { tu: T; usted: T; vos: T }): T {
  return opciones[trato];
}

function escapar(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function asuntoEntregaIntl(p: ProductoIntl): string {
  return `${p.tituloCorto}: descarga y actualizaciones`;
}

export function entregaIntlHtml(o: { producto: ProductoIntl; trato: Trato; urlDescarga: string; urlLanding: string; origen: string; contacto: string }): string {
  const t = o.trato;
  const titulo = escapar(o.producto.titulo);
  const intro = segun(t, {
    tu: `Gracias por comprar la <strong>${titulo}</strong>. Descárgala desde aquí:`,
    usted: `Gracias por comprar la <strong>${titulo}</strong>. Descárguela desde aquí:`,
    vos: `Gracias por comprar la <strong>${titulo}</strong>. Descargala desde acá:`,
  });
  const guarda = segun(t, { tu: "Guarda este correo", usted: "Guarde este correo", vos: "Guardá este correo" });
  const vence = segun(t, {
    tu: `El enlace es tuyo y no vence. ${escapar(o.producto.disparadorActualizacion)}, actualizamos la planilla y el mismo enlace te da la versión al día. No tienes que pagar de nuevo.`,
    usted: `El enlace es suyo y no vence. ${escapar(o.producto.disparadorActualizacion)}, actualizamos la planilla y el mismo enlace le da la versión al día. No tiene que pagar de nuevo.`,
    vos: `El enlace es tuyo y no vence. ${escapar(o.producto.disparadorActualizacion)}, actualizamos la planilla y el mismo enlace te da la versión al día. No tenés que pagar de nuevo.`,
  });
  const devolucion = segun(t, {
    tu: "Si la planilla no te sirve, responde este correo dentro de los 7 días y te devolvemos el dinero.",
    usted: "Si la planilla no le sirve, responda este correo dentro de los 7 días y le devolvemos el dinero.",
    vos: "Si la planilla no te sirve, respondé este correo dentro de los 7 días y te devolvemos el dinero.",
  });
  const ayuda = segun(t, {
    tu: `¿Algún problema? Responde este correo o escríbenos a ${escapar(o.contacto)}.`,
    usted: `¿Algún problema? Responda este correo o escríbanos a ${escapar(o.contacto)}.`,
    vos: `¿Algún problema? Respondé este correo o escribinos a ${escapar(o.contacto)}.`,
  });
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
    <a href="${o.origen}" style="color:#fff;font-size:20px;font-weight:700;text-decoration:none;">Calcular<span style="color:#a7f3d0;">Ya</span></a>
  </td></tr>
  <tr><td style="padding:32px;">
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">${segun(t, { tu: "Tu", usted: "Su", vos: "Tu" })} planilla está lista</h2>
<p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">${intro}</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr>
    <td style="background:#059669;border-radius:8px;padding:14px 28px;">
      <a href="${o.urlDescarga}" style="color:#fff;font-size:16px;font-weight:600;text-decoration:none;">Descargar la planilla (.xlsx)</a>
    </td>
  </tr>
</table>
<p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">Abre en Excel y en Google Sheets.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">
  <tr><td style="padding:16px 20px;">
    <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#065f46;">${guarda}</p>
    <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">${vence}</p>
  </td></tr>
</table>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">
  Los números son los mismos de la <a href="${o.urlLanding}" style="color:#059669;">calculadora gratis de CalcularYa</a>, con el dato oficial.
</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${devolucion}</p>
  </td></tr>
  <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
      Este es el comprobante de ${segun(t, { tu: "tu", usted: "su", vos: "tu" })} compra en <a href="${o.origen}" style="color:#059669;">CalcularYa</a>.<br>${ayuda}
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
