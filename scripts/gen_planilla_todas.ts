// Regenera TODOS los .xlsx entregables desde src/data/ (convenios, casas particulares, monotributo,
// alquileres con el IPC).
//
// Está pensado para correr en el build (package.json → "prebuild"), no a mano: el archivo que
// se le manda al comprador tiene que nacer del deploy, no de que alguien se acuerde de
// regenerarlo. Ese olvido es exactamente lo que hizo que la primera compradora del imperio
// (8/8/2026) recibiera la escala de seis semanas antes.
//
// Correr a mano: npx -y tsx scripts/gen_planilla_todas.ts

import { generarPlanillaComercio } from "./gen_planilla_comercio";
import { generarPlanillaUocra } from "./gen_planilla_uocra";
import { generarPlanillaCasas } from "./gen_planilla_casas";
import { generarPlanillaMonotributo } from "./gen_planilla_monotributo";
import { generarPlanillaAlquileres } from "./gen_planilla_alquileres";

async function main() {
  const salidas = [
    ["Comercio (CCT 130/75)", await generarPlanillaComercio()],
    ["UOCRA (CCT 76/75)", await generarPlanillaUocra()],
    ["Casas Particulares", await generarPlanillaCasas()],
    ["Monotributo", await generarPlanillaMonotributo()],
    ["Alquileres", await generarPlanillaAlquileres()],
  ] as const;

  for (const [nombre, ruta] of salidas) {
    console.log(`OK  ${nombre.padEnd(24)} → ${ruta}`);
  }
  console.log(`\n${salidas.length} planillas regeneradas desde src/data/.`);
}

main().catch((e) => {
  // Un fallo acá tiene que romper el build: es preferible no deployar a deployar con un
  // entregable viejo, que es el bug que se paga con la confianza del comprador.
  console.error("FALLÓ la generación de planillas:", e);
  process.exit(1);
});
