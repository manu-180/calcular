import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.income-tax-calculator",
  h1: "Income tax calculator 2026-27: new vs old regime",
  title: "Income tax calculator 2026-27: new vs old regime",
  description:
    "Compare your income tax for tax year 2026-27 under the new and old regimes, with the {{in.standard-deduction-new}} standard deduction, the rebate and cess.",
  intro: [
    "Enter your salary and other income and see your tax under both regimes side by side, with cess, rebate and surcharge already worked in.",
    "Tax year 2026-27 is the first under the Income-tax Act, 2025. The slabs did not change, but the sections did: 80C is now section 123, 87A is section 156 and 115BAC is section 202.",
  ],
  comoSeCalcula: [
    "New regime (the default): your salary gets a standard deduction of {{in.standard-deduction-new}}. Almost no other deduction or exemption applies, not even HRA.",
    "The new slabs are nil up to ₹4 lakh, then 5%, 10%, 15%, 20% and 25% for every ₹4 lakh step, and 30% above ₹24 lakh.",
    "If your taxable income is up to {{in.rebate-new-limit}}, the section 156 rebate of up to {{in.rebate-new-max}} brings your tax to zero. Just above that line, marginal relief makes sure you never pay more tax than the income you earned above it.",
    "Old regime: you choose it in your return. The standard deduction is {{in.standard-deduction-old}}, and you can claim section 123 investments up to {{in.section-123-limit}}, HRA, health insurance, home loan interest and more.",
    "The old slabs are nil up to ₹2.5 lakh (₹3 lakh from age 60, ₹5 lakh from age 80), 5% up to ₹5 lakh, 20% up to ₹10 lakh and 30% above. The rebate is up to {{in.rebate-old-max}} if taxable income is up to {{in.rebate-old-limit}}.",
    "Surcharge applies above ₹50 lakh, with marginal relief. Then {{in.cess}} Health and Education Cess is added on the tax plus surcharge.",
  ],
  ejemplo: [
    "On a ₹15 lakh salary, the new regime taxes ₹14.25 lakh and the bill is ₹97,500 with cess.",
    "In the old regime, with ₹1.5 lakh of section 123 investments, taxable income is ₹13 lakh and the tax is ₹2,10,600. The new regime saves ₹1,13,100.",
  ],
  faq: [
    {
      pregunta: "Is a salary of ₹12.75 lakh really tax free?",
      respuesta:
        "Yes, in the new regime. After the {{in.standard-deduction-new}} standard deduction your taxable income is ₹12 lakh, and the rebate cancels the ₹60,000 of slab tax. Income taxed at special rates, such as capital gains, is treated separately.",
    },
    {
      pregunta: "When does the old regime work out better?",
      respuesta:
        "Only when your deductions are large: full section 123 investments, a big HRA exemption and home loan interest together. Enter yours above and the calculator shows which regime costs less.",
    },
    {
      pregunta: "Can I switch between regimes every year?",
      respuesta:
        "If you have no business or professional income, yes: you pick the old regime with your return each year. With business income, the choice is limited and can be withdrawn only once.",
    },
    {
      pregunta: "Why is my monthly TDS different from this result?",
      respuesta:
        "Your employer deducts tax on its estimate of your yearly salary and the regime you declared. Bonuses, a job change or proofs submitted late can make the monthly figure move.",
    },
  ],
  glosario: [
    { termino: "Tax year", definicion: "The year from 1 April to 31 March. It replaces the old previous year and assessment year." },
    { termino: "Standard deduction", definicion: "A flat amount taken off salary income without any proof." },
    { termino: "Cess", definicion: "Health and Education Cess, charged on top of income tax and surcharge." },
    { termino: "Surcharge", definicion: "An extra percentage of tax for incomes above ₹50 lakh." },
  ],
});
