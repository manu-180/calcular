# Genera src/paises/sr/datos.json y series.json. Los valores salen de las fuentes primarias leidas el 2026-10-27.
import json
import os

HOY = "2026-10-27"
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.join(AQUI, "..", "..", "..", "src", "paises", "sr")


def f(organismo, titulo, url, nota=None):
    d = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        d["nota"] = nota
    return d


WLB = f("Belastingdienst Suriname", "Wet Loonbelasting (geldende tekst, laatstelijk gewijzigd bij S.B. 2024 no. 2)", "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf")
SB2025_129 = f("SRiS (Staatsblad)", "S.B. 2025 no. 129, Staatsbesluit van 29 oktober 2025 ter uitvoering van artikel 18a Wet Loonbelasting", "https://www.sris.sr/wp-content/uploads/2025/11/S.B.-2025-no.-129-STAATSBESLUIT-ter-uitvoering-van-artikel-18a-van-de-Wet-Loonbelasting.pdf")
AOV = f("Belastingdienst Suriname", "Wet Algemeen Oudedagsvoorzieningsfonds (S.B. 1981 no. 30, laatstelijk gewijzigd bij S.B. 2002 no. 96), artikel 20", "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-AOV.pdf")
IB = f("Belastingdienst Suriname", "Inkomstenbelasting 1922 (geldende tekst, laatstelijk gewijzigd bij S.B. 2024 no. 3)", "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Inkomstenbelasting.pdf")
BTW = f("Belastingdienst Suriname", "Wet BTW 2022 (S.B. 2022 no. 121), artikel 4", "https://belastingdienst.sr/wp-content/uploads/2026/01/BTWS.B.-2022-no.-121-WET-BTW-2022.pdf")
BTW5 = f("Belastingdienst Suriname", "S.B. 2022 no. 148, wijziging Wet BTW (artikel 4 lid 3, bijlage 4)", "https://belastingdienst.sr/wp-content/uploads/2026/01/BTWS.B.-2022-no.-148-nadere-wijziging-WET-BTW-30-december-2022.pdf", "De brochure BTW op hoofdlijnen 2025 van de Belastingdienst noemt water, elektriciteit, kookgas en binnenlands goederenvervoer onder het tarief van 5%.")
MIN25 = f("SRiS (Staatsblad)", "S.B. 2025 no. 33, Beschikking van 24 maart 2025 no. 380/25, nieuw minimum uurloon", "https://www.sris.sr/wp-content/uploads/2025/03/S.B.-2025-no.-33-Beschikking-houdende-vaststelling-van-een-nieuw-minimum-uurloon.pdf")
MIN26 = f("SRiS (Staatsblad)", "S.B. 2026 no. 63, Beschikking van 3 juli 2026 no. 777/26, nieuw minimum uurloon", "https://www.sris.sr/wp-content/uploads/2026/08/S.B.-2026-no.-63-Beschikking-houdende-vaststelling-van-een-nieuw-minimum-uurloon.pdf")
VAC = f("De Nationale Assemblée", "Vacantiewet 1975 (S.B. 1975 no. 164c), artikelen 7 en 10", "https://www.dna.sr/media/egnb5dhm/vakantiewet.pdf")
ARB = f("De Nationale Assemblée", "Arbeidswet 1963 (G.B. 1963 no. 163), artikelen 12 en 13", "https://www.dna.sr/media/cwabf0np/arbeidswet.pdf")
HWB = f("Belastingdienst Suriname", "Wet Huurwaardebelasting 1995 (S.B. 1995 no. 108, laatstelijk gewijzigd bij S.B. 2002 no. 113), artikelen 5 en 6", "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Huurwaardebelasting.pdf")


