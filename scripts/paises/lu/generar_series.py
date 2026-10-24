"""Genera src/paises/lu/series.json con el IPCN de STATEC (LUSTAT, SDMX) y su media semestral."""
import csv
import io
import json
import pathlib
import urllib.request

HOY = "2026-10-16"
BASE = "https://lustat.statec.lu/rest/data/LU1,{flujo},1.0/all?startPeriod={desde}"
ACEPTA = "application/vnd.sdmx.data+csv;version=1.0.0"


def bajar(flujo, desde):
    url = BASE.format(flujo=flujo, desde=desde)
    req = urllib.request.Request(url, headers={"Accept": ACEPTA, "User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        filas = list(csv.DictReader(io.StringIO(r.read().decode("utf-8-sig"))))
    puntos = [[f"{f['TIME_PERIOD']}-01", float(f["OBS_VALUE"])] for f in filas if f["FREQ"] == "M" and f["OBS_VALUE"]]
    return url, sorted(puntos)


def fuente(titulo, url):
    return {"organismo": "STATEC (LUSTAT)", "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}


def main():
    url_ipcn, ipcn = bajar("DSD_PRIX_CONSO@DF_E5100", "2000-01")
    url_ms, media = bajar("DSD_PRIX_CONSO@DF_E5101", "2024-01")
    series = [
        {
            "id": "lu.ipcn",
            "nombre": "Indice des prix à la consommation national (IPCN, base 100 au 1.1.1948)",
            "unidad": "numero",
            "frecuencia": "mensual",
            "maxAntiguedadDias": 70,
            "fuente": fuente("Indice des prix à la consommation national, DF_E5100", url_ipcn),
            "puntos": ipcn,
        },
        {
            "id": "lu.ipcn-moyenne",
            "nombre": "Moyenne semestrielle de l'IPCN (base 100 au 1.1.1948)",
            "unidad": "numero",
            "frecuencia": "mensual",
            "maxAntiguedadDias": 70,
            "fuente": fuente("Moyenne semestrielle de l'IPCN, DF_E5101", url_ms),
            "puntos": media,
        },
    ]
    salida = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "lu" / "series.json"
    with open(salida, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"mercado": "lu", "series": series}, f, ensure_ascii=False, indent=2)
        f.write("\n")
    for s in series:
        print(s["id"], len(s["puntos"]), s["puntos"][0], s["puntos"][-1])


if __name__ == "__main__":
    main()
