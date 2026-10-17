// Descubre los países por carpeta (no por el registro): así el agente de un país puede correr los
// checks antes de que el coordinador lo sume a src/paises/index.ts.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { PaisDefinido } from "../src/motor/tipos";

export const RAIZ = path.resolve(__dirname, "..");
export const DIR_PAISES = path.join(RAIZ, "src", "paises");

export function carpetasDePaises(): string[] {
  if (!existsSync(DIR_PAISES)) return [];
  return readdirSync(DIR_PAISES)
    .filter((n) => statSync(path.join(DIR_PAISES, n)).isDirectory())
    .sort();
}

export interface PaisCargado {
  carpeta: string;
  pais: PaisDefinido | null;
  error?: string;
}

export async function importar<T>(archivo: string): Promise<T> {
  const mod = (await import(pathToFileURL(archivo).href)) as { default?: unknown };
  let v: unknown = mod.default;
  // tsx en modo CommonJS envuelve el default una vez más.
  if (v && typeof v === "object" && "default" in v && Object.keys(v).length === 1) v = (v as { default: unknown }).default;
  return v as T;
}

export async function cargarPaises(): Promise<PaisCargado[]> {
  const salida: PaisCargado[] = [];
  for (const carpeta of carpetasDePaises()) {
    const indice = path.join(DIR_PAISES, carpeta, "index.ts");
    if (!existsSync(indice)) {
      salida.push({ carpeta, pais: null, error: `falta src/paises/${carpeta}/index.ts (export default definirPais({...}))` });
      continue;
    }
    try {
      const pais = await importar<PaisDefinido>(indice);
      if (!pais || typeof pais !== "object" || !("mercado" in pais) || !("errores" in pais)) {
        salida.push({ carpeta, pais: null, error: `src/paises/${carpeta}/index.ts no exporta por defecto definirPais({...})` });
      } else salida.push({ carpeta, pais });
    } catch (err) {
      salida.push({ carpeta, pais: null, error: `src/paises/${carpeta}/index.ts no carga: ${(err as Error).message}` });
    }
  }
  return salida;
}

export function registrados(): string[] {
  const indice = path.join(DIR_PAISES, "index.ts");
  if (!existsSync(indice)) return [];
  const texto = readFileSync(indice, "utf8");
  return [...texto.matchAll(/from\s+["']\.\/([a-z]{2,6}(?:-[a-z]{2,3})?)["']/g)].map((m) => m[1]);
}

export function archivosBajo(dir: string, filtro: RegExp): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = path.join(dir, n);
    if (statSync(p).isDirectory()) return archivosBajo(p, filtro);
    return filtro.test(n) ? [p] : [];
  });
}

export function rel(p: string): string {
  return path.relative(RAIZ, p).split(path.sep).join("/");
}
