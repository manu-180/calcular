// Valida cada país de src/paises/<m>/ contra el contrato del motor (docs/paises/RECETA.md):
// esquema de datos.json, series.json y avisos.json, URLs https, tramos sin solape por región,
// verificadoEl no futuro, fuentes primarias en lo verificado, requiere existente y del tipo correcto,
// slugs únicos, conceptos canónicos, y que lo publicado se pueda publicar hoy.
// Uso: npx tsx scripts/check_paises.ts [mercado]. PAISES_TOLERANTE=1 baja a aviso lo que depende
// del día (un tramo que venció), para no frenar un deploy de AR por un vencimiento.
import { existsSync } from "node:fs";
import path from "node:path";
import { CONCEPTOS } from "../src/motor/conceptos";
import { validarPais } from "../src/motor/validar";
import { hoyEn, hoyMasAdelantado } from "../src/motor/vigencia";
import { cargarPaises, RAIZ, registrados } from "./paises_comun";

async function main() {
  const filtro = process.argv[2];
  const tolerante = process.env.PAISES_TOLERANTE === "1";
  const hoyMax = hoyMasAdelantado();
  const errores: string[] = [];
  const avisos: string[] = [];

  for (const [concepto, info] of Object.entries(CONCEPTOS)) {
    const ruta = (info as { rutaAR?: string }).rutaAR;
    if (!ruta) continue;
    const carpeta = ruta.slice(1);
    const existe = [path.join(RAIZ, "src", "app", carpeta), path.join(RAIZ, "src", "app", "(ar)", carpeta)].some((p) => existsSync(p));
    if (!existe) errores.push(`conceptos.ts: ${concepto}.rutaAR "${ruta}" no existe en src/app`);
  }

  const cargados = await cargarPaises();
  const enIndice = registrados();
  const codigos = new Map<string, string>();
  let revisados = 0;

  for (const { carpeta, pais, error } of cargados) {
    if (filtro && carpeta !== filtro) continue;
    if (!pais) {
      errores.push(`[${carpeta}] ${error}`);
      continue;
    }
    revisados++;
    const cod = pais.mercado.codigo;
    if (cod !== carpeta) errores.push(`[${carpeta}] la carpeta tiene que llamarse como el código del mercado (${cod})`);
    if (codigos.has(cod)) errores.push(`[${carpeta}] el código ${cod} ya lo usa src/paises/${codigos.get(cod)}`);
    codigos.set(cod, carpeta);
    if (!enIndice.includes(carpeta)) avisos.push(`[${carpeta}] todavía no está en src/paises/index.ts (lo suma el coordinador)`);

    const informe = validarPais(pais, { hoy: hoyEn(pais.mercado), hoyMasAdelantado: hoyMax, estricto: !tolerante });
    for (const e of informe.errores) errores.push(`[${cod}] ${e}`);
    for (const a of informe.avisos) avisos.push(`[${cod}] ${a}`);
    const verificados = pais.datos.reduce((n, d) => n + d.tramos.filter((t) => t.estado === "verificado").length, 0);
    const pendientes = pais.datos.reduce((n, d) => n + d.tramos.filter((t) => t.estado === "no-verificado").length, 0);
    console.log(
      `${informe.errores.length ? "❌" : "✅"} ${cod}: ${pais.datos.length} datos (${verificados} tramos verificados, ${pendientes} pendientes), ${pais.series.length} series, ${pais.calculadoras.length} calculadoras, estado ${pais.mercado.estado}`,
    );
  }

  for (const a of avisos) console.log(`⚠️  ${a}`);
  for (const e of errores) console.error(`❌ ${e}`);
  if (filtro && revisados === 0) {
    console.error(`❌ no encontré src/paises/${filtro}`);
    process.exit(1);
  }
  console.log(errores.length ? `${errores.length} FALLAS en ${revisados} países` : `TODO OK: ${revisados} países, ${avisos.length} avisos`);
  process.exit(errores.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
