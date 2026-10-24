import type { DiccionarioLegal } from "./tipos";

// Fast überall unpersönlich formuliert: derselbe Text passt zu du und Sie, nur die Kontaktseite
// unterscheidet sich.
export const de: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Über uns | CalcularYa",
      description: "CalcularYa entwickelt Rechner für Arbeit, Geld und Alltag in jedem Land, mit Daten aus amtlichen Quellen.",
      h1: "Über uns",
      bajada: "Rechner für jedes Land, jeweils mit den amtlichen Daten.",
      bloques: [
        {
          parrafos: [
            "CalcularYa ist eine Website mit Rechnern für alltägliche Fragen: Gehalt, Kredit, Steuern, Datumsrechnungen und vieles mehr.",
            "Dahinter steht Manuel Navarro, der auch calcular.ar betreibt, eine Rechner-Website für Argentinien.",
          ],
        },
        {
          titulo: "So arbeiten wir",
          parrafos: [
            "Hängt eine Rechnung von einer Vorschrift ab (ein Mindestlohn, ein Beitragssatz, eine Obergrenze), entnehmen wir den Wert der amtlichen Quelle des Landes: Amtsblatt, Ministerium, Zentralbank oder Steuerbehörde.",
            "Wir speichern den Link und das Datum unserer Prüfung und zeigen beides bei jedem Rechner an.",
            "Lässt sich ein Wert nicht in der amtlichen Quelle bestätigen, wird der Rechner, der ihn verwendet, nicht veröffentlicht.",
            "Ändert sich eine Vorschrift, ändert sich der Rechner mit, und die Änderung steht in den Neuigkeiten des jeweiligen Landes.",
          ],
        },
        { titulo: "Kostenlos", parrafos: ["Die Rechner sind kostenlos und ohne Anmeldung nutzbar."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Schreib uns, wenn ein Wert veraltet ist, ein Ergebnis nicht stimmt oder dir ein Rechner oder ein Land fehlt.",
      h1: "Kontakt",
      bajada: `Unsere E-Mail-Adresse: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Hilfreich ist für uns jeder Hinweis auf einen veralteten Wert, ein unerwartetes Ergebnis oder einen fehlenden Rechner.",
            "Geht es um einen Wert, nenn bitte das Land und die Seite, auf der er steht.",
            "Antworten schreibt ein Mensch. Das kann ein paar Tage dauern.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Datenschutz | CalcularYa",
      description: "Welche Daten CalcularYa verwendet: Eingaben in einen Rechner werden im Browser verarbeitet und nicht gespeichert.",
      h1: "Datenschutz",
      bajada: `Zuletzt aktualisiert: ${actualizado}.`,
      bloques: [
        {
          titulo: "Eingaben in einen Rechner",
          parrafos: ["Die Rechnung läuft im Browser. Eingaben werden an keinen Server gesendet und nicht gespeichert."],
        },
        {
          titulo: "Das Land des Besuchs",
          parrafos: [
            "Um die Rechner des passenden Landes vorzuschlagen, prüfen wir, aus welchem Land ein Besuch kommt. Unser Hosting-Anbieter leitet das aus der IP-Adresse ab.",
            "Wir speichern die IP-Adresse nicht. Die Angabe bleibt für die Dauer des Besuchs im Browser.",
          ],
        },
        {
          titulo: "Was der Browser speichert",
          parrafos: [
            "Im Sitzungsspeicher des Browsers, der beim Schließen des Tabs gelöscht wird, merken wir uns das Land des Besuchs, ob der Hinweis dazu geschlossen wurde und, wenn der Besuch über einen geteilten Link kam, den Code dieses Links.",
            "Im lokalen Speicher, der bleibt, bis er im Browser gelöscht wird, liegen das selbst gewählte Land, eine Zufallszahl zum Zählen der Besuche und die angezeigte Version eines Designtests, damit die Website bei jedem Besuch gleich aussieht. Nichts davon verrät, wer die Person ist.",
            "Wir verwenden keine Werbe- oder Tracking-Cookies.",
          ],
        },
        {
          titulo: "Hosting",
          parrafos: ["Die Website wird bei Vercel gehostet. Wie jeder Server protokolliert er technische Daten zu jedem Besuch (IP-Adresse und Browser), damit die Website funktioniert und sicher bleibt."],
        },
        {
          titulo: "Wie wir Besuche zählen",
          parrafos: [
            "Wir messen die Nutzung der Website mit einem eigenen Werkzeug: welche Seiten geöffnet und wie stark sie genutzt werden, von welcher Website der Besuch kommt, die Art des Geräts und das Land. Mit der Zufallszahl im Browser unterscheiden wir einen neuen Besuch von einem wiederkehrenden. Wir speichern weder die IP-Adresse noch Eingaben in einen Rechner.",
            "Links, die von der Website aus geteilt werden, tragen einen Zufallscode, der bei jedem Teilen neu ist. Damit zählen wir, wie viele Besuche ein Link bringt. Der Code identifiziert niemanden.",
            "Beträge, die in einen Rechner eingegeben werden, verlassen den Browser nie in einem Link.",
          ],
        },
        {
          titulo: "Änderungen und Fragen",
          parrafos: [
            "Ändert sich etwas daran (zum Beispiel durch Werbung), kündigen wir es auf dieser Seite an, bevor es gilt.",
            `Fragen zu personenbezogenen Daten beantworten wir unter ${mail}.`,
          ],
        },
        {
          titulo: "Geteilte Gehälter",
          parrafos: [
            "Bei „Echte Gehälter“ lässt sich ein Gehalt anonym und freiwillig beitragen, nur nach ausdrücklicher Zustimmung. Gespeichert werden das Land, der Beruf (aus einer festen Liste), die Erfahrungsstufe, das monatliche Bruttogehalt auf zwei signifikante Stellen gerundet und der Monat. Nicht gespeichert werden IP-Adresse, Browser, Konto oder das genaue Datum.",
            "Veröffentlicht werden nur Median und Spanne von Gruppen ab 10 Personen. Ein einzelnes Gehalt wird nie gezeigt.",
            "Damit dasselbe Land nicht zweimal im selben Monat beigetragen wird, merkt sich der Browser im lokalen Speicher Land und Monat des Beitrags, nie den Betrag.",
            "Da ein Beitrag mit niemandem verknüpft ist, lässt er sich später nicht wiederfinden und löschen.",
          ],
        },
      ],
    },
    terminos: {
      title: "Nutzungsbedingungen | CalcularYa",
      description: "Die Rechner von CalcularYa liefern eine Schätzung mit den geltenden amtlichen Daten. Sie dienen der Orientierung und ersetzen keine Beratung.",
      h1: "Nutzungsbedingungen",
      bajada: `Zuletzt aktualisiert: ${actualizado}.`,
      bloques: [
        {
          titulo: "Wofür die Rechner gedacht sind",
          parrafos: [
            "Die Ergebnisse sind Schätzungen auf Grundlage der geltenden amtlichen Daten. Sie dienen der Orientierung.",
            "Sie ersetzen weder die Berechnung eines Arbeitgebers, einer Steuerberatung oder einer Anwaltskanzlei noch die Auskunft der zuständigen Behörde.",
          ],
        },
        {
          titulo: "Woher die Daten stammen",
          parrafos: [
            "Jeder Rechner zeigt die amtliche Quelle seiner Werte und das Datum unserer Prüfung.",
            "Wir halten die Werte so aktuell wie möglich, doch eine Vorschrift kann sich ändern, bevor wir sie übernehmen.",
          ],
        },
        {
          titulo: "Nutzung der Website",
          parrafos: ["Die Website ist kostenlos. Sie darf genutzt und ihre Links dürfen geteilt werden. Nicht erlaubt ist, Inhalte massenhaft zu kopieren oder sich als CalcularYa auszugeben."],
        },
        {
          titulo: "Haftung",
          parrafos: ["Für Entscheidungen, die allein auf einem Ergebnis dieser Website beruhen, übernehmen wir keine Haftung. Vor einer Unterschrift, Zahlung oder Reklamation sollte die Rechnung bei der zuständigen Stelle bestätigt werden."],
        },
        { titulo: "Kontakt", parrafos: [`Unsere E-Mail-Adresse: ${mail}.`] },
      ],
    },
  },
  usted: {
    contacto: {
      description: "Schreiben Sie uns, wenn ein Wert veraltet ist, ein Ergebnis nicht stimmt oder Ihnen ein Rechner oder ein Land fehlt.",
      bloques: [
        {
          parrafos: [
            "Hilfreich ist für uns jeder Hinweis auf einen veralteten Wert, ein unerwartetes Ergebnis oder einen fehlenden Rechner.",
            "Geht es um einen Wert, nennen Sie bitte das Land und die Seite, auf der er steht.",
            "Antworten schreibt ein Mensch. Das kann ein paar Tage dauern.",
          ],
        },
      ],
    },
  },
});
