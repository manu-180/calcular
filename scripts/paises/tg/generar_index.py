# Genera src/paises/tg/index.ts y los .cliente.tsx de cada calculadora de SLUGS.
# Uso: python scripts/paises/tg/generar_index.py
from pathlib import Path

SLUGS = [
    "calcul-salaire-net",
    "calcul-irpp",
    "cotisations-cnss",
    "cout-employeur",
    "smig",
    "calcul-tva",
    "indemnite-licenciement",
    "preavis",
    "conges-payes",
    "indemnite-fin-de-contrat",
    "heures-supplementaires",
    "taxe-professionnelle-unique",
    "impot-sur-les-societes",
    "plus-value-immobiliere",
    "impot-sur-les-dividendes",
    "vignette-auto",
    "taxe-fonciere",
    "allocations-familiales",
    "convertisseur-euro-fcfa",
    "convertisseur-dollar-fcfa",
]

RAIZ = Path(__file__).resolve().parents[3] / "src" / "paises" / "tg"


def camel(slug: str) -> str:
    partes = slug.split("-")
    return partes[0] + "".join(p[:1].upper() + p[1:] for p in partes[1:])


def escribir(ruta: Path, texto: str) -> None:
    with open(ruta, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)


existentes = [s for s in SLUGS if (RAIZ / "calculadoras" / f"{s}.ts").exists()]
for s in existentes:
    c = camel(s)
    escribir(
        RAIZ / "calculadoras" / f"{s}.cliente.tsx",
        f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {c} from "./{s}";\nexport default crearCalculadoraCliente({c});\n',
    )

lineas = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in existentes:
    c = camel(s)
    contenido = "contenido" + c[:1].upper() + c[1:]
    lineas.append(f'import {c} from "./calculadoras/{s}";')
    lineas.append(f'import {contenido} from "./contenido/{s}";')
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
    "  novedades,",
    "  detectores,",
    "  calculadoras: [",
]
for s in existentes:
    c = camel(s)
    contenido = "contenido" + c[:1].upper() + c[1:]
    lineas.append(f'    {{ definicion: {c}, contenido: {contenido}, cliente: () => import("./calculadoras/{s}.cliente") }},')
lineas += ["  ],", '  universales: "todas",', "});", ""]
escribir(RAIZ / "index.ts", "\n".join(lineas))
print(len(existentes), "calculadoras")
