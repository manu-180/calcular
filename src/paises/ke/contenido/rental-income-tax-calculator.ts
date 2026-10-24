import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.rental-income-tax-calculator",
  h1: "Rental income tax calculator",
  title: "Rental income tax calculator Kenya: MRI at {{ke.mri-rate}}",
  description: "Monthly rental income tax is {{ke.mri-rate}} of gross residential rent for landlords earning more than {{ke.mri-lower}} and up to {{ke.mri-upper}} a year.",
  intro: [
    "Landlords who rent out homes pay monthly rental income tax (MRI) on the rent they collect. It is a final tax.",
    "Enter the rent for the month and what you expect for the year to see the tax and whether MRI applies.",
  ],
  comoSeCalcula: [
    "The tax is {{ke.mri-rate}} of gross rent. No expenses, losses or capital deductions are allowed.",
    "It applies to residential rent of more than {{ke.mri-lower}} and up to {{ke.mri-upper}} a year.",
    "Above {{ke.mri-upper}} you declare the rent with your other income in your annual return.",
  ],
  ejemplo: ["A flat let at KSh 60,000 a month pays KSh 4,500 of rental income tax each month."],
  faq: [
    {
      pregunta: "Can I deduct repairs or agent fees?",
      respuesta: "No. MRI is charged on gross rent and no expenses are allowed.",
    },
    {
      pregunta: "Can I opt out of MRI?",
      respuesta: "Yes. The Income Tax Act lets you elect, in writing to the Commissioner, not to pay it. Then the normal income tax rules apply.",
    },
    {
      pregunta: "Does it apply to commercial property?",
      respuesta: "No. MRI covers residential property. Commercial rent is taxed under the normal rules.",
    },
  ],
  glosario: [{ termino: "Final tax", definicion: "A tax that settles what you owe on that income, with nothing more to pay later." }],
});
