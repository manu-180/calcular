import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.inkomstenbelasting-berekenen",
  h1: "Inkomstenbelasting berekenen in Suriname",
  title: "Inkomstenbelasting Suriname {{anio}} berekenen met AOV",
  description:
    "Bereken de inkomstenbelasting over je zuiver inkomen: niets tot {{sr.ib-tarief[0].hasta}}, daarna {{sr.ib-tarief[1].tasa}} tot {{sr.ib-tarief[-1].tasa}}. Met de AOV-premie van {{sr.aov-premie}}.",
  intro: [
    "Heb je een eigen bedrijf, verhuur je iets of heb je naast je loon nog ander inkomen? Dan betaal je inkomstenbelasting over je zuiver inkomen van het hele jaar.",
    "Vul je zuiver inkomen in, dus na aftrek van je kosten en je persoonlijke aftrekposten. Je ziet de inkomstenbelasting en de AOV-premie die je daarover betaalt.",
  ],
  comoSeCalcula: [
    "Over de eerste {{sr.ib-tarief[0].hasta}} van je zuiver inkomen betaal je geen belasting.",
    "Daarboven betaal je {{sr.ib-tarief[1].tasa}} tot en met {{sr.ib-tarief[1].hasta}}, {{sr.ib-tarief[2].tasa}} tot en met {{sr.ib-tarief[2].hasta}}, {{sr.ib-tarief[3].tasa}} tot en met {{sr.ib-tarief[3].hasta}} en {{sr.ib-tarief[-1].tasa}} over de rest.",
    "De AOV-premie is {{sr.aov-premie}} van het zuiver inkomen, tot je 60 wordt.",
  ],
  ejemplo: [
    "Bij een zuiver inkomen van SRD 300.000 is de inkomstenbelasting SRD 47.760 en de AOV-premie SRD 12.000. Samen SRD 59.760.",
  ],
  faq: [
    {
      pregunta: "Wat is zuiver inkomen?",
      respuesta: "Je onzuiver inkomen uit werk, bedrijf, vermogen en andere bronnen, min de kosten en de persoonlijke aftrekposten die de wet toestaat. Voorbeelden zijn hypotheekrente voor je eigen woning tot een maximum, en ziektekosten boven 10% van je onzuiver inkomen.",
    },
    {
      pregunta: "Zijn de schijven gelijk aan die van de loonbelasting?",
      respuesta: "Ja, in bedragen per jaar. De loonbelasting trekt eerst de belastingvrije som af en past dan de schijven toe. De inkomstenbelasting heeft die vrije som als eerste schijf van 0% in het tarief zitten. De uitkomst is dezelfde.",
    },
    {
      pregunta: "Betaal ik als zelfstandige ook AOV-premie?",
      respuesta: "Ja. Iedereen die in Suriname woont en winst uit bedrijf of beroep of loon geniet, betaalt tot 60 jaar {{sr.aov-premie}} AOV-premie over het zuiver inkomen.",
    },
  ],
  glosario: [
    { termino: "Onzuiver inkomen", definicion: "Alle inkomsten van een jaar bij elkaar, voor aftrek van de persoonlijke aftrekposten." },
    { termino: "Zuiver inkomen", definicion: "Het inkomen waarover de belasting wordt berekend." },
  ],
});
