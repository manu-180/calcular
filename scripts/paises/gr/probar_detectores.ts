// Prueba los detectores de gr contra una página guardada o contra la fuente real.
// Uso: npx tsx scripts/paises/gr/probar_detectores.ts [archivo.html]
// Con archivo, el detector del e-ΕΦΚΑ lee ese HTML con los años pasados a 2027 (así cada εγκύκλιος
// cuenta como nueva y se ve qué atrapa el filtro). Sin archivo, consulta www.e-efka.gov.gr.
import { readFileSync } from "node:fs";
import { detectores } from "../../../src/paises/gr/fuentes";
import type { Http } from "../../../src/motor/tipos";

async function main() {
  const archivo = process.argv[2];
  const http: Http = archivo
    ? {
        async texto() {
          return readFileSync(archivo, "utf8").replace(/(<span[^>]*>)20\d\d(<\/span>)/g, "$12027$2");
        },
        async json() {
          throw new Error("sin json");
        },
      }
    : {
        async texto(url) {
          const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36" } });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.text();
        },
        async json(url) {
          const r = await fetch(url);
          return r.json();
        },
      };
  for (const d of detectores) {
    if (d.metodo === "manual") {
      console.log(`${d.id}: manual (no se consulta)`);
      continue;
    }
    const res = await d.traer(http);
    console.log(`${d.id}:`, res === null ? "null (forma inesperada)" : `${res.length} hallazgos`);
    for (const h of (res ?? []) as readonly unknown[]) console.log("  ", JSON.stringify(h));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
