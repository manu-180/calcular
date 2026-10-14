// Flujo de compra de las ofertas de calcularya.com con PayPal y la base simulados (ningún pedido sale
// a la red): checkout con los números de la calculadora → ca_checkouts.datos → vuelta → mail →
// entrega. Prueba lo que el sandbox no deja probar sin una cuenta compradora:
// - el informe se entrega como enlace a su página (mail, gracias, descarga redirige);
// - la planilla sale con los números de la persona en la hoja de su calculadora (GET con los datos
//   de la base, POST con los del navegador) y sin ellos si la base no tiene la columna;
// - datos de otra calculadora o sin la casilla tildada no viajan.
//
// Correr con: npx tsx scripts/check_flujo_ofertas_intl.ts  (o vía scripts/check-all.ts)

import "./sin-server-only";
import ExcelJS from "exceljs";
import { NextRequest } from "next/server";
import { productoIntlDe } from "../src/lib/pagos/catalogo-intl";
import { bloqueDe } from "../src/lib/pagos/ofertas-servidor";
import * as rutaCheckout from "../src/app/api/pagos/checkout/route";
import * as rutaVuelta from "../src/app/api/pagos/paypal/vuelta/route";
import * as rutaDescarga from "../src/app/api/pagos/descarga/route";
import * as rutaOfertas from "../src/app/api/pagos/ofertas/[mercado]/route";
import { registro } from "../src/paises";
import { hoyEn } from "../src/motor/vigencia";
import { parsearEntrada, valoresIniciales } from "../src/motor/formulario";

