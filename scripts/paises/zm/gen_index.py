# Arma src/paises/zm/index.ts con las calculadoras que hay en la carpeta, en el orden de ORDEN.
# Correr desde la raíz del repo: python scripts/paises/zm/gen_index.py
import os, re

BASE = "src/paises/zm"
ORDEN = [
    "paye-calculator", "net-salary-calculator", "napsa-calculator", "nhima-calculator", "employer-cost-calculator",
    "skills-development-levy-calculator", "minimum-wage", "overtime-calculator", "leave-days-calculator",
    "gratuity-calculator", "redundancy-pay-calculator", "notice-period-calculator", "maternity-leave-calculator",
    "sick-leave-calculator", "vat-calculator", "turnover-tax-calculator", "rental-income-tax-calculator",
    "property-transfer-tax-calculator", "mobile-money-levy-calculator", "presumptive-tax-calculator",
    "dollar-to-kwacha", "inflation-calculator",
]
existentes = {f[:-3] for f in os.listdir(f"{BASE}/calculadoras") if re.fullmatch(r"[a-z0-9-]+\.ts", f) and ".casos" not in f}
slugs = [s for s in ORDEN if s in existentes] + sorted(existentes - set(ORDEN))


def camel(s):
    return re.sub(r"-([a-z0-9])", lambda m: m.group(1).upper(), s)


imp = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
filas = []
for s in slugs:
    c = camel(s)
    if c[0].isdigit():
        c = "c" + c
    C = c[0].upper() + c[1:]
    cliente = f"{BASE}/calculadoras/{s}.cliente.tsx"
    if not os.path.exists(cliente):
        open(cliente, "w", encoding="utf-8", newline="\n").write(
            f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {c} from "./{s}";\nexport default crearCalculadoraCliente({c});\n'
        )
    imp.append(f'import {c} from "./calculadoras/{s}";')
    imp.append(f'import contenido{C} from "./contenido/{s}";')
    filas.append(f'    {{ definicion: {c}, contenido: contenido{C}, cliente: () => import("./calculadoras/{s}.cliente") }},')
imp += [
    'import datos from "./datos.json";',
    'import { detectores } from "./fuentes";',
    'import { mercado } from "./mercado";',
    'import { novedades } from "./novedades";',
    'import series from "./series.json";',
]
txt = "\n".join(imp) + "\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n" + "\n".join(filas) + "\n  ],\n  universales: \"todas\",\n  novedades,\n  detectores,\n});\n"
open(f"{BASE}/index.ts", "w", encoding="utf-8", newline="\n").write(txt)
print(len(slugs), "calculadoras")
