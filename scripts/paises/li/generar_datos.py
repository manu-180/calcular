"""Genera src/paises/li/datos.json. Cada valor se leyó en la fuente primaria que figura en su tramo."""
import json
import pathlib

HOY = "2026-10-18"


def fuente(organismo, titulo, url, nota=None):
    f = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        f["nota"] = nota
    return f


def tramo(valor, f, desde="2026-01-01", hasta=None):
    t = {"estado": "verificado", "desde": desde}
    if hasta:
        t["hasta"] = hasta
    t["valor"] = valor
    t["fuente"] = f
    return t


def dato(id_, nombre, tipo, unidad, tramos, **extra):
    d = {"id": "li." + id_, "nombre": nombre, "tipo": tipo, "unidad": unidad}
    d.update(extra)
    d["tramos"] = tramos
    return d


AHV = "Liechtensteinische AHV-IV-FAK"
AHV_SAETZE = fuente(AHV, "Beitragsansätze AHV / IV / FAK / VK (gültig ab 01.01.2026)", "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1")
AHV_ALV = fuente(AHV, "Beitragssätze ALV (gültig ab 01.01.2011)", "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragssaetze-alv-gueltig-ab-01012011")
AHV_RENTEN = fuente(AHV, "Rentenhöhe der AHV", "https://www.ahv.li/leistungen/ahv/rentenhoehe")
FAK_KZ = fuente(AHV, "Kinderzulagen", "https://www.ahv.li/leistungen/fak/kinderzulagen")
FAK_GZ = fuente(AHV, "Geburtszulagen", "https://www.ahv.li/leistungen/fak/geburtszulagen")
FAK_AZ = fuente(AHV, "Alleinerziehendenzulagen", "https://www.ahv.li/leistungen/fak/alleinerziehendenzulagen")

LILEX = "Lilex, Gesetzesdatenbank des Fürstentums Liechtenstein (gesetze.li)"


def steg(art):
    return fuente(
        LILEX,
        f"Steuergesetz (SteG, LGBl. 2010 Nr. 340), {art}",
        "https://www.gesetze.li/konso/2010340000",
        "Gelesen in den Fassungen 01.01.2026 bis 30.06.2026 und ab 01.07.2026; gleicher Wortlaut.",
    )


def abgb(art):
    return fuente(LILEX, f"ABGB, § 1173a {art} (Arbeitsvertrag)", "https://www.gesetze.li/konso/1003001000")


def bpvg(art):
    return fuente(LILEX, f"Gesetz über die betriebliche Personalvorsorge (BPVG, LGBl. 1988 Nr. 12), {art}", "https://www.gesetze.li/konso/1988012000")


MWSTG = fuente(LILEX, "Mehrwertsteuergesetz (MWSTG, LGBl. 2009 Nr. 330), Art. 25", "https://www.gesetze.li/konso/2009330000")


def stufen(grenzen, saetze, abzuege):
    """Art. 19 SteG: Steuer = Satz x Erwerb - Abzug. grenzen: Untergrenze jeder Stufe ab der zweiten (Grundfreibetrag)."""
    out = [{"desde": 0, "hasta": grenzen[0], "tasa": 0, "cuotaFija": 0}]
    for i, desde in enumerate(grenzen):
        hasta = grenzen[i + 1] if i + 1 < len(grenzen) else None
        satz = saetze[i]
        out.append({"desde": desde, "hasta": hasta, "tasa": round(satz * 100, 4), "cuotaFija": round(satz * desde - abzuege[i], 4)})
    return out


SAETZE = [0.01, 0.03, 0.04, 0.05, 0.06, 0.065, 0.07, 0.08]
TARIF_A = stufen([15855, 21140, 42280, 73990, 105700, 137410, 169120, 211400], SAETZE, [159, 581, 1004, 1744, 2801, 3488, 4334, 6448])
TARIF_B = stufen([23783, 31710, 63420, 110985, 158550, 206115, 253680, 317100], SAETZE, [238, 872, 1506, 2616, 4202, 5232, 6501, 9672])
TARIF_C = stufen([31710, 42280, 84560, 147980, 211400, 274820, 338240, 422800], SAETZE, [317, 1163, 2008, 3488, 5602, 6976, 8667, 12895])

