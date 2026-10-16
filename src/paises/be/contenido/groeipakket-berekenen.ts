import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.groeipakket-berekenen",
  h1: "Groeipakket berekenen: kinderbijslag in Vlaanderen",
  title: "Groeipakket berekenen: {{be.groeipakket[basisbedrag]}} per kind per maand",
  description:
    "Bereken je Vlaams Groeipakket: basisbedrag van {{be.groeipakket[basisbedrag]}} per kind, sociale toeslag, schoolbonus en het startbedrag van {{be.groeipakket[startbedrag]}}.",
  intro: [
    "In Vlaanderen krijgt elk kind dat sinds 1 januari 2019 geboren is een Groeipakket. Het basisbedrag is {{be.groeipakket[basisbedrag]}} per maand, sinds {{be.groeipakket#desde}}.",
    "Gezinnen met een lager inkomen krijgen er een sociale toeslag bij. Elk jaar komt er een schoolbonus, en bij de geboorte een eenmalig startbedrag.",
  ],
  comoSeCalcula: [
    "Basisbedrag: {{be.groeipakket[basisbedrag]}} per kind per maand.",
    "Sociale toeslag bij 1 of 2 kinderen: {{be.groeipakket[sociaal-12-laag]}} per kind bij een gezinsinkomen tot {{be.groeipakket[inkomensgrens-1]}}, {{be.groeipakket[sociaal-12-midden]}} tot {{be.groeipakket[inkomensgrens-2]}}.",
    "Sociale toeslag bij 3 of meer kinderen: {{be.groeipakket[sociaal-3-laag]}} per kind tot {{be.groeipakket[inkomensgrens-1]}}, {{be.groeipakket[sociaal-3-midden]}} tot {{be.groeipakket[inkomensgrens-3]}}.",
    "Schoolbonus per jaar: {{be.groeipakket[schoolbonus-0-tot-4]}} tot en met 4 jaar, {{be.groeipakket[schoolbonus-5-tot-11]}} van 5 tot en met 11 jaar.",
  ],
  ejemplo: [
    "Een gezin met twee kinderen en een inkomen van € 60.000 krijgt 2 × {{be.groeipakket[basisbedrag]}} per maand, plus de schoolbonus.",
  ],
  faq: [
    {
      pregunta: "Wat krijgen kinderen die vóór 2019 geboren zijn?",
      respuesta:
        "Voor hen blijven in principe de bedragen van het vroegere kinderbijslagsysteem gelden. Die hangen af van de plaats van het kind in het gezin op 31 december 2018, en er kan een leeftijdsbijslag bij komen.",
    },
    {
      pregunta: "Wanneer veranderen de bedragen?",
      respuesta:
        "De bedragen van het Groeipakket worden regelmatig aangepast, net als de inkomensgrenzen voor de sociale toeslag. De bedragen in deze berekening gelden sinds {{be.groeipakket#desde}}.",
    },
    {
      pregunta: "Welke toeslagen zitten hier niet in?",
      respuesta:
        "De zorgtoeslag voor kinderen met een specifieke ondersteuningsbehoefte, de wezentoeslag, de pleegzorgtoeslag, de kinderopvangtoeslag en de schooltoeslag.",
    },
  ],
  glosario: [
    { termino: "Groeipakket", definicion: "De Vlaamse kinderbijslag, met een basisbedrag en toeslagen." },
    { termino: "Startbedrag", definicion: "Een eenmalig bedrag bij de geboorte van een kind." },
    { termino: "Schoolbonus", definicion: "Een jaarlijks bedrag per kind, afhankelijk van de leeftijd." },
  ],
});
