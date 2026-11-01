import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.rental-income-tax-calculator",
  h1: "Rental income tax calculator Bhutan",
  title: "Rental income tax Bhutan: {{bt.rent-repairs-share}} off for repairs, then bands",
  description: "Tax on rent in Bhutan: take off {{bt.rent-repairs-share}} for repairs, interest and property tax, then apply the personal bands. Tenants may withhold {{bt.tds-rates[rent]}}. Enter your rent.",
  intro: [
    "An individual who lets out a building in Bhutan takes {{bt.rent-repairs-share}} of gross rent off for repairs and maintenance, whatever was really spent. Section 74 of the Income Tax Act of Bhutan 2025 allows only three other costs: loan interest, property tax and insurance. This applies since {{bt.rent-repairs-share#desde}}.",
    "What remains joins your other income on the personal bands, so the tax depends on your salary as well as your rent.",
  ],
  comoSeCalcula: [
    "Take {{bt.rent-repairs-share}} of the rent. Then take off interest on a loan from a recognized financial institution for the property, property tax, and insurance from a company licensed in Bhutan.",
    "Add the result to your other taxable income and apply the bands. The tax on the rent is the difference with and without it.",
    "Tenants who must withhold keep {{bt.tds-rates[rent]}} of the rent. That amount goes against your tax.",
  ],
  ejemplo: ["Dechen lets a flat in Thimphu for Nu. 50,000 a month, Nu. 600,000 a year, and has no other income. Repairs take off Nu. 120,000, which leaves Nu. 480,000. The first Nu. 300,000 is free and the other Nu. 180,000 pays 5 %, so the tax is Nu. 9,000. If tenants withheld 5 %, Nu. 30,000 is already paid, Nu. 21,000 more than the tax."],
  faq: [
    {
      pregunta: "What can I deduct from rent in Bhutan?",
      respuesta: "Section 74 lists {{bt.rent-repairs-share}} of gross rent for repairs and maintenance, interest on a debt from a recognized financial institution, property tax, and insurance premiums paid to a company licensed in Bhutan. Nothing else may be deducted under that chapter.",
    },
    {
      pregunta: "Can I claim loan interest on any loan?",
      respuesta: "Only if the debt was incurred for that property, and the property was acquired to generate rental income (section 74(1)).",
    },
    {
      pregunta: "Does my tenant have to withhold?",
      respuesta: "The notification of 16 December 2025 lists rent at {{bt.tds-rates[rent]}} among payments from which government bodies, companies, businesses and individuals must withhold. Ask your tenant for the statement of what was deposited.",
    },
  ],
  glosario: [
    { termino: "Gross rent", definicion: "All rent received or owed in the year before any cost." },
    { termino: "Net rental income", definicion: "Rent after the allowed deductions. It joins your other income." },
    { termino: "Withholding", definicion: "The part of the rent a tenant keeps back and pays to the Department of Revenue and Customs." },
  ],
});
