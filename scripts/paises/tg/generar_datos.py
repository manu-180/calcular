# Genera src/paises/tg/datos.json. Cada valor se leyó en la fuente indicada el día HOY.
# Uso: python scripts/paises/tg/generar_datos.py
import json
from pathlib import Path

HOY = "2026-10-27"

CGI = {
    "organismo": "Office Togolais des Recettes (OTR)",
    "titulo": "Code général des impôts et Livre des procédures fiscales, mis à jour 2025",
    "url": "https://otr.tg/index.php/fr/impots/reglementations-fiscales/code-general-des-impots/600-code-general-des-impots-livre-des-procedures-fiscales-mis-a-jour-2025/file.html",
    "tipo": "primaria",
    "verificadoEl": HOY,
    "nota": "Le Cahier fiscal 2026 de l'OTR (aperçu des modifications du CGI par la loi de finances 2026) ne modifie pas cet article.",
}

CT = {
    "organismo": "Journal officiel de la République togolaise",
    "titulo": "Loi n° 2021-012 du 18 juin 2021 portant Code du travail (JORT, 66e année, n° 26 ter)",
    "url": "https://jo.gouv.tg/sites/default/files/JO/JOS_18_06_2021%20-66E%20ANNEE%20N%C2%B0%2026%20TER.pdf",
    "tipo": "primaria",
    "verificadoEl": HOY,
}

CNSS_COT = {
    "organismo": "CNSS Togo",
    "titulo": "Employeurs : cotisations sociales (taux, assiette et recouvrement)",
    "url": "https://cnss.tg/employeurs/cotisations-sociales/",
    "tipo": "primaria",
    "verificadoEl": HOY,
}

CNSS_SMIG = {
    "organismo": "CNSS Togo",
    "titulo": "Présentation de la Caisse nationale de sécurité sociale du Togo (recouvrement des cotisations)",
    "url": "https://cnss.tg/cnss-media/2023/03/CAISSE-NATIONALE-DE-SECURITE-SOCIALE-DU-TOGO_DEFINITIF-1.pdf",
    "tipo": "primaria",
    "verificadoEl": HOY,
    "nota": "« Le plancher correspond au SMIG fixé à 52 500 FCFA à compter du 1er janvier 2023. »",
}

CNSS_AMU = {
    "organismo": "CNSS Togo",
    "titulo": "Conditions générales de l'assurance maladie universelle obligatoire (CGAMU)",
    "url": "https://cnss.tg/espace-assures/assurance-maladie-universelle/amu-conditions-generales-dacces-cgamu/",
    "tipo": "primaria",
    "verificadoEl": HOY,
    "nota": "Décret n° 2023-096/PR, articles 12 et 29. La CNSS gère l'AMU des salariés du privé depuis le 1er janvier 2024.",
}

CNSS_PF = {
    "organismo": "CNSS Togo",
    "titulo": "Prestations familiales : allocations prénatales et allocations familiales",
    "url": "https://cnss.tg/prestations/prestations-familiales-et-maternite/prestations-familiales/",
    "tipo": "primaria",
    "verificadoEl": HOY,
}

BCEAO_HIST = {
    "organismo": "BCEAO",
    "titulo": "Histoire du franc CFA (parité fixe avec l'euro depuis le 1er janvier 1999)",
    "url": "https://www.bceao.int/fr/content/histoire-du-franc-cfa",
    "tipo": "primaria",
    "verificadoEl": HOY,
}

BCEAO = {
    "organismo": "BCEAO",
    "titulo": "Page d'accueil de la BCEAO : cours des devises et taux directeurs",
    "url": "https://www.bceao.int/",
    "tipo": "primaria",
    "verificadoEl": HOY,
}


def fuente(base, nota=None):
    f = dict(base)
    if nota:
        f["nota"] = nota
    return f


def dato(id_, nombre, tipo, unidad, valor, desde, src, etiquetas=None, revision=None, nota=None):
    d = {"id": f"tg.{id_}", "nombre": nombre, "tipo": tipo, "unidad": unidad}
    if etiquetas:
        d["etiquetas"] = etiquetas
    if revision:
        d["proximaRevision"] = revision
    d["tramos"] = [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente(src, nota)}]
    return d


