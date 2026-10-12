# Reescribe datos.json y series.json con la forma del repo: sangría de 2, LF y los objetos u
# listas chicas sin anidar en una sola línea (filas de escala, mapas cortos, puntos de series).
# Uso: python scripts/paises/cr/formatear_json.py src/paises/cr/datos.json
import json
import sys

ANCHO = 170


def simple(v):
    if isinstance(v, dict):
        if "organismo" in v or "estado" in v:
            return False
        return all(not isinstance(x, (dict, list)) for x in v.values())
    if isinstance(v, list):
        return all(not isinstance(x, dict) and (not isinstance(x, list) or all(not isinstance(y, (dict, list)) for y in x)) for x in v)
    return True


def linea(v):
    if isinstance(v, dict):
        return "{ " + ", ".join(f"{json.dumps(k, ensure_ascii=False)}: {linea(x)}" for k, x in v.items()) + " }" if v else "{}"
    if isinstance(v, list):
        return "[" + ", ".join(linea(x) for x in v) + "]"
    return json.dumps(v, ensure_ascii=False)


def volcar(v, nivel=0):
    sang = "  " * nivel
    if isinstance(v, (dict, list)) and simple(v):
        unica = linea(v)
        if len(sang) + len(unica) <= ANCHO:
            return unica
    if isinstance(v, dict):
        filas = [f'{sang}  {json.dumps(k, ensure_ascii=False)}: {volcar(x, nivel + 1)}' for k, x in v.items()]
        return "{\n" + ",\n".join(filas) + f"\n{sang}}}"
    if isinstance(v, list):
        filas = [f"{sang}  {volcar(x, nivel + 1)}" for x in v]
        return "[\n" + ",\n".join(filas) + f"\n{sang}]"
    return json.dumps(v, ensure_ascii=False)


for ruta in sys.argv[1:]:
    with open(ruta, encoding="utf-8") as f:
        datos = json.load(f)
    with open(ruta, "w", encoding="utf-8", newline="\n") as f:
        f.write(volcar(datos) + "\n")
