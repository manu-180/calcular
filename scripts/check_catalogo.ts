// Verificación del CATÁLOGO de productos pagos: que cada producto que se puede comprar se pueda
// también entregar, encontrar y cobrar bien. Nace con los productos 3 y 4 (27/9/2026): agregar un
// producto toca siete lugares (catálogo, ruta de descarga, tracing del bundle, landing, sitemap,
// llms.txt, generador) y olvidarse uno solo es vender algo que no se entrega.
//
// Correr con: npx tsx scripts/check_catalogo.ts  (o vía scripts/check-all.ts)

import "./sin-server-only";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readFileSync } from "node:fs";

process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
process.env.MP_ACCESS_TOKEN = "APP_USR-token-de-prueba-no-es-el-real";

import { NextRequest } from "next/server";
import { servirArchivoProducto, servirPlanilla } from "../src/lib/entrega";
import { informeEntregaHtml } from "../src/lib/email";
import {
  CATALOGO,
  buscarPago,
  rutaEntrega,
  PRODUCTOS,
  desdeDeReferencia,
  emailValido,
  habilitaDescarga,
  normalizarDesde,
  pagoAprobado,
  productoDePago,
  referenciaExterna,
  type MpPayment,
} from "../src/lib/mp";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const nextConfig = readFileSync("next.config.ts", "utf8");
const sitemap = readFileSync("src/app/sitemap.ts", "utf8");
const llms = readFileSync("public/llms.txt", "utf8");
const generadores = readFileSync("scripts/gen_planilla_todas.ts", "utf8");

// Un producto nuevo sin entrada acá hace fallar el check: obliga a decir qué lo genera en el build.
const GENERADOR: Record<string, string> = {
  "planilla-comercio": "generarPlanillaComercio",
  "planilla-uocra": "generarPlanillaUocra",
  "planilla-casas-particulares": "generarPlanillaCasas",
  "planilla-monotributo": "generarPlanillaMonotributo",
  "planilla-alquileres": "generarPlanillaAlquileres",
  "planilla-camioneros": "generarPlanillaCamioneros",
  "planilla-mi-sueldo": "generarPlanillaMiSueldo",
  "planilla-vacaciones": "generarPlanillaVacaciones",
  "planilla-plazo-fijo": "generarPlanillaPlazoFijo",
};

// ── 1. Cada producto del catálogo está completo ───────────────────────────────────────
check("CATALOGO lista todos los productos, sin repetir", new Set(CATALOGO.map((p) => p.slug)).size === Object.keys(PRODUCTOS).length);
check(
  "el catálogo tiene los 14 productos (9 planillas y 5 informes)",
  JSON.stringify(Object.keys(PRODUCTOS).sort()) ===
    JSON.stringify([
      "informe-credito-laboral",
      "informe-cuota-alimentaria",
      "informe-ganancias",
      "informe-indemnizacion",
      "informe-inflacion",
      "planilla-alquileres",
      "planilla-camioneros",
      "planilla-casas-particulares",
      "planilla-comercio",
      "planilla-mi-sueldo",
      "planilla-monotributo",
      "planilla-plazo-fijo",
      "planilla-uocra",
      "planilla-vacaciones",
    ]),
  Object.keys(PRODUCTOS),
);
for (const p of Object.values(PRODUCTOS)) {
  // La URL de entrega lleva el payment_id: sin los headers privados se filtra por Referer.
  if (p.entrega === "informe") check(`${p.slug}: la entrega tiene headers privados`, nextConfig.includes(`"${p.rutaDescarga}"`));
  check(`${p.slug}: existe la landing ${p.rutaLanding}`, existsSync(path.join("src/app", p.rutaLanding, "page.tsx")));
  check(`${p.slug}: la landing está en el sitemap`, sitemap.includes("`${BASE}" + p.rutaLanding + "`"));
  check(`${p.slug}: la landing está en llms.txt`, llms.includes(`https://calcular.ar${p.rutaLanding})`));
  check(`${p.slug}: precio entero en pesos`, Number.isInteger(p.precio) && p.precio > 0);
  check(`${p.slug}: el slug lleva el tipo de entrega adelante`, p.slug.startsWith(p.entrega === "informe" ? "informe-" : "planilla-"));
  if (p.entrega === "xlsx") {
    const ruta = path.join("src/app", p.rutaDescarga, "route.ts");
    check(`${p.slug}: existe la ruta de descarga ${p.rutaDescarga}`, existsSync(ruta), ruta);
    check(`${p.slug}: la ruta de descarga sirve ESTE producto`, existsSync(ruta) && readFileSync(ruta, "utf8").includes(`PRODUCTOS["${p.slug}"]`));
    check(`${p.slug}: la descarga lleva /private en el bundle (outputFileTracingIncludes)`, nextConfig.includes(`"${p.rutaDescarga}": ["./private/**"]`));
    check(`${p.slug}: el entregable existe en private/`, existsSync(path.join("private", p.archivo)));
    const generador = GENERADOR[p.slug];
    check(`${p.slug}: el prebuild lo regenera (${generador ?? "sin generador declarado en este check"})`, !!generador && generadores.includes(`await ${generador}()`));
  } else {
    check(`${p.slug}: un informe no tiene archivo`, p.archivo === null);
    check(`${p.slug}: se entrega en una página, no en /api`, !p.rutaDescarga.startsWith("/api/"), p.rutaDescarga);
    check(`${p.slug}: existe la página de entrega ${p.rutaDescarga}`, existsSync(path.join("src/app", p.rutaDescarga, "page.tsx")));
  }
}

