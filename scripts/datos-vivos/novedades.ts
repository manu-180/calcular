// Anota en src/data/novedades.ts cada dato oficial nuevo que hay en src/data y todavía no figura en
// el registro. Es el rastro que alimenta /novedades, su feed y el bloque de la home.
//
// LO CORRE correr.ts después de los actualizadores y ANTES de check-all: si la puerta sale roja,
// el revert se lleva también estas entradas, así que el registro nunca anuncia un dato que no se
// publicó. A mano, después de cargar un dato: `npx -y tsx scripts/datos-vivos/novedades.ts`
// (check_novedades lo exige). `--check` sólo lista lo que falta y sale 1 si falta algo.
//
// Nunca borra ni reescribe una entrada existente: el registro es historia. Las entradas que no salen
// de un detector (escalas de gremios, correcciones) se agregan a mano en el archivo y se conservan.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { hoyAR } from "../../src/lib/hoy";
import { NOVEDADES_REGISTRADAS } from "../../src/data/novedades";
import { novedadesDeLosDatos } from "../../src/lib/novedades-detectores";
import { fechaDe, type Novedad } from "../../src/lib/novedades";

const ARCHIVO = resolve(import.meta.dirname, "..", "..", "src", "data", "novedades.ts");

const ORDEN_CAMPOS: (keyof Novedad)[] = [
  "id", "serie", "organismo", "tipo", "publicadoEl", "cargadoEl", "rigeDesde", "titulo", "detalle", "fuente", "rutas",
];

function serializar(n: Novedad): string {
  const ordenado = Object.fromEntries(
    ORDEN_CAMPOS.filter((k) => n[k] !== undefined).map((k) => [k, n[k]]),
  );
  return JSON.stringify(ordenado, null, 2)
    .split("\n")
    .map((l) => `  ${l}`)
    .join("\n");
}

export function escribirRegistro(lista: Novedad[]): void {
  const ordenada = [...lista].sort((a, b) => fechaDe(b).localeCompare(fechaDe(a)) || a.id.localeCompare(b.id));
  writeFileSync(
    ARCHIVO,
    `// Registro de novedades: cada dato oficial nuevo que llegó a calcular.ar, con su fuente.
// Lo agranda solo scripts/datos-vivos/novedades.ts (lo corre el workflow datos-vivos): agrega lo que
// falta y nunca borra. Una entrada a mano (escala de un gremio, una corrección) se suma acá con el
// mismo formato y el script la conserva. publicadoEl = día que lo publicó el organismo; cargadoEl =
// día que llegó al sitio. Si no se sabe uno de los dos, se omite: nunca se adivina.
import type { Novedad } from "@/lib/novedades";

export const NOVEDADES_REGISTRADAS: Novedad[] = [
${ordenada.map(serializar).join(",\n")},
];
`,
  );
}

export function faltantes(): Novedad[] {
  const hoy = hoyAR();
  const ya = new Set(NOVEDADES_REGISTRADAS.map((n) => n.id));
  return novedadesDeLosDatos()
    .filter((c) => !ya.has(c.id))
    .map((c) => ({ ...c, cargadoEl: hoy }));
}

function main(): void {
  const nuevas = faltantes();
  if (process.argv.includes("--check")) {
    for (const n of nuevas) console.log(`falta: ${n.id} · ${n.titulo}`);
    process.exit(nuevas.length ? 1 : 0);
  }
  if (!nuevas.length) {
    console.log("OK novedades: el registro ya tiene todos los datos cargados.");
    return;
  }
  escribirRegistro([...NOVEDADES_REGISTRADAS, ...nuevas]);
  for (const n of nuevas) console.log(`+ novedad registrada: ${n.id} · ${n.titulo}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
