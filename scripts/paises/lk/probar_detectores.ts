// Corre los detectores de lk contra las fuentes reales, sin escribir nada.
// Uso: npx tsx scripts/paises/lk/probar_detectores.ts
import lk from "@/paises/lk";
import { correrDetectores } from "../../datos-paises/lib/detectores";
import { crearHttpReal } from "../../datos-paises/lib/http";

async function main() {
  const corrida = await correrDetectores(lk, crearHttpReal(), { hoy: "2026-10-26", vistos: new Set() });
  for (const r of corrida.resultados) console.log(`${r.estado.padEnd(12)} ${r.id}: ${r.detalle ?? ""}`);
  for (const h of corrida.hallazgosNuevos) console.log(`hallazgo: ${h.titulo} (${h.url})`);
}
void main();
