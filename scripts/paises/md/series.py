# Genera los puntos de src/paises/md/series.json desde las fuentes oficiales:
# cursul oficial BNM (XML por fecha) y el IPC de BNS (PxWeb, decembrie 1993 = 100).
# Uso: python scripts/paises/md/series.py AAAA-MM-DD AAAA-MM-DD > salida.json
import datetime as dt, json, sys, urllib.request, xml.etree.ElementTree as ET

MONEDAS = ["EUR", "USD", "RON", "UAH", "GBP"]
IPC = "https://statbank.statistica.md/PxWeb/api/v1/ro/40%20Statistica%20economica/05%20PRE/PRE010/serii%20lunare/PRE012300.px"


def bnm(dia):
    url = f"https://www.bnm.md/ro/official_exchange_rates?get_xml=1&date={dia:%d.%m.%Y}"
    raiz = ET.fromstring(urllib.request.urlopen(url, timeout=60).read())
    out = {}
    for v in raiz.findall("Valute"):
        cod = v.findtext("CharCode")
        if cod in MONEDAS:
            out[cod] = round(float(v.findtext("Value")) / int(v.findtext("Nominal")), 6)
    return out


def ipc():
    cuerpo = json.dumps({"query": [{"code": "Grupe majore", "selection": {"filter": "item", "values": ["0"]}}], "response": {"format": "json-stat2"}}).encode()
    req = urllib.request.Request(IPC, data=cuerpo, headers={"Content-Type": "application/json"})
    d = json.load(urllib.request.urlopen(req, timeout=60))
    anios = list(d["dimension"]["Ani"]["category"]["index"].keys())
    luni = list(d["dimension"]["Luni"]["category"]["index"].keys())
    puntos = []
    for i, a in enumerate(anios):
        for j, l in enumerate(luni):
            v = d["value"][i * len(luni) + j]
            if v is not None and a >= "2000":
                puntos.append([f"{a}-{l}-01", v])
    return puntos


desde, hasta = (dt.date.fromisoformat(x) for x in sys.argv[1:3])
cursuri = {m: [] for m in MONEDAS}
dia = desde
while dia <= hasta:
    if dia.weekday() < 5:
        for m, v in bnm(dia).items():
            cursuri[m].append([dia.isoformat(), v])
    dia += dt.timedelta(days=1)
json.dump({"cursuri": cursuri, "ipc": ipc()}, sys.stdout)
