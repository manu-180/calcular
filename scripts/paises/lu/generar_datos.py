"""Genera src/paises/lu/datos.json. Cada valor se leyó en la fuente primaria que figura en su tramo."""
import json
import pathlib

HOY = "2026-10-16"


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
    d = {"id": "lu." + id_, "nombre": nombre, "tipo": tipo, "unidad": unidad}
    d.update(extra)
    d["tramos"] = tramos
    return d


AED_TVA = fuente(
    "Administration de l'enregistrement, des domaines et de la TVA",
    "Loi modifiée du 12 février 1979 concernant la TVA, texte coordonné au 1er janvier 2025, art. 39",
    "https://pfi.public.lu/dam-assets/pdf/tva/loi-tva-2025-01-01.pdf",
)
CCSS = fuente("Centre commun de la sécurité sociale", "Paramètres sociaux", "https://ccss.public.lu/fr/parametres-sociaux.html")
CCSS_CHARGE = fuente("Centre commun de la sécurité sociale", "Charge des cotisations", "https://ccss.public.lu/fr/charge-cotisations.html")
GUICHET_PARAM = fuente("Guichet.lu", "Paramètres sociaux à partir du 1er juin 2026", "https://guichet.public.lu/fr/citoyens/outils/parametres-sociaux.html")
GUICHET_BA = fuente(
    "Guichet.lu",
    "Crédit d'impôt sur les actes notariés (Bëllegen Akt)",
    "https://guichet.public.lu/fr/citoyens/logement/aides/aides-indirectes-avantages-fiscaux/credit-impot-actes-notaries.html",
)
CODE_TRAVAIL = "https://legilux.public.lu/eli/etat/leg/code/travail/20260310"


def ct(art):
    return fuente("Service central de législation (legilux.public.lu)", f"Code du travail, art. {art} (version consolidée au 10 mars 2026)", CODE_TRAVAIL)


ACD_BAREME = fuente(
    "Administration des contributions directes",
    "Formules du calcul automatisé de l'impôt, barème 2025 (règlement grand-ducal du 20 décembre 2024)",
    "https://impotsdirects.public.lu/dam-assets/fr/baremes/bareme-2025-format-excel.xlsx",
    "Barème le plus récent publié par l'ACD au 16 octobre 2026 (impotsdirects.public.lu/fr/baremes.html).",
)
ACD_CIS = fuente(
    "Administration des contributions directes",
    "CIS et CI-CO2 salarié à partir de l'année d'imposition 2026",
    "https://impotsdirects.public.lu/fr/az/c/credit-impot-salaries/cis2026.html",
)
STATEC_EMS = fuente(
    "STATEC",
    "Échéances de l'échelle mobile des salaires (LUSTAT, DF_E5201)",
    "https://lustat.statec.lu/rest/data/LU1,DSD_PRIX_EMS@DF_E5201,1.0/all",
)


def escala(filas):
    """filas: (lim. inf., lim. sup. o None, taux en décimal, déduction). Impôt = taux x R - déduction."""
    out = []
    for desde, hasta, taux, ded in filas:
        tasa = round(taux * 100, 4)
        out.append({"desde": desde, "hasta": hasta, "tasa": tasa, "cuotaFija": round(taux * desde - ded, 4)})
    return out


def continua(filas):
    """Los límites de la ACD van de 50 en 50 (o de 5 en 5); la escala del motor exige continuidad."""
    out = []
    for i, (desde, hasta, taux, ded) in enumerate(filas):
        siguiente = filas[i + 1][0] if i + 1 < len(filas) else None
        out.append((desde, siguiente, taux, ded))
    return out


