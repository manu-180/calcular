import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.child-tax-credit",
  h1: "Child tax credit calculator",
  title: "Child Tax Credit Calculator {{anio}}: {{us.ctc-amount}} per child",
  description:
    "Estimate your {{anio}} child tax credit: {{us.ctc-amount}} per child under 17, up to {{us.actc-max}} refundable, and {{us.odc-amount}} for other dependents. Income limits included.",
  intro: [
    "The child tax credit lowers your federal income tax for each child under 17. If the credit is bigger than your tax, part of it can come back as a refund.",
    "Enter your children, income and tax to see how much of the credit you get.",
  ],
  comoSeCalcula: [
    "Start with {{us.ctc-amount}} for each qualifying child and {{us.odc-amount}} for each other dependent.",
    "If your MAGI is over {{us.ctc-threshold[other]}} ({{us.ctc-threshold[mfj]}} on a joint return), the credit drops by {{us.ctc-phaseout-rate}} of the excess, rounded up to the next $1,000.",
    "The credit first cuts your income tax. Whatever is left can be refunded as the additional child tax credit, up to {{us.actc-max}} per child.",
    "The refundable part can't be more than {{us.actc-rate}} of your earned income above {{us.actc-earned-income-floor}}.",
  ],
  ejemplo: [
    "A married couple with two children, $80,000 of income and $3,000 of tax before credits gets the full $4,400. $3,000 wipes out their tax and $1,400 comes back in their refund.",
  ],
  faq: [
    {
      pregunta: "How much is the child tax credit for 2026?",
      respuesta: "{{us.ctc-amount}} per qualifying child under 17. Up to {{us.actc-max}} per child is refundable if your tax is too low to use it all.",
    },
    {
      pregunta: "Who counts as a qualifying child?",
      respuesta:
        "A son, daughter, stepchild, foster child, sibling or a descendant of one of them, under 17 at the end of the year, who lived with you more than half the year and didn't provide over half of their own support.",
    },
    {
      pregunta: "Do I get the credit if I don't owe any tax?",
      respuesta: "Partly. You need at least {{us.actc-earned-income-floor}} of earned income, and the refund is limited to {{us.actc-rate}} of earnings above that, up to {{us.actc-max}} per child.",
    },
  ],
  glosario: [
    { termino: "Nonrefundable credit", definicion: "A credit that can lower your tax to zero but not below." },
    { termino: "Additional child tax credit (ACTC)", definicion: "The refundable part of the child tax credit." },
    { termino: "Credit for other dependents", definicion: "A smaller nonrefundable credit for dependents who don't qualify for the child tax credit." },
  ],
});
