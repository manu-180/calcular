import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.heures-supplementaires",
  h1: "Überstunden in Luxemburg berechnen",
  title: "Überstundenrechner Luxemburg: Zuschlag von {{lu.majoration-heures-sup}}",
  description: "Überstunden in Luxemburg: anderthalb Stunden Freizeit pro Stunde, oder Bezahlung mit {{lu.majoration-heures-sup}} Zuschlag, wenn der Ausgleich unmöglich ist.",
  intro: [
    "In Luxemburg wird eine Überstunde zuerst durch anderthalb Stunden bezahlte Freizeit ausgeglichen, oder auf einem Zeitsparkonto gutgeschrieben.",
    "Ist der Ausgleich unmöglich oder verlässt der Arbeitnehmer das Unternehmen vorher, wird jede Stunde mit dem Stundenlohn plus {{lu.majoration-heures-sup}} Zuschlag bezahlt.",
  ],
  comoSeCalcula: [
    "Stundenlohn = Bruttomonatslohn / {{lu.heures-par-mois}}.",
    "Bezahlung = Stundenlohn x Stunden x (100 % + {{lu.majoration-heures-sup}}).",
    "Freizeit = Stunden x 1,5.",
  ],
  ejemplo: [
    "Mit 5.190 Euro im Monat, also 30 Euro pro Stunde, sind 10 Überstunden 420 Euro wert, oder 15 Stunden bezahlte Freizeit.",
  ],
  faq: [
    { pregunta: "Sind Überstunden steuerpflichtig?", respuesta: "Die Bezahlung von 140 % ist steuer- und beitragsfrei, außer den Beiträgen für Sachleistungen auf die Stunde ohne Zuschlag." },
    { pregunta: "Wer regelt die Einzelheiten?", respuesta: "Ein anwendbarer Kollektivvertrag regelt die Einzelheiten. Sonst gelten die Regeln des Arbeitsgesetzbuchs." },
    { pregunta: "Gilt das für leitende Angestellte?", respuesta: "Nein. Diese Vergütungsregeln gelten nicht für Arbeitnehmer mit der Eigenschaft leitender Angestellter." },
  ],
  glosario: [
    { termino: "Zeitsparkonto", definicion: "Konto, auf dem Überstunden zum gleichen Satz gutgeschrieben werden, um sie später auszugleichen." },
  ],
});
