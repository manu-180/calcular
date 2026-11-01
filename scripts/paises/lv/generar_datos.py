"""Genera src/paises/lv/datos.json y series.json desde lo leído en las fuentes (1/11/2026).

Uso: python scripts/paises/lv/generar_datos.py <carpeta con cpi.json y alga.json>
cpi.json y alga.json son las respuestas de la API PxWeb de CSP (PCI030m y DSV010m).
Volver a correrlo solo si cambia un dato; el cron mantiene las series después.
"""
import json
import os
import sys

HOY = "2026-11-01"
WEB = sys.argv[1]
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "src", "paises", "lv")


def vid(titulo, ruta):
    return {"organismo": "Valsts ieņēmumu dienests", "titulo": titulo, "url": "https://www.vid.gov.lv/" + ruta, "tipo": "primaria", "verificadoEl": HOY}


IIN = vid("Iedzīvotāju ienākuma nodokļa likmes", "lv/iedzivotaju-ienakuma-nodokla-likmes")
MIN = vid("Gada neapliekamais minimums", "lv/neapliekamais-minimums")
APG = vid("Par apgādībā esošām personām", "lv/par-apgadiba-esosam-personam")
PAP = vid("Papildu nodokļa atvieglojums", "lv/papildu-nodokla-atvieglojums")
VSA = vid("Valsts sociālās apdrošināšanas obligāto iemaksu likmes", "lv/valsts-socialas-apdrosinasanas-obligato-iemaksu-likmes")
MAX = vid("Par valsts sociālās apdrošināšanas obligāto iemaksu maksimālo apmēru (13.01.2026.)", "lv/media/2453/download")
JAU = vid("Valsts sociālās apdrošināšanas obligātās iemaksas jaunuzņēmumiem (18.12.2025.): MK noteikumi Nr. 656, solidaritātes nodokļa piemēri", "lv/media/2471/download")
PAS = vid("Pašnodarbinātā sociālās apdrošināšanas iemaksas", "lv/pasnodarbinata-socialas-apdrosinasanas-iemaksas")
MIK = vid("Mikrouzņēmumu nodokļa likme", "lv/mikrouznemumu-nodokla-likme")
MIK2 = vid("Mikrouzņēmumu nodoklis", "lv/mikrouznemumu-nodoklis")
PVN = vid("Pievienotās vērtības nodokļa likmes", "lv/pievienotas-vertibas-nodokla-likmes")
SLI = vid("Īpašā PVN reģistrācijas kārtība mazajiem uzņēmumiem", "lv/ipasa-pvn-registracijas-kartiba-mazajiem-uznemumiem")
NIN = vid("Nekustamā īpašuma nodoklis", "lv/nekustama-ipasuma-nodoklis")

VSAOI_ETIQUETAS = {
    "vispariga": "Darba ņēmējs (vispārējais gadījums)",
    "pensijas-vecums": "Sasniegts valsts vecuma pensijas vecums",
    "izdienas": "Izdienas vai valsts speciālās invaliditātes pensijas saņēmējs",
}


