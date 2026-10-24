"""Contenido de us-es: une las tres partes."""
import importlib.util
import pathlib

AQUI = pathlib.Path(__file__).resolve().parent
CONTENIDO = {}
for parte in ("contenido_es_1", "contenido_es_2", "contenido_es_3"):
    spec = importlib.util.spec_from_file_location(parte, AQUI / f"{parte}.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    CONTENIDO.update(m.CONTENIDO)
