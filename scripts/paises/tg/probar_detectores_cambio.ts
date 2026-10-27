// Prueba que los detectores de norma avisan cuando la fuente cambia: lee las páginas reales y les
// cambia un dato antes de pasarlas al detector.
import { detectores } from "../../../src/paises/tg/fuentes";
import { crearHttpReal } from "../../datos-paises/lib/http";
import type { Http } from "../../../src/motor/tipos";

async function main() {
  const real = crearHttpReal();
  const cambios: Record<string, [RegExp, string]> = {
    "code-general-des-impots.html": [/mis-a-jour-2025/g, "mis-a-jour-2027"],
    "cotisations-sociales": [/cotise 17,50%/g, "cotise 18,50%"],
  };
  const falsa: Http = {
    ...real,
    async texto(url, opciones) {
      const t = await real.texto(url, opciones);
      const c = Object.entries(cambios).find(([k]) => url.includes(k));
      return c ? t.replace(c[1][0], c[1][1]) : t;
    },
  };
  for (const id of ["tg.otr-publications", "tg.cnss-taux"]) {
    const d = detectores.find((x) => x.id === id)!;
    console.log(id, JSON.stringify(await d.traer(falsa)));
  }
}

void main();
