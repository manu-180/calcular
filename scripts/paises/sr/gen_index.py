# Genera src/paises/sr/index.ts y los clientes de 4 lineas a partir de la lista de slugs.
import os

AQUI = os.path.dirname(os.path.abspath(__file__))
SR = os.path.join(AQUI, "..", "..", "..", "src", "paises", "sr")

SLUGS = [
    "bruto-netto-salaris",
    "netto-naar-bruto-berekenen",
    "loonbelasting-berekenen",
    "inkomstenbelasting-berekenen",
    "aov-premie-berekenen",
    "btw-berekenen",
    "minimumloon-berekenen",
    "overuren-berekenen",
    "vakantiedagen-berekenen",
    "vakantietoelage-berekenen",
    "bonus-belasting-berekenen",
    "uitkering-ineens-belasting",
    "hypotheekrenteaftrek-berekenen",
    "huurwaardebelasting-berekenen",
    "inflatie-berekenen",
]


def camel(slug):
    partes = slug.split("-")
    return partes[0] + "".join(p[:1].upper() + p[1:] for p in partes[1:])


def pascal(slug):
    c = camel(slug)
    return c[:1].upper() + c[1:]


presentes = [s for s in SLUGS if os.path.exists(os.path.join(SR, "calculadoras", f"{s}.ts")) and os.path.exists(os.path.join(SR, "contenido", f"{s}.ts"))]

for s in presentes:
    with open(os.path.join(SR, "calculadoras", f"{s}.cliente.tsx"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write(f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport calculadora from "./{s}";\nexport default crearCalculadoraCliente(calculadora);\n')

lineas = ['import { definirPais } from "@/motor/registro";', 'import avisos from "./avisos.json";']
for s in presentes:
    lineas.append(f'import {camel(s)} from "./calculadoras/{s}";')
    lineas.append(f'import contenido{pascal(s)} from "./contenido/{s}";')
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
for s in presentes:
    lineas.append(f'    {{ definicion: {camel(s)}, contenido: contenido{pascal(s)}, cliente: () => import("./calculadoras/{s}.cliente") }},')
lineas += ["  ],", '  universales: "todas",', "  novedades,", "  detectores,", "});", ""]

with open(os.path.join(SR, "index.ts"), "w", encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(lineas))
print(len(presentes), "calculadoras")
