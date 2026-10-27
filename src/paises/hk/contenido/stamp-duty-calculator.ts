import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.stamp-duty-calculator",
  h1: "Stamp duty calculator Hong Kong",
  title: "Stamp duty calculator Hong Kong {{anio}} (AVD)",
  description:
    "Work out the ad valorem stamp duty on a Hong Kong property purchase, residential or not, with the rates in force since {{hk.avd-residential#desde}}.",
  intro: [
    "Ad valorem stamp duty (AVD) is paid on the documents for buying property in Hong Kong. It depends on the price or the value, whichever is higher.",
    "Homes and non-residential property use different scales. Enter the price to see the duty and what share of the price it is.",
  ],
  comoSeCalcula: [
    "Up to {{hk.avd-residential[0].hasta}} the duty is a fixed {{hk.avd-residential[0].cuotaFija}}.",
    "Above that, each price band has a rate that applies to the whole price, from {{hk.avd-residential[2].tasa}} up to {{hk.avd-residential[-1].tasa}} for homes and {{hk.avd-non-residential[-1].tasa}} for other property.",
    "Just above each band limit there is a marginal relief band: a fixed amount plus a share of the excess, so the duty doesn't jump.",
    "Any fraction of a dollar is rounded up.",
  ],
  ejemplo: ["A $5 million flat pays 2.25% of the whole price: $112,500. A $4 million flat pays $100."],
  faq: [
    {
      pregunta: "How much stamp duty is there on a $4 million flat?",
      respuesta: "{{hk.avd-residential[0].cuotaFija}}. Every property up to {{hk.avd-residential[0].hasta}} pays that fixed amount.",
    },
    {
      pregunta: "What changed in February 2026?",
      respuesta:
        "For homes signed on or after {{hk.avd-residential#desde}}, the rate above {{hk.avd-residential[-2].desde}} went up to {{hk.avd-residential[-1].tasa}}. Non-residential property moved to its own Scale 3, which keeps a top rate of {{hk.avd-non-residential[-1].tasa}}.",
    },
    {
      pregunta: "Is AVD worked out on the price I pay?",
      respuesta: "On the price or the value of the property, whichever is higher.",
    },
  ],
  glosario: [
    { termino: "AVD", definicion: "Ad valorem stamp duty: a duty that depends on the price or value of the property." },
    { termino: "Marginal relief", definicion: "A band just above each limit where the duty is a fixed amount plus a share of the excess, so it rises gradually." },
  ],
});
