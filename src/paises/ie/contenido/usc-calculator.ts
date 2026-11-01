import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.usc-calculator",
  h1: "USC calculator {{anio}}",
  title: "USC calculator {{anio}}: Universal Social Charge rates",
  description: "Calculate your Universal Social Charge for {{anio}} with Revenue's bands, the {{ie.usc-exemption}} exemption and the reduced rates for over 70s and medical card holders.",
  intro: [
    "The Universal Social Charge (USC) is a tax on your total income, separate from Income Tax and PRSI. Enter your yearly income to see what you pay in 2026.",
    "If your income is {{ie.usc-exemption}} or less you pay nothing. Above that, USC is charged on all of it, band by band.",
  ],
  comoSeCalcula: [
    "Check whether your income is over {{ie.usc-exemption}}. If it is not, no USC is due.",
    "If it is, each slice of income pays its own rate: 0.5% on the first €12,012, 2% up to €28,700, 3% up to €70,044 and 8% on the rest.",
    "If you are 70 or over, or hold a full medical card, and your income is {{ie.usc-reduced-income-limit}} or less, you pay 0.5% on the first €12,012 and 2% on the rest.",
  ],
  ejemplo: [
    "On €50,000 you pay €60.06 on the first €12,012, €333.76 on the next €16,688 and €639 on the last €21,300. That is €1,032.82 for the year.",
  ],
  faq: [
    {
      pregunta: "Is USC charged on social welfare payments?",
      respuesta: "Some payments and income are exempt from USC. Revenue lists them on its page about payments and income exempt from USC.",
    },
    {
      pregunta: "What counts as a full medical card?",
      respuesta: "A full medical card, not a GP visit card. A medical card holder has to contact Revenue to get the reduced rate.",
    },
    {
      pregunta: "What happens just over the exemption limit?",
      respuesta: "Once your income goes over {{ie.usc-exemption}}, USC is charged on your full income, not only on the part above the limit.",
    },
    {
      pregunta: "Is there extra USC for the self-employed?",
      respuesta: "Yes. If your non-PAYE income is more than €100,000 a year, there is a USC surcharge of 3%. This calculator does not add it.",
    },
  ],
  glosario: [
    { termino: "USC", definicion: "Universal Social Charge, a tax on total income collected with Income Tax." },
    { termino: "Non-PAYE income", definicion: "Income not taxed through payroll, such as self-employed or rental income." },
  ],
});
