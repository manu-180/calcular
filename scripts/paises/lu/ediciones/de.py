"""Textos de las calculadoras de lu en alemán de Luxemburgo (lu-de). Términos de la versión alemana de guichet.lu y del CCSS."""

EDICION = "lu-de"
IMPORTS_COMUNES = {"COMUN"}

KLASSE = {"e": "Steuerklasse", "o": "STEUERKLASSE"}
BRUTTO = "Monatlicher Bruttolohn"

TEXTOS = {
    "salaire-brut-net": {
        "slug": "brutto-netto-rechner",
        "importa": ["STEUERKLASSE"],
        "campos": {"brut": BRUTTO, "classe": KLASSE},
        "filas": {
            "net": "Monatlicher Nettolohn",
            "maladie": "Krankenversicherung",
            "pension": "Rentenversicherung",
            "dependance": "Pflegeversicherung",
            "cotisations": "Sozialversicherungsbeiträge",
            "imposable": "Steuerpflichtiges Monatseinkommen (auf 5 Euro abgerundet)",
            "retenue": "Lohnsteuer (einschließlich Beschäftigungsfonds)",
            "credits": "Steuerkredite CIS und CI-CO2",
        },
    },
    "impot-sur-le-revenu": {
        "slug": "einkommensteuer-rechner",
        "importa": ["STEUERKLASSE"],
        "campos": {
            "revenu": {"e": "Steuerpflichtiges Jahreseinkommen", "a": "Einkommen nach Abzug der Werbungskosten, Sonderausgaben und Freibeträge."},
            "classe": KLASSE,
        },
        "filas": {
            "total": "Jährliche Einkommensteuer",
            "impot": "Steuer laut Tarif",
            "fonds": "Beitrag zum Beschäftigungsfonds",
            "base": "Einkommen auf 50 Euro abgerundet",
            "moyen": "Durchschnittssteuersatz",
        },
    },
    "cotisations-sociales": {
        "slug": "sozialversicherungsbeitraege-rechner",
        "campos": {"brut": BRUTTO},
        "filas": {
            "total": "Beiträge des Arbeitnehmers pro Monat",
            "maladie": "Krankenversicherung (Sachleistungen und Geldleistungen)",
            "pension": "Rentenversicherung",
            "dependance": "Pflegeversicherung",
            "assiette": "Bemessungsgrundlage Kranken- und Rentenversicherung (gedeckelt)",
            "annuel": "Beiträge für zwölf Monate",
            "part": "Anteil am Bruttolohn",
        },
    },
    "cout-employeur": {
        "slug": "arbeitgeberkosten-rechner",
        "campos": {
            "brut": BRUTTO,
            "mutualite": {"e": "Klasse der Mutualität der Arbeitgeber", "a": "Die Sätze 2026 jeder Klasse veröffentlicht das CCSS."},
        },
        "filas": {
            "cout": "Monatliche Kosten für den Arbeitgeber",
            "charges": "Arbeitgeberbeiträge",
            "maladie": "Krankenversicherung (Arbeitgeberanteil)",
            "pension": "Rentenversicherung (Arbeitgeberanteil)",
            "accident": "Unfallversicherung",
            "sante": "Arbeitsmedizin",
            "mutualite": "Mutualität der Arbeitgeber",
            "annuel": "Kosten für zwölf Monate",
        },
    },
    "salaire-social-minimum": {
        "slug": "mindestlohn-rechner",
        "campos": {
            "categorie": {
                "e": "Situation des Arbeitnehmers",
                "o": {"non-qualifie": "18 Jahre und älter, unqualifiziert", "qualifie": "18 Jahre und älter, qualifiziert", "17-18": "17 bis 18 Jahre", "15-17": "15 bis 17 Jahre"},
            },
            "heures": {"e": "Arbeitsstunden pro Monat", "a": "173 Stunden entsprechen einer Vollzeitstelle."},
        },
        "filas": {
            "mensuel": "Monatlicher sozialer Mindestlohn brutto",
            "horaire": "Stündlicher Mindestlohn brutto",
            "annuel": "Für zwölf Monate",
            "mensuelPlein": "Betrag für eine Vollzeitstelle (173 Stunden)",
        },
    },
    "calcul-tva": {
        "slug": "mehrwertsteuer-rechner",
        "campos": {
            "montant": "Betrag in Euro",
            "sens": {"e": "Was möchten Sie berechnen?", "o": {"ajouter": "Mehrwertsteuer hinzurechnen (Nettobetrag)", "extraire": "Mehrwertsteuer herausrechnen (Bruttobetrag)"}},
            "taux": {"e": "Steuersatz", "o": {"normal": "Normalsatz", "intermediaire": "Zwischensatz", "reduit": "Ermäßigter Satz", "super-reduit": "Stark ermäßigter Satz"}},
        },
        "filas": {"tva": "Mehrwertsteuer", "ht": "Betrag ohne Mehrwertsteuer", "ttc": "Betrag mit Mehrwertsteuer", "taux": "Steuersatz"},
    },
    "conges-payes": {
        "slug": "urlaubsrechner",
        "campos": {
            "mois": "Volle Arbeitsmonate im Jahr",
            "contrat": "Urlaubstage laut Vertrag (wenn er mehr vorsieht)",
            "brut": BRUTTO,
            "heuresJour": "Arbeitsstunden pro Tag",
        },
        "filas": {
            "jours": "Erworbene Urlaubstage",
            "annuel": "Urlaubstage für ein volles Jahr",
            "indemniteJour": "Urlaubsentgelt pro Tag",
            "indemnite": "Urlaubsentgelt für die erworbenen Tage",
        },
    },
    "heures-supplementaires": {
        "slug": "ueberstunden-rechner",
        "campos": {"brut": BRUTTO, "heures": "Anzahl Überstunden"},
        "filas": {"paiement": "Bezahlung der Stunden (mit Zuschlag)", "repos": "Oder bezahlte Ausgleichsruhe", "horaire": "Stundenlohn (Bruttomonatslohn / 173)"},
    },
    "preavis-licenciement": {
        "slug": "kuendigungsfrist-rechner",
        "campos": {
            "initiative": {"e": "Wer beendet den Vertrag?", "o": {"employeur": "Der Arbeitgeber (Kündigung)", "salarie": "Der Arbeitnehmer (Kündigung durch den Arbeitnehmer)"}},
            "entree": "Eintrittsdatum im Unternehmen",
            "notification": "Datum der Zustellung der Kündigung",
        },
        "filas": {
            "fin": "Vertragsende (letzter Tag der Kündigungsfrist)",
            "debut": "Beginn der Kündigungsfrist",
            "mois": "Dauer der Kündigungsfrist",
            "anciennete": "Betriebszugehörigkeit bei der Zustellung (volle Jahre)",
        },
    },
    "indemnite-de-depart": {
        "slug": "abfindung-rechner",
        "campos": {
            "salaire": {"e": "Durchschnittlicher Bruttomonatslohn der letzten zwölf Monate", "a": "Ohne Überstunden und Gratifikationen."},
            "anciennete": "Betriebszugehörigkeit am Ende der Kündigungsfrist (Jahre)",
        },
        "filas": {"indemnite": "Gesetzliche Mindestabfindung", "mois": "Monatslöhne"},
    },
    "allocations-familiales": {
        "slug": "familienzulagen-rechner",
        "campos": {"moins6": "Kinder unter 6 Jahren", "de6a11": "Kinder von 6 bis 11 Jahren", "plus12": "Kinder ab 12 Jahren"},
        "filas": {
            "mensuel": "Familienzulagen pro Monat",
            "annuel": "Für zwölf Monate",
            "rentree": "Schulanfangszulage (einmal im Jahr)",
            "total": "Gesamtbetrag pro Jahr",
        },
    },
    "droits-enregistrement": {
        "slug": "registrierungsgebuehren-rechner",
        "campos": {
            "prix": "Kaufpreis der Immobilie",
            "habitation": "Für Ihre Hauptwohnung (Bëllegen Akt)",
            "acquereurs": "Anzahl der Käufer, die den Steuerkredit beantragen",
        },
        "filas": {
            "apayer": "Zu zahlende Gebühren",
            "droits": "Gebühren vor Steuerkredit",
            "enregistrement": "Registrierungsgebühren",
            "transcription": "Umschreibungsgebühren",
            "credit": "Genutzter Steuerkredit Bëllegen Akt",
        },
    },
    "calcul-inflation": {
        "slug": "inflationsrechner",
        "campos": {
            "montant": "Betrag in Euro",
            "de": {"e": "Monat des ursprünglichen Betrags", "a": "Es zählt der Index dieses Monats, der Tag spielt keine Rolle."},
            "a": "Monat, in den umgerechnet wird",
        },
        "filas": {
            "ajuste": "Betrag mit gleicher Kaufkraft",
            "difference": "Unterschied durch die Inflation",
            "total": "Inflation im Zeitraum",
            "annuelle": "Inflation über ein Jahr im Endmonat",
            "moisDepart": "Ausgangsmonat",
            "indiceDepart": "IPCN des Ausgangsmonats",
            "moisFin": "Endmonat",
            "indiceFin": "IPCN des Endmonats",
        },
    },
    "indexation-salaires": {
        "slug": "indextranche-rechner",
        "campos": {"salaire": "Aktueller Bruttomonatslohn"},
        "filas": {
            "apres": "Lohn nach der nächsten Indextranche",
            "hausse": "Monatliche Erhöhung (2,5 %)",
            "reste": "Noch nötiger Anstieg des Durchschnitts",
            "moyenne": "Halbjahresdurchschnitt des IPCN",
            "mois": "Letzter veröffentlichter Monat",
            "prochaineCote": "Nächste Auslöseschwelle",
            "indice": "Geltende Indexzahl",
            "base100": "Lohn zum Index 100",
        },
    },
}
