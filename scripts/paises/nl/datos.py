"""Genera src/paises/nl/datos.json. Cada valor sale de la fuente primaria anotada en FUENTES y se
leyó el día de VERIFICADO; para un año nuevo se cambian los tramos acá y se vuelve a correr."""

import json
from pathlib import Path

VERIFICADO = "2026-10-14"
BD = "https://www.belastingdienst.nl/wps/wcm/connect"

FUENTES = {
    "va": ("Belastingdienst", "Voorlopige aanslag 2026: gebruikte tarieven en heffingskortingen", f"{BD}/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen"),
    "wib": ("Overheid.nl (wetten.overheid.nl)", "Wet inkomstenbelasting 2001, geldend vanaf 1 januari 2026", "https://wetten.overheid.nl/BWBR0011353/2026-01-01"),
    "btw": ("Belastingdienst", "Btw: tarieven en vrijstellingen", f"{BD}/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/"),
    "ml": ("Rijksoverheid", "Bedragen minimumloon 2026", "https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026"),
    "wml": ("Overheid.nl (wetten.overheid.nl)", "Wet minimumloon en minimumvakantiebijslag, artikel 15", "https://wetten.overheid.nl/BWBR0002638/2026-01-01"),
    "bw7": ("Overheid.nl (wetten.overheid.nl)", "Burgerlijk Wetboek Boek 7, artikelen 634, 672 en 673", "https://wetten.overheid.nl/BWBR0005290/2026-01-01"),
    "uwv": ("UWV", "Hoogte WW-uitkering", "https://www.uwv.nl/nl/ww/hoogte-ww"),
    "ww": ("Overheid.nl (wetten.overheid.nl)", "Werkloosheidswet, artikelen 42 en 47", "https://wetten.overheid.nl/BWBR0004045"),
    "za": ("Belastingdienst", "Zelfstandigenaftrek 2026", f"{BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026"),
    "mkb": ("Belastingdienst", "Mkb-winstvrijstelling 2026", f"{BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/mkb-winstvrijstelling-2026"),
    "beperking": ("Belastingdienst", "Afbouw tarief aftrekposten bij een hoog inkomen", f"{BD}/nl/aftrek-en-kortingen/content/afbouw-tarief-aftrekposten-bij-hoog-inkomen"),
    "zvw": ("Belastingdienst", "Percentages inkomensafhankelijke bijdrage Zvw", f"{BD}/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/veranderingen-bijdrage-zvw/percentages-zvw"),
    "box3": ("Belastingdienst", "Berekening box 3-inkomen voorlopige aanslag 2026", f"{BD}/nl/box-3/content/berekening-box-3-inkomen-2026"),
    "drempel": ("Belastingdienst", "Box 3: drempel voor schulden", f"{BD}/bldcontentnl/belastingdienst/prive/vermogen_en_aanmerkelijk_belang/vermogen/wat_zijn_uw_bezittingen_en_schulden/uw_schulden/drempel"),
    "ovb": ("Belastingdienst", "Het tarief van de overdrachtsbelasting", f"{BD}/bldcontentnl/belastingdienst/prive/woning/overdrachtsbelasting/tarieven_overdrachtsbelasting/het_tarief_van_de_overdrachtbelasting"),
    "starter": ("Belastingdienst", "Startersvrijstelling overdrachtsbelasting: voorwaarden", f"{BD}/bldcontentnl/belastingdienst/prive/woning/overdrachtsbelasting/startersvrijstelling/startersvrijstelling"),
    "kb": ("SVB", "Bedragen en betaaldagen kinderbijslag", "https://www.svb.nl/nl/kinderbijslag/bedragen-betaaldagen/bedragen-kinderbijslag"),
    "aow": ("SVB", "Bedragen AOW vanaf 1 juli 2026", "https://www.svb.nl/nl/aow/bedragen-aow/aow-bedragen"),
    "aowl": ("SVB", "AOW-leeftijd: vastgestelde en verwachte AOW-leeftijden", "https://www.svb.nl/nl/aow/aow-leeftijd/uw-aow-leeftijd"),
    "aowwet": ("Overheid.nl (wetten.overheid.nl)", "Algemene Ouderdomswet, artikel 13", "https://wetten.overheid.nl/BWBR0002221/2026-07-01"),
    "lh": ("Belastingdienst", "Tarieven, bedragen en percentages loonheffingen vanaf 1 januari 2026 (bijlage Nieuwsbrief Loonheffingen 2026, uitgave 3)", "https://download.belastingdienst.nl/belastingdienst/docs/bijlage-nieuwsbrief-loonheffingen-2026-lh2091b63fd.pdf"),
}


