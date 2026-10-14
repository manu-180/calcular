"""Genera src/paises/ch/datos.json. Cada valor se leyó en la fuente primaria que figura en su tramo."""
import json
import pathlib

HOY = "2026-10-14"
FEDLEX = "https://www.fedlex.admin.ch/eli/"
BUND = "Bundeskanzlei (fedlex.admin.ch)"


def fuente(organismo, titulo, url, nota=None):
    f = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        f["nota"] = nota
    return f


def fedlex(titulo, eli, articulo, nota=None):
    return fuente(BUND, titulo, f"{FEDLEX}{eli}/de#art_{articulo}", nota)


def tramo(valor, f, desde="2026-01-01", hasta=None):
    t = {"estado": "verificado", "desde": desde}
    if hasta:
        t["hasta"] = hasta
    t["valor"] = valor
    t["fuente"] = f
    return t


def dato(id_, nombre, tipo, unidad, tramos, **extra):
    d = {"id": "ch." + id_, "nombre": nombre, "tipo": tipo, "unidad": unidad}
    d.update(extra)
    d["tramos"] = tramos
    return d


MWSTG = "cc/2009/615"
AHVG = "cc/63/837_843_843"
BVG = "cc/1983/797_797_797"
BVV2 = "cc/1984/543_543_543"
BVV3 = "cc/1985/1778_1778_1778"
DBG = "cc/1991/1184_1184_1184"
AVIG = "cc/1982/2184_2184_2184"
AVIV = "cc/1983/1205_1205_1205"
UVV = "cc/1983/38_38_38"
EOG = "cc/1952/1021_1046_1050"
FAMZG = "cc/2008/51"
OR = "cc/27/317_321_377"
VMWG = "cc/1990/835_835_835"

MB_201 = fuente(
    "Informationsstelle AHV/IV",
    "Merkblatt 2.01 Beiträge an die AHV, die IV und die EO, Stand 1. Januar 2026",
    "https://www.ahv-iv.ch/p/2.01.d",
)
MB_202 = fuente(
    "Informationsstelle AHV/IV",
    "Merkblatt 2.02 Beiträge der Selbstständigerwerbenden an die AHV, die IV und die EO, Stand 1. Januar 2026",
    "https://www.ahv-iv.ch/p/2.02.d",
)
BSV_2027 = fuente(
    "Bundesamt für Sozialversicherungen",
    "Medienmitteilung vom 2. Oktober 2026: AHV/IV-Minimalrente steigt um 20 Franken",
    "https://www.bsv.admin.ch/de/newnsb/BqB41FVYi5FB",
    "Nennt die Werte bis Ende 2026 und ab 1. Januar 2027.",
)


def escala_dbst(filas, cap_desde, cap_cuota, cap_satz):
    """filas: (Einkommen, Steuer bei diesem Einkommen, Franken je weitere 100 Franken)."""
    out = [{"desde": 0, "hasta": filas[0][0], "tasa": 0}]
    for i, (desde, cuota, satz) in enumerate(filas):
        hasta = filas[i + 1][0] if i + 1 < len(filas) else cap_desde
        out.append({"desde": desde, "hasta": hasta, "tasa": satz, "cuotaFija": cuota})
    out.append({"desde": cap_desde, "hasta": None, "tasa": cap_satz, "cuotaFija": cap_cuota})
    return out


DBST_LEDIG = escala_dbst(
    [
        (15200, 0, 0.77),
        (33200, 138.60, 0.88),
        (43500, 229.20, 2.64),
        (58000, 612.00, 2.97),
        (76200, 1152.50, 5.94),
        (82100, 1502.95, 6.60),
        (108900, 3271.75, 8.80),
        (141500, 6140.55, 11.00),
        (185100, 10936.55, 13.20),
        (793900, 91298.15, 13.20),
    ],
    794000,
    91310.00,
    11.50,
)
DBST_VERH = escala_dbst(
    [
        (29700, 0, 1.00),
        (53400, 237.00, 2.00),
        (61300, 395.00, 3.00),
        (79100, 929.00, 4.00),
        (94900, 1561.00, 5.00),
        (108700, 2251.00, 6.00),
        (120600, 2965.00, 7.00),
        (130500, 3658.00, 8.00),
        (138400, 4290.00, 9.00),
        (144300, 4821.00, 10.00),
        (148300, 5221.00, 11.00),
        (150400, 5452.00, 12.00),
        (152400, 5692.00, 13.00),
        (941300, 108249.00, 13.00),
    ],
    941400,
    108261.00,
    11.50,
)

