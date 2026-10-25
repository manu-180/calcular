// Corre los detectores de jm contra las fuentes reales, sin escribir nada.
// Uso: npx tsx scripts/paises/jm/probar_detectores.ts
import jm from "@/paises/jm";
import { correrDetectores } from "../../datos-paises/lib/detectores";
import { crearHttpReal } from "../../datos-paises/lib/http";

async function main() {
  const corrida = await correrDetectores(jm, crearHttpReal(), { hoy: "2026-10-25", vistos: new Set() });
  for (const r of corrida.resultados) console.log(`${r.estado.padEnd(12)} ${r.id}: ${r.detalle ?? ""}`);
  for (const h of corrida.hallazgosNuevos) console.log(`hallazgo: ${h.titulo} (${h.url})`);
}
void main();
