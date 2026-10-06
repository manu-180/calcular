// Verificación de la entrega de un producto pago (src/lib/entrega.ts) — el tramo HTTP que
// decide si los bytes del .xlsx salen o no. `check_mp_webhook.ts` ya cubre el gate puro
// (`habilitaDescarga`, `productoDePago`); lo que no tenía cobertura es lo que hace la ruta
// CON ese veredicto, que es donde se regala el producto o se rompe la entrega:
//
//   · devolver el archivo con un pago pendiente / de otro producto / por menos plata → regalado
//   · devolver 200 con un cuerpo que no es el .xlsx            → Excel dice "archivo dañado"
//   · perder el alias collection_id del redirect de MP         → compradora sin descarga
//   · filtrar el detalle del error de MP al cliente            → información de más
//
// No se mockea el módulo: `obtenerPago` sale por el `fetch` global y `leerArchivoProducto` lee
// de `private/`, así que alcanza con parchear `globalThis.fetch` y usar el archivo real.
//
// Correr con: npx tsx scripts/check_entrega.ts  (o vía scripts/check-all.ts)

import "./sin-server-only";
import path from "node:path";
import { fileURLToPath } from "node:url";

// leerArchivoProducto resuelve `private/` contra process.cwd(): sin esto el check pasa o falla
// según desde dónde se lo llame.
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));

// obtenerPago exige el token antes de mirar la red. Valor de juguete: la red está parcheada.
process.env.MP_ACCESS_TOKEN = "APP_USR-token-de-prueba-no-es-el-real";

import { readFileSync } from "node:fs";
import ExcelJS from "exceljs";
import { NextRequest } from "next/server";
import { servirArchivoProducto, servirPlanilla } from "../src/lib/entrega";
import { PRODUCTOS, type MpPayment, type Producto } from "../src/lib/mp";
import { PREFILLS } from "../src/lib/prefill";
import type { Prefill } from "../src/lib/prefill/tipos";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const COMERCIO = PRODUCTOS["planilla-comercio"];
const UOCRA = PRODUCTOS["planilla-uocra"];

const pago = (extra: Partial<MpPayment> = {}): MpPayment => ({
  status: "approved",
  transaction_amount: 14900,
  currency_id: "ARS",
  ...extra,
});

// ── MP falso: un id → un pago, o un número = ese status HTTP de error ────────────────
const fetchReal = globalThis.fetch;
let urlsConsultadas: string[] = [];
let pagos: Record<string, MpPayment | number> = {};