async function main() {
  process.env.PAYPAL_CLIENT_ID = "cliente-de-prueba";
  process.env.PAYPAL_CLIENT_SECRET = "secreto-de-prueba";
  process.env.PAYPAL_WEBHOOK_ID = "WH-PRUEBA";
  process.env.PAYPAL_ENV = "live";
  process.env.NEXT_PUBLIC_SITIO_INTL_URL = "https://calcularya.com";
  process.env.SUPABASE_URL = "https://base.prueba";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "rol-de-servicio-de-prueba";
  process.env.RESEND_API_KEY = "re_prueba";
  delete process.env.NEXT_PUBLIC_CUENTAS_ACTIVAS;
  delete process.env.VERCEL_ENV;
  delete process.env.PAGOS_INTL_PROVEEDOR;

  let fallas = 0;
  const check = (nombre: string, cond: boolean, detalle?: unknown) => {
    if (cond) console.log(`OK   ${nombre}`);
    else {
      fallas++;
      console.error(`FAIL ${nombre}`, detalle ?? "");
    }
  };

  // ─── Simulación de PayPal, la base y Resend ────────────────────────────────────────────────
  const ordenes = new Map<string, { unidad: { custom_id: string; amount: { value: string; currency_code: string } }; captura: string | null }>();
  const checkouts = new Map<string, Record<string, unknown>>();
  const revenue: { id: number; note: string }[] = [];
  const mails: { subject: string; html: string }[] = [];
  let sinColumnaDatos = false;
  let n = 0;
  const json = (c: unknown, status = 200) => new Response(JSON.stringify(c), { status, headers: { "Content-Type": "application/json" } });
  const captura = (id: string, o: { unidad: { custom_id: string; amount: { value: string; currency_code: string } } }, orden: string) => ({
    id,
    status: "COMPLETED",
    amount: o.unidad.amount,
    custom_id: o.unidad.custom_id,
    create_time: `${hoyEn(registro.pais("mx")!.mercado)}T15:00:00Z`,
    supplementary_data: { related_ids: { order_id: orden } },
  });
  globalThis.fetch = (async (entrada: string | URL | Request, init?: RequestInit) => {
    const url = new URL(typeof entrada === "string" ? entrada : entrada instanceof URL ? entrada.href : entrada.url);
    const metodo = (init?.method ?? "GET").toUpperCase();
    const body = typeof init?.body === "string" ? init.body : "";
    const headers = new Headers(init?.headers);
    if (url.origin === "https://api-m.paypal.com") {
      if (url.pathname === "/v1/oauth2/token") return json({ access_token: "t", expires_in: 32400 });
      if (url.pathname === "/v2/checkout/orders" && metodo === "POST") {
        const id = `ORDEN${String(++n).padStart(10, "0")}`;
        ordenes.set(id, { unidad: JSON.parse(body).purchase_units[0], captura: null });
        return json({ id, status: "PAYER_ACTION_REQUIRED", links: [{ rel: "payer-action", href: `https://www.paypal.com/checkoutnow?token=${id}` }] }, 201);
      }
      let m = /^\/v2\/checkout\/orders\/([A-Z0-9]+)\/capture$/.exec(url.pathname);
      if (m) {
        const o = ordenes.get(m[1])!;
        if (o.captura) return json({ details: [{ issue: "ORDER_ALREADY_CAPTURED" }] }, 422);
        o.captura = `CAP${String(n).padStart(14, "0")}`;
        return json({ id: m[1], status: "COMPLETED", payer: { email_address: "compradora@example.com" }, purchase_units: [{ custom_id: o.unidad.custom_id, payments: { captures: [captura(o.captura, o, m[1])] } }] }, 201);
      }
      m = /^\/v2\/checkout\/orders\/([A-Z0-9]+)$/.exec(url.pathname);
      if (m) {
        const o = ordenes.get(m[1])!;
        return json({ id: m[1], status: "COMPLETED", payer: { email_address: "compradora@example.com" }, purchase_units: [{ custom_id: o.unidad.custom_id, payments: { captures: [captura(o.captura!, o, m[1])] } }] });
      }
      m = /^\/v2\/payments\/captures\/([A-Z0-9]+)$/.exec(url.pathname);
      if (m) {
        const e = [...ordenes].find(([, o]) => o.captura === m![1]);
        return e ? json(captura(m[1], e[1], e[0])) : json({}, 404);
      }
    }
    if (url.origin === "https://base.prueba") {
      if (url.pathname === "/rest/v1/rpc/ca_limite") return json(true);
      if (url.pathname === "/rest/v1/ca_checkouts" && metodo === "POST") {
        const fila = JSON.parse(body) as Record<string, unknown>;
        if (sinColumnaDatos && "datos" in fila) return json({ code: "PGRST204", message: "Could not find the 'datos' column" }, 400);
        checkouts.set(String(fila.id), fila);
        return new Response(null, { status: 201 });
      }
      if (url.pathname === "/rest/v1/ca_checkouts" && metodo === "GET") {
        const id = (url.searchParams.get("id") ?? "").replace("eq.", "");
        const fila = checkouts.get(id);
        const r = fila && `eq.${fila.producto}` === url.searchParams.get("producto") ? { datos: fila.datos ?? null } : null;
        return (headers.get("accept") ?? "").includes("vnd.pgrst.object") ? (r ? json(r) : json({ code: "PGRST116" }, 406)) : json(r ? [r] : []);
      }
      if (url.pathname === "/rest/v1/revenue_events") {
        if (metodo === "GET") {
          const marca = decodeURIComponent((url.searchParams.get("note") ?? "").replace(/^ilike\.\*|\*$/g, ""));
          const id = url.searchParams.get("id");
          if (id) return json(revenue.filter((r) => `eq.${r.id}` === id).map((r) => ({ note: r.note })));
          return json(revenue.filter((r) => r.note.includes(marca)).map((r) => ({ id: r.id })));
        }
        if (metodo === "POST") {
          const fila = { id: revenue.length + 1, ...(JSON.parse(body) as { note: string }) };
          revenue.push(fila);
          return json([fila], 201);
        }
        if (metodo === "PATCH") return new Response(null, { status: 204 });
      }
    }
    if (url.origin === "https://api.resend.com") {
      mails.push(JSON.parse(body));
      return json({ id: "mail" });
    }
    throw new Error(`check_flujo_ofertas_intl: pedido sin simular ${metodo} ${url.href}`);
  }) as typeof fetch;

  // Una IP por pedido: el cupo de entregas por IP es real y acá no se prueba.
  let ipN = 0;
  const ip = () => ({ "x-forwarded-for": `203.0.113.${++ipN}`, origin: "https://calcularya.com" });
  const tic = () => new Promise((r) => setTimeout(r, 30));
  const comprar = async (producto: string, datos: unknown, usar = true) => {
    const form = new URLSearchParams({ p: producto, email: "compradora@example.com", sitio: "" });
    if (usar) form.set("usar_datos", "1");
    if (datos !== undefined) form.set("datos", JSON.stringify(datos));
    const r = await rutaCheckout.POST(new NextRequest("https://calcularya.com/api/pagos/checkout", { method: "POST", headers: ip(), body: form }));
    await tic();
    const orden = new URL(r.headers.get("location") ?? "https://x").searchParams.get("token") ?? "";
    const ref = ordenes.get(orden)?.unidad.custom_id ?? "";
    return { r, orden, checkoutId: ref.split(":")[1] ?? "" };
  };
  const volver = async (producto: { mercado: string; slug: string }, orden: string) => {
    const v = await rutaVuelta.GET(new NextRequest(`https://calcularya.com/api/pagos/paypal/vuelta?m=${producto.mercado}&p=${producto.slug}&token=${orden}&PayerID=X`, { headers: ip() }));
    return { v, cap: ordenes.get(orden)?.captura ?? "" };
  };

  const entradaDe = (slug: string, cambios: Record<string, string>) => {
    const p = registro.pagina("mx", slug, hoyEn(registro.pais("mx")!.mercado), "produccion")!;
    const def = registro.calculadora("mx", slug)!.definicion;
    const crudos = { ...valoresIniciales(def.campos, p.props.contexto, p.props.opcionesDinamicas), ...cambios };
    const e = parsearEntrada(def.campos, crudos, p.props.contexto, p.props.opcionesDinamicas);
    if (!e.ok) throw new Error(`entrada de prueba inválida para ${slug}: ${JSON.stringify(e.errores)}`);
    return e.entrada;
  };

  // ─── Ofertas por país ──────────────────────────────────────────────────────────────────────
  const of = await rutaOfertas.GET(new Request("https://calcularya.com/api/pagos/ofertas/mx"), { params: Promise.resolve({ mercado: "mx" }) });
  const cuerpo = (await of.json()) as { activa: boolean; porCalculadora: Record<string, { ofertas: { producto: string }[] }> };
  check("ofertas mx: venta activa y el finiquito ofrece primero el informe de liquidación", cuerpo.activa && cuerpo.porCalculadora["mx.finiquito"]?.ofertas[0]?.producto === "mx/informe-liquidacion");
  check("ofertas: van por CDN", (of.headers.get("cache-control") ?? "").includes("s-maxage"));
  const of404 = await rutaOfertas.GET(new Request("https://calcularya.com/api/pagos/ofertas/__proto__"), { params: Promise.resolve({ mercado: "__proto__" }) });
  check("ofertas de un mercado inventado: 404", of404.status === 404);

  // ─── Informe ───────────────────────────────────────────────────────────────────────────────
  const informe = productoIntlDe("mx", "informe-liquidacion")!;
  const datosFiniquito = { calc: "finiquito", entrada: entradaDe("finiquito", { sueldo: "18500", ingreso: "2021-03-01" }) };
  const c1 = await comprar(informe.id, datosFiniquito);
  check("checkout del informe: orden de USD 9 con la referencia del informe", ordenes.get(c1.orden)?.unidad.amount.value === "9.00" && /^mx\/informe-liquidacion:/.test(ordenes.get(c1.orden)?.unidad.custom_id ?? ""));
  check("checkout del informe: los datos validados quedan en ca_checkouts", JSON.stringify(checkouts.get(c1.checkoutId)?.datos) === JSON.stringify(datosFiniquito), checkouts.get(c1.checkoutId));
  check("checkout: fila intl con sitio y mercado", checkouts.get(c1.checkoutId)?.sitio === "intl" && checkouts.get(c1.checkoutId)?.mercado === "mx");
  const v1 = await volver(informe, c1.orden);
  check("vuelta del informe: a gracias", (v1.v.headers.get("location") ?? "").includes(`/mx/planillas/gracias?proveedor=paypal&pago=${v1.cap}`), v1.v.headers.get("location"));
  const mail = mails.at(-1);
  check(
    "mail del informe: enlace permanente a su página, no a una descarga",
    !!mail && mail.html.includes(`/mx/informes/informe-liquidacion/ver?proveedor=paypal&pago=${v1.cap}`) && !mail.html.includes("/api/pagos/descarga") && mail.html.includes("Abrir mi informe"),
  );
  const d1 = await rutaDescarga.GET(new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${v1.cap}`, { headers: ip() }));
  check("descarga de un informe: 303 a su página", d1.status === 303 && (d1.headers.get("location") ?? "").includes(`/mx/informes/informe-liquidacion/ver?proveedor=paypal&pago=${v1.cap}`));

  const c2 = await comprar(informe.id, { calc: "isr", entrada: datosFiniquito.entrada });
  check("checkout con datos de una calculadora de otra familia: se cobra, los datos no viajan", c2.r.status === 303 && !checkouts.get(c2.checkoutId)?.datos);
  const c3 = await comprar(informe.id, datosFiniquito, false);
  check("checkout sin la casilla tildada: los datos no viajan", c3.r.status === 303 && !checkouts.get(c3.checkoutId)?.datos);

  // ─── Planilla con datos ────────────────────────────────────────────────────────────────────
  const planilla = productoIntlDe("mx", "sueldo-y-liquidacion")!;
  const bloque = bloqueDe(planilla, "sueldo-neto");
  check("la planilla de México tiene la hoja de sueldo neto en el mapa", !!bloque);
  const datosSueldo = { calc: "sueldo-neto", entrada: entradaDe("sueldo-neto", { sueldo: "23456" }) };
  const leerCelda = async (res: Response) => {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load((await res.arrayBuffer()) as ArrayBuffer);
    const ws = wb.getWorksheet(bloque!.hoja)!;
    return { sueldo: ws.getCell(bloque!.celdas.sueldo.ref).value, activa: wb.worksheets[wb.views?.[0]?.activeTab ?? 0]?.name };
  };
  const c4 = await comprar(planilla.id, datosSueldo);
  const v4 = await volver(planilla, c4.orden);
  const d4 = await rutaDescarga.GET(new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${v4.cap}`, { headers: ip() }));
  const x4 = await leerCelda(d4);
  check("descarga GET: la planilla sale con el sueldo de la persona en su hoja", d4.status === 200 && x4.sueldo === 23456, x4);
  check("descarga GET: el archivo abre en la hoja de su calculadora", x4.activa === bloque!.hoja, x4.activa);

  sinColumnaDatos = true;
  const c5 = await comprar(planilla.id, datosSueldo);
  check("sin la columna datos: el checkout se guarda igual, sin datos", !!checkouts.get(c5.checkoutId) && !("datos" in checkouts.get(c5.checkoutId)!));
  const v5 = await volver(planilla, c5.orden);
  const d5 = await rutaDescarga.GET(new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${v5.cap}`, { headers: ip() }));
  const x5 = await leerCelda(d5);
  check("sin datos en la base: sale la planilla con el valor de ejemplo", d5.status === 200 && x5.sueldo !== 23456, x5);
  const d6 = await rutaDescarga.POST(
    new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${v5.cap}`, { method: "POST", headers: ip(), body: new URLSearchParams({ datos: JSON.stringify(datosSueldo) }) }),
  );
  const x6 = await leerCelda(d6);
  check("descarga POST con los datos del navegador: la planilla sale con ellos", d6.status === 200 && x6.sueldo === 23456, x6);
  const d7 = await rutaDescarga.POST(
    new NextRequest(`https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=${v5.cap}`, { method: "POST", headers: ip(), body: new URLSearchParams({ datos: '{"calc":"sueldo-neto","entrada":{"sueldo":"<script>"}}' }) }),
  );
  const x7 = await leerCelda(d7);
  check("descarga POST con datos basura: la planilla sale sin ellos, no se cae", d7.status === 200 && x7.sueldo !== "<script>");
  const d8 = await rutaDescarga.POST(new NextRequest("https://calcularya.com/api/pagos/descarga?proveedor=paypal&pago=CAP99999999999999", { method: "POST", headers: ip(), body: new URLSearchParams({ datos: JSON.stringify(datosSueldo) }) }));
  check("descarga POST de un pago inexistente: 403, los datos no abren nada", d8.status === 403);

  console.log(fallas ? `\n${fallas} FALLAS` : "\nTODO OK check_flujo_ofertas_intl");
  process.exit(fallas ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
