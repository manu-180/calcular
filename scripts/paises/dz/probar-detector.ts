// Prueba el detector del JORADP con una copia local de la portada (útil cuando Node no llega al sitio).
// Uso: curl -sk https://www.joradp.dz/HFR/Accueil.htm -o acc.htm && npx tsx scripts/paises/dz/probar-detector.ts acc.htm
import { readFileSync } from "node:fs";
import { detectores } from "../../../src/paises/dz/fuentes";
const html = readFileSync(process.argv[2], "utf8");
const d = detectores[0];
const http = { texto: async () => html } as never;
d.traer(http).then((r) => console.log(JSON.stringify(r, null, 1)));