globalThis.fetch = (async (input: RequestInfo | URL) => {
  const url = String(input);
  urlsConsultadas.push(url);
  const id = decodeURIComponent(url.split("/v1/payments/")[1] ?? "");
  const guardado = pagos[id];
  if (guardado === undefined) return new Response("Not Found", { status: 404 });
  if (typeof guardado === "number") return new Response("boom", { status: guardado });
  return new Response(JSON.stringify(guardado), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}) as typeof fetch;

async function pedir(producto: Producto, qs: string) {
  urlsConsultadas = [];
  const req = new NextRequest(new URL(`https://calcular.ar${producto.rutaDescarga}${qs}`));
  const res = await servirPlanilla(req, producto);
  return { res, cuerpo: Buffer.from(await res.arrayBuffer()) };
}

/** Firma ZIP: todo .xlsx empieza con "PK\x03\x04". Así se detecta un cuerpo entregado. */
const esXlsx = (b: Buffer) => b.length > 4 && b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03;

async function main() {
  // ── 1. Sin payment_id no se consulta nada a MP ───────────────────────────────────────
  {
    const { res, cuerpo } = await pedir(UOCRA, "");
    check("sin payment_id → 400", res.status === 400, res.status);
    check("sin payment_id no se le pregunta nada a MP", urlsConsultadas.length === 0, urlsConsultadas);
    check("el 400 no entrega bytes del archivo", !esXlsx(cuerpo));
  }

  // ── 2. El pago feliz entrega el archivo, con los headers que lo hacen descargable ─────
  pagos = { "111111": pago({ external_reference: "planilla-uocra:abc" }) };
  {
    const { res, cuerpo } = await pedir(UOCRA, "?payment_id=111111");
    check("pago aprobado de ESTE producto → 200", res.status === 200, res.status);
    check("el cuerpo es el .xlsx real (firma ZIP)", esXlsx(cuerpo), cuerpo.subarray(0, 4));
    check(
      "Content-Type de xlsx (si no, el navegador lo guarda como texto)",
      res.headers.get("content-type") ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      res.headers.get("content-type"),
    );
    check(
      "Content-Disposition attachment con el nombre del archivo del producto",
      res.headers.get("content-disposition") === `attachment; filename="${UOCRA.archivo}"`,
      res.headers.get("content-disposition"),
    );
    check(
      "Content-Length coincide con los bytes servidos",
      res.headers.get("content-length") === String(cuerpo.length),
      { header: res.headers.get("content-length"), real: cuerpo.length },
    );
    // El link con payment_id ES la llave del producto: no puede quedar en ninguna cache compartida.
    const cache = res.headers.get("cache-control") ?? "";
    check("Cache-Control private + no-store", cache.includes("private") && cache.includes("no-store"), cache);
  }

  // ── 3. Cada producto entrega SU archivo (los dos valen lo mismo) ─────────────────────
  pagos = { "222222": pago({ external_reference: "planilla-comercio:abc" }) };
  {
    const { res } = await pedir(COMERCIO, "?payment_id=222222");
    check("un pago de Comercio entrega la planilla de Comercio", res.status === 200, res.status);
    check(
      "y el archivo que nombra es el de Comercio, no el de UOCRA",
      res.headers.get("content-disposition") === `attachment; filename="${COMERCIO.archivo}"`,
      res.headers.get("content-disposition"),
    );
  }

  // ── 4. El alias del redirect de MP (collection_id) tiene que seguir funcionando ───────
  pagos = { "333333": pago({ external_reference: "planilla-uocra:abc" }) };
  {
    const { res, cuerpo } = await pedir(UOCRA, "?collection_id=333333");
    check("collection_id (alias histórico de MP) entrega igual", res.status === 200, res.status);
    check("y entrega el archivo, no una página", esXlsx(cuerpo));
  }

  // ── 5. Todo pago que NO habilita se rechaza con 403 y SIN bytes ──────────────────────
  const rechazos: Array<[string, MpPayment]> = [
    ["pago de OTRO producto (mismo precio)", pago({ external_reference: "planilla-comercio:abc" })],
    ["pago pendiente", pago({ external_reference: "planilla-uocra:abc", status: "pending" })],
    ["pago rechazado", pago({ external_reference: "planilla-uocra:abc", status: "rejected" })],
    ["pago por menos plata", pago({ external_reference: "planilla-uocra:abc", transaction_amount: 1 })],
    ["pago en otra moneda", pago({ external_reference: "planilla-uocra:abc", currency_id: "USD" })],
    ["respuesta de MP vacía", {}],
  ];
  for (const [nombre, p] of rechazos) {
    pagos = { "444444": p };
    const { res, cuerpo } = await pedir(UOCRA, "?payment_id=444444");
    check(`${nombre} → 403`, res.status === 403, res.status);
    check(`${nombre} no entrega el archivo`, !esXlsx(cuerpo), cuerpo.length);
  }

  // ── 6. Si MP no contesta, 502 y sin filtrar el detalle del error ─────────────────────
  const fallasDeMp: Array<[string, number]> = [
    ["MP 500", 500],
    ["MP 401 (token vencido)", 401],
    ["pago inexistente (404)", 404],
  ];
  for (const [nombre, estado] of fallasDeMp) {
    pagos = { "555555": estado };
    const { res, cuerpo } = await pedir(UOCRA, "?payment_id=555555");
    check(`${nombre} → 502 (no 200, no 500 nuestro)`, res.status === 502, res.status);
    check(`${nombre} no entrega el archivo`, !esXlsx(cuerpo));
    const texto = cuerpo.toString("utf8");
    check(
      `${nombre} no filtra el cuerpo del error de MP al cliente`,
      !texto.includes("boom") && !texto.includes("Not Found"),
      texto.slice(0, 80),
    );
  }

  // ── 7. Archivo no bundleado → 500, nunca un 200 con cuerpo que no es el xlsx ─────────
  pagos = { "666666": pago({ external_reference: "planilla-uocra:abc" }) };
  {
    // Mismo slug (para pasar el gate) pero apuntando a un archivo que no existe: es exactamente
    // lo que pasa cuando falta la entrada en outputFileTracingIncludes de next.config.ts.
    const { res, cuerpo } = await pedir({ ...UOCRA, entrega: "xlsx", archivo: "no-existe.xlsx" }, "?payment_id=666666");
    check("archivo faltante en el bundle → 500", res.status === 500, res.status);
    check("y no un 200 con un cuerpo que Excel abriría como dañado", !esXlsx(cuerpo));
  }

  // ── 8. Un id que no es el de un pago de MP ni llega a la API (y no se puede colgar un path) ──
  for (const raro of ["../preferences", "123", "12345678901234567890123", "1e10000", "111111/../x"]) {
    pagos = { [raro]: pago({ external_reference: "planilla-uocra:abc" }) };
    const { res, cuerpo } = await pedir(UOCRA, `?payment_id=${encodeURIComponent(raro)}`);
    check(`id «${raro}» → 400 sin consultar a MP`, res.status === 400 && urlsConsultadas.length === 0, { status: res.status, urlsConsultadas });
    check(`id «${raro}» no entrega el archivo`, !esXlsx(cuerpo));
  }

  // ── 8b. Cupo por IP: una ráfaga de una misma IP deja de consultar a MP y recibe 429 ──────────
  pagos = { "777777": pago({ external_reference: "planilla-uocra:abc" }) };
  {
    const estados: number[] = [];
    let consultasDespues = 0;
    for (let i = 0; i < 12; i++) {
      urlsConsultadas = [];
      const req = new NextRequest(new URL(`https://calcular.ar${UOCRA.rutaDescarga}?payment_id=777777`), {
        headers: { "x-forwarded-for": "203.0.113.9, 10.0.0.1" },
      });
      const res = await servirPlanilla(req, UOCRA);
      estados.push(res.status);
      if (res.status === 429) consultasDespues += urlsConsultadas.length;
    }
    check("las primeras descargas de una IP pasan", estados[0] === 200, estados);
    check("una ráfaga de la misma IP termina en 429", estados.includes(429), estados);
    check("fuera de cupo no se le pregunta nada a MP", consultasDespues === 0, consultasDespues);
  }
}

// ── 9. Entrega personalizada: los datos del pago entran al .xlsx, y ante cualquier problema sale
//       el genérico (nunca un 500 ni un archivo roto a alguien que pagó) ─────────────────────────
type Prueba = { nombre: string };
const PRUEBA: Prefill<Prueba> = {
  validar(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const n = (raw as Record<string, unknown>).nombre;
    return typeof n === "string" && n.length > 0 && n.length <= 40 ? { nombre: n } : null;
  },
  aplicar(wb, d) {
    wb.worksheets[0].getCell("Z99").value = d.nombre;
  },
};

async function celdaZ99(b: Buffer): Promise<unknown> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(b as unknown as ArrayBuffer);
  return wb.worksheets[0].getCell("Z99").value;
}