def num(id, nombre, unidad, valor, fuente, desde, extra=None):
    d = {"id": id, "nombre": nombre, "tipo": "numero", "unidad": unidad,
         "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente}]}
    if extra:
        d.update(extra)
    return d


def escala(filas):
    return [{"desde": a, "hasta": b, "tasa": t} for a, b, t in filas]


def esc(id, nombre, tramos):
    return {"id": id, "nombre": nombre, "tipo": "escala", "unidad": "SRD", "tramos": tramos}


datos = [
    num("sr.belastingvrije-som", "Belastingvrije som loonbelasting per jaar", "SRD", 108000, WLB, "2024-01-01"),
    num("sr.forfaitaire-aftrek", "Vaste aftrek beroepskosten (percentage van het loon)", "%", 4, WLB, "2024-01-01"),
    num("sr.forfaitaire-aftrek-max", "Vaste aftrek beroepskosten, maximum per jaar", "SRD", 4800, WLB, "2024-01-01"),
    esc("sr.loonbelasting-tarief", "Tarief loonbelasting over het belastbaar loon per jaar", [
        {"estado": "verificado", "desde": "2024-01-01", "valor": escala([(0, 42000, 8), (42000, 84000, 18), (84000, 126000, 28), (126000, None, 38)]), "fuente": WLB}]),
    esc("sr.uitkering-ineens-tarief", "Tarief voor uitkeringen ineens (artikel 17a Wet Loonbelasting)", [
        {"estado": "verificado", "desde": "2024-01-01", "valor": escala([(0, 42000, 5), (42000, 84000, 15), (84000, 126000, 25), (126000, None, 35)]), "fuente": WLB}]),
    esc("sr.overwerk-tarief", "Tarief loonbelasting op overwerk per maand (artikel 17c Wet Loonbelasting)", [
        {"estado": "verificado", "desde": "2024-01-01", "hasta": "2025-06-30", "valor": escala([(0, 500, 5), (500, 1100, 15), (1100, None, 25)]), "fuente": WLB},
        {"estado": "verificado", "desde": "2025-07-01", "valor": escala([(0, 2500, 5), (2500, 7500, 15), (7500, None, 25)]), "fuente": SB2025_129}]),
    {"id": "sr.vrijstelling-vakantie-bonus", "nombre": "Vrijgesteld bedrag vakantie-uitkering en gratificatie per jaar (maximum)", "tipo": "numero", "unidad": "SRD",
     "tramos": [
         {"estado": "verificado", "desde": "2024-01-01", "hasta": "2024-12-31", "valor": 10016, "fuente": WLB},
         {"estado": "verificado", "desde": "2025-01-01", "valor": 19500, "fuente": SB2025_129}]},
    num("sr.aov-premie", "Premie AOV over het zuiver loon", "%", 4, AOV, "2024-01-01"),
    esc("sr.ib-tarief", "Tarief inkomstenbelasting natuurlijke personen over het zuiver inkomen per jaar", [
        {"estado": "verificado", "desde": "2024-01-01", "valor": escala([(0, 108000, 0), (108000, 150000, 8), (150000, 192000, 18), (192000, 234000, 28), (234000, None, 38)]), "fuente": IB}]),
    num("sr.hypotheek-max-schuld", "Maximale hypotheekschuld voor renteaftrek eigen woning", "SRD", 600000, IB, "2024-01-01"),
    num("sr.btw-algemeen", "Algemeen btw-tarief", "%", 10, BTW, "2023-01-01"),
    num("sr.btw-verlaagd", "Verlaagd btw-tarief", "%", 5, BTW5, "2023-01-01"),
    num("sr.btw-verhoogd", "Verhoogd btw-tarief (bijlage 3)", "%", 25, BTW, "2023-01-01"),
    {"id": "sr.minimumuurloon", "nombre": "Algemeen minimum uurloon", "tipo": "numero", "unidad": "SRD", "proximaRevision": "2027-07-01",
     "tramos": [
         {"estado": "verificado", "desde": "2025-04-01", "hasta": "2026-06-30", "valor": 52.47, "fuente": MIN25},
         {"estado": "verificado", "desde": "2026-07-01", "valor": 61.25, "fuente": MIN26}]},
    num("sr.vakantiedagen-basis", "Vakantiedagen na het eerste volle kalenderjaar", "dias", 12, VAC, "1975-11-24"),
    num("sr.vakantiedagen-stap", "Extra vakantiedagen per volgend kalenderjaar", "dias", 2, VAC, "1975-11-24"),
    num("sr.vakantiedagen-max", "Maximum aantal vakantiedagen", "dias", 18, VAC, "1975-11-24"),
    num("sr.vakantietoelage", "Vakantietoelage (deel van het loon over de vakantiedagen)", "%", 50, VAC, "1975-11-24"),
    num("sr.overwerk-factor", "Minimale vergoeding overwerk op een werkdag (maal het uurloon)", "factor", 1.5, ARB, "2001-01-01"),
    num("sr.overwerk-factor-rustdag", "Minimale vergoeding overwerk op een rustdag of zondag (maal het uurloon)", "factor", 2, ARB, "2001-01-01"),
    num("sr.huurwaardebelasting", "Tarief huurwaardebelasting", "%", 6, HWB, "2002-01-01"),
    num("sr.huurwaarde-eigen-gebruik", "Huurwaarde eigen woning (percentage van de verkoopwaarde)", "%", 1, HWB, "2002-01-01"),
    num("sr.huurwaarde-aftrek", "Aftrek op de verkoopwaarde bij eigen gebruik", "SRD", 50000, HWB, "2002-01-01"),
    num("sr.huurwaardebelasting-minimum", "Minimale huurwaardebelasting per jaar", "SRD", 20, HWB, "2002-01-01"),
]

with open(os.path.join(RAIZ, "datos.json"), "w", encoding="utf-8", newline="\n") as fh:
    json.dump({"mercado": "sr", "datos": datos}, fh, ensure_ascii=False, indent=2)
    fh.write("\n")

with open(os.path.join(AQUI, "cpi_pts.json"), encoding="utf-8") as fh:
    pts = json.load(fh)
pts.append(["2026-09-01", 979.7])
series = {"mercado": "sr", "series": [{
    "id": "sr.cpi",
    "nombre": "Consumentenprijsindex (CPI), totaal, april tot en met juni 2016 = 100",
    "unidad": "numero",
    "frecuencia": "mensual",
    "maxAntiguedadDias": 100,
    "fuente": f("ABS", "Suriname CPI (GDDS) en Consumentenprijsindexcijfers en inflatie over september 2026",
                "https://statistics-suriname.org/wp-content/uploads/2026/09/Suriname_CPI_new_GDDS-08-2026.xlsx",
                "Tot en met augustus 2026 uit het GDDS-bestand. September 2026 (979,7) is een voorlopig cijfer uit https://statistics-suriname.org/wp-content/uploads/2026/10/CPI-SHEET-0926.pdf."),
    "puntos": pts}]}
with open(os.path.join(RAIZ, "series.json"), "w", encoding="utf-8", newline="\n") as fh:
    json.dump(series, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
