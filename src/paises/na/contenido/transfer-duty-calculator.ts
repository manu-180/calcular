import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.transfer-duty-calculator",
  h1: "Transfer duty calculator Namibia",
  title: "Transfer duty calculator Namibia: duty and stamp duty",
  description:
    "Work out transfer duty and stamp duty on a property in Namibia. People pay nothing up to {{na.transfer-duty-natural[0].hasta}}; companies pay {{na.transfer-duty-other}}.",
  intro: [
    "Buying a house, flat or plot comes with transfer duty, paid to NamRA, and stamp duty on the transfer deed.",
    "Enter the price and who is buying to see both amounts under the rates in force since 1 October 2024.",
  ],
  comoSeCalcula: [
    "A person buying property other than farmland pays no transfer duty up to {{na.transfer-duty-natural[0].hasta}}, then {{na.transfer-duty-natural[1].tasa}} up to {{na.transfer-duty-natural[1].hasta}}, {{na.transfer-duty-natural[2].tasa}} up to {{na.transfer-duty-natural[2].hasta}}, {{na.transfer-duty-natural[3].tasa}} up to {{na.transfer-duty-natural[3].hasta}} and {{na.transfer-duty-natural[-1].tasa}} above that, each rate on the part in its band.",
    "Stamp duty for a person: nothing up to {{na.stamp-duty-transfer[exempt-up-to]}}, then {{na.stamp-duty-transfer[per-1000]}} for every N$1,000 or part of it above that.",
    "Companies, close corporations and trusts pay transfer duty of {{na.transfer-duty-other}} of the value.",
  ],
  ejemplo: ["A person buying a house for N$1,500,000 pays N$4,000 transfer duty and N$4,000 stamp duty, N$8,000 in total."],
  faq: [
    {
      pregunta: "When must transfer duty be paid?",
      respuesta: "Within six months of the date you acquire the property. NamRA charges a 10% penalty on late payment.",
    },
    {
      pregunta: "Who does not pay transfer duty?",
      respuesta: "Among others, the State, local authorities and public educational institutions, a surviving spouse inheriting from the deceased spouse, and a surviving or divorced spouse taking sole ownership.",
    },
    {
      pregunta: "What value is used?",
      respuesta: "The amount paid for the property. If nothing is paid, the declared value is used.",
    },
    {
      pregunta: "Does buying shares in a company that owns a house count?",
      respuesta: "Yes. Since October 2024, a share in a company, a member's interest in a close corporation or an interest in a trust that owns residential property counts as property for transfer duty.",
    },
  ],
  glosario: [
    { termino: "Transfer duty", definicion: "Tax on acquiring property, under the Transfer Duty Act, 1993." },
    { termino: "Stamp duty", definicion: "Duty on legal documents such as the transfer deed, under the Stamp Duties Act, 1993." },
    { termino: "Natural person", definicion: "A human being, as opposed to a company, close corporation or trust." },
  ],
});
