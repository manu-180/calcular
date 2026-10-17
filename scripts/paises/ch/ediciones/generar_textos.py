"""Genera src/paises/<edición>/textos/*.ts a partir de la especificación de cada idioma (fr.py, it.py).

Uso: python scripts/paises/ch/ediciones/generar_textos.py fr   (o it)
"""
import importlib.util
import json
import pathlib
import re
import sys

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parents[3]


def cargar(idioma):
    spec = importlib.util.spec_from_file_location(f"spec_{idioma}", AQUI / f"{idioma}.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def nombre(archivo):
    n = re.sub(r"-(\w)", lambda m: m.group(1).upper(), archivo)
    return "c" + n if n[0].isdigit() else n


def js(s):
    return json.dumps(s, ensure_ascii=False)


def campo(id_, v):
    if isinstance(v, str):
        return f"    {id_}: {{ etiqueta: {js(v)} }},"
    partes = [f"etiqueta: {js(v['e'])}"]
    if "a" in v:
        partes.append(f"ayuda: {js(v['a'])}")
    if "o" in v:
        o = v["o"]
        if isinstance(o, str):
            partes.append(f"opciones: {o}")
        else:
            partes.append("opciones: { " + ", ".join(f"{js(k)}: {js(x)}" for k, x in o.items()) + " }")
    return f"    {id_}: {{ {', '.join(partes)} }},"


def main():
    idioma = sys.argv[1]
    m = cargar(idioma)
    edicion = m.EDICION
    destino = RAIZ / "src" / "paises" / edicion / "textos"
    destino.mkdir(parents=True, exist_ok=True)
    for archivo, d in m.TEXTOS.items():
        n = nombre(archivo)
        lineas = [
            'import { definirTextos } from "@/motor/edicion";',
            f'import {n} from "../../ch/calculadoras/{archivo}";',
            f'import {{ {", ".join(sorted(m.IMPORTS_COMUNES | set(d.get("importa", []))))} }} from "../lib/comun";',
            "",
            f"export default definirTextos({n}, {{",
            f'  calculadora: "{edicion}.{archivo}",',
            f"  slug: {js(d['slug'])},",
            "  campos: {",
            *[campo(k, v) for k, v in d["campos"].items()],
            "  },",
            "  filas: {",
            *[f"    {k}: {{ etiqueta: {js(v)} }}," for k, v in d["filas"].items()],
            "  },",
        ]
        if d.get("tablas"):
            lineas.append("  tablas: { " + ", ".join(f"{k}: {js(v)}" for k, v in d["tablas"].items()) + " },")
        lineas += ["  ...COMUN,", "});", ""]
        with open(destino / f"{archivo}.ts", "w", encoding="utf-8", newline="\n") as f:
            f.write("\n".join(lineas))
    print(len(m.TEXTOS), "textos en", destino)


if __name__ == "__main__":
    main()
