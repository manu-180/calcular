"""Crea el cliente de 4 líneas de cada calculadora de src/paises/de/calculadoras que todavía no lo tenga."""
import pathlib
import re

DIR = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "de" / "calculadoras"
for ts in sorted(DIR.glob("*.ts")):
    if ts.name.endswith(".casos.ts"):
        continue
    slug = ts.stem
    cliente = DIR / f"{slug}.cliente.tsx"
    if cliente.exists():
        continue
    nombre = re.sub(r"-(\w)", lambda m: m.group(1).upper(), slug)
    if nombre[0].isdigit():
        nombre = "c" + nombre
    texto = f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {nombre} from "./{slug}";\nexport default crearCalculadoraCliente({nombre});\n'
    with open(cliente, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)
    print("creado", cliente.name)
