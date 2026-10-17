import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.rsz-berekenen",
  h1: "RSZ berekenen: persoonlijke bijdrage en werkbonus",
  title: "RSZ berekenen 2026: {{be.rsz-werknemer}} en de werkbonus",
  description:
    "Bereken je persoonlijke RSZ-bijdrage van {{be.rsz-werknemer}}, de werkbonus voor lage lonen en de bijzondere bijdrage voor de sociale zekerheid, voor bedienden en arbeiders.",
  intro: [
    "Als werknemer betaal je {{be.rsz-werknemer}} van je brutoloon aan de sociale zekerheid. Die bijdrage financiert je pensioen, je ziekteverzekering en de werkloosheidsverzekering.",
    "Verdien je weinig, dan krijg je een korting op die bijdrage: de werkbonus. Daarnaast houdt je werkgever een bijzondere bijdrage voor de sociale zekerheid in, die afhangt van je loon en je gezinssituatie.",
  ],
  comoSeCalcula: [
    "RSZ-bijdrage: {{be.rsz-werknemer}} van je brutoloon. Voor arbeiders op 108 % van het brutoloon.",
    "Werkbonus luik A (lage lonen): tot een refertemaandloon van {{be.werkbonus[grens-a]}} krijg je het volledige bedrag. Daarboven daalt het tot nul bij {{be.werkbonus[plafond-a]}}.",
    "Werkbonus luik B (zeer lage lonen): volledig tot {{be.werkbonus[grens-b]}}, daarna dalend tot nul bij {{be.werkbonus[plafond-b]}}.",
    "De werkbonus kan nooit hoger zijn dan je RSZ-bijdrage.",
    "Bijzondere bijdrage: een bedrag per kwartaal volgens een schaal op je kwartaalloon, elke maand voor een derde ingehouden.",
  ],
  ejemplo: [
    "Een alleenstaande bediende met € 2.800 bruto betaalt € 365,96 RSZ. De werkbonus is € 127,54 (luik A) plus € 37,21 (luik B), dus er blijft € 201,21 RSZ over. De bijzondere bijdrage is € 17,04 per maand.",
  ],
  faq: [
    {
      pregunta: "Waarvoor dient de RSZ-bijdrage?",
      respuesta: "Je persoonlijke bijdrage gaat naar je pensioen, de ziekte- en invaliditeitsverzekering en de werkloosheidsverzekering. Je werkgever betaalt daarbovenop zelf ook bijdragen.",
    },
    {
      pregunta: "Krijg ik de werkbonus automatisch?",
      respuesta: "Ja. Je werkgever past hem toe bij elke loonbetaling als je loon onder de grens ligt. Je hoeft er niets voor te doen.",
    },
    {
      pregunta: "Is de bijzondere bijdrage voor de sociale zekerheid definitief?",
      respuesta: "Nee. De maandelijkse inhoudingen zijn voorschotten. De FOD Financiën rekent de bijdrage definitief af met je belastingaangifte, op basis van het belastbaar inkomen van je gezin.",
    },
  ],
  glosario: [
    { termino: "Refertemaandloon", definicion: "Het brutoloon voor een volledige maand aan 100 %, waarmee de werkbonus wordt bepaald." },
    { termino: "Werkbonus", definicion: "Een vermindering van de persoonlijke RSZ-bijdrage voor werknemers met een laag loon." },
    { termino: "RSZ", definicion: "Rijksdienst voor Sociale Zekerheid, die de sociale bijdragen int." },
  ],
});
