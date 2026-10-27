import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.tax-penalty-calculator",
  h1: "Tax penalty calculator Rwanda",
  title: "RRA penalties and interest for late tax payment",
  description: "Work out the RRA fine and interest when you file or pay late: fines from {{rw.fine-unpaid[up-to-30]}} to {{rw.fine-undeclared[over-60]}} and monthly interest, district taxes included.",
  intro: [
    "Paying tax late costs an administrative fine and interest for each month. Enter the tax, how late you are and whether the return was filed on time.",
  ],
  comoSeCalcula: [
    "Not declared and not paid on time: a fine of {{rw.fine-undeclared[up-to-30]}} up to 30 days late, {{rw.fine-undeclared[31-to-60]}} from 31 to 60 days and {{rw.fine-undeclared[over-60]}} after that.",
    "Declared on time but paid late: {{rw.fine-unpaid[up-to-30]}}, {{rw.fine-unpaid[31-to-60]}} or {{rw.fine-unpaid[over-60]}} for the same periods.",
    "Interest: {{rw.late-interest[up-to-6]}} a month for a delay of up to six months, {{rw.late-interest[6-to-12]}} up to twelve months and {{rw.late-interest[over-12]}} beyond. It is not compounded and never goes above the tax itself.",
    "District taxes: {{rw.local-fine}} for late or false declaration, {{rw.local-interest}} interest a month and an extra {{rw.local-extra}} capped at {{rw.local-extra-cap}}.",
  ],
  ejemplo: ["RWF 1,000,000 of tax neither declared nor paid until 45 days late costs a fine of RWF 400,000 and RWF 10,000 of interest."],
  faq: [
    {
      pregunta: "In what order is a payment applied?",
      respuesta: "First to the principal tax, then to the administrative fine, then to the interest.",
    },
    {
      pregunta: "What if I declared too little?",
      respuesta: "If the RRA finds the tax declared was more than 10% short, the fine is 10% of the shortfall; more than 20% short, it is 20%. Correcting and paying before an audit is announced avoids this fine, though late interest still applies.",
    },
    {
      pregunta: "Is there also a fixed fine for filing late?",
      respuesta: "Yes. A late return also carries a fixed fine that depends on the size of the business, from RWF 50,000 to RWF 500,000.",
    },
  ],
  glosario: [
    { termino: "Principal tax", definicion: "The tax itself, before fines and interest." },
    { termino: "Administrative fine", definicion: "A penalty set as a share of the tax due." },
  ],
});
