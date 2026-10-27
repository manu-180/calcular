import { detectores } from "../../../src/paises/cm/fuentes";
import { crearHttpReal } from "../../datos-paises/lib/http";

async function main() {
const http = crearHttpReal();
for (const d of detectores) {
  try {
    console.log(d.id, JSON.stringify(await d.traer(http)));
  } catch (e) {
    console.log(d.id, "ERROR", (e as Error).message);
  }
}
}

void main();
