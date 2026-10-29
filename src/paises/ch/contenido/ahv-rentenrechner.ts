import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.ahv-rentenrechner",
  h1: "AHV-Rentenrechner: Altersrente mit Skala 44",
  title: "AHV-Rentenrechner {{anio}}: Altersrente und 13. AHV-Rente",
  description:
    "AHV-Altersrente berechnen: Vollrente nach Skala 44 zwischen {{ch.ahv-minimalrente}} und dem Doppelten, Plafonierung für Ehepaare und 13. Altersrente.",
  intro: [
    "Die AHV-Altersrente hängt vom massgebenden durchschnittlichen Jahreseinkommen ab. Bei vollständiger Beitragsdauer beträgt sie mindestens {{ch.ahv-minimalrente}} und höchstens das Doppelte im Monat.",
    "Seit 2026 erhalten alle, die im Dezember eine Altersrente beziehen, zusätzlich eine 13. Altersrente. Der Rechner zeigt Monatsrente, 13. Rente und Jahresbetrag.",
  ],
  comoSeCalcula: [
    "Das Einkommen wird auf den nächsten Wert der Rententabelle aufgerundet.",
    "Bis zum 36-fachen der Minimalrente gilt: 74 % der Minimalrente plus 13/600 des Einkommens. Darüber: 104 % der Minimalrente plus 8/600 des Einkommens. Das Ergebnis liegt immer zwischen der Minimal- und der Maximalrente.",
    "Ehepaare: Die beiden Renten zusammen dürfen 150 % der Maximalrente nicht übersteigen. Sonst werden beide im Verhältnis gekürzt.",
    "Die 13. Altersrente beträgt einen Zwölftel der im Jahr bezogenen Rente und kommt im Dezember.",
  ],
  ejemplo: [
    "Ein massgebendes Einkommen von 46 268 Franken wird auf 46 872 Franken aufgerundet und ergibt 1935 Franken Rente im Monat. Ist die Ehefrau mit 1915 Franken ebenfalls pensioniert, werden beide Renten auf zusammen 3780 Franken plafoniert: 1900 und 1880 Franken.",
  ],
  faq: [
    {
      pregunta: "Wie hoch ist die AHV-Rente 2026?",
      respuesta: "Bei vollständiger Beitragsdauer zwischen {{ch.ahv-minimalrente}} und dem Doppelten im Monat. Ab 1. Januar 2027 steigen die Minimalrente auf 1280 und die Maximalrente auf 2560 Franken.",
    },
    {
      pregunta: "Was ist das massgebende durchschnittliche Jahreseinkommen?",
      respuesta: "Der Durchschnitt Ihrer Erwerbseinkommen, aufgewertet mit einem Faktor für die Lohnentwicklung, plus allfällige Erziehungs- und Betreuungsgutschriften. Ihre Ausgleichskasse kann es Ihnen in einer Rentenvorausberechnung mitteilen.",
    },
    {
      pregunta: "Wann gibt es eine Vollrente?",
      respuesta: "Wenn Sie gleich viele Beitragsjahre haben wie Ihr Jahrgang. Fehlen Jahre, erhalten Sie eine Teilrente, die kleiner ist als der Betrag in diesem Rechner.",
    },
    {
      pregunta: "Wie viel beträgt die 13. AHV-Rente?",
      respuesta: "Einen Zwölftel der Altersrente, die Sie im Kalenderjahr bezogen haben, gerundet auf ganze Franken. Sie wird im Dezember zusammen mit der Dezemberrente ausbezahlt.",
    },
  ],
  glosario: [
    { termino: "Skala 44", definicion: "Rententabelle für Vollrenten bei vollständiger Beitragsdauer." },
    { termino: "Plafonierung", definicion: "Begrenzung der beiden Altersrenten eines Ehepaars auf 150 % der Maximalrente." },
  ],
});
