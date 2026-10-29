import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.non-resident-tax",
  h1: "Non-resident withholding tax calculator Liberia",
  title: "Liberia withholding tax on payments to non-residents",
  description: "Work out the {{lr.non-resident-rate}} Liberian withholding tax on interest, dividends, royalties, licence fees and software paid to a non-resident, or gross up a net amount.",
  intro: [
    "Enter a payment to a non-resident to see the tax you must withhold, or enter the net they must receive to find the gross.",
    "Since the Tax Amendment Act of December 2025, a payer withholds {{lr.non-resident-rate}} on Liberia-source interest, dividends, royalties, licence fees, mineral rights payments and software sales to non-residents.",
  ],
  comoSeCalcula: [
    "Withholding: gross payment × {{lr.non-resident-rate}}.",
    "Gross from a net amount: net ÷ (1 − {{lr.non-resident-rate}}).",
  ],
  ejemplo: ["A US$10,000 royalty paid abroad has US$1,500 withheld, so the non-resident receives US$8,500."],
  faq: [
    {
      pregunta: "Which payments are covered?",
      respuesta: "Liberia-source interest, dividends, royalties, licence fees, payments for mineral rights, other income from rights in property (except rent) including intellectual property, and sales of software.",
    },
    {
      pregunta: "Is rent to a non-resident covered here?",
      respuesta: "No. Rent has its own withholding rate. Use our rental income tax calculator.",
    },
    {
      pregunta: "Who pays the tax to the LRA?",
      respuesta: "The payer in Liberia withholds it from the payment and pays it to the LRA by the 10th day of the following month.",
    },
  ],
  glosario: [
    { termino: "Non-resident", definicion: "A person or company not resident in Liberia for tax purposes." },
    { termino: "Gross up", definicion: "Work out the payment before tax that leaves a given amount after tax." },
  ],
});
