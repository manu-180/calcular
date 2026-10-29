import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.employer-cost-calculator",
  h1: "Employer cost calculator Brunei {{anio}}",
  title: "Brunei employer cost {{anio}}: salary plus SPK",
  description:
    "Work out what a salary costs you in Brunei: the SPK employer share runs from {{bn.spk-employer-bands[-1].tasa}} to {{bn.spk-employer-bands[1].tasa}}, with a {{bn.spk-employer-minimum}} minimum.",
  intro: [
    "Hiring in Brunei Darussalam adds one statutory cost on top of salary: your share of the Skim Persaraan Kebangsaan (SPK). The share depends on the employee's salary group. It is {{bn.spk-employer-bands[1].tasa}} for pay up to {{bn.spk-employer-bands[1].hasta}} and drops to {{bn.spk-employer-bands[-1].tasa}} above {{bn.spk-employer-bands[-1].desde}}.",
    "Enter the monthly salary, say whether the employee is a citizen or permanent resident, and set the number of people on that pay. You see the cost per person, per month and per year.",
  ],
  comoSeCalcula: [
    "Salary groups: up to {{bn.spk-employer-bands[0].hasta}} the employer pays a fixed {{bn.spk-employer-bands[0].cuotaFija}}. From {{bn.spk-employer-bands[1].desde}} to {{bn.spk-employer-bands[1].hasta}} it is {{bn.spk-employer-bands[1].tasa}}, then {{bn.spk-employer-bands[2].tasa}} up to {{bn.spk-employer-bands[2].hasta}}, then {{bn.spk-employer-bands[3].tasa}}.",
    "The rate is charged on the whole salary, and the minimum employer contribution is {{bn.spk-employer-minimum}}. There is no maximum.",
    "SPK is only due for citizens and permanent residents under 60. Payment is due by day {{bn.spk-payment-day}} of the following month.",
  ],
  ejemplo: [
    "For a citizen paid BND 2,000 a month, the employer pays 9.5%, which is BND 190.00. The cost is BND 2,190.00 a month, or BND 26,280.00 a year. Ten people on the same pay cost BND 21,900.00 a month.",
  ],
  faq: [
    {
      pregunta: "Do I pay SPK for foreign workers?",
      respuesta: "No. The Employees Trust Fund registers citizens and permanent residents under 60. Other costs for foreign workers, such as insurance or passage, come from the contract and are not in this calculator.",
    },
    {
      pregunta: "Which pay counts for the employer contribution?",
      respuesta: "Basic salary, or the pay for work done when there is no basic salary. TAP lists payments that do not count, such as overtime, housing and travelling allowances, gratuity and service charge.",
    },
    {
      pregunta: "When is payment due?",
      respuesta: "A complete payment, meaning the money together with the contribution payment listing, must reach TAP by the 15th of the following month. Late employers are liable to a penalty charge.",
    },
    {
      pregunta: "Can I pay more than the minimum?",
      respuesta: "Yes. Employers and employees may make voluntary contributions on top of the mandatory ones. The employer's voluntary amount goes to the member's SPK Member Account.",
    },
  ],
  glosario: [
    { termino: "Salary group", definicion: "The band of monthly salary that sets the employer rate." },
    { termino: "Contribution payment listing", definicion: "The list of employees and amounts sent to TAP with the payment." },
    { termino: "Voluntary contribution", definicion: "Extra money paid in beyond the mandatory rates." },
  ],
});
