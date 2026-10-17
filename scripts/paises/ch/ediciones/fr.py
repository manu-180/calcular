"""Textos de las calculadoras de ch en francés de Suisse romande (ch-fr). Términos de fedlex en francés."""

EDICION = "ch-fr"
IMPORTS_COMUNES = {"COMUN"}

ALTER = "Âge (année civile moins année de naissance)"
NBU = {"e": "Prime d'assurance accidents non professionnels (ANP)", "a": "Elle figure sur votre fiche de salaire. Elle dépend de l'assureur et de la branche."}

TEXTOS = {
    "brutto-netto-rechner": {
        "slug": "calcul-salaire-net",
        "importa": ["ANZAHL"],
        "campos": {
            "monatslohn": "Salaire brut mensuel",
            "anzahl": {"e": "Nombre de salaires mensuels par an", "o": "ANZAHL"},
            "alter": ALTER,
            "nbu": NBU,
            "ktg": "Cotisation perte de gain maladie (si déduite)",
            "bvgMonat": {"e": "Déduction LPP mensuelle selon la fiche de salaire", "a": "Laissez vide : le calculateur estime la cotisation minimale légale."},
        },
        "filas": {
            "netto": "Salaire net mensuel",
            "ahv": "AVS/AI/APG",
            "alv": "Assurance-chômage (AC)",
            "bvg": "Caisse de pension (LPP)",
            "nbu": "Accidents non professionnels (ANP)",
            "ktg": "Perte de gain maladie",
            "total": "Total des déductions par mois",
            "jahreslohn": "Salaire brut annuel",
            "nettoJahr": "Salaire net annuel",
            "koordinierterLohn": "Salaire coordonné (LPP)",
        },
    },
    "netto-brutto-rechner": {
        "slug": "salaire-net-en-brut",
        "importa": ["ANZAHL"],
        "campos": {
            "netto": "Salaire net mensuel souhaité",
            "anzahl": {"e": "Nombre de salaires mensuels par an", "o": "ANZAHL"},
            "alter": ALTER,
            "nbu": "Prime d'assurance accidents non professionnels (ANP)",
            "ktg": "Cotisation perte de gain maladie (si déduite)",
        },
        "filas": {
            "brutto": "Salaire brut mensuel nécessaire",
            "netto": "Salaire net avec ce brut",
            "abzuege": "Déductions par mois",
            "jahreslohn": "Salaire brut annuel",
        },
    },
    "lohnkosten-rechner": {
        "slug": "cout-employeur",
        "importa": ["ANZAHL"],
        "campos": {
            "monatslohn": "Salaire brut mensuel",
            "anzahl": {"e": "Nombre de salaires mensuels par an", "o": "ANZAHL"},
            "alter": "Âge de la personne employée",
            "fak": {"e": "Taux de la caisse d'allocations familiales (CAF)", "a": "Le taux dépend du canton et de la caisse."},
            "bu": {"e": "Prime d'assurance accidents professionnels (AP)", "a": "Selon la police de votre assureur-accidents."},
            "ktg": "Part de l'employeur à la perte de gain maladie",
            "bvgMonat": {"e": "Cotisation LPP de l'employeur par mois", "a": "Laissez vide : le calculateur retient la moitié de la bonification de vieillesse légale."},
        },
        "filas": {
            "kostenMonat": "Coût salarial par mois",
            "ahv": "AVS/AI/APG part employeur",
            "alv": "AC part employeur",
            "bvg": "Caisse de pension part employeur",
            "fak": "Caisse d'allocations familiales",
            "bu": "Accidents professionnels",
            "ktg": "Perte de gain maladie",
            "beitraege": "Cotisations patronales par mois",
            "zuschlag": "Supplément sur le salaire brut",
            "kostenJahr": "Coût salarial par an",
        },
    },
    "bundessteuer-rechner": {
        "slug": "impot-federal-direct",
        "importa": ["ZIVILSTAND"],
        "campos": {
            "einkommen": {"e": "Revenu imposable (impôt fédéral direct)", "a": "Revenu après toutes les déductions, tel qu'il figure dans la taxation de l'impôt fédéral direct."},
            "zivilstand": {"e": "État civil", "o": "ZIVILSTAND"},
            "kinder": "Enfants dans le même ménage dont vous assumez l'essentiel de l'entretien",
        },
        "filas": {
            "steuer": "Impôt fédéral direct par an",
            "tarifsteuer": "Impôt selon le barème",
            "ermaessigung": "Réduction pour enfants",
            "durchschnitt": "Taux d'imposition moyen",
            "grenzsatz": "Taux marginal (sur les 100 francs suivants)",
            "tarif": "Barème appliqué",
        },
    },
    "mwst-rechner": {
        "slug": "calcul-tva",
        "campos": {
            "betrag": "Montant en francs",
            "richtung": {"e": "Que voulez-vous calculer ?", "o": {"zuschlagen": "Ajouter la TVA (montant hors TVA)", "herausrechnen": "Extraire la TVA (montant TVA comprise)"}},
            "satz": {
                "e": "Taux",
                "o": {
                    "normal": "Taux normal",
                    "reduziert": "Taux réduit (par exemple denrées alimentaires, médicaments, livres)",
                    "beherbergung": "Taux spécial pour l'hébergement (nuitée avec petit-déjeuner)",
                },
            },
        },
        "filas": {"mwst": "TVA", "netto": "Montant hors TVA", "brutto": "Montant TVA comprise", "satz": "Taux"},
    },
    "saeule-3a-rechner": {
        "slug": "pilier-3a",
        "importa": ["ZIVILSTAND"],
        "campos": {
            "mitPk": "Je suis assuré dans une caisse de pension",
            "erwerbseinkommen": "Revenu annuel de l'activité lucrative (seulement sans caisse de pension)",
            "beitrag": {"e": "Versement prévu dans le pilier 3a", "a": "Laissez vide : le calculateur retient le maximum."},
            "steuerbar": "Revenu imposable avant le versement (impôt fédéral direct)",
            "zivilstand": {"e": "État civil", "o": "ZIVILSTAND"},
            "kinder": "Enfants dans le même ménage",
        },
        "filas": {
            "maximum": "Versement maximal cette année",
            "abziehbar": "Versement déductible",
            "ersparnis": "Économie d'impôt fédéral direct",
            "vorher": "Impôt fédéral sans versement",
            "nachher": "Impôt fédéral avec versement",
        },
    },
    "bvg-rechner": {
        "slug": "calcul-lpp",
        "campos": {
            "jahreslohn": "Salaire annuel AVS",
            "alter": "Âge cette année (année civile moins année de naissance)",
            "guthaben": {"e": "Avoir de vieillesse LPP actuel", "a": "Il figure sur votre certificat de prévoyance (part obligatoire)."},
            "zins": {"e": "Intérêt par an", "a": "Laissez vide : le taux d'intérêt minimal LPP s'applique."},
        },
        "filas": {
            "kapital": "Avoir de vieillesse à 65 ans",
            "renteMonat": "Rente de vieillesse LPP par mois",
            "renteJahr": "Rente de vieillesse LPP par an",
            "koordinierterLohn": "Salaire coordonné",
            "gutschriftHeute": "Bonification de vieillesse cette année",
            "summeGutschriften": "Total des bonifications futures",
            "zins": "Intérêt retenu",
        },
        "tablas": {"plan": "Avoir de vieillesse année par année"},
    },
    "ahv-rentenrechner": {
        "slug": "rente-avs",
        "campos": {
            "einkommen": {
                "e": "Revenu annuel moyen déterminant",
                "a": "Moyenne des revenus revalorisés, plus les bonifications pour tâches éducatives et d'assistance. Votre caisse de compensation l'indique dans un calcul anticipé de la rente.",
            },
            "verheiratet": "Marié, les deux conjoints touchent une rente de vieillesse",
            "einkommenPartner": "Revenu annuel déterminant du conjoint",
        },
        "filas": {
            "rente": "Rente de vieillesse AVS par mois",
            "ungekuerzt": "Rente avant plafonnement",
            "partner": "Rente du conjoint par mois",
            "summe": "Rentes du couple ensemble",
            "dreizehnte": "13e rente de vieillesse en décembre",
            "jahr": "Rente de vieillesse par an",
            "tabellenwert": "Revenu déterminant (arrondi à la valeur de la table)",
        },
    },
    "ahv-beitraege-selbststaendige": {
        "slug": "cotisations-avs-independants",
        "campos": {"einkommen": "Revenu annuel de l'activité indépendante"},
        "filas": {"beitrag": "Cotisation AVS/AI/APG par an", "satz": "Taux de cotisation", "monat": "Par mois"},
    },
    "kapitalbezug-steuer-rechner": {
        "slug": "impot-retrait-capital",
        "importa": ["ZIVILSTAND"],
        "campos": {
            "kapital": "Retrait en capital de la caisse de pension ou du pilier 3a",
            "zivilstand": {"e": "État civil", "o": "ZIVILSTAND"},
            "mitKindern": "Avec des enfants dans le même ménage",
        },
        "filas": {
            "steuer": "Impôt fédéral direct sur le retrait",
            "satz": "Part du capital",
            "vollerTarif": "Impôt selon le barème complet (avant division par cinq)",
            "netto": "Capital après impôt fédéral",
        },
    },
    "arbeitslosengeld-rechner": {
        "slug": "indemnite-chomage",
        "campos": {
            "verdienst": {"e": "Salaire mensuel moyen des 6 ou 12 derniers mois", "a": "La plus élevée des deux moyennes est déterminante."},
            "unterhalt": "Obligation d'entretien envers des enfants de moins de 25 ans",
            "ivRente": "Rente AI correspondant à un taux d'invalidité d'au moins 40 %",
            "alter": "Âge",
            "beitragsmonate": "Mois de cotisation au cours des deux dernières années",
        },
        "filas": {
            "taggeld": "Indemnité journalière brute",
            "satz": "Part du gain assuré",
            "monat": "Par mois brut (21,7 indemnités)",
            "versichert": "Gain assuré par mois",
            "anzahl": "Nombre maximal d'indemnités journalières",
            "gesamt": "Total si toutes les indemnités sont touchées",
        },
    },
    "13-monatslohn-rechner": {
        "slug": "13e-salaire",
        "campos": {"monatslohn": "Salaire brut mensuel", "monate": {"e": "Mois travaillés dans l'année civile", "a": "Saisissez un demi-mois comme 0,5."}},
        "filas": {
            "anteil": "13e salaire (au prorata)",
            "proMonat": "Part par mois travaillé",
            "jahreslohn": "Salaire brut de ces mois, 13e salaire compris",
        },
    },
    "ferienrechner": {
        "slug": "calcul-vacances",
        "campos": {
            "alter": "Âge",
            "tageProWoche": "Jours de travail par semaine",
            "monate": {"e": "Mois dans l'année de service", "a": "Pour une année de service incomplète, par exemple en cas d'entrée ou de départ."},
            "vertragWochen": "Semaines de vacances selon le contrat (si plus que la loi)",
        },
        "filas": {
            "tage": "Jours de vacances pour cette période",
            "wochen": "Semaines de vacances par année de service",
            "tageJahr": "Jours de vacances pour une année de service complète",
            "zuschlag": "Supplément vacances théorique pour un salaire horaire",
        },
    },
    "ueberstunden-rechner": {
        "slug": "heures-supplementaires",
        "campos": {
            "lohnart": {"e": "Type de salaire", "o": {"monat": "Salaire mensuel", "stunde": "Salaire horaire"}},
            "lohn": "Salaire brut (par mois ou par heure)",
            "wochenstunden": "Durée de travail contractuelle par semaine (heures)",
            "stunden": "Nombre d'heures supplémentaires",
            "zuschlag": {"e": "Supplément selon le contrat", "a": "Laissez vide : le supplément légal s'applique."},
        },
        "filas": {
            "total": "Rémunération des heures supplémentaires",
            "grund": "Salaire normal pour ces heures",
            "zuschlag": "Supplément",
            "satz": "Taux du supplément",
            "stundenlohn": "Salaire horaire",
        },
    },
    "kuendigungsfrist-rechner": {
        "slug": "delai-de-conge",
        "campos": {
            "beginn": "Début des rapports de travail",
            "zugang": "Jour où le congé parvient au destinataire",
            "probezeit": {"e": "Temps d'essai en mois", "a": "Sans accord, le premier mois est le temps d'essai. Trois mois au plus sont possibles."},
            "vertragFrist": "Délai de congé selon le contrat en mois (s'il diffère)",
        },
        "filas": {
            "ende": "Dernier jour de travail (fin des rapports de travail)",
            "frist": "Délai de congé",
            "dienstjahr": "Année de service à la réception du congé",
        },
    },
    "kinderzulagen-rechner": {
        "slug": "allocations-familiales",
        "campos": {
            "kinder": "Enfants jusqu'à 16 ans",
            "inAusbildung": "Enfants en formation (de 15 à 25 ans)",
            "kantonKinder": {"e": "Allocation pour enfant dans votre canton (si plus élevée)", "a": "Laissez vide : le minimum légal s'applique."},
            "kantonAusbildung": "Allocation de formation professionnelle dans votre canton (si plus élevée)",
        },
        "filas": {
            "monat": "Allocations familiales par mois",
            "jahr": "Par an",
            "kinderzulage": "Allocation pour enfant par enfant",
            "ausbildungszulage": "Allocation de formation par enfant",
        },
    },
    "mutterschaftsentschaedigung-rechner": {
        "slug": "allocation-maternite",
        "importa": ["ERWERBSART"],
        "campos": {
            "art": {"e": "Statut professionnel", "o": "ERWERBSART"},
            "einkommen": "Revenu avant la naissance (salaire mensuel ou revenu annuel)",
        },
        "filas": {
            "taggeld": "Indemnité journalière",
            "total": "Allocation de maternité totale",
            "tage": "Nombre d'indemnités journalières",
            "tagesverdienst": "Revenu moyen par jour",
            "ungekuerzt": "Indemnité avant réduction",
        },
    },
    "vaterschaftsentschaedigung-rechner": {
        "slug": "conge-paternite",
        "importa": ["ERWERBSART"],
        "campos": {
            "art": {"e": "Statut professionnel", "o": "ERWERBSART"},
            "einkommen": "Revenu avant la naissance (salaire mensuel ou revenu annuel)",
        },
        "filas": {
            "taggeld": "Indemnité journalière",
            "total": "Allocation totale",
            "tage": "Nombre d'indemnités journalières",
            "tagesverdienst": "Revenu moyen par jour",
            "ungekuerzt": "Indemnité avant réduction",
        },
    },
    "teuerungsrechner": {
        "slug": "calcul-rencherissement",
        "campos": {
            "betrag": "Montant en francs",
            "von": {"e": "Mois du montant d'origine", "a": "C'est l'indice de ce mois qui compte, le jour ne joue aucun rôle."},
            "bis": "Mois vers lequel convertir",
        },
        "filas": {
            "angepasst": "Montant au même pouvoir d'achat",
            "differenz": "Différence due au renchérissement",
            "gesamt": "Renchérissement sur la période",
            "vorjahr": "Renchérissement annuel du mois de fin",
            "monatAnfang": "Mois de départ",
            "indexAnfang": "IPC du mois de départ (décembre 2025 = 100)",
            "monatEnde": "Mois de fin",
            "indexEnde": "IPC du mois de fin",
        },
    },
    "mietzinsrechner": {
        "slug": "calcul-loyer-taux-reference",
        "campos": {
            "miete": "Loyer net actuel par mois",
            "refAlt": {"e": "Taux de référence lors de la dernière adaptation du loyer", "a": "Il figure dans le bail ou dans la dernière adaptation du loyer."},
            "monatAlt": "Indice des prix à la consommation lors de la dernière adaptation (mois)",
            "kosten": "Hausse générale des coûts (si invoquée)",
        },
        "filas": {
            "neu": "Loyer net adapté par mois",
            "differenz": "Variation par mois",
            "total": "Variation totale",
            "hypothek": "Part du taux de référence",
            "teuerung": "Part du renchérissement",
            "kosten": "Part de la hausse des coûts",
            "refNeu": "Taux de référence actuel",
            "likMonat": "Indice jusqu'à",
        },
    },
    "verzugszinsrechner": {
        "slug": "interet-moratoire",
        "campos": {
            "betrag": "Montant dû",
            "von": "En demeure depuis (par exemple le lendemain de l'échéance)",
            "bis": "Jusqu'au",
            "satz": {"e": "Taux contractuel (s'il est plus élevé)", "a": "Laissez vide : l'intérêt moratoire légal s'applique."},
            "basis": {"e": "Jours d'intérêt par an", "o": {"365": "365 jours", "360": "360 jours"}},
        },
        "filas": {"zins": "Intérêt moratoire", "total": "Montant avec intérêt moratoire", "tage": "Jours de demeure", "satz": "Taux d'intérêt annuel"},
    },
    "saron-hypothek-rechner": {
        "slug": "hypotheque-saron",
        "campos": {
            "betrag": "Montant de l'hypothèque",
            "marge": {"e": "Marge de la banque", "a": "Elle figure dans votre offre ou dans le contrat hypothécaire."},
            "negativ": {"e": "SARON négatif", "o": {"null": "Compter 0 % (plancher prévu au contrat)", "voll": "Compter la valeur publiée"}},
        },
        "filas": {
            "monat": "Intérêt hypothécaire par mois",
            "jahr": "Intérêt hypothécaire par an",
            "quartal": "Par trimestre",
            "satz": "Taux (SARON plus marge)",
            "saron": "SARON",
            "saronDatum": "SARON du",
            "leitzins": "Taux directeur de la BNS",
        },
    },
}
