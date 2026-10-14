"""Genera src/paises/de/datos.json. Cada valor se leyó en la fuente primaria que figura en su tramo."""
import json
import re
import pathlib

HOY = "2026-10-14"
GII = "https://www.gesetze-im-internet.de/"


def fuente(organismo, titulo, url, nota=None):
    f = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        f["nota"] = nota
    return f


def gii(titulo, ruta, nota=None):
    return fuente("Bundesministerium der Justiz (gesetze-im-internet.de)", titulo, GII + ruta, nota)


def tramo(valor, f, desde="2026-01-01", hasta=None, region=None):
    t = {"estado": "verificado"}
    if region:
        t["region"] = region
    t["desde"] = desde
    if hasta:
        t["hasta"] = hasta
    t["valor"] = valor
    t["fuente"] = f
    return t


def kebab(k):
    return re.sub(r"(?<=[a-z0-9])([A-Z])", lambda m: "-" + m.group(1).lower(), k)


def dato(id_, nombre, tipo, unidad, tramos, **extra):
    if tipo == "mapa":
        for t in tramos:
            if isinstance(t.get("valor"), dict):
                t["valor"] = {kebab(k): v for k, v in t["valor"].items()}
        if "etiquetas" in extra:
            extra["etiquetas"] = {kebab(k): v for k, v in extra["etiquetas"].items()}
    d = {"id": "de." + id_, "nombre": nombre, "tipo": tipo, "unidad": unidad}
    d.update(extra)
    d["tramos"] = tramos
    return d


LAENDER = ["bw", "by", "be", "bb", "hb", "hh", "he", "mv", "ni", "nw", "rp", "sl", "sn", "st", "sh", "th"]

BMF_RECHNER = fuente(
    "Bundesministerium der Finanzen",
    "Lohn- und Einkommensteuerrechner 2026, Kirchensteuerabzug je Bundesland",
    "https://www.bmf-steuerrechner.de/bl/bl2026/eingabeformbl2026.xhtml",
    "Der Rechner des BMF weist für jedes Land den Satz aus: 8 % in Baden-Württemberg und Bayern, 9 % in den übrigen Ländern.",
)
SVBEZGRV = gii("Sozialversicherungsrechengrößen-Verordnung 2026", "svbezgrv_2026/BJNR1160A0025.html")
BANZ_ZUSATZ = fuente(
    "Bundesministerium für Gesundheit",
    "Bekanntmachung des durchschnittlichen Zusatzbeitragssatzes für 2026 (BAnz AT 10.11.2025 B7)",
    "https://www.bundesanzeiger.de/pub/publication/oUJYVk8GYRXybnb9Y4h/content/oUJYVk8GYRXybnb9Y4h/BAnz%20AT%2010.11.2025%20B7.pdf",
)

