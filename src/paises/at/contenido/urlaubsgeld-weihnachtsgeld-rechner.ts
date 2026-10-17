import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.urlaubsgeld-weihnachtsgeld-rechner",
  h1: "Urlaubsgeld und Weihnachtsgeld netto berechnen",
  title: "Urlaubsgeld und Weihnachtsgeld 2026: Netto-Rechner",
  description: "Wie viel bleibt vom 13. und 14. Gehalt? Sozialversicherung, Freibetrag von 620 Euro und 6 % Lohnsteuer auf Urlaubsgeld und Weihnachtsgeld in Österreich.",
  intro: [
    "Urlaubsgeld und Weihnachtsgeld sind die beiden Sonderzahlungen, die in Österreich zusätzlich zu den zwölf Monatsgehältern ausgezahlt werden. Wie hoch sie sind, regelt Ihr Kollektivvertrag oder Arbeitsvertrag.",
    "Diese Sonderzahlungen werden deutlich niedriger besteuert als das laufende Gehalt. Der Rechner zeigt, was netto davon übrig bleibt.",
  ],
  comoSeCalcula: [
    "Sozialversicherung: Kranken-, Pensions- und Arbeitslosenversicherung, aber keine Arbeiterkammerumlage und kein Wohnbauförderungsbeitrag. Höchstens bis {{at.beitragsgrundlage[hoechst-sonderzahlungen]}} im Jahr.",
    "Lohnsteuer: Vom Betrag nach Sozialversicherung sind 620 Euro im Jahr steuerfrei, der Rest wird bis 25.000 Euro mit 6 % besteuert. Darüber steigen die festen Sätze auf 27 % und 35,75 %.",
    "Liegt das Jahressechstel (meist zwei Monatsgehälter) nicht über {{at.sonderzahlung-freigrenze}}, fällt gar keine Lohnsteuer an.",
    "Der Rechner zieht den Freibetrag von 620 Euro beim Urlaubsgeld ab.",
  ],
  ejemplo: [
    "Bei 3.500 Euro Monatsgehalt bleiben vom Urlaubsgeld netto 2.765,60 Euro, vom Weihnachtsgeld 2.728,40 Euro. Zusammen sind das 5.494 Euro netto.",
  ],
  faq: [
    {
      pregunta: "Bis zu welchem Gehalt sind Urlaubsgeld und Weihnachtsgeld steuerfrei?",
      respuesta: "Wenn das Jahressechstel höchstens {{at.sonderzahlung-freigrenze}} beträgt. Bei gleichbleibendem Gehalt ist das bis zu einem Monatsbrutto von etwa 1.307 Euro der Fall. Sozialversicherung fällt trotzdem an.",
    },
    {
      pregunta: "Warum ist das Weihnachtsgeld netto niedriger als das Urlaubsgeld?",
      respuesta: "Der Freibetrag von 620 Euro gilt einmal im Jahr. Im Rechner wird er beim Urlaubsgeld abgezogen. Beim Weihnachtsgeld wird deshalb der ganze Betrag mit 6 % besteuert.",
    },
    {
      pregunta: "Was ist das Jahressechstel?",
      respuesta: "Ein Sechstel der laufenden Bezüge des Jahres, bei gleichem Gehalt also zwei Monatsgehälter. Nur Sonderzahlungen bis zu dieser Höhe werden mit den festen Sätzen besteuert, was darüber liegt, wie ein laufendes Gehalt.",
    },
  ],
  glosario: [
    { termino: "Sonderzahlungen", definicion: "Urlaubsgeld (Urlaubszuschuss) und Weihnachtsgeld (Weihnachtsremuneration), das 13. und 14. Gehalt." },
    { termino: "Kollektivvertrag", definicion: "Die Vereinbarung für eine Branche, in der unter anderem Mindestgehälter und Sonderzahlungen stehen." },
  ],
});
