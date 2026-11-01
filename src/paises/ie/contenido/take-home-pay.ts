import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.take-home-pay",
  h1: "Take-home pay calculator Ireland {{anio}}",
  title: "Take-home pay calculator Ireland {{anio}}: salary after tax",
  description:
    "See your net pay after PAYE Income Tax, USC and PRSI for {{anio}}. Uses Revenue's rate bands and tax credits, with the Rent Tax Credit if you rent.",
  intro: [
    "Enter your gross salary and see what reaches your bank account each year, month and week after Income Tax, the Universal Social Charge and PRSI.",
    "It uses the 2026 figures from Revenue: a standard rate band of {{ie.rate-bands[single]}} for a single person, the Single Person Tax Credit of {{ie.tax-credits[single]}} and the Employee Tax Credit of {{ie.tax-credits[employee]}}.",
  ],
  comoSeCalcula: [
    "Income Tax is {{ie.income-tax-rates[standard]}} on income up to your rate band and {{ie.income-tax-rates[higher]}} on the rest. Your tax credits then come off the tax, not off your income.",
    "If you rent, the Rent Tax Credit is {{ie.rent-tax-credit-rate}} of the rent you pay, up to {{ie.rent-tax-credit[single]}} for a single person or {{ie.rent-tax-credit[couple]}} for a jointly assessed couple. It can only reduce Income Tax.",
    "USC is charged on your whole income once it goes over {{ie.usc-exemption}}, in bands from 0.5% to 8%.",
    "Employee PRSI is {{ie.prsi-employee-rate}} of all your weekly pay once it is over {{ie.prsi-weekly-thresholds[employee-starts]}}. Between that and {{ie.prsi-weekly-thresholds[credit-ends]}} a week a PRSI Credit of up to {{ie.prsi-credit-max}} makes it smaller.",
  ],
  ejemplo: [
    "A single person on €50,000 in June 2026 pays €7,200 Income Tax, €1,032.82 USC and €2,099.76 PRSI, and takes home €39,667.42 a year (about €3,305 a month).",
  ],
  faq: [
    {
      pregunta: "Why is my payslip a little different?",
      respuesta:
        "Payroll works on a cumulative basis, pay day by pay day, and rounds weekly or monthly figures. Your Tax Credit Certificate may also show different credits or a different rate band. Over a full year the totals should be close to this calculator.",
    },
    {
      pregunta: "Who gets the higher standard rate band?",
      respuesta:
        "A single parent who qualifies for the Single Person Child Carer Credit has a band of {{ie.rate-bands[single-parent]}}. A married couple or civil partners with one income has {{ie.rate-bands[married-one-income]}}. Couples with two incomes can use the income tax calculator, which works out the extra band.",
    },
    {
      pregunta: "Do I pay USC on all my income?",
      respuesta:
        "If your total income is over {{ie.usc-exemption}}, you pay USC on your full income. At {{ie.usc-exemption}} or less you pay none.",
    },
    {
      pregunta: "Who can use the reduced rates of USC?",
      respuesta:
        "People aged 70 or over and people with a full medical card (not a GP visit card), as long as their income is {{ie.usc-reduced-income-limit}} or less. They pay 0.5% on the first band and 2% on the rest.",
    },
    {
      pregunta: "Does the Rent Tax Credit reduce USC or PRSI?",
      respuesta: "No. It only reduces Income Tax, and you cannot get back more than the Income Tax you pay.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. Your employer takes Income Tax, USC and PRSI from your pay and sends it to Revenue." },
    { termino: "Rate band", definicion: "The part of your income taxed at the standard rate. Income above it is taxed at the higher rate." },
    { termino: "Tax credit", definicion: "An amount taken off the tax you owe. A €2,000 credit reduces your tax by €2,000." },
  ],
});
