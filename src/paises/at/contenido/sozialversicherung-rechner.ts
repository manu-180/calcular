import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.sozialversicherung-rechner",
  h1: "Sozialversicherungsrechner: Ihre Beiträge 2026",
  title: "Sozialversicherung 2026 berechnen: Dienstnehmeranteil",
  description: "Wie viel Sozialversicherung zahlen Sie vom Bruttogehalt? Kranken-, Pensions- und Arbeitslosenversicherung, Umlagen und Höchstbeitragsgrundlage 2026.",
  intro: [
    "Als Angestellte oder Arbeiter zahlen Sie in Österreich rund 18 % Ihres Bruttogehalts an die Sozialversicherung. Der Arbeitgeber zieht die Beiträge ab und führt sie an den Krankenversicherungsträger ab, meist die Österreichische Gesundheitskasse.",
    "Der Rechner zeigt jeden Beitrag einzeln, den Betrag auf Urlaubsgeld und Weihnachtsgeld und die Summe im Jahr.",
  ],
  comoSeCalcula: [
    "Krankenversicherung {{at.sv-dienstnehmer[kv]}}, Pensionsversicherung {{at.sv-dienstnehmer[pv]}}, Arbeitslosenversicherung {{at.sv-dienstnehmer[av]}}, Arbeiterkammerumlage {{at.sv-dienstnehmer[ak]}} und Wohnbauförderungsbeitrag {{at.sv-dienstnehmer[wbf]}} (in Wien {{at.sv-dienstnehmer[wbf-wien]}}).",
    "Bei niedrigem Einkommen ist der Beitrag zur Arbeitslosenversicherung geringer: bis 2.225 Euro 0 %, bis 2.427 Euro 1 %, bis 2.630 Euro 2 %.",
    "Beiträge fallen nur bis zur Höchstbeitragsgrundlage von {{at.beitragsgrundlage[hoechst-monat]}} im Monat an. Für Sonderzahlungen gilt eine eigene Grenze von {{at.beitragsgrundlage[hoechst-sonderzahlungen]}} im Jahr.",
    "Auf Urlaubsgeld und Weihnachtsgeld werden Kranken-, Pensions- und Arbeitslosenversicherung gezahlt, aber keine Arbeiterkammerumlage und kein Wohnbauförderungsbeitrag.",
  ],
  ejemplo: [
    "Bei 3.500 Euro brutto in Wien sind es 641,20 Euro im Monat: 135,45 Euro Krankenversicherung, 358,75 Euro Pensionsversicherung, 103,25 Euro Arbeitslosenversicherung, 17,50 Euro Arbeiterkammerumlage und 26,25 Euro Wohnbauförderung.",
  ],
  faq: [
    {
      pregunta: "Wie hoch ist die Sozialversicherung in Österreich 2026?",
      respuesta: "Für Angestellte und Arbeiter sind es zusammen 18,07 % vom Brutto, in Wien 18,32 %. Bei Gehältern bis 2.630 Euro ist der Satz wegen der geringeren Arbeitslosenversicherung niedriger.",
    },
    {
      pregunta: "Was ist die Geringfügigkeitsgrenze?",
      respuesta: "2026 liegt sie bei {{at.beitragsgrundlage[geringfuegig]}} im Monat. Bis zu diesem Betrag zahlen Sie als Dienstnehmer keine Beiträge.",
    },
    {
      pregunta: "Warum ist der Wohnbauförderungsbeitrag in Wien höher?",
      respuesta: "Seit 1. Jänner 2026 beträgt er in Wien 1,5 %, je zur Hälfte von Dienstnehmer und Dienstgeber. In den anderen Bundesländern zahlen Sie {{at.sv-dienstnehmer[wbf]}}.",
    },
  ],
  glosario: [
    { termino: "Beitragsgrundlage", definicion: "Der Teil des Bruttos, auf den Beiträge berechnet werden." },
    { termino: "Höchstbeitragsgrundlage", definicion: "Die Obergrenze, über der keine weiteren Beiträge anfallen." },
    { termino: "ÖGK", definicion: "Österreichische Gesundheitskasse, sie hebt die Beiträge für Angestellte und Arbeiter ein." },
  ],
});
