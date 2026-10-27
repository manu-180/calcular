// scripts/check-all.ts — Corre TODOS los check_*.ts del proyecto en una pasada.
//
// Ejecutar:  npx -y tsx scripts/check-all.ts        (desde calcular-ar/)
//        o:  npx -y tsx calcular-ar/scripts/check-all.ts   (desde la raíz del repo)
//
// Por qué existe (regla del 2-2): antes de cada deploy hay que correr los checks de
// la lógica/datos que toca el cambio. Hacerlo de a uno es lento y se olvida alguno.
// Este runner DESCUBRE todos los scripts/check_*.ts (cada calculadora nueva se suma
// sola, sin tocar este archivo) y los corre. Verde = limpio; rojo = vuelca el detalle
// del que falló. El exit code es la única verdad: 0 = todos verdes, 1 = alguno falló.
//
// NO corre `next build` (eso es otro gate, más lento). Pre-deploy completo =
// `npx -y tsx scripts/check-all.ts && npm run build`.
//
// Solo stdlib. Spawnea cada check con tsx (cada uno hace su propio process.exit).

import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const calcularRoot = path.resolve(scriptsDir, "..");

// Sin node_modules, las suites que importan `next/server` o `exceljs` mueren con MODULE_NOT_FOUND
// y el resumen dice «87/91 verdes» como si fuera código roto (pasó el 16/9/2026: una limpieza de
// disco se había llevado la carpeta). Se corta antes para que el diagnóstico sea el correcto.
if (!existsSync(path.join(calcularRoot, "node_modules", "next"))) {
  console.error("❌ calcular-ar/node_modules no está instalado: corré `npm ci` dentro de calcular-ar/ y repetí.");
  console.error("   No es una falla de los checks: sin dependencias las suites no pueden ni arrancar.");
  process.exit(2);
}

const checks = readdirSync(scriptsDir)
  .filter((f) => /^check_.*\.ts$/.test(f)) // check_*.ts (NO check-all.ts, lleva guión)
  .sort();

if (checks.length === 0) {
  console.error("No encontré ningún scripts/check_*.ts — ¿corriste desde el lugar correcto?");
  process.exit(1);
}

console.log(`— check-all · ${new Date().toISOString().slice(0, 10)} · ${checks.length} suites —\n`);

type Resultado = { archivo: string; ok: boolean; ms: number; salida: string };
const resultados: Resultado[] = [];

for (const archivo of checks) {
  const started = Date.now();
  // Comando como string único (no args + shell): evita DEP0190 y resuelve npx.cmd en Windows.
  // El path lo controlamos nosotros (readdirSync de nuestro propio scripts/), sin espacios.
  // TSX_DISABLE_CACHE: en Windows la caché de tsx (4.23) deja abierto ~1 handle por .ts importado;
  // con 113 mercados cargarPaises pasa el tope de ~8192 del proceso y todo check que lee el registro
  // muere con EMFILE (27/10). Sin caché el conteo queda plano.
  const r = spawnSync(`npx -y tsx scripts/${archivo}`, {
    cwd: calcularRoot,
    shell: true,
    encoding: "utf8",
    env: { ...process.env, TSX_DISABLE_CACHE: "1" },
  });
  const ms = Date.now() - started;
  const salida = `${r.stdout ?? ""}${r.stderr ?? ""}`.trim();
  const ok = r.status === 0;
  resultados.push({ archivo, ok, ms, salida });

  // Última línea no vacía del script (su propio resumen: "TODO OK", "39 FALLAS", etc.)
  const ultima = salida.split("\n").filter((l) => l.trim()).pop() ?? "";
  console.log(`${ok ? "✅" : "❌"} ${archivo.padEnd(26)} ${String(ms).padStart(5)}ms  ${ultima.slice(0, 60)}`);
}

// Detalle completo de los que fallaron (para no tener que re-correrlos a mano).
const fallaron = resultados.filter((r) => !r.ok);
for (const f of fallaron) {
  console.log(`\n──────── ${f.archivo} (exit≠0) ────────\n${f.salida}`);
}

const verdes = resultados.length - fallaron.length;
console.log(
  `\n${fallaron.length === 0 ? "✅" : "❌"} ${verdes}/${resultados.length} suites verdes` +
    (fallaron.length ? ` — falló: ${fallaron.map((f) => f.archivo).join(", ")}` : "."),
);
process.exit(fallaron.length === 0 ? 0 : 1);
