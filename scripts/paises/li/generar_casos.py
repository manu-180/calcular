"""Escribe los .casos.ts de li. Los valores esperados están recalculados a mano desde las fuentes."""
import json
import pathlib
import re

DIR = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "li" / "calculadoras"
F = "2026-10-22"
AHV = "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1"
STEG = "https://www.gesetze.li/konso/2010340000"
ABGB = "https://www.gesetze.li/konso/1003001000"
MWSTG = "https://www.gesetze.li/konso/2009330000"
BPVG = "https://www.gesetze.li/konso/1988012000"
FAK = "https://www.ahv.li/leistungen/fak/kinderzulagen"
GZ = "https://www.ahv.li/leistungen/fak/geburtszulagen"


def caso(nombre, detalle, entrada, esperado=None, url=None, error=False, tol=None):
    c = {"nombre": nombre, "origen": {"tipo": "recalculado", **({"url": url} if url else {}), "detalle": detalle}, "fecha": F, "entrada": entrada}
    if error:
        c["esperaError"] = True
    else:
        c["esperado"] = esperado
    if tol:
        c["tolerancia"] = tol
    return c


CASOS = {
    "brutto-netto-rechner": [
        caso("6500 Franken, 12 Löhne, 35 Jahre", "AHV/IV/FAK 4,9 % = 318,50; ALV 0,5 % von 78 000 / 12 = 32,50; Pensionskasse 4 % von 78 000 / 12 = 260. Abzüge 611, netto 5889.",
             {"monatslohn": 6500, "anzahl": "12", "alter": 35, "nbu": 0, "bpvMonat": None}, {"ahv": 318.5, "alv": 32.5, "bpv": 260, "total": 611, "netto": 5889, "nettoJahr": 70668}, AHV),
        caso("12 000 Franken, 13 Löhne, NBU 1 %", "AHV 588; ALV 0,5 % bis 126 000 = 630 / 13 = 48,46; BPV 4 % von 156 000 / 13 = 480; NBU 120. Abzüge 1236,46.",
             {"monatslohn": 12000, "anzahl": "13", "alter": 45, "nbu": 1, "bpvMonat": None}, {"ahv": 588, "alv": 48.46, "bpv": 480, "nbu": 120, "total": 1236.46, "netto": 10763.54, "jahreslohn": 156000}, AHV),
        caso("19 Jahre: noch keine Altersvorsorge", "AHV 196, ALV 240 / 12 = 20, keine Pensionskasse vor dem 20. Kalenderjahr.",
             {"monatslohn": 4000, "anzahl": "12", "alter": 19, "nbu": 0, "bpvMonat": None}, {"ahv": 196, "alv": 20, "bpv": 0, "netto": 3784}, AHV),
        caso("Lohn null", "Kein Lohn.", {"monatslohn": 0, "anzahl": "12", "alter": 35, "nbu": 0, "bpvMonat": None}, error=True),
    ],
    "lohnkosten-rechner": [
        caso("6000 Franken, 12 Löhne", "AG 7,385 % = 443,10; ALV 30; BPV 4 % von 72 000 / 12 = 240. Beiträge 713,10, Kosten 6713,10.",
             {"monatslohn": 6000, "anzahl": "12", "alter": 35, "bu": 0, "bpvAg": None}, {"ahv": 443.1, "alv": 30, "bpv": 240, "beitraege": 713.1, "kosten": 6713.1, "jahr": 80557.2}, AHV),
        caso("Mit BU 0,2 % und eigenem BPV-Beitrag", "AG 443,10; ALV 30; BPV 300; BU 12. Beiträge 785,10.",
             {"monatslohn": 6000, "anzahl": "12", "alter": 35, "bu": 0.2, "bpvAg": 300}, {"bu": 12, "bpv": 300, "beitraege": 785.1, "kosten": 6785.1}, AHV),
    ],
    "steuerrechner": [
        caso("80 000 Franken, alleinstehend, 150 %", "0,05 x 80 000 - 1744 = 2256; Gemeinde 150 % = 3384; total 5640.",
             {"erwerb": 80000, "tarif": "alleinstehend", "zuschlag": 150}, {"landessteuer": 2256, "gemeindesteuer": 3384, "total": 5640, "durchschnitt": 7.05, "grenzsatz": 12.5}, STEG),
        caso("60 000 Franken, Ehegatten, 200 %", "0,03 x 60 000 - 1163 = 637; Gemeinde 1274; total 1911.",
             {"erwerb": 60000, "tarif": "ehegatten", "zuschlag": 200}, {"landessteuer": 637, "gemeindesteuer": 1274, "total": 1911}, STEG),
        caso("250 000 Franken, alleinerziehend, 180 %", "0,065 x 250 000 - 5232 = 11 018; Gemeinde 19 832,40; total 30 850,40.",
             {"erwerb": 250000, "tarif": "alleinerziehend", "zuschlag": 180}, {"landessteuer": 11018, "gemeindesteuer": 19832.4, "total": 30850.4}, STEG),
        caso("Unter dem Grundfreibetrag", "15 000 liegt unter 15 855: keine Steuer.", {"erwerb": 15000, "tarif": "alleinstehend", "zuschlag": 150}, {"total": 0}, STEG),
        caso("Abrundung auf 10 Franken", "80 009 wird zu 80 000.", {"erwerb": 80009, "tarif": "alleinstehend", "zuschlag": 150}, {"erwerb": 80000, "landessteuer": 2256}, STEG),
    ],
    "lohnsteuer-rechner": [
        caso("85 000 Franken, alleinstehend", "Abzüge: AHV 4165 + ALV 425 + BPV 3400 + Pauschale 1600 + Prämien 3700 = 13 290. Erwerb 71 710: 0,04 x 71 710 - 1004 = 1864,40; Gemeinde 2796,60; total 4661.",
             {"jahreslohn": 85000, "tarif": "alleinstehend", "kinder": 0, "praemien": 3700, "zuschlag": 150}, {"abzuege": 13290, "erwerb": 71710, "landessteuer": 1864.4, "total": 4661, "monat": 388.42}, STEG),
        caso("120 000 Franken, Ehegatten, 2 Kinder", "Abzüge: 6480 + 4800 + 1600 + Prämien 11 800 (Höchstbetrag 7400 + 2 x 2200) + Kinder 25 400 = 50 080. Erwerb 69 920: 0,03 x 69 920 - 1163 = 934,60; Gemeinde 200 % = 1869,20.",
             {"jahreslohn": 120000, "tarif": "ehegatten", "kinder": 2, "praemien": 12000, "zuschlag": 200}, {"abzuege": 50080, "erwerb": 69920, "landessteuer": 934.6, "gemeindesteuer": 1869.2, "total": 2803.8}, STEG),
    ],
    "mwst-rechner": [
        caso("100 Franken plus Normalsatz", "8,1 % von 100.", {"betrag": 100, "richtung": "zuschlagen", "satz": "normal"}, {"mwst": 8.1, "brutto": 108.1, "satz": 8.1}, MWSTG),
        caso("108,10 Franken inklusive MWST", "108,10 / 1,081 = 100.", {"betrag": 108.1, "richtung": "herausrechnen", "satz": "normal"}, {"netto": 100, "mwst": 8.1}, MWSTG),
        caso("Beherbergung 200 Franken", "3,8 % von 200 = 7,60.", {"betrag": 200, "richtung": "zuschlagen", "satz": "beherbergung"}, {"mwst": 7.6, "satz": 3.8}, MWSTG),
        caso("Reduzierter Satz", "2,6 % von 50 = 1,30.", {"betrag": 50, "richtung": "zuschlagen", "satz": "reduziert"}, {"mwst": 1.3, "brutto": 51.3}, MWSTG),
    ],
    "ferienrechner": [
        caso("30 Jahre, 5-Tage-Woche", "Vier Wochen: 20 Tage. Zuschlag 4 / 48 = 8,33 %.", {"alter": 30, "tageProWoche": 5, "monate": 12, "vertragWochen": None}, {"wochen": 4, "tage": 20, "tageJahr": 20, "zuschlag": 8.3333}, ABGB, tol=0.001),
        caso("18 Jahre, halbes Dienstjahr", "Fünf Wochen bis zum vollendeten 20. Altersjahr: 25 Tage x 6 / 12 = 12,5.", {"alter": 18, "tageProWoche": 5, "monate": 6, "vertragWochen": None}, {"wochen": 5, "tage": 12.5}, ABGB),
        caso("Vertrag mit fünf Wochen", "Der Vertrag gibt mehr: 25 Tage.", {"alter": 40, "tageProWoche": 5, "monate": 12, "vertragWochen": 5}, {"wochen": 5, "tage": 25}, ABGB),
    ],
    "ueberstunden-rechner": [
        caso("6500 Franken Monatslohn, 42 Stunden, 10 Überstunden", "Stundenlohn 6500 x 12 / 52 / 42 = 35,71; Normallohn 357,14; Zuschlag 25 % = 89,29; total 446,43.",
             {"lohnart": "monat", "lohn": 6500, "wochenstunden": 42, "stunden": 10, "zuschlag": None}, {"stundenlohn": 35.71, "grund": 357.14, "zuschlag": 89.29, "total": 446.43, "satz": 25}, ABGB),
        caso("30 Franken Stundenlohn, 5 Stunden", "150 plus 25 % = 187,50.", {"lohnart": "stunde", "lohn": 30, "wochenstunden": 42, "stunden": 5, "zuschlag": None}, {"total": 187.5, "zuschlag": 37.5}, ABGB),
    ],
    "kuendigungsfrist-rechner": [
        caso("5. Dienstjahr", "Zwei Monate auf ein Monatsende: 15.10. + 2 Monate = 15.12., Ende 31.12.2026.",
             {"beginn": "2022-03-01", "zugang": "2026-10-15", "probezeit": 1, "vertragFrist": None}, {"dienstjahr": 5, "ende": "2026-12-31"}, ABGB),
        caso("In der Probezeit", "Sieben Tage: 27.09.2026.", {"beginn": "2026-09-01", "zugang": "2026-09-20", "probezeit": 1, "vertragFrist": None}, {"dienstjahr": 1, "ende": "2026-09-27"}, ABGB),
        caso("12. Dienstjahr", "Drei Monate: Ende 31.01.2027.", {"beginn": "2015-01-01", "zugang": "2026-10-15", "probezeit": 1, "vertragFrist": None}, {"dienstjahr": 12, "ende": "2027-01-31"}, ABGB),
        caso("1. Dienstjahr nach der Probezeit", "Ein Monat: Ende 30.11.2026.", {"beginn": "2026-01-10", "zugang": "2026-10-15", "probezeit": 1, "vertragFrist": None}, {"dienstjahr": 1, "ende": "2026-11-30"}, ABGB),
        caso("Kündigung vor Beginn", "Daten widersprechen sich.", {"beginn": "2026-10-01", "zugang": "2026-09-01", "probezeit": 1, "vertragFrist": None}, error=True),
    ],
    "sperrfrist-rechner": [
        caso("5. Dienstjahr", "90 Tage ab 01.10.2026: letzter Tag 29.12.2026.", {"beginn": "2022-03-01", "krank": "2026-10-01"}, {"tage": 90, "dienstjahr": 5, "ende": "2026-12-29"}, ABGB),
        caso("1. Dienstjahr", "30 Tage ab 01.06.2026: 30.06.2026.", {"beginn": "2026-01-01", "krank": "2026-06-01"}, {"tage": 30, "ende": "2026-06-30"}, ABGB),
        caso("9. Dienstjahr", "180 Tage ab 01.03.2026: 27.08.2026.", {"beginn": "2018-01-01", "krank": "2026-03-01"}, {"tage": 180, "ende": "2026-08-27"}, ABGB),
    ],
    "kinderzulagen-rechner": [
        caso("Ein Kind unter 10, eines ab 10", "310 + 360 = 670.", {"unter10": 1, "ab10": 1, "alleinerziehend": False}, {"monat": 670, "jahr": 8040}, FAK),
        caso("Drei Kinder, alleinerziehend", "Ab drei Kindern 360 für jedes: 1080; Alleinerziehendenzulage 3 x 120 = 360. Total 1440.", {"unter10": 2, "ab10": 1, "alleinerziehend": True}, {"kinderzulagen": 1080, "alleinerziehend": 360, "monat": 1440}, FAK),
        caso("Zwei Kinder unter 10", "2 x 310 = 620.", {"unter10": 2, "ab10": 0, "alleinerziehend": False}, {"monat": 620}, FAK),
    ],
    "geburtszulage-rechner": [
        caso("Ein Kind", "2520 Franken.", {"kinder": 1}, {"total": 2520, "proKind": 2520}, GZ),
        caso("Zwillinge", "Mehrlinge: 2 x 3070 = 6140.", {"kinder": 2}, {"total": 6140, "proKind": 3070}, GZ),
    ],
    "pensionskasse-rechner": [
        caso("78 000 Franken, 35 Jahre", "8 % von 78 000 = 6240, je die Hälfte 3120. Schwelle 12 x 1225 = 14 700, Obergrenze 3 x 12 x 2450 = 88 200.",
             {"jahreslohn": 78000, "alter": 35}, {"total": 6240, "arbeitnehmer": 3120, "arbeitgeber": 3120, "monat": 520, "schwelle": 14700, "obergrenze": 88200}, BPVG),
        caso("Unter der Schwelle", "12 000 erreicht 14 700 nicht.", {"jahreslohn": 12000, "alter": 35}, {"total": 0}, BPVG),
        caso("19 Jahre", "Altersvorsorge erst ab dem 20. Kalenderjahr.", {"jahreslohn": 30000, "alter": 19}, {"total": 0}, BPVG),
    ],
}


def nombre(slug):
    return re.sub(r"-(\w)", lambda m: m.group(1).upper(), slug)


def ts(v, ind):
    if isinstance(v, dict):
        partes = [f"{k if re.fullmatch(r'[A-Za-z_][A-Za-z0-9_]*', k) else json.dumps(k)}: {ts(x, ind)}" for k, x in v.items()]
        return "{ " + ", ".join(partes) + " }"
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    return json.dumps(v, ensure_ascii=False)


for slug, casos in CASOS.items():
    n = nombre(slug)
    lineas = ['import { definirCasos } from "@/motor/calculo";', f'import {n} from "./{slug}";', "", f"export default definirCasos({n}, ["]
    for c in casos:
        lineas.append("  {")
        for k, v in c.items():
            lineas.append(f"    {k}: {ts(v, 4)},")
        lineas.append("  },")
    lineas += ["]);", ""]
    with open(DIR / f"{slug}.casos.ts", "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lineas))
print(len(CASOS), "archivos de casos")
