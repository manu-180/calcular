// Rutas del backend que cobran, entregan o escriben a terceros, probadas de punta a punta con la red
// simulada: el webhook de MercadoPago (firma, IPN viejo, rate limit, entrega con reintento y
// destino de respaldo, GET cerrado), el alta y la baja del newsletter, los crons sin CRON_SECRET y
// el índice único de revenue_events sobre PGlite.
//
// Correr con: npx tsx scripts/check_backend_seguridad.ts  (o vía scripts/check-all.ts)

import "./sin-server-only";
import "./entorno-check-pagos";
import { readFileSync } from "node:fs";
import path from "node:path";
import { NextRequest } from "next/server";
import { PGlite } from "@electric-sql/pglite";
import * as webhook from "../src/app/api/mp/webhook/route";
import * as subscribe from "../src/app/api/subscribe/route";
import * as unsubscribe from "../src/app/api/unsubscribe/route";
import * as newsletter from "../src/app/api/cron/newsletter/route";
import * as recuperar from "../src/app/api/cron/recuperar-compras/route";
import * as mantenimiento from "../src/app/api/cron/panel-mantenimiento/route";
import { firmar, manifiesto } from "../src/lib/mp-webhook";
import type { MpPayment } from "../src/lib/mp";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const SECRET = "secreto-webhook-de-prueba";
const TOKEN_LEGADO = "APP_USR-token-legado";
const UUID = "00000000-0000-4000-8000-000000000001";

let limiteOk = true;
const limites: string[] = [];
const pagosActual: Record<string, MpPayment> = {};
const pagosLegado: Record<string, MpPayment> = {};
let consultasMp = 0;
const revenue: { id: number; note: string; amount: number }[] = [];
const mails: { to: string[]; subject: string }[] = [];
let rebotes: (to: string) => boolean = () => false;
let fallasResend = 0;
const subscribers: { email: string; source: string; token: string; active: boolean }[] = [];
let altaSubscriber: Record<string, unknown> | null = null;

const json = (cuerpo: unknown, status = 200) => new Response(JSON.stringify(cuerpo), { status, headers: { "Content-Type": "application/json" } });

globalThis.fetch = (async (entrada: string | URL | Request, init?: RequestInit) => {
  const url = new URL(typeof entrada === "string" ? entrada : entrada instanceof URL ? entrada.href : entrada.url);
  const metodo = (init?.method ?? "GET").toUpperCase();
  const headers = new Headers(init?.headers);
  const body = typeof init?.body === "string" ? init.body : "";

  if (url.origin === "https://base.prueba") {
    if (url.pathname === "/rest/v1/rpc/ca_limite") {
      limites.push((JSON.parse(body) as { p_clave: string }).p_clave);
      return json(limiteOk);
    }
    if (url.pathname === "/rest/v1/revenue_events") {
      if (metodo === "GET") {
        const id = url.searchParams.get("id");
        if (id) return json(revenue.filter((r) => `eq.${r.id}` === id).map((r) => ({ note: r.note })));
        const marca = decodeURIComponent((url.searchParams.get("note") ?? "").replace(/^ilike\.\*|\*$/g, ""));
        return json(revenue.filter((r) => r.note.includes(marca)).map((r) => ({ id: r.id })));
      }
      if (metodo === "POST") {
        const fila = { id: revenue.length + 1, ...(JSON.parse(body) as { note: string; amount: number }) };
        revenue.push(fila);
        return json([fila], 201);
      }
      if (metodo === "PATCH") {
        const fila = revenue.find((r) => `eq.${r.id}` === url.searchParams.get("id"));
        if (fila) fila.note = (JSON.parse(body) as { note: string }).note;
        return new Response(null, { status: 204 });
      }
    }
    if (url.pathname === "/rest/v1/subscribers") {
      if (metodo === "POST") {
        altaSubscriber = JSON.parse(body);
        return new Response(null, { status: 201 });
      }
      if (metodo === "PATCH") {
        const token = (url.searchParams.get("unsubscribe_token") ?? "").replace(/^eq\./, "");
        const filas = subscribers.filter((s) => s.token === token);
        for (const s of filas) s.active = false;
        return json(filas.map((_, i) => ({ id: i + 1 })));
      }
    }
  }
  if (url.origin === "https://api.mercadopago.com") {
    const m = /^\/v1\/payments\/(\d+)$/.exec(url.pathname);
    if (m) {
      consultasMp++;
      const mapa = headers.get("authorization") === `Bearer ${TOKEN_LEGADO}` ? pagosLegado : pagosActual;
      return mapa[m[1]] ? json(mapa[m[1]]) : json({ message: "not found" }, 404);
    }
  }
  if (url.origin === "https://api.resend.com" && url.pathname === "/emails") {
    const mail = JSON.parse(body) as { to: string[]; subject: string };
    mails.push(mail);
    if (fallasResend > 0) {
      fallasResend--;
      return json({ message: "caído" }, 500);
    }
    return rebotes(mail.to[0]) ? json({ message: "rechazado" }, 422) : json({ id: "mail" });
  }
  throw new Error(`check_backend_seguridad: pedido sin simular ${metodo} ${url.href}`);
}) as typeof fetch;

