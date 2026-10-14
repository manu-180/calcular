import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.erbschaftsteuer-rechner",
  h1: "Erbschaftsteuer- und Schenkungsteuerrechner",
  title: "Erbschaftsteuer berechnen: Freibeträge und Steuersätze",
  description:
    "Wie viel Erbschaft- oder Schenkungsteuer fällt an? Mit den persönlichen Freibeträgen, den drei Steuerklassen und dem Härteausgleich nach § 19 ErbStG.",
  intro: [
    "Erbschaften und Schenkungen werden in Deutschland nach denselben Regeln besteuert. Entscheidend ist, wie eng Sie mit der verstorbenen oder schenkenden Person verwandt sind.",
    "Nahe Angehörige haben hohe Freibeträge und niedrige Steuersätze. Der Rechner zeigt Freibetrag, Steuerklasse und Steuer.",
  ],
  comoSeCalcula: [
    "Vom Wert wird der persönliche Freibetrag abgezogen: {{de.erbst-freibetraege[ehegatte]}} für Ehegatten, {{de.erbst-freibetraege[kind]}} für Kinder, {{de.erbst-freibetraege[enkel]}} für Enkel, {{de.erbst-freibetraege[klasse2]}} in den Steuerklassen II und III.",
    "Der Rest wird auf volle 100 Euro abgerundet.",
    "Der ganze steuerpflichtige Erwerb trägt den Steuersatz seiner Wertstufe: in Steuerklasse I von 7 % bis 30 %, in Klasse II von 15 % bis 43 %, in Klasse III 30 % oder 50 %.",
    "Knapp über einer Wertgrenze mildert der Härteausgleich den Sprung in den höheren Satz.",
  ],
  ejemplo: ["Erbt ein Kind 500.000 Euro, bleiben nach dem Freibetrag 100.000 Euro steuerpflichtig. Mit 11 % fallen 11.000 Euro Erbschaftsteuer an."],
  faq: [
    {
      pregunta: "Wie oft gilt der Freibetrag?",
      respuesta: "Alle zehn Jahre neu für jede Person, von der Sie etwas bekommen. Schenkungen innerhalb von zehn Jahren werden zusammengerechnet.",
    },
    {
      pregunta: "Warum zahlen Lebensgefährten so viel?",
      respuesta: "Ohne Ehe oder eingetragene Lebenspartnerschaft gehören sie zur Steuerklasse III mit nur {{de.erbst-freibetraege[klasse3]}} Freibetrag und 30 % Mindestsatz.",
    },
    {
      pregunta: "Müssen Eltern bei Schenkungen mehr zahlen als bei Erbschaften?",
      respuesta: "Ja. Bei einer Erbschaft gehören Eltern zur Steuerklasse I, bei einer Schenkung zur Steuerklasse II mit kleinerem Freibetrag.",
    },
  ],
  glosario: [
    { termino: "Steuerklasse", definicion: "Einstufung nach dem Verwandtschaftsgrad, von I (engste Angehörige) bis III (alle anderen)." },
    { termino: "Härteausgleich", definicion: "Regel nach § 19 Absatz 3 ErbStG, die den Sprung in eine höhere Steuerstufe abfedert." },
  ],
});
