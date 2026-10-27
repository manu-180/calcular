import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.income-tax-calculator",
  h1: "Income tax calculator Ireland {{anio}}",
  title: "Income tax calculator Ireland {{anio}}: bands and credits",
  description:
    "Work out your {{anio}} Income Tax in Ireland: rate bands at 20% and 40%, personal and employee tax credits, joint assessment and the Rent Tax Credit.",
  intro: [
    "Choose your tax status, enter your yearly income and see the Income Tax you owe for 2026, after your tax credits.",
    "It covers single people, single parents and married couples or civil partners with one or two incomes, using the bands and credits published by Revenue.",
  ],
  comoSeCalcula: [
    "Your rate band depends on your status: {{ie.rate-bands[single]}} if you are single, {{ie.rate-bands[single-parent]}} for a single parent and {{ie.rate-bands[married-one-income]}} for a couple with one income.",
    "A couple with two incomes gets {{ie.rate-bands[married-two-incomes]}} plus the lower of the two incomes, up to {{ie.rate-bands[married-increase-max]}} more.",
    "Income in the band is taxed at {{ie.income-tax-rates[standard]}} and the rest at {{ie.income-tax-rates[higher]}}. That is your tax before credits.",
    "Then your credits come off: {{ie.tax-credits[single]}} for a single person or {{ie.tax-credits[married]}} for a couple, the Single Person Child Carer Credit of {{ie.tax-credits[single-person-child-carer]}} for a single parent, and {{ie.tax-credits[employee]}} Employee Tax Credit for each person earning a salary.",
    "If you earn less than {{ie.employee-credit-full-income}} from employment, your Employee Tax Credit is {{ie.income-tax-rates[standard]}} of that income.",
  ],
  ejemplo: [
    "On €48,000 a single person pays 20% on €44,000 (€8,800) and 40% on €4,000 (€1,600). After €4,000 of credits the tax is €6,400 a year.",
  ],
  faq: [
    {
      pregunta: "What is the difference between a tax credit and the rate band?",
      respuesta:
        "The rate band decides how much of your income is taxed at the standard rate. A tax credit is taken off the tax itself, so a credit of {{ie.tax-credits[employee]}} cuts your bill by exactly that amount.",
    },
    {
      pregunta: "Can a married couple move the extra band between them?",
      respuesta:
        "No. The increase for the second income is the lower of {{ie.rate-bands[married-increase-max]}} or the lower earner's income, and it cannot be transferred between spouses or civil partners.",
    },
    {
      pregunta: "How much is the Rent Tax Credit?",
      respuesta:
        "It is {{ie.rent-tax-credit-rate}} of the rent you pay, up to {{ie.rent-tax-credit[single]}} for a single person or {{ie.rent-tax-credit[couple]}} for a jointly assessed couple. It can never be more than your Income Tax.",
    },
    {
      pregunta: "Does this include USC and PRSI?",
      respuesta: "No, this calculator is Income Tax only. Use the take-home pay calculator to see USC, PRSI and your net pay.",
    },
  ],
  glosario: [
    { termino: "Joint assessment", definicion: "Married couples or civil partners taxed together, sharing credits and a larger rate band." },
    { termino: "Tax Credit Certificate", definicion: "The document from Revenue that shows your tax credits and rate band for the year." },
  ],
});
