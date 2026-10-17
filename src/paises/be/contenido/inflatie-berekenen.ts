import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.inflatie-berekenen",
  h1: "Inflatie berekenen met de consumptieprijsindex",
  title: "Inflatie berekenen in België met de index van Statbel",
  description:
    "Reken een bedrag om met de Belgische consumptieprijsindex van Statbel. Je ziet hoeveel de prijzen gestegen zijn en wat het bedrag nu waard is.",
  intro: [
    "Statbel meet elke maand hoe de prijzen in België evolueren met de consumptieprijsindex. De laatste index in onze reeks is {{be.cpi}} (basis 2013 = 100).",
    "Kies een bedrag, een beginmaand en een eindmaand. Je ziet wat dat bedrag in de eindmaand waard is en hoeveel de prijzen in die periode gestegen zijn.",
  ],
  comoSeCalcula: [
    "Nieuw bedrag = bedrag × index van de eindmaand ÷ index van de beginmaand.",
    "We gebruiken de consumptieprijsindex met basis 2013 = 100. De verhouding tussen twee maanden is nagenoeg dezelfde in elk basisjaar.",
    "Is de eindmaand nog niet gepubliceerd, dan rekenen we tot de laatste maand die Statbel bekendmaakte.",
  ],
  ejemplo: [
    "€ 1.000 in januari 2025 komt in september 2026 overeen met ongeveer € 1.043,50, een stijging van zo'n 4,4 %.",
  ],
  faq: [
    {
      pregunta: "Welke index gebruiken jullie?",
      respuesta: "De consumptieprijsindex van Statbel, het Belgische statistiekbureau, met basis 2013 = 100. Statbel publiceert sinds 2026 ook een reeks met basis 2025 = 100, maar de verhouding tussen twee maanden blijft nagenoeg dezelfde.",
    },
    {
      pregunta: "Waarom gaat de reeks maar terug tot december 2024?",
      respuesta: "We laden de officiële cijfers rechtstreeks bij Statbel in. De reeks groeit elke maand aan met het nieuwste cijfer.",
    },
    {
      pregunta: "Hoe vaak publiceert Statbel de index?",
      respuesta: "Elke maand. Zodra een nieuw cijfer verschijnt, komt het automatisch in deze berekening.",
    },
  ],
  glosario: [
    { termino: "Consumptieprijsindex", definicion: "Een maandelijkse maatstaf van Statbel voor de evolutie van de prijzen van goederen en diensten die gezinnen kopen." },
    { termino: "Basisjaar", definicion: "Het jaar waarin de index op 100 staat. Hier is dat 2013." },
  ],
});
