// Crea el cliente de 4 líneas de una o más calculadoras de gr y las suma a src/paises/gr/index.ts.
// Uso: npx tsx scripts/paises/gr/nueva.ts <slug> [<slug> ...]
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const RAIZ = path.resolve(__dirname, "../../../src/paises/gr");
const camel = (s: string) => s.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const pascal = (s: string) => camel(s).replace(/^./, (c) => c.toUpperCase());

let index = readFileSync(path.join(RAIZ, "index.ts"), "utf8");
for (const slug of process.argv.slice(2)) {
  const nombre = camel(slug);
  const cliente = path.join(RAIZ, "calculadoras", `${slug}.cliente.tsx`);
  if (!existsSync(cliente)) {
    writeFileSync(
      cliente,
      `"use client";\nimport { crearCalculadoraCliente } from "@/motor/cliente";\nimport ${nombre} from "./${slug}";\nexport default crearCalculadoraCliente(${nombre});\n`,
    );
  }
  if (index.includes(`./calculadoras/${slug}"`)) continue;
  index = index.replace(
    'import datos from "./datos.json";',
    `import ${nombre} from "./calculadoras/${slug}";\nimport contenido${pascal(slug)} from "./contenido/${slug}";\nimport datos from "./datos.json";`,
  );
  index = index.replace(
    "  ],\n  universales:",
    `    { definicion: ${nombre}, contenido: contenido${pascal(slug)}, cliente: () => import("./calculadoras/${slug}.cliente") },\n  ],\n  universales:`,
  );
}
writeFileSync(path.join(RAIZ, "index.ts"), index);