DATOS = [
    dato("mwst-normalsatz", "Mehrwertsteuer, Normalsatz", "numero", "%", [tramo(8.1, MWSTG, desde="2024-01-01")]),
    dato("mwst-reduziert", "Mehrwertsteuer, reduzierter Satz", "numero", "%", [tramo(2.6, MWSTG, desde="2024-01-01")]),
    dato("mwst-beherbergung", "Mehrwertsteuer, Sondersatz für Beherbergung", "numero", "%", [tramo(3.8, MWSTG, desde="2024-01-01")]),
    dato(
        "beitraege-arbeitnehmer",
        "Beiträge AHV, IV und FAK des Arbeitnehmers in Prozent des Lohns",
        "mapa",
        "%",
        [tramo({"ahv": 4.025, "iv": 0.675, "fak": 0.2}, AHV_SAETZE)],
        etiquetas={"ahv": "AHV", "iv": "IV", "fak": "FAK"},
    ),
    dato(
        "beitraege-arbeitgeber",
        "Beiträge AHV, IV, FAK und Verwaltungskosten des Arbeitgebers in Prozent des Lohns",
        "mapa",
        "%",
        [tramo({"ahv": 4.225, "iv": 0.675, "fak": 1.9, "vk": 0.585}, AHV_SAETZE)],
        etiquetas={"ahv": "AHV", "iv": "IV", "fak": "FAK", "vk": "Verwaltungskosten"},
    ),
    dato("alv-satz", "Beitragssatz ALV (Arbeitgeber und Arbeitnehmer zusammen)", "numero", "%", [tramo(1.0, AHV_ALV, desde="2011-01-01")]),
    dato("alv-hoechstlohn", "Höchstgrenze des ALV-pflichtigen Jahreslohns", "numero", "CHF", [tramo(126000, AHV_ALV, desde="2011-01-01")]),
    dato(
        "ahv-mindestrente",
        "Minimale monatliche AHV-Altersrente (Vollrente)",
        "numero",
        "CHF",
        [tramo(1225, AHV_RENTEN, desde="2025-01-01")],
        proximaRevision="2027-01-01",
    ),
    dato("ahv-hoechstrente", "Maximale monatliche AHV-Altersrente (Vollrente)", "numero", "CHF", [tramo(2450, AHV_RENTEN, desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("bpv-altersbeitrag", "Mindestbeitrag an die Altersversicherung der betrieblichen Personalvorsorge, in Prozent des versicherten Lohns", "numero", "%", [tramo(8, bpvg("Art. 7 Abs. 2 und 4"), desde="2017-01-01")]),
    dato("ferien-wochen", "Mindestferien pro Dienstjahr in Wochen", "numero", "Wochen", [tramo(4, abgb("Art. 30"), desde="2012-01-01")]),
    dato("ferien-wochen-jugendliche", "Mindestferien bis zum vollendeten 20. Altersjahr in Wochen", "numero", "Wochen", [tramo(5, abgb("Art. 30"), desde="2012-01-01")]),
    dato("ueberstunden-zuschlag", "Gesetzlicher Zuschlag für nicht ausgeglichene Überstunden", "numero", "%", [tramo(25, abgb("Art. 6 Abs. 3"), desde="1990-01-01")]),
    dato(
        "kuendigungsfristen",
        "Gesetzliche Kündigungsfristen (Probezeit in Tagen, danach in Monaten auf ein Monatsende)",
        "mapa",
        "Monate",
        [tramo({"probezeit-tage": 7, "dienstjahr-1": 1, "dienstjahr-2-9": 2, "ab-dienstjahr-10": 3}, abgb("Art. 45b und 45c"), desde="2000-01-01")],
        etiquetas={"probezeit-tage": "Probezeit (Tage)", "dienstjahr-1": "1. Dienstjahr", "dienstjahr-2-9": "2. bis 9. Dienstjahr", "ab-dienstjahr-10": "ab 10. Dienstjahr"},
    ),
    dato(
        "sperrfristen",
        "Sperrfristen bei Krankheit oder Unfall nach der Probezeit, in Tagen",
        "mapa",
        "Tage",
        [tramo({"dienstjahr-1": 30, "dienstjahr-2-5": 90, "ab-dienstjahr-6": 180}, abgb("Art. 49"), desde="2000-01-01")],
        etiquetas={"dienstjahr-1": "1. Dienstjahr", "dienstjahr-2-5": "2. bis 5. Dienstjahr", "ab-dienstjahr-6": "ab 6. Dienstjahr"},
    ),
    dato("kinderzulage", "Kinderzulage pro Kind und Monat", "numero", "CHF", [tramo(310, FAK_KZ)]),
    dato("kinderzulage-erhoeht", "Kinderzulage ab dem 10. Altersjahr, für Zwillinge und ab dem dritten Kind, pro Kind und Monat", "numero", "CHF", [tramo(360, FAK_KZ)]),
    dato("alleinerziehendenzulage", "Alleinerziehendenzulage pro Kind und Monat", "numero", "CHF", [tramo(120, FAK_AZ)]),
    dato("geburtszulage", "Geburtszulage pro Kind", "numero", "CHF", [tramo(2520, FAK_GZ)]),
    dato("geburtszulage-mehrlinge", "Geburtszulage pro Kind bei Mehrlingsgeburten", "numero", "CHF", [tramo(3070, FAK_GZ)]),
    dato("steuertarif-alleinstehend", "Tarif der Landessteuer für Alleinstehende", "escala", "CHF", [tramo(TARIF_A, steg("Art. 19 Abs. 1 Bst. a"))], proximaRevision="2027-01-01"),
    dato("steuertarif-alleinerziehend", "Tarif der Landessteuer für Alleinerziehende", "escala", "CHF", [tramo(TARIF_B, steg("Art. 19 Abs. 1 Bst. b"))], proximaRevision="2027-01-01"),
    dato("steuertarif-ehegatten", "Tarif der Landessteuer für gemeinsam veranlagte Ehegatten", "escala", "CHF", [tramo(TARIF_C, steg("Art. 19 Abs. 1 Bst. c"))], proximaRevision="2027-01-01"),
    dato("gemeindezuschlag", "Spannweite des Gemeindezuschlags in Prozent der Landessteuer", "mapa", "%", [tramo({"min": 150, "max": 250}, steg("Art. 75 Abs. 3"))], etiquetas={"min": "Mindestens", "max": "Höchstens"}),
    dato("gewinnungskosten-pauschale", "Pauschalabzug für Gewinnungskosten bei unselbständiger Tätigkeit", "numero", "CHF", [tramo(1600, steg("Art. 16 Abs. 2 Bst. c"))]),
    dato("kinderabzug", "Abzug pro Kind", "numero", "CHF", [tramo(12700, steg("Art. 16 Abs. 3 Bst. a"))]),
    dato(
        "versicherungsabzug",
        "Höchstabzug für Versicherungsprämien (Leben, Kranken, Unfall)",
        "mapa",
        "CHF",
        [tramo({"person": 3700, "ehegatten": 7400, "kind": 2200}, steg("Art. 16 Abs. 3 Bst. d"))],
        etiquetas={"person": "pro steuerpflichtige Person", "ehegatten": "gemeinsam veranlagte Ehegatten", "kind": "pro Kind"},
    ),
]

salida = {"mercado": "li", "datos": DATOS}
destino = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "li" / "datos.json"
destino.parent.mkdir(parents=True, exist_ok=True)
with open(destino, "w", encoding="utf-8", newline="\n") as f:
    f.write(json.dumps(salida, ensure_ascii=False, indent=2) + "\n")
print(len(DATOS), "datos")
