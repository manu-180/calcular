import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.box-3-berekenen",
  h1: "Box 3 berekenen 2026: belasting over sparen en beleggen",
  title: "Box 3 berekenen 2026: belasting over sparen en beleggen",
  description:
    "Bereken je box 3-belasting over 2026 met de rekenmethode van de Belastingdienst: heffingsvrij vermogen {{nl.box3-heffingsvrij}} per persoon en een tarief van {{nl.box3-tarief}}.",
  intro: [
    "In box 3 betaal je belasting over je vermogen: spaargeld, beleggingen, een tweede woning en schulden. De Belastingdienst rekent niet met wat je echt verdiende, maar met een forfaitair rendement per soort vermogen.",
    "In 2026 is dat {{nl.box3-rendement[banktegoeden]}} voor banktegoeden, {{nl.box3-rendement[overige]}} voor beleggingen en andere bezittingen en {{nl.box3-rendement[schulden]}} voor schulden. Over het rendement betaal je {{nl.box3-tarief}} belasting, maar alleen over het deel van je vermogen boven het heffingsvrij vermogen.",
  ],
  comoSeCalcula: [
    "Bereken het rendement: banktegoeden × {{nl.box3-rendement[banktegoeden]}}, plus overige bezittingen × {{nl.box3-rendement[overige]}}, min de aftrekbare schulden × {{nl.box3-rendement[schulden]}}. Van je schulden gaat eerst de drempel van {{nl.box3-drempel}} per persoon af.",
    "De rendementsgrondslag is je bezittingen min je aftrekbare schulden. Trek daar het heffingsvrij vermogen van {{nl.box3-heffingsvrij}} per persoon van af: dat is de grondslag sparen en beleggen.",
    "Deel de grondslag sparen en beleggen door de rendementsgrondslag. Dat percentage van je rendement is je box 3-inkomen.",
    "Over je box 3-inkomen betaal je {{nl.box3-tarief}} belasting. Bedragen worden afgerond op hele euro's.",
  ],
  ejemplo: [
    "Met € 150.000 spaargeld en geen fiscale partner is het rendement € 1.920. Je aandeel in de rendementsgrondslag is 60,42%, dus je box 3-inkomen is € 1.160 en je betaalt € 417 belasting. Dit is het rekenvoorbeeld van de Belastingdienst.",
  ],
  faq: [
    {
      pregunta: "Zijn de percentages voor 2026 definitief?",
      respuesta: "Het percentage voor beleggingen en andere bezittingen staat vast. De percentages voor banktegoeden en schulden zijn voorlopig. De Belastingdienst stelt ze begin 2027 vast en gebruikt ze voor de definitieve aanslag.",
    },
    {
      pregunta: "Wat als mijn werkelijke rendement lager is?",
      respuesta: "Volgens uitspraken van de Hoge Raad moet de Belastingdienst je werkelijke rendement belasten als dat lager is dan het forfaitaire rendement. Dat kan pas na afloop van het jaar, in je aangifte over 2026.",
    },
    {
      pregunta: "Op welke datum telt mijn vermogen?",
      respuesta: "Je gaat uit van de waarde van je bezittingen en schulden op 1 januari 2026.",
    },
    {
      pregunta: "Hoe werkt het met een fiscale partner?",
      respuesta: "Jullie tellen je vermogen bij elkaar op en krijgen samen twee keer het heffingsvrij vermogen en twee keer de schuldendrempel. De grondslag sparen en beleggen mogen jullie verdelen zoals jullie willen. In deze berekening krijgt ieder de helft.",
    },
  ],
  glosario: [
    { termino: "Forfaitair rendement", definicion: "Het rendement dat de Belastingdienst veronderstelt, los van wat je echt verdiende." },
    { termino: "Heffingsvrij vermogen", definicion: "Het deel van je vermogen waarover je geen box 3-belasting betaalt." },
    { termino: "Schuldendrempel", definicion: "Het bedrag dat je van je schulden aftrekt voordat ze meetellen in box 3." },
  ],
});