// ── 2. La referencia lleva el origen sin romper la resolución del producto ─────────────
const ref = referenciaExterna("planilla-casas-particulares", "https://www.google.com:443/?q=x");
check("referencia con origen empieza con el slug", ref.startsWith("planilla-casas-particulares:"), ref);
check("el origen no mete ':' extra (MP y el parser cortan ahí)", ref.split(":").length === 3, ref);
check("desdeDeReferencia lee el origen", desdeDeReferencia(ref) === "www.google.com-443/-q-x", desdeDeReferencia(ref));
check("desdeDeReferencia de una referencia vieja es vacío", desdeDeReferencia("planilla-comercio:abc") === "");
check("normalizarDesde corta en 60", normalizarDesde("x".repeat(200)).length === 60);
check("normalizarDesde conserva la ruta interna", normalizarDesde("google.com_/planillas/monotributo") === "google.com_/planillas/monotributo");

const pago = (extra: Partial<MpPayment>): MpPayment => ({ status: "approved", currency_id: "ARS", ...extra });
for (const p of [PRODUCTOS["planilla-casas-particulares"], PRODUCTOS["planilla-monotributo"]]) {
  const conOrigen = pago({ external_reference: referenciaExterna(p.slug, "monotributo"), transaction_amount: p.precio });
  check(`${p.slug}: una referencia CON origen resuelve el producto`, productoDePago(conOrigen)?.slug === p.slug);
  check(`${p.slug}: su pago por el precio exacto habilita la descarga`, habilitaDescarga(conOrigen, p));
  check(`${p.slug}: pagar lo de otro producto (14.900) NO lo aprueba`, !pagoAprobado({ ...conOrigen, transaction_amount: 14900 }, p));
  check(`${p.slug}: su pago NO habilita la planilla de Comercio`, !habilitaDescarga(conOrigen, PRODUCTOS["planilla-comercio"]));
}
const deComercio = pago({ external_reference: "planilla-comercio:abc", transaction_amount: 14900 });
check("un pago de Comercio NO habilita la de Casas Particulares", !habilitaDescarga(deComercio, PRODUCTOS["planilla-casas-particulares"]));

// Los productos nuevos: alquileres vale lo mismo que Casas y Monotributo; el gate es el slug.
const alquileres = PRODUCTOS["planilla-alquileres"];
const informe = PRODUCTOS["informe-cuota-alimentaria"];
const deAlquileres = pago({ external_reference: referenciaExterna(alquileres.slug, "inflacion"), transaction_amount: alquileres.precio });
const deInforme = pago({ external_reference: referenciaExterna(informe.slug, "cuota"), transaction_amount: informe.precio });
check("alquileres: su pago habilita su planilla", habilitaDescarga(deAlquileres, alquileres));
for (const otro of [PRODUCTOS["planilla-casas-particulares"], PRODUCTOS["planilla-monotributo"], informe]) {
  check(`alquileres: su pago NO habilita ${otro.slug}`, !habilitaDescarga(deAlquileres, otro));
}
check("informe: su pago habilita el informe", habilitaDescarga(deInforme, informe));
for (const otro of Object.values(PRODUCTOS).filter((p) => p.slug !== informe.slug)) {
  check(`informe: su pago ($4.900) NO habilita ${otro.slug}`, !habilitaDescarga(deInforme, otro));
}
check("informe: un pago por el precio de una planilla no lo aprueba", !pagoAprobado({ ...deInforme, transaction_amount: 9900 }, informe));
check(
  "un pago viejo sin marca sigue siendo Comercio, nunca un producto nuevo",
  productoDePago(pago({ transaction_amount: 4900 }))?.slug === "planilla-comercio",
);

// ── 3. Mail del comprador ──────────────────────────────────────────────────────────────
check("emailValido normaliza", emailValido("  Ana@Mail.COM ") === "ana@mail.com");
for (const malo of ["", "ana", "ana@", "ana@mail", "a b@mail.com", "@mail.com"]) {
  check(`emailValido rechaza «${malo}»`, emailValido(malo) === null);
}

