# Genera src/paises/mg/index.ts con las calculadoras en el orden de ORDEN (las que falten van al final).
import os
import re

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "src", "paises", "mg")
ORDEN = [
    "calcul-irsa",
    "calcul-salaire-net",
    "calcul-tva",
    "convertisseur-ariary-euro",
]


def camel(slug, prefijo=""):
    partes = slug.split("-")
    nombre = partes[0] + "".join(p.capitalize() for p in partes[1:])
    return prefijo + nombre[0].upper() + nombre[1:] if prefijo else nombre


archivos = sorted(
    f[:-3] for f in os.listdir(os.path.join(RAIZ, "calculadoras"))
    if f.endswith(".ts") and not f.endswith(".casos.ts")
)
slugs = [s for s in ORDEN if s in archivos] + [s for s in archivos if s not in ORDEN]

imports = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
imports += [f'import {camel(s)} from "./calculadoras/{s}";' for s in sorted(slugs)]
imports += [f'import {camel(s, "contenido")} from "./contenido/{s}";' for s in sorted(slugs)]
imports += [
    'import datos from "./datos.json";',
    'import { detectores } from "./fuentes";',
    'import { mercado } from "./mercado";',
    'import { novedades } from "./novedades";',
    'import series from "./series.json";',
]
filas = [
    f'    {{ definicion: {camel(s)}, contenido: {camel(s, "contenido")}, cliente: () => import("./calculadoras/{s}.cliente") }},'
    for s in slugs
]
texto = "\n".join(imports) + "\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  novedades,\n  detectores,\n  calculadoras: [\n" + "\n".join(filas) + "\n  ],\n  universales: \"todas\",\n});\n"
with open(os.path.join(RAIZ, "index.ts"), "w", encoding="utf-8", newline="\n") as f:
    f.write(texto)
print(len(slugs), "calculadoras")
