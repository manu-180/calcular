import type { Idioma, Trato } from "@/motor/tipos";
import type { ProductoIntl } from "./catalogo-intl";
import { rellenar, textosVenta } from "./textos";

// Mismo remitente verificado en Resend que calcular.ar; cambia sólo el nombre que ve la persona.
export const FROM_INTL = "CalcularYa <soporte@theapexweb.com>";

const MARCA = "CalcularYa";

function escapar(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function asuntoEntregaIntl(p: ProductoIntl, idioma: Idioma, trato: Trato): string {
  const c = textosVenta(idioma, trato).correo;
  return rellenar(p.tipo === "informe" ? c.asuntoInforme : c.asuntoPlanilla, { titulo: p.tituloCorto });
}

export interface EntregaIntl {
  producto: ProductoIntl;
  idioma: Idioma;
  trato: Trato;
  urlDescarga: string;
  urlLanding: string;
  origen: string;
  contacto: string;
}

// El informe no se descarga: es una página que se abre, se imprime o se guarda en PDF. Todo lo que
// entra en el HTML se escapa acá: los textos del diccionario y los del producto por igual.
export function entregaIntlHtml(o: EntregaIntl): string {
  const c = textosVenta(o.idioma, o.trato).correo;
  const x = o.producto.tipo === "informe" ? c.informe : c.planilla;
  const titulo = `<strong>${escapar(o.producto.titulo)}</strong>`;
  const intro = escapar(x.intro).replace("{titulo}", titulo);
  const vence = escapar(rellenar(x.vence, { disparador: o.producto.disparadorActualizacion }));
  const ayuda = escapar(rellenar(x.ayuda, { contacto: o.contacto }));
  const enlace = `<a href="${o.urlLanding}" style="color:#059669;">${escapar(c.enlaceCalculadora)}</a>`;
  const mismos = escapar(c.mismosNumeros).replace("{enlace}", enlace);
  const comprobante = escapar(c.comprobante).replace("{marca}", `<a href="${o.origen}" style="color:#059669;">${MARCA}</a>`);
  return `<!DOCTYPE html>
<html lang="${o.idioma}">
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
<h2 style="margin:0 0 16px;font-size:22px;color:#111827;">${escapar(x.encabezado)}</h2>
<p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">${intro}</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr>
    <td style="background:#059669;border-radius:8px;padding:14px 28px;">
      <a href="${o.urlDescarga}" style="color:#fff;font-size:16px;font-weight:600;text-decoration:none;">${escapar(x.boton)}</a>
    </td>
  </tr>
</table>
<p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">${escapar(x.abre)}</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">
  <tr><td style="padding:16px 20px;">
    <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#065f46;">${escapar(x.guarda)}</p>
    <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">${vence}</p>
  </td></tr>
</table>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">${mismos}</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${escapar(x.devolucion)}</p>
  </td></tr>
  <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
      ${comprobante}<br>${ayuda}
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