const aprobado = (id: string, extra: Partial<MpPayment> = {}): MpPayment => ({
  id: Number(id),
  status: "approved",
  transaction_amount: 14900,
  currency_id: "ARS",
  external_reference: `planilla-uocra:${UUID}`,
  metadata: { producto: "planilla-uocra", precio: "14900" },
  payer: { email: "mp@example.com" },
  ...extra,
});

function aviso(qs: string, firma: "buena" | "mala" | "ninguna" | "basura" = "buena", id = "") {
  const h: Record<string, string> = { "x-forwarded-for": "203.0.113.9", "x-request-id": "req-1" };
  const ts = "1760000000";
  if (firma === "buena") h["x-signature"] = `ts=${ts},v1=${firmar(manifiesto(id, "req-1", ts), SECRET)}`;
  if (firma === "mala") h["x-signature"] = `ts=${ts},v1=${firmar(manifiesto(id, "req-1", ts), "otro-secreto")}`;
  if (firma === "basura") h["x-signature"] = "ts=1,v1=deadbeef";
  return new NextRequest(`https://calcular.ar/api/mp/webhook${qs}`, { method: "POST", headers: h, body: "" });
}

async function main() {
  process.env.MP_WEBHOOK_SECRET = SECRET;

  // ─── Webhook de MercadoPago ──────────────────────────────────────────────────────────────
  pagosActual["111"] = aprobado("111");
  let n = consultasMp;
  const ipn = await webhook.POST(aviso("?topic=payment&id=111", "basura"));
  check("IPN viejo con x-signature no validable: 200 sin procesar ni consultar a MP", ipn.status === 200 && consultasMp === n && revenue.length === 0, ipn.status);
  const sinFirma = await webhook.POST(aviso("?data.id=111&type=payment", "ninguna"));
  check("aviso sin x-signature: 200 sin procesar", sinFirma.status === 200 && consultasMp === n && revenue.length === 0, sinFirma.status);
  const mala = await webhook.POST(aviso("?data.id=111&type=payment", "mala", "111"));
  check("firma presente que no cierra: 401", mala.status === 401 && revenue.length === 0, mala.status);
  check("el webhook pasa por el rate limit por IP", limites.some((k) => k.startsWith("mp-webhook:")));

  fallasResend = 1;
  const buena = await webhook.POST(aviso("?data.id=111&type=payment", "buena", "111"));
  const jb = (await buena.json()) as { registrado?: boolean; entregado?: boolean };
  check("firma válida: asienta la venta", buena.status === 200 && jb.registrado === true && revenue.length === 1, jb);
  check("Resend cae una vez: se reintenta y la entrega llega", jb.entregado === true && mails.filter((m) => m.to[0] === "mp@example.com").length === 2 && revenue[0].note.includes("Entregado por email"));
  const repetida = await webhook.POST(aviso("?data.id=111&type=payment", "buena", "111"));
  check("la misma notificación otra vez: sin venta ni mail nuevos", repetida.status === 200 && revenue.length === 1 && mails.length === 2);

  pagosActual["222"] = aprobado("222", { metadata: { producto: "planilla-uocra", precio: "14900", email: "form@example.com" } });
  rebotes = (to) => to === "mp@example.com";
  const respaldo = await webhook.POST(aviso("?data.id=222&type=payment", "buena", "222"));
  const jr = (await respaldo.json()) as { entregado?: boolean };
  check("el mail de MP rebota: la entrega sale al mail del formulario", jr.entregado === true && mails.at(-1)?.to[0] === "form@example.com", mails.at(-1));

  pagosActual["333"] = aprobado("333");
  rebotes = (to) => to !== "manunv97@gmail.com";
  const errores: string[] = [];
  const errorOriginal = console.error;
  console.error = (...a: unknown[]) => {
    errores.push(a.map(String).join(" "));
    errorOriginal(...a);
  };
  const perdida = await webhook.POST(aviso("?data.id=333&type=payment", "buena", "333"));
  console.error = errorOriginal;
  const jp = (await perdida.json()) as { entregado?: boolean };
  const fila333 = revenue.find((r) => r.note.includes("[mp:333]"));
  check("todo rebota: entregado false y la venta igual queda asentada", perdida.status === 200 && jp.entregado === false && !!fila333);
  check("log claro «ENTREGA POR EMAIL FALLÓ» con el payment_id", errores.some((e) => e.includes("ENTREGA POR EMAIL FALLÓ") && e.includes("333")));
  check("los logs de error no llevan el mail entero del comprador", !errores.some((e) => e.includes("mp@example.com")));
  check("sale el aviso de entrega fallida al admin", mails.some((m) => m.to.includes("manunv97@gmail.com") && m.subject.includes("333")));
  check("la nota de la venta marca el fallo para reenviar a mano", (fila333?.note ?? "").includes("ENTREGA POR EMAIL FALLÓ"));
  rebotes = () => false;

  limiteOk = false;
  const tope = await webhook.POST(aviso("?data.id=111&type=payment", "buena", "111"));
  check("fuera de cupo: 429 sin consultar a MP", tope.status === 429);
  limiteOk = true;

  const salud = await webhook.GET();
  check("GET del webhook sin sesión de admin: 404 sin publicar la config", salud.status === 404 && !(await salud.text()).includes("mpToken"));

  // Cuenta legado: sus avisos nunca tuvieron firma y se siguen aceptando.
  process.env.MP_ACCESS_TOKEN_LEGADO = TOKEN_LEGADO;
  pagosLegado["444"] = aprobado("444", { external_reference: `planilla-comercio:${UUID}`, metadata: { producto: "planilla-comercio" } });
  const leg = await webhook.POST(aviso("?topic=payment&id=444", "ninguna"));
  check("IPN de un pago de la cuenta legado: se procesa como antes", leg.status === 200 && revenue.some((r) => r.note.includes("[mp:444]")));
  n = revenue.length;
  const actualSinFirma = await webhook.POST(aviso("?topic=payment&id=111", "ninguna"));
  check("IPN de un pago de la cuenta nueva con legado configurado: 200 sin procesar", actualSinFirma.status === 200 && revenue.length === n);
  delete process.env.MP_ACCESS_TOKEN_LEGADO;
  delete process.env.MP_WEBHOOK_SECRET;

  // ─── Alta al newsletter ──────────────────────────────────────────────────────────────────
  const alta = (cuerpo: unknown, ip = "198.51.100.1") =>
    subscribe.POST(new NextRequest("https://calcular.ar/api/subscribe", { method: "POST", headers: { "x-forwarded-for": ip, "content-type": "application/json" }, body: JSON.stringify(cuerpo) }));
  check("subscribe con email array: 400, no 500", (await alta({ email: ["a@b.com"] })).status === 400);
  check("subscribe con email numérico: 400", (await alta({ email: 5 })).status === 400);
  check("subscribe con cuerpo que no es objeto: 400", (await alta("hola")).status === 400);
  check("subscribe con email inválido: 400", (await alta({ email: "no-es-mail" })).status === 400);
  const ok = await alta({ email: " Ana@Example.com ", source: "x".repeat(200) });
  check(
    "subscribe válido: 200, email normalizado y source cortado a 80",
    ok.status === 200 && altaSubscriber?.email === "ana@example.com" && String(altaSubscriber?.source).length === 80,
    altaSubscriber,
  );
  check("subscribe pasa por el rate limit por IP", limites.some((k) => k.startsWith("subscribe:")));
  limiteOk = false;
  check("subscribe fuera de cupo: 429", (await alta({ email: "b@example.com" })).status === 429);
  limiteOk = true;

  // ─── Baja del newsletter ─────────────────────────────────────────────────────────────────
  const TOKEN = "11111111-2222-4333-8444-555555555555";
  subscribers.push({ email: "c@example.com", source: "x", token: TOKEN, active: true });
  const vista = await unsubscribe.GET(new NextRequest(`https://calcular.ar/api/unsubscribe?t=${TOKEN}`));
  const htmlVista = await vista.text();
  check("GET de la baja sólo pregunta: no da de baja (los escáneres de correo abren los links)", vista.status === 200 && subscribers[0].active && htmlVista.includes('method="post"'));
  check("la página de baja no tiene rayas ni emojis", !/[–—]/.test(htmlVista) && !/\p{Extended_Pictographic}/u.test(htmlVista));
  const unClick = await unsubscribe.POST(
    new NextRequest(`https://calcular.ar/api/unsubscribe?t=${TOKEN}`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: "List-Unsubscribe=One-Click" }),
  );
  check("POST one-click (RFC 8058): da de baja", unClick.status === 200 && !subscribers[0].active);
  const malo = await unsubscribe.POST(new NextRequest("https://calcular.ar/api/unsubscribe?t=no-es-uuid", { method: "POST" }));
  check("POST con token inválido: 400", malo.status === 400);
  const desconocido = await unsubscribe.POST(new NextRequest("https://calcular.ar/api/unsubscribe?t=99999999-2222-4333-8444-555555555555", { method: "POST" }));
  check("POST con un token que no existe: 400", desconocido.status === 400);

  // ─── Crons sin CRON_SECRET ───────────────────────────────────────────────────────────────
  const cron = (h: Record<string, string>) => new NextRequest("https://calcular.ar/api/cron/x", { headers: h });
  delete process.env.CRON_SECRET;
  for (const [nombre, ruta] of [["newsletter", newsletter], ["recuperar-compras", recuperar], ["panel-mantenimiento", mantenimiento]] as const) {
    check(`${nombre} sin CRON_SECRET no deja pasar «Bearer undefined»`, (await ruta.GET(cron({ authorization: "Bearer undefined" }))).status === 401);
  }
  process.env.CRON_SECRET = "s3creto";
  check("cron con otro secreto: 401", (await newsletter.GET(cron({ authorization: "Bearer otro" }))).status === 401);
  check("cron con el secreto correcto pasa el gate", (await mantenimiento.GET(cron({ authorization: "Bearer s3creto" }))).status !== 401);
  delete process.env.CRON_SECRET;

  // ─── Índice único de revenue_events (migración 20261013120000) ──────────────────────────
  const db = new PGlite();
  await db.exec("create table public.revenue_events (id bigserial primary key, project_slug text, source text, amount numeric, currency text, note text)");
  const sql = readFileSync(path.join(process.cwd(), "supabase", "migrations", "20261013120000_revenue_events_venta_unica.sql"), "utf8");
  await db.exec(sql);
  await db.exec(sql);
  const insertar = async (note: string, amount: number) => {
    try {
      await db.query("insert into public.revenue_events (project_slug, source, amount, currency, note) values ('p', 's', $1, 'ARS', $2)", [amount, note]);
      return "ok";
    } catch (e) {
      return (e as { code?: string }).code ?? "error";
    }
  };
  check("migración re-ejecutable y primera venta entra", (await insertar("Venta [mp:123] · producto x", 14900)) === "ok");
  check("la misma venta otra vez: unique_violation", (await insertar("Venta [mp:123] · otra nota", 14900)) === "23505");
  check("un pago que empieza igual no choca", (await insertar("Venta [mp:1234]", 14900)) === "ok");
  check("su devolución entra", (await insertar("Reembolso [mp-devuelto:123] · descuenta la venta del pago 123.", -14900)) === "ok");
  check("la devolución repetida choca", (await insertar("Reembolso [mp-devuelto:123]", -14900)) === "23505");
  check("venta intl entra", (await insertar("Venta [paypal:ABC123DEF456] · mercado mx", 9)) === "ok");
  check(
    "la devolución intl que nombra la marca de su venta no choca con la venta",
    (await insertar("Reembolso [paypal-devuelto:ABC123DEF456] · descuenta la venta [paypal:ABC123DEF456].", -9)) === "ok",
  );
  check("la venta intl repetida choca", (await insertar("Venta [paypal:ABC123DEF456]", 9)) === "23505");
  check("filas sin marca (cargas a mano) no se tocan", (await insertar("Carga manual", 100)) === "ok" && (await insertar("Carga manual", 100)) === "ok");
  await db.close();

  console.log(fallas === 0 ? "\nTODO OK check_backend_seguridad" : `\n${fallas} FALLAS check_backend_seguridad`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("check_backend_seguridad se cortó:", e);
  process.exit(1);
});