// ── 3b. Enlace de entrega del informe (mail y gracias usan el mismo helper) ─────────────
check(
  "informe: el enlace de entrega es /informes/cuota-alimentaria/ver?payment_id=<id>",
  rutaEntrega(informe, "123") === "/informes/cuota-alimentaria/ver?payment_id=123",
);
check("planilla: el enlace de entrega es su descarga", rutaEntrega(alquileres, "1/2") === "/api/planilla-alquileres/download?payment_id=1%2F2");
const mailInforme = informeEntregaHtml({ titulo: informe.titulo, urlInforme: "https://calcular.ar/informes/cuota-alimentaria/ver?payment_id=9", urlLanding: "https://calcular.ar/informes/cuota-alimentaria" });
check("mail del informe: botón «Ver mi informe» al enlace de entrega", mailInforme.includes("Ver mi informe") && mailInforme.includes("/informes/cuota-alimentaria/ver?payment_id=9"));
check("mail del informe sin datos: no promete «los datos que cargaste»", !mailInforme.includes("cargaste"));
check(
  "mail del informe con datos: dice que sale con lo que cargó",
  informeEntregaHtml({ titulo: informe.titulo, urlInforme: "x", urlLanding: "y", conDatos: true }).includes("los datos que cargaste"),
);
check("mail del informe: no habla de .xlsx ni de descargar una planilla", !mailInforme.includes(".xlsx") && !/planilla/i.test(mailInforme.replace(/Más de calcular\.ar[\s\S]*$/, "")));

// ── 4. La descarga de un producto nuevo entrega SU archivo real ─────────────────────────
const fetchReal = globalThis.fetch;
async function main() {
  const casas = PRODUCTOS["planilla-casas-particulares"];
  let respuesta: MpPayment = pago({ external_reference: `${casas.slug}:x:home`, transaction_amount: casas.precio });
  globalThis.fetch = (async () => new Response(JSON.stringify(respuesta), { status: 200 })) as typeof fetch;

  const pedir = async () => {
    const req = new NextRequest(new URL(`https://calcular.ar${casas.rutaDescarga}?payment_id=1000001`));
    const res = await servirPlanilla(req, casas);
    return { res, cuerpo: Buffer.from(await res.arrayBuffer()) };
  };
  let { res, cuerpo } = await pedir();
  check("casas: pago aprobado → 200 con el .xlsx", res.status === 200 && cuerpo[0] === 0x50 && cuerpo[1] === 0x4b, res.status);
  check("casas: el adjunto se llama como el producto", res.headers.get("content-disposition") === `attachment; filename="${casas.archivo}"`);

  respuesta = pago({ external_reference: "planilla-monotributo:x", transaction_amount: 9900 });
  ({ res, cuerpo } = await pedir());
  check("casas: un pago de Monotributo (mismo precio) → 403 sin bytes", res.status === 403 && !(cuerpo[0] === 0x50 && cuerpo[1] === 0x4b), res.status);

  // ── 4b. Un informe nunca sale como archivo ───────────────────────────────────────────
  {
    const res = await servirArchivoProducto(PRODUCTOS["informe-cuota-alimentaria"], deInforme);
    const cuerpo = Buffer.from(await res.arrayBuffer());
    check("informe: pedirlo como archivo → 404 sin bytes de planilla", res.status === 404 && !(cuerpo[0] === 0x50 && cuerpo[1] === 0x4b), res.status);
  }

  // ── 5. Cuenta vieja (legado): un pago que la cuenta nueva no conoce se busca en la vieja ──
  process.env.MP_ACCESS_TOKEN_LEGADO = "APP_USR-token-legado-de-prueba";
  const vistos: string[] = [];
  globalThis.fetch = (async (_: RequestInfo | URL, init?: RequestInit) => {
    const auth = String((init?.headers as Record<string, string>)?.Authorization ?? "");
    vistos.push(auth.includes("legado") ? "legado" : "nueva");
    if (!auth.includes("legado")) return new Response("Not Found", { status: 404 });
    return new Response(JSON.stringify(pago({ external_reference: `${casas.slug}:viejo`, transaction_amount: casas.precio })), { status: 200 });
  }) as typeof fetch;
  ({ res } = await pedir());
  check("legado: un pago de la cuenta vieja sigue entregando la planilla", res.status === 200, res.status);
  check("legado: se consulta primero la cuenta nueva", vistos.join() === "nueva,legado", vistos);
  const hallado = await buscarPago("1");
  check("legado: buscarPago marca el pago como de la cuenta vieja", hallado?.legado === true);
  globalThis.fetch = (async () => new Response("Not Found", { status: 404 })) as typeof fetch;
  check("en ninguna cuenta → null (el webhook responde 200 y no reintenta)", (await buscarPago("1")) === null);
  delete process.env.MP_ACCESS_TOKEN_LEGADO;
}

main()
  .catch((e) => {
    fallas++;
    console.error(e);
  })
  .finally(() => {
    globalThis.fetch = fetchReal;
    console.log(fallas === 0 ? "\n✅ check_catalogo: todo OK" : `\n❌ check_catalogo: ${fallas} falla(s)`);
    process.exit(fallas === 0 ? 0 : 1);
  });
