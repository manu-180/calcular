import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.netto-naar-bruto-berekenen",
  h1: "Van netto naar bruto rekenen",
  title: "Netto naar bruto berekenen Suriname 2026",
  description:
    "Weet je welk nettoloon je wilt? Reken terug naar het brutoloon, met de loonbelasting, de belastingvrije som van {{sr.belastingvrije-som}} en de AOV-premie.",
  intro: [
    "Bij een sollicitatie of loononderhandeling weet je vaak wat je netto wilt overhouden, maar wordt er over bruto gepraat. Deze berekening rekent terug.",
    "Vul het nettoloon per maand in. Je ziet welk brutoloon daarbij hoort en hoeveel loonbelasting en AOV-premie erop worden ingehouden.",
  ],
  comoSeCalcula: [
    "We zoeken het brutoloon waarbij de bruto netto berekening precies op jouw nettoloon uitkomt.",
    "Die berekening trekt de vaste aftrek beroepskosten ({{sr.forfaitaire-aftrek}}, maximaal {{sr.forfaitaire-aftrek-max}} per jaar) en de belastingvrije som af, past de schijven van {{sr.loonbelasting-tarief[0].tasa}} tot {{sr.loonbelasting-tarief[-1].tasa}} toe en rekent {{sr.aov-premie}} AOV-premie.",
    "We gaan uit van iemand die in Suriname woont, zonder pensioenpremie via het werk.",
  ],
  ejemplo: ["Wil je netto SRD 13.758 per maand overhouden, dan heb je een brutoloon van SRD 15.000 nodig."],
  faq: [
    {
      pregunta: "Waarom stijgt het bruto sneller dan het netto?",
      respuesta: "Elke extra dollar bruto valt in je hoogste schijf. In de hoogste schijf betaal je over elke extra dollar {{sr.loonbelasting-tarief[-1].tasa}} loonbelasting en daarbovenop AOV-premie.",
    },
    {
      pregunta: "Betaal ik pensioenpremie via mijn werk?",
      respuesta: "Dan gaat die premie ook nog van je bruto af. Gebruik in dat geval de bruto netto berekening, waar je de premie kunt invullen.",
    },
    {
      pregunta: "Klopt dit tot op de cent?",
      respuesta: "De uitkomst is afgerond op hele centen. Je werkgever gebruikt loonbelastingtabellen met eigen afrondingen, dus een verschil van een paar cent is mogelijk.",
    },
  ],
  glosario: [{ termino: "Brutoloon", definicion: "Je loon voordat loonbelasting, AOV-premie en andere inhoudingen eraf gaan." }],
});
