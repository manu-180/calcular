import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.mobile-money-levy-calculator",
  h1: "Mobile money levy calculator",
  title: "Mobile money levy Zambia: what each transfer costs",
  description:
    "Check the Mobile Money Transaction Levy on MTN Money, Airtel Money, Zamtel Kwacha and other wallets, from {{zm.mmtl-bands[0].cuotaFija}} to {{zm.mmtl-bands[-1].cuotaFija}} per transaction.",
  intro: [
    "Enter the amount you send and see the levy ZRA charges on it. Add how many times a month you send that amount to see the monthly total.",
    "The levy is a fixed amount per transaction that depends on the size of the transfer. Your provider's own fees come on top.",
  ],
  comoSeCalcula: [
    "Up to {{zm.mmtl-bands[0].hasta}} the levy is {{zm.mmtl-bands[0].cuotaFija}}. Up to {{zm.mmtl-bands[1].hasta}} it is {{zm.mmtl-bands[1].cuotaFija}}, up to {{zm.mmtl-bands[2].hasta}} it is {{zm.mmtl-bands[2].cuotaFija}} and up to {{zm.mmtl-bands[3].hasta}} it is {{zm.mmtl-bands[3].cuotaFija}}.",
    "Up to {{zm.mmtl-bands[4].hasta}} it is {{zm.mmtl-bands[4].cuotaFija}}, up to {{zm.mmtl-bands[5].hasta}} it is {{zm.mmtl-bands[5].cuotaFija}} and up to {{zm.mmtl-bands[6].hasta}} it is {{zm.mmtl-bands[6].cuotaFija}}.",
    "Above {{zm.mmtl-bands[-1].desde}} it is {{zm.mmtl-bands[-1].cuotaFija}}.",
  ],
  ejemplo: ["Sending K2,000 ten times in a month costs K4 of levy each time, K40 in total."],
  faq: [
    {
      pregunta: "Which transactions pay the levy?",
      respuesta: "Person-to-person transfers, payments to and from the Government, utility bills, payments to merchants, bank-to-wallet transfers and transfers between two wallets of the same person.",
    },
    {
      pregunta: "Is anyone exempt?",
      respuesta: "The Minister can exempt a person by statutory instrument, but no such instrument has been issued, so the levy applies to everyone.",
    },
    {
      pregunta: "Is this the same as my provider's fee?",
      respuesta: "No. The levy goes to the Government. Your mobile money provider charges its own fee on top.",
    },
  ],
  glosario: [{ termino: "Mobile money service provider", definicion: "A company authorised by the Bank of Zambia to issue electronic money." }],
});