datos = [
    dato("mwst-regelsatz", "Umsatzsteuer, Regelsatz", "numero", "%",
         [tramo(19, gii("§ 12 Absatz 1 UStG", "ustg_1980/__12.html"))], nota="Allgemeiner Steuersatz der Umsatzsteuer."),
    dato("mwst-ermaessigt", "Umsatzsteuer, ermäßigter Satz", "numero", "%",
         [tramo(7, gii("§ 12 Absatz 2 UStG", "ustg_1980/__12.html"))]),
    dato("est-tarif", "Einkommensteuertarif nach § 32a EStG", "mapa", "EUR",
         [tramo({
             "grundfreibetrag": 12348, "zone2Bis": 17799, "zone2Faktor": 914.51, "zone2Basis": 1400,
             "zone3Bis": 69878, "zone3Faktor": 173.10, "zone3Basis": 2397, "zone3Sockel": 1034.87,
             "zone4Bis": 277825, "zone4Satz": 42, "zone4Abzug": 11135.63, "zone5Satz": 45, "zone5Abzug": 19470.38,
         }, gii("§ 32a Absatz 1 EStG, Tarif ab dem Veranlagungszeitraum 2026", "estg/__32a.html"))],
         proximaRevision="2027-01-01"),
    dato("soli-satz", "Solidaritätszuschlag, Satz", "numero", "%",
         [tramo(5.5, gii("§ 4 SolzG 1995", "solzg_1995/__4.html"))]),
    dato("soli-milderung", "Solidaritätszuschlag, Milderungszone", "numero", "%",
         [tramo(11.9, gii("§ 4 Satz 2 SolzG 1995", "solzg_1995/__4.html"))]),
    dato("soli-freigrenze", "Solidaritätszuschlag, Freigrenze für Alleinstehende", "numero", "EUR",
         [tramo(20350, gii("§ 3 Absatz 3 SolzG 1995", "solzg_1995/__3.html", "Bei Zusammenveranlagung gilt das Doppelte (40 700 Euro)."))],
         proximaRevision="2027-01-01"),
    dato("kirchensteuer", "Kirchensteuersatz", "numero", "%",
         [tramo(8 if l in ("bw", "by") else 9, BMF_RECHNER, region=l) for l in LAENDER], regiones=LAENDER),
    dato("arbeitnehmer-pauschbetrag", "Arbeitnehmer-Pauschbetrag", "numero", "EUR",
         [tramo(1230, gii("§ 9a Satz 1 Nummer 1 Buchstabe a EStG", "estg/__9a.html"))]),
    dato("sonderausgaben-pauschbetrag", "Sonderausgaben-Pauschbetrag", "numero", "EUR",
         [tramo(36, gii("§ 10c EStG", "estg/__10c.html"))]),
    dato("entlastungsbetrag-alleinerziehende", "Entlastungsbetrag für Alleinerziehende", "numero", "EUR",
         [tramo(4260, gii("§ 24b Absatz 2 EStG", "estg/__24b.html"))]),
    dato("lohnsteuer-grenzen", "Grenzbeträge des Lohnsteuerabzugs", "mapa", "EUR",
         [tramo({"vorsorgeHoechstbetrag": 1900, "stkl5Grenze1": 14071, "stkl5Grenze2": 34939, "stkl5Grenze3": 222260},
                gii("§ 39b Absatz 2 Satz 5 Nummer 3 und Satz 7 EStG", "estg/__39b.html"))],
         etiquetas={"vorsorgeHoechstbetrag": "Höchstbetrag Kranken-, Pflege- und Arbeitslosenversicherung",
                    "stkl5Grenze1": "Steuerklasse V und VI, erste Grenze", "stkl5Grenze2": "Steuerklasse V und VI, zweite Grenze",
                    "stkl5Grenze3": "Steuerklasse V und VI, dritte Grenze"},
         proximaRevision="2027-01-01"),
    dato("kinderfreibetrag", "Freibeträge für Kinder je Elternteil", "mapa", "EUR",
         [tramo({"saechlich": 3414, "bea": 1464}, gii("§ 32 Absatz 6 EStG", "estg/__32.html"))],
         etiquetas={"saechlich": "Kinderfreibetrag", "bea": "Freibetrag für Betreuung, Erziehung oder Ausbildung"}),
    dato("kindergeld", "Kindergeld je Kind und Monat", "numero", "EUR",
         [tramo(259, gii("§ 66 Absatz 1 EStG", "estg/__66.html"))], proximaRevision="2027-01-01"),
    dato("kv-allgemein", "Krankenversicherung, allgemeiner Beitragssatz", "numero", "%",
         [tramo(14.6, gii("§ 241 SGB V", "sgb_5/__241.html"))]),
    dato("kv-ermaessigt", "Krankenversicherung, ermäßigter Beitragssatz", "numero", "%",
         [tramo(14.0, gii("§ 243 SGB V", "sgb_5/__243.html"))]),
    dato("kv-zusatzbeitrag", "Durchschnittlicher Zusatzbeitragssatz der Krankenkassen", "numero", "%",
         [tramo(2.9, BANZ_ZUSATZ, hasta="2026-12-31")], proximaRevision="2027-01-01"),
    dato("rv-beitragssatz", "Rentenversicherung, Beitragssatz", "numero", "%",
         [tramo(18.6, gii("Beitragssatzbekanntmachung 2026 der Rentenversicherung", "rvbeitrsbek_2026/BJNR1230A0025.html"), hasta="2026-12-31")],
         proximaRevision="2027-01-01"),
    dato("av-beitragssatz", "Arbeitslosenversicherung, Beitragssatz", "numero", "%",
         [tramo(2.6, gii("§ 341 Absatz 2 SGB III", "sgb_3/__341.html"))]),
    dato("pv-beitragssatz", "Pflegeversicherung, Beitragssatz", "numero", "%",
         [tramo(3.6, gii("§ 1 Pflege-Beitragssatz-Anpassungsverordnung 2025", "pbav_2025/__1.html"))]),
    dato("pv-zuschlaege", "Pflegeversicherung, Zuschlag und Abschlag", "mapa", "%",
         [tramo({"kinderlos": 0.6, "abschlagJeKind": 0.25}, gii("§ 55 Absatz 3 SGB XI", "sgb_11/__55.html"))],
         etiquetas={"kinderlos": "Beitragszuschlag für Kinderlose", "abschlagJeKind": "Abschlag je Kind ab dem zweiten bis zum fünften"}),
    dato("pv-sachsen", "Pflegeversicherung in Sachsen, allein vom Beschäftigten getragener Anteil", "numero", "%",
         [tramo(1, gii("§ 58 Absatz 3 SGB XI", "sgb_11/__58.html"))]),
    dato("bbg-kv", "Beitragsbemessungsgrenze Kranken- und Pflegeversicherung (Monat)", "numero", "EUR",
         [tramo(5812.50, SVBEZGRV, hasta="2026-12-31")], proximaRevision="2027-01-01"),
    dato("bbg-rv", "Beitragsbemessungsgrenze Renten- und Arbeitslosenversicherung (Monat)", "numero", "EUR",
         [tramo(8450, SVBEZGRV, hasta="2026-12-31")], proximaRevision="2027-01-01"),
    dato("durchschnittsentgelt", "Vorläufiges Durchschnittsentgelt der Rentenversicherung", "numero", "EUR",
         [tramo(51944, SVBEZGRV, hasta="2026-12-31")], proximaRevision="2027-01-01"),
    dato("rentenwert", "Aktueller Rentenwert", "numero", "EUR",
         [tramo(40.79, gii("§ 1 Rentenwertbestimmungsverordnung 2025", "rwbestv_2025/__1.html"), desde="2025-07-01", hasta="2026-06-30"),
          tramo(42.52, gii("§ 1 Rentenwertbestimmungsverordnung 2026", "rwbestv_2026/__1.html"), desde="2026-07-01")],
         proximaRevision="2027-07-01"),
    dato("mindestlohn", "Gesetzlicher Mindestlohn je Zeitstunde", "numero", "EUR",
         [tramo(13.90, gii("§ 1 Nummer 1 Fünfte Mindestlohnanpassungsverordnung", "milov5/__1.html"), hasta="2026-12-31"),
          tramo(14.60, gii("§ 1 Nummer 2 Fünfte Mindestlohnanpassungsverordnung", "milov5/__1.html"), desde="2027-01-01")]),
    dato("minijob-kv-pauschale", "Minijob, Pauschalbeitrag des Arbeitgebers zur Krankenversicherung", "numero", "%",
         [tramo(13, gii("§ 249b SGB V", "sgb_5/__249b.html",
                        "Das im Juli 2026 verkündete GKV-Beitragssatzstabilisierungsgesetz ändert den Satz ab 2027; der neue Wert fehlt noch."),
                hasta="2026-12-31")], proximaRevision="2027-01-01"),
    dato("minijob-rv-pauschale", "Minijob, Beitragsanteil des Arbeitgebers zur Rentenversicherung", "numero", "%",
         [tramo(15, gii("§ 168 Absatz 1 Nummer 1b und § 172 Absatz 3 SGB VI", "sgb_6/__172.html"))]),
    dato("minijob-pauschsteuer", "Minijob, einheitliche Pauschsteuer", "numero", "%",
         [tramo(2, gii("§ 40a Absatz 2 EStG", "estg/__40a.html"))], proximaRevision="2027-01-01"),
    dato("uebergangsbereich-obergrenze", "Obergrenze des Übergangsbereichs (Midijob)", "numero", "EUR",
         [tramo(2000, gii("§ 20 Absatz 2 SGB IV", "sgb_4/__20.html"))]),
    dato("mindesturlaub", "Gesetzlicher Mindesturlaub", "numero", "dias",
         [tramo(24, gii("§ 3 Absatz 1 BUrlG", "burlg/__3.html"))], nota="24 Werktage bei einer Sechstagewoche."),
    dato("kuendigungsfristen", "Kündigungsfristen des Arbeitgebers nach Betriebszugehörigkeit", "mapa", "meses",
         [tramo({"2": 1, "5": 2, "8": 3, "10": 4, "12": 5, "15": 6, "20": 7}, gii("§ 622 Absatz 2 BGB", "bgb/__622.html"))],
         nota="Schlüssel: Jahre Betriebszugehörigkeit; Wert: Monate zum Ende eines Kalendermonats."),
    dato("abfindung-faktor", "Abfindung nach § 1a KSchG, Monatsverdienste je Beschäftigungsjahr", "numero", "factor",
         [tramo(0.5, gii("§ 1a Absatz 2 KSchG", "kschg/__1a.html"))]),
    dato("elterngeld-saetze", "Elterngeld, Ersatzrate", "mapa", "%",
         [tramo({"regel": 67, "mindest": 65, "hoechst": 100}, gii("§ 2 Absatz 1 und 2 BEEG", "beeg/__2.html"))],
         etiquetas={"regel": "Regelsatz", "mindest": "Untergrenze bei hohem Einkommen", "hoechst": "Obergrenze bei geringem Einkommen"}),
    dato("elterngeld-betraege", "Elterngeld, Beträge", "mapa", "EUR",
         [tramo({"mindest": 300, "hoechst": 1800, "schwelleNiedrig": 1000, "schwelleHoch": 1200},
                gii("§ 2 Absatz 1, 2 und 4 BEEG", "beeg/__2.html"))],
         etiquetas={"mindest": "Mindestbetrag", "hoechst": "Höchstbetrag", "schwelleNiedrig": "Schwelle für die Erhöhung", "schwelleHoch": "Schwelle für die Absenkung"}),
    dato("elterngeld-einkommensgrenze", "Elterngeld, Einkommensgrenze (zu versteuerndes Einkommen)", "numero", "EUR",
         [tramo(175000, gii("§ 1 Absatz 8 BEEG", "beeg/__1.html"))]),
    dato("entfernungspauschale", "Entfernungspauschale je Kilometer", "numero", "EUR",
         [tramo(0.38, gii("§ 9 Absatz 1 Satz 3 Nummer 4 EStG", "estg/__9.html"))]),
    dato("entfernungspauschale-hoechstbetrag", "Entfernungspauschale, Höchstbetrag ohne eigenes Auto", "numero", "EUR",
         [tramo(4500, gii("§ 9 Absatz 1 Satz 3 Nummer 4 EStG", "estg/__9.html"))]),
    dato("abgeltungsteuer", "Abgeltungsteuer auf Kapitalerträge", "numero", "%",
         [tramo(25, gii("§ 32d Absatz 1 EStG", "estg/__32d.html"))]),
    dato("sparer-pauschbetrag", "Sparer-Pauschbetrag", "mapa", "EUR",
         [tramo({"einzeln": 1000, "zusammen": 2000}, gii("§ 20 Absatz 9 EStG", "estg/__20.html"))],
         etiquetas={"einzeln": "Alleinstehende", "zusammen": "Zusammen veranlagte Ehegatten"}),
    dato("kleinunternehmer-grenzen", "Kleinunternehmerregelung, Umsatzgrenzen", "mapa", "EUR",
         [tramo({"vorjahr": 25000, "laufendesJahr": 100000}, gii("§ 19 Absatz 1 UStG", "ustg_1980/__19.html"))],
         etiquetas={"vorjahr": "Gesamtumsatz im Vorjahr", "laufendesJahr": "Gesamtumsatz im laufenden Jahr"}),
    dato("gewst-freibetrag", "Gewerbesteuer, Freibetrag für Einzelunternehmen und Personengesellschaften", "numero", "EUR",
         [tramo(24500, gii("§ 11 Absatz 1 GewStG", "gewstg/__11.html"))]),
    dato("gewst-messzahl", "Gewerbesteuer, Steuermesszahl", "numero", "%",
         [tramo(3.5, gii("§ 11 Absatz 2 GewStG", "gewstg/__11.html"))]),
    dato("gewst-mindesthebesatz", "Gewerbesteuer, Mindesthebesatz", "numero", "%",
         [tramo(280, gii("§ 16 Absatz 4 GewStG", "gewstg/__16.html"))]),
    dato("erbst-freibetraege", "Erbschaft- und Schenkungsteuer, persönliche Freibeträge", "mapa", "EUR",
         [tramo({"ehegatte": 500000, "kind": 400000, "enkel": 200000, "eltern": 100000, "klasse2": 20000, "klasse3": 20000},
                gii("§ 16 Absatz 1 ErbStG", "erbstg_1974/__16.html"))],
         etiquetas={"ehegatte": "Ehegatte, Lebenspartner", "kind": "Kind, Stiefkind", "enkel": "Enkelkind",
                    "eltern": "Eltern bei Erbschaft", "klasse2": "Steuerklasse II", "klasse3": "Steuerklasse III"}),
]

