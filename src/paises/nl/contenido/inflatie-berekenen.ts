import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.inflatie-berekenen",
  h1: "Inflatie berekenen met de CPI van het CBS",
  title: "Inflatie berekenen: wat is een bedrag nu waard?",
  description:
    "Reken een bedrag om naar geld van nu met de consumentenprijsindex (CPI) van het CBS. Zie de inflatie over elke periode sinds december 2009.",
  intro: [
    "Door inflatie kun je met hetzelfde bedrag elk jaar minder kopen. Met de consumentenprijsindex (CPI) van het CBS reken je uit wat een bedrag van vroeger nu waard is.",
    "Vul een bedrag en twee maanden in. Je ziet het bedrag in geld van nu en de inflatie over die periode.",
  ],
  comoSeCalcula: [
    "We zoeken de CPI op van de beginmaand en van de eindmaand. Het CBS gebruikt 2025 als basisjaar (2025 = 100).",
    "Nieuw bedrag = bedrag × CPI eindmaand ÷ CPI beginmaand.",
    "Kies je een maand die het CBS nog niet heeft gepubliceerd, dan rekenen we tot de laatste bekende maand.",
  ],
  ejemplo: ["€ 1.000 in januari 2020 was in september 2026 ongeveer € 1.325 waard: de prijzen stegen in die periode met ruim 32%."],
  faq: [
    {
      pregunta: "Welke index gebruik je?",
      respuesta: "De consumentenprijsindex (CPI) voor alle bestedingen van het CBS, met 2025 als basisjaar. Die meet hoe de prijzen veranderen van wat een gemiddeld Nederlands huishouden koopt.",
    },
    {
      pregunta: "Wat is het verschil tussen CPI en HICP?",
      respuesta: "De HICP is de Europees geharmoniseerde prijsindex, waarmee landen in de EU worden vergeleken. Wij rekenen met de CPI.",
    },
    {
      pregunta: "Hoe vaak komt er een nieuw cijfer?",
      respuesta: "Het CBS publiceert de CPI elke maand. Wij werken de reeks bij zodra er een nieuwe maand is.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumentenprijsindex: de prijsontwikkeling van goederen en diensten die huishoudens kopen." },
    { termino: "Inflatie", definicion: "De stijging van het algemene prijsniveau, meestal gemeten over twaalf maanden." },
  ],
});
