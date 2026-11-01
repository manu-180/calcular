"""Regenera src/paises/mr/index.ts con todas las calculadoras de la carpeta (orden alfabético).

Uso: python3 -I scripts/paises/mr/generar_index.py <raíz del repo>
"""
import os
import sys

raiz = sys.argv[1]
carpeta = os.path.join(raiz, "src", "paises", "mr")
slugs = sorted(
    f[:-3]
    for f in os.listdir(os.path.join(carpeta, "calculadoras"))
    if f.endswith(".ts") and not f.endswith(".casos.ts")
)


def camel(s: str) -> str:
    partes = s.split("-")
    return partes[0] + "".join(p[:1].upper() + p[1:] for p in partes[1:])


imports = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in slugs:
    c = camel(s)
    imports.append(f'import {c} from "./calculadoras/{s}";')
    imports.append(f'import contenido{c[:1].upper() + c[1:]} from "./contenido/{s}";')
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
    filas.append(
        f'    {{ definicion: {c}, contenido: contenido{c[:1].upper() + c[1:]}, cliente: () => import("./calculadoras/{s}.cliente") }},'
    )
texto = "\n".join(imports) + "\n\n// La TVA es local (calcul-tva): la universal del mismo concepto se cae sola.\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  calculadoras: [\n" + "\n".join(filas) + "\n  ],\n  universales: { todas: true },\n  novedades,\n  detectores,\n});\n"
with open(os.path.join(carpeta, "index.ts"), "w", encoding="utf-8", newline="\n") as fh:
    fh.write(texto)
print(len(slugs), "calculadoras")
