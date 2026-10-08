// Lo corre el job publicar de .github/workflows/datos-paises.yml antes de cada git apply. Ese job
// tiene contents: write y aplica parches que armó otro job (que corre npm ci y código de terceros),
// así que no confía en ellos: un parche solo puede modificar src/paises/<m>/series.json de su propio
// mercado, sin crear, borrar, renombrar ni cambiar el modo de nada. Solo node y git, sin npm ci.
// Uso: node scripts/datos-paises/validar-parche.mjs <mercado> <archivo.patch>
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RE_MERCADO = /^[a-z]{2,6}$/;

/**
 * @param {{ mercado: string, numstat: string, summary: string }} p
 * @returns {string[]} motivos de rechazo (vacío = se puede aplicar)
 */
export function validarParche({ mercado, numstat, summary }) {
  if (!RE_MERCADO.test(mercado)) return [`mercado inválido: ${JSON.stringify(mercado)}`];
  const permitida = `src/paises/${mercado}/series.json`;
  const motivos = [];
  const lineas = numstat.split("\n").filter((l) => l.trim() !== "");
  if (lineas.length === 0) motivos.push("el parche no toca ningún archivo");
  for (const l of lineas) {
    const m = /^(\d+|-)\t(\d+|-)\t(.*)$/.exec(l);
    if (!m) motivos.push(`línea de --numstat que no entiendo: ${JSON.stringify(l)}`);
    else if (m[1] === "-" || m[2] === "-") motivos.push(`cambio binario en ${JSON.stringify(m[3])}`);
    else if (m[3] !== permitida) motivos.push(`ruta no permitida: ${JSON.stringify(m[3])} (solo ${permitida})`);
  }
  for (const l of summary.split("\n").filter((x) => x.trim() !== "")) motivos.push(`el parche crea, borra, renombra o cambia el modo de un archivo: ${l.trim()}`);
  return motivos;
}

export function leerParche(archivo) {
  const git = (args) => execFileSync("git", ["apply", ...args, "--", archivo], { encoding: "utf8" });
  return { numstat: git(["--numstat"]), summary: git(["--summary"]) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [mercado, archivo] = process.argv.slice(2);
  let motivos;
  try {
    motivos = validarParche({ mercado: mercado ?? "", ...leerParche(archivo ?? "") });
  } catch (err) {
    motivos = [`git apply no pudo leer el parche: ${err.message.split("\n")[0]}`];
  }
  for (const m of motivos) console.error(m);
  process.exit(motivos.length ? 1 : 0);
}
