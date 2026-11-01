// Corre los detectores de tt contra las fuentes reales, sin escribir nada.
// Uso: npx tsx scripts/paises/tt/probar_detectores.ts
import tt from "@/paises/tt";
import { correrDetectores } from "../../datos-paises/lib/detectores";
import { crearHttpReal } from "../../datos-paises/lib/http";

async function main() {
  const corrida = await correrDetectores(tt, crearHttpReal(), { hoy: "2026-10-27", vistos: new Set() });
  for (const r of corrida.resultados) console.log(`${r.estado.padEnd(12)} ${r.id}: ${r.detalle ?? ""}`);
  for (const h of corrida.hallazgosNuevos) console.log(`hallazgo: ${h.titulo} (${h.url})`);
}
void main();
