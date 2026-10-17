"""Genera src/paises/<edición>/contenido/*.ts y el index.ts de la edición desde contenido_<idioma>.py.

Uso: python scripts/paises/ch/ediciones/generar_contenido.py fr   (o it)
"""
import importlib.util
import json
import pathlib
import re
import sys

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parents[3]


def cargar(nombre):
    spec = importlib.util.spec_from_file_location(nombre, AQUI / f"{nombre}.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def js(s):
    return json.dumps(s, ensure_ascii=False)


def nombre(archivo):
    n = re.sub(r"-(\w)", lambda m: m.group(1).upper(), archivo)
    return "c" + n if n[0].isdigit() else n


def lista(clave, items):
    return [f"  {clave}: ["] + [f"    {js(x)}," for x in items] + ["  ],"]


def main():
    idioma = sys.argv[1]
    c = cargar(f"contenido_{idioma}")
    t = cargar(idioma)
    edicion = t.EDICION
    base = RAIZ / "src" / "paises" / edicion
    (base / "contenido").mkdir(parents=True, exist_ok=True)
    for archivo, d in c.CONTENIDO.items():
        lineas = [
            'import { definirContenido } from "@/motor/calculo";',
            "",
            "export default definirContenido({",
            f'  calculadora: "{edicion}.{archivo}",',
            f"  h1: {js(d['h1'])},",
            f"  title: {js(d['title'])},",
            f"  description: {js(d['description'])},",
            *lista("intro", d["intro"]),
            *lista("comoSeCalcula", d["como"]),
            *lista("ejemplo", d["ejemplo"]),
            "  faq: [",
            *[f"    {{ pregunta: {js(p)}, respuesta: {js(r)} }}," for p, r in d["faq"]],
            "  ],",
            "  glosario: [",
            *[f"    {{ termino: {js(p)}, definicion: {js(r)} }}," for p, r in d["glosario"]],
            "  ],",
            "});",
            "",
        ]
        with open(base / "contenido" / f"{archivo}.ts", "w", encoding="utf-8", newline="\n") as f:
            f.write("\n".join(lineas))
    archivos = [a for a in t.TEXTOS if a in c.CONTENIDO]
    idx = ['import { definirEdicion } from "@/motor/registro";', 'import ch from "../ch";']
    for a in archivos:
        n = nombre(a)
        idx.append(f'import contenido{n[0].upper() + n[1:]} from "./contenido/{a}";')
    idx.append('import { AVISOS, DATOS } from "./lib/datos";')
    idx.append('import { mercado } from "./mercado";')
    for a in archivos:
        n = nombre(a)
        idx.append(f'import textos{n[0].upper() + n[1:]} from "./textos/{a}";')
    idx += ["", "export default definirEdicion(ch, {", "  mercado,", "  traducciones: ["]
    for a in archivos:
        n = nombre(a)
        N = n[0].upper() + n[1:]
        idx.append(f"    {{ textos: textos{N}, contenido: contenido{N} }},")
    idx += ["  ],", '  universales: "todas",', "  avisos: AVISOS,", "  datos: DATOS,", "});", ""]
    with open(base / "index.ts", "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(idx))
    print(len(c.CONTENIDO), "contenidos y index de", edicion, "con", len(archivos), "traducciones")


if __name__ == "__main__":
    main()
