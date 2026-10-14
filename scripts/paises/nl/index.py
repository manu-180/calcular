"""Genera src/paises/nl/index.ts y los clientes de cuatro líneas a partir de calculadoras/<slug>.ts."""

from pathlib import Path

BASE = Path(__file__).resolve().parents[3] / "src" / "paises" / "nl"
ORDEN = [
    "bruto-netto-salaris",
    "inkomstenbelasting-berekenen",
    "btw-berekenen",
    "minimumloon-berekenen",
    "vakantiegeld-berekenen",
    "vakantiedagen-berekenen",
    "transitievergoeding-berekenen",
    "opzegtermijn-berekenen",
    "ww-uitkering-berekenen",
    "zzp-belasting-berekenen",
    "arbeidskorting-berekenen",
    "algemene-heffingskorting-berekenen",
    "box-3-berekenen",
    "hypotheekrenteaftrek-berekenen",
    "eigenwoningforfait-berekenen",
    "overdrachtsbelasting-berekenen",
    "aow-berekenen",
    "kinderbijslag-berekenen",
    "werkgeverslasten-berekenen",
    "bijtelling-berekenen",
    "kilometervergoeding-berekenen",
    "thuiswerkvergoeding-berekenen",
    "inflatie-berekenen",
]


def camel(slug: str) -> str:
    partes = [p for p in slug.split("-") if p]
    nombre = partes[0] + "".join(p[:1].upper() + p[1:] for p in partes[1:])
    return nombre if not nombre[0].isdigit() else "c" + nombre


def escribir(ruta: Path, texto: str) -> None:
    with open(ruta, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)


existentes = {p.stem for p in (BASE / "calculadoras").glob("*.ts") if not p.stem.endswith((".casos", ".cliente"))}
slugs = [s for s in ORDEN if s in existentes] + sorted(existentes - set(ORDEN))

for s in slugs:
    escribir(
        BASE / "calculadoras" / f"{s}.cliente.tsx",
        f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport calculadora from "./{s}";\nexport default crearCalculadoraCliente(calculadora);\n',
    )

imports = [f'import {camel(s)} from "./calculadoras/{s}";\nimport contenido{camel(s)[0].upper() + camel(s)[1:]} from "./contenido/{s}";' for s in slugs]
entradas = [
    f'    {{ definicion: {camel(s)}, contenido: contenido{camel(s)[0].upper() + camel(s)[1:]}, cliente: () => import("./calculadoras/{s}.cliente") }},'
    for s in slugs
]

index = (
    'import { definirPais } from "@/motor/registro";\n'
    'import avisos from "./avisos.json";\n'
    + "\n".join(imports)
    + '\nimport datos from "./datos.json";\n'
    'import { detectores } from "./fuentes";\n'
    'import { mercado } from "./mercado";\n'
    'import { novedades } from "./novedades";\n'
    'import series from "./series.json";\n\n'
    "export default definirPais({\n"
    "  mercado,\n  datos,\n  series,\n  avisos,\n"
    "  calculadoras: [\n" + "\n".join(entradas) + "\n  ],\n"
    "  universales: \"todas\",\n"
    "  novedades,\n  detectores,\n});\n"
)
escribir(BASE / "index.ts", index)
print(f"{len(slugs)} calculadoras: {', '.join(slugs)}")
