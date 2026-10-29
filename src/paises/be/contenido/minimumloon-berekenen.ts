import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.minimumloon-berekenen",
  h1: "Minimumloon berekenen in België",
  title: "Minimumloon België {{anio}}: {{be.ggmmi}} bruto per maand",
  description:
    "Het minimumloon in België is {{be.ggmmi}} bruto per maand voor een voltijdse job vanaf 18 jaar. Bereken het minimum voor jouw uren, per uur en per jaar.",
  intro: [
    "In België heet het minimumloon officieel het gewaarborgd gemiddeld minimum maandinkomen (GGMMI). Sinds {{be.ggmmi#desde}} is het {{be.ggmmi}} bruto per maand voor een voltijdse werknemer van 18 jaar of ouder.",
    "Werk je deeltijds, dan geldt het minimum in verhouding tot je uren. Vul je uren in en, als je wilt, je eigen brutoloon om te zien of je minstens het minimum krijgt.",
  ],
  comoSeCalcula: [
    "Minimum voor jouw uren: {{be.ggmmi}} × jouw uren ÷ de voltijdse uren in je sector.",
    "Per uur: maandloon × 3 ÷ 13 (de weken in een kwartaal) ÷ de voltijdse uren per week.",
    "Per jaar: 12 keer het maandbedrag, zonder vakantiegeld en eindejaarspremie.",
  ],
  ejemplo: [
    "Bij een voltijdse week van 38 uur is het minimum {{be.ggmmi}} per maand. Werk je 30 uur, dan is je minimum dat bedrag × 30 ÷ 38.",
  ],
  faq: [
    {
      pregunta: "Wie bepaalt het minimumloon in België?",
      respuesta:
        "De sociale partners, in de Nationale Arbeidsraad. Het bedrag staat in collectieve arbeidsovereenkomst nr. 43. Daarnaast kan je sector een eigen minimumloon hebben, vastgelegd in het paritair comité.",
    },
    {
      pregunta: "Wanneer stijgt het minimumloon?",
      respuesta:
        "Het minimumloon wordt geïndexeerd als de spilindex wordt overschreden. Bovendien ging het op 1 april 2022, 1 april 2024 en 1 april 2026 extra omhoog, zoals de sociale partners in 2021 afspraken.",
    },
    {
      pregunta: "Geldt het minimumloon ook in mijn sector?",
      respuesta:
        "Het GGMMI is de absolute ondergrens voor iedereen van 18 jaar of ouder met een arbeidsovereenkomst. Het minimumloon van je paritair comité kan hoger liggen, en dan geldt dat hogere bedrag.",
    },
  ],
  glosario: [
    { termino: "GGMMI", definicion: "Gewaarborgd gemiddeld minimum maandinkomen, het interprofessionele minimumloon in België." },
    { termino: "Paritair comité", definicion: "Het overlegorgaan van werkgevers en vakbonden van een sector, dat onder meer de minimumlonen van die sector vastlegt." },
  ],
});