RETENUE_1 = continua([
    (0, 1185, 0, 0), (1190, 1370, 0.08, 95), (1375, 1555, 0.09, 108.7125), (1560, 1735, 0.10, 124.2625), (1740, 1920, 0.11, 141.65),
    (1925, 2105, 0.12, 160.875), (2110, 2295, 0.14, 203), (2300, 2485, 0.16, 248.95), (2490, 2680, 0.18, 298.725), (2685, 2870, 0.20, 352.325),
    (2875, 3060, 0.22, 409.75), (3065, 3250, 0.24, 471), (3255, 3445, 0.26, 536.075), (3450, 3635, 0.28, 604.975), (3640, 3825, 0.30, 677.7),
    (3830, 4015, 0.32, 754.25), (4020, 4210, 0.34, 834.625), (4215, 4400, 0.36, 918.825), (4405, 4590, 0.38, 1006.85), (4595, 9870, 0.39, 1052.775),
    (9875, 14765, 0.40, 1151.5), (14770, 19655, 0.41, 1299.15), (19660, None, 0.42, 1495.725),
])
RETENUE_1A = continua([
    (0, 2290, 0, 0), (2295, 2435, 0.10, 229), (2440, 2580, 0.1125, 259.4625), (2585, 2730, 0.125, 291.7625), (2735, 2875, 0.1375, 325.9),
    (2880, 3025, 0.15, 361.875), (3030, 3175, 0.175, 437.5), (3180, 3330, 0.20, 516.95), (3335, 3480, 0.225, 600.225), (3485, 3635, 0.25, 687.325),
    (3640, 3790, 0.275, 778.25), (3795, 3940, 0.30, 873), (3945, 4095, 0.325, 971.575), (4100, 4245, 0.35, 1073.975), (4250, 4400, 0.375, 1180.2),
    (4405, 9870, 0.39, 1246.23), (9875, 14765, 0.40, 1344.955), (14770, 19655, 0.41, 1492.605), (19660, None, 0.42, 1689.18),
])
RETENUE_2 = continua([
    (0, 2290, 0, 0), (2295, 2655, 0.08, 183.2), (2660, 3025, 0.09, 209.775), (3030, 3390, 0.10, 240.025), (3395, 3760, 0.11, 273.95),
    (3765, 4125, 0.12, 311.55), (4130, 4510, 0.14, 394.1), (4515, 4890, 0.16, 484.3), (4895, 5275, 0.18, 582.15), (5280, 5655, 0.20, 687.65),
    (5660, 6040, 0.22, 800.8), (6045, 6420, 0.24, 921.6), (6425, 6805, 0.26, 1050.05), (6810, 7185, 0.28, 1186.15), (7190, 7570, 0.30, 1329.9),
    (7575, 7950, 0.32, 1481.3), (7955, 8335, 0.34, 1640.35), (8340, 8715, 0.36, 1807.05), (8720, 9100, 0.38, 1981.4), (9105, 19660, 0.39, 2072.4),
    (19665, 29445, 0.40, 2269), (29450, 39230, 0.41, 2563.45), (39235, None, 0.42, 2955.75),
])
IMPOT_1 = continua([
    (0, 13200, 0, 0), (13250, 15400, 0.08, 1058.4), (15450, 17600, 0.09, 1212.75), (17650, 19800, 0.10, 1389.15), (19850, 22050, 0.11, 1587.6),
    (22100, 24250, 0.12, 1808.1), (24300, 26550, 0.14, 2293.2), (26600, 28800, 0.16, 2824.2), (28850, 31100, 0.18, 3401.1), (31150, 33400, 0.20, 4023.9),
    (33450, 35700, 0.22, 4692.6), (35750, 38000, 0.24, 5407.2), (38050, 40300, 0.26, 6167.7), (40350, 42600, 0.28, 6974.1), (42650, 44900, 0.30, 7826.4),
    (44950, 47200, 0.32, 8724.6), (47250, 49500, 0.34, 9668.7), (49550, 51750, 0.36, 10658.7), (51800, 54050, 0.38, 11694.6), (54100, 117450, 0.39, 12235.5),
    (117500, 176150, 0.40, 13410), (176200, 234850, 0.41, 15171.6), (234900, None, 0.42, 17520.3),
])
IMPOT_1A = continua([
    (0, 26450, 0, 0), (26500, 28200, 0.10, 2646), (28250, 29950, 0.1125, 2998.8), (30000, 31750, 0.125, 3373.65), (31800, 33500, 0.1375, 3770.55),
    (33550, 35250, 0.15, 4189.5), (35300, 37100, 0.175, 5071.5), (37150, 38950, 0.20, 5999.4), (39000, 40750, 0.225, 6973.2), (40800, 42600, 0.25, 7992.9),
    (42650, 44450, 0.275, 9058.5), (44500, 46250, 0.30, 10170), (46300, 48100, 0.325, 11327.4), (48150, 49950, 0.35, 12530.7), (50000, 51800, 0.375, 13779.9),
    (51850, 117450, 0.39, 14556.96), (117500, 176150, 0.40, 15731.46), (176200, 234850, 0.41, 17493.06), (234900, None, 0.42, 19841.76),
])
IMPOT_2 = continua([
    (0, 26450, 0, 0), (26500, 30850, 0.08, 2116.8), (30900, 35250, 0.09, 2425.5), (35300, 39650, 0.10, 2778.3), (39700, 44100, 0.11, 3175.2),
    (44150, 48500, 0.12, 3616.2), (48550, 53100, 0.14, 4586.4), (53150, 57650, 0.16, 5648.4), (57700, 62250, 0.18, 6802.2), (62300, 66850, 0.20, 8047.8),
    (66900, 71450, 0.22, 9385.2), (71500, 76050, 0.24, 10814.4), (76100, 80600, 0.26, 12335.4), (80650, 85200, 0.28, 13948.2), (85250, 89800, 0.30, 15652.8),
    (89850, 94400, 0.32, 17449.2), (94450, 99000, 0.34, 19337.4), (99050, 103550, 0.36, 21317.4), (103600, 108150, 0.38, 23389.2), (108200, 234900, 0.39, 24471),
    (234950, 352300, 0.40, 26820), (352350, 469700, 0.41, 30343.2), (469750, None, 0.42, 35040.6),
])

