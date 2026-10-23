"""Contenido de las calculadoras de li en alemán (ortografía liechtensteinische, sin ß). Cada afirmación sale de
ahv.li o de gesetze.li (SteG, ABGB § 1173a, BPVG, MWSTG)."""

CONTENIDO = {
    "brutto-netto-rechner": {
        "h1": "Brutto-Netto-Rechner Liechtenstein",
        "title": "Brutto-Netto-Rechner Liechtenstein 2026: Lohn netto",
        "description": "Lohnrechner für Liechtenstein: vom Bruttolohn zum Nettolohn mit AHV/IV/FAK, ALV, Pensionskasse und NBU nach den Beitragssätzen 2026.",
        "intro": [
            "In Liechtenstein gehen vom Bruttolohn die Beiträge an AHV, IV und FAK, die Arbeitslosenversicherung, die Pensionskasse und die Nichtberufsunfallversicherung ab.",
            "Der Rechner verwendet die Beitragssätze 2026 der Liechtensteinischen AHV-IV-FAK und den gesetzlichen Mindestbeitrag an die betriebliche Personalvorsorge.",
        ],
        "como": [
            "AHV/IV/FAK: {{li.beitraege-arbeitnehmer[ahv]}} AHV, {{li.beitraege-arbeitnehmer[iv]}} IV und {{li.beitraege-arbeitnehmer[fak]}} FAK, zusammen 4,9 % des Lohns.",
            "ALV: die Hälfte von {{li.alv-satz}}, bis zu einem Jahreslohn von {{li.alv-hoechstlohn}}.",
            "Pensionskasse: geschätzt die Hälfte des Mindestbeitrags von {{li.bpv-altersbeitrag}} für das Alter, ohne Risikoprämie. Steht der Abzug auf Ihrer Lohnabrechnung, tragen Sie ihn ein.",
            "Die Steuer ist nicht abgezogen. Den Steuerabzug vom Lohn legt die Steuerverwaltung fest.",
        ],
        "ejemplo": ["Bei 6500 Franken brutto mit 12 Löhnen gehen 318.50 Franken AHV/IV/FAK, 32.50 Franken ALV und rund 260 Franken Pensionskasse ab. Es bleiben 5889 Franken vor Steuern."],
        "faq": [
            ("Wie viel AHV zahlt man in Liechtenstein?", "Arbeitnehmende zahlen 2026 zusammen 4,9 % für AHV, IV und FAK. Der Arbeitgeber zahlt 7,385 %, einschliesslich der Verwaltungskosten."),
            ("Bis zu welchem Lohn zahlt man ALV?", "Bis 126 000 Franken Jahreslohn. Auf Lohnteilen darüber werden keine ALV-Beiträge erhoben."),
            ("Ab wann muss ich in die Pensionskasse?", "Wenn der Jahreslohn mindestens die minimale jährliche AHV-Altersrente erreicht. Für das Alter ab dem 1. Januar nach dem vollendeten 19. Altersjahr, für Tod und Invalidität schon ab dem 17. Altersjahr."),
        ],
        "glosario": [
            ("FAK", "Familienausgleichskasse, die die Familienzulagen auszahlt."),
            ("NBU", "Nichtberufsunfallversicherung, deren Prämie vom Lohn abgezogen wird."),
        ],
    },
    "lohnsteuer-rechner": {
        "h1": "Lohnsteuer in Liechtenstein schätzen",
        "title": "Lohnsteuer Liechtenstein 2026: Steuer vom Lohn schätzen",
        "description": "Wie viel Steuer zahlen Sie in Liechtenstein auf Ihren Lohn? Schätzung der Landes- und Gemeindesteuer mit Abzügen, Kinderabzug und Gemeindezuschlag.",
        "intro": [
            "In Liechtenstein besteht die Steuer auf dem Lohn aus der Landessteuer und dem Zuschlag der Wohngemeinde. Der Arbeitgeber zieht laufend einen Steuerabzug ab, die Steuerverwaltung rechnet danach mit der Veranlagung ab.",
            "Der Rechner schätzt die Jahressteuer für einen Lohn als einziges Einkommen, ohne Vermögen.",
        ],
        "como": [
            "Vom Bruttolohn gehen ab: AHV/IV/FAK und ALV, der Mindestbeitrag an die Pensionskasse, die Pauschale von {{li.gewinnungskosten-pauschale}} für Gewinnungskosten und die Versicherungsprämien bis {{li.versicherungsabzug[person]}} ({{li.versicherungsabzug[ehegatten]}} für Ehegatten, {{li.versicherungsabzug[kind]}} pro Kind).",
            "Pro Kind kommt ein Abzug von {{li.kinderabzug}} dazu.",
            "Auf den Erwerb wird der Tarif des Landes angewendet, dann der Gemeindezuschlag.",
        ],
        "ejemplo": ["Bei 85 000 Franken Bruttolohn, alleinstehend und 150 % Gemeindezuschlag, ergibt sich ein Erwerb von 71 710 Franken und eine Steuer von rund 4661 Franken im Jahr."],
        "faq": [
            ("Wer legt den Steuerabzug vom Lohn fest?", "Die Steuerverwaltung. Sie berücksichtigt den voraussichtlichen Jahreserwerb, Pauschalen für Abzüge und die Familienverhältnisse."),
            ("Wie hoch ist der Gemeindezuschlag?", "Der Gemeinderat setzt ihn jedes Jahr fest, zwischen 150 und 250 % der Landessteuer."),
            ("Was fehlt in dieser Schätzung?", "Vermögen, weitere Einkommen und Abzüge wie Krankheitskosten, Spenden oder Weiterbildung. Massgebend ist die Veranlagung."),
        ],
        "glosario": [
            ("Steuerpflichtiger Erwerb", "Einkommen nach den gesetzlichen Abzügen, auf das der Tarif angewendet wird."),
            ("Gemeindezuschlag", "Zuschlag der Wohngemeinde in Prozent der Landessteuer."),
        ],
    },
    "steuerrechner": {
        "h1": "Steuerrechner Liechtenstein: Landes- und Gemeindesteuer",
        "title": "Steuerrechner Liechtenstein: Erwerbssteuer 2026",
        "description": "Erwerbssteuer in Liechtenstein nach dem Steuergesetz: Landessteuer von 1 bis 8 % plus Gemeindezuschlag, für Alleinstehende, Alleinerziehende, Ehepaare.",
        "intro": [
            "Der Tarif der Landessteuer steigt in Stufen von 1 bis 8 %. Dazu kommt der Zuschlag Ihrer Wohngemeinde.",
            "Es gibt drei Tarife: für Alleinstehende, für Alleinerziehende und für gemeinsam veranlagte Ehegatten.",
        ],
        "como": [
            "Der steuerpflichtige Erwerb wird auf 10 Franken abgerundet.",
            "Landessteuer = Satz der Stufe x Erwerb, minus Abzug der Stufe, wie im Steuergesetz festgelegt.",
            "Gemeindesteuer = Landessteuer x Gemeindezuschlag, zwischen {{li.gemeindezuschlag[min]}} und {{li.gemeindezuschlag[max]}}.",
        ],
        "ejemplo": ["Bei 80 000 Franken Erwerb, alleinstehend, beträgt die Landessteuer 2256 Franken. Mit 150 % Gemeindezuschlag kommen 3384 Franken dazu, zusammen 5640 Franken."],
        "faq": [
            ("Wie hoch ist der Grundfreibetrag?", "15 855 Franken für Alleinstehende, 23 783 Franken für Alleinerziehende und 31 710 Franken für Ehegatten."),
            ("Wie hoch ist der Spitzensteuersatz?", "Die Landessteuer erreicht 8 %. Mit dem Gemeindezuschlag ergibt das 20 bis 28 %, je nach Gemeinde."),
            ("Wird das Vermögen auch besteuert?", "Ja, über einen Sollertrag, der zum Erwerb gezählt wird. Tragen Sie dann den Erwerb einschliesslich dieses Betrags ein."),
        ],
        "glosario": [("Landessteuer", "Steuer des Landes auf dem Erwerb, nach Art. 19 des Steuergesetzes.")],
    },
    "lohnkosten-rechner": {
        "h1": "Lohnkosten in Liechtenstein berechnen",
        "title": "Lohnkosten Liechtenstein 2026: Arbeitgeberbeiträge",
        "description": "Was kostet ein Lohn den Arbeitgeber in Liechtenstein? AHV/IV/FAK mit Verwaltungskosten, ALV, Pensionskasse und Berufsunfallversicherung nach den Sätzen 2026.",
        "intro": [
            "Zum Bruttolohn kommen die Arbeitgeberbeiträge an AHV, IV und FAK, die Verwaltungskosten, die Arbeitslosenversicherung, die Pensionskasse und die Berufsunfallversicherung.",
            "Der Rechner zeigt die Kosten pro Monat und pro Jahr.",
        ],
        "como": [
            "AHV {{li.beitraege-arbeitgeber[ahv]}}, IV {{li.beitraege-arbeitgeber[iv]}}, FAK {{li.beitraege-arbeitgeber[fak]}} und Verwaltungskosten {{li.beitraege-arbeitgeber[vk]}} des Lohns.",
            "ALV: die Hälfte von {{li.alv-satz}} bis {{li.alv-hoechstlohn}} Jahreslohn.",
            "Pensionskasse: der Arbeitgeber trägt mindestens die Hälfte der Beiträge, hier die Hälfte des Mindestbeitrags von {{li.bpv-altersbeitrag}}.",
        ],
        "ejemplo": ["Ein Lohn von 6000 Franken kostet den Arbeitgeber 6713.10 Franken im Monat: 443.10 Franken AHV/IV/FAK, 30 Franken ALV und 240 Franken Pensionskasse."],
        "faq": [
            ("Wer zahlt die FAK-Beiträge?", "Vor allem der Arbeitgeber mit 1,9 %. Arbeitnehmende zahlen 0,2 %."),
            ("Was sind die Verwaltungskosten?", "Ein Beitrag von 0,585 % des Lohns, den nur der Arbeitgeber an die AHV-IV-FAK zahlt."),
            ("Muss der Arbeitgeber die Berufsunfallversicherung zahlen?", "Ja. Tragen Sie die Prämie laut Ihrer Police ein."),
        ],
        "glosario": [("BU", "Berufsunfallversicherung, deren Prämie der Arbeitgeber trägt.")],
    },
    "mwst-rechner": {
        "h1": "MWST-Rechner Liechtenstein",
        "title": "MWST-Rechner Liechtenstein: 8,1 %, 2,6 % und 3,8 %",
        "description": "Mehrwertsteuer in Liechtenstein dazurechnen oder herausrechnen: Normalsatz {{li.mwst-normalsatz}}, reduzierter Satz {{li.mwst-reduziert}} und Sondersatz {{li.mwst-beherbergung}}.",
        "intro": [
            "In Liechtenstein beträgt die Mehrwertsteuer {{li.mwst-normalsatz}} zum Normalsatz, {{li.mwst-reduziert}} zum reduzierten Satz und {{li.mwst-beherbergung}} für Beherbergungsleistungen.",
            "Mit dem Rechner rechnen Sie die MWST zu einem Betrag dazu oder aus einem Preis heraus.",
        ],
        "como": [
            "Dazurechnen: Betrag mal Steuersatz ergibt die MWST.",
            "Herausrechnen: Preis inklusive MWST geteilt durch 1,081 (oder 1,026 und 1,038) ergibt den Betrag ohne MWST.",
        ],
        "ejemplo": ["Eine Rechnung über 100 Franken ohne MWST kostet zum Normalsatz 108.10 Franken."],
        "faq": [
            ("Sind die Sätze gleich wie in der Schweiz?", "Ja. Das liechtensteinische Mehrwertsteuergesetz sieht dieselben drei Sätze vor wie das schweizerische."),
            ("Was fällt unter den reduzierten Satz?", "Unter anderem Wasser in Leitungen, Lebensmittel, Medikamente, Zeitungen und Bücher, wie im Mehrwertsteuergesetz aufgezählt."),
            ("Was ist eine Beherbergungsleistung?", "Die Gewährung von Unterkunft einschliesslich Frühstück, auch wenn dieses separat berechnet wird."),
        ],
        "glosario": [("Sondersatz", "Satz von 3,8 % für Beherbergungsleistungen.")],
    },
    "pensionskasse-rechner": {
        "h1": "Pensionskasse Liechtenstein: Mindestbeitrag nach BPVG",
        "title": "Pensionskasse Liechtenstein: Mindestbeitrag BPVG",
        "description": "Betriebliche Personalvorsorge in Liechtenstein: Eintrittsschwelle, Mindestbeitrag von {{li.bpv-altersbeitrag}} für das Alter und Anteile von Arbeitgeber und Arbeitnehmer.",
        "intro": [
            "Jeder Arbeitgeber in Liechtenstein muss seine Angestellten bei einer Pensionskasse versichern, wenn ihr Jahreslohn die minimale jährliche AHV-Altersrente erreicht.",
            "Der Beitrag für das Alter beträgt mindestens {{li.bpv-altersbeitrag}} des versicherten Lohns. Der Arbeitgeber trägt mindestens die Hälfte.",
        ],
        "como": [
            "Eintrittsschwelle: 12 x minimale monatliche AHV-Altersrente von {{li.ahv-mindestrente}}.",
            "Versicherter Lohn: der ganze AHV-pflichtige Jahreslohn. Das Reglement darf ihn begrenzen, aber nicht unter das Dreifache der maximalen jährlichen AHV-Altersrente.",
            "Mindestbeitrag: {{li.bpv-altersbeitrag}} des versicherten Lohns, je zur Hälfte.",
        ],
        "ejemplo": ["Bei 78 000 Franken Jahreslohn beträgt der Mindestbeitrag für das Alter 6240 Franken im Jahr, davon höchstens 3120 Franken vom Arbeitnehmer."],
        "faq": [
            ("Gibt es einen Koordinationsabzug wie in der Schweiz?", "Nein. Versichert ist grundsätzlich der ganze AHV-pflichtige Jahreslohn."),
            ("Ab welchem Alter spart man für das Alter?", "Ab dem 1. Januar nach dem vollendeten 19. Altersjahr, wenn das Arbeitsverhältnis unbefristet ist oder länger als drei Monate dauert."),
            ("Sind Tod und Invalidität mitversichert?", "Ja, ab dem 1. Januar nach dem vollendeten 17. Altersjahr. Die Prämie dafür kommt zum Altersbeitrag dazu und ist hier nicht gerechnet."),
        ],
        "glosario": [("BPVG", "Gesetz über die betriebliche Personalvorsorge, die zweite Säule in Liechtenstein.")],
    },
    "kinderzulagen-rechner": {
        "h1": "Kinderzulagen Liechtenstein berechnen",
        "title": "Kinderzulage Liechtenstein 2026: Rechner",
        "description": "Kinderzulagen der FAK in Liechtenstein: {{li.kinderzulage}} pro Kind, {{li.kinderzulage-erhoeht}} ab 10 Jahren und ab dem dritten Kind, plus Alleinerziehendenzulage.",
        "intro": [
            "Die Kinderzulage beträgt {{li.kinderzulage}} pro Kind und Monat. Ab dem Monat, in dem das Kind das 10. Lebensjahr vollendet, steigt sie auf {{li.kinderzulage-erhoeht}}.",
            "Wer mehr als zwei zulagenberechtigte Kinder hat, erhält für jedes Kind {{li.kinderzulage-erhoeht}}.",
        ],
        "como": [
            "Bis zwei Kinder: {{li.kinderzulage}} für Kinder unter 10, {{li.kinderzulage-erhoeht}} für Kinder ab 10.",
            "Ab drei Kindern: {{li.kinderzulage-erhoeht}} für jedes Kind.",
            "Alleinerziehende erhalten zusätzlich {{li.alleinerziehendenzulage}} pro Kind und Monat.",
        ],
        "ejemplo": ["Eine Familie mit zwei Kindern von 6 und 12 Jahren erhält 670 Franken im Monat, 8040 Franken im Jahr."],
        "faq": [
            ("Wer zahlt die Kinderzulagen?", "Die Familienausgleichskasse (FAK) der Liechtensteinischen AHV-IV-FAK."),
            ("Was gilt für Zwillinge?", "Für Zwillinge beträgt die Kinderzulage ab Geburt je {{li.kinderzulage-erhoeht}}."),
            ("Was gilt für Grenzgänger?", "Arbeiten beide Eltern in verschiedenen Vertragsstaaten, zahlt der Wohnstaat. Die FAK zahlt einen Differenzausgleich, wenn die ausländischen Zulagen tiefer sind."),
        ],
        "glosario": [("Alleinerziehendenzulage", "Zulage pro Kind für alleinstehende Personen, die mit dem Kind im gleichen Haushalt leben.")],
    },
    "geburtszulage-rechner": {
        "h1": "Geburtszulage Liechtenstein",
        "title": "Geburtszulage Liechtenstein 2026: Betrag pro Kind",
        "description": "Geburtszulage der FAK in Liechtenstein: {{li.geburtszulage}} pro Kind, {{li.geburtszulage-mehrlinge}} pro Kind bei Mehrlingsgeburten. Auch für Adoptivkinder.",
        "intro": [
            "Die Geburtszulage ist eine einmalige Leistung der FAK. Sie beträgt {{li.geburtszulage}} für jedes Kind.",
            "Bei Zwillingen oder anderen Mehrlingsgeburten beträgt sie {{li.geburtszulage-mehrlinge}} pro Kind.",
        ],
        "como": [
            "Einzelgeburt: {{li.geburtszulage}}.",
            "Mehrlingsgeburt: {{li.geburtszulage-mehrlinge}} x Anzahl Kinder.",
        ],
        "ejemplo": ["Für Zwillinge beträgt die Geburtszulage 2 x 3070 = 6140 Franken."],
        "faq": [
            ("Wer hat Anspruch?", "Wer bei der Geburt die allgemeinen Voraussetzungen für Familienzulagen erfüllt."),
            ("Gilt sie auch bei Adoption?", "Ja, für ein nicht mehr als fünfjähriges Kind, das zur Adoption aufgenommen wird."),
            ("Gilt sie bei einer Totgeburt?", "Ja, für ein Kind, das nach dem sechsten Monat der Schwangerschaft tot geboren wird."),
        ],
        "glosario": [("Mehrlingsgeburt", "Geburt von zwei oder mehr Kindern, etwa Zwillingen.")],
    },
    "ferienrechner": {
        "h1": "Ferienanspruch in Liechtenstein berechnen",
        "title": "Ferienrechner Liechtenstein: Ferienanspruch",
        "description": "Wie viele Ferientage stehen Ihnen in Liechtenstein zu? Mindestens {{li.ferien-wochen}} Wochen, bis 20 Jahre {{li.ferien-wochen-jugendliche}} Wochen, anteilig bei Ein- und Austritt.",
        "intro": [
            "Der Arbeitgeber muss jedes Dienstjahr mindestens {{li.ferien-wochen}} Wochen Ferien gewähren. Bis zum vollendeten 20. Altersjahr sind es {{li.ferien-wochen-jugendliche}} Wochen.",
            "Für ein unvollständiges Dienstjahr gibt es Ferien im Verhältnis zur Dauer des Arbeitsverhältnisses.",
        ],
        "como": [
            "Ferientage pro Jahr = Ferienwochen x Arbeitstage pro Woche.",
            "Anteil = Ferientage x Monate / 12.",
            "Bei Stundenlohn entspricht der Ferienzuschlag Ferienwochen / (52 - Ferienwochen).",
        ],
        "ejemplo": ["Wer mit 30 Jahren fünf Tage pro Woche arbeitet, hat Anspruch auf 20 Ferientage im Jahr."],
        "faq": [
            ("Darf der Arbeitgeber die Ferien kürzen?", "Erst wenn Sie insgesamt mehr als einen Monat an der Arbeit verhindert sind, und dann um einen Zwölftel pro vollen Monat. Bei Schwangerschaft gelten längere Grenzen."),
            ("Dürfen Ferien ausbezahlt werden?", "Nicht während des Arbeitsverhältnisses. Ferien dürfen nicht durch Geld abgegolten werden."),
            ("Wer bestimmt den Zeitpunkt der Ferien?", "Der Arbeitgeber, mit Rücksicht auf Ihre Wünsche, soweit es mit dem Betrieb vereinbar ist."),
        ],
        "glosario": [("Dienstjahr", "Jahr des Arbeitsverhältnisses, gezählt ab dem Eintritt.")],
    },
    "ueberstunden-rechner": {
        "h1": "Überstunden in Liechtenstein berechnen",
        "title": "Überstunden Liechtenstein: Zuschlag von 25 % berechnen",
        "description": "Überstunden in Liechtenstein: Lohn plus Zuschlag von mindestens {{li.ueberstunden-zuschlag}}, wenn sie nicht durch Freizeit ausgeglichen werden. Mit Stundenlohn aus dem Monatslohn.",
        "intro": [
            "Werden Überstunden nicht durch Freizeit ausgeglichen, schuldet der Arbeitgeber den Normallohn plus einen Zuschlag von mindestens einem Viertel.",
            "Ein anderer Zuschlag gilt nur, wenn er schriftlich vereinbart oder im Normal- oder Gesamtarbeitsvertrag geregelt ist.",
        ],
        "como": [
            "Stundenlohn aus Monatslohn = Monatslohn x 12 / 52 / Wochenstunden.",
            "Vergütung = Stundenlohn x Überstunden x (100 % + {{li.ueberstunden-zuschlag}}).",
        ],
        "ejemplo": ["Bei 6500 Franken Monatslohn und 42 Stunden pro Woche sind 10 Überstunden 446.43 Franken wert."],
        "faq": [
            ("Muss ich Überstunden leisten?", "Nur soweit Sie sie leisten können und sie Ihnen nach Treu und Glauben zugemutet werden können."),
            ("Können Überstunden mit Freizeit ausgeglichen werden?", "Ja, mit Ihrem Einverständnis, durch Freizeit von mindestens gleicher Dauer. Dann gibt es keinen Zuschlag."),
            ("Kann der Zuschlag wegfallen?", "Ja, wenn das schriftlich vereinbart oder in einem Normal- oder Gesamtarbeitsvertrag so geregelt ist."),
        ],
        "glosario": [("Überstunden", "Arbeit über die vereinbarte, übliche oder im Vertrag bestimmte Arbeitszeit hinaus.")],
    },
    "kuendigungsfrist-rechner": {
        "h1": "Kündigungsfrist in Liechtenstein berechnen",
        "title": "Kündigungsfrist Liechtenstein: Rechner nach Dienstjahr",
        "description": "Kündigungsfrist in Liechtenstein: 7 Tage in der Probezeit, danach 1, 2 oder 3 Monate auf ein Monatsende je nach Dienstjahr. Mit dem letzten Arbeitstag.",
        "intro": [
            "Nach der Probezeit beträgt die Kündigungsfrist im ersten Dienstjahr einen Monat, vom zweiten bis zum neunten Dienstjahr zwei Monate und danach drei Monate, jeweils auf das Ende eines Monats.",
            "In der Probezeit kann mit sieben Tagen auf das Ende einer Arbeitswoche gekündigt werden.",
        ],
        "como": [
            "Probezeit: der erste Monat, sofern nichts anderes vereinbart ist, höchstens drei Monate.",
            "Frist ab dem Tag, an dem die Kündigung eintrifft, Ende am folgenden Monatsende.",
            "Für Arbeitgeber und Arbeitnehmer gelten dieselben Fristen. Bei unterschiedlicher Abrede gilt für beide die längere.",
        ],
        "ejemplo": ["Trifft eine Kündigung im fünften Dienstjahr am 15. Oktober 2026 ein, endet das Arbeitsverhältnis am 31. Dezember 2026."],
        "faq": [
            ("Können die Fristen verkürzt werden?", "Durch schriftliche Abrede, Normal- oder Gesamtarbeitsvertrag. Unter einen Monat aber nur per Gesamtarbeitsvertrag im ersten Dienstjahr."),
            ("Was gilt bei Krankheit?", "Nach der Probezeit darf der Arbeitgeber während einer Sperrfrist nicht kündigen. Eine laufende Frist wird unterbrochen. Dafür gibt es den Sperrfrist-Rechner."),
            ("Wann ist eine Kündigung missbräuchlich?", "Etwa wenn sie wegen einer persönlichen Eigenschaft oder wegen der Ausübung eines Rechts ausgesprochen wird. Dann kann eine Entschädigung von bis zu sechs Monatslöhnen geschuldet sein."),
        ],
        "glosario": [("Probezeit", "Erster Monat des Arbeitsverhältnisses, mit kürzerer Kündigungsfrist.")],
    },
    "sperrfrist-rechner": {
        "h1": "Sperrfrist bei Krankheit in Liechtenstein",
        "title": "Sperrfrist Liechtenstein: Kündigungsschutz bei Krankheit",
        "description": "Kündigungsschutz bei Krankheit oder Unfall in Liechtenstein: Sperrfrist von 30, 90 oder 180 Tagen je nach Dienstjahr. Mit dem letzten geschützten Tag.",
        "intro": [
            "Nach der Probezeit darf der Arbeitgeber nicht kündigen, solange Sie ohne eigenes Verschulden wegen Krankheit oder Unfall an der Arbeit verhindert sind.",
            "Der Schutz dauert im ersten Dienstjahr 30 Tage, ab dem zweiten Dienstjahr 90 Tage und ab dem sechsten Dienstjahr 180 Tage.",
        ],
        "como": [
            "Dienstjahr am ersten Tag der Arbeitsunfähigkeit bestimmen.",
            "Sperrfrist ab diesem Tag zählen.",
            "Eine Kündigung während der Sperrfrist ist nichtig. Eine vorher ausgesprochene Kündigung läuft nach der Sperrfrist weiter.",
        ],
        "ejemplo": ["Wer im fünften Dienstjahr ab dem 1. Oktober 2026 krank ist, ist bis zum 29. Dezember 2026 vor einer Kündigung geschützt."],
        "faq": [
            ("Gilt die Sperrfrist auch, wenn ich kündige?", "Nein. Sie schützt nur vor einer Kündigung durch den Arbeitgeber."),
            ("Gibt es weitere Sperrfristen?", "Ja, während der Schwangerschaft und der Mutterschaftszeit sowie in bestimmten Fällen der Vaterschaftszeit."),
            ("Was passiert mit einer laufenden Kündigungsfrist?", "Sie wird unterbrochen und läuft nach der Sperrfrist weiter. Fällt das Ende nicht auf ein Monatsende, verlängert sie sich bis dahin."),
        ],
        "glosario": [("Sperrfrist", "Zeit, in der eine Kündigung durch den Arbeitgeber nichtig ist.")],
    },
}