DBST_LEDIG_2027 = escala_dbst(
    [
        (15300, 0, 0.77),
        (33400, 139.35, 0.88),
        (43700, 229.95, 2.64),
        (58300, 615.35, 2.97),
        (76500, 1155.85, 5.94),
        (82400, 1506.30, 6.60),
        (109400, 3288.30, 8.80),
        (142200, 6174.70, 11.00),
        (185900, 10981.70, 13.20),
        (797400, 91699.70, 13.20),
    ],
    797500,
    91712.50,
    11.50,
)
DBST_VERH_2027 = escala_dbst(
    [
        (29900, 0, 1.00),
        (53700, 238.00, 2.00),
        (61600, 396.00, 3.00),
        (79500, 933.00, 4.00),
        (95400, 1569.00, 5.00),
        (109200, 2259.00, 6.00),
        (121200, 2979.00, 7.00),
        (131100, 3672.00, 8.00),
        (139100, 4312.00, 9.00),
        (145000, 4843.00, 10.00),
        (149000, 5243.00, 11.00),
        (151100, 5474.00, 12.00),
        (153100, 5714.00, 13.00),
        (945900, 108778.00, 13.00),
    ],
    946000,
    108790.00,
    11.50,
)
DBG_2027 = fuente(
    BUND,
    "Art. 36 DBG, Fassung ab 1. Januar 2027 (Verordnung des EFD vom 11. September 2026 über die kalte Progression, AS 2026 486)",
    "https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20270101/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20270101-de-html-2.html",
)

GRENZEN = [
    (10100, 17600, 5.371), (17600, 23000, 5.494), (23000, 25500, 5.617), (25500, 28000, 5.741),
    (28000, 30500, 5.864), (30500, 33000, 5.987), (33000, 35500, 6.235), (35500, 38000, 6.481),
    (38000, 40500, 6.728), (40500, 43000, 6.976), (43000, 45500, 7.222), (45500, 48000, 7.469),
    (48000, 50500, 7.840), (50500, 53000, 8.209), (53000, 55500, 8.580), (55500, 58000, 8.951),
    (58000, 60500, 9.321),
]
SKALA_SE = [{"desde": d, "hasta": h, "tasa": t} for d, h, t in GRENZEN] + [{"desde": 60500, "hasta": None, "tasa": 10.0}]

