// Corre el detector del IPC del INEC contra la red real con el mismo Http que usa el cron.
// Uso: npx tsx scripts/paises/pa/probar_ipc.ts
import { crearHttpReal } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/pa/fuentes";

async function main() {
  const det = detectores.find((d) => d.id === "pa.inec-ipc");
  if (!det || det.carril !== "serie") throw new Error("falta el detector pa.inec-ipc");
  const puntos = await det.traer(crearHttpReal(90_000));
  console.log(det.id, puntos === null ? "null (forma inesperada)" : `${puntos.length} puntos`, JSON.stringify(puntos));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
