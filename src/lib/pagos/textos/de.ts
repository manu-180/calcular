import type { ClaveFamilia } from "../ofertas-intl";
import { F, type DiccionarioVenta, type TextosFamilia } from "./tipos";

const UNTERLAGEN = { titulo: F("Für deine Unterlagen", "Für Ihre Unterlagen"), texto: "Mit dem Datum der verwendeten Werte." };
const ANDERE_BETRAEGE = { titulo: "Mit anderen Beträgen", explica: "Dieselbe Rechnung mit etwas niedrigeren und höheren Beträgen." };
const ANDERE_ZINSEN = { titulo: "Mit anderen Zinssätzen", explica: "Dieselbe Rechnung mit etwas niedrigeren und höheren Zinssätzen." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Bericht zur Schlussabrechnung",
    tituloCorto: "Bericht zur Schlussabrechnung",
    paraQuien: F(
      "Um deine Schlussabrechnung vor der Unterschrift zu prüfen oder einzufordern, mit deinen Zahlen und dem Recht deines Landes",
      "Um Ihre Schlussabrechnung vor der Unterschrift zu prüfen oder einzufordern, mit Ihren Zahlen und dem Recht Ihres Landes",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deiner Schlussabrechnung Posten für Posten: was dir jeweils zusteht, wie es berechnet wird und mit welchen amtlichen Werten, jeweils mit Quelle.",
        "Ein PDF-Bericht mit Ihrer Schlussabrechnung Posten für Posten: was Ihnen jeweils zusteht, wie es berechnet wird und mit welchen amtlichen Werten, jeweils mit Quelle.",
      ),
      F(
        "Dazu kommen eine Checkliste für die Prüfung vor der Unterschrift und ein Schreiben, mit dem du die Zahlung schriftlich anforderst, schon mit deinem Betrag ausgefüllt.",
        "Dazu kommen eine Checkliste für die Prüfung vor der Unterschrift und ein Schreiben, mit dem Sie die Zahlung schriftlich anfordern, schon mit Ihrem Betrag ausgefüllt.",
      ),
    ],
    gancho: F("Hol dir deine Schlussabrechnung schriftlich, bereit zur Prüfung vor der Unterschrift", "Erhalten Sie Ihre Schlussabrechnung schriftlich, bereit zur Prüfung vor der Unterschrift"),
    incluye: [
      { titulo: "Jeder Posten mit Rechnung", texto: "Zum Vergleich Zeile für Zeile mit dem Angebot des Arbeitgebers." },
      { titulo: "Amtliche Quellen im Blick", texto: "Jeder Wert mit der Behörde, die ihn veröffentlicht, und dem Datum unserer Prüfung." },
      { titulo: "Fertiges Forderungsschreiben", texto: F("Mit deinem Betrag ausgefüllt, um die Zahlung schriftlich anzufordern.", "Mit Ihrem Betrag ausgefüllt, um die Zahlung schriftlich anzufordern.") },
    ],
    pasos: {
      titulo: "Vor der Unterschrift",
      items: [
        F(
          "Vergleiche jeden Posten dieses Berichts mit dem Dokument, das du unterschreiben sollst. Fehlt einer, frag vor der Unterschrift nach dem Grund.",
          "Vergleichen Sie jeden Posten dieses Berichts mit dem Dokument, das Sie unterschreiben sollen. Fehlt einer, fragen Sie vor der Unterschrift nach dem Grund.",
        ),
        F(
          "Prüfe, ob Gehalt und Daten des Arbeitgebers mit deinen Eingaben übereinstimmen. Ein anderes Eintrittsdatum ändert fast alle Beträge.",
          "Prüfen Sie, ob Gehalt und Daten des Arbeitgebers mit Ihren Eingaben übereinstimmen. Ein anderes Eintrittsdatum ändert fast alle Beträge.",
        ),
        F("Lass dir eine Kopie von allem geben, was du unterschreibst, und bewahre die Gehaltsabrechnungen der letzten Monate auf.", "Lassen Sie sich eine Kopie von allem geben, was Sie unterschreiben, und bewahren Sie die Gehaltsabrechnungen der letzten Monate auf."),
        F(
          "Ist der Unterschied groß oder wurdest du gekündigt, bring diesen Bericht zur Arbeitsbehörde deines Landes oder zu einer Fachanwältin für Arbeitsrecht. Das spart die erste Stunde Rechnerei.",
          "Ist der Unterschied groß oder wurde Ihnen gekündigt, bringen Sie diesen Bericht zur Arbeitsbehörde Ihres Landes oder zu einer Fachanwältin für Arbeitsrecht. Das spart die erste Stunde Rechnerei.",
        ),
      ],
    },
    nota: {
      titulo: "Schreiben zur Zahlungsanforderung",
      uso: F(
        "Füll es aus, unterschreib es und gib es mit einer Kopie für dich ab. Lass dir die Kopie mit dem Eingangsdatum gegenzeichnen.",
        "Füllen Sie es aus, unterschreiben Sie es und geben Sie es mit einer Kopie für sich ab. Lassen Sie sich die Kopie mit dem Eingangsdatum gegenzeichnen.",
      ),
      pedido: "Hiermit fordere ich die Zahlung meiner Schlussabrechnung zum Ende des Arbeitsverhältnisses an, die laut der Berechnung im beigefügten Bericht folgenden Betrag ergibt:",
      cierre: "Beigefügt ist die Aufstellung jedes Postens, berechnet mit den amtlichen Werten zum angegebenen Datum. Ich bitte um Mitteilung des Zahlungstermins.",
    },
  },
  "pagos-laborales": {
    nombre: "Bericht zu Lohnzahlungen",
    tituloCorto: "Bericht zu Lohnzahlungen",
    paraQuien: F(
      "Um zu prüfen, ob Sonderzahlung, Urlaubsgeld, Überstunden oder Gewinnbeteiligung richtig bezahlt wurden, und sonst die Differenz zu fordern",
      "Um zu prüfen, ob Sonderzahlung, Urlaubsgeld, Überstunden oder Gewinnbeteiligung richtig bezahlt wurden, und sonst die Differenz zu fordern",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deiner Berechnung, Schritt für Schritt und mit deinen Zahlen: welche Basis gilt, wie gezählt wird und welche amtlichen Werte gelten, jeweils mit Quelle.",
        "Ein PDF-Bericht mit Ihrer Berechnung, Schritt für Schritt und mit Ihren Zahlen: welche Basis gilt, wie gezählt wird und welche amtlichen Werte gelten, jeweils mit Quelle.",
      ),
      F(
        "Er passt für jede Zahlung der Liste. Er zeigt, wie du sie auf der Gehaltsabrechnung prüfst, und enthält ein Schreiben, um die Differenz schriftlich zu fordern.",
        "Er passt für jede Zahlung der Liste. Er zeigt, wie Sie sie auf der Gehaltsabrechnung prüfen, und enthält ein Schreiben, um die Differenz schriftlich zu fordern.",
      ),
    ],
    gancho: F("Hol dir diese Berechnung schriftlich zum Vergleich mit deiner Gehaltsabrechnung", "Erhalten Sie diese Berechnung schriftlich zum Vergleich mit Ihrer Gehaltsabrechnung"),
    incluye: [
      { titulo: "Die Berechnung Schritt für Schritt", texto: F("Mit deinen Daten und jedem amtlichen Wert.", "Mit Ihren Daten und jedem amtlichen Wert.") },
      { titulo: "Worauf es auf der Abrechnung ankommt", texto: "Um in einer Minute zu sehen, ob richtig bezahlt wurde." },
      { titulo: "Schreiben für die Differenz", texto: F("Mit deinem Betrag ausgefüllt, bereit zur Abgabe.", "Mit Ihrem Betrag ausgefüllt, bereit zur Abgabe.") },
    ],
    pasos: {
      titulo: "Um die Zahlung zu prüfen",
      items: [
        F("Such diesen Posten auf deiner Gehaltsabrechnung und vergleiche ihn mit dem Betrag in diesem Bericht.", "Suchen Sie diesen Posten auf Ihrer Gehaltsabrechnung und vergleichen Sie ihn mit dem Betrag in diesem Bericht."),
        F("Stimmt er nicht, prüf zuerst, ob deine Eingaben mit denen des Arbeitgebers übereinstimmen.", "Stimmt er nicht, prüfen Sie zuerst, ob Ihre Eingaben mit denen des Arbeitgebers übereinstimmen."),
        F(
          "Stimmt er dann immer noch nicht, fordere die Differenz mit dem Schreiben unten schriftlich an und behalte eine Kopie.",
          "Stimmt er dann immer noch nicht, fordern Sie die Differenz mit dem Schreiben unten schriftlich an und behalten Sie eine Kopie.",
        ),
      ],
    },
    nota: {
      titulo: "Schreiben zur Zahlungsanforderung",
      uso: F("Füll es aus, unterschreib es und gib es mit einer Kopie für dich ab.", "Füllen Sie es aus, unterschreiben Sie es und geben Sie es mit einer Kopie für sich ab."),
      pedido: "Hiermit fordere ich die Zahlung des im beigefügten Bericht aufgeführten Postens an, der laut Berechnung mit den geltenden amtlichen Werten folgenden Betrag ergibt:",
      cierre: "Falls ein anderer Betrag gezahlt wurde, bitte ich um eine schriftliche Erläuterung der Berechnung.",
    },
    escenarios: { titulo: F("Wenn sich deine Stunden ändern", "Wenn sich Ihre Stunden ändern"), explica: "Dieselbe Berechnung mit anderen Stundenzahlen, um jeden Monat zu prüfen, ohne neu zu rechnen." },
  },
  impuesto: {
    nombre: "Bericht zur Einkommensteuer",
    tituloCorto: "Steuerbericht",
    paraQuien: F(
      "Um zu verstehen, wie viel Steuer einbehalten wird, die Gehaltsabrechnung zu prüfen und zu sehen, was sich bei anderem Einkommen ändert",
      "Um zu verstehen, wie viel Steuer einbehalten wird, die Gehaltsabrechnung zu prüfen und zu sehen, was sich bei anderem Einkommen ändert",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deiner Steuer Schritt für Schritt, mit dem geltenden amtlichen Tarif und der Quelle jedes Werts.",
        "Ein PDF-Bericht mit Ihrer Steuer Schritt für Schritt, mit dem geltenden amtlichen Tarif und der Quelle jedes Werts.",
      ),
      F(
        "Dazu eine Tabelle mit deiner Steuer bei anderen Einkommen, damit du vorher weißt, was nach einer Gehaltserhöhung oder einem Jobwechsel bleibt.",
        "Dazu eine Tabelle mit Ihrer Steuer bei anderen Einkommen, damit Sie vorher wissen, was nach einer Gehaltserhöhung oder einem Jobwechsel bleibt.",
      ),
    ],
    gancho: F("Hol dir deine Steuer schriftlich erklärt, und was sich bei anderem Einkommen ändert", "Erhalten Sie Ihre Steuer schriftlich erklärt, und was sich bei anderem Einkommen ändert"),
    incluye: [
      { titulo: "Die Berechnung mit dem amtlichen Tarif", texto: "Schritt für Schritt, mit der Quelle jedes Werts." },
      { titulo: "Die Steuer bei anderen Einkommen", texto: "Um eine Gehaltserhöhung mit klaren Zahlen zu verhandeln." },
      { titulo: "Was auf der Abrechnung zu prüfen ist", texto: "Für das Gespräch mit Arbeitgeber oder Steuerberatung." },
    ],
    pasos: {
      titulo: "Um den Steuerabzug zu prüfen",
      items: [
        F("Such den Steuerabzug auf deiner Gehaltsabrechnung und vergleiche ihn mit diesem Bericht.", "Suchen Sie den Steuerabzug auf Ihrer Gehaltsabrechnung und vergleichen Sie ihn mit diesem Bericht."),
        F("Stimmt er nicht, frag deinen Arbeitgeber, welche Einkünfte und Abzüge er berücksichtigt.", "Stimmt er nicht, fragen Sie Ihren Arbeitgeber, welche Einkünfte und Abzüge er berücksichtigt."),
        F("Bewahre diesen Bericht für die Steuererklärung auf, falls du in deinem Land eine abgeben musst.", "Bewahren Sie diesen Bericht für die Steuererklärung auf, falls Sie in Ihrem Land eine abgeben müssen."),
      ],
    },
    escenarios: { titulo: "Bei anderem Einkommen", explica: "Dieselbe Berechnung mit etwas niedrigerem und höherem Einkommen, mit denselben amtlichen Werten." },
  },
  contratacion: {
    nombre: "Kostenplan für eine Einstellung",
    tituloCorto: "Kostenplan für eine Einstellung",
    paraQuien: "Um zu wissen, was eine Einstellung wirklich kostet, mit allen Abgaben, bevor das Gehalt feststeht",
    descripcion: [
      "Ein PDF-Kostenplan mit allen Kosten der Einstellung: Gehalt, Arbeitnehmer- und Arbeitgeberbeiträge und Rückstellungen, jeder Wert mit amtlicher Quelle.",
      "Mit einer Tabelle der Kosten bei anderen Gehältern, damit das Angebot steht, bevor jede Erhöhung überrascht, und bereit für Geschäftspartner oder Steuerberatung.",
    ],
    gancho: F("Mach aus diesen Kosten einen Plan für die Entscheidung", "Machen Sie aus diesen Kosten einen Plan für die Entscheidung"),
    incluye: [
      { titulo: "Jede Abgabe einzeln", texto: "Mit Regel und amtlicher Quelle." },
      { titulo: "Die Kosten bei anderen Gehältern", texto: "Um zu verhandeln, wenn klar ist, was jede Stufe kostet." },
      { titulo: "Bereit zum Vorlegen", texto: "Für Geschäftspartner, Steuerberatung oder die Unterlagen." },
    ],
    pasos: {
      titulo: "Vor der Einstellung",
      items: [
        F("Klär mit deiner Steuerberatung, ob für deine Branche ein Tarifvertrag oder ein höherer Mindestlohn gilt.", "Klären Sie mit Ihrer Steuerberatung, ob für Ihre Branche ein Tarifvertrag oder ein höherer Mindestlohn gilt."),
        F(
          "Leg die Rückstellungen jeden Monat zur Seite: Sie werden gemeinsam zum Jahresende oder Vertragsende fällig.",
          "Legen Sie die Rückstellungen jeden Monat zur Seite: Sie werden gemeinsam zum Jahresende oder Vertragsende fällig.",
        ),
        F("Melde die Person ab dem ersten Tag an: Die Kosten in diesem Plan enthalten schon die gesetzlichen Beiträge.", "Melden Sie die Person ab dem ersten Tag an: Die Kosten in diesem Plan enthalten schon die gesetzlichen Beiträge."),
      ],
    },
    escenarios: { titulo: "Die Kosten bei anderen Gehältern", explica: "Dieselbe Berechnung mit niedrigeren und höheren Gehältern, mit denselben amtlichen Werten." },
  },
  "ajuste-inflacion": {
    nombre: "Schreiben zur Inflationsanpassung",
    tituloCorto: "Schreiben zur Inflationsanpassung",
    paraQuien: "Um die Anpassung einer Miete, Rate, Honorar oder eines Gehalts mit dem amtlichen Index zu fordern oder mitzuteilen",
    descripcion: [
      F(
        "Ein fertiges Schreiben mit deinem angepassten Betrag und dem Nachweis der Rechnung: der amtliche Index zu jedem Datum, die veröffentlichende Behörde und der Link zur Quelle.",
        "Ein fertiges Schreiben mit Ihrem angepassten Betrag und dem Nachweis der Rechnung: der amtliche Index zu jedem Datum, die veröffentlichende Behörde und der Link zur Quelle.",
      ),
      "Mit dem Nachweis vor Augen prüft die Gegenseite die Zahl in einer Minute, und das Gespräch dreht sich um den Index, nicht um die Rechnung.",
    ],
    gancho: F("Mach aus dieser Anpassung ein fertiges Schreiben, mit dem amtlichen Index als Beleg", "Machen Sie aus dieser Anpassung ein fertiges Schreiben, mit dem amtlichen Index als Beleg"),
    incluye: [
      { titulo: "Das ausgefüllte Schreiben", texto: F("Mit deinem angepassten Betrag, zum Drucken oder Senden.", "Mit Ihrem angepassten Betrag, zum Drucken oder Senden.") },
      { titulo: "Der amtliche Index als Beleg", texto: "Mit Behörde, Datum und Link zur Quelle." },
      { titulo: "Die Rechnung im Blick", texto: "Damit die Gegenseite sie selbst prüfen kann." },
    ],
    nota: {
      titulo: "Anpassungsschreiben",
      uso: F("Füll es mit den Daten der Vereinbarung aus und gib es zusammen mit der Berechnung ab.", "Füllen Sie es mit den Daten der Vereinbarung aus und geben Sie es zusammen mit der Berechnung ab."),
      pedido: "Hiermit teile ich die Anpassung des vereinbarten Betrags entsprechend der Veränderung des amtlichen Preisindex mit, wie in der beigefügten Berechnung dargestellt. Der angepasste Betrag lautet:",
      cierre: "Die Berechnung verwendet den Index der in der Aufstellung genannten Behörde, der in der angegebenen Quelle eingesehen werden kann.",
    },
  },
  regimen: {
    nombre: "Bericht zur Pauschalbesteuerung",
    tituloCorto: "Bericht zur Pauschalbesteuerung",
    paraQuien: F(
      "Um zu wissen, was du in deiner vereinfachten Besteuerung zahlst und was sich bei höherem oder niedrigerem Umsatz ändert",
      "Um zu wissen, was Sie in Ihrer vereinfachten Besteuerung zahlen und was sich bei höherem oder niedrigerem Umsatz ändert",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deinem Beitrag oder deiner Steuer in der vereinfachten Besteuerung, Schritt für Schritt mit dem amtlichen Tarif und der Quelle jedes Werts.",
        "Ein PDF-Bericht mit Ihrem Beitrag oder Ihrer Steuer in der vereinfachten Besteuerung, Schritt für Schritt mit dem amtlichen Tarif und der Quelle jedes Werts.",
      ),
      F(
        "Dazu eine Tabelle mit dem, was du bei anderen Umsätzen zahlen würdest, um eine Schwellenänderung kommen zu sehen.",
        "Dazu eine Tabelle mit dem, was Sie bei anderen Umsätzen zahlen würden, um eine Schwellenänderung kommen zu sehen.",
      ),
    ],
    gancho: F("Hol dir deine Besteuerung schriftlich und sieh, was sich bei anderem Umsatz ändert", "Erhalten Sie Ihre Besteuerung schriftlich und sehen Sie, was sich bei anderem Umsatz ändert"),
    incluye: [
      { titulo: "Die Berechnung mit dem amtlichen Tarif", texto: "Schritt für Schritt, mit der Quelle jedes Werts." },
      { titulo: "Bei anderem Umsatz", texto: "Um eine Schwellenänderung kommen zu sehen." },
      UNTERLAGEN,
    ],
    escenarios: { titulo: "Bei anderem Umsatz", explica: "Dieselbe Berechnung mit niedrigerem und höherem Umsatz, mit denselben amtlichen Werten." },
  },
  deposito: {
    nombre: "Festgeld-Vergleich",
    tituloCorto: "Festgeld-Vergleich",
    paraQuien: "Um eine Geldanlage über verschiedene Laufzeiten zu vergleichen, bevor Ort und Dauer feststehen",
    descripcion: ["Ein PDF-Bericht mit dem Ertrag der Anlage und einer Tabelle derselben Anlage bei anderen Laufzeiten, alles mit derselben Rechnung wie der Rechner."],
    gancho: F("Vergleiche deine Anlage über mehrere Laufzeiten in einem Bericht", "Vergleichen Sie Ihre Anlage über mehrere Laufzeiten in einem Bericht"),
    incluye: [
      { titulo: "Die Anlage über mehrere Laufzeiten", texto: "In einer Tabelle, zur Wahl auf einen Blick." },
      { titulo: "Die Rechnung Schritt für Schritt", texto: "Mit der Quelle jedes Werts." },
      UNTERLAGEN,
    ],
    escenarios: { titulo: "Bei anderen Laufzeiten", explica: "Dieselbe Berechnung mit anderen Laufzeiten." },
  },
  alimentos: {
    nombre: "Bericht zum Kindesunterhalt",
    tituloCorto: "Bericht zum Kindesunterhalt",
    paraQuien: "Um mit einer begründeten Zahl in die Mediation oder das Gespräch über den Unterhalt zu gehen",
    descripcion: ["Ein PDF-Bericht mit der Richtberechnung des Unterhalts, Schritt für Schritt, mit den amtlichen Werten und ihrer Quelle, und einer Tabelle für andere Einkommen."],
    gancho: F("Geh mit dieser Berechnung schriftlich in die Mediation", "Gehen Sie mit dieser Berechnung schriftlich in die Mediation"),
    incluye: [
      { titulo: "Eine begründete Berechnung", texto: "Schritt für Schritt, mit der Quelle jedes Werts." },
      { titulo: "Der Betrag bei anderen Einkommen", texto: "Um mit Szenarien vor Augen zu verhandeln." },
      { titulo: "Für Anwalt oder Mediation", texto: "Das spart die erste Stunde Rechnerei." },
    ],
    escenarios: { titulo: "Bei anderen Einkommen", explica: "Dieselbe Berechnung mit niedrigeren und höheren Einkommen." },
  },
  jubilacion: {
    nombre: "Rentenprognose",
    tituloCorto: "Rentenprognose",
    paraQuien: F(
      "Um deinen Ruhestand mit einer schriftlichen Prognose zu planen und zu sehen, was höhere Beiträge ändern",
      "Um Ihren Ruhestand mit einer schriftlichen Prognose zu planen und zu sehen, was höhere Beiträge ändern",
    ),
    descripcion: ["Ein PDF-Bericht mit der geschätzten Rente Schritt für Schritt, mit den amtlichen Werten und ihrer Quelle, und einer Tabelle der Prognose bei anderen Gehältern."],
    gancho: F("Hol dir deine Rentenprognose schriftlich", "Erhalten Sie Ihre Rentenprognose schriftlich"),
    incluye: [
      { titulo: "Die Schätzung Schritt für Schritt", texto: "Mit der Quelle jedes Werts." },
      { titulo: "Bei anderen Gehältern", texto: "Um zu sehen, was höhere Beiträge ändern." },
      UNTERLAGEN,
    ],
    escenarios: { titulo: "Bei anderen Gehältern", explica: "Dieselbe Berechnung mit niedrigeren und höheren Gehältern." },
  },
  "plan-prestamo": {
    nombre: "Kreditplan",
    tituloCorto: "Kreditplan",
    paraQuien: F("Um zu wissen, was ein Kredit dich wirklich kostet, und Angebote vor der Unterschrift zu vergleichen", "Um zu wissen, was ein Kredit Sie wirklich kostet, und Angebote vor der Unterschrift zu vergleichen"),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deinem ganzen Kredit: die Rate, die Gesamtsumme der Rückzahlung und wie viel davon Zinsen sind.",
        "Ein PDF-Bericht mit Ihrem ganzen Kredit: die Rate, die Gesamtsumme der Rückzahlung und wie viel davon Zinsen sind.",
      ),
      F(
        "Wenn du die Rate berechnet hast, stehen alle Raten einzeln darin. Dazu dieselbe Rechnung mit anderen Zinssätzen, um Bankangebote mit Zahlen zu vergleichen.",
        "Wenn Sie die Rate berechnet haben, stehen alle Raten einzeln darin. Dazu dieselbe Rechnung mit anderen Zinssätzen, um Bankangebote mit Zahlen zu vergleichen.",
      ),
    ],
    gancho: F("Vergleiche Kreditangebote mit deinen Zahlen, bevor du unterschreibst", "Vergleichen Sie Kreditangebote mit Ihren Zahlen, bevor Sie unterschreiben"),
    incluye: [
      { titulo: "Der Kredit mit anderen Zinssätzen", texto: "Um zu sehen, was ein Prozentpunkt mehr oder weniger ändert." },
      { titulo: "Die Gesamtkosten im Blick", texto: "Was an Zinsen anfällt, ohne Kleingedrucktes." },
      { titulo: "Checkliste vor der Unterschrift", texto: "Die Fragen, die sich bei der Bank lohnen." },
    ],
    pasos: {
      titulo: "Vor der Kreditunterschrift",
      items: [
        F("Frag nach dem effektiven Jahreszins mit allen Kosten, nicht nur nach dem Sollzins: Nur der taugt zum Vergleich.", "Fragen Sie nach dem effektiven Jahreszins mit allen Kosten, nicht nur nach dem Sollzins: Nur der taugt zum Vergleich."),
        F("Frag nach Bearbeitungsgebühren, Pflichtversicherungen und Kosten für eine vorzeitige Rückzahlung.", "Fragen Sie nach Bearbeitungsgebühren, Pflichtversicherungen und Kosten für eine vorzeitige Rückzahlung."),
        F("Vergleiche mindestens drei Angebote mit der Zinstabelle dieses Berichts.", "Vergleichen Sie mindestens drei Angebote mit der Zinstabelle dieses Berichts."),
        F(
          "Wähle eine Rate, die du auch in einem schlechten Monat zahlen kannst. Als Richtwert: nicht mehr als ein Drittel deines Einkommens.",
          "Wählen Sie eine Rate, die Sie auch in einem schlechten Monat zahlen können. Als Richtwert: nicht mehr als ein Drittel Ihres Einkommens.",
        ),
      ],
    },
    escenarios: ANDERE_ZINSEN,
  },
  "plan-hipoteca": {
    nombre: "Baufinanzierungsplan",
    tituloCorto: "Baufinanzierungsplan",
    paraQuien: "Um über eine Baufinanzierung mit allen Zahlen vor Augen zu entscheiden: Rate, Zinsen und was bei anderem Zinssatz passiert",
    descripcion: [
      F(
        "Ein PDF-Bericht mit deiner ganzen Finanzierung: die Rate, die Gesamtkosten und wie viel über die Jahre an Zinsen anfällt.",
        "Ein PDF-Bericht mit Ihrer ganzen Finanzierung: die Rate, die Gesamtkosten und wie viel über die Jahre an Zinsen anfällt.",
      ),
      F(
        "Er enthält alle Tabellen deiner Berechnung vollständig (die kostenlose Seite zeigt nur die ersten Zeilen) und dieselbe Rechnung mit anderen Zinssätzen. Wenn du Mieten und Kaufen verglichen hast, steht der Vergleich schriftlich da, für die Entscheidung in der Familie.",
        "Er enthält alle Tabellen Ihrer Berechnung vollständig (die kostenlose Seite zeigt nur die ersten Zeilen) und dieselbe Rechnung mit anderen Zinssätzen. Wenn Sie Mieten und Kaufen verglichen haben, steht der Vergleich schriftlich da, für die Entscheidung in der Familie.",
      ),
    ],
    gancho: F("Geh mit dem vollständigen Tilgungsplan und anderen Zinssätzen zur Bank", "Gehen Sie mit dem vollständigen Tilgungsplan und anderen Zinssätzen zur Bank"),
    incluye: [
      { titulo: "Die vollständige Tabelle", texto: "Alle Zeilen, nicht nur die ersten." },
      { titulo: "Die Finanzierung mit anderen Zinssätzen", texto: "Um zu sehen, was ein Prozentpunkt an der Rate ändert." },
      { titulo: "Fragen für die Bank", texto: "Was vor der Unterschrift zu klären ist." },
    ],
    pasos: {
      titulo: "Vor der Unterschrift",
      items: [
        F("Lass dir das Angebot schriftlich geben, mit Zinssatz, Laufzeit und Gesamtkosten inklusive Versicherungen und Gebühren.", "Lassen Sie sich das Angebot schriftlich geben, mit Zinssatz, Laufzeit und Gesamtkosten inklusive Versicherungen und Gebühren."),
        F("Frag, ob der Zins fest oder variabel ist und was mit der Rate passiert, wenn er steigt.", "Fragen Sie, ob der Zins fest oder variabel ist und was mit der Rate passiert, wenn er steigt."),
        F("Kläre, was eine vorzeitige Rückzahlung kostet und ob Sondertilgungen ohne Gebühr möglich sind.", "Klären Sie, was eine vorzeitige Rückzahlung kostet und ob Sondertilgungen ohne Gebühr möglich sind."),
        F(
          "Rechne die Nebenkosten der Immobilie (Steuern, Versicherung, Instandhaltung) zur Rate, bevor du entscheidest, was du dir leisten kannst.",
          "Rechnen Sie die Nebenkosten der Immobilie (Steuern, Versicherung, Instandhaltung) zur Rate, bevor Sie entscheiden, was Sie sich leisten können.",
        ),
      ],
    },
    escenarios: ANDERE_ZINSEN,
  },
  "plan-inversion": {
    nombre: "Spar- und Anlageplan",
    tituloCorto: "Sparplan",
    paraQuien: F(
      "Um zu sehen, wie dein Erspartes mit der Zeit wächst und was sich mit höheren Einzahlungen oder einem anderen Zinssatz ändert",
      "Um zu sehen, wie Ihr Erspartes mit der Zeit wächst und was sich mit höheren Einzahlungen oder einem anderen Zinssatz ändert",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht mit der Prognose deiner Ersparnisse: was du einzahlst, was an Zinsen dazukommt und womit du am Ende dastehst.",
        "Ein PDF-Bericht mit der Prognose Ihrer Ersparnisse: was Sie einzahlen, was an Zinsen dazukommt und womit Sie am Ende dastehen.",
      ),
      F(
        "Er enthält alle Tabellen deiner Berechnung vollständig und dieselbe Rechnung mit anderen Zinssätzen, um mit Zahlen zu entscheiden, wo du sparst.",
        "Er enthält alle Tabellen Ihrer Berechnung vollständig und dieselbe Rechnung mit anderen Zinssätzen, um mit Zahlen zu entscheiden, wo Sie sparen.",
      ),
    ],
    gancho: F("Hol dir deinen Sparplan schriftlich, Jahr für Jahr", "Erhalten Sie Ihren Sparplan schriftlich, Jahr für Jahr"),
    incluye: [
      { titulo: "Die vollständige Prognose", texto: "Alle Zeilen der Tabelle, nicht nur die ersten." },
      { titulo: "Mit anderen Zinssätzen", texto: "Um Optionen vor der Wahl zu vergleichen." },
      { titulo: "Ein Plan zum Durchhalten", texto: "Die Schritte, damit es nicht beim Vorsatz bleibt." },
    ],
    pasos: {
      titulo: "Damit der Plan aufgeht",
      items: [
        F("Richte die Sparrate für den Zahltag ein: Was du nicht siehst, gibst du nicht aus.", "Richten Sie die Sparrate für den Zahltag ein: Was Sie nicht sehen, geben Sie nicht aus."),
        F(
          "Vergleiche den Zins mit der Inflation: Ist der Zins niedriger, verliert dein Geld an Wert, auch wenn die Zahl wächst.",
          "Vergleichen Sie den Zins mit der Inflation: Ist der Zins niedriger, verliert Ihr Geld an Wert, auch wenn die Zahl wächst.",
        ),
        F("Öffne diesen Bericht einmal im Jahr und aktualisiere deine Daten.", "Öffnen Sie diesen Bericht einmal im Jahr und aktualisieren Sie Ihre Daten."),
      ],
    },
    escenarios: ANDERE_ZINSEN,
  },
  "plan-deudas": {
    nombre: "Plan zur Tilgung der Kreditkarte",
    tituloCorto: "Kreditkarten-Tilgungsplan",
    paraQuien: F(
      "Um zu wissen, wann deine Kreditkarte abbezahlt ist, was das an Zinsen kostet und wie es schneller geht",
      "Um zu wissen, wann Ihre Kreditkarte abbezahlt ist, was das an Zinsen kostet und wie es schneller geht",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deinen Schulden Monat für Monat: was du zahlst, was an Zinsen anfällt und wie der Saldo sinkt.",
        "Ein PDF-Bericht mit Ihren Schulden Monat für Monat: was Sie zahlen, was an Zinsen anfällt und wie der Saldo sinkt.",
      ),
      F(
        "Er enthält die vollständige Tabelle bis zur letzten Zahlung und dieselbe Rechnung mit anderen Raten, damit du siehst, was ein bisschen mehr pro Monat spart.",
        "Er enthält die vollständige Tabelle bis zur letzten Zahlung und dieselbe Rechnung mit anderen Raten, damit Sie sehen, was ein bisschen mehr pro Monat spart.",
      ),
    ],
    gancho: F("Sieh Monat für Monat, wann deine Karte abbezahlt ist", "Sehen Sie Monat für Monat, wann Ihre Karte abbezahlt ist"),
    incluye: [
      { titulo: "Monat für Monat bis zur letzten Zahlung", texto: "Mit den Zinsen jedes Monats." },
      { titulo: "Mit anderen Raten", texto: "Um zu sehen, wie viel früher es mit etwas mehr geht." },
      { titulo: "Ein Ausstiegsplan", texto: "Die Schritte, um schuldenfrei zu bleiben." },
    ],
    pasos: {
      titulo: "Raus aus den Schulden",
      items: [
        F("Nutze die Karte nicht, solange du sie abbezahlst: Jeder neue Kauf verlängert die Tabelle.", "Nutzen Sie die Karte nicht, solange Sie sie abbezahlen: Jeder neue Kauf verlängert die Tabelle."),
        F(
          "Zahl immer mehr als den Mindestbetrag. Auch wenig hilft, die Tabelle mit anderen Raten zeigt, wie viel.",
          "Zahlen Sie immer mehr als den Mindestbetrag. Auch wenig hilft, die Tabelle mit anderen Raten zeigt, wie viel.",
        ),
        F("Hast du mehrere Schulden, zahl zuerst die mit dem höchsten Zins und bei den anderen den Mindestbetrag.", "Haben Sie mehrere Schulden, zahlen Sie zuerst die mit dem höchsten Zins und bei den anderen den Mindestbetrag."),
        F("Frag deine Bank nach einer Umschuldung zu einem niedrigeren Zins und vergleiche sie mit diesem Bericht.", "Fragen Sie Ihre Bank nach einer Umschuldung zu einem niedrigeren Zins und vergleichen Sie sie mit diesem Bericht."),
      ],
    },
    escenarios: { titulo: "Mit anderen Monatsraten", explica: "Dieselben Schulden mit etwas weniger und etwas mehr pro Monat." },
  },
  "plan-presupuesto": {
    nombre: "Budgetplan",
    tituloCorto: "Budgetplan",
    paraQuien: F(
      "Um deinen Monat mit einem klaren Plan zu ordnen: wie viel für Fixkosten, für Wünsche und fürs Sparen",
      "Um Ihren Monat mit einem klaren Plan zu ordnen: wie viel für Fixkosten, für Wünsche und fürs Sparen",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht, der deine Rechnung in einen Plan verwandelt: wie viel wofür, in deiner Währung und mit deinen Zahlen.",
        "Ein PDF-Bericht, der Ihre Rechnung in einen Plan verwandelt: wie viel wofür, in Ihrer Währung und mit Ihren Zahlen.",
      ),
      "Mit demselben Plan bei anderen Beträgen, um vorher zu wissen, was sich in einem Monat mit mehr oder weniger Geld ändert, und den Schritten zum Durchhalten.",
    ],
    gancho: F("Mach aus dieser Rechnung einen Plan für deinen Monat", "Machen Sie aus dieser Rechnung einen Plan für Ihren Monat"),
    incluye: [
      { titulo: F("Dein Plan mit deinen Zahlen", "Ihr Plan mit Ihren Zahlen"), texto: "Wie viel wohin geht, bereit zum Umsetzen." },
      { titulo: "Mit anderen Beträgen", texto: "Um den Plan anzupassen, wenn sich der Monat ändert." },
      { titulo: "Schritte zum Durchhalten", texto: "Was ein Budget über den ersten Monat hinaus trägt." },
    ],
    pasos: {
      titulo: "Damit das Budget funktioniert",
      items: [
        F("Leg das Sparen am Zahltag zur Seite, bevor du ausgibst. Was übrig bleibt, kannst du ausgeben.", "Legen Sie das Sparen am Zahltag zur Seite, bevor Sie ausgeben. Was übrig bleibt, können Sie ausgeben."),
        F("Schreib einen Monat lang deine Ausgaben auf, auch im Handy, und vergleiche sie mit diesem Plan.", "Schreiben Sie einen Monat lang Ihre Ausgaben auf, auch im Handy, und vergleichen Sie sie mit diesem Plan."),
        F("Bau zuerst einen Notgroschen auf: So landet eine Überraschung nicht auf der Kreditkarte.", "Bauen Sie zuerst einen Notgroschen auf: So landet eine Überraschung nicht auf der Kreditkarte."),
      ],
    },
    escenarios: ANDERE_BETRAEGE,
  },
  "plan-negocio": {
    nombre: "Bericht zu den Geschäftszahlen",
    tituloCorto: "Geschäftsbericht",
    paraQuien: "Um Preise, Margen oder eine Investition mit klaren Zahlen zu entscheiden, bereit für Geschäftspartner",
    descripcion: [
      F(
        "Ein PDF-Bericht mit deiner Rechnung Schritt für Schritt erklärt: welche Daten sie nutzt, wie sie rechnet und welches Ergebnis herauskommt.",
        "Ein PDF-Bericht mit Ihrer Rechnung Schritt für Schritt erklärt: welche Daten sie nutzt, wie sie rechnet und welches Ergebnis herauskommt.",
      ),
      "Dazu eine Tabelle derselben Rechnung mit anderen Beträgen, um zu sehen, wie sich das Ergebnis ändert, wenn Kosten steigen oder der Preis sinkt.",
    ],
    gancho: F("Mach aus diesen Zahlen einen Bericht zum Entscheiden oder Überzeugen", "Machen Sie aus diesen Zahlen einen Bericht zum Entscheiden oder Überzeugen"),
    incluye: [
      { titulo: "Die Rechnung erklärt", texto: "Um sie zu verstehen und vor Partnern oder der Bank zu vertreten." },
      { titulo: "Mit anderen Beträgen", texto: "Um die Wirkung einer Preis- oder Kostenänderung vorab zu sehen." },
      { titulo: "Fragen vor der Entscheidung", texto: "Was vor einer Preisänderung zu prüfen ist." },
    ],
    pasos: {
      titulo: "Vor der Entscheidung",
      items: [
        F("Prüf, ob die Kosten alles enthalten: Versand, Gebühren, Steuern und deine eigene Zeit.", "Prüfen Sie, ob die Kosten alles enthalten: Versand, Gebühren, Steuern und Ihre eigene Zeit."),
        F("Vergleiche deinen Preis mit zwei oder drei Wettbewerbern, bevor du ihn änderst.", "Vergleichen Sie Ihren Preis mit zwei oder drei Wettbewerbern, bevor Sie ihn ändern."),
        F("Schau dir den schlechtesten Fall der Tabelle an: Hält das Geschäft dort, ist die Entscheidung sicherer.", "Schauen Sie sich den schlechtesten Fall der Tabelle an: Hält das Geschäft dort, ist die Entscheidung sicherer."),
      ],
    },
    escenarios: ANDERE_BETRAEGE,
  },
  "kit-freelance": {
    nombre: "Stundensatz-Kit für Freiberufler",
    tituloCorto: "Stundensatz-Kit",
    paraQuien: F("Um für deine Arbeit den richtigen Preis zu verlangen und deinen Satz souverän vorzustellen", "Um für Ihre Arbeit den richtigen Preis zu verlangen und Ihren Satz souverän vorzustellen"),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deinem Stundensatz erklärt: welches Einkommen du anstrebst, wie viele Stunden du wirklich abrechnest und welche Kosten er deckt.",
        "Ein PDF-Bericht mit Ihrem Stundensatz erklärt: welches Einkommen Sie anstreben, wie viele Stunden Sie wirklich abrechnen und welche Kosten er deckt.",
      ),
      F(
        "Mit dem Satz für andere Einkommensziele und einem fertigen Schreiben an Kunden mit deinem Stundensatz.",
        "Mit dem Satz für andere Einkommensziele und einem fertigen Schreiben an Kunden mit Ihrem Stundensatz.",
      ),
    ],
    gancho: F("Stell deinen Satz mit Zahlen vor, nicht mit einer Entschuldigung", "Stellen Sie Ihren Satz mit Zahlen vor, nicht mit einer Entschuldigung"),
    incluye: [
      { titulo: F("Dein Satz erklärt", "Ihr Satz erklärt"), texto: "Für die Frage, warum er so hoch ist." },
      { titulo: "Für andere Einkommensziele", texto: "Der nötige Satz für jedes Ziel." },
      { titulo: "Fertiges Preisschreiben", texto: F("Mit deiner Zahl ausgefüllt, für deine Kunden.", "Mit Ihrer Zahl ausgefüllt, für Ihre Kunden.") },
    ],
    pasos: {
      titulo: "Für den richtigen Preis",
      items: [
        F("Zähl nur abrechenbare Stunden: Meetings, Angebote und Mahnungen sind auch Arbeit.", "Zählen Sie nur abrechenbare Stunden: Meetings, Angebote und Mahnungen sind auch Arbeit."),
        F("Biete wenn möglich einen Projektpreis an: Kunden kaufen ein Ergebnis, keine Stunden.", "Bieten Sie wenn möglich einen Projektpreis an: Kunden kaufen ein Ergebnis, keine Stunden."),
        F("Überprüf deinen Satz einmal im Jahr, oder früher, wenn deine Kosten steigen.", "Überprüfen Sie Ihren Satz einmal im Jahr, oder früher, wenn Ihre Kosten steigen."),
      ],
    },
    nota: {
      titulo: "Preisschreiben",
      uso: F("Füll es mit den Kundendaten aus und schick es mit deinem Angebot.", "Füllen Sie es mit den Kundendaten aus und schicken Sie es mit Ihrem Angebot."),
      pedido: "Wie besprochen erhalten Sie hier meinen Satz für die vereinbarten Leistungen. Mein Stundensatz beträgt",
      cierre: "Der Satz deckt die Arbeitszeit und die Kosten meiner Tätigkeit. Gern erstelle ich auch ein Angebot zum Projektpreis.",
    },
    escenarios: { titulo: "Für andere Einkommensziele", explica: "Dieselbe Rechnung mit niedrigeren und höheren Einkommenszielen." },
  },
  "plan-sueldo": {
    nombre: "Gehaltsbericht",
    tituloCorto: "Gehaltsbericht",
    paraQuien: "Um ein Gehalt, ein Angebot oder eine Erhöhung zu verhandeln und zu wissen, was es pro Stunde, Monat und Jahr bedeutet",
    descripcion: [
      F("Ein PDF-Bericht mit deiner Gehaltsrechnung erklärt, mit deinen Zahlen und jedem verwendeten Wert.", "Ein PDF-Bericht mit Ihrer Gehaltsrechnung erklärt, mit Ihren Zahlen und jedem verwendeten Wert."),
      "Dazu eine Tabelle mit anderen Beträgen, um Angebote zu vergleichen oder mit klaren Zahlen eine Erhöhung zu fordern.",
    ],
    gancho: F("Verhandle dein Gehalt mit den Zahlen schwarz auf weiß", "Verhandeln Sie Ihr Gehalt mit den Zahlen schwarz auf weiß"),
    incluye: [
      { titulo: "Die vollständige Rechnung", texto: "Mit jedem eingegebenen Wert." },
      { titulo: "Mit anderen Beträgen", texto: "Um zwei Angebote in einer Minute zu vergleichen." },
      { titulo: "Tipps für die Verhandlung", texto: "Was zu sagen und zu fordern ist, neben der Zahl." },
    ],
    pasos: {
      titulo: "Für die Verhandlung",
      items: [
        F("Sprich beim Vergleich von Angeboten in Jahres- oder Stundenbeträgen: Monatsbeträge verdecken Unterschiede.", "Sprechen Sie beim Vergleich von Angeboten in Jahres- oder Stundenbeträgen: Monatsbeträge verdecken Unterschiede."),
        F("Frag auch nach dem, was kein Gehalt ist: freie Tage, Homeoffice, Weiterbildung oder ein Bonus.", "Fragen Sie auch nach dem, was kein Gehalt ist: freie Tage, Homeoffice, Weiterbildung oder ein Bonus."),
        F(
          "Komm mit einer konkreten Zahl und ihrem Grund: deine Erfahrung, der Markt oder was sich an deiner Stelle geändert hat.",
          "Kommen Sie mit einer konkreten Zahl und ihrem Grund: Ihre Erfahrung, der Markt oder was sich an Ihrer Stelle geändert hat.",
        ),
      ],
    },
    escenarios: ANDERE_BETRAEGE,
  },
  "kit-calculos": {
    nombre: "Rechnung Schritt für Schritt erklärt",
    tituloCorto: "erklärte Rechnung",
    paraQuien: "Um die Rechnung gelöst und erklärt zu haben, bereit zum Drucken, Lernen oder Zeigen",
    descripcion: [
      F("Ein PDF-Bericht mit deiner Rechnung, dem Lösungsweg und dem Ergebnis, mit deinen Zahlen.", "Ein PDF-Bericht mit Ihrer Rechnung, dem Lösungsweg und dem Ergebnis, mit Ihren Zahlen."),
      "Zum Lernen, um eine Rechnung festzuhalten oder um sie jemandem zu zeigen, ohne sie erklären zu müssen.",
    ],
    gancho: F("Nimm die Rechnung Schritt für Schritt erklärt mit", "Nehmen Sie die Rechnung Schritt für Schritt erklärt mit"),
    incluye: [
      { titulo: "Die gelöste Rechnung", texto: "Mit den Eingaben und dem Ergebnis." },
      { titulo: "Wie gerechnet wird", texto: "Um zu verstehen, woher jede Zahl kommt." },
      { titulo: "Bereit zum Drucken", texto: "Oder als PDF zum Teilen." },
    ],
    pasos: {
      titulo: "Zur Kontrolle",
      items: [
        F("Rechne rückwärts: Geh vom Ergebnis aus und komm zum Ausgangswert zurück.", "Rechnen Sie rückwärts: Gehen Sie vom Ergebnis aus und kommen Sie zum Ausgangswert zurück."),
        F("Runde erst am Ende: Rundungen bei jedem Schritt verändern das Ergebnis.", "Runden Sie erst am Ende: Rundungen bei jedem Schritt verändern das Ergebnis."),
      ],
    },
    escenarios: ANDERE_BETRAEGE,
  },
  "kit-gastos-grupo": {
    nombre: "Ausgabenübersicht der Gruppe",
    tituloCorto: "Ausgabenübersicht",
    paraQuien: "Damit alle wissen, was sie zahlen, ohne Streit und ohne Rechnen auf der Serviette",
    descripcion: [
      "Eine PDF-Übersicht der Gruppenrechnung: die Summe, der Anteil jeder Person und, falls nötig, wer wem was schuldet.",
      "Per Nachricht teilen oder ausdrucken, damit niemand neu rechnen muss.",
    ],
    gancho: F("Teile die Rechnung mit der Gruppe, klar und ohne Streit", "Teilen Sie die Rechnung mit der Gruppe, klar und ohne Streit"),
    incluye: [
      { titulo: "Was jede Person zahlt", texto: "Mit Summe und Details im Blick." },
      { titulo: "Bereit zum Teilen", texto: "Als PDF für die Gruppe." },
      { titulo: "Mit anderen Summen", texto: "Falls noch etwas dazukommt." },
    ],
    pasos: {
      titulo: "Zum Abrechnen",
      items: [
        F("Schick die Übersicht an die Gruppe, bevor jemand zahlt: Das vermeidet Missverständnisse.", "Schicken Sie die Übersicht an die Gruppe, bevor jemand zahlt: Das vermeidet Missverständnisse."),
        "Einigt euch auf eine Zahlungsart und einen Termin zum Ausgleichen.",
      ],
    },
    escenarios: { titulo: "Mit anderen Summen", explica: "Dieselbe Aufteilung bei etwas niedrigerer oder höherer Summe." },
  },
  "kit-estudio": {
    nombre: "Notendurchschnitt-Bericht",
    tituloCorto: "Notenbericht",
    paraQuien: F("Um deinen Durchschnitt klar und schriftlich zu haben, mit der Gewichtung jeder Note", "Um Ihren Durchschnitt klar und schriftlich zu haben, mit der Gewichtung jeder Note"),
    descripcion: [
      F("Ein PDF-Bericht mit deinem Durchschnitt: jede Note, ihre Gewichtung und der Weg zum Ergebnis.", "Ein PDF-Bericht mit Ihrem Durchschnitt: jede Note, ihre Gewichtung und der Weg zum Ergebnis."),
      "Um eine Note zu prüfen, die nächste Prüfung zu planen oder die Rechnung vorzulegen.",
    ],
    gancho: F("Hol dir deinen Durchschnitt schriftlich erklärt", "Erhalten Sie Ihren Durchschnitt schriftlich erklärt"),
    incluye: [
      { titulo: "Jede Note mit Gewichtung", texto: "Um zu sehen, welche am meisten zählt." },
      { titulo: "Die Rechnung Schritt für Schritt", texto: "Zum Prüfen oder Vorzeigen." },
      { titulo: "Ideen für die nächste Prüfung", texto: "Wie der Durchschnitt beim Planen hilft." },
    ],
    pasos: {
      titulo: "Für die nächste Prüfung",
      items: [
        F("Schau, welche Note am meisten zählt, und gib diesem Fach oder dieser Prüfung mehr Zeit.", "Schauen Sie, welche Note am meisten zählt, und geben Sie diesem Fach oder dieser Prüfung mehr Zeit."),
        F("Wirkt eine Note falsch berechnet, zeig diesen Bericht deiner Lehrkraft.", "Wirkt eine Note falsch berechnet, zeigen Sie diesen Bericht Ihrer Lehrkraft."),
      ],
    },
  },
  "kit-fechas": {
    nombre: "Bericht zu Daten und Fristen",
    tituloCorto: "Fristenbericht",
    paraQuien: "Um ein Datum oder eine Frist schriftlich berechnet zu haben, bereit zum Vorlegen oder als Erinnerung",
    descripcion: [
      F("Ein PDF-Bericht mit deiner Datumsberechnung: die eingegebenen Daten, das Ergebnis und wie gezählt wird.", "Ein PDF-Bericht mit Ihrer Datumsberechnung: die eingegebenen Daten, das Ergebnis und wie gezählt wird."),
      "Für Behördengänge, Verträge, Fälligkeiten oder einfach, um das Datum festzuhalten.",
    ],
    gancho: F("Halte dieses Datum schriftlich fest, bereit zum Vorlegen", "Halten Sie dieses Datum schriftlich fest, bereit zum Vorlegen"),
    incluye: [
      { titulo: "Die Berechnung erklärt", texto: "Mit den Daten und wie die Tage gezählt werden." },
      { titulo: "Bereit zum Vorlegen", texto: "Bei der Behörde oder zum Vertrag." },
      UNTERLAGEN,
    ],
    pasos: {
      titulo: "Bevor du ein Datum verwendest",
      items: [
        F("Prüf, ob die Frist in Kalender- oder Werktagen zählt: Das ändert das Ergebnis.", "Prüfen Sie, ob die Frist in Kalender- oder Werktagen zählt: Das ändert das Ergebnis."),
        F("Schau, ob der letzte Tag auf einen Feiertag oder ein Wochenende fällt.", "Schauen Sie, ob der letzte Tag auf einen Feiertag oder ein Wochenende fällt."),
        F("Trag die Frist mit einer Erinnerung ein paar Tage vorher in deinen Kalender ein.", "Tragen Sie die Frist mit einer Erinnerung ein paar Tage vorher in Ihren Kalender ein."),
      ],
    },
  },
  "plan-salud": {
    nombre: "BMI- und Kalorienbericht",
    tituloCorto: "BMI- und Kalorienbericht",
    paraQuien: F("Um deine Werte zu Gewicht und Energie schriftlich zu haben und zum Termin mitzunehmen", "Um Ihre Werte zu Gewicht und Energie schriftlich zu haben und zum Termin mitzunehmen"),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deinem Ergebnis erklärt: was es misst, wie es berechnet wird und in welchem Bereich es liegt, mit deinen Daten.",
        "Ein PDF-Bericht mit Ihrem Ergebnis erklärt: was es misst, wie es berechnet wird und in welchem Bereich es liegt, mit Ihren Daten.",
      ),
      "Allgemeine Informationen für das Gespräch mit medizinischem Fachpersonal. Keine Diagnose und kein Ersatz für einen Termin.",
    ],
    gancho: F("Nimm deine Werte erklärt und schriftlich mit zum Termin", "Nehmen Sie Ihre Werte erklärt und schriftlich mit zum Termin"),
    incluye: [
      { titulo: "Das Ergebnis erklärt", texto: "Was es misst und wie es berechnet wird." },
      { titulo: "Fragen für den Termin", texto: "Um mehr aus dem Gespräch zu holen." },
      { titulo: "Um den Verlauf zu verfolgen", texto: F("Heb jeden Bericht auf und vergleiche über die Zeit.", "Heben Sie jeden Bericht auf und vergleichen Sie über die Zeit.") },
    ],
    pasos: {
      titulo: "Für das Gespräch mit Fachleuten",
      items: [
        F("Bring diesen Bericht mit und frag, welcher Bereich für dich gesund ist, nach Alter und Vorgeschichte.", "Bringen Sie diesen Bericht mit und fragen Sie, welcher Bereich für Sie gesund ist, nach Alter und Vorgeschichte."),
        F("Erzähl, wie du isst, wie viel du dich bewegst und wie du schläfst: Zahlen allein sagen nicht alles.", "Erzählen Sie, wie Sie essen, wie viel Sie sich bewegen und wie Sie schlafen: Zahlen allein sagen nicht alles."),
        F("Ändere Ernährung oder Training nicht stark, ohne vorher Rat einzuholen.", "Ändern Sie Ernährung oder Training nicht stark, ohne vorher Rat einzuholen."),
      ],
    },
    aviso: "Allgemeine Informationen. Sie ersetzen keine Beratung durch medizinisches Fachpersonal.",
  },
  "plan-embarazo": {
    nombre: "Bericht zu Fruchtbarkeit und Schwangerschaft",
    tituloCorto: "Schwangerschaftsbericht",
    paraQuien: F("Um deine geschätzten Termine schriftlich zu haben und zur nächsten Vorsorge mitzunehmen", "Um Ihre geschätzten Termine schriftlich zu haben und zur nächsten Vorsorge mitzunehmen"),
    descripcion: [
      F(
        "Ein PDF-Bericht mit deinen geschätzten Terminen und wie jeder berechnet wird, mit deinen Eingaben.",
        "Ein PDF-Bericht mit Ihren geschätzten Terminen und wie jeder berechnet wird, mit Ihren Eingaben.",
      ),
      "Die Termine sind Schätzungen: Jeder Körper und jede Schwangerschaft ist anders. Sie helfen beim Planen und im Gespräch mit Fachleuten und ersetzen keine Vorsorge.",
    ],
    gancho: F("Hab deine Termine schriftlich für die nächste Vorsorge", "Haben Sie Ihre Termine schriftlich für die nächste Vorsorge"),
    incluye: [
      { titulo: "Die geschätzten Termine", texto: "Mit der Berechnung jedes einzelnen." },
      { titulo: "Fragen für die Vorsorge", texto: "Um den Termin gut zu nutzen." },
      UNTERLAGEN,
    ],
    pasos: {
      titulo: "Für die nächste Vorsorge",
      items: [
        F("Bring diesen Bericht und das Datum deiner letzten Periode mit.", "Bringen Sie diesen Bericht und das Datum Ihrer letzten Periode mit."),
        F("Frag, welche Untersuchungen in deiner Woche anstehen und wann der nächste Termin ist.", "Fragen Sie, welche Untersuchungen in Ihrer Woche anstehen und wann der nächste Termin ist."),
        F("Bei beunruhigenden Beschwerden geh sofort zur Ärztin oder zum Arzt, ohne auf die Termine im Bericht zu warten.", "Bei beunruhigenden Beschwerden gehen Sie sofort zur Ärztin oder zum Arzt, ohne auf die Termine im Bericht zu warten."),
      ],
    },
    aviso: "Allgemeine Informationen. Die Termine sind Schätzungen und ersetzen keine Betreuung durch medizinisches Fachpersonal.",
  },
  "plan-entrenamiento": {
    nombre: "Bericht zum Lauftempo",
    tituloCorto: "Tempobericht",
    paraQuien: F("Um mit deinem Zieltempo loszulaufen und zu wissen, wie du die Kraft einteilst", "Um mit Ihrem Zieltempo loszulaufen und zu wissen, wie Sie die Kraft einteilen"),
    descripcion: [
      F("Ein PDF-Bericht mit deinem Tempo, deiner Zeit und deiner Geschwindigkeit erklärt, mit deinen Eingaben.", "Ein PDF-Bericht mit Ihrem Tempo, Ihrer Zeit und Ihrer Geschwindigkeit erklärt, mit Ihren Eingaben."),
      "Er enthält alle Tabellen der Berechnung vollständig und Tipps für das Tempo im Training.",
    ],
    gancho: F("Hab dein Tempo schriftlich für den Wettkampftag", "Haben Sie Ihr Tempo schriftlich für den Wettkampftag"),
    incluye: [
      { titulo: "Das Tempo erklärt", texto: "Mit Zeit und Geschwindigkeit." },
      { titulo: "Zum Ausdrucken und Mitnehmen", texto: "In der Tasche oder am Kühlschrank." },
      { titulo: "Trainingstipps", texto: "Wie man das Tempo ohne Verletzung nutzt." },
    ],
    pasos: {
      titulo: "So nutzt du das Tempo",
      items: [
        F("Lauf die ersten Minuten etwas langsamer als das Ziel: Das Ende dankt es dir.", "Laufen Sie die ersten Minuten etwas langsamer als das Ziel: Das Ende dankt es Ihnen."),
        F("Trainier die meiste Zeit in einem lockeren Tempo, bei dem du noch reden kannst.", "Trainieren Sie die meiste Zeit in einem lockeren Tempo, bei dem Sie noch reden können."),
        F("Wenn etwas wehtut, hör auf und lass es abklären: Das Tempo kann warten.", "Wenn etwas wehtut, hören Sie auf und lassen Sie es abklären: Das Tempo kann warten."),
      ],
    },
    aviso: "Allgemeine Informationen. Sie ersetzen keine Beratung durch Fachleute aus Medizin oder Sport.",
  },
  "kit-viaje": {
    nombre: "Spritkosten der Reise",
    tituloCorto: "Spritkostenplan",
    paraQuien: F("Um zu wissen, was du für Sprit ausgibst, und es unter allen Mitreisenden aufzuteilen", "Um zu wissen, was Sie für Sprit ausgeben, und es unter allen Mitreisenden aufzuteilen"),
    descripcion: [
      F(
        "Ein PDF-Bericht mit den Spritkosten deiner Reise, mit deinen Zahlen: Strecke, Verbrauch und Preis.",
        "Ein PDF-Bericht mit den Spritkosten Ihrer Reise, mit Ihren Zahlen: Strecke, Verbrauch und Preis.",
      ),
      "Dazu eine Tabelle mit anderen Spritpreisen, falls sie sich vor der Abfahrt ändern, und eine Liste für die übrigen Reisekosten.",
    ],
    gancho: F("Hab die Reisekosten schriftlich, bevor du losfährst", "Haben Sie die Reisekosten schriftlich, bevor Sie losfahren"),
    incluye: [
      { titulo: "Die Kosten der Reise", texto: "Mit Strecke, Verbrauch und Preis." },
      { titulo: "Bei anderen Preisen", texto: "Falls der Sprit vor der Abfahrt teurer wird." },
      { titulo: "Liste für die restliche Reise", texto: "Maut, Parken und Essen." },
    ],
    pasos: {
      titulo: "Um die Reise zu planen",
      items: [
        F("Rechne Maut, Parken und Essen zu den Spritkosten dazu.", "Rechnen Sie Maut, Parken und Essen zu den Spritkosten dazu."),
        F("Reist ihr zu mehreren, teil die Summe und sag allen vor der Abfahrt Bescheid.", "Reisen Sie zu mehreren, teilen Sie die Summe und sagen Sie allen vor der Abfahrt Bescheid."),
        F("Prüf den Reifendruck: Mit zu wenig Druck verbraucht das Auto mehr.", "Prüfen Sie den Reifendruck: Mit zu wenig Druck verbraucht das Auto mehr."),
      ],
    },
    escenarios: { titulo: "Bei anderen Preisen", explica: "Dieselbe Reise mit etwas günstigerem und teurerem Sprit." },
  },
  "kit-hogar": {
    nombre: "Stromkostenbericht",
    tituloCorto: "Stromkostenbericht",
    paraQuien: F("Um zu wissen, was jedes Gerät dich kostet und wo du bei der Stromrechnung sparen kannst", "Um zu wissen, was jedes Gerät Sie kostet und wo Sie bei der Stromrechnung sparen können"),
    descripcion: [
      F("Ein PDF-Bericht mit den Kosten deines Geräts, mit deinen Nutzungszahlen und dem Strompreis.", "Ein PDF-Bericht mit den Kosten Ihres Geräts, mit Ihren Nutzungszahlen und dem Strompreis."),
      "Dazu eine Tabelle mit anderen Strompreisen und eine Liste mit Ideen, um die Rechnung zu senken.",
    ],
    gancho: F("Finde heraus, was dieses Gerät dich kostet und wie es günstiger geht", "Finden Sie heraus, was dieses Gerät Sie kostet und wie es günstiger geht"),
    incluye: [
      { titulo: "Die Kosten nach Nutzung", texto: "Schritt für Schritt erklärt." },
      { titulo: "Bei anderen Preisen", texto: "Falls der Tarif steigt." },
      { titulo: "Ideen zum Sparen", texto: "Die, die man auf der Rechnung am meisten merkt." },
    ],
    pasos: {
      titulo: "Um die Rechnung zu senken",
      items: [
        F("Zieh den Stecker bei Geräten im Standby: Auch ausgeschaltete Geräte verbrauchen Strom.", "Ziehen Sie den Stecker bei Geräten im Standby: Auch ausgeschaltete Geräte verbrauchen Strom."),
        F("Nutze stromhungrige Geräte zur günstigsten Tageszeit, wenn dein Tarif das vorsieht.", "Nutzen Sie stromhungrige Geräte zur günstigsten Tageszeit, wenn Ihr Tarif das vorsieht."),
        F("Vergleiche diesen Bericht mit deiner Rechnung, um den Anteil dieses Geräts zu sehen.", "Vergleichen Sie diesen Bericht mit Ihrer Rechnung, um den Anteil dieses Geräts zu sehen."),
      ],
    },
    escenarios: { titulo: "Bei anderen Preisen", explica: "Derselbe Verbrauch mit etwas günstigerem und teurerem Strom." },
  },
  "kit-obra": {
    nombre: "Materialliste für das Bauprojekt",
    tituloCorto: "Materialliste",
    paraQuien: "Um Material in der richtigen Menge zu kaufen, ohne dass etwas fehlt oder übrig bleibt",
    descripcion: [
      F(
        "Ein PDF-Bericht mit deiner Materialberechnung: Maße, Mengen und Rechenweg, bereit für den Baumarkt.",
        "Ein PDF-Bericht mit Ihrer Materialberechnung: Maße, Mengen und Rechenweg, bereit für den Baumarkt.",
      ),
      "Mit einer Checkliste für den Einkauf: Zuschlag für Verschnitt, was zu fragen und was vor dem Start zu prüfen ist.",
    ],
    gancho: F("Geh mit der Materialliste in der Hand in den Baumarkt", "Gehen Sie mit der Materialliste in der Hand in den Baumarkt"),
    incluye: [
      { titulo: "Maße und Mengen", texto: "Alles Berechnete auf einer Seite." },
      { titulo: "Zum Vorzeigen im Markt", texto: "Damit genau das Richtige angeboten wird." },
      { titulo: "Checkliste für den Einkauf", texto: "Verschnittzuschlag und was zu prüfen ist." },
    ],
    pasos: {
      titulo: "Vor dem Kauf",
      items: [
        F("Rechne 5 bis 10 % für Verschnitt und Bruch dazu, bei unregelmäßigen Formen mehr.", "Rechnen Sie 5 bis 10 % für Verschnitt und Bruch dazu, bei unregelmäßigen Formen mehr."),
        F("Kauf alles aus derselben Charge: Farbe und Ton können sich von Charge zu Charge unterscheiden.", "Kaufen Sie alles aus derselben Charge: Farbe und Ton können sich von Charge zu Charge unterscheiden."),
        F("Lass dir die Ergiebigkeit des gewählten Produkts bestätigen: Sie variiert je nach Marke.", "Lassen Sie sich die Ergiebigkeit des gewählten Produkts bestätigen: Sie variiert je nach Marke."),
        F("Heb Kassenbon und ungeöffnete Reste auf: Viele Märkte nehmen sie zurück.", "Heben Sie Kassenbon und ungeöffnete Reste auf: Viele Märkte nehmen sie zurück."),
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Mehrwertsteuer-Bericht",
    tituloCorto: "Mehrwertsteuer-Bericht",
    paraQuien: F(
      "Um eine Rechnung zu stellen oder einen Preis mit sauber getrennter Steuer zu prüfen, bereit für deine Unterlagen oder die Steuerberatung",
      "Um eine Rechnung zu stellen oder einen Preis mit sauber getrennter Steuer zu prüfen, bereit für Ihre Unterlagen oder die Steuerberatung",
    ),
    descripcion: [
      F("Ein PDF-Bericht mit deiner Rechnung: Nettopreis, Steuer und Bruttopreis, mit dem geltenden Satz und seiner Quelle.", "Ein PDF-Bericht mit Ihrer Rechnung: Nettopreis, Steuer und Bruttopreis, mit dem geltenden Satz und seiner Quelle."),
      "Dazu eine Tabelle mit anderen Beträgen, praktisch für eine Preisliste netto und brutto.",
    ],
    gancho: F("Hab den Preis netto und brutto schriftlich", "Haben Sie den Preis netto und brutto schriftlich"),
    incluye: [
      { titulo: "Die Steuer getrennt", texto: "Netto, Steuer und Brutto, mit dem geltenden Satz." },
      { titulo: "Mit anderen Beträgen", texto: "Für eine Preisliste in einem Rutsch." },
      { titulo: "Für die Steuerberatung", texto: "Mit Quelle des Satzes und Datum." },
    ],
    pasos: {
      titulo: "Vor der Rechnungsstellung",
      items: [
        F("Prüf, ob für dein Produkt oder deine Leistung der Regelsatz oder ein ermäßigter Satz gilt.", "Prüfen Sie, ob für Ihr Produkt oder Ihre Leistung der Regelsatz oder ein ermäßigter Satz gilt."),
        F("Achte darauf, dass die Rechnung Netto und Steuer getrennt ausweist, wo das vorgeschrieben ist.", "Achten Sie darauf, dass die Rechnung Netto und Steuer getrennt ausweist, wo das vorgeschrieben ist."),
        F("Heb diesen Bericht zusammen mit der Rechnung für deine Unterlagen auf.", "Heben Sie diesen Bericht zusammen mit der Rechnung für Ihre Unterlagen auf."),
      ],
    },
    escenarios: ANDERE_BETRAEGE,
  },
  "informe-calculo": {
    nombre: "Berechnungsbericht",
    tituloCorto: "Berechnungsbericht",
    paraQuien: F(
      "Um diese Berechnung schriftlich zu haben, mit deinen Zahlen, ihren Annahmen und der Quelle jedes amtlichen Werts",
      "Um diese Berechnung schriftlich zu haben, mit Ihren Zahlen, ihren Annahmen und der Quelle jedes amtlichen Werts",
    ),
    descripcion: [
      F(
        "Ein PDF-Bericht über die Berechnung, die du gerade gemacht hast, Schritt für Schritt mit deinen Angaben: das Ergebnis, die Annahmen dahinter und jeder amtliche Wert mit Quelle und Prüfdatum.",
        "Ein PDF-Bericht über die Berechnung, die Sie gerade gemacht haben, Schritt für Schritt mit Ihren Angaben: das Ergebnis, die Annahmen dahinter und jeder amtliche Wert mit Quelle und Prüfdatum.",
      ),
      F(
        "Zum Ablegen oder um ihn deiner Steuerberatung, deinem Arbeitgeber oder anderen zu zeigen, die ihn prüfen müssen, ohne jede Zahl neu zu erklären.",
        "Zum Ablegen oder um ihn Ihrer Steuerberatung, Ihrem Arbeitgeber oder anderen zu zeigen, die ihn prüfen müssen, ohne jede Zahl neu zu erklären.",
      ),
    ],
    gancho: F("Nimm diese Berechnung schriftlich mit, samt Quellen", "Nehmen Sie diese Berechnung schriftlich mit, samt Quellen"),
    incluye: [
      { titulo: "Das Ergebnis mit den Angaben", texto: "Genau wie berechnet, druckfertig." },
      { titulo: "Wie gerechnet wird", texto: "Die Schritte und Annahmen, damit jede Zahl nachvollziehbar ist." },
      { titulo: "Die amtlichen Quellen", texto: "Jeder Wert mit Behörde, Link und Prüfdatum." },
    ],
    pasos: {
      titulo: "Vor der Verwendung",
      items: [
        F("Prüfe, ob die Angaben oben deine sind: Das Ergebnis hängt davon ab.", "Prüfen Sie, ob die Angaben oben Ihre sind: Das Ergebnis hängt davon ab."),
        F(
          "Hat sich ein amtlicher Wert geändert, rechne neu: Der Bericht nutzt die am Kauftag gültigen Werte.",
          "Hat sich ein amtlicher Wert geändert, rechnen Sie neu: Der Bericht nutzt die am Kauftag gültigen Werte.",
        ),
      ],
    },
  },
};

export const de: DiccionarioVenta = {
  familias,
  general: { si: "Ja", no: "Nein" },
  tarjeta: {
    cejaInforme: "PDF-Bericht",
    cejaPlanilla: "Excel-Tabelle",
    pagoUnico: "Einmalzahlung",
    comprarInforme: F("Bericht holen", "Bericht erhalten"),
    comprarPlanilla: F("Tabelle holen", "Tabelle erhalten"),
    confianza: F(
      "Du zahlst mit PayPal oder Karte. Wenn es dir nicht hilft, erstatten wir das Geld innerhalb von 7 Tagen.",
      "Sie zahlen mit PayPal oder Karte. Wenn es Ihnen nicht hilft, erstatten wir das Geld innerhalb von 7 Tagen.",
    ),
    verDetalle: "Inhalt ansehen",
    tambien: F("Das könnte dir auch helfen:", "Das könnte Ihnen auch helfen:"),
    tablasOficiales: "Amtliche Tabellen",
    bajadaInforme: F(
      "Der Bericht schlüsselt es Schritt für Schritt auf, mit deinen Zahlen und der Quelle jedes Werts, bereit zum Drucken oder Speichern als PDF.",
      "Der Bericht schlüsselt es Schritt für Schritt auf, mit Ihren Zahlen und der Quelle jedes Werts, bereit zum Drucken oder Speichern als PDF.",
    ),
    bajadaPlanilla: F(
      "Die Tabelle enthält es mit deinen Zahlen und sichtbaren Formeln, damit du alles ändern kannst.",
      "Die Tabelle enthält es mit Ihren Zahlen und sichtbaren Formeln, damit Sie alles ändern können.",
    ),
    bajadaPlanillaHoja: F(
      "Die Tabelle enthält es im Blatt „{hoja}“ mit deinen Zahlen und sichtbaren Formeln, damit du alles ändern kannst.",
      "Die Tabelle enthält es im Blatt „{hoja}“ mit Ihren Zahlen und sichtbaren Formeln, damit Sie alles ändern können.",
    ),
    equivale: "Etwa {monto} zum heutigen Wechselkurs.",
    cobroDolares: "Abgerechnet in US-Dollar.",
  },
  aviso: {
    pronto: "Bald erhältlich",
    titulo: F("Sag mir Bescheid, wenn es verfügbar ist", "Benachrichtigen Sie mich, wenn es verfügbar ist"),
    ayuda: F("Wir schreiben dir nur einmal, sobald es erhältlich ist.", "Wir schreiben Ihnen nur einmal, sobald es erhältlich ist."),
    boton: "Benachrichtigen",
    listo: F("Erledigt. Wir melden uns an diese Adresse, sobald es erhältlich ist.", "Erledigt. Wir melden uns an diese Adresse, sobald es erhältlich ist."),
    error: F(
      "Die Adresse konnte nicht gespeichert werden. Prüf die Schreibweise und versuch es noch einmal.",
      "Die Adresse konnte nicht gespeichert werden. Prüfen Sie die Schreibweise und versuchen Sie es noch einmal.",
    ),
    correo: F("Deine E-Mail", "Ihre E-Mail"),
  },
  planilla: {
    gancho: F("Nimm diese Rechnung mit nach Excel, mit deinen Daten schon eingetragen", "Nehmen Sie diese Rechnung mit nach Excel, mit Ihren Daten schon eingetragen"),
    incluye: [
      { titulo: "Daten schon eingetragen", texto: "Eine gelbe Zelle ändern, und alles rechnet neu." },
      { titulo: "Gehalt, Sonderzahlungen und Abrechnung", texto: "In einer Datei für das ganze Jahr." },
      { titulo: "Aktuell bei jeder amtlichen Änderung", texto: "Derselbe Link liefert die neue Version, ohne erneut zu zahlen." },
    ],
  },
  informe: {
    tusDatos: F("Deine Daten", "Ihre Daten"),
    resultado: "Ergebnis",
    corregir: "Meine Daten korrigieren",
    actualizar: "Bericht aktualisieren",
    imprimir: "Drucken oder als PDF speichern",
    imprimirAyuda: F("Wähle im Druckfenster „Als PDF speichern“, um die Datei zu erhalten.", "Wählen Sie im Druckfenster „Als PDF speichern“, um die Datei zu erhalten."),
    sinResultado: F("Trag deine Daten unter „Meine Daten korrigieren“ ein, um den Bericht zu erstellen.", "Tragen Sie Ihre Daten unter „Meine Daten korrigieren“ ein, um den Bericht zu erstellen."),
    lugar: "Ort und Datum",
    destinatario: "An",
    firma: "Unterschrift",
    nombre: "Name",
    documento: "Ausweisnummer",
    etiquetaEnMinuscula: false,
    comoSeCalcula: "So wird gerechnet",
    fuentes: "Amtliche Quellen",
    verificado: "geprüft am",
    emitido: "Ausgestellt am",
    valores: "Amtliche Werte gültig am",
    numero: "Bericht",
    elegir: F("Wähle die Berechnung für den Bericht:", "Wählen Sie die Berechnung für den Bericht:"),
    legal: F(
      "Dieser Bericht ist eine Schätzung auf Grundlage der angegebenen Regeln und amtlichen Werte zum angegebenen Datum. Er ersetzt weder fachliche Beratung noch die Entscheidung der zuständigen Behörde. Weicht eine deiner Angaben ab, ändert sich das Ergebnis: Korrigiere sie und drucke erneut.",
      "Dieser Bericht ist eine Schätzung auf Grundlage der angegebenen Regeln und amtlichen Werte zum angegebenen Datum. Er ersetzt weder fachliche Beratung noch die Entscheidung der zuständigen Behörde. Weicht eine Ihrer Angaben ab, ändert sich das Ergebnis: Korrigieren Sie sie und drucken Sie erneut.",
    ),
    legalSinFuentes: F(
      "Dieser Bericht ist eine Schätzung auf Grundlage deiner Eingaben zum angegebenen Datum. Er ersetzt keine fachliche Beratung. Ändert sich eine Angabe, ändert sich auch das Ergebnis: Korrigiere sie und drucke erneut.",
      "Dieser Bericht ist eine Schätzung auf Grundlage Ihrer Eingaben zum angegebenen Datum. Er ersetzt keine fachliche Beratung. Ändert sich eine Angabe, ändert sich auch das Ergebnis: Korrigieren Sie sie und drucken Sie erneut.",
    ),
    errorTitulo: "Dieser Bericht ließ sich nicht öffnen",
    error: F(
      "Wir konnten die Zahlung für diesen Link nicht bestätigen. Wenn das Geld abgebucht wurde, schreib uns, und wir klären das. Wurde der Kauf nicht abgeschlossen, kannst du ihn wiederholen.",
      "Wir konnten die Zahlung für diesen Link nicht bestätigen. Wenn das Geld abgebucht wurde, schreiben Sie uns, und wir klären das. Wurde der Kauf nicht abgeschlossen, können Sie ihn wiederholen.",
    ),
    verificar: F(
      "Wir konnten die Zahlung gerade nicht prüfen. Versuch es in ein paar Minuten noch einmal: Du musst nicht erneut zahlen.",
      "Wir konnten die Zahlung gerade nicht prüfen. Versuchen Sie es in ein paar Minuten noch einmal: Sie müssen nicht erneut zahlen.",
    ),
    cupo: F("Zu viele Versuche hintereinander. Warte ein paar Minuten und öffne den Link erneut.", "Zu viele Versuche hintereinander. Warten Sie ein paar Minuten und öffnen Sie den Link erneut."),
  },
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Jedes Mal, wenn sich ein amtlicher Wert der Berechnung ändert",
    planillaDescripcion: F(
      "Eine fertige Excel-Tabelle: Du trägst deine Daten in die gelben Zellen ein, und die Rechnung läuft von selbst, mit Formeln nach {normas}.",
      "Eine fertige Excel-Tabelle: Sie tragen Ihre Daten in die gelben Zellen ein, und die Rechnung läuft von selbst, mit Formeln nach {normas}.",
    ),
    planillaIncluye: "Sie enthält {incluye}. Jedes Blatt zeigt die Schritte, und das Blatt mit den amtlichen Tabellen nennt jeden Wert mit Quelle und Prüfdatum.",
  },
  planillas: {
    migaPlanillas: "Tabellen und Berichte",
    catalogoTitulo: "Tabellen und Berichte für {pais}",
    catalogoBajada: F(
      "Excel-Tabellen und PDF-Berichte mit deinen Zahlen und den amtlichen Daten des Landes. Du zahlst einmal, ohne Abo.",
      "Excel-Tabellen und PDF-Berichte mit Ihren Zahlen und den amtlichen Daten des Landes. Sie zahlen einmal, ohne Abo.",
    ),
    seccionPlanillas: "Excel-Tabellen",
    seccionInformes: "PDF-Berichte",
    catalogoVacio: F(
      "Bald findest du hier Tabellen für {pais}. Bis dahin sind die Rechner kostenlos.",
      "Bald finden Sie hier Tabellen für {pais}. Bis dahin sind die Rechner kostenlos.",
    ),
    verCalculadoras: "Zu den Rechnern",
    comprar: "Für {precio} kaufen",
    pronto: "Bald erhältlich",
    incluye: "Was enthalten ist",
    incluyeInforme: [
      F("Der Bericht mit deinen Zahlen, auf einer Seite zum Drucken oder Speichern als PDF.", "Der Bericht mit Ihren Zahlen, auf einer Seite zum Drucken oder Speichern als PDF."),
      F(
        "Ein Link, der nicht abläuft: Du kannst deine Daten korrigieren und jederzeit neu drucken.",
        "Ein Link, der nicht abläuft: Sie können Ihre Daten korrigieren und jederzeit neu drucken.",
      ),
      F("Wenn es dir nicht hilft, erstatten wir das Geld innerhalb von 7 Tagen.", "Wenn es Ihnen nicht hilft, erstatten wir das Geld innerhalb von 7 Tagen."),
    ],
    incluyePlanilla: [
      "Die .xlsx-Datei, die sich in Excel und Google Sheets öffnet.",
      "Die Updates: {disparador}, wir aktualisieren sie, und derselbe Link lädt die neue Version.",
      F("Wenn es dir nicht hilft, erstatten wir das Geld innerhalb von 7 Tagen.", "Wenn es Ihnen nicht hilft, erstatten wir das Geld innerhalb von 7 Tagen."),
    ],
    pagoUnico: F("Einmalzahlung mit PayPal. Du kannst mit deinem Konto oder per Karte zahlen.", "Einmalzahlung mit PayPal. Sie können mit Ihrem Konto oder per Karte zahlen."),
    comprarPlanilla: "{titulo} kaufen",
    comprarBajadaInforme: F("Wir schicken dir den Link zum Bericht an diese Adresse, sobald die Zahlung bestätigt ist.", "Wir schicken Ihnen den Link zum Bericht an diese Adresse, sobald die Zahlung bestätigt ist."),
    comprarBajadaPlanilla: F("Wir schicken dir die Tabelle an diese Adresse, sobald die Zahlung bestätigt ist.", "Wir schicken Ihnen die Tabelle an diese Adresse, sobald die Zahlung bestätigt ist."),
    etiquetaEmail: F("Deine E-Mail", "Ihre E-Mail"),
    seguirPago: "Weiter zur Zahlung",
    privacidad: F("Wir nutzen die E-Mail nur, um dir deinen Kauf und seine Updates zu schicken.", "Wir nutzen die E-Mail nur, um Ihnen Ihren Kauf und seine Updates zu schicken."),
    datosTitulo: F("Mit den Zahlen deiner Berechnung", "Mit den Zahlen Ihrer Berechnung"),
    datosUsar: F(
      "Diese Zahlen für meinen Kauf verwenden. Sie werden nur gespeichert, um deinen Kauf vorzubereiten.",
      "Diese Zahlen für meinen Kauf verwenden. Sie werden nur gespeichert, um Ihren Kauf vorzubereiten.",
    ),
    errores: {
      email: F("Prüf die E-Mail-Adresse: Es scheint etwas zu fehlen.", "Prüfen Sie die E-Mail-Adresse: Es scheint etwas zu fehlen."),
      error: F(
        "Die Zahlung konnte nicht gestartet werden. Es wurde nichts abgebucht. Versuch es in ein paar Minuten noch einmal.",
        "Die Zahlung konnte nicht gestartet werden. Es wurde nichts abgebucht. Versuchen Sie es in ein paar Minuten noch einmal.",
      ),
      cancelado: F("Du hast die Zahlung abgebrochen. Es wurde nichts abgebucht.", "Sie haben die Zahlung abgebrochen. Es wurde nichts abgebucht."),
      fallido: F("PayPal hat die Zahlung nicht genehmigt. Du kannst es mit einer anderen Karte versuchen.", "PayPal hat die Zahlung nicht genehmigt. Sie können es mit einer anderen Karte versuchen."),
      pronto: "Noch nicht erhältlich.",
    },
    graciasTitulo: F("Danke für deinen Kauf", "Danke für Ihren Kauf"),
    graciasListoInforme: F(
      "Deine Zahlung ist bestätigt. Du kannst deinen {titulo} jetzt öffnen. Den Link haben wir dir auch per E-Mail geschickt, er läuft nicht ab.",
      "Ihre Zahlung ist bestätigt. Sie können Ihren {titulo} jetzt öffnen. Den Link haben wir Ihnen auch per E-Mail geschickt, er läuft nicht ab.",
    ),
    graciasListoPlanilla: F(
      "Deine Zahlung ist bestätigt. Du kannst die {titulo} jetzt herunterladen. Wir haben sie dir auch per E-Mail geschickt, mit einem Link, der nicht abläuft.",
      "Ihre Zahlung ist bestätigt. Sie können die {titulo} jetzt herunterladen. Wir haben sie Ihnen auch per E-Mail geschickt, mit einem Link, der nicht abläuft.",
    ),
    graciasPendiente: F(
      "Wir warten auf die Bestätigung von PayPal. Sobald sie da ist, schicken wir dir deinen Kauf per E-Mail.",
      "Wir warten auf die Bestätigung von PayPal. Sobald sie da ist, schicken wir Ihnen Ihren Kauf per E-Mail.",
    ),
    muestraIntro: "Das ist das Blatt „{hoja}“ mit den Beispieldaten, mit denen es sich öffnet. Gerechnet wird mit den heute gültigen amtlichen Werten.",
    muestraLeyenda: [F("trägst du ein", "tragen Sie ein"), "rechnet die Tabelle"],
    comprobar: F(
      "Prüf es vor dem Kauf: Der kostenlose Rechner liefert dieselben Zahlen. Probier denselben Fall aus und vergleiche.",
      "Prüfen Sie es vor dem Kauf: Der kostenlose Rechner liefert dieselben Zahlen. Probieren Sie denselben Fall aus und vergleichen Sie.",
    ),
    comprobarEnlace: "Zum kostenlosen Rechner",
    faqTitulo: "Häufige Fragen",
    faq: {
      sheets: {
        pregunta: "Funktioniert es in Google Sheets und Excel?",
        respuesta: F(
          "Ja. Es ist eine .xlsx-Datei: Sie öffnet sich in Excel und Google Sheets (lade sie in dein Drive hoch und öffne sie dort). Gerechnet wird mit normalen Formeln, ohne Makros.",
          "Ja. Es ist eine .xlsx-Datei: Sie öffnet sich in Excel und Google Sheets (laden Sie sie in Ihr Drive hoch und öffnen Sie sie dort). Gerechnet wird mit normalen Formeln, ohne Makros.",
        ),
      },
      recibo: {
        pregunta: "Wie erhalte ich sie?",
        respuesta: F(
          "Sobald die Zahlung bestätigt ist, schicken wir sie dir per E-Mail, mit einem Download-Link, der nicht abläuft. Du kannst sie auch auf der Seite herunterladen, die nach der Zahlung erscheint.",
          "Sobald die Zahlung bestätigt ist, schicken wir sie Ihnen per E-Mail, mit einem Download-Link, der nicht abläuft. Sie können sie auch auf der Seite herunterladen, die nach der Zahlung erscheint.",
        ),
      },
      dolares: {
        pregunta: "Wird in US-Dollar abgerechnet?",
        respuesta: F(
          "Ja. Der Preis ist in US-Dollar (USD), und du zahlst mit PayPal, mit deinem Konto oder per Karte.",
          "Ja. Der Preis ist in US-Dollar (USD), und Sie zahlen mit PayPal, mit Ihrem Konto oder per Karte.",
        ),
        conReferencia: F(
          "Oben zeigen wir dir einen ungefähren Betrag in deiner Währung zum heutigen Kurs, nur zur Orientierung: Der Endbetrag hängt vom Kurs deiner Bank oder Karte ab.",
          "Oben zeigen wir Ihnen einen ungefähren Betrag in Ihrer Währung zum heutigen Kurs, nur zur Orientierung: Der Endbetrag hängt vom Kurs Ihrer Bank oder Karte ab.",
        ),
        sinReferencia: F("Ist deine Karte in einer anderen Währung, rechnet deine Bank um.", "Ist Ihre Karte in einer anderen Währung, rechnet Ihre Bank um."),
      },
      devolucion: {
        pregunta: "Gibt es eine Erstattung?",
        respuesta: F(
          "Ja. Wenn dir die Tabelle nicht hilft, antworte innerhalb von 7 Tagen auf die Liefer-E-Mail, und wir erstatten das Geld.",
          "Ja. Wenn Ihnen die Tabelle nicht hilft, antworten Sie innerhalb von 7 Tagen auf die Liefer-E-Mail, und wir erstatten das Geld.",
        ),
      },
      actualiza: { pregunta: "Wird sie aktualisiert, wenn sich amtliche Werte ändern?", respuesta: "Ja. {disparador}, wir aktualisieren sie, und derselbe Link lädt die neue Version." },
    },
    descargar: "Tabelle herunterladen (.xlsx)",
    abrirInforme: "Meinen Bericht öffnen",
    fuentes: "Verwendete amtliche Quellen",
    calculadoras: "Passt zu diesen Rechnern",
    muestra: "So sieht es aus",
  },
  correo: {
    asuntoInforme: F("Dein Kauf bei CalcularYa: {titulo}", "Ihr Kauf bei CalcularYa: {titulo}"),
    asuntoPlanilla: "{titulo}: Download und Updates",
    mismosNumeros: "Die Zahlen sind dieselben wie im {enlace}, mit dem amtlichen Wert.",
    enlaceCalculadora: "kostenlosen Rechner von CalcularYa",
    comprobante: F("Dies ist der Beleg für deinen Kauf bei {marca}.", "Dies ist der Beleg für Ihren Kauf bei {marca}."),
    informe: {
      encabezado: F("Dein Bericht ist bereit", "Ihr Bericht ist bereit"),
      intro: F("Danke für deinen Kauf: {titulo}. Hier öffnen:", "Danke für Ihren Kauf: {titulo}. Hier öffnen:"),
      boton: "Meinen Bericht öffnen",
      abre: F("Er öffnet sich im Browser. Von dort druckst du ihn oder speicherst ihn als PDF.", "Er öffnet sich im Browser. Von dort drucken Sie ihn oder speichern ihn als PDF."),
      guarda: F("Bewahre diese E-Mail auf", "Bewahren Sie diese E-Mail auf"),
      vence: F(
        "Der Link gehört dir und läuft nicht ab. Der Bericht nutzt die amtlichen Werte vom Tag deines Kaufs, und du kannst deine Daten korrigieren und ihn jederzeit neu drucken.",
        "Der Link gehört Ihnen und läuft nicht ab. Der Bericht nutzt die amtlichen Werte vom Tag Ihres Kaufs, und Sie können Ihre Daten korrigieren und ihn jederzeit neu drucken.",
      ),
      devolucion: F(
        "Wenn dir der Bericht nicht hilft, antworte innerhalb von 7 Tagen auf diese E-Mail, und wir erstatten das Geld.",
        "Wenn Ihnen der Bericht nicht hilft, antworten Sie innerhalb von 7 Tagen auf diese E-Mail, und wir erstatten das Geld.",
      ),
      ayuda: F("Ein Problem? Antworte auf diese E-Mail oder schreib uns an {contacto}.", "Ein Problem? Antworten Sie auf diese E-Mail oder schreiben Sie uns an {contacto}."),
    },
    planilla: {
      encabezado: F("Deine Tabelle ist bereit", "Ihre Tabelle ist bereit"),
      intro: F("Danke für den Kauf der {titulo}. Hier herunterladen:", "Danke für den Kauf der {titulo}. Hier herunterladen:"),
      boton: "Tabelle herunterladen (.xlsx)",
      abre: "Öffnet sich in Excel und Google Sheets.",
      guarda: F("Bewahre diese E-Mail auf", "Bewahren Sie diese E-Mail auf"),
      vence: F(
        "Der Link gehört dir und läuft nicht ab. {disparador}, wir aktualisieren die Tabelle, und derselbe Link liefert dir die aktuelle Version. Du musst nicht erneut zahlen.",
        "Der Link gehört Ihnen und läuft nicht ab. {disparador}, wir aktualisieren die Tabelle, und derselbe Link liefert Ihnen die aktuelle Version. Sie müssen nicht erneut zahlen.",
      ),
      devolucion: F(
        "Wenn dir die Tabelle nicht hilft, antworte innerhalb von 7 Tagen auf diese E-Mail, und wir erstatten das Geld.",
        "Wenn Ihnen die Tabelle nicht hilft, antworten Sie innerhalb von 7 Tagen auf diese E-Mail, und wir erstatten das Geld.",
      ),
      ayuda: F("Ein Problem? Antworte auf diese E-Mail oder schreib uns an {contacto}.", "Ein Problem? Antworten Sie auf diese E-Mail oder schreiben Sie uns an {contacto}."),
    },
  },
};