D = "2025-01-01"
DATOS = [
    dato("tva-normal", "TVA, taux normal", "numero", "%", [tramo(17, AED_TVA, desde="2024-01-01")]),
    dato("tva-intermediaire", "TVA, taux intermédiaire", "numero", "%", [tramo(14, AED_TVA, desde="2024-01-01")]),
    dato("tva-reduit", "TVA, taux réduit", "numero", "%", [tramo(8, AED_TVA, desde="2024-01-01")]),
    dato("tva-super-reduit", "TVA, taux super-réduit", "numero", "%", [tramo(3, AED_TVA, desde="2024-01-01")]),
    dato("ssm-non-qualifie", "Salaire social minimum mensuel, salarié non qualifié de 18 ans et plus", "numero", "EUR",
         [tramo(2703.74, CCSS, hasta="2026-05-31"), tramo(2771.33, GUICHET_PARAM, desde="2026-06-01")], proximaRevision="2027-01-01"),
    dato("ssm-qualifie", "Salaire social minimum mensuel, salarié qualifié", "numero", "EUR", [tramo(3325.59, GUICHET_PARAM, desde="2026-06-01")], proximaRevision="2027-01-01"),
    dato("ssm-jeunes", "Salaire social minimum des adolescents, en pour-cent du salaire non qualifié", "mapa", "%",
         [tramo({"17-18": 80, "15-17": 75}, GUICHET_PARAM, desde="2026-06-01")], etiquetas={"17-18": "17 à 18 ans", "15-17": "15 à 17 ans"}),
    dato("heures-par-mois", "Nombre forfaitaire d'heures par mois", "numero", "horas", [tramo(173, ct("L. 211-27"))]),
    dato("cotisation-maladie-soins", "Assurance maladie, soins de santé (total)", "numero", "%", [tramo(5.6, CCSS)]),
    dato("cotisation-maladie-especes", "Assurance maladie, prestations en espèces (total)", "numero", "%", [tramo(0.5, CCSS)]),
    dato("cotisation-pension", "Assurance pension (total)", "numero", "%", [tramo(17, CCSS)], nota="La charge est répartie par parts égales entre l'assuré et l'employeur (CCSS, Charge des cotisations)."),
    dato("cotisation-dependance", "Assurance dépendance (à charge de l'assuré)", "numero", "%", [tramo(1.4, CCSS)]),
    dato("cotisation-accident", "Assurance accident, taux unique (à charge de l'employeur)", "numero", "%", [tramo(0.65, CCSS)]),
    dato("cotisation-sante-travail", "Santé au travail (à charge de l'employeur)", "numero", "%", [tramo(0.14, CCSS)]),
    dato("cotisation-mutualite", "Mutualité des employeurs, par classe", "mapa", "%", [tramo({"classe-1": 0.23, "classe-2": 0.95, "classe-3": 1.56, "classe-4": 2.66}, CCSS)],
         etiquetas={"classe-1": "Classe 1", "classe-2": "Classe 2", "classe-3": "Classe 3", "classe-4": "Classe 4"}),
    dato("plafond-cotisable", "Maximum cotisable mensuel (cinq fois le salaire social minimum)", "numero", "EUR",
         [tramo(13518.68, CCSS, hasta="2026-05-31"), tramo(13856.63, CCSS, desde="2026-06-01")], proximaRevision="2027-01-01"),
    dato("abattement-dependance", "Abattement sur l'assiette de la contribution dépendance (un quart du salaire social minimum)", "numero", "EUR",
         [tramo(692.83, GUICHET_PARAM, desde="2026-06-01")], proximaRevision="2027-01-01"),
    dato("retenue-classe-1", "Retenue mensuelle sur salaires, classe 1 (taux x R - déduction)", "escala", "EUR", [tramo(escala(RETENUE_1), ACD_BAREME, desde=D)], proximaRevision="2027-01-01"),
    dato("retenue-classe-1a", "Retenue mensuelle sur salaires, classe 1a", "escala", "EUR", [tramo(escala(RETENUE_1A), ACD_BAREME, desde=D)], proximaRevision="2027-01-01"),
    dato("retenue-classe-2", "Retenue mensuelle sur salaires, classe 2", "escala", "EUR", [tramo(escala(RETENUE_2), ACD_BAREME, desde=D)], proximaRevision="2027-01-01"),
    dato("fonds-emploi-retenue", "Majoration pour le fonds pour l'emploi sur la retenue mensuelle (seuil et déduction par classe)", "mapa", "EUR",
         [tramo({"seuil-1": 12585, "deduction-1": 77.65, "seuil-1a": 12585, "deduction-1a": 73.78, "seuil-2": 25085, "deduction-2": 155.3}, ACD_BAREME, desde=D)],
         proximaRevision="2027-01-01", nota="Jusqu'au seuil, l'impôt est majoré de 7 %. Au-delà, de (impôt x 0,09 - déduction)."),
    dato("impot-classe-1", "Impôt sur le revenu, classe 1 (taux x R - déduction)", "escala", "EUR", [tramo(escala(IMPOT_1), ACD_BAREME, desde=D)], proximaRevision="2027-01-01"),
    dato("impot-classe-1a", "Impôt sur le revenu, classe 1a", "escala", "EUR", [tramo(escala(IMPOT_1A), ACD_BAREME, desde=D)], proximaRevision="2027-01-01"),
    dato("impot-classe-2", "Impôt sur le revenu, classe 2", "escala", "EUR", [tramo(escala(IMPOT_2), ACD_BAREME, desde=D)], proximaRevision="2027-01-01"),
    dato("fonds-emploi-impot", "Majoration pour le fonds pour l'emploi sur l'impôt annuel (seuil et déduction par classe)", "mapa", "EUR",
         [tramo({"seuil-1": 150000, "deduction-1": 931.8, "seuil-1a": 150000, "deduction-1a": 885.36, "seuil-2": 300000, "deduction-2": 1863.6}, ACD_BAREME, desde=D)],
         proximaRevision="2027-01-01"),
    dato("cis", "Crédit d'impôt pour salariés (CIS) et CI-CO2 salarié, paramètres annuels", "mapa", "EUR",
         [tramo({"min": 936, "palier-1": 11265, "base": 300, "pente-1": 0.029, "plateau": 600, "palier-2": 40000, "pente-2": 0.015, "max": 80000, "co2": 216, "pente-co2": 0.0054},
                ACD_CIS, desde="2026-01-01")], proximaRevision="2027-01-01"),
    dato("preavis-employeur", "Délai de préavis en cas de licenciement par l'employeur, en mois", "mapa", "meses",
         [tramo({"moins-5": 2, "5-10": 4, "10-plus": 6}, ct("L. 124-3"))], etiquetas={"moins-5": "moins de 5 ans", "5-10": "5 à moins de 10 ans", "10-plus": "10 ans et plus"}),
    dato("indemnite-depart", "Indemnité de départ minimale, en mois de salaire, par ancienneté", "mapa", "meses",
         [tramo({"5": 1, "10": 2, "15": 3, "20": 6, "25": 9, "30": 12}, ct("L. 124-7"))]),
    dato("conges-jours", "Congé annuel minimal en jours ouvrables", "numero", "dias", [tramo(26, ct("L. 233-4"))]),
    dato("majoration-heures-sup", "Majoration du salaire pour heure supplémentaire non récupérée", "numero", "%", [tramo(40, ct("L. 211-27"))]),
    dato("allocation-familiale", "Allocation familiale par enfant et par mois", "numero", "EUR", [tramo(315.04, GUICHET_PARAM, desde="2026-06-01")], proximaRevision="2027-01-01"),
    dato("majoration-age", "Majorations d'âge de l'allocation familiale, par mois", "mapa", "EUR",
         [tramo({"6-11": 23.81, "12-plus": 59.44}, GUICHET_PARAM, desde="2026-06-01")], etiquetas={"6-11": "6 à 11 ans", "12-plus": "12 ans et plus"}),
    dato("allocation-rentree", "Allocation de rentrée scolaire par enfant", "mapa", "EUR",
         [tramo({"6-11": 115, "12-plus": 235}, GUICHET_PARAM, desde="2026-06-01")], etiquetas={"6-11": "6 à 11 ans", "12-plus": "12 ans et plus"}),
    dato("allocation-naissance", "Allocation de naissance, montant par tranche (3 tranches)", "numero", "EUR", [tramo(580.03, GUICHET_PARAM, desde="2026-06-01")]),
    dato("droits-enregistrement", "Droits d'enregistrement sur l'achat d'un immeuble", "numero", "%", [tramo(6, GUICHET_BA, desde="2025-07-01")]),
    dato("droits-transcription", "Droits de transcription sur l'achat d'un immeuble", "numero", "%", [tramo(1, GUICHET_BA, desde="2025-07-01")]),
    dato("bellegen-akt", "Crédit d'impôt sur les actes notariés (Bëllegen Akt), par acquéreur", "numero", "EUR", [tramo(40000, GUICHET_BA, desde="2025-07-01")]),
    dato("droits-minimum", "Montant minimal perçu à titre de droits d'enregistrement et de transcription", "numero", "EUR", [tramo(100, GUICHET_BA, desde="2025-07-01")]),
    dato("cote-echeance", "Cote d'échéance de l'échelle mobile des salaires (IPCN, base 1948)", "numero", "numero",
         [tramo(1013.46, STATEC_EMS, desde="2025-05-01", hasta="2026-05-31"), tramo(1038.79, STATEC_EMS, desde="2026-06-01")]),
    dato("nombre-indice", "Nombre indice applicable aux salaires", "numero", "numero",
         [tramo(968.04, CCSS, desde="2025-05-01", hasta="2026-05-31"), tramo(992.24, CCSS, desde="2026-06-01")]),
]


def main():
    salida = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "lu" / "datos.json"
    salida.parent.mkdir(parents=True, exist_ok=True)
    with open(salida, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"mercado": "lu", "datos": DATOS}, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(len(DATOS), "datos en", salida)


if __name__ == "__main__":
    main()
