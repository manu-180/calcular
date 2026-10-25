"""Arma src/paises/jm/index.ts con las calculadoras en el orden de ORDEN. Uso: python scripts/paises/jm/generar_index.py"""
import os
import re

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
PAIS = os.path.join(RAIZ, "src", "paises", "jm")

ORDEN = [
    "salary-calculator",
    "income-tax-calculator",
    "nis-nht-education-tax-calculator",
    "employer-cost-calculator",
    "minimum-wage-calculator",
    "overtime-calculator",
    "vacation-leave-calculator",
    "sick-leave-calculator",
    "maternity-leave-calculator",
    "notice-period-calculator",
    "redundancy-calculator",
    "gct-calculator",
    "transfer-tax-calculator",
    "property-tax-calculator",
    "nht-mortgage-calculator",
    "usd-to-jmd",
    "inflation-calculator",
]


def var(slug):
    v = re.sub(r"-([a-z0-9])", lambda m: m.group(1).upper(), slug)
    return v


hay = [s for s in ORDEN if os.path.exists(os.path.join(PAIS, "calculadoras", s + ".ts"))]
lineas = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in hay:
    v = var(s)
    c = "contenido" + v[0].upper() + v[1:]
    lineas.append(f'import {v} from "./calculadoras/{s}";')
    lineas.append(f'import {c} from "./contenido/{s}";')
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
for s in hay:
    v = var(s)
    c = "contenido" + v[0].upper() + v[1:]
    lineas.append(f'    {{ definicion: {v}, contenido: {c}, cliente: () => import("./calculadoras/{s}.cliente") }},')
lineas += ["  ],", '  universales: "todas",', "  novedades,", "  detectores,", "});", ""]
with open(os.path.join(PAIS, "index.ts"), "w", encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(lineas))
print(len(hay), "calculadoras en index.ts")
