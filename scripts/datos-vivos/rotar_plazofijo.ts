// Rota los dos valores de respaldo de /plazo-fijo desde sus fuentes oficiales:
//   · TNA_FALLBACK      ← BCRA, serie 12 (tasa de plazo fijo) — la calculadora igual la pide en vivo
//   · INFLACION_DEFAULT ← la variación del último mes de IPC_SERIE (INDEC), 1 decimal
// Portado de tools/rotar-tna.ts y tools/rotar-inflacion.ts (repo libre_albedrio) para que corra en
// el workflow datos-vivos de este repo; aquellos quedan como atajos que llaman a este.
//
// GUARDAS (un dato financiero mal vale menos que cero):
//   · Fuente caída → no toca nada (el valor viejo tiene su fecha a la vista).
//   · Sólo escribe si el dato es MÁS NUEVO que el guardado.
//   · Bandas de sanidad y salto máximo por corrida: fuera de eso no escribe y sale 2 (aviso).
//
// USO: npx -y tsx scripts/datos-vivos/rotar_plazofijo.ts [--check]

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { BANDA_IPC, BANDA_TNA, nombreAPeriodo, periodoANombre, traerTna } from "../../src/lib/datos-vivos";
import { IPC_SERIE } from "../../src/data/ipc-serie";

const ARCHIVO = resolve(import.meta.dirname, "..", "..", "src", "data", "plazofijo.ts");
const RE_TNA = /(TNA_FALLBACK\s*=\s*\{\s*valor:\s*)([\d.]+)(\s*,\s*fechaISO:\s*")([^"]+)(")/;
const RE_INF = /(INFLACION_DEFAULT\s*=\s*\{\s*mensualPct:\s*)(-?[\d.]+)(\s*,\s*periodo:\s*")([^"]+)(")/;

const CHECK = process.argv.includes("--check");
let avisos = 0;
let desactualizado = false;

async function main(): Promise<void> {
  let texto = readFileSync(ARCHIVO, "utf8");
  const mT = texto.match(RE_TNA);
  const mI = texto.match(RE_INF);
  if (!mT || !mI) throw new Error("no pude parsear TNA_FALLBACK o INFLACION_DEFAULT en plazofijo.ts");

  const tna = await traerTna(20_000);
  const tnaActual = { valor: Number(mT[2]), fecha: mT[4] };
  if (!tna) {
    console.log(`⚠️  BCRA sin respuesta — TNA_FALLBACK queda en ${tnaActual.valor}% (${tnaActual.fecha}).`);
  } else if (!(tna.valor >= BANDA_TNA.min && tna.valor <= BANDA_TNA.max)) {
    avisos++;
    console.log(`🔴 TNA fuera de banda (${tna.valor}): no escribo.`);
  } else if (Math.abs(tna.valor - tnaActual.valor) / tnaActual.valor > BANDA_TNA.saltoRelativoMax) {
    avisos++;
    console.log(`🔴 Salto brusco de TNA ${tnaActual.valor}% → ${tna.valor}%: no escribo, verificar contra el BCRA.`);
  } else if (tna.fecha <= tnaActual.fecha) {
    console.log(`✓ TNA_FALLBACK al día (${tnaActual.valor}% · ${tnaActual.fecha}).`);
  } else {
    desactualizado = true;
    texto = texto.replace(RE_TNA, `$1${tna.valor}$3${tna.fecha}$5`);
    console.log(`🔄 TNA_FALLBACK ${tnaActual.valor}% (${tnaActual.fecha}) → ${tna.valor}% (${tna.fecha}) · BCRA serie 12.`);
  }

  const infActual = { pct: Number(mI[2]), periodo: nombreAPeriodo(mI[4]) };
  const [periodo, idx] = IPC_SERIE[IPC_SERIE.length - 1];
  const [, idxPrevio] = IPC_SERIE[IPC_SERIE.length - 2];
  const pct = Math.round((idx / idxPrevio - 1) * 1000) / 10;
  if (!(pct >= BANDA_IPC.min && pct <= BANDA_IPC.max)) {
    avisos++;
    console.log(`🔴 Variación mensual del IPC fuera de banda (${pct}% en ${periodo}): no escribo.`);
  } else if (infActual.periodo && periodo <= infActual.periodo) {
    console.log(`✓ INFLACION_DEFAULT al día (${infActual.pct}% · ${mI[4]}).`);
  } else if (Math.abs(pct - infActual.pct) > BANDA_IPC.saltoPpMax) {
    avisos++;
    console.log(`🔴 Salto brusco de inflación ${infActual.pct}% → ${pct}%: no escribo, verificar contra el INDEC.`);
  } else {
    desactualizado = true;
    texto = texto.replace(RE_INF, `$1${pct}$3${periodoANombre(periodo)}$5`);
    console.log(`🔄 INFLACION_DEFAULT ${infActual.pct}% (${mI[4]}) → ${pct}% (${periodoANombre(periodo)}) · IPC_SERIE.`);
  }

  if (CHECK) {
    if (desactualizado) process.exit(1);
    return;
  }
  if (desactualizado) writeFileSync(ARCHIVO, texto);
  if (avisos) process.exit(2);
}

main().catch((e) => {
  console.error(`❌ rotar_plazofijo: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
