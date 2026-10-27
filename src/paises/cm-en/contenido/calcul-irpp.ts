import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.calcul-irpp",
  h1: "IRPP calculator: income tax on salaries in Cameroon",
  title: "IRPP calculator Cameroon: tax on your salary",
  description:
    "Work out the IRPP withheld from your pay: General Tax Code allowances, rates from {{cm.irpp-bareme[0].tasa}} to {{cm.irpp-bareme[-1].tasa}} and the council additional tax.",
  intro: [
    "Personal income tax (IRPP) is withheld every month by your employer. A {{cm.cac}} council additional tax is added on top.",
    "Enter your monthly or yearly gross pay. You see the taxable base, the tax for the year and the monthly deduction.",
  ],
  comoSeCalcula: [
    "Start from the year's taxable gross pay and take off {{cm.irpp-frais-professionnels}} for work expenses, up to {{cm.irpp-plafond-frais}}.",
    "Take off the CNPS pension paid by the employee, then the flat allowance of {{cm.irpp-abattement}}.",
    "The scale works in bands: {{cm.irpp-bareme[0].tasa}} up to {{cm.irpp-bareme[0].hasta}}, {{cm.irpp-bareme[1].tasa}} up to {{cm.irpp-bareme[1].hasta}}, {{cm.irpp-bareme[2].tasa}} up to {{cm.irpp-bareme[2].hasta}} and {{cm.irpp-bareme[3].tasa}} above.",
    "The council additional tax is {{cm.cac}} of the tax. The monthly deduction is the year's tax divided by 12.",
  ],
  ejemplo: [
    "On 500,000 F a month: 6,000,000 F for the year, minus 1,800,000 F work expenses, 252,000 F CNPS and the 500,000 F allowance. The base is 3,448,000 F and IRPP is 462,000 F, so 38,500 F a month plus 3,850 F council tax.",
  ],
  faq: [
    {
      pregunta: "From what salary is IRPP withheld?",
      respuesta: "Employers withhold no IRPP on monthly gross pay below {{cm.irpp-seuil-retenue}}.",
    },
    {
      pregunta: "Does the top rate apply to my whole salary?",
      respuesta: "No. Each band of taxable income pays its own rate. Only the part above {{cm.irpp-bareme[3].desde}} a year pays {{cm.irpp-bareme[3].tasa}}.",
    },
    {
      pregunta: "Do I still file a return if tax is withheld?",
      respuesta: "Yes. The General Tax Code asks every employee for a yearly summary income return, which can be filed online. The tax already withheld is shown on it.",
    },
  ],
  glosario: [{ termino: "IRPP", definicion: "Personal income tax, withheld at source on salaries." }],
});
