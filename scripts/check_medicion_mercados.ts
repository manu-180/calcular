// La lista de mercados medidos (src/lib/medicion/mercados-registro.ts) tiene que ser la del registro en
// modo producción: /api/e descarta lo que no está ahí, así que un país publicado de menos no se mide.
// No se edita a mano: se genera desde el registro.
//
// Correr con: npx tsx scripts/check_medicion_mercados.ts
// Regenerar:  npx tsx scripts/check_medicion_mercados.ts --escribir

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Registro } from "../src/motor/registro";

const ARCHIVO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib", "medicion", "mercados-registro.ts");

const fallas: string[] = [];
const ok = (cond: boolean, que: string) => {
  if (!cond) fallas.push(que);
};

function generar(filas: [string, string | null, string][]): string {
  const cuerpo = filas.map(([c, p, i]) => `  [${JSON.stringify(c)}, ${p ? JSON.stringify(p) : "null"}, ${JSON.stringify(i)}],`).join("\n");
  return [
    "// Generado por scripts/check_medicion_mercados.ts --escribir desde registro.mercados(\"produccion\"). No editar a mano.",
    "export const MERCADOS_REGISTRO: readonly (readonly [codigo: string, pais: string | null, idioma: string])[] = [",
    cuerpo,
    "];",
    "",
  ].join("\n");
}

async function main() {
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  const registro = mod.registro ?? mod.default!.registro;
  const filas = registro
    .mercados("produccion")
    .map((m): [string, string | null, string] => [m.codigo, m.pais ? m.pais : null, m.idioma])
    .sort((a, b) => a[0].localeCompare(b[0]));
  const esperado = generar(filas);

  if (process.argv.includes("--escribir")) {
    writeFileSync(ARCHIVO, esperado);
    console.log(`✍️  ${path.relative(process.cwd(), ARCHIVO)}: ${filas.length} mercados`);
  }

  let actual = "";
  try {
    actual = readFileSync(ARCHIVO, "utf8").replace(/\r\n/g, "\n");
  } catch {
    actual = "";
  }
  ok(actual === esperado, "mercados-registro.ts no coincide con el registro: corré npx tsx scripts/check_medicion_mercados.ts --escribir");

  const m = await import("../src/lib/medicion/mercados");
  const codigos = new Set(m.MERCADOS_INTL.map((x) => x.codigo));
  for (const [codigo] of filas) {
    ok(codigos.has(codigo), `${codigo} está publicado y no se mide`);
    ok(m.FORMA_MERCADO.test(codigo) && codigo !== "ar", `${codigo}: no cumple el check de la base`);
    ok(m.esMercadoIntl(codigo), `${codigo}: esMercadoIntl lo rechaza`);
  }
  ok(m.MERCADOS_INTL.every((x) => x.nombre && x.nombre !== x.codigo.toUpperCase()), "todos los mercados tienen nombre legible");

  ok(!m.esMercadoIntl("zz"), "zz (interno) nunca se mide");
  ok(!m.esMercadoIntl("ar") && m.esMercadoMedido("ar") && m.MERCADO_AR.sitio === "ar", "ar es de calcular.ar, no de intl");
  ok(!m.esMercadoMedido("MX") && !m.esMercadoMedido("mx ") && !m.esMercadoMedido("*"), "sólo códigos con forma de mercado");
  ok(m.FORMA_MERCADO.test("ca-fr") && m.FORMA_MERCADO.test("ch-de") && !m.FORMA_MERCADO.test("ca_fr") && !m.FORMA_MERCADO.test("cafr"), "la forma acepta ediciones (ca-fr)");
  ok(m.nombreDeMercado("ca-fr", "CA", "fr") === "Canadá (francés)", `nombre de una edición: ${m.nombreDeMercado("ca-fr", "CA", "fr")}`);
  ok(m.nombreDeMercado("us", "US", "en") === "Estados Unidos", "nombre de un país con Intl.DisplayNames");
  ok(m.mercadoDeRuta("/mx/aguinaldo") === "mx", "mercadoDeRuta /mx/aguinaldo");
  ok(m.mercadoDeRuta("/do") === "do", "mercadoDeRuta /do");
  ok(m.mercadoDeRuta("/") === "global", "mercadoDeRuta /");
  ok(m.mercadoDeRuta("/privacidad") === "global", "mercadoDeRuta /privacidad");
  ok(m.mercadoDeRuta("/zz/x") === "global", "mercadoDeRuta /zz/x");
  ok(m.mercadoDeRuta("/global/x") === "global", "mercadoDeRuta /global/x");

  if (fallas.length) {
    for (const f of fallas) console.error(`  ✗ ${f}`);
    console.error(`❌ check_medicion_mercados: ${fallas.length} fallas`);
    process.exit(1);
  }
  console.log(`✅ check_medicion_mercados: ${m.MERCADOS_INTL.length} mercados intl generados desde el registro`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
