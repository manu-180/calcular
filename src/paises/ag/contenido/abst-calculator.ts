import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.abst-calculator",
  h1: "ABST calculator Antigua and Barbuda {{anio}}",
  title: "ABST calculator {{anio}}: add or remove tax",
  description: "Add the current Antigua and Barbuda Sales Tax of {{ag.abst-rate}} to a price or take it out of a price that already includes it.",
  intro: [
    "The Antigua and Barbuda Sales Tax (ABST) is charged at {{ag.abst-rate}} on most goods and services. Enter an amount and choose whether to add the tax or take it out.",
    "The standard rate has applied since {{ag.abst-rate#desde}}, when the Revenue (Miscellaneous Provisions) Act, 2023 raised it from 15%. The same Act brought the old 14% accommodation rate up to the standard rate.",
  ],
  comoSeCalcula: [
    "To add ABST, multiply the price by {{ag.abst-rate}} and add the result to the price.",
    "To take ABST out of a price that includes it, divide the price by 1 plus the rate. The difference between the two amounts is the tax.",
    "A registered business lodges its ABST return within {{ag.abst-return-days}} calendar days after the end of each tax period. That deadline comes from section 39(1) of the Sales Tax Act as amended in 2024.",
  ],
  ejemplo: [
    "A shop sells a fan for EC$1,000 before tax. The ABST is EC$170 and the shelf price is EC$1,170. Going the other way, a receipt for EC$1,170 contains EC$1,000 of goods and EC$170 of tax.",
  ],
  faq: [
    {
      pregunta: "What is the ABST rate?",
      respuesta: "The standard rate is {{ag.abst-rate}}. Section 8(3) of the Antigua and Barbuda Sales Tax Act 2006 was amended by the Revenue (Miscellaneous Provisions) Act, 2023, which replaced 15 and 14 with 17.",
    },
    {
      pregunta: "When must an ABST return be filed?",
      respuesta: "Within {{ag.abst-return-days}} calendar days after the end of the tax period, under section 39(1) of the Sales Tax Act as replaced by the Sales Tax (Amendment) Act 2024.",
    },
    {
      pregunta: "Is ABST charged on everything?",
      respuesta: "No. Some supplies are zero rated or exempt under the schedules to the Act. This calculator applies the standard rate only, so check the schedules before you use it on food, medicine or services listed there.",
    },
  ],
  glosario: [
    { termino: "ABST", definicion: "Antigua and Barbuda Sales Tax, the consumption tax collected by the Inland Revenue Department." },
    { termino: "Tax period", definicion: "The month or other period for which a registered business reports its sales and tax." },
    { termino: "Zero rated", definicion: "Taxable at 0%, so the seller can still claim back tax paid on purchases." },
  ],
});
