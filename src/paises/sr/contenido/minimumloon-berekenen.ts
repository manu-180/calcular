import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.minimumloon-berekenen",
  h1: "Minimumloon berekenen in Suriname",
  title: "Minimumloon Suriname {{anio}}: {{sr.minimumuurloon}} per uur",
  description:
    "Het algemeen minimum uurloon is {{sr.minimumuurloon}} sinds {{sr.minimumuurloon#desde}}. Reken uit wat dat per dag, week, maand en jaar is voor jouw aantal uren.",
  intro: [
    "In Suriname geldt een algemeen minimum uurloon. De minister van Arbeid stelt het vast na advies van de Nationale Loonraad en goedkeuring door de Raad van Ministers. Sinds {{sr.minimumuurloon#desde}} is het {{sr.minimumuurloon}} per uur.",
    "Vul in hoeveel uur je per week werkt. Je ziet wat je werkgever je minimaal moet betalen.",
  ],
  comoSeCalcula: [
    "Weekloon: minimum uurloon × uren per week.",
    "Maandloon: weekloon × 52 weken ÷ 12 maanden. Dat is een gemiddelde; een maand met meer werkdagen geeft meer loon.",
    "Dagloon: minimum uurloon × 8 uur.",
  ],
  ejemplo: ["Wie 40 uur per week werkt tegen het minimum van SRD 61,25 per uur, verdient SRD 2.450 per week. Dat is gemiddeld SRD 10.616,67 per maand."],
  faq: [
    {
      pregunta: "Wanneer gaat het minimumloon weer omhoog?",
      respuesta: "De Nationale Loonraad brengt zijn advies voor het volgende jaar uit voor 31 december, en uiterlijk 31 maart. De minister kan ook tussentijds een nieuw minimumloon vaststellen. Het nieuwe bedrag staat in het Staatsblad.",
    },
    {
      pregunta: "Wat was het minimum uurloon hiervoor?",
      respuesta: "Van 1 april 2025 tot en met 30 juni 2026 was het minimum uurloon SRD 52,47.",
    },
    {
      pregunta: "Hoeveel loonbelasting betaal ik op het minimumloon?",
      respuesta: "Bij 40 uur per week komt het zuiver loon net boven de belastingvrije som uit. Je betaalt dan een klein bedrag aan loonbelasting, en daarnaast AOV-premie. Reken het precies uit met de bruto netto berekening.",
    },
  ],
  glosario: [
    { termino: "Nationale Loonraad", definicion: "Raad met leden van overheid, vakbeweging en bedrijfsleven die de minister adviseert over het minimumloon." },
    { termino: "Minimum uurloon", definicion: "Het laagste loon per uur dat een werkgever mag betalen." },
  ],
});