DATOS = [
    dato("mwst-normalsatz", "Mehrwertsteuer, Normalsatz", "numero", "%",
         [tramo(8.1, fedlex("Art. 25 Abs. 1 MWSTG", MWSTG, 25), desde="2024-01-01")], proximaRevision="2028-01-01"),
    dato("mwst-reduziert", "Mehrwertsteuer, reduzierter Satz", "numero", "%",
         [tramo(2.6, fedlex("Art. 25 Abs. 2 MWSTG", MWSTG, 25), desde="2024-01-01")], proximaRevision="2028-01-01"),
    dato("mwst-beherbergung", "Mehrwertsteuer, Sondersatz für Beherbergung", "numero", "%",
         [tramo(3.8, fedlex("Art. 25 Abs. 4 MWSTG", MWSTG, 25, "Der Sondersatz gilt laut Gesetz bis längstens 31. Dezember 2027."), desde="2024-01-01", hasta="2027-12-31")],
         proximaRevision="2027-12-31"),
    dato("ahv-iv-eo-beitragssatz", "AHV/IV/EO-Beitragssatz auf dem Lohn (Arbeitgeber und Arbeitnehmer zusammen)", "numero", "%",
         [tramo(10.6, MB_201)], nota="AHV 8,7 %, IV 1,4 %, EO 0,5 %. Je die Hälfte zahlen Arbeitgeber und Arbeitnehmer."),
    dato("ahv-freibetrag-rentner", "AHV-Freibetrag für Erwerbstätige ab dem Referenzalter, pro Jahr", "numero", "CHF",
         [tramo(16800, MB_201)]),
    dato("alv-beitragssatz", "ALV-Beitragssatz (Arbeitgeber und Arbeitnehmer zusammen)", "numero", "%",
         [tramo(2.2, fedlex("Art. 3 Abs. 2 und 3 AVIG", AVIG, 3))]),
    dato("hoechster-versicherter-verdienst", "Höchstbetrag des versicherten Verdienstes (UVG und ALV), pro Jahr", "numero", "CHF",
         [tramo(148200, fedlex("Art. 22 Abs. 1 UVV", UVV, 22))]),
    dato("bvg-eintrittsschwelle", "BVG-Eintrittsschwelle (Jahreslohn)", "numero", "CHF",
         [tramo(22680, fedlex("Art. 2 Abs. 1 und Art. 7 Abs. 1 BVG", BVG, 7), desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("bvg-koordinationsabzug", "BVG-Koordinationsabzug", "numero", "CHF",
         [tramo(26460, fedlex("Art. 8 Abs. 1 BVG", BVG, 8), desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("bvg-obere-grenze", "Oberer Grenzbetrag des BVG-Jahreslohns", "numero", "CHF",
         [tramo(90720, fedlex("Art. 8 Abs. 1 BVG", BVG, 8), desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("bvg-min-koordinierter-lohn", "Minimaler koordinierter Lohn", "numero", "CHF",
         [tramo(3780, fedlex("Art. 8 Abs. 2 BVG", BVG, 8), desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("bvg-altersgutschriften", "BVG-Altersgutschriften in Prozent des koordinierten Lohns", "mapa", "%",
         [tramo({"25-34": 7, "35-44": 10, "45-54": 15, "55-65": 18}, fedlex("Art. 16 BVG", BVG, 16), desde="2026-01-01")],
         etiquetas={"25-34": "25 bis 34 Jahre", "35-44": "35 bis 44 Jahre", "45-54": "45 bis 54 Jahre", "55-65": "55 bis 65 Jahre"}),
    dato("bvg-mindestzins", "BVG-Mindestzinssatz", "numero", "%",
         [tramo(1.25, fedlex("Art. 12 Bst. k BVV 2", BVV2, 12), desde="2024-01-01")], proximaRevision="2027-01-01"),
    dato("bvg-umwandlungssatz", "BVG-Mindestumwandlungssatz im Referenzalter 65", "numero", "%",
         [tramo(6.8, fedlex("Art. 14 Abs. 2 BVG", BVG, 14), desde="2026-01-01")]),
    dato("saeule-3a-mit-pk", "Säule 3a, Maximalbetrag mit Pensionskasse", "numero", "CHF",
         [tramo(7258, BSV_2027, desde="2025-01-01", hasta="2026-12-31"), tramo(7373, BSV_2027, desde="2027-01-01")]),
    dato("saeule-3a-ohne-pk", "Säule 3a, Maximalbetrag ohne Pensionskasse", "numero", "CHF",
         [tramo(36288, BSV_2027, desde="2025-01-01", hasta="2026-12-31"), tramo(36864, BSV_2027, desde="2027-01-01")]),
    dato("saeule-3a-ohne-pk-satz", "Säule 3a ohne Pensionskasse, Anteil am Erwerbseinkommen", "numero", "%",
         [tramo(20, fedlex("Art. 7 Abs. 1 Bst. b BVV 3", BVV3, 7), desde="2026-01-01")]),
    dato("dbst-tarif-alleinstehend", "Direkte Bundessteuer, Tarif für Alleinstehende (Franken je 100 Franken als Satz)", "escala", "CHF",
         [tramo(DBST_LEDIG, fedlex("Art. 36 Abs. 1 DBG (Fassung ab 1. Januar 2026)", DBG, 36), hasta="2026-12-31"), tramo(DBST_LEDIG_2027, DBG_2027, desde="2027-01-01")], proximaRevision="2028-01-01"),
    dato("dbst-tarif-verheiratet", "Direkte Bundessteuer, Tarif für Verheiratete und Einelternfamilien", "escala", "CHF",
         [tramo(DBST_VERH, fedlex("Art. 36 Abs. 2 DBG (Fassung ab 1. Januar 2026)", DBG, 36), hasta="2026-12-31"), tramo(DBST_VERH_2027, DBG_2027, desde="2027-01-01")], proximaRevision="2028-01-01"),
    dato("dbst-kinderermaessigung", "Direkte Bundessteuer, Ermässigung je Kind", "numero", "CHF",
         [tramo(263, fedlex("Art. 36 Abs. 2bis DBG", DBG, 36), desde="2025-01-01", hasta="2026-12-31"), tramo(264, DBG_2027, desde="2027-01-01")], proximaRevision="2028-01-01"),
    dato("dbst-mindestbetrag", "Direkte Bundessteuer, kleinster erhobener Betrag", "numero", "CHF",
         [tramo(25, fedlex("Art. 36 Abs. 3 DBG", DBG, 36), desde="2026-01-01")]),
    dato("ahv-minimalrente", "Minimale AHV-Altersrente (Vollrente, pro Monat)", "numero", "CHF",
         [tramo(1260, fedlex("Art. 34 Abs. 5 AHVG", AHVG, 34), desde="2025-01-01", hasta="2026-12-31"), tramo(1280, BSV_2027, desde="2027-01-01")],
         proximaRevision="2029-01-01"),
    dato("ahv-mindestbeitrag-selbststaendige", "Mindestbeitrag AHV/IV/EO für Selbstständigerwerbende, pro Jahr", "numero", "CHF",
         [tramo(530, MB_202)], proximaRevision="2027-01-01"),
    dato("ahv-skala-selbststaendige", "Sinkende Beitragsskala AHV/IV/EO für Selbstständigerwerbende", "escala", "CHF",
         [tramo(SKALA_SE, MB_202)], proximaRevision="2027-01-01"),
    dato("alv-taggeld-voll", "ALV, volles Taggeld in Prozent des versicherten Verdienstes", "numero", "%",
         [tramo(80, fedlex("Art. 22 Abs. 1 AVIG", AVIG, 22), desde="2026-01-01")]),
    dato("alv-taggeld-reduziert", "ALV, Taggeld ohne Unterhaltspflicht in Prozent des versicherten Verdienstes", "numero", "%",
         [tramo(70, fedlex("Art. 22 Abs. 2 AVIG", AVIG, 22), desde="2026-01-01")]),
    dato("alv-schwelle-volles-taggeld", "ALV, volles Taggeld, bis zu dem 80 % gelten", "numero", "CHF",
         [tramo(140, fedlex("Art. 22 Abs. 2 Bst. b AVIG", AVIG, 22), desde="2026-01-01")], proximaRevision="2027-01-01"),
    dato("alv-mindestverdienst", "ALV, Mindestverdienst pro Monat", "numero", "CHF",
         [tramo(500, fedlex("Art. 40 AVIV", AVIV, 40), desde="2026-01-01")]),
    dato("alv-tage-pro-monat", "ALV, Umrechnung Monatsverdienst in Tagesverdienst (Teiler)", "numero", "numero",
         [tramo(21.7, fedlex("Art. 40a AVIV", AVIV, "40_a"), desde="2026-01-01")]),
    dato("kinderzulage", "Kinderzulage, gesetzlicher Mindestansatz pro Monat", "numero", "CHF",
         [tramo(215, fedlex("Art. 5 Abs. 1 FamZG", FAMZG, 5), desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("ausbildungszulage", "Ausbildungszulage, gesetzlicher Mindestansatz pro Monat", "numero", "CHF",
         [tramo(268, fedlex("Art. 5 Abs. 2 FamZG", FAMZG, 5), desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("eo-taggeld-satz", "EO, Taggeld bei Mutterschaft und für den andern Elternteil in Prozent des Erwerbseinkommens", "numero", "%",
         [tramo(80, fedlex("Art. 16e Abs. 2 EOG", EOG, "16_e"), desde="2026-01-01")]),
    dato("eo-hoechstbetrag-taggeld", "EO, Höchstbetrag des Taggeldes bei Mutterschaft und Vaterschaft", "numero", "CHF",
         [tramo(220, fedlex("Art. 16f Abs. 1 EOG", EOG, "16_f"), desde="2025-01-01")], proximaRevision="2027-01-01"),
    dato("mutterschaft-tage", "Dauer der Mutterschaftsentschädigung in Tagen", "numero", "numero",
         [tramo(98, fedlex("Art. 16c Abs. 2 EOG", EOG, "16_c"), desde="2026-01-01")]),
    dato("vaterschaft-taggelder", "Taggelder des andern Elternteils (Vaterschaftsurlaub)", "numero", "numero",
         [tramo(14, fedlex("Art. 16k Abs. 2 EOG", EOG, "16_k"), desde="2026-01-01")]),
    dato("ferien-wochen", "Mindestferien pro Dienstjahr in Wochen", "numero", "numero",
         [tramo(4, fedlex("Art. 329a Abs. 1 OR", OR, "329_a"), desde="2026-01-01")]),
    dato("ferien-wochen-jugendliche", "Mindestferien bis zum vollendeten 20. Altersjahr in Wochen", "numero", "numero",
         [tramo(5, fedlex("Art. 329a Abs. 1 OR", OR, "329_a"), desde="2026-01-01")]),
    dato("ueberstunden-zuschlag", "Mindestzuschlag für Überstunden", "numero", "%",
         [tramo(25, fedlex("Art. 321c Abs. 3 OR", OR, "321_c"), desde="2026-01-01")]),
    dato("kuendigungsfristen", "Gesetzliche Kündigungsfristen", "mapa", "numero",
         [tramo({"probezeit-tage": 7, "dienstjahr-1": 1, "dienstjahr-2-9": 2, "ab-dienstjahr-10": 3}, fedlex("Art. 335b und 335c OR", OR, "335_c"), desde="2026-01-01")],
         etiquetas={"probezeit-tage": "Probezeit (Tage)", "dienstjahr-1": "1. Dienstjahr (Monate)", "dienstjahr-2-9": "2. bis 9. Dienstjahr (Monate)", "ab-dienstjahr-10": "ab dem 10. Dienstjahr (Monate)"}),
    dato("verzugszins", "Gesetzlicher Verzugszins", "numero", "%",
         [tramo(5, fedlex("Art. 104 Abs. 1 OR", OR, 104), desde="2026-01-01")]),
    dato("referenzzinssatz", "Hypothekarischer Referenzzinssatz für Mietverhältnisse", "numero", "%",
         [tramo(1.25, fuente("Bundesamt für Wohnungswesen", "Hypothekarischer Referenzzinssatz", "https://www.bwo.admin.ch/de/referenzzinssatz",
                             "Gilt seit 2. September 2025, am 1. September 2026 bestätigt. Nächste Publikation am 1. Dezember 2026."), desde="2025-09-02")],
         proximaRevision="2026-12-01"),
    dato("mietzins-hypothekarzins", "Mietzinsanpassung je Viertelprozent Hypothekarzins bei Sätzen unter 5 %", "numero", "%",
         [tramo(3, fedlex("Art. 13 Abs. 1 Bst. c VMWG", VMWG, 13), desde="2026-01-01")]),
    dato("mietzins-teuerungsanteil", "Anteil der Teuerung, der auf den Mietzins überwälzt werden darf", "numero", "%",
         [tramo(40, fedlex("Art. 16 VMWG", VMWG, 16), desde="2026-01-01")]),
]


def main():
    salida = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "ch" / "datos.json"
    salida.parent.mkdir(parents=True, exist_ok=True)
    with open(salida, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"mercado": "ch", "datos": DATOS}, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(len(DATOS), "datos en", salida)


if __name__ == "__main__":
    main()
