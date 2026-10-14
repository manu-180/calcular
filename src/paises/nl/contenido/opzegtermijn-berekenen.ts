import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.opzegtermijn-berekenen",
  h1: "Opzegtermijn berekenen",
  title: "Opzegtermijn berekenen: tot wanneer loopt je contract?",
  description:
    "Bereken je wettelijke opzegtermijn en de laatste dag van je contract. Voor jezelf {{nl.opzegtermijn-werknemer}}, voor je werkgever 1 tot 4 maanden.",
  intro: [
    "Wil je een vast contract opzeggen, of zegt je werkgever op? Dan geldt een opzegtermijn. De wettelijke regels staan in artikel 7:672 van het Burgerlijk Wetboek.",
    "Zeg je zelf op, dan is de termijn één maand, tenzij in je contract iets anders staat. Voor je werkgever hangt de termijn af van hoelang je contract al loopt.",
  ],
  comoSeCalcula: [
    "Voor je werkgever: korter dan 5 jaar in dienst is {{nl.opzegtermijn-werkgever[0]}}, 5 tot 10 jaar {{nl.opzegtermijn-werkgever[5]}}, 10 tot 15 jaar {{nl.opzegtermijn-werkgever[10]}} en 15 jaar of langer {{nl.opzegtermijn-werkgever[15]}}. Het telt hoelang je contract op de dag van de opzegging heeft geduurd.",
    "Is je eigen termijn in je contract langer dan een maand, dan moet die van je werkgever minstens het dubbele zijn.",
    "De termijn begint na de dag van opzegging. Het contract eindigt tegen het einde van de maand, tenzij in je contract of cao een andere dag staat.",
  ],
  ejemplo: [
    "Je werkgever zegt op 14 oktober 2026 op en je bent 11 jaar in dienst. De termijn is drie maanden, tot 14 januari 2027. Omdat opzeggen gebeurt tegen het einde van de maand, is je laatste werkdag 31 januari 2027.",
  ],
  faq: [
    {
      pregunta: "Hoe lang mag de opzegtermijn voor een werknemer zijn?",
      respuesta: "Je werkgever kan met jou schriftelijk een langere termijn afspreken, maar voor jou nooit langer dan zes maanden. De termijn voor je werkgever moet dan minstens twee keer zo lang zijn.",
    },
    {
      pregunta: "Kan een cao een kortere termijn voor de werkgever bepalen?",
      respuesta: "Ja. Alleen in een cao of een regeling van een bevoegd bestuursorgaan mag de termijn voor de werkgever korter zijn dan de wet zegt.",
    },
    {
      pregunta: "Wat als je werkgever de opzegtermijn niet in acht neemt?",
      respuesta: "Wie opzegt tegen een eerdere dag dan geldt, moet de andere partij een vergoeding betalen gelijk aan het loon over de tijd die de termijn te kort was.",
    },
    {
      pregunta: "Geldt een opzegtermijn ook voor een tijdelijk contract?",
      respuesta: "Een tijdelijk contract eindigt normaal vanzelf op de einddatum. Tussentijds opzeggen kan alleen als dat schriftelijk is afgesproken. Dan geldt dezelfde wettelijke opzegtermijn.",
    },
  ],
  glosario: [
    { termino: "Opzegtermijn", definicion: "De tijd tussen het moment van opzeggen en het einde van het contract." },
    { termino: "Opzeggen tegen het einde van de maand", definicion: "Het contract eindigt op de laatste dag van de maand waarin de termijn afloopt." },
  ],
});
