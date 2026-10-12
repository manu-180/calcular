// Genera los clientes de 4 líneas que falten y reescribe src/paises/uy/index.ts con todas las
// calculadoras de la carpeta, en el orden de ORDEN (demanda) y después alfabético.
// Uso: npx tsx scripts/paises/uy/registrar.ts
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "src", "paises", "uy");
const ORDEN = [
  "sueldo-liquido",
  "liquidacion-por-egreso",
  "aguinaldo",
  "despido",
  "irpf",
  "salario-vacacional",
  "seguro-de-paro",
  "jubilacion",
  "dias-de-licencia",
  "sueldo-nominal",
  "aportes-bps",
  "horas-extra",
  "valor-ui",
  "iva",
  "salario-minimo",
  "dolar-bcu",
  "inflacion",
  "ajuste-alquiler",
  "trabajo-domestico",
  "monotributo",
];

const camel = (slug: string) => slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

const slugs = readdirSync(path.join(DIR, "calculadoras"))
  .filter((f) => /^[a-z0-9-]+\.ts$/.test(f) && !f.endsWith(".casos.ts"))
  .map((f) => f.replace(/\.ts$/, ""))
  .filter((s) => existsSync(path.join(DIR, "contenido", `${s}.ts`)));

slugs.sort((a, b) => {
  const ia = ORDEN.indexOf(a);
  const ib = ORDEN.indexOf(b);
  if (ia >= 0 || ib >= 0) return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
  return a.localeCompare(b);
});

for (const s of slugs) {
  const cliente = path.join(DIR, "calculadoras", `${s}.cliente.tsx`);
  if (!existsSync(cliente)) {
    writeFileSync(cliente, `"use client";\nimport { crearCalculadoraCliente } from "@/motor/cliente";\nimport ${camel(s)} from "./${s}";\nexport default crearCalculadoraCliente(${camel(s)});\n`);
  }
}

const importsCalc = slugs.map((s) => `import ${camel(s)} from "./calculadoras/${s}";`);
const importsCont = slugs.map((s) => `import contenido${camel(s)[0].toUpperCase()}${camel(s).slice(1)} from "./contenido/${s}";`);
const filas = slugs.map((s) => {
  const c = camel(s);
  return `    { definicion: ${c}, contenido: contenido${c[0].toUpperCase()}${c.slice(1)}, cliente: () => import("./calculadoras/${s}.cliente") },`;
});

const indice = `import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
${[...importsCalc, ...importsCont].sort((a, b) => a.localeCompare(b)).join("\n")}
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
${filas.join("\n")}
  ],
  novedades,
  detectores,
});
`;
writeFileSync(path.join(DIR, "index.ts"), indice);
console.log(`${slugs.length} calculadoras registradas`);