ERBST = gii("§ 19 Absatz 1 ErbStG", "erbstg_1974/__19.html")
grenzen = [75000, 300000, 600000, 6000000, 13000000, 26000000, None]
for nombre, saetze in (("1", [7, 11, 15, 19, 23, 27, 30]), ("2", [15, 20, 25, 30, 35, 40, 43]), ("3", [30, 30, 30, 30, 50, 50, 50])):
    filas = []
    desde = 0
    for g, s in zip(grenzen, saetze):
        filas.append({"desde": desde, "hasta": g, "tasa": s})
        desde = (g or 0) + 0.01
    datos.append(dato(f"erbst-satz-klasse-{nombre}", f"Erbschaftsteuer, Steuersätze der Steuerklasse {'I' * int(nombre) if nombre != '3' else 'III'}",
                      "escala", "EUR", [tramo(filas, ERBST)]))

GREST_SEKUNDAER = {"bw": 5.0, "by": 3.5, "be": 6.0, "bb": 6.5, "hb": 5.5, "hh": 5.5, "he": 6.0, "mv": 6.0, "ni": 5.0,
                   "nw": 6.5, "rp": 5.0, "sl": 6.5, "sn": 5.5, "st": 5.0, "sh": 6.5, "th": 5.0}
datos.append(dato("grunderwerbsteuer", "Grunderwerbsteuersatz", "numero", "%", [
    {"estado": "no-verificado", "region": l, "desde": "2026-01-01", "valor": GREST_SEKUNDAER[l],
     "motivo": "Nur in Ratgeberportalen gelesen; der Satz steht im jeweiligen Landesgesetz, das noch nicht geprüft ist."}
    for l in LAENDER], regiones=LAENDER))

salida = {"mercado": "de", "datos": datos}
ruta = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "de" / "datos.json"
with open(ruta, "w", encoding="utf-8", newline="\n") as f:
    json.dump(salida, f, ensure_ascii=False, indent=2)
    f.write("\n")
print("escrito", ruta, len(datos), "datos")
