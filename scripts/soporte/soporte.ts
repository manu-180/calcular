// CLI del agente de soporte (lo usa el claude que lanza scripts/soporte/despachar.ps1).
//
//   envkit run -- npx tsx scripts/soporte/soporte.ts <comando> [args]
//
//   sincronizar                         trae de Resend lo recibido que el webhook no guardó
//   pendientes                          JSON con los hilos a atender, sus mensajes y las compras del cliente
//   tomar <hilo>                        marca en_proceso (otro tick no lo agarra)
//   adjuntos <hilo> <carpeta>           baja los adjuntos de los mensajes entrantes del hilo
//   responder <hilo> <cuerpo.md> [--marca ar|intl] [--idioma xx] [--adjunto ruta]...
//   escalar <hilo> <motivo.md>          mail a Manuel con el hilo entero; estado escalado
//   informar <hilo> <resumen.md>        mail a Manuel sólo para que sepa (deploy, cambio); no cambia estado
//   nota <hilo> <texto>                 nota interna en el hilo
//   cerrar <hilo> [ignorado]            cierra sin responder (spam, robots, gracias sin pregunta)

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { BUZON_SOPORTE, ingerir, traerRecibido } from "../../src/lib/soporte/ingesta";

const RESEND = "https://api.resend.com";
const MANUEL = "manunv97@gmail.com";
const KEY = process.env.RESEND_API_KEY!;
const db = createClient(process.env.SUPABASE_URL!, (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)!, {
  auth: { persistSession: false },
});

const MARCAS = {
  ar: { nombre: "CalculAR", dominio: "calcular.ar", web: "https://calcular.ar", from: `CalculAR <${BUZON_SOPORTE}>` },
  intl: { nombre: "CalcularYa", dominio: "calcularya.com", web: "https://calcularya.com", from: `CalcularYa <${BUZON_SOPORTE}>` },
} as const;
type Marca = keyof typeof MARCAS;

const FIRMA: Record<string, string> = {
  es: "Equipo de soporte",
  pt: "Equipe de suporte",
  en: "Support team",
  fr: "L'équipe support",
  it: "Il team di supporto",
  de: "Support-Team",
};

