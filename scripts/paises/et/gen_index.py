# Genera src/paises/et/index.ts y los clientes de cuatro líneas a partir de las calculadoras que
# existen en src/paises/et/calculadoras. Uso: python -I scripts/paises/et/gen_index.py
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "et"
ORDEN = [
    "net-salary-calculator",
    "income-tax-calculator",
    "gross-salary-calculator",
    "pension-contribution-calculator",
    "employer-cost-calculator",
    "pension-calculator",
    "overtime-calculator",
    "public-holiday-pay-calculator",
    "annual-leave-calculator",
    "severance-pay-calculator",
    "final-settlement-calculator",
    "notice-period-calculator",
    "sick-leave-calculator",
    "maternity-leave-calculator",
    "vat-calculator",
    "withholding-tax-calculator",
    "rental-income-tax-calculator",
    "business-income-tax-calculator",
    "dividend-tax-calculator",
    "dollar-to-birr",
]


def camel(slug):
    partes = slug.split("-")
    return partes[0] + "".join(p.capitalize() for p in partes[1:])


def escribir(ruta, texto):
    with open(ruta, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)


existentes = {p.stem for p in (RAIZ / "calculadoras").glob("*.ts") if not re.search(r"\.(casos|cliente)$", p.stem)}
slugs = [s for s in ORDEN if s in existentes and (RAIZ / "contenido" / f"{s}.ts").exists()]
faltan = existentes - set(ORDEN)
if faltan:
    raise SystemExit(f"calculadoras fuera de ORDEN: {sorted(faltan)}")

for s in slugs:
    c = camel(s)
    escribir(
        RAIZ / "calculadoras" / f"{s}.cliente.tsx",
        f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {c} from "./{s}";\nexport default crearCalculadoraCliente({c});\n',
    )

imports = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in slugs:
    c = camel(s)
    imports.append(f'import {c} from "./calculadoras/{s}";')
    imports.append(f'import contenido{c[0].upper() + c[1:]} from "./contenido/{s}";')
imports += [
    'import datos from "./datos.json";',
    'import { detectores } from "./fuentes";',
    'import { mercado } from "./mercado";',
    'import { novedades } from "./novedades";',
    'import series from "./series.json";',
]
filas = []
for s in slugs:
    c = camel(s)
    filas.append(f'    {{ definicion: {c}, contenido: contenido{c[0].upper() + c[1:]}, cliente: () => import("./calculadoras/{s}.cliente") }},')

texto = "\n".join(imports) + "\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n" + "\n".join(filas) + '\n  ],\n  universales: "todas",\n  novedades,\n  detectores,\n});\n'
escribir(RAIZ / "index.ts", texto)
print(f"{len(slugs)} calculadoras en index.ts")
