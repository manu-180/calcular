import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.bruto-netto-salaris",
  h1: "Bruto netto salaris berekenen in Suriname",
  title: "Bruto netto salaris Suriname 2026: loonbelasting en AOV",
  description:
    "Reken je brutoloon om naar netto met de belastingvrije som van {{sr.belastingvrije-som}} per jaar, de loonbelasting en {{sr.aov-premie}} AOV-premie. Met de wetteksten erbij.",
  intro: [
    "Wat hou je over van je brutoloon? Je werkgever houdt elke maand loonbelasting en AOV-premie in, en vaak ook een pensioenpremie. Wat overblijft is je nettoloon.",
    "Vul je brutoloon per maand in. Betaal je pensioenpremie via je werk, vul dat bedrag dan ook in, want het gaat van je loon af voordat de belasting wordt berekend.",
  ],
  comoSeCalcula: [
    "Eerst gaat je eigen pensioenpremie van het loon af. Die hoort volgens de Wet Loonbelasting niet tot het loon.",
    "Dan de vaste aftrek voor beroepskosten: {{sr.forfaitaire-aftrek}} van het loon, met een maximum van {{sr.forfaitaire-aftrek-max}} per jaar. Wat overblijft is je zuiver loon.",
    "Over het zuiver loon boven de belastingvrije som van {{sr.belastingvrije-som}} per jaar betaal je loonbelasting: {{sr.loonbelasting-tarief[0].tasa}} tot {{sr.loonbelasting-tarief[0].hasta}}, {{sr.loonbelasting-tarief[1].tasa}} tot {{sr.loonbelasting-tarief[1].hasta}}, {{sr.loonbelasting-tarief[2].tasa}} tot {{sr.loonbelasting-tarief[2].hasta}} en {{sr.loonbelasting-tarief[-1].tasa}} daarboven. De wet rekent per jaar; wij delen de uitkomst door twaalf.",
    "De AOV-premie is {{sr.aov-premie}} van je zuiver loon. Ben je 60 of ouder, dan betaal je die niet meer.",
  ],
  ejemplo: [
    "Met een brutoloon van SRD 15.000 per maand is je zuiver loon SRD 14.600, want de aftrek voor beroepskosten is maximaal SRD 400 per maand. Boven de belastingvrije som blijft SRD 5.600 per maand over. Daarover betaal je SRD 658 loonbelasting. De AOV-premie is SRD 584. Je houdt netto SRD 13.758 over.",
  ],
  faq: [
    {
      pregunta: "Hoeveel mag ik belastingvrij verdienen?",
      respuesta: "De belastingvrije som is {{sr.belastingvrije-som}} per jaar, dus een twaalfde daarvan per maand aan zuiver loon. Omdat er eerst nog een aftrek voor beroepskosten af gaat, betaal je pas loonbelasting als je brutoloon daar iets boven ligt. AOV-premie betaal je wel over je hele zuiver loon.",
    },
    {
      pregunta: "Wordt mijn vakantietoelage of bonus ook zo belast?",
      respuesta: "Nee. Een vakantie-uitkering en een gratificatie zijn elk tot het loon van een maand vrij van loonbelasting, met een wettelijk maximum per jaar. Wat daarboven komt, wordt apart belast. Daarvoor hebben we een eigen berekening voor de vakantietoelage en voor de bonus.",
    },
    {
      pregunta: "Telt de AOV-premie mee als aftrek voor de loonbelasting?",
      respuesta: "Nee. De Wet Loonbelasting kent geen aftrek voor de AOV-premie. Beide worden over hetzelfde zuiver loon berekend en los van elkaar ingehouden.",
    },
    {
      pregunta: "Wat als ik niet in Suriname woon?",
      respuesta: "Woon je niet in Suriname, dan krijg je volgens de wet geen belastingvrije som. Deze berekening gaat uit van iemand die in Suriname woont.",
    },
  ],
  glosario: [
    { termino: "Zuiver loon", definicion: "Je loon min de vaste aftrek voor beroepskosten. Hierover worden loonbelasting en AOV-premie berekend." },
    { termino: "Belastingvrije som", definicion: "Het deel van het zuiver loon waarover je geen loonbelasting betaalt." },
    { termino: "AOV", definicion: "Algemene Oudedagsvoorziening, het staatspensioen vanaf 60 jaar. Werkenden tot 60 jaar betalen er premie voor." },
  ],
});
