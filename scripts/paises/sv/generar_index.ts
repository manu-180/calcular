// Regenera src/paises/sv/index.ts y los clientes de 4 líneas a partir del orden de ORDEN.
// Una calculadora nueva se suma acá (slug) y se corre: npx tsx scripts/paises/sv/generar_index.ts
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "src", "paises", "sv");

// Orden de aparición en el país: primero lo que más se busca.
const ORDEN = [
  "aguinaldo",
  "salario-liquido",
  "retencion-de-renta",
  "indemnizacion",
  "liquidacion",
  "quincena-25",
  "salario-minimo",
  "renuncia-voluntaria",
  "vacaciones",
  "horas-extra",
  "descuentos-isss-afp",
  "costo-empleador",
  "declaracion-de-renta",
  "retencion-servicios-profesionales",
  "incapacidad",
  "licencia-por-maternidad",
  "dia-de-asueto",
  "salario-por-hora",
  "pension-por-vejez",
  "impuesto-bienes-raices",
  "deposito-a-plazo",
  "colones-a-dolares",
  "iva",
  "inflacion",
  "embargo-de-salario",
  "descanso-semanal",
  "nocturnidad",
  "periodo-de-prueba",
  "preaviso-de-renuncia",
  "despido-contrato-a-plazo",
  "salario-de-aprendiz",
  "prestacion-por-muerte",
  "ganancia-de-capital",
  "renta-empresas",
  "pago-a-cuenta",
  "retencion-iva",
];

function variable(slug: string): string {
  const camel = slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  return /^\d/.test(camel) ? `c${camel}` : camel;
}

const presentes = ORDEN.filter((s) => existsSync(path.join(DIR, "calculadoras", `${s}.ts`)) && existsSync(path.join(DIR, "contenido", `${s}.ts`)));
const faltan = ORDEN.filter((s) => !presentes.includes(s));
if (faltan.length > 0) console.log(`Sin archivos todavía (no se registran): ${faltan.join(", ")}`);

for (const s of presentes) {
  const v = variable(s);
  writeFileSync(
    path.join(DIR, "calculadoras", `${s}.cliente.tsx`),
    `"use client";\nimport { crearCalculadoraCliente } from "@/motor/cliente";\nimport ${v} from "./${s}";\nexport default crearCalculadoraCliente(${v});\n`,
  );
}

const capital = (v: string) => v[0].toUpperCase() + v.slice(1);
const importaciones = [
  `import { definirPais } from "@/motor/registro";`,
  `import avisos from "./avisos.json";`,
  ...[...presentes].sort().map((s) => `import ${variable(s)} from "./calculadoras/${s}";`),
  ...[...presentes].sort().map((s) => `import contenido${capital(variable(s))} from "./contenido/${s}";`),
  `import datos from "./datos.json";`,
  `import { detectores } from "./fuentes";`,
  `import { mercado } from "./mercado";`,
  `import { novedades } from "./novedades";`,
  `import series from "./series.json";`,
];
const filas = presentes.map(
  (s) => `    { definicion: ${variable(s)}, contenido: contenido${capital(variable(s))}, cliente: () => import("./calculadoras/${s}.cliente") },`,
);
writeFileSync(
  path.join(DIR, "index.ts"),
  `${importaciones.join("\n")}\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n${filas.join("\n")}\n  ],\n  novedades,\n  detectores,\n});\n`,
);
console.log(`index.ts con ${presentes.length} calculadoras`);