function arg(nombre: string): string | undefined {
  const i = process.argv.indexOf(`--${nombre}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}
function args(nombre: string): string[] {
  return process.argv.flatMap((a, i) => (a === `--${nombre}` && process.argv[i + 1] ? [process.argv[i + 1]] : []));
}
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Markdown mínimo: párrafos, **negrita**, [texto](url), URLs sueltas y listas con "- ".
function aHtml(md: string): string {
  const inline = (t: string) =>
    esc(t)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" style="color:#059669;">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" style="color:#059669;">$2</a>');
  return md
    .trim()
    .split(/\n\s*\n/)
    .map((b) => {
      const lineas = b.split("\n");
      if (lineas.every((l) => /^\s*[-*] /.test(l)))
        return `<ul style="margin:0 0 16px;padding-left:20px;">${lineas.map((l) => `<li style="margin:4px 0;">${inline(l.replace(/^\s*[-*] /, ""))}</li>`).join("")}</ul>`;
      return `<p style="margin:0 0 16px;">${lineas.map(inline).join("<br>")}</p>`;
    })
    .join("");
}

function plantilla(marca: Marca, cuerpoMd: string, idioma: string): string {
  const m = MARCAS[marca];
  const firma = FIRMA[idioma.slice(0, 2)] ?? FIRMA.en;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
<tr><td style="padding:32px;font-size:15px;line-height:1.6;color:#1f2937;">${aHtml(cuerpoMd)}
<p style="margin:24px 0 0;color:#4b5563;">${esc(firma)}<br><strong style="color:#059669;">${m.nombre}</strong> · <a href="${m.web}" style="color:#6b7280;">${m.dominio}</a></p>
</td></tr></table></td></tr></table></body></html>`;
}

async function resend(path: string, body: unknown): Promise<{ id?: string }> {
  const r = await fetch(`${RESEND}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`Resend ${path}: HTTP ${r.status} ${t}`);
  return JSON.parse(t);
}

async function hilo(id: number) {
  const { data: h, error } = await db.from("ca_soporte_hilos").select("*").eq("id", id).single();
  if (error || !h) throw new Error(`hilo ${id} no existe`);
  const { data: msgs } = await db.from("ca_soporte_mensajes").select("*").eq("hilo_id", id).order("created_at");
  return { h, msgs: msgs ?? [] };
}

async function compras(email: string) {
  const { data: perfiles } = await db.from("ca_perfiles").select("user_id").eq("email", email);
  const ids = (perfiles ?? []).map((p) => p.user_id);
  const filtro = ids.length ? `email.eq.${email},user_id.in.(${ids.join(",")})` : `email.eq.${email}`;
  const { data } = await db
    .from("ca_compras")
    .select("mp_payment_id, producto, monto, moneda, estado, pagado_at")
    .or(filtro)
    .order("pagado_at", { ascending: false });
  return data ?? [];
}

const recortar = (t: string | null, n = 6000) => (t && t.length > n ? `${t.slice(0, n)}\n[…recortado]` : t);

async function sincronizar() {
  const r = await fetch(`${RESEND}/emails/receiving?limit=50`, { headers: { Authorization: `Bearer ${KEY}` } });
  if (!r.ok) throw new Error(`Resend list: HTTP ${r.status}`);
  const { data } = (await r.json()) as { data: { id: string; to: string[] }[] };
  let nuevos = 0;
  for (const e of data) {
    const { data: ya } = await db.from("ca_soporte_mensajes").select("id").eq("resend_id", e.id).maybeSingle();
    if (ya) continue;
    const res = await ingerir(db, await traerRecibido(e.id, KEY));
    if (!res.duplicado) nuevos++;
  }
  console.log(JSON.stringify({ revisados: data.length, nuevos }));
}

async function pendientes() {
  const hace90 = new Date(Date.now() - 90 * 60_000).toISOString();
  const { data: hilos } = await db
    .from("ca_soporte_hilos")
    .select("*")
    .or(`estado.eq.pendiente,and(estado.eq.en_proceso,tomado_at.lt.${hace90})`)
    .order("updated_at")
    .limit(10);
  const salida = [];
  for (const h of hilos ?? []) {
    const { msgs } = await hilo(h.id);
    salida.push({
      hilo: h.id,
      email: h.email,
      nombre: h.nombre,
      asunto: h.asunto,
      estado: h.estado,
      notas: h.notas,
      compras: await compras(h.email),
      mensajes: msgs.map((m) => ({
        direccion: m.direccion,
        fecha: m.created_at,
        de: m.remitente,
        asunto: m.asunto,
        texto: recortar(m.texto ?? (m.html ? m.html.replace(/<[^>]+>/g, " ") : null)),
        adjuntos: m.adjuntos,
        autenticacion: m.autenticacion,
        automatico: m.automatico,
      })),
    });
  }
  console.log(JSON.stringify(salida, null, 2));
}

async function adjuntos(id: number, carpeta: string) {
  const { msgs } = await hilo(id);
  mkdirSync(carpeta, { recursive: true });
  for (const m of msgs.filter((x) => x.direccion === "entrante" && x.resend_id && (x.adjuntos as unknown[]).length)) {
    const r = await fetch(`${RESEND}/emails/receiving/${m.resend_id}/attachments`, { headers: { Authorization: `Bearer ${KEY}` } });
    if (!r.ok) throw new Error(`adjuntos ${m.resend_id}: HTTP ${r.status}`);
    const { data } = (await r.json()) as { data: { filename: string; download_url: string }[] };
    for (const a of data) {
      const bin = Buffer.from(await (await fetch(a.download_url)).arrayBuffer());
      const destino = join(carpeta, basename(a.filename || "adjunto"));
      writeFileSync(destino, bin);
      console.log(destino);
    }
  }
}

async function responder(id: number, archivo: string) {
  const { h, msgs } = await hilo(id);
  const entrantes = msgs.filter((m) => m.direccion === "entrante");
  const ultimo = entrantes[entrantes.length - 1];
  if (!ultimo) throw new Error("el hilo no tiene mensajes entrantes");
  const marca = (arg("marca") as Marca) ?? "ar";
  if (!(marca in MARCAS)) throw new Error("--marca ar|intl");
  const idioma = arg("idioma") ?? h.idioma ?? "es";
  const md = readFileSync(archivo, "utf8");
  const refs = [ultimo.referencias, ultimo.message_id].filter(Boolean).join(" ").trim();
  const asunto = /^re:/i.test(h.asunto ?? "") ? h.asunto : `Re: ${h.asunto ?? MARCAS[marca].nombre}`;
  const adj = args("adjunto").map((p) => ({ filename: basename(p), content: readFileSync(p).toString("base64") }));
  const envio = await resend("/emails", {
    from: MARCAS[marca].from,
    to: [h.email],
    reply_to: BUZON_SOPORTE,
    subject: asunto,
    html: plantilla(marca, md, idioma),
    text: md,
    headers: ultimo.message_id ? { "In-Reply-To": ultimo.message_id, References: refs } : undefined,
    attachments: adj.length ? adj : undefined,
  });
  await db.from("ca_soporte_mensajes").insert({
    hilo_id: id,
    direccion: "saliente",
    resend_id: envio.id ?? null,
    in_reply_to: ultimo.message_id,
    referencias: refs,
    remitente: MARCAS[marca].from,
    destinatarios: [h.email],
    asunto,
    texto: md,
    adjuntos: adj.map((a) => ({ nombre: a.filename })),
  });
  await db.from("ca_soporte_hilos").update({ estado: "respondido", idioma, updated_at: new Date().toISOString() }).eq("id", id);
  console.log(JSON.stringify({ ok: true, resend_id: envio.id }));
}

async function aManuel(id: number, archivo: string, tipo: "escalado" | "informe") {
  const { h, msgs } = await hilo(id);
  const motivo = readFileSync(archivo, "utf8");
  const historial = msgs
    .map((m) => `<div style="border-left:3px solid ${m.direccion === "entrante" ? "#f59e0b" : "#059669"};padding:8px 12px;margin:12px 0;background:#f9fafb;">
<div style="font-size:12px;color:#6b7280;">${esc(m.direccion)} · ${esc(m.remitente ?? "")} · ${esc(new Date(m.created_at).toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }))}</div>
<div style="white-space:pre-wrap;font-size:14px;">${esc(recortar(m.texto, 4000) ?? "(sin texto)")}</div></div>`)
    .join("");
  const titulo = tipo === "escalado" ? "Necesito que intervengas" : "Para que sepas";
  const cmp = await compras(h.email);
  const html = `<div style="font-family:system-ui,sans-serif;max-width:680px;margin:auto;color:#1f2937;">
<h2 style="color:${tipo === "escalado" ? "#b45309" : "#059669"};">${titulo} · hilo #${id}</h2>
<p><strong>Cliente:</strong> ${esc(h.nombre ?? "")} &lt;${esc(h.email)}&gt;<br><strong>Asunto:</strong> ${esc(h.asunto ?? "")}</p>
${cmp.length ? `<p><strong>Compras:</strong><br>${cmp.map((c) => `${esc(c.producto)} · ${c.moneda} ${c.monto} · ${esc(c.estado)} · MP ${esc(c.mp_payment_id)} · ${esc(String(c.pagado_at).slice(0, 10))}`).join("<br>")}</p>` : "<p><strong>Compras:</strong> ninguna con ese mail.</p>"}
<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;">${aHtml(motivo)}</div>
<h3>Conversación</h3>${historial}
<p style="font-size:12px;color:#6b7280;">Si respondés este mail, la respuesta le llega al bot de soporte (no al cliente) y la usa para seguir el caso.</p></div>`;
  await resend("/emails", {
    from: `Soporte CalculAR <${BUZON_SOPORTE}>`,
    to: [MANUEL],
    reply_to: BUZON_SOPORTE,
    subject: `[${tipo === "escalado" ? "Soporte · acción" : "Soporte · info"}] #${id} ${h.asunto ?? h.email}`,
    html,
  });
  await db.from("ca_soporte_mensajes").insert({ hilo_id: id, direccion: "interno", remitente: "agente", asunto: `${tipo}`, texto: motivo });
  if (tipo === "escalado") await db.from("ca_soporte_hilos").update({ estado: "escalado", updated_at: new Date().toISOString() }).eq("id", id);
  console.log(JSON.stringify({ ok: true, tipo }));
}

