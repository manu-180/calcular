import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.tdsr-calculator",
  h1: "TDSR and MSR calculator: how much can you borrow?",
  title: "TDSR calculator Singapore: maximum home loan",
  description: "See the largest bank home loan you could get under the {{sg.tdsr}} Total Debt Servicing Ratio and, for HDB flats, the {{sg.msr}} Mortgage Servicing Ratio set by MAS.",
  intro: [
    "Banks in Singapore must check that your debt repayments stay within limits set by MAS before they grant a property loan.",
    "Enter your income, your current debts and the loan you are looking at to see the largest monthly instalment and loan that fit within those limits.",
  ],
  comoSeCalcula: [
    "Your income counts in full if it is fixed. Variable income, such as bonus and commission, and rental income count after a haircut of at least {{sg.tdsr-descuento-variable}}.",
    "All your monthly debt repayments, including the new loan, must stay within {{sg.tdsr}} of that income. For an HDB flat or an EC in its minimum occupation period, your property loans must also stay within {{sg.msr}}.",
    "The new loan is tested at the higher of the floor rate ({{sg.tdsr-tasa-piso[residencial]}} for homes, {{sg.tdsr-tasa-piso[no-residencial]}} for non-residential property) and the highest rate in your loan offer.",
    "The largest loan is the amount that instalment can repay over your tenure at that test rate.",
  ],
  ejemplo: ["With $8,000 of fixed income and no other debts, a 30-year loan for a condo is tested at 4%, so the most you can borrow is about $921,600."],
  faq: [
    {
      pregunta: "Does TDSR apply to HDB loans?",
      respuesta: "These MAS rules are for loans from banks and other financial institutions. For HDB housing loans, check HDB's own rules.",
    },
    {
      pregunta: "What is the thereafter interest rate?",
      respuesta: "It is the highest rate a bank charges at any time during the loan, usually after the lock-in period. If it is pegged to SORA, the bank uses the latest SORA plus the spread.",
    },
    {
      pregunta: "Can a bank lend above the TDSR limit?",
      respuesta: "Only in exceptional cases, with a stricter credit evaluation, and the bank must report such loans to MAS.",
    },
    {
      pregunta: "Is this the loan I will get?",
      respuesta: "Not necessarily. Loan-to-value limits also apply, and they depend on the loan tenure, your age and your existing housing loans.",
    },
  ],
  glosario: [
    { termino: "TDSR", definicion: "Total Debt Servicing Ratio: the share of your gross monthly income that goes to all debt repayments." },
    { termino: "MSR", definicion: "Mortgage Servicing Ratio: the share of your gross monthly income that goes to property loans, for HDB flats and ECs." },
    { termino: "Haircut", definicion: "A cut applied to income that can vary, so only part of it counts." },
  ],
});
