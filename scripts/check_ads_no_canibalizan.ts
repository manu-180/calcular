// Ninguna página con CTA de producto pago puede quedar sirviendo anuncios.
//
// POR QUÉ: un clic de AdSense en Argentina paga ~USD 0,02-0,10 y una planilla son ~USD 11. En una
// página que vende, el anuncio que se lleva una visita cuesta más de lo que rinde un mes entero
// de anuncios. El riesgo real no es decidirlo mal hoy: es que dentro de seis meses alguien le
// agregue el CTA a una calculadora nueva y nadie se acuerde de excluirla — la plata se va de a
// una página por vez y sin ruido. Por eso el gate deriva la lista DEL CÓDIGO, no de la memoria.
// Correr con: npx tsx scripts/check_ads_no_canibalizan.ts

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { RUTAS_QUE_VENDEN, RUTAS_QUE_VENDEN_EXACTAS, vendeAlgo } from "../src/lib/paginas-que-venden";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const CTAS = ["<PlanillaComercioCTA", "<PlanillaUocraCTA", "<PlanillaComprarBtn", "<CalculadoraAlquiler", "<CalculadoraCuotaAlimentaria", "oferta={datosOferta("];

/** Recorre src/app y devuelve la ruta pública de cada page.tsx que renderiza un CTA de venta. */
function rutasConCta(dir = "src/app", base = ""): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      // (grupos) de App Router no aportan segmento a la URL
      const seg = e.name.startsWith("(") ? base : `${base}/${e.name}`;
      out.push(...rutasConCta(p, seg));
    } else if (e.name === "page.tsx" || e.name.startsWith("_")) {
      const src = readFileSync(p, "utf8");
      if (CTAS.some((c) => src.includes(c))) out.push(base || "/");
    }
  }
  return [...new Set(out)];
}

const conCta = rutasConCta();
check(`se encontraron rutas con CTA de venta (${conCta.length})`, conCta.length > 0);

const sirviendoAds = conCta.filter((r) => !vendeAlgo(r));
check(
  "NINGUNA página con CTA de venta sirve anuncios",
  sirviendoAds.length === 0,
  sirviendoAds.length ? { faltanEnRUTAS_QUE_VENDEN: sirviendoAds } : undefined,
);

// Al revés: una ruta excluida que ya no vende nada es plata dejada sobre la mesa.
const sobran = [
  ...RUTAS_QUE_VENDEN.filter((r) => !conCta.some((c) => c === r || c.startsWith(`${r}/`))),
  ...RUTAS_QUE_VENDEN_EXACTAS.filter((r) => !conCta.includes(r)),
];
check(
  "ninguna ruta está excluida de más (excluir sin vender es regalar ingresos)",
  sobran.length === 0,
  sobran.length ? { yaNoVenden: sobran } : undefined,
);

// Las páginas informativas SÍ tienen que poder monetizar: si el guard se generalizara por error,
// el sitio se quedaría sin anuncios en todos lados y nadie lo notaría hasta fin de mes.
for (const ruta of ["/", "/monotributo", "/canasta-basica/agosto-2026", "/inflacion/2026", "/jubilacion", "/cuota-alimentaria/agosto-2026"]) {
  check(`${ruta} puede servir anuncios`, !vendeAlgo(ruta));
}

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de canibalización de ads OK");
}
