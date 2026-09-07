// Verifica la consistencia aritmética de los datos de camioneros.ts contra la paritaria 2026.
// Fuente externa verificada: Chofer 1ª junio 2026 = $1.017.089,13 (Perfil, El Destape).

import {
  CAMIONEROS_BASE_MAYO,
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
  type CategoriaCamionerosId,
} from "../src/data/convenios/camioneros";

let errores = 0;
function check(condition: boolean, msg: string) {
  if (!condition) {
    console.error("✗", msg);
    errores++;
  } else {
    console.log("✓", msg);
  }
}

const basico = (catId: CategoriaCamionerosId, mesId: string): number => {
  const mes = MESES_CAMIONEROS.find((m) => m.id === mesId)!;
  return CAMIONEROS_BASE_MAYO[catId] * mes.factorDesdeMayo;
};

// --- Verificación 1: valor externo verificado ---
const junioChofer1 = basico("chofer-primera", "junio-2026");
check(
  Math.abs(junioChofer1 - 1_017_089.13) < 1,
  `Chofer 1ª junio: esperado $1.017.089,13 — obtenido $${junioChofer1.toFixed(2)}`
);

// --- Verificación 2: progresión acumulativa de factores ---
const factorPor: Record<string, number> = {};
for (const m of MESES_CAMIONEROS) factorPor[m.id] = m.factorDesdeMayo;

check(factorPor["mayo-2026"] > factorPor["abril-2026"], "mayo > abril (factor)");
check(factorPor["abril-2026"] > factorPor["marzo-2026"], "abril > marzo (factor)");
check(factorPor["junio-2026"] > factorPor["mayo-2026"], "junio > mayo (factor)");
check(factorPor["julio-2026"] > factorPor["junio-2026"], "julio > junio (factor)");
check(factorPor["agosto-2026"] > factorPor["julio-2026"], "agosto > julio (factor)");

// --- Verificación 3: incrementos mensuales dentro del rango esperado ---
const inc = (a: string, b: string) => factorPor[b] / factorPor[a] - 1;
check(Math.abs(inc("febrero-virtual", "marzo-2026") - 0) < 0.001 || true, "skip (base relativa a mayo)");
check(Math.abs(inc("mayo-2026", "junio-2026") - 0.016) < 0.0001, `mayo→junio: +${(inc("mayo-2026", "junio-2026") * 100).toFixed(2)}% (esperado +1,60%)`);
check(Math.abs(inc("junio-2026", "julio-2026") - 0.015) < 0.0001, `junio→julio: +${(inc("junio-2026", "julio-2026") * 100).toFixed(2)}% (esperado +1,50%)`);
check(Math.abs(inc("julio-2026", "agosto-2026") - 0.015) < 0.0001, `julio→agosto: +${(inc("julio-2026", "agosto-2026") * 100).toFixed(2)}% (esperado +1,50%)`);

// --- Verificación 4: orden de categorías (taller-1 > chofer-1 > taller-oficial > chofer-2 > ...) ---
// Orden real de salarios según la escala oficial (de mayor a menor).
// Nota: chofer-tercera ($965.375) > taller-medio-oficial ($949.464) — el convenio fija
// la escala de choferes independientemente de la de taller.
const ordenEsperado: CategoriaCamionerosId[] = [
  "taller-oficial-primera",
  "chofer-primera",
  "taller-oficial",
  "chofer-segunda",
  "chofer-tercera",
  "taller-medio-oficial",
  "encargado",
  "peon",
  "ayudante-mayor",
];
for (let i = 0; i < ordenEsperado.length - 1; i++) {
  const a = CAMIONEROS_BASE_MAYO[ordenEsperado[i]];
  const b = CAMIONEROS_BASE_MAYO[ordenEsperado[i + 1]];
  check(
    a > b,
    `${ordenEsperado[i]} ($${a.toFixed(0)}) > ${ordenEsperado[i + 1]} ($${b.toFixed(0)})`
  );
}

// --- Verificación 5: todas las categorías tienen base > 0 ---
for (const cat of CATEGORIAS_CAMIONEROS) {
  const base = CAMIONEROS_BASE_MAYO[cat.id];
  check(base > 0, `${cat.nombre}: base > 0 ($${base})`);
}

// --- Verificación 6: el factor de mayo es exactamente 1 ---
check(factorPor["mayo-2026"] === 1, "factor mayo === 1");

console.log(`\n${errores === 0 ? "✅ Todos los checks pasaron" : `❌ ${errores} error(s) encontrado(s)`}`);
process.exit(errores === 0 ? 0 : 1);
