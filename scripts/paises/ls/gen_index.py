# Genera src/paises/ls/index.ts con las calculadoras de la lista que ya existen, en ese orden.
#   python -I scripts/paises/ls/gen_index.py
SLUGS = [
    "take-home-pay",
    "income-tax-calculator",
    "gross-salary-calculator",
    "fringe-benefits-tax",
    "company-tax-calculator",
    "withholding-tax-calculator",
    "overtime-calculator",
    "annual-leave",
    "sick-leave",
    "notice-period",
    "severance-pay",
    "final-pay",
    "maternity-leave",
    "vat-calculator",
    "pension-lump-sum-tax",
    "bonus-tax-calculator",
    "hourly-rate-calculator",
]

import os

SLUGS = [s for s in SLUGS if os.path.exists(f"src/paises/ls/calculadoras/{s}.ts")]


def camel(slug):
    a, *resto = slug.split("-")
    return a + "".join(p.capitalize() for p in resto)


imports = []
filas = []
for s in SLUGS:
    c = camel(s)
    imports.append(f'import {c} from "./calculadoras/{s}";')
    imports.append(f'import contenido{c[0].upper() + c[1:]} from "./contenido/{s}";')
    filas.append(f'    {{ definicion: {c}, contenido: contenido{c[0].upper() + c[1:]}, cliente: () => import("./calculadoras/{s}.cliente") }},')

texto = "\n".join(
    [
        'import { definirPais } from "@/motor/registro";',
        'import avisos from "./avisos.json";',
        *imports,
        'import datos from "./datos.json";',
        'import { detectores } from "./fuentes";',
        'import { mercado } from "./mercado";',
        'import { novedades } from "./novedades";',
        'import series from "./series.json";',
        "",
        "export default definirPais({",
        "  mercado,",
        "  datos,",
        "  series,",
        "  avisos,",
        "  calculadoras: [",
        *filas,
        "  ],",
        '  universales: "todas",',
        "  novedades,",
        "  detectores,",
        "});",
        "",
    ]
)

with open("src/paises/ls/index.ts", "w", encoding="utf-8", newline="\n") as fh:
    fh.write(texto)
print("index con", len(SLUGS), "calculadoras")
