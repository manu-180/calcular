import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.brutto-netto-rechner",
  h1: "Brutto-Netto-Rechner für Österreich",
  title: "Brutto-Netto-Rechner 2026 für Österreich",
  description:
    "Rechnen Sie Ihr Bruttogehalt in netto um: Sozialversicherung, Lohnsteuer, Familienbonus Plus und Pendlerpauschale, mit Urlaubsgeld und Weihnachtsgeld.",
  intro: [
    "Vom Bruttogehalt gehen in Österreich zuerst die Sozialversicherungsbeiträge ab, dann die Lohnsteuer. Was bleibt, steht als Nettobezug auf Ihrem Lohnzettel.",
    "Der Rechner zeigt das Netto im Monat und für Urlaubsgeld und Weihnachtsgeld, die als Sonderzahlungen deutlich niedriger besteuert werden. Er rechnet mit den Werten für Angestellte und Arbeiter im Jahr 2026.",
  ],
  comoSeCalcula: [
    "Sozialversicherung: Krankenversicherung {{at.sv-dienstnehmer[kv]}}, Pensionsversicherung {{at.sv-dienstnehmer[pv]}}, Arbeitslosenversicherung bis {{at.sv-dienstnehmer[av]}} (bei niedrigem Gehalt weniger), Arbeiterkammerumlage {{at.sv-dienstnehmer[ak]}} und Wohnbauförderungsbeitrag {{at.sv-dienstnehmer[wbf]}}, in Wien {{at.sv-dienstnehmer[wbf-wien]}}. Gerechnet wird bis zur Höchstbeitragsgrundlage von {{at.beitragsgrundlage[hoechst-monat]}} im Monat.",
    "Lohnsteuer: Brutto minus Sozialversicherung und Pendlerpauschale ergibt die Bemessungsgrundlage. Darauf wird der Einkommensteuertarif angewendet, mit der Werbungskostenpauschale von {{at.werbungskostenpauschale}} im Jahr.",
    "Von der Steuer gehen der Familienbonus Plus, der Verkehrsabsetzbetrag ({{at.verkehrsabsetzbetrag}} im Jahr), der Alleinverdiener- oder Alleinerzieherabsetzbetrag und der Pendlereuro ab. Unter null sinkt die Lohnsteuer nicht.",
    "Urlaubsgeld und Weihnachtsgeld: Abzüglich Sozialversicherung (ohne Umlagen) sind 620 Euro steuerfrei, der Rest bis 25.000 Euro wird mit 6 % besteuert. Im Rechner wird der Freibetrag beim Urlaubsgeld abgezogen.",
  ],
  ejemplo: [
    "Eine Angestellte in Wien mit 3.500 Euro brutto zahlt 641,20 Euro Sozialversicherung und 404,09 Euro Lohnsteuer. Netto bleiben 2.454,71 Euro im Monat. Das Urlaubsgeld bringt netto 2.765,60 Euro, das Weihnachtsgeld 2.728,40 Euro, im Jahr sind es 34.950,52 Euro netto.",
  ],
  faq: [
    {
      pregunta: "Wie viel netto bleibt von 3.000 Euro brutto?",
      respuesta: "Außerhalb Wiens, ohne Kinder und ohne Pendlerpauschale bleiben rund 2.170 Euro im Monat. Geben Sie Ihre Daten oben ein, dann sehen Sie den genauen Betrag mit allen Abzügen.",
    },
    {
      pregunta: "Warum ist das Urlaubsgeld netto höher als das Monatsgehalt?",
      respuesta: "Sonderzahlungen innerhalb des Jahressechstels werden mit festen Steuersätzen besteuert, meist mit 6 %. Außerdem fallen keine Arbeiterkammerumlage und kein Wohnbauförderungsbeitrag an.",
    },
    {
      pregunta: "Wann ist das Weihnachtsgeld steuerfrei?",
      respuesta: "Wenn das Jahressechstel höchstens {{at.sonderzahlung-freigrenze}} beträgt, also bei einem Monatsgehalt bis etwa der Hälfte davon, fällt auf Urlaubsgeld und Weihnachtsgeld keine Lohnsteuer an.",
    },
    {
      pregunta: "Wie wirkt der Familienbonus Plus auf mein Netto?",
      respuesta: "Er senkt die Lohnsteuer um bis zu {{at.familienbonus[unter-18]}} im Monat je Kind unter 18 und um {{at.familienbonus[ab-18]}} für ältere Kinder mit Familienbeihilfe. Teilen sich beide Eltern den Bonus, bekommt jeder die Hälfte. Damit er schon in der Lohnverrechnung wirkt, beantragen Sie ihn beim Arbeitgeber mit dem Formular E 30.",
    },
    {
      pregunta: "Was bringt der Pendlereuro?",
      respuesta: "Er beträgt {{at.pendlereuro}} im Jahr je Kilometer der einfachen Strecke und senkt direkt die Lohnsteuer. Er steht zu, wenn Sie Anspruch auf ein Pendlerpauschale haben.",
    },
  ],
  glosario: [
    { termino: "Lohnzettel", definicion: "Die Abrechnung des Arbeitgebers mit Brutto, Abzügen und Netto." },
    { termino: "Sonderzahlungen", definicion: "Urlaubsgeld und Weihnachtsgeld, auch 13. und 14. Gehalt genannt." },
    { termino: "Jahressechstel", definicion: "Ein Sechstel der laufenden Bezüge im Jahr. Bis zu dieser Höhe gelten für Sonderzahlungen die festen Steuersätze." },
    { termino: "Verkehrsabsetzbetrag", definicion: "Ein Absetzbetrag für alle Arbeitnehmer, der die Fahrten zur Arbeit pauschal abgilt." },
  ],
});