def numero(id_, nombre, unidad, valor, fuente, desde="2026-01-01", **extra):
    return {"id": "lv." + id_, "nombre": nombre, "tipo": "numero", "unidad": unidad, **extra, "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente}]}


def mapa(id_, nombre, unidad, valor, fuente, etiquetas, desde="2026-01-01"):
    return {"id": "lv." + id_, "nombre": nombre, "tipo": "mapa", "unidad": unidad, "etiquetas": etiquetas, "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente}]}


# Lo no leído en fuente primaria vigente: lleva el valor como pista, nunca llega a una página.
GUIA = "Solo leído en la guía de seguridad social para Letonia de la Comisión Europea (manuscrito de julio de 2026), que aclara que refleja la opinión de sus autores. vsaa.gov.lv, lm.gov.lv y likumi.lv cortaron la conexión el 1/11/2026 (ECONNRESET y ECONNREFUSED, con reintentos): falta leerlo en VSAA o en la ley."
LEY_2001 = "Solo leído en la publicación original de 2001 del Darba likums en vestnesis.lv (https://www.vestnesis.lv/ta/id/26019). likumi.lv, lm.gov.lv y vdi.gov.lv cortaron la conexión el 1/11/2026, así que no se pudo comprobar la redacción vigente con sus reformas."


def pista(id_, nombre, tipo, unidad, valor, motivo, etiquetas=None):
    d = {"id": "lv." + id_, "nombre": nombre, "tipo": tipo, "unidad": unidad}
    if etiquetas:
        d["etiquetas"] = etiquetas
    d["tramos"] = [{"estado": "no-verificado", "desde": "2026-01-01", "valor": valor, "motivo": motivo}]
    return d


datos = [
    numero("minimala-alga", "Minimālā mēneša darba alga", "EUR", 780, JAU, proximaRevision="2027-01-01"),
    numero("iin-alga", "Algas nodokļa likme", "%", 25.5, IIN),
    {
        "id": "lv.iin-gada",
        "nombre": "Iedzīvotāju ienākuma nodokļa gada likmes",
        "tipo": "escala",
        "unidad": "EUR",
        "tramos": [
            {
                "estado": "verificado",
                "desde": "2026-01-01",
                "valor": [
                    {"desde": 0, "hasta": 105300, "tasa": 25.5},
                    {"desde": 105300, "hasta": 200000, "tasa": 33},
                    {"desde": 200000, "hasta": None, "tasa": 36},
                ],
                "fuente": IIN,
            }
        ],
    },
    numero("neapliekamais-minimums", "Neapliekamais minimums mēnesī", "EUR", 550, MIN, proximaRevision="2027-01-01"),
    numero("neapliekamais-pensionars", "Pensionāra neapliekamais minimums mēnesī", "EUR", 1000, MIN, proximaRevision="2027-01-01"),
    numero("apgadajamais", "Atvieglojums par apgādājamo mēnesī", "EUR", 250, APG),
    mapa("papildu-atvieglojums", "Papildu atvieglojums mēnesī", "EUR", {"invaliditate-1-2": 154, "invaliditate-3": 120, "represeta": 154}, PAP, {"invaliditate-1-2": "I vai II grupas invaliditāte", "invaliditate-3": "III grupas invaliditāte", "represeta": "Politiski represētā persona vai nacionālās pretošanās kustības dalībnieks"}),
    mapa("vsaoi-darba-nemejs", "VSAOI darba ņēmēja daļa", "%", {"vispariga": 10.5, "pensijas-vecums": 9.25, "izdienas": 9.76}, VSA, VSAOI_ETIQUETAS),
    mapa("vsaoi-darba-devejs", "VSAOI darba devēja daļa", "%", {"vispariga": 23.59, "pensijas-vecums": 20.77, "izdienas": 21.94}, VSA, VSAOI_ETIQUETAS),
    numero("vsaoi-maksimums", "VSAOI objekta maksimālais apmērs gadā", "EUR", 105300, MAX, desde="2025-01-01", proximaRevision="2028-01-01"),
    numero("solidaritate-darba-nemejs", "Solidaritātes nodokļa darba ņēmēja daļa", "%", 10.5, JAU),
    numero("solidaritate-darba-devejs", "Solidaritātes nodokļa darba devēja daļa", "%", 23.59, JAU),
    mapa("pasnodarbinata-likme", "Pašnodarbinātā VSAOI likme", "%", {"vispariga": 31.07, "pensijas-vecums": 29.36, "apsaimniekotajs": 26.59}, VSA, {"vispariga": "Pašnodarbinātais (vispārējais gadījums)", "pensijas-vecums": "Sasniegts pensijas vecums", "apsaimniekotajs": "Nekustamā īpašuma apsaimniekotājs"}),
    numero("pasnodarbinata-pensija", "Pašnodarbinātā pensiju apdrošināšanas likme", "%", 10, PAS),
    numero("pasnodarbinata-objekts", "Pašnodarbinātā obligāto iemaksu minimālais objekts mēnesī", "EUR", 780, PAS, proximaRevision="2027-01-01"),
    numero("mikro-likme", "Mikrouzņēmumu nodokļa likme", "%", 25, MIK),
    numero("mikro-socialajai-dalai", "Mikrouzņēmumu nodokļa daļa sociālajām iemaksām", "%", 80, MIK2),
    numero("pvn-slieksnis", "PVN reģistrācijas slieksnis gadā", "EUR", 50000, SLI),
    mapa("pvn", "PVN likmes", "%", {"standarta": 21, "samazinata": 12, "gramatas": 5}, PVN, {"standarta": "Standarta likme", "samazinata": "Samazinātā likme (zāles, atsevišķa pārtika, pasažieru pārvadājumi)", "gramatas": "Samazinātā likme (grāmatas un preses izdevumi)"}),
    numero("nin-min", "Nekustamā īpašuma nodokļa zemākā likme", "%", 0.2, NIN),
    numero("nin-max", "Nekustamā īpašuma nodokļa augstākā likme", "%", 3, NIN),
    # Borradores
    pista("atvalinajums-nedelas", "Ikgadējais apmaksātais atvaļinājums", "numero", "semanas", 4, LEY_2001),
    pista("videja-izpelna-menesi", "Vidējās izpeļņas aprēķina periods", "numero", "meses", 6, LEY_2001),
    pista("virsstundu-piemaksa", "Piemaksa par virsstundu darbu", "numero", "%", 100, LEY_2001),
    pista("atlaisanas-pabalsts", "Atlaišanas pabalsts (vidējās izpeļņas mēneši)", "mapa", "meses", {"lidz-5": 1, "5-10": 2, "10-20": 3, "virs-20": 4}, LEY_2001 + " El art. 112 tuvo además una reforma de 2018 (vestnesis.lv/op/2018/225.8).", {"lidz-5": "Mazāk nekā 5 gadi", "5-10": "No 5 līdz 10 gadiem", "10-20": "No 10 līdz 20 gadiem", "virs-20": "Vairāk nekā 20 gadi"}),
    pista("uzteikums", "Darba devēja uzteikuma termiņš", "mapa", "dias", {"nekavejoties": 0, "desmit-dienas": 10, "menesis": 30}, LEY_2001, {"nekavejoties": "Nekavējoties (101. panta 1. daļas 2. vai 4. punkts)", "desmit-dienas": "10 dienas (1., 3. vai 5. punkts)", "menesis": "Viens mēnesis (6. līdz 10. punkts)"}),
    pista("slimibas-nauda-2-3", "Slimības nauda par 2. un 3. dienu", "numero", "%", 75, GUIA),
    pista("slimibas-nauda-4-9", "Slimības nauda no 4. līdz 9. dienai", "numero", "%", 80, GUIA),
    pista("slimibas-pabalsts", "Slimības pabalsts no 10. dienas", "numero", "%", 80, GUIA),
    pista("maternitates-pabalsts", "Maternitātes pabalsts", "numero", "%", 80, GUIA),
    pista("vecaku-pabalsts", "Vecāku pabalsts", "mapa", "%", {"13-menesi": 60, "19-menesi": 43.75}, GUIA, {"13-menesi": "13 mēneši", "19-menesi": "19 mēneši"}),
    pista("vecaku-pabalsts-stradajot", "Vecāku pabalsta daļa, ja strādājat", "numero", "%", 75, GUIA),
    pista("bezdarbnieka-stazs", "Bezdarbnieka pabalsts pēc apdrošināšanas stāža", "mapa", "%", {"1-9": 50, "10-19": 55, "20-29": 60, "30": 65}, GUIA, {"1-9": "No 1 līdz 9 gadiem", "10-19": "No 10 līdz 19 gadiem", "20-29": "No 20 līdz 29 gadiem", "30": "30 gadi un vairāk"}),
    pista("bezdarbnieka-posmi", "Bezdarbnieka pabalsta izmaksas daļa pa mēnešiem", "mapa", "%", {"1-2": 100, "3-4": 75, "5-6": 50, "7-8": 45}, GUIA, {"1-2": "1. un 2. mēnesis", "3-4": "3. un 4. mēnesis", "5-6": "5. un 6. mēnesis", "7-8": "7. un 8. mēnesis"}),
]


def puntos(ruta):
    with open(os.path.join(WEB, ruta), encoding="utf8") as f:
        filas = json.load(f)["data"]
    r = []
    for fila in filas:
        t = fila["key"][-1]
        v = fila["values"][0]
        if v in ("...", "..", ""):
            continue
        r.append([f"{t[:4]}-{t[5:]}-01", float(v)])
    return r


PCI = "https://data.stat.gov.lv/api/v1/lv/OSP_PUB/START/VEK/PC/PCI/PCI030m"
DSV = "https://data.stat.gov.lv/api/v1/lv/OSP_PUB/START/EMP/DS/DSV/DSV010m"
series = [
    {
        "id": "lv.pci",
        "nombre": "Patēriņa cenu indekss (1990. gada decembris = 100)",
        "unidad": "numero",
        "frecuencia": "mensual",
        "maxAntiguedadDias": 70,
        "fuente": {"organismo": "Centrālā statistikas pārvalde", "titulo": "PCI030m. Patēriņa cenu indeksi", "url": PCI, "tipo": "primaria", "verificadoEl": HOY},
        "puntos": [p for p in puntos("cpi.json") if p[0] >= "2000-01-01"],
    },
    {
        "id": "lv.videja-alga",
        "nombre": "Vidējā mēneša bruto darba samaksa",
        "unidad": "EUR",
        "frecuencia": "mensual",
        # CSP publica la remuneración con unos tres meses de atraso: 70 días la dejaría siempre vencida.
        "maxAntiguedadDias": 200,
        "fuente": {"organismo": "Centrālā statistikas pārvalde", "titulo": "DSV010m. Strādājošo mēneša vidējā darba samaksa", "url": DSV, "tipo": "primaria", "verificadoEl": HOY},
        "puntos": puntos("alga.json"),
    },
]

os.makedirs(RAIZ, exist_ok=True)
with open(os.path.join(RAIZ, "datos.json"), "w", encoding="utf8", newline="\n") as f:
    json.dump({"mercado": "lv", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
with open(os.path.join(RAIZ, "series.json"), "w", encoding="utf8", newline="\n") as f:
    json.dump({"mercado": "lv", "series": series}, f, ensure_ascii=False, indent=1)
    f.write("\n")
with open(os.path.join(RAIZ, "avisos.json"), "w", encoding="utf8", newline="\n") as f:
    json.dump({"mercado": "lv", "avisos": []}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(datos), "datos;", [(s["id"], len(s["puntos"]), s["puntos"][-1]) for s in series])
