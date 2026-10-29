"""Arma src/paises/lr/index.ts con todas las calculadoras de la carpeta (en orden alfabético)."""
import pathlib
import re

raiz = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "lr"
slugs = sorted(
    p.stem for p in (raiz / "calculadoras").glob("*.ts") if not p.name.endswith(".casos.ts")
)


def camel(s: str) -> str:
    partes = s.split("-")
    return partes[0] + "".join(x.capitalize() for x in partes[1:])


imports = []
filas = []
for s in slugs:
    c = camel(s)
    imports.append(f'import {c} from "./calculadoras/{s}";')
    imports.append(f'import contenido{c[0].upper()}{c[1:]} from "./contenido/{s}";')
    filas.append(
        f'    {{ definicion: {c}, contenido: contenido{c[0].upper()}{c[1:]}, cliente: () => import("./calculadoras/{s}.cliente") }},'
    )
    cliente = raiz / "calculadoras" / f"{s}.cliente.tsx"
    if not cliente.exists():
        cliente.write_text(
            '"use client";\nimport { crearCalculadoraCliente } from "@/motor/cliente";\n'
            f'import calculadora from "./{s}";\nexport default crearCalculadoraCliente(calculadora);\n',
            encoding="utf-8",
            newline="\n",
        )

texto = "\n".join(
    [
        'import { definirPais } from "@/motor/registro";',
        'import avisos from "./avisos.json";',
        *imports,
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
        *filas,
        "  ],",
        '  universales: "todas",',
        "  novedades,",
        "  detectores,",
        "});",
        "",
    ]
)
(raiz / "index.ts").write_text(texto, encoding="utf-8", newline="\n")
print(len(slugs), "calculadoras")
