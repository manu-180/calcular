import "server-only";
import { FROM, sendSingle } from "@/lib/email";
import { permitido } from "@/lib/limite";
import { NOMBRE_TIPO, type Opinion } from "@/lib/opiniones";

const DIA_SEG = 24 * 60 * 60;
// Tope global de avisos por día: el de 10 opiniones por cuenta no frena a quien abre muchas
// cuentas para llenarle el buzón a Manuel. Pasado el tope, la opinión igual queda en el panel.
const TOPE_AVISOS_DIA = 40;

function destinatarios(): string[] {
  return (process.env.ADMIN_EMAILS || "manunv97@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function esc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// origen: el sitio donde la escribieron (para el enlace a la página). origenPanel: siempre calcular.ar,
// que es donde vive el panel. mercado: sólo para las de calcularya, va en el asunto.
export async function avisarOpinionNueva(
  opinion: Opinion,
  email: string,
  verificado: boolean,
  origen: string,
  origenPanel: string = origen,
  mercado?: string,
): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  const para = destinatarios();
  if (!para.length) return;
  if (!(await permitido("opiniones-aviso:global", TOPE_AVISOS_DIA, DIA_SEG))) {
    console.warn("[opiniones] aviso por mail omitido: tope diario");
    return;
  }
  const tipo = NOMBRE_TIPO[opinion.tipo];
  const panel = `${origenPanel}/dashboard/opiniones${mercado ? `?mercado=${encodeURIComponent(mercado)}` : ""}`;
  const deQuien = `${email}${verificado ? "" : " (mail sin confirmar)"}`;
  const pagina = opinion.desde ? `${origen}${opinion.desde}` : null;
  const resumen = opinion.mensaje.replace(/\s+/g, " ").slice(0, 60);
  const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;max-width:600px;width:100%;">
<tr><td style="padding:28px 32px;">
<p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#047857;">${esc(tipo)}</p>
<p style="margin:0 0 18px;font-size:14px;color:#6b7280;">De ${esc(deQuien)}${pagina ? ` · desde <a href="${esc(pagina)}" style="color:#047857;">${esc(opinion.desde ?? "")}</a>` : ""}</p>
<p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#111827;white-space:pre-wrap;">${esc(opinion.mensaje)}</p>
<a href="${esc(panel)}" style="display:inline-block;padding:12px 22px;background:#059669;border-radius:10px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;">Ver en el panel</a>
</td></tr></table>
</td></tr></table>
</body></html>`;
  const texto = [`${tipo}`, `De ${deQuien}`, opinion.desde ? `Desde ${pagina}` : "", "", opinion.mensaje, "", `Panel: ${panel}`]
    .filter((l, i) => l || i > 2)
    .join("\n");
  try {
    const ok = await sendSingle({ from: FROM, to: para, subject: `${mercado ? `[CalcularYa ${mercado.toUpperCase()}] ` : ""}Opinión nueva: ${resumen}`, html, text: texto });
    if (!ok) console.error("[opiniones] Resend rechazó el aviso");
  } catch (e) {
    console.error("[opiniones] no pude mandar el aviso", e);
  }
}
