// La lista de mercados medidos (src/lib/medicion/mercados.ts) tiene que ser la del registro en modo
// producción: /api/e descarta lo que no está ahí, así que un país publicado de menos no se mide.
//
// Correr con: npx tsx scripts/check_medicion_mercados.ts

import type { Registro } from "../src/motor/registro";
import { MERCADOS_INTL, MERCADO_AR, MERCADO_GLOBAL, mercadoDeRuta, esMercadoIntl, esMercadoMedido } from "../src/lib/medicion/mercados";

const fallas: string[] = [];
const ok = (cond: boolean, que: string) => {
  if (!cond) fallas.push(que);
};

async function main() {
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  const registro = mod.registro ?? mod.default!.registro;
  const publicados = registro.mercados("produccion");
  const enLista = new Map(MERCADOS_INTL.map((m) => [m.codigo, m]));

  for (const m of publicados) {
    const medido = enLista.get(m.codigo);
    if (!medido) {
      fallas.push(`${m.codigo} (${m.nombre}) está publicado y no se mide`);
      continue;
    }
    if (m.codigo !== MERCADO_GLOBAL) {
      ok(medido.nombre === m.nombre, `${m.codigo}: nombre «${medido.nombre}» ≠ «${m.nombre}» del registro`);
      ok(medido.pais === m.pais, `${m.codigo}: país ${medido.pais} ≠ ${m.pais} del registro`);
    }
  }
  const codigosPublicados = new Set<string>(publicados.map((m) => m.codigo));
  for (const m of MERCADOS_INTL) ok(codigosPublicados.has(m.codigo), `${m.codigo} se mide pero no está publicado`);
  for (const m of MERCADOS_INTL) ok(/^[a-z]{2,6}$/.test(m.codigo) && m.codigo !== "ar", `${m.codigo}: no cumple el check de la base`);

  ok(!esMercadoIntl("zz"), "zz (interno) nunca se mide");
  ok(!esMercadoIntl("ar") && esMercadoMedido("ar") && MERCADO_AR.sitio === "ar", "ar es de calcular.ar, no de intl");
  ok(mercadoDeRuta("/mx/aguinaldo") === "mx", "mercadoDeRuta /mx/aguinaldo");
  ok(mercadoDeRuta("/do") === "do", "mercadoDeRuta /do");
  ok(mercadoDeRuta("/") === "global", "mercadoDeRuta /");
  ok(mercadoDeRuta("/privacidad") === "global", "mercadoDeRuta /privacidad");
  ok(mercadoDeRuta("/zz/x") === "global", "mercadoDeRuta /zz/x");
  ok(mercadoDeRuta("/global/x") === "global", "mercadoDeRuta /global/x");

  if (fallas.length) {
    for (const f of fallas) console.error(`  ✗ ${f}`);
    console.error(`❌ check_medicion_mercados: ${fallas.length} fallas`);
    process.exit(1);
  }
  console.log(`✅ check_medicion_mercados: ${MERCADOS_INTL.length} mercados intl en línea con el registro`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
