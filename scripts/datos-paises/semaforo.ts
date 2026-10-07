// Semáforo de vencimientos de los países (no AR): próxima revisión cercana, tramos que vencen sin
// reemplazo verificado, series más viejas que su maxAntiguedadDias y calculadoras que hoy no se
// publican o dejarían de publicarse en los próximos 30 días. La fecha de cada país es la de su zona.
// Uso: npx tsx scripts/datos-paises/semaforo.ts [--mercado <m>[,<m>...]] [--json] [--estricto]
//   sin --mercado: todos los países cargables menos zz. --estricto: sale 1 si hay algún rojo.
import { hoyEn } from "../../src/motor/vigencia";
import { cargarPaises } from "../paises_comun";
import { semaforoMarkdown, semaforoPais, type SemaforoPais } from "./lib/semaforo";

async function main() {
  const i = process.argv.indexOf("--mercado");
  const pedidos = i !== -1 ? (process.argv[i + 1] ?? "").split(",").map((x) => x.trim()).filter(Boolean) : [];
  const cargados = await cargarPaises();
  const semaforos: SemaforoPais[] = [];
  const errores: string[] = [];
  for (const { carpeta, pais, error } of cargados) {
    if (pedidos.length ? !pedidos.includes(carpeta) : carpeta === "zz") continue;
    if (!pais) {
      errores.push(`${carpeta}: ${error}`);
      continue;
    }
    if (pais.mercado.codigo === "global") continue;
    semaforos.push(semaforoPais(pais, hoyEn(pais.mercado)));
  }
  for (const p of pedidos) if (!cargados.some((c) => c.carpeta === p)) errores.push(`${p}: no existe src/paises/${p}`);

  if (process.argv.includes("--json")) console.log(JSON.stringify({ semaforos, errores }, null, 2));
  else {
    console.log(semaforoMarkdown(semaforos));
    for (const e of errores) console.log(`- **rojo** · ${e}`);
  }
  const rojos = errores.length + semaforos.reduce((n, s) => n + s.items.filter((x) => x.nivel === "rojo").length, 0);
  process.exit(process.argv.includes("--estricto") && rojos > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
