import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.loonbelasting-berekenen",
  h1: "Loonbelasting berekenen in Suriname",
  title: "Loonbelasting berekenen Suriname 2026: schijven en vrije som",
  description:
    "Bereken je loonbelasting per maand of per jaar met de belastingvrije som van {{sr.belastingvrije-som}} en de schijven van {{sr.loonbelasting-tarief[1].tasa}} tot {{sr.loonbelasting-tarief[-1].tasa}}.",
  intro: [
    "Loonbelasting is de belasting die je werkgever elke maand op je loon inhoudt en afdraagt aan de Belastingdienst. Hoeveel het is, hangt af van je loon en van de belastingvrije som.",
    "Hier zie je stap voor stap hoe de belasting tot stand komt: van brutoloon naar zuiver loon, dan naar belastbaar loon en daarna per schijf.",
  ],
  comoSeCalcula: [
    "Van je loon gaat eerst je eigen pensioenpremie af, als je die betaalt.",
    "Dan de vaste aftrek beroepskosten: {{sr.forfaitaire-aftrek}} van het loon, maximaal {{sr.forfaitaire-aftrek-max}} per jaar. Dat geeft het zuiver loon.",
    "Van het zuiver loon gaat de belastingvrije som van {{sr.belastingvrije-som}} per jaar af. Wat overblijft is het belastbaar loon.",
    "Over het belastbaar loon betaal je {{sr.loonbelasting-tarief[0].tasa}} tot en met {{sr.loonbelasting-tarief[0].hasta}}, {{sr.loonbelasting-tarief[1].tasa}} tot en met {{sr.loonbelasting-tarief[1].hasta}}, {{sr.loonbelasting-tarief[2].tasa}} tot en met {{sr.loonbelasting-tarief[2].hasta}} en {{sr.loonbelasting-tarief[3].tasa}} over het deel daarboven.",
    "De wet rekent per jaar. Voor een maand delen we de jaarbelasting door twaalf.",
  ],
  ejemplo: [
    "Bij SRD 20.000 per maand is het jaarloon SRD 240.000. Na de aftrek van SRD 4.800 blijft SRD 235.200 zuiver loon over, en na de vrije som SRD 127.200 belastbaar loon. De belasting is SRD 23.136 per jaar, dat is SRD 1.928 per maand.",
  ],
  faq: [
    {
      pregunta: "Betaal ik over mijn hele loon het hoogste tarief?",
      respuesta: "Nee. Elk tarief geldt alleen voor het deel van je belastbaar loon dat in die schijf valt. Daarom is je gemiddelde tarief altijd lager dan het tarief van je hoogste schijf.",
    },
    {
      pregunta: "Wat is het verschil tussen loonbelasting en inkomstenbelasting?",
      respuesta: "Loonbelasting is een voorheffing op loon die je werkgever inhoudt. Inkomstenbelasting is de belasting over je hele inkomen van een jaar, ook uit een eigen bedrijf of verhuur.",
    },
    {
      pregunta: "Hoe wordt overwerk belast?",
      respuesta: "Op verzoek wordt loon voor overwerk apart belast met lagere tarieven per maand. Dat zie je in de berekening van overuren.",
    },
    {
      pregunta: "Geldt de belastingvrije som ook als ik in het buitenland woon?",
      respuesta: "Nee. Voor werknemers die niet in Suriname wonen, telt de wet het zuiver loon zonder belastingvrije som.",
    },
  ],
  glosario: [
    { termino: "Belastbaar loon", definicion: "Het zuiver loon min de belastingvrije som. Hierover wordt de loonbelasting berekend." },
    { termino: "Schijf", definicion: "Een deel van het belastbaar loon waarvoor een eigen tarief geldt." },
  ],
});
