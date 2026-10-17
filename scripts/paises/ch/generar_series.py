"""Genera src/paises/ch/series.json con los datos del portal de la SNB (LIK del BFS, Leitzins y SARON)."""
import csv
import io
import json
import pathlib
import urllib.request

HOY = "2026-10-14"
LIK_URL = "https://data.snb.ch/api/cube/plkopr/data/csv/de"
ZINS_URL = "https://data.snb.ch/api/cube/snbgwdzid/data/csv/de"
# Monate, die das BFS schon publiziert hat, der SNB-Würfel aber noch nicht (Medienmitteilung BFS vom 1.10.2026).
BFS_NACHTRAG = [("2026-09-01", 101.5)]


def bajar(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=120) as r:
        texto = r.read().decode("utf-8-sig")
    filas = []
    for fila in csv.reader(io.StringIO(texto), delimiter=";"):
        if len(fila) == 3 and fila[0] != "Date" and fila[2] != "":
            filas.append(fila)
    return filas


def fuente(titulo, url):
    return {"organismo": "Schweizerische Nationalbank (SNB-Datenportal)", "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}


def main():
    lik = [[f"{d}-01", round(float(v), 1)] for d, k, v in bajar(LIK_URL) if k == "LD2010100" and d >= "2000-01"]
    for fecha, valor in BFS_NACHTRAG:
        if lik[-1][0] < fecha:
            lik.append([fecha, valor])
    zins = bajar(ZINS_URL)
    desde = "2026-08-01"
    leitzins = [[d, float(v)] for d, k, v in zins if k == "LZ" and d >= desde]
    saron = [[d, float(v)] for d, k, v in zins if k == "SARON" and d >= desde]
    series = [
        {
            "id": "ch.lik",
            "nombre": "Landesindex der Konsumentenpreise (Dezember 2025 = 100)",
            "unidad": "numero",
            "frecuencia": "mensual",
            "maxAntiguedadDias": 70,
            "fuente": {**fuente("Landesindex der Konsumentenpreise (Daten des Bundesamts für Statistik), Würfel plkopr", LIK_URL), "nota": "Auf eine Dezimale gerundet wie in den Mitteilungen des BFS. September 2026 (101.5) aus der BFS-Medienmitteilung vom 1. Oktober 2026: https://www.admin.ch/de/newnsb/wNfni1DvzKuQ"},
            "puntos": lik,
        },
        {
            "id": "ch.leitzins",
            "nombre": "SNB-Leitzins",
            "unidad": "%",
            "frecuencia": "diaria",
            "maxAntiguedadDias": 10,
            "fuente": fuente("Leitzins der SNB und ausgewählte Geldmarktsätze, Würfel snbgwdzid", ZINS_URL),
            "puntos": leitzins,
        },
        {
            "id": "ch.saron",
            "nombre": "SARON (Swiss Average Rate Overnight)",
            "unidad": "%",
            "frecuencia": "diaria",
            "maxAntiguedadDias": 10,
            "fuente": fuente("Leitzins der SNB und ausgewählte Geldmarktsätze, Würfel snbgwdzid", ZINS_URL),
            "puntos": saron,
        },
    ]
    salida = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "ch" / "series.json"
    with open(salida, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"mercado": "ch", "series": series}, f, ensure_ascii=False, indent=2)
        f.write("\n")
    for s in series:
        print(s["id"], len(s["puntos"]), s["puntos"][0], s["puntos"][-1])


if __name__ == "__main__":
    main()
