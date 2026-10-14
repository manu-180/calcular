"""Genera src/paises/de/series.json con el Verbraucherpreisindex (2020 = 100) de la API de la Bundesbank."""
import json
import pathlib
import urllib.request

HOY = "2026-10-14"
URL = "https://api.statistiken.bundesbank.de/rest/data/BBDP1/M.DE.N.VPI.C.A00000.I20.A?startPeriod=2000-01&format=csv&lang=de"

req = urllib.request.Request(URL, headers={"Accept": "text/csv", "User-Agent": "calcularya"})
texto = urllib.request.urlopen(req, timeout=60).read().decode("utf-8-sig")
puntos = []
for linea in texto.splitlines():
    partes = linea.split(";")
    if len(partes) >= 2 and len(partes[0]) == 7 and partes[0][4] == "-" and partes[1]:
        puntos.append([partes[0] + "-01", float(partes[1].replace(",", "."))])

serie = {
    "id": "de.vpi",
    "nombre": "Verbraucherpreisindex für Deutschland (2020 = 100)",
    "unidad": "numero",
    "frecuencia": "mensual",
    "maxAntiguedadDias": 70,
    "fuente": {
        "organismo": "Deutsche Bundesbank (Daten des Statistischen Bundesamts)",
        "titulo": "Zeitreihe BBDP1.M.DE.N.VPI.C.A00000.I20.A, Verbraucherpreisindex insgesamt",
        "url": URL,
        "tipo": "primaria",
        "verificadoEl": HOY,
    },
    "puntos": puntos,
}
ruta = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "de" / "series.json"
with open(ruta, "w", encoding="utf-8", newline="\n") as f:
    f.write('{\n  "mercado": "de",\n  "series": [\n')
    cuerpo = json.dumps({k: v for k, v in serie.items() if k != "puntos"}, ensure_ascii=False, indent=2)
    cuerpo = cuerpo[:-2] + ',\n  "puntos": [\n' + ",\n".join(f'    ["{p[0]}", {p[1]}]' for p in puntos) + "\n  ]\n}"
    f.write("\n".join("    " + l for l in cuerpo.splitlines()) + "\n  ]\n}\n")
print(len(puntos), "puntos, último", puntos[-1])