def fuente(clave, nota=None):
    org, titulo, url = FUENTES[clave]
    f = {"organismo": org, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": VERIFICADO}
    if nota:
        f["nota"] = nota
    return f


def tramo(valor, clave, desde="2026-01-01", hasta=None, nota=None):
    t = {"estado": "verificado", "desde": desde}
    if hasta:
        t["hasta"] = hasta
    t["valor"] = valor
    t["fuente"] = fuente(clave, nota)
    return t


def dato(id_, nombre, tipo, unidad, tramos, **extra):
    d = {"id": f"nl.{id_}", "nombre": nombre, "tipo": tipo, "unidad": unidad}
    d.update(extra)
    d["tramos"] = tramos
    return d


REVISION = "2027-01-01"

datos = [
    dato("btw-hoog", "Btw, algemeen tarief", "numero", "%", [tramo(21, "btw")], proximaRevision=REVISION),
    dato("btw-laag", "Btw, verlaagd tarief", "numero", "%", [tramo(9, "btw")], proximaRevision=REVISION),
    dato(
        "box1-schijven",
        "Tarieven box 1 (jonger dan de AOW-leeftijd)",
        "escala",
        "EUR",
        [tramo([
            {"desde": 0, "hasta": 38883, "tasa": 35.75},
            {"desde": 38883, "hasta": 78426, "tasa": 37.56},
            {"desde": 78426, "hasta": None, "tasa": 49.5},
        ], "va")],
        proximaRevision=REVISION,
        nota="De eerste schijf bevat de premies volksverzekeringen.",
    ),
    dato("ahk", "Algemene heffingskorting (jonger dan de AOW-leeftijd)", "mapa", "EUR",
         [tramo({"max": 3115, "afbouwgrens": 29736}, "va")], proximaRevision=REVISION),
    dato("ahk-afbouw", "Afbouw algemene heffingskorting", "numero", "%", [tramo(6.398, "va")], proximaRevision=REVISION),
    dato("arbeidskorting-grenzen", "Arbeidskorting: grenzen en maxima", "mapa", "EUR",
         [tramo({"grens1": 11965, "max1": 996, "grens2": 25845, "max2": 5300, "grens3": 45592, "max3": 5685, "einde": 132920}, "va",
                nota="Ook in artikel 8.11 Wet IB 2001.")], proximaRevision=REVISION),
    dato("arbeidskorting-tarieven", "Arbeidskorting: opbouw- en afbouwpercentages", "mapa", "%",
         [tramo({"opbouw1": 8.324, "opbouw2": 31.009, "opbouw3": 1.95, "afbouw": 6.51}, "va")], proximaRevision=REVISION),
    dato("iack", "Inkomensafhankelijke combinatiekorting: drempel en maximum", "mapa", "EUR",
         [tramo({"drempel": 6239, "max": 3032}, "va")], proximaRevision=REVISION),
    dato("iack-tarief", "Inkomensafhankelijke combinatiekorting: opbouwpercentage", "numero", "%", [tramo(11.45, "va")], proximaRevision=REVISION),
    dato("aftrek-maximumtarief", "Maximaal tarief voor aftrekposten", "numero", "%", [tramo(37.56, "beperking")], proximaRevision=REVISION),
    dato("vakantiebijslag", "Minimumvakantiebijslag", "numero", "%", [tramo(8, "wml")]),
    dato("vakantie-weken", "Wettelijke vakantie: aantal keer de arbeidsduur per week", "numero", "numero", [tramo(4, "bw7", nota="Artikel 7:634 BW.")]),
    dato(
        "minimumloon",
        "Wettelijk minimumuurloon naar leeftijd",
        "mapa",
        "EUR",
        [
            tramo({"21-plus": 14.71, "20": 11.77, "19": 8.83, "18": 7.36, "17": 5.81, "16": 5.07, "15": 4.41}, "ml", hasta="2026-06-30", nota="Bedragen per 1 januari 2026."),
            tramo({"21-plus": 14.99, "20": 11.99, "19": 8.99, "18": 7.50, "17": 5.92, "16": 5.17, "15": 4.50}, "ml", desde="2026-07-01", nota="Bedragen per 1 juli 2026."),
        ],
        etiquetas={"21-plus": "21 jaar en ouder", "20": "20 jaar", "19": "19 jaar", "18": "18 jaar", "17": "17 jaar", "16": "16 jaar", "15": "15 jaar"},
        proximaRevision=REVISION,
    ),
    dato("transitievergoeding-max", "Maximale transitievergoeding", "numero", "EUR",
         [tramo(102000, "bw7", nota="Artikel 7:673 lid 2 BW: of een jaarsalaris als dat hoger is.")], proximaRevision=REVISION),
    dato("opzegtermijn-werkgever", "Opzegtermijn voor de werkgever naar duur van het contract", "mapa", "meses",
         [tramo({"0": 1, "5": 2, "10": 3, "15": 4}, "bw7", nota="Artikel 7:672 lid 2 BW. De sleutel is het aantal jaren dienstverband vanaf.")]),
    dato("opzegtermijn-werknemer", "Opzegtermijn voor de werknemer", "numero", "meses", [tramo(1, "bw7", nota="Artikel 7:672 lid 4 BW.")]),
    dato("ww-percentages", "WW-uitkering als percentage van het maandloon", "mapa", "%",
         [tramo({"eerste-twee-maanden": 75, "daarna": 70}, "uwv")]),
    dato(
        "ww-maximumdagloon",
        "Maximumdagloon werknemersverzekeringen",
        "numero",
        "EUR",
        [
            {"estado": "no-verificado", "desde": "2026-01-01", "hasta": "2026-06-30", "valor": 304.25,
             "motivo": "Alleen in een secundaire bron gezien; de bekendmaking in de Staatscourant is niet geopend."},
            tramo(309.91, "uwv", desde="2026-07-01", nota="UWV noemt dit bedrag als het huidige wettelijk maximumdagloon."),
        ],
        proximaRevision=REVISION,
    ),
    dato("ww-duur", "Duur WW-uitkering: minimum en maximum", "mapa", "meses", [tramo({"minimum": 3, "maximum": 24}, "ww", nota="Artikel 42 lid 1 Werkloosheidswet.")]),
    dato("zelfstandigenaftrek", "Zelfstandigenaftrek", "numero", "EUR", [tramo(1200, "za")], proximaRevision=REVISION),
    dato("startersaftrek", "Startersaftrek", "numero", "EUR", [tramo(2123, "za")], proximaRevision=REVISION),
    dato("mkb-winstvrijstelling", "Mkb-winstvrijstelling", "numero", "%", [tramo(12.7, "mkb")], proximaRevision=REVISION),
    dato("zvw-bijdrage", "Inkomensafhankelijke bijdrage Zvw (aanslag of inhouding)", "numero", "%", [tramo(4.85, "zvw")], proximaRevision=REVISION),
    dato("zvw-werkgeversheffing", "Werkgeversheffing Zvw", "numero", "%", [tramo(6.10, "zvw")], proximaRevision=REVISION),
    dato("zvw-maximum", "Maximumbijdrage-inkomen Zvw", "numero", "EUR", [tramo(79409, "zvw")], proximaRevision=REVISION),
    dato("box3-rendement", "Box 3: forfaitaire rendementspercentages", "mapa", "%",
         [tramo({"banktegoeden": 1.28, "overige": 6, "schulden": 2.7}, "box3",
                nota="Banktegoeden en schulden zijn voorlopige percentages; de Belastingdienst stelt ze begin 2027 vast.")],
         etiquetas={"banktegoeden": "Banktegoeden", "overige": "Beleggingen en andere bezittingen", "schulden": "Schulden"},
         proximaRevision="2027-03-01"),
    dato("box3-heffingsvrij", "Box 3: heffingsvrij vermogen per persoon", "numero", "EUR", [tramo(59357, "box3")], proximaRevision=REVISION),
    dato("box3-drempel", "Box 3: drempel voor schulden per persoon", "numero", "EUR", [tramo(3800, "drempel")], proximaRevision=REVISION),
    dato("box3-tarief", "Box 3: tarief", "numero", "%", [tramo(36, "box3")], proximaRevision=REVISION),
    dato(
        "eigenwoningforfait",
        "Eigenwoningforfait naar WOZ-waarde",
        "escala",
        "EUR",
        [tramo([
            {"desde": 0, "hasta": 12500, "tasa": 0},
            {"desde": 12500.01, "hasta": 25000, "tasa": 0.10},
            {"desde": 25000.01, "hasta": 50000, "tasa": 0.20},
            {"desde": 50000.01, "hasta": 75000, "tasa": 0.25},
            {"desde": 75000.01, "hasta": 1350000, "tasa": 0.35},
            {"desde": 1350000.01, "hasta": None, "tasa": 2.35, "cuotaFija": 4725},
        ], "wib", nota="Artikel 3.112 lid 1 Wet IB 2001. Zonder cuotaFija geldt het percentage over de hele waarde.")],
        proximaRevision=REVISION,
    ),
    dato("hillen", "Aftrek wegens geen of geringe eigenwoningschuld (Wet Hillen)", "numero", "%", [tramo(71.867, "wib", nota="Artikel 3.123a lid 2 Wet IB 2001.")], proximaRevision=REVISION),
    dato("overdrachtsbelasting", "Tarieven overdrachtsbelasting", "mapa", "%",
         [tramo({"eigen-woning": 2, "overige-woning": 8, "niet-woning": 10.4}, "ovb")],
         etiquetas={"eigen-woning": "Woning waarin je zelf gaat wonen", "overige-woning": "Woning waarin je niet zelf gaat wonen", "niet-woning": "Geen woning (bedrijfspand, grond, losse garage)"},
         proximaRevision=REVISION),
    dato("startersvrijstelling-grens", "Startersvrijstelling: maximale woningwaarde", "numero", "EUR", [tramo(555000, "starter")], proximaRevision=REVISION),
    dato("startersvrijstelling-leeftijd", "Startersvrijstelling: jonger dan", "numero", "anios", [tramo(35, "starter")]),
    dato(
        "kinderbijslag",
        "Kinderbijslag per kind per kwartaal",
        "mapa",
        "EUR",
        [
            tramo({"0-5": 295.07, "6-11": 358.30, "12-17": 421.53}, "kb", hasta="2026-06-30", nota="Eerste en tweede kwartaal 2026."),
            tramo({"0-5": 298.40, "6-11": 362.35, "12-17": 426.29}, "kb", desde="2026-07-01", nota="Derde en vierde kwartaal 2026."),
        ],
        etiquetas={"0-5": "0 tot en met 5 jaar", "6-11": "6 tot en met 11 jaar", "12-17": "12 tot en met 17 jaar"},
        proximaRevision=REVISION,
    ),
    dato(
        "aow-bruto",
        "Volledige AOW per maand, bruto, zonder vakantiegeld",
        "mapa",
        "EUR",
        [
            {"estado": "no-verificado", "desde": "2026-01-01", "hasta": "2026-06-30",
             "motivo": "Op de SVB-pagina staan alleen de bedragen vanaf 1 juli 2026."},
            tramo({"alleenstaand": 1662.16, "samenwonend": 1139.39}, "aow", desde="2026-07-01"),
        ],
        etiquetas={"alleenstaand": "Je woont alleen", "samenwonend": "Je bent getrouwd of woont samen"},
        proximaRevision=REVISION,
    ),
    dato(
        "aow-vakantiegeld",
        "Vakantiegeld bij een volledige AOW per maand, bruto",
        "mapa",
        "EUR",
        [
            {"estado": "no-verificado", "desde": "2026-01-01", "hasta": "2026-06-30",
             "motivo": "Op de SVB-pagina staan alleen de bedragen vanaf 1 juli 2026."},
            tramo({"alleenstaand": 104.78, "samenwonend": 74.85}, "aow", desde="2026-07-01"),
        ],
        proximaRevision=REVISION,
    ),
    dato("aow-korting", "AOW-korting per jaar niet verzekerd", "numero", "%", [tramo(2, "aowwet")]),
    dato(
        "aow-leeftijd",
        "Vastgestelde AOW-leeftijd in maanden, naar geboortedatum vanaf",
        "mapa",
        "meses",
        [tramo({"1956-06-01": 802, "1957-03-01": 804, "1961-01-01": 807}, "aowl", nota="Vastgesteld voor wie vóór 1 oktober 1964 is geboren.")],
    ),
    dato(
        "aow-leeftijd-verwacht",
        "Verwachte AOW-leeftijd in maanden, naar geboortedatum vanaf",
        "mapa",
        "meses",
        [tramo({"1964-10-01": 807, "1966-10-01": 810, "1970-07-01": 813, "1973-04-01": 816, "1976-01-01": 819, "1978-10-01": 822,
                "1982-07-01": 825, "1985-04-01": 828, "1989-01-01": 831, "1991-10-01": 834, "1995-07-01": 837, "1999-04-01": 840}, "aowl",
               nota="Schatting van de SVB op basis van de levensverwachting van het CBS, voor geboortedata tot en met 31 december 2000.")],
        proximaRevision="2026-12-31",
    ),
    dato("premies-werkgever", "Premies werknemersverzekeringen 2026", "mapa", "%",
         [tramo({"awf-laag": 2.74, "awf-hoog": 7.74, "aof-laag": 6.27, "aof-hoog": 7.63, "wko": 0.5}, "lh", nota="Tabel 9.")], proximaRevision=REVISION),
    dato("maximumpremieloon", "Maximumpremieloon per jaar", "numero", "EUR", [tramo(79409, "lh", nota="Tabel 11.")], proximaRevision=REVISION),
    dato("bijtelling", "Bijtelling privégebruik auto", "mapa", "%",
         [tramo({"algemeen": 22, "voor-2017": 25, "youngtimer": 35}, "lh", nota="Tabel 12.")], proximaRevision=REVISION),
    dato("bijtelling-korting-emissievrij", "Korting op de bijtelling voor een auto zonder CO2-uitstoot, naar jaar van eerste toelating", "mapa", "%",
         [tramo({"2026": 4, "2025": 5, "2023-2024": 6, "2022": 6, "2021-na-60": 4, "2021-binnen-60": 10, "2017-2020": 4}, "lh", nota="Tabel 12.")], proximaRevision=REVISION),
    dato("bijtelling-cap", "Cataloguswaarde tot waar de korting geldt (cap), naar jaar van eerste toelating", "mapa", "EUR",
         [tramo({"2026": 30000, "2025": 30000, "2023-2024": 30000, "2022": 35000, "2021-na-60": 30000, "2021-binnen-60": 40000, "2017-2020": 30000}, "lh", nota="Tabel 12.")], proximaRevision=REVISION),
    dato("kilometervergoeding", "Onbelaste reiskostenvergoeding per kilometer", "numero", "EUR", [tramo(0.23, "lh", nota="Tabel 13.")], proximaRevision=REVISION),
    dato("thuiswerkvergoeding", "Onbelaste thuiswerkvergoeding per dag", "numero", "EUR", [tramo(2.45, "lh", nota="Tabel 13.")], proximaRevision=REVISION),
]

salida = Path(__file__).resolve().parents[3] / "src" / "paises" / "nl" / "datos.json"
salida.parent.mkdir(parents=True, exist_ok=True)
with open(salida, "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "nl", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"{len(datos)} datos en {salida}")
