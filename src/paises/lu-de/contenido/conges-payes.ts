import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.conges-payes",
  h1: "Urlaubsanspruch in Luxemburg berechnen",
  title: "Urlaubsrechner Luxemburg: Urlaubstage und Urlaubsentgelt",
  description: "Wie viele Urlaubstage in Luxemburg? Mindestens {{lu.conges-jours}} Werktage im Jahr, anteilig nach gearbeiteten Monaten, und Urlaubsentgelt pro Tag.",
  intro: [
    "In Luxemburg beträgt der Jahresurlaub mindestens {{lu.conges-jours}} Werktage im Jahr, unabhängig vom Alter des Arbeitnehmers.",
    "Im ersten Jahr und im Jahr des Austritts entsteht der Urlaub mit einem Zwölftel pro vollem Arbeitsmonat.",
  ],
  comoSeCalcula: [
    "Erworbene Tage = Urlaubstage des Jahres x volle Monate / 12.",
    "Urlaubsentgelt: der Bruttomonatslohn geteilt durch {{lu.heures-par-mois}} Stunden ergibt den Stundenlohn, mal die Stunden eines Arbeitstags.",
  ],
  ejemplo: [
    "Mit 4.325 Euro brutto und 8-Stunden-Tagen ist ein Urlaubstag 200 Euro wert. Die 26 Tage eines vollen Jahres sind 5.200 Euro wert.",
  ],
  faq: [
    { pregunta: "Sind Feiertage eingerechnet?", respuesta: "Nein. Der Jahresurlaub kommt zu den gesetzlichen Feiertagen hinzu." },
    { pregunta: "Kann Urlaub übertragen werden?", respuesta: "Er muss grundsätzlich im laufenden Jahr genommen werden. Der anteilige Urlaub des ersten Jahres kann auf Wunsch des Arbeitnehmers ins Folgejahr übertragen werden." },
    { pregunta: "Kann der Vertrag mehr Tage vorsehen?", respuesta: "Ja. Ein Vertrag oder Kollektivvertrag kann mehr vorsehen, nie weniger als das gesetzliche Minimum." },
  ],
  glosario: [
    { termino: "Werktage", definicion: "Wochentage, die weder Sonntage noch gesetzliche Feiertage sind." },
  ],
});
