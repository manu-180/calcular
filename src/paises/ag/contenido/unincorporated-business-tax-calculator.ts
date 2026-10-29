import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.unincorporated-business-tax-calculator",
  h1: "Unincorporated Business Tax calculator {{anio}}",
  title: "Unincorporated Business Tax calculator {{anio}}: UBT",
  description: "Work out Unincorporated Business Tax for a sole trader or partnership: {{ag.ubt-sole-trader-bands[0].tasa}} on the first {{ag.ubt-sole-trader-bands[1].desde}} of income, then {{ag.ubt-sole-trader-bands[1].tasa}}.",
  intro: [
    "Unincorporated Business Tax (UBT) is what sole traders and partnerships pay on the profit of the business. Enter your chargeable income and the number of owners.",
    "The Inland Revenue Department publishes the rates in its UBT FAQ. A sole trader pays nothing on the first {{ag.ubt-sole-trader-bands[1].desde}}, {{ag.ubt-sole-trader-bands[1].tasa}} on the next band and {{ag.ubt-sole-trader-bands[2].tasa}} above {{ag.ubt-sole-trader-bands[2].desde}}.",
  ],
  comoSeCalcula: [
    "Chargeable income is the business income left after the expenses incurred to earn it. Personal expenses outside the business are not allowed.",
    "Each part of your income pays the rate of its band. For partnerships, every extra partner moves both band limits up by {{ag.ubt-partner-step}}, which matches the IRD tables for two to five partners.",
    "The annual return (form F15) is due on 31 March of the next year. Filing late carries a penalty equal to the greater of {{ag.ubt-late-filing-rate}} of the tax owing or {{ag.ubt-late-filing-minimum}}.",
  ],
  ejemplo: [
    "A sole trader has chargeable income of EC$120,000. The first EC$42,000 is taxed at 0%. The remaining EC$78,000 is taxed at 8%, so the tax is EC$6,240. With EC$250,000 the tax is EC$11,520 on the middle band plus EC$16,000 at 25%, EC$27,520 in all.",
  ],
  faq: [
    {
      pregunta: "What are the UBT rates?",
      respuesta: "For a sole trader, 0% up to {{ag.ubt-sole-trader-bands[1].desde}}, {{ag.ubt-sole-trader-bands[1].tasa}} up to {{ag.ubt-sole-trader-bands[2].desde}} and {{ag.ubt-sole-trader-bands[2].tasa}} above, according to question 10 of the IRD's UBT FAQ.",
    },
    {
      pregunta: "What is the penalty for filing late?",
      respuesta: "The greater of {{ag.ubt-late-filing-rate}} of the tax owing or {{ag.ubt-late-filing-minimum}}, according to question 12 of the IRD's UBT FAQ.",
    },
    {
      pregunta: "Does the registration fee count toward the tax?",
      respuesta: "Yes. The IRD says the annual registration fee paid on form R02 goes toward the annual tax liability and is the minimum tax liability for the business.",
    },
  ],
  glosario: [
    { termino: "Chargeable income", definicion: "Business income after the expenses allowed against it." },
    { termino: "Sole trader", definicion: "A person who runs a business alone without forming a company." },
    { termino: "Form F15", definicion: "The annual UBT return, due on 31 March." },
  ],
});
