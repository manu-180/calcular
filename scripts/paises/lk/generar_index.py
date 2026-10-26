# Genera src/paises/lk/index.ts y los clientes de 4 líneas a partir de la lista de slugs.
# Uso: python scripts/paises/lk/generar_index.py
import re
from pathlib import Path

SLUGS = [
    "salary-calculator",
    "gross-salary-calculator",
    "apit-calculator",
    "epf-etf-calculator",
    "epf-withdrawal-calculator",
    "employer-cost-calculator",
    "income-tax-calculator",
    "freelancer-tax-calculator",
    "gratuity-tax-calculator",
    "bonus-tax-calculator",
    "minimum-wage",
    "vat-calculator",
    "sscl-calculator",
    "capital-gains-tax-calculator",
    "withholding-tax-calculator",
    "stamp-duty-calculator",
    "fixed-deposit-calculator",
    "dollar-rate",
    "gratuity-calculator",
    "overtime-calculator",
]

RAIZ = Path(__file__).resolve().parents[3] / "src" / "paises" / "lk"


def nombre(slug):
    return re.sub(r"-([a-z0-9])", lambda m: m.group(1).upper(), slug)


def contenido(slug):
    n = nombre(slug)
    return "contenido" + n[0].upper() + n[1:]


def escribir(ruta, texto):
    with open(ruta, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(texto)


SLUGS = [s for s in SLUGS if (RAIZ / "calculadoras" / f"{s}.ts").exists()]

for s in SLUGS:
    escribir(RAIZ / "calculadoras" / f"{s}.cliente.tsx",
             f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {nombre(s)} from "./{s}";\nexport default crearCalculadoraCliente({nombre(s)});\n')

imports = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in SLUGS:
    imports.append(f'import {nombre(s)} from "./calculadoras/{s}";')
    imports.append(f'import {contenido(s)} from "./contenido/{s}";')
imports += [
    'import datos from "./datos.json";',
    'import { detectores } from "./fuentes";',
    'import { mercado } from "./mercado";',
    'import { novedades } from "./novedades";',
    'import series from "./series.json";',
]
filas = [f'    {{ definicion: {nombre(s)}, contenido: {contenido(s)}, cliente: () => import("./calculadoras/{s}.cliente") }},' for s in SLUGS]
texto = "\n".join(imports) + "\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n" + "\n".join(filas) + "\n  ],\n  universales: \"todas\",\n  novedades,\n  detectores,\n});\n"
escribir(RAIZ / "index.ts", texto)
print(len(SLUGS), "calculadoras")
