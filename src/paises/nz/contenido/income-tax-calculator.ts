import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.income-tax-calculator",
  h1: "Income tax calculator NZ",
  title: "NZ income tax calculator: tax on your yearly income",
  description:
    "Work out New Zealand income tax on your yearly income with the current IRD tax rates, plus the ACC earners' levy. See your average and top tax rate.",
  intro: [
    "Enter your taxable income for the tax year and see how much income tax you pay, your average rate and the rate on your last dollar.",
    "Tick the ACC earners' levy if the income is your pay from a job, and we add {{nz.acc-earners-levy-rate}} on earnings up to {{nz.acc-max-liable-earnings}}.",
  ],
  comoSeCalcula: [
    "New Zealand taxes income in bands. Each part of your income pays the rate of its band, so moving into a higher band only affects the dollars above the line.",
    "The bands are 10.5% up to $15,600, 17.5% up to $53,500, 30% up to $78,100, 33% up to $180,000 and 39% above that.",
    "The ACC earners' levy is a flat {{nz.acc-earners-levy-rate}} on earnings up to {{nz.acc-max-liable-earnings}} a year.",
  ],
  ejemplo: ["On $50,000 you pay $1,638 on the first $15,600 and $6,020 on the next $34,400, so $7,658 income tax. That's an average rate of 15.3%."],
  faq: [
    {
      pregunta: "Is there a tax-free threshold in New Zealand?",
      respuesta: "No. Income tax starts at 10.5% from the first dollar. People on middle incomes may get the independent earner tax credit instead.",
    },
    {
      pregunta: "Will a pay rise push all my income into a higher band?",
      respuesta: "No. Only the dollars above the band line pay the higher rate. The rest of your income is taxed exactly as before.",
    },
    {
      pregunta: "When does the tax year run?",
      respuesta: "From 1 April to 31 March. Inland Revenue calls 1 April 2026 to 31 March 2027 the 2027 tax year.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Your income for the tax year after any deductions you can claim." },
    { termino: "Marginal rate", definicion: "The rate you pay on your next dollar of income." },
  ],
});
