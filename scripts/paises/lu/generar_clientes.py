"""Crea el cliente de 4 líneas de cada calculadora de src/paises/lu/calculadoras que todavía no lo tenga."""
import pathlib
import re

DIR = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "lu" / "calculadoras"


def nombre(slug):
    n = re.sub(r"-(\w)", lambda m: m.group(1).upper(), slug)
    return "c" + n if n[0].isdigit() else n


for ts in sorted(DIR.glob("*.ts")):
    if ts.name.endswith(".casos.ts"):
        continue
    slug = ts.stem
    cliente = DIR / f"{slug}.cliente.tsx"
    if cliente.exists():
        continue
    n = nombre(slug)
    texto = f'"use client";\nimport {{ crearCalculadoraCliente }} from "@/motor/cliente";\nimport {n} from "./{slug}";\nexport default crearCalculadoraCliente({n});\n'
    with open(cliente, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)
    print("creado", cliente.name)