async function personalizada() {
  const original = PREFILLS["planilla-uocra"];
  const generico = readFileSync(`private/${UOCRA.archivo}`);
  const conDatos = (datos: unknown, extra: Partial<MpPayment> = {}) =>
    pago({ external_reference: "planilla-uocra:abc", metadata: { producto: "planilla-uocra", datos }, ...extra });
  try {
    PREFILLS["planilla-uocra"] = PRUEBA as Prefill<unknown>;

    pagos = { "901901": conDatos(JSON.stringify({ nombre: "Ana" })) };
    {
      const { res, cuerpo } = await pedir(UOCRA, "?payment_id=901901");
      check("con datos válidos → 200 con un .xlsx", res.status === 200 && esXlsx(cuerpo), res.status);
      check("el archivo trae lo que cargó la persona", (await celdaZ99(cuerpo)) === "Ana");
      check("Content-Length del archivo personalizado", res.headers.get("content-length") === String(cuerpo.length));
      check("mismo nombre de archivo", res.headers.get("content-disposition") === `attachment; filename="${UOCRA.archivo}"`);
    }

    pagos = { "902902": conDatos({ nombre: "Beto" }) };
    {
      const { cuerpo } = await pedir(UOCRA, "?payment_id=902902");
      check("datos que MP devolviera ya parseados también entran", (await celdaZ99(cuerpo)) === "Beto");
    }

    const invalidos: Array<[string, unknown]> = [
      ["JSON roto", "{nombre:"],
      ["no pasan validar", JSON.stringify({ nombre: "" })],
      ["más de 2 KB", JSON.stringify({ nombre: "x".repeat(3000) })],
      ["número suelto", 42],
      ["sin datos", undefined],
    ];
    for (const [nombre, datos] of invalidos) {
      pagos = { "903903": conDatos(datos) };
      const { res, cuerpo } = await pedir(UOCRA, "?payment_id=903903");
      check(`${nombre} → 200 con la planilla genérica, byte a byte`, res.status === 200 && cuerpo.equals(generico), res.status);
    }

    PREFILLS["planilla-uocra"] = { ...PRUEBA, aplicar: () => { throw new Error("celda inexistente"); } } as Prefill<unknown>;
    pagos = { "904904": conDatos(JSON.stringify({ nombre: "Ana" })) };
    {
      const { res, cuerpo } = await pedir(UOCRA, "?payment_id=904904");
      check("aplicar tira → igual 200 con la genérica", res.status === 200 && cuerpo.equals(generico), res.status);
    }
    PREFILLS["planilla-uocra"] = { ...PRUEBA, validar: () => { throw new Error("validar roto"); } } as Prefill<unknown>;
    {
      const { res, cuerpo } = await pedir(UOCRA, "?payment_id=904904");
      check("validar tira → igual 200 con la genérica", res.status === 200 && cuerpo.equals(generico), res.status);
    }
    PREFILLS["planilla-uocra"] = PRUEBA as Prefill<unknown>;

    // Los datos nunca abren la puerta: con datos válidos pero un pago que no habilita, 403.
    pagos = { "905905": conDatos(JSON.stringify({ nombre: "Ana" }), { status: "pending" }) };
    {
      const { res, cuerpo } = await pedir(UOCRA, "?payment_id=905905");
      check("datos válidos con pago pendiente → 403 sin bytes", res.status === 403 && !esXlsx(cuerpo), res.status);
    }
    pagos = { "906906": conDatos(JSON.stringify({ nombre: "Ana" }), { external_reference: "planilla-comercio:abc" }) };
    {
      const { res } = await pedir(UOCRA, "?payment_id=906906");
      check("datos válidos en un pago de OTRO producto → 403", res.status === 403, res.status);
    }

    // La compra propia (/cuenta) pasa el pago ya leído: mismo camino.
    {
      const res = await servirArchivoProducto(UOCRA, conDatos(JSON.stringify({ nombre: "Cata" })));
      const cuerpo = Buffer.from(await res.arrayBuffer());
      check("desde la cuenta, con el pago, sale personalizada", (await celdaZ99(cuerpo)) === "Cata");
      const sinPago = Buffer.from(await (await servirArchivoProducto(UOCRA, null)).arrayBuffer());
      check("desde la cuenta, sin pago (MP caído), sale la genérica", sinPago.equals(generico));
    }
  } finally {
    PREFILLS["planilla-uocra"] = original;
  }
}

main().then(personalizada).then(() => {
  globalThis.fetch = fetchReal;
  console.log(fallas === 0 ? "\n✅ check_entrega: todo OK" : `\n❌ check_entrega: ${fallas} falla(s)`);
  process.exit(fallas === 0 ? 0 : 1);
});
