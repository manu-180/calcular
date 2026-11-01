import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.redundancy-tax-calculator",
  h1: "Redundancy payment tax calculator Fiji {{anio}}",
  title: "Redundancy pay tax Fiji {{anio}}: {{fj.redundancy-tax-exemption}} exempt",
  description: "The first {{fj.redundancy-tax-exemption}} of a redundancy payment is tax exempt. See the tax on the rest and the amount you keep.",
  intro: [
    "The first {{fj.redundancy-tax-exemption}} of a redundancy payment is exempt from income tax in Fiji. Anything above it is added to your employment income and taxed with the rest.",
    "Enter the payment and your other income for the year to see the tax on the extra amount and the cash you keep.",
  ],
  comoSeCalcula: [
    "FRCS treats a payment as redundancy pay when your job is cut because the employer no longer needs the position. The Employer Guide 2026 gives the exemption under the Income Tax (Exempt Income) Regulations 2016.",
    "The calculator subtracts {{fj.redundancy-tax-exemption}} from the payment. If the payment is smaller, all of it is exempt.",
    "The remainder is added to your other income for the year. Tax is worked out on the total using the resident bands, starting at {{fj.paye-bands[1].tasa}} above {{fj.paye-bands[1].desde}}, and again without the payment. The difference is the tax on the redundancy.",
    "Some payments are not redundancy payments for tax. These include pay in lieu of notice, a seasonal lay off, and payments at the end of a fixed term contract. They are taxed as normal pay.",
  ],
  ejemplo: [
    "You earned FJ$40,000 in wages and receive FJ$25,000 of redundancy pay. FJ$15,000 is exempt and FJ$10,000 is added, taking your income to FJ$50,000. Tax on FJ$40,000 is FJ$1,800 and tax on FJ$50,000 is FJ$3,600. The redundancy adds FJ$1,800 of tax, and you keep FJ$23,200.",
  ],
  faq: [
    {
      pregunta: "How much of a redundancy payment is tax free in Fiji?",
      respuesta: "The Employer Guide 2026 allows an exemption of up to {{fj.redundancy-tax-exemption}} per redundancy payment, under Part 3(2)(a) of the Income Tax (Exempt Income) Regulations 2016. The excess is taxed as employment income.",
    },
    {
      pregunta: "Is a retiring allowance treated the same way?",
      respuesta: "No. The guide says a retiring allowance is taxable in full. Its example adds a retiring payment of FJ$30,200.50 to a salary of FJ$240,000 and taxes the total.",
    },
    {
      pregunta: "What does the Employment Relations Act say about the amount?",
      respuesta: "The FRCS guide summarises it as at least one week's wages for each complete year of service. That is about the payment itself, not its tax, and this calculator does not work out the amount.",
    },
  ],
  glosario: [
    { termino: "Redundancy payment", definicion: "A one-off payment when a job is eliminated because the employer no longer needs it." },
    { termino: "Retiring allowance", definicion: "A lump sum paid on retirement, taxable in full." },
    { termino: "Exempt income", definicion: "Income that is not taxed." },
  ],
});
