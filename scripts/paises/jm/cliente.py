"""Escribe el cliente de 4 líneas de cada calculadora de jm que no lo tenga. Uso: python scripts/paises/jm/cliente.py"""
import os
import re

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
CARPETA = os.path.join(RAIZ, "src", "paises", "jm", "calculadoras")

for nombre in sorted(os.listdir(CARPETA)):
    if not nombre.endswith(".ts") or nombre.endswith(".casos.ts"):
        continue
    slug = nombre[:-3]
    destino = os.path.join(CARPETA, slug + ".cliente.tsx")
    if os.path.exists(destino):
        continue
    var = re.sub(r"-([a-z0-9])", lambda m: m.group(1).upper(), slug)
    if var[0].isdigit():
        var = "c" + var
    texto = f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {var} from "./{slug}";\nexport default crearCalculadoraCliente({var});\n'
    with open(destino, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(texto)
    print("cliente", slug)
