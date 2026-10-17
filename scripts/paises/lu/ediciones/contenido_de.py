"""Contenido de las calculadoras de lu en alemán (lu-de). Traduce contenido_fr.py sin agregar afirmaciones."""

CONTENIDO = {
    "salaire-brut-net": {
        "h1": "Nettolohn in Luxemburg berechnen",
        "title": "Brutto-Netto-Rechner Luxemburg 2026",
        "description": "Vom Brutto zum Netto in Luxemburg: Kranken-, Renten- und Pflegeversicherung 2026, Lohnsteuer nach Steuerklasse 1, 1a oder 2 und Steuerkredite CIS und CI-CO2.",
        "intro": [
            "In Luxemburg gehen vom Bruttolohn die Sozialversicherungsbeiträge des Arbeitnehmers (Kranken-, Renten- und Pflegeversicherung) und die Lohnsteuer ab. Der Steuerkredit für Arbeitnehmer (CIS) und der CI-CO2 verringern danach die Lohnsteuer.",
            "Der Rechner verwendet die Beitragssätze 2026 des Centre commun de la sécurité sociale (CCSS) und die Lohnsteuerformeln der Steuerverwaltung (ACD).",
        ],
        "como": [
            "Krankenversicherung: die Hälfte von {{lu.cotisation-maladie-soins}} und {{lu.cotisation-maladie-especes}}. Rentenversicherung: die Hälfte von {{lu.cotisation-pension}}. Beide enden bei der Beitragsbemessungsgrenze von {{lu.plafond-cotisable}} pro Monat.",
            "Pflegeversicherung: {{lu.cotisation-dependance}} auf den ganzen Lohn, abzüglich eines Freibetrags von {{lu.abattement-dependance}}.",
            "Lohnsteuer: Lohn minus Beiträge, auf 5 Euro abgerundet, geht in die Formel der Steuerklasse. Die Steuer wird dann für den Beschäftigungsfonds erhöht.",
            "Steuerkredite: CIS und CI-CO2 hängen vom jährlichen Bruttolohn ab und entfallen ab 80.000 Euro im Jahr.",
        ],
        "ejemplo": ["Bei 5.000 Euro brutto in Steuerklasse 1 betragen die Beiträge rund 638 Euro und die Lohnsteuer rund 696 Euro. Mit 34 Euro Steuerkredit bleiben rund 3.700 Euro netto."],
        "faq": [
            (
                "Welche Steuerklasse habe ich?",
                "Die Steuerklasse steht auf Ihrer Lohnsteuerkarte. Klasse 1 gilt meist für Alleinstehende, Klasse 2 für Verheiratete oder Partner, Klasse 1a unter anderem für Alleinerziehende und Personen ab 65 Jahren.",
            ),
            (
                "Welche Beiträge zahlt der Arbeitnehmer?",
                "Die Hälfte der Kranken- und Rentenversicherung und die ganze Pflegeversicherung. Unfallversicherung und Arbeitsmedizin trägt der Arbeitgeber.",
            ),
            (
                "Warum weicht das Ergebnis von meiner Lohnabrechnung ab?",
                "Die Lohnsteuerkarte kann Ermäßigungen enthalten, etwa für Fahrtkosten oder Freibeträge. Auch Sachbezüge und Prämien ändern die Berechnung. Maßgebend ist die Lohnsteuerkarte.",
            ),
        ],
        "glosario": [
            ("Lohnsteuerkarte", "Dokument der ACD mit der Steuerklasse und den Ermäßigungen, die der Arbeitgeber anwendet."),
            ("CIS", "Steuerkredit für Arbeitnehmer, mit dem Lohn ausgezahlt und ab 40.000 Euro Bruttojahreslohn abnehmend."),
        ],
    },
    "impot-sur-le-revenu": {
        "h1": "Einkommensteuer in Luxemburg berechnen",
        "title": "Einkommensteuer Luxemburg: Rechner nach Steuerklasse",
        "description": "Einkommensteuer in Luxemburg nach dem Tarif der ACD: Steuerklassen 1, 1a und 2, Beitrag zum Beschäftigungsfonds von 7 % oder 9 % und Durchschnittssteuersatz.",
        "intro": [
            "Der Einkommensteuertarif hängt von der Steuerklasse ab. Er steigt stufenweise bis 42 %. Zur Steuer kommt ein Beitrag zum Beschäftigungsfonds.",
            "Der Rechner geht vom steuerpflichtigen Einkommen aus, also vom Einkommen nach Werbungskosten, Sonderausgaben und Freibeträgen.",
        ],
        "como": [
            "Das steuerpflichtige Einkommen wird auf 50 Euro abgerundet.",
            "Steuer = Satz der Stufe x Einkommen, minus Abzug der Stufe, auf den Euro abgerundet. Die Formeln sind die der Steuerverwaltung (ACD).",
            "Beschäftigungsfonds: Die Steuer wird um 7 % erhöht. Über 150.000 Euro (300.000 Euro in Klasse 2) steigt der Zuschlag auf 9 % mit einem Abzug.",
        ],
        "ejemplo": ["Eine Person in Steuerklasse 1 mit 60.000 Euro steuerpflichtigem Einkommen zahlt 11.164 Euro Steuer, mit dem Beitrag zum Beschäftigungsfonds 11.945 Euro."],
        "faq": [
            ("Was ist die Steuerklasse 2?", "Die Klasse der gemeinsam veranlagten Verheirateten oder Partner. Ihr Tarif gilt für das gemeinsame Einkommen des Haushalts."),
            ("Wie hoch ist der Spitzensteuersatz?", "Die letzte Stufe des Tarifs wird mit 42 % besteuert, vor dem Beitrag zum Beschäftigungsfonds."),
            ("Sind Steuerkredite enthalten?", "Nein. Der Rechner zeigt die Steuer laut Tarif. Steuerkredite wie der CIS werden danach von der geschuldeten Steuer abgezogen."),
        ],
        "glosario": [
            ("Beschäftigungsfonds", "Beitrag, der zur Einkommensteuer hinzukommt, 7 % oder 9 % je nach Einkommen."),
            ("Steuerpflichtiges Einkommen", "Einkommen nach Abzug von Werbungskosten, Sonderausgaben und Freibeträgen."),
        ],
    },
    "cotisations-sociales": {
        "h1": "Sozialversicherungsbeiträge des Arbeitnehmers in Luxemburg",
        "title": "Sozialversicherungsbeiträge Luxemburg 2026",
        "description": "Sozialversicherungsbeiträge 2026 des Arbeitnehmers in Luxemburg: Kranken-, Renten- und Pflegeversicherung mit der Beitragsbemessungsgrenze von {{lu.plafond-cotisable}}.",
        "intro": [
            "Der Arbeitnehmer zahlt die Hälfte der Kranken- und Rentenversicherung und die ganze Pflegeversicherung. 2026 steigt der Rentenbeitrag auf insgesamt {{lu.cotisation-pension}}.",
            "Der Rechner zeigt die Beiträge pro Monat und für zwölf Monate.",
        ],
        "como": [
            "Krankenversicherung: (Sachleistungen {{lu.cotisation-maladie-soins}} + Geldleistungen {{lu.cotisation-maladie-especes}}) / 2.",
            "Rentenversicherung: {{lu.cotisation-pension}} / 2. Kranken- und Rentenversicherung gehen nicht über die Beitragsbemessungsgrenze von {{lu.plafond-cotisable}} pro Monat.",
            "Pflegeversicherung: {{lu.cotisation-dependance}} des Lohns, ohne Obergrenze, nach einem Freibetrag von {{lu.abattement-dependance}}.",
        ],
        "ejemplo": ["Bei 5.000 Euro brutto zahlt der Arbeitnehmer 152,50 Euro Krankenversicherung, 425 Euro Rentenversicherung und 60,30 Euro Pflegeversicherung, zusammen 637,80 Euro im Monat."],
        "faq": [
            ("Was ist die Beitragsbemessungsgrenze?", "Die Obergrenze der Bemessungsgrundlage, das Fünffache des sozialen Mindestlohns. Darüber fallen keine Kranken- und Rentenbeiträge an."),
            ("Ist die Pflegeversicherung gedeckelt?", "Nein. Sie gilt für den ganzen Lohn, abzüglich eines Freibetrags von einem Viertel des sozialen Mindestlohns."),
            ("Wer zahlt die Unfallversicherung?", "Der Arbeitgeber. Er zahlt auch die Arbeitsmedizin und die Mutualität der Arbeitgeber."),
        ],
        "glosario": [
            ("Bemessungsgrundlage", "Betrag des Lohns, auf den die Beiträge berechnet werden."),
            ("CCSS", "Centre commun de la sécurité sociale, das die Beiträge erhebt."),
        ],
    },
    "cout-employeur": {
        "h1": "Arbeitgeberkosten in Luxemburg berechnen",
        "title": "Arbeitgeberkosten Luxemburg 2026: Lohnnebenkosten",
        "description": "Was ein Lohn den Arbeitgeber in Luxemburg kostet: Kranken-, Renten- und Unfallversicherung, Arbeitsmedizin und Mutualität der Arbeitgeber nach den Sätzen 2026.",
        "intro": [
            "Zum Bruttolohn kommen die Arbeitgeberbeiträge: die Hälfte der Kranken- und Rentenversicherung, die Unfallversicherung, die Arbeitsmedizin und die Mutualität der Arbeitgeber.",
            "Der Satz der Mutualität hängt von der Klasse des Unternehmens ab. Wählen Sie Ihre Klasse.",
        ],
        "como": [
            "Krankenversicherung: die Hälfte von {{lu.cotisation-maladie-soins}} und {{lu.cotisation-maladie-especes}}. Rentenversicherung: die Hälfte von {{lu.cotisation-pension}}.",
            "Unfallversicherung {{lu.cotisation-accident}}, Arbeitsmedizin {{lu.cotisation-sante-travail}} und Mutualität nach Klasse, ganz zulasten des Arbeitgebers.",
            "Alle diese Beiträge enden bei der Beitragsbemessungsgrenze von {{lu.plafond-cotisable}} pro Monat.",
        ],
        "ejemplo": ["Ein Lohn von 5.000 Euro kostet einen Arbeitgeber in Klasse 2 der Mutualität 5.664,50 Euro im Monat."],
        "faq": [
            ("Hat die Unfallversicherung einen Einheitssatz?", "Ja, er wird aber mit einem Bonus-Malus-Faktor des Unternehmens multipliziert. Der Rechner verwendet den Einheitssatz."),
            ("Zahlt der Arbeitgeber die Pflegeversicherung?", "Nein. Die Pflegeversicherung trägt ganz der Arbeitnehmer."),
            ("Was fehlt in dieser Berechnung?", "Sachbezüge, Prämien und Kosten aus einem Kollektivvertrag. Prüfen Sie diese in Ihren Verträgen."),
        ],
        "glosario": [("Mutualität der Arbeitgeber", "System, das Arbeitgebern einen Teil der Löhne bei Krankheit erstattet, finanziert durch Beiträge nach Klassen.")],
    },
    "salaire-social-minimum": {
        "h1": "Sozialer Mindestlohn in Luxemburg",
        "title": "Mindestlohn Luxemburg 2026: Beträge",
        "description": "Sozialer Mindestlohn in Luxemburg seit dem 1. Juni 2026: {{lu.ssm-non-qualifie}} unqualifiziert, {{lu.ssm-qualifie}} qualifiziert, Stundenlöhne und Jugendliche.",
        "intro": [
            "Der soziale Mindestlohn ist der niedrigste Lohn, den ein Arbeitgeber zahlen darf. Er beträgt {{lu.ssm-non-qualifie}} im Monat für einen unqualifizierten Arbeitnehmer ab 18 Jahren.",
            "Ein qualifizierter Arbeitnehmer hat Anspruch auf 20 % mehr, also {{lu.ssm-qualifie}}. Für Jugendliche ist der Mindestlohn niedriger.",
        ],
        "como": [
            "Monatsbetrag: der Betrag der Kategorie, für eine Vollzeitstelle von {{lu.heures-par-mois}} Stunden im Monat.",
            "Stundenbetrag: der Monatsbetrag geteilt durch {{lu.heures-par-mois}}, auf vier Nachkommastellen.",
            "Teilzeit: der Stundenbetrag mal die geleisteten Stunden.",
        ],
        "ejemplo": ["Ein qualifizierter Arbeitnehmer in Vollzeit erhält mindestens 3.325,59 Euro brutto im Monat, also 19,2231 Euro pro Stunde."],
        "faq": [
            (
                "Wer gilt als qualifiziert?",
                "Wer einen Beruf ausübt, der eine Qualifikation mit amtlichem Zeugnis mindestens auf Niveau DAP oder CATP verlangt. Andere Zeugnisse mit 2 oder 5 Jahren Praxis, oder 10 Jahre Praxis ohne Zeugnis, können ebenfalls Anspruch auf den qualifizierten Mindestlohn geben.",
            ),
            ("Wie viel erhält ein Jugendlicher?", "{{lu.ssm-jeunes[17-18]}} des unqualifizierten Mindestlohns von 17 bis 18 Jahren, {{lu.ssm-jeunes[15-17]}} von 15 bis 17 Jahren."),
            ("Wann steigt der Mindestlohn?", "Mit jeder Indextranche und wenn das Gesetz ihn anhebt. Die Regierung legt alle zwei Jahre einen Bericht über seine Entwicklung vor."),
        ],
        "glosario": [
            ("Sozialer Mindestlohn", "Gesetzlicher Mindestlohn in Luxemburg, auf Französisch salaire social minimum (SSM)."),
            ("Indextranche", "Anpassung der Löhne um 2,5 % an die Entwicklung der Lebenshaltungskosten."),
        ],
    },
    "conges-payes": {
        "h1": "Urlaubsanspruch in Luxemburg berechnen",
        "title": "Urlaubsrechner Luxemburg: Urlaubstage und Urlaubsentgelt",
        "description": "Wie viele Urlaubstage in Luxemburg? Mindestens {{lu.conges-jours}} Werktage im Jahr, anteilig nach gearbeiteten Monaten, und Urlaubsentgelt pro Tag.",
        "intro": [
            "In Luxemburg beträgt der Jahresurlaub mindestens {{lu.conges-jours}} Werktage im Jahr, unabhängig vom Alter des Arbeitnehmers.",
            "Im ersten Jahr und im Jahr des Austritts entsteht der Urlaub mit einem Zwölftel pro vollem Arbeitsmonat.",
        ],
        "como": [
            "Erworbene Tage = Urlaubstage des Jahres x volle Monate / 12.",
            "Urlaubsentgelt: der Bruttomonatslohn geteilt durch {{lu.heures-par-mois}} Stunden ergibt den Stundenlohn, mal die Stunden eines Arbeitstags.",
        ],
        "ejemplo": ["Mit 4.325 Euro brutto und 8-Stunden-Tagen ist ein Urlaubstag 200 Euro wert. Die 26 Tage eines vollen Jahres sind 5.200 Euro wert."],
        "faq": [
            ("Sind Feiertage eingerechnet?", "Nein. Der Jahresurlaub kommt zu den gesetzlichen Feiertagen hinzu."),
            ("Kann Urlaub übertragen werden?", "Er muss grundsätzlich im laufenden Jahr genommen werden. Der anteilige Urlaub des ersten Jahres kann auf Wunsch des Arbeitnehmers ins Folgejahr übertragen werden."),
            ("Kann der Vertrag mehr Tage vorsehen?", "Ja. Ein Vertrag oder Kollektivvertrag kann mehr vorsehen, nie weniger als das gesetzliche Minimum."),
        ],
        "glosario": [("Werktage", "Wochentage, die weder Sonntage noch gesetzliche Feiertage sind.")],
    },
    "heures-supplementaires": {
        "h1": "Überstunden in Luxemburg berechnen",
        "title": "Überstundenrechner Luxemburg: Zuschlag von {{lu.majoration-heures-sup}}",
        "description": "Überstunden in Luxemburg: anderthalb Stunden Freizeit pro Stunde, oder Bezahlung mit {{lu.majoration-heures-sup}} Zuschlag, wenn der Ausgleich unmöglich ist.",
        "intro": [
            "In Luxemburg wird eine Überstunde zuerst durch anderthalb Stunden bezahlte Freizeit ausgeglichen, oder auf einem Zeitsparkonto gutgeschrieben.",
            "Ist der Ausgleich unmöglich oder verlässt der Arbeitnehmer das Unternehmen vorher, wird jede Stunde mit dem Stundenlohn plus {{lu.majoration-heures-sup}} Zuschlag bezahlt.",
        ],
        "como": [
            "Stundenlohn = Bruttomonatslohn / {{lu.heures-par-mois}}.",
            "Bezahlung = Stundenlohn x Stunden x (100 % + {{lu.majoration-heures-sup}}).",
            "Freizeit = Stunden x 1,5.",
        ],
        "ejemplo": ["Mit 5.190 Euro im Monat, also 30 Euro pro Stunde, sind 10 Überstunden 420 Euro wert, oder 15 Stunden bezahlte Freizeit."],
        "faq": [
            ("Sind Überstunden steuerpflichtig?", "Die Bezahlung von 140 % ist steuer- und beitragsfrei, außer den Beiträgen für Sachleistungen auf die Stunde ohne Zuschlag."),
            ("Wer regelt die Einzelheiten?", "Ein anwendbarer Kollektivvertrag regelt die Einzelheiten. Sonst gelten die Regeln des Arbeitsgesetzbuchs."),
            ("Gilt das für leitende Angestellte?", "Nein. Diese Vergütungsregeln gelten nicht für Arbeitnehmer mit der Eigenschaft leitender Angestellter."),
        ],
        "glosario": [("Zeitsparkonto", "Konto, auf dem Überstunden zum gleichen Satz gutgeschrieben werden, um sie später auszugleichen.")],
    },
    "preavis-licenciement": {
        "h1": "Kündigungsfrist in Luxemburg berechnen",
        "title": "Kündigungsfrist Luxemburg: Rechner für das Vertragsende",
        "description": "Kündigungsfrist in Luxemburg nach Betriebszugehörigkeit: 2, 4 oder 6 Monate bei Kündigung durch den Arbeitgeber, die Hälfte durch den Arbeitnehmer. Beginn am 15. oder 1.",
        "intro": [
            "Bei Kündigung durch den Arbeitgeber hängt die Frist von der Betriebszugehörigkeit ab: 2 Monate unter 5 Jahren, 4 Monate von 5 bis unter 10 Jahren, 6 Monate ab 10 Jahren.",
            "Kündigt der Arbeitnehmer, ist die Frist halb so lang: 1, 2 oder 3 Monate.",
        ],
        "como": [
            "Wird die Kündigung vor dem 15. des Monats zugestellt, beginnt die Frist am 15. Sonst beginnt sie am 1. des Folgemonats.",
            "Das Vertragsende fällt auf den Vortag desselben Tages, einen, zwei, vier oder sechs Monate später.",
            "Der Rechner zählt die Betriebszugehörigkeit in vollen Jahren bis zur Zustellung.",
        ],
        "ejemplo": ["Eine Kündigung, die am 10. Oktober 2026 nach 6 Jahren Betriebszugehörigkeit zugestellt wird, löst eine Frist von 4 Monaten vom 15. Oktober 2026 bis zum 14. Februar 2027 aus."],
        "faq": [
            ("Wie muss die Kündigung zugestellt werden?", "Per Einschreiben bei der Post. Die Unterschrift des Arbeitnehmers auf dem Doppel des Schreibens gilt als Empfangsbestätigung."),
            ("Und wenn der Arbeitnehmer kündigt?", "Er kündigt ebenfalls per Einschreiben. Seine Frist ist halb so lang wie die des Arbeitgebers."),
            (
                "Kann ein kleines Unternehmen die Frist verlängern?",
                "Ein Arbeitgeber mit weniger als zwanzig Arbeitnehmern kann ab fünf Jahren Betriebszugehörigkeit statt der Abfindung eine verlängerte Kündigungsfrist wählen.",
            ),
        ],
        "glosario": [("Kündigungsfrist", "Zeit zwischen der Zustellung der Kündigung und dem Ende des Arbeitsvertrags.")],
    },
    "indemnite-de-depart": {
        "h1": "Abfindung in Luxemburg berechnen",
        "title": "Abfindungsrechner Luxemburg: nach Betriebszugehörigkeit",
        "description": "Gesetzliche Mindestabfindung in Luxemburg: 1 bis 12 Monatslöhne je nach Betriebszugehörigkeit ab 5 Jahren, berechnet auf die letzten zwölf Monate.",
        "intro": [
            "Ein Arbeitnehmer mit unbefristetem Vertrag, dem der Arbeitgeber kündigt, hat ab fünf Jahren Betriebszugehörigkeit Anspruch auf eine Abfindung.",
            "Sie reicht von einem Monatslohn nach 5 Jahren bis zu zwölf Monatslöhnen nach 30 Jahren.",
        ],
        "como": [
            "Betriebszugehörigkeit: maßgebend am Ende der Kündigungsfrist.",
            "Monatslöhne: 1 ab 5 Jahren, 2 ab 10, 3 ab 15, 6 ab 20, 9 ab 25 und 12 ab 30 Jahren.",
            "Grundlage: die Bruttolöhne der letzten zwölf Monate, ohne Überstunden und Gratifikationen.",
        ],
        "ejemplo": ["Nach 12 Jahren mit einem Durchschnittslohn von 4.000 Euro beträgt die Mindestabfindung 2 Monatslöhne, also 8.000 Euro."],
        "faq": [
            ("Wann wird die Abfindung gezahlt?", "Wenn der Arbeitnehmer die Arbeit tatsächlich verlässt."),
            ("Welche Löhne zählen?", "Die Bruttolöhne der letzten zwölf Monate, einschließlich Krankengeld und laufender Prämien, aber ohne Überstunden und Gratifikationen."),
            ("Muss ein kleines Unternehmen sie zahlen?", "Ein Arbeitgeber mit weniger als zwanzig Arbeitnehmern kann stattdessen eine verlängerte Kündigungsfrist wählen."),
        ],
        "glosario": [("Betriebszugehörigkeit", "Dauer der ununterbrochenen Beschäftigung beim selben Arbeitgeber.")],
    },
    "allocations-familiales": {
        "h1": "Familienzulagen in Luxemburg berechnen (Zukunftskeess)",
        "title": "Familienzulagen Luxemburg 2026: Kindergeld der CAE",
        "description": "Familienzulagen in Luxemburg: {{lu.allocation-familiale}} pro Kind und Monat, Alterszuschläge und Schulanfangszulage der Zukunftskeess.",
        "intro": [
            "Seit dem 1. Juni 2026 beträgt die Familienzulage {{lu.allocation-familiale}} pro Kind und Monat. Ab 6 Jahren und erneut ab 12 Jahren kommt ein Zuschlag hinzu.",
            "Für Kinder ab 6 Jahren wird einmal im Jahr eine Schulanfangszulage gezahlt.",
        ],
        "como": [
            "Pro Monat: {{lu.allocation-familiale}} pro Kind, plus {{lu.majoration-age[6-11]}} von 6 bis 11 Jahren oder {{lu.majoration-age[12-plus]}} ab 12 Jahren.",
            "Schulanfang: {{lu.allocation-rentree[6-11]}} von 6 bis 11 Jahren, {{lu.allocation-rentree[12-plus]}} ab 12 Jahren.",
        ],
        "ejemplo": ["Für drei Kinder von 4, 8 und 14 Jahren betragen die Familienzulagen 1.028,37 Euro im Monat und die Schulanfangszulage 350 Euro."],
        "faq": [
            ("Hängt der Betrag von der Zahl der Kinder ab?", "Nein, im System seit dem 1. August 2016: Der Betrag ist für jedes Kind gleich."),
            ("Wer zahlt die Familienzulagen?", "Die Zukunftskeess, auf Französisch Caisse pour l'avenir des enfants (CAE)."),
            ("Gibt es eine Geburtszulage?", "Ja, in drei Teilen. Dieser Rechner berücksichtigt sie nicht."),
        ],
        "glosario": [("Zukunftskeess", "Caisse pour l'avenir des enfants (CAE), die die Familienleistungen auszahlt.")],
    },
    "droits-enregistrement": {
        "h1": "Registrierungsgebühren und Bëllegen Akt berechnen",
        "title": "Registrierungsgebühren Luxemburg: Bëllegen Akt 2026",
        "description": "Kaufnebenkosten einer Wohnung in Luxemburg: 6 % Registrierung und 1 % Umschreibung, minus Steuerkredit Bëllegen Akt von {{lu.bellegen-akt}} pro Käufer.",
        "intro": [
            "Beim Kauf eines Hauses, einer Wohnung oder eines Baugrundstücks betragen die Gebühren 7 %: {{lu.droits-enregistrement}} Registrierung und {{lu.droits-transcription}} Umschreibung.",
            "Für die eigene Wohnung kann jeder Käufer den Steuerkredit Bëllegen Akt beantragen, begrenzt auf {{lu.bellegen-akt}}.",
        ],
        "como": [
            "Gebühren = Preis x ({{lu.droits-enregistrement}} + {{lu.droits-transcription}}).",
            "Steuerkredit: bis {{lu.bellegen-akt}} pro Käufer. Die Verwaltung erhebt in jedem Fall mindestens {{lu.droits-minimum}}.",
        ],
        "ejemplo": ["Bei einem Kauf für 750.000 Euro betragen die Gebühren 52.500 Euro. Als einziger Käufer zahlen Sie nach dem Steuerkredit von 40.000 Euro noch 12.500 Euro. Zu zweit bleiben 100 Euro zu zahlen."],
        "faq": [
            (
                "Welche Bedingungen gelten für den Bëllegen Akt?",
                "Die Immobilie innerhalb von 2 Jahren selbst beziehen (4 Jahre bei einem Grundstück oder einem Gebäude im Bau) und mindestens 2 Jahre ohne Unterbrechung bewohnen. Der Notar stellt den Antrag in der Urkunde.",
            ),
            ("Gilt der Steuerkredit für eine Mietwohnung?", "Nein. Zweitwohnungen, Wochenendhäuser und Gebäude zur Vermietung oder für den Handel sind ausgeschlossen."),
            ("Haben Nichtansässige Anspruch?", "Ja, wenn sie sich verpflichten, sich in der gekauften Immobilie in Luxemburg niederzulassen."),
        ],
        "glosario": [("Bëllegen Akt", "Luxemburgischer Name des Steuerkredits auf notarielle Urkunden.")],
    },
    "calcul-inflation": {
        "h1": "Inflation in Luxemburg mit dem IPCN berechnen",
        "title": "Inflationsrechner Luxemburg: mit dem IPCN umrechnen",
        "description": "Was ist ein früherer Betrag heute wert? Berechnen Sie die Inflation seit 2000 mit dem nationalen Verbraucherpreisindex (IPCN) von STATEC.",
        "intro": [
            "Der nationale Verbraucherpreisindex (IPCN) misst die Entwicklung der Preise in Luxemburg. STATEC veröffentlicht ihn jeden Monat.",
            "Mit dem Rechner rechnen Sie einen Betrag in einen anderen Monat um, etwa um eine Miete oder einen Preis über die Zeit zu vergleichen.",
        ],
        "como": [
            "Umgerechneter Betrag = Betrag x IPCN des Endmonats / IPCN des Ausgangsmonats.",
            "Die Berechnung verwendet den IPCN mit Basis 100 am 1. Januar 1948, wie STATEC ihn veröffentlicht.",
            "Ist der Endmonat noch nicht veröffentlicht, nimmt der Rechner den letzten verfügbaren Monat.",
        ],
        "ejemplo": ["1.000 Euro vom Januar 2020 entsprechen im September 2026 rund 1.227,50 Euro."],
        "faq": [
            ("Was ist der Unterschied zwischen IPCN und IPCH?", "Der IPCN ist der nationale Index für die gleitende Lohnskala. Der IPCH ist der harmonisierte europäische Index."),
            ("Woher kommen die Zahlen?", "Aus der Datenbank LUSTAT von STATEC, nach jeder Veröffentlichung aktualisiert."),
            ("Dient der IPCN zur Lohnindexierung?", "Ja, über seinen Halbjahresdurchschnitt. Der Indextranche-Rechner zeigt, wo die nächste Tranche steht."),
        ],
        "glosario": [("IPCN", "Nationaler Verbraucherpreisindex von STATEC.")],
    },
    "indexation-salaires": {
        "h1": "Lohnindexierung in Luxemburg: nächste Indextranche",
        "title": "Indextranche Luxemburg: Rechner für die nächste Tranche",
        "description": "Wo steht die nächste Indextranche in Luxemburg? Halbjahresdurchschnitt des IPCN, Auslöseschwelle und Ihr Lohn nach einer Erhöhung von 2,5 %.",
        "intro": [
            "In Luxemburg werden die Löhne an die Entwicklung der Lebenshaltungskosten angepasst. Steigt der Index um 2,5 %, werden die Löhne im gleichen Verhältnis erhöht.",
            "Der Rechner vergleicht den letzten Halbjahresdurchschnitt des IPCN mit der nächsten Auslöseschwelle und zeigt Ihren Lohn nach der Tranche.",
        ],
        "como": [
            "Nächste Schwelle: die aktuelle Auslöseschwelle, {{lu.cote-echeance}}, plus 2,5 %.",
            "Noch nötiger Anstieg: Abstand zwischen der nächsten Schwelle und dem letzten von STATEC veröffentlichten Halbjahresdurchschnitt.",
            "Lohn nach der Tranche: aktueller Lohn x 1,025. Die geltende Indexzahl beträgt derzeit {{lu.nombre-indice}}.",
        ],
        "ejemplo": ["Im September 2026 lag der Halbjahresdurchschnitt des IPCN bei 1.058,56, die nächste Schwelle bei 1.064,75. Ein Lohn von 5.000 Euro stiege auf 5.125 Euro."],
        "faq": [
            ("Wann war die letzte Indextranche?", "Am 1. Juni 2026. Die geltende Indexzahl stieg auf {{lu.nombre-indice}}."),
            ("Werden alle Löhne indexiert?", "Ja, Löhne, Gehälter und Sozialleistungen, einschließlich des sozialen Mindestlohns. Für nach Luxemburg entsandte Arbeitnehmer wird nur der Mindestlohn indexiert."),
            ("Was ist der Lohn zum Index 100?", "Der Lohn auf die Basis der gleitenden Lohnskala zurückgerechnet: Lohn x 100 / Indexzahl."),
        ],
        "glosario": [
            ("Auslöseschwelle", "Wert des Halbjahresdurchschnitts des IPCN, der eine Indextranche auslöst (cote d'échéance)."),
            ("Indexzahl", "Koeffizient, der auf Löhne zum Index 100 angewendet wird."),
        ],
    },
    "calcul-tva": {
        "h1": "Mehrwertsteuer in Luxemburg berechnen: 17, 14, 8 und 3 %",
        "title": "Mehrwertsteuerrechner Luxemburg: hinzu- und herausrechnen",
        "description": "Luxemburgische Mehrwertsteuer zum Normalsatz von {{lu.tva-normal}}, Zwischensatz von {{lu.tva-intermediaire}}, ermäßigten Satz von {{lu.tva-reduit}} oder {{lu.tva-super-reduit}}.",
        "intro": [
            "In Luxemburg beträgt die Mehrwertsteuer {{lu.tva-normal}} zum Normalsatz. Es gibt außerdem einen Zwischensatz von {{lu.tva-intermediaire}}, einen ermäßigten Satz von {{lu.tva-reduit}} und einen stark ermäßigten Satz von {{lu.tva-super-reduit}}.",
            "Mit dem Rechner rechnen Sie die Mehrwertsteuer zu einem Betrag hinzu oder aus einem Bruttopreis heraus.",
        ],
        "como": [
            "Hinzurechnen: Betrag mal Steuersatz ergibt die Mehrwertsteuer.",
            "Herausrechnen: Bruttopreis geteilt durch 1,17 (oder 1,14, 1,08 und 1,03) ergibt den Nettobetrag.",
        ],
        "ejemplo": ["Eine Rechnung über 1.000 Euro netto kostet zum Normalsatz 1.170 Euro."],
        "faq": [
            ("Welche Waren fallen unter die ermäßigten Sätze?", "Die in den Anhängen A (ermäßigter Satz), B (stark ermäßigter Satz) und C (Zwischensatz) des Mehrwertsteuergesetzes aufgeführten. Alle anderen Umsätze fallen unter den Normalsatz."),
            ("Gilt die Senkung von 2023 noch?", "Nein. Sie galt vom 1. Januar bis 31. Dezember 2023. Seitdem gelten wieder 17, 14 und 8 %."),
            ("Wer erhebt die Mehrwertsteuer?", "Die Registrierungs-, Domänen- und Mehrwertsteuerverwaltung (AED)."),
        ],
        "glosario": [("AED", "Administration de l'enregistrement, des domaines et de la TVA, die Mehrwertsteuerverwaltung.")],
    },
}
