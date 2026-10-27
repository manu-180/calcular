# Arma src/paises/gm/index.ts y los .cliente.tsx a partir de las calculadoras de la carpeta.
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3] / "src" / "paises" / "gm"
CALC = RAIZ / "calculadoras"


def camel(slug: str) -> str:
    p = slug.split("-")
    return p[0] + "".join(x.capitalize() for x in p[1:])


slugs = sorted(f.stem for f in CALC.glob("*.ts") if not f.name.endswith(".casos.ts"))

for s in slugs:
    cliente = CALC / f"{s}.cliente.tsx"
    with open(cliente, "w", encoding="utf-8", newline="\n") as f:
        f.write(f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport calculadora from "./{s}";\nexport default crearCalculadoraCliente(calculadora);\n')

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

texto = "\n".join(imports) + "\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n" + "\n".join(filas) + "\n  ],\n  universales: \"todas\",\n  novedades,\n  detectores,\n});\n"
with open(RAIZ / "index.ts", "w", encoding="utf-8", newline="\n") as f:
    f.write(texto)
print(len(slugs), "calculadoras")
