"""Genera src/paises/li/contenido/*.ts desde contenido_de.py."""
import importlib.util
import json
import pathlib

AQUI = pathlib.Path(__file__).resolve().parent
DESTINO = AQUI.parents[2] / "src" / "paises" / "li" / "contenido"

spec = importlib.util.spec_from_file_location("contenido_de", AQUI / "contenido_de.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


def js(s):
    return json.dumps(s, ensure_ascii=False)


def lista(clave, items):
    return [f"  {clave}: ["] + [f"    {js(x)}," for x in items] + ["  ],"]


DESTINO.mkdir(parents=True, exist_ok=True)
for archivo, d in m.CONTENIDO.items():
    lineas = [
        'import { definirContenido } from "@/motor/calculo";',
        "",
        "export default definirContenido({",
        f'  calculadora: "li.{archivo}",',
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
    with open(DESTINO / f"{archivo}.ts", "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lineas))
print(len(m.CONTENIDO), "contenidos")
