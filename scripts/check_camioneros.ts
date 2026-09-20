// Ancla la escala de Camioneros (CCT 40/89) contra las planillas FIRMADAS de FADEEAC.
//
// POR QUÉ ESTE CHECK SE REESCRIBIÓ (20/9/2026): el anterior verificaba que cada mes subiera
// el porcentaje que decía el acuerdo original (+1,5% de junio a julio). Julio y agosto
// estaban 2,68% por debajo del básico real y el check salía VERDE, porque afirmaba el
// supuesto en lugar de la fuente: la cláusula TERCERA pactó una revisión en junio que se
// incorporó a la escala de julio, y esa revisión fue +4,22%.
//
// La lección, que es la forma de este archivo: un check de convenio no confirma la
// aritmética que ya usó el código para generar el número — compara contra la tabla oficial
// transcripta del PDF, y exige que la parte derivable se derive.
//
// Correr con: npx tsx scripts/check_camioneros.ts

import {
  CAMIONEROS_BASE_MAYO,
  CATEGORIAS_CAMIONEROS,
  ESCALAS_POR_MES,
  MESES_CAMIONEROS,
  basicoCamioneros,
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

// --- 1 · Los números de la planilla firmada, transcriptos del PDF de cada mes ---
// Tres categorías por mes, elegidas en extremos de la tabla (la primera fila, la última del
// bloque de choferes y una del bloque de taller): si la transcripción se corrió de fila o de
// columna, alguna de las tres no cierra.
const PLANILLA_FADEEAC: Record<string, Partial<Record<CategoriaCamionerosId, number>>> = {
  "marzo-2026": { "chofer-primera": 917_462.42, peon: 837_929.46, "taller-oficial": 921_140.39 },
  "abril-2026": { "chofer-primera": 984_338.23, peon: 899_007.94, "taller-oficial": 988_284.3 },
  "mayo-2026": { "chofer-primera": 1_001_071.98, peon: 914_291.07, "taller-oficial": 1_005_085.13 },
  "junio-2026": { "chofer-primera": 1_017_089.13, peon: 928_919.73, "taller-oficial": 1_021_166.49 },
  "julio-2026": { "chofer-primera": 1_060_010.29, peon: 968_120.14, "taller-oficial": 1_064_259.72 },
  "agosto-2026": { "chofer-primera": 1_075_910.44, peon: 982_641.94, "taller-oficial": 1_080_223.62 },
};

for (const [mesId, filas] of Object.entries(PLANILLA_FADEEAC)) {
  for (const [catId, esperado] of Object.entries(filas)) {
    const publicado = basicoCamioneros(mesId, catId as CategoriaCamionerosId);
    check(
      publicado === esperado,
      `${mesId} · ${catId}: publicado $${publicado?.toFixed(2)} = planilla firmada $${esperado.toFixed(2)}`,
    );
  }
}

// --- 2 · El acuerdo sube a TODAS las categorías en el mismo porcentaje ---
// Es la propiedad que hace verificable a la tabla entera con sólo tres filas ancladas: si una
// categoría quedó cargada con otro criterio (o mal tipeada), su salto se despega del resto.
// Fue justo así como apareció el error de `taller-oficial`, que venía de una fuente distinta.
const ids = MESES_CAMIONEROS.map((m) => m.id);
for (let i = 0; i < ids.length - 1; i++) {
  const [a, b] = [ids[i], ids[i + 1]];
  const saltos = CATEGORIAS_CAMIONEROS.map(
    (c) => basicoCamioneros(b, c.id)! / basicoCamioneros(a, c.id)!,
  );
  const min = Math.min(...saltos);
  const max = Math.max(...saltos);
  check(
    max - min < 1e-5,
    `${a}→${b}: las 9 categorías suben lo mismo (+${((min - 1) * 100).toFixed(3)}%, dispersión ${(max - min).toExponential(1)})`,
  );
}

// --- 3 · Los tramos que el acuerdo escribe como porcentaje tienen que dar ESE porcentaje ---
// Los cuatro primeros son los del acuerdo del 13/3/2026. Junio→julio NO está acá a propósito:
// es la revisión de la cláusula TERCERA, un número que el acuerdo no fija y que sólo se sabe
// leyendo la planilla republicada. Si algún día vuelve a valer 1,5%, este check no lo tapa.
const saltoChofer1 = (a: string, b: string) =>
  basicoCamioneros(b, "chofer-primera")! / basicoCamioneros(a, "chofer-primera")! - 1;

check(
  Math.abs(saltoChofer1("abril-2026", "mayo-2026") - 0.017) < 1e-5,
  `abril→mayo: +${(saltoChofer1("abril-2026", "mayo-2026") * 100).toFixed(2)}% (acuerdo: +1,70%)`,
);
check(
  Math.abs(saltoChofer1("mayo-2026", "junio-2026") - 0.016) < 1e-5,
  `mayo→junio: +${(saltoChofer1("mayo-2026", "junio-2026") * 100).toFixed(2)}% (acuerdo: +1,60%)`,
);
check(
  Math.abs(saltoChofer1("julio-2026", "agosto-2026") - 0.015) < 1e-5,
  `julio→agosto: +${(saltoChofer1("julio-2026", "agosto-2026") * 100).toFixed(2)}% (acuerdo: +1,50%)`,
);

// Marzo→abril se deriva de la cláusula PRIMERA: al Chofer de Primera se le incorporan al
// básico $49.471 de la suma no remunerativa, y al resto "proporcionalmente" — o sea el mismo
// coeficiente, no el mismo monto. Encima corre el tramo de abril (+1,8%).
const marzoChofer1 = basicoCamioneros("marzo-2026", "chofer-primera")!;
const abrilDerivado = (marzoChofer1 + 49_471) * 1.018;
check(
  Math.abs(abrilDerivado - basicoCamioneros("abril-2026", "chofer-primera")!) < 1,
  `marzo→abril: (básico + $49.471) × 1,018 = $${abrilDerivado.toFixed(2)} ≈ planilla de abril`,
);

// --- 4 · La revisión de julio quedó registrada, no absorbida en silencio ---
const revisionJulio = saltoChofer1("junio-2026", "julio-2026");
check(
  revisionJulio > 0.04,
  `junio→julio: +${(revisionJulio * 100).toFixed(2)}% — la revisión de la cláusula TERCERA está aplicada (el tramo original era +1,5%)`,
);
const julio = MESES_CAMIONEROS.find((m) => m.id === "julio-2026")!;
check(
  /revisi[oó]n/i.test(julio.cambios),
  "la página de julio explica que ese salto es la revisión, no el tramo del acuerdo",
);

// --- 5 · Cada mes publicado tiene su PDF firmado, y las 9 categorías cargadas ---
for (const m of MESES_CAMIONEROS) {
  check(
    /^https:\/\/www\.fadeeac\.org\.ar\/.*\.pdf$/.test(m.planillaOficial),
    `${m.id}: apunta a la planilla oficial de FADEEAC`,
  );
  const escala = ESCALAS_POR_MES[m.id];
  check(
    escala !== undefined &&
      CATEGORIAS_CAMIONEROS.every((c) => typeof escala[c.id] === "number" && escala[c.id] > 0),
    `${m.id}: las ${CATEGORIAS_CAMIONEROS.length} categorías tienen básico oficial`,
  );
}

// --- 6 · Orden de la escala (atrapa un número tipeado en la fila equivocada) ---
// Ojo con el segundo y el tercero: en la planilla oficial el Oficial de taller ($1.005.085)
// está ARRIBA del Chofer de Primera ($1.001.072), por poco. El orden anterior los tenía al
// revés, y no era un criterio: era consecuencia del básico de taller mal cargado.
const ordenEsperado: CategoriaCamionerosId[] = [
  "taller-oficial-primera",
  "taller-oficial",
  "chofer-primera",
  "chofer-segunda",
  "chofer-tercera",
  "taller-medio-oficial",
  "encargado",
  "peon",
  "ayudante-mayor",
];
check(
  ordenEsperado.length === CATEGORIAS_CAMIONEROS.length,
  "el orden esperado cubre todas las categorías publicadas",
);
for (let i = 0; i < ordenEsperado.length - 1; i++) {
  const a = CAMIONEROS_BASE_MAYO[ordenEsperado[i]];
  const b = CAMIONEROS_BASE_MAYO[ordenEsperado[i + 1]];
  check(a > b, `${ordenEsperado[i]} ($${a.toFixed(0)}) > ${ordenEsperado[i + 1]} ($${b.toFixed(0)})`);
}

console.log("");
if (errores > 0) {
  console.error(`❌ ${errores} check(s) de camioneros fallaron`);
  process.exit(1);
} else {
  console.log("Todos los checks de camioneros OK (escala anclada a la planilla firmada de FADEEAC)");
}