def escala(filas):
    out = []
    for i, (desde, tasa) in enumerate(filas):
        hasta = filas[i + 1][0] if i + 1 < len(filas) else None
        out.append({"desde": desde, "hasta": hasta, "tasa": tasa})
    return out


def forfait(filas, fin):
    out = []
    for i, (desde, monto) in enumerate(filas):
        # La loi écrit « de 2 500 001 à 5 000 000 » : la tranche suivante commence un centime après.
        hasta = filas[i + 1][0] if i + 1 < len(filas) else fin
        out.append({"desde": desde + 0.01 if i > 0 else 0, "hasta": hasta, "tasa": 0, "cuotaFija": monto})
    return out


F25 = "2025-01-01"
CT_DESDE = "2021-06-18"
REV = "2027-01-01"

datos = [
    dato("smig", "Salaire minimum interprofessionnel garanti (SMIG), mensuel", "numero", "XOF", 52500, "2023-01-01", CNSS_SMIG),
    dato("duree-legale-travail", "Durée légale du travail par semaine (hors agriculture)", "numero", "horas", 40, CT_DESDE, CT,
         nota="Article 180 du Code du travail."),
    dato("heures-sup-max-semaine", "Heures supplémentaires au plus par semaine", "numero", "horas", 20, CT_DESDE, CT,
         nota="Article 180 du Code du travail."),
    {
        "id": "tg.heures-sup-majorations",
        "nombre": "Majorations des heures supplémentaires",
        "tipo": "mapa",
        "unidad": "%",
        "etiquetas": {"jour": "Heures de jour en semaine", "nuit": "Heures de nuit"},
        "tramos": [{
            "estado": "no-verificado",
            "desde": "2011-01-01",
            "motivo": "L'article 180 du Code du travail renvoie les taux aux conventions collectives. Le texte de la convention collective interprofessionnelle n'a été trouvé sur aucun site officiel ; seuls des guides privés le citent, avec des chiffres qui se contredisent.",
        }],
    },
    dato("cnss-taux", "Taux des cotisations à la CNSS (travailleur salarié)", "mapa", "%",
         {"pension-salarie": 4, "pension-employeur": 12.5, "prestations-familiales": 3, "risques-professionnels": 2},
         "2023-01-01", CNSS_COT,
         etiquetas={"pension-salarie": "Pensions de vieillesse, part du travailleur", "pension-employeur": "Pensions de vieillesse, part de l'employeur",
                    "prestations-familiales": "Prestations familiales (employeur)", "risques-professionnels": "Risques professionnels (employeur)"},
         nota="Assiette : l'ensemble des rémunérations, sans plafond, avec le SMIG comme plancher. Taux déjà en vigueur au 1er janvier 2023 selon la présentation de la CNSS de mars 2023."),
    dato("amu-taux", "Cotisation à l'assurance maladie universelle (AMU) des salariés", "mapa", "%",
         {"salarie": 5, "employeur": 5}, "2024-01-01", CNSS_AMU,
         etiquetas={"salarie": "Part du travailleur", "employeur": "Part de l'employeur"}),
    dato("irpp-bareme", "Barème annuel de l'IRPP (revenus d'emplois, pensions, revenus fonciers)", "escala", "XOF",
         escala([(0, 0), (900000, 3), (3000000, 10), (6000000, 15), (9000000, 20), (12000000, 25), (15000000, 30), (20000000, 35)]),
         F25, CGI, revision=REV, nota="Article 74 du CGI (barème issu de la loi de finances 2023). " + CGI["nota"]),
    dato("irpp-abattement", "Déduction forfaitaire sur les revenus d'emplois", "numero", "%", 28, F25, CGI, revision=REV,
         nota="Article 26 du CGI. " + CGI["nota"]),
    dato("irpp-abattement-plafond", "Fraction du revenu annuel ouvrant droit à la déduction forfaitaire", "numero", "XOF", 10000000, F25, CGI,
         revision=REV, nota="Article 26 du CGI. " + CGI["nota"]),
    dato("irpp-retraite-plafond", "Limite de déduction des retenues pour la retraite", "numero", "%", 6, F25, CGI, revision=REV,
         nota="Article 26, point 1, du CGI. " + CGI["nota"]),
    dato("irpp-charge-famille", "Réduction du revenu imposable par personne à charge et par mois", "numero", "XOF", 10000, F25, CGI,
         revision=REV, nota="Article 73 du CGI. " + CGI["nota"]),
    dato("irpp-charges-max", "Nombre maximal de personnes à charge", "numero", "numero", 6, F25, CGI, revision=REV,
         nota="Article 72 du CGI. " + CGI["nota"]),
    dato("tva", "Taxe sur la valeur ajoutée (TVA), taux unique", "numero", "%", 18, F25, CGI, revision=REV,
         nota="Article 195 du CGI. " + CGI["nota"]),
    dato("is-taux", "Impôt sur les sociétés (IS), taux", "numero", "%", 27, F25, CGI, revision=REV,
         nota="Article 113 du CGI. " + CGI["nota"]),
    dato("mfp", "Minimum forfaitaire de perception (MFP)", "mapa", "%",
         {"taux": 1, "taux-vehicules-occasion": 2}, F25, CGI, revision=REV,
         etiquetas={"taux": "Taux général sur le chiffre d'affaires HT", "taux-vehicules-occasion": "Importation de véhicules d'occasion pour la revente"},
         nota="Article 120 du CGI. " + CGI["nota"]),
    dato("mfp-minimum", "Montant minimal du MFP au régime du réel", "numero", "XOF", 20000, F25, CGI, revision=REV,
         nota="Article 120 du CGI. " + CGI["nota"]),
    dato("tpu-taux", "Taxe professionnelle unique (TPU), régime déclaratif", "mapa", "%",
         {"production-commerce": 2, "services": 8}, F25, CGI, revision=REV,
         etiquetas={"production-commerce": "Production et commerce", "services": "Prestations de services"},
         nota="Article 134 du CGI. " + CGI["nota"]),
    dato("tpu-minimum", "Montant annuel minimal de la TPU au régime déclaratif", "numero", "XOF", 20000, F25, CGI, revision=REV,
         nota="Article 134 du CGI. " + CGI["nota"]),
    dato("tpu-seuils", "Seuils de chiffre d'affaires annuel de la TPU", "mapa", "XOF",
         {"forfaitaire": 30000000, "maximum": 60000000}, F25, CGI, revision=REV,
         etiquetas={"forfaitaire": "Plafond du régime forfaitaire", "maximum": "Plafond de la TPU"},
         nota="Articles 130 et 131 du CGI. " + CGI["nota"]),
    dato("tpu-forfait-commerce", "TPU forfaitaire des activités commerciales (montant annuel par tranche de chiffre d'affaires)", "escala", "XOF",
         forfait([(0, 10000), (2500000, 40000), (5000000, 115000), (10000000, 190000), (15000000, 265000), (20000000, 340000), (25000000, 415000)], 30000000),
         F25, CGI, revision=REV, nota="Article 135, point 5, du CGI. " + CGI["nota"]),
    dato("tpu-forfait-services", "TPU forfaitaire des prestations de services non artisanales (montant annuel par tranche de chiffre d'affaires)", "escala", "XOF",
         forfait([(0, 20000), (2500000, 187500), (5000000, 375000), (10000000, 625000), (15000000, 875000), (20000000, 1125000), (25000000, 1375000)], 30000000),
         F25, CGI, revision=REV, nota="Article 135, point 5, du CGI. " + CGI["nota"]),
    dato("plus-value-taux", "Taxe sur les plus-values immobilières et de cession de titres", "numero", "%", 7, F25, CGI, revision=REV,
         nota="Article 90 du CGI. " + CGI["nota"]),
    dato("plus-value-reduction", "Réduction de la plus-value immobilière après cinq ans de détention", "mapa", "%",
         {"non-bati": 10, "bati": 20}, F25, CGI, revision=REV,
         etiquetas={"non-bati": "Immeubles ou terrains non bâtis", "bati": "Autres immeubles"},
         nota="Article 85 du CGI. " + CGI["nota"]),
    dato("plus-value-duree", "Durée de détention ouvrant droit à la réduction", "numero", "anios", 5, F25, CGI, revision=REV,
         nota="Article 85 du CGI. " + CGI["nota"]),
    dato("plus-value-forfait-travaux", "Forfait de frais et travaux ajouté au prix d'acquisition", "numero", "%", 30, F25, CGI, revision=REV,
         nota="Article 87 du CGI. " + CGI["nota"]),
    dato("plus-value-seuil", "Prix de cession en dessous duquel la plus-value est exonérée", "numero", "XOF", 2000000, F25, CGI, revision=REV,
         nota="Article 84 du CGI. " + CGI["nota"]),
    dato("ircm-taux", "Retenue sur les revenus de capitaux mobiliers (personnes physiques)", "mapa", "%",
         {"distribues": 13, "cotees": 3, "interets": 13}, F25, CGI, revision=REV,
         etiquetas={"distribues": "Revenus distribués (dividendes)", "cotees": "Dividendes de sociétés cotées à la BRVM",
                    "interets": "Revenus de placements à revenu fixe"},
         nota="Articles 79 et 80 du CGI. " + CGI["nota"]),
    dato("retenue-prestations", "Retenue à la source sur les prestations des professions non commerciales", "mapa", "%",
         {"attestation": 3, "nif": 5, "autres": 20}, F25, CGI, revision=REV,
         etiquetas={"attestation": "Bénéficiaire avec attestation de régularité fiscale", "nif": "Bénéficiaire avec numéro d'identification fiscale",
                    "autres": "Autres bénéficiaires"},
         nota="Article 99 du Livre des procédures fiscales. " + CGI["nota"]),
    dato("foncier-abattement", "Déduction forfaitaire sur les revenus fonciers bruts", "numero", "%", 50, F25, CGI, revision=REV,
         nota="Article 16 du CGI. " + CGI["nota"]),
    dato("loyers-retenue", "Retenue à la source sur les loyers", "mapa", "%",
         {"total": 8.75, "taxe-fonciere": 3.75, "irpp": 5}, F25, CGI, revision=REV,
         etiquetas={"total": "Retenue sur les loyers bruts", "taxe-fonciere": "Part imputée sur la taxe foncière", "irpp": "Part imputée sur l'IRPP"},
         nota="Articles 100 et 101 du Livre des procédures fiscales. " + CGI["nota"]),
    dato("tvm-tarifs", "Taxe sur les véhicules à moteur (vignette), tarif annuel", "mapa", "XOF",
         {"p-moins-5": 5000, "p-5-7": 10000, "p-8-11": 15000, "p-12-15": 20000, "p-16-20": 30000, "p-plus-20": 40000,
          "m-moins-5": 20000, "m-5-7": 30000, "m-8-11": 40000, "m-12-15": 45000, "m-16-20": 50000, "m-plus-20": 55000,
          "moto-125": 15000, "moto-3-roues": 40000},
         F25, CGI, revision=REV,
         etiquetas={"p-moins-5": "Personnes, moins de 5 CV", "p-5-7": "Personnes, 5 à 7 CV", "p-8-11": "Personnes, 8 à 11 CV",
                    "p-12-15": "Personnes, 12 à 15 CV", "p-16-20": "Personnes, 16 à 20 CV", "p-plus-20": "Personnes, plus de 20 CV",
                    "m-moins-5": "Marchandises, moins de 5 CV", "m-5-7": "Marchandises, 5 à 7 CV", "m-8-11": "Marchandises, 8 à 11 CV",
                    "m-12-15": "Marchandises, 12 à 15 CV", "m-16-20": "Marchandises, 16 à 20 CV", "m-plus-20": "Marchandises, plus de 20 CV",
                    "moto-125": "Motocyclette de plus de 125 cm3", "moto-3-roues": "Motocyclette à trois roues"},
         nota="Article 162 du CGI. " + CGI["nota"]),
    dato("tvm-reduction-tpu", "Réduction de la vignette pour les transporteurs à la TPU", "numero", "%", 50, F25, CGI, revision=REV,
         nota="Article 162 du CGI. " + CGI["nota"]),
    dato("taxe-fonciere", "Taxes foncières", "mapa", "%",
         {"bati": 7.5, "abattement-bati": 50, "non-bati": 0.5}, F25, CGI, revision=REV,
         etiquetas={"bati": "Propriétés bâties, sur le revenu net cadastral", "abattement-bati": "Déduction sur la valeur locative cadastrale",
                    "non-bati": "Propriétés non bâties, sur la valeur vénale"},
         nota="Articles 270, 275 et 276 du CGI. " + CGI["nota"]),
    dato("licenciement-taux", "Indemnité de licenciement : pourcentage du salaire par année de présence", "escala", "anios",
         escala([(0, 35), (5, 40), (10, 45)]), CT_DESDE, CT, nota="Article 97 du Code du travail."),
    dato("licenciement-anciennete-min", "Ancienneté minimale pour l'indemnité de licenciement", "numero", "meses", 12, CT_DESDE, CT,
         nota="Article 97 du Code du travail."),
    dato("mesure-accompagnement", "Mesure d'accompagnement minimale du licenciement économique", "numero", "meses", 1, CT_DESDE, CT,
         nota="Article 95 du Code du travail."),
    dato("preavis-jours-horaire", "Préavis minimal des travailleurs payés à l'heure", "numero", "dias", 15, CT_DESDE, CT,
         nota="Article 74 du Code du travail."),
    dato("preavis-mois", "Préavis minimal des travailleurs payés au mois", "mapa", "meses",
         {"employes": 1, "cadres": 3}, CT_DESDE, CT,
         etiquetas={"employes": "Ouvriers, employés et assimilés", "cadres": "Agents de maîtrise, cadres et assimilés"},
         nota="Article 74 du Code du travail."),
    dato("conges-jours-par-mois", "Congé payé acquis par mois de service effectif", "numero", "dias", 2.5, CT_DESDE, CT,
         nota="Article 200 du Code du travail."),
    dato("conges-allocation-diviseur", "Diviseur de l'allocation de congé (un douzième)", "numero", "numero", 12, CT_DESDE, CT,
         nota="Article 202 du Code du travail."),
    dato("fin-de-contrat-duree", "Durée de CDD ouvrant droit à l'indemnité de fin de contrat", "numero", "anios", 4, CT_DESDE, CT,
         nota="Article 54 du Code du travail."),
    dato("fin-de-contrat-mois", "Indemnité de fin de contrat, en mois du dernier salaire brut", "numero", "meses", 1, CT_DESDE, CT,
         nota="Article 54 du Code du travail."),
    dato("allocations-familiales", "Allocations familiales de la CNSS", "mapa", "XOF",
         {"par-enfant": 2000, "prenatales": 18000}, "2023-01-01", CNSS_PF,
         etiquetas={"par-enfant": "Par enfant et par mois", "prenatales": "Allocations prénatales, total"},
         nota="Montants en vigueur à la date de lecture ; la page ne donne pas leur date d'entrée en vigueur."),
    dato("allocations-enfants-max", "Nombre maximal d'enfants de l'assuré ouvrant droit aux allocations", "numero", "numero", 4,
         "2023-01-01", CNSS_PF),
    dato("parite-euro", "Parité fixe du franc CFA (XOF) avec l'euro", "numero", "XOF", 655.957, "1999-01-01", BCEAO_HIST),
    dato("bceao-taux-directeurs", "Taux directeurs de la BCEAO", "mapa", "%",
         {"minimum-soumission": 3, "pret-marginal": 5}, "2026-03-16", BCEAO,
         etiquetas={"minimum-soumission": "Taux minimum de soumission aux appels d'offres", "pret-marginal": "Taux du guichet de prêt marginal"},
         revision="2026-12-31"),
]

out = Path(__file__).resolve().parents[3] / "src" / "paises" / "tg" / "datos.json"
with open(out, "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "tg", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(out, len(datos))
