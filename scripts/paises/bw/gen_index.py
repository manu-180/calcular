# Genera src/paises/bw/index.ts y los clientes a partir de las calculadoras de la carpeta.
# Uso: python -I scripts/paises/bw/gen_index.py
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parents[3]
BW = RAIZ / "src" / "paises" / "bw"
ORDEN = [
    "take-home-pay", "paye-calculator", "bonus-tax-calculator", "gratuity-tax-calculator",
    "part-year-tax-calculator", "pension-lump-sum-tax", "pension-tax-relief", "company-car-benefit", "housing-benefit-calculator", "tax-free-salary-gross-up",
    "vat-calculator", "company-tax-calculator", "withholding-tax-calculator", "capital-gains-tax",
    "inflation-calculator", "minimum-wage", "overtime-calculator", "annual-leave", "notice-period",
    "transfer-duty",
]


def camel(slug):
    p = slug.split("-")
    return p[0] + "".join(x.capitalize() for x in p[1:])


slugs = [s for s in ORDEN if (BW / "calculadoras" / f"{s}.ts").exists()]
for s in slugs:
    (BW / "calculadoras" / f"{s}.cliente.tsx").write_text(
        f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport calculadora from "./{s}";\nexport default crearCalculadoraCliente(calculadora);\n',
        encoding="utf-8", newline="\n")
imports = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in slugs:
    c = camel(s)
    imports.append(f'import {c} from "./calculadoras/{s}";')
    imports.append(f'import contenido{c[0].upper() + c[1:]} from "./contenido/{s}";')
imports += ['import datos from "./datos.json";', 'import { detectores } from "./fuentes";', 'import { mercado } from "./mercado";',
            'import { novedades } from "./novedades";', 'import series from "./series.json";']
filas = []
for s in slugs:
    c = camel(s)
    filas.append(f'    {{ definicion: {c}, contenido: contenido{c[0].upper() + c[1:]}, cliente: () => import("./calculadoras/{s}.cliente") }},')
cuerpo = "\n".join(imports) + "\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n" + "\n".join(filas) + "\n  ],\n  universales: { todas: true },\n  novedades,\n  detectores,\n});\n"
(BW / "index.ts").write_text(cuerpo, encoding="utf-8", newline="\n")
print(f"{len(slugs)} calculadoras")