async function main() {
  const [cmd, a1, a2] = process.argv.slice(2);
  const id = Number(a1);
  switch (cmd) {
    case "sincronizar":
      return sincronizar();
    case "pendientes":
      return pendientes();
    case "tomar":
      await db.from("ca_soporte_hilos").update({ estado: "en_proceso", tomado_at: new Date().toISOString() }).eq("id", id);
      return console.log(JSON.stringify({ ok: true }));
    case "adjuntos":
      return adjuntos(id, a2);
    case "responder":
      return responder(id, a2);
    case "escalar":
      return aManuel(id, a2, "escalado");
    case "informar":
      return aManuel(id, a2, "informe");
    case "nota": {
      // envkit run pasa por cmd.exe, que escapa paréntesis y demás con ^.
      const { h } = await hilo(id);
      const notas = [h.notas, `[${new Date().toISOString().slice(0, 16)}] ${process.argv.slice(4).join(" ").replace(/\^([()&|<>^])/g, "$1")}`].filter(Boolean).join("\n");
      await db.from("ca_soporte_hilos").update({ notas }).eq("id", id);
      return console.log(JSON.stringify({ ok: true }));
    }
    case "cerrar":
      await db.from("ca_soporte_hilos").update({ estado: a2 === "ignorado" ? "ignorado" : "cerrado", updated_at: new Date().toISOString() }).eq("id", id);
      return console.log(JSON.stringify({ ok: true }));
    default:
      console.error("comandos: sincronizar | pendientes | tomar | adjuntos | responder | escalar | informar | nota | cerrar");
      process.exit(2);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
