# Regenera src/paises/bj/index.ts y los .cliente.tsx a partir de las calculadoras de la carpeta.
#   python -I scripts/paises/bj/generar_index.py
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "bj"
CALC = RAIZ / "calculadoras"

# Orden de aparición: lo más buscado primero.
ORDEN = [
    "calcul-salaire-net", "calcul-its", "cotisations-cnss", "cout-employeur", "smig", "calcul-tva",
    "heures-supplementaires", "conges-payes", "preavis", "indemnite-licenciement-abusif",
    "taxe-professionnelle-synthetique", "impot-sur-les-societes", "impot-sur-les-benefices-d-affaires",
    "impot-revenus-fonciers", "plus-value-immobiliere", "impot-revenus-capitaux-mobiliers", "acompte-aib",
    "taxe-vehicules-a-moteur", "avantages-en-nature", "its-treizieme-mois", "convertisseur-euro-fcfa",
    "convertisseur-dollar-fcfa",
]


def camel(slug: str) -> str:
    partes = slug.split("-")
    return partes[0] + "".join(p.capitalize() for p in partes[1:])


slugs = sorted(p.stem for p in CALC.glob("*.ts") if not re.search(r"\.(casos|cliente)$", p.stem))
slugs.sort(key=lambda s: ORDEN.index(s) if s in ORDEN else len(ORDEN))

for s in slugs:
    v = camel(s)
    (CALC / f"{s}.cliente.tsx").write_text(
        f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {v} from "./{s}";\nexport default crearCalculadoraCliente({v});\n',
        encoding="utf-8", newline="\n")

imports = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
filas = []
for s in slugs:
    v = camel(s)
    c = "contenido" + v[0].upper() + v[1:]
    imports.append(f'import {v} from "./calculadoras/{s}";')
    imports.append(f'import {c} from "./contenido/{s}";')
    filas.append(f'    {{ definicion: {v}, contenido: {c}, cliente: () => import("./calculadoras/{s}.cliente") }},')
imports += [
    'import datos from "./datos.json";',
    'import { detectores } from "./fuentes";',
    'import { mercado } from "./mercado";',
    'import { novedades } from "./novedades";',
    'import series from "./series.json";',
]
cuerpo = "\n".join(imports) + "\n\nexport default definirPais({\n  mercado,\n  datos,\n  series,\n  avisos,\n  novedades,\n  detectores,\n  calculadoras: [\n" + "\n".join(filas) + '\n  ],\n  universales: "todas",\n});\n'
(RAIZ / "index.ts").write_text(cuerpo, encoding="utf-8", newline="\n")
print(len(slugs), "calculadoras")
