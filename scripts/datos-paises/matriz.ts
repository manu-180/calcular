// Mercados que corre .github/workflows/datos-paises.yml: registrados en src/paises/index.ts y con al
// menos un detector en su fuentes.ts. Imprime un array JSON en una sola línea (para $GITHUB_OUTPUT).
// zz y global no entran nunca solos: zz apunta a example.org y abriría un issue por día. Con
// --mercado <m> se valida y se devuelve ese solo (zz incluido, para probar a mano).
// Uso: npx tsx scripts/datos-paises/matriz.ts [--mercado <m>] [--detalle]
import { cargarPaises, registrados } from "../paises_comun";

const EXCLUIDOS = new Set(["zz", "global"]);

export async function mercadosConDetectores(): Promise<{ mercados: string[]; omitidos: string[] }> {
  const enIndice = new Set(registrados());
  const omitidos: string[] = [];
  const mercados: string[] = [];
  for (const { carpeta, pais, error } of await cargarPaises()) {
    if (EXCLUIDOS.has(carpeta)) continue;
    if (!enIndice.has(carpeta)) omitidos.push(`${carpeta}: no está registrado en src/paises/index.ts`);
    else if (!pais) omitidos.push(`${carpeta}: no carga (${error})`);
    else if (pais.detectores.length === 0) omitidos.push(`${carpeta}: sin detectores`);
    else mercados.push(carpeta);
  }
  return { mercados: mercados.sort(), omitidos };
}

async function main() {
  const i = process.argv.indexOf("--mercado");
  const pedido = i !== -1 ? (process.argv[i + 1] ?? "").trim().toLowerCase() : "";
  if (pedido) {
    const cargado = (await cargarPaises()).find((c) => c.carpeta === pedido);
    if (!cargado?.pais) {
      console.error(`mercado "${pedido}" no existe o no carga${cargado?.error ? `: ${cargado.error}` : ""}`);
      process.exit(1);
    }
    if (cargado.pais.detectores.length === 0) {
      console.error(`mercado "${pedido}" no tiene detectores`);
      process.exit(1);
    }
    console.log(JSON.stringify([pedido]));
    return;
  }
  const { mercados, omitidos } = await mercadosConDetectores();
  if (process.argv.includes("--detalle")) for (const o of omitidos) console.error(`omitido: ${o}`);
  console.log(JSON.stringify(mercados));
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
