"""Reescribe src/paises/lu/index.ts con todas las calculadoras que tienen definición y contenido."""
import pathlib
import re

BASE = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "lu"
ORDEN = [
    "salaire-brut-net", "impot-sur-le-revenu", "cotisations-sociales", "cout-employeur", "salaire-social-minimum",
    "calcul-tva", "conges-payes", "heures-supplementaires", "preavis-licenciement", "indemnite-de-depart",
    "allocations-familiales", "droits-enregistrement", "calcul-inflation", "indexation-salaires",
]

slugs = [p.stem for p in (BASE / "calculadoras").glob("*.ts") if not p.name.endswith(".casos.ts") and (BASE / "contenido" / p.name).exists()]
slugs.sort(key=lambda s: (ORDEN.index(s) if s in ORDEN else len(ORDEN), s))


def nombre(slug):
    n = re.sub(r"-(\w)", lambda m: m.group(1).upper(), slug)
    return "c" + n if n[0].isdigit() else n


def mayus(n):
    return n[0].upper() + n[1:]


lineas = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in slugs:
    lineas.append(f'import {nombre(s)} from "./calculadoras/{s}";')
for s in slugs:
    lineas.append(f'import contenido{mayus(nombre(s))} from "./contenido/{s}";')
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
    n = nombre(s)
    lineas.append(f'    {{ definicion: {n}, contenido: contenido{mayus(n)}, cliente: () => import("./calculadoras/{s}.cliente") }},')
lineas += [
    "  ],",
    "  universales: { todas: true },",
    "  novedades,",
    "  detectores,",
    "});",
    "",
]
with open(BASE / "index.ts", "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(lineas))
print(len(slugs), "calculadoras en index.ts")
