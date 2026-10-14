"""Genera src/paises/nl/series.json con la CPI de CBS (tabel 86141NED, 2025=100, alle bestedingen)."""

import json
import urllib.request
from datetime import date
from pathlib import Path

TABEL = "86141NED"
BRON = f"https://opendata.cbs.nl/ODataApi/odata/{TABEL}/TypedDataSet?$filter=Bestedingscategorieen%20eq%20%27T001112%20%20%27&$select=Perioden,CPI_1"


def main():
    with urllib.request.urlopen(BRON, timeout=60) as r:
        filas = json.load(r)["value"]
    puntos = []
    for f in filas:
        p = f["Perioden"].strip()
        if "MM" not in p or f["CPI_1"] is None:
            continue
        puntos.append([f"{p[:4]}-{p[6:8]}-01", float(f["CPI_1"])])
    puntos.sort()
    ultimo = puntos[-1]
    serie = {
        "id": "nl.cpi",
        "nombre": "Consumentenprijsindex (CPI), alle bestedingen, 2025 = 100",
        "unidad": "numero",
        "frecuencia": "mensual",
        "maxAntiguedadDias": 100,
        "fuente": {
            "organismo": "CBS",
            "titulo": f"Consumentenprijzen; CPI 2025=100, index en mutaties (tabel {TABEL})",
            "url": BRON,
            "tipo": "primaria",
            "verificadoEl": date.today().isoformat(),
            "nota": f"Laatste maand: {ultimo[0][:7]} = {ultimo[1]}.",
        },
        "puntos": puntos,
    }
    salida = Path(__file__).resolve().parents[3] / "src" / "paises" / "nl" / "series.json"
    with open(salida, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"mercado": "nl", "series": [serie]}, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"{len(puntos)} puntos, de {puntos[0][0]} a {ultimo[0]} ({ultimo[1]})")


main()
