import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.mwst-rechner",
  h1: "MWST-Rechner Liechtenstein",
  title: "MWST-Rechner Liechtenstein: 8,1 %, 2,6 % und 3,8 %",
  description: "Mehrwertsteuer in Liechtenstein dazurechnen oder herausrechnen: Normalsatz {{li.mwst-normalsatz}}, reduzierter Satz {{li.mwst-reduziert}} und Sondersatz {{li.mwst-beherbergung}}.",
  intro: [
    "In Liechtenstein beträgt die Mehrwertsteuer {{li.mwst-normalsatz}} zum Normalsatz, {{li.mwst-reduziert}} zum reduzierten Satz und {{li.mwst-beherbergung}} für Beherbergungsleistungen.",
    "Mit dem Rechner rechnen Sie die MWST zu einem Betrag dazu oder aus einem Preis heraus.",
  ],
  comoSeCalcula: [
    "Dazurechnen: Betrag mal Steuersatz ergibt die MWST.",
    "Herausrechnen: Preis inklusive MWST geteilt durch 1,081 (oder 1,026 und 1,038) ergibt den Betrag ohne MWST.",
  ],
  ejemplo: [
    "Eine Rechnung über 100 Franken ohne MWST kostet zum Normalsatz 108.10 Franken.",
  ],
  faq: [
    { pregunta: "Sind die Sätze gleich wie in der Schweiz?", respuesta: "Ja. Das liechtensteinische Mehrwertsteuergesetz sieht dieselben drei Sätze vor wie das schweizerische." },
    { pregunta: "Was fällt unter den reduzierten Satz?", respuesta: "Unter anderem Wasser in Leitungen, Lebensmittel, Medikamente, Zeitungen und Bücher, wie im Mehrwertsteuergesetz aufgezählt." },
    { pregunta: "Was ist eine Beherbergungsleistung?", respuesta: "Die Gewährung von Unterkunft einschliesslich Frühstück, auch wenn dieses separat berechnet wird." },
  ],
  glosario: [
    { termino: "Sondersatz", definicion: "Satz von 3,8 % für Beherbergungsleistungen." },
  ],
});
