import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.withholding-tax-calculator",
  h1: "Withholding tax calculator Namibia",
  title: "Withholding tax Namibia: payments to non-residents",
  description:
    "Work out the tax to withhold when you pay a non-resident: {{na.withholding-tax[services]}} on services, interest and royalties, and up to {{na.withholding-tax[dividends-other]}} on dividends.",
  intro: [
    "When a Namibian resident pays fees, interest, royalties or dividends to someone who is not resident in Namibia, the payer withholds tax and pays it to NamRA.",
    "Pick the type of payment and enter the gross amount to see the tax to withhold and what the non-resident receives.",
  ],
  comoSeCalcula: [
    "Management, consultancy and entertainment fees: {{na.withholding-tax[services]}}.",
    "Interest: {{na.withholding-tax[interest]}}. Royalties: {{na.withholding-tax[royalties]}}.",
    "Dividends (non-resident shareholders tax): {{na.withholding-tax[dividends-25]}} if the shareholder is a company holding at least 25% of the capital, {{na.withholding-tax[dividends-other]}} in all other cases.",
  ],
  ejemplo: ["On a consultancy fee of N$50,000 you withhold N$5,000 and pay the consultant N$45,000."],
  faq: [
    {
      pregunta: "When is the withheld tax due?",
      respuesta: "Within 20 days after the end of the month in which you withheld it, together with the return.",
    },
    {
      pregunta: "What if I pay late?",
      respuesta: "NamRA charges a 10% penalty and 20% interest for each month or part of a month, limited to the amount of unpaid tax.",
    },
    {
      pregunta: "Who pays the tax on dividends?",
      respuesta: "The company that declares the dividend, or the agent in Namibia who receives it on behalf of the non-resident.",
    },
  ],
  glosario: [
    { termino: "NRST", definicion: "Non-resident shareholders tax, withheld on dividends paid to shareholders who are not resident in Namibia." },
    { termino: "Non-resident", definicion: "A person or company not ordinarily resident in Namibia." },
  ],
});
