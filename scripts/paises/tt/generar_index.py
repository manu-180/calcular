# Genera src/paises/tt/index.ts y los clientes de 4 líneas a partir de las calculadoras que existen.
# El orden de SLUGS es el orden en que aparecen en la portada del país.
from pathlib import Path

SLUGS = [
    "salary-calculator",
    "income-tax-calculator",
    "nis-calculator",
    "health-surcharge-calculator",
    "employer-cost-calculator",
    "minimum-wage-calculator",
    "maternity-leave-calculator",
    "severance-tax-calculator",
    "vat-calculator",
    "stamp-duty-calculator",
    "usd-to-ttd",
]

RAIZ = Path(__file__).resolve().parents[3] / "src" / "paises" / "tt"


def camel(slug):
    partes = slug.split("-")
    return partes[0] + "".join(p.capitalize() for p in partes[1:])


def escribir(ruta, texto):
    with open(ruta, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)


slugs = [s for s in SLUGS if (RAIZ / "calculadoras" / f"{s}.ts").exists()]
for s in slugs:
    escribir(
        RAIZ / "calculadoras" / f"{s}.cliente.tsx",
        f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {camel(s)} from "./{s}";\nexport default crearCalculadoraCliente({camel(s)});\n',
    )

lineas = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in slugs:
    c = camel(s)
    lineas.append(f'import {c} from "./calculadoras/{s}";')
    lineas.append(f'import contenido{c[0].upper() + c[1:]} from "./contenido/{s}";')
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
    c = camel(s)
    lineas.append(f'    {{ definicion: {c}, contenido: contenido{c[0].upper() + c[1:]}, cliente: () => import("./calculadoras/{s}.cliente") }},')
lineas += ["  ],", '  universales: "todas",', "  novedades,", "  detectores,", "});", ""]
escribir(RAIZ / "index.ts", "\n".join(lineas))
print(f"{len(slugs)} calculadoras en index.ts")
