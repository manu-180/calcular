// Pone la tipografía francesa (espacio fino o no separable antes de : ; ? ! % y dentro de « ») solo dentro de los strings de los fr.ts. Uso: npx tsx scripts/paises/tipografia_fr.ts [archivos]
import fs from "node:fs";
import path from "node:path";

const NB = " ";
const FINO = " ";
const ESP = "[ \\u00a0\\u202f]";

function arreglar(s: string): string {
  return s
    .replace(new RegExp(`${ESP}*:(?=\\s|$)`, "g"), `${NB}:`)
    .replace(new RegExp(`${ESP}*;`, "g"), `${FINO};`)
    .replace(new RegExp(`${ESP}*\\?`, "g"), `${FINO}?`)
    .replace(new RegExp(`${ESP}*!`, "g"), `${FINO}!`)
    .replace(new RegExp(`(?<=[0-9])${ESP}*%`, "g"), `${NB}%`)
    .replace(new RegExp(`^${ESP}+%`), `${NB}%`)
    .replace(new RegExp(`«${ESP}*`, "g"), `«${NB}`)
    .replace(new RegExp(`${ESP}*»`, "g"), `${NB}»`);
}

function procesar(src: string): string {
  const n = src.length;

  function cadena(q: string, i: number): [string, number] {
    let buf = "";
    let res = q;
    let j = i;
    while (j < n) {
      const c = src[j];
      if (c === "\\") {
        buf += src.slice(j, j + 2);
        j += 2;
        continue;
      }
      if (c === q) return [res + arreglar(buf) + q, j + 1];
      if (q === "`" && src.startsWith("${", j)) {
        res += arreglar(buf);
        buf = "";
        let prof = 0;
        let k = j;
        while (k < n) {
          const ch = src[k];
          if (k > j && (ch === '"' || ch === "'" || ch === "`")) {
            res += src.slice(j, k);
            const [s2, k2] = cadena(ch, k + 1);
            res += s2;
            j = k = k2;
            continue;
          }
          if (ch === "{") prof++;
          else if (ch === "}" && --prof === 0) break;
          k++;
        }
        res += src.slice(j, k + 1);
        j = k + 1;
        continue;
      }
      buf += c;
      j++;
    }
    throw new Error("string sin cerrar");
  }

  let out = "";
  let i = 0;
  while (i < n) {
    const c = src[i];
    if (src.startsWith("//", i)) {
      const e = src.indexOf("\n", i);
      const fin = e < 0 ? n : e;
      out += src.slice(i, fin);
      i = fin;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const [s, k] = cadena(c, i + 1);
      out += s;
      i = k;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

const RAIZ = path.resolve(import.meta.dirname, "..", "..", "src", "motor", "universales");
const archivos = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs
      .readdirSync(RAIZ)
      .flatMap((id) => ["textos", "contenido"].map((sub) => path.join(RAIZ, id, sub, "fr.ts")))
      .filter((f) => fs.existsSync(f));

let cambiados = 0;
for (const f of archivos) {
  const antes = fs.readFileSync(f, "utf8");
  const despues = procesar(antes);
  if (despues !== antes) {
    fs.writeFileSync(f, despues);
    cambiados++;
  }
}
console.log(`tipografia_fr: ${archivos.length} archivos, ${cambiados} cambiados ✓`);
