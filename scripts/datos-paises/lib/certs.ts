import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const DIR_CERTS = path.join(__dirname, "..", "certs");

export function intermediosVersionados(dir = DIR_CERTS): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".pem"))
    .sort()
    .map((f) => readFileSync(path.join(dir, f), "utf8"));
}

export function textoCertsEmbebidos(dir = DIR_CERTS): string {
  return [
    "// GENERADO por scripts/datos-paises/gen_certs.ts desde scripts/datos-paises/certs/*.pem. NO editar a mano.",
    `export const INTERMEDIOS: readonly string[] = ${JSON.stringify(intermediosVersionados(dir), null, 2)};`,
    "",
  ].join("\n");
}
