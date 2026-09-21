// Falla si algún archivo de texto versionado tiene CRLF en el working copy.
// Existe porque editar desde Python en modo texto en Windows reescribe el archivo entero en CRLF
// (tres veces: s103 llms.txt, 17/9 check_llms, 21/9 /indemnizacion). Git lo normaliza al commitear
// y el diff sale limpio, pero los checks que buscan "\n## ..." y el build leen el working copy.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const EXT = /\.(ts|tsx|js|mjs|json|md|txt|css|xml)$/;
const archivos = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .filter((f) => EXT.test(f));

const conCRLF = archivos.filter((f) => {
  try {
    return readFileSync(f).includes("\r\n");
  } catch {
    return false;
  }
});

if (conCRLF.length === 0) {
  console.log(`OK   ${archivos.length} archivos de texto en LF`);
  console.log("\nTODO OK");
  process.exit(0);
}
for (const f of conCRLF) console.error(`FAIL CRLF en ${f}`);
console.error(`\nArreglo: sed -i 's/\\r$//' ${conCRLF.join(" ")}`);
console.error("Causa típica: open(p, 'w') de Python en Windows (tools/minas-conocidas.md).");
process.exit(1);
