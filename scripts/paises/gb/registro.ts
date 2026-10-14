import { existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const RAIZ = path.join(process.cwd(), "src/paises/gb");
const ORDEN = [
  "take-home-pay",
  "income-tax-calculator",
  "national-insurance-calculator",
  "stamp-duty-calculator",
  "student-loan-repayment",
  "vat-calculator",
  "minimum-wage",
  "redundancy-pay",
  "holiday-entitlement",
  "maternity-pay",
  "statutory-sick-pay",
  "self-employed-tax",
  "dividend-tax",
  "capital-gains-tax",
  "pension-tax-relief",
  "employer-ni-calculator",
  "state-pension",
  "child-benefit",
  "notice-period",
  "inflation-calculator",
  "tracker-mortgage",
];

const camel = (slug: string) => slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const pascal = (slug: string) => camel(slug).replace(/^./, (c) => c.toUpperCase());

const slugs = readdirSync(path.join(RAIZ, "calculadoras"))
  .filter((f) => f.endsWith(".ts") && !f.endsWith(".casos.ts"))
  .map((f) => f.slice(0, -3))
  .sort((a, b) => (ORDEN.indexOf(a) + 1 || 999) - (ORDEN.indexOf(b) + 1 || 999));

for (const slug of slugs) {
  const cliente = path.join(RAIZ, "calculadoras", `${slug}.cliente.tsx`);
  if (!existsSync(cliente)) {
    writeFileSync(cliente, `"use client";\nimport { crearCalculadoraCliente } from "@/motor/cliente";\nimport calculadora from "./${slug}";\nexport default crearCalculadoraCliente(calculadora);\n`);
  }
  if (!existsSync(path.join(RAIZ, "contenido", `${slug}.ts`))) throw new Error(`falta contenido/${slug}.ts`);
}

const importaciones = [
  `import { definirPais } from "@/motor/registro";`,
  `import avisos from "./avisos.json";`,
  ...slugs.flatMap((s) => [`import ${camel(s)} from "./calculadoras/${s}";`, `import contenido${pascal(s)} from "./contenido/${s}";`]),
  `import datos from "./datos.json";`,
  `import { detectores } from "./fuentes";`,
  `import { mercado } from "./mercado";`,
  `import { novedades } from "./novedades";`,
  `import series from "./series.json";`,
];
const entradas = slugs.map((s) => `    { definicion: ${camel(s)}, contenido: contenido${pascal(s)}, cliente: () => import("./calculadoras/${s}.cliente") },`);
const texto = `${importaciones.join("\n")}

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
${entradas.join("\n")}
  ],
  universales: "todas",
  novedades,
  detectores,
});
`;
writeFileSync(path.join(RAIZ, "index.ts"), texto);
console.log(`${slugs.length} calculadoras locales`);
