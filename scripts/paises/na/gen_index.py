# Arma src/paises/na/index.ts y los .cliente.tsx a partir de la lista de calculadoras.
# Uso: python scripts/paises/na/gen_index.py
import os

RAIZ = os.path.join(os.path.dirname(__file__), "..", "..", "..", "src", "paises", "na")
ORDEN = [
    "paye-calculator",
    "net-salary-calculator",
    "social-security-calculator",
    "employer-cost-calculator",
    "minimum-wage",
    "overtime-calculator",
    "public-holiday-pay-calculator",
    "annual-leave-calculator",
    "sick-leave-calculator",
    "maternity-leave-calculator",
    "severance-pay-calculator",
    "notice-period-calculator",
    "final-pay-calculator",
    "transfer-duty-calculator",
    "pension-tax-deduction-calculator",
    "corporate-tax-calculator",
    "withholding-tax-calculator",
    "vet-levy-calculator",
    "usd-to-nad",
]


def camel(slug):
    p = slug.split("-")
    return p[0] + "".join(x.capitalize() for x in p[1:])


slugs = [s for s in ORDEN if os.path.exists(os.path.join(RAIZ, "calculadoras", s + ".ts"))]
imports = []
filas = []
for s in slugs:
    c = camel(s)
    cc = "contenido" + c[0].upper() + c[1:]
    imports.append(f'import {c} from "./calculadoras/{s}";\nimport {cc} from "./contenido/{s}";')
    filas.append(f'    {{ definicion: {c}, contenido: {cc}, cliente: () => import("./calculadoras/{s}.cliente") }},')
    with open(os.path.join(RAIZ, "calculadoras", s + ".cliente.tsx"), "w", newline="\n", encoding="utf-8") as fh:
        fh.write(f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {c} from "./{s}";\nexport default crearCalculadoraCliente({c});\n')

texto = (
    'import { definirPais } from "@/motor/registro";\n'
    'import avisos from "./avisos.json";\n'
    + "\n".join(imports)
    + '\nimport datos from "./datos.json";\n'
    'import { detectores } from "./fuentes";\n'
    'import { mercado } from "./mercado";\n'
    'import { novedades } from "./novedades";\n'
    'import series from "./series.json";\n\n'
    "export default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n"
    + "\n".join(filas)
    + '\n  ],\n  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "na.vat" } }] },\n  novedades,\n  detectores,\n});\n'
)
with open(os.path.join(RAIZ, "index.ts"), "w", newline="\n", encoding="utf-8") as fh:
    fh.write(texto)
print(len(slugs), "calculadoras")
