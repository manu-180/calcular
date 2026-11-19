// Parser del cuadro 3 del IPC del INEC con las dos formas que publicó: «ago-25» (hasta 2025) y
// «25-dic» (desde noviembre de 2026). Sin red. Uso: npx tsx scripts/paises/pa/check_cuadro3.ts
import assert from "node:assert/strict";
import { parsearCuadro3 } from "../../../src/paises/pa/fuentes";

const nuevo = ["Mes;Total;Alimentos", "25-dic;99.8;101.3", "26-sep;102.5;102", "26-oct;103;102.4", ""].join("\r\n");
assert.deepEqual(parsearCuadro3(nuevo), [
  { fecha: "2025-12-01", valor: 99.8 },
  { fecha: "2026-09-01", valor: 102.5 },
  { fecha: "2026-10-01", valor: 103 },
]);
const viejo = ["Mes;Total;Alimentos", "dic-24;110.1;111", "ago-25;109.8;111.6"].join("\n");
assert.deepEqual(parsearCuadro3(viejo), [
  { fecha: "2024-12-01", valor: 110.1 },
  { fecha: "2025-08-01", valor: 109.8 },
]);
assert.equal(parsearCuadro3("Mes;Total\n26-xyz;100;1"), null);
console.log("ok: pa cuadro 3");
