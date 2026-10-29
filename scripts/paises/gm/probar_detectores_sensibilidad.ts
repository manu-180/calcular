// Corre los detectores de norma contra páginas armadas a mano para ver que avisan cuando la fuente cambia
// y que devuelven null cuando la forma no es la esperada.
import { detectores } from "../../../src/paises/gm/fuentes";
import type { Http } from "../../../src/motor/tipos";

const paginas: Record<string, string[]> = {
  "gm.gra-descargas": ["<a>Income Tax Table 2025</a>", "<a>Income Tax Table 2027</a><a>Finance Act 2027</a>", "<p>sin tablas</p>"],
  "gm.sshfc-npf": [
    "The contribution rate is 15% of basis salary, Five (5) per cent (%) of which ... ten (10) per cent (%) is paid by the employer",
    "The contribution rate is 18% of basis salary, Six (6) per cent ...",
    "<p>otra cosa</p>",
  ],
  "gm.assembly-labour": ["LABOUR ACT, 2023", "LABOUR (AMENDMENT) ACT, 2027 LABOUR ACT, 2023", "<p>nada</p>"],
};

async function main(): Promise<void> {
  for (const d of detectores) {
    if (d.carril !== "norma") continue;
    for (const html of paginas[d.id] ?? []) {
      const http: Http = { json: async () => null, texto: async () => html };
      console.log(d.id, JSON.stringify(await d.traer(http)));
    }
  }
}

void main();
