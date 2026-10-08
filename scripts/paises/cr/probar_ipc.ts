// Corre el detector del IPC contra la red real con el mismo Http que usa el cron.
// Uso: npx tsx scripts/paises/cr/probar_ipc.ts            (lo que traería el cron)
//      npx tsx scripts/paises/cr/probar_ipc.ts --semilla  (la serie desde enero de 2000, para series.json)
import { crearHttpReal } from "../../datos-paises/lib/http";
import { detectores, parsearIpcBccr } from "../../../src/paises/cr/fuentes";

const SEMILLA =
  "https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?CodCuadro=2732&Idioma=1&FecInicial=2000/01/01&FecFinal=2035/12/31&Filtro=0&Exportar=True";

async function main() {
  const http = crearHttpReal(90_000);
  if (process.argv.includes("--semilla")) {
    const puntos = parsearIpcBccr(await http.texto(SEMILLA));
    if (!puntos) throw new Error("el BCCR devolvió otra forma");
    console.log(JSON.stringify(puntos.map((p) => [p.fecha, p.valor])));
    return;
  }
  const det = detectores.find((d) => d.id === "cr.bccr-ipc");
  if (!det || det.carril !== "serie") throw new Error("falta el detector cr.bccr-ipc");
  const puntos = await det.traer(http);
  console.log(det.id, puntos === null ? "null (forma inesperada)" : `${puntos.length} puntos`, JSON.stringify(puntos?.slice(-3)));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
