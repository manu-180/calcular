# Genera src/paises/mw/index.ts con las calculadoras que tienen definición y contenido.
# Correr desde la raíz del repo: python scripts/paises/mw/gen_index.py
import os

AQUI = os.path.dirname(os.path.abspath(__file__))
PAIS = os.path.abspath(os.path.join(AQUI, "..", "..", "..", "src", "paises", "mw"))

ORDEN = [
    "paye-calculator",
    "net-salary-calculator",
    "pension-calculator",
    "employer-cost-calculator",
    "tevet-levy-calculator",
    "vat-calculator",
    "transfer-levy-calculator",
    "winnings-tax-calculator",
    "withholding-tax-calculator",
    "fringe-benefit-tax-calculator",
    "presumptive-tax-calculator",
    "personal-income-tax-calculator",
    "capital-gains-tax-calculator",
    "overtime-calculator",
    "annual-leave-calculator",
    "notice-period-calculator",
    "sick-leave-calculator",
    "maternity-leave-calculator",
    "severance-pay-calculator",
    "dollar-to-kwacha",
    "inflation-calculator",
]


def camel(slug):
    a, *resto = slug.split("-")
    return a + "".join(p[:1].upper() + p[1:] for p in resto)


slugs = [s for s in ORDEN if os.path.exists(os.path.join(PAIS, "calculadoras", s + ".ts")) and os.path.exists(os.path.join(PAIS, "contenido", s + ".ts"))]
lineas = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in slugs:
    c = camel(s)
    cc = "contenido" + c[:1].upper() + c[1:]
    lineas.append(f'import {c} from "./calculadoras/{s}";')
    lineas.append(f'import {cc} from "./contenido/{s}";')
lineas += [
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
]
for s in slugs:
    c = camel(s)
    cc = "contenido" + c[:1].upper() + c[1:]
    lineas.append(f'    {{ definicion: {c}, contenido: {cc}, cliente: () => import("./calculadoras/{s}.cliente") }},')
lineas += ["  ],", '  universales: "todas",', "  novedades,", "  detectores,", "});", ""]
with open(os.path.join(PAIS, "index.ts"), "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(lineas))
print(len(slugs), "calculadoras")
